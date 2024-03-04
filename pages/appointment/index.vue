<template>
	<a-row :gutter="24">
		<a-col :span="24" class="mb-24">
			<a-collapse>
				<a-collapse-panel key="1" header="Filter">
					<a-form name="nest-messages" :labelCol="{ xl: 6 }" :wrapperCol="{ xl: 24 }" layout="vertical">
						<a-card :bordered="false" class="header-solid h-full title-border-bottom">
							<a-row :gutter="24">
								<a-col :md="12">
									<a-form-item label="Tgl. Mulai">
										<a-date-picker v-model:value="startEndAt.startAt" format="YYYY-MM-DD HH:mm:ss"
											:show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"></a-date-picker>
									</a-form-item>
								</a-col>
								<a-col :md="12">
									<a-form-item label="Tgl. Akhir">
										<a-date-picker v-model:value="startEndAt.endAt" format="YYYY-MM-DD HH:mm:ss"
											:show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"></a-date-picker>
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
					<a-row align="middle">
						<a-col :span="24" :md="12">
							<h5 class="font-semibold m-0">Daftar Reservasi</h5>
						</a-col>
						<a-col :span="24" :md="12" class="flex align-item-middle justify-end">
							<my-button type="primary" ghost :to="{ path: '/appointment/new' }">
								<plus-outlined />
								<span>Reservasi</span>
							</my-button>
						</a-col>
					</a-row>
				</template>
				<a-table :columns="rvsTable.column" :data-source="rvsTable.data" :loading="isLoading"
					:pagination="pagination" @change="onChangeTable">
					<template #bodyCell="{ column, text }">
						<template v-if="column.key === 'visit'">{{ text.visitAt }} {{ text.visitTime }}</template>
						<template v-if="column.key === 'petName'">{{ text.pet.name }}</template>
						<template v-if="column.key === 'petGender'">{{ text.pet.gender === 'male' ? 'Jantan' : 'Betina' }}</template>
						<template v-if="column.key === 'ownerName'">{{ text.petOwner.name }}</template>
						<template v-if="column.key === 'ownerPhone'">{{ text.petOwner.phone }}</template>
						<template v-if="column.key === 'status'">
							<span>
								<a-tag color="default" v-if="text.status === 'new'">New</a-tag>
								<a-tag color="red" v-if="text.status === 'canceled'">Batal</a-tag>
							</span>
						</template>
						<template v-if="column.key === 'action'">
							<a-dropdown :trigger="['click']">
								<a class="ant-dropdown-link" @click.prevent>
									<mdi-icon icon="mdiDotsVertical" class="icon" />
								</a>
								<template #overlay>
									<a-menu style="min-width:150px">
										<a-menu-item :disabled="text.status === 'canceled'">
											<NuxtLink target="_blank" @click.prevent="onVisibleCancel(text)">
												<mdi-icon icon="mdiCancel" class="icon" />
												<span class="ml-10">Batalkan</span>
											</NuxtLink>
										</a-menu-item>
										<a-menu-item :disabled="text.status === 'canceled'">
											<NuxtLink target="_blank" @click.prevent="onVisibleRegister(text)">
												<mdi-icon icon="mdiArrowRight" class="icon" />
												<span class="ml-10">Registrasi</span>
											</NuxtLink>
										</a-menu-item>
										<a-menu-divider />
									</a-menu>
								</template>
							</a-dropdown>
						</template>
					</template>
				</a-table>
			</a-card>
		</a-col>
	</a-row>
	<a-modal v-model:visible="isVisiblePopupCancel" :mask-closable="false" :closable="false" :footer="null">
		<a-row class="mb-24">
			<a-col :span="2">
				<mdi-icon icon="mdiInformationOutline" class="icon text-primary" />
			</a-col>
			<a-col :span="22">
				Pastikan pasien sudah memberikan konfirmasi jika membatalkan reservasi ini
			</a-col>
		</a-row>
		<a-form layout="vertical" :model="state" :hideRequiredMark="true" @finish="onSubmitCancel" @finish-failed="onFailedCancel">
			<a-form-item name="reason" label="Alasan" :rules="[{ required: true, message: 'Alasan harus diisi' }]" :colon="false">
				<a-textarea v-model:value="state.reason" placeholder="Jadwalkan ulang...." :maxlength="255"
					:auto-size="{ minRows: 3, maxRows: 5 }" allow-clear />
			</a-form-item>
			<a-form-item class="text-right">
				<a-button type="primary" :loading="isLoading" html-type="submit" class="mr-10">Simpan</a-button>
				<a-button @click="onCloseCancel">Close</a-button>
			</a-form-item>
		</a-form>
	</a-modal>
	<a-modal v-model:visible="isVisiblePopupRegister" okText="Register" :maskClosable="false" :closable="false" @cancel="onCloseRegister" @ok="onSubmitRegister">
		<a-row class="flex flex-row align-item-middle mb-24">
			<a-col :span="2">
				<mdi-icon icon="mdiInformationOutline" class="icon text-primary" />
			</a-col>
			<a-col :span="22">
				Registrasi pasien atas nama <strong>{{ state.name }}</strong>.
			</a-col>
		</a-row>
		<p class="text-md">
			Pastikan pasien sudah berada ditempat sebelum melakukan registrasi
		</p>
	</a-modal>
