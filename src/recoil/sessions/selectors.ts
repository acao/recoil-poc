
import { selectorFamily } from 'recoil'

import { sessionState } from './atoms'
import { fileByUri } from '../files'
import { getSessionFile, defaultSessionIfNull } from './lib'

import type { File } from '../types'
import type { SessionFileParameters } from './types'

export const fullSessionSelector = selectorFamily({
  key: 'Session/full',
  get: (id: number) => ({ get }) => {
    const session = get(sessionState(id))
    return {
      ...session,
      files: {
        operation: get(fileByUri(session.files.operation)),
        variables: get(fileByUri(session.files.variables)),
        results: get(fileByUri(session.files.results)),
      }
    }
  }
})
/**
 * For accessing/updating an entire session file, by type
 * 
 * @example
 * const { model: opModel } = get(sessionFileSelector({ type: 'operation', sessionId: 0 })
 *
 * opModel?.onDidChangeContent((e) => {
 *     set(sessionFileSelector({
 *       type: 'operation',
 *       sessionId: 0
 *     }),
 *       { value: opModel.getValue() }
 *     )
 * })
 */
export const sessionFileSelector = selectorFamily<File, SessionFileParameters>({
  key: 'Session/file',
  get: (params) => ({ get }) => getSessionFile(get, params).file,
  set: (params) => async ({ get, set }, newValue) => {
    const { file, fileAtom } = getSessionFile(get, params)
    set(fileAtom, {
      ...file,
      ...newValue as File
    })
  }
})


export const sessionValueSelector = selectorFamily<string, SessionFileParameters>({
  key: 'Session/fileValue',
  get: ({ type, sessionId }) => ({ get }) => {
    const id = defaultSessionIfNull(get, sessionId)
    const session = get(sessionState(id))
    return get(fileByUri(session.files[type])).value as string
  },
  set: (params) => ({ get, set }, newValue) => {
    const { file, fileAtom } = getSessionFile(get, params)
    if (file.value !== newValue && typeof newValue === 'string' && newValue.length > 1) {
      file.value = newValue as string
      set(fileAtom, file)
    }
  }
})

