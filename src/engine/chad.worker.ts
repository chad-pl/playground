// Runs the interpreter off the main thread
import createChadModule, { type ChadModule } from './wasm/chad'
import type { RunRequest, RunResponse } from './protocol'

let modulePromise: Promise<ChadModule> | null = null

function loadChad(): Promise<ChadModule> {
  modulePromise ??= createChadModule().catch((error: unknown) => {
    modulePromise = null // allow a retry on the next run
    throw error
  })
  return modulePromise
}

function respond(response: RunResponse) {
  self.postMessage(response)
}

self.onmessage = async (event: MessageEvent<RunRequest>) => {
  let chad: ChadModule
  try {
    chad = await loadChad()
  } catch (error) {
    return respond({ type: 'loadFailed', message: String(error) })
  }
  respond({ type: 'result', result: chad.run(event.data.source) })
}