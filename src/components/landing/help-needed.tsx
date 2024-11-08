import Image from 'next/image'
import { Button } from '../ui/button'

export default function HelpNeeded() {
  return (
    <section className="w-full bg-white py-16 lg:py-20 xl:py-24">
      <div className="container mx-auto px-8 md:max-w-screen-sm md:px-6 lg:max-w-screen-md xl:max-w-screen-lg">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="relative h-[300px] lg:h-[450px]">
            <Image
              src="/images/human-5.png"
              alt="Man in suit pointing"
              layout="fill" // Ensures the image fills the container
              objectFit="contain" // Prevents the image from being cut at the top and bottom
              className="rounded-lg"
            />
          </div>
          <div className="order-first space-y-4 text-left lg:order-last">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Estamos aquí para <span className="text-primary">ayudarte</span>
            </h2>
            <p className="text-gray-500 md:text-lg">
              Sabemos que la vida no es perfecta. Pero si todo lo que se
              necesita es un poco de dinero para hacer la vida un poco más
              fácil, Creditalent te tiene cubierto. ¿Necesitas fondos
              adicionales para terminar una costosa renovación? Te tenemos
              cubierto. ¿Necesitas hacer un viaje de emergencia para visitar a
              un ser querido en el extranjero? Te tenemos cubierto. ¿Necesitas
              dinero para pagar una costosa factura hospitalaria? ¡Te tenemos
              cubierto!
            </p>
            <p className="text-gray-500 md:text-lg">
              Ya sea de noche o de día, te ayudamos a conectarte directamente
              con un prestamista. ¡Trabajamos las 24 horas del día! Con una gran
              red de prestamistas, estamos seguros de que encontrarás nuestro
              servicio una gran solución en momentos de necesidad.
            </p>
            <p className="font-semibold">
              Conecta tu cartera para ver si puedes obtener un préstamo de hasta
              $1,500 XOC.
            </p>
            <div className="flex w-full justify-center">
              <Button size="lg" className="mt-4">
                <a
                  href="https://t.me/+fPuMaOwBkUU5ZTgx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  Unete al grupo →
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
