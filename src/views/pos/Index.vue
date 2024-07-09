<script setup>
import { freeSet } from "@coreui/icons";

const icons = freeSet;
</script>

<template>
  <CRow>
    <!-- Loop menu -->
    <CCol md="6" v-for="(menu, index) in menus" :key="index" class="mb-3 p-0">
      <CCard class="m-2 shadow-sm" style="height: 100%">
        <CCardBody class="d-flex flex-column">
          <CRow class="flex-grow-1">
            <CCardTitle
              >{{ menu.name }}
              <CBadge color="success" class="p-1" size="sm"
                >Recommended</CBadge
              ></CCardTitle
            >
            <CCol xs="6" md="8">
              <CCardText class="mb-1">{{ menu.description }}</CCardText>
              <small>{{
                new Intl.NumberFormat("id", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(menu.price)
              }}</small>
            </CCol>
            <CCol xs="6" md="4" class="align-self-center">
              <div class="clearfix mb-auto">
                <CImage align="end" rounded :src="menu.picture" fluid />
              </div>
            </CCol>
            <div class="d-grid mt-3">
              <CButton
                type="button"
                @click="
                  () => {
                    (menuModal = true), menuOption(menu.id);
                  }
                "
                color="success"
                size="sm"
                class="text-white mt-auto"
                >Tambah Pembelian</CButton
              >
            </div>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
    <!-- End of Loop menu -->

    <!-- Cart Button -->
    <div v-if="cart.menus.length > 0" class="position-fixed fixed-bottom">
      <div class="position-absolute bottom-0 end-0 me-2 mb-2">
        <CButton
          type="button"
          @click="
            () => {
              cartModal = true;
            }
          "
          color="success"
          class="align-items-center text-white"
        >
          <CIcon :content="icons.cilZoomIn" />
          <span class="fw-bold mx-1">Keranjang</span>
          <CBadge color="light" class="text-black">{{
            cart.totalItems
          }}</CBadge>
        </CButton>
      </div>
    </div>
    <!-- End of Cart Button -->
  </CRow>

  <!-- Menu Modal -->
  <CModal
    :visible="menuModal"
    @close="
      () => {
        (menuModal = false),
          (selectedMenu = null),
          (selectedMenuQtyAfter = selectedMenuQtyBefore);
      }
    "
    fullscreen="sm"
    alignment="center"
    aria-labelledby="LiveDemoExampleLabel"
  >
    <CModalHeader>
      <CModalTitle id="LiveDemoExampleLabel">Custom pembelian</CModalTitle>
    </CModalHeader>
    <!-- Menu Body -->
    <CModalBody>
      <CForm>
        <CRow class="mb-3">
          <div class="d-flex flex-row justify-content-between">
            <h6>Tanpa custom</h6>
            <CFormCheck
              reverse
              type="radio"
              id="custom"
              value="no_custom"
              label="Gratis"
            />
          </div>
        </CRow>
      </CForm>
    </CModalBody>
    <!-- End of Menu Body -->

    <!-- Menu Footer -->
    <CModalFooter class="px-0">
      <CContainer fluid>
        <CRow class="align-items-center">
          <CCol xs="8">
            <h6 class="mt-1">Jumlah pembelian</h6>
          </CCol>
          <CCol xs="4">
            <div class="d-flex flex-row justify-content-between">
              <CButton
                @click="
                  () => {
                    if (selectedMenuQtyAfter > 1) {
                      selectedMenuQtyAfter -= 1;
                    }
                  }
                "
                color="primary"
                size="sm"
                shape="rounded-pill"
                class="me-1"
                >-</CButton
              >
              <span class="me-1 align-self-center">{{
                selectedMenuQtyAfter
              }}</span>
              <CButton
                @click="
                  () => {
                    selectedMenuQtyAfter += 1;
                  }
                "
                color="primary"
                size="sm"
                shape="rounded-pill"
                class="me-0"
                >+</CButton
              >
            </div>
          </CCol>
        </CRow>
        <CRow class="mt-3">
          <CCol>
            <div class="d-grid">
              <CButton
                @click="
                  addMenuToCart(selectedMenu.id, selectedMenuQtyAfter),
                    (selectedMenuQtyBefore = 1)
                "
                color="primary"
                size="sm"
                >Tambah pembelian -
                {{
                  Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(selectedMenu.price * selectedMenuQtyAfter)
                }}</CButton
              >
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </CModalFooter>
    <!-- End of Menu Footer -->
  </CModal>
  <!-- End of Menu Modal -->

  <!-- Cart Modal -->
  <CModal
    :visible="cartModal"
    @close="
      () => {
        cartModal = false;
      }
    "
    fullscreen="sm"
    alignment="center"
    aria-labelledby="LiveDemoExampleLabel"
  >
    <CModalHeader>
      <CModalTitle id="LiveDemoExampleLabel">Keranjang Belanja</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <!-- Cart Body -->
      <CRow v-for="(addedMenu, index) in cart.menus" :key="index" class="mb-3">
        <CCol xs="8">
          <h6>{{ addedMenu.name }}</h6>
          <CCardText class="mb-0"
            >Harga:
            {{
              new Intl.NumberFormat("id", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(addedMenu.price)
            }}</CCardText
          >
          <div class="d-flex flex-row my-2">
            <CButton
              @click="
                () => {
                  if (addedMenu.qty > 1) {
                    cartDecreaseMenuQty(addedMenu.id);
                  } else {
                    removeCartItem(addedMenu.id);
                  }
                }
              "
              color="success"
              class="text-white"
              size="sm"
              >-</CButton
            >
            <span class="mx-3 align-self-center">{{ addedMenu.qty }}</span>
            <CButton
              @click="cartIncreaseMenuQty(addedMenu.id)"
              color="success"
              class="text-white"
              size="sm"
              >+</CButton
            >
          </div>
          <CCardText
            >Total:
            {{
              new Intl.NumberFormat("id", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(addedMenu.total)
            }}</CCardText
          >
        </CCol>
        <CCol xs="4" class="align-self-center">
          <div class="clearfix">
            <CImage align="end" rounded :src="addedMenu.picture" fluid />
          </div>
        </CCol>
        <hr class="border border-1 border-success mt-3" />
      </CRow>
      <!-- End of Cart Body -->

      <!-- Cart Footer -->
      <CRow class="mb-4">
        <CCol>
          <h6>
            Jumlah pesanan:
            {{ cart.totalItems }}
          </h6>
          <h6>
            Subtotal:
            {{
              new Intl.NumberFormat("id", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(cart.subtotal)
            }}
          </h6>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <div class="d-grid">
            <CButton @click="orderProcess" color="success" class="text-white"
              >Proses pesanan</CButton
            >
          </div>
        </CCol>
      </CRow>
      <!-- End of Cart Footer -->
    </CModalBody>
  </CModal>
  <!-- End of Cart Modal -->
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      menus: [
        {
          id: 1,
          name: "Cheese Whooper Jr",
          description:
            "Roti sandwich ukuran sedang isi daging, sayuran, dan keju.",
          price: 25000,
          picture:
            "https://media-order.bkdelivery.co.id/thumb/product_photo/2024/1/10/8qkzdcieytzabv8tj8ldxz_product_details.jpg",
        },
        {
          id: 2,
          name: "Coca Cola",
          description: "Minuman bersoda yang menyegarkan",
          price: 11000,
          picture:
            "https://media-order.bkdelivery.co.id/thumb/product_photo/2023/3/20/b7hdgz6h6i8ijhxqn98aza_product_list.jpg",
        },
        {
          id: 3,
          name: "French Fries",
          description: "Kentang goreng gurih untuk pelengkap burgermu",
          price: 15000,
          picture:
            "https://media-order.bkdelivery.co.id/thumb/product_photo/2023/3/20/7hl24gpmnyvdpstiqyg3jt_product_list.jpg",
        },
        {
          id: 4,
          name: "Cone Ice Cream",
          description: "Ice cream mix coklat dan vanilla",
          price: 9000,
          picture:
            "https://media-order.bkdelivery.co.id/thumb/product_photo/2023/1/24/ebszactggahkjd3virdpg6_product_details.jpg",
        },
      ],
      menuModal: false,
      cartModal: false,
      selectedMenu: null,
      selectedMenuQtyBefore: 1,
      selectedMenuQtyAfter: 1,
      cart: {
        menus: [],
        totalItems: 0,
        subtotal: 0,
      },
    };
  },
  computed: {
    // ...mapState({
    //   cartState: (state) => state.cartState,
    // }),
    ...mapGetters(["cartState"]),
  },
  methods: {
    menuOption(id) {
      this.menus.filter((menu) => {
        for (let i = 0; i < this.menus.length; i++) {
          if (menu.id === id) {
            if (this.cart.menus.length > 0) {
              this.cart.menus.filter((addedMenu) => {
                for (let j = 0; j < this.cart.menus.length; j++) {
                  if (addedMenu.id === id) {
                    this.selectedMenu = addedMenu;
                    this.selectedMenuQtyAfter = this.selectedMenu.qty;
                  } else {
                    this.selectedMenu = menu;
                    this.selectedMenu.qty = 1;
                  }
                }
              });
            } else {
              this.selectedMenu = menu;
              this.selectedMenuQtyAfter = 1;
            }
          }
        }
      });
    },
    addMenuToCart(id, qty) {
      if (this.cart.menus.length === 0) {
        this.cart.menus.push({
          id: id,
          name: this.selectedMenu.name,
          price: this.selectedMenu.price,
          qty: qty,
          total: this.selectedMenu.price * qty,
          picture: this.selectedMenu.picture,
        });
      } else {
        let menuExists = false;

        for (let i = 0; i < this.cart.menus.length; i++) {
          if (this.cart.menus[i].id === id) {
            this.cart.menus[i].qty = qty;
            this.cart.menus[i].total =
              this.cart.menus[i].price * this.cart.menus[i].qty;
            menuExists = true;
            break;
          }
        }

        if (!menuExists) {
          this.cart.menus.push({
            id: id,
            name: this.selectedMenu.name,
            price: this.selectedMenu.price,
            qty: qty,
            total: this.selectedMenu.price * qty,
            picture: this.selectedMenu.picture,
          });
        }
      }

      this.menuModal = false;
      this.selectedMenu = null;
      this.selectedMenuQtyAfter = 1;
      this.cart.totalItems = 0;
      this.cart.subtotal = 0;

      // Hitung subtotal dan jumlah item dalam keranjang
      for (let i = 0; i < this.cart.menus.length; i++) {
        this.cart.totalItems += this.cart.menus[i].qty;
        this.cart.subtotal += this.cart.menus[i].price * this.cart.menus[i].qty;
      }
    },
    cartIncreaseMenuQty(cartMenuId) {
      for (let i = 0; i < this.cart.menus.length; i++) {
        if (this.cart.menus[i].id === cartMenuId) {
          this.cart.menus[i].qty++;

          this.countSubtotalAndQty();
        }
      }
    },
    cartDecreaseMenuQty(cartMenuId) {
      for (let i = 0; i < this.cart.menus.length; i++) {
        if (this.cart.menus[i].id === cartMenuId) {
          this.cart.menus[i].qty--;

          this.countSubtotalAndQty();
        }
      }
    },
    removeCartItem(cartItemId) {
      if (confirm("Kamu mau hapus menu ini dari keranjang belanja?")) {
        for (let i = 0; i < this.cart.menus.length; i++) {
          if (this.cart.menus[i].id === cartItemId) {
            this.cart.menus.splice(i, 1);
            this.countSubtotalAndQty();
          }
        }
      } else {
        console.log("Gajadi hapus deh");
      }
    },
    countSubtotalAndQty() {
      if (this.cart.menus.length > 0) {
        for (let i = 0; i < this.cart.menus.length; i++) {
          if (i === 0) {
            this.cart.totalItems = 0;
            this.cart.subtotal = 0;
          }

          this.cart.totalItems += this.cart.menus[i].qty;
          this.cart.subtotal +=
            this.cart.menus[i].price * this.cart.menus[i].qty;
        }
      } else {
        this.cart.totalItems = 0;
        this.cart.subtotal = 0;
      }
    },
    ...mapActions(["saveCartState"]),
    async orderProcess() {
      if (confirm("Apakah seluruh pesanan sudah sesuai?")) {
        const cart = [];

        for (let i = 0; i < this.cart.menus.length; i++) {
          cart.push({
            id: this.cart.menus[i].id,
            qty: this.cart.menus[i].qty,
          });
        }

        await this.saveCartState(cart);
        // console.log(cartStates);
        // console.log(this.cartState);
        this.$router.push("/pos/order-process");
      }
    },
  },
};
</script>
