import { Link } from 'react-router-dom'
import Starfield from '../ui/Starfield'

export default function CallToActionSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-section-gap relative overflow-hidden" id="timeline" style={{ backgroundColor: 'rgb(0, 0, 0)' }}>
      <Starfield canvasId="cta-starfield" options={{ count: 120, baseSpeed: 0.08, reactiveRadius: 150 }} />
      <div className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-gutter text-center py-8 sm:py-stack-lg relative z-10">
        <h2 className="font-display-lg text-headline-md md:text-display-lg text-white mb-5 sm:mb-stack-md">
          Let's build something intelligent.
        </h2>
        <p className="font-body-lg text-[16px] sm:text-body-lg text-white/70 max-w-xl mx-auto mb-6 sm:mb-stack-lg">
          Available for AI engineering, full-stack development, and technical
          leadership roles worldwide.
        </p>
        <Link to="/connect" className="inline-block bg-white text-black px-6 sm:px-stack-lg py-3.5 sm:py-stack-md rounded-xl font-label-caps text-label-caps uppercase tracking-widest hover:scale-105 transition-transform active:opacity-80">
          Initiate Conversation
        </Link>
      </div>
    </section>
  )
}
