import { useFetchApi } from "~/composables/use-fetch-api"

export default defineEventHandler(async (e) => {
  const { useLogin } = useFetchApi(e)

  const params = await readBody(e);

  return useLogin('/v1/token', {
    username: params.username,
    password: params.password,  
  })
})