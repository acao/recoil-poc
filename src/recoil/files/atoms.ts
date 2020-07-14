import { atom, atomFamily, selectorFamily } from 'recoil'

import type { File } from './types'


export const allFilesState = atom<string[]>({
  key: 'Files',
  default: []
})

export const fileState = atomFamily<File, string>({
  key: 'File',
  default: selectorFamily<File, string>({
    key: 'File/default',
    get: (uri) => () => {
      const [pathWithoutExtension, extension] = uri.split(/_(.+)/)
      if (!extension) {
        throw Error(`Invalid path ${uri}, file extension is required.`)
      }
      return {
        extension,
        key: pathWithoutExtension,
        uri,
        value: null
      }
    },
  }),
})
