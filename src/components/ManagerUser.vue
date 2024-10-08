<template>
  <div>
    <v-text-field
      v-model="search"
      density="compact"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="solo-filled"
      flat
      hide-details
      single-line
    ></v-text-field>
    <v-data-table
      :search="search"
      :items="user"
      :headers="headers"
      :sort-by="[{ key: 'calories', order: 'asc' }]"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Manager User</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn class="mb-2" color="primary" dark v-bind="props">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-select
                        v-model="editedItem.gender"
                        :items="genders"
                        label="Gender"
                        placeholder="Select..."
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-date-input
                        v-model="editedItem.date"
                        label="date"
                        required
                      ></v-date-input>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn color="yellow-darken-1" variant="text" @click="editItem(item)">
          EDIT
        </v-btn>

        <v-btn color="red-darken-1" variant="text" @click="deleteItem(item)">
          DELETE
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
const arrJson = JSON.parse(localStorage.getItem("arr")) || [];

localStorage.setItem("arr", JSON.stringify(arrJson));

export default {
  data: () => ({
    genders: ["Nam", "Nữ", "Khác"], // Update gender options
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: "ID",
        align: "start",
        key: "id",
      },
      { title: "Tên", key: "name" },
      { title: "Giới tính", key: "gender" }, // Change header key to gender
      { title: "Email", key: "email" },
      { title: "Actions", key: "actions", sortable: false },
    ],
    user: [],
    editedIndex: -1,
    editedItem: {
      id: Math.floor(Math.random() * 33333),
      name: "",
      email: "",
      gender: "",
      date: "",
    },
    defaultItem: {
      id: Math.floor(Math.random() * 33333),
      name: "",
      email: "",
      gender: "",
      date: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.user = arrJson;
    },
    updateLocalStorage() {
      localStorage.setItem("arr", JSON.stringify(this.user));
    },

    editItem(item) {
      this.editedIndex = this.user.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.user.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.user.splice(this.editedIndex, 1);
      this.closeDelete();
      this.updateLocalStorage();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.user[this.editedIndex], this.editedItem);
      } else {
        this.user.push(this.editedItem);
      }
      this.updateLocalStorage();
      this.close();
    },
  },
};
</script>

<style scoped></style>
