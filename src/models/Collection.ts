import axios, { AxiosPromise } from "axios";
import { User, UserData } from "./User";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
export class Collection<T, U> {
  public model: T[] = [];
  public events: Eventing = new Eventing();
  constructor(public rootUrl: string, public desearlizer: (data: U) => T) {}
  fetch() {
    axios
      .get(`${this.rootUrl}`)
      .then((response) => {
        const data = response.data;
        if (data) {
          data.map((user: U) => {
            this.model.push(this.desearlizer(user));
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
