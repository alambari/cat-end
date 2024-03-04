<template>
  <a-row :gutter="12" justify="center">
    <a-col :span="7">
      <a-row :gutter="24">
        <a-col :span="24" class="mb-24">
          <a-card>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-row type="flex" justify="center" :align="'middle'" class="flex-col">
                  <a-col :span="24" class="mb-24">
                    <a-avatar :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }">U</a-avatar>
                  </a-col>
                  <a-col :span="24" class="flex flex-col text-center">
                    <span class="text-lg font-semibold">{{ patient?.name }}</span>
                    <span class="text-md">{{ patient?.code }}</span>
                  </a-col>
                </a-row>
              </a-col>
              <a-divider></a-divider>
              <a-col :span="24">
                <a-row :gutter="12">
                  <a-col :span="24" class="flex flex-col mb-24">
                    <span class="font-semibold text-md">Jenis Kelamin</span>
                    <span v-if="patient?.gender === 'male'">Jantan</span>
                    <span v-if="patient?.gender === 'female'">Betina</span>
                  </a-col>
                  <a-col :span="24" class="flex flex-col mb-24">
                    <span class="font-semibold text-md">Jenis Hewan</span>
                    <span v-if="patient?.gender === 'male'">Jantan</span>
                    <span v-if="patient?.gender === 'female'">Betina</span>
                  </a-col>
                  <a-col :span="24" class="flex flex-col mb-24">
                    <span class="font-semibold">Ras</span>
                    <span>{{ patient?.breed }}</span>
                  </a-col>
                  <a-col :span="24" class="flex flex-col mb-24">
                    <span class="font-semibold">Bulu & Warna</span>
                    <span>{{ patient?.additional?.color ?? '-' }}</span>
                  </a-col>
                  <a-col :span="24" class="flex flex-col mb-24">
                    <span class="font-semibold">Tanda Khusus</span>
                    <span>{{ patient?.additional?.marks ?? '-' }}</span>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
        <a-col :span="24">
          <a-card>
            <a-button type="primary" block class="mb-10" :loading="isLoading" @click="onSubmit">Simpan</a-button>
            <a-button block>Kembali</a-button>
          </a-card>
        </a-col>
      </a-row>
    </a-col>
    <a-col :xl="17" :span="24">
      <a-form name="nest-messages" layout="vertical" :model="state" :hideRequiredMark="true" :labelCol="{ xl: 6 }" :wrapperCol="{ xl: 24 }">
        <a-card :bordered="false" class="header-solid h-full title-border-bottom mb-24"
          :title="`Data Pasien - ${patient.code}`" id="patient">
          <a-row :gutter="12">
            <a-col :span="12" class="flex flex-col mb-24">
              <span>Sterilisasi</span>
              <span>{{ patient.generalCheck?.steril ? 'Sudah' : 'Belum' }}</span>
            </a-col>
            <a-col :span="12" class="flex flex-col mb-24">
              <span>Berat Badan</span>
              <span>{{ patient.generalCheck?.weight }}Kg</span>
            </a-col>
            <a-col :span="12" class="flex flex-col mb-24">
              <span>Tinggi</span>
              <span>{{ patient.generalCheck?.height }}cm</span>
            </a-col>
            <a-col :span="12" class="flex flex-col mb-24">
              <span>Suhu Tubuh</span>
              <span>{{ patient.generalCheck?.temperature }}°C</span>
            </a-col>
            <a-col :span="12" class="flex flex-col mb-24">
              <span>Usia</span>
              <span>{{ patient.generalCheck?.age?.year }} Tahun {{ patient.generalCheck?.age?.month }} Bulan {{
                patient.generalCheck?.age?.day }} Hari</span>
            </a-col>
          </a-row>
        </a-card>
        <a-card :bordered="false" class="header-solid h-full title-border-bottom mb-24" title="Keadaan Umum" id="common">
          <a-form-item :name="['common', 'homecare']" label="Perawatan Dirumah" v-bind="validateInfos['common.homecare']">
            <a-radio-group v-model:value="state.common.homecare">
              <a-radio value="outdoor">Outdoor</a-radio>
              <a-radio value="indoor">Indoor</a-radio>
              <a-radio value="semi">Semi</a-radio>
              <a-radio value="other">Lainnya</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item :name="['common', 'behaviour']" label="Tingkah Laku" v-bind="validateInfos['common.behaviour']">
            <a-radio-group v-model:value="state.common.behaviour">
              <a-radio value="fierce">Galak</a-radio>
              <a-radio value="aggressive">Agresif</a-radio>
              <a-radio value="coward">Penakut</a-radio>
              <a-radio value="quietType">Pendiam</a-radio>
              <a-radio value="other">Lainnya</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-card>
        <a-card :bordered="false" class="header-solid h-full title-border-bottom mb-24" title="Anamnesa" id="anamnesis">
          <a-row :gutter="12" class="mb-24">
            <a-col :span="24" :md="8">
              <a-form-item :name="['anamnesis', 'anthelmintic', 'value']" label="Obat Cacing" class="mb-10">
                <a-radio-group v-model:value="state.anamnesis.anthelmintic.value">
                  <a-radio :value="true">Ya</a-radio>
                  <a-radio :value="false">Tidak</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item :name="['anamnesis', 'anthelmintic', 'date']" v-if="state.anamnesis.anthelmintic.value">
                <a-date-picker v-model:value="state.anamnesis.anthelmintic.date" value-format="YYYY-MM-DD"
                  class="w-200" />
              </a-form-item>
            </a-col>
            <a-col :span="24" :md="8">
              <a-form-item :name="['anamnesis', 'vaccine', 'value']" label="Vaksinasi" class="mb-10">
                <a-radio-group v-model:value="state.anamnesis.vaccine.value">
                  <a-radio :value="true">Ya</a-radio>
                  <a-radio :value="false">Tidak</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item :name="['anamnesis', 'vaccine', 'date']" v-if="state.anamnesis.vaccine.value">
                <a-date-picker v-model:value="state.anamnesis.vaccine.date" value-format="YYYY-MM-DD" class="w-200" />
              </a-form-item>
            </a-col>
            <a-col :span="24" :md="8">
              <a-form-item :name="['anamnesis', 'fleaMedicine', 'value']" label="Tetes Kutu" class="mb-10">
                <a-radio-group v-model:value="state.anamnesis.fleaMedicine.value">
                  <a-radio :value="true">Ya</a-radio>
                  <a-radio :value="false">Tidak</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item :name="['anamnesis', 'fleaMedicine', 'date']" v-if="state.anamnesis.fleaMedicine.value">
                <a-date-picker v-model:value="state.anamnesis.fleaMedicine.date" value-format="YYYY-MM-DD"
                  class="w-200" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item name="complaint" label="Keluhan" v-bind="validateInfos.complaint">
            <a-textarea v-model:value="state.complaint" placeholder="Bulu rontok yang berlebihan & gatal-gatal ..."
              :maxlength="255" :auto-size="{ minRows: 7, maxRows: 10 }" allow-clear />
          </a-form-item>
          <a-form-item name="physical" label="Pemeriksaan Fisik">
            <a-textarea v-model:value="state.physical"
              placeholder="- ekspresi wajah:tenang - pertulangan kepala:simetris ..." :maxlength="255"
              :auto-size="{ minRows: 7, maxRows: 10 }" allow-clear />
          </a-form-item>
        </a-card>
        <a-card :bordered="false" class="header-solid h-full title-border-bottom mb-24" title="Diagnosa" id="diagnose">
          <a-form-item name="diagnose" label="Catatan"  v-bind="validateInfos.diagnose">
            <a-textarea v-model:value="state.diagnose" placeholder="Infeksi Jamur..." :maxlength="255"
              :auto-size="{ minRows: 7, maxRows: 10 }" allow-clear />
          </a-form-item>
          <a-form-item name="prognose" label="Prognosa" v-bind="validateInfos.prognose">
            <a-radio-group v-model:value="state.prognose">
              <a-radio value="fausta">Fausta</a-radio>
              <a-radio value="dubius">Dubius</a-radio>
              <a-radio value="infausta">Infausta</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-card>
        <a-card :bordered="false" class="header-solid h-full title-border-bottom mb-24" title="Treatment" id="treatment">
          <a-form-item name="treatment" label="Catatan"  v-bind="validateInfos.treatment">
            <a-textarea v-model:value="state.treatment"
              placeholder="Suplemen atau vitamin tambahan untuk menambah nafsu makan kucingmu dan mendukung pertumbuhan rambut kucing yang rontok atau botak..."
              :maxlength="255" :auto-size="{ minRows: 7, maxRows: 10 }" allow-clear />
          </a-form-item>
        </a-card>
      </a-form>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { Form } from 'ant-design-vue';

