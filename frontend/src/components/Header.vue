<template>
  <header>
    <nav>
      <router-link :to="{name: 'Home'}">Home</router-link>
      <router-link :to="{name: 'AdminHome'}">Admin</router-link>
      <div id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link :to="{name: 'Home'}" class="nav-link">Home</router-link> |
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'AdminHome'}" class="nav-link">Admin</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent'
}
</script>

<style lang="scss" scoped>
header {
  padding: 10px;
  margin-bottom: 20px;
  a {
    text-decoration: none;
  }
  ul, li {
    list-style-type: none;
    display: inline;
  }
}
</style>