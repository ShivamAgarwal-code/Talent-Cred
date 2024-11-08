'use client'

import PageWithAppbar from '@/components/layout/pageWithAppbar'
import { Card, CardContent } from '@/components/ui/card'
import { BuilderScoreChart } from './builder-score-chart'
import { useMutation, useQuery } from '@tanstack/react-query'
import { fetchTalentPassport } from '@/controllers/talentProtocolApi'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ExternalLink, LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import NoPassportCard from './noPassportCard'
import { CREDIT_ALLOWANCE_BY_SCORE } from '@/lib/constants'
import { createPassportProfile } from '@/services/passportProfile'
import { Address, zeroAddress } from 'viem'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { toast } from 'sonner'

export default function Reputacion() {
  const [creditAllowed, setCreditAllowed] = useState(0)
  const { address: userAddress } = useAccount()
  const { user } = useDynamicContext()
  const router = useRouter()

  const { data: talentPassportData, status: talentPassportQueryStatus } =
    useQuery({
      queryKey: ['talentPassportKey'],
      queryFn: () => fetchTalentPassport(userAddress as string),
      enabled: Boolean(userAddress),
    })

  const { mutateAsync: createProfile, status } = useMutation({
    mutationFn: createPassportProfile,
    onSuccess: (data) => {
      console.log(data)
      router.push('/credito')
    },
    onError: (error: unknown) => {
      console.error('Error creating passport profile:', error)
    },
  })

  function getCreditAllowance(score: number) {
    let creditAllowed = 0

    for (const [key, value] of Object.entries(CREDIT_ALLOWANCE_BY_SCORE)) {
      if (score >= parseInt(key)) {
        creditAllowed = value
      }
    }

    return creditAllowed
  }

  async function handleCreatePassportProfile() {
    if (!user?.userId) {
      return toast.error('No session detected (no Dynamic User Id')
    }
    try {
      await createProfile({
        dynamicUserId: user?.userId,
        dynamicWallet: userAddress as Address,
        mainWallet: talentPassportData?.main_wallet ?? zeroAddress,
        verifiedWallets: talentPassportData?.verified_wallets ?? [],
        talentPassportId: talentPassportData?.passport_id ?? 0,
        talentUserId: talentPassportData?.user.id ?? '',
        name: talentPassportData?.user.name ?? '',
        profilePictureUrl: talentPassportData?.user.profile_picture_url ?? '',
        verified: talentPassportData?.verified ?? false,
        humanCheck: talentPassportData?.human_checkmark ?? false,
        score: talentPassportData?.score ?? 0,
        activityScore: talentPassportData?.activity_score ?? 0,
        identityScore: talentPassportData?.identity_score ?? 0,
        skillsScore: talentPassportData?.skills_score ?? 0,
        nominationsReceived:
          talentPassportData?.nominations_received_count ?? 0,
        socialsLinked: talentPassportData?.passport_socials.length ?? 0,
        followerCount:
          talentPassportData?.passport_socials.reduce(
            (acc, profile) => acc + profile.follower_count,
            0,
          ) ?? 0,
        totalLimit: 1500,
      })
      console.log('Passport profile created successfully!')
      toast.success(
        'Línea de crédito creada, redirigiendo a Consola de Préstamo',
      )
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error submitting form:', error.message)
      } else {
        console.error('An unknown error occurred during form submission')
      }
    }
  }

  useEffect(() => {
    console.log(talentPassportData)
    if (talentPassportData) {
      const calculatedCreditAllowed = getCreditAllowance(
        talentPassportData.score,
      )
      setCreditAllowed(calculatedCreditAllowed)
    }
  }, [talentPassportData])
  return (
    <PageWithAppbar>
      <div className="page gap-y-8 px-8 text-center">
        <Card className="w-full py-8 md:w-2/3 lg:py-4 xl:w-1/2">
          <CardContent className="flex flex-col items-center gap-y-4 pt-6">
            {talentPassportQueryStatus === 'pending' && (
              <>
                <LoaderCircle className="h-16 w-16 animate-spin text-primary" />
                <h4>Calculando tu Reputación Onchain...</h4>
              </>
            )}
            {talentPassportQueryStatus === 'success' &&
              (talentPassportData ? (
                <>
                  <h2>Tu CrediTalent</h2>

                  <div className="flex flex-col gap-y-4">
                    <p className="text-2xl">Crédito autorizado:</p>
                    <h3>
                      $ {parseFloat(creditAllowed.toString()).toFixed(2)} MXN
                    </h3>
                    {creditAllowed > 0 ? (
                      <div className="flex flex-col gap-y-4 py-4">
                        <Button
                          onClick={handleCreatePassportProfile}
                          size="lg"
                          disabled={
                            status === 'pending' || status === 'success'
                          }
                        >
                          {status === 'pending'
                            ? 'Solicitando...'
                            : status === 'success'
                              ? 'Redirigiendo'
                              : 'Solicitar Crédito'}
                          {status === 'pending' && (
                            <LoaderCircle className="ml-2 h-6 w-6 animate-spin text-white" />
                          )}
                        </Button>
                      </div>
                    ) : (
                      <Link
                        href="https://passport.talentprotocol.com/"
                        target="_blank"
                      >
                        <Button size="lg" className="text-xl">
                          Subir Puntaje{' '}
                          <ExternalLink className="ml-2 h-6 w-6" />
                        </Button>
                      </Link>
                    )}
                  </div>
                  <div className="w-full py-4 lg:w-4/5">
                    <h3 className="w-full lg:text-left">Talent Passport</h3>
                    <div className="grid grid-cols-1 gap-x-4 lg:grid-cols-2">
                      <div className="-mt-4 w-full lg:mt-0">
                        <BuilderScoreChart
                          builderScore={talentPassportData?.score ?? 0}
                        />
                      </div>
                      <div className="px-8 md:px-16 lg:flex lg:items-center lg:justify-start lg:px-0">
                        <ul className="text-left">
                          <li className="text-xl font-semibold">
                            Actividad: {talentPassportData?.activity_score}
                          </li>
                          <li className="text-xl font-semibold">
                            Identidad: {talentPassportData?.identity_score}
                          </li>
                          <li className="text-xl font-semibold">
                            Habilidades: {talentPassportData?.skills_score}
                          </li>
                          <li className="text-xl font-semibold">
                            Humano:{' '}
                            {talentPassportData?.human_checkmark
                              ? 'Sí'
                              : 'No verificado'}
                          </li>
                          {talentPassportData?.last_calculated_at && (
                            <li className="text-xl font-semibold">
                              Última actualización:{' '}
                              {new Date(
                                talentPassportData?.last_calculated_at,
                              ).toLocaleDateString('es-MX', {
                                year: 'numeric',
                                month: 'long', // full month name
                                day: 'numeric',
                              })}
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <NoPassportCard />
              ))}
            {talentPassportQueryStatus === 'error' && (
              <>
                <h2 className="text-destructive">Ocurrió un error</h2>

                <Button onClick={() => router.back()}>Regresar</Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </PageWithAppbar>
  )
}
