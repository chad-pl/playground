export interface RunResult {
  output: string
  error: string
  line: number
}

export interface ChadModule {
  run(source: string): RunResult
}

declare const createChadModule: () => Promise<ChadModule>
export default createChadModule