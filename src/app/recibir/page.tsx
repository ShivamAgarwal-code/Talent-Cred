'use client'

import Link from 'next/link'

import PageWithAppbar from '@/components/layout/pageWithAppbar'
import { Button } from '@/components/ui/button'

export default function Recibir() {
  return (
    <PageWithAppbar>
      <div className="page gap-y-8 text-center">
        <h2>Recibir</h2>
        <Link href="/">
          <Button className={`mt-6 h-12 text-lg md:mt-8 lg:mt-8 xl:mt-12`}>
            Atrás
          </Button>
        </Link>
      </div>
    </PageWithAppbar>
  )
}
