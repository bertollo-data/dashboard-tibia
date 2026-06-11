(function () {
  const tableMap = {
    characters: "characters",
    progressions: "progressions",
    investments: "investments",
    hunts: "hunts",
    deliveries: "deliveries",
  };

  let client = null;
  let readyPromise = null;

  function isConfigured() {
    const config = window.SUPABASE_CONFIG || {};
    return Boolean(config.url && config.anonKey);
  }

  async function init() {
    if (!isConfigured()) {
      return null;
    }

    if (readyPromise) {
      return readyPromise;
    }

    readyPromise = import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm").then(
      ({ createClient }) => {
        const config = window.SUPABASE_CONFIG;
        client = createClient(config.url, config.anonKey);
        return client;
      },
    );

    return readyPromise;
  }

  async function getClient() {
    if (client) {
      return client;
    }
    return init();
  }

  async function getSession() {
    const supabase = await getClient();
    if (!supabase) {
      return null;
    }
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      throw error;
    }
    return data.session;
  }

  async function signIn(email, password) {
    const supabase = await getClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      throw error;
    }
    return data.session;
  }

  async function signUp(email, password) {
    const supabase = await getClient();
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      throw error;
    }
    return data.session;
  }

  async function signOut() {
    const supabase = await getClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  }

  async function pullState() {
    const supabase = await getClient();
    const nextState = {
      activeCharacterId: null,
      characters: [],
      progressions: [],
      investments: [],
      hunts: [],
      deliveries: [],
      calculator: {
        goldPerTc: 0,
        realPerTc: 0,
        goldAmount: 0,
        tcAmount: 0,
        updatedAt: "",
      },
    };

    for (const [key, table] of Object.entries(tableMap)) {
      const { data, error } = await supabase.from(table).select("*").order("created_at", {
        ascending: true,
      });
      if (error) {
        throw error;
      }
      nextState[key] = data.map(fromRemoteRecord);
    }

    const { data: settingsRows, error: settingsError } = await supabase
      .from("settings")
      .select("*")
      .eq("id", "calculator")
      .limit(1);
    if (settingsError && settingsError.code !== "42P01") {
      throw settingsError;
    }
    if (settingsRows && settingsRows.length > 0) {
      nextState.calculator = fromRemoteCalculator(settingsRows[0]);
    }

    nextState.activeCharacterId = nextState.characters.length > 0 ? nextState.characters[0].id : null;
    return nextState;
  }

  async function pushState(state) {
    const supabase = await getClient();
    const session = await getSession();
    if (!session || !session.user) {
      return;
    }

    for (const [key, table] of Object.entries(tableMap)) {
      const localRecords = Array.isArray(state[key]) ? state[key] : [];
      const { data: remoteRows, error: selectError } = await supabase.from(table).select("id");
      if (selectError) {
        throw selectError;
      }

      const localIds = new Set(localRecords.map((record) => record.id));
      const idsToDelete = remoteRows.map((row) => row.id).filter((id) => !localIds.has(id));

      if (idsToDelete.length > 0) {
        const { error: deleteError } = await supabase.from(table).delete().in("id", idsToDelete);
        if (deleteError) {
          throw deleteError;
        }
      }

      if (localRecords.length > 0) {
        const payload = localRecords.map((record) => toRemoteRecord(key, record, session.user.id));
        const { error: upsertError } = await supabase.from(table).upsert(payload);
        if (upsertError) {
          throw upsertError;
        }
      }
    }

    const calculator = state.calculator || {};
    const { error: settingsError } = await supabase.from("settings").upsert({
      id: "calculator",
      user_id: session.user.id,
      gold_per_tc: Number(calculator.goldPerTc) || 0,
      real_per_tc: Number(calculator.realPerTc) || 0,
      gold_amount: Number(calculator.goldAmount) || 0,
      tc_amount: Number(calculator.tcAmount) || 0,
      updated_at: calculator.updatedAt || new Date().toISOString(),
    });
    if (settingsError && settingsError.code !== "42P01") {
      throw settingsError;
    }
  }

  function toRemoteRecord(key, record, userId) {
    const base = {
      id: record.id,
      user_id: userId,
      created_at: record.createdAt || record.created_at || new Date().toISOString(),
      updated_at: record.updatedAt || record.updated_at || new Date().toISOString(),
    };

    if (key === "characters") {
      return {
        ...base,
        name: record.name,
        level: record.level,
        world: record.world || "",
        vocation: record.vocation || "",
      };
    }

    if (key === "progressions") {
      return {
        ...base,
        character_id: record.characterId,
        date: record.date,
        level: record.level,
        note: record.note || "",
      };
    }

    if (key === "investments") {
      return {
        ...base,
        character_id: record.characterId,
        date: record.date,
        amount: record.amount,
        category: record.category || "",
        note: record.note || "",
      };
    }

    if (key === "hunts") {
      return {
        ...base,
        character_id: record.characterId,
        date: record.date,
        hunt: record.hunt || "",
        type: record.type || "solo",
        level: record.level || "",
        xp: record.xp,
        loot: record.loot,
        supplies: record.supplies,
        balance: record.balance,
        session_time: record.sessionTime,
        note: record.note || "",
      };
    }

    return {
      ...base,
      character_id: record.characterId,
      week: record.week,
      product: record.product,
      quantity: record.quantity,
      total_value: record.totalValue,
    };
  }

  function fromRemoteRecord(record) {
    const base = {
      id: record.id,
      createdAt: record.created_at,
      updatedAt: record.updated_at,
    };

    if ("name" in record) {
      return {
        ...base,
        name: record.name,
        level: record.level,
        world: record.world || "",
        vocation: record.vocation || "",
      };
    }

    if ("amount" in record) {
      return {
        ...base,
        characterId: record.character_id,
        date: record.date,
        amount: record.amount,
        category: record.category || "",
        note: record.note || "",
      };
    }

    if ("xp" in record) {
      return {
        ...base,
        characterId: record.character_id,
        date: record.date,
        hunt: record.hunt || "",
        type: record.type || "solo",
        level: record.level || "",
        xp: record.xp,
        loot: record.loot,
        supplies: record.supplies,
        balance: record.balance,
        sessionTime: record.session_time,
        note: record.note || "",
      };
    }

    if ("week" in record) {
      return {
        ...base,
        characterId: record.character_id,
        week: record.week,
        product: record.product,
        quantity: record.quantity,
        totalValue: record.total_value,
      };
    }

    return {
      ...base,
      characterId: record.character_id,
      date: record.date,
      level: record.level,
      note: record.note || "",
    };
  }

  function fromRemoteCalculator(record) {
    return {
      goldPerTc: Number(record.gold_per_tc) || 0,
      realPerTc: Number(record.real_per_tc) || 0,
      goldAmount: Number(record.gold_amount) || 0,
      tcAmount: Number(record.tc_amount) || 0,
      updatedAt: record.updated_at || "",
    };
  }

  window.TibiaSupabase = {
    isConfigured,
    init,
    getSession,
    signIn,
    signUp,
    signOut,
    pullState,
    pushState,
  };
})();
