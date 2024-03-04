<template>
	<a-row :gutter="24" type="flex">
		<a-col :span="24" class="mb-24">
			<a-collapse>
				<a-collapse-panel key="1" header="Filter">
					<a-form name="nest-messages" :labelCol="{ xl: 6 }" :wrapperCol="{ xl: 24 }" layout="vertical">
						<a-card :bordered="false" class="header-solid h-full title-border-bottom">
							<a-row :gutter="24">
								<a-col :md="12">
									<a-form-item label="Nama">
										<a-input v-model:value="filter.name"></a-input>
									</a-form-item>
								</a-col>
								<a-col :md="12">
									<a-form-item label="No Member">
										<a-input v-model:value="filter.code"></a-input>
									</a-form-item>
								</a-col>
							</a-row>
							<a-row :gutter="24">
								<a-col :md="12">
									<a-form-item label="Jenis Kelamin">
										<a-select v-model:value="filter.gender">
											<a-select-option value="">Semua</a-select-option>
											<a-select-option value="male">Jantan</a-select-option>
											<a-select-option value="female">Betina</a-select-option>
											<a-select-option value="other">Lainnya</a-select-option>
										</a-select>
									</a-form-item>
								</a-col>
								<a-col :md="12">
									<a-form-item label="Jenis Hewan">
										<a-select v-model:value="filter.species">
											<a-select-option value="">Semua</a-select-option>
											<a-select-option value="cat">Kucing</a-select-option>
											<a-select-option value="dog">Anjing</a-select-option>
										</a-select>
									</a-form-item>
								</a-col>
							</a-row>
							<a-row :gutter="24">
								<a-col :md="12">
									<a-form-item label="Ras">
										<a-input v-model:value="filter.breed"></a-input>
									</a-form-item>
								</a-col>
							</a-row>
							<a-row>
								<a-col :span="24" style="text-align: right">
									<a-button type="primary" html-type="submit" :loading="isLoading" :disabled="isLoading"
										@click="onSearch">Cari</a-button>
									<a-button style="margin: 0 8px" :loading="isLoading" @click="onClear">Clear</a-button>
								</a-col>
							</a-row>
						</a-card>
					</a-form>
				</a-collapse-panel>
			</a-collapse>
		</a-col>
		<a-col :span="24" class="mb-24">
			<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{ padding: 0, }">
				<template #title>
					<a-row type="flex" align="middle">
						<a-col :span="24" :md="12">
							<h5 class="font-semibold m-0">Pets</h5>
						</a-col>
						<a-col :span="24" :md="12" class="flex align-item-middle justify-end">
							<my-button type="primary" ghost :to="{ path: '/pets/pet/new' }">
								<plus-outlined/>
								<span>Tambah</span>
							</my-button>
						</a-col>
					</a-row>
				</template>
				<a-table :columns="petTable.column" :data-source="petTable.data" :loading="isLoading" :pagination="pagination"
					@change="onChangeTable">
					<template #bodyCell="{ column, text }">
						<template v-if="column.key === 'gender'">{{ text.gender == 'female' ? 'Betina' : 'Jantan' }}</template>
						<template v-if="column.key === 'owner'">{{ text.petOwner.name }}</template>
						<template v-if="column.key === 'action'">
							<a-dropdown :trigger="['click']">
								<a class="ant-dropdown-link" @click.prevent>
									<mdi-icon icon="mdiDotsVertical" class="icon" />
								</a>
								<template #overlay>
									<a-menu style="min-width:150px">
										<a-menu-item>
											<NuxtLink :to="{ path: `/pets/pet/${text.id}`, replace: true }">
												<mdi-icon icon="mdiEyeOutline" class="icon" />
												<span class="ml-10">Lihat</span>
											</NuxtLink>
										</a-menu-item>
										<a-menu-item>
											<NuxtLink :to="{ path: `/pets/pet/${text.id}/edit`, replace: true }">
												<mdi-icon icon="mdiPencilOutline" class="icon" />
												<span class="ml-10">Edit</span>
											</NuxtLink>
										</a-menu-item>
										<a-menu-divider />
										<a-menu-item>
											<NuxtLink :to="{ path: `/pets/pet/${text.id}/history`, replace: true }">
												<mdi-icon icon="mdiHistory" class="icon" />
												<span class="ml-10">Lihat Rekam Medis</span>
											</NuxtLink>
										</a-menu-item>
									</a-menu>
								</template>
							</a-dropdown>
						</template>
					</template>
				</a-table>
			</a-card>
		</a-col>
	</a-row>
</template>

<script lang="ts" setup>
import { pick } from 'underscore';

const router = useRouter();
const route = useRoute();

const isLoading = ref<boolean>(true)
const query = reactive<DataList>({
	count: 0,
	page: 1,
	perPage: 25
});

const filter = reactive({
	name: '',
	code: '',
	species: '',
	gender: '',
	breed: ''
});

const petTable = reactive({
	data: [] as any,
	column: [{
		title: 'Nama',
		dataIndex: 'name'
	}, {
		title: 'No Member',
		dataIndex: 'code'
	}, {
		title: 'Jenis Kelamin',
		key: 'gender'
	}, {
		title: 'Jenis Hewan',
		dataIndex: 'species'
	}, {
		title: 'Ras',
		dataIndex: 'breed'
	}, {
		title: 'Pemilik',
		key: 'owner'
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
		const q = Object.assign(filter, {
			page: query.page,
			perPage: query.perPage
		})

		const { data, error } = await useFetch('/api/pets/list', {
			method: 'GET',
			query: q
		});

		isLoading.value = false

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
	} catch(err) {
		isLoading.value = false
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

const onSearch = () => {
	fetchData();

	router.push({
		query: pick(filter, v => v != '')
	})
}

const onClear = () => {
	filter.breed = ''
	filter.code = ''
	filter.gender = ''
	filter.name = ''
	filter.species = ''

	fetchData()

	router.push({
		query: filter
	})
}

onBeforeMount(() => {
	Object.assign(filter, pick(route.query, v => v != ''))
})

fetchData()
</script>