# Ticketing App

This is a Microservice for Ticketing application built with React, Node, Docker and Kubernetes

## Table of Contents

-   [Technologies](#technologies)
-   [Getting Started](#getting-started)
    -   [Installation](#installation)
    -   [Resources](#resources)
    -   [Services](#services)
    -   [Events](#events)
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
- TICKET
    - title : string
    - price : number
    - userId : Ref to user resource
    - orderId : Ref to order resource
- ORDER
    - userId : Ref to the user resource
    - status :  Enum "Created"|"Cancelled"|"Awaiting Payment"|"Completed"|
    - ticketId : Ref to the ticket resource
    - expiresAt : Date
- CHARGE
    - orderId : Ref to Order resource
    - status : Enum "Created"|"Failed"|"Completed"|
    - amount : number
    - stripeId : string
    - stripeRefundId : string

### Services
- [Auth Micro App](https://github.com/officialyenum/ticketing-app/tree/main/auth#readme) : 
    -   Everything Relating to user signup/signin/signout
- Tickets : 
    -   Ticket Creation/Editing. 
    -   Knows whether a ticket can  be updated
- Orders : Order Creation/Editing.
- Expirations : 
    -   Watches For Orders to be created, 
    -   Cancels them after 15 minutes
- Payments : 
    -   Handles Credit Card Payments
    -   Cancels Orders if payments fails, 
    -   Completes if payment succeeds


### Events

- User :
  - UserCreated
  - UserUpdated
- Order :
  - OrderCreated
  - OrderCancelled
  - OrderExpired
- Ticket :
  - TicketCreated
  - TicketUpdated
- Charge :
  - ChargeCreated


### Running the app

```bash
# install Docker, Kubernetes and Skaffold on your machine
# skaffold app
$ skaffold dev 

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

Ticketing App is an MIT-licensed open source project. If you'd like to support please : <p><a href="https://www.buymeacoffee.com/yenum"> <img align="left" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="yenum" /></a></p>
<br>
<br>

### Stay in touch

- Author - [Chukwuyenum Opone](https://github.com/officialyenum)
- Website - [yenum.dev](https://yenum.dev/)
- Twitter - [@officialyenum](https://twitter.com/officialyenum)
- Instagram - [@officialyenum](https://www.instagram.com/officialyenum/?hl=en)


### License

Ticketing App is [MIT licensed](LICENSE).


### Documentation
-   None Yet

### Deployment

This project is not yet hosted


### Limitations
-   None Yet

