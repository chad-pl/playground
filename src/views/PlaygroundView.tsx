import { useMemo, useState } from 'react'
import { MAP_SAMPLE } from '../data/samples'
import { ChadEditor, type ChadDiagnostic } from '../components/editor/ChadEditor'
import { Console } from '../components/console/Console'
import { Toolbar } from '../components/toolbar/Toolbar'
import { useChadRunner } from '../hooks/useChadRunner'
import './PlaygroundView.css'

export function PlaygroundView() {
  const [source, setSource] = useState(MAP_SAMPLE)
  const { result, isRunning, run } = useChadRunner()

  // line 0 = no location, negative = prelude; none map to the editor (for now)
  const diagnostics = useMemo<ChadDiagnostic[]>(
    () => (result?.error && result.line > 0 ? [{ line: result.line, message: result.error }] : []),
    [result],
  )

  return (
    <main className="playground">
      <Toolbar isRunning={isRunning} onRun={() => run(source)} />
      <div className="playground__workspace">
        <div className="playground__editor">
          <ChadEditor value={source} onChange={setSource} diagnostics={diagnostics} />
        </div>
        <Console result={result} />
      </div>
    </main>
  )
}