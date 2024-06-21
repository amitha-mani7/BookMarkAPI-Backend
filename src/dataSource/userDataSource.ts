import { Users } from "../entity/Users";
import { AppDataSource } from "../helper/appDataSource";
import * as bcrypt from 'bcryptjs';

export class UserDataSource {
  async getUserByName(userName: string) {
    const userDetailsFromTable = await AppDataSource.getRepository(Users)
      .createQueryBuilder("user")
      .where("user.username = :userName", { userName })
      .getOne();
    return userDetailsFromTable;
  }
  async getUserById(userId: number) {
    const userDetailsFromTable = await AppDataSource.getRepository(Users)
      .createQueryBuilder("user")
      .where("user.id = :userId", { userId })
      .getOne();
    return userDetailsFromTable;
  }

  async addUser(userName: string, password: string) {
    const decryptedPassword = await bcrypt.hash(password, 10);
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Users)
      .values([{ username: userName, password: decryptedPassword }])
      .execute();
  }
}
