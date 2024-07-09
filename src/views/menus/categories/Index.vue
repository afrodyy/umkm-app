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
              <CTableRow
                v-for="(category, index) in categories"
                :key="category.id"
              >
                <CTableHeaderCell scope="row"
                  >{{ index + 1 }}.</CTableHeaderCell
                >
                <CTableDataCell>{{ category.name }}</CTableDataCell>
                <CTableDataCell>{{ category.description }}</CTableDataCell>
                <CTableDataCell>{{ category.count }}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="info" size="sm" class="text-white me-1"
                    >Ubah</CButton
                  >
                  <CButton
                    @click="deleteCategory(category.id)"
                    color="danger"
                    size="sm"
                    class="text-white"
                    >Hapus</CButton
                  >
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
import axios from "axios";

export default {
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get(
          "http://localhost:3030/api/v1/category"
        );

        this.categories = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCategory(id) {
      if (
        confirm(
          "Kamu yakin mau hapus data kategori ini? Seluruh menu dengan kategori ini akan ikut terhapus juga. Tindakan ini tidak dapat dikembalikan!"
        )
      ) {
        try {
          const response = await axios.delete(
            `http://localhost:3030/api/v1/category/${id}`
          );

          alert(response.data.message);
          this.fetchCategories();
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.fetchCategories();
  },
};
</script>
