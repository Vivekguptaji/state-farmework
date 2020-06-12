import { User, UserProp } from "../models/User";
import { View } from "./View";
import { UserEdit } from "./UserEdit";
import { UserForm } from "./UserForm";

export class UserShow extends View<User, UserProp> {
  bindFormElement = (): { [keyName: string]: string } => {
    return {
      UserForm: "#user-form",
      UserEdit: "#user-edit",
    };
  };
  formRender = () => {
    new UserEdit(this.formElement.UserEdit, this.model).render();
    new UserForm(this.formElement.UserForm, this.model).render();
  };
  template(): string {
    return `
    <div id="user-form"></div>
    <div id="user-edit"></div>
    `;
  }
}
