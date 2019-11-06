const afterEvent = (eName: string, eTarget: EventTarget = window) =>
  new Promise(resolve => {
    const callback = (e: Event) => {
      eTarget.removeEventListener(eName, callback);
      resolve(e);
    };
    eTarget.addEventListener(eName, callback);
  });

export default afterEvent;
