## Setting up development environment 🛠
- Install [postgreSQL](https://www.postgresql.org/) if you don't have it already and create a database named `imagify_development`.
- `git clone git@github.com:congdv/imagify.git`
- Create an empty `.env` by copying `/api/.env.example` contents into it, and fill in your database username and password.
- `yarn && yarn start`
- App should now be running on `http://localhost:6004/`

## API Documentation

### Authentication API

**Create User**:
```
POST http://localhost:6004/authentication/user/create

Body:
{
	"firstName":"firstName",
	"lastName":"lastName",
	"email":"fl@gmail.com",
	"password":"your-password"
}
```

***Login**:

```
POST http://localhost:6004/authentication/user/login

Body:
{
	"email":"fl@gmail.com",
	"password":"your-password"
}
Response: 
{
  "authToken": "....token"
}
```


### Image API

**Upload Image**
```
POST http://localhost:6004/api/image/upload

Header:
Authentication: Bearer <authToken>

Body:
Multipart: 
images: files,
images: files
```

You can upload multiple images with multipart form data


**Get Images**
```
GET http://localhost:6004/api/image/upload

Header:
Authentication: Bearer <authToken>

```

You can upload multiple images with multipart form data


**Get Image**
```
GET http://localhost:6004/api/image/:id

Header:
Authentication: Bearer <authToken>

```

## What's missing?

End-to-end tests

## Author: Cong Dao

- Website: congdv.github.io
- Email: congdaovan94@gmail.com 💬