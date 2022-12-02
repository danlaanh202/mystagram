import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import styled from "styled-components";
import { IMedia, IUser } from "../../types";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/userRedux";
import { logout } from "../../utils/auth";
const StyledIconButton = styled(IconButton)`
  padding: 0 !important;
  margin-left: 0 !important;
`;
const StyledMenu = styled(Menu)`
  top: 12px !important;
  ul {
    padding: 0 !important;
  }
`;
const StyledMenuItem = styled(MenuItem)`
  .menu-icon {
    width: 36px;
  }
  .a-tag {
    display: flex;
    align-items: center;
  }
`;

export default function AccountMenu({ user }: { user: IUser }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter();
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <StyledIconButton
            className="header-account-btn"
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              src={(user?.avatar as IMedia)?.media_url}
              className="avatar-icon"
            />
          </StyledIconButton>
        </Tooltip>
      </Box>
      <StyledMenu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: "230px",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",

            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 8,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <StyledMenuItem onClick={() => router.push(`/${user?.username}`)}>
          <div className="a-tag">
            <ProfileIcon /> Profile
          </div>
        </StyledMenuItem>
        <StyledMenuItem onClick={() => router.push(`/${user?.username}/saved`)}>
          <SavedIcon /> Saved
        </StyledMenuItem>
        <StyledMenuItem onClick={() => router.push("/accounts/edit")}>
          <a className="a-tag">
            <SettingsIcon /> Settings
          </a>
        </StyledMenuItem>
        <StyledMenuItem>
          <a className="a-tag">
            <SwitchIcon /> Switch accounts
          </a>
        </StyledMenuItem>

        <Divider />

        <MenuItem
          onClick={() => {
            logout(dispatch);
            router.push("/login");
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Log out
        </MenuItem>
      </StyledMenu>
    </>
  );
}
const ProfileIcon = () => {
  return (
    <div className="menu-icon">
      <svg
        aria-label="Profile"
        color="#262626"
        fill="#262626"
        height="16"
        role="img"
        viewBox="0 0 24 24"
        width="16"
      >
        <circle
          cx="12.004"
          cy="12.004"
          fill="none"
          r="10.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        ></circle>
        <path
          d="M18.793 20.014a6.08 6.08 0 0 0-1.778-2.447 3.991 3.991 0 0 0-2.386-.791H9.38a3.994 3.994 0 0 0-2.386.791 6.09 6.09 0 0 0-1.779 2.447"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        ></path>
        <circle
          cx="12.006"
          cy="9.718"
          fill="none"
          r="4.109"
          stroke="currentColor"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        ></circle>
      </svg>
    </div>
  );
};

const SavedIcon = () => {
  return (
    <div className="menu-icon">
      <svg
        aria-label="Saved"
        color="#262626"
        fill="#262626"
        height="16"
        role="img"
        viewBox="0 0 24 24"
        width="16"
      >
        <polygon
          fill="none"
          points="20 21 12 13.44 4 21 4 3 20 3 20 21"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></polygon>
      </svg>
    </div>
  );
};
const SettingsIcon = () => {
  return (
    <div className="menu-icon">
      <svg
        aria-label="Settings"
        color="#262626"
        fill="#262626"
        height="16"
        role="img"
        viewBox="0 0 24 24"
        width="16"
      >
        <circle
          cx="12"
          cy="12"
          fill="none"
          r="8.635"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></circle>
        <path
          d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
      </svg>
    </div>
  );
};
const SwitchIcon = () => {
  return (
    <div className="menu-icon">
      <svg
        aria-label="Switch accounts"
        color="#262626"
        fill="#262626"
        height="16"
        role="img"
        viewBox="0 0 24 24"
        width="16"
      >
        <path d="M8 8.363a1 1 0 0 0-1-1H4.31a8.977 8.977 0 0 1 14.054-1.727 1 1 0 1 0 1.414-1.414A11.003 11.003 0 0 0 3 5.672V3.363a1 1 0 1 0-2 0v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1Zm14 6.274h-5a1 1 0 0 0 0 2h2.69a8.977 8.977 0 0 1-14.054 1.727 1 1 0 0 0-1.414 1.414A11.004 11.004 0 0 0 21 18.33v2.307a1 1 0 0 0 2 0v-5a1 1 0 0 0-1-1Z"></path>
      </svg>
    </div>
  );
};
