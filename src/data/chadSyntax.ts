// mirrors chadnet/src/lang/lexer.cpp and the keyword set in parser.cpp
export const COMMENT_WORD = 'ngl'
export const KEYWORDS = new Set(['main', 'vs', 'if', 'else', 'and', 'or', 'not'])

export const NAME = /^[A-Za-z_][A-Za-z0-9_]*/
export const NUMBER = /^[0-9]+/
export const NUMBER_TAIL = /^[A-Za-z0-9_]+/

export const COMPARE_START = '=!<>'
export const OPERATOR_CHARS = '~+-*/%<>'