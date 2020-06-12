export class Attributes<T> {
  constructor(public data: T) {}
  get = <K extends keyof T>(propertyName: K): T[K] => {
    return this.data[propertyName];
  };
  set = (updatedData: T): void => {
    Object.assign(this.data, updatedData);
  };
  getAll = (): T => {
    return this.data;
  };
}
