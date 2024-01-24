const { Observable } = require("rxjs");

const obs = new Observable((subscriber) => {
  subscriber.next(34);
  subscriber.next(false);
  subscriber.next("toto");
  setTimeout(() => {
    subscriber.next({
      tutu: 56,
    });
    subscriber.complete();
  }, 1000);
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

obs.subscribe(observer);
