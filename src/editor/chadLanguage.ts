import {
  LanguageSupport,
  StreamLanguage,
  defaultHighlightStyle,
  syntaxHighlighting,
  type StringStream,
} from '@codemirror/language'
import {
  COMMENT_WORD,
  COMPARE_START,
  KEYWORDS,
  NAME,
  NUMBER,
  NUMBER_TAIL,
  OPERATOR_CHARS,
} from '../data/chadSyntax'

function literal(stream: StringStream, quote: string): string {
  let escaped = false
  while (!stream.eol()) {
    const c = stream.next()
    if (escaped) {
      escaped = false
    } else if (c === '\\') {
      escaped = true
    } else if (c === quote) {
      return 'string'
    }
  }
  return 'invalid'
}

export const chadStreamLanguage = StreamLanguage.define<null>({
  name: 'chad',
  startState: () => null,
  token(stream) {
    if (stream.eatSpace()) return null

    const word = stream.match(NAME)
    if (word) {
      const text = (word as RegExpMatchArray)[0]
      if (text === COMMENT_WORD) {
        stream.skipToEnd()
        return 'comment'
      }
      if (text[0] >= 'A' && text[0] <= 'Z') return 'typeName'
      return KEYWORDS.has(text) ? 'keyword' : 'variableName'
    }

    if (stream.match(NUMBER)) {
      return stream.match(NUMBER_TAIL) ? 'invalid' : 'number'
    }

    const c = stream.next()!
    if (c === "'" || c === '"') return literal(stream, c)

    if (c === '=' && stream.eat('>')) return 'operator'
    if (COMPARE_START.includes(c) && stream.eat('=')) return 'operator'
    if (OPERATOR_CHARS.includes(c)) return 'operator'
    if (c === '(' || c === ')') return 'paren'
    if (c === '[' || c === ']') return 'squareBracket'
    if (c === ',') return 'separator'
    return 'invalid'
  },
  languageData: {
    commentTokens: { line: COMMENT_WORD },
  },
})

export function chad(): LanguageSupport {
  return new LanguageSupport(chadStreamLanguage, [syntaxHighlighting(defaultHighlightStyle)])
}