
import { useRecoilState, useRecoilValue } from 'recoil'
import { settingByKeySelector, settingsForNamespaceSelector, allSettingsSelector } from './selectors'


export function useSetting(key: string) {
  return useRecoilState(settingByKeySelector(key))
}

/**
 * Returns a function using a namespace key that acts as a re-usable tuple hook for that namespace
 * @param namespace string
 */
export const getNamespaceHook = (namespace: string) => (key: string) => useRecoilState(settingByKeySelector(`${namespace}.${key}`))

/**
 * getter to retrieve all settings for a namespace as object literal, and a setter to send an object literal for updates
 * namespace is removed from response object literal keys, and always appended to the keys you provide in the object literal
 * 
 * @param namespace 
 */
export function useSettingsNamespace(namespace: string) {
  return useRecoilState(settingsForNamespaceSelector(namespace))
}

export function useAllSettings() {
  return useRecoilValue(allSettingsSelector)
}
