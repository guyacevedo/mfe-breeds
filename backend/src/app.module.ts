import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CatModule } from "@infrastructure/modules/cat.module";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
     CatModule,
  ],
})
export class AppModule {}