const router = useRouter();
const route = useRoute();

const isLoading = ref<boolean>(false)
const patient = reactive<any>({
  name: '',
  code: '',
  gender: '',
  species: '',
  breed: '',
  additional: {} as any,
  petOwner: {} as any,
  generalCheck: {} as any
})

const state = reactive<any>({
  complaint: '',
  physical: '',
  diagnose: '',
  prognose: '',
  treatment: '',
  common: {
    homecare: '',
    behaviour: '',
  } as any,
  anamnesis: {
    anthelmintic: {
      value: false,
      date: ''
    },
    vaccine: {
      value: false,
      date: ''
    },
    fleaMedicine: {
      value: false,
      date: ''
    },
  } as any
})

const useForm = Form.useForm;

const { validate, validateInfos } = useForm(
  state,
  reactive({
    'common.homecare': [{ required: true, message: 'Keadaan umum harus diisi' }],
    'common.behaviour': [{ required: true, message: 'Tingkah laku harus diisi' }],
    complaint: [{ required: true, message: 'Keluhan harus diisi' }],
    diagnose: [{ required: true, message: 'Diagnosa harus diisi' }],
    prognose: [{ required: true, message: 'Prognosa harus diisi' }],
    treatment: [{ required: true, message: 'Treatment harus diisi' }],
  })
)

const onSubmit = async (e: any) => {
  try {
    isLoading.value = true;

    await validate()

    const fetchConfirmed = await useFetch('/api/medical-check/create', {
      method: 'POST',
      body: {
        id: route.params.id,
        ...state
      }
    })

    isLoading.value = false;

    if (fetchConfirmed.error.value) {
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

    router.push({
      path: '/medical-records/check-up',
      query: {
        status: 'completed'
      }
    })
  } catch (err: any) {
    isLoading.value = false;

    if (err?.errorFields.length > 0) return;

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

    isLoading.value = false;

    if (error.value) {
      notification.error({
        message: 'Gagal',
        description: 'Ada kesalahan pada saat ambil data, coba lagi atau hubungi tim teknis'
      });
      return;
    }

    const item = data.value as DataItem;

    Object.assign(patient, {
      ...item.data?.pet,
      additional: parseAdditional(item.data?.pet?.additional),
      petOwner: item.data?.petOwner,
      generalCheck: {
        ...item.data?.generalCheck,
        age: JSON.parse(item.data?.generalCheck?.age)
      }
    })
  } catch (err) {
    isLoading.value = false;
    notification.error({
      message: 'Gagal',
      description: 'Ada kesalahan pada saat ambil data, coba lagi atau hubungi tim teknis'
    });
  }
}

fetchData()  
</script>