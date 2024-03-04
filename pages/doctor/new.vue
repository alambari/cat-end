<template>
  <a-row justify="center">
    <a-col :span="24" :xl="16" class="mb-24">
      <a-form name="nest-messages" :model="state" @finish="onFinish" @finish-failed="onFinishFailed"
        :hideRequiredMark="true" :labelCol="{ xl: 6 }" :wrapperCol="{ xl: 24 }" layout="vertical">
        <a-card :bordered="false" class="header-solid h-full">
          <a-form-item name="name" label="Nama" :rules="[{ required: true }]">
            <a-input v-model:value="state.name" />
          </a-form-item>
          <a-form-item name="specialist" label="Spesialis">
            <a-input v-model:value="state.specialist" />
          </a-form-item>
          <a-form-item :name="['additional', 'identityNumber']" label="No. KTP">
            <a-input v-model:value="state.additional.identityNumber" :max-length="20" />
          </a-form-item>
          <a-form-item name="gender" label="Jenis Kelamin">
            <a-radio-group v-model:value="state.gender" class="radio-group-vertical">
              <a-radio value="male">Laki-Laki</a-radio>
              <a-radio value="female">Perempuan</a-radio>
              <a-radio value="other">Lainnya</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-row :gutter="[12, 12]">
            <a-col :span="24" :xl="12">
              <a-form-item name="birthplace" label="Tempat Lahir"
                :rules="[{ required: true, message: 'Tempat lahir harus diisi' }]">
                <a-input v-model:value="state.birthplace" />
              </a-form-item>
            </a-col>
            <a-col :span="24" :xl="12">
              <a-form-item name="birthday" label="Tanggal Lahir"
                :rules="[{ required: true, message: 'Tanggal lahir harus diisi' }]">
                <a-date-picker v-model:value="state.birthday" value-format="YYYY-MM-DD" class="w-250" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="[12, 12]">
            <a-col :span="24" :xl="12">
              <a-form-item name="phone" label="No. Handphone"
                :rules="[{ required: true, message: 'No Tlp harus diisi' }]">
                <a-input v-model:value="state.phone" :max-length="20" />
              </a-form-item>
            </a-col>
            <a-col :span="24" :xl="12">
              <a-form-item name="email" label="Email" :rules="[{ type: 'email' }]">
                <a-input v-model:value="state.email" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item name="address" label="Alamat" :rules="[{ required: true, message: 'Alamat harus diisi' }]">
            <a-textarea v-model:value="state.address" placeholder="Jl. Merdekan No. 45" :maxlength="255"
              :auto-size="{ minRows: 3, maxRows: 5 }" allow-clear />
          </a-form-item>
          <a-row>
            <a-col :span="24" style="text-align: right">
              <a-button type="primary" html-type="submit">Submit</a-button>
              <a-button style="margin: 0 8px">Clear</a-button>
            </a-col>
          </a-row>
        </a-card>
      </a-form>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
const isLoading = ref<boolean>(false)
const state = reactive<any>({
  additional: {} as any
})

const onFinishFailed = (e: any) => {
  if (e.errorFields.length > 0) return;
}

const onFinish = async (e: any) => {
  try {
    isLoading.value = true;

    const { data, error } = await useFetch('/api/doctors/create', {
      method: 'POST',
      body: {
        ...state,
        additional: parseAdditional(state.additional)
      }
    })

    isLoading.value = false;

    if (error.value) {
      notification.error({
        message: 'Gagal',
        description: 'Ada kesalahan pada saat input, periksa kembali inputan anda.'
      });
      return;
    }

    const item = data.value as DataItem;

    notification.success({
      message: 'Berhasil',
      description: item?.message ?? 'Dokter berhasil dibuat'
    });

    navigateTo('/doctors')
  } catch(err) {
    isLoading.value = false;
    notification.error({
      message: 'Gagal',
      description: 'Ada kesalahan pada saat input, periksa kembali inputan anda.'
    });
  }
}  
</script>