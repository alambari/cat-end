<template>
  <a-row justify="center">
    <a-col :span="24" :xl="16" class="mb-24">
      <a-form name="nest-messages" :model="state" @finish="onFinish" @finish-failed="onFinishFailed"
        :hideRequiredMark="true" :labelCol="{ xl: 6 }" :wrapperCol="{ xl: 24 }" layout="vertical">
        <a-card :bordered="false" class="header-solid h-full title-border-bottom mb-24" title="Data Pasien">
          <a-form-item name="patientType">
            <a-radio-group v-model:value="state.patientType" @click="onChangePatientType" button-style="solid"
              :style="{ display: 'flex', justifyContent: 'center' }">
              <a-radio-button value="new">Pasien Baru</a-radio-button>
              <a-radio-button value="old">Pasien Lama</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <template v-if="state.patientType === 'old' && !!selectedItem">
            <a-row :gutter="[12,12]">
              <a-col :span="12">
                <a-form-item name="name" label="Nama Pasien"
                  :rules="[{ required: selectedItem ? false : true, message: 'Nama harus diisi' }]">
                  <a-input v-model:value="state.name" placeholder="John" readonly/>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item name="code" label="No Member">
                  <a-input v-model:value="state.code" readonly/>
                </a-form-item>              
              </a-col>
            </a-row>
            <a-form-item name="gender" label="Jenis Kelamin"
              :rules="[{ required: selectedItem ? false : true, message: 'Jenis kelamin harus diisi' }]">
              <a-radio-group v-model:value="state.gender" disabled>
                <a-radio value="male">Jantan</a-radio>
                <a-radio value="female">Betina</a-radio>
                <a-radio value="other">Lainnya</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-row :gutter="[12,12]">
              <a-col :span="12">
                <a-form-item name="species" label="Jenis Hewan">
                  <a-select v-model:value="state.species" disabled>
                    <a-select-option value="cat">Kucing</a-select-option>
                    <a-select-option value="dog">Anjing</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item name="breed" label="Ras">
                  <a-input v-model:value="state.breed" readonly/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-divider></a-divider>
            <a-row :gutter="[12,12]">
              <a-col :span="12">
                <a-form-item name="ownerName" label="Nama Pemilik">
                  <a-input v-model:value="state.ownerName" placeholder="Doe" readonly/>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item name="ownerCode" label="No Member">
                  <a-input v-model:value="state.ownerCode" readonly/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="[12,12]">
              <a-col :span="12">
                <a-form-item name="ownerPhone" label="No. Tlp">
                  <a-input v-model:value="state.ownerPhone" placeholder="+6287885632xxx" readonly :max-length="20" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item name="ownerEmail" label="Alamat Email">
                  <a-input v-model:value="state.ownerEmail" placeholder="+6287885632xxx" readonly/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item name="ownerAddress" label="Alamat">
              <a-textarea v-model:value="state.ownerAddress" placeholder="Jl. Merdekan No. 45" :maxlength="255"
                :auto-size="{ minRows: 3, maxRows: 5 }" allow-clear disabled/>
            </a-form-item>
          </template>
          <template v-else>
            <a-form-item name="name" label="Nama Pasien" :rules="[{ required: true, message: 'Nama harus diisi' }]">
              <a-input v-model:value="state.name" placeholder="John"/>
            </a-form-item>
            <a-row :gutter="[12,12]">
              <a-col :span="12">
                <a-form-item name="gender" label="Jenis Kelamin" :rules="[{ required: true, message: 'Jenis kelamin harus diisi' }]">
                  <a-radio-group v-model:value="state.gender">
                    <a-radio value="male">Jantan</a-radio>
                    <a-radio value="female">Betina</a-radio>
                    <a-radio value="other">Lainnya</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item name="species" label="Jenis Hewan" :rules="[{ required: true, message: 'Jenis hewan harus diisi' }]">
                  <a-select v-model:value="state.species">
                    <a-select-option value="cat">Kucing</a-select-option>
                    <a-select-option value="dog">Anjing</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-divider></a-divider>
            <a-form-item name="ownerName" label="Nama Pemilik" :rules="[{ required: true, message: 'Nama pemilik harus diisi' }]">
              <a-input v-model:value="state.ownerName" placeholder="Doe"/>
            </a-form-item>
            <a-row :gutter="[12,12]">
              <a-col :span="12">
                <a-form-item name="ownerPhone" label="No. Tlp" :rules="[{ required: true, message: 'No Tlp harus diisi' }]">
                  <a-input v-model:value="state.ownerPhone" placeholder="+6287885632xxx" :max-length="20" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item name="ownerEmail" label="Alamat Email">
                  <a-input v-model:value="state.ownerEmail" placeholder="john@mail.com"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item name="ownerAddress" label="Alamat" :rules="[{ required: true, message: 'Alamat harus diisi' }]">
              <a-textarea v-model:value="state.ownerAddress" placeholder="Jl. Merdekan No. 45" :maxlength="255"
                :auto-size="{ minRows: 3, maxRows: 5 }" allow-clear />
            </a-form-item>
          </template>
        </a-card>
        <a-card :bordered="false" class="header-solid h-full title-border-bottom" title="Dokter & Jadwal">
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item name="visitAt" label="Tanggal Kunjungan"
                :rules="[{ required: true, message: 'Tgl kunjungan harus diisi' }]">
                <a-date-picker v-model:value="state.visitAt" value-format="YYYY-MM-DD" class="w-250"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item name="visitTime" label="Jam Kunjungan"
                :rules="[{ required: true, message: 'Jam kunjungan harus diisi' }]">
                <a-time-picker v-model:value="state.visitTime" format="HH:mm" value-format="HH:mm" class="w-250"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item name="doctorId" label="Dokter" :rules="[{ required: true, message: 'Nama dokter harus diisi' }]">
            <a-select v-model:value="state.doctorId" placeholder="Pilih Dokter" showSearch :filter-option="false"
              :not-found-content="doctorState.fetching ? undefined : null" :options="doctorState.data"
              :loading="doctorState.loading" @search="fetchDoctor">
              <template v-if="doctorState.fetching" #notFoundContent>
                <a-spin size="small" />
              </template>
            </a-select>
          </a-form-item>          
          <a-form-item name="notes" label="Catatan"
            :rules="[{ required: selectedItem ? false : true, message: 'Catatan harus diisi' }]">
            <a-textarea v-model:value="state.notes" placeholder="Catatan dari pasien...." :maxlength="255"
              :auto-size="{ minRows: 3, maxRows: 5 }" allow-clear />
          </a-form-item>
          <a-row>
            <a-col :span="24" style="text-align: right">
              <a-button type="primary" html-type="submit">Simpan</a-button>
              <a-button style="margin: 0 8px">Clear</a-button>
            </a-col>
          </a-row>
        </a-card>
      </a-form>
    </a-col>
    <a-modal v-model:visible="isOpenPatient" width="75%" style="top:15px" :footer="null" @cancel="onAfterClose">
      <a-row :gutter="8" :style="{ marginTop: '25px' }">
        <a-col :span="24">
          <a-collapse>
            <a-collapse-panel key="1" header="Filter">
              <a-form :label-col="{ xl: 4 }" layout="vertical">
                <a-row :gutter="24">
                  <a-col :span="12">
                    <a-form-item label="Nama Pasien">
                      <a-input v-model:value="filterParam.name" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="No Member">
                      <a-input v-model:value="filterParam.code" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="Nama Pemilik">
                      <a-input v-model:value="filterParam.ownerName" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24" style="text-align: right">
                    <a-button type="primary" html-type="submit" :loading="isLoading" :disabled="isLoading"
                      @click="onSearch">Search</a-button>
                  </a-col>
							  </a-row>
              </a-form>
            </a-collapse-panel>
          </a-collapse>
        </a-col>
        <a-col :span="24">
          <a-table :columns="petTable.column" :data-source="petTable.data" :loading="isLoading" :pagination="pagination"
            @change="onChangeTable" :customRow="onItemEvent">
            <template #bodyCell="{ column, text }">
              <template v-if="column.key === 'gender'">{{ text.gender === 'male' ? 'Jantan' : 'Betina' }}</template>
              <template v-if="column.key === 'species'">{{ text.species === 'cat' ? 'Kucing' : 'Anjing' }}</template>
              <template v-if="column.key === 'owner'">{{ text.petOwner.name }}</template>
              <template v-if="column.key === 'action'">
                <span :style="{ cursor: 'pointer' }">
                  <mdi-icon icon="mdiCheckBold" class="icon" :style="{ color: '#72a400' }"
                    v-if="selectedItem === text.id" />
                  <mdi-icon icon="mdiCheck" class="icon" :style="{ color: '#999' }" v-else />
                </span>
              </template>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </a-modal>
  </a-row>
