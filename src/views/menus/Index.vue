<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardBody>
          <CRow class="g-3">
            <CCol xs>
              <CFormSelect id="filter" v-model="filter" @change="handleFilter">
                <option value="">-- Filter berdasarkan kategori --</option>
                <option value="Makanan">Makanan</option>
                <option value="Minuman">Minuman</option>
              </CFormSelect>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard class="mb-4">
        <CCardHeader>
          <h5 class="my-0">Daftar Menu</h5>
        </CCardHeader>
        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                <CTableHeaderCell scope="col">Kategori</CTableHeaderCell>
                <CTableHeaderCell scope="col">Deskripsi</CTableHeaderCell>
                <CTableHeaderCell scope="col">Harga</CTableHeaderCell>
                <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="(menu, index) in filteredMenus" :key="menu.id">
                <CTableHeaderCell scope="row">{{ index + 1 }}.</CTableHeaderCell>
                <CTableDataCell>{{ menu.name }}</CTableDataCell>
                <CTableDataCell>{{ menu.category }}</CTableDataCell>
                <CTableDataCell>{{ menu.description }}</CTableDataCell>
                <CTableDataCell>{{ menu.price }}</CTableDataCell>
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
      filter: '',
      menus: [
        {
          id: 1,
          name: 'Burger',
          category: 'Makanan',
          description: 'Roti isi daging',
          price: new Intl.NumberFormat('id', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(50000),
        },
        {
          id: 2,
          name: 'Nasi Goreng',
          category: 'Makanan',
          description: 'Nasi yang digoreng dengan bumbu khas',
          price: new Intl.NumberFormat('id', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(30000),
        },
        {
          id: 3,
          name: 'Es Teh',
          category: 'Minuman',
          description: 'Teh dengan es batu',
          price: new Intl.NumberFormat('id', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(10000),
        },
      ],
    }
  },
  computed: {
    filteredMenus() {
      if (!this.filter) {
        return this.menus
      }
      return this.menus.filter((menu) =>
        menu.category.toLowerCase().includes(this.filter.toLowerCase()),
      )
    },
  },
  methods: {
    handleFilter(e) {
      this.filter = e.target.value
    },
  },
}
</script>
