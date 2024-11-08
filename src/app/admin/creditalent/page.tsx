'use client'
import PageWithAppbar from '@/components/layout/pageWithAppbar'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { WhitelistTable, CreditRequest } from './white-list-table'
import UnderWriterDepositWidget from './underWriterDepositWidget' // Assuming it's in the same folder
import Link from 'next/link'

async function getData(): Promise<CreditRequest[]> {
  // Mock data (same as before)
  const data = [
    {
      profile: {
        name: 'Usuario 1',
        walletAddress: '0x123',
        bio: 'Bio del usuario 1',
        address: 'Dirección 1',
      },
      pointsInfo: {
        activityScore: 85,
        identityScore: 92,
        skillsScore: 78,
        humanCheckmark: true,
      },
      approved: false,
    },
    {
      profile: {
        name: 'Usuario 2',
        walletAddress: '0x456',
        bio: 'Bio del usuario 2',
        address: 'Dirección 2',
      },
      pointsInfo: {
        activityScore: 60,
        identityScore: 74,
        skillsScore: 67,
        humanCheckmark: false,
      },
      approved: true,
    },
  ]
  const creditRequests = data.map(
    (item) => new CreditRequest(item.profile, item.pointsInfo, item.approved),
  )
  return creditRequests
}

export default function SolicitudesCredito() {
  const [whitelist, setWhitelist] = useState<CreditRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWhitelist = async () => {
      try {
        const creditRequests = await getData()
        setWhitelist(creditRequests)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching whitelist:', error)
        setIsLoading(false)
      }
    }

    fetchWhitelist()
  }, [])

  const handleApprove = async (creditRequest: CreditRequest) => {
    try {
      // TODO: call to contract approve

      const updatedWhitelist = whitelist.map((item) =>
        item.profile.walletAddress === creditRequest.profile.walletAddress
          ? { ...item, approved: true }
          : item,
      )
      setWhitelist(updatedWhitelist)
    } catch (error) {
      console.error('Error approving address:', error)
    }
  }

  const handleDeny = async (creditRequest: CreditRequest) => {
    console.log('🚀 ~ handleDeny ~ creditRequest:', creditRequest)
    try {
      // TODO: call to contract deny

      const updatedWhitelist = whitelist.map((item) =>
        item.profile.walletAddress === creditRequest.profile.walletAddress
          ? { ...item, approved: false }
          : item,
      )
      setWhitelist(updatedWhitelist)
    } catch (error) {
      console.error('Error denying address:', error)
    }
  }

  return (
    <PageWithAppbar>
      <div className="page gap-y-8 px-8 text-center">
        <h2>Consola del Prestamista</h2>
        <div className="flex flex-col justify-between gap-8 lg:flex-row">
          {/* Left Column: UnderWriterDepositWidget */}
          <div className="w-full lg:w-1/2">
            <UnderWriterDepositWidget />
          </div>

          {/* Right Column: Whitelist Table */}
          <div className="w-full lg:w-1/2">
            {isLoading ? (
              <div className="text-center">Cargando...</div>
            ) : (
              <WhitelistTable
                data={whitelist}
                onApprove={handleApprove}
                onDeny={handleDeny}
              />
            )}
          </div>
        </div>

        <Link href="/">
          <Button className={`mt-6 h-12 text-lg md:mt-8 lg:mt-8 xl:mt-12`}>
            Atrás
          </Button>
        </Link>
      </div>
    </PageWithAppbar>
  )
}
