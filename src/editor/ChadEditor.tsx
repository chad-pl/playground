import { useEffect, useRef } from 'react'
import { basicSetup } from 'codemirror'
import { EditorState, StateEffect, StateField, type Extension } from '@codemirror/state'
import { Decoration, EditorView, type DecorationSet } from '@codemirror/view'
import { lintGutter, setDiagnostics, type Diagnostic } from '@codemirror/lint'
import { chad } from './chadLanguage'

export interface ChadDiagnostic {
  line: number
  message: string
  severity?: 'error' | 'warning' | 'info'
}

export interface CurrentLine {
  line: number
  builtin?: boolean
}

interface ChadEditorProps {
  value: string
  onChange?: (value: string) => void
  diagnostics?: ChadDiagnostic[]
  currentLine?: CurrentLine | null
  readOnly?: boolean
}

const setCurrentLine = StateEffect.define<CurrentLine | null>()

const activeLineMark = Decoration.line({ class: 'cm-chad-active' })
const builtinLineMark = Decoration.line({ class: 'cm-chad-active cm-chad-builtin' })

const currentLineField = StateField.define<DecorationSet>({
  create: () => Decoration.none,
  update(decorations, tr) {
    decorations = decorations.map(tr.changes)
    for (const effect of tr.effects) {
      if (!effect.is(setCurrentLine)) continue
      const current = effect.value
      if (!current || current.line < 1 || current.line > tr.state.doc.lines) {
        decorations = Decoration.none
      } else {
        const from = tr.state.doc.line(current.line).from
        decorations = Decoration.set([(current.builtin ? builtinLineMark : activeLineMark).range(from)])
      }
    }
    return decorations
  },
  provide: (field) => EditorView.decorations.from(field),
})

function toDiagnostics(state: EditorState, items: ChadDiagnostic[]): Diagnostic[] {
  const lineCount = state.doc.lines
  return items.map((item) => {
    const line = state.doc.line(Math.min(Math.max(item.line, 1), lineCount))
    return { from: line.from, to: line.to, severity: item.severity ?? 'error', message: item.message }
  })
}

export function ChadEditor({ value, onChange, diagnostics = [], currentLine = null, readOnly = false }: ChadEditorProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    const extensions: Extension[] = [
      basicSetup,
      chad(),
      lintGutter(),
      currentLineField,
      EditorState.readOnly.of(readOnly),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) onChangeRef.current?.(update.state.doc.toString())
      }),
    ]
    const view = new EditorView({
      parent: hostRef.current!,
      state: EditorState.create({ doc: value, extensions }),
    })
    viewRef.current = view
    return () => {
      view.destroy()
      viewRef.current = null
    }
  }, [readOnly])

  useEffect(() => {
    const view = viewRef.current
    if (!view) return
    const current = view.state.doc.toString()
    if (current !== value) {
      view.dispatch({ changes: { from: 0, to: current.length, insert: value } })
    }
  }, [value])

  useEffect(() => {
    const view = viewRef.current
    if (!view) return
    view.dispatch(setDiagnostics(view.state, toDiagnostics(view.state, diagnostics)))
  }, [diagnostics])

  useEffect(() => {
    viewRef.current?.dispatch({ effects: setCurrentLine.of(currentLine) })
  }, [currentLine])

  return <div ref={hostRef} />
}