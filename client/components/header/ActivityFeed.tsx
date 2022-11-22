import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { MouseEvent, useState } from "react";
import ActivityFeedIcon from "../icons/ActivityFeedIcon";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
const StyledIconButton = styled(IconButton)`
  padding: 0 !important;
  margin-left: 0 !important;
`;
const StyledFeedContainer = styled.div`
  height: 362px;
  width: 500px;
`;
const StyledMenu = styled(Menu)`
  top: 12px !important;
  ul {
    padding: 0 !important;
  }
`;
export default function ActivityFeed() {
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
        <Tooltip title="Activity Feed">
          <StyledIconButton
            onClick={handleClick}
            size="small"
            // sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <ActivityFeedIcon />
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
          elevation: 2,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",

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
        <StyledFeedContainer>
          <StyledFeedItem>
            <div className="avatar-container">
              <Avatar />
            </div>
          </StyledFeedItem>
        </StyledFeedContainer>
      </StyledMenu>
    </>
  );
}

const StyledFeedItem = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
`;
