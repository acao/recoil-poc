import * as React from "react";
import { Tab } from "./common/Toolbar/Tabs";
import { activeSession, allSessionsState } from "../recoil/sessions/atoms";
import { useRecoilState } from "recoil";

export function SessionTabs() {
  const [sessions] = useRecoilState(allSessionsState);
  const [activeSessionId, setActiveSession] = useRecoilState(activeSession);
  return sessions.map((s) => {
    return (
      <Tab
        active={activeSessionId === s}
        onChange={() => setActiveSession(s)}
      />
    );
  });
}
