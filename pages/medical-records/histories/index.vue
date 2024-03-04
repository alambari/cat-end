<template>
	<a-row :gutter="24" type="flex">
		<a-col :span="24" class="mb-24">
			<a-collapse>
				<a-collapse-panel key="1" header="Filter">
					<a-form name="nest-messages" :labelCol="{ xl: 6 }" :wrapperCol="{ xl: 24 }" layout="vertical">
						<a-card :bordered="false" class="header-solid h-full title-border-bottom">
							<a-row :gutter="24">
								<a-col :md="12">
									<a-form-item label="Tgl. Mulai">
										<a-date-picker v-model:value="startEndAt.startAt" format="YYYY-MM-DD HH:mm:ss" :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"></a-date-picker>
									</a-form-item>
								</a-col>
								<a-col :md="12">
									<a-form-item label="Tgl. Akhir">
										<a-date-picker v-model:value="startEndAt.endAt" format="YYYY-MM-DD HH:mm:ss" :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"></a-date-picker>
									</a-form-item>
								</a-col>
							</a-row>
							<a-row :gutter="24">
								<a-col :md="12">
									<a-form-item label="Nama Pasien">
										<a-input v-model:value="filter.name"></a-input>
									</a-form-item>
								</a-col>
								<a-col :md="12">
									<a-form-item label="Nama Pemilik">
										<a-input v-model:value="filter.ownerName"></a-input>
									</a-form-item>
								</a-col>
							</a-row>
							<a-row :gutter="24">
								<a-col :md="12">
									<a-form-item label="Nama Nakes">
										<a-input v-model:value="filter.doctorName"></a-input>
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
				<a-table :columns="medCheckTable.column" :data-source="medCheckTable.data" :loading="isLoading"
					:pagination="pagination" @change="onChangeTable">
					<template #bodyCell="{ column, text }">
						<template v-if="column.key === 'visit'"> {{ text.visitAt }} {{ text.visitTime }}</template>
						<template v-if="column.key === 'pet'">
							<span class="block">{{ text.pet.name }}</span>
							<span class="block">{{ text.pet.species }}</span>
							<span class="block">{{ text.pet.gender }}</span>
						</template>
						<template v-if="column.key === 'owner'">{{ text.petOwner.name }}</template>
						<template v-if="column.key === 'doctor'">{{ text.doctor.name }}</template>
						<template v-if="column.key === 'diagnose'">
							<p>{{ text.diagnose }}</p>
						</template>
						<template v-if="column.key === 'action'">
							<a-dropdown :trigger="['click']">
								<a class="ant-dropdown-link" @click.prevent>
									<mdi-icon icon="mdiDotsVertical" class="icon" />
								</a>
								<template #overlay>
									<a-menu style="min-width:150px">
										<a-menu-item>
											<NuxtLink :to="{ path: `/medical-records/histories/${text.id}`, replace: true }">
												<mdi-icon icon="mdiEyeOutline" class="icon" />
												<span class="ml-10">Lihat Resume</span>
											</NuxtLink>
										</a-menu-item>
										<a-menu-divider />
										<a-menu-item>
											<a-button type="text" disabled>
												<cloud-download-outlined/>
												<span class="ml-10">Download PDF</span>
											</a-button>
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
import dayjs, { Dayjs } from 'dayjs';
import { omit, pick } from 'underscore';

const router = useRouter();
const route = useRoute();

const isLoading = ref<boolean>(true)
const query = reactive<DataList>({
	count: 0,
	page: 1,
	perPage: 25,
});

const tabMenu = ref<string[]>(['confirmed'])

const startEndAt = reactive({
	startAt: ref<Dayjs>(dayjs()),
	endAt: ref<Dayjs>(dayjs()),
})

const filter = reactive({
	name: '',
	ownerName: '',
	doctorName: '',
});

const medCheckTable = reactive({
	data: [] as any,
	column: [{
		title: 'Kunjungan',
		key: 'visit'
	}, {
		title: 'Nama Pasien',
		key: 'pet'
	}, {
		title: 'Nama Pemilik',
		key: 'owner'
	}, {
		title: 'Nakes',
		key: 'doctor'
	}, {
		title: 'Diagnosa',
		key: 'diagnose'
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

		const { data, error } = await useFetch('/api/medical-check/list', { 
			method: 'GET',
			query: {
				...filter,
				startAt: startEndAt.startAt.toISOString(),
				endAt: startEndAt.startAt.toISOString(),
				page: query.page,
				perPage: query.perPage
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

		const dataList: DataList = data.value as DataList;

		medCheckTable.data = dataList.rows;

		query.count = dataList.count;
		query.page = dataList.page;
		query.perPage = dataList.perPage;
	} catch(err) {
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

const onSearch = () => {
	router.push({
		query: pick(filter, v => v != '')
	})

	fetchData();
}

const onClear = () => {
	filter.name = ''
	filter.ownerName = ''
	filter.doctorName = ''

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