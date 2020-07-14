import React, { Suspense } from "react";
import logo from "../logo.svg";
// import "./App.css";
import { RecoilRoot } from "recoil";
import OperationExplorer from "./OperationExplorer";

// // @ts-ignore
// window.MonacoEnvironment = {
//   getWorkerUrl(_workerId: string, label: string) {
//     if (label === "graphqlDev") {
//       return "monaco-graphql/esm/graphql.worker";
//     }
//   },
// };

function App() {
  return (
    <RecoilRoot>
      <div className='App'>
        <section className='App-header'>
          <Suspense
            fallback={<img src={logo} className='App-logo' alt='logo' />}
          >
            <div style={{ width: "50%" }}>
              <OperationExplorer />
            </div>
          </Suspense>
        </section>
      </div>
    </RecoilRoot>
  );
}

export default App;
