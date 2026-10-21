-- Лучший результат пользователя по каждой теме и уровню.
-- Выполнить один раз: Supabase Dashboard → SQL Editor → вставить файл → Run.

create table if not exists public.quiz_progress (
  user_id    uuid        not null references auth.users (id) on delete cascade,
  topic      text        not null,
  level      text        not null,
  correct    integer     not null,
  total      integer     not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, topic, level),
  constraint quiz_progress_topic check (topic in ('layout', 'javascript', 'react', 'nextjs', 'typescript', 'patterns', 'system-design')),
  constraint quiz_progress_level check (level in ('junior', 'middle', 'senior')),
  constraint quiz_progress_score check (total > 0 and correct between 0 and total)
);

-- Клиент ходит в базу напрямую с publishable-ключом, поэтому доступ ограничивает RLS:
-- каждый видит и меняет только свои строки.
alter table public.quiz_progress enable row level security;

drop policy if exists "own progress: select" on public.quiz_progress;
create policy "own progress: select" on public.quiz_progress
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "own progress: insert" on public.quiz_progress;
create policy "own progress: insert" on public.quiz_progress
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "own progress: update" on public.quiz_progress;
create policy "own progress: update" on public.quiz_progress
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

-- Сохраняет пачку результатов [{topic, level, correct, total}], оставляя по каждой паре лучший
-- (по доле правильных ответов). Сравнение внутри ON CONFLICT, поэтому одновременные
-- сохранения с двух устройств не затирают лучший результат худшим.
-- Строки с неизвестной темой или некорректным счётом молча пропускаются.
create or replace function public.save_best_scores(scores jsonb)
returns void
language sql
security invoker
set search_path = ''
as $$
  insert into public.quiz_progress as p (user_id, topic, level, correct, total)
  select auth.uid(), s.topic, s.level, s.correct, s.total
  from jsonb_to_recordset(scores) as s (topic text, level text, correct integer, total integer)
  where auth.uid() is not null
    and s.topic in ('layout', 'javascript', 'react', 'nextjs', 'typescript', 'patterns', 'system-design')
    and s.level in ('junior', 'middle', 'senior')
    and s.total > 0 and s.correct between 0 and s.total
  on conflict (user_id, topic, level) do update
    set correct = excluded.correct, total = excluded.total, updated_at = now()
    where excluded.correct::numeric / excluded.total > p.correct::numeric / p.total;
$$;

revoke execute on function public.save_best_scores(jsonb) from public, anon;
grant execute on function public.save_best_scores(jsonb) to authenticated;
