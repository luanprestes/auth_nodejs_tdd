import { Response, Request } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../database/entity/User'

class SessionController {
  async store (req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    const user = await getRepository(User).findOne({ email })

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'Incorrect password' })
    }

    return res.status(200).send({
      user,
      token: user.generateToken()
    })
  }
}

export default new SessionController()
