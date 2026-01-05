import { User } from "@domain/user/user.entity";
import { USER_REPOSITORY, UserRepository } from "@domain/user/user.repository";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@shared/security/jwt.service";
@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async execute(email: string, password: string, name: string) {
    const user = new User(Date.now().toString(), email, password, name);
    const newUser = await this.userRepo.create(user);

    if (!newUser) {
      throw new UnauthorizedException("Error registering user");
    }

    return {
      token: this.jwtService.sign({ sub: newUser.id, email: newUser.email }),
      user: newUser,
    };
  }
}
