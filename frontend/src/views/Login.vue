<template>
  <section id="login">
    <h2>Login</h2>
    <div class="container" id="login-container">
      <form @submit.prevent="!loading && login()">
        <FormGroup id="username" label="Username" v-model="username" :value="username" :required="true" />
        <FormGroup id="password" label="Password" v-model="password" :value="password" :component-type="'input'" :component-props="{ type: 'password', minlength: 8 }" :required="true" />
        <Button :disabled="loading" type="submit">Login</Button>
      </form>
    </div>
    <Loader v-show="loading" />
  </section>
</template>

<script>
import apiService from '@/services/apiService';
import Button from '@/components/Button.vue';
import FormGroup from '@/components/FormGroup.vue';
import Loader from '@/components/Loader.vue';

export default {
  name: 'LoginView',
  components: {
    Button,
    FormGroup,
    Loader,
  },
  data() {
    return {
      username: '',
      password: '',
      loading: false,
    }
  },
  methods: {
    login() {
      this.loading = true;
      apiService.login(this.username, this.password)
        .then(response => {
          if (response.status === 200) {
            this.$store.commit('setCurrentUser', response.data);
            this.$router.push({ name: 'Admin' });
            this.$store.dispatch('setNotification', {
              type: 'success',
              message: 'Logged in successfully',
              show: true,
            });
          }
          this.loading = false;
        })
        .catch(error => {
          apiService.handleError(error);
          this.loading = false;
        });
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