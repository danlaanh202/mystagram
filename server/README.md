# Welcome to Mystagram API! 🔥

Hi! This is MYSTAGRAM API i created with [**#Nodejs**, **#Expressjs**, **#Cloudinary**, **#Socket-io** and **Peerjs**].

## About this project

This project is combination of what i learn, so i choose MVC (**model, view, controller**) pattern, but the view part i use is **Nextjs**.
The database technology is **mongodb** with **mongoose** lib to easy access to database.

## Database model

> WILL UPDATE LATER

## REQUIRED TO RUN SERVER

1.  After having cloned this repository, packages are required to run this app `npm install`
2.  To run this server you need to `npm start`

## API DOCUMENT

> **This document provides routes to access API**

### USER/AUTH API:

> **For basic user and authentication**

- AUTH [**/auth**]

| METHOD | ENDPOINT  | ACTION               | PARAMS/BODY                             |
| ------ | --------- | -------------------- | --------------------------------------- |
| POST   | /register | Register new account | **username, fullname, email, password** |
| POST   | /login    | Login                | **username, password**                  |

- USER [**/user**]

| METHOD | ENDPOINT              | ACTION                                                                   | PARAMS/BODY                                            |
| ------ | --------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------ |
| GET    | /get_user             | Find one user with searching username or id of user                      | **username, \_id**                                     |
| GET    | /get_users            | Find many users and paginate with **page, limit**                        | **page, limit**                                        |
| GET    | /get_suggestion_users | Find suggestion of a user by **following[], user_id**                    | **following, user_id**                                 |
| GET    | /get_users_without_me | Find users without self with params: **userId**                          | **userId**                                             |
| GET    | /search_users         | Search users by username and name by params: **search_text**             | **search_text**                                        |
| PUT    | /edit                 | Edit user by body [**userId, name?, username?, website?, bio?, email?**] | [**userId, name?, username?, website?, bio?, email?**] |
| PUT    | /change_avatar        | Find by id and update avatar **userId, media**                           | **userId, media**                                      |
| PUT    | /update_follow        | Update follow another user by **user_id, follower_id**                   | **user_id, follower_id**                               |
| PUT    | /update_unfollow      | Update unfollow user by **user_id, follower_id**                         | **user_id, follower_id**                               |

### CLOUDINARY/MEDIA (image):

> **Provide the way to upload image and save it to database**

- CLOUDINARY [**/cloudinary**]

| METHOD | ENDPOINT | ACTION                     | PARAMS/BODY                                                           |
| ------ | -------- | -------------------------- | --------------------------------------------------------------------- |
| POST   | /upload  | Upload image to cloudinary | **img, preset, userId, is_avatar?, is_post?, is_message?, is_story?** |

- MEDIA [**/media**]

| METHOD | ENDPOINT | ACTION                                                                | PARAMS/BODY     |
| ------ | -------- | --------------------------------------------------------------------- | --------------- |
| POST   | /upload  | After uploading image to cloudinary, create record in MEDIA with body | **url, userId** |

### POST/COMMENT/LIKE

> **Provide method to post, comment and like**

- POST [**/post**] (posts in mystagram)

| METHOD | ENDPOINT               | ACTION                                                                    | PARAMS/BODY                    |
| ------ | ---------------------- | ------------------------------------------------------------------------- | ------------------------------ |
| GET    | /get_posts_by_username | Get posts of a user by **username**                                       | **username**                   |
| GET    | /get_posts             | Get posts with pagination with last post(\_id) **page, limit, last_post** | **username**                   |
| GET    | /get_post_by_id        | Get single post by id                                                     | **post_id**                    |
| POST   | /upload                | Upload new post with **user_id, caption, media_id**                       | **user_id, caption, media_id** |

- COMMENT [**/comment**]

| METHOD | ENDPOINT            | ACTION                                           | PARAMS/BODY                                               |
| ------ | ------------------- | ------------------------------------------------ | --------------------------------------------------------- |
| GET    | /get_comments       | Get comments of post by post_id                  | **post_id**                                               |
| GET    | /get_reply_comments | Get reply comments of comment_id with pagination | **comment_id, page**                                      |
| POST   | /comment            | Comment to post                                  | **user_id, post_id, comment, media_url, uuid**            |
| POST   | /reply              | Reply comment                                    | **user_id, post_id, comment, comment_id, media_id, uuid** |

- LIKE [**/like**]

| METHOD | ENDPOINT        | ACTION                 | PARAMS/BODY          |
| ------ | --------------- | ---------------------- | -------------------- |
| GET    | /get_like_users | Get like users of post | **post_id**          |
| POST   | /like_post      | Like post              | **user_id, post_id** |
| DELETE | /unlike_post    | Unlike post            | **user_id, post_id** |

### STORY

> **STORY FEATURE**

- STORY [**/story**]

| METHOD | ENDPOINT                 | ACTION                            | PARAMS/BODY           |
| ------ | ------------------------ | --------------------------------- | --------------------- |
| GET    | /get                     | Get story in array                | **followingIds**      |
| GET    | /get_stories_by_username | Get stories of a user by username | **username**          |
| POST   | /create                  | Create Story                      | **posterId, mediaId** |

### FOLLOW

> Follow other user,...

- FOLLOW [**/follow**]

| METHOD | ENDPOINT       | ACTION                         | PARAMS/BODY              |
| ------ | -------------- | ------------------------------ | ------------------------ |
| GET    | /is_follow     | Detect is followed?            | **user_id, follower_id** |
| GET    | /get_followers | Get user's followers           | **user_id**              |
| GET    | /get_following | Get following users of user_id | **user_id**              |
| POST   | /follow        | Follow an user                 | **user_id, follower_id** |
| DELETE | /unfollow      | Unfollow an user               | **user_id, follower_id** |

### NOTIFICATION

> Notification feature

- FOLLOW [**/follow**]

| METHOD | ENDPOINT           | ACTION                     | PARAMS/BODY                                              |
| ------ | ------------------ | -------------------------- | -------------------------------------------------------- |
| GET    | /get_notifications | Get notifications of user  | **user_id**                                              |
| POST   | /push_notification | Create notification        | **type, post, notification_from, notification_to**       |
| PUT    | /seen              | Update isSeen notification | **noti_id**                                              |
| DELETE | /undo_notification | delete notification        | **noti_type, post_id?, noti_from, noti_to, comment_id?** |

### ROOM/MESSAGE

> Room and message

- ROOM [**/room**]

| METHOD | ENDPOINT        | ACTION                                     | PARAMS/BODY            |
| ------ | --------------- | ------------------------------------------ | ---------------------- |
| GET    | /get_rooms      | Create Story                               | **userId**             |
| GET    | /get_room_by_id | Create Story                               | **roomId**             |
| GET    | /unseen_number  | Get number of unseen message(last message) | **userId**             |
| POST   | /create_room    | Create room chat                           | **my_user, recipient** |
| POST   | /create_group   | Create group chat(**unavaiable yet**)      | **posterId, mediaId**  |

- MESSAGE [**/message**]

| METHOD | ENDPOINT | ACTION                       | PARAMS/BODY                                    |
| ------ | -------- | ---------------------------- | ---------------------------------------------- |
| GET    | /get     | Get messages with pagination | **limit = 1, page = 10, room_id, top_message** |
| POST   | /send    | Send message                 | **user_id, message, room_id**                  |

## Environment configuration

> **MONGO_URL**: Mongo database connection string (exp: mongodb://127.0.0.1:27017/instagram)
> **PORT**: Run your server on port(exp: 4000)
> **PASS_SEC**: Encrypt password need **PASS_SEC**
> **JWT_SEC**: Create jsonwebtoken need **JWT SECRET**
> **CLO_NAME**: Cloudinary name configuration
> **CLO_KEY**: Cloudinary key
> **CLO_SEC**: Cloudinary secret key

## About Author

- My name is **Tran Thai Dan**, currently a student of HUST(Hanoi university of science and technology).
- I create this project for showing what i have learned and how can i use my knowledge in the real project, i hope i can apply to a company with some of my pet projects!
