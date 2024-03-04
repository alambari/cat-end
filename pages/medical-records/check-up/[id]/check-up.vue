<template>
  <div>
    <a-row :gutter="12" justify="center" class="mb-24">
      <a-col :span="24" :xl="12">
        <a-form name="nest-messages" :model="state" @finish="onFinish" @finish-failed="onFinishFailed" :hideRequiredMark="true"  :labelCol="{ xl: 6, md: 8 }" :wrapperCol="{ xl: 24 }">
          <a-card :bordered="false" class="header-solid h-full title-border-bottom" title="Info Pet">
            <a-form-item name="petName" label="Nama">
              <a-input v-model:value="state.petName" placeholder="John" readonly/>
            </a-form-item>
            <a-form-item name="petCode" label="No Member">
                <a-input v-model:value="state.petCode" readonly/>
              </a-form-item>
            <a-form-item name="ownerName" label="Nama Pemilik">
              <a-input v-model:value="state.ownerName" placeholder="Doe" readonly/>
            </a-form-item>
            <a-form-item name="ownerPhone" label="No. Handphone">
              <a-input v-model:value="state.ownerPhone" placeholder="+6287885632xxx" readonly/>
            </a-form-item>
          </a-card>
        </a-form>
      </a-col>      
    </a-row>
    <a-form :labelCol="{ xl: 6, md: 8 }">
      <a-row :gutter="12" justify="center" class="vertical">
        <a-col :xl="12" class="item-center w-full mb-24" v-for="(item, index) in stateCheckups" :key="index">
          <a-card :bordered="false" class="header-solid h-full title-border-bottom" title="Layanan">
            <template #extra v-if="index === 0">
              <a-button @click="onAddService">
                <plus-outlined class="icon"/>
								<span>Tambah Layanan</span>
              </a-button>
            </template>            
            <template #extra v-else>
              <a-button @click="onRemoveService(index)">
                <minus-outlined class="icon"/>
								<span>Hapus</span>
              </a-button>
            </template>            
            <a-form-item name="service" label="Service">
              <a-select v-model:value="item.service">
                <a-select-option value="">Pilih Layanan</a-select-option>
                <a-select-option v-for="service in services.data" :value="service.key" :key="service.key">{{ service.value }}</a-select-option>
              </a-select>
            </a-form-item>
            <template v-if="item.service === 'checkup'">
              <a-form-item name="diagnose" label="Tindakan">
                <a-select v-model:value="item.diagnose">
                  <a-select-option value="">Pilih Tindakan</a-select-option>
                  <a-select-option value="medical_final_action">Tindakan Akhir/ Resep Obat</a-select-option>
                  <a-select-option value="medical_followup_action">Pemeriksaan Lanjutan</a-select-option>
                </a-select>
              </a-form-item>

              <template v-if="item.diagnose === 'medical_followup_action'">
                <a-form-item name="followUp" label="Cek Lanjutan">
                  <a-checkbox-group>
                    <a-checkbox value="hematology">Cek Hematologi</a-checkbox>
                    <a-checkbox value="xray">X-Ray</a-checkbox>
                  </a-checkbox-group>
                </a-form-item>
              </template>              
            </template>
            <template v-if="item.service === 'vacine'">
              <a-form-item name="vacine" label="Vaksin">
                <a-select v-model:value="item.vacine">
                  <a-select-option value="">Pilih Vaksin</a-select-option>
                  <a-select-option value="1">Vaksin 1</a-select-option>
                  <a-select-option value="2">Vaksin 2</a-select-option>
                  <a-select-option value="3">Vaksin 3</a-select-option>
                  <a-select-option value="4">Vaksin 4</a-select-option>
                </a-select>
              </a-form-item>
            </template>
            <template v-if="item.service === 'steril' || item.service === 'checkup'">
              <a-form-item name="treatment" label="Rawat Medis">
                <a-select v-model:value="item.treatment">
                  <a-select-option value="">Pilih Rawat</a-select-option>
                  <a-select-option value="inpatient">Rawat Inap</a-select-option>
                  <a-select-option value="outpatient">Rawat Jalan</a-select-option>
                </a-select>
              </a-form-item>
            </template>
            <template v-if="item.service === 'checkup'">
              <a-form-item name="services" label="File Upload">
                <a-upload name="file" action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
                  <a-button>
                    <upload-outlined></upload-outlined>
                    File Upload
                  </a-button>
                </a-upload>
              </a-form-item>
            </template>
            <a-form-item name="notes" label="Catatan Medis">
              <a-textarea v-model:value="item.notes" placeholder="Catatan Medis" :maxlength="255" :auto-size="{ minRows: 3, maxRows: 5 }" allow-clear />
            </a-form-item>
          </a-card>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { debounce, get, omit } from 'underscore';

  const router = useRouter();
  const route = useRoute();

  const selectedItem = ref<string>('')
  const isLoading = ref<boolean>(false)
  const isLoadingPetFetch = ref<boolean>(false)

  const state = reactive({
    service: '',
    petName: '',
    petCode: '',
    ownerName: '',
    ownerPhone: ''
  })

  const stateCheckups = reactive([{
    service: '',
    diagnose: '',
    vacine: '',
    treatment: '',
    notes: ''
  }])

  const services = reactive({
    data: [] as { key: string, value: string }[]
  })

  const fetchService = async () => {
    const { data, error } = await useFetch('/api/app/service')
    services.data = data.value ?? []
  }

  const fetchAppointment = async () => {
    isLoadingPetFetch.value = true;

    const { data, error } = await useFetch('/api/appointment/show', {
      params: {
        id: route.params.id
      }
    });
    isLoadingPetFetch.value = false;

    state.petName = data.value.data.pet.name
    state.petCode = data.value.data.pet.code
    state.ownerName = data.value.data.petOwner.name
    state.ownerPhone = data.value.data.petOwner.phone

    stateCheckups[0].service = data.value.data.service;
  }

  const onAddService = () => {
    stateCheckups.push({
      service: '',
      diagnose: '',
      vacine: '',
      treatment: '',
      notes: ''      
    })
  }

  const onRemoveService = (index: number) => {
    stateCheckups.splice(index, 1);
  }

  const onFinishFailed = (e: any) => {
    if(e.errorFields.length > 0) return;
  }

  const onFinish = async (e: any) => {
    isLoading.value = true;

    const { data, error } = await useFetch('/api/appointment/check-up', {
      method: 'POST',
      body: {
        service: state.service,
      }
    })

    isLoading.value = false;

    if(error.value) {
      notification.error({
        message: 'Gagal',
        description: 'Ada kesalahan pada saat input, periksa kembali inputan anda.'
      });
      return;
    }

    notification.success({
      message: 'Berhasil',
      description: 'Check up'
    });

    return router.push({ path: '/appointment' })
  }

  fetchService()
  fetchAppointment()
</script>