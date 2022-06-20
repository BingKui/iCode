<template>
    <div class="v-empty flex-column-center">
        <Icon type="ios-albums-outline" :size="65" color="#CCCCCC" />
        <span class="font-size text-gray margin-top-md">{{ message }}</span>
    </div>
</template>

<script>
import { Icon } from 'view-design';
export default {
    name: 'Empty', // 空
    components: {
        Icon,
    },
    props: {
        message: {
            type: String,
            default: '空空如也',
        },
    },
};
</script>

<style lang="less" scoped>
.v-empty {
    min-height: 300px;
    user-select: none;
}
</style>
