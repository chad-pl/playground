import type { RunResult } from './wasm/chad'

// main thread -> worker
export interface RunRequest {
  source: string
}

// worker -> main thread
export type RunResponse =
  | { type: 'result'; result: RunResult }
  | { type: 'loadFailed'; message: string }