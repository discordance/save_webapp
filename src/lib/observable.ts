type Listener<T> = (val: T) => void;
type Unsubscriber = () => void;

export interface ObservableI<T> {
  get(): T;
  set(val: T): void;
  subscribe(listener: Listener<T>): Unsubscriber;
}

// used for any generic observable
export class Observable<T> implements ObservableI<T>{
  private _listeners: Listener<T>[];

  constructor(private _val: T) {
    // init
    this._listeners = [];
  }

  get(): T {
    return this._val;
  }

  set(val: T): void {
    if (this._val !== val) {
      this._val = val;
      this._listeners.forEach(l => l(val));
    }  
  }

  subscribe(listener: Listener<T>): Unsubscriber {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter(l => l !== listener);
    };
  }
}