<template>
  <v-app>
    <v-container>
      <header-component></header-component>
      <v-navigation-drawer app theme="dark">
        <v-list-item title="Header" subtitle="Vuetify"></v-list-item>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :to="item.to"
            router
            :exact="true"
            :active-class="'v-item-active'"
            class="v-item"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view></router-view>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
export default {
  components: { HeaderComponent },
  data() {
    return {
      items: [
        { title: "Dashboard", to: "/admin" },
        { title: "Manager User", to: "/admin/manager-user" },
        { title: "Manager Product", to: "/admin/manager-product" },
      ],
    };
  },
};
</script>

<style>
.v-item-active {
  background-color: #e0e0e0;
}
.v-item {
  cursor: pointer;
}
</style>
