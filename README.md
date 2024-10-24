# Consumer
Consumer folder is for RabbitMQ Consumer


# Producer

The Producer is the primary API for your app, integrated with RabbitMQ.
> **RabbitMQ URL is hard coded**

> **MongoDB URL is hard coded**

> **JWT Secret is hard coded with '*secret*' is the key**

# API Docs

> PLESAE ADJUST BASE URL

## Authentication

`Authorization bearer token is required on each protected request.`

### Authentication error response

If an API key is missing, malformed, or invalid, you will receive an HTTP 401 Unauthorized response code.

## Endpoints

### User

#### Register a new user

**URL:** `http://localhost:3000/api/register`

**Method:** `POST`

**Headers:**

- `Content-Type: application/json`

**Body:**

```json
{
    "username": "user",
    "email": "user@user.com",
    "password": "user123"
}
```

**Responses:**

```
Success: 201 Created
```

#### Authenticate user

**URL:** `http://localhost:3000/api/login`

**Method:** `POST`

**Headers:**

- `Content-Type: application/json`

**Body:**

```json
{
    "usernameOrEmail": "admin",
    "password": "admin123"
}
```

**Response:**

```json
{
    "message": "success",
    "accessToken": "token"
}
```

## Get authenticated profile

**URL:** `http://localhost:3000/api/getProfile`

**Method:** `GET`

**Headers:**

- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Response:**

```json
{
    "_id": "6718ddd33ecefa69806ebf71",
    "username": "admin",
    "email": "admin@admin.com",
    "interests": ["music", "football"],
    "__v": 0,
    "birthday": "1999-03-19",
    "displayName": "Admin Ganteng",
    "gender": "male",
    "horoscope": "Pisces",
    "zodiac": "Fish"
}
```

#### Update authenticated user profile

**URL:** `http://localhost:3000/api/updateProfile`

**Method:** `PATCH`

**Headers:**

- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Body:**

```json
{
    "displayName": "Display name updateds",
    "gender": "female",
    "birthday": "2002-08-21",
    "interests": ["ff", "rugby", "rugby", "rugby"],
    "zodiac": "fish",
    "horoscope": "pisces",
    "height": 178,
    "weight": 80
}
```

**Response:**

```json
{
    "displayName": "Display name updateds",
    "gender": "female",
    "birthday": "2002-08-21",
    "interests": ["ff", "rugby", "rugby", "rugby"],
    "zodiac": "fish",
    "horoscope": "pisces",
    "height": 178,
    "weight": 80
}
```
## Message

#### Send message to user

**URL:** `http://localhost:3000/api/sendMessage`

**Method:** `POST`

**Headers:**

- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Body:**

```json
{
    "receiverId": "6719196c00e5ef78f76b8af6",
    "content": "hello gayss"
}
```

**Response:**

```json
{
    "message": "Message sent successfully"
}
```

## Zodiac

### Get zodiac

**URL:** `http://localhost:3000/zodiac/getZodiac`

**Method:** `POST`

**Headers:**

- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Body:**

```json
{
    "birthdate": "1999-03-19"
}
```

**Response:**

```json
{
    "zodiac": "Pisces",
    "sign": "Fish"
}
```
