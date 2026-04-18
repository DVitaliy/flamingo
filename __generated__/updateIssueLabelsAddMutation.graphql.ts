/**
 * @generated SignedSource<<9c14530c17d9e9bb2b0d2ea17002df44>>
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
export type updateIssueLabelsAddMutation$variables = {
  inputs: ReadonlyArray<issue_labelsInsertInput>;
};
export type updateIssueLabelsAddMutation$data = {
  readonly insertIntoissue_labelsCollection: {
    readonly records: ReadonlyArray<{
      readonly issue_id: any;
      readonly label_id: any;
    }>;
  } | null | undefined;
};
export type updateIssueLabelsAddMutation = {
  response: updateIssueLabelsAddMutation$data;
  variables: updateIssueLabelsAddMutation$variables;
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
    "name": "updateIssueLabelsAddMutation",
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
    "name": "updateIssueLabelsAddMutation",
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
    "cacheID": "4ad95f6ab65ad6af0c186e3a3c1a8c36",
    "id": null,
    "metadata": {},
    "name": "updateIssueLabelsAddMutation",
    "operationKind": "mutation",
    "text": "mutation updateIssueLabelsAddMutation(\n  $inputs: [issue_labelsInsertInput!]!\n) {\n  insertIntoissue_labelsCollection(objects: $inputs) {\n    records {\n      issue_id\n      label_id\n      nodeId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ab550f317a592dea1de12f9be2e4ba51";

export default node;
