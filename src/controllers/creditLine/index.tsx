import prisma from '@/utils/prisma'

// Create a new CreditLine
export const createCreditLine = async (data: {
  walletId: string
  totalLimit: number
  availableLimit: number
  creditStatus?:
    | 'OK'
    | 'PARTIAL'
    | 'LATE'
    | 'OVERDUE'
    | 'DEFAULTED'
    | 'SETTLED'
    | 'NO_HISTORY'
  isOverdue?: boolean
  borrowerId: number
}) => {
  try {
    const newCreditLine = await prisma.creditLine.create({
      data,
    })
    return newCreditLine
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating CreditLine: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}

// Retrieve a CreditLine by ID
export const getCreditLineById = async (id: number) => {
  try {
    const creditLine = await prisma.creditLine.findUnique({
      where: { id },
    })
    if (!creditLine) throw new Error('CreditLine not found')
    return creditLine
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving CreditLine: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}

// Retrieve all CreditLines
export const getAllCreditLines = async () => {
  try {
    const creditLines = await prisma.creditLine.findMany()
    return creditLines
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving CreditLines: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}

// Update a CreditLine by ID
export const updateCreditLineById = async (
  id: number,
  data: Partial<{
    walletId: string
    totalLimit: number
    availableLimit: number
    creditStatus:
      | 'OK'
      | 'PARTIAL'
      | 'LATE'
      | 'OVERDUE'
      | 'DEFAULTED'
      | 'SETTLED'
      | 'NO_HISTORY'
    isOverdue: boolean
    borrowerId: number
  }>,
) => {
  try {
    const updatedCreditLine = await prisma.creditLine.update({
      where: { id },
      data,
    })
    return updatedCreditLine
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error updating CreditLine: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}

// Delete a CreditLine by ID
export const deleteCreditLineById = async (id: number) => {
  try {
    const deletedCreditLine = await prisma.creditLine.delete({
      where: { id },
    })
    return deletedCreditLine
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error deleting CreditLine: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}
