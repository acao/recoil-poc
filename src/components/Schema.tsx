import * as React from "react";
import { useMonacoEditor } from "use-monaco";
import { useRecoilValue, useRecoilState } from "recoil";
import { schemaAsFormat } from "../recoil/schemas/selectors";
import { editorByKey } from "../recoil/editors/selectors";

const uri = "https://swapi-graphql.netlify.app/.netlify/functions/index";

function Schema() {
  const schemaString = useRecoilValue(schemaAsFormat({ uri, outputFormat: "SDL" }));
  const [, setEditor] = useRecoilState(editorByKey("operation"));

  const { containerRef, monaco, model, loading, editor } = useMonacoEditor({
    theme: "github",
    path: "schema.graphql",
    defaultValue: schemaString as string,
    language: "graphqlDev",
  });
  React.useEffect(() => {
    if (!loading) {
      setEditor(editor);
    }
  }, [editor, setEditor, loading]);

  return <div style={{ height: 800, width: "100%" }} ref={containerRef} />;
}

export default Schema;