</template>

<script lang="ts" setup>
import { debounce } from 'underscore';

const router = useRouter();
const route = useRoute();

const isLoading = ref<boolean>(false)

const selectedItem = ref<string>('')
const isOpenPatient = ref<boolean>(false);

const filterParam = reactive<any>({
  name: '',
  code: '',
  ownerName: '',
})
const query = reactive<DataList>({
  count: 0,
  page: 1,
  perPage: 10,
});

const state = reactive<any>({
  patientType: 'new',
  gender: 'male',
  species: 'cat',
  ownerName: '',
  ownerCode: '',
  ownerPhone: '',
  ownerEmail: '',
  ownerAddress: '',
  petId: '',
  petOwnerId: '',
})

const petTable = reactive({
  data: [] as any,
  column: [{
    title: 'Nama',
    dataIndex: 'name'
  }, {
    title: 'Jenis Kelamin',
    key: 'gender'
  }, {
    title: 'Breed',
    dataIndex: 'breed'
  }, {
    title: 'Spesies',
    key: 'species'
  }, {
    title: 'Pemilik',
    key: 'owner'
  }, {
    title: 'Klik u/ Pilih',
    key: 'action'
  }]
})

const doctorState = reactive({
  data: [] as any,
  fetching: false,
  loading: false
})

