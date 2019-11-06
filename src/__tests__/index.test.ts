import afterEvent from '../index';
interface EventCallback {
  (e?: Event): void;
}
interface EventInfo {
  eventName: string;
  callback: EventCallback;
}
class EventTarget {
  eventList: EventInfo[];
  constructor() {
    this.eventList = [];
  }
  resetEventList() {
    this.eventList = [];
  }
  addEventListener(eventName: string, callback: EventCallback) {
    this.eventList.push({
      eventName: eventName,
      callback: callback
    });
  }
  removeEventListener(eventName: string, callback: EventCallback) {
    for (let i = 0; i < this.eventList.length; i++) {
      if (
        this.eventList[i].eventName == eventName &&
        this.eventList[i].callback == callback
      ) {
        this.eventList.splice(i, 1);
        break;
      }
    }
  }
  dispatchEvent(e: any) {
    this.eventList.forEach(
      event => event.eventName === e.type && event.callback()
    );
    return true;
  }
}
class Event {
  constructor(type: string) {
    return {
      type
    };
  }
}

const window = new EventTarget();
beforeEach(() => {
  window.resetEventList();
});

it('should accept the second parameter', () => {
  afterEvent('SOME_EVENT2', window);
  expect(window.eventList.length).toBe(1);
});

it('should cleanup if event has triggered', () => {
  afterEvent('SOME_EVENT3', window);
  expect(window.eventList.length).toBe(1);
  window.dispatchEvent(new Event('SOME_EVENT3'));
  expect(window.eventList.length).toBe(0);
});

it('should work fine when async usage', async () => {
  const e = new Event('SOME_EVENT4');
  expect(afterEvent('SOME_EVENT4', window)).resolves.toEqual(e);
  window.dispatchEvent(e);
});
