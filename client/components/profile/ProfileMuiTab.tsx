import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Box from "@mui/material/Box";
import Posts from "./Posts";

import { useRouter } from "next/router";
import { IRootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { IPost, IUser } from "../../types";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{}}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProfileMuiTab({
  posts,
  setShowImageSlider,
  setModalIndex,
  currentUsername,
}: {
  posts: IPost[];
  setShowImageSlider: React.Dispatch<React.SetStateAction<boolean>>;
  setModalIndex: React.Dispatch<React.SetStateAction<number>>;
  currentUsername: string;
}) {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const user = useSelector((state: IRootState) => state.user?.user as IUser);
  React.useEffect(() => {
    if (value === 0) {
      window.history.pushState("", "", `/${currentUsername}`);
    } else if (value === 1) {
      window.history.pushState("", "", `/${currentUsername}/saved`);
    } else if (value === 2) {
      window.history.pushState("", "", `/${currentUsername}/tagged`);
    }
  }, [value]);
  return (
    <Box sx={{ width: "100%", maxWidth: "935px", margin: "0 auto" }}>
      <Box sx={{ borderTop: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Tab
            label={
              <div className="flex-center">
                <PostIcon />
                <div>Posts</div>
              </div>
            }
            {...a11yProps(0)}
          />
          <Tab
            label={
              <div className="flex-center">
                <SavedIcon />
                <div>Saved</div>
              </div>
            }
            {...a11yProps(1)}
          />
          <Tab
            label={
              <div className="flex-center">
                <svg
                  aria-label=""
                  color="#262626"
                  fill="#262626"
                  height="12"
                  role="img"
                  viewBox="0 0 24 24"
                  width="12"
                >
                  <rect
                    fill="none"
                    height="18"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    width="18"
                    x="3"
                    y="3"
                  ></rect>
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    x1="9.015"
                    x2="9.015"
                    y1="3"
                    y2="21"
                  ></line>
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    x1="14.985"
                    x2="14.985"
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
                    y1="9.015"
                    y2="9.015"
                  ></line>
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    x1="21"
                    x2="3"
                    y1="14.985"
                    y2="14.985"
                  ></line>
                </svg>
                <div>Tagged</div>
              </div>
            }
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Posts
          setModalIndex={setModalIndex}
          setOpenSlider={setShowImageSlider}
          posts={posts}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
const PostIcon = () => {
  return (
    <svg
      aria-label=""
      color="#262626"
      fill="#262626"
      height="12"
      role="img"
      viewBox="0 0 24 24"
      width="12"
    >
      <rect
        fill="none"
        height="18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        width="18"
        x="3"
        y="3"
      ></rect>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="9.015"
        x2="9.015"
        y1="3"
        y2="21"
      ></line>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="14.985"
        x2="14.985"
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
        y1="9.015"
        y2="9.015"
      ></line>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="21"
        x2="3"
        y1="14.985"
        y2="14.985"
      ></line>
    </svg>
  );
};
const SavedIcon = () => {
  return (
    <svg
      aria-label=""
      color="#262626"
      fill="#262626"
      height="12"
      role="img"
      viewBox="0 0 24 24"
      width="12"
    >
      <rect
        fill="none"
        height="18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        width="18"
        x="3"
        y="3"
      ></rect>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="9.015"
        x2="9.015"
        y1="3"
        y2="21"
      ></line>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="14.985"
        x2="14.985"
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
        y1="9.015"
        y2="9.015"
      ></line>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="21"
        x2="3"
        y1="14.985"
        y2="14.985"
      ></line>
    </svg>
  );
};
