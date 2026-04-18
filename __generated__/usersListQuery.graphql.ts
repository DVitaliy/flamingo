/**
 * @generated SignedSource<<57d5dea37d96d56454f759561326152f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type usersListQuery$variables = Record<PropertyKey, never>;
export type usersListQuery$data = {
  readonly usersCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly avatar_url: string | null | undefined;
        readonly id: any;
        readonly name: string;
        readonly nodeId: string;
      };
    }>;
  } | null | undefined;
};
export type usersListQuery = {
  response: usersListQuery$data;
  variables: usersListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "first",
        "value": 10
      }
    ],
    "concreteType": "usersConnection",
    "kind": "LinkedField",
    "name": "usersCollection",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "usersEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "users",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "nodeId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "avatar_url",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": "usersCollection(first:10)"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "usersListQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "usersListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "c2ddabdd4bf8e871eb310ed3805e44a9",
    "id": null,
    "metadata": {},
    "name": "usersListQuery",
    "operationKind": "query",
    "text": "query usersListQuery {\n  usersCollection(first: 10) {\n    edges {\n      node {\n        id\n        nodeId\n        name\n        avatar_url\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a0882092a946fd959214a085c21dc805";

export default node;
