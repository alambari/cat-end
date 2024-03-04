<template>
  <a-row type="flex" justify="center">
    <a-col :span="24" :xl="16" class="mb-24">
      <a-form name="nest-messages" :model="state" @finish="onFinish" @finish-failed="onFinishFailed"
        :hideRequiredMark="true" :labelCol="{ xl: 6 }" :wrapperCol="{ xl: 24 }" layout="vertical">
        <a-card :bordered="false" class="header-solid h-full title-border-bottom mb-24"
          :title="`Data Pet - ${state.pet.code}`">
          <a-form-item :name="['pet', 'name']" label="Nama" :rules="[{ required: true, message: 'Nama harus diisi' }]">
            <a-input v-model:value="state.pet.name" placeholder="John" />
          </a-form-item>
          <a-form-item :name="['pet', 'gender']" label="Jenis Kelamin"
            :rules="[{ required: true, message: 'Jenis kelamin harus diisi' }]">
            <a-radio-group v-model:value="state.pet.gender">
              <a-radio value="male">Jantan</a-radio>
              <a-radio value="female">Betina</a-radio>
              <a-radio value="other">Lainnya</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-row :gutter="[12, 12]">
            <a-col :span="24" :xl="12">
              <a-form-item :name="['pet', 'species']" label="Jenis Hewan">
                <a-select v-model:value="state.pet.species">
                  <a-select-option value="cat">Kucing</a-select-option>
                  <a-select-option value="dog">Anjing</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="24" :xl="12">
              <a-form-item :name="['pet', 'breed']" label="Ras">
                <a-input v-model:value="state.pet.breed" placeholder="Domestik" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="[12, 12]">
            <a-col :span="24" :xl="12">
              <a-form-item :name="['pet', 'additional', 'marks']" label="Tanda Khusus">
                <a-input v-model:value="state.pet.additional.marks"
                  placeholder="ada warna garis lurus dekat buntut" />
              </a-form-item>
            </a-col>
            <a-col :span="24" :xl="12">
              <a-form-item :name="['pet', 'additional', 'color']" label="Bulu & Warna">
                <a-input v-model:value="state.pet.additional.color" placeholder="Putih, hitam, & abu-abu" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <a-card :bordered="false" class="header-solid h-full title-border-bottom mb-24" title="Keadaan Fisik">
          <a-row :gutter="12">
            <a-col :span="24" :md="8">
              <a-form-item :name="['general', 'age', 'year']" label="Usia (ex. 4 Tahun 3 Bulan 21 Hari)"
                :rules="[{ required: true, min: 1, max: 999, message: 'Usia tahun harus diisi' }]" :labelCol="{ span: 24 }">
                <a-input v-model:value="state.general.age.year" type="number">
                  <template #suffix>
                    <span>Tahun</span>
                  </template>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24" :md="8">
              <a-form-item :name="['general', 'age', 'month']" label="&nbsp;"
                :rules="[{ required: true, min: 1, max: 12, message: 'Usia bulan harus diisi' }]">
                <a-input v-model:value="state.general.age.month" type="number">
                  <template #suffix>
                    <span>Bulan</span>
                  </template>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24" :md="8">
              <a-form-item :name="['general', 'age', 'day']" label="&nbsp;"
                :rules="[{ required: true, min: 1, max: 31, message: 'Usia hari harus diisi' }]">
                <a-input v-model:value="state.general.age.day" type="number">
                  <template #suffix>
                    <span>Hari</span>
                  </template>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item :name="['general', 'steril']" label="Sterilisasi" :rules="[{ required: true, type: 'boolean' }]">
            <a-radio-group v-model:value="state.general.steril">
              <a-radio :value="true">Sudah</a-radio>
              <a-radio :value="false">Belum</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-row :gutter="12">
            <a-col :span="24" :xl="12">
              <a-form-item :name="['general', 'weight']" label="Berat Badan"
                :rules="[{ required: true, message: 'Berat badan harus diisi' }]">
                <a-input-number v-model:value="state.general.weight" addon-after="Kg" class="w-full"></a-input-number>
              </a-form-item>
            </a-col>
            <a-col :span="24" :xl="12">
              <a-form-item :name="['general', 'height']" label="Tinggi"
                :rules="[{ required: true, message: 'Tinggi harus diisi' }]">
                <a-input-number v-model:value="state.general.height" addon-after="cm" class="w-full"></a-input-number>
              </a-form-item>
            </a-col>
            <a-col :span="24" :xl="12">
              <a-form-item :name="['general', 'temperature']" label="Suhu Tubuh" :rules="[{ required: false }]">
                <a-input-number v-model:value="state.general.temperature" addon-after="°C" class="w-full"></a-input-number>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <a-card :bordered="false" class="header-solid h-full title-border-bottom"
          :title="`Data Pemilik - ${state.petOwner.code}`">
          <a-form-item :name="['petOwner', 'name']" label="Nama Pemilik"
            :rules="[{ required: true, message: 'Nama pemilik harus diisi' }]">
            <a-input v-model:value="state.petOwner.name" placeholder="Doe" />
          </a-form-item>
          <a-form-item :name="['petOwner', 'additional', 'identityNumber']" label="No. KTP">
            <a-input v-model:value="state.petOwner.additional.identityNumber" :max-length="20" />
          </a-form-item>
          <a-form-item :name="['petOwner', 'gender']" label="Jenis Kelamin"
            :rules="[{ required: true, message: 'Jenis kelamin harus diisi' }]">
            <a-radio-group v-model:value="state.petOwner.gender">
              <a-radio value="male">Laki-Laki</a-radio>
              <a-radio value="female">Perempuan</a-radio>
              <a-radio value="other">Lainnya</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-row :gutter="[12, 12]">
            <a-col :span="24" :xl="12">
              <a-form-item :name="['petOwner', 'birthplace']" label="Tempat Lahir"
                :rules="[{ required: true, message: 'Tempat lahir harus diisi' }]">
                <a-input v-model:value="state.petOwner.birthplace" />
              </a-form-item>
            </a-col>
            <a-col :span="24" :xl="12">
              <a-form-item :name="['petOwner', 'birthday']" label="Tanggal Lahir" :rules="[{ required: false }]">
                <a-date-picker v-model:value="state.petOwner.birthday" value-format="YYYY-MM-DD" class="w-250" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="[12, 12]">
            <a-col :span="24" :xl="12">
              <a-form-item :name="['petOwner', 'phone']" label="No. Handphone"
                :rules="[{ required: true, message: 'No Tlp harus diisi' }]">
                <a-input v-model:value="state.petOwner.phone" :max-length="20" />
              </a-form-item>
            </a-col>
            <a-col :span="24" :xl="12">
              <a-form-item :name="['petOwner', 'email']" label="Email" :rules="[{ type: 'email' }]">
                <a-input v-model:value="state.petOwner.email" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item :name="['petOwner', 'address']" label="Alamat"
            :rules="[{ required: true, message: 'Alamat harus diisi' }]">
            <a-textarea v-model:value="state.petOwner.address" placeholder="Jl. Merdekan No. 45" :maxlength="255"
              :auto-size="{ minRows: 3, maxRows: 5 }" allow-clear />
          </a-form-item>
          <a-row>
            <a-col :span="24" style="text-align: right">
              <a-button style="margin: 0 8px">Clear</a-button>
              <a-button type="primary" html-type="submit" :loading="isLoading">Konfirmasi</a-button>
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
  pet: {
    id: '',
    name: '',
    code: '',
    gender: 'male',
    species: '',
    breed: '',
    additional: {} as any
  },
  petOwner: {
    id: '',
    name: '',
    code: '',
    birthplace: '',
    birthday: '',
    gender: 'male',
    phone: '',
    email: '',
    address: '',
    additional: {} as any
  },
  general: {
    age: {
      year: '',
      month: '',
      day: ''
    },
    height: '',
    weight: '',
    temperature: '',
    steril: false,
  }
})

