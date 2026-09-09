# Events for the message broker service

Events followed :

- none

Events created :

- `auth.user.created`
- `auth.user.deleted`

## `auth.user.created`

Published when a user is created.

payload :

```json
{
  userId: user-id,
}
```

## `auth.user.deleted`

Published when a user is deleted.

payload :

```json
{
  userId: user-id,
}
```
