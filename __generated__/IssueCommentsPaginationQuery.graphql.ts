/**
 * @generated SignedSource<<3cde9fa85b3fa3317d66310179c8d4b4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type IssueCommentsPaginationQuery$variables = {
  after?: any | null | undefined;
  first: number;
  issueId: any;
};
export type IssueCommentsPaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"issueComments_comments">;
};
export type IssueCommentsPaginationQuery = {
  response: IssueCommentsPaginationQuery$data;
  variables: IssueCommentsPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "issueId"
  }
],
v1 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v2 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v3 = [
  (v1/*: any*/),
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
      }
    ],
    "kind": "ObjectValue",
    "name": "filter"
  },
  (v2/*: any*/),
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": [
      {
        "created_at": "DescNullsFirst"
      }
    ]
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nodeId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "IssueCommentsPaginationQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "kind": "Variable",
            "name": "issueId",
            "variableName": "issueId"
          }
        ],
        "kind": "FragmentSpread",
        "name": "issueComments_comments"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IssueCommentsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "commentsConnection",
        "kind": "LinkedField",
        "name": "commentsCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "commentsEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "comments",
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
                    "name": "body",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "created_at",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "author_id",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "users",
                    "kind": "LinkedField",
                    "name": "users",
                    "plural": false,
                    "selections": [
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
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "filters": [
          "filter",
          "orderBy"
        ],
        "handle": "connection",
        "key": "issueComments_commentsCollection",
        "kind": "LinkedHandle",
        "name": "commentsCollection"
      }
    ]
  },
  "params": {
    "cacheID": "3f6d5627e2482674352a8713f6f6a6e3",
    "id": null,
    "metadata": {},
    "name": "IssueCommentsPaginationQuery",
    "operationKind": "query",
    "text": "query IssueCommentsPaginationQuery(\n  $after: Cursor\n  $first: Int!\n  $issueId: UUID!\n) {\n  ...issueComments_comments_3YjkUj\n}\n\nfragment issueComments_comments_3YjkUj on Query {\n  commentsCollection(first: $first, after: $after, filter: {issue_id: {eq: $issueId}}, orderBy: [{created_at: DescNullsFirst}]) {\n    totalCount\n    edges {\n      cursor\n      node {\n        id\n        body\n        created_at\n        author_id\n        users {\n          name\n          avatar_url\n          nodeId\n        }\n        nodeId\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "faf95c17f60417c501c231faa6114c28";

export default node;
