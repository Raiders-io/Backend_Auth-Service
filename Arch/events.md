# Events for the message broker service

## Important informations

- group: `auth-service`
- consumer: `auth-service`
- stream : `auth.events`
- events types naming convention : `auth.<type>`

## Events followed

None.

## Events created

- `auth.started`
- `auth.user.created`
- `auth.user.deleted`

For more informations, you can look directly for the VineJs implementation in `app/validators/events.ts`.

## `auth.started`

Published when the service started.

payload :

```json
{
  message: string,
}
```

## `auth.user.created`

Published when a user is created.

payload :

```json
{
  userId: uuid,
}
```

## `auth.user.deleted`

Published when a user is deleted.

payload :

```json
{
  filename: string,
  userId: uuid,
}
```
