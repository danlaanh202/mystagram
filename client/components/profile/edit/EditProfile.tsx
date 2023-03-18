import { yupResolver } from "@hookform/resolvers/yup";
import Avatar from "@mui/material/Avatar";
import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useUploadMedia from "../../../hooks/useUploadMedia";
import { IRootState } from "../../../redux/store";
import { IMedia, IUser } from "../../../types";
import * as yup from "yup";
import { publicRequest } from "../../../utils/requestMethod";
import { useDispatch } from "react-redux";
import { editUser } from "../../../redux/userRedux";
import { m1000, md } from "../../../utils/responsive";
import MobileHeader from "../../header/MobileHeader";
const StyledEditProfile = styled.div`
  margin-top: 32px;

  ${md({
    marginTop: 0,
    marginBottom: "44px",
  })}
  .item-container {
    display: flex;
    margin-bottom: 16px;
  }
  .top {
    align-items: center;
    ${md({
      padding: "0 20px",
      marginTop: "20px",
    })}
    &-aside {
      margin: 0 !important;
    }
  }
  .edit-form {
    margin: 16px 0;
    width: 100%;
    ${md({
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      padding: "0 20px",
    })}
    .submit-btn {
      background: #0095f6;
      color: white;
      font-weight: 600;
      width: 100%;
      padding: 8px 20px;
      border-radius: 8px;
      max-width: 364px;
      margin: 24px auto;
      display: block;
      cursor: pointer;
    }
    .item-container {
      ${md({
        flexDirection: "column",
      })}
    }
  }
`;
const AsideContainer = styled.div`
  flex: 0 0 194px;
  padding: 0 32px;
  text-align: right;
  margin-top: 6px;
  ${md({
    padding: "0",
    textAlign: "left",
    flex: "unset",
  })}
  label {
    font-weight: 600;
    line-height: 16px;
    line-height: 24px;
    color: #262626;
  }
`;
const RightContainer = styled.div`
  flex-basis: 355px;
  /* padding-right: 60px; */

  ${m1000({
    paddingRight: "60px",
  })}
  ${md({
    flexBasis: "unset",
    padding: "0",
  })}
  .item {
    width: 100%;
    &-input {
      width: 100%;
      border: 1px solid #dbdbdb;
      border-radius: 3px;
      font-size: 16px;
      line-height: 32px;
      color: #262626;
      padding: 0 10px;
      :disabled {
        background: #efefef;
        color: #8e8e8e;
        cursor: not-allowed;
      }
    }
    &-secondary-label {
      color: #8e8e8e;
      font-weight: 600;
      margin-bottom: -16px;
      margin-top: 16px;
    }
    textarea {
      height: 60px;
      resize: none;
    }
  }
  .item-description {
    font-size: 12px;
    line-height: 16px;
    color: #8e8e8e;
    margin-top: 16px;
    margin-bottom: 8px;
  }
  .info-container {
    .username {
      font-size: 20px;
      line-height: 22px;
      margin-bottom: 2px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .change-btn {
      color: #0095f6;
      font-size: 14px;
      cursor: pointer;
      font-weight: 600;
    }
    input {
      display: none;
    }
  }
`;
const StyledAvatar = styled(Avatar)`
  margin-left: auto;
  width: 38px !important;
  height: 38px !important;
  ${md({
    marginRight: "20px",
  })}
`;
const schema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .matches(/^[a-z0-9_-]{3,16}$/, "Username is not valid"),
  email: yup.string().required("Email is required"),
});
const EditProfile = () => {
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const {
    handleFileInputChange,
    uploadImage,
    fileInputState,
    previewSource,
    handleDeleteImage,
  } = useUploadMedia();
  const onEditHandler = async (data: IUser) => {
    try {
      await publicRequest
        .put("/user/edit", {
          userId: user._id,
          name: data.name || user.name || "",
          username: data.username || user.username,
          website: data.website || "",
          bio: data.bio || "",
          email: data.email || user.email,
        })
        .then((response) => {
          // dispatch to update user
          // console.log(response.data);
          dispatch(editUser(response.data));
        });
    } catch (error) {
      console.log(error);
    }
  };
  const changeAvatar = async () => {
    await uploadImage({ preset: "avatar", is_avatar: true }).then(
      async (resp) => {
        await publicRequest
          .put("/user/change_avatar", {
            userId: user._id,
            media: resp?.data._id,
          })
          .then((response) => {
            console.log(response.data);
            //dispatch updateUser
            dispatch(editUser(response.data));
          });
      }
    );
  };
  useEffect(() => {
    if (previewSource !== "") {
      changeAvatar();
    }
  }, [previewSource]);
  return (
    <StyledEditProfile>
      <MobileHeader
        backRouter={`/${user.username}`}
        centerComp={<>Edit profile</>}
      />
      <div className="item-container top">
        <AsideContainer className="top-aside">
          <StyledAvatar src={(user.avatar as IMedia)?.media_url} />
        </AsideContainer>
        <RightContainer>
          <div className="info-container">
            <div className="username">{user.username}</div>
            <label htmlFor="change-avatar" className="change-btn">
              Change profile photo
            </label>
            <input
              onChange={handleFileInputChange}
              type="file"
              id="change-avatar"
            />
          </div>
        </RightContainer>
      </div>
      <form
        onSubmit={handleSubmit(onEditHandler as SubmitHandler<FieldValues>)}
        className="edit-form"
      >
        <div className="item-container">
          <AsideContainer>
            <label htmlFor="name">Name</label>
          </AsideContainer>
          <RightContainer>
            <div className="item">
              <input
                type="text"
                id="name"
                defaultValue={user.name}
                // disabled={true}
                className="item-input"
                placeholder="Enter your name"
                {...register("name")}
              />
            </div>
            <p className="item-description">
              You are using the same name on Instagram and Facebook. Go to
              Facebook to change your name. Change Name
            </p>
          </RightContainer>
        </div>
        <div className="item-container">
          <AsideContainer>
            <label htmlFor="username">Username</label>
          </AsideContainer>
          <RightContainer>
            <div className="item">
              <input
                type="text"
                id="username"
                className="item-input"
                placeholder="Username"
                defaultValue={user.username}
                {...register("username")}
              />
              <p className="item-description">
                In most cases, you&apos;ll be able to change your username back
                to _dan2907_5ds for another 14 days. Learn more
              </p>
            </div>
          </RightContainer>
        </div>
        <div className="item-container">
          <AsideContainer>
            <label htmlFor="website">Website</label>
          </AsideContainer>
          <RightContainer>
            <div className="item">
              <input
                type="text"
                id="website"
                className="item-input"
                // disabled={true}
                placeholder="Website"
                defaultValue={user?.website}
                {...register("website")}
              />
              <p className="item-description">
                Editing your links is only available on mobile. Visit the
                Instagram app and edit your profile to change the websites in
                your bio.
              </p>
            </div>
          </RightContainer>
        </div>
        <div className="item-container">
          <AsideContainer>
            <label htmlFor="bio">bio</label>
          </AsideContainer>
          <RightContainer>
            <div className="item">
              <textarea
                {...register("bio")}
                id="bio"
                className="item-input"
                placeholder="bio"
              />
              <div className="item-secondary-label">Personal infomation</div>
              <p className="item-description">
                Provide your personal information, even if the account is used
                for a business, a pet or something else. This won&apos;t be a
                part of your public profile.
              </p>
            </div>
          </RightContainer>
        </div>
        <div className="item-container">
          <AsideContainer>
            <label htmlFor="email">Email</label>
          </AsideContainer>
          <RightContainer>
            <div className="item">
              <input
                type="text"
                id="email"
                className="item-input"
                placeholder="email"
                defaultValue={user.email}
                {...register("email")}
              />
            </div>
          </RightContainer>
        </div>
        <button className="submit-btn" type="submit">
          Save
        </button>
      </form>
    </StyledEditProfile>
  );
};

export default EditProfile;
