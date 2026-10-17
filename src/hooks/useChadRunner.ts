import { useCallback, useState } from 'react'
import { runChad, type RunResult } from '../engine/runtime'

export function useChadRunner() {
  const [result, setResult] = useState<RunResult | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const run = useCallback(async (source: string) => {
    setIsRunning(true)
    try {
      setResult(await runChad(source))
    } catch (error) {
      setResult({ output: '', error: `Could not load the interpreter: ${String(error)}`, line: 0 })
    } finally {
      setIsRunning(false)
    }
  }, [])

  return { result, isRunning, run }
}