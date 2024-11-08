import prisma from '@/utils/prisma'

// Create a new UnderwriterProfile
export const createUnderwriterProfile = async (data: {
  name: string
  passportProfileId: number
}) => {
  try {
    const newUnderwriterProfile = await prisma.underwriterProfile.create({
      data,
    })
    return newUnderwriterProfile
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating UnderwriterProfile: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}

// Retrieve an UnderwriterProfile by ID
export const getUnderwriterProfileById = async (id: number) => {
  try {
    const underwriterProfile = await prisma.underwriterProfile.findUnique({
      where: { id },
    })
    if (!underwriterProfile) throw new Error('UnderwriterProfile not found')
    return underwriterProfile
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving UnderwriterProfile: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}

// Retrieve all UnderwriterProfiles
export const getAllUnderwriterProfiles = async () => {
  try {
    const underwriterProfiles = await prisma.underwriterProfile.findMany()
    return underwriterProfiles
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving UnderwriterProfiles: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}

// Update an UnderwriterProfile by ID
export const updateUnderwriterProfileById = async (
  id: number,
  data: Partial<{
    name: string
    passportProfileId: number
    status: 'ACTIVE' | 'PAUSED' | 'BANNED' | 'INACTIVE'
  }>,
) => {
  try {
    const updatedUnderwriterProfile = await prisma.underwriterProfile.update({
      where: { id },
      data,
    })
    return updatedUnderwriterProfile
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error updating UnderwriterProfile: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}

// Delete an UnderwriterProfile by ID
export const deleteUnderwriterProfileById = async (id: number) => {
  try {
    const deletedUnderwriterProfile = await prisma.underwriterProfile.delete({
      where: { id },
    })
    return deletedUnderwriterProfile
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error deleting UnderwriterProfile: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}
