const STORAGE_KEY = "tibia-dashboard-v1";

const state = loadState();

const tabs = document.querySelectorAll(".nav-tab");
const panels = document.querySelectorAll(".tab-panel");
const pageTitle = document.querySelector("#pageTitle");
const sidebarToggle = document.querySelector("#sidebarToggle");
const quickAddCharacter = document.querySelector("#quickAddCharacter");
const activeCharacterSelect = document.querySelector("#activeCharacterSelect");
const authStatus = document.querySelector("#authStatus");
const authForm = document.querySelector("#authForm");
const authActions = document.querySelector("#authActions");
const authEmail = document.querySelector("#authEmail");
const authPassword = document.querySelector("#authPassword");
const signInButton = document.querySelector("#signInButton");
const signUpButton = document.querySelector("#signUpButton");
const signOutButton = document.querySelector("#signOutButton");
const syncNowButton = document.querySelector("#syncNowButton");
const characterForm = document.querySelector("#characterForm");
const characterFormTitle = document.querySelector("#characterFormTitle");
const editingCharacterId = document.querySelector("#editingCharacterId");
const characterName = document.querySelector("#characterName");
const characterLevel = document.querySelector("#characterLevel");
const characterWorld = document.querySelector("#characterWorld");
const characterVocation = document.querySelector("#characterVocation");
const cancelEdit = document.querySelector("#cancelEdit");
const characterList = document.querySelector("#characterList");
const overviewCharacters = document.querySelector("#overviewCharacters");
const overviewActiveSummary = document.querySelector("#overviewActiveSummary");
const exportBackup = document.querySelector("#exportBackup");
const importBackup = document.querySelector("#importBackup");
const backupFile = document.querySelector("#backupFile");
const activeCharacterName = document.querySelector("#activeCharacterName");
const activeCharacterMeta = document.querySelector("#activeCharacterMeta");
const characterCountLabel = document.querySelector("#characterCountLabel");
const metricCharacterCount = document.querySelector("#metricCharacterCount");
const metricActiveLevel = document.querySelector("#metricActiveLevel");
const metricInvestedTc = document.querySelector("#metricInvestedTc");
const metricHuntCount = document.querySelector("#metricHuntCount");
const metricDeliveryCount = document.querySelector("#metricDeliveryCount");
const overviewHeroName = document.querySelector("#overviewHeroName");
const overviewHeroMeta = document.querySelector("#overviewHeroMeta");
const progressForm = document.querySelector("#progressForm");
const progressFormTitle = document.querySelector("#progressFormTitle");
const editingProgressId = document.querySelector("#editingProgressId");
const progressCharacterName = document.querySelector("#progressCharacterName");
const progressDate = document.querySelector("#progressDate");
const progressLevel = document.querySelector("#progressLevel");
const progressNote = document.querySelector("#progressNote");
const saveProgress = document.querySelector("#saveProgress");
const cancelProgressEdit = document.querySelector("#cancelProgressEdit");
const metricFirstLevel = document.querySelector("#metricFirstLevel");
const metricProgressCurrentLevel = document.querySelector("#metricProgressCurrentLevel");
const metricLevelsGained = document.querySelector("#metricLevelsGained");
const metricLastProgressDate = document.querySelector("#metricLastProgressDate");
const progressChart = document.querySelector("#progressChart");
const progressChartHint = document.querySelector("#progressChartHint");
const progressCountLabel = document.querySelector("#progressCountLabel");
const progressTableBody = document.querySelector("#progressTableBody");
const investmentForm = document.querySelector("#investmentForm");
const investmentFormTitle = document.querySelector("#investmentFormTitle");
const editingInvestmentId = document.querySelector("#editingInvestmentId");
const investmentCharacterName = document.querySelector("#investmentCharacterName");
const investmentDate = document.querySelector("#investmentDate");
const investmentAmount = document.querySelector("#investmentAmount");
const investmentCategory = document.querySelector("#investmentCategory");
const investmentNote = document.querySelector("#investmentNote");
const saveInvestment = document.querySelector("#saveInvestment");
const cancelInvestmentEdit = document.querySelector("#cancelInvestmentEdit");
const metricActiveInvestmentTc = document.querySelector("#metricActiveInvestmentTc");
const metricTotalInvestmentTc = document.querySelector("#metricTotalInvestmentTc");
const metricInvestmentCount = document.querySelector("#metricInvestmentCount");
const investmentCountLabel = document.querySelector("#investmentCountLabel");
const investmentTableBody = document.querySelector("#investmentTableBody");
const huntForm = document.querySelector("#huntForm");
const huntFormTitle = document.querySelector("#huntFormTitle");
const editingHuntId = document.querySelector("#editingHuntId");
const huntAnalyzerRaw = document.querySelector("#huntAnalyzerRaw");
const parseHuntAnalyzer = document.querySelector("#parseHuntAnalyzer");
const huntCharacterName = document.querySelector("#huntCharacterName");
const huntDate = document.querySelector("#huntDate");
const huntLevel = document.querySelector("#huntLevel");
const huntName = document.querySelector("#huntName");
const huntXp = document.querySelector("#huntXp");
const huntSessionTime = document.querySelector("#huntSessionTime");
const huntLoot = document.querySelector("#huntLoot");
const huntSupplies = document.querySelector("#huntSupplies");
const huntBalance = document.querySelector("#huntBalance");
const huntNote = document.querySelector("#huntNote");
const saveHunt = document.querySelector("#saveHunt");
const cancelHuntEdit = document.querySelector("#cancelHuntEdit");
const metricHuntXp = document.querySelector("#metricHuntXp");
const metricHuntBalance = document.querySelector("#metricHuntBalance");
const metricHuntLoot = document.querySelector("#metricHuntLoot");
const metricHuntSupplies = document.querySelector("#metricHuntSupplies");
const huntCountLabel = document.querySelector("#huntCountLabel");
const huntTableBody = document.querySelector("#huntTableBody");
const deliveryForm = document.querySelector("#deliveryForm");
const deliveryFormTitle = document.querySelector("#deliveryFormTitle");
const editingDeliveryId = document.querySelector("#editingDeliveryId");
const deliveryCharacterName = document.querySelector("#deliveryCharacterName");
const deliveryWeek = document.querySelector("#deliveryWeek");
const deliveryProduct = document.querySelector("#deliveryProduct");
const deliveryQuantity = document.querySelector("#deliveryQuantity");
const deliveryTotalValue = document.querySelector("#deliveryTotalValue");
const saveDelivery = document.querySelector("#saveDelivery");
const cancelDeliveryEdit = document.querySelector("#cancelDeliveryEdit");
const deliveryWeekFilter = document.querySelector("#deliveryWeekFilter");
const metricDeliveryWeek = document.querySelector("#metricDeliveryWeek");
const metricDeliveryItems = document.querySelector("#metricDeliveryItems");
const metricDeliveryTotal = document.querySelector("#metricDeliveryTotal");
const deliveryTableBody = document.querySelector("#deliveryTableBody");
const deliveryAverageTableBody = document.querySelector("#deliveryAverageTableBody");
const deliveryAverageCountLabel = document.querySelector("#deliveryAverageCountLabel");
const toast = document.querySelector("#toast");

const tabLabels = {
  overview: "Visão geral",
  characters: "Personagens",
  progress: "Progressão",
  investments: "Investimentos",
  hunts: "Hunts",
  delivery: "Delivery",
};

