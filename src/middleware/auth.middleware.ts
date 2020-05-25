import { Request, Response, NextFunction } from 'express'
import jwt, { VerifyErrors } from 'jsonwebtoken'

interface RequestInterface extends Request {
  userId: number | null;
}

interface Decoded {
  id: number | null;
}

const AuthMiddleware = async (req: RequestInterface, res: Response, next: NextFunction): Promise<Response | void> => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Not Authorization' })
  }

  const [, token] = authHeader.split(' ')

  jwt.verify(token, process.env.APP_SECRET, (err: VerifyErrors | null, decoded: Decoded) => {
    if (decoded) {
      req.userId = decoded.id

      return next()
    }

    if (err) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  })

  return next()
}

export default AuthMiddleware
