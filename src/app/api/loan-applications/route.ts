import { NextResponse } from 'next/server'
import {
  createLoanApplication,
  getLoanApplicationById,
  getAllLoanApplications,
  updateLoanApplicationById,
  deleteLoanApplicationById,
} from '@/controllers/loanApplication'

// Create a new LoanApplication or Get All LoanApplications
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newLoanApplication = await createLoanApplication(body)
    return NextResponse.json(newLoanApplication, { status: 201 })
  } catch (error) {
    console.log(error)
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
      const loanApplication = await getLoanApplicationById(Number(id))
      return NextResponse.json(loanApplication, { status: 200 })
    } else {
      const loanApplications = await getAllLoanApplications()
      return NextResponse.json(loanApplications, { status: 200 })
    }
  } catch (error) {
    console.log(error)
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

// Update or Delete a LoanApplication
export async function PATCH(request: Request) {
  try {
    const { id, ...body } = await request.json()
    const updatedLoanApplication = await updateLoanApplicationById(
      Number(id),
      body,
    )
    return NextResponse.json(updatedLoanApplication, { status: 200 })
  } catch (error) {
    console.log(error)
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

    const deletedLoanApplication = await deleteLoanApplicationById(Number(id))
    return NextResponse.json(deletedLoanApplication, { status: 200 })
  } catch (error) {
    console.log(error)
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
