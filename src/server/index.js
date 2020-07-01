require('dotenv/config')
const cors = require('cors')
const express = require('express')
const asyncHandler = require('express-async-handler')

const app = express()
app.use(cors())
app.use(express.json())
app.set('json spaces', 2);

let appointments = null

app.get('/services', asyncHandler(async (req, res, next) => {
  const services = await appointments.getAvailableServices();
  res.send(services)
}))

app.get('/appointments', asyncHandler(async (req, res, next) => {
  const appts = await appointments.getAllAppointments()
  res.send(appts)
}))

app.get('/appointments/:serviceType', asyncHandler(async (req, res, next) => {
  const appts = await appointments.getServiceAppointments(req.params.serviceType)
  res.send(appts)
}))

app.put('/appointments/:id', asyncHandler(async (req, res, next) => {

  const {
    email, 
    lastName, 
    modelYear, 
    make, 
    model
  } = req.body
  
  const confirmation = await appointments.bookAppointment(
    req.params.id,
    email, 
    lastName, 
    modelYear, 
    make, 
    model
  )
  res.send(confirmation)
}))

app.get('/raw', asyncHandler(async (req, res, next) => {
  await appointments.refresh();
  res.send(appointments.events)
}))

// need semicolon
;(async () => {
  appointments = await require("./appointments")
  app.listen(process.env.PORT, 
    () => {console.log(`Scheduling server listening on port ${process.env.PORT}...`)}
  )
})()

