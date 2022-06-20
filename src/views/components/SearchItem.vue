<template>
    <div :class="`v-search-item flex-row-between padding-h ${active ? 'is-active' : ''}`" @click="handleClick">
        <div class="">
            <!-- 类型 -->
            <Tag :color="tagInfo.color">{{ tagInfo.value }}</Tag>
            <!-- 名字 -->
            <span class="font-size-lg font-weight-bold text-title">{{ info.name }}</span>
        </div>
        <div class="flex-row-end">
            <!-- 用户 -->
            <div class="flex-row margin-right">
                <Avatar :src="info.user.avatar" size="small" icon="ios-person" />
                <span class="margin-left-sm">{{ info.user.name }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { Tag, Avatar } from 'view-design';
import { Time } from '@icon-park/vue';
import { RESOURCE_TYPE_LIST } from '@constants/gist';
export default {
    name: 'SearchItem', // 搜索项
    components: {
        Tag,
        Avatar,
        Time,
    },
    computed: {
        tagInfo() {
            const { info } = this.$props;
            return RESOURCE_TYPE_LIST.filter(item => item.type === info.type)[0];
        },
    },
    props: {
        active: {
            type: Boolean,
            default: false,
        },
        info: {
            type: Object,
            default: () => {},
        },
    },
    methods: {
        handleClick() {
            this.$emit('select', this.$props.info);
        },
    },
};
</script>

<style lang="less" scoped>
.v-search-item {
    height: @searchItemHeight;
    width: 100%;
    border-bottom: @border;
    &.is-active {
        background-color: rgba(45, 140, 240, .1);
    }
}
</style>
