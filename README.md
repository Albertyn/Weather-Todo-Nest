# Weather-Todo-Nest
a nest.js demo project

I was using a container node:latest to develop this demo so therefore the project structure.
Once you have cloned tthis repo navigate to 

## Project setup

```bash
$ cd gg-todos/
$ npm install
$ npm run start:dev
```
## Configuration
Note the use of .env files in the project for maintaining environment settings for different deploymnets.
- .env.development
- .env.test

### headders - auth  success 
use these headers when making requests on protected routes.
```
Authorization: Basic dGVzdHVzZXI6dGVzdHBhc3N3b3Jk
Content-Type: application/json
```

### weather URL 
- public
- city (string) required
the url you'll be using to get the pass through weather request basically takes GPS longditude & latitude as inputs, 
so I made that same api lookup coordinates for a City and use it's response to make the weather call.
```
localhost:3000/weather/?city=Cape Town
```

### Todos API (see swagger) 
- public: get All
- protected: get One, create, update, delete
```
localhost:3000/todos/
```

### Swagger URL 
```
localhost:3000/api-doc/
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode - some issues while using containers
$ npm run start:dev
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Deployment


```bash
# todo: in proj - for node js apps there is tricky build step re node 
$ docker-compose up 
```