import Benefits from '@/components/landing/benefits'
import HelpNeeded from '@/components/landing/help-needed'
import Hero from '@/components/landing/hero'
import PageWithAppbar from '@/components/layout/pageWithAppbar'
import WhyAsk from '@/components/landing/why-ask'

export default function Home() {
  return (
    <PageWithAppbar>
      <div className="page text-center">
        <Hero />
        <Benefits />
        <WhyAsk />
        <HelpNeeded />
      </div>
    </PageWithAppbar>
  )
}
