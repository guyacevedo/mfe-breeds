import { LoginUseCase } from "@application/user/login.usecase";
import { RegisterUseCase } from "@application/user/register.usecase";
import { UsersController } from "@infrastructure/controllers/users.controller";
import { Module } from "@nestjs/common";
import { JwtService } from "@shared/security/jwt.service";
import { UserModule } from "./user.module";

@Module({
  imports: [UserModule],
  providers: [LoginUseCase, RegisterUseCase, JwtService],
  controllers: [UsersController],
})
export class AuthModule {}
