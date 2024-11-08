import Image from 'next/image'
import { Card } from '../ui/card'
import AuthButton from '@/components/buttons/authButton'

export default function Hero() {
  return (
    <section className="w-full bg-inherit pb-0 pt-6 md:h-[calc(100vh-5rem)] md:max-w-screen-sm md:pt-16 lg:max-w-screen-md lg:py-8 xl:max-w-screen-lg xl:py-24 2xl:max-w-screen-xl">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-4 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2 px-4">
              <h1 className="text-4xl font-bold leading-none tracking-tighter sm:text-5xl">
                Préstamos de hasta{' '}
                <span className="text-orange-500">$1,500</span> basado en tu
                reputación
              </h1>
              <p className="hidden max-w-[600px] text-gray-500 md:visible md:text-xl">
                Conecta tu Talent Passport
              </p>
            </div>
            <div className="flex w-full justify-center px-8 md:px-0">
              <Card className="w-full max-w-lg px-4 pb-6 pt-4 align-middle md:p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center">
                        <div className="mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white md:h-24 md:w-24 md:text-4xl">
                        77
                        </div>
                      <div className="mt-2 text-center text-lg leading-none text-foreground">
                        Builder Score
                      </div>
                    </div>
                    <div className="mb-8 text-6xl font-bold text-foreground">
                      =
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-4xl font-semibold text-foreground md:text-5xl mt-10 mb-5">
                        $1,500
                        <span className="text-base font-bold">MXN</span>
                      </div>
                      <div className="text-lg text-foreground">
                        Crédito disponible
                      </div>
                    </div>
                  </div>
                  <AuthButton />
                </div>
              </Card>
            </div>
            <div className="flex w-full justify-center">
              <div className="flex max-w-lg flex-col justify-center gap-y-2 px-4 text-sm text-gray-500 md:flex-row md:gap-y-0">
                <div className="flex w-full items-center justify-start gap-x-2 text-left md:w-1/3 md:justify-center">
                  <svg
                    className="h-6 w-6 md:h-8 md:w-8"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                  <span>Seguro y protegido</span>
                </div>
                <div className="flex w-full items-center justify-start gap-x-2 text-left md:w-1/3 md:justify-center">
                  <svg
                    className="h-6 w-6 md:h-12 md:w-12"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>2-3 minutos de procesamiento</span>
                </div>
                <div className="flex w-full items-center justify-start gap-x-2 text-left md:w-1/3 md:justify-center">
                  <svg
                    className="h-6 w-6 md:h-10 md:w-10"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                  </svg>
                  <span>Fondos disponibles al instante</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex h-96 w-full items-start lg:order-first lg:h-auto lg:w-auto">
            <Image
              src="/images/happy-girl.png"
              layout="fill" // Makes the image fill the entire container
              objectFit="contain" // Prevents the image from being cut on any side
              alt="Happy woman in yellow hoodie"
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
