import { NextResponse } from 'next/server'
import {
  createPayment,
  getPaymentById,
  getAllPayments,
  updatePaymentById,
  deletePaymentById,
} from '@/controllers/payment'

// Create a new Payment or Get All Payments
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newPayment = await createPayment(body)
    return NextResponse.json(newPayment, { status: 201 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json(
        { error: 'An unknown error occurred' },
        { status: 500 },
      )
    }
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  try {
    if (id) {
      const payment = await getPaymentById(Number(id))
      return NextResponse.json(payment, { status: 200 })
    } else {
      const payments = await getAllPayments()
      return NextResponse.json(payments, { status: 200 })
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json(
        { error: 'An unknown error occurred' },
        { status: 500 },
      )
    }
  }
}

// Update or Delete a Payment
export async function PATCH(request: Request) {
  try {
    const { id, ...body } = await request.json()
    const updatedPayment = await updatePaymentById(Number(id), body)
    return NextResponse.json(updatedPayment, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json(
        { error: 'An unknown error occurred' },
        { status: 500 },
      )
    }
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  try {
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const deletedPayment = await deletePaymentById(Number(id))
    return NextResponse.json(deletedPayment, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json(
        { error: 'An unknown error occurred' },
        { status: 500 },
      )
    }
  }
}
