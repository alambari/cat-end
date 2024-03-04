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
                    <span class="text-lg font-semibold">{{ state?.pet?.name }}</span>
                    <span class="text-md">{{ state?.pet?.code }}</span>
                  </a-col>
                </a-row>
              </a-col>
              <a-divider></a-divider>
              <a-col :span="24">
                <a-row :gutter="12">
                  <a-col :span="24" class="flex flex-col mb-24">
                    <span class="font-semibold text-md">Jenis Kelamin</span>
                    <span v-if="state?.pet?.gender === 'male'">Jantan</span>
                    <span v-if="state?.pet?.gender === 'female'">Betina</span>
                  </a-col>
                  <a-col :span="24" class="flex flex-col mb-24">
                    <span class="font-semibold text-md">Jenis Hewan</span>
                    <span v-if="state?.pet?.species === 'cat'">Kucing</span>
                    <span v-if="state?.pet?.species === 'dog'">Anjing</span>
                  </a-col>
                  <a-col :span="24" class="flex flex-col mb-24">
                    <span class="font-semibold">Ras</span>
                    <span>{{ state?.pet?.breed }}</span>
                  </a-col>
                  <a-col :span="24" class="flex flex-col mb-24">
                    <span class="font-semibold">Bulu & Warna</span>
                    <span>{{ state?.pet?.additional?.color ?? '-' }}</span>
                  </a-col>
                  <a-col :span="24" class="flex flex-col mb-24">
                    <span class="font-semibold">Tanda Khusus</span>
                    <span>{{ state?.pet?.additional?.marks ?? '-' }}</span>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
        <a-col :span="24">
          <a-card title="Dokumen Penunjang">
            <a-row :gutter="12">
              <a-col :span="24" class="flex flex-col mb-24">
                <span class="font-semibold text-md">Cek Darah</span>
                <div class="flex flex-row justify-space-between">
                  <span>{{ state?.additional?.blood ?? 'Tidak ada' }}</span>
                  <a-button type="primary" ghost @click="onVisibleUpload('blood')">Upload</a-button>
                </div>
              </a-col>
              <a-col :span="24" class="flex flex-col mb-24">
                <span class="font-semibold text-md">X-Ray</span>
                <div class="flex flex-row justify-space-between">
                  <span>{{ state?.additional?.xray ?? 'Tidak ada' }}</span>
                  <a-button type="primary" ghost @click="onVisibleUpload('xray')">Upload</a-button>
                </div>
              </a-col>
            </a-row>            
          </a-card>
        </a-col>
      </a-row>
    </a-col>
    <a-col :xl="17" :span="24">
      <a-row :gutter="24">
        <a-col :span="24" class="mb-24">
          <a-card :bordered="false" class="header-solid title-border-bottom" title="Data Pasien">
            <a-row :gutter="12">
              <a-col :span="12" class="flex flex-col mb-24">
                <span class="font-bold">Sterilisasi</span>
                <span>{{ state?.steril ? 'Sudah' : 'Belum' }}</span>
              </a-col>
              <a-col :span="12" class="flex flex-col mb-24">
                <span>Berat Badan</span>
                <span>{{ state?.weight }}Kg</span>
              </a-col>
              <a-col :span="12" class="flex flex-col mb-24">
                <span>Tinggi</span>
                <span>{{ state?.height }}cm</span>
              </a-col>
              <a-col :span="12" class="flex flex-col mb-24">
                <span>Suhu Tubuh</span>
                <span>{{ state?.temperature }}°C</span>
              </a-col>
              <a-col :span="12" class="flex flex-col mb-24">
                <span class="font-bold">Usia</span>
                <span>{{ state?.age?.year }} Tahun {{ state?.age?.month }} Bulan {{
                  state?.age?.day }} Hari</span>
              </a-col>
              <a-divider></a-divider>
              <a-col :span="12" class="flex flex-col mb-24">
                <span class="font-bold">Perawatan Dirumah</span>
                <span v-if="state.common?.homecare === 'outdoor'">Outdoor</span>
                <span v-if="state.common?.homecare === 'indoor'">Indoor</span>
                <span v-if="state.common?.homecare === 'semi'">Semi</span>
                <span v-if="state.common?.homecare === 'other'">Lainnya</span>
              </a-col>
              <a-col :span="12" class="flex flex-col mb-24">
                <span class="font-bold">Tingkah Laku</span>
                <span v-if="state.common?.behaviour === 'fierce'">Galak</span>
                <span v-if="state.common?.behaviour === 'aggressive'">Agresif</span>
                <span v-if="state.common?.behaviour === 'coward'">Penakut</span>
                <span v-if="state.common?.behaviour === 'quietType'">Pendiam</span>
                <span v-if="state.common?.behaviour === 'other'">Lainnya</span>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
        <a-col :span="24" class="mb-24">
          <a-card :bordered="false" class="header-solid title-border-bottom" title="Anamnesa">
            <a-row :gutter="12">
              <a-col :span="12" class="flex flex-col mb-24">
                <span class="font-bold">Obat Cacing</span>
                <span>
                  {{ state?.anamnesis?.anthelmintic?.value ? 'Sudah' : 'Belum' }}
                  <span v-if="state?.anamnesis?.anthelmintic?.value"> - {{ state?.anamnesis?.anthelmintic?.date }}</span>
                </span>
              </a-col>
              <a-col :span="12" class="flex flex-col mb-24">
                <span class="font-bold">Vaksinasi</span>
                <span>
                  {{ state?.anamnesis?.vaccine?.value ? 'Sudah' : 'Belum' }}
                  <span v-if="state?.anamnesis?.vaccine?.value"> - {{ state?.anamnesis?.vaccine?.date }}</span>
                </span>
              </a-col>
              <a-col :span="12" class="flex flex-col mb-24">
                <span class="font-bold">Tetes Kutu</span>
                <span>
                  {{ state?.anamnesis?.fleaMedicine?.value ? 'Sudah' : 'Belum' }}
                  <span v-if="state?.anamnesis?.fleaMedicine?.value"> - {{ state?.anamnesis?.fleaMedicine?.date }}</span>
                </span>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
        <a-col :span="24">
          <a-card :bordered="false" class="header-solid title-border-bottom" title="Report">
            <template #extra>
							<a-button type="primary" ghost>
                <file-pdf-outlined />
								<span>Download PDF</span>
							</a-button>
            </template>            
            <a-row :gutter="12">
              <a-col :span="24" class="flex flex-col mb-24">
                <span class="font-bold">Keluhan</span>
                <p>{{ state?.complaint }}</p>
              </a-col>
              <a-col :span="24" class="flex flex-col mb-24">
                <span class="font-bold">Pemeriksaan Fisik</span>
                <p>{{ state?.physical }}</p>
              </a-col>
              <a-col :span="24" class="flex flex-col mb-24">
                <span class="font-bold">Diagnosa</span>
                <p>{{ state?.diagnose }}</p>
              </a-col>
              <a-col :span="24" class="flex flex-col mb-24">
                <span class="font-bold">Prognosa</span>
                <p>{{ state?.prognose }}</p>
              </a-col>
              <a-col :span="24" class="flex flex-col mb-24">
                <span class="font-bold">Tindakan</span>
                <p>{{ state?.treatment }}</p>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </a-col>
    <a-modal v-model:visible="isVisibleUpload" :title="state.titleUpload">
      <a-form :model="formUpload">
        <a-form-item name="file" no-style>
        <a-upload-dragger v-model:fileList="formUpload.fileList" name="file" action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
          <p class="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p class="ant-upload-text">Click or drag file to this area to upload</p>
        </a-upload-dragger>
      </a-form-item>
      </a-form>
    </a-modal>    
  </a-row>
</template>

<script lang="ts" setup>
const route = useRoute();

const isLoading = ref<boolean>(false)
const state = reactive<any>({
  titleUpload: 'Upload dokumen'
})
const isVisibleUpload = ref<boolean>(false)

const formUpload = reactive<any>({
  file: ''
})

const onVisibleUpload = (type: string) => {
  isVisibleUpload.value = true

  state.titleUpload = type == 'blood' ? 'Upload dokumen cek darah' : 'Upload dokumen X-Ray'
}

const onSubmitUpload = () => {

}

const fetchData = async () => {
  try {
    isLoading.value = true;

    const { data, error } = await useFetch(`/api/medical-check/show`, {
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

    Object.assign(state, {
      ...item.data,
      additional: parseAdditional(item?.data?.additional),
      pet: {
        ...item?.data?.pet,
        additional: parseAdditional(item?.data?.pet.additional)
      },
      petOwner: {
        ...item?.data?.petOwner,
        additional: parseAdditional(item?.data?.petOwner.additional)
      },
      doctor: {
        ...item?.data?.doctor,
        additional: parseAdditional(item?.data?.doctor.additional)
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