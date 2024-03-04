<template>
  <a-row :gutter="[12, 12]">
    <a-col :span="7">
      <a-card>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-row type="flex" justify="center" :align="'middle'" class="flex-col">
              <a-col :span="24" class="mb-24">
                <a-avatar :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }">U</a-avatar>
              </a-col>
              <a-col :span="24" class="flex flex-col text-center">
                <span class="text-lg font-semibold">{{ state?.name }}</span>
              </a-col>
            </a-row>
          </a-col>
          <a-divider></a-divider>
          <a-col :span="24">
            <a-row :gutter="12">
              <a-col :span="24" class="flex flex-col mb-24">
                <span class="font-semibold text-md">Nama Pemilik</span>
                <span>{{ state?.petOwner?.name }}</span>
              </a-col>
              <a-col :span="24" class="flex flex-col mb-24">
                <span class="font-semibold text-md">Kontak Pemilik</span>
                <span>{{ state?.petOwner?.phone }}</span>
              </a-col>
              <a-col :span="24" class="flex flex-col mb-24">
                <span class="font-semibold text-md">Status</span>
                <a-tag class="badge" color="success" v-if="state?.isActive">Aktif</a-tag>
                <a-tag class="badge" color="danger" v-if="!state?.isActive">Tidak Aktif</a-tag>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
    <a-col :span="17">
      <a-row :gutter="24">
        <a-col :span="24" class="mb-24">
          <a-card title="Info Dokter">
            <template #extra>
              <NuxtLink class="ant-btn ant-btn-primary ant-btn-background-ghost" :to="{ path: `${route.params.id}/edit` }">Edit</NuxtLink>
            </template>
            <a-row :gutter="12">
              <a-col :span="12">
                <a-row :gutter="12">
                  <a-col :span="24" class="flex flex-col mb-24">
                    <span class="font-semibold">Email</span>
                    <span>{{ state?.email ?? '-' }}</span>
                  </a-col>
                  <a-col :span="24" class="flex flex-col mb-24">
                    <span class="font-semibold">Tempat Lahir</span>
                    <span>{{ state?.birthplace ?? '-' }}</span>
                  </a-col>
                  <a-col :span="24" class="flex flex-col mb-24">
                    <span class="font-semibold">Alamat</span>
                    <span>{{ state?.address ?? '-' }}</span>
                  </a-col>
                </a-row>
              </a-col>
              <a-col :span="12">
                <a-row :gutter="12">
                  <a-col :span="24" class="flex flex-col mb-24">
                    <span class="font-semibold">No. Tlp</span>
                    <span>{{ state?.phone }}</span>
                  </a-col>
                  <a-col :span="24" class="flex flex-col mb-24">
                    <span class="font-semibold">Tgl. Lahir</span>
                    <span>{{ state?.birthday ?? '-' }}</span>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
        <a-col :span="24">
          <a-card title="Riwayat Periksa Pasien">
            <a-table :columns="resumeTable.column" :data-source="resumeTable.data" :pagination="pagination" @change="onChangeTable"></a-table>
          </a-card>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
const route = useRoute();

const isLoading = ref<Boolean>(false)
const state = reactive<any>({})

const query = reactive<DataList>({
	count: 0,
	page: 1,
	perPage: 25
});

const resumeTable = reactive({
	data: [] as any,
	column: [{
		title: 'Tanggal',
		dataIndex: 'createdAt'
	}, {
		title: 'Nama Pasien',
		dataIndex: 'petName'
	}, {
		title: 'Nama Pemilik',
		key: 'ownerName'
	}, {
		title: 'Diagnosa',
		dataIndex: 'diagnose'
	}, {
		title: '',
		key: 'action',
		width: 50,
	}]
});

const pagination = computed(() => ({
	total: query.count,
	current: query.page,
	pageSize: query.perPage
}));

const fetchData = async () => {
  try {
    isLoading.value = true;

    const [ showPet, listResume ] = await Promise.all([
      useFetch(`/api/doctors/show`, {
        params: {
          id: route.params.id
        }
      }),
      useFetch(`/api/medical-check/list`, {
        query: {
          doctorId: route.params.id
        }
      })
    ])

    isLoading.value = false;

    if (showPet.error.value || listResume.error.value) {
      notification.error({
        message: 'Gagal',
        description: 'Ada kesalahan pada saat ambil data, coba lagi atau hubungi tim teknis'
      });
      return;
    }

    const item = showPet.data.value as DataItem;

    Object.assign(state, {
      ...item.data,
      additional: parseAdditional(item.data?.additional)      
    })

    const dataList = listResume.data.value as DataList

    resumeTable.data = dataList.rows

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

const onChangeTable = ({ current = 25, pageSize = 1 }) => {
	query.page = current
	query.perPage = pageSize

	fetchData()
};

fetchData()
</script> 
