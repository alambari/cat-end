export default defineEventHandler(() => {
  return [
      {
        path: '/',
        name: 'Dashboard',
        icon: 'mdiViewDashboard'
      },
      {
        path: '/appointment',
        name: 'Reservasi',
        icon: 'mdiNotebookOutline'
      },
      {
        path: '/pets',
        name: 'Pets',
        icon: 'mdiPaw',
        subMenu: [
          {
            path: '/pet',
            name: 'Pet',
            icon: 'mdiCat',
          },
          {
            path: '/pet-owner',
            name: 'Pemilik',
            icon: 'mdiFaceManShimmerOutline',
          },
        ]
      },
      {
        path: '/doctor',
        name: 'Dokter',
        icon: 'mdiDoctor'
      },
      {
        path: '/medical-records',
        name: 'Rekam Medis',
        icon: 'mdiHistory',
        subMenu: [
          {
            path: '/check-up',
            name: 'Pemeriksaan',
            icon: 'mdiStethoscope',
          },
          {
            path: '/histories',
            name: 'Data Riwayat',
            icon: 'mdiDatabaseOutline',
          },
        ]
      }
    ]
})