let pendingCharacterDeleteId = null;
let pendingProgressDeleteId = null;
let pendingInvestmentDeleteId = null;
let pendingHuntDeleteId = null;
let pendingDeliveryDeleteId = null;
let cloudSession = null;
let isApplyingRemoteState = false;
let syncTimeout = null;

applySavedPreferences();
initSupabaseAuth();

sidebarToggle.addEventListener("click", () => {
  document.body.classList.toggle("sidebar-collapsed");
  const isCollapsed = document.body.classList.contains("sidebar-collapsed");
  sidebarToggle.setAttribute("aria-label", isCollapsed ? "Expandir menu" : "Recolher menu");
  localStorage.setItem("tibia-dashboard-sidebar-collapsed", isCollapsed ? "true" : "false");
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setActiveTab(tab.dataset.tab));
});

document.querySelectorAll("[data-open-tab]").forEach((button) => {
  button.addEventListener("click", () => setActiveTab(button.dataset.openTab));
});

quickAddCharacter.addEventListener("click", () => {
  resetCharacterForm();
  setActiveTab("characters");
  characterName.focus();
});

activeCharacterSelect.addEventListener("change", () => {
  state.activeCharacterId = activeCharacterSelect.value || null;
  persist();
  resetProgressForm();
  resetInvestmentForm();
  resetHuntForm();
  resetDeliveryForm();
  render();
});

cancelEdit.addEventListener("click", resetCharacterForm);
cancelProgressEdit.addEventListener("click", resetProgressForm);
cancelInvestmentEdit.addEventListener("click", resetInvestmentForm);
cancelHuntEdit.addEventListener("click", resetHuntForm);
cancelDeliveryEdit.addEventListener("click", resetDeliveryForm);
parseHuntAnalyzer.addEventListener("click", fillHuntFromAnalyzer);
exportBackup.addEventListener("click", exportStateBackup);
importBackup.addEventListener("click", () => backupFile.click());
backupFile.addEventListener("change", importStateBackup);
signInButton.addEventListener("click", () => handleAuthAction("signIn"));
signUpButton.addEventListener("click", () => handleAuthAction("signUp"));
signOutButton.addEventListener("click", handleSignOut);
syncNowButton.addEventListener("click", () => syncToCloud({ immediate: true }));
deliveryWeekFilter.addEventListener("change", () => {
  if (deliveryWeekFilter.value) {
    deliveryWeek.value = deliveryWeekFilter.value;
  }
  renderDelivery();
});

characterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = characterName.value.trim();
  const level = Number(characterLevel.value);

  if (!name || !Number.isInteger(level) || level < 1) {
    showToast("Informe nome e level válido.");
    return;
  }

  const existingId = editingCharacterId.value;
  const payload = {
    name,
    level,
    world: characterWorld.value.trim(),
    vocation: characterVocation.value,
    updatedAt: new Date().toISOString(),
  };

  if (existingId) {
    state.characters = state.characters.map((character) =>
      character.id === existingId ? { ...character, ...payload } : character,
    );
    showToast("Personagem atualizado.");
  } else {
    const newCharacter = {
      id: createId(),
      createdAt: new Date().toISOString(),
      ...payload,
    };
    state.characters.push(newCharacter);
    state.activeCharacterId = newCharacter.id;
    showToast("Personagem cadastrado.");
  }

  if (!state.activeCharacterId && state.characters.length > 0) {
    state.activeCharacterId = state.characters[0].id;
  }

  persist();
  resetCharacterForm();
  render();
});

progressForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const activeCharacter = getActiveCharacter();
  const level = Number(progressLevel.value);
  const date = progressDate.value;

  if (!activeCharacter) {
    showToast("Selecione um personagem antes de registrar progressão.");
    return;
  }

  if (!date || !Number.isInteger(level) || level < 1) {
    showToast("Informe data e level válido.");
    return;
  }

  const existingId = editingProgressId.value;
  const payload = {
    characterId: activeCharacter.id,
    date,
    level,
    note: progressNote.value.trim(),
    updatedAt: new Date().toISOString(),
  };

  if (existingId) {
    state.progressions = state.progressions.map((entry) =>
      entry.id === existingId ? { ...entry, ...payload } : entry,
    );
    showToast("Registro de level atualizado.");
  } else {
    state.progressions.push({
      id: createId("progress"),
      createdAt: new Date().toISOString(),
      ...payload,
    });
    showToast("Registro de level salvo.");
  }

  syncCharacterLevel(activeCharacter.id);
  persist();
  resetProgressForm();
  render();
});

investmentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const activeCharacter = getActiveCharacter();
  const amount = Number(investmentAmount.value);
  const date = investmentDate.value;

  if (!activeCharacter) {
    showToast("Selecione um personagem antes de registrar investimento.");
    return;
  }

  if (!date || !Number.isInteger(amount) || amount < 1) {
    showToast("Informe data e quantidade de TC válida.");
    return;
  }

  const existingId = editingInvestmentId.value;
  const payload = {
    characterId: activeCharacter.id,
    date,
    amount,
    category: investmentCategory.value,
    note: investmentNote.value.trim(),
    updatedAt: new Date().toISOString(),
  };

  if (existingId) {
    state.investments = state.investments.map((entry) =>
      entry.id === existingId ? { ...entry, ...payload } : entry,
    );
    showToast("Investimento atualizado.");
  } else {
    state.investments.push({
      id: createId("investment"),
      createdAt: new Date().toISOString(),
      ...payload,
    });
    showToast("Investimento salvo.");
  }

  persist();
  resetInvestmentForm();
  render();
});

huntForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const activeCharacter = getActiveCharacter();
  const xp = Number(huntXp.value);
  const loot = Number(huntLoot.value);
  const supplies = Number(huntSupplies.value);
  const balance = Number(huntBalance.value);
  const date = huntDate.value;

  if (!activeCharacter) {
    showToast("Selecione um personagem antes de registrar hunt.");
    return;
  }

  if (
    !date ||
    !Number.isInteger(xp) ||
    xp < 0 ||
    !Number.isInteger(loot) ||
    loot < 0 ||
    !Number.isInteger(supplies) ||
    supplies < 0 ||
    !Number.isInteger(balance) ||
    !huntSessionTime.value.trim()
  ) {
    showToast("Informe os dados principais da hunt.");
    return;
  }

  const existingId = editingHuntId.value;
  const payload = {
    characterId: activeCharacter.id,
    date,
    hunt: huntName.value.trim(),
    type: getSelectedHuntType(),
    level: huntLevel.value.trim(),
    xp,
    loot,
    supplies,
    balance,
    sessionTime: huntSessionTime.value.trim(),
    note: huntNote.value.trim(),
    updatedAt: new Date().toISOString(),
  };

  if (existingId) {
    state.hunts = state.hunts.map((entry) =>
      entry.id === existingId ? { ...entry, ...payload } : entry,
    );
    showToast("Hunt atualizada.");
  } else {
    state.hunts.push({
      id: createId("hunt"),
      createdAt: new Date().toISOString(),
      ...payload,
    });
    showToast("Hunt registrada.");
  }

  persist();
  resetHuntForm();
  render();
});

deliveryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const activeCharacter = getActiveCharacter();
  const week = deliveryWeek.value;
  const product = deliveryProduct.value.trim();
  const quantity = Number(deliveryQuantity.value);
  const totalValue = Number(deliveryTotalValue.value);

  if (!activeCharacter) {
    showToast("Selecione um personagem antes de registrar delivery.");
    return;
  }

  if (!week || !product || !Number.isInteger(quantity) || quantity < 1 || !Number.isFinite(totalValue) || totalValue < 0) {
    showToast("Informe semana, produto, quantidade e valor total válidos.");
    return;
  }

  const existingId = editingDeliveryId.value;
  const payload = {
    characterId: activeCharacter.id,
    week,
    product,
    quantity,
    totalValue,
    updatedAt: new Date().toISOString(),
  };

  if (existingId) {
    state.deliveries = state.deliveries.map((entry) =>
      entry.id === existingId ? { ...entry, ...payload } : entry,
    );
    showToast("Custo de delivery atualizado.");
  } else {
    state.deliveries.push({
      id: createId("delivery"),
      createdAt: new Date().toISOString(),
      ...payload,
    });
    showToast("Custo de delivery salvo.");
  }

  deliveryWeekFilter.value = week;
  persist();
  resetDeliveryForm({ keepWeek: true });
  render();
});

function setActiveTab(tabName) {
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === tabName));
  panels.forEach((panel) => panel.classList.toggle("active", panel.id === tabName));
  pageTitle.textContent = tabLabels[tabName] || "Dashboard";
  quickAddCharacter.classList.toggle("hidden", tabName !== "characters");
  localStorage.setItem("tibia-dashboard-active-tab", tabName);
}

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return createEmptyState();
    }

    const parsed = JSON.parse(stored);
    return {
      activeCharacterId: parsed.activeCharacterId || null,
      characters: Array.isArray(parsed.characters) ? parsed.characters : [],
      progressions: Array.isArray(parsed.progressions) ? parsed.progressions : [],
      investments: Array.isArray(parsed.investments) ? parsed.investments : [],
      hunts: Array.isArray(parsed.hunts) ? parsed.hunts : [],
      deliveries: Array.isArray(parsed.deliveries) ? parsed.deliveries : [],
    };
  } catch {
    return createEmptyState();
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (!isApplyingRemoteState) {
    scheduleCloudSync();
  }
}

function render() {
  const activeCharacter = getActiveCharacter();

  renderActiveCharacterSelect(activeCharacter);
  metricCharacterCount.textContent = String(state.characters.length);
  metricActiveLevel.textContent = activeCharacter ? String(activeCharacter.level) : "-";
  metricInvestedTc.textContent = formatNumber(
    sumInvestmentsForCharacter(activeCharacter ? activeCharacter.id : null),
  );
  metricHuntCount.textContent = String(getActiveHunts().length);
  metricDeliveryCount.textContent = `${getVisibleDeliveryEntries().length}/9`;
  characterCountLabel.textContent = `${state.characters.length} cadastrado${
    state.characters.length === 1 ? "" : "s"
  }`;

  if (activeCharacter) {
    activeCharacterName.textContent = activeCharacter.name;
    activeCharacterMeta.textContent = buildCharacterMeta(activeCharacter);
    overviewHeroName.textContent = activeCharacter.name;
    overviewHeroMeta.textContent = buildCharacterMeta(activeCharacter);
  } else {
    activeCharacterName.textContent = "Nenhum selecionado";
    activeCharacterMeta.textContent = "Cadastre um personagem para começar";
    overviewHeroName.textContent = "Nenhum personagem selecionado";
    overviewHeroMeta.textContent = "Cadastre ou selecione um personagem para começar.";
  }

  renderCharacterList();
  renderOverviewCharacters();
  renderOverviewActiveSummary();
  renderProgress();
  renderInvestments();
  renderHunts();
  renderDelivery();
  bindDynamicTabButtons();
}

function applySavedPreferences() {
  if (localStorage.getItem("tibia-dashboard-sidebar-collapsed") === "true") {
    document.body.classList.add("sidebar-collapsed");
    sidebarToggle.setAttribute("aria-label", "Expandir menu");
  }
}

function restoreLastTab() {
  const savedTab = localStorage.getItem("tibia-dashboard-active-tab");
  if (savedTab && tabLabels[savedTab]) {
    setActiveTab(savedTab);
    return;
  }

  setActiveTab("overview");
}

function renderActiveCharacterSelect(activeCharacter) {
  if (state.characters.length === 0) {
    activeCharacterSelect.innerHTML = '<option value="">Nenhum personagem</option>';
    activeCharacterSelect.value = "";
    return;
  }

  activeCharacterSelect.innerHTML = state.characters
    .map((character) => `<option value="${character.id}">${escapeHtml(character.name)}</option>`)
    .join("");
  activeCharacterSelect.value = activeCharacter ? activeCharacter.id : "";
}

async function initSupabaseAuth() {
  if (!window.TibiaSupabase || !window.TibiaSupabase.isConfigured()) {
    authStatus.textContent = "Supabase não configurado";
    authForm.classList.remove("hidden");
    authActions.classList.add("hidden");
    return;
  }

  try {
    authStatus.textContent = "Conectando ao Supabase...";
    await window.TibiaSupabase.init();
    cloudSession = await window.TibiaSupabase.getSession();
    updateAuthUi();

    if (cloudSession) {
      await loadCloudState();
    }
  } catch (error) {
    authStatus.textContent = "Erro ao conectar Supabase";
    showToast(error.message || "Erro ao conectar Supabase.");
  }
}

async function handleAuthAction(action) {
  const email = authEmail.value.trim();
  const password = authPassword.value;

  if (!email || !password) {
    showToast("Informe email e senha.");
    return;
  }

  if (!window.TibiaSupabase || !window.TibiaSupabase.isConfigured()) {
    showToast("Configure o Supabase antes de fazer login.");
    return;
  }

  try {
    authStatus.textContent = action === "signIn" ? "Entrando..." : "Criando conta...";
    cloudSession =
      action === "signIn"
        ? await window.TibiaSupabase.signIn(email, password)
        : await window.TibiaSupabase.signUp(email, password);
    authPassword.value = "";
    updateAuthUi();

    if (cloudSession) {
      await loadCloudState();
      await syncToCloud({ immediate: true });
    } else {
      authStatus.textContent = "Confirme seu email para entrar.";
    }
  } catch (error) {
    updateAuthUi();
    showToast(error.message || "Falha na autenticação.");
  }
}

async function handleSignOut() {
  try {
    await window.TibiaSupabase.signOut();
    cloudSession = null;
    updateAuthUi();
    showToast("Sessão encerrada.");
  } catch (error) {
    showToast(error.message || "Erro ao sair.");
  }
}

function updateAuthUi() {
  if (!window.TibiaSupabase || !window.TibiaSupabase.isConfigured()) {
    authStatus.textContent = "Supabase não configurado";
    authForm.classList.remove("hidden");
    authActions.classList.add("hidden");
    return;
  }

  if (cloudSession && cloudSession.user) {
    authStatus.textContent = cloudSession.user.email;
    authForm.classList.add("hidden");
    authActions.classList.remove("hidden");
    return;
  }

  authStatus.textContent = "Entre para sincronizar";
  authForm.classList.remove("hidden");
  authActions.classList.add("hidden");
}

async function loadCloudState() {
  try {
    authStatus.textContent = "Carregando dados...";
    const remoteState = await window.TibiaSupabase.pullState();
    if (remoteState.characters.length > 0) {
      isApplyingRemoteState = true;
      Object.assign(state, remoteState);
      persist();
      isApplyingRemoteState = false;
      resetCharacterForm();
      resetProgressForm();
      resetInvestmentForm();
      resetHuntForm();
      resetDeliveryForm();
      render();
      showToast("Dados carregados do Supabase.");
    } else {
      await syncToCloud({ immediate: true });
    }
    updateAuthUi();
  } catch (error) {
    isApplyingRemoteState = false;
    updateAuthUi();
    showToast(error.message || "Erro ao carregar dados do Supabase.");
  }
}

