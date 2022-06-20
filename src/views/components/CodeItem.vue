<template>
    <Card class="v-code-item margin-bottom-md" dis-hover>
        <div v-if="info.isOwner && !onlyShow" class="edit-delete-action flex-row">
            <div class="edit margin-right pointer-element" @click.stop="handleEdit">
                <EditTwo theme="outline" size="18" fill="#333" :strokeWidth="3"/>
            </div>
            <div class="delete pointer-element" @click.stop="handleDelete">
                <Delete theme="outline" size="18" fill="#ed4014" :strokeWidth="3"/>
            </div>
        </div>
        <div class="flex-row">
            <!-- 类型 -->
            <Tag :color="tagInfo.color">{{ tagInfo.value }}</Tag>
            <!-- 名字 -->
            <span class="font-size-lg font-weight-bold text-title">{{ info.name }}</span>
        </div>
        <!-- 描述 -->
        <div v-if="info.desc" class="text-sub font-size margin-top">{{ info.desc }}</div>
        <!-- 代码内容 -->
        <CodePart class="margin-top" :code="info.content" :type="info.type" />
        <div class="flex-row margin-top">
            <!-- 作者，头像、名称 -->
            <div class="flex-row margin-right">
                <Avatar :src="info.user.avatar" size="small" />
                <span class="margin-left-sm">{{ info.user.name }}</span>
            </div>
            <!-- 添加时间 -->
            <div class="flex-row">
                <Time theme="outline" size="18" fill="#333" :strokeWidth="2"/>
                <span class="margin-left-sm">{{ info.date | timeFormat }}</span>
            </div>
        </div>
    </Card>
</template>

<script>
import { mapState } from 'vuex';
import { Tag, Card, Avatar } from 'view-design';
import { Time, EditTwo, Delete } from '@icon-park/vue';
import CodePart from './CodePart.vue';
import { RESOURCE_TYPE_LIST } from '@constants/gist';
import { delItem } from '@/common/db';
import DB_NAME from '@/constants/db';
import { deletePrivateItem, deletePublicItem } from '@/common/gist';
import { successNotice } from '@/common/notice';
export default {
    name: 'CodeItem', // 单项
    components: {
        Card,
        Avatar,
        Tag,
        Time,
        EditTwo,
        Delete,
        CodePart,
    },
    props: {
        info: {
            type: Object,
            default: () => {},
        },
        onlyShow: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState({
            githubToken: state => state.app.setting.githubToken,
            publicId: state => state.app.setting.publicId,
            privateId: state => state.app.setting.privateId,
        }),
        tagInfo() {
            const { info } = this.$props;
            return RESOURCE_TYPE_LIST.filter(item => item.type === info.type)[0];
        },
    },
    methods: {
        handleEdit() {
            const { info } = this.$props;
            this.$router.push({
                path: 'public-add',
                query: {
                    isPublic: info.isPublic ? 1 : 0,
                    editId: info._id,
                },
            });
        },
        async handleDelete() {
            const { info } = this.$props;
            await delItem(DB_NAME.local, info._id);
            successNotice('删除成功！');
            this.$emit('refresh');
            if (this.githubToken) {
                info.isPublic ? await deletePublicItem(this.githubToken, this.publicId, info.id)
                    : await deletePrivateItem(this.githubToken, this.privateId, info.id);
            }
        },
    },
};
</script>

<style lang="less" scoped>
.v-code-item {
    position: relative;
    .edit-delete-action {
        position: absolute;
        top: @gap-md;
        right: @gap-md;
    }
}
</style>
