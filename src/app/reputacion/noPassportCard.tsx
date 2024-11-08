import { ExternalLink } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function NoPassportCard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Pasaporte Talent Requerido
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Parece que aún no tienes un Pasaporte Talent. Se requiere un Pasaporte
          Talent para acceder a nuestras oportunidades y servicios exclusivos
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <a
            href="https://example.com/talent-passport"
            target="_blank"
            rel="noopener noreferrer"
          >
            Obtén tu Pasaporte
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
