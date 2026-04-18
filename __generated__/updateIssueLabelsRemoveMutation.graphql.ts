/**
 * @generated SignedSource<<0e3c1cd6d7e0be2976438707215e8063>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type updateIssueLabelsRemoveMutation$variables = {
  atMost: number;
  issueId: any;
  labelIds: ReadonlyArray<any>;
};
export type updateIssueLabelsRemoveMutation$data = {
  readonly deleteFromissue_labelsCollection: {
    readonly records: ReadonlyArray<{
      readonly issue_id: any;
      readonly label_id: any;
    }>;
  };
};
export type updateIssueLabelsRemoveMutation = {
  response: updateIssueLabelsRemoveMutation$data;
  variables: updateIssueLabelsRemoveMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "atMost"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "issueId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "labelIds"
},
v3 = [
  {
    "kind": "Variable",
    "name": "atMost",
    "variableName": "atMost"
  },
  {
    "fields": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "eq",
            "variableName": "issueId"
          }
        ],
        "kind": "ObjectValue",
        "name": "issue_id"
      },
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "in",
            "variableName": "labelIds"
          }
        ],
        "kind": "ObjectValue",
        "name": "label_id"
      }
    ],
    "kind": "ObjectValue",
    "name": "filter"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "issue_id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "label_id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "updateIssueLabelsRemoveMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "issue_labelsDeleteResponse",
        "kind": "LinkedField",
        "name": "deleteFromissue_labelsCollection",
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
              (v4/*: any*/),
              (v5/*: any*/)
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "updateIssueLabelsRemoveMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "issue_labelsDeleteResponse",
        "kind": "LinkedField",
        "name": "deleteFromissue_labelsCollection",
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
              (v4/*: any*/),
              (v5/*: any*/),
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
    "cacheID": "7cc5c4f269bb93bb7b7beb3885047e7c",
    "id": null,
    "metadata": {},
    "name": "updateIssueLabelsRemoveMutation",
    "operationKind": "mutation",
    "text": "mutation updateIssueLabelsRemoveMutation(\n  $issueId: UUID!\n  $labelIds: [UUID!]!\n  $atMost: Int!\n) {\n  deleteFromissue_labelsCollection(filter: {issue_id: {eq: $issueId}, label_id: {in: $labelIds}}, atMost: $atMost) {\n    records {\n      issue_id\n      label_id\n      nodeId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8918438ddeebb5312c698ab713ef5206";

export default node;
