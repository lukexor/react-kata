# React Kata

This project is a tool to help screen front-end React candidates in a variety of
areas by providing a simple project to build upon given a set of mock
requirements.

It uses [Create React App](https://github.com/facebook/create-react-app) with
a mock REST API service using a local proxy.

## Available Scripts

### `yarn start`

Runs the app in the development mode at
[http://localhost:3000](http://localhost:3000).

The page will reload as you make file changes.

You will also see any lint errors in the console.

### `yarn server`

Runs the mock REST API service through a local proxy at
[http://localhost:2000](http://localhost:2000).

### `yarn test`

Launches the test runner in the interactive watch mode.

See the section about [running
tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

## React Kata - Scheduler

### Installation & Setup

Ensure you have the following packages installed and updated to the latest
versions:

- [NVM](http://nvm.sh/)
- [NodeJS](https://nodejs.org/en/)

Execute the following commands in your terminal to get started:

```sh
git clone https://github.com/lukexor/react-kata.git
cd react-kata
nvm install
yarn
```

Start the local app development server:

```sh
yarn start
```

In a separate terminal start the mock REST API server:

```sh
yarn server
```

### Introduction

![React Kata](https://github.com/lukexor/react-kata/blob/main/public/logo.png?raw=true)

Lithia Motors takes pride in helping people in all phases of their
car-ownership. Because people have a lot of anxiety about bringing in their cars
for service and repair, a robust suite of services is being built to make
working with dealerships more transparent. It's up to our scrappy two-person
team to build a light-weight and snappy UI to offer choices of available
services and help users book appointments! (such as oil changes, tire
replacements, etc).

### Tasks

1. **Discovery/Design**: Read the requirements and sketch out some simple
   mock-ups. This is its own important task, so give it the thought it deserves.
   (~15-20 min)
1. **Organize/Plan**: Due to limited time, assume the project should be split
   into 3 phases. Prioritize which features should be implemented in `Phase 1`
   and are considered *MVP*. Mention what might be in `Phase 2` or `Phase 3` and
   why.  Base your choices on importance to Product + UX, as well as technical
   complexity. (~10 min)
1. **Implement/Test**: Start building `Phase 1` features from the provided
   starter application. (~1 hr)

**Remember:**: This is an exercise to showcase a range of professional qualities
and, due to limited time, do not need to follow as robust a process as a real
production application.

### Requirements

#### Product Owner & Design/UX Strategist

- "Making sure people can actually do business with us is table-stakes here. As
  long as people can actually book an appointment with us, our shareholders will
  be happy!"
- "We definitely want people to see our Logo first and foremost and a little
  blurb about what we do. After that they should be able to click a *Get
  Started* button to get the ball rolling."
- "Once they're in the main flow, they should be presented with all the services
  available in the next two weeks. When they select a service, they should be
  presented with all the available appointment slots for that service. They can
  then select a slot and book it, by entering their name, email, and vehicle
  information.
- "Let's try to show an icon or  picture with each available service. Make sure
  it really **POPS!** We're a pretty unique company because we want to have a UI
  that really **POPS!**"
- "Once they pick the service they need, let's give them some kind of big
  confirmation prompt. If they say yes, go ahead and book it"
- "Almost forgot! We should put our company contact info somewhere on the
  landing screen if people want to talk to someone. It's
  **supportbutton@lithia.com** and the number is **555-872-3289.**"
- "Once they're all scheduled, let's get that serotonin flowing with some big
  green check marks or smiley faces or something. You can handle that can't
  you?"

#### Engineering Manager

- "Our technical direction is to use *React*. You should feel free to use any
  state library, router, or UI framework you feel you need, but be able to
  explain your choices. If you can implement the app without any of those
  things, that's ok too. Let's not overbuild this, but also start to think about
  our technological roadmap. Getting the tech right is my **TOP PRIORITY!**"
- "If at all possible, I'd like at least one meaningful unit test. Testing is my
  **TOP PRIORITY!**"
- "These back-end engineers can't make a stable web service to save their lives!
  Make sure the pages still work even if the backend services are being spotty.
  Resiliency is my **TOP PRIORITY!**"
- "Don't forget to come up with a snappy name for this app before you start
  building it. Good branding is my **TOP PRIORITY!**"

### API Documentation

#### `GET` /services

Returns an array of services available within the next 14 calendar days. Each
contains:

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

#### `GET` /appointments/:serviceId

Returns an array of appointment blocks currently available for the requested
`Service ID` within the next 14 days. Each contains:

- Appointment ID
- Service Name
- Appointment Date and Time
- Appointment Duration (in seconds)

Example JSON Response:

```json
[
  {
    "id": "972836c4-a389-4b23-9709-78cf33c246ed",
    "serviceName": "Replace Brakes",
    "serviceId": 1,
    "apptStartTime": "2020-8-15T08:30:00.000Z",
    "apptDuration": 3600
  },
  {
    "id": "b192cf15-dcc7-443d-8d2a-6604be7952f1",
    "serviceName": "Replace Brakes",
    "serviceId": 1,
    "apptStartTime": "2020-8-23T13:00:00.000Z",
    "apptDuration": 3600
  }
]
```

#### `POST` /appointments/:id

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
