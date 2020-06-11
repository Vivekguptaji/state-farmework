import { User } from "../models/User";
import { Model } from "../models/Model";

export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: HTMLElement } = {};
  constructor(public parentEl: HTMLElement, public model: T) {
    this.bindRender();
  }
  bindRender() {
    this.model.on("change", () => {
      console.log("user data has been changed");
      this.render();
    });
  }
  abstract template(): string;
  mapRegions = () => {
    return {};
  };
  mapEvents = (): { [keyName: string]: () => void } => {
    return {};
  };
  bindRegions(fragement: DocumentFragment) {
    const regions = this.mapRegions();
    for (let key in regions) {
      const selector = regions[key];
      const el = fragement.querySelector(selector);
      if (el) {
        this.regions[key] = el;
      }
    }
  }
  onRender(): void {}
  bindEvents(fragement: DocumentFragment) {
    const events = this.mapEvents();
    const keys = Object.keys(events);
    for (let key of keys) {
      const handler = events[key];
      const [event, selector] = key.split(":");
      const el = fragement.querySelector(selector);
      el.addEventListener(event, handler);
    }
  }
  render() {
    this.parentEl.innerHTML = "";
    const template = document.createElement("template");
    template.innerHTML = this.template();
    this.bindEvents(template.content);
    this.bindRegions(template.content);
    this.onRender();
    this.parentEl.appendChild(template.content);
  }
}
