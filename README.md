This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
Clone the repository and install dependencies:

```bash
git clone https://github.com/DVitaliy/flamingo.git
cd flamingo
pnpm install
```

Before the first local run, create `.env.local` from `.env.example` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_GRAPHQL_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Then make sure the database is initialized and the local GraphQL/Relay artifacts are generated:

```bash
pnpm schema:sync
pnpm dev
```

`pnpm schema:sync` is required before the first local run, and again whenever the database schema changes.

This project does not store generated Relay artifacts or the reflected GraphQL schema in Git. The following files are generated locally when needed:

- `schema.graphql`
- `__generated__/`

To sync the current Supabase GraphQL schema and regenerate Relay types, run:

```bash
pnpm schema:sync
```

This command:

1. downloads the latest reflected GraphQL schema into `schema.graphql`
2. ensures the `__generated__` directory exists
3. runs `relay-compiler` to regenerate typed artifacts

Then start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Database setup

This project uses Supabase Postgres together with the `pg_graphql` extension.

### 1. Create a Supabase project

Create a new Supabase project in the dashboard.

### 2. Apply the base schema

Run the SQL from `supabase/schema.sql` in the Supabase SQL editor.

This script:

- enables `pgcrypto`
- enables `pg_graphql`
- creates the Postgres enums `issue_status` and `issue_priority`
- creates the tables `users`, `issues`, `comments`, `labels`, and `issue_labels`
- creates the indexes used by the app
- enables `totalCount` and `aggregate` support for `comments` in `pg_graphql`
- includes the SQL for adding `public.issues` to the Supabase realtime publication

In some environments, the realtime publication step may need to be run manually:

```sql
alter publication supabase_realtime add table public.issues;
```

This statement can fail when executed together with the full script if:

- `public.issues` is already part of `supabase_realtime`
- the target environment does not expose or allow modifying that publication in the same way

### 3. Apply seed data if needed

If you want sample data for local development, run `supabase/seed.sql` after the base schema.

### 4. Re-sync the reflected GraphQL schema

After creating or changing the database schema, run:

```bash
pnpm schema:sync
```

This step is separate from the SQL setup because `pg_graphql` reflects the current Postgres schema, and Relay types must be regenerated from that reflected GraphQL schema.

### Notes

- `schema.graphql` and `__generated__/` are generated locally and are not committed to Git.
- If the Supabase schema changes, rerun `pnpm schema:sync` before `pnpm dev` or `pnpm build`.
- If the realtime publication step fails, apply the rest of the schema first and then run `alter publication supabase_realtime add table public.issues;` separately.
- Label filtering is intentionally not implemented through a many-to-many relation filter because the reflected `pg_graphql` schema does not expose the necessary `issuesFilter` shape for it.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Build-time generation

The production build runs:

```bash
pnpm schema:sync && next build
```

That means Vercel does not rely on committed `schema.graphql` or committed `__generated__` artifacts. They are recreated during the build from the current Supabase GraphQL endpoint.


## Label filtering trade-off

The take-home requires multi-select filtering by labels. In the current implementation, I intentionally did **not** ship label filtering on top of the generated `pg_graphql` schema, because the reflected GraphQL schema exposed the `issue_labelsCollection` relationship for reading, but did **not** expose a relation-based filter on `issuesFilter` for filtering `issuesCollection` by the many-to-many labels link.

In practice, this meant:

- reading labels through the relationship worked
- filtering issues by `status` and `priority` worked directly through `issuesFilter`
- filtering issues by labels through the same root `issuesCollection(filter: ...)` API was not available in the generated schema shape

I decided not to force a brittle workaround, such as querying through `issue_labelsCollection` and reconstructing issues on the client, because that would introduce duplication, unstable pagination behavior, and a less clear data flow for the list page.

### What I would do with more time

If this approach were confirmed as acceptable within the assignment constraints, I would introduce a small read-optimized denormalization for labels.

Concretely, I would:

1. add a derived field on `issues`, for example `label_names text[]`
2. backfill existing values from `issue_labels` + `labels`
3. add a trigger so that whenever issue-label relationships change, the derived label array on `issues` is updated automatically
4. filter the issue list through that field instead of relying on a many-to-many relation filter generated by `pg_graphql`

This would preserve:

- the normalized write model:
  - `labels`
  - `issue_labels`
