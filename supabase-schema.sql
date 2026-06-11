create table if not exists public.characters (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  name text not null,
  level integer not null,
  world text default '',
  vocation text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.progressions (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  character_id text not null,
  date date not null,
  level integer not null,
  note text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.investments (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  character_id text not null,
  date date not null,
  amount integer not null,
  category text default '',
  note text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.hunts (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  character_id text not null,
  date date not null,
  hunt text default '',
  type text default 'solo',
  level text default '',
  xp integer not null default 0,
  loot integer not null default 0,
  supplies integer not null default 0,
  balance integer not null default 0,
  session_time text not null default '',
  note text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.deliveries (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  character_id text not null,
  week text not null,
  product text not null,
  quantity integer not null,
  total_value numeric not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.characters enable row level security;
alter table public.progressions enable row level security;
alter table public.investments enable row level security;
alter table public.hunts enable row level security;
alter table public.deliveries enable row level security;

drop policy if exists "characters_owner_all" on public.characters;
drop policy if exists "progressions_owner_all" on public.progressions;
drop policy if exists "investments_owner_all" on public.investments;
drop policy if exists "hunts_owner_all" on public.hunts;
drop policy if exists "deliveries_owner_all" on public.deliveries;

create policy "characters_owner_all" on public.characters
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "progressions_owner_all" on public.progressions
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "investments_owner_all" on public.investments
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "hunts_owner_all" on public.hunts
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "deliveries_owner_all" on public.deliveries
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
