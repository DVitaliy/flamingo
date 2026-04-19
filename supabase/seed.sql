insert into public.users (name, avatar_url)
values
  ('Olivia Carter (Project Manager)', 'https://i.pravatar.cc/150?img=11'),
  ('Daniel Kim (Developer)', 'https://i.pravatar.cc/150?img=12'),
  ('Sophia Lee (QA Engineer)', 'https://i.pravatar.cc/150?img=13')
on conflict do nothing;

insert into public.labels (name, color)
values
  ('relay', '#7c3aed'),
  ('pg_graphql', '#2563eb'),
  ('filters', '#0f766e'),
  ('pagination', '#ea580c'),
  ('realtime', '#16a34a'),
  ('ux', '#db2777'),
  ('bug', '#dc2626'),
  ('enhancement', '#0284c7'),
  ('documentation', '#64748b'),
  ('testing', '#0891b2'),
  ('sorting', '#9333ea'),
  ('assignee', '#ca8a04')
on conflict (name) do nothing;

insert into public.issues (
  title,
  description,
  status,
  priority,
  assignee_id
)
select
  seed.title,
  seed.description,
  seed.status::public.issue_status,
  seed.priority::public.issue_priority,
  u.id
from (
  values
    (
      'Support label filtering in issue list',
      'The take-home requires multi-select filtering by labels, but the reflected pg_graphql schema does not currently expose a relation-based filter on issuesCollection for the many-to-many link through issue_labels. A follow-up should evaluate whether this should be solved through a read-optimized field, a SQL view, or a dedicated function.',
      'todo',
      'high',
      'Daniel Kim (Developer)'
    ),
    (
      'Verify realtime list behavior with paginated issue feed',
      'I did not have enough time to fully test how realtime updates should behave when the issue list contains many records and the user is currently viewing a later cursor page. We need to verify what happens when a new issue is inserted while the user is not on the first page, and adjust the UX if the resulting behavior is confusing or inconsistent.',
      'todo',
      'high',
      'Sophia Lee (QA Engineer)'
    ),
    (
      'Add explicit sorting and assignee filtering to issue list',
      'Sorting is not explicitly required by the take-home, but the issue list would feel more complete with an explicit sort order and an additional filter by assignee. This would also make it easier to inspect issues assigned to a specific person and keep the list predictable when new items appear.',
      'todo',
      'medium',
      'Daniel Kim (Developer)'
    ),
    (
      'Improve comments UX with notifications about newly added replies',
      'If more time were available, I would improve the comments experience by notifying the user when a new comment is added while they are already on the issue page, and offering a clear action to refresh or reveal the new comments in the thread. This is mainly a UX enhancement idea from a product perspective.',
      'todo',
      'medium',
      'Olivia Carter (Project Manager)'
    ),
    (
      'Stabilize SSR filters driven by query params',
      'The issue list uses SSR plus query-param driven filters. Navigation bugs were observed during client-side transitions, and the implementation should keep the list stable while preserving server-rendered filtering.',
      'done',
      'medium',
      'Sophia Lee (QA Engineer)'
    )
) as seed(title, description, status, priority, assignee_name)
join public.users u on u.name = seed.assignee_name
where not exists (
  select 1
  from public.issues i
  where i.title = seed.title
);

insert into public.comments (issue_id, body, author_id)
select
  i.id,
  seed.body,
  u.id
from (
  values
    (
      'Support label filtering in issue list',
      'I confirmed that issuesCollection exposes issue_labelsCollection for reading, but issuesFilter does not expose a relation filter for that link.',
      'Daniel Kim (Developer)'
    ),
    (
      'Support label filtering in issue list',
      'If schema changes are allowed, a denormalized read field plus trigger maintenance might be the cleanest workaround for the generated GraphQL API.',
      'Olivia Carter (Project Manager)'
    ),
    (
      'Verify realtime list behavior with paginated issue feed',
      'Please test this with enough records to force multiple cursor pages. The edge case is not visible with only a few issues in the database.',
      'Sophia Lee (QA Engineer)'
    ),
    (
      'Add explicit sorting and assignee filtering to issue list',
      'Sorting does not appear to be a strict requirement in the take-home, so this can be treated as a polish enhancement rather than a missing core feature.',
      'Olivia Carter (Project Manager)'
    ),
    (
      'Improve comments UX with notifications about newly added replies',
      'From a product perspective, showing a small notification like "New comment added" with an action to reveal it would make the thread feel much more alive.',
      'Olivia Carter (Project Manager)'
    ),
    (
      'Stabilize SSR filters driven by query params',
      'This already behaves better after replacing problematic client navigation patterns, but it is worth keeping the case documented.',
      'Daniel Kim (Developer)'
    )
) as seed(issue_title, body, author_name)
join public.issues i on i.title = seed.issue_title
join public.users u on u.name = seed.author_name
where not exists (
  select 1
  from public.comments c
  where c.issue_id = i.id
    and c.body = seed.body
);

insert into public.issue_labels (issue_id, label_id)
select
  i.id,
  l.id
from (
  values
    ('Support label filtering in issue list', 'filters'),
    ('Support label filtering in issue list', 'pg_graphql'),
    ('Support label filtering in issue list', 'enhancement'),

    ('Verify realtime list behavior with paginated issue feed', 'realtime'),
    ('Verify realtime list behavior with paginated issue feed', 'pagination'),
    ('Verify realtime list behavior with paginated issue feed', 'testing'),

    ('Add explicit sorting and assignee filtering to issue list', 'sorting'),
    ('Add explicit sorting and assignee filtering to issue list', 'filters'),
    ('Add explicit sorting and assignee filtering to issue list', 'assignee'),
    ('Add explicit sorting and assignee filtering to issue list', 'enhancement'),

    ('Improve comments UX with notifications about newly added replies', 'ux'),
    ('Improve comments UX with notifications about newly added replies', 'realtime'),
    ('Improve comments UX with notifications about newly added replies', 'enhancement'),

    ('Stabilize SSR filters driven by query params', 'filters'),
    ('Stabilize SSR filters driven by query params', 'ux'),
    ('Stabilize SSR filters driven by query params', 'bug')
) as seed(issue_title, label_name)
join public.issues i on i.title = seed.issue_title
join public.labels l on l.name = seed.label_name
on conflict do nothing;