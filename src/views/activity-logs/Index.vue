<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <h5 class="my-0">Log Aktifitas Pengguna</h5>
        </CCardHeader>
        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                <CTableHeaderCell scope="col">Aktifitas</CTableHeaderCell>
                <CTableHeaderCell scope="col">Tanggal</CTableHeaderCell>
                <CTableHeaderCell scope="col">Waktu</CTableHeaderCell>
                <CTableHeaderCell scope="col">OS</CTableHeaderCell>
                <CTableHeaderCell scope="col">Browser</CTableHeaderCell>
                <CTableHeaderCell scope="col">IP</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="(user, index) in users" :key="user.id">
                <CTableHeaderCell scope="row">{{ index + 1 }}.</CTableHeaderCell>
                <CTableDataCell>{{ user.name }}</CTableDataCell>
                <CTableDataCell>{{ user.username }}</CTableDataCell>
                <CTableDataCell>{{ user.activity }}</CTableDataCell>
                <CTableDataCell>{{ user.date }}</CTableDataCell>
                <CTableDataCell>{{ user.time }}</CTableDataCell>
                <CTableDataCell>{{ user.os }}</CTableDataCell>
                <CTableDataCell>{{ user.browser }}</CTableDataCell>
                <CTableDataCell>{{ user.ip }}</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {
          id: 1,
          name: 'Herdian Afrody',
          username: 'afrodyy',
          activity: 'Membuka menu transaksi',
          date: '2024-06-10',
          time: '21:53:00',
          os: 'Windows 10 Pro',
          browser: 'Chrome',
          ip: '192.168.20.32',
        },
      ],
    }
  },
}
</script>