function scheduleCloudSync() {
  if (!cloudSession || !cloudSession.user || !window.TibiaSupabase || !window.TibiaSupabase.isConfigured()) {
    return;
  }

  clearTimeout(syncTimeout);
  syncTimeout = setTimeout(() => syncToCloud({ immediate: true }), 800);
}

async function syncToCloud() {
  if (!cloudSession || !cloudSession.user || !window.TibiaSupabase || !window.TibiaSupabase.isConfigured()) {
    return;
  }

  try {
    authStatus.textContent = "Sincronizando...";
    await window.TibiaSupabase.pushState(state);
    authStatus.textContent = `Sincronizado: ${cloudSession.user.email}`;
  } catch (error) {
    updateAuthUi();
    showToast(error.message || "Erro ao sincronizar.");
  }
}

function bindDynamicTabButtons() {
  document.querySelectorAll("[data-open-tab]").forEach((button) => {
    if (button.dataset.boundTabButton === "true") {
      return;
    }
    button.dataset.boundTabButton = "true";
    button.addEventListener("click", () => setActiveTab(button.dataset.openTab));
  });
}

function renderCharacterList() {
  if (state.characters.length === 0) {
    characterList.innerHTML = buildEmptyMessage("Nenhum personagem cadastrado.");
    return;
  }

  characterList.innerHTML = state.characters.map(buildCharacterRow).join("");
  characterList.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleCharacterAction(button));
  });
}

function renderOverviewCharacters() {
  if (state.characters.length === 0) {
    overviewCharacters.innerHTML = buildActionEmptyMessage(
      "A lista aparecerá aqui após o primeiro cadastro.",
      "Cadastrar",
      "characters",
    );
    return;
  }

  overviewCharacters.innerHTML = state.characters
    .map((character) => {
      const isActive = character.id === state.activeCharacterId;
      return `
        <div class="compact-row">
          <div>
            <strong>${escapeHtml(character.name)}</strong>
            <div class="row-meta">${escapeHtml(buildCharacterMeta(character))}</div>
          </div>
          ${isActive ? '<span class="active-badge">Ativo</span>' : ""}
        </div>
      `;
    })
    .join("");
}

function renderOverviewActiveSummary() {
  const activeCharacter = getActiveCharacter();

  if (!activeCharacter) {
    overviewActiveSummary.innerHTML = buildActionEmptyMessage("Nenhum personagem ativo.", "Cadastrar", "characters");
    return;
  }

  const progressions = getActiveProgressions();
  const hunts = getActiveHunts();
  const investments = getActiveInvestments();
  const deliveries = getVisibleDeliveryEntries();
  const latestProgress = progressions.length > 0 ? progressions[progressions.length - 1] : null;
  const huntTotals = getHuntTotals(hunts);
  const tcTotal = investments.reduce((sum, entry) => sum + entry.amount, 0);
  const deliveryTotal = deliveries.reduce((sum, entry) => sum + entry.totalValue, 0);

  overviewActiveSummary.innerHTML = `
    <div class="compact-row">
      <div>
        <strong>Progressão</strong>
        <div class="row-meta">${
          latestProgress
            ? `Último registro em ${formatDate(latestProgress.date)} no level ${latestProgress.level}`
            : "Nenhum registro manual de level"
        }</div>
      </div>
    </div>
    <div class="compact-row">
      <div>
        <strong>Investimento</strong>
        <div class="row-meta">${formatNumber(tcTotal)} TC em ${investments.length} registro${
          investments.length === 1 ? "" : "s"
        }</div>
      </div>
    </div>
    <div class="compact-row">
      <div>
        <strong>Hunts</strong>
        <div class="row-meta">${formatNumber(huntTotals.xp)} XP, ${formatNumber(
          huntTotals.balance,
        )} balance em ${hunts.length} registro${hunts.length === 1 ? "" : "s"}</div>
      </div>
    </div>
    <div class="compact-row">
      <div>
        <strong>Delivery</strong>
        <div class="row-meta">${deliveries.length}/9 itens em ${formatWeekLabel(
          getCurrentDeliveryWeek(),
        )}, custo ${formatGold(deliveryTotal)}</div>
      </div>
    </div>
  `;
}

function buildCharacterRow(character) {
  const isActive = character.id === state.activeCharacterId;

  return `
    <div class="character-row">
      <div>
        <strong>${escapeHtml(character.name)}</strong>
        <div class="row-meta">${escapeHtml(buildCharacterMeta(character))}</div>
      </div>
      <div class="character-actions">
        ${
          isActive
            ? '<span class="active-badge">Ativo</span>'
            : `<button class="secondary-action" data-action="select" data-id="${character.id}" type="button">Ativar</button>`
        }
        <button class="ghost-action" data-action="edit" data-id="${character.id}" type="button">Editar</button>
        <button class="danger-action ${
          pendingCharacterDeleteId === character.id ? "confirming" : ""
        }" data-action="delete" data-id="${character.id}" type="button">${
          pendingCharacterDeleteId === character.id ? "Confirmar" : "Remover"
        }</button>
      </div>
    </div>
  `;
}

function buildEmptyMessage(message) {
  return `<div class="compact-row"><div><strong>${message}</strong><div class="row-meta">Use o botão Novo personagem para iniciar.</div></div></div>`;
}

function buildActionEmptyMessage(message, actionLabel, tabName) {
  return `
    <div class="compact-row">
      <div>
        <strong>${message}</strong>
        <div class="row-meta">Ação sugerida para continuar.</div>
      </div>
      <button class="secondary-action" data-open-tab="${tabName}" type="button">${actionLabel}</button>
    </div>
  `;
}

function handleCharacterAction(button) {
  const character = state.characters.find((item) => item.id === button.dataset.id);
  if (!character) {
    return;
  }

  if (button.dataset.action === "select") {
    pendingCharacterDeleteId = null;
    state.activeCharacterId = character.id;
    persist();
    render();
    showToast("Personagem ativo alterado.");
    return;
  }

  if (button.dataset.action === "edit") {
    pendingCharacterDeleteId = null;
    editingCharacterId.value = character.id;
    characterName.value = character.name;
    characterLevel.value = character.level;
    characterWorld.value = character.world || "";
    characterVocation.value = character.vocation || "";
    characterFormTitle.textContent = "Editar personagem";
    cancelEdit.classList.remove("hidden");
    characterName.focus();
    return;
  }

  if (button.dataset.action === "delete") {
    if (pendingCharacterDeleteId !== character.id) {
      pendingCharacterDeleteId = character.id;
      render();
      showToast("Clique em Confirmar para remover o personagem.");
      return;
    }

    state.characters = state.characters.filter((item) => item.id !== character.id);
    state.progressions = state.progressions.filter((entry) => entry.characterId !== character.id);
    state.investments = state.investments.filter((entry) => entry.characterId !== character.id);
    state.hunts = state.hunts.filter((entry) => entry.characterId !== character.id);
    state.deliveries = state.deliveries.filter((entry) => entry.characterId !== character.id);
    if (state.activeCharacterId === character.id) {
      state.activeCharacterId = state.characters.length > 0 ? state.characters[0].id : null;
    }
    pendingCharacterDeleteId = null;
    persist();
    resetCharacterForm();
    render();
    showToast("Personagem removido.");
  }
}

