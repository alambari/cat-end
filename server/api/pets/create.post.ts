import { useFetchApi } from "~/composables/use-fetch-api";

export default eventHandler(async (e) => {
  const { usePost } = useFetchApi(e);
  
  const params = await readBody(e)
  
  return usePost('/v1/pets', params);
})