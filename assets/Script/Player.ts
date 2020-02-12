import { SpeedType, JoystickEventType } from './joystick/JoystickEnum';
import Joystick from './joystick/Joystick';
import { JoystickEvent } from './joystick/JoystickEvent';
import { iTouchMove } from './joystick/Joystick';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

  @property({ type: cc.Vec2 })
  moveDir: cc.Vec2 = cc.v2(0, 1);

  @property({ type: cc.Integer })
  stopSpeed: number = 0;

  @property({ type: cc.Integer })
  normalSpeed: number = 100;

  @property({ type: cc.Integer })
  fastSpeed: number = 200;

  speedType = SpeedType.STOP;
  moveSpeed: number = 0;

  joystickEvent: JoystickEvent;

  constructor() {
    super();
    this.joystickEvent = JoystickEvent.Instance(JoystickEvent);
  }

  onLoad() {
    this.joystickEvent.on(JoystickEventType.TOUCH_START, this.onTouchStart, this);
    this.joystickEvent.on(JoystickEventType.TOUCH_MOVE, this.onTouchMove, this);
    this.joystickEvent.on(JoystickEventType.TOUCH_END, this.onTouchEnd, this);
  }

  onTouchStart() {
    return;
  }

  onTouchMove(event, data: iTouchMove) {
    this.speedType = data.speedType;
    this.moveDir = data.moveDistance;
  }

  onTouchEnd(event, data: iTouchMove) {
    this.speedType = data.speedType;
  }


  // start() { }

  move() {
    this.node.angle = cc.misc.radiansToDegrees(
      Math.atan2(this.moveDir.y, this.moveDir.x)
    ) - 90;
    const newPos = this.node.position.add(this.moveDir.mul(this.moveSpeed / 120));
    this.node.setPosition(newPos);
  }

  update(dt) {
    switch (this.speedType) {
      case SpeedType.STOP:
        this.moveSpeed = this.stopSpeed;
        break;
      case SpeedType.NORMAL:
        this.moveSpeed = this.normalSpeed;
        break;
      case SpeedType.FAST:
        this.moveSpeed = this.fastSpeed;
        break;
      default:
        break;
    }
    this.move()
  }
}
