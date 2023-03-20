import { publicRequest } from "./requestMethod";
export default new (class CallApi {
  async comment(user_id: string, post_id: string, comment: string) {
    try {
      return await publicRequest.post("/comment/comment", {
        user_id: user_id,
        post_id: post_id,
        comment: comment,
      });
    } catch (error) {
      throw new Error();
    }
  }
  async replyComment(
    user_id: string,
    post_id: string,
    comment: string,
    comment_id: string
  ) {
    try {
      return await publicRequest.post("/comment/reply", {
        user_id,
        post_id,
        comment,
        comment_id,
      });
    } catch (error) {
      throw new Error("Lỗi reply comment");
    }
  }
  async getReplyComments(comment_id: string, page: number) {
    try {
      return await publicRequest.get("/comment/get_reply_comments", {
        params: {
          comment_id,
          page,
        },
      });
    } catch (error) {
      throw new Error("Lỗi get reply comments");
    }
  }
})();
