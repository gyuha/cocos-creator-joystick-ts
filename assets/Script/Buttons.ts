import { JoystickEvent } from './joystick/JoystickEvent';
import { JoystickEventType, JoystickType } from './joystick/JoystickEnum';
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

  onClickFixedType() {
    JoystickEvent.Instance(JoystickEvent).emit(
      JoystickEventType.CHANGE_JOYSTICK_TYPE,
      JoystickType.FIXED
    )
  }

  onClickFollowType() {
    JoystickEvent.Instance(JoystickEvent).emit(
      JoystickEventType.CHANGE_JOYSTICK_TYPE,
      JoystickType.FOLLOW
    )
  }

}
