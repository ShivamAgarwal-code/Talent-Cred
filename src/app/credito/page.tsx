'use client'

import { Suspense, useState } from 'react'
import PageWithAppbar from '@/components/layout/pageWithAppbar'
import { Button } from '@/components/ui/button'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import CarteraWidget from '@/components/onchain/carteraWidget'
import Prestamo from '@/components/Prestamo'
import SynopsisCredito from '@/components/SynopsisCredito'
import Talent from '@/components/Talent'
import AboutPool from '@/components/AboutPool'
import Ecosistema from '@/components/Ecosistema'
import { useQuery } from '@tanstack/react-query'
import { fetchPassportProfile } from '@/services/passportProfile'
import { useAccount } from 'wagmi'
import { PassportProfileExtended } from '@/types/api'
import { useBalanceOf } from '@/hooks/useBalanceOf'
import { Address } from 'viem'
import { Card, CardContent } from '@/components/ui/card'
import { LoaderCircle } from 'lucide-react'

export default function Credito() {
  const [basename, setBasename] = useState('')
  const { user } = useDynamicContext()
  const { address: userAddress } = useAccount()
  const tokenAddress = '0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf' // $XOC address
  const { balance } = useBalanceOf({
    tokenAddress,
    walletAddress: userAddress as Address,
  })

  const { data: passportProfileData } = useQuery({
    queryKey: ['passportProfileKey'],
    queryFn: () => fetchPassportProfile(userAddress as string),
    enabled: Boolean(userAddress),
  })

  console.log(passportProfileData)

  return (
    <PageWithAppbar>
      <div className="page gap-y-8 text-center">
        <div className="flex flex-col items-center gap-y-8 text-center">
          <div className="flex w-full flex-col gap-y-4 px-8 md:max-w-screen-sm">
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
          <div className="grid w-full grid-cols-1 gap-4 px-8 md:max-w-screen-sm lg:max-w-screen-md lg:grid-cols-3 lg:px-0 xl:mx-8 xl:max-w-screen-lg">
            {passportProfileData ? (
              <Suspense>
                <Prestamo
                  passportProfile={
                    passportProfileData as unknown as PassportProfileExtended
                  }
                  totalLimit={
                    (passportProfileData as unknown as PassportProfileExtended)
                      ?.creditLine?.totalLimit
                  }
                  xocBalance={Number(balance) ?? 0}
                />
              </Suspense>
            ) : (
              <>
                <Card className="w-full">
                  <CardContent className="flex flex-col items-center gap-y-4 pt-6">
                    <LoaderCircle className="h-16 w-16 animate-spin text-primary" />
                    <h4>Obteniendo tus datos</h4>
                  </CardContent>
                </Card>
              </>
            )}
            <SynopsisCredito />
            <Talent />
          </div>
        </div>
        <div className="w-full px-8 md:max-w-screen-sm lg:max-w-screen-md lg:grid-cols-3 lg:px-0 xl:mx-8 xl:max-w-screen-lg">
          <AboutPool />
        </div>
        <div className="w-full px-8 md:max-w-screen-sm lg:max-w-screen-md lg:grid-cols-3 lg:px-0 xl:mx-8 xl:max-w-screen-lg">
          <Ecosistema />
        </div>
      </div>
    </PageWithAppbar>
  )
}
