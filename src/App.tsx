import { useState } from 'react'
import { MAP_SAMPLE } from './data/samples'
import { ChadEditor } from './editor/ChadEditor'

function App() {
  const [source, setSource] = useState(MAP_SAMPLE)

  return (
    <div>
      <ChadEditor value={source} onChange={setSource} />
    </div>
  )
}

export default App