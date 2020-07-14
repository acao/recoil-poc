import { selectorFamily } from "recoil";
import { GraphQLSchema, DocumentNode, print, parse, printSchema } from 'graphql'
import { schemasState } from './atoms'

import { OpParams, SchemaFormats } from './types'

const DEFAULT_URI = 'https://api.spacex.land/graphql/'

const schemaOpForOutputFormat = {
  'Primitive': ({ get, uri }: OpParams) => get(schemasState({ uri })) as GraphQLSchema,
  'SDL': ({ get, uri }: OpParams) => printSchema(get(schemasState({ uri }))),
  'AST': ({ get, uri }: OpParams) => parse(print(get(schemasState({ uri }))))
}

export const schemaAsFormat = selectorFamily<GraphQLSchema | DocumentNode | string, { uri: string, outputFormat?: SchemaFormats }>({
  key: 'schema/uri',
  get: ({ uri, outputFormat = 'Primitive' }) => async ({ get }) => {
    try {
      const schemaOp = schemaOpForOutputFormat[outputFormat] || schemaOpForOutputFormat['Primitive']
      return schemaOp({ get, uri })
    }
    catch (err) {
      console.error('Schema Loading Failed', err)
      throw err
    }

  },
  set: ({ uri = DEFAULT_URI }) => async ({ set }, schema) => {
    set(schemasState({ uri }), schema)
  }
})