function resetCharacterForm() {
  pendingCharacterDeleteId = null;
  characterForm.reset();
  editingCharacterId.value = "";
  characterFormTitle.textContent = "Novo personagem";
  cancelEdit.classList.add("hidden");
}

function resetProgressForm() {
  progressForm.reset();
  editingProgressId.value = "";
  progressFormTitle.textContent = "Novo level";
  cancelProgressEdit.classList.add("hidden");
  progressDate.value = getTodayInputValue();
  const activeCharacter = getActiveCharacter();
  progressCharacterName.value = activeCharacter ? activeCharacter.name : "Nenhum personagem ativo";
}

function resetInvestmentForm() {
  investmentForm.reset();
  editingInvestmentId.value = "";
  investmentFormTitle.textContent = "Novo investimento";
  cancelInvestmentEdit.classList.add("hidden");
  investmentDate.value = getTodayInputValue();
  const activeCharacter = getActiveCharacter();
  investmentCharacterName.value = activeCharacter ? activeCharacter.name : "Nenhum personagem ativo";
}

function setInvestmentCategoryValue(category) {
  if (!category) {
    investmentCategory.value = "";
    return;
  }

  const hasOption = Array.from(investmentCategory.options).some((option) => option.value === category);
  if (!hasOption) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    investmentCategory.appendChild(option);
  }

  investmentCategory.value = category;
}

function resetHuntForm() {
  huntForm.reset();
  editingHuntId.value = "";
  huntFormTitle.textContent = "Nova hunt";
  cancelHuntEdit.classList.add("hidden");
  huntDate.value = getTodayInputValue();
  const activeCharacter = getActiveCharacter();
  huntCharacterName.value = activeCharacter ? activeCharacter.name : "Nenhum personagem ativo";
  const soloType = document.querySelector('input[name="huntType"][value="solo"]');
  if (soloType) {
    soloType.checked = true;
  }
}

function resetDeliveryForm(options = {}) {
  const week = options.keepWeek ? deliveryWeek.value : getCurrentWeekValue();
  deliveryForm.reset();
  editingDeliveryId.value = "";
  deliveryFormTitle.textContent = "Novo custo";
  cancelDeliveryEdit.classList.add("hidden");
  deliveryWeek.value = week;
  deliveryWeekFilter.value = deliveryWeekFilter.value || week;
  const activeCharacter = getActiveCharacter();
  deliveryCharacterName.value = activeCharacter ? activeCharacter.name : "Nenhum personagem ativo";
}

function fillHuntFromAnalyzer() {
  const parsed = parseHuntAnalyzerText(huntAnalyzerRaw.value);

  if (!parsed.hasAnyValue) {
    showToast("Não encontrei dados reconhecidos no texto colado.");
    return;
  }

  if (parsed.xp !== null) {
    huntXp.value = parsed.xp;
  }
  if (parsed.loot !== null) {
    huntLoot.value = parsed.loot;
  }
  if (parsed.supplies !== null) {
    huntSupplies.value = parsed.supplies;
  }
  if (parsed.balance !== null) {
    huntBalance.value = parsed.balance;
  }
  if (parsed.sessionTime) {
    huntSessionTime.value = parsed.sessionTime;
  }
  if (parsed.date) {
    huntDate.value = parsed.date;
  }

  showToast("Campos preenchidos com o Hunt Analyzer.");
}

function renderProgress() {
  const activeCharacter = getActiveCharacter();
  const entries = getActiveProgressions();
  const firstEntry = entries[0];
  const latestEntry = entries.length > 0 ? entries[entries.length - 1] : null;

  progressCharacterName.value = activeCharacter ? activeCharacter.name : "Nenhum personagem ativo";
  saveProgress.disabled = !activeCharacter;
  progressChartHint.textContent = activeCharacter ? activeCharacter.name : "Nenhum personagem ativo";

  metricFirstLevel.textContent = firstEntry ? String(firstEntry.level) : "-";
  metricProgressCurrentLevel.textContent = latestEntry
    ? String(latestEntry.level)
    : activeCharacter
      ? String(activeCharacter.level)
      : "-";
  metricLevelsGained.textContent =
    firstEntry && latestEntry ? String(Math.max(latestEntry.level - firstEntry.level, 0)) : "-";
  metricLastProgressDate.textContent = latestEntry ? formatDate(latestEntry.date) : "-";
  progressCountLabel.textContent = `${entries.length} registro${entries.length === 1 ? "" : "s"}`;

  renderProgressChart(entries, activeCharacter);
  renderProgressTable(entries, activeCharacter);
}

function renderProgressTable(entries, activeCharacter) {
  if (!activeCharacter) {
    progressTableBody.innerHTML = `
      <tr>
        <td colspan="4">Cadastre ou selecione um personagem para lançar evolução.</td>
      </tr>
    `;
    return;
  }

  if (entries.length === 0) {
    progressTableBody.innerHTML = `
      <tr>
        <td colspan="4">Nenhum registro de level para ${escapeHtml(activeCharacter.name)}. Use o formulário ao lado para registrar o primeiro level.</td>
      </tr>
    `;
    return;
  }

  progressTableBody.innerHTML = entries
    .slice()
    .reverse()
    .map(
      (entry) => `
        <tr>
          <td>${formatDate(entry.date)}</td>
          <td>${entry.level}</td>
          <td>${entry.note ? escapeHtml(entry.note) : '<span class="muted">Sem observação</span>'}</td>
          <td>
            <div class="table-actions">
              <button class="ghost-action" data-progress-action="edit" data-id="${entry.id}" type="button">Editar</button>
              <button class="danger-action ${
                pendingProgressDeleteId === entry.id ? "confirming" : ""
              }" data-progress-action="delete" data-id="${entry.id}" type="button">${
                pendingProgressDeleteId === entry.id ? "Confirmar" : "Remover"
              }</button>
            </div>
          </td>
        </tr>
      `,
    )
    .join("");

  progressTableBody.querySelectorAll("[data-progress-action]").forEach((button) => {
    button.addEventListener("click", () => handleProgressAction(button));
  });
}

