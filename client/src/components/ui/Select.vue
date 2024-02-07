<script>
import { ref, watch, onMounted } from 'vue'

export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    default: {
      type: Object,
      required: false,
      default: { value: '', name: 'Не выбрано' }
    },
    name: {
      type: String,
      default: ''
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0
    },
    cb: {
      type: Function,
      required: false,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    const selected = ref(
      props.default ? props.default : props.options.length > 0 ? props.options[0].name : null
    )
    const open = ref(false)

    function toggleOpen() {
      open.value = !open.value
    }

    function selectOption(option) {
      selected.value = option
      open.value = false
      emit('update:modelValue', option)
    }

    watch(selected, (newValue) => {
      emit('update:modelValue', newValue)
      props.cb(newValue)
    })

    onMounted(() => {
      emit('update:modelValue', selected.value)
    })

    return {
      selected,
      open,
      toggleOpen,
      selectOption
    }
  }
}
</script>

<template>
  <div class="select" :tabindex="tabindex" @blur="open = false">
    <input type="hidden" :name="name" :value="selected.value" />
    <div class="select__selected" :class="{ open: open }" @click="toggleOpen">
      {{ selected.name }}
    </div>
    <div class="select__items" :class="{ hide: !open }">
      <div
        class="select__item"
        v-for="(option, i) of options"
        :class="{ selected: selected.value === option.value }"
        :key="i"
        @click="selectOption(option)"
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;

  &__selected {
    background-color: cl(bg-alt);
    border-radius: var(--radius-xs);
    border: 1px solid cl(border);
    color: cl(border);
    padding-left: var(--gap-s);
    cursor: pointer;
    user-select: none;

    &:after {
      position: absolute;
      content: '';
      top: 22px;
      right: 1em;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-color: cl(border) transparent transparent transparent;
      transition:
        top $time-2,
        transform $time-2;
    }

    &.open {
      border: 1px solid cl(primary);
      border-radius: var(--radius-xs) var(--radius-xs) 0px 0px;

      &:after {
        top: 15px;
        transform: rotate(180deg);
      }
    }
  }

  &__items {
    border-radius: 0px 0px var(--radius-xs) var(--radius-xs);
    overflow: hidden;
    border-right: 1px solid cl(border);
    border-left: 1px solid cl(border);
    border-bottom: 1px solid cl(border);
    position: absolute;
    background-color: cl(whte);
    left: 0;
    right: 0;
    z-index: 1;

    &.hide {
      display: none;
    }
  }

  &__item {
    color: cl(text);
    padding-left: 1em;
    cursor: pointer;
    user-select: none;

    &.selected {
      background-color: cl(bg-alt);
    }

    &:hover {
      @include mq-hover() {
        background-color: cl(bg);
      }
    }
  }
}
</style>
