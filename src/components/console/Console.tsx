import type { RunResult } from '../../engine/runtime'
import './Console.css'

interface ConsoleProps {
  result: RunResult | null
}

export function Console({ result }: ConsoleProps) {
  const isEmpty = !result || (!result.output && !result.error)

  return (
    <section className="console" aria-label="Program output">
      <h2 className="console__title">Output</h2>
      <pre className="console__body" aria-live="polite">
        {isEmpty ? (
          <span className="console__placeholder">{result ? 'No output' : 'Run the program to see its output'}</span>
        ) : (
          <>
            {result.output}
            {result.error && <span className="console__error">{result.error}</span>}
          </>
        )}
      </pre>
    </section>
  )
}