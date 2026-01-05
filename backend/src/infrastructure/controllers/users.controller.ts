import { LoginUseCase } from "@application/user/login.usecase";
import { RegisterUseCase } from "@application/user/register.usecase";
import { Controller, Get, Post, Body } from "@nestjs/common";
import { LoginDto } from "@shared/dto/login.dto";
import { RegisterDto } from "@shared/dto/register.dto";

@Controller("users")
export class UsersController {
  constructor(
    private readonly login: LoginUseCase,
    private readonly register: RegisterUseCase
  ) {}

  @Post("login")
  loginUser(@Body() dto: LoginDto) {
    return this.login.execute(dto.email, dto.password);
  }

  @Post("register")
  registerUser(@Body() dto: RegisterDto) {
    return this.register.execute(dto.email, dto.password, dto.name);
  }
}
