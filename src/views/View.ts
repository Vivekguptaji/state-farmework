import { User } from "../models/User";
import { Model } from "../models/Model";
export abstract class View<T extends Model<U>, U> {
  constructor(public parentEl: HTMLElement, public model: T) {
    this.bindModelRender();
  }
  bindModelRender = () => {
    this.model.on("change", () => {
      this.render();
    });
  };
  formElement: { [keyName: string]: HTMLElement } = {};
  formEvents = (): { [keyName: string]: () => void } => {
    return {};
  };
  bindFormElement = (): { [keyName: string]: string } => {
    return {};
  };
  bindFormEvents = (fragement: DocumentFragment) => {
    const formevents = this.formEvents();
    for (let event in formevents) {
      const [bindEvent, selector] = event.split(":");
      const el = fragement.querySelector(selector);
      el.addEventListener(bindEvent, formevents[event]);
    }
  };
  abstract template(): string;
  mapFormElement = (fragement: DocumentFragment): void => {
    const formElements = this.bindFormElement();
    for (let formElement in formElements) {
      const el = fragement.querySelector(
        formElements[formElement]
      ) as HTMLElement;
      this.formElement[formElement] = el;
    }
  };
  formRender = (): void => {};
  render = (): void => {
    if (this.parentEl) {
      this.parentEl.innerHTML = "";
      const template = document.createElement("template");
      template.innerHTML = this.template();
      this.bindFormEvents(template.content);
      this.mapFormElement(template.content);
      this.formRender();
      this.parentEl.appendChild(template.content);
    }
  };
}
