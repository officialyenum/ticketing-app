# Ticketing App

This is the Auth Microservice for Ticketing application built with React, Node, Docker and Kubernetes

## Table of Contents

-   [Technologies](#technologies)
-   [Getting Started](#getting-started)
    -   [Installation](#installation)
    -   [Resources](#resources)
    -   [Services](#services)
    -   [Events](#events)
    -   [Routs](#routes)
    -   [Application Creation](#application-creation)
    -   [Running the app](#running-the-app)
    -   [Testing](#testing)
    -   [Usage](#usage)
    -   [Support](#support)
    -   [Stay in touch](#stay-in-touch)
    -   [Documentation](#documentation)
    -   [Deployment](#deployment)
    -   [Limitations](#limitations)

## Technologies
-   [Node JS](https://nodejs.org/) - Node.js® is an open-source, cross-platform JavaScript runtime environment.
-   [React](https://react.dev)React is a free and open-source front-end JavaScript library for building user interfaces based on components.
-   [Docker](https://docker.com) Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.
-   [Kubernetes](https://kubernetes.io/) Kubernetes, also known as K8s, is an open-source system for automating deployment, scaling, and management of containerized applications.

## Getting Started

### Installation
```bash
    # clone repo
    git clone https://github.com/officialyenum/ticketing-app.git

```

### Resources
- USERS
    - email : string
    - password : string

### Services
- Auth : 
    -   Everything Relating to user signup/signin/signout


### Events

- User :
  - UserCreated
  - UserUpdated


### Routes

- Auth :
  - POST - /api/users/signup  
    - Body: {email:string, password:string}
    - Purpose: Sign up for an account
  - POST - /api/users/signin
    - Body: {email:string, password:string}
    - Purpose: Sign in to an existing account
  - POST - /api/users/signout
    - Body: {}
    - Purpose: Sign Out
  - GET - /api/users/currentuser 
    - Body: 
    - Purpose: Return user information

### Application Creation
- Auth :
```bash
    # mk auth directory
    mkdir auth

    # call auth directory
    cd auth

    # initialize node auth app
    npm init -y 

    # install node dependencies
    npm install typescript ts-node-dev express @types/express

    #create tsconfig file
    tsc --init

    mkdir src

    cd src

    touch index.ts

```

```typescript
    import express from "express";
    import { json } from "body-parser";

    const app = express();
    app.use(json());

    app.listen(3000, () => {
        console.log("Listening on port 3000");
    })
```

```json
    {
        ...
        "scripts": {
            "start": "ts-node-dev src/index.ts"
        },
        ...
    }
```

```bash
    
```

### Running the app

```bash
# install packages
$ npm install 

# install packages
$ npm start 

```

### Testing

```bash
# run tests
$ npm test


```

### Usage

This is the basic flow of the application.
-   Register
-   Login

### Support

Ticketing Micro Auth App is an MIT-licensed open source project. If you'd like to support please : <p><a href="https://www.buymeacoffee.com/yenum"> <img align="left" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="yenum" /></a></p>
<br>
<br>

### Stay in touch

- Author - [Chukwuyenum Opone](https://github.com/officialyenum)
- Website - [yenum.dev](https://yenum.dev/)
- Twitter - [@officialyenum](https://twitter.com/officialyenum)
- Instagram - [@officialyenum](https://www.instagram.com/officialyenum/?hl=en)


### License

Ticketing Micro Auth App is [MIT licensed](LICENSE).


### Documentation
-   None Yet

### Deployment

This project is not yet hosted


### Limitations
-   None Yet

