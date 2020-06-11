type callbackfn = () => void;
export class Eventing {
  events: {
    [key: string]: callbackfn;
  } = {};
  on = (eventName: string, handler: callbackfn): void => {
    const handlers = this.events[eventName];
    if (!handlers) {
      this.events[eventName] = handler;
    }
  };
  trigger = (eventName: string): void => {
    const handler = this.events[eventName];
    if (handler) {
      handler();
    }
  };
}
