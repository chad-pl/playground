import { CONSOLE_PLACEHOLDER } from '../../data/console'
import type { RunResult } from '../../engine/runtime'
import type { RunStatus } from '../../hooks/useChadRunner'
import './Console.css'

interface ConsoleProps {
  result: RunResult | null
  status: RunStatus
}

export function Console({ result, status }: ConsoleProps) {
  const isEmpty = !result || (!result.output && !result.error)

  return (
    <section className="console" aria-label="Program output">
      <h2 className="console__title">Output</h2>
      <pre className="console__body" aria-live="polite">
        {isEmpty ? (
          <span className="console__placeholder">{CONSOLE_PLACEHOLDER[status]}</span>
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