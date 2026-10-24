-- Обратная связь: баги и предложения из формы в футере.
-- Выполнить один раз: Supabase Dashboard → SQL Editor → вставить файл → Run.
-- Читать отзывы: Table Editor → feedback (через API их не может прочитать никто).

create table if not exists public.feedback (
  id         bigint      generated always as identity primary key,
  created_at timestamptz not null default now(),
  kind       text        not null,
  message    text        not null,
  email      text,
  locale     text,
  page       text,
  -- Заполняется автоматически для вошедших пользователей; подменить нельзя (см. политику)
  user_id    uuid        default auth.uid() references auth.users (id) on delete set null,
  constraint feedback_kind check (kind in ('bug', 'idea')),
  constraint feedback_message check (char_length(btrim(message)) between 5 and 2000),
  constraint feedback_email check (email is null or (char_length(email) <= 200 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$')),
  constraint feedback_locale check (locale is null or char_length(locale) <= 10),
  constraint feedback_page check (page is null or char_length(page) <= 300)
);

-- Писать могут и гости, и вошедшие пользователи; политик на чтение, изменение и удаление нет,
-- поэтому через API отзывы недоступны — только в Dashboard.
alter table public.feedback enable row level security;

drop policy if exists "anyone can send feedback" on public.feedback;
create policy "anyone can send feedback" on public.feedback
  for insert to anon, authenticated
  with check (user_id is not distinct from (select auth.uid()));

revoke all on public.feedback from anon, authenticated;
grant insert (kind, message, email, locale, page) on public.feedback to anon, authenticated;

-- Защита от флуда: не больше 20 отзывов в минуту на весь сайт.
create or replace function public.feedback_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select count(*) from public.feedback where created_at > now() - interval '1 minute') >= 20 then
    raise exception 'feedback rate limit exceeded' using errcode = 'P0001';
  end if;
  return new;
end;
$$;

revoke execute on function public.feedback_rate_limit() from public, anon, authenticated;

drop trigger if exists feedback_rate_limit on public.feedback;
create trigger feedback_rate_limit
  before insert on public.feedback
  for each row execute function public.feedback_rate_limit();
