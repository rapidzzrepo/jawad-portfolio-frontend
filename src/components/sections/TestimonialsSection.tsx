const testimonials = [
  {
    quote:
      "honestly, jawad saved us from a mess. we were glued together with 5 different tools and he just replaced all of them with one clean platform. our team genuinly stopped complaining about ops after that.",
    name: 'Danny Rubio',
    role: 'Director of Ops, SPiN Sports',
    mdMt: false,
  },
  {
    quote:
      "Jawad Abdullah built our lead search system and it just works. Before him, people were strugling to find the right leads. now its like night and day. dude knows what hes doing.",
    name: 'Haris Mehmood',
    role: 'Head of Product, Success.ai',
    mdMt: true,
  },
  {
    quote:
      "hired jawad for a healthcare workflow project that needed to be bulletproof. he delivered. compliance was tight, the AI features actually run in production without issues. rare combo of someone who gets both the tech AND the domain.",
    name: 'Dr. Ayesha Khan',
    role: 'CTO, MedFlow',
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-gutter items-stretch">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-surface-container-lowest p-6 sm:p-stack-lg rounded-xl shadow-sm border border-outline-variant/10 relative flex flex-col"
            >
              <span className="material-symbols-outlined text-surface-variant absolute top-4 sm:top-stack-md right-4 sm:right-stack-md text-3xl sm:text-6xl opacity-30 sm:opacity-50">
                format_quote
              </span>
              <p className="font-body-md text-[15px] sm:text-body-md text-on-surface mb-5 sm:mb-stack-md relative z-10 italic flex-1">
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
