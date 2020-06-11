import { UserShow } from "./views/UserShow";
import { User } from "./models/User";
import { UserEdit } from "./views/UserEdit";
import { UserForm } from "./views/UserForm";
const div = document.getElementById("app") as HTMLDivElement;

const user = User.buildUser({ name: "Vivek G", age: 30 });
// const userShow = new UserShow(div, user);
// //userShow.render();

// const userForm = new UserForm(div, user);
const userEdit = new UserEdit(div, user);
userEdit.render();
// const userEdit = new UserEdit(div, user);
// //userEdit.render();
// console.log(userEdit);
