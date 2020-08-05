import express from 'express'

import ClassesController from './controllers/ClassesController'
import ConnectionController from './controllers/ConnectionsController'

const routes = express.Router()
const classesCrontrollers = new ClassesController()
const connectionsCrontrollers = new ConnectionController()

routes.get('/classes', classesCrontrollers.index)
routes.post('/classes', classesCrontrollers.create)

routes.get('/connections', connectionsCrontrollers.index)
routes.post('/connections', connectionsCrontrollers.create)

export default routes