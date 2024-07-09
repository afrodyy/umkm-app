<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader>
          <h5 class="my-0">Proses Pesanan</h5>
        </CCardHeader>
        <CCardBody>
          <h6>Rincian Pesanan</h6>

          <CTable bordered hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Menu</CTableHeaderCell>
                <CTableHeaderCell scope="col">Kategori</CTableHeaderCell>
                <CTableHeaderCell scope="col">Kuantitas</CTableHeaderCell>
                <CTableHeaderCell scope="col">Harga</CTableHeaderCell>
                <CTableHeaderCell scope="col">Jumlah</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell scope="row">1.</CTableHeaderCell>
                <CTableDataCell>Burger</CTableDataCell>
                <CTableDataCell>Makanan</CTableDataCell>
                <CTableDataCell>3</CTableDataCell>
                <CTableDataCell>Rp. 16.000</CTableDataCell>
                <CTableDataCell>Rp. 48.000</CTableDataCell>
              </CTableRow>
            </CTableBody>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="row" colspan="5" class="text-center"
                  >Subtotal</CTableHeaderCell
                >
                <CTableHeaderCell>Rp. 35.000</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["cartState"]),
  },
  created() {
    console.log(this.cartState);
  },
};
</script>
