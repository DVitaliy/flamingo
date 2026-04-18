/**
 * @generated SignedSource<<b10f356469260f0c7d299a30d781bdf1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type commentsInsertInput = {
  author_id?: any | null | undefined;
  body?: string | null | undefined;
  created_at?: any | null | undefined;
  id?: any | null | undefined;
  issue_id?: any | null | undefined;
};
export type createCommentMutation$variables = {
  input: commentsInsertInput;
};
export type createCommentMutation$data = {
  readonly insertIntocommentsCollection: {
    readonly records: ReadonlyArray<{
      readonly author_id: any | null | undefined;
      readonly body: string;
      readonly created_at: any;
      readonly id: any;
      readonly issue_id: any;
    }>;
  } | null | undefined;
};
export type createCommentMutation = {
  response: createCommentMutation$data;
  variables: createCommentMutation$variables;
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "issue_id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "body",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "created_at",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "author_id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "createCommentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "commentsInsertResponse",
        "kind": "LinkedField",
        "name": "insertIntocommentsCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "comments",
            "kind": "LinkedField",
            "name": "records",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "createCommentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "commentsInsertResponse",
        "kind": "LinkedField",
        "name": "insertIntocommentsCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "comments",
            "kind": "LinkedField",
            "name": "records",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "nodeId",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "59d4730a9c3d9250c60581c54dba3e90",
    "id": null,
    "metadata": {},
    "name": "createCommentMutation",
    "operationKind": "mutation",
    "text": "mutation createCommentMutation(\n  $input: commentsInsertInput!\n) {\n  insertIntocommentsCollection(objects: [$input]) {\n    records {\n      id\n      issue_id\n      body\n      created_at\n      author_id\n      nodeId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "224926b17e0f0b113b71060b3729607a";

export default node;
