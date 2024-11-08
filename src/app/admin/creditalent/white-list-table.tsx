import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

// Model
export class CreditRequest {
  profile: Profile
  pointsInfo: PointsInfo
  approved: boolean

  constructor(profile: Profile, pointsInfo: PointsInfo, approved: boolean) {
    this.profile = profile
    this.pointsInfo = pointsInfo
    this.approved = approved
  }
}

interface Profile {
  name: string
  walletAddress: string
  bio: string
  address: string
}

interface PointsInfo {
  activityScore: number
  identityScore: number
  skillsScore: number
  humanCheckmark: boolean
}

interface WhitelistTableProps {
  data: CreditRequest[]
  onApprove: (creditRequest: CreditRequest) => void
  onDeny: (creditRequest: CreditRequest) => void
}

export const WhitelistTable: React.FC<WhitelistTableProps> = ({
  data,
  onApprove,
  onDeny,
}) => {
  return (
    <Table className="w-full min-w-[700px] table-fixed hover:bg-transparent">
      <TableHeader className="bg-gray-100">
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-2/5">
            <h3 className="text-xl font-semibold">Perfil</h3>
          </TableHead>
          <TableHead className="w-2/5">
            <h3 className="text-xl font-semibold">Puntaje</h3>
          </TableHead>
          <TableHead className="w-2/5">
            <h3 className="text-xl font-semibold">Acciones</h3>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-white">
        {data.map((creditRequest) => (
          <TableRow
            className="hover:bg-transparent"
            key={creditRequest.profile.walletAddress}
          >
            <TableCell className="text-left">
              <p>
                <strong>Nombre:</strong> {creditRequest.profile.name}
              </p>
              <p>
                <strong>Cartera:</strong> {creditRequest.profile.walletAddress}
              </p>
              <p>
                <strong>Bio:</strong> {creditRequest.profile.bio}
              </p>
              <p>
                <strong>Ubicación:</strong> {creditRequest.profile.address}
              </p>
            </TableCell>
            <TableCell className="text-left">
              <p>
                <strong>Activity Score:</strong>{' '}
                {creditRequest.pointsInfo.activityScore}
              </p>
              <p>
                <strong>Identity Score:</strong>{' '}
                {creditRequest.pointsInfo.identityScore}
              </p>
              <p>
                <strong>Skills Score:</strong>{' '}
                {creditRequest.pointsInfo.skillsScore}
              </p>
              <p>
                <strong>Human Checkmark:</strong>{' '}
                {creditRequest.pointsInfo.humanCheckmark ? '✅' : '❌'}
              </p>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                {creditRequest.approved ? (
                  <Button
                    disabled
                    variant="secondary"
                    onClick={() => onApprove(creditRequest)}
                  >
                    Aprobado
                  </Button>
                ) : (
                  <>
                    <Button
                      className="rounded bg-green-500 text-white hover:bg-green-700"
                      onClick={() => onApprove(creditRequest)}
                    >
                      Aprobar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => onDeny(creditRequest)}
                    >
                      Denegar
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
