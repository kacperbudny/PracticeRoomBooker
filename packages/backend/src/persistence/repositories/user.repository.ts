import { eq } from "drizzle-orm";
import { User } from "src/domain/user.entity";
import { Db } from "src/persistence";
import { users } from "src/persistence/schemas/user.schema";

export class UserRepository {
  private db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async getUserByEmail(email: string) {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!result.length) {
      return null;
    }

    return new User(result[0]);
  }

  async getUserById(id: string) {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!result.length) {
      return null;
    }

    return new User(result[0]);
  }

  async createUser(user: User) {
    const result = await this.db
      .insert(users)
      .values({
        email: user.email,
        password: user.password,
        role: user.role,
      })
      .returning();

    if (!result) {
      return null;
    }

    return new User(result[0]);
  }
}
