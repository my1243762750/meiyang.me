import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MDXContentProps {
  content: string
}

export default function MDXContent({ content }: MDXContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children, ...props }) => (
          <h1 className="mt-10 mb-4 text-3xl font-bold text-[var(--color-text-primary)]" {...props}>{children}</h1>
        ),
        h2: ({ children, ...props }) => (
          <h2 className="mt-10 mb-3 text-2xl font-semibold text-[var(--color-text-primary)]" {...props}>{children}</h2>
        ),
        h3: ({ children, ...props }) => (
          <h3 className="mt-8 mb-2 text-xl font-semibold text-[var(--color-text-primary)]" {...props}>{children}</h3>
        ),
        p: ({ children, ...props }) => (
          <p className="mb-4 leading-relaxed text-[var(--color-text-secondary)]" {...props}>{children}</p>
        ),
        ul: ({ children, ...props }) => (
          <ul className="mb-4 list-disc pl-6 text-[var(--color-text-secondary)]" {...props}>{children}</ul>
        ),
        ol: ({ children, ...props }) => (
          <ol className="mb-4 list-decimal pl-6 text-[var(--color-text-secondary)]" {...props}>{children}</ol>
        ),
        li: ({ children, ...props }) => (
          <li className="mb-1" {...props}>{children}</li>
        ),
        a: ({ children, ...props }) => (
          <a className="text-[#6C5CE7] underline decoration-[#6C5CE7]/30 underline-offset-2 transition-colors duration-150 hover:decoration-[#6C5CE7]" {...props}>{children}</a>
        ),
        code: ({ className, children, ...props }) => {
          const isInline = !className
          if (isInline) {
            return (
              <code className="rounded-[var(--radius-sm)] bg-[var(--color-surface)] px-1.5 py-0.5 text-sm font-mono text-[#6C5CE7]" {...props}>
                {children}
              </code>
            )
          }
          return (
            <pre className="mb-6 overflow-x-auto rounded-[var(--radius-lg)] bg-[#1A1A2E] p-5 text-sm leading-relaxed text-[#E4E5EF] shadow-[var(--shadow-md)]">
              <code className={className} {...props}>{children}</code>
            </pre>
          )
        },
        blockquote: ({ children, ...props }) => (
          <blockquote className="mb-6 border-l-4 border-[#6C5CE7] bg-[var(--color-surface)] py-3 pl-5 pr-4 italic text-[var(--color-text-secondary)] rounded-r-[var(--radius-md)]" {...props}>
            {children}
          </blockquote>
        ),
        hr: () => <hr className="my-8 border-[var(--color-border-default)]" />,
        table: ({ children }) => (
          <div className="mb-6 overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border-default)]">
            <table className="w-full border-collapse text-sm">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="bg-[var(--color-surface)] px-4 py-3 text-left font-semibold text-[var(--color-text-primary)] border-b border-[var(--color-border-default)]">{children}</th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 text-[var(--color-text-secondary)] border-b border-[var(--color-border-default)] last:border-b-0">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
