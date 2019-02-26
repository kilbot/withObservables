// @flow
import { useEffect, useMemo, useState } from 'react'
import { Subject, Subscription } from 'rxjs'
import type { Observable } from 'rxjs/Observable'

export default function useObservable(
  observable: Observable,
  initial?: any,
  inputs?: any = [],
): any {
  const [state, setState] = useState(initial)
  const subject = useMemo(() => new Subject(), inputs)

  useEffect(() => {
    const subscription = new Subscription()
    subscription.add(subject)
    subscription.add(subject.pipe(() => observable).subscribe(value => setState(value)))
    return () => subscription.unsubscribe()
  }, [subject])

  return state
}
