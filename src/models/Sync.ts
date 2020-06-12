import axios, { AxiosPromise } from "axios";
interface HasId {
  id?: number;
}
export class Sync<T extends HasId> {
  constructor(public root_Url: string) {}
  save = (data: T): AxiosPromise => {
    const id = data["id"];
    if (id) {
      return axios.put(`${this.root_Url}/${id}`, data);
    } else {
      return axios.post(`${this.root_Url}`, data);
    }
  };
  fetch = (id: number): AxiosPromise => {
    return axios.get(`${this.root_Url}/${id}`);
  };
}
