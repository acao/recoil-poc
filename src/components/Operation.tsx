import * as React from "react";
import { useMonacoEditor } from "use-monaco";
// import { useRecoilValue } from "recoil";
// import { schemaForType } from "../recoil/schemas/selectors";

// import "monaco-graphql/esm/monaco.contribution";

// import { useAsyncEffect } from "use-async-effect";

const uri = "https://swapi-graphql.netlify.app/.netlify/functions/index";

function Operation() {
  const { containerRef } = useMonacoEditor({
    theme: "github",
    path: "operation.graphql",
    defaultValue: "query {}",
    language: "graphql",
  });

  return <div style={{ height: 800, width: "100%" }} ref={containerRef} />;
}

export default Operation;