function renderProgressChart(entries, activeCharacter) {
  if (!activeCharacter) {
    progressChart.innerHTML = '<div class="chart-empty">Selecione um personagem para visualizar o gráfico.</div>';
    return;
  }

  if (entries.length === 0) {
    progressChart.innerHTML =
      '<div class="chart-empty">Registre o primeiro level para iniciar a linha de progressão.</div>';
    return;
  }

  const width = 760;
  const height = 280;
  const padding = { top: 28, right: 28, bottom: 42, left: 54 };
  const levels = entries.map((entry) => entry.level);
  const minLevel = Math.min(...levels);
  const maxLevel = Math.max(...levels);
  const levelRange = Math.max(maxLevel - minLevel, 1);
  const xStep = entries.length > 1 ? (width - padding.left - padding.right) / (entries.length - 1) : 0;

  const points = entries.map((entry, index) => {
    const x = entries.length > 1 ? padding.left + xStep * index : width / 2;
    const y =
      height -
      padding.bottom -
      ((entry.level - minLevel) / levelRange) * (height - padding.top - padding.bottom);
    return { ...entry, x, y };
  });

  const polyline = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area =
    points.length > 1
      ? `${padding.left},${height - padding.bottom} ${polyline} ${
          width - padding.right
        },${height - padding.bottom}`
      : "";

  progressChart.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Gráfico de level ao longo do tempo">
      <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${
        height - padding.bottom
      }" stroke="#3e3829" />
      <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${
        width - padding.right
      }" y2="${height - padding.bottom}" stroke="#3e3829" />
      ${
        area
          ? `<polygon points="${area}" fill="rgba(214, 168, 70, 0.12)" stroke="none"></polygon>`
          : ""
      }
      <polyline points="${polyline}" fill="none" stroke="#d6a846" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></polyline>
      ${points
        .map(
          (point) =>
            `<circle cx="${point.x}" cy="${point.y}" r="5" fill="#d6a846"><title>${formatDate(
              point.date,
            )}: level ${point.level}</title></circle>`,
        )
        .join("")}
      <text class="chart-label" x="${padding.left}" y="20">Level ${maxLevel}</text>
      <text class="chart-label" x="${padding.left}" y="${height - 14}">Level ${minLevel}</text>
      <text class="chart-label" x="${width - padding.right - 92}" y="${
        height - 14
      }">${formatDate(entries[entries.length - 1].date)}</text>
    </svg>
  `;
}

function handleProgressAction(button) {
  const entry = state.progressions.find((item) => item.id === button.dataset.id);
  if (!entry) {
    return;
  }

  if (button.dataset.progressAction === "edit") {
    pendingProgressDeleteId = null;
    editingProgressId.value = entry.id;
    progressDate.value = entry.date;
    progressLevel.value = entry.level;
    progressNote.value = entry.note || "";
    progressFormTitle.textContent = "Editar level";
    cancelProgressEdit.classList.remove("hidden");
    progressDate.focus();
    return;
  }

  if (button.dataset.progressAction === "delete") {
    if (pendingProgressDeleteId !== entry.id) {
      pendingProgressDeleteId = entry.id;
      renderProgress();
      showToast("Clique em Confirmar para remover o registro.");
      return;
    }

    state.progressions = state.progressions.filter((item) => item.id !== entry.id);
    pendingProgressDeleteId = null;
    syncCharacterLevel(entry.characterId);
    persist();
    resetProgressForm();
    render();
    showToast("Registro de level removido.");
  }
}

function renderInvestments() {
  const activeCharacter = getActiveCharacter();
  const entries = getActiveInvestments();
  const totalActive = sumInvestmentsForCharacter(activeCharacter ? activeCharacter.id : null);
  const totalGeneral = state.investments.reduce((sum, entry) => sum + entry.amount, 0);

  investmentCharacterName.value = activeCharacter ? activeCharacter.name : "Nenhum personagem ativo";
  saveInvestment.disabled = !activeCharacter;
  metricActiveInvestmentTc.textContent = formatNumber(totalActive);
  metricTotalInvestmentTc.textContent = formatNumber(totalGeneral);
  metricInvestmentCount.textContent = String(entries.length);
  investmentCountLabel.textContent = `${entries.length} registro${entries.length === 1 ? "" : "s"}`;

  renderInvestmentTable(entries, activeCharacter);
}

function renderInvestmentTable(entries, activeCharacter) {
  if (!activeCharacter) {
    investmentTableBody.innerHTML = `
      <tr>
        <td colspan="5">Cadastre ou selecione um personagem para lançar investimentos.</td>
      </tr>
    `;
    return;
  }

  if (entries.length === 0) {
    investmentTableBody.innerHTML = `
      <tr>
        <td colspan="5">Nenhum investimento registrado para ${escapeHtml(activeCharacter.name)}. Use o formulário ao lado para registrar o primeiro gasto em TC.</td>
      </tr>
    `;
    return;
  }

  investmentTableBody.innerHTML = entries
    .slice()
    .reverse()
    .map(
      (entry) => `
        <tr>
          <td>${formatDate(entry.date)}</td>
          <td>${formatNumber(entry.amount)}</td>
          <td>${entry.category ? escapeHtml(entry.category) : '<span class="muted">Sem categoria</span>'}</td>
          <td>${entry.note ? escapeHtml(entry.note) : '<span class="muted">Sem observação</span>'}</td>
          <td>
            <div class="table-actions">
              <button class="ghost-action" data-investment-action="edit" data-id="${entry.id}" type="button">Editar</button>
              <button class="danger-action ${
                pendingInvestmentDeleteId === entry.id ? "confirming" : ""
              }" data-investment-action="delete" data-id="${entry.id}" type="button">${
                pendingInvestmentDeleteId === entry.id ? "Confirmar" : "Remover"
              }</button>
            </div>
          </td>
        </tr>
      `,
    )
    .join("");

  investmentTableBody.querySelectorAll("[data-investment-action]").forEach((button) => {
    button.addEventListener("click", () => handleInvestmentAction(button));
  });
}

function handleInvestmentAction(button) {
  const entry = state.investments.find((item) => item.id === button.dataset.id);
  if (!entry) {
    return;
  }

  if (button.dataset.investmentAction === "edit") {
    pendingInvestmentDeleteId = null;
    editingInvestmentId.value = entry.id;
    investmentDate.value = entry.date;
    investmentAmount.value = entry.amount;
    setInvestmentCategoryValue(entry.category || "");
    investmentNote.value = entry.note || "";
    investmentFormTitle.textContent = "Editar investimento";
    cancelInvestmentEdit.classList.remove("hidden");
    investmentDate.focus();
    return;
  }

  if (button.dataset.investmentAction === "delete") {
    if (pendingInvestmentDeleteId !== entry.id) {
      pendingInvestmentDeleteId = entry.id;
      renderInvestments();
      showToast("Clique em Confirmar para remover o investimento.");
      return;
    }

    state.investments = state.investments.filter((item) => item.id !== entry.id);
    pendingInvestmentDeleteId = null;
    persist();
    resetInvestmentForm();
    render();
    showToast("Investimento removido.");
  }
}

function renderHunts() {
  const activeCharacter = getActiveCharacter();
  const entries = getActiveHunts();
  const totals = getHuntTotals(entries);

  huntCharacterName.value = activeCharacter ? activeCharacter.name : "Nenhum personagem ativo";
  saveHunt.disabled = !activeCharacter;
  metricHuntXp.textContent = formatNumber(totals.xp);
  metricHuntBalance.textContent = formatNumber(totals.balance);
  metricHuntLoot.textContent = formatNumber(totals.loot);
  metricHuntSupplies.textContent = formatNumber(totals.supplies);
  huntCountLabel.textContent = `${entries.length} registro${entries.length === 1 ? "" : "s"}`;

  renderHuntTable(entries, activeCharacter);
}

function renderDelivery() {
  const activeCharacter = getActiveCharacter();
  const visibleWeek = getCurrentDeliveryWeek();
  const entries = getVisibleDeliveryEntries();
  const total = entries.reduce((sum, entry) => sum + entry.totalValue, 0);
  const averages = getDeliveryAverages(entries);

  deliveryWeekFilter.value = visibleWeek;
  if (!deliveryWeek.value) {
    deliveryWeek.value = visibleWeek;
  }
  deliveryCharacterName.value = activeCharacter ? activeCharacter.name : "Nenhum personagem ativo";
  saveDelivery.disabled = !activeCharacter;

  metricDeliveryWeek.textContent = formatWeekLabel(visibleWeek);
  metricDeliveryItems.textContent = `${entries.length}/9`;
  metricDeliveryTotal.textContent = formatGold(total);
  deliveryAverageCountLabel.textContent = `${averages.length} produto${averages.length === 1 ? "" : "s"}`;

  renderDeliveryTable(entries, activeCharacter);
  renderDeliveryAverageTable(averages);
}

function renderDeliveryTable(entries, activeCharacter) {
  if (!activeCharacter) {
    deliveryTableBody.innerHTML = `
      <tr>
        <td colspan="5">Cadastre ou selecione um personagem para lançar delivery.</td>
      </tr>
    `;
    return;
  }

  if (entries.length === 0) {
    deliveryTableBody.innerHTML = `
      <tr>
        <td colspan="5">Nenhum custo cadastrado para ${escapeHtml(activeCharacter.name)} em ${formatWeekLabel(
          getCurrentDeliveryWeek(),
        )}. Cadastre os produtos da semana no formulário ao lado.</td>
      </tr>
    `;
    return;
  }

  deliveryTableBody.innerHTML = entries
    .map(
      (entry) => `
        <tr>
          <td>${escapeHtml(entry.product)}</td>
          <td>${formatNumber(entry.quantity)}</td>
          <td>${formatGold(entry.totalValue)}</td>
          <td>${formatGold(getDeliveryAverage(entry))}</td>
          <td>
            <div class="table-actions">
              <button class="ghost-action" data-delivery-action="edit" data-id="${entry.id}" type="button">Editar</button>
              <button class="danger-action ${
                pendingDeliveryDeleteId === entry.id ? "confirming" : ""
              }" data-delivery-action="delete" data-id="${entry.id}" type="button">${
                pendingDeliveryDeleteId === entry.id ? "Confirmar" : "Remover"
              }</button>
            </div>
          </td>
        </tr>
      `,
    )
    .join("");

  deliveryTableBody.querySelectorAll("[data-delivery-action]").forEach((button) => {
    button.addEventListener("click", () => handleDeliveryAction(button));
  });
}

function renderDeliveryAverageTable(averages) {
  if (averages.length === 0) {
    deliveryAverageTableBody.innerHTML = `
      <tr>
        <td colspan="4">As médias aparecem após cadastrar produtos nesta semana.</td>
      </tr>
    `;
    return;
  }

  deliveryAverageTableBody.innerHTML = averages
    .map(
      (entry) => `
        <tr>
          <td>${escapeHtml(entry.product)}</td>
          <td>${formatNumber(entry.quantity)}</td>
          <td>${formatGold(entry.totalValue)}</td>
          <td>${formatGold(entry.average)}</td>
        </tr>
      `,
    )
    .join("");
}

function handleDeliveryAction(button) {
  const entry = state.deliveries.find((item) => item.id === button.dataset.id);
  if (!entry) {
    return;
  }

  if (button.dataset.deliveryAction === "edit") {
    pendingDeliveryDeleteId = null;
    editingDeliveryId.value = entry.id;
    deliveryWeek.value = entry.week;
    deliveryWeekFilter.value = entry.week;
    deliveryProduct.value = entry.product;
    deliveryQuantity.value = entry.quantity;
    deliveryTotalValue.value = entry.totalValue;
    deliveryFormTitle.textContent = "Editar custo";
    cancelDeliveryEdit.classList.remove("hidden");
    deliveryProduct.focus();
    return;
  }

  if (button.dataset.deliveryAction === "delete") {
    if (pendingDeliveryDeleteId !== entry.id) {
      pendingDeliveryDeleteId = entry.id;
      renderDelivery();
      showToast("Clique em Confirmar para remover o custo.");
      return;
    }

    state.deliveries = state.deliveries.filter((item) => item.id !== entry.id);
    pendingDeliveryDeleteId = null;
    persist();
    resetDeliveryForm({ keepWeek: true });
    render();
    showToast("Custo de delivery removido.");
  }
}

function renderHuntTable(entries, activeCharacter) {
  if (!activeCharacter) {
    huntTableBody.innerHTML = `
      <tr>
        <td colspan="9">Cadastre ou selecione um personagem para lançar hunts.</td>
      </tr>
    `;
    return;
  }

  if (entries.length === 0) {
    huntTableBody.innerHTML = `
      <tr>
        <td colspan="9">Nenhuma hunt registrada para ${escapeHtml(activeCharacter.name)}. Cole o Hunt Analyzer ou preencha os campos manualmente.</td>
      </tr>
    `;
    return;
  }

  huntTableBody.innerHTML = entries
    .slice()
    .reverse()
    .map(
      (entry) => `
        <tr>
          <td>${formatDate(entry.date)}</td>
          <td>${entry.hunt ? escapeHtml(entry.hunt) : '<span class="muted">Sem nome</span>'}</td>
          <td>${formatHuntType(entry.type)}</td>
          <td>${formatNumber(entry.xp)}</td>
          <td>${formatNumber(entry.loot)}</td>
          <td>${formatNumber(entry.supplies)}</td>
          <td>${formatNumber(entry.balance)}</td>
          <td>${escapeHtml(entry.sessionTime)}</td>
          <td>
            <div class="table-actions">
              <button class="ghost-action" data-hunt-action="edit" data-id="${entry.id}" type="button">Editar</button>
              <button class="danger-action ${
                pendingHuntDeleteId === entry.id ? "confirming" : ""
              }" data-hunt-action="delete" data-id="${entry.id}" type="button">${
                pendingHuntDeleteId === entry.id ? "Confirmar" : "Remover"
              }</button>
            </div>
          </td>
        </tr>
      `,
    )
    .join("");

  huntTableBody.querySelectorAll("[data-hunt-action]").forEach((button) => {
    button.addEventListener("click", () => handleHuntAction(button));
  });
}

function handleHuntAction(button) {
  const entry = state.hunts.find((item) => item.id === button.dataset.id);
  if (!entry) {
    return;
  }

  if (button.dataset.huntAction === "edit") {
    pendingHuntDeleteId = null;
    editingHuntId.value = entry.id;
    huntDate.value = entry.date;
    huntLevel.value = entry.level || "";
    huntName.value = entry.hunt || "";
    huntXp.value = entry.xp;
    huntLoot.value = entry.loot;
    huntSupplies.value = entry.supplies;
    huntBalance.value = entry.balance;
    huntSessionTime.value = entry.sessionTime;
    huntNote.value = entry.note || "";
    const typeInput = document.querySelector(`input[name="huntType"][value="${entry.type}"]`);
    if (typeInput) {
      typeInput.checked = true;
    }
    huntFormTitle.textContent = "Editar hunt";
    cancelHuntEdit.classList.remove("hidden");
    huntDate.focus();
    return;
  }

  if (button.dataset.huntAction === "delete") {
    if (pendingHuntDeleteId !== entry.id) {
      pendingHuntDeleteId = entry.id;
      renderHunts();
      showToast("Clique em Confirmar para remover a hunt.");
      return;
    }

    state.hunts = state.hunts.filter((item) => item.id !== entry.id);
    pendingHuntDeleteId = null;
    persist();
    resetHuntForm();
    render();
    showToast("Hunt removida.");
  }
}

function getActiveHunts() {
  const activeCharacter = getActiveCharacter();
  if (!activeCharacter) {
    return [];
  }

  return state.hunts
    .filter((entry) => entry.characterId === activeCharacter.id)
    .sort((first, second) => first.date.localeCompare(second.date));
}

function getCurrentDeliveryWeek() {
  return deliveryWeekFilter.value || deliveryWeek.value || getCurrentWeekValue();
}

function getVisibleDeliveryEntries() {
  const visibleWeek = getCurrentDeliveryWeek();
  const activeCharacter = getActiveCharacter();
  if (!activeCharacter) {
    return [];
  }

  return state.deliveries
    .filter((entry) => entry.week === visibleWeek && entry.characterId === activeCharacter.id)
    .sort((first, second) => first.product.localeCompare(second.product));
}

function getDeliveryAverage(entry) {
  return entry.quantity > 0 ? entry.totalValue / entry.quantity : 0;
}

function getDeliveryAverages(entries) {
  const grouped = entries.reduce((acc, entry) => {
    const key = entry.product.trim().toLowerCase();
    if (!acc[key]) {
      acc[key] = { product: entry.product, quantity: 0, totalValue: 0 };
    }
    acc[key].quantity += entry.quantity;
    acc[key].totalValue += entry.totalValue;
    return acc;
  }, {});

  return Object.values(grouped)
    .map((entry) => ({
      ...entry,
      average: entry.quantity > 0 ? entry.totalValue / entry.quantity : 0,
    }))
    .sort((first, second) => first.product.localeCompare(second.product));
}

function getActiveProgressions() {
  const activeCharacter = getActiveCharacter();
  if (!activeCharacter) {
    return [];
  }

  return state.progressions
    .filter((entry) => entry.characterId === activeCharacter.id)
    .sort((first, second) => first.date.localeCompare(second.date));
}

function getActiveInvestments() {
  const activeCharacter = getActiveCharacter();
  if (!activeCharacter) {
    return [];
  }

  return state.investments
    .filter((entry) => entry.characterId === activeCharacter.id)
    .sort((first, second) => first.date.localeCompare(second.date));
}

function sumInvestmentsForCharacter(characterId) {
  if (!characterId) {
    return 0;
  }

  return state.investments
    .filter((entry) => entry.characterId === characterId)
    .reduce((sum, entry) => sum + entry.amount, 0);
}

function getSelectedHuntType() {
  const selectedType = document.querySelector('input[name="huntType"]:checked');
  return selectedType ? selectedType.value : "solo";
}

function getHuntTotals(entries) {
  return entries.reduce(
    (acc, entry) => ({
      xp: acc.xp + entry.xp,
      balance: acc.balance + entry.balance,
      loot: acc.loot + entry.loot,
      supplies: acc.supplies + entry.supplies,
    }),
    { xp: 0, balance: 0, loot: 0, supplies: 0 },
  );
}

function parseHuntAnalyzerText(rawText) {
  const text = String(rawText || "").replace(/\r/g, "");
  const xp = extractAnalyzerNumber(text, [
    /(?:xp\s*(?:gain|gained|obtida)?|experience\s*(?:gain|gained)?)[^\d-]*(-?[\d.,]+)/i,
  ]);
  const loot = extractAnalyzerNumber(text, [/loot[^\d-]*(-?[\d.,]+)/i]);
  const supplies = extractAnalyzerNumber(text, [/(?:supplies|supply|gastos?)[^\d-]*(-?[\d.,]+)/i]);
  const balance = extractAnalyzerNumber(text, [/(?:balance|balan[çc]o)[^\d-]*(-?[\d.,]+)/i]);
  const sessionTime = extractAnalyzerText(text, [
    /(?:^|\n)(?:session|session\s*time|tempo\s*de\s*sess[ãa]o|tempo)\s*:[^\d]*(\d{1,2}:\d{2}(?::\d{2})?\s*h?)/i,
    /(?:^|\n)(?:session|session\s*time|tempo\s*de\s*sess[ãa]o|tempo)\s*:[^\d]*(\d+\s*h(?:\s*\d+\s*m)?)/i,
  ]);
  const date = extractAnalyzerText(text, [
    /session\s*data\s*:\s*from\s*(\d{4}-\d{2}-\d{2})/i,
    /(?:^|\n)data\s*:\s*(\d{4}-\d{2}-\d{2})/i,
  ]);

  return {
    xp,
    loot,
    supplies,
    balance,
    sessionTime,
    date,
    hasAnyValue: [xp, loot, supplies, balance, sessionTime, date].some(
      (value) => value !== null && value !== "",
    ),
  };
}

function extractAnalyzerNumber(text, patterns) {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return parseAnalyzerNumber(match[1]);
    }
  }
  return null;
}

function extractAnalyzerText(text, patterns) {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }
  return "";
}

function parseAnalyzerNumber(value) {
  const normalized = String(value || "").replace(/[.,]/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function exportStateBackup() {
  const payload = {
    exportedAt: new Date().toISOString(),
    app: "tibia-dashboard",
    version: 1,
    data: state,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `tibia-dashboard-backup-${getTodayInputValue()}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("Backup exportado.");
}

