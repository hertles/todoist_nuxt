import getAllCategories from "../../../db/getAllCategories";

export default defineEventHandler(event => {
  return getAllCategories()
})

