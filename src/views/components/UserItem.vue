<template>
    <div class="v-user-item flex-row padding-h padding-v-sm" @click="openDetail">
        <Avatar :src="info.avatar" size="small">{{ info.name }}</Avatar><span class="margin-left">{{ info.name }}</span>
    </div>
</template>

<script>
import { openUrl } from '@/feature/utils';
import { Avatar } from 'view-design';
export default {
    name: 'UserItem', // 用户
    components: {
        Avatar,
    },
    props: {
        info: {
            type: Object,
            default: () => {},
        },
    },
    methods: {
        openDetail() {
            const { info } = this.$props;
            if (info.link) {
                openUrl(info.link);
            }
        },
    },
};
</script>

<style lang="less" scoped>
.v-user-item {
    border: @border-mini;
    background-color: @white;
    cursor: pointer;
}
</style>
