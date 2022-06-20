<template>
    <div class="v-public-code-page">
        <!-- PublicCode
        更新公共代码
        拉取公共代码库的资源列表
        逐个资源库资源获取，更新本地数据库 -->
        <!-- 具体信息，如果没有绑定 GitHub token 则显示不可用，需要绑定token -->
        <AuthPart>
            <Space class="padding-h-md padding-v-lg">
                <!-- 搜索框 -->
                <Input class="flex-item-one" placeholder="搜索公共代码" v-model="searchValue" search @on-change="handleSearch" />
                <Button type="primary" @click="handleAddPublic">添加</Button>
            </Space>
            <!-- 列表，支持分页 -->
            <ScrollBar class="code-list-container" padding>
                <CodeItem v-for="item in publicCodeList" :key="item.id" :info="item" @refresh="handleSearch" />
                <Empty v-if="publicCodeList.length == 0" />
            </ScrollBar>
        </AuthPart>
        <!-- 如果有绑定token，获取线上是否创建公共gist，没创建直接创建，并更新公共仓库数据 -->
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
    name: 'PublicCode', // 公共
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
            publicCodeList: state => state.code.publicCodeList,
        }),
    },
    data() {
        return {
            searchValue: '',
        };
    },
    async mounted() {
        await this.searchPublic('');
    },
    methods: {
        ...mapActions([
            'searchPublic',
        ]),
        handleAddPublic() {
            this.$router.push({
                path: 'public-add',
                query: {
                    isPublic: 1
                },
            });
        },
        async handleSearch() {
            await this.searchPublic(this.searchValue);
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
