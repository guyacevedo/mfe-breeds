import { LoginUseCase } from "@application/user/login.usecase";
import { RegisterUseCase } from "@application/user/register.usecase";
import { USER_REPOSITORY } from "@domain/user/user.repository";
import { UsersController } from "@infrastructure/controllers/users.controller";
import { UserRepositoryMongo } from "@infrastructure/repositories/mongo-user.repository";
import { UserSchema } from "@infrastructure/schemas/user.schema";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtService } from "@shared/security/jwt.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: "User", schema: UserSchema }])],
  controllers: [UsersController],
  providers: [
    UserRepositoryMongo,
    { provide: USER_REPOSITORY, useExisting: UserRepositoryMongo },
    LoginUseCase,
    RegisterUseCase,
    JwtService,
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
