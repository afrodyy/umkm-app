<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <h5 class="my-0">Kategori Menu</h5>
        </CCardHeader>
        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                <CTableHeaderCell scope="col">Deskripsi</CTableHeaderCell>
                <CTableHeaderCell scope="col">Jumlah Menu</CTableHeaderCell>
                <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="(category, index) in categories" :key="category.id">
                <CTableHeaderCell scope="row">{{ index + 1 }}.</CTableHeaderCell>
                <CTableDataCell>{{ category.name }}</CTableDataCell>
                <CTableDataCell>{{ category.description }}</CTableDataCell>
                <CTableDataCell>{{ category.count }}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="info" size="sm" class="text-white me-1">Ubah</CButton>
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
      categories: [
        {
          id: 1,
          name: 'Makanan',
          description: 'Makanan enak',
          count: 10,
        },
        {
          id: 2,
          name: 'Minuman',
          description: 'Minuman segar',
          count: 10,
        },
      ],
    }
  },
}
</script>
