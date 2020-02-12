import { JoystickEventType, JoystickType, SpeedType } from './JoystickEnum';
import { JoystickEvent } from './JoystickEvent';

const { ccclass, property } = cc._decorator;

export interface iTouchMove {
  speedType: number;
  moveDistance: cc.Vec2;
}

@ccclass
export default class Joystick extends cc.Component {
  @property(cc.Node)
  dot: cc.Node = null;

  @property(cc.Node)
  ring: cc.Node = null;

  @property({ type: JoystickType })
  joystickType = JoystickType.FIXED;

  stickPos: cc.Vec2 = null;
  touchLocation: cc.Vec2 = null;
  radius: number = 0;
  joystickEvent: JoystickEvent;

  constructor() {
    super();
    this.joystickEvent = JoystickEvent.Instance(JoystickEvent);
  }

  onLoad() {
    this.radius = this.ring.width / 2;
    this.initTouchEvent();
    if (this.joystickType === JoystickType.FOLLOW) {
      this.node.opacity = 0;
    }
  }

  initTouchEvent() {
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStartEvent, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveEvent, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEndEvent, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEndEvent, this);
  }

  onEnable() {
    this.joystickEvent.on(
      JoystickEventType.CHANGE_JOYSTICK_TYPE,
      this.onChangeJoystickType,
      this
    );
  }

  onDisable() {
    this.joystickEvent.off(
      JoystickEventType.CHANGE_JOYSTICK_TYPE,
      this.onChangeJoystickType,
      this
    );
  }

  onTouchStartEvent(event: cc.Event.EventTouch) {
    this.joystickEvent.emit(
      JoystickEventType.TOUCH_START,
      'joystick touch start',
      10
    );
    const touchPos = this.node.convertToNodeSpaceAR(event.getLocation());

    if (this.joystickType === JoystickType.FIXED) {
      this.stickPos = this.ring.getPosition();
      const distance = touchPos.sub(this.ring.getPosition()).mag();
      // this.radius > distance && this.dot.setPosition(touchPos);
      this.dot.setPosition(touchPos);
      return;
    }
    // JoystickType.FLLOW
    this.stickPos = touchPos;
    this.node.opacity = 255;
    this.touchLocation = event.getLocation();

    // 스틱 위치를 ​​변경
    this.ring.setPosition(touchPos);
    this.dot.setPosition(touchPos);
  }

  onTouchMoveEvent(event: cc.Event.EventTouch) {
    // 터치 시작 위치와 같은 터치 이동, 이동 금지하는 경우
    if (
      this.joystickType === JoystickType.FOLLOW &&
      this.touchLocation === event.getLocation()
    ) {
      return false;
    }
    // 터치 좌표를 고정하는 원을 얻으려면
    const touchPos: cc.Vec2 = this.ring.convertToNodeSpaceAR(
      event.getLocation()
    );
    const distance: number = touchPos.mag();

    // 위치보다 로컬 기준점의 부모 노드이기 때문에, 터치 개시 위치의 위치를 ​​추가
    const pos: cc.Vec2 = cc.v2(
      this.stickPos.x + touchPos.x,
      this.stickPos.y + touchPos.y
    );

    // 정규화
    const p = pos.sub(this.ring.getPosition()).normalize();

    let speedType;

    if (this.radius > distance) {
      this.dot.setPosition(pos);

      speedType = SpeedType.NORMAL;
    } else {
      // 제어봉은 항상 원을 유지하고, 원 터치 업데이트의 각도를 따라
      this.dot.setPosition(
        cc.v2(
          this.stickPos.x + p.x * this.radius,
          this.stickPos.y + p.y * this.radius
        )
      );
      speedType = SpeedType.FAST;
    }

    this.joystickEvent.emit(JoystickEventType.TOUCH_MOVE, event, {
      speedType,
      moveDistance: p
    } as iTouchMove);
  }

  onTouchEndEvent(event: cc.Event.EventTouch) {
    this.dot.setPosition(this.ring.getPosition());
    if (this.joystickType === JoystickType.FOLLOW) {
      this.node.opacity = 0;
    }

    this.joystickEvent.emit(JoystickEventType.TOUCH_END, event, {
      speedType: SpeedType.STOP,
      moveDistance: cc.v2(0, 0)
    } as iTouchMove)
  }

  start() {
    return;
  }

  public onChangeJoystickType(type): void {
    this.joystickType = type;
    this.node.opacity = type === JoystickType.FIXED ? 255 : 0;
  }

  // update (dt) {}
}
