import { createReducer, ORM } from 'redux-orm'
import Category from './models/Category'
import Product from './models/Product'
import ProductImage from './models/ProductImage'
import ProductVariation from './models/ProductVariation'
import ProductVariationProperty from './models/ProductVariationProperty'
import ProductVariationPropertyValue from './models/ProductVariationPropertyValue'
import ProductVariationPropertyListValue from './models/ProductVariationPropertyListValue'

let orm = new ORM({
  stateSelector: (state) => state.orm,
})
orm.register(
  Category,
  Product,
  ProductImage,
  ProductVariation,
  ProductVariationProperty,
  ProductVariationPropertyListValue,
  ProductVariationPropertyValue
)

let ormReducer = createReducer(orm, function (session, action) {
  ;(session['sessionBoundModels'] as any).forEach(
    (modelClass: any) => {
      if (typeof modelClass.slice.reducer === 'function') {
        modelClass.slice.reducer(modelClass, action, session)
      }
    }
  )
})

export default ormReducer
export { orm }
