import createChadModule, { type ChadModule, type RunResult } from './wasm/chad'

export type { RunResult }

let modulePromise: Promise<ChadModule> | null = null

function loadChad(): Promise<ChadModule> {
  modulePromise ??= createChadModule().catch((error: unknown) => {
    modulePromise = null // allow a retry on the next run
    throw error
  })
  return modulePromise
}

export async function runChad(source: string): Promise<RunResult> {
  const chad = await loadChad()
  return chad.run(source)
}