import { atom, atomFamily } from "recoil";

export const allProjectsState = atom({
  key: 'Projects/all',
  default: []
})

export const projectsState = atomFamily({
  key: 'Projects',
  default: ({ name, env }: { name: string, env: string }) => ({
    name, env
  })
})
