import {
  CreditLine,
  Loan,
  LoanApplication,
  UnderwriterProfile,
} from '@prisma/client'

export type CreatePassportProfileData = {
  dynamicUserId: string
  dynamicWallet: string
  mainWallet: string
  verifiedWallets: string[]
  talentPassportId: number
  talentUserId: string
  name: string
  profilePictureUrl: string
  verified: boolean
  humanCheck: boolean
  score: number
  activityScore: number
  identityScore: number
  skillsScore: number
  nominationsReceived: number
  socialsLinked: number
  followerCount: number
  totalLimit?: number
}

export type CreateLoanApplicationData = {
  amount: number
  availableCreditLine: number
  status?: string
  xocScore: number
  builderScore: number
  nominationsReceived: number
  followers: number
  walletId: string
  applicantId: number
  creditLineId: number
  reviewedById?: number
}

export interface PassportProfileExtended extends CreatePassportProfileData {
  id?: number
  creditLine?: CreditLine
  loans: Loan[]
  loanApplications: LoanApplication[]
  underwriterProfile?: UnderwriterProfile
}

export interface LoanApplicationExtended extends CreateLoanApplicationData {
  id?: number
  creditLine?: CreditLine
  applicant: PassportProfileExtended
  reviewedBy?: UnderwriterProfile
}

export type UpdateLoanApplicationByIdData = {
  id: number
  amount?: number
  availableCreditLine?: number
  xocScore?: number
  builderScore?: number
  nominationsReceived?: number
  followers?: number
  walletId?: string
  status?: 'PENDING' | 'APPROVED' | 'REJECTED'
  reviewedById?: number
  applicantId?: number
}
