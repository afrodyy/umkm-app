<script setup>
import { freeSet } from "@coreui/icons";

const icons = freeSet;
</script>

<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardBody>
          <CRow class="g-3">
            <CCol xs>
              <CFormSelect
                @change="handleFilterCategory"
                id="filterCategory"
                v-model="filterCategory"
              >
                <option value="">-- Lihat menu berdasarkan kategori --</option>
                <option
                  v-for="(category, index) in categories"
                  :key="index"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </CFormSelect>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard class="mb-4">
        <CCardHeader class="d-flex justify-content-between align-items-center">
          <h5 class="my-2">Daftar Menu</h5>
          <CButton
            @click="() => (addMenuModal = true)"
            class="btn btn-primary btn-sm"
          >
            <CIcon :content="icons.cilPlus" />
            Tambah Menu
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                <CTableHeaderCell scope="col">Gambar</CTableHeaderCell>
                <CTableHeaderCell scope="col">Kategori</CTableHeaderCell>
                <CTableHeaderCell scope="col">Deskripsi</CTableHeaderCell>
                <CTableHeaderCell scope="col">Harga</CTableHeaderCell>
                <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-if="menus.length < 1">
                <CTableHeaderCell scope="row" colspan="7" class="text-center"
                  >Data menu saat ini kosong.</CTableHeaderCell
                >
              </CTableRow>
              <CTableRow
                v-else
                v-for="(menu, index) in filteredMenus"
                :key="menu.id"
              >
                <CTableHeaderCell scope="row"
                  >{{ index + 1 }}.</CTableHeaderCell
                >
                <CTableDataCell>{{ menu.name }}</CTableDataCell>
                <CTableDataCell>
                  <CImage
                    :src="menu.image"
                    :alt="menu.image"
                    v-if="menu.image"
                    rounded
                    fluid
                    width="100"
                  />
                </CTableDataCell>
                <CTableDataCell>{{ menu.category.name }}</CTableDataCell>
                <CTableDataCell>{{ menu.description }}</CTableDataCell>
                <CTableDataCell>{{
                  new Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(menu.price)
                }}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    @click="
                      () => {
                        editMenuModal = true;
                        selectedMenu = {
                          ...menu,
                          category_id: menu.category_id.toString(),
                        };
                      }
                    "
                    color="info"
                    size="sm"
                    class="text-white me-1"
                    >Ubah</CButton
                  >
                  <CButton
                    @click="deleteMenu(menu.id)"
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

  <!-- Add Menu Modal -->
  <CModal
    :visible="addMenuModal"
    @close="
      () => {
        addMenuModal = false;
      }
    "
    aria-labelledby="addMenuModalLabel"
  >
    <CModalHeader>
      <CModalTitle id="addMenuModalLabel">Tambah Data Menu</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm class="row g-3">
        <CCol xs="12">
          <CFormLabel for="name"
            >Nama Menu <span class="text-danger">*</span></CFormLabel
          >
          <CFormInput
            type="text"
            v-model="name"
            id="name"
            placeholder="Cth: Burger"
          />
          <div v-for="(validation, index) in validations" :key="index">
            <div v-if="validation.field === 'name'">
              <small class="text-danger">{{ validation.message }}</small>
            </div>
          </div>
        </CCol>
        <CCol xs="12">
          <CFormLabel for="category_id"
            >Kategori <span class="text-danger">*</span></CFormLabel
          >
          <CFormSelect v-model="category_id" id="category_id">
            <option value="">-- Pilih kategori untuk menu ini --</option>
            <option
              v-for="(category, index) in categories"
              :key="index"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </CFormSelect>
          <div v-for="(validation, index) in validations" :key="index">
            <div v-if="validation.field === 'category_id'">
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
            text="Deskripsikan secara singkat mengenai produk ini."
          ></CFormTextarea>
          <div v-for="(validation, index) in validations" :key="index">
            <div v-if="validation.field === 'description'">
              <small class="text-danger">{{ validation.message }}</small>
            </div>
          </div>
        </CCol>
        <CCol xs="12">
          <CFormLabel for="price"
            >Harga (Rp) <span class="text-danger">*</span></CFormLabel
          >
          <CFormInput
            type="number"
            v-model="price"
            id="price"
            placeholder="Cth: 18000"
            @keypress="isNumber"
          />
          <div v-for="(validation, index) in validations" :key="index">
            <div v-if="validation.field === 'price'">
              <small class="text-danger">{{ validation.message }}</small>
            </div>
          </div>
        </CCol>
        <CCol xs="12">
          <CFormLabel for="image"
            >Gambar <span class="text-danger">*</span></CFormLabel
          >
          <CFormInput type="file" id="image" @change="handleFileUpload" />
          <div v-for="(validation, index) in validations" :key="index">
            <div v-if="validation.field === 'image'">
              <small class="text-danger">{{ validation.message }}</small>
            </div>
          </div>
        </CCol>
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="closeAddMenuModal">Batal</CButton>
      <CButton @click="addMenu" color="primary">Simpan</CButton>
    </CModalFooter>
  </CModal>
  <!-- End of Add Menu Modal -->

  <!-- Edit Menu Modal -->
  <CModal
    :visible="editMenuModal"
    @close="
      () => {
        editMenuModal = false;
      }
    "
    aria-labelledby="editMenuModalLabel"
  >
    <CModalHeader>
      <CModalTitle id="editMenuModalLabel">Ubah Data Menu</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm class="row g-3">
        <CCol xs="12">
          <CFormLabel for="name"
            >Nama Menu <span class="text-danger">*</span></CFormLabel
          >
          <CFormInput
            v-model="selectedMenu.name"
            id="name"
            placeholder="Cth: Makanan"
          />
          <div v-for="(validation, index) in validations" :key="index">
            <div v-if="validation.field === 'name'">
              <small class="text-danger">{{ validation.message }}</small>
            </div>
          </div>
        </CCol>
        <CCol xs="12">
          <CFormLabel for="category_id"
            >Kategori <span class="text-danger">*</span></CFormLabel
          >
          <CFormSelect v-model="selectedMenu.category_id" id="category_id">
            <option
              v-for="(category, index) in categories"
              :key="index"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </CFormSelect>
        </CCol>
        <CCol xs="12">
          <CFormLabel for="description"
            >Deskripsi <span class="text-danger">*</span></CFormLabel
          >
          <CFormTextarea
            v-model="selectedMenu.description"
            id="description"
            rows="3"
            text="Deskripsikan secara singkat mengenai produk ini."
          ></CFormTextarea>
          <div v-for="(validation, index) in validations" :key="index">
            <div v-if="validation.field === 'description'">
              <small class="text-danger">{{ validation.message }}</small>
            </div>
          </div>
        </CCol>
        <CCol xs="12">
          <CFormLabel for="price"
            >Harga (Rp) <span class="text-danger">*</span></CFormLabel
          >
          <CFormInput
            type="number"
            v-model="selectedMenu.price"
            id="price"
            placeholder="Cth: 18000"
            @keypress="isNumber"
          />
          <div v-for="(validation, index) in validations" :key="index">
            <div v-if="validation.field === 'price'">
              <small class="text-danger">{{ validation.message }}</small>
            </div>
          </div>
        </CCol>
        <CCol xs="12" class="d-flex flex-column">
          <CImage :src="selectedMenu.image" width="150" rounded class="mb-1" />
          <CFormLabel for="image"
            >Gambar <span class="text-danger">*</span></CFormLabel
          >
          <CFormInput type="file" id="image" @change="handleEditImage" />
          <div v-for="(validation, index) in validations" :key="index">
            <div v-if="validation.field === 'image'">
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
            closeEditMenuModal();
          }
        "
      >
        Batal
      </CButton>
      <CButton @click="updateMenu(selectedMenu.id)" color="primary"
        >Simpan</CButton
      >
    </CModalFooter>
  </CModal>
  <!-- End of Edit Menu Modal -->
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      filterCategory: "",
      categories: [],
      menus: [],
      selectedMenu: {},
      addMenuModal: false,
      editMenuModal: false,
      name: "",
      category_id: "",
      description: "",
      price: "",
      image: null,
      editImage: null,
      validations: [],
    };
  },
  computed: {
    filteredMenus() {
      if (!this.filterCategory) {
        return this.menus;
      }

      return this.menus.filter(
        (menu) => menu.category_id === parseInt(this.filterCategory)
      );
    },
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
    async fetchMenus() {
      try {
        const response = await axios.get("http://localhost:3030/api/v1/menu");

        if (response.data.message === "Data menu saat ini kosong") {
          return (this.menus = []);
        }

        this.menus = response.data.data;
      } catch (error) {
        console.log(error, "<<< Error fetch menu");
      }
    },
    handleFilterCategory(e) {
      this.filterCategory = e.target.value;
    },
    isNumber(event) {
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode < 48 || charCode > 57) {
        event.preventDefault();
      }
    },
    handleFileUpload(event) {
      this.image = event.target.files[0];
    },
    handleEditImage(event) {
      this.editImage = event.target.files[0];
    },
    async addMenu() {
      try {
        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("category_id", this.category_id);
        formData.append("description", this.description);
        formData.append("price", this.price);
        formData.append("image", this.image);

        const response = await axios.post(
          "http://localhost:3030/api/v1/menu",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.fetchMenus();
        this.closeAddMenuModal();
        alert(response.data.message);
      } catch (error) {
        this.validations = [];

        if (error.response.data.status === false) {
          let errorMessage = error.response.data.message;

          if (errorMessage === "SequelizeValidationError") {
            for (let i = 0; i < error.response.data.data.length; i++) {
              this.validations.push({
                field: error.response.data.data[i].path,
                message: error.response.data.data[i].message,
              });
            }
          } else if (errorMessage === "SequelizeUniqueConstraintError") {
            for (let i = 0; i < error.response.data.data.length; i++) {
              this.validations.push({
                field: error.response.data.data[i].path,
                message: error.response.data.data[i].message,
              });
            }
          } else if (
            errorMessage ===
            "Tipe file yang diperbolehkan hanya jpg, jpeg, dan png."
          ) {
            this.validations.push({
              field: "image",
              message: "Tipe file yang diperbolehkan hanya jpg, jpeg, dan png.",
            });
          }
        }
      }
    },
    async updateMenu(id) {
      try {
        const formData = new FormData();
        formData.append("name", this.selectedMenu.name);
        formData.append("category_id", this.selectedMenu.category_id);
        formData.append("description", this.selectedMenu.description);
        formData.append("price", this.selectedMenu.price);
        formData.append("image", this.editImage);

        const response = await axios.put(
          `http://localhost:3030/api/v1/menu/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.fetchMenus();
        this.closeEditMenuModal();
        alert(response.data.message);
      } catch (error) {
        this.validations = [];

        if (error.response.data.status === false) {
          let errorMessage = error.response.data.message;

          if (errorMessage === "SequelizeValidationError") {
            for (let i = 0; i < error.response.data.data.length; i++) {
              this.validations.push({
                field: error.response.data.data[i].path,
                message: error.response.data.data[i].message,
              });
            }
          } else if (errorMessage === "SequelizeUniqueConstraintError") {
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
    async deleteMenu(id) {
      if (
        confirm(
          "Kamu yakin mau hapus menu ini dari daftar menu? Tindakan ini tidak bisa diulang ya."
        )
      ) {
        try {
          const response = await axios.delete(
            `http://localhost:3030/api/v1/menu/${id}`
          );

          this.fetchMenus();
          alert(response.data.message);
        } catch (error) {
          console.log(error);
        }
      }
    },
    closeAddMenuModal() {
      this.addMenuModal = false;
      this.name = "";
      this.category_id = "";
      this.description = "";
      this.price = "";
      this.image = null;
      this.validations = [];
    },
    closeEditMenuModal() {
      this.editMenuModal = false;
      this.selectedMenu = {};
      this.validations = [];
    },
  },
  created() {
    this.fetchCategories();
    this.fetchMenus();
  },
};
</script>
