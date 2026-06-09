export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">About Me</h1>
      <div className="mt-10 flex flex-col gap-6 text-base leading-relaxed text-[var(--color-text-secondary)]">
        <p>
          I&apos;m a frontend developer with experience building web applications
          across multiple domains — from AI tools and real-time chat apps to
          browser extensions and mapping services.
        </p>
        <p>
          I&apos;ve worked with React, Vue, Flutter, Node.js, and various cloud
          services. I enjoy understanding how things work under the hood and
          writing about what I learn. I also maintain my own
          design system — <a href="https://github.com/my1243762750/meiyang.me/tree/main" className="text-[#6C5CE7] underline decoration-[#6C5CE7]/30 underline-offset-2 transition-colors duration-150 hover:decoration-[#6C5CE7]">mei-ui-system</a> —
          a token-based UI specification that powers my projects.
        </p>

        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mt-4">
          Skills
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            "JavaScript / TypeScript",
            "React / Next.js",
            "Vue / Nuxt",
            "Node.js / Express",
            "CSS / Tailwind",
            "Flutter / Dart",
            "Web Extensions",
            "Git / CI/CD",
            "REST / WebSocket",
          ].map((skill) => (
            <div
              key={skill}
              className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] px-4 py-3.5 text-sm font-medium text-[var(--color-text-primary)] shadow-[var(--shadow-sm)] transition-all duration-150 hover:border-[#6C5CE7]/30 hover:shadow-[var(--shadow-md)]"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
