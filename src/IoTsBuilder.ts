import { Type } from 'io-ts'
import { ThrowReporter } from 'io-ts/lib/ThrowReporter'

export type IIoTsBuilder<A> = { [k in keyof A]: (arg: A[k]) => IIoTsBuilder<A> } & {
  build(): A
}

export function IoTsBuilder<A>(t: Type<A>): IIoTsBuilder<A> {
  const builder = new Proxy(
    {},
    {
      get(target: any, prop, _) {
        if ('build' === prop) {
          return () => {
            ThrowReporter.report(t.decode(target))
            return target as A
          }
        }

        return (x: any): any => {
          target[prop] = x
          return builder
        }
      }
    }
  )

  return builder as IIoTsBuilder<A>
}
