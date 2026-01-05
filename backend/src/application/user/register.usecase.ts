import { User } from "@domain/user/user.entity";
import { USER_REPOSITORY, UserRepository } from "@domain/user/user.repository";
import { Inject, Injectable } from "@nestjs/common";


@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository
  ) {}

  async execute(email: string, password: string, name: string) {
    const user = new User(Date.now().toString(), email, password, name);
    return this.userRepo.create(user);
  }
}
