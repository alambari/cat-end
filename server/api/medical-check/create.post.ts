import { omit } from 'underscore';
import { useFetchApi } from "~/composables/use-fetch-api"

export default defineEventHandler(async (e) => {
  const { usePost } = useFetchApi(e)

  const params = await readBody(e)

  return usePost(`/v1/medicals`, {
    appointmentId: params.id,
    ...omit(params, ['id'])
  });
})