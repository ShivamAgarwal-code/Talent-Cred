import { NextResponse } from 'next/server'
import {
  createCreditLine,
  getCreditLineById,
  getAllCreditLines,
  updateCreditLineById,
  deleteCreditLineById,
} from '@/controllers/creditLine'

// Create a new CreditLine or Get All CreditLines
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newCreditLine = await createCreditLine(body)
    return NextResponse.json(newCreditLine, { status: 201 })
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
      const creditLine = await getCreditLineById(Number(id))
      return NextResponse.json(creditLine, { status: 200 })
    } else {
      const creditLines = await getAllCreditLines()
      return NextResponse.json(creditLines, { status: 200 })
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

// Update or Delete a CreditLine
export async function PATCH(request: Request) {
  try {
    const { id, ...body } = await request.json()
    const updatedCreditLine = await updateCreditLineById(Number(id), body)
    return NextResponse.json(updatedCreditLine, { status: 200 })
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

    const deletedCreditLine = await deleteCreditLineById(Number(id))
    return NextResponse.json(deletedCreditLine, { status: 200 })
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
