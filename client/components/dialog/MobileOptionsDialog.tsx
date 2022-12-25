import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import styled from "styled-components";
import { forwardRef, ReactElement, Ref, useState } from "react";
import { useRouter } from "next/router";
import { logout } from "../../utils/auth";
import { useDispatch } from "react-redux";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledMobileDialogContainer = styled.div`
  .MuiButtonBase-root {
    min-width: auto !important;
    padding-left: 0;
  }
`;
const StyledDialog = styled(Dialog)`
  .list-container {
    background: #fafafa;
    h3 {
      margin: 20px 16px 8px;
      font-size: 14px;
      font-weight: 600;
      color: #8e8e8e;
    }
  }
`;
const StyledToolbar = styled.div`
  display: flex;
  align-items: center;
  height: 44px;
  justify-content: space-between;
  .center-cmp {
    display: flex;
    align-items: center;
    color: #383838;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
  .right-cmp {
    width: 32px;
  }
`;
const StyledAppBar = styled(AppBar)`
  box-shadow: none !important;
  border-bottom: 1px solid #dbdbdb;
  background: white !important;
  padding: 0 16px;
`;

const StyledList = styled(List)`
  background: white;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  padding: 0 !important;
  .MuiDivider-root {
    color: #dbdbdb;
  }
  .MuiButtonBase-root {
    height: 44px;
    padding: 0 16px;
  }
  .MuiListItemText-root {
    .MuiTypography-root {
      color: #262626;
      font-size: 16px !important;
      line-height: 44px !important;
    }
  }
  .logout-btn {
    .MuiTypography-root {
      color: #ed4956;
      font-size: 16px !important;
      line-height: 44px !important;
    }
  }
`;

export default function MobileOptionsDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <StyledMobileDialogContainer>
      <Button onClick={handleClickOpen}>
        <OptionsIcon />
      </Button>
      <StyledDialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <StyledAppBar sx={{ position: "relative" }}>
          <StyledToolbar>
            <button onClick={handleClose} aria-label="close">
              <CloseIcon />
            </button>
            <div className="center-cmp">Options</div>
            <div className="right-cmp"></div>
          </StyledToolbar>
        </StyledAppBar>
        <div className="list-container">
          <h3>ACCOUNT</h3>
          <StyledList>
            <ListItem
              button
              onClick={() => {
                router.push("/accounts/edit?activeInd=0");
              }}
            >
              <ListItemText primary="Edit profile" />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={() => {
                router.push("/accounts/edit?activeInd=1");
              }}
            >
              <ListItemText primary="Change password" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="QR Code" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Your activity" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Privacy and security" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Ads" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Supervision" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Login activity" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Emails from Instagram" />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={() => {
                logout(dispatch);
                router.push("/login");
              }}
            >
              <ListItemText className="logout-btn" primary="Log out" />
            </ListItem>
          </StyledList>
        </div>
      </StyledDialog>
    </StyledMobileDialogContainer>
  );
}

const OptionsIcon = () => {
  return (
    <svg
      aria-label="Options"
      color="#262626"
      fill="#262626"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
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
  );
};
const CloseIcon = () => {
  return (
    <svg
      aria-label="Close"
      color="#262626"
      fill="#262626"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="21"
        x2="3"
        y1="3"
        y2="21"
      ></line>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="21"
        x2="3"
        y1="21"
        y2="3"
      ></line>
    </svg>
  );
};
