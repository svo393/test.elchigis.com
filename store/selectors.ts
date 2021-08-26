// @ts-nocheck
import {
  Category,
  ProductVariation,
  StoreFullProduct,
  StoreProduct,
} from '@types'
import { isPresent, lengthEq, pluck, propIsIn } from 'lib/utils'
import { createSelector } from 'redux-orm'
import { orm } from './ormReducer'

export let categories: (...args: any) => Category | Category[] =
  createSelector(orm.Category)

export let productVariationIds: (...args: any) => number[] =
  createSelector(orm.Product.variations.map(orm.ProductVariation.id))

export let productsWithoutImages: (...args: any) => number[] =
  createSelector(orm, (session) =>
    pluck(
      'id',
      session['Product']
        ?.all()
        .toModelArray()
        .map((product) => ({
          ...product?.ref,
          images: product.images.toRefArray(),
        }))
        .filter((x) => lengthEq(0, x.images))
    )
  )

export let productsWithoutVariations: (...args: any) => number[] =
  createSelector(orm, (session) =>
    pluck(
      'id',
      session['Product']
        ?.all()
        .toModelArray()
        .map((product) => ({
          ...product?.ref,
          variations: product.variations.toRefArray(),
        }))
        .filter((x) => lengthEq(0, x.variations))
    )
  )

export let products: (...args: any) => StoreProduct[] =
  createSelector(orm, (session) =>
    session['Product']
      ?.all()
      .toModelArray()
      .map((product) => ({
        ...product?.ref,
        variations: product.variations.toRefArray(),
        images: product.images.toRefArray(),
        category: session['Category']?.get(
          (x) => x.id === product?.ref.category_id
        )?.ref,
      }))
  )

export let fullProducts: (...args: any) => StoreFullProduct[] =
  createSelector(orm, (session) =>
    session['Product']
      ?.all()
      .toModelArray()
      .map((product) => {
        let productVariationProperties = session[
          'ProductVariationProperty'
        ]
          ?.all()
          .toRefArray()

        let productVariationPropertyListValues = session[
          'ProductVariationPropertyListValue'
        ]
          ?.all()
          .toRefArray()

        return {
          ...product?.ref,
          variations: product.variations.toRefArray().map((x) => {
            let productVariationPropertyValues = session[
              'ProductVariationPropertyValue'
            ]
              ?.all()
              .toRefArray()
              .filter((y) => y.product_variation_id === x.id)

            return {
              ...x,
              parameters: productVariationPropertyValues
                .map((y) => ({
                  name: productVariationProperties.find(
                    (z) => z.id === y.product_variation_property_id
                  )?.name,
                  value:
                    y.value_string ?? y.value_int ?? y.value_float,
                }))
                .filter(
                  (y) => isPresent(y.name) && isPresent(y.value)
                ),
              features: productVariationPropertyValues
                .map((y) => ({
                  name: productVariationProperties.find(
                    (z) => z.id === y.product_variation_property_id
                  )?.name,
                  value: productVariationPropertyListValues.find(
                    (z) =>
                      z.id ===
                      y.product_variation_property_list_value_id
                  )?.title,
                }))
                .filter(
                  (y) => isPresent(y.name) && isPresent(y.value)
                ),
            }
          }),
          images: product.images.toRefArray(),
          category: session['Category']?.get(
            (x) => x.id === product?.ref.category_id
          )?.ref,
        }
      })
  )
