import { Button } from '../ui/Button'
import './Toolbar.css'

interface ToolbarProps {
  onRun: () => void
}

export function Toolbar({ onRun }: ToolbarProps) {
  return (
    <div className="toolbar" role="toolbar" aria-label="Program controls">
      <Button onClick={onRun}>Run</Button>
    </div>
  )
}