import { omit } from 'underscore';
import { useFetchApi } from "~/composables/use-fetch-api"

export default defineEventHandler(async (e) => {
  const { usePut } = useFetchApi(e)

  const params = await readBody(e)

  return usePut(`/v1/doctors/${params.id}`, omit(params, ['id']));
})