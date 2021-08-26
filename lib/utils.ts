/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/ban-types */

export function flow<A extends ReadonlyArray<unknown>, B>(
  ab: (...a: A) => B
): (...a: A) => B
export function flow<A extends ReadonlyArray<unknown>, B, C>(
  ab: (...a: A) => B,
  bc: (b: B) => C
): (...a: A) => C
export function flow<A extends ReadonlyArray<unknown>, B, C, D>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D
): (...a: A) => D
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E
): (...a: A) => E
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): (...a: A) => F
export function flow<
  A extends ReadonlyArray<unknown>,
  B,
  C,
  D,
  E,
  F,
  G
>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G
): (...a: A) => G
export function flow<
  A extends ReadonlyArray<unknown>,
  B,
  C,
  D,
  E,
  F,
  G,
  H
>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H
): (...a: A) => H
export function flow<
  A extends ReadonlyArray<unknown>,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I
>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I
): (...a: A) => I
export function flow<
  A extends ReadonlyArray<unknown>,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J
>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J
): (...a: A) => J
export function flow(
  ab: Function,
  bc?: Function,
  cd?: Function,
  de?: Function,
  ef?: Function,
  fg?: Function,
  gh?: Function,
  hi?: Function,
  ij?: Function
): unknown {
  switch (arguments.length) {
    case 1:
      return ab
    case 2:
      return function (this: unknown) {
        return bc!(ab.apply(this, arguments))
      }
    case 3:
      return function (this: unknown) {
        return cd!(bc!(ab.apply(this, arguments)))
      }
    case 4:
      return function (this: unknown) {
        return de!(cd!(bc!(ab.apply(this, arguments))))
      }
    case 5:
      return function (this: unknown) {
        return ef!(de!(cd!(bc!(ab.apply(this, arguments)))))
      }
    case 6:
      return function (this: unknown) {
        return fg!(ef!(de!(cd!(bc!(ab.apply(this, arguments))))))
      }
    case 7:
      return function (this: unknown) {
        return gh!(fg!(ef!(de!(cd!(bc!(ab.apply(this, arguments)))))))
      }
    case 8:
      return function (this: unknown) {
        return hi!(
          gh!(fg!(ef!(de!(cd!(bc!(ab.apply(this, arguments)))))))
        )
      }
    case 9:
      return function (this: unknown) {
        return ij!(
          hi!(gh!(fg!(ef!(de!(cd!(bc!(ab.apply(this, arguments))))))))
        )
      }
  }
  return
}

export function pipe<A>(a: A): A
export function pipe<A, B>(a: A, ab: (a: A) => B): B
export function pipe<A, B, C>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C
): C
export function pipe<A, B, C, D>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D
): D
export function pipe<A, B, C, D, E>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E
): E
export function pipe<A, B, C, D, E, F>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): F
export function pipe<A, B, C, D, E, F, G>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G
): G
export function pipe<A, B, C, D, E, F, G, H>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H
): H
export function pipe<A, B, C, D, E, F, G, H, I>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I
): I
export function pipe<A, B, C, D, E, F, G, H, I, J>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J
): J
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K
): K
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L
): L
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M
): M
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N
): N
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O
): O

export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P
): P

export function pipe<
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q
>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q
): Q

export function pipe<
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R
>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R
): R

export function pipe<
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R,
  S
>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R,
  rs: (r: R) => S
): S

export function pipe<
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R,
  S,
  T
