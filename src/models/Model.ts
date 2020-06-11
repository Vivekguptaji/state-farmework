import { AxiosPromise } from "axios";

interface Attributes_Model<T> {
  get<K extends keyof T>(propertyName: K): T[K];
  set(updatedData: T): void;
  getAll(): T;
}
interface Eventing_Model {
  on(eventName: string, handler: () => void): void;
  trigger(eventName: string): void;
}
interface Sync_Model<T> {
  save(data: T): AxiosPromise;
  fetch(id: number): AxiosPromise;
}
interface HasID {
  id?: number;
}
export class Model<T extends HasID> {
  constructor(
    private attributes: Attributes_Model<T>,
    private sync: Sync_Model<T>,
    private events: Eventing_Model
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
  set(data: T) {
    this.attributes.set(data);
    this.events.trigger("change");
  }
  fetch() {
    const id = this.attributes.get("id");
    if (!id) {
      console.log("No id found for this record");
      return;
    }
    this.sync.fetch(+id).then((res) => {
      this.set(res.data);
      this.trigger("change");
    });
  }
  save() {
    const data = this.attributes.getAll();
    this.sync.save(data).then((res) => {
      this.trigger("change");
    });
  }
}
