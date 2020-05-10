import { useEffect, useState } from 'react';
import { ObservableI } from './observable';

export function useObservable<T>(observable: ObservableI<T>): T {
    const [val, setVal] = useState(observable.get());

    useEffect(() => {
        return observable.subscribe(setVal);
    }, [observable]);

    return val;
}