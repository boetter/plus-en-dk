-- Run this once in Supabase's SQL editor. Enable anonymous sign-ins under
-- Authentication → Providers → Anonymous before using the app.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique check (username ~ '^[a-z0-9][a-z0-9-]{1,30}$'),
  display_name text not null check (char_length(display_name) between 1 and 40),
  created_at timestamptz not null default now()
);

create table if not exists public.rsvps (
  user_id uuid not null references public.profiles(id) on delete cascade,
  concert_id text not null,
  type text not null check (type in ('going', 'maybe')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, concert_id)
);

alter table public.profiles enable row level security;
alter table public.rsvps enable row level security;

create policy "Profiles are publicly readable" on public.profiles for select using (true);
create policy "Users create their profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users update their profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "RSVPs are publicly readable" on public.rsvps for select using (true);
create policy "Users create their RSVPs" on public.rsvps for insert with check (auth.uid() = user_id);
create policy "Users update their RSVPs" on public.rsvps for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users delete their RSVPs" on public.rsvps for delete using (auth.uid() = user_id);

create index if not exists rsvps_user_id_idx on public.rsvps(user_id);
