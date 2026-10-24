-- Run this in Supabase Dashboard > SQL Editor.
-- Each learner can read and change only their own progress row.
create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_progress enable row level security;

drop policy if exists "Learners can read their own progress" on public.user_progress;
create policy "Learners can read their own progress"
  on public.user_progress for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Learners can insert their own progress" on public.user_progress;
create policy "Learners can insert their own progress"
  on public.user_progress for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Learners can update their own progress" on public.user_progress;
create policy "Learners can update their own progress"
  on public.user_progress for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create or replace function public.set_user_progress_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists user_progress_updated_at on public.user_progress;
create trigger user_progress_updated_at
before update on public.user_progress
for each row execute procedure public.set_user_progress_updated_at();
