import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'
import { cn } from '@/lib/utils'

interface Props {
  code: string
  lang: string
  className?: string
}

export function CodeBlock({ code, lang, className }: Props) {
  const [html, setHtml] = useState('')

  useEffect(() => {
    codeToHtml(code, {
      lang,
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark'
      },
      defaultColor: 'light'
    }).then(setHtml)
  }, [code, lang])

  if (!html) {
    return (
      <pre className={cn('overflow-x-auto border p-4 text-sm', className)}>
        <code>{code}</code>
      </pre>
    )
  }

  return (
    <div
      className={cn(
        '[&_pre]:overflow-x-auto [&_pre]:border [&_pre]:p-4 [&_pre]:text-sm',
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
