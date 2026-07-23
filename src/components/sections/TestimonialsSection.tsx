const testimonials = [
  {
    quote:
      '"Replaced five disconnected tools with one intelligent platform. The AI automation alone saved our team hours every week."',
    name: 'Club Operations',
    role: 'SPiN Sports Platform',
    mdMt: false,
  },
  {
    quote:
      '"The RAG pipeline and semantic search transformed how our users find leads. Response accuracy went through the roof."',
    name: 'Product Team',
    role: 'Success.ai',
    mdMt: true,
  },
  {
    quote:
      '"Built compliance-grade healthcare workflows with AI at the core. The system handles real clinical processes reliably."',
    name: 'Engineering Lead',
    role: 'MedFlow',
    mdMt: false,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-section-gap overflow-hidden">
      <div className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-gutter">
        <h2 className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.2em] mb-8 sm:mb-stack-lg text-center">
          Collaborator Voices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-gutter">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className={`bg-surface-container-lowest p-6 sm:p-stack-lg rounded-xl shadow-sm border border-outline-variant/10 relative ${
                testimonial.mdMt ? 'md:mt-stack-md' : ''
              }`}
            >
              <span className="material-symbols-outlined text-surface-variant absolute top-4 sm:top-stack-md right-4 sm:right-stack-md text-3xl sm:text-6xl opacity-30 sm:opacity-50">
                format_quote
              </span>
              <p className="font-body-md text-[15px] sm:text-body-md text-on-surface mb-5 sm:mb-stack-md relative z-10 italic">
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-2 sm:gap-base">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface-container"></div>
                <div>
                  <h5 className="font-headline-sm text-[13px] sm:text-sm text-primary">
                    {testimonial.name}
                  </h5>
                  <p className="font-mono-label text-[10px] sm:text-[10px] text-secondary uppercase">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
