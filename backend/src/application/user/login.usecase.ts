import { USER_REPOSITORY, UserRepository } from '@domain/user/user.repository';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@shared/security/jwt.service';


@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      token: this.jwtService.sign({ sub: user.id, email: user.email }),
      user,
    };
  }
}
