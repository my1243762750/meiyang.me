/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MDXContentProps {
  content: string
}

export default function MDXContent({ content }: MDXContentProps) {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children, ...props }: any) => (
            <h1 className="mt-10 mb-4 text-3xl font-bold text-text-primary" {...props}>{children}</h1>
          ),
          h2: ({ children, ...props }: any) => (
            <h2 className="mt-10 mb-3 text-2xl font-semibold text-text-primary" {...props}>{children}</h2>
          ),
          h3: ({ children, ...props }: any) => (
            <h3 className="mt-8 mb-2 text-xl font-semibold text-text-primary" {...props}>{children}</h3>
          ),
          p: ({ children, ...props }: any) => (
            <p className="mb-4 leading-relaxed text-text-secondary" {...props}>{children}</p>
          ),
          ul: ({ children, ...props }: any) => (
            <ul className="mb-4 list-disc pl-6 text-text-secondary" {...props}>{children}</ul>
          ),
          ol: ({ children, ...props }: any) => (
            <ol className="mb-4 list-decimal pl-6 text-text-secondary" {...props}>{children}</ol>
          ),
          a: ({ children, ...props }: any) => (
            <a className="text-primary-500 underline decoration-primary-500/30 underline-offset-2 transition-colors duration-150 hover:decoration-primary-500" {...props}>{children}</a>
          ),
          code: ({ children, ...props }: any) => {
            const isInline = !content.includes(`\n${children}\n`) && !children.toString().includes('\n');
            if (isInline) {
              return (
                <code className="rounded-sm bg-bg-surface px-1.5 py-0.5 text-sm font-mono text-primary-500" {...props}>
                  {children}
                </code>
              )
            }
            return (
              <pre className="mb-6 overflow-x-auto rounded-lg bg-neutral-900 p-5 text-sm leading-relaxed text-neutral-200 shadow-md">
                <code className="font-mono" {...props}>{children}</code>
              </pre>
            )
          },
          blockquote: ({ children, ...props }: any) => (
            <blockquote className="mb-6 border-l-4 border-primary-500 bg-bg-surface py-3 pl-5 pr-4 italic text-text-secondary rounded-r-md" {...props}>
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-8 border-border-default" />,
          table: ({ children }: any) => (
            <div className="mb-6 overflow-x-auto rounded-lg border border-border-default">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          th: ({ children }: any) => (
            <th className="bg-bg-surface px-4 py-3 text-left font-semibold text-text-primary border-b border-border-default">{children}</th>
          ),
          td: ({ children }: any) => (
            <td className="px-4 py-3 text-text-secondary border-b border-border-default last:border-b-0">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
