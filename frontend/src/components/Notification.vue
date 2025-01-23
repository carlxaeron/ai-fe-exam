<template>
  <div id="notification">
    <div v-if="show" :class="['notification', type]" @animationend="handleAnimationEnd">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NotificationComponent',
  computed: {
    ...mapGetters(['notification']),
    show() {
      return this.notification.show;
    },
    message() {
      return this.notification.message;
    },
    type() {
      return this.notification.type;
    },
  },
};
</script>

<style lang="scss" scoped>
#notification {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1001;
  padding: 1rem;
  width: 100%;
  color: red;
}

.notification {
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem;
  color: white;
  font-weight: bold;
  position: absolute;
  animation: slide-in 0.2s ease-out;
}

.success {
  background-color: #4caf50;
}

.error {
  background-color: #f44336;
}

@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-out {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(100%);
  }
}
</style>