<template>
  <header id="admin-header">
    <h1>Admin Panel</h1>
    <nav>
      <router-link :to="{ name: 'Admin' }">Dashboard</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AdminHeader',
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
}
</script>