# Backend_Auth-Service

## Context

_This project has been created as part of the 42 curriculum by halnuma, ppontet, vdurand._

## Introduction

This project is a service for the project [Transcendence](https://github.com/Raiders-io/Transcendence). It regroups all the needs to enable authentification for users AND services that needs to verify if a client is correctly signed up.

The project is divided in 3 softwares :

- `Backend_Auth-Service` : provides access to the object storage.
- `PostgreSQL`
  - user profile, access tokens, and other informations...

## Documentation

For documentation of :

- Flow sequences [flow.md](Arch/flow.md).
- How to use [how-to-use.md](Arch/how-to-use.md).

## Features

- API for manipulating safely an object storage solution like S3
- quota implementation for storage limits defined at User Level
- use of Garage, free and open-source implementation of AWS S3 and MinIO
- testing unit via Bruno

## AI / LLM Usage

LLM was used to review documents.

## Installation

You will need to fill all the missing variables in the `.env` file. Some are described in the following tutorial and some have directly instruction in the `.env.example` file.

If you wish to setup all the `.env` vars directly, we advise you to use this command :

```sh
make env
```
