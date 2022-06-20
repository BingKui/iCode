<template>
    <div class="v-main-page padding-all-md">
        <!-- 配置的用户为 -->
        <UserInfo />
        <!-- 贡献代码的用户 -->
        <div v-if="userList.length > 0">
            <Divider orientation="left">代码贡献者</Divider>
            <Space>
                <UserItem v-for="item in userList" :info="item" :key="item.id" />
            </Space>
        </div>
        <Sync />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { Divider, Card, Button } from 'view-design';
import { Page, Space } from '@components';
import UserInfo from './components/UserInfo.vue';
import UserItem from './components/UserItem.vue';
import Sync from './components/Sync.vue';
export default {
    name: 'Main',
    components: {
        Page,
        Divider,
        Space,
        UserItem,
        Card,
        Button,
        UserInfo,
        Sync,
    },
    computed: {
        ...mapState({
            userList: state => state.app.userList,
        }),
    },
};
</script>

<style lang="less" scoped>
.v-main-page {}
</style>
