import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from "react-router-dom";
import { Button, Collapse, ListItem } from "@mui/material";
import { KeyboardArrowRight, KeyboardArrowDown } from "@mui/icons-material";
import { INavItem } from "../models/app/app.models";

interface Props extends INavItem {
  expanded: string | false;
  handleChangeExpanded: (panel: string, isExpanded: boolean) => void;
}

const NavItem = ({
  href,
  icon: Icon,
  title,
  children,
  code,
  expanded,
  handleChangeExpanded,
}: Props) => {
  const location = useLocation();

  const isActiveWithChild = children
    ? children.some(
        (child) =>
          !!matchPath(
            {
              path: child.href,
              end: false,
            },
            location.pathname
          )
      )
    : false;

  const active = href
    ? !!matchPath(
        {
          path: href,
          end: false,
        },
        location.pathname
      )
    : isActiveWithChild;

  const isActive = code === expanded;

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          display: "flex",
          py: 0,
        }}
      >
        <Button
          component={href ? RouterLink : Button}
          sx={{
            color: "text.secondary",
            fontWeight: "medium",
            justifyContent: "flex-start",
            letterSpacing: 0,
            py: 1.25,
            textTransform: "none",
            width: "100%",
            ...(active && {
              color: "primary.main",
            }),
            "& svg": {
              mr: 1,
            },
          }}
          to={href}
          onClick={() => {
            if (code) {
              handleChangeExpanded(code, isActive ? false : true);
            }
          }}
        >
          {Icon}
          <span>{title}</span>
          {(children && children.length && (
            <>
              {isActive ? (
                <KeyboardArrowDown
                  style={{ display: "block" }}
                  sx={{ margin: "0 0 0 auto" }}
                />
              ) : (
                <KeyboardArrowRight
                  style={{ display: "block" }}
                  sx={{ margin: "0 0 0 auto" }}
                />
              )}
            </>
          )) ||
            null}
        </Button>
      </ListItem>
      <Collapse in={isActive} timeout="auto" unmountOnExit>
        {(children &&
          children.map((item, idx) => {
            const cutHref = location.pathname.split("/");

            const activeChild = item.href
              ? !!matchPath(
                  {
                    path: item.href,
                    end: true,
                  },
                  cutHref.length > 2 ? `/${cutHref[1]}` : location.pathname
                )
              : false;

            return (
              <ListItem
                key={idx}
                disableGutters
                sx={{
                  display: "flex",
                  py: 0,
                }}
              >
                <Button
                  component={item.href ? RouterLink : Button}
                  sx={{
                    color: "text.secondary",
                    fontWeight: "medium",
                    justifyContent: "flex-start",
                    letterSpacing: 0,
                    py: 1.25,
                    textTransform: "none",
                    width: "100%",
                    ...(activeChild && {
                      color: "primary.main",
                    }),
                    "& svg": {
                      mr: 1,
                    },
                    paddingLeft: 4.25,
                  }}
                  to={item.href}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Button>
              </ListItem>
            );
          })) ||
          null}
      </Collapse>
    </>
  );
};

export default NavItem;
