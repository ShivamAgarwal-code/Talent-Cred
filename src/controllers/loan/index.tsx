import prisma from '@/utils/prisma'

// Create a new Loan
export const createLoan = async (data: {
  status?: 'OK' | 'PARTIAL' | 'LATE' | 'OVERDUE' | 'DEFAULTED' | 'SETTLED'
  amount: number
  pendingBalance: number
  dueDate: Date
  walletId: string
  borrowerId: number
  creditLineId: number
  loanApplicationId: number
}) => {
  try {
    const newLoan = await prisma.loan.create({
      data,
    })
    return newLoan
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating Loan: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}

// Retrieve a Loan by ID
export const getLoanById = async (id: number) => {
  try {
    const loan = await prisma.loan.findUnique({
      where: { id },
    })
    if (!loan) throw new Error('Loan not found')
    return loan
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving Loan: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}

// Retrieve all Loans
export const getAllLoans = async () => {
  try {
    const loans = await prisma.loan.findMany()
    return loans
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving Loans: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}

// Update a Loan by ID
export const updateLoanById = async (
  id: number,
  data: Partial<{
    status: 'OK' | 'PARTIAL' | 'LATE' | 'OVERDUE' | 'DEFAULTED' | 'SETTLED'
    amount: number
    pendingBalance: number
    dueDate: Date
    walletId: string
    borrowerId: number
    creditLineId: number
    loanApplicationId: number
  }>,
) => {
  try {
    const updatedLoan = await prisma.loan.update({
      where: { id },
      data,
    })
    return updatedLoan
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error updating Loan: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}

// Delete a Loan by ID
export const deleteLoanById = async (id: number) => {
  try {
    const deletedLoan = await prisma.loan.delete({
      where: { id },
    })
    return deletedLoan
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error deleting Loan: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}
