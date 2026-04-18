type GraphQLError = {
  message?: string;
};

type GraphQLResponse<TData> = {
  data?: TData;
  errors?: GraphQLError[] | null;
};

const graphqlUrl = process.env.NEXT_PUBLIC_SUPABASE_GRAPHQL_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (typeof graphqlUrl !== "string" || graphqlUrl.length === 0) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_GRAPHQL_URL");
}

if (typeof supabaseAnonKey !== "string" || supabaseAnonKey.length === 0) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

type ExecuteGraphQLParams<TVariables> = {
  query: string;
  variables?: TVariables;
  cache?: RequestCache;
};

export async function executeGraphQL<
  TData,
  TVariables = Record<string, never>,
>({ query, variables, cache = "no-store" }: ExecuteGraphQLParams<TVariables>) {
  const response = await fetch(graphqlUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
    body: JSON.stringify({
      query,
      variables: variables ?? {},
    }),
    cache,
  });

  const json = (await response.json()) as GraphQLResponse<TData>;

  if (!response.ok || json.errors?.length) {
    throw new Error(
      json.errors
        ?.map((error) => error.message || "Unknown GraphQL error")
        .join(", ") || "GraphQL request failed",
    );
  }

  if (!json.data) {
    throw new Error("GraphQL response does not contain data");
  }

  return json.data;
}
