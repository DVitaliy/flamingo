"use client";

import { RelayEnvironmentProvider } from "react-relay";
import type { ReactNode } from "react";

import { relayEnvironment } from "@/lib/relay/environment";

type Props = {
  children: ReactNode;
};

export function Providers({ children }: Props) {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      {children}
    </RelayEnvironmentProvider>
  );
}
