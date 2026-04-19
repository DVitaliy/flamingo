import { redirect } from "next/navigation";
import type { ConcreteRequest } from "relay-runtime";

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
  query: string | ConcreteRequest;
  variables?: TVariables;
  cache?: RequestCache;
};

function resolveQueryText(query: string | ConcreteRequest) {
  if (typeof query === "string") {
    return query;
  }

  if (typeof query.params?.text === "string" && query.params.text.length > 0) {
    return query.params.text;
  }
  throw new Error("Relay request does not contain printable query text");
}

export async function executeGraphQL<
  TData,
  TVariables = Record<string, never>,
>({ query, variables, cache = "no-store" }: ExecuteGraphQLParams<TVariables>) {
  try {
    const response = await fetch(graphqlUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        query: resolveQueryText(query),
        variables: variables ?? {},
      }),
      cache,
    });

    const json = (await response.json()) as GraphQLResponse<TData>;
    const errorMessage =
      json.errors
        ?.map((error) => error.message || "Unknown GraphQL error")
        .join(", ") || "GraphQL request failed";

    if (!response.ok || json.errors?.length) {
      throw new Error(errorMessage);
    }

    if (!json.data) {
      throw new Error("GraphQL response does not contain data");
    }

    return json.data;
  } catch {
    redirect("/app-unavailable");
  }
}
