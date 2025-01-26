<template>
  <Section id="admin-users">
    <AdminToolbar icon="fas fa-users" title="Users">
      <template v-slot:right>
        <Button icon="fas fa-plus" @click="handleCreateUser" title="Create User" />
      </template>
    </AdminToolbar>
    <h3>Create/Edit</h3>
    <UserList :loading="loading" :data="users" :edit="hasAbilityToEdit" @onEdit="user => handleEditUser(user)" />
    <Modal :show="showModal" @onClose="handleCloseModal" size="sm">
      <template v-slot:header>
        <h3>{{ modalTitle }}</h3>
      </template>
      <template v-slot:default>
        <form @submit.prevent="submitForm">
          <FormGroup id="first-name" label="First Name" v-model="user.firstName" :value="user.firstName" :required="true" />
          <FormGroup id="last-name" label="Last Name" v-model="user.lastName" :value="user.lastName" :required="true" />
          <FormGroup id="username" label="Username" v-model="user.username" :value="user.username" :required="true" />
          <FormGroup id="email" label="Email" v-model="user.email" :value="user.email" :required="true" :component-props="{ type: 'email' }" />
          <FormGroup id="type" label="Type" v-model="user.type" :value="user.type" :component-type="'select'" :component-props="{ options: userTypes }" :required="true">
            <template v-slot:default>
              <option value="" disabled>Select User Type</option>
              <option v-for="type in userTypes" :key="type" :value="type">{{ type.toLocaleUpperCase() }}</option>
            </template>
          </FormGroup>
          <FormGroup v-if="isEdit" id="status" label="Status" v-model="user.status" :value="user.status" :component-type="'select'" :required="true">
            <template v-slot:default>
              <option value="" disabled>Select Status</option>
              <option v-for="status in userStatus" :key="status" :value="status">{{ status.toLocaleUpperCase() }}</option>
            </template>
          </FormGroup>
          <FormGroup id="password" :label="isEdit ? 'New Password (Leave blank to keep the same)' : 'Password'" v-model="user.password" :value="user.password" :component-type="'input'" :component-props="{ type: 'password', minlength: 8 }" :required="!isEdit" />
          <FormGroup id="confirm-password" label="Confirm Password" v-model="user.confirmPassword" :value="user.confirmPassword" :component-type="'input'" :component-props="{ type: 'password', minlength: 8 }" :required="!isEdit" />
          <button ref="submit" type="submit" style="display: none;"></button>
        </form>
      </template>
      <template v-slot:actions>
        <Button v-if="isEdit" @click="handleCloseModal">Cancel</Button>
        <Button v-else type="danger" @click="resetForm">Reset</Button>
        <Button type="success" @click="handleSubmit">
          {{ isEdit ? 'Save' : 'Create' }}
        </Button>
      </template>
    </Modal>
  </Section>
</template>

<script>
import AdminToolbar from '@/components/admin/AdminToolbar.vue';
import Section from '@/components/Section.vue';
import UserList from '@/components/admin/AdminUserList.vue';
import { mapGetters, mapActions } from 'vuex';
import Button from '@/components/Button.vue';
import Modal from '@/components/Modal.vue';
import FormGroup from '@/components/FormGroup.vue';
import apiService from '@/services/apiService';
import { ACTIVE, EDITOR, INACTIVE, WRITER } from '@/utils/helper';

export default {
  name: 'UsersView',
  components: {
    AdminToolbar,
    Section,
    UserList,
    Button,
    Modal,
    FormGroup,
  },
  data() {
    return {
      loading: false,
      showModal: false,
      selectedUser: null,
      user: {
        firstName: '',
        lastLame: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        type: '',
        status: '',
      },
      userTypes: [WRITER, EDITOR],
      userStatus: [ACTIVE, INACTIVE],
    };
  },
  mounted() {
    document.dispatchEvent(new Event('render-event'));

    this.loading = true;
    this.fetchUsers().then(() => {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    });
  },
  computed: {
    ...mapGetters(['usersLoading', 'getUsers', 'getCurrentUser']),
    users() {
      return this.$store.state.users;
    },
    modalTitle() {
      return this.selectedUser ? 'Edit User "' + this.selectedUser.username + '"' : 'Create User';
    },
    isEdit() {
      return this.selectedUser !== null;
    },
    hasAbilityToEdit() {
      return this.currentUser?.type === EDITOR;
    },
    currentUser() {
      return this.getCurrentUser;
    }
  },
  methods: {
    ...mapActions(['fetchUsers', 'setNotification']),
    handleCreateUser() {
      this.showModal = true;
    },
    handleCloseModal() {
      this.showModal = false;
      this.resetForm();
    },
    handleSubmit() {
      this.$refs.submit.click();
    },
    resetForm() {
      this.user = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        type: '',
        status: '',
      };
      this.selectedUser = null;
    },
    submitForm() {
      if (!this.isEdit) apiService.createUser(this.user).then((response) => {
        if (response.status === 201) {
          this.showModal = false;
          this.resetForm();
          this.fetchUsers();
          this.setNotification({
            message: 'User created successfully.',
            type: 'success',
            show: true,
          });
        }
      }).catch((error) => {
        apiService.handleError(error);
      });
      else apiService.updateUser(this.selectedUser.id, this.user).then((response) => {
        if (response.status === 200) {
          this.showModal = false;
          this.resetForm();
          this.fetchUsers();
          this.setNotification({
            message: 'User updated successfully.',
            type: 'success',
            show: true,
          });
        }
      }).catch((error) => {
        apiService.handleError(error);
      });
    },
    handleEditUser(responseUser) {
      this.selectedUser = responseUser;
      this.user = {
        ...responseUser,
      };
      this.showModal = true;
    },
  }
}
</script>

<style>
  #admin-users {
    
  }
</style>