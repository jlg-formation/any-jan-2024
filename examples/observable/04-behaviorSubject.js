import { BehaviorSubject } from "rxjs";

const observer = (name) => ({
  next: (x) => {
    console.log(`${name} x: `, x);
  },
  error: (err) => {
    console.log(`${name} err: `, err);
  },
  complete: () => {
    console.log(`${name} complete`);
  },
});

const subject = new BehaviorSubject(456);

subject.subscribe(observer("marc"));
subject.next(12);
const subscription = subject.subscribe(observer("stephane"));
subject.next(45);
subscription.unsubscribe();
subject.next(15);
