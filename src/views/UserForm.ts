import { User, UserData } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserData> {
  setRandomAge = () => {
    this.model.setRandomAge();
    console.log("setRandomAge clicked");
  };
  mapEvents = (): { [keyName: string]: () => void } => {
    return {
      "click:.set-age": this.setRandomAge,
    };
  };
  template(): string {
    return `<h1>User Details</h1>
    <div>User Name: ${this.model.get("name")}</div>
    <div>User Age: ${this.model.get("age")}</div>
    <button class="set-age">Set Random Age</button>
    `;
  }
}
