import type { VariableDefinitionNode } from 'graphql'

export type SessionFiles =
  'operation' |
  'variables' |
  'results' |
  'headers'


export type SessionUris = {
  operation: string,
  variables: string,
  results: string,
  [key: string]: string
}

export type SessionState = {
  sessionId: number
  files: SessionUris,
  variablesToType?: { [typename: string]: VariableDefinitionNode }
}

export type SessionFileParameters = {
  type: SessionFiles,
  sessionId?: number
}
