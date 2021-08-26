import { createSlice } from '@reduxjs/toolkit'
import { parseQueryString } from 'lib/misc'
import { apiGet } from 'lib/storeHelpers'
import { attr, Model, ModelType } from 'redux-orm'

class Category extends Model {
  static modelName = 'Category' as const

  static fields = {
    id: attr(),
    name: attr(),
  }

  static slice = createSlice({
    name: 'CategorySlice',
    initialState: undefined as any,
    reducers: {
      categoriesCallReceived: (
        Category: ModelType<Category>,
        action
      ) => {
        Category.delete()
        return action.payload.map((x: any) => Category.create(x))
      },
      singleCategoryCallReceived: (
        Category: ModelType<Category>,
        action
      ) => Category.upsert(action.payload),
    },
  })
}

let { actions } = Category.slice

let getCategories = (
  queryId: string,
  params: Record<string, any> | null = null,
  filters: Record<string, any> | null = null
) =>
  apiGet({
    queryId,
    url: `/Categories${parseQueryString(params, filters)}`,
    name: 'getCategories',
    onSuccess: actions.categoriesCallReceived.type,
  })

let getCategory = (queryId: string, categoryId: number) =>
  apiGet({
    queryId,
    url: `/Categories/${categoryId}`,
    name: 'getCategory',
    onSuccess: actions.singleCategoryCallReceived.type,
  })

export default Category
export { getCategory, getCategories }
