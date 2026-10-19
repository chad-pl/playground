import type { RunStatus } from '../hooks/useChadRunner'

export const CONSOLE_PLACEHOLDER: Record<RunStatus, string> = {
  idle: 'Run the program to see its output',
  running: 'Running...',
  done: 'No output',
  stopped: 'Stopped',
}