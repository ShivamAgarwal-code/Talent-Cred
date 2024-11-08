import { NextResponse } from 'next/server'
import {
  createPassportProfile,
  getAllPassportProfiles,
  updatePassportProfileById,
  deletePassportProfileById,
  getPassportProfileByWalletId,
} from '@/controllers/passportProfile'

// Create or Get All PassportProfiles
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newProfile = await createPassportProfile(body)
    return NextResponse.json(newProfile, { status: 201 })
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
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
  const walletId = searchParams.get('dynamicWallet')

  try {
    if (walletId) {
      const profile = await getPassportProfileByWalletId(walletId)
      return NextResponse.json(profile, { status: 200 })
    } else {
      const profiles = await getAllPassportProfiles()
      return NextResponse.json(profiles, { status: 200 })
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json(
        { error: 'An unknown error occurred' },
        { status: 500 },
      )
    }
  }
}

// Update or Delete a PassportProfile
export async function PATCH(request: Request) {
  try {
    const { id, ...body } = await request.json()
    const updatedProfile = await updatePassportProfileById(Number(id), body)
    return NextResponse.json(updatedProfile, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
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

    const deletedProfile = await deletePassportProfileById(Number(id))
    return NextResponse.json(deletedProfile, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json(
        { error: 'An unknown error occurred' },
        { status: 500 },
      )
    }
  }
}
