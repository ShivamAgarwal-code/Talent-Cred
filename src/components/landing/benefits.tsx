import Image from 'next/image'

export default function Benefits() {
  return (
    <section className="flex w-full justify-center bg-white py-12 md:py-24">
      <div className="container px-8 md:max-w-screen-sm md:px-6 lg:max-w-screen-md xl:max-w-screen-lg">
        <h2 className="mb-12 text-center text-3xl font-bold xl:text-4xl">
          Usamos tu{' '}
          <span className="text-violet-600">
            <a
              href="https://www.talentprotocol.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Talent Passport
            </a>
          </span>{' '}
          para calcular tu perfil de riesgo y extenderte una línea de crédito
          on-chain.
        </h2>
        <div className="grid gap-6 lg:grid-cols-3 lg:grid-rows-1">
          <div className="flex flex-col items-center justify-between text-center">
            <div className="flex items-end">
              <Image
                src="/images/human-1.png"
                width={200}
                height={200}
                alt="Connect your passport"
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <h3 className="mb-2 text-xl font-semibold">
                Conecta tu pasaporte
              </h3>
                <p className="text-gray-500">
                Todo el papeleo es on-chain. Todo el proceso es es por medio de
                contratos inteligentes. Nuestra mision es ayudar a Builders en
                el ecosistema, especialmente a los que estan construyendo en{' '}
                <a
                  href="https://www.base.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  Base
                </a>{' '}
                y{' '}
                <a
                  href="https://passport.talentprotocol.com/profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-600"
                >
                  Talent Protocol
                </a>
                .
                </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between text-center">
            <div className="flex items-end">
              <Image
                src="/images/human-2.png"
                width={200}
                height={200}
                alt="Fast process"
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <h3 className="mb-2 text-xl font-semibold">Proceso Rápido</h3>
              <p className="text-gray-500">
                Transaccionar en el blockchain no es rapido ni sencillo, pero Base es un Layer 2 que permite transacciones rapidas y baratas.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between text-center">
            <div className="flex items-end">
              <Image
                src="/images/human-3.png"
                width={200}
                height={200}
                alt="Instant cash"
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <h3 className="mb-2 text-xl font-semibold">Lana Instantánea</h3>
                <p className="text-gray-500">
                Una vez que tu perfil sea revisado, obtendras credito de parte de tu patrón.
                Podrás recibir los fondos en tu wallet y usar ese
                dinero para pagar servicios por medio de{' '}
                <a
                  href="https://www.chipipay.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-500"
                >
                  Chipi Pay
                </a>.
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
