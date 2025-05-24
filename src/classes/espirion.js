import EventEmitter from "./event-emitter.js";

// @singleton
// @event themechange
// @event iconschange
// @event localeschange
// @event configchange
// @event accentcolorchange
export default new class Espirion extends EventEmitter { }
