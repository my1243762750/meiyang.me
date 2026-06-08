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
          <h1 className="mt-8 mb-4 text-3xl font-bold" {...props}>{children}</h1>
        ),
        h2: ({ children, ...props }) => (
          <h2 className="mt-8 mb-3 text-2xl font-semibold" {...props}>{children}</h2>
        ),
        h3: ({ children, ...props }) => (
          <h3 className="mt-6 mb-2 text-xl font-semibold" {...props}>{children}</h3>
        ),
        p: ({ children, ...props }) => (
          <p className="mb-4 leading-relaxed text-zinc-700 dark:text-zinc-300" {...props}>{children}</p>
        ),
        ul: ({ children, ...props }) => (
          <ul className="mb-4 list-disc pl-6 text-zinc-700 dark:text-zinc-300" {...props}>{children}</ul>
        ),
        ol: ({ children, ...props }) => (
          <ol className="mb-4 list-decimal pl-6 text-zinc-700 dark:text-zinc-300" {...props}>{children}</ol>
        ),
        li: ({ children, ...props }) => (
          <li className="mb-1" {...props}>{children}</li>
        ),
        a: ({ children, ...props }) => (
          <a className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400" {...props}>{children}</a>
        ),
        code: ({ className, children, ...props }) => {
          const isInline = !className
          if (isInline) {
            return (
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm font-mono text-pink-600 dark:bg-zinc-800 dark:text-pink-400" {...props}>
                {children}
              </code>
            )
          }
          return (
            <pre className="mb-4 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
              <code className={className} {...props}>{children}</code>
            </pre>
          )
        },
        blockquote: ({ children, ...props }) => (
          <blockquote className="mb-4 border-l-4 border-blue-500 pl-4 italic text-zinc-600 dark:text-zinc-400" {...props}>
            {children}
          </blockquote>
        ),
        hr: () => <hr className="my-6 border-zinc-200 dark:border-zinc-800" />,
        table: ({ children }) => (
          <div className="mb-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-zinc-300 bg-zinc-100 px-3 py-2 text-left font-semibold dark:border-zinc-700 dark:bg-zinc-800">{children}</th>
        ),
        td: ({ children }) => (
          <td className="border border-zinc-300 px-3 py-2 dark:border-zinc-700">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
