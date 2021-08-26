import { createSlice } from '@reduxjs/toolkit'
import { apiGet } from 'lib/storeHelpers'
import { attr, fk, Model, ModelType } from 'redux-orm'

class ProductVariationPropertyListValue extends Model {
  static modelName = 'ProductVariationPropertyListValue' as const

  static fields = {
    id: attr(),
    product_variation_property_id: fk(
      'ProductVariationProperty',
      'listValues'
    ),
    title: attr(),
    value: attr(),
  }

  static slice = createSlice({
    name: 'ProductVariationPropertyListValueSlice',
    initialState: undefined as any,
    reducers: {
      productVariationPropertyListValuesCallReceived: (
        ProductVariationPropertyListValue: ModelType<ProductVariationPropertyListValue>,
        action
      ) =>
        action.payload.map((x: any) =>
          ProductVariationPropertyListValue.upsert(x)
        ),
    },
  })
}

let { actions } = ProductVariationPropertyListValue.slice

let getProductVariationPropertyListValues = (queryId: string) =>
  apiGet({
    queryId,
    url: '/ProductVariationPropertyListValues',
    name: 'getProductVariationPropertyListValues',
    onSuccess:
      actions.productVariationPropertyListValuesCallReceived.type,
  })

export default ProductVariationPropertyListValue
export { getProductVariationPropertyListValues }
