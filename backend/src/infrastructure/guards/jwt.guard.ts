import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@shared/security/jwt.service";

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers.authorization;

    if (!auth) return false;

    try {
      const token = auth.replace("Bearer ", "");
      req.user = this.jwt.verify(token);
      return true;
    } catch {
      return false;
    }
  }
}
