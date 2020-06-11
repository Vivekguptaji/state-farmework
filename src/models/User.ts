import { Model } from "./Model";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes";
import { Collection } from "./Collection";
export interface UserData {
  id?: number;
  name?: string;
  age?: number;
}
const db_URL = "http://localhost:3000/Users";
export class User extends Model<UserData> {
  static buildUser(data: UserData) {
    return new User(
      new Attributes<UserData>(data),
      new Sync<UserData>(db_URL),
      new Eventing()
    );
  }
  static getUserCollection() {
    return new Collection<User, UserData>(
      db_URL,
      (data: UserData): User => {
        return User.buildUser(data);
      }
    );
  }
  setRandomAge() {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }
}