</template>

<script lang="ts" setup>
import { pick } from 'underscore';

const router = useRouter();
const dayjs = useDayjs()

const isLoading = ref<boolean>(false)
const isVisiblePopupRegister = ref<boolean>(false)
const isVisiblePopupCancel = ref<boolean>(false)

const state = reactive<any>({
	appointmentId: '',
	reason: '',
	name: ''
})

const query = reactive<DataList>({
	count: 0,
	page: 1,
	perPage: 25,
});

const startEndAt = reactive({
	startAt: dayjs(),
	endAt: dayjs(),
})

const filter = reactive({
	name: '',
	ownerName: '',
	status: ['new', 'canceled']
})

const rvsTable = reactive({
	data: [] as any,
	column: [{
		title: 'Kunjungan',
		key: 'visit'
	}, {
		title: 'Nama Pasien',
		key: 'petName'
	}, {
		title: 'Jenis Kelamin',
		key: 'petGender'
	}, {
		title: 'Nama Pemilik',
		key: 'ownerName'
	}, {
		title: 'No. Tlp',
		key: 'ownerPhone'
	}, {
		title: 'Status',
		key: 'status'
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

		const q = Object.assign(filter, {
			startAt: startEndAt.startAt.toISOString(),
			endAt: startEndAt.startAt.toISOString(),
			page: query.page,
			perPage: query.perPage
		})

		const { data, error } = await useFetch('/api/appointment/list', {
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

		rvsTable.data = dataList.rows;

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

const onVisibleCancel = (item: any) => {
	isVisiblePopupCancel.value = true;
	state.id = item.id
}

const onCloseCancel = () => {
	isVisiblePopupCancel.value = false;
	state.id = ''
	state.reason = ''
}

const onFailedCancel = (e: any) => {
	if (e.errorFields.length > 0) return;
}

const onSubmitCancel = async () => {
	try {
		isLoading.value = true;

		const { data, error } = await useFetch('/api/appointment/canceled', {
			method: 'PATCH',
			body: {
				id: state.id,
				reason: state.reason,
			}
		})

		isLoading.value = false;

		if (error.value) {
			isVisiblePopupCancel.value = false;

			notification.error({
				message: 'Gagal',
				description: 'Ada kesalahan pada saat input, periksa kembali inputan anda.'
			});
			return;
		}

		state.id = '';
		state.reason = '';

		isVisiblePopupCancel.value = false;

		notification.success({
			message: 'Berhasil',
			description: 'Appointment berhasil dibatalkan'
		});

		fetchData()
	} catch(err) {
		isLoading.value = false;
		isVisiblePopupCancel.value = false;

		notification.error({
			message: 'Gagal',
			description: 'Ada kesalahan pada saat input, periksa kembali inputan anda.'
		});
	}
}

const onVisibleRegister = (item: any) => {
	isVisiblePopupRegister.value = true
	state.name = item.pet.name
	state.id = item.id
}

const onCloseRegister = () => {
	isVisiblePopupRegister.value = false;
	state.id = ''
	state.name = ''
}

const onSubmitRegister = () => {
	navigateTo(`/appointment/${state.id}/confirmed`)
}

const onSearch = () => {
	fetchData();

	router.push({
		query: pick(filter, v => v != '')
	})
}

const onClear = () => {
	fetchData();
}

fetchData()

</script>