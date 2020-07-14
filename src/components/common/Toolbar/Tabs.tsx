/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import WithDividers from "./support/WithDividers";
import type { Theme } from "../themes/default";

export type TabProps = { active: boolean } & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Tab: React.FC<TabProps> = ({ active, ...props }) => (
  <button
    sx={{
      padding: ({ spaces }: Theme) => spaces?.rowPadding,
      outline: "none",
      textAlign: "end",
      verticalAlign: "baseline",
      transition: ({ transitions }: Theme) => transitions[0],
      cursor: "pointer",
      ":focus, :hover": {
        boxShadow: active ? "primaryUnderline" : "underline",
        color: active ? "primary" : "darkText",
      },
      boxShadow: active ? "primaryUnderline" : "inset 0 0 0 transparent",
      color: active ? "primary" : "text",
    }}
    {...props}
  />
);

export type TabsProps = {
  tabs: React.ReactNode[];
  active: number;
  onChange?: (idx: number) => void;
};

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  active,
  onChange,
  children,
}) => {
  return (
    <React.Fragment>
      <WithDividers>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            active={active === index}
            onClick={() => onChange?.(index)}
          >
            {tab}
          </Tab>
        ))}
      </WithDividers>
      {Array.isArray(children) && children[active]}
    </React.Fragment>
  );
};

export default Tabs;
