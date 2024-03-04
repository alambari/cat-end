// import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { refreshToken, isLoggedIn } = useAuth()
  refreshToken()

  if (!['/login', '/forgot-password', '/reset-password'].includes(to.path)) {
    if(!isLoggedIn) {
      return navigateTo('/login')
    }
  }
})