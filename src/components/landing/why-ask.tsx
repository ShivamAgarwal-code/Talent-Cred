import Image from 'next/image'

export default function WhyAsk() {
  const reasons = [
    'Ir al cine (Chipi Pay)',
    'Comprar una recarga al cel (Chipi Pay)',
    'Comprar una giftcard (Chipi Pay)',
    'Invertir en DeFi (Alux)',
    'Sin procesos complicados',
    'Úsalo para lo que quieras',
  ]

  return (
    <section className="w-full bg-inherit pb-0 pt-16 md:py-16">
      <div className="container mx-auto px-8 md:max-w-screen-sm md:px-6 lg:max-w-screen-md xl:max-w-screen-lg">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h2 className="text-left text-4xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              ¿Para qué puedo usar
              <br /> <span className="ml-6">mi</span>{' '}
              <span className="font-semibold text-primary">CrediTalent</span>?
            </h2>
            <ul className="space-y-2">
              {reasons.map((reason, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-2 text-left"
                >
                  <svg
                    className="h-8 w-8 text-primary"
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
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-2xl font-medium">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[400px] lg:h-[600px]">
            <Image
              src="/images/human-4.png"
              alt="Man holding cash and smartphone"
              layout="fill"
              objectFit="contain" // Change to contain to prevent cropping
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
