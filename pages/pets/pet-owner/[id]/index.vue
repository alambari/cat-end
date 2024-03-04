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
                <span class="text-md">{{ state?.code }}</span>
              </a-col>
            </a-row>
          </a-col>
          <a-divider></a-divider>
          <a-col :span="24">
            <a-row :gutter="12">
              <a-col :span="24" class="flex flex-col mb-24">
                <span class="font-semibold text-md">ID#</span>
                <span>{{ state.additional?.identityNumber ?? '-' }}</span>
              </a-col>
              <a-col :span="24" class="flex flex-col mb-24">
                <span class="font-semibold text-md">Terakhir Kunjungan</span>
                <span>{{ state.additional?.identityNumber ?? '-' }}</span>
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
          <a-card title="Info Pemilik">
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
          <a-card title="Daftar Hewan">
            <a-table :columns="petTable.column" :data-source="petTable.data" :pagination="pagination" @change="onChangeTable">
              <template #bodyCell="{ column, text }">
                <template v-if="column.key === 'gender'">{{ text.gender == 'female' ? 'Betina' : 'Jantan' }}</template>
                <template v-if="column.key === 'species'">{{ text.species == 'cat' ? 'Kucing' : 'Anjing' }}</template>
              </template>
            </a-table>
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

const petTable = reactive({
	data: [] as any,
	column: [{
		title: 'Nama',
		dataIndex: 'name'
	}, {
		title: 'Jenis Kelamin',
		key: 'gender'
	}, {
		title: 'Jenis Hewan',
		key: 'species'
	}, {
		title: 'Ras',
		dataIndex: 'breed'
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

    const [ showOwner, listPet ] = await Promise.all([
      useFetch(`/api/pet-owner/show`, {
        params: {
          id: route.params.id
        }
      }),
      useFetch(`/api/pets/list`, {
        query: {
          ownerId: route.params.id
        }
      })
    ])

    isLoading.value = false;

    if (showOwner.error.value || listPet.error.value) {
      notification.error({
        message: 'Gagal',
        description: 'Ada kesalahan pada saat ambil data, coba lagi atau hubungi tim teknis'
      });
      return;
    }

    const item = showOwner.data.value as DataItem;

    Object.assign(state, {
      ...item.data,
      additional: parseAdditional(item.data?.additional)      
    })

    const dataList = listPet.data.value as DataList

    petTable.data = dataList.rows

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
