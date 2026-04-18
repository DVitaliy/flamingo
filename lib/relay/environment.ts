import {
  Environment,
  Network,
  RecordSource,
  Store,
  type FetchFunction,
  type GraphQLResponse,
} from "relay-runtime";

const GRAPHQL_URL = process.env.NEXT_PUBLIC_SUPABASE_GRAPHQL_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!GRAPHQL_URL) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_GRAPHQL_URL");
}

if (!SUPABASE_ANON_KEY) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

const getGraphQLErrors = (response: GraphQLResponse) => {
  if ("errors" in response && Array.isArray(response.errors)) {
    return response.errors.filter((error): error is { message: string } => {
      return (
        error !== null &&
        typeof error === "object" &&
        "message" in error &&
        typeof error.message === "string"
      );
    });
  }

  return [];
};

const fetchGraphQL: FetchFunction = async (params, variables) => {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
    cache: "no-store",
  });

  const json = (await response.json()) as GraphQLResponse;
  const errors = getGraphQLErrors(json);

  if (!response.ok) {
    throw new Error(
      errors.map((error) => error.message).join(", ") ||
        "GraphQL request failed",
    );
  }

  if (errors.length > 0) {
    throw new Error(errors.map((error) => error.message).join(", "));
  }

  return json;
};

export const relayEnvironment = new Environment({
  network: Network.create(fetchGraphQL),
  store: new Store(new RecordSource()),
  getDataID: (object) => {
    if (
      object !== null &&
      typeof object === "object" &&
      "nodeId" in object &&
      typeof object.nodeId === "string"
    ) {
      return object.nodeId;
    }

    return null;
  },
});
