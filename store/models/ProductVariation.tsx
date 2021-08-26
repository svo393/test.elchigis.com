import { createSlice } from '@reduxjs/toolkit'
import { parseQueryString } from 'lib/misc'
import { apiGet } from 'lib/storeHelpers'
import { attr, fk, Model, ModelType } from 'redux-orm'

class ProductVariation extends Model {
  static modelName = 'ProductVariation' as const

  static fields = {
    id: attr(),
    product_id: fk('Product', 'variations'),
    price: attr(),
    stock: attr(),
  }

  static slice = createSlice({
    name: 'ProductVariationSlice',
    initialState: undefined as any,
    reducers: {
      productVariationsCallReceived: (
        ProductVariation: ModelType<ProductVariation>,
        action
      ) => {
        ProductVariation.delete()
        return action.payload.map((x: any) =>
          ProductVariation.create(x)
        )
      },
      moreProductVariationsCallReceived: (
        ProductVariation: ModelType<ProductVariation>,
        action
      ) => action.payload.map((x: any) => ProductVariation.upsert(x)),
    },
  })
}

let { actions } = ProductVariation.slice

let getProductVariations = (
  queryId: string,
  params: Record<string, any> | null = null,
  filters: Record<string, any> | null = null,
  more = false,
  productId = ''
) =>
  apiGet({
    queryId: `${queryId}__ProductVariations${productId}`,
    url: `/ProductVariations${parseQueryString(params, filters)}`,
    name: 'getProductVariations',
    onSuccess: more
      ? actions.moreProductVariationsCallReceived.type
      : actions.productVariationsCallReceived.type,
  })

export default ProductVariation
export { getProductVariations }
