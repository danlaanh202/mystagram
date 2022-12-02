export interface ITimeStamps {
  updated_at?: string | Date;
  created_at?: string | Date;
}
export interface ISignupUser {
  name: string;
  username: string;
  password: string;
  is_active?: string;
  email: string;
  phone_number?: string;
  gender?: string;
  bio?: string;
}

export interface IUser {
  _id?: string;
  name: string;
  username: string;
  password?: string;
  is_active?: string;
  email?: string;
  phone_number?: string;
  gender?: string;
  bio?: string;
  website?: string;
  followers?: string[] | IUser[];
  following?: string[] | IUser[];
  avatar?: IMedia | string;
}
export interface ILoginUser {
  username: String;
  password: String;
}

export interface IMedia extends ITimeStamps {
  _id?: string;
  user: string | IUser;
  media_url: string;
}

export interface IPost {
  _id?: string;
  user?: IUser;
  media?: IMedia;
  caption?: string;
  comments: string[] | IComment[];
  last_comment: IComment | string;
  likes: string[] | IUser[];
}
export interface IRoom extends ITimeStamps {
  _id?: string;
  users: IUser[];
  last_message: IMessage; // changed to IMessage when coded
}
export interface IMessage extends ITimeStamps {
  user: IUser | string;
  message: string;
  room?: IRoom | string;
  media?: IMedia;
  _id?: string;
  uuid?: string;
  is_seen?: boolean;
}
export interface IFollow extends ITimeStamps {
  follow_by: IUser | string;
  user: IUser | string;
  _id?: string;
}
export interface IComment {
  _id?: string;
  user: IUser | string;
  post: IPost | string;
  comment: string;
  is_reply: boolean;
  reply_comments: IComment[] | string[];
}
