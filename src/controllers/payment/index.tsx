import prisma from '@/utils/prisma'

// Create a new Payment
export const createPayment = async (data: {
  txHash: string
  walletId: string
  amountPaid: number
  evmTimestamp: number
  timestamp: Date
  loanId: number
  creditLineId: number
}) => {
  try {
    const newPayment = await prisma.payment.create({
      data,
    })
    return newPayment
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating Payment: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}

// Retrieve a Payment by ID
export const getPaymentById = async (id: number) => {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id },
    })
    if (!payment) throw new Error('Payment not found')
    return payment
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving Payment: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}

// Retrieve all Payments
export const getAllPayments = async () => {
  try {
    const payments = await prisma.payment.findMany()
    return payments
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving Payments: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}

// Update a Payment by ID
export const updatePaymentById = async (
  id: number,
  data: Partial<{
    txHash: string
    walletId: string
    amountPaid: number
    evmTimestamp: number
    timestamp: Date
    loanId: number
    creditLineId: number
  }>,
) => {
  try {
    const updatedPayment = await prisma.payment.update({
      where: { id },
      data,
    })
    return updatedPayment
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error updating Payment: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}

// Delete a Payment by ID
export const deletePaymentById = async (id: number) => {
  try {
    const deletedPayment = await prisma.payment.delete({
      where: { id },
    })
    return deletedPayment
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error deleting Payment: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}
