create extension if not exists pgcrypto;
create extension if not exists pg_graphql;

create type public.issue_status as enum (
  'todo',
  'in_progress',
  'done'
);

create type public.issue_priority as enum (
  'low',
  'medium',
  'high'
);

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  avatar_url text
);

create table if not exists public.issues (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  status public.issue_status not null,
  priority public.issue_priority not null,
  assignee_id uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  issue_id uuid not null references public.issues(id) on delete cascade,
  body text not null,
  author_id uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.labels (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  color text not null
);

create table if not exists public.issue_labels (
  issue_id uuid not null references public.issues(id) on delete cascade,
  label_id uuid not null references public.labels(id) on delete cascade,
  primary key (issue_id, label_id)
);

create index if not exists issues_assignee_id_idx
  on public.issues (assignee_id);

create index if not exists issues_created_at_idx
  on public.issues (created_at desc);

create index if not exists issues_status_idx
  on public.issues (status);

create index if not exists issues_priority_idx
  on public.issues (priority);

create index if not exists comments_issue_id_idx
  on public.comments (issue_id);

create index if not exists comments_created_at_idx
  on public.comments (created_at asc);

create index if not exists issue_labels_issue_id_idx
  on public.issue_labels (issue_id);

create index if not exists issue_labels_label_id_idx
  on public.issue_labels (label_id);

comment on table public.comments is
e'@graphql({
  "totalCount": { "enabled": true },
  "aggregate": { "enabled": true }
})';

-- Sometimes this is easier to run manually after the main schema.
-- It can fail on reruns if `public.issues` is already part of the
-- `supabase_realtime` publication, or if the current environment does not
-- expose that publication in the same way.
alter publication supabase_realtime add table public.issues;
