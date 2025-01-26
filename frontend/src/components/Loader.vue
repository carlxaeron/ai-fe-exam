<template>
  <div :class="`loader ${fullPage ? 
    (relative ? 'relative' : 'full-page') : (relative ? 'relative' : '')}`" :style="`background-color: ${getBgColor}`">
    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

const defaultBgColor = 'rgba(0, 0, 0, 0.3)';

export default {
  name: 'LoaderComponent',
  props: {
    fullPage: {
      type: Boolean,
      default: true,
    },
    relative: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: String,
      default: defaultBgColor,
    },
  },
  computed: {
    ...mapGetters(['isDarkTheme']),
    getBgColor() {
      let color = this.bgColor;
      if (color === 'light' && !this.isDarkTheme) {
        color = 'rgba(255, 255, 255, 0.3)';
      } else color = defaultBgColor;
      return color;
    },
  },
}
</script>

<style lang="scss">
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  &.full-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
  }
  &.relative {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    > div {
      position: absolute;
      top: 33px;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: var(--primary-color);
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
      &:nth-child(1) {
        left: 8px;
        animation: lds-ellipsis1 0.6s infinite;
      }
      &:nth-child(2) {
        left: 8px;
        animation: lds-ellipsis2 0.6s infinite;
      }
      &:nth-child(3) {
        left: 32px;
        animation: lds-ellipsis2 0.6s infinite;
      }
      &:nth-child(4) {
        left: 56px;
        animation: lds-ellipsis3 0.6s infinite;
      }
    }
  }
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}

</style>