import { useRecoilValue } from 'recoil'
import { fileByUri } from './selectors'

export function useFileState({ uri }: { uri: string }) {
  const file = useRecoilValue(fileByUri(uri))
  return file
}
