import { selectorFamily, selector } from 'recoil'
import { allSettingsState, settingsState } from './atoms'

import type { Setting, SettingsMap } from './types'

export const settingByKeySelector = selectorFamily<Setting, string>({
  key: 'Settings/byKey',
  get: (key) => ({ get }) => get(settingsState(key)),
  set: (key) => ({ get, set }, newVal) => {
    const settings = get(allSettingsState)
    const i = settings.indexOf(key)
    if (i > -1) {
      settings.push(key)
      set(allSettingsState, settings)
    }
    set(settingsState(key), newVal)
  }
})


export const allSettingsSelector = selector<Setting[]>({
  key: 'Settings/all',
  get: ({ get }) => get(allSettingsState).map(k => get(settingsState(k)))
})


export const settingsForNamespaceSelector = selectorFamily<SettingsMap, string>({
  key: 'Settings/byNamespace',
  get: (namespace) => ({ get }) => {
    const settingsForNamespace = get(allSettingsState).filter(key => key.startsWith(namespace))
    return settingsForNamespace.reduce(
      (acc, key) => ({
        ...acc,
        ...{
          [key.replace(`${namespace}.`, '')]: get(settingsState(key))
        }
      }),
      {})
  },
  set: (namespace) => ({ set }, newSettings) => {
    Object.entries(newSettings).forEach(([key, value]) => {
      set(settingsState(`${namespace}.${key}`), value)
    })
  }
})
