<script setup>
import { freeSet } from '@coreui/icons'

const icons = freeSet
</script>

<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <h5 class="my-0">Detil Transaksi</h5>
        </CCardHeader>

        <CRow>
          <CCol :xs="6">
            <CCardBody>
              <CTable>
                <CTableBody v-for="transaction in transaction" :key="transaction.id">
                  <CTableRow>
                    <CTableDataCell>ID Transaksi</CTableDataCell>
                    <CTableDataCell>:</CTableDataCell>
                    <CTableDataCell>{{ transaction.id }}</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Pembayaran</CTableDataCell>
                    <CTableDataCell>:</CTableDataCell>
                    <CTableDataCell>{{ transaction.paymentMethod }}</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Tanggal</CTableDataCell>
                    <CTableDataCell>:</CTableDataCell>
                    <CTableDataCell>{{ transaction.date }}</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Waktu</CTableDataCell>
                    <CTableDataCell>:</CTableDataCell>
                    <CTableDataCell>{{ transaction.time }}</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Kasir</CTableDataCell>
                    <CTableDataCell>:</CTableDataCell>
                    <CTableDataCell>{{ transaction.cashier }}</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCol>
        </CRow>

        <CCardBody>
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
              <CTableRow v-for="(detail, index) in detail_transaction" :key="detail.id">
                <CTableHeaderCell scope="row">{{ index + 1 }}.</CTableHeaderCell>
                <CTableDataCell>{{ detail.menu }}</CTableDataCell>
                <CTableDataCell>{{ detail.category }}</CTableDataCell>
                <CTableDataCell>{{ detail.quantity }}</CTableDataCell>
                <CTableDataCell>{{ detail.price }}</CTableDataCell>
                <CTableDataCell>{{ detail.total_price }}</CTableDataCell>
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

        <CCardHeader>
          <CButton as="a" href="/transactions" color="primary" size="md" class="text-white me-1">
            <CIcon :content="icons.cilChevronCircleLeftAlt" />
            Kembali
          </CButton>
        </CCardHeader>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      detail_transaction: [
        {
          id: 1,
          menu: 'Lupis',
          category: 'Makanan',
          quantity: 3,
          price: new Intl.NumberFormat('id', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(5000),
          total_price: new Intl.NumberFormat('id', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(15000),
        },
        {
          id: 2,
          menu: 'Bakwan',
          category: 'Makanan',
          quantity: 5,
          price: new Intl.NumberFormat('id', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(2000),
          total_price: new Intl.NumberFormat('id', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(10000),
        },
        {
          menu: 'Lontong',
          category: 'Makanan',
          quantity: 5,
          price: new Intl.NumberFormat('id', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(2000),
          total_price: new Intl.NumberFormat('id', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(10000),
        },
      ],
      transaction: [
        {
          id: 'TRX001',
          totalItem: 5,
          totalQty: 7,
          nominal: new Intl.NumberFormat('id', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(312000),
          paymentMethod: 'Cash',
          date: '2024-02-02',
          time: '11:00:00',
          cashier: 'Rio',
        },
      ],
    }
  },
  created() {
    this.id = this.$route.params.id
    console.log(this.id)
  },
}
</script>
