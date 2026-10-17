import { useEffect, useState } from 'react'
import { MAP_SAMPLE } from '../data/samples'
import { ChadEditor } from '../components/editor/ChadEditor'
import { Toolbar } from '../components/toolbar/Toolbar'
import { useChadRunner } from '../hooks/useChadRunner'
import './PlaygroundView.css'

export function PlaygroundView() {
  const [source, setSource] = useState(MAP_SAMPLE)
  const { result, isRunning, run } = useChadRunner()

  // temp
  useEffect(() => {
    if (result) console.log(result)
  }, [result])

  return (
    <main className="playground">
      <Toolbar isRunning={isRunning} onRun={() => run(source)} />
      <ChadEditor value={source} onChange={setSource} />
    </main>
  )
}