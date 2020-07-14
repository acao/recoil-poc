import type { RecoilState } from 'recoil'
import type { File, SessionFileParameters, SessionState } from "../types";

import { fileByUri } from '../files'
import { activeSession, sessionState } from './atoms'

const supportedExtensions = ['graphql', 'gql', 'json', 'yaml', 'yml'];

const defaultFilePaths = ['operation.graphql', 'variables.json', 'results.json', 'settings.json']

export function getSessionFileUri(sessionId: number, filePath: string) {
  if (!supportedExtensions.find(ext => filePath.endsWith(ext))) {
    throw Error('This file extension is not supported')
  }
  return `file:///sessions/${sessionId}/${filePath}`
}


export function getSessionFileUris(sessionId: number, filePaths: string[] = defaultFilePaths): File[] {
  return filePaths.map((filePath) => {
    const [pathWithoutExtension, extension] = filePath.split(/_(.+)/)
    if (!extension) {
      throw Error(`Invalid path ${filePath}, file extension is required.`)
    }
    return {
      extension,
      filePath,
      key: pathWithoutExtension,
      uri: getSessionFileUri(sessionId, filePath),
      value: ''
    }
  })
}

export const defaultSessionIfNull = (get: (session: RecoilState<number>) => number, sessionId?: number) => {
  if (!sessionId) {
    sessionId = get(activeSession)
  }
  return sessionId
}

export const getSessionFile = (
  get: <T>(session: RecoilState<T>) => T,
  { type, sessionId }: SessionFileParameters,
) => {
  const id = defaultSessionIfNull(get, sessionId)
  const session = get<SessionState>(sessionState(id))
  const uri = session.files[type]
  if (!uri) {
    throw new Error(`Invalid session file type: ${type}`)
  }

  const fileAtom = fileByUri(uri)
  const file = get<File>(fileAtom)

  return { fileAtom, file, uri }
}

