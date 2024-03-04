import { useFetchApi } from "~/composables/use-fetch-api"

export default defineEventHandler(async (e) => {
  const { useGet } = useFetchApi(e)
  
  const params = getQuery(e)

  return useGet('/v1/pets', params);
})