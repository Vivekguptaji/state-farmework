import { User, UserProp } from "../models/User";
import { View } from "./View";

export class UserEdit extends View<User, UserProp> {
  updateName = () => {
    const nameEl = document.getElementById("username") as HTMLInputElement;
    this.model.set({ name: nameEl.value });
  };
  saveUser = () => {
    this.model.save();
  };
  formEvents = (): { [keyName: string]: () => void } => {
    return {
      "click:#updateName-btn": this.updateName,
      "click:#save-btn": this.saveUser,
    };
  };
  template(): string {
    return `
    <h1>User details</h1>
    <input placeholder="user name" value=${this.model.get(
      "name"
    )} id="username" />
    <input placeholder="user age" value=${this.model.get("age")} />
    <button id="updateName-btn">Update User Name</button>
    <button id="save-btn">Save</button>
    `;
  }
}
