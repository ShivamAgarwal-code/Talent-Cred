import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

interface InfoCardProps {
  title: string
  content: string | number | React.ReactNode // Updated to include React.ReactNode
  icon: string | number | React.ReactNode // Updated to include React.ReactNode
}

// const InfoCard: React.FC<InfoCardProps> = ({ title, content }) => (
//   <div>
//       <h3>{title}</h3>
//       <p>{content}</p>
//   </div>
// );

//const InfoCard = ({ title, content, icon }: { title: string; content: string | number; icon?: React.ReactNode }) => (
const InfoCard: React.FC<InfoCardProps> = ({ title, content, icon }) => (
  <div className="mb-4 rounded-lg bg-white p-4">
    <h3 className="mb-1 text-sm text-muted-foreground">{title}</h3>
    <div className="flex items-center justify-center">
      <p className="text-xl font-semibold">{content}</p>
      {icon}
    </div>
  </div>
)

export default function Component() {
  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Resumen CrediTalent
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mx-auto max-w-lg">
          <InfoCard
            title="Balance Actual"
            content={
              <>
                $1,000 <span className="text-sm font-normal">MXN</span>
              </>
            }
            icon=""
          />
          <InfoCard title="Interes Variable" content="7.8%" icon="" />
          <InfoCard
            title="Status del Crédito"
            content={<span className="text-orange-500">Pendiente</span>}
            icon={<AlertCircle className="ml-2 h-5 w-5 text-orange-500" />}
          />
          <div className="mb-4 h-16 rounded-lg bg-secondary bg-white p-4"></div>
        </div>
      </CardContent>
    </Card>
  )
}
