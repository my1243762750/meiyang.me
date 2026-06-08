export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold">About Me</h1>
      <div className="mt-8 flex flex-col gap-6 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          I&apos;m a frontend developer with experience building web applications
          across multiple domains — from AI tools and real-time chat apps to
          browser extensions and mapping services.
        </p>
        <p>
          I&apos;ve worked with React, Vue, Flutter, Node.js, and various cloud
          services. I enjoy understanding how things work under the hood and
          writing about what I learn.
        </p>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Skills
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
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
              className="rounded-lg border border-zinc-200 px-4 py-3 text-sm font-medium dark:border-zinc-800"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
