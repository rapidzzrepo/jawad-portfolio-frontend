import profileImg from '../../assets/profile-whatsapp.jpeg'

export default function MissionSection() {
  return (
    <section
      className="py-16 sm:py-20 lg:py-section-gap max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-gutter"
      id="story"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-gutter items-center">
        <div className="md:col-span-5">
          <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-2xl">
            <img
              alt="Professional portrait"
              className="w-full h-full object-cover object-[center_20%]"
              src={profileImg}
            />
          </div>
        </div>
        <div className="md:col-span-7 space-y-5 sm:space-y-stack-md md:pl-stack-lg">
          <h2 className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.2em]">
            The Mission
          </h2>
          <h3 className="font-headline-md text-[28px] sm:text-[32px] md:text-headline-md text-primary leading-snug">
            Shipping AI systems that real users rely on daily.
          </h3>
          <p className="font-body-md text-body-md text-secondary">
            I design and deploy production-ready AI agents, RAG pipelines, and
            LLM-powered workflows that automate complex business processes.
            Backed by solid engineering fundamentals across the full stack, I
            build intelligent systems from concept to production.
          </p>
          <div className="pt-3 sm:pt-stack-sm flex gap-6 sm:gap-stack-md">
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary">
                10+
              </span>
              <span className="font-mono-label text-[12px] sm:text-mono-label text-on-surface-variant uppercase">
                Years Experience
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary">
                7+
              </span>
              <span className="font-mono-label text-[12px] sm:text-mono-label text-on-surface-variant uppercase">
                Key Projects
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
