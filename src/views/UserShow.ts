import { View } from "./View";
import { User, UserData } from "../models/User";

export class UserShow extends View<User, UserData> {
  updateName = () => {
    const name = this.parentEl.querySelector("input").value;
    this.model.set({ name });
    console.log("update name clicked");
  };
  userSave = () => {
    this.model.save();
  };
  mapEvents = () => {
    return {
      "click:#update-name": this.updateName,
      "click:#save": this.userSave,
    };
  };
  template(): string {
    return `<input placeholder=${this.model.get("name")}> 
    <button id="update-name">Update Name</button>
    <button id="save">Save</button>
    `;
  }
}
