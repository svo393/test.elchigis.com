import { createSlice } from '@reduxjs/toolkit'
import { parseQueryString } from 'lib/misc'
import { apiGet } from 'lib/storeHelpers'
import { attr, fk, Model, ModelType } from 'redux-orm'

class ProductVariationPropertyValue extends Model {
  static modelName = 'ProductVariationPropertyValue' as const

  static fields = {
    id: attr(),
    product_variation_id: attr(),
    product_variation_property_id: fk(
      'ProductVariationProperty',
      'values'
    ),
    value_string: attr(),
    value_int: attr(),
    value_float: attr(),
    product_variation_property_list_value_id: fk(
      'ProductVariationPropertyListValue',
      'values'
    ),
  }

  static slice = createSlice({
    name: 'ProductVariationPropertyValueSlice',
    initialState: undefined as any,
    reducers: {
      productVariationPropertyValuesCallReceived: (
        ProductVariationPropertyValue: ModelType<ProductVariationPropertyValue>,
        action
      ) =>
        action.payload.map((x: any) =>
          ProductVariationPropertyValue.upsert(x)
        ),
    },
  })
}

let { actions } = ProductVariationPropertyValue.slice

let getProductVariationPropertyValues = (
  queryId: string,
  params: Record<string, any> | null = null,
  filters: Record<string, any> | null = null
) =>
  apiGet({
    queryId,
    url: `/ProductVariationPropertyValues${parseQueryString(
      params,
      filters
    )}`,
    name: 'getProductVariationPropertyValues',
    onSuccess:
      actions.productVariationPropertyValuesCallReceived.type,
  })

export default ProductVariationPropertyValue
export { getProductVariationPropertyValues }
