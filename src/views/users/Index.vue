<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <h5 class="my-0">Daftar Pengguna Aplikasi</h5>
        </CCardHeader>
        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">No. Telpon</CTableHeaderCell>
                <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="(user, index) in users" :key="user.id">
                <CTableHeaderCell scope="row">{{ index + 1 }}.</CTableHeaderCell>
                <CTableDataCell>{{ user.name }}</CTableDataCell>
                <CTableDataCell>{{ user.username }}</CTableDataCell>
                <CTableDataCell>{{ user.email }}</CTableDataCell>
                <CTableDataCell>{{ user.phone }}</CTableDataCell>
                <CTableDataCell>{{ user.role }}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="info" size="sm" class="me-1 text-white">Ubah</CButton>
                  <CButton color="danger" size="sm" class="text-white">Hapus</CButton>
                </CTableDataCell>
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
          email: 'herdianafrody@gmail.com',
          phone: '082130251981',
          role: 'administrator',
        },
      ],
    }
  },
}
</script>
