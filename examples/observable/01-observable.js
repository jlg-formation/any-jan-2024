import { Observable } from "rxjs";

const obs = new Observable((subscriber) => {
  subscriber.next(34);
  subscriber.next(false);
  subscriber.next("toto");
  const timer = setTimeout(() => {
    console.log("coucou");
    subscriber.next({
      tutu: 56,
    });
    subscriber.complete();
  }, 1000);

  return () => {
    console.log("aaah... je meurs!");
    clearTimeout(timer);
  };
});

const observer = {
  next: (x) => {
    console.log("x: ", x);
  },
  error: (err) => {
    console.log("err: ", err);
  },
  complete: () => {
    console.log("complete");
  },
};

const subscription = obs.subscribe(observer);

setTimeout(() => {
  subscription.unsubscribe();
}, 500);
