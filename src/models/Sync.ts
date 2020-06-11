import axios, { AxiosPromise } from "axios";
interface HasId {
  id?: number;
}
export class Sync<T extends HasId> {
  constructor(protected db_url: string) {}
  save = (data: T): AxiosPromise => {
    const { id } = data;
    if (id) {
      return axios.put(`${this.db_url}/${id}`, data);
    } else {
      return axios.post(this.db_url, data);
    }
  };
  fetch = (id: number): AxiosPromise => {
    return axios.get(`${this.db_url}/${id}`);
  };
}
