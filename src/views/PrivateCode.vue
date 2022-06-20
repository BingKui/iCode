<template>
    <div class="v-public-code-page">
        <!-- PrivateCode -->
        <!-- 具体信息，如果没有绑定 GitHub token 则智能本地用，无法同步线上数据 -->
        <Space class="padding-h-md padding-v-lg">
            <!-- 搜索框 -->
            <Input class="flex-item-one" placeholder="搜索私有代码" v-model="searchValue" search @on-change="handleSearch" />
            <Button type="primary" @click="handleAddPrivate">添加</Button>
        </Space>
        <!-- 列表，支持分页 -->
        <ScrollBar class="code-list-container" padding>
            <CodeItem v-for="item in privateCodeList" :key="item.id" :info="item" @refresh="handleSearch" />
            <Empty v-if="privateCodeList.length == 0" />
        </ScrollBar>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Button, Input, Card } from 'view-design';
import { ScrollBar, Space, Empty } from '@components';
import AuthPart from './components/AuthPart.vue';
import CodeItem from './components/CodeItem.vue';
import _ from 'lodash';
export default {
    name: 'PrivateCode', // 私有
    components: {
        Button,
        AuthPart,
        Input,
        Card,
        ScrollBar,
        CodeItem,
        Space,
        Empty,
    },
    computed: {
        ...mapState({
            privateCodeList: state => state.code.privateCodeList,
        }),
    },
    data() {
        return {
            searchValue: '',
        };
    },
    async mounted() {
        await this.searchPrivate('');
    },
    methods: {
        ...mapActions([
            'searchPrivate',
        ]),
        handleAddPrivate() {
            this.$router.push({
                path: 'private-add',
                query: {
                    isPublic: 0
                },
            });
        },
        async handleSearch() {
            await this.searchPrivate(this.searchValue);
        },
        async refreshList() {
            await this.searchPrivate(this.searchValue);
        },
    },
};
</script>

<style lang="less" scoped>
.v-public-code-page {
    .code-list-container {
        height: calc(100vh - 72px);
    }
}
</style>
