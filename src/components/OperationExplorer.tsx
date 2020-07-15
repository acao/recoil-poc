import * as React from "react";
import List, { ListRow } from "./common/List";
import Toolbar from "./common/Toolbar";
import { Tabs} from "./common/Toolbar/Tabs";
import ThemeProvider from "./common/themes/provider";

import Operation from "./Operation";

const ManagedTabs: React.FC<{
  tabs: Array<React.ReactNode>;
}> = ({ tabs, children }) => {
  const [active, setActive] = React.useState(0);
  return (
    <Tabs active={active} tabs={tabs} onChange={setActive}>
      {children}
    </Tabs>
  );
};

export default function OperationExplorer() {
  return (
    <ThemeProvider>
      <section>
        <List>
          <ListRow>
            <ManagedTabs tabs={["Operation", "Two", "Three"]}>
              <div>
                <React.Suspense fallback={"oops"}>
                  <Operation />
                </React.Suspense>
              </div>
              <p>{"one"}</p>

              <p>{"Three"}</p>
            </ManagedTabs>
          </ListRow>
        </List>
      </section>
    </ThemeProvider>
  );
}
