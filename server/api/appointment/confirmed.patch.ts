import { useFetchApi } from "~/composables/use-fetch-api"

export default defineEventHandler(async (e) => {
  const { usePatch } = useFetchApi(e)

  const params = await readBody(e)

  return usePatch(`/v1/appointments/${params.id}/set-status`, { status: 'confirmed' });
})