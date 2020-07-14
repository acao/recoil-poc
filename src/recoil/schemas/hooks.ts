import { useRecoilState } from 'recoil'
import { schemaAsFormat } from './selectors';
import type { SchemaFormats } from './types'

/**
 * 
 * @param uri uri string for retrieving the schema
 * @param outputFormat 
 */
export const useGraphQLSchema = (uri: string, outputFormat?: SchemaFormats) => useRecoilState(schemaAsFormat({ uri, outputFormat }))
