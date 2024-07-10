<script setup>
import { freeSet } from "@coreui/icons";

const icons = freeSet;
</script>

<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader
          class="d-flex justify-content-between align-items-center py-3"
        >
          <h5 class="my-0">Kategori Menu</h5>

          <CButton
            color="primary"
            size="sm"
            @click="
              () => {
                addCategoryModal = true;
              }
            "
          >
            <CIcon :content="icons.cilZoomIn" />
            Tambah Data
          </CButton>
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

  <!-- Add Category Modal -->
  <CModal
    :visible="addCategoryModal"
    @close="
      () => {
        addCategoryModal = false;
      }
    "
    aria-labelledby="addCategoryModalLabel"
  >
    <CModalHeader>
      <CModalTitle id="addCategoryModalLabel">Tambah Data Kategori</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm class="row g-3">
        <CCol xs="12">
          <CFormLabel for="name"
            >Nama Kategori <span class="text-danger">*</span></CFormLabel
          >
          <CFormInput v-model="name" id="name" placeholder="Ex: Makanan" />
          <div v-for="(validation, index) in validations" :key="index">
            <div v-if="validation.field === 'name'">
              <small class="text-danger">{{ validation.message }}</small>
            </div>
          </div>
        </CCol>
        <CCol xs="12">
          <CFormLabel for="description"
            >Deskripsi <span class="text-danger">*</span></CFormLabel
          >
          <CFormTextarea
            v-model="description"
            id="description"
            rows="3"
            text="Deskripsikan secara singkat mengenai kategori produk ini."
          ></CFormTextarea>
          <div v-for="(validation, index) in validations" :key="index">
            <div v-if="validation.field === 'description'">
              <small class="text-danger">{{ validation.message }}</small>
            </div>
          </div>
        </CCol>
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="
          () => {
            closeCategoryModal();
          }
        "
      >
        Batal
      </CButton>
      <CButton @click="addCategory" color="primary">Simpan</CButton>
    </CModalFooter>
  </CModal>
  <!-- End of Add Category Modal -->
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      categories: [],
      addCategoryModal: false,
      name: "",
      description: "",
      validations: [],
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
    closeCategoryModal() {
      this.addCategoryModal = false;
      this.name = "";
      this.description = "";
    },
    async addCategory() {
      try {
        const response = await axios.post(
          "http://localhost:3030/api/v1/category",
          {
            name: this.name,
            description: this.description,
          }
        );

        alert(response.data.message);
        this.closeCategoryModal();
        this.fetchCategories();
      } catch (error) {
        if (error.response.data.status === false) {
          if (error.response.data.message === "SequelizeValidationError") {
            for (let i = 0; i < error.response.data.data.length; i++) {
              this.validations.push({
                field: error.response.data.data[i].path,
                message: error.response.data.data[i].message,
              });
            }
          }
        }
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
