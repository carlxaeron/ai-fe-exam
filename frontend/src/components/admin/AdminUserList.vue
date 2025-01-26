<template>
  <div id="admin-users-list">
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Username</th>
          <th>Create</th>
          <th>Type</th>
          <th>Status</th>
          <th v-if="edit">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="users.length === 0">
          <td colspan="3">No users found.</td>
        </tr>
        <tr v-else v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.firstName }} {{ user.lastName }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.created_at ? new Date(user.created_at).toLocaleString() : 'No Date' }}</td>
          <td>{{ user.type }}</td>
          <td style="text-align: center;">
            <Badge :type="getBadgeType(user.status)">{{ user.status }}</Badge>
          </td>
          <td v-if="edit" style="text-align: center;">
            <Button type="success" @click="$emit('onEdit', user)">Edit</Button>
          </td>
        </tr>
      </tbody>
    </Table>
    <Loader v-show="loading" :relative="true" :bgColor="'light'"/>
  </div>
</template>

<script>
import { ACTIVE } from '@/utils/helper';
import Badge from '../Badge.vue';
import Button from '../Button.vue';
import Loader from '../Loader.vue';
import Table from '../Table.vue';

export default {
  name: 'UserListComponent',
  components: {
    Loader,
    Table,
    Button,
    Badge,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    users() {
      return this.data;
    },
  },
  methods: {
    getBadgeType(status) {
      return status === ACTIVE ? 'success' : 'danger';
    },
  },
}
</script>

<style>
  #admin-users-list {
    position: relative;
  }
</style>