<template>
	<a-row :gutter="24">
		<a-col :span="24" class="mb-24">
			<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{ padding: 0, }">
				<template #title>
					<a-row align="middle">
						<a-col :span="24" :md="12">
							<h5 class="font-semibold m-0">Dokter</h5>
						</a-col>
						<a-col :span="24" :md="12" class="flex align-item-middle justify-end">
							<my-button type="primary" ghost :to="{ path: '/doctor/new' }">
								<plus-outlined />
								<span>Tambah</span>
							</my-button>
						</a-col>
					</a-row>
				</template>
				<a-table :columns="doctorTable.column" :data-source="doctorTable.data" :loading="isLoading"
					:pagination="pagination" @change="onChangeTable">
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
											<NuxtLink :to="{ path: `/doctor/${text.id}`, replace: true }">
												<mdi-icon icon="mdiEyeOutline" class="icon" />
												<span class="ml-10">Lihat</span>
											</NuxtLink>
										</a-menu-item>
										<a-menu-item>
											<NuxtLink :to="{ path: `/doctor/${text.id}/edit`, replace: true }">
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
</template>

<script lang="ts" setup>
import { omit } from 'underscore';

const isLoading = ref<boolean>(true)
const query = reactive<DataList>({
	count: 0,
	page: 1,
	perPage: 25
});

const doctorTable = reactive<any>({
	data: [] as any,
	column: [{
		title: 'Nama',
		dataIndex: 'name'
	}, {
		title: 'Jenis Kelamin',
		key: 'gender'
	}, {
		title: 'No. Tlp',
		dataIndex: 'phone'
	}, {
		title: 'Email',
		dataIndex: 'email'
	}, {
		title: 'Spesialis',
		dataIndex: 'specialist'
	}, {
		title: 'Alamat',
		dataIndex: 'address'
	}, {
		title: '',
		key: 'action',
		width: 50,
	}]

})

const pagination = computed(() => ({
	total: query.count,
	current: query.page,
	pageSize: query.perPage
}));

const fetchData = async () => {
	try {
		isLoading.value = true;

		const { data, error } = await useFetch('/api/doctors/list', {
			query: omit(query, 'count')
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

		doctorTable.data = dataList.rows;

		query.count = dataList.count;
		query.page = dataList.page;
		query.perPage = dataList.perPage;
	} catch (err) {
		isLoading.value = false

		notification.error({
			message: 'Gagal',
			description: 'Ada kesalahan pada saat ambil data, coba lagi atau hubungi tim teknis.'
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