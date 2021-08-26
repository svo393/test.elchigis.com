/* eslint-disable @typescript-eslint/ban-types */

import { ORDER_STATUSES } from 'config/constants'
import { NextComponentType, NextPage, NextPageContext } from 'next'
import { AppProps as NextAppProps } from 'next/app'

export type Page<P = {}> = NextPage<P> & {
  getLayout?: (component: JSX.Element) => JSX.Element
}

type ComponentType<
  C = NextPageContext,
  IP = {},
  P = {}
> = NextComponentType<C, IP, P>
export interface AppProps<P = {}> extends NextAppProps<P> {
  Component: ComponentType<NextPageContext, any, P> & Page
}

export type NamedFilterProps = {
  id: number
  name: string
  qty: number
}

export type FromInitialProps = {
  fetchedOnServer: true | undefined
  notFound?: boolean
  title?: string
}

/* Utils */

type Await<T> = T extends PromiseLike<infer U> ? U : T
export type PromiseReturnType<
  T extends (...args: any) => Promise<any>
> = Await<ReturnType<T>>

type IndexBy<T, K extends keyof T> = Record<typeof T[K], Omit<T, K>>
type RequiredNotNull<T> = {
  [P in keyof T]: NonNullable<T[P]>
}
export type Ensure<T, K extends keyof T> = T &
  RequiredNotNull<Pick<T, K>>

/* Store */

export type ApiCallInput = {
  queryId?: string
  cookies?: string
  url: string
  method?: string
  data?: any
  nonSerializableData?: any
  onStart?: string
  onStartData?: any
  onError?: string
  onErrorData?: any
  onSuccess?: string | string[]
  name?: string
  silentError?: boolean
  timeout?: number
  throttle?: number
}

export type Action = {
  payload?: any
  type: string
}

export type ErrorState = { message: string; queryId: string }
export type WatcherState = { status: string | null }

export type UIState = {
  watcher: WatcherState
  error: ErrorState
}

export type CursorState = { endCursor: number; hasNextPage: boolean }

export type APIState = {
  products: CursorState
}

export type CartItem = {
  variationId: number
  productId: number
  qty: number
  url: string
  features: Feature[]
  price: number
  name: string
}

export type CartState = {
  items: Record<
    CartItem['variationId'],
    Omit<CartItem, 'variationId'>
  >
}

export type OrderStatus = keyof typeof ORDER_STATUSES

export type OrderItem = {
  date: string
  id: string
  name: string
  phone: string
  time: string
  address: string
  cart: CartState['items']
  status: OrderStatus
}

export type OrderState = {
  items: Record<OrderItem['id'], Omit<OrderItem, 'id'>>
  meta: { newOrderId: string | undefined }
}

/* Models */

type Category = {
  id: number
  name: string
}

type Product = {
  id: number
  name: string
  category_id: Category['id']
  description: string
}

type ProductImage = {
  id: number
  image_name: string
  product_id: Product['id']
  image_url: string
}

type ProductVariation = {
  id: number
  product_id: Product['id']
  price: number
  stock: number
}

type ProductVariationProperty = {
  id: number
  name: string
  type: number
}

type ProductVariationPropertyListValue = {
  id: number
  product_variation_property_id: ProductVariationProperty['id']
  title: string
  value: string
}

type ProductVariationPropertyValue = {
  id: number
  product_variation_id: ProductVariation['id']
  product_variation_property_id: ProductVariationProperty['id']
  value_string: string | null
  value_int: number | null
  value_float: number | null
  product_variation_property_list_value_id:
    | ProductVariationPropertyListValue['id']
    | null
}

/* Store */

type StoreProduct = {
  id: number
  name: string
  category_id: number
  description: string
  variations?: ProductVariation[]
  images?: ProductImage[]
  category?: Category
}

type Feature = {
  name: string
  value: string
}

type Parameter = {
  name: string
  value: number | string
}

type FullProductVariation = {
  id: number
  product_id: Product['id']
  price: number
  stock: number
  parameters: Parameter[]
  features: Feature[]
}

type StoreFullProduct = {
  id: number
  name: string
  category_id: number
  description: string
  variations?: FullProductVariation[]
  images?: ProductImage[]
  category?: Category
}
