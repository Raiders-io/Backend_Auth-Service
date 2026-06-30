# Backend_Auth-Service

This project is a service for the project [Transcendence](https://github.com/Raiders-io/Transcendence). It regroups all the needs to enable authentification for users AND services that needs to verify if a client is correctly signed up.

The project is divided in 3 softwares :

- `Backend_Auth-Service` : provides access to the object storage.
- `PostgreSQL`
  - user profile, access tokens, and other informations...

## Installation

You will need to fill all the missing variables in the `.env` file. Some are described in the following tutorial and some have directly instruction in the `.env.example` file.

If you wish to setup all the `.env` vars directly, we advise you to use this command :

```sh
make env
```

## Flow

See the [flow.md in Arch/](Arch/flow.md).

## How to use

See the [README.md in Arch/](Arch/README.md).
