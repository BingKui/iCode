<template>
  <Scrolly :passive-scroll="true" :offsetAdd="offsetAdd" :offsetMinus="offsetMinus">
    <ScrollyViewport :class="padding ? 'padding-h-md' : ''">
        <slot></slot>
    </ScrollyViewport>
    <ScrollyBar :axis="axis"/>
  </Scrolly>
</template>

<script>
import { Scrolly, ScrollyViewport, ScrollyBar } from './vscroll/index';
export default {
    name: 'ScrollBar',
    components: {
        Scrolly,
        ScrollyViewport,
        ScrollyBar
    },
    props: {
        axis: {
            type: String,
            default: 'y'
        },
        padding: {
            type: Boolean,
            default: false,
        },
        offsetAdd: {
            type: Number,
            default: 0,
        },
        offsetMinus: {
            type: Number,
            default: 0,
        },
    }
};
</script>

<style lang="less" scoped>
.scrolly-bar {
  border-width: 2px;
  &.axis-y {
    width: 6px;
  }
  &.axis-x {
    height: 6px;
  }
}
</style>

