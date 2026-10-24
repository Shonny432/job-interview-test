-- Добавляет тему state-management в список разрешённых тем.
-- Выполнить один раз после 0001: Supabase Dashboard → SQL Editor → вставить файл → Run.

alter table public.quiz_progress drop constraint if exists quiz_progress_topic;
alter table public.quiz_progress add constraint quiz_progress_topic
  check (topic in ('layout', 'javascript', 'react', 'state-management', 'nextjs', 'typescript', 'patterns', 'system-design'));

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
    and s.topic in ('layout', 'javascript', 'react', 'state-management', 'nextjs', 'typescript', 'patterns', 'system-design')
    and s.level in ('junior', 'middle', 'senior')
    and s.total > 0 and s.correct between 0 and s.total
  on conflict (user_id, topic, level) do update
    set correct = excluded.correct, total = excluded.total, updated_at = now()
    where excluded.correct::numeric / excluded.total > p.correct::numeric / p.total;
$$;

revoke execute on function public.save_best_scores(jsonb) from public, anon;
grant execute on function public.save_best_scores(jsonb) to authenticated;
