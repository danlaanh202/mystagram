import Slider, { Settings } from "react-slick";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import styled from "styled-components";
import { IGroupStories } from "../Home";

import StoryCard from "./StoryCard";
import {
  Dispatch,
  forwardRef,
  ReactElement,
  Ref,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { CloseIcon } from "../modals/LikeUsersModal";
import { md } from "../../utils/responsive";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StyledSliderContainer = styled.div`
  height: 100vh;
  background: #202023;
  color: white;
  position: relative;
  overflow: hidden;
  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    ${md({
      display: "none",
    })}
    svg {
      color: white;
    }
  }
  .slick-slider {
    width: 100vw;
    height: 90vh;
    margin-top: 20px;
    ${md({
      height: "100vh",
      marginTop: 0,
    })}
    .slick-list {
      height: 100%;
      .slick-track {
        height: 100%;
        /* display: flex;
        justify-content: center;  */
        ${md({
          display: "flex",
        })}
        .slick-slide {
          width: 500px;
          ${md({
            width: "100vw",
          })}
          height: 100%;
          > div:first-child {
            height: 100%;
            > div:first-child {
              height: 100%;
            }
          }
        }
      }
    }
  }
`;

export default function StoriesDialog({
  groupsStories,
  activeSlider,
  setActiveSlider,
}: {
  groupsStories: IGroupStories;
  activeSlider: number;
  setActiveSlider: Dispatch<SetStateAction<number>>;
}) {
  const [open, setOpen] = useState(true);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };
  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: false,
    speed: 500,
    initialSlide: activeSlider,
    arrows: false,
    slideToShow: 1,
    variableWidth: true,
    variableHeight: true,
    draggable: true,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: activeSlider,
          centerPadding: 0,
        },
      },
    ],
  };
  const sliderRef = useRef<any>(null);

  useEffect(() => {
    console.log(sliderRef.current);
    sliderRef.current?.slickGoTo(activeSlider);
  }, [activeSlider]);
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <StyledSliderContainer>
          <Slider {...(settings as any)} ref={sliderRef}>
            {Object.entries(groupsStories).map(([k, v], index) => (
              <StoryCard
                key={v[0]._id}
                id={index}
                stories={v}
                setActiveSlider={setActiveSlider}
                active={index === activeSlider}
                disableRightBtn={
                  Object.entries(groupsStories)?.length - 1 === activeSlider
                }
                disableLeftBtn={activeSlider === 0}
              />
            ))}
            {/* {Object.entries(groupsStories)?.length < 5 && (
              <>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </>
            )} */}
          </Slider>
          <div className="close-btn" onClick={() => setActiveSlider(-1)}>
            <CloseIcon />
          </div>
        </StyledSliderContainer>
      </Dialog>
    </div>
  );
}
