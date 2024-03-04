<template>
  <div class="sign-in flex h-full">
    <a-row type="flex" justify="space-around" :align="'middle'" class="w-full">
      <a-col :span="24" :md="12" :lg="{ span: 12, offset: 0 }" :xl="{ span: 7, offset: 1 }" class="col-form">
        <h1>Sign In</h1>
        <h5 class="font-regular text-muted">Enter your email and password to sign in</h5>
        <a-form layout="vertical" :model="formLogin" @finish="onFinish" @finish-failed="onFinishFailed" :hideRequiredMark="true">
          <a-form-item label="Username" name="username" :colon="false" :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-input v-model:value="formLogin.username" placeholder="Username or Phone Number" />
          </a-form-item>
          <a-form-item label="Password" name="password" :colon="false" :rules="[{ required: true, message: 'Please input your password!' }]">
            <a-input-password v-model:value="formLogin.password" placeholder="********"></a-input-password>
          </a-form-item>
          <a-form-item name="remember">
            <a-switch v-model:checked="formLogin.remember"/>&nbsp; Remember Me
          </a-form-item>
          <a-form-item>
            <a-button type="primary" block html-type="submit" :loading="isLoading">
              SIGN IN
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="24" :md="12" :lg="12" :xl="12" class="col-img">
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
    layout: 'custom',
    middleware: ['guest']
  })

  const { signIn } = useAuth()

  const isLoading = ref<boolean>(false)
  const formLogin = reactive({
    username: '',
    password: '',
    remember: false
  })

  const onFinishFailed = (e: any) => {
    if(e.errorFields.length > 0) return;
  }

  const onFinish = async (e: any) => {
    try {
      isLoading.value = true
      await signIn({
        username: e.username,
        password: e.password
      })
      isLoading.value = false
      navigateTo('/')
    } catch(err) {
      isLoading.value = false
      notification.error({
        message: 'Gagal',
        description: 'Ada kesalahan pada saat input, periksa kembali inputan anda.'
      });
    }
  }
</script>

<style lang="scss">
	body {
		background-color: #ffffff;
	}
</style>