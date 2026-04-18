/**
 * @generated SignedSource<<fb2c1d1a2023558f86af77b0b8800e62>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type issue_priority = "high" | "low" | "medium" | "%future added value";
export type issue_status = "done" | "in_progress" | "todo" | "%future added value";
export type issuesListQuery$variables = Record<PropertyKey, never>;
export type issuesListQuery$data = {
  readonly issuesCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly created_at: any;
        readonly id: any;
        readonly nodeId: string;
        readonly priority: issue_priority;
        readonly status: issue_status;
        readonly title: string;
      };
    }>;
  } | null | undefined;
};
export type issuesListQuery = {
  response: issuesListQuery$data;
  variables: issuesListQuery$variables;
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
                "name": "nodeId",
                "storageKey": null
              },
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
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "status",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "priority",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "created_at",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": "issuesCollection(first:10)"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "issuesListQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "issuesListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "b7f0baaab8ca0cbfed9229cf36c0a8b7",
    "id": null,
    "metadata": {},
    "name": "issuesListQuery",
    "operationKind": "query",
    "text": "query issuesListQuery {\n  issuesCollection(first: 10) {\n    edges {\n      node {\n        nodeId\n        id\n        title\n        status\n        priority\n        created_at\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "441aedbe859deee1f769433675c5fe5b";

export default node;
