export class Attributes<T> {
  constructor(public attr: T) {}
  get = <K extends keyof T>(propertyName: K): T[K] => {
    return this.attr[propertyName];
  };
  set = (updatedData: T): void => {
    Object.assign(this.attr, updatedData);
  };
  getAll = (): T => {
    return this.attr;
  };
}
