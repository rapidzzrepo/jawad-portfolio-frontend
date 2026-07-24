const projects = [
  {
    title: 'SPiN Sports',
    subtitle: 'AI-powered sports network connecting youth clubs, families, and athletes.',
    tags: ['React', 'Next.js', 'Node.js', 'AWS'],
    image: '/FeaturedProjectsPictures/Spin.png',
    glowColor: 'rgba(34, 197, 94, 0.35)',
  },
  {
    title: 'Success.ai',
    subtitle: 'AI-driven B2B SaaS with hyper-personalised email automation and lead scoring.',
    tags: ['React', 'Node.js', 'MongoDB', 'OpenAI'],
    image: '/FeaturedProjectsPictures/SuccessAI.png',
    glowColor: 'rgba(59, 130, 246, 0.35)',
  },
]

export default function PortfolioSection() {
  return (
    <section
      className="py-16 sm:py-20 lg:py-section-gap max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-gutter"
      id="work"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-stack-lg gap-4 sm:gap-stack-md">
        <div className="max-w-xl">
          <h2 className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.2em] mb-2 sm:mb-stack-sm">
            Portfolio
          </h2>
          <h3 className="font-headline-md text-[28px] sm:text-[32px] md:text-headline-md text-primary">
            Selected Engineering Milestones
          </h3>
        </div>
        <a
          className="font-label-caps text-label-caps text-primary border-b border-primary pb-1 uppercase tracking-widest hover:opacity-70 transition-opacity px-2 py-1 -mx-2 -my-1"
          href="#work"
        >
          View All Work
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-gutter">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group cursor-pointer relative rounded-xl border border-outline-variant/20 transition-all duration-500"
          >
            <div
              className="absolute -inset-1 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
              style={{ boxShadow: `0 0 30px 8px ${project.glowColor}` }}
            />
            <div className="relative z-[1] overflow-hidden rounded-xl">
              <div className="relative w-full aspect-[16/10] bg-surface-container overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 sm:opacity-0 transition-opacity flex items-center justify-center">
                  <span className="bg-surface text-on-surface px-4 sm:px-gutter py-2 sm:py-stack-sm rounded-full font-label-caps text-label-caps uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    View Project
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-stack-md flex justify-between items-start gap-3">
                <div className="min-w-0">
                  <h4 className="font-headline-sm text-[18px] sm:text-headline-sm text-primary mb-1">
                    {project.title}
                  </h4>
                  <p className="text-on-surface-variant font-body-md text-[14px] sm:text-body-md">
                    {project.subtitle}
                  </p>
                </div>
                <div className="flex gap-1.5 sm:gap-base shrink-0 flex-wrap justify-end">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 sm:px-base py-1 bg-surface-container rounded font-mono-label text-[9px] sm:text-[10px] uppercase text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
