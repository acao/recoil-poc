import { selectorFamily } from "recoil"
import { parse } from "graphql";

import { fileState, allFilesState } from './atoms'
import type { File } from './types'

// const [pathWithoutExtension, extension] = filePath.split(/_(.+)/)
// if (!extension) {
//   throw Error(`Invalid path ${filePath}, file extension is required.`)
// }
// return {
//   extension,
//   filePath,
//   key: pathWithoutExtension,
//   uri: getSessionFileUri(sessionId, filePath),
//   value: ''
// }

export const fileByUri = selectorFamily<File, string>({
  key: 'File/getByURI',
  get: uri => ({ get }) => {
    const file = get(fileState(uri));

    return file;
  },
  set: (uri) => ({ set, get }, newFile) => {
    const oldFile = get(fileState(uri))
    const allFiles = get(allFilesState)
    if (!allFiles.includes(uri)) {
      allFiles.push(uri)
      set(allFilesState, allFiles)
    }

    if (oldFile !== newFile && 'value' in newFile && newFile.value !== null && newFile.value?.length > 1) {
      newFile.valueAst = parse(newFile.value as string);
    }
    set(fileState(uri), { ...oldFile, ...newFile })
  }
});
