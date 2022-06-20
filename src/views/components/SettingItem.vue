<template>
    <Card class="v-setting-item margin-bottom-md" dis-hover>
        <div class="setting-content flex-column-between">
            <div class="font-size font-weight-bold">{{ label }}</div>
            <div class="font-size-sm text-content">{{ tip }}</div>
            <div class="flex-row-end margin-top">
                <slot></slot>
            </div>
        </div>
    </Card>
</template>

<script>
import { Card } from 'view-design';
export default {
    name: 'SettingItem', // 设置项
    components: {
        Card,
    },
    props: {
        label: {
            type: String,
            default: '',
        },
        tip: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="less">
.v-setting-item {
    .setting-content {
        height: 80px;
    }
}
</style>
