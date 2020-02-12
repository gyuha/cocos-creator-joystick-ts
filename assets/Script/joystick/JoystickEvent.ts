import { Singleton } from '../Singleton';
export class JoystickEvent extends Singleton<JoystickEvent> {
  event: cc.EventTarget = null;

  constructor() {
    super();
    if (this.event === null) {
      this.event = new cc.EventTarget();
    }
  }

  public on(eventType, callFunc: CallableFunction, target: object) {
    this.event.on(eventType, callFunc, target);
  }

  public off(eventType, callFunc: CallableFunction, target: object) {
    this.event.on(eventType, callFunc, target);
  }

  public emit(eventType, ...arg) {
    this.event.emit(eventType, ...arg);
  }
}
