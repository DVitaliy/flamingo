'use client'

import { RelayEnvironmentProvider } from 'react-relay'
import type { ReactNode } from 'react'

import { relayEnvironment } from '@/lib/relay/environment'
import { UserProvider } from '@/lib/users/user-context'

type Props = {
  children: ReactNode
}

export function Providers({ children }: Props) {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <UserProvider>
        {children}
      </UserProvider>
    </RelayEnvironmentProvider>
  )
}