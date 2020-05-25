import { Router } from 'express'
import SessionController from '../controllers/session.controller'
import AuthMiddleware from '../middleware/auth.middleware'

const router = Router()

router.post('/sessions', SessionController.store)

router.use(AuthMiddleware)

router.get('/dashboard', (req, res) => {
  res.status(200).send()
})

export default router
