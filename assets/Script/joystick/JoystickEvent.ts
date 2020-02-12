import { Singleton } from '../Singleton';
import Joystick from './Joystick';
import { JoystickEventType } from './JoystickEnum';
export class JoystickEvent extends Singleton<JoystickEvent> {
  event: cc.EventTarget = null;

  constructor() {
    super();
    if (this.event === null) {
      this.event = new cc.EventTarget();
    }
  }

  public on(eventType: JoystickEventType, callFunc: CallableFunction, target: object) {
    this.event.on(eventType, callFunc, target);
  }

  public off(eventType: JoystickEventType, callFunc: CallableFunction, target: object) {
    this.event.on(eventType, callFunc, target);
  }

  public emit(eventType: JoystickEventType, ...arg) {
    this.event.emit(eventType, ...arg);
  }
}
