import { WORKER_CRASHED } from '../data/messages'
import type { RunResult } from './wasm/chad'
import type { RunRequest, RunResponse } from './protocol'

export type { RunResult }

// worker reused across runs (lazy loaded)
let worker: Worker | null = null

function getWorker(): Worker {
  worker ??= new Worker(new URL('./chad.worker.ts', import.meta.url), { type: 'module' })
  return worker
}

function terminateWorker() {
  worker?.terminate()
  worker = null
}

export function runChad(source: string, signal: AbortSignal): Promise<RunResult> {
  return new Promise((resolve, reject) => {
    signal.throwIfAborted()
    const current = getWorker()

    const cleanup = () => {
      current.removeEventListener('message', onMessage)
      current.removeEventListener('error', onError)
      signal.removeEventListener('abort', onAbort)
    }

    const onMessage = (event: MessageEvent<RunResponse>) => {
      cleanup()
      const response = event.data
      if (response.type === 'result') resolve(response.result)
      else reject(new Error(response.message))
    }

    const onError = (event: ErrorEvent) => {
      cleanup()
      terminateWorker()
      reject(new Error(event.message || WORKER_CRASHED))
    }

    const onAbort = () => {
      cleanup()
      terminateWorker()
      reject(signal.reason)
    }

    current.addEventListener('message', onMessage)
    current.addEventListener('error', onError)
    signal.addEventListener('abort', onAbort)
    current.postMessage({ source } satisfies RunRequest)
  })
}