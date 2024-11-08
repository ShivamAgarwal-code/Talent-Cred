import { NextResponse } from 'next/server'
import {
  createLoan,
  getLoanById,
  getAllLoans,
  updateLoanById,
  deleteLoanById,
} from '@/controllers/loan'

// Create a new Loan or Get All Loans
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newLoan = await createLoan(body)
    return NextResponse.json(newLoan, { status: 201 })
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
      const loan = await getLoanById(Number(id))
      return NextResponse.json(loan, { status: 200 })
    } else {
      const loans = await getAllLoans()
      return NextResponse.json(loans, { status: 200 })
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

// Update or Delete a Loan
export async function PATCH(request: Request) {
  try {
    const { id, ...body } = await request.json()
    const updatedLoan = await updateLoanById(Number(id), body)
    return NextResponse.json(updatedLoan, { status: 200 })
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

    const deletedLoan = await deleteLoanById(Number(id))
    return NextResponse.json(deletedLoan, { status: 200 })
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
