import { View } from "./View";
import { UserForm } from "./UserForm";
import { UserShow } from "./UserShow";
import { User, UserData } from "../models/User";

export class UserEdit extends View<User, UserData> {
  mapRegions = () => {
    return {
      userShow: "#user-show",
      userForm: "#user-form",
    };
  };
  onRender() {
    new UserShow(this.regions.userShow as HTMLElement, this.model).render();
    new UserForm(this.regions.userForm as HTMLElement, this.model).render();
  }
  template(): string {
    return ` 
    <div id="user-form">User Form</div>
    <div id="user-show">User Show</div>
    `;
  }
}
