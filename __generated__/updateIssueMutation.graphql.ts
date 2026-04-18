/**
 * @generated SignedSource<<9c1b06c135d7bce98c531d3a3fb5b56a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type issue_priority = "high" | "low" | "medium" | "%future added value";
export type issue_status = "done" | "in_progress" | "todo" | "%future added value";
export type issuesUpdateInput = {
  assignee_id?: any | null | undefined;
  created_at?: any | null | undefined;
  description?: string | null | undefined;
  id?: any | null | undefined;
  priority?: issue_priority | null | undefined;
  status?: issue_status | null | undefined;
  title?: string | null | undefined;
};
export type updateIssueMutation$variables = {
  id: any;
  set: issuesUpdateInput;
};
export type updateIssueMutation$data = {
  readonly updateissuesCollection: {
    readonly records: ReadonlyArray<{
      readonly assignee_id: any | null | undefined;
      readonly description: string;
      readonly id: any;
      readonly nodeId: string;
      readonly priority: issue_priority;
      readonly status: issue_status;
      readonly title: string;
    }>;
  };
};
export type updateIssueMutation = {
  response: updateIssueMutation$data;
  variables: updateIssueMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "set"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "fields": [
              {
                "kind": "Variable",
                "name": "eq",
                "variableName": "id"
              }
            ],
            "kind": "ObjectValue",
            "name": "id"
          }
        ],
        "kind": "ObjectValue",
        "name": "filter"
      },
      {
        "kind": "Variable",
        "name": "set",
        "variableName": "set"
      }
    ],
    "concreteType": "issuesUpdateResponse",
    "kind": "LinkedField",
    "name": "updateissuesCollection",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "issues",
        "kind": "LinkedField",
        "name": "records",
        "plural": true,
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
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
            "name": "assignee_id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "updateIssueMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "updateIssueMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1cd3310f5513296aff56fde4eb1f75d3",
    "id": null,
    "metadata": {},
    "name": "updateIssueMutation",
    "operationKind": "mutation",
    "text": "mutation updateIssueMutation(\n  $id: UUID!\n  $set: issuesUpdateInput!\n) {\n  updateissuesCollection(filter: {id: {eq: $id}}, set: $set) {\n    records {\n      id\n      nodeId\n      title\n      description\n      status\n      priority\n      assignee_id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f0c6e3d9e1646f91245632716c459c01";

export default node;
