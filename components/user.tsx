"use client";

import Image from "next/image";
import { useLazyLoadQuery } from "react-relay";

import type { usersListQuery as UsersListQueryType } from "@/__generated__/usersListQuery.graphql";
import { usersListQuery } from "@/app/users-list.query";
import { useCurrentUser } from "@/lib/users/user-context";

export function User() {
  const data = useLazyLoadQuery<UsersListQueryType>(
    usersListQuery,
    {},
    { fetchPolicy: "store-and-network" },
  );

  const { userId, setUserId } = useCurrentUser();

  const users =
    data.usersCollection?.edges?.flatMap((edge) => {
      const node = edge?.node;
      return node ? [node] : [];
    }) ?? [];

  const selectedUser = users.find((u) => u.id === userId) ?? null;

  return (
    <div className="flex items-center gap-2">
      <div className="relative size-8 shrink-0 overflow-hidden rounded-full bg-gray-200">
        {selectedUser?.avatar_url && (
          <Image
            src={selectedUser.avatar_url}
            alt={selectedUser.name}
            fill
            className="object-cover"
          />
        )}
      </div>
      <select
        value={userId ?? ""}
        onChange={(e) => setUserId(e.target.value || null)}
        className="cursor-pointer bg-transparent text-sm text-neutral-700 outline-none"
      >
        <option value="">Select user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
}
