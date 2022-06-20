<template>
    <div class="v-about-page flex-column-center">
        <img src="../assets/app.png" alt="">
        <div class="font-size-32 margin-v-lg">{{pkg.name}}</div>
        <div class="font-size">Version. v{{pkg.version}}</div>
        <div class="font-size-sm margin-top-sm">Copyright © 2022 {{pkg.author}}. All rights reserved.</div>
    </div>
</template>

<script>
const PKG = require('../../package.json');
export default {
    name: 'About', // 关于
    data() {
        return {
            pkg: PKG,
        };
    },
};
</script>

<style lang="less" scoped>
.v-about-page {
    height: 100vh;
}
</style>
