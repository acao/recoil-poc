import { atomFamily, atom, selectorFamily } from 'recoil'

import { getSessionFileUri } from './lib'

import type { SessionState } from './types'

// export const sessionFamilyForType = (type: SessionFiles) => atomFamily({
//   key: `sessions/${type}`,
//   default: selectorFamily({
//     key: `sessions/${type}/default`,
//     get: ({ sessionId, type }) => ({ get }) => {
//       return (sessionId);
//     },
//     set: sessionId => ({ get }) => {

//     },
//   }),
// });

export const activeSession = atom({
  key: 'sessions/current',
  default: 0
})

export const allSessionsState = atom<number[]>({
  key: `sessions`,
  default: []
})

export const sessionState = atomFamily<SessionState, number>({
  key: `session`,
  default: selectorFamily({
    key: 'Session/default',
    get: (id: number) => () => ({
      sessionId: id,
      files: {
        operation: getSessionFileUri(id, 'operation.graphql'),
        variables: getSessionFileUri(id, 'variables.json'),
        results: getSessionFileUri(id, 'results.json'),
      }
    }),
    set: (id: number) => ({ set, get }, newVal) => {
      const sessions = get(allSessionsState)
      if (!sessions.includes(id)) {
        sessions.push(id)
        set(allSessionsState, sessions)
      }

      return newVal
    }
  })
})



// const handleAddSession = useAddSession()

// export const operationState = sessionFamilyForType('operation')
// export const variablesState = sessionFamilyForType('variables')
// export const resultsState = sessionFamilyForType('results')


