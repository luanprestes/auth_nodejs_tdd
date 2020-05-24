import { Router } from 'express'
import SessionController from '../controllers/session.controller'

const router = Router()

router.get('/', (req, res) => {
  res.send('Hello world')
})

router.post('/sessions', SessionController.store)

export default router
