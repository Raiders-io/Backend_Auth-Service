# Flow

User Info example :

```json
{
  "data": {
    "id": "1[...]2-3000-4000-5000-6[...]7",
    "fullName": "John Doe",
    "email": "test@test.test",
    "createdAt": "2026-06-30T08:26:43.659+00:00",
    "updatedAt": "2026-06-30T08:26:43.659+00:00",
    "initials": "JD"
  }
}
```

- `Login` route : should try to use the token in header before creating a new one.
- `Profile` route : returns the same info of login but don't try to create a new access token. It justs uses the current one.
- `Logout` route : takes a token and deletes it from DB.

## Signup

```mermaid
sequenceDiagram
    actor User
    participant API_Auth as API
    participant DB@{ "type" : "database" }
    User->>API_Auth: POST /auth/signup
    activate API_Auth
    API_Auth->>API_Auth: Verify Token if provided
    API_Auth->>DB: Create or read entry
    activate DB
    DB->>API_Auth: User info
    deactivate DB
    API_Auth->>User: User info
    deactivate API_Auth
    User->>User: Save info in Cookies
```

## Login

```mermaid
sequenceDiagram
    actor User
    participant API_Auth as API
    participant DB@{ "type" : "database" }
    User->>API_Auth: POST /auth/login
    activate API_Auth
    API_Auth->>API_Auth: Verify Token if provided
    API_Auth->>DB: Read entry
    activate DB
    DB->>API_Auth: User info
    deactivate DB
    API_Auth->>User: User info
    deactivate API_Auth
    User->>User: Save info in Cookies
```

## Verify

```mermaid
sequenceDiagram
    actor User
    participant API_Auth as API
    participant DB@{ "type" : "database" }
    User->>API_Auth: POST /auth/verify
    activate API_Auth
    API_Auth->>API_Auth: Verify Token if provided
    API_Auth->>DB: Read entry
    activate DB
    DB->>API_Auth: User ID
    deactivate DB
    API_Auth->>User: User ID
    deactivate API_Auth
    User->>User: Save UserID in Cookies
```

## Profile

```mermaid
sequenceDiagram
    actor User
    participant API_Auth as API
    participant DB@{ "type" : "database" }
    User->>API_Auth: POST /account/profile
    activate API_Auth
    API_Auth->>API_Auth: Verify Token if provided
    API_Auth->>DB: Read entry
    activate DB
    DB->>API_Auth: User info
    deactivate DB
    API_Auth->>User: User info
    deactivate API_Auth
    User->>User: Save info in Cookies
```

## Logout

```mermaid
sequenceDiagram
    actor User
    participant API_Auth as API
    participant DB@{ "type" : "database" }
    User->>API_Auth: POST /account/logout
    activate API_Auth
    API_Auth->>API_Auth: Verify Token if provided
    API_Auth->>DB: Delete token
    activate DB
    DB->>API_Auth: OK
    deactivate DB
    API_Auth->>User: OK
    deactivate API_Auth
    User->>User: Delete info in Cookies
```
