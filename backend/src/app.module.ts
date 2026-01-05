import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CatModule } from "@infrastructure/modules/cat.module";
import { AuthModule } from "@infrastructure/modules/auth.module";
import { UserModule } from "@infrastructure/modules/user.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        let uri = config.get<string>("MONGO_URL");

        if (
          process.env.NODE_ENV !== "production" &&
          uri?.includes("://mongo:")
        ) {
          uri = uri.replace("://mongo:", "://127.0.0.1:");
        }

        return { uri };
      },
    }),

    CatModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
