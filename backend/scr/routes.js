const express = require('express')

const SessionController = require('./controllers/SessionController')

const OngController = require('./controllers/OngsController')

const ProfileController = require('./controllers/ProfileController')

const IncidentController = require('./controllers/IncidentController')

const routes = express.Router()

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.create)

routes.post('/incidents', IncidentController.create)
routes.get('/incidents', IncidentController.index)
routes.delete('/incidents/:id', IncidentController.delete)

routes.get('/profile',ProfileController.index)

module.exports = routes
