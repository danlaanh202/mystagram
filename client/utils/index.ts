import { IStory } from "../types";
import { publicRequest } from "./requestMethod";
export function getShortTime(str: string) {
  let splitTime = str.split(" ");
  return `${splitTime[0]}${splitTime[1].charAt(0)}`;
}

export async function handleFollowUtil(otherId: string, myId: string) {
  return await Promise.all([
    publicRequest.post("/follow/follow", {
      user_id: otherId,
      follower_id: myId,
    }),
    publicRequest.put("/user/update_follow", {
      user_id: otherId,
      follower_id: myId,
    }),
  ]);
}

export async function handleUnfollowUtil(otherId: string, myId: string) {
  return await Promise.all([
    publicRequest.delete("/follow/unfollow", {
      params: {
        user_id: otherId,
        follower_id: myId,
      },
    }),
    publicRequest.put("/user/update_unfollow", {
      user_id: otherId,
      follower_id: myId,
    }),
  ]);
}

export function pushNotification({
  socket,
  postId,
  myId,
  otherId,
  commentId,
  type,
}: {
  type: "follow" | "like" | "comment" | "reply_comment";
  socket: any;
  myId: string;
  otherId: string;
  postId?: string;
  commentId?: string;
}) {
  if (type === "follow") {
    socket.emit("push_noti", {
      type: type,

      notificationFrom: myId,
      notificationTo: otherId,
    });
  }
  if (type === "like") {
    socket.emit("push_noti", {
      type: type,
      postId: postId,
      notificationFrom: myId,
      notificationTo: otherId,
    });
  }
  if (type === "comment") {
    socket.emit("push_noti", {
      type: type,
      postId: postId,
      notificationFrom: myId,
      notificationTo: otherId,
      commentId: commentId,
    });
  }
}
export async function removeNotification({
  postId,
  myId,
  otherId,
  type,
  commentId,
}: {
  myId: string;
  otherId: string;
  type: "follow" | "like" | "comment";
  postId?: string;
  commentId?: string;
}) {
  if (type === "comment") {
    return await publicRequest.delete("/noti/undo_notification", {
      params: {
        post_id: postId,
        noti_type: type,
        noti_from: myId,
        noti_to: otherId,
        comment: commentId,
      },
    });
  }
  if (type === "like") {
    return await publicRequest.delete("/noti/undo_notification", {
      params: {
        post_id: postId,
        noti_type: type,
        noti_from: myId,
        noti_to: otherId,
      },
    });
  }
  if (type === "follow") {
    return await publicRequest.delete("/noti/undo_notification", {
      params: {
        noti_type: type,
        noti_from: myId,
        noti_to: otherId,
      },
    });
  }
}
interface IGroup {
  [key: string]: IStory[];
}
export const groupStoriesFunc = (data: IStory[]) => {
  let groups: IGroup = {};
  data.forEach((item: any, index) => {
    let id = item.poster._id;
    if (id in groups) {
      groups[id].push(item);
    } else {
      groups[id] = new Array(item);
    }
  });
  return groups;
};
