import { createSelector } from 'reselect'

//这个在选
const selectCategoryReducer = (state) => state.categories

// select memo
export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) =>
        categories.reduce((acc, category) => {
            const { title, items } = category
            acc[title.toLowerCase()] = items
            return acc
    }, {})
)  