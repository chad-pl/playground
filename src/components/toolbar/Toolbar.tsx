import { Button } from '../ui/Button'
import './Toolbar.css'

interface ToolbarProps {
  isRunning: boolean
  onRun: () => void
  onStop: () => void
}

export function Toolbar({ isRunning, onRun, onStop }: ToolbarProps) {
  return (
    <div className="toolbar" role="toolbar" aria-label="Program controls">
      <Button loading={isRunning} onClick={onRun}>
        Run
      </Button>
      <Button variant="secondary" disabled={!isRunning} onClick={onStop}>
        Stop
      </Button>
    </div>
  )
}