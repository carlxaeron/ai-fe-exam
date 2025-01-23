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
import authService from '@/services/authService';

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
      console.log('Username:', this.username)
      console.log('Password:', this.password)
      authService.login(this.username, this.password)
        .then(response => {
          console.log(response)
          this.$router.push({ name: 'Admin' })
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>