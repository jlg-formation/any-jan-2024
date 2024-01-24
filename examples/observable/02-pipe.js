import { Observable, interval, startWith, map, take } from "rxjs";

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

// const obs = take(3)(map((x) => x + 1)(startWith(-1)(interval(1000))));

const obs = interval(1000).pipe(
  startWith(-1),
  map((x) => x + 1),
  take(3)
);

obs.subscribe(observer);
