'use client'

import {useState} from 'react'

type CodeBlockProps = {
  code?: string
  label?: string
}

export function CodeBlock({code = '', label}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = code
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      textarea.remove()
    }

    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section className="code-block">
      <div className="code-block-toolbar">
        <span className="code-block-label">{label || 'Code'}</span>
        <button className="code-block-copy" type="button" onClick={copyCode} aria-label="Copy code">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre><code>{code}</code></pre>
    </section>
  )
}
