<template>
  <section id="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </section>
</template>

<script>
import apiService from '@/services/apiService';

export default {
  name: 'LoginView',
  components: {

  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      apiService.login(this.username, this.password)
        .then(response => {
          if (response.status === 200) {
            this.$store.commit('setCurrentUser', response.data);
            this.$router.push({ name: 'Admin' })
          }
        })
        .catch(error => apiService.checkError(error))
    }
  }
}
</script>