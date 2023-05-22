# Welcome to Mystagram API!

Hi! This is MYSTAGRAM API i created with [**#Nodejs**, **#Expressjs**, **#Cloudinary**, **#Socket-io** and **Peerjs**].

## About this project

This project is combination of what i learn, so i choose MVC (**model, view, controller**) but the view part i use is **Nextjs**.
The database technology is **mongodb** with **mongoose** lib to easy access to database.

## API DOCUMENT

### USER/AUTH API:

- AUTH [**/auth**]

```

```

| METHOD | ENDPOINT  | ACTION               |
| ------ | --------- | -------------------- |
| POST   | /register | Register new account |
| POST   | /login    | Login                |

```

```

- USER [**/user**]

```

```

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

```

```

### CLOUDINARY/MEDIA( image ):
