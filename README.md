# React Kata

## Table of Contents

- [Introdution](#introduction)
- [Installation & Setup](#installation--setup)
- [Tasks](#tasks)
- [Requirements](#requirements)
  - [Engineering Manager](#engineering-manager)
  - [Product Owner & Design/UX](product-owner--designux)
- [Resources](#resources)
- [API Reference](#api-reference)
  - [GET /services](#get-services)
  - [GET /appointments/:serviceId](#get-appointmentsserviceId)
  - [POST /appointments/:id](#post-appointmentsid)

## Introduction

![React Kata](https://github.com/lukexor/react-kata/blob/main/public/images/logo.png?raw=true)

This project provides an interviewing screen for React engineers by providing a
mock project to build.

It uses [Create React App](https://github.com/facebook/create-react-app) with
a REST API server on a local proxy. (e.g. API calls to `/services` will forward
to `http://localhost:2000/services`)

### Notes

- **Remember**: This is an exercise and, due to limited time, do not need to
  follow as robust a process as a real production application.
- This exercise uses [Functional
  React](https://reactjs.org/docs/hooks-intro.html) with hooks, so be prepared
  to demonstrate your knowledge using that paradigm.
- This exercise should not be worked on ahead of time. The intent is to work
  through this together during the interview.
- You are not expected to finish the exercise. The scope is deliberately larger
  than an interview is expected to last. The intent is to see how you work
  through the software development lifecycle given the constraints of the
  exercise.

## Installation & Setup

Ensure you have the following packages installed and updated to the latest
versions:

- [NVM](http://nvm.sh/)
- [NodeJS](https://nodejs.org/en/)

Execute the following commands in your terminal to get started:

```sh
git clone https://github.com/lukexor/react-kata.git
cd react-kata
nvm install
npm install
```

Start the local app development server:

```sh
npm start
```

In a separate terminal start the REST API server:

```sh
npm run server
```

To run unit tests:

```sh
npm test
```

## Tasks

1. **Discovery/Design**: Read the requirements and sketch out some simple
   mock-ups. This is its own important task, so give it the thought it deserves.
   (~10-20 min)
1. **Organize/Plan**: Due to limited time, assume the project should be split
   into phases. Prioritize which features should be implemented in `Phase 1`
   and are considered _MVP_. Base your choices on importance to Product + UX, as
   well as technical complexity. (~10 min)
1. **Implement/Test**: Start building `Phase 1` features from the provided
   starter application. (~45-60 min)

## Requirements

Lithia Motors takes pride in helping people in all phases of their
car-ownership. It's up to our scrappy team to build a snappy UI to help users
book appointments such as oil changes, tire replacements, etc.

### Engineering Manager

- "Our technical direction is to use _Functional React_ with hooks. You should
  feel free to use any state library, router, or UI framework you feel you need,
  but let's not overbuild this. Getting the tech right is my **TOP PRIORITY!**"
- "If at all possible, I'd like at least one meaningful unit test. Testing is my
  **TOP PRIORITY!**"
- "These back-end engineers can't make a stable web service to save their lives!
  Make sure the pages still work even if the backend services are being spotty.
  Resiliency is my **TOP PRIORITY!**"

### Product Owner & Design/UX

- "Making sure people can do business with us is most important goal. As long as
  people can book an appointment with us, our shareholders will be happy!"
- "We want people to see our Logo first and foremost and a little blurb about
  what we do. After that they should be able to click a _Get Started_ button to
  get the ball rolling."
- "Once they're in the main flow, they should be presented with all the services
  available in the next two weeks. When they select a service, they should be
  presented with all the available appointment slots for that service. They can
  then select a slot and book it, by entering their name, email, and vehicle
  information.
- "Let's try to show an icon or picture with each available service."
- "Once they pick the service they need, let's give them some kind of big
  confirmation prompt. If they say yes, go ahead and book it"
- "Almost forgot! We should put our company contact info somewhere on the
  landing screen if people want to talk to someone. It's
  **supportbutton@lithia.com** and the number is **555-872-3289.**"

## Resources

- `src/components/`: Initial project components to build from.
- `src/utils/`: Utility and middleware libraries.
- `public/images/`: Example images/icons provided by designers.
- `wireframes`: Sample wireframes provided by designers.

## API Reference

### `GET` /services

Returns a list of services available within the next 14 days. Each contains:

- Service ID
- Service Name
- Service Duration (in seconds).

Example JSON response:

```json
[
  {
    "id": 1,
    "serviceName": "Replace Brakes",
    "serviceDuration": 3600
  },
  {
    "id": 2,
    "serviceName": "Oil Change",
    "serviceDuration": 1800
  },
  {
    "id": 3,
    "serviceName": "Rotate Tires",
    "serviceDuration": 1800
  }
]
```

### `GET` /appointments/:serviceId

Returns a list of appointment blocks currently available for the requested
`Service ID` within the next 14 days. Each contains:

- Appointment ID
- Service Name
- Appointment Start Date and Time
- Appointment Duration (in seconds)

Example JSON Response:

```json
[
  {
    "id": "972836c4-a389-4b23-9709-78cf33c246ed",
    "serviceName": "Replace Brakes",
    "apptStartTime": "2020-8-15T08:30:00.000Z",
    "apptDuration": 3600
  },
  {
    "id": "b192cf15-dcc7-443d-8d2a-6604be7952f1",
    "serviceName": "Replace Brakes",
    "apptStartTime": "2020-8-23T13:00:00.000Z",
    "apptDuration": 3600
  }
]
```

### `POST` /appointments/:id

Book the requested appointment for a particular customer and vehicle. Request
body must contain:

- Customer Email
- Customer Name
- Vehicle Make
- Vehicle Model
- Vehicle Model Year

Example JSON Request:

```json
{
  "email": "JohnDoe123@example.com",
  "name": "John Doe",
  "make": "Mazda",
  "model": "Miata",
  "modelYear": "2005"
}
```

Example JSON Response:

```json
{
  "id": "71p51iun6j0jajc7ln894q32pd",
  "serviceName": "Oil Change",
  "apptStartTime": "2020-07-01T09:00:00.000Z",
  "apptDuration": "30 minutes",
  "name": "John Doe",
  "email": "JohnDoe123@gmail.com",
  "make": "Mazda",
  "model": "Miata",
  "modelYear": "2005"
}
```