const fetchData = async () => {
  try {
    isLoading.value = true;

    const { data, error } = await useFetch('/api/pets/list', {
      method: 'GET',
      query: {
        ...filterParam,
        page: query.page,
        perPage: query.perPage
      }
    });

    isLoading.value = false;

    if (error.value) {
      notification.error({
        message: 'Gagal',
        description: 'Ada kesalahan pada saat ambil data, coba lagi atau hubungi tim teknis'
      });
      return
    }

    const dataList: DataList = data.value as DataList;

    petTable.data = dataList.rows;

    query.count = dataList.count;
    query.page = dataList.page;
    query.perPage = dataList.perPage;
  } catch (err) {
    isLoading.value = false;
    notification.error({
      message: 'Gagal',
      description: 'Ada kesalahan pada saat ambil data, coba lagi atau hubungi tim teknis'
    });
  }
}

const pagination = computed(() => ({
  total: query.count,
  current: query.page,
  pageSize: query.perPage
}));

const onChangeTable = ({ current = 25, pageSize = 1 }) => {
  query.page = current
  query.perPage = pageSize

  fetchData()
};

const onSearch = () => {
  fetchData();
}

const onItemEvent = (record: any) => ({
  onDblclick: () => onSelectItem(record)
})

const onSelectItem = async ({ id }: { id: string }) => {
  selectedItem.value = id;

  try {
    isLoading.value = true

    const { data, error } = await useFetch(`/api/pets/show`, {
      params: {
        id
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

    state.patientType = 'old';

    Object.assign(state, {
      ...item.data,
      additional: parseAdditional(item.data?.additional)
    })

    state.ownerName = item.data?.petOwner?.name
    state.ownerCode = item.data?.petOwner?.code
    state.ownerPhone = item.data?.petOwner?.phone
    state.ownerEmail = item.data?.petOwner?.email
    state.ownerAddress = item.data?.petOwner?.address

    state.petId = item.data?.id
    state.petOwnerId = item.data?.petOwner.id

    await nextTick()

    router.replace({ query: {} })

    isOpenPatient.value = false
  } catch (err) {
    isLoading.value = false
    notification.error({
      message: 'Gagal',
      description: 'Ada kesalahan pada saat ambil data, coba lagi atau hubungi tim teknis'
    });
  }
}

let lastFetchId = 0;
const fetchDoctor = debounce(async (value: any) => {
  lastFetchId += 1;
  const fetchId = lastFetchId;
  doctorState.fetching = true;
  doctorState.loading = true;

  const { data, error } = await useFetch('/api/doctors/list', {
    query: {
      name: value,
      page: 1,
      perPage: 25
    }
  });

  doctorState.loading = false;

  if (fetchId !== lastFetchId) {
    return;
  }

  const dataList: DataList = data.value as DataList;

  doctorState.data = dataList.rows?.map((item: any) => ({
    label: item.name,
    value: item.id
  })) ?? [];

  doctorState.fetching = false;
}, 300)

const onChangePatientType = (e: any) => {
  if (e.target.value === 'old') {
    router.push({
      query: {
        open: 'patient'
      }
    })

    fetchData();

    isOpenPatient.value = true;
    return;
  }

  if (e.target.value === 'new' && selectedItem.value) {
    state.patientType = 'old'

    Modal.confirm({
      title: 'Apakah anda yakin ingin mengubahnya?',
      content: 'Field akan di kosongkan jika anda mengubahnya',
      onOk() {
        state.patientType = 'new'
        state.gender = 'male'
        state.species = 'cat'
        state.ownerName = ''
        state.ownerCode = ''
        state.ownerPhone = ''
        state.ownerEmail = ''
        state.ownerAddress = ''
        state.petId = ''
        state.petOwnerId = ''
      },
      onCancel() {
        state.patientType = 'old'
        Modal.destroyAll();
      },
    });    
    return;
  }

  isOpenPatient.value = false;

  const name = route.name?.toString()
  router.replace({ name: name });
}

const onAfterClose = () => {
  router.replace({ query: {} })

  if(!selectedItem.value) {
    state.patientType = 'new'
  }

  isOpenPatient.value = false
}

const onFinishFailed = (e: any) => {
  if (e.errorFields.length > 0) return;
}

const onFinish = async (e: any) => {
  if (state.patientType === 'old' && !selectedItem.value) {
    message.error('Silahkan lengkapi data pet terlebih dahulu!');
    return;
  }

  try {
    isLoading.value = true;

    const params = {
      doctorId: state.doctorId,

      visitAt: state.visitAt,
      visitTime: state.visitTime,
      notes: state.notes,

      ...(state.petId && { petId: state.petId }),
      ...(state.petOwnerId && { petOwnerId: state.petOwnerId }),      
    }

    if(!selectedItem.value) {
      Object.assign(params, {
        name: state.name,
        gender: state.gender,
        species: state.species,

        ownerName: state.ownerName,
        ownerPhone: state.ownerPhone,
        ownerEmail: state.ownerEmail,
        ownerAddress: state.ownerAddress,
      })
    }

    const { data, error } = await useFetch('/api/appointment/create', {
      method: 'POST',
      body: params
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
      description: item?.message ?? 'Reservasi berhasil dibuat'
    });

    navigateTo('/appointment')
  } catch (err) {
    isLoading.value = false;

    notification.error({
      message: 'Gagal',
      description: 'Ada kesalahan pada saat input, periksa kembali inputan anda.'
    });
  }
}

onBeforeMount(() => {
  if (route.query?.open) {
    fetchData();
    state.patientType = 'old';
    isOpenPatient.value = true
    return;
  }
})
</script>