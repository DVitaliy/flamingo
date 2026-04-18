/**
 * @generated SignedSource<<9cf9934e1f93fa8ca586d955671ce6a9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type issue_priority = "high" | "low" | "medium" | "%future added value";
export type issue_status = "done" | "in_progress" | "todo" | "%future added value";
export type issuesInsertInput = {
  assignee_id?: any | null | undefined;
  created_at?: any | null | undefined;
  description?: string | null | undefined;
  id?: any | null | undefined;
  priority?: issue_priority | null | undefined;
  status?: issue_status | null | undefined;
  title?: string | null | undefined;
};
export type createIssueMutation$variables = {
  input: issuesInsertInput;
};
export type createIssueMutation$data = {
  readonly insertIntoissuesCollection: {
    readonly records: ReadonlyArray<{
      readonly assignee_id: any | null | undefined;
      readonly created_at: any;
      readonly description: string;
      readonly id: any;
      readonly nodeId: string;
      readonly priority: issue_priority;
      readonly status: issue_status;
      readonly title: string;
    }>;
  } | null | undefined;
};
export type createIssueMutation = {
  response: createIssueMutation$data;
  variables: createIssueMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "items": [
          {
            "kind": "Variable",
            "name": "objects.0",
            "variableName": "input"
          }
        ],
        "kind": "ListValue",
        "name": "objects"
      }
    ],
    "concreteType": "issuesInsertResponse",
    "kind": "LinkedField",
    "name": "insertIntoissuesCollection",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "createIssueMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "createIssueMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9e38e7bea67b766ed594e5fd228e898b",
    "id": null,
    "metadata": {},
    "name": "createIssueMutation",
    "operationKind": "mutation",
    "text": "mutation createIssueMutation(\n  $input: issuesInsertInput!\n) {\n  insertIntoissuesCollection(objects: [$input]) {\n    records {\n      id\n      nodeId\n      title\n      description\n      status\n      priority\n      assignee_id\n      created_at\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "286cfe51862b8757bed55a786cc97146";

export default node;
