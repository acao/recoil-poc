/** @jsx jsx */
import { jsx } from "theme-ui";

interface NavItemProps {
  label: string;
  active?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({
  active,
  label,
  children,
}) => (
  <button
    aria-label={label}
    sx={{
      color: active ? "#E10098" : "#8c8c8c",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      willChange: "transform",
      transition: "transform .2s ease",
      "@media (prefers-reduced-motion: reduce)": {
        transition: "none",
      },
      ":hover": {
        transform: "scale(1.1)",
      },
      ":active": {
        transform: "scale(.95)",
      },
    }}
  >
    {children}
  </button>
);

export const Nav: React.FC = ({ children }) => {
  return (
    <nav
      sx={{
        display: "grid",
        gridAutoFlow: "row",
        gridAutoRows: "2em",
        fontSize: "3em",
      }}
    >
      {children}
    </nav>
  );
};
