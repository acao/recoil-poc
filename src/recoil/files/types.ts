import type monaco from 'monaco-editor'
import type { DocumentNode } from 'graphql'

export type File = {
  uri: string | null,
  value: string | null,
  extension: string,
  valueAst?: DocumentNode,
  model?: monaco.editor.ITextModel
}
