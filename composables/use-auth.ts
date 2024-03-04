import { SESSION_KEY, TOKEN_KEY } from '~/utils/constants';

export const useAuth = () => {

  const session = useCookie<any>(SESSION_KEY);
  const token = useCookie(TOKEN_KEY);

  const setTokenSession = (accessToken: any) => {
    session.value = {
      accessToken: accessToken.access_token,
      expiresIn: Date.now() + accessToken.expires_in * 1000,
      user: accessToken.user,
    };
    token.value = accessToken.access_token;
  }

  const signIn = async (params: any) => {
    try {
      const { data } = await useFetch('/api/auth/login', {
        method: 'POST',
        body: {
          username: params.username,
          password: params.password
        }
      })

      setTokenSession(data.value)
    } catch(err) {
      throw err;
    }
  }

  const refreshToken = () => {
    const { expiresIn } = session.value || {};
    if (!expiresIn) {
      token.value = ''
    };

    if (expiresIn < Date.now()) {
      token.value = ''
    }
  }

  return {
    signIn,
    refreshToken,
    isLoggedIn: token.value ? true : false,
    accessToken: token.value,
    user: session.value?.user,
  }  
}