function importStateBackup(event) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const parsed = JSON.parse(reader.result);
      const importedState = normalizeImportedState(parsed.data || parsed);
      Object.assign(state, importedState);
      persist();
      resetCharacterForm();
      resetProgressForm();
      resetInvestmentForm();
      resetHuntForm();
      render();
      showToast("Backup importado.");
    } catch {
      showToast("Arquivo de backup inválido.");
    } finally {
      backupFile.value = "";
    }
  });
  reader.readAsText(file);
}

function normalizeImportedState(value) {
  return {
    activeCharacterId: value && value.activeCharacterId ? value.activeCharacterId : null,
    characters: value && Array.isArray(value.characters) ? value.characters : [],
    progressions: value && Array.isArray(value.progressions) ? value.progressions : [],
    investments: value && Array.isArray(value.investments) ? value.investments : [],
    hunts: value && Array.isArray(value.hunts) ? value.hunts : [],
    deliveries: value && Array.isArray(value.deliveries) ? value.deliveries : [],
  };
}

function syncCharacterLevel(characterId) {
  const latestEntry = state.progressions
    .filter((entry) => entry.characterId === characterId)
    .sort((first, second) => first.date.localeCompare(second.date))
    .slice(-1)[0];

  if (!latestEntry) {
    return;
  }

  state.characters = state.characters.map((character) =>
    character.id === characterId
      ? { ...character, level: latestEntry.level, updatedAt: new Date().toISOString() }
      : character,
  );
}

