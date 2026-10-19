import { useCallback, useEffect, useRef, useState } from 'react'
import { INTERPRETER_LOAD_FAILED } from '../data/messages'
import { runChad, type RunResult } from '../engine/runtime'

export type RunStatus = 'idle' | 'running' | 'done' | 'stopped'

export function useChadRunner() {
  const [result, setResult] = useState<RunResult | null>(null)
  const [status, setStatus] = useState<RunStatus>('idle')
  const controllerRef = useRef<AbortController | null>(null)

  // kill still running program when the page unmounts
  useEffect(() => () => controllerRef.current?.abort(), [])

  const run = useCallback(async (source: string) => {
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    setResult(null)
    setStatus('running')
    try {
      setResult(await runChad(source, controller.signal))
      setStatus('done')
    } catch (error) {
      if (controller.signal.aborted) return // stop() already set the status
      setResult({ output: '', error: `${INTERPRETER_LOAD_FAILED}: ${String(error)}`, line: 0 })
      setStatus('done')
    }
  }, [])

  const stop = useCallback(() => {
    controllerRef.current?.abort()
    controllerRef.current = null
    setStatus('stopped')
  }, [])

  return { result, status, isRunning: status === 'running', run, stop }
}