- while also providing a read model that is much easier to filter through the reflected GraphQL schema

I consider this a pragmatic solution for `pg_graphql`-driven applications, where the generated GraphQL API is derived from the database schema and not hand-designed field by field.

## Relay + pg_graphql compatibility

One of the most important parts of this take-home was making Relay work with the GraphQL schema generated by `pg_graphql`.

### Main issue

`pg_graphql` does not expose exactly the same schema conventions that Relay expects out of the box.

The key difference in this project was the global node identifier:

- Relay commonly expects `id` for the `Node` interface identity field
- `pg_graphql` exposes `nodeId` for global object identity

Because of that, Relay compiler/runtime cannot be treated as plug-and-play against the generated Supabase GraphQL schema.

### What I changed

#### 1. Pull the generated GraphQL schema on demand

After enabling `pg_graphql` in Supabase, I configured the project to download the reflected schema into a local `schema.graphql` file when running `pnpm schema:sync`.

That file is generated locally and is intentionally not stored in Git.

This was important because the database schema evolved during the project:
- `status` and `priority` were converted from `text` to Postgres enums
- `comments.totalCount` was enabled through `pg_graphql` table configuration
- GraphQL capabilities changed as the SQL schema changed

Because `pg_graphql` reflects the database schema, the local schema and Relay artifacts need to be re-synced whenever the database structure changes.

#### 2. Configured Relay compiler for `nodeId`

In `relay.config.json` I explicitly configured Relay to use `nodeId` instead of `id`:

- `schemaConfig.nodeInterfaceIdField = "nodeId"`
- `schemaConfig.nodeInterfaceIdVariableName = "nodeId"`

This was required for compatibility with the generated `pg_graphql` Node interface.

#### 3. Configured Relay runtime identity resolution

In the Relay environment, I used `getDataID` to resolve records by `nodeId`.

Without that, Relay store identity would not match the shape of objects returned by `pg_graphql`.

#### 4. Enabled Next.js Relay transform

Running `relay-compiler` alone was not enough.

At first, Relay artifacts were generated successfully, but the app failed at runtime with:

> `graphql: Unexpected invocation at runtime`

The reason was that the Relay GraphQL tagged template was not being transformed during the Next.js build step.

To fix that, I enabled Relay support in `next.config.ts` through the Next compiler configuration. After that, Relay queries were properly compiled and runtime execution worked as expected.

#### 5. Generate Relay artifacts during sync/build

Relay compiler in this setup expects `artifactDirectory` to exist before compilation starts.

To make local setup and deployment reliable, `scripts/pull-schema.mjs` ensures that `__generated__/` exists before `relay-compiler` runs. As a result:

- `pnpm schema:sync` can recreate both `schema.graphql` and `__generated__/` from scratch
- `pnpm build` can do the same automatically in CI or on Vercel
- generated files do not need to be committed to the repository

### Practical architecture decision

I ended up using a hybrid approach:

- Relay compiler and generated artifacts for type-safe GraphQL operations
- SSR pages for the main issue list and issue details shell
- client-side Relay where it is more useful for interactive/paginated sections

This gave me:
- generated and schema-validated types
- a working SSR flow in Next.js App Router
- a path to use Relay where it provides the most value, especially for paginated UI sections

### Detail page trade-off

One important mismatch with the original assignment is that the issue detail page is not yet fully split into section-level Relay fragments.

At the moment:

- the comments section uses Relay fragments and pagination
- the rest of the detail page still relies on a larger page-level query

If I had more time, I would break the detail page into smaller co-located Relay fragments for:

- header
- metadata
- labels
- description
- comments

This was mostly a time trade-off. I had not worked with Relay before this take-home, so I prioritized getting Relay integrated correctly with `pg_graphql`, making pagination work, and implementing fragments first in the comments section where Relay provides the clearest benefit.

I can do the same fragment-based split for the full detail page, but that refactor would need more time to do cleanly.

### What problems came up

The main problems I hit were:

- Relay expecting different Node identity conventions than `pg_graphql`
- the need to re-pull schema after database changes
- generated schema limitations, especially around some relation-based filtering
- build/runtime mismatch before Relay transform was enabled in Next.js

### What I would do with more time

With more time, I would further push the project toward section-level Relay fragments and paginated Relay-driven UI, especially on the issue detail page, so that the implementation more fully reflects the intended fragment-colocation model from the assignment.
