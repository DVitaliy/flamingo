/**
 * @generated SignedSource<<a86d22e5a26ad6755ece4f149ced09f2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type issueComments_comments$data = {
  readonly commentsCollection: {
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly author_id: any | null | undefined;
        readonly body: string;
        readonly created_at: any;
        readonly id: any;
        readonly users: {
          readonly avatar_url: string | null | undefined;
          readonly name: string;
        } | null | undefined;
      };
    }>;
    readonly pageInfo: {
      readonly endCursor: string | null | undefined;
      readonly hasNextPage: boolean;
    };
    readonly totalCount: number;
  } | null | undefined;
  readonly " $fragmentType": "issueComments_comments";
};
export type issueComments_comments$key = {
  readonly " $data"?: issueComments_comments$data;
  readonly " $fragmentSpreads": FragmentRefs<"issueComments_comments">;
};

import IssueCommentsPaginationQuery_graphql from './IssueCommentsPaginationQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "commentsCollection"
];
return {
  "argumentDefinitions": [
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
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": IssueCommentsPaginationQuery_graphql
    }
  },
  "name": "issueComments_comments",
  "selections": [
    {
      "alias": "commentsCollection",
      "args": [
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
      "concreteType": "commentsConnection",
      "kind": "LinkedField",
      "name": "__issueComments_commentsCollection_connection",
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
                    }
                  ],
                  "storageKey": null
                },
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
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "faf95c17f60417c501c231faa6114c28";

export default node;
