import prisma from '@/utils/prisma'
import { Loan } from '@prisma/client'

// Create a new LoanApplication
export const createLoanApplication = async (data: {
  amount: number
  availableCreditLine: number
  xocScore: number
  builderScore: number
  nominationsReceived: number
  followers: number
  walletId: string
  status?: 'PENDING' | 'APPROVED' | 'REJECTED'
  reviewedById: number
  applicantId: number
  creditLineId: number
}) => {
  try {
    const existingLoanApplication = await prisma.loanApplication.findFirst({
      where: {
        AND: [{ applicantId: data.applicantId }, { status: 'PENDING' }],
      },
    })
    if (existingLoanApplication) {
      throw new Error(
        'Ya existe una solicitud de préstamo con estatus pendiente',
      )
    }
    const newLoanApplication = await prisma.loanApplication.create({
      data,
    })
    return newLoanApplication
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating LoanApplication: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}

// Retrieve a LoanApplication by ID
export const getLoanApplicationById = async (id: number) => {
  try {
    const loanApplication = await prisma.loanApplication.findUnique({
      where: { id },
    })
    if (!loanApplication) throw new Error('LoanApplication not found')
    return loanApplication
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving LoanApplication: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}

// Retrieve all LoanApplications
export const getAllLoanApplications = async () => {
  try {
    const loanApplications = await prisma.loanApplication.findMany({
      include: {
        applicant: true,
        creditLine: true,
      },
    })
    return loanApplications
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving LoanApplications: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}

// Update a LoanApplication by ID
export const updateLoanApplicationById = async (
  id: number,
  data: Partial<{
    amount: number
    availableCreditLine: number
    xocScore: number
    builderScore: number
    nominationsReceived: number
    followers: number
    walletId: string
    status: 'PENDING' | 'APPROVED' | 'REJECTED'
    reviewedById: number
    applicantId: number
  }>,
) => {
  let loan: Loan | null = null
  try {
    const updatedLoanApplication = await prisma.loanApplication.update({
      where: { id },
      data: {
        ...data,
      },
    })
    if (
      data.status === 'PENDING' &&
      updatedLoanApplication.status === 'APPROVED'
    ) {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 30)

      loan = await prisma.loan.create({
        data: {
          amount: updatedLoanApplication.amount,
          pendingBalance: updatedLoanApplication.amount,
          dueDate: futureDate,
          walletId: updatedLoanApplication.walletId,
          borrowerId: updatedLoanApplication.applicantId,
          creditLineId: updatedLoanApplication.creditLineId,
          loanApplicationId: updatedLoanApplication.id,
        },
      })
    }
    return { updatedLoanApplication, loan }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error updating LoanApplication: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}

// Delete a LoanApplication by ID
export const deleteLoanApplicationById = async (id: number) => {
  try {
    const deletedLoanApplication = await prisma.loanApplication.delete({
      where: { id },
    })
    return deletedLoanApplication
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error deleting LoanApplication: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}