function getActiveCharacter() {
  return state.characters.find((character) => character.id === state.activeCharacterId) || null;
}

function buildCharacterMeta(character) {
  const details = [`Level ${character.level}`];
  if (character.vocation) {
    details.push(character.vocation);
  }
  if (character.world) {
    details.push(character.world);
  }
  return details.join(" · ");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createId() {
  if (globalThis.crypto && globalThis.crypto.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `character-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createEmptyState() {
  return {
    activeCharacterId: null,
    characters: [],
    progressions: [],
    investments: [],
    hunts: [],
    deliveries: [],
  };
}

function getTodayInputValue() {
  return new Date().toISOString().slice(0, 10);
}

function getCurrentWeekValue() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const weekOne = new Date(date.getFullYear(), 0, 4);
  const week = 1 + Math.round(((date - weekOne) / 86400000 - 3 + ((weekOne.getDay() + 6) % 7)) / 7);
  return `${date.getFullYear()}-W${String(week).padStart(2, "0")}`;
}

function formatDate(value) {
  if (!value) {
    return "-";
  }

  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

function formatNumber(value) {
  return new Intl.NumberFormat("pt-BR").format(value || 0);
}

function formatGold(value) {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value || 0);
}

function formatWeekLabel(value) {
  if (!value) {
    return "-";
  }

  const [year, week] = value.split("-W");
  return `Semana ${week}/${year}`;
}

function formatHuntType(value) {
  const labels = { solo: "Solo", duo: "Duo", party: "Party" };
  return labels[value] || "Solo";
}

let toastTimeout;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2200);
}

render();
resetProgressForm();
resetInvestmentForm();
resetHuntForm();
resetDeliveryForm();
restoreLastTab();
