<template>
  <section id="login">
    <h2>Login</h2>
    <div class="container" id="login-container">
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" class="form-control" required>
        </div>
        <Button @click="login">Login</Button>
      </form>
    </div>
  </section>
</template>

<script>
import apiService from '@/services/apiService';
import Button from '@/components/Button.vue';

export default {
  name: 'LoginView',
  components: {
    Button
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
        .catch(error => apiService.handleError(error))
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/variables.scss';
  #login {
    h2 {
      margin-bottom: 1rem;
    }
    #login-container {
      max-width: 400px;
      margin: 0 auto;
      padding: 1rem;
      border: 1px solid var(--primary-color);
      border-radius: 5px;
    }
    form {
      .form-group {
        margin-bottom: 1rem;
        label {
          display: block;
          margin-bottom: 0.5rem;
        }
        input {
          width: 100%;
          padding: 0.5rem;
          font-size: 1rem;
        }
      }
    }
  }
</style>