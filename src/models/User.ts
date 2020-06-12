import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes";
import { Model } from "./Model";
export interface UserProp {
  id?: number;
  name?: string;
  age?: number;
}
const root_Url = "http://localhost:3000/users";
export class User extends Model<UserProp> {
  static buildUser(data: UserProp) {
    return new User(
      new Attributes<UserProp>(data),
      new Sync<UserProp>(root_Url),
      new Eventing()
    );
  }
  setRandomAge() {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }
}
