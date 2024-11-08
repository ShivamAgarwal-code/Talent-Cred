'use client'

import { type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  DynamicContextProvider,
  DynamicEventsCallbacks,
} from '@dynamic-labs/sdk-react-core'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector'
import { createConfig, WagmiProvider } from 'wagmi'
import { http } from 'viem'
import { base, baseSepolia, mainnet } from 'viem/chains'
import { useRouter } from 'next/navigation'

const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API ?? undefined

const config = createConfig({
  chains: [base, baseSepolia, mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${alchemyApiKey}`),
    [baseSepolia.id]: http(
      `https://base-sepolia.g.alchemy.com/v2/${alchemyApiKey}`,
    ),
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`),
  },
})

const queryClient = new QueryClient()

export default function OnchainProvider({ children }: { children: ReactNode }) {
  const router = useRouter()

  const events: DynamicEventsCallbacks = {
    onAuthSuccess: (args) => {
      console.log('onAuthSuccess was called', args)
      router.push('/cartera')
    },
    onLogout: (args) => {
      console.log('onLogout was called', args)
      router.push('/')
    },
  }

  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID ?? 'ENV_ID',
        events,
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  )
}
