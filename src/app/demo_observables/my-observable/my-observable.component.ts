import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-my-observable',
  templateUrl: './my-observable.component.html',
  styleUrls: ['./my-observable.component.scss']
})
export class MyObservableComponent implements OnInit {
  // Demo 1, Cold observable (The cold observable does not activate the producer until there is a subscriber.)
  obs =  new Observable((observer) => {
    console.log("Observable starts")
    observer.next("1")
    observer.next("2")
    observer.next("3")
    observer.next("4")
    observer.error()
    observer.next("5")
  })
  
  // Demo 2
  subject$ = new Subject();

  // Demo 3
  behSubject$ = new BehaviorSubject("0");

  // Demo 4
  repSubject$ = new ReplaySubject();

  // Demo 5
  asyncSubject$ = new AsyncSubject();


  constructor() { }

  ngOnInit() {
   
  }
  // Each time it create new instance each time unlike subject
  triggerObs() {
    this.obs.subscribe(data => {
      console.log(data);
    }, err => {
      console.log("Stream ends")
    })
  }

  triggerSub() {
    // Hot observable - starts emiting does not matter if 
    // there is subscriber or not (see in action if you replace the subscription and next method)
    this.subject$.subscribe(val => {
      console.log(val);
    });
    this.subject$.next("1");
    this.subject$.next("2");
    this.subject$.complete();

  }

  seeSubjectAsObserver() {
    this.subject$.subscribe(val => {
      console.log(val);
    });
    // The Subject here acts as a proxy between the observable & subscriber.
    this.obs.subscribe(this.subject$);
  }

  proveSubMulticas() {
    // More than one subscriber can subscribe to a subject. 
    // They will share the same instance of the observable. 
    // This means that all of them receive the same event when the 
    // subject emits it.

    // Multiple observers of an observable, on the other hand, 
    // will receive a separate instance of the observable.
    this.subject$.subscribe(val => {
      console.log("Sub1 " + val);
    });
    this.subject$.subscribe(val => {
      console.log("Sub2 " + val);
    });
 
    this.subject$.next(Math.floor(Math.random() * 200) + 1);
  }

  proveObsDoesotShareInstances() {
    let observable$ = new Observable<number>(subscriber => {
      subscriber.next(Math.floor(Math.random() * 200) + 1);
    });
    observable$.subscribe(val => {
      console.log("Obs1 :" + val);
    });
  
    observable$.subscribe(val => {
      console.log("Obs2 :" + val);
    });
  }

  triggerBehaviourSub() {
    // BehaviorSubject requires an initial value and stores 
    // the current value and emits it to the new subscribers.
    // Take a closer look to the value 2!
    this.behSubject$.subscribe(val => {
      console.log("Sub1 " + val);
    });
 
    this.behSubject$.next("1");
    this.behSubject$.next("2");
 
    this.behSubject$.subscribe(val => {
      console.log("sub2 " + val);
    });
 
    this.behSubject$.next("3");
    this.behSubject$.complete();
  }

  triggerReplaySubj() {
    // eplaySubject replays old values to new subscribers 
    // when they first subscribe.

  // The ReplaySubject will store every value it emits in a buffer. 
  // It will emit them to the new subscribers in the order it received them.
    this.repSubject$.next("1");
    this.repSubject$.next("2");
 
    this.repSubject$.subscribe(
      val => console.log("Sub1 " + val),
      err => console.error("Sub1 " + err),
      () => console.log("Sub1 Complete")
    );
 
    this.repSubject$.next("3");
    this.repSubject$.next("4");
 
    this.repSubject$.subscribe(val => {
      console.log("sub2 " + val);
    });
 
    this.repSubject$.next("5");
    this.repSubject$.complete();
 
    this.repSubject$.error("err");
    this.repSubject$.next("6");
 
    this.repSubject$.subscribe(
      val => {
        console.log("sub3 " + val);
      },
      err => console.error("sub3 " + err),
      () => console.log("Complete")
    );
  }

  triggerAsyncSubject() {
    // AsyncSubject only emits the latest value 
    // only when it completes. If it errors out then it will emit an error, 
    // but will not emit any values.
    this.asyncSubject$.next("1");
    this.asyncSubject$.next("2");
 
    this.asyncSubject$.subscribe(
      val => console.log("Sub1 " + val),
      err => console.error("Sub1 " + err),
      () => console.log("Sub1 Complete")
    );
 
    this.asyncSubject$.next("3");
    this.asyncSubject$.next("4");
 
    this.asyncSubject$.subscribe(val => {
      console.log("sub2 " + val);
    });
 
    this.asyncSubject$.next("5");
    this.asyncSubject$.complete();
 
    this.asyncSubject$.error("err");
 
    this.asyncSubject$.next("6");
 
    this.asyncSubject$.subscribe(
      val => console.log("Sub3 " + val),
      err => console.error("sub3 " + err),
      () => console.log("Sub3 Complete")
    );
  }


}
