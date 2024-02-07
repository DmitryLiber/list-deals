<script lang="ts">
import LoaderCircle from './LoaderCircle.vue'
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  components: {
    LoaderCircle
  },
  props: {
    href: {
      type: String
    },
    loading: {
      type: Boolean,
      default: false
    },
    mods: {
      type: String
    }
  },
  setup(props, { attrs }) {
    const isLoading = computed(() => props.loading)
    const buttonClass = computed(() => {
      const loading = props.loading ? ' loading' : ''
      return `btn${props.mods ? ' ' + props.mods : ''}${loading}`
    })

    return {
      buttonClass,
      isLoading,
      loading: props.loading,
      href: props.href,
      attrs
    }
  }
})
</script>

<template>
  <button v-if="!href" :class="buttonClass" v-bind="attrs">
    <LoaderCircle v-if="isLoading" />
    <slot v-else />
  </button>
  <a v-else :href="href" class="btn" v-bind="attrs">
    <LoaderCircle v-if="isLoading" />
    <slot v-else />
  </a>
</template>

<style lang="scss">
.btn {
  @include font(18px, 1, 500);
  background-color: cl(primary);
  color: cl(whte);
  padding: 8px 12px;
  border-radius: var(--radius-xs);
  display: inline-flex;
  align-items: center;
  transition: opacity $time-2;

  &:hover {
    @include mq-hover() {
      opacity: 0.9;
    }
  }

  &.loading {
    pointer-events: none;
  }

  &[disabled] {
    pointer-events: none;
    opacity: 0.2;
  }
}

.btn--gap-top {
  padding-top: var(--gap-s);
}

.btn--fit-height {
  height: 100%;
}
</style>
