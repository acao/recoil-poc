import { atom, atomFamily } from 'recoil'

import { Monaco } from 'use-monaco'
import { CodeEditor, EditorTypes } from './types'

export const monacoState = atom<Monaco | null>({
  key: 'monaco',
  default: null
})


export const editorState = atomFamily<CodeEditor | null, EditorTypes>({
  key: 'Editors',
  default: null,
})
