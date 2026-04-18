/**
 * @generated SignedSource<<140eca2ce6b4e145cb041e1a1acf2254>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type testRelayQuery$variables = Record<PropertyKey, never>;
export type testRelayQuery$data = {
  readonly issuesCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: any;
        readonly nodeId: string;
        readonly title: string;
      };
    }>;
  } | null | undefined;
};
export type testRelayQuery = {
  response: testRelayQuery$data;
  variables: testRelayQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "first",
        "value": 1
      }
    ],
    "concreteType": "issuesConnection",
    "kind": "LinkedField",
    "name": "issuesCollection",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "issuesEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "issues",
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
                "name": "title",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": "issuesCollection(first:1)"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "testRelayQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "testRelayQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "47f6358502e0d3695629c50093d2e77a",
    "id": null,
    "metadata": {},
    "name": "testRelayQuery",
    "operationKind": "query",
    "text": "query testRelayQuery {\n  issuesCollection(first: 1) {\n    edges {\n      node {\n        id\n        nodeId\n        title\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "83b4e53d67a979f76a5cc44d9ddebcc1";

export default node;
