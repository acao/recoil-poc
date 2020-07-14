// @ts-ignore
import * as worker from "monaco-editor/esm/vs/editor/editor.worker";

import { ICreateData } from 'monaco-graphql/esm/typings'
import { worker as WorkerNamespace } from "monaco-editor";


import { GraphQLWorker } from "monaco-graphql/esm/GraphQLWorker";


// eslint-disable-next-line no-restricted-globals
self.onmessage = () => {
  try {
    worker.initialize(
      (
        ctx: WorkerNamespace.IWorkerContext,
        createData: ICreateData
      ) => {
        return new GraphQLWorker(ctx, createData);
      }
    );
  } catch (err) {
    throw err;
  }
};
