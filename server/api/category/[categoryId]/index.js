import getCategory from "../../db/getCategory";

export default defineEventHandler(event => {
  return getCategory(event.context.params.categoryId)
})

