<template>
    <div class="v-logo flex-column-center">
        <div class="logo" :style="`background-image: url(${logoSrc});`" />
        <div class="name">iCode</div>
    </div>
</template>

<script>
import logoSrc from '@assets/logo.png';
export default {
    name: 'Logo', // Logo
    data() {
        return {
            logoSrc,
        };
    },
};
</script>

<style lang="less">
.v-logo {
    user-select: none;
    -webkit-app-region: drag;
    height: 130px;
    .logo {
        background-repeat: no-repeat;
        background-size: 60px 60px;
        width: 60px;
        height: 60px;
    }
    .name {
        user-select: none;
        font-size: 14px;
        font-weight: bold;
        margin-top: @gap;
    }
}
</style>
