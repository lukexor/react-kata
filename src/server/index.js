const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());
app.set("json spaces", 2);

const services = [
  {
    id: 1,
    serviceName: "Replace Brakes",
    serviceDuration: 3600,
  },
  {
    id: 2,
    serviceName: "Oil Change",
    serviceDuration: 1800,
  },
  },
  {
    id: 3,
    serviceName: "Rotate Tires",
    serviceDuration: 1800,
  },
];

const getRandom = (min, max) => {
  return Math.floor(Math.random() * max) + min;
};

const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const randomDate = () => {
  const start = new Date();
  const end = new Date(Date.now() + 12096e5);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

let appointments = [];
services.forEach((service) => {
  for (let i = 0; i < getRandom(2, 4); ++i) {
    appointments.push({
      id: uuid(),
      serviceName: service.serviceName,
      serviceId: service.id,
      apptStartTime: randomDate().toISOString(),
      apptDuration: service.duration,
    });
  }
});

app.get("/services", (req, res) => res.send(services));

app.get("/appointments", (req, res) => res.send(appointments));

app.get("/appointments/:serviceId", (req, res) => {
  res.send(
    appointments.filter(
      (appt) => appt.serviceId === parseInt(req.params.serviceId)
    )
  );
});

app.put("/appointments/:id", (req, res) => {
  const { email, lastName, modelYear, make, model } = req.body;
  if (!email) {
    res.status(400).send(`Invalid email address: ${email}`);
  }
  if (!lastName) {
    res.status(400).send(`Invalid Last Name: ${lastName}`);
  }
  if (!modelYear || !make || !model) {
    res.status(400).send(`Invalid vehicle: ${modelYear} ${make} ${model}`);
  }
  const appt = appointments.find((appt) => appt.id === req.params.id);
  if (!appt) {
    res.status(400).send("Invalid Appointment ID");
  }
  res.send({
    ...appt,
    email,
    lastName,
    make,
    model,
    modelYear,
  });
});

app.listen(process.env.SERVERPORT || 2000, () => {
  console.log(
    `Scheduling server listening on port ${process.env.SERVERPORT || 2000}...`
  );
});
