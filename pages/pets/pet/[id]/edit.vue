<template>
  <a-row type="flex" justify="center">
    <a-col :span="24" :xl="16" class="mb-24">
      <a-form name="nest-messages" :model="state" @finish="onFinish" @finish-failed="onFinishFailed"
        :hideRequiredMark="true" :labelCol="{ xl: 6 }" :wrapperCol="{ xl: 24 }" layout="vertical">
        <a-card :bordered="false" class="header-solid h-full title-border-bottom" title="Pet">
          <a-form-item name="name" label="Nama" :rules="[{ required: true }]">
            <a-input v-model:value="state.name" />
          </a-form-item>
          <a-form-item name="gender" label="Jenis Kelamin" :rules="[{ required: true }]">
            <a-radio-group v-model:value="state.gender">
              <a-radio value="male">Jantan</a-radio>
              <a-radio value="female">Betina</a-radio>
              <a-radio value="other">Lainnya</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-row :gutter="[12, 12]">
            <a-col :span="24" :xl="12">
              <a-form-item name="species" label="Jenis Hewan">
                <a-select v-model:value="state.species">
                  <a-select-option value="cat">Kucing</a-select-option>
                  <a-select-option value="dog">Anjing</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="24" :xl="12">
              <a-form-item name="breed" label="Ras">
                <a-input v-model:value="state.breed" placeholder="Domestik" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="[12, 12]">
            <a-col :span="24" :xl="12">
              <a-form-item :name="['additional', 'marks']" label="Tanda Khusus">
                <a-input v-model:value="state.additional.marks" placeholder="ada warna garis lurus dekat buntut" />
              </a-form-item>
            </a-col>
            <a-col :span="24" :xl="12">
              <a-form-item :name="['additional', 'color']" label="Bulu & Warna">
                <a-input v-model:value="state.additional.color" placeholder="Putih, hitam, & abu-abu" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item name="isActive" label="Status">
            <a-switch v-model:checked="state.isActive" />
          </a-form-item>
          <a-row>
            <a-col :span="24" style="text-align: right">
              <a-button type="primary" html-type="submit" :loading="isLoading" :disabled="isLoading">Submit</a-button>
              <a-button style="margin: 0 8px">Clear</a-button>
            </a-col>
          </a-row>
        </a-card>
      </a-form>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
const route = useRoute();

const isLoading = ref<boolean>(false)
const state = reactive<any>({
  additional: {} as any
});

const fetchData = async () => {
  try {
    isLoading.value = true

    const { data, error } = await useFetch(`/api/pets/show`, {
      params: {
        id: route.params.id
      }
    });

    isLoading.value = false

    if (error.value) {
      notification.error({
        message: 'Gagal',
        description: 'Ada kesalahan pada saat ambil data, coba lagi atau hubungi tim teknis'
      });
      return;
    }

    const item = data.value as DataItem;

    Object.assign(state, {
      ...item.data,
      additional: parseAdditional(item.data?.additional)
    })
  } catch (err) {
    notification.error({
      message: 'Gagal',
      description: 'Ada kesalahan pada saat ambil data, coba lagi atau hubungi tim teknis'
    });
    isLoading.value = false
  }
}

const onFinishFailed = (e: any) => {
  if (e.errorFields.length > 0) return;
}

const onFinish = async (e: any) => {
  try {
    isLoading.value = true;

    const { data, error } = await useFetch('/api/pets/update', {
      method: 'PUT',
      body: {
        ...state,
        id: route.params.id,
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
      description: item?.message ?? 'Pet berhasil di update'
    });

    navigateTo('/pets/pet')
  } catch (err) {
    notification.error({
      message: 'Gagal',
      description: 'Ada kesalahan pada saat input, periksa kembali inputan anda.'
    });
  }
}


fetchData()

</script>