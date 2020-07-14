import { useRecoilState, useRecoilValue, useRecoilCallback } from 'recoil'
import { sessionValueSelector, sessionFileSelector, fullSessionSelector } from './selectors'
import { sessionState, activeSession, allSessionsState } from './atoms'

import type { SessionFiles } from './types'

export const useCurrentSession = () => {
  const currentSessionId = useRecoilValue(activeSession);
  const [, setSession] = useRecoilState(sessionState(currentSessionId))
  const session = useRecoilValue(fullSessionSelector(currentSessionId))
  return [session, setSession]
}

export const useSessionFile = (type: SessionFiles, sessionId?: number) => {
  return useRecoilState(sessionFileSelector({ type, sessionId }))
}

// get or set just session value. for responding to editor events
export const useSessionValue = (type: SessionFiles, sessionId?: number) => {
  return useRecoilState(sessionValueSelector({ type, sessionId }))
}

let newSessionId = 0;

/**
 * Adding a session
 * @param param0 
 */
export const useAddSession = ({ operation, variables }: { operation?: string, variables?: string }) => {
  return useRecoilCallback(({ snapshot, set }) => async () => {
    // create default files
    await snapshot.getPromise(fullSessionSelector(newSessionId))
    const sessions = await snapshot.getPromise(allSessionsState)
    if (!sessions.includes(newSessionId)) {
      sessions.push(newSessionId)
      set(sessionValueSelector({ type: 'operation', sessionId: newSessionId }), operation || '{}')
      set(sessionValueSelector({ type: 'variables', sessionId: newSessionId }), variables || '{}')
      set(allSessionsState, sessions)
    }

    newSessionId++
  })
}

export type MoveSessionParams = { newIndex?: number, relativeIndex?: number, sessionId?: number }

/**
 * For moving 
 * Either `newIndex` or `relativeIndex` are required as a parameter.
 * 
 * newIndex will move the session to the specified id
 * `relativeIndex` is a positive or negative integer for relative moves from the current index
 * 
 * @param params {MoveSessionParams}
 */
export const useMoveSession = (params: MoveSessionParams) => {
  const { newIndex, relativeIndex } = params
  let { sessionId } = params

  return useRecoilCallback(({ snapshot, set }) => async () => {
    if (!sessionId) {
      sessionId = await snapshot.getPromise(activeSession);
    }
    // create default files
    const sessions = await snapshot.getPromise(allSessionsState)
    const currentIndex = sessions.indexOf(sessionId)
    if (currentIndex > -1) {
      if (newIndex) {
        sessions.splice(newIndex, 0, sessions.splice(currentIndex, 1)[0]);
      }
      if (relativeIndex) {
        sessions.splice(currentIndex + relativeIndex, 0, sessions.splice(currentIndex, 1)[0]);
      }
      set(allSessionsState, sessions)
    }
    else {
      throw new Error(`Session #${sessionId} is not a known session ID`)
    }
  })
}


/**
 * When a tab is deleted
 * @param sessionId 
 */
export const useRemoveSession = (sessionId: number) => {
  return useRecoilCallback(({ snapshot, set }) => async () => {
    const collection = await snapshot.getPromise(allSessionsState)
    const i = collection.indexOf(sessionId)
    if (i > -1) {
      collection.splice(i, 1)
      set(allSessionsState, collection)
    }
    else {
      throw Error("Invalid sessionId, session not found")
    }
  })
}

