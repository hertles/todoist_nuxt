import getProduct from "../../../db/getProduct";

export default defineEventHandler(event => {
  return getProduct(event.context.params.categoryId,event.context.params.productId)
})

