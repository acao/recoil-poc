import { useRecoilCallback } from 'recoil';
import { editorByKey } from './selectors';
import { EditorTypes } from './types';



export function useEditor() {
  return useRecoilCallback(({ snapshot: { getPromise } }) => async (editorKey: EditorTypes) => {
    return getPromise(editorByKey(editorKey))
  }, []);
}

