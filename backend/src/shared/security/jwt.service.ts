import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly secret = process.env.JWT_SECRET || 'secret';

  sign(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: '1m' });
  }

  verify(token: string) {
    return jwt.verify(token, this.secret);
  }
}
