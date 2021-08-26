import { createSlice } from '@reduxjs/toolkit'
import { apiGet } from 'lib/storeHelpers'
import { attr, Model, ModelType } from 'redux-orm'

class ProductVariationProperty extends Model {
  static modelName = 'ProductVariationProperty' as const

  static fields = {
    id: attr(),
    name: attr(),
    type: attr(),
  }

  static slice = createSlice({
    name: 'ProductVariationPropertySlice',
    initialState: undefined as any,
    reducers: {
      productVariationPropertiesCallReceived: (
        ProductVariationProperty: ModelType<ProductVariationProperty>,
        action
      ) =>
        action.payload.map((x: any) =>
          ProductVariationProperty.upsert(x)
        ),
    },
  })
}

let { actions } = ProductVariationProperty.slice

let getProductVariationProperties = (queryId: string) =>
  apiGet({
    queryId,
    url: '/ProductVariationProperties',
    name: 'getProductVariationProperties',
    onSuccess: actions.productVariationPropertiesCallReceived.type,
  })

export default ProductVariationProperty
export { getProductVariationProperties }
