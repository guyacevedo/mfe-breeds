import { User } from "@domain/user/user.entity";
import { UserRepository } from "@domain/user/user.repository";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserRepositoryMongo implements UserRepository {
  constructor(@InjectModel("User") private readonly model: Model<any>) {}

  async findByEmail(email: string): Promise<User | null> {
    const doc = await this.model.findOne({ email }).lean();
    if (!doc) return null;
    return new User(doc._id.toString(), doc.email, doc.password, doc.name);
  }

  async create(user: Omit<User, "id">): Promise<User> {
    const created = await this.model.create(user);
    return new User(
      created._id.toString(),
      created.email,
      created.password,
      created.name
    );
  }
}
