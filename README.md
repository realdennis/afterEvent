# afterEvent

An one time usage for `await` after event trigger, in the other words, promisify the event handler!

## Usage

```javascript
// in some async function
import afterEvent from '@realdennis/afterEvent';

// thenable usage
afterEvent('load', document).then(() => {
  /*
   ** It would be called just one time,
   ** cause promise fulfilled is the final state, right?
   */
  // do something here
});

// or in await usage
async () => {
  await afterEvent('click'); // If you do not pass second parameter, default is window.
  console.log('window has been clicked!');
};
```

## Installation

```
$ npm install @realdennis/after-event
```

## Did afterEvent register clean the event listener?

Definitely Yes!
It remove self listener after event trigger, so the different usage will never conflict.

Example 1

```javascript
afterEvent('click').then(() => console.log(1));
afterEvent('click').then(() => console.log(2));
// click window
// 1
// 2
// click again
// nothing happen!
```

Example 2

```javascript
afterEvent('SOME_EVENT').then(() => console.log(1));
window.dispatchEvent(new Event('SOME_EVENT'));
// 1

afterEvent('SOME_EVENT').then(() => console.log(2));
window.dispatchEvent(new Event('SOME_EVENT'));
// 2
```

---

LICENSE MIT © 2019 realdennis
