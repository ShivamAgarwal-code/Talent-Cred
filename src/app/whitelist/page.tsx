'use client'

import PageWithAppbar from '@/components/layout/pageWithAppbar'
import { Button } from '@/components/ui/button'

// Mock data to simulate the API response
const mockPassports = [
  {
    activity_score: 85,
    identity_score: 92,
    skills_score: 78,
    human_checkmark: true,
    main_wallet: '0x1234567890abcdef1234567890abcdef12345678',
    passport_profile: {
      bio: 'Ingeniero con pasion por desarrollar la web3 de Mexico',
      display_name: 'Fulanito Perez',
      location: 'Hermosillo, MX',
    },
    verified_wallets: ['0x1234567890abcdef1234567890abcdef12345678'],
  },
  {
    activity_score: 60,
    identity_score: 74,
    skills_score: 67,
    human_checkmark: false,
    main_wallet: '0x456789abcdef123456789abcdef123456789abcdef',
    passport_profile: {
      bio: 'Entusiasta del blockchain y de desarrollar contratos inteligentes en Solidity',
      display_name: 'Fulana de Tal',
      location: 'Torreon, MX',
    },
    verified_wallets: ['0x456789abcdef123456789abcdef123456789abcdef'],
  },
]

export default function Whitelist() {
  return (
    <PageWithAppbar>
      <div className="page gap-y-8 text-center">
        <h2>Whitelist</h2>

        {/* Table Structure */}
        <table className=" w-4/5 bg-white table-auto border-collapse border border-gray-300 mt-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Perfil</th>
              <th className="border border-gray-300 px-4 py-2">Puntajes</th>
              <th className="border border-gray-300 px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockPassports.map((passport, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  <div className="text-left">
                    <p><strong>Nombre:</strong> {passport.passport_profile.display_name}</p>
                    <p><strong>Cartera:</strong> {passport.main_wallet}</p>
                    <p><strong>Bio:</strong> {passport.passport_profile.bio}</p>
                    <p><strong>Ubicacion:</strong> {passport.passport_profile.location}</p>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex flex-col gap-2">
                    <p><strong>Activity Score:</strong> {passport.activity_score}</p>
                    <p><strong>Identity Score:</strong> {passport.identity_score}</p>
                    <p><strong>Skills Score:</strong> {passport.skills_score}</p>
                    <p><strong>Human Checkmark:</strong> {passport.human_checkmark ? '✅' : '❌'}</p>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Button variant="default" className="mr-2 bg-green-500 text-white">Aprobar</Button>
                  <Button variant="destructive">Denegar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Back Button */}
        <Button className="mt-6 h-12 text-lg md:mt-8 lg:mt-8 xl:mt-12">
          Atrás
        </Button>
      </div>
    </PageWithAppbar>
  )
}

