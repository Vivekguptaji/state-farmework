export class Eventing {
  events: { [keyName: string]: () => void } = {};
  on = (eventName: string, callback: () => void): void => {
    const handler = this.events[eventName];
    if (!handler) {
      this.events[eventName] = callback;
    }
  };
  trigger = (eventName: string): void => {
    const handler = this.events[eventName];
    if (handler) {
      handler();
    }
  };
}
