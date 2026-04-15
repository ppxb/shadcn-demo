import { useEffect, useState } from 'react'

import { HalftoneBackground } from '@/components/halftone-bg'
import { ChangelogContent } from './changelog-content'
import { HistoryIcon } from 'lucide-react'

interface GithubRelease {
  id: number
  tag_name: string
  name: string
  body: string
  html_url: string
  prerelease: boolean
  published_at: string
}

export default function ChangelogPage() {
  const [releases, setReleases] = useState<GithubRelease[]>([])

  useEffect(() => {
    fetch('https://api.github.com/repos/NextDoc4j/nextdoc4j/releases', {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        })
      }
    })
      .then(res => res.json())
      .then(data => setReleases(data.filter((r: GithubRelease) => !r.prerelease)))
      .catch(err => console.error('Changelog fetch failed:', err))
  }, [])

  function getContent(content: string) {
    const lines = content.split('\n')
    const newContext = lines.map(line => {
      if (line.trim().startsWith('## ') || line.trim().startsWith('### ')) {
        return line.split('date=')[0].trim()
      }
      if (line.trim().startsWith('- ')) {
        const mainContent = line.split(';')[0]
        const context = line.split(';')[2]
        const mentionMatches = (context ?? line)?.match(/@([A-Za-z0-9-]+)/g) ?? []
        if (mentionMatches.length === 0) {
          return (mainContent || line).replace(/&nbsp/g, '')
        }
        const mentions = mentionMatches.map(match => {
          const username = match.slice(1)
          const avatarUrl = `https://github.com/${username}.png`
          return `[![${match}](${avatarUrl})](https://github.com/${username})`
        })
        return (mainContent || line).replace(/&nbsp/g, '') + ' \u2013 ' + mentions.join(' ')
      }
      return line
    })
    return newContext.join('\n')
  }

  const messages = releases.map(release => {
    const content = getContent(release.body)
    const lineCount = content.split('\n').filter(l => l.trim().length > 0).length
    return {
      tag: release.tag_name,
      title: release.name,
      content,
      date: new Date(release.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      url: release.html_url,
      expandable: lineCount > 15
    }
  })

  return (
    <div className="flex min-h-dvh flex-col pt-14 lg:flex-row lg:pt-0">
      <div className="relative hidden w-full shrink-0 overflow-clip border-b border-foreground/6 px-5 sm:px-6 lg:sticky lg:top-0 lg:block lg:h-dvh lg:w-[30%] lg:border-r lg:border-b-0 lg:px-10">
        <HalftoneBackground />
        <div className="relative flex w-full flex-col justify-center pt-6 pb-6 md:pt-10 lg:h-full lg:pb-0">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <HistoryIcon className="size-3.5 text-foreground/60" />
              <span className="text-sm text-foreground/60">Changelog</span>
            </div>
            <h1 className="text-2xl leading-tight tracking-tight text-neutral-800 md:text-3xl xl:text-4xl dark:text-neutral-200">
              All changes, fixes, and updates
            </h1>
            <p className="max-w-60 text-sm leading-relaxed text-foreground/70 dark:text-foreground/50">
              Every release shipped to NextDoc4j, straight from GitHub.
            </p>
          </div>

          <div className="mt-5 space-y-0 border-t border-foreground/10 pt-4">
            <div className="flex items-baseline justify-between border-b border-dashed border-foreground/6 py-1.5">
              <span className="text-xs tracking-wider text-foreground/70 uppercase dark:text-foreground/50">
                Latest
              </span>
              <span className="font-mono text-xs text-foreground/85 dark:text-foreground/75">
                {messages?.[0]?.tag ?? '\u2014'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <a
              href="https://github.com/NextDoc4j/nextdoc4j/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[12px] tracking-wider text-foreground/70 uppercase transition-colors hover:text-foreground/80 dark:text-foreground/50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-3 w-3 opacity-50"
              >
                <path
                  fill="currentColor"
                  d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                />
              </svg>
              GitHub Releases
            </a>
          </div>
        </div>
      </div>

      <ChangelogContent messages={messages ?? []} />
    </div>
  )
}
