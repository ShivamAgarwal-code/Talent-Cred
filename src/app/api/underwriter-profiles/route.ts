import { NextResponse } from 'next/server'
import {
  createUnderwriterProfile,
  getUnderwriterProfileById,
  getAllUnderwriterProfiles,
  updateUnderwriterProfileById,
  deleteUnderwriterProfileById,
} from '@/controllers/underwriterProfile'

// Create or Get All UnderwriterProfiles
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newUnderwriterProfile = await createUnderwriterProfile(body)
    return NextResponse.json(newUnderwriterProfile, { status: 201 })
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
      const underwriterProfile = await getUnderwriterProfileById(Number(id))
      return NextResponse.json(underwriterProfile, { status: 200 })
    } else {
      const underwriterProfiles = await getAllUnderwriterProfiles()
      return NextResponse.json(underwriterProfiles, { status: 200 })
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

// Update an UnderwriterProfile
export async function PATCH(request: Request) {
  try {
    const { id, ...body } = await request.json()
    const updatedUnderwriterProfile = await updateUnderwriterProfileById(
      Number(id),
      body,
    )
    return NextResponse.json(updatedUnderwriterProfile, { status: 200 })
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

// Delete an UnderwriterProfile by ID
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  try {
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const deletedUnderwriterProfile = await deleteUnderwriterProfileById(
      Number(id),
    )
    return NextResponse.json(deletedUnderwriterProfile, { status: 200 })
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
