import { editor } from "monaco-editor";

export type EditorTypes = 'operation' | 'variables' | 'results' | 'settings' | 'headers'

export type CodeEditor = editor.IStandaloneCodeEditor
