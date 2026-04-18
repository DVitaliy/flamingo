/**
 * @generated SignedSource<<76e42c4b143585810e4ed176fddf2fc2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type issue_labelsInsertInput = {
  issue_id?: any | null | undefined;
  label_id?: any | null | undefined;
};
export type createIssueLabelsMutation$variables = {
  inputs: ReadonlyArray<issue_labelsInsertInput>;
};
export type createIssueLabelsMutation$data = {
  readonly insertIntoissue_labelsCollection: {
    readonly records: ReadonlyArray<{
      readonly issue_id: any;
      readonly label_id: any;
    }>;
  } | null | undefined;
};
export type createIssueLabelsMutation = {
  response: createIssueLabelsMutation$data;
  variables: createIssueLabelsMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "inputs"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "objects",
    "variableName": "inputs"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "issue_id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "label_id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "createIssueLabelsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "issue_labelsInsertResponse",
        "kind": "LinkedField",
        "name": "insertIntoissue_labelsCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "issue_labels",
            "kind": "LinkedField",
            "name": "records",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
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
    "name": "createIssueLabelsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "issue_labelsInsertResponse",
        "kind": "LinkedField",
        "name": "insertIntoissue_labelsCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "issue_labels",
            "kind": "LinkedField",
            "name": "records",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
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
    "cacheID": "416ab2651378e5cac46d366264016379",
    "id": null,
    "metadata": {},
    "name": "createIssueLabelsMutation",
    "operationKind": "mutation",
    "text": "mutation createIssueLabelsMutation(\n  $inputs: [issue_labelsInsertInput!]!\n) {\n  insertIntoissue_labelsCollection(objects: $inputs) {\n    records {\n      issue_id\n      label_id\n      nodeId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6f3e1c6ba28f5fb4ad1bf133d08147aa";

export default node;
