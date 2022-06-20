<template>
    <div class="v-auth-part">
        <div v-if="!githubToken" class="auth-disable text-danger">
            <Info class="margin-right" theme="outline" size="18" fill="#ed4014" :strokeWidth="2"/>
            暂未绑定 GitHub Token，无法操作
        </div>
        <div class="auth-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { Info } from '@icon-park/vue';
export default {
    name: 'AuthPart', // 需要认证的操作区域
    props: {
        message: {
            type: String,
            default: '',
        },
    },
    components: {
        Info,
    },
    computed: {
        ...mapState({
            githubToken: state => state.app.setting.githubToken,
        }),
    },
};
</script>

<style lang="less" scoped>
.v-auth-part {
    position: relative;
    .auth-disable {
        z-index: 10;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: @disable-color;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: .95;
    }
    .auth-content {
        z-index: 8;
    }
}
</style>
