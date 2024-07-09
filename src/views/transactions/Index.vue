<script setup>
import { freeSet } from "@coreui/icons";

const icons = freeSet;
</script>

<template>
  <CRow>
    <CCol :xs="12">
      <!-- Filter -->
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
      <!-- End of Filter -->

      <!-- Main Content -->
      <CCard class="mb-4">
        <CCardHeader>
          <h5 class="my-0">Daftar Menu</h5>
        </CCardHeader>
        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Total Item</CTableHeaderCell>
                <CTableHeaderCell scope="col">Kuantitas</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nominal</CTableHeaderCell>
                <CTableHeaderCell scope="col">Pembayaran</CTableHeaderCell>
                <CTableHeaderCell scope="col">Tanggal</CTableHeaderCell>
                <CTableHeaderCell scope="col">Waktu</CTableHeaderCell>
                <CTableHeaderCell scope="col">Kasir</CTableHeaderCell>
                <CTableHeaderCell scope="col">View</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow
                v-for="(transaction, index) in filteredTransactions"
                :key="transaction.id"
              >
                <CTableHeaderCell scope="row"
                  >{{ index + 1 }}.</CTableHeaderCell
                >
                <CTableDataCell>{{ transaction.id }}</CTableDataCell>
                <CTableDataCell>{{ transaction.totalItem }}</CTableDataCell>
                <CTableDataCell>{{ transaction.totalQty }}</CTableDataCell>
                <CTableDataCell>{{ transaction.nominal }}</CTableDataCell>
                <CTableDataCell>{{ transaction.paymentMethod }}</CTableDataCell>
                <CTableDataCell>{{ transaction.date }}</CTableDataCell>
                <CTableDataCell>{{ transaction.time }}</CTableDataCell>
                <CTableDataCell>{{ transaction.cashier }}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="primary"
                    class="text-white me-1"
                    @click="viewDetail(transaction.id)"
                  >
                    <CIcon :content="icons.cilZoomIn" />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      <!-- End of Main Content -->
    </CCol>
  </CRow>
</template>

<script>
export default {
  data() {
    return {
      filter: "",
      transactions: [
        {
          id: "TRX001",
          totalItem: 5,
          totalQty: 7,
          nominal: new Intl.NumberFormat("id", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(312000),
          paymentMethod: "Cash",
          date: "2024-02-02",
          time: "11:00:00",
          cashier: "Rio",
        },
        {
          id: "TRX002",
          totalItem: 3,
          totalQty: 3,
          nominal: new Intl.NumberFormat("id", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(111000),
          paymentMethod: "Credit",
          date: "2024-02-02",
          time: "11:15:00",
          cashier: "Rio",
        },
        {
          id: "TRX003",
          totalItem: 8,
          totalQty: 10,
          nominal: new Intl.NumberFormat("id", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(555000),
          paymentMethod: "Credit",
          date: "2024-02-03",
          time: "19:15:00",
          cashier: "Rio",
        },
      ],
    };
  },
  computed: {
    filteredTransactions() {
      if (!this.filter) {
        return this.transactions;
      }
      return this.transactions.filter((transaction) =>
        transaction.paymentMethod
          .toLowerCase()
          .includes(this.filter.toLowerCase())
      );
    },
  },
  methods: {
    handleFilter(e) {
      this.filter = e.target.value;
    },
    viewDetail(id) {
      console.log(id);
      this.$router.push({ name: "Detil Transaksi", params: { id } });
    },
  },
};
</script>
