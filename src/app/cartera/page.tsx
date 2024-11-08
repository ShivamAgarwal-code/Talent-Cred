'use client'

import Link from 'next/link'

import PageWithAppbar from '@/components/layout/pageWithAppbar'
import { Button } from '@/components/ui/button'
import {
  useDynamicContext,
  useSwitchNetwork,
} from '@dynamic-labs/sdk-react-core'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowLeftRight, LoaderCircle, PiggyBank } from 'lucide-react'
import { useEffect, useState } from 'react'
import CarteraWidget from '@/components/onchain/carteraWidget'
import { useBalanceOf } from '@/hooks/useBalanceOf'
import { useAccount } from 'wagmi'
import { Address } from 'viem'
import SendModalButton from '@/components/onchain/sendModalButton'
import AhorraModalButton from '@/components/ux/ahorraModalButton'

export default function Cartera() {
  const [basename, setBasename] = useState('')
  const [isSwitchingNetwork, setIsSwitchingNetwork] = useState(false)
  const { user, primaryWallet } = useDynamicContext()
  const switchNetwork = useSwitchNetwork()

  const { address: walletAddress, chainId } = useAccount()
  const tokenAddress = '0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf' // $XOC address

  const { balance, balanceStatus } = useBalanceOf({
    tokenAddress,
    walletAddress: walletAddress as Address,
  })

  useEffect(() => {
    async function handleSwitchNetwork() {
      if (primaryWallet) {
        setIsSwitchingNetwork(true)
        await switchNetwork({ wallet: primaryWallet, network: 8453 })
      }
    }

    if (primaryWallet && chainId !== 8453 && !isSwitchingNetwork) {
      handleSwitchNetwork()
    }
  }, [chainId, isSwitchingNetwork, primaryWallet, switchNetwork])

  return (
    <PageWithAppbar>
      <div className="page gap-y-8 text-center md:max-w-screen-sm">
        <div className="flex w-full flex-col gap-y-4 px-8">
          <h2>Hola {user?.username}</h2>
          <div className="flex w-full justify-center">
            {user &&
              user.username &&
              (!basename ? (
                <Button
                  className="w-full md:w-2/3 lg:w-1/2"
                  onClick={() => setBasename(user?.username ?? '')}
                >
                  {' '}
                  Obtén tu Basename
                </Button>
              ) : (
                <div className="w-full md:w-2/3 lg:w-1/2">
                  <CarteraWidget ens={`${basename}.base.eth`} />
                </div>
              ))}
          </div>
        </div>
        <div className="w-full px-8">
          <div className="grid w-full grid-cols-1 gap-y-4 lg:grid-cols-2 lg:gap-x-4">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2 text-left">
                <CardTitle className="text-xl">Balance</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-y-4">
                {balanceStatus === 'success' ? (
                  <h2 className="font-bold">
                    {balance ? `$ ${Number(balance).toFixed(2)}` : '$ 0.00'}
                    <span className="ml-2 text-xl">MXN</span>
                  </h2>
                ) : (
                  <div className="flex w-full justify-center">
                    <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
                  </div>
                )}
                <div className="flex items-center justify-center gap-x-6">
                  <Button size="icon" className="h-12 w-12 rounded-full">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="1.5rem"
                      width="1.5rem"
                    >
                      <path d="M22 2H2a1 1 0 00-1 1v8a1 1 0 001 1h3v9a1 1 0 001 1h12a1 1 0 001-1v-9h3a1 1 0 001-1V3a1 1 0 00-1-1zM7 20v-2a2 2 0 012 2zm10 0h-2a2 2 0 012-2zm0-4a4 4 0 00-4 4h-2a4 4 0 00-4-4V8h10zm4-6h-2V7a1 1 0 00-1-1H6a1 1 0 00-1 1v3H3V4h18zm-9 5a3 3 0 10-3-3 3 3 0 003 3zm0-4a1 1 0 11-1 1 1 1 0 011-1z" />
                    </svg>
                  </Button>
                  <Button size="icon" className="h-12 w-12 rounded-full">
                    <PiggyBank className="h-7 w-7" />
                    <span className="sr-only">Deposit</span>
                  </Button>
                  <Button size="icon" className="h-12 w-12 rounded-full">
                    <ArrowLeftRight className="h-6 w-6" />
                    <span className="sr-only">Swap</span>
                  </Button>
                  <SendModalButton />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2 text-left">
                <CardTitle className="text-xl">CrediTalent</CardTitle>
                <CardDescription className="text-base">
                  Obtén un crédito preferencial de hasta $1,000 MXN con tu
                  Talent Passport
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-y-4">
                <h3 className="font-bold">
                  <span className="text-xl">desde </span>3.69%
                </h3>
                <div className="flex items-center justify-center gap-x-6">
                  <Link href="/reputacion">
                    <Button className="text-lg">Quiero $1,000 MXN</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card className="flex flex-col justify-between">
              <CardHeader className="pb-2 text-left">
                <CardTitle className="text-xl">Cuenta Sustantiva</CardTitle>
                <CardDescription className="text-base">
                  Ahorra y recibe rendimiento en MXN o USD
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-y-4">
                <h3 className="font-bold">
                  <span className="text-xl">hasta </span>6.9%
                </h3>
                <div className="flex items-center justify-center gap-x-6">
                  <div className="w-3/4 md:w-2/5 lg:w-[90%]">
                    <AhorraModalButton />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageWithAppbar>
  )
}
