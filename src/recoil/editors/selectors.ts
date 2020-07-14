import { selectorFamily } from "recoil";

import { editorState } from './atoms'
import { CodeEditor, EditorTypes } from './types'

export const editorByKey = selectorFamily<CodeEditor, EditorTypes>({
  key: 'Editors/byKey',
  get: (editorKey: EditorTypes) => ({ get }) => {
    const editorForKey = get(editorState(editorKey)) as CodeEditor
    if (!editorForKey) {
      throw Error(`No Editor found for key:${editorKey}. You must set the editor for this key first.`)
    }
    return editorForKey
  },
  set: (editorKey) => ({ set }, editorInstance) => {
    set(editorState(editorKey), editorInstance)
  }
})


export const editorValue = selectorFamily<string, EditorTypes>({
  key: 'Editors/byKey',
  get: (editorKey: EditorTypes) => ({ get }) => {
    const editorForKey = get(editorState(editorKey)) as CodeEditor
    if (!editorForKey) {
      throw Error(`No Editor found for key:${editorKey}. You must set the editor for this key first.`)
    }
    return editorForKey.getValue()
  },
  set: (editorKey) => ({ get, set }, string) => {
    const editor = get(editorState(editorKey))
    editor?.setValue(string as string)
  }
})
