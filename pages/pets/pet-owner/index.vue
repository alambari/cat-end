<template>
	<div>
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
										<a-form-item label="No. Tlp">
											<a-input v-model:value="filter.phone"></a-input>
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
								<h5 class="font-semibold m-0">Pemilik</h5>
							</a-col>
							<a-col :span="24" :md="12" class="flex align-item-middle justify-end">
								<my-button type="primary" ghost :to="{ path: '/pets/pet-owner/new' }">
									<plus-outlined/>
									<span>Tambah</span>
								</my-button>
							</a-col>
						</a-row>
					</template>
					<a-table :columns="ownerTable.column" :data-source="ownerTable.data" :loading="isLoading" :pagination="pagination"
						@change="onChangeTable">
						<template #bodyCell="{ column, text }">
							<template v-if="column.key === 'gender'">{{ text.gender === 'male' ? 'Laki-laki' : 'Perempuan' }}</template>
							<template v-if="column.key === 'owner'">{{ text.petOwner.name }}</template>
							<template v-if="column.key === 'action'">
								<a-dropdown :trigger="['click']">
									<a class="ant-dropdown-link" @click.prevent>
										<mdi-icon icon="mdiDotsVertical" class="icon" />
									</a>
									<template #overlay>
										<a-menu style="min-width:150px">
											<a-menu-item>
												<NuxtLink :to="{ path: `/pets/pet-owner/${text.id}`, replace: true }">
													<mdi-icon icon="mdiEyeOutline" class="icon" />
													<span class="ml-10">Lihat</span>
												</NuxtLink>
											</a-menu-item>
											<a-menu-item>
												<NuxtLink :to="{ path: `/pets/pet-owner/${text.id}/edit`, replace: true }">
													<mdi-icon icon="mdiPencilOutline" class="icon" />
													<span class="ml-10">Edit</span>
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
	</div>
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
	phone: '',
});

const ownerTable = reactive({
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
		title: 'No. Tlp',
		dataIndex: 'phone'
	}, {
		title: 'Alamat',
		dataIndex: 'address'
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

		const { data, error } = await useFetch('/api/pet-owner/list', {
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

		ownerTable.data = dataList.rows;

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
	filter.name = ''
	filter.code = ''
	filter.phone = ''

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