export default defineNuxtRouteMiddleware(async (to, from) => {
  const { refreshToken, isLoggedIn } = useAuth()
  refreshToken();
  
  if (isLoggedIn) {
    return navigateTo('/');
  }
})