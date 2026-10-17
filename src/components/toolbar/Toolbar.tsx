import { Button } from '../ui/Button'
import './Toolbar.css'

interface ToolbarProps {
  isRunning: boolean
  onRun: () => void
}

export function Toolbar({ isRunning, onRun }: ToolbarProps) {
  return (
    <div className="toolbar" role="toolbar" aria-label="Program controls">
      <Button loading={isRunning} onClick={onRun}>
        Run
      </Button>
    </div>
  )
}