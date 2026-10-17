import { useState } from 'react'
import { MAP_SAMPLE } from '../data/samples'
import { ChadEditor } from '../components/editor/ChadEditor'
import { Toolbar } from '../components/toolbar/Toolbar'
import './PlaygroundView.css'

export function PlaygroundView() {
  const [source, setSource] = useState(MAP_SAMPLE)

  function handleRun() {
    // placeholder until the wasm runner hook exists
    console.log(source)
  }

  return (
    <main className="playground">
      <Toolbar onRun={handleRun} />
      <ChadEditor value={source} onChange={setSource} />
    </main>
  )
}