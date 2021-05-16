<template>
  <div id="app">
    <div class="main-container">
      <SearchUsers/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchUsers from "@/components/SearchUsers.vue";

export default Vue.extend({
  name: 'App',
  components: {
    SearchUsers,
  },
  mounted() {
    this.$store.dispatch('users/getAlbums')
  },
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.main-container {
  margin: 0 auto;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
