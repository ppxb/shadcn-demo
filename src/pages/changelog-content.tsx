import { ChevronDown } from 'lucide-react'
import { useRef, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { DynamicCodeBlock } from '@/components/ui/dynamic-code-block'
import { cn } from '@/lib/utils'

interface ReleaseMessage {
  tag: string
  title: string
  content: string
  date: string
  url: string
  expandable: boolean
}

function ReleaseBody({ content, expandable }: { content: string; expandable: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    if (isExpanded) {
      setIsExpanded(false)
      const group = containerRef.current?.closest('.group')
      if (group) {
        const offset = group.getBoundingClientRect().top - 40
        window.scrollBy({ top: offset, behavior: 'smooth' })
      }
    } else {
      setIsExpanded(true)
    }
  }

  return (
    <div ref={containerRef}>
      <div className="relative">
        <div
          className={cn(
            'changelog-content max-w-3xl',
            expandable && !isExpanded && 'max-h-100 overflow-y-hidden'
          )}
        >
          <MarkdownContent content={content} />
        </div>
        {expandable && !isExpanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-background via-background/80 to-transparent" />
        )}
      </div>
      {expandable && (
        <button
          type="button"
          onClick={handleToggle}
          className="mt-12 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronDown
            className={cn('size-3.5 transition-transform duration-200', isExpanded && 'rotate-180')}
          />
          {isExpanded ? 'Collapse release' : 'Expand release'}
        </button>
      )}
    </div>
  )
}

function MarkdownContent({ content }: { content: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children, ...props }) => (
          <h2
            className="mt-6 mb-3 text-2xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-200 [&_code]:text-xl"
            {...props}
          >
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3
            className="mt-5 mb-2 text-xl font-semibold tracking-tight text-neutral-700 dark:text-neutral-300 [&_code]:text-lg"
            {...props}
          >
            {children}
          </h3>
        ),
        p: props => <p className="my-2 text-sm leading-7 text-muted-foreground" {...props} />,
        ul: props => (
          <ul className="my-3 space-y-1.5 in-[ul]:mt-1.5 in-[ul]:mb-0 in-[ul]:ml-2" {...props} />
        ),
        li: props => (
          <li
            className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:text-foreground/50 before:content-['-']"
            {...props}
          />
        ),
        a: ({
          className,
          ...props
        }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
          className?: string
        }) => (
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'font-medium text-neutral-600 underline decoration-dashed underline-offset-4 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white',
              className
            )}
            {...props}
          />
        ),
        strong: props => <strong className="font-medium text-foreground/90" {...props} />,
        blockquote: props => (
          <blockquote
            className="mt-4 border-l-2 border-foreground/15 pl-4 text-sm text-muted-foreground italic"
            {...props}
          />
        ),
        ol: props => (
          <ol
            className="my-3 ml-6 list-decimal space-y-1.5 text-sm text-muted-foreground"
            {...props}
          />
        ),
        hr: () => null,
        img: props => (
          <img
            className="mx-0.5 inline-block h-5 w-5 rounded-full border align-text-bottom opacity-80"
            {...props}
            style={{ maxWidth: '100%' }}
            alt={props.alt || ''}
          />
        ),
        pre: ({ children }) => {
          const codeEl = children as React.ReactElement<{
            className?: string
            children?: string
          }>
          const className = codeEl?.props?.className || ''
          const lang = className.replace(/language-/, '') || 'text'
          const code =
            typeof codeEl?.props?.children === 'string' ? codeEl.props.children.trim() : ''
          return (
            <div className="my-4">
              <DynamicCodeBlock
                lang={lang}
                code={code}
                codeblock={{ className: 'border rounded-md' }}
              />
            </div>
          )
        },
        code: ({ className, children, ...props }) => {
          if (className?.includes('language-')) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
          return (
            <code
              className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-xs text-neutral-600 dark:text-neutral-300"
              {...props}
            >
              {children}
            </code>
          )
        },
        table: props => (
          <div className="my-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm" {...props} />
          </div>
        ),
        thead: props => <thead className="border-b" {...props} />,
        tbody: props => <tbody {...props} />,
        tr: props => (
          <tr
            className="border-b border-foreground/6 transition-colors hover:bg-muted/50"
            {...props}
          />
        ),
        th: props => (
          <th
            className="h-10 px-3 text-left align-middle text-xs font-bold text-muted-foreground"
            {...props}
          />
        ),
        td: props => <td className="px-3 py-2.5 align-middle text-sm" {...props} />
      }}
    >
      {content}
    </Markdown>
  )
}

export function ChangelogContent({ messages }: { messages: ReleaseMessage[] }) {
  return (
    <div className="flex flex-col">
      {messages.map(release => (
        <div
          key={release.tag}
          className="group border-b border-dashed px-5 py-16 first:pt-8 sm:px-6 lg:px-8"
        >
          {/* Release header */}
          <div className="mb-4 flex items-baseline">
            <div className="flex items-center gap-3">
              <a
                href={release.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl font-medium tracking-tight text-neutral-800 transition-colors hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-white"
              >
                {release.title || release.tag}
              </a>
              {release.title && release.title !== release.tag && (
                <span className="rounded-sm border bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                  {release.tag}
                </span>
              )}
            </div>
            <time className="ml-4 shrink-0 font-mono text-xs tracking-tight text-muted-foreground">
              {release.date}
            </time>
          </div>

          {/* Release body */}
          <ReleaseBody content={release.content} expandable={release.expandable} />
        </div>
      ))}

      <div className="px-5 py-12 sm:px-6 lg:px-8">
        <a
          href="https://github.com/better-auth/better-auth/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          View all releases on GitHub &rarr;
        </a>
      </div>
    </div>
  )
}