const onFinishFailed = (e: any) => {
  if (e.errorFields.length > 0) return;
}

const onFinish = async (e: any) => {
  try {
    isLoading.value = true;

    const fetchPetUpdate = await useFetch('/api/pets/update', {
      method: 'PUT',
      body: {
        ...state.pet,
        additional: parseAdditional(state.pet.additional)
      }
    })

    if (fetchPetUpdate.error.value) {
      isLoading.value = false;

      notification.error({
        message: 'Gagal',
        description: 'Ada kesalahan pada saat input, periksa kembali inputan anda.'
      });
      return;
    }

    const fetchPetOwnerUpdate = await useFetch('/api/pet-owner/update', {
      method: 'PUT',
      body: {
        ...state.petOwner,
        additional: parseAdditional(state.petOwner.additional)
      }
    })

    if (fetchPetOwnerUpdate.error.value) {
      isLoading.value = false;

      notification.error({
        message: 'Gagal',
        description: 'Ada kesalahan pada saat input, periksa kembali inputan anda.'
      });
      return;
    }

    const fetchGeneralCheck = await useFetch('/api/medical-check/general-check', {
      method: 'POST',
      body: {
        id: route.params.id,
        ...state.general,
      }
    })

    isLoading.value = false;

    if (fetchGeneralCheck.error.value) {
      isLoading.value = false;

      notification.error({
        message: 'Gagal',
        description: 'Ada kesalahan pada saat input, periksa kembali inputan anda.'
      });
      return;
    }

    const fetchConfirmed = await useFetch('/api/appointment/confirmed', {
      method: 'PATCH',
      body: {
        id: route.params.id
      }
    })

    if (fetchConfirmed.error.value) {
      isLoading.value = false;

      notification.error({
        message: 'Gagal',
        description: 'Ada kesalahan pada saat input, periksa kembali inputan anda.'
      });
      return;
    }

    notification.success({
      message: 'Berhasil',
      description: 'Reservasi berhasil diregister!'
    });

    navigateTo('/appointment')
  } catch(err) {
    isLoading.value = false;

    notification.error({
      message: 'Gagal',
      description: 'Ada kesalahan pada saat input, periksa kembali inputan anda.'
    });
  }
}

const fetchData = async () => {
  try {
    isLoading.value = true;

    const { data, error } = await useFetch(`/api/appointment/show`, {
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
			return
		}


    const item = data.value as DataItem;

    const status = item.data?.status ?? 'confirmed';

    if(status !== 'new') {
      const statusText = 
        status === 'confirmed' ? 'Reservasi ini sudah dikonfirmasi sebelumnya.' : 
        (status === 'canceled' ? 'Reservasi ini sudah dibatalkan sebelumnya.' : 'Reservasi ini sudah kadaluarsa')
      Modal.info({
        title: 'Pemberitahuan!',
        content: h('div', {}, [
          h('p', statusText),
        ]),
        okText: 'Kembali',
        onOk() {
          navigateTo('/appointment')
          Modal.destroyAll();
        },
      });
      return;
    }

    Object.assign(state.pet, {
      ...item.data?.pet,
      additional: parseAdditional(item.data?.pet?.additional)      
    })
    Object.assign(state.petOwner, {
      ...item.data?.petOwner,
      additional: parseAdditional(item.data?.petOwner?.additional)      
    })
  } catch(err) {
		isLoading.value = false

		notification.error({
			message: 'Gagal',
			description: 'Ada kesalahan pada saat ambil data, coba lagi atau hubungi tim teknis.'
		});
  }
}

fetchData()  
</script>