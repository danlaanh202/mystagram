import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { MouseEvent, useEffect, useState } from "react";
import ActivityFeedIcon from "../icons/ActivityFeedIcon";
import styled from "styled-components";
import { publicRequest } from "../../utils/requestMethod";
import { IRootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { INotification, IUser } from "../../types";
import NotificationItem from "./NotificationItem";
import { setIsUnseenNotification } from "../../redux/headerStatusRedux";
import { useDispatch } from "react-redux";
import { socket } from "../../pages/_app";
const StyledIconButton = styled(IconButton)`
  padding: 0 !important;
  margin-left: 0 !important;
`;
const StyledFeedContainer = styled.div`
  height: 362px;
  width: 500px;
  overflow: hidden;
  overflow-y: ${({ overflowY }: { overflowY: boolean }) =>
    overflowY ? "scroll" : "none"};
  .no-notification {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
  }
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
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const [notis, setNotis] = useState<INotification[]>([]);
  const dispatch = useDispatch();
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const getNotifications = async () => {
      try {
        await publicRequest("/noti/get_notifications", {
          params: {
            user_id: user._id,
          },
        }).then((response) => {
          setNotis(response.data);
        });
      } catch (error) {}
    };
    getNotifications();
  }, []);
  useEffect(() => {
    dispatch(setIsUnseenNotification(false));
    notis.every((item) => {
      if (item.is_seen === false) {
        dispatch(setIsUnseenNotification(true));
        return false;
      }
      return true;
    });
  }, [notis]);
  useEffect(() => {
    socket.on("get_new_noti", (data) => {
      setNotis((prev: INotification[]) => [data, ...prev]);
      dispatch(setIsUnseenNotification(true));
    });
  }, [socket]);
  const setSeen = (id: string) => {
    setNotis((prev: INotification[]) =>
      prev.map((item) => {
        if (item._id === id) {
          return { ...item, is_seen: true };
        } else {
          return item;
        }
      })
    );
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
        // onClick={handleClose}
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
              right: 7,
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
        <StyledFeedContainer overflowY={notis?.length > 4 ? true : false}>
          {notis?.length > 0 &&
            notis.map((item, index) => (
              <NotificationItem key={item._id} noti={item} setSeen={setSeen} />
            ))}
          {notis?.length === 0 && (
            <div className="no-notification">Không có thông báo</div>
          )}
        </StyledFeedContainer>
      </StyledMenu>
    </>
  );
}
