<style lang="stylus" scoped>
.modal-outer
  position fixed
  width 100%
  height 100%
  top 0
  left 0
  display flex
  align-items center
  justify-content center
  transition 0
  z-index 1001
  &.hidden
    // 各种方法保证视觉上弹窗不可见，且不影响动画显示
    pointer-events none
    visibility hidden
    opacity 0
    width 0
    height 0
    transition .1s 1s
.modal-mask
  position absolute
  width 100%
  height 100%
  top 0
  left 0
  z-index 100
  background: rgba(0, 0, 0, .7)
.modal-close
  position absolute
  top 5px
  right 5px
  width 40px
  height 40px
  line-height 40px
  text-align center
  z-index 102
  transition-delay .2s
  cursor pointer
  margin-left 5px
  transition .2s
  svg
    vertical-align text-bottom
    fill #aaa
  &:hover
    background #212127
  &:active
    background #16181d
.modal-body
  position relative
  box-sizing border-box
  width 80%
  max-width 1400px
  max-height 900px
  z-index 101
@media screen and (max-width:600px)
  .modal-mask
    transition 0s !important
  .modal-body
    top 0
    left 0
    width 100% !important
    height 100% !important
</style>

<template>
  <teleport to="#v-ui">
    <div
      :class="['modal-outer', modelValue ? 'visible' : 'hidden']"
      @contextmenu.prevent
    >
      <transition name="fade-slow">
        <div
          v-if="modelValue"
          class="modal-mask"
        />
      </transition>
      <transition name="slidedown">
        <div
          v-if="modelValue"
          class="modal-body"
          :style="modalBodyStyle"
        >
          <slot />
          <div
            class="modal-close"
            @click="$emit('update:modelValue', false)"
          >
            <v-mdi name="mdi-close" />
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script lang="ts">
type modalStyle = {
  background: string,
  width?: string,
  height?: string
}
function inputSize2Style(input: string | number): string {
  if (typeof input === 'number') {
    return input + 'px'
  }
  return input
}
export default {
  name: 'VModal',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [String, Number],
      default: '',
    },
    height: {
      type: [String, Number],
      default: '',
    },
    undercoat: {
      type: String,
      default: '#26262c',
    },
  },
  emits: ['after-open', 'after-close', 'update:modelValue'],
  setup(props) {
    const modalBodyStyle: modalStyle = {
      background: props.undercoat,
    }
    if (props.width) {
      modalBodyStyle.width = inputSize2Style(props.width)
    }
    if (props.height) {
      modalBodyStyle.height = inputSize2Style(props.height)
    }
    return {
      modalBodyStyle,
    }
  },
  watch: {
    modelValue(isVisible) {
      if (isVisible) {
        this.$emit('after-open')
      } else {
        this.$emit('after-close')
      }
    },
  },
}
</script>
