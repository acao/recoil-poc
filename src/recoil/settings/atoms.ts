import { atomFamily, atom } from 'recoil'

import type { Setting } from './types'


export const allSettingsState = atom<string[]>({
  key: 'Settings/all',
  default: []
})

export const settingsState = atomFamily<Setting, string>({
  key: 'Settings',
  default: (key: string) => {

    return { key, value: null }
  }
})
