import { CreatePassportProfileData } from '@/types/api'
import { PassportProfile } from '@prisma/client'

export const fetchPassportProfile = async (
  dynamicWallet: string,
): Promise<PassportProfile | null> => {
  try {
    const response = await fetch(
      `/api/passport-profiles?dynamicWallet=${dynamicWallet}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch identity score: ${response.status}`)
    }

    const data = await response.json()
    console.log('API Response:', data) // Log the full response to inspect it

    return data
  } catch (error) {
    console.error('Error fetching identity score:', error)
    return null
  }
}

export const createPassportProfile = async (
  data: CreatePassportProfileData,
) => {
  const response = await fetch('/api/passport-profiles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  // Check if the response is successful
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to create passport profile')
  }

  const resData = await response.json() // Return the response data

  console.log(resData)

  return resData
}
