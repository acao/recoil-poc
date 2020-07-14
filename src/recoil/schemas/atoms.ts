import { GraphQLSchema, buildClientSchema, getIntrospectionQuery } from 'graphql'
import { atomFamily, selectorFamily } from "recoil";

const fetchBuildSchema = async (uri: string) => {
  const data = await fetch(uri, {
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ query: getIntrospectionQuery(), operationName: 'IntrospectionQuery' })
  })

  return buildClientSchema((await data.json()).data)
}

export const schemasState = atomFamily<GraphQLSchema | null, { uri: string }>({
  key: 'schema',
  default: selectorFamily({
    key: 'schema/default',
    get: ({ uri }) => async () => fetchBuildSchema(uri)
  })
})
