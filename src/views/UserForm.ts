import { Model } from "../models/Model";
import { User, UserProp } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProp> {
  formEvents = (): { [keyName: string]: () => void } => {
    return {
      "click:#set-age": this.onClickSetAge,
    };
  };

  onClickSetAge = () => {
    this.model.setRandomAge();
  };
  template(): string {
    return `<h1>User Form</h1>
    <div>User Name:${this.model.get("name")}</div>
    <div>User Age:${this.model.get("age")}</div>
    <button id="set-age">Set Random Age</button>
    `;
  }
}
