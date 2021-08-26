import { createSlice } from '@reduxjs/toolkit'
import { parseQueryString } from 'lib/misc'
import { apiGet } from 'lib/storeHelpers'
import { attr, fk, Model, ModelType } from 'redux-orm'

class Product extends Model {
  static modelName = 'Product' as const

  static fields = {
    id: attr(),
    name: attr(),
    category_id: fk('Category', 'products'),
    description: attr(),
  }

  static slice = createSlice({
    name: 'ProductSlice',
    initialState: undefined as any,
    reducers: {
      productsCallReceived: (Product: ModelType<Product>, action) => {
        Product.delete()
        return action.payload.map((x: any) => Product.create(x))
      },
      moreProductsCallReceived: (
        Product: ModelType<Product>,
        action
      ) => action.payload.map((x: any) => Product.upsert(x)),
      singleProductCallReceived: (
        Product: ModelType<Product>,
        action
      ) => {
        Product.delete()
        return Product.create(action.payload)
      },
    },
  })
}

let { actions } = Product.slice

let getProducts = (
  queryId: string,
  params: Record<string, any> | null = null,
  filters: Record<string, any> | null = null,
  more = false
) =>
  apiGet({
    queryId,
    url: `/Products${parseQueryString(params, filters)}`,
    name: more ? 'getMoreProducts' : 'getProducts',
    onSuccess: more
      ? actions.moreProductsCallReceived.type
      : actions.productsCallReceived.type,
  })

let getProduct = (queryId: string, productId: number) =>
  apiGet({
    queryId: `${queryId}__Product${productId}`,
    url: `/Products/${productId}`,
    name: 'getProduct',
    onSuccess: actions.singleProductCallReceived.type,
  })

export default Product
export { getProducts, getProduct }
