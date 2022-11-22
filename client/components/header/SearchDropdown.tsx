import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { MouseEvent, ReactNode, useState } from "react";
import SearchInput from "./SearchInput";
import styled from "styled-components";
const ItemContainer = styled.div`
  height: 360px;
  overflow-y: scroll;
`;
const StyledMenu = styled(Menu)`
  .MuiList-root {
    padding-top: 8px;
  }
`;
const SearchDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <div className="" onClick={handleClick}>
          <SearchInput />
        </div>
      </Box>
      <StyledMenu
        disableEnforceFocus
        disableRestoreFocus
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: "375px",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
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
              right: "50%",
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) translateX(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <ItemContainer>
          <DropdownItem />
          <DropdownItem />
          <DropdownItem />
          <DropdownItem />
          <DropdownItem />
          <DropdownItem />
          <DropdownItem />
        </ItemContainer>
      </StyledMenu>
    </>
  );
};
const StyledDropdownItem = styled.div`
  .item-container {
    padding: 8px 16px;
    display: flex;
    align-items: center;
    :hover {
      background: #fafafa;
    }
    .avatar-container {
      margin-right: 12px;
    }
    .info-container {
      .info-username {
        color: #262626;
        font-weight: 600;
      }
      .info-name {
        color: #8e8e8e;
        margin-top: 2px;
      }
    }
  }
`;
const StyledAvatar = styled(Avatar)`
  width: 44px !important;
  height: 44px !important;
`;
const DropdownItem = () => {
  return (
    <StyledDropdownItem>
      <div className="item-container">
        <div className="avatar-container">
          <StyledAvatar />
        </div>
        <div className="info-container">
          <div className="info-username">danlaanh202</div>
          <div className="info-name">Tran Thai Dan</div>
        </div>
      </div>
    </StyledDropdownItem>
  );
};

export default SearchDropdown;
