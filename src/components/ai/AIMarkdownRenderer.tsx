'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';

interface AIMarkdownRendererProps {
  content: string;
}

/**
 * Preprocess assistant text to ensure clean Markdown interpretation:
 * 1. Remove unnecessary markdown markers around quotes or suggested prompts (e.g. `*"quote"*` or `*\"quote\"*`)
 * 2. Convert Unicode bullets '• ' at start of lines into standard Markdown list items '- '
 * 3. Ensure lists preceded immediately by a paragraph line have a blank line so CommonMark creates a <ul> / <ol>
 */
function preprocessMarkdown(content: string): string {
  if (!content) return '';
  let processed = content;

  // 1. Remove awkward combinations of asterisks with quotes, such as `*"text"*` or `"*text*"` or `**"text"**`
  processed = processed.replace(/\*+["'](.*?)["']\*+/g, '"$1"');
  processed = processed.replace(/["']\*+(.*?)\*+["']/g, '"$1"');
  processed = processed.replace(/\*+([\"'])/g, '$1');
  processed = processed.replace(/([\"'])\*+/g, '$1');

  // 2. Convert Unicode bullet '• ' or '\u2022' at the start of any line into standard markdown '- '
  processed = processed.replace(/^([ \t]*)[•\u2022][ \t]+/gm, '$1- ');

  // 3. Ensure that when a paragraph is directly followed by a list item without a blank line,
  // we insert a newline so the parser creates a <ul>/<ol> instead of combining into <p>
  processed = processed.replace(/^([^\n\-*#\d\s].*)\n([ \t]*[-*]|\d+\.)/gm, '$1\n\n$2');

  return processed;
}

export function AIMarkdownRenderer({ content }: AIMarkdownRendererProps) {
  const processed = React.useMemo(() => preprocessMarkdown(content), [content]);

  return (
    <div className="ai-markdown-content text-[13px] leading-relaxed text-[#D4D4E4] font-sans break-words [overflow-wrap:anywhere]">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-sm sm:text-base font-bold text-[#F8FAFC] mt-3 mb-1.5 pb-1 border-b border-[#26263A] first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xs sm:text-sm font-bold text-[#F8FAFC] mt-2.5 mb-1.5 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xs font-bold text-[#A78BFA] uppercase tracking-wider mt-2 mb-1 first:mt-0">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xs font-semibold text-[#F8FAFC] mt-1.5 mb-1 first:mt-0">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="my-1.5 text-[#D4D4E4] leading-relaxed first:mt-0 last:mb-0">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-[#F8FAFC]">{children}</strong>
          ),
          b: ({ children }) => (
            <b className="font-semibold text-[#F8FAFC]">{children}</b>
          ),
          em: ({ children }) => (
            <em className="italic text-[#D4D4E4]/90">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="my-2 ml-1 pl-4 space-y-1 list-disc marker:text-[#A78BFA] text-[#D4D4E4]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-2 ml-1 pl-4 space-y-1 list-decimal marker:text-[#A78BFA] text-[#D4D4E4]">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed pl-1 text-[#D4D4E4] my-0.5">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-2 pl-3 py-1 border-l-2 border-[#A78BFA] bg-[#161624]/60 rounded-r text-[#D4D4E4]/90 italic text-xs">
              {children}
            </blockquote>
          ),
          pre: ({ children }) => (
            <pre className="my-2 p-2.5 bg-[#0D0D14] border border-[#232334] rounded-lg overflow-x-auto text-xs font-mono text-purple-200">
              {children}
            </pre>
          ),
          code: ({ className, children }) => {
            const isBlock =
              Boolean(className?.includes('language-')) ||
              (typeof children === 'string' && children.includes('\n'));
            if (isBlock) {
              return (
                <code className={`block font-mono text-xs ${className || ''}`}>
                  {children}
                </code>
              );
            }
            return (
              <code className="px-1.5 py-0.5 mx-0.5 bg-[#14141F] border border-purple-500/30 text-[#A78BFA] rounded text-[11px] font-mono">
                {children}
              </code>
            );
          },
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A78BFA] hover:text-white underline font-medium transition-colors"
            >
              {children}
            </a>
          ),
          hr: () => <hr className="my-2.5 border-[#26263A]" />
        }}
      >
        {processed}
      </ReactMarkdown>
    </div>
  );
}
