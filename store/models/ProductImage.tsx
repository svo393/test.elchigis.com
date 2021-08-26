import { createSlice } from '@reduxjs/toolkit'
import { parseQueryString } from 'lib/misc'
import { apiGet } from 'lib/storeHelpers'
import { attr, fk, Model, ModelType } from 'redux-orm'

class ProductImage extends Model {
  static modelName = 'ProductImage' as const

  static fields = {
    id: attr(),
    product_id: fk('Product', 'images'),
    image_url: attr(),
  }

  static slice = createSlice({
    name: 'ProductImageSlice',
    initialState: undefined as any,
    reducers: {
      productImagesCallReceived: (
        ProductImage: ModelType<ProductImage>,
        action
      ) => {
        ProductImage.delete()
        return action.payload.map((x: any) => ProductImage.create(x))
      },
      moreProductImagesCallReceived: (
        ProductImage: ModelType<ProductImage>,
        action
      ) => action.payload.map((x: any) => ProductImage.upsert(x)),
    },
  })
}

let { actions } = ProductImage.slice

let getProductImages = (
  queryId: string,
  params: Record<string, any> | null = null,
  filters: Record<string, any> | null = null,
  more = false
) =>
  apiGet({
    queryId,
    url: `/ProductImages${parseQueryString(params, filters)}`,
    name: 'getProductImages',
    onSuccess: more
      ? actions.moreProductImagesCallReceived.type
      : actions.productImagesCallReceived.type,
  })

export default ProductImage
export { getProductImages }