>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R,
  rs: (r: R) => S,
  st: (s: S) => T
): T
export function pipe(
  a: unknown,
  ab?: Function,
  bc?: Function,
  cd?: Function,
  de?: Function,
  ef?: Function,
  fg?: Function,
  gh?: Function,
  hi?: Function,
  ij?: Function,
  jk?: Function,
  kl?: Function,
  lm?: Function,
  mn?: Function,
  no?: Function,
  op?: Function,
  pq?: Function,
  qr?: Function,
  rs?: Function,
  st?: Function
): unknown {
  switch (arguments.length) {
    case 1:
      return a
    case 2:
      return ab!(a)
    case 3:
      return bc!(ab!(a))
    case 4:
      return cd!(bc!(ab!(a)))
    case 5:
      return de!(cd!(bc!(ab!(a))))
    case 6:
      return ef!(de!(cd!(bc!(ab!(a)))))
    case 7:
      return fg!(ef!(de!(cd!(bc!(ab!(a))))))
    case 8:
      return gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))
    case 9:
      return hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a))))))))
    case 10:
      return ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))))
    case 11:
      return jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a))))))))))
    case 12:
      return kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))))))
    case 13:
      return lm!(
        kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))))))
      )
    case 14:
      return mn!(
        lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a))))))))))))
      )
    case 15:
      return no!(
        mn!(
          lm!(
            kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))))))
          )
        )
      )
    case 16:
      return op!(
        no!(
          mn!(
            lm!(
              kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))))))
            )
          )
        )
      )
    case 17:
      return pq!(
        op!(
          no!(
            mn!(
              lm!(
                kl!(
                  jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a))))))))))
                )
              )
            )
          )
        )
      )
    case 18:
      return qr!(
        pq!(
          op!(
            no!(
              mn!(
                lm!(
                  kl!(
                    jk!(
                      ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))))
                    )
                  )
                )
              )
            )
          )
        )
      )
    case 19:
      return rs!(
        qr!(
          pq!(
            op!(
              no!(
                mn!(
                  lm!(
                    kl!(
                      jk!(
                        ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))))
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    case 20:
      return st!(
        rs!(
          qr!(
            pq!(
              op!(
                no!(
                  mn!(
                    lm!(
                      kl!(
                        jk!(
                          ij!(
                            hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a))))))))
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
  }
  return
}

type Key = string | number | symbol
type Absent = undefined | null
export type Obj = Record<Key, unknown>
export type Pred = (...a: any) => boolean
export type NonEmptyArrayOf<T> = [T, ...T[]]
// type Function<A = any[], B = any> = (
//   ...args: A extends any[] ? A : [A]
// ) => B

export let not = (f: Function) =>
  function (this: unknown) {
    return !f.apply(this, arguments)
  }

export let isObject = (x: unknown): x is Obj =>
  Object.prototype.toString.call(x) === '[object Object]'

export let isNotObject = (x: unknown) => !isObject(x)

export let isString = (x: unknown): x is string =>
  typeof x === 'string' || x instanceof String

export let isNotString = (x: unknown) => !isString(x)

export let isEmptyString = (x: unknown): x is '' => x === ''

export let isNonEmptyString = (x: unknown): x is string =>
  isString(x) && x !== ''

export let isNumber = (x: unknown): x is number =>
  typeof x === 'number' && !Number.isNaN(x)

export let isNotNumber = (x: unknown) => !isNumber(x)

export let isPositiveNumber = (x: unknown): x is number =>
  isNumber(x) && x > 0

export let isNotPositiveNumber = (x: unknown) =>
  isNotNumber(x) || (isNumber(x) && x <= 0)

export let isBoolStr = (x: unknown): x is boolean =>
  isString(x) && ['true', 'false'].includes(x)

export let isAbsent = <T>(x: T | Absent): x is Absent =>
  x === undefined || x === null

export let isPresent = <T>(x: T | Absent): x is T => !isAbsent(x)

export let propIsPresent =
  <K extends Key>(k: K) =>
  <T extends { [P in K]?: V | Absent }, V>(
    x: T | Absent
  ): x is T & Record<K, V> =>
    isPresent(x) && isObject(x) && x[k] !== undefined && x[k] !== null

export let propIsAbsent =
  <K extends Key>(k: K) =>
  <T extends { [P in K]?: V | Absent }, V>(
    x: T | Absent
  ): x is (T | Absent) & Record<K, Absent> =>
    isAbsent(x) ||
    isNotObject(x) ||
    x[k] === undefined ||
    x[k] === null

export let isEmptyObj = (x: Obj | Absent) =>
  isObject(x) && Object.keys(x).length === 0
export let isNonEmptyObj = (x: Obj | Absent) =>
  isObject(x) && Object.keys(x).length > 0

/**
 * @example
 * type File =
 *   | { type: 'image'; imageURL: string }
 *   | { type: 'pdf'; pdfURL: string }
 *
 * let files: File[] = [
 *   { type: 'image', imageURL: 'https://...' },
 *   { type: 'pdf', pdfURL: 'https://...' },
 * ]
 *
 * let imageFiles = files.filter(
 *   inferPropEq('type', 'image' as const) // 'as const' is necessary
 * )
 *
 * imageFiles[0]?.type // TS knows that this is 'image'
 * imageFiles[0]?.imageURL // TS knows that 'imageURL' is present
 *
 */
export let inferPropEq =
  <K extends Key, V>(k: K, v: V) =>
  <T extends {}>(x: T): x is T & Record<K, V> =>
    (x as Obj)[k] === v

export let isIn =
  <T>(xs: unknown[]) =>
  (x: T) =>
    xs.includes(x)

export let isNotIn =
  <T>(xs: unknown[]) =>
  (x: T) =>
    !xs.includes(x)

export let propIsIn =
  <K extends Key, V, T extends Record<K, V>>(k: K, xs: V[]) =>
  (x: T) =>
    xs.includes(x[k])

export let propIsNotIn =
  <K extends Key, V, T extends Record<K, V>>(k: K, xs: V[]) =>
  (x: T) =>
    !xs.includes(x[k])

export let isEmptyArray = (x: unknown): x is [] =>
  Array.isArray(x) && x.length === 0
export let isNonEmptyArray = <T>(x: T[] | Absent): x is [T, ...T[]] =>
  Array.isArray(x) && x.length > 0

export let isNonEmptyArrayOfStrings = <T extends string>(
  x: T[] | Absent
): x is [T, ...T[]] =>
  Array.isArray(x) && x.length > 0 && x.every(isString)

export let isNonEmptyArrayOfPositiveNumbers = <T extends number>(
  x: T[] | Absent
): x is [T, ...T[]] =>
  Array.isArray(x) && x.length > 0 && x.every(isPositiveNumber)

export let lengthLt = <T>(y: number, xs: string | T[] | Absent) =>
  isPresent(xs) && xs.length < y
export let lengthLtP =
  (y: number) =>
  <T>(xs: string | T[] | Absent) =>
    isPresent(xs) && xs.length < y
export let lengthLte = <T>(y: number, xs: string | T[] | Absent) =>
  isPresent(xs) && xs.length <= y
export let lengthLteP =
  (y: number) =>
  <T>(xs: string | T[] | Absent) =>
    isPresent(xs) && xs.length <= y
export let lengthGt = <T>(y: number, xs: string | T[] | Absent) =>
  isPresent(xs) && xs.length > y
export let lengthGtP =
  (y: number) =>
  <T>(xs: string | T[] | Absent) =>
    isPresent(xs) && xs.length > y
export let lengthGte = <T>(y: number, xs: string | T[] | Absent) =>
  isPresent(xs) && xs.length >= y
export let lengthGteP =
  (y: number) =>
  <T>(xs: string | T[] | Absent) =>
    isPresent(xs) && xs.length >= y
export let lengthEq = <T>(y: number, xs: string | T[] | Absent) =>
  isPresent(xs) && xs.length === y
export let lengthEqP =
  (y: number) =>
  <T>(xs: string | T[] | Absent) =>
    isPresent(xs) && xs.length === y
export let lengthNotEq = <T>(y: number, xs: string | T[] | Absent) =>
  isPresent(xs) && xs.length !== y
export let lengthNotEqP =
  (y: number) =>
  <T>(xs: string | T[] | Absent) =>
    isPresent(xs) && xs.length !== y

export let map =
  <T, U>(f: (x: T) => U) =>
  (xs: T[]): U[] =>
    xs.map(f)

export let filter =
  <T>(f: (y: T, idx: number, ys: readonly T[]) => boolean) =>
  (xs: readonly T[]): T[] =>
    xs.filter(f)

export let filterType =
  <T, U extends T>(
    f: (y: T, idx: number, ys: readonly T[]) => y is U
  ) =>
  (xs: readonly T[]): U[] =>
    xs.filter(f)

export let rejectType =
  <T, U extends T>(
    f: (y: T, idx: number, ys: readonly T[]) => y is U
  ) =>
  (xs: T[]): readonly T[] =>
    xs.filter(not(f))

export let filterPropIn =
  <K extends Key, V, T extends Record<K, V>>(k: K, ys: V[]) =>
  <U extends T>(xs: U[]): U[] =>
    xs.filter(propIsIn(k, ys))

export let rejectPropIn =
  <K extends Key, V, T extends Record<K, V>>(k: K, ys: V[]) =>
  <U extends T>(xs: U[]): U[] =>
    xs.filter(propIsNotIn(k, ys))

export let toArray = <T>(x: T): T extends unknown[] ? T : T[] =>
  Array.isArray(x)
    ? (x as T extends unknown[] ? T : T[])
    : ([x] as T extends unknown[] ? T : T[])

export let toPascalCase = (x: string) =>
  x
    .split(/[^a-zA-Z0-9]+/)
    .map((y) => {
      let firstChar = y[0]
      return isPresent(firstChar)
        ? firstChar.toUpperCase() + y.slice(1)
        : ''
    })
    .join('')

export let capitalizeFirstLetter = (x = '') =>
  (x[0] ?? '').toUpperCase() + x.slice(1)

// export let addPropIf = <T>(f: Pred, k: Key, x: T | Absent) => ({
//   ...(f(x) ? { [k]: x as T } : {}),
// })

export let addPropIf = <T>(y: boolean, k: Key, x: T | Absent) => ({
  ...(y ? { [k]: x } : {}),
})

export let filterObj =
  (f: Pred) =>
  <T extends Obj>(x: T): T =>
    Object.entries(x)
      .filter(f)
      .reduce((acc, [k, v]) => {
        acc[k as keyof T] = v as any
        return acc
      }, {} as T)

// From ramda

export let deepEq = <T, U>(x: T, y: U) =>
  JSON.stringify(x) === JSON.stringify(y)

export let trim = (x: string) => x.trim()

export let concat = <T>(xs: T[], ys: T[]) => xs.concat(ys)

export let concatP =
  <T>(xs: T[]) =>
  (ys: T[]) =>
    xs.concat(ys)

export let always =
  <T>(x: T) =>
  () =>
    x

export let flatten = <T>(xs: T[]) => xs.flat(20)

export let assoc = <T, K extends Key, U extends Obj>(
  k: K,
  x: T,
  y: U = {} as any
): Omit<U, K> & Record<K, T> => ({ ...y, [k]: x })

export let assocP =
  <T, K extends Key>(k: K, x: T) =>
  <U extends Obj>(y: U = {} as any): Omit<U, K> & Record<K, T> => ({
    ...y,
    [k]: x,
  })

export let assocPath = <T, U extends Obj>(
  x: string,
  y: T,
  z: U | Absent
): U => {
  let f = (ks: any, _z: any): any => {
    let k = ks[0]
    let child = _z[ks[0]]
    return lengthGt(1, ks)
      ? { ..._z, [k]: f(ks.slice(1), isPresent(child) ? child : {}) }
      : { ..._z, [k]: y }
  }
  return f(x.split('.'), z)
}

export let upsert = <T, K extends Key, U extends Obj>(
  k: K,
  x: T,
  f: (_: T) => T,
  y: U = {} as any
) => (isPresent(y[k]) ? { ...y, [k]: f(y[k] as T) } : assoc(k, x, y))

export let upsertP =
  <T, K extends Key>(k: K, x: T, f: (_: T) => T) =>
  <U extends Obj>(y: U = {} as any) =>
    isPresent(y[k]) ? { ...y, [k]: f(y[k] as T) } : assoc(k, x, y)

export let dissoc = <K extends keyof T, T>(
  k: K,
  x: T = {} as any
) => {
  let { [k]: _, ...rest } = x
  return rest
}

export let omit = <K extends keyof T, T>(
  ks: K[],
  x: T = {} as any
): Omit<T, K> => {
  let _x = { ...x }

  for (let k of ks) {
    delete _x[k]
  }

  return _x
}

export let pick = <K extends keyof T, T>(
  ks: K[],
  x: T | Absent = {} as any
) => {
  let _x: Obj = {}
  ks.forEach((k) => (_x[k] = x![k]))

  return _x as Pick<T, K>
}

export let pickAsStrings = <T, K extends Key>(
  ks: K[],
  x: Record<K, T> | Absent = {} as any
) => {
  let _x: Obj = {}
  ks.forEach((k) => (_x[k] = isPresent(x![k]) ? `${x![k]}` : ''))

  return _x as Record<K, string>
}

export let pickP =
  <K extends keyof T, T>(ks: K[]) =>
  (x: T) => {
    let _x: Obj = {}
    ks.forEach((k) => (_x[k] = x[k]))

    return _x as Pick<T, K>
  }

export let pluck = <K extends keyof T, T>(k: K, xs: T[]) =>
  xs.map((x) => x[k])

export let pluckP =
  <K extends Key>(k: K) =>
  <T>(xs: Record<K, T>[]) =>
    xs.map((x) => x[k])

export let sum = (xs: number[]) =>
  xs.reduce((acc, cur) => acc + cur, 0)

export let prop =
  <K extends Key>(k: K) =>
  <T>(x: Record<K, T>) =>
    x[k]

export let toKeys = <T>(x: T) => Object.keys(x) as (keyof T)[]
export let toValues = <T>(x: Record<Key, T>) => Object.values(x)
export let toPairs = <T, K extends Key>(x: Record<K, T>) =>
  Object.entries(x) as [K, T][]

export let split = (y: string) => (x: string) => x.split(y)
export let join =
  <T>(y: string) =>
  (xs: T[]) =>
    xs.join(y)

export let identity = <T>(x: T) => x

export let toArrOfUniq = <T>(x: T[]): T[] =>
  [...new Set([...x.map((y) => JSON.stringify(y))])].map((y) =>
    JSON.parse(y)
  )

export let toLower = (x: string) => x.toLowerCase()

export let replace = (y: string | RegExp, z: string) => (x: string) =>
  x.replace(y, z)

export let merge = <T extends Obj, U extends Obj>(
  x: T = {} as any,
  y: U = {} as any
) => {
  toPairs(y).forEach(([k, v]) => {
    if (Object.prototype.hasOwnProperty.call(y, k)) {
      isObject(v)
        ? (x[k as keyof T] = merge((x[k as any] as any) ?? {}, v))
        : (x[k as keyof T] = v as any)
    }
  })

  return x as T & U
}

export let indexBy = <T, K extends string | number = string>(
  f: (y: T) => K,
  xs: T[]
) =>
  xs.reduce((acc, x) => {
    let k = f(x)
    acc[k] = x
    return acc
  }, {} as { [key in K]: T })

export let indexByP =
  <T, K extends string | number = string>(f: (y: T) => K) =>
  (xs: T[]) =>
    xs.reduce((acc, x) => {
      let k = f(x)
      acc[k] = x
      return acc
    }, {} as { [key in K]: T })

export let isOdd = (x: number) => x % 2 === 1
export let isEven = (x: number) => !isOdd(x)
