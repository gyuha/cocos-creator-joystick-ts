const JoystickType = cc.Enum({
  FIXED: 0,
  FOLLOW: 1
});

const SpeedType = cc.Enum({
  STOP: 0,
  NORMAL: 1,
  FAST: 2
});

const JoystickEventType = cc.Enum({
  TOUCH_START: "touchStart",
  TOUCH_MOVE: "touchMove",
  TOUCH_END: "touchEnd",
  CHANGE_JOYSTICK_TYPE: "changeJoystickType"
});

export { JoystickType, SpeedType, JoystickEventType };
