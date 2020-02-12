const JoystickType = cc.Enum({
  FIXED: 0,
  FOLLOW: 1
});

enum SpeedType {
  STOP = 0,
  NORMAL = 1,
  FAST = 2,
};

enum JoystickEventType {
  TOUCH_START = 'touchStart',
  TOUCH_MOVE = 'touchMove',
  TOUCH_END = 'touchEnd',
  CHANGE_JOYSTICK_TYPE = 'changeJoystickType'
};

export { JoystickType, SpeedType, JoystickEventType };

