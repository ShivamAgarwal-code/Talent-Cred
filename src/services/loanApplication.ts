import {
  CreateLoanApplicationData,
  UpdateLoanApplicationByIdData,
} from '@/types/api'
import { LoanApplication } from '@prisma/client'

export const fetchLoanApplications =
  async (): Promise<LoanApplication | null> => {
    try {
      const response = await fetch(`/api/loan-applications`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch identity score: ${response.status}`)
      }

      const data = await response.json()
      console.log('API Response:', data) // Log the full response to inspect it

      return data
    } catch (error) {
      console.log(error)
      console.error('Error fetching loan applications:', error)
      return null
    }
  }

export const createLoanApplication = async (
  data: CreateLoanApplicationData,
) => {
  try {
    const response = await fetch('/api/loan-applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to create loan application')
    }

    const resData = await response.json() // Return the response data

    console.log(resData)

    return resData
  } catch (error) {
    console.log(error)
    console.error('Error creating loan application:', error)
    return null
  }
}

export const updateLoanApplication = async (
  data: UpdateLoanApplicationByIdData,
) => {
  try {
    const response = await fetch('/api/loan-applications', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to create loan application')
    }

    const resData = await response.json() // Return the response data

    console.log(resData)

    return resData
  } catch (error) {
    console.log(error)
    console.error('Error updating loan application:', error)
    return null
  }
}
