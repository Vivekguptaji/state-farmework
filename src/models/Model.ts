import { AxiosPromise } from "axios";
import { Attributes } from "./Attributes";

interface Attributes_Model<T> {
  get<K extends keyof T>(propertyName: K): T[K];
  set(updatedData: T): void;
  getAll(): T;
}
interface Eventing_Model {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface Sync_Model<T> {
  save(data: T): AxiosPromise;
  fetch(id: number): AxiosPromise;
}

interface HasId {
  id?: number;
}
export class Model<T extends HasId> {
  constructor(
    public attributes: Attributes_Model<T>,
    public sync: Sync_Model<T>,
    public events: Eventing_Model
  ) {}
  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }
  get get() {
    return this.attributes.get;
  }
  set(updatedData: T) {
    this.attributes.set(updatedData);
    this.events.trigger("change");
  }
  save = (): void => {
    const data = this.attributes.getAll();
    this.sync.save(data).then((response) => {
      this.attributes.set(response.data);
      this.events.trigger("change");
    });
  };
  fetch = (): void => {
    const data = this.attributes.getAll();
    const { id } = data;
    this.sync.fetch(id).then((response) => {
      this.attributes.set(response.data);
      this.events.trigger("change");
    });
  };
}
