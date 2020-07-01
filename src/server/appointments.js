const { google } = require('googleapis')
const { privateKey, calendarID } = require('./conf.json')
const moment = require('moment')

class Appointments {

  events = []

  constructor() {
    this.jwtClient = new google.auth.JWT(
      privateKey.client_email,
      null,
      privateKey.private_key,
      ['https://www.googleapis.com/auth/calendar']
    )
    return (async () => {
      try {
        await this.auth()
        return this
      }
      catch (e) {
        console.log('Auth error: ' + e)
      }
    })()
  }

  auth = async () => {
    await this.jwtClient.authorize()
    console.log('Authorized.')
  }

    // get all events with the words 'service' and 'available' in the title
    // that occur in the next 14 days.
  refresh = async () => {

    const startingFrom = (new Date()).toISOString()
      // https://momentjs.com/docs/#/displaying/as-iso-string/
    const endingOn = moment().add(14, 'days').endOf('day').toISOString(true)


    const calendar = google.calendar('v3')
    const res = await calendar.events.list({
      calendarId: calendarID,
        timeMin: startingFrom,
        timeMax: endingOn,
        singleEvents: true,
        orderBy: 'startTime',
        q: 'service available',
        auth: this.jwtClient
      })
    this.events = res.data.items
  }

  getAvailableServices = async () => {
    await this.refresh()
    let result = []
    this.events.forEach((event) => {
      const wrapper = new Event(event)
      if (!result.find((element) => (element.serviceType === wrapper.serviceType))) {
        result.push(wrapper)
      }
    })
    return result.map((e) => (e.asService()))
  }

    // get all events with the words 'service' and 'available' in the title
    // that occur in the next 14 days.
  getServiceAppointments = async (serviceID) => {

    const startingFrom = (new Date()).toISOString()
      // https://momentjs.com/docs/#/displaying/as-iso-string/
    const endingOn = moment().add(14, 'days').endOf('day').toISOString(true)

    const calendar = google.calendar('v3')
    const res = await calendar.events.list({
      calendarId: calendarID,
        timeMin: startingFrom,
        timeMax: endingOn,
        singleEvents: true,
        orderBy: 'startTime',
        q: `service ${serviceID} available`,
        auth: this.jwtClient
      })
    const appts = res.data.items
    return appts.map((a) => (new Event(a).asAppointment()))
  }

  getAllAppointments = async () => {
    await this.refresh()
    return this.events.map((a) => (new Event(a).asAppointment()))
  }

  bookAppointment = async (
    apptID, 
    email, 
    lastName, 
    modelYear, 
    make, 
    model
  ) => {
    const calendar = google.calendar('v3')
    let event = null
    try {
      const response = await calendar.events.get({
        calendarId: calendarID, 
        eventId: apptID,
        auth: this.jwtClient
      })
      event = response.data
    }
    catch (e) {
      console.log("API ERROR" + e)
      return null
    }


    // format is always 'service OilChange available'
    const tokens = event.summary.split(' ')
    tokens[2] = 'booked'  // replace 'available' with 'booked'
    tokens.push(lastName) // append lastName to event summary
    event.summary = tokens.join(' ')
    const wrapper = new Event(event)
    event.description = `${wrapper.serviceName} appointment scheduled for:\n`
    event.description += `Last Name: \t${lastName}\n`
    event.description += `email: \t${email}\n`
    event.description += `Date and Time: \t${wrapper.start}\n`
    event.description += `Vehicle: \t${modelYear} ${make} ${model}\n`

    let responseEvent = null
    try {
      const response = await calendar.events.patch({
        calendarId: calendarID,
        eventId: apptID,
        resource: event,
        auth: this.jwtClient
      })
      responseEvent = response.data
    }
    catch (e) {
      console.log("API ERROR" + e)
      return null

    }

    const responseWrapper = new Event(responseEvent)
    return responseWrapper.asBookedAppointment()
  }
}


const camelToSentanceCase = (str) => {
  const regex = /([A-Z])(?=[A-Z][a-z])|([a-z])(?=[A-Z])/g
  return str.replace(regex, '$& ')
}

class Event {
  constructor(event) {
      // format is always 'service OilChange available'
    const tokens = event.summary.split(' ')
    this.serviceType = tokens[1]  
    this.serviceName = camelToSentanceCase(this.serviceType)

    const end = new moment(event.end.dateTime)
    const start = new moment(event.start.dateTime)
    this.start = start.format("dddd, MMMM Do YYYY, h:mma") 
    this.duration = moment.duration(start.diff(end)).humanize()
    this.apptID = event.id
    this.nativeEvent = event
  }

  asService = () => ({
    serviceType: this.serviceType,
    serviceName: this.serviceName,
    duration: this.duration
  })

  asAppointment = () => ({
    apptID: this.apptID,
    serviceName: this.serviceName,
    start: this.start,
    duration: this.duration,
  })

  asBookedAppointment = () => ({
    apptID: this.apptID,
    serviceName: this.serviceName,
    start: this.start,
    duration: this.duration,
    description: this.nativeEvent.description
  })
}

module.exports = ( async () => {
  return await new Appointments()
})()
