<template>
    <Card class="v-user-info" dis-hover>
        <div v-if="githubToken" class="flex-row-between">
            <Avatar :src="userInfo.avatar" :size="120" />
            <div class="flex-item-one flex-row">
                <div class="flex-column margin-left-md">
                    <div class="font-size-28 font-weight-bold">{{ userInfo.name }}</div>
                    <div class="font-size-lg text-sub">{{ userInfo.login }}</div>
                    <div class="font-size margin-top-md text-color">{{ userInfo.bio }}</div>
                </div>
                <div class="flex-column margin-left-lg">
                    <div class="flex-row">
                        <Peoples theme="outline" class="margin-right" size="16" fill="#333" :strokeWidth="2"/>
                        {{ userInfo.followers }} 粉丝 · {{ userInfo.following }} 关注
                    </div>
                    <div class="flex-row">
                        <BuildingOne theme="outline" class="margin-right" size="16" fill="#333" :strokeWidth="2"/>
                        {{ userInfo.company }}
                    </div>
                    <div class="flex-row">
                        <LocalTwo theme="outline" class="margin-right" size="16" fill="#333" :strokeWidth="2"/>
                        {{ userInfo.location }}
                    </div>
                    <div class="flex-row">
                        <EmailSecurity theme="outline" class="margin-right" size="16" fill="#333" :strokeWidth="2"/>
                        {{ userInfo.email }}
                    </div>
                    <div class="flex-row">
                        <LinkTwo theme="outline" class="margin-right" size="16" fill="#333" :strokeWidth="2"/>
                        {{ userInfo.blog }}
                    </div>
                </div>
            </div>
            <div class="flex-column padding-all-md">
                <div class="pointer-element" @click="openGithub">
                    <GithubOne theme="outline" size="30" fill="#333" :strokeWidth="2" />
                </div>
                <div class="pointer-element" @click="logoutUser">
                    <Logout theme="outline" class="margin-top" size="30" fill="#333" :strokeWidth="2"/>
                </div>
            </div>
            <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
        <TokenBind v-else @loading="handleLoading" />
    </Card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { Avatar, Card, Spin } from 'view-design';
import { Peoples, GithubOne, BuildingOne, LocalTwo, EmailSecurity, LinkTwo, Logout } from '@icon-park/vue';
import TokenBind from './TokenBind.vue';
import { openUrl } from '@/feature/utils';
export default {
    name: 'UserInfo', // 用户信息
    components: {
        Avatar,
        Card,
        TokenBind,
        Peoples,
        GithubOne,
        BuildingOne,
        LocalTwo,
        EmailSecurity,
        LinkTwo,
        Logout,
        Spin,
    },
    data() {
        return {
            spinShow: false,
        };
    },
    computed: {
        ...mapState({
            githubToken: state => state.app.setting.githubToken,
            userInfo: state => state.app.userInfo,
        }),
    },
    watch: {
        githubToken(val, oldVal) {
            if (val) this.syncInfo(val);
        }
    },
    mounted() {
        if (!this.userInfo.id && this.githubToken) {
            this.syncInfo(this.githubToken);
        }
    },
    methods: {
        ...mapActions([
            'getBindUserInfo',
            'logoutUser',
        ]),
        openGithub() {
            openUrl(this.userInfo.link);
        },
        handleLoading(flag) {
            this.spinShow = flag;
        },
        async syncInfo(token) {
            this.spinShow = true;
            this.getBindUserInfo(token);
            this.spinShow = false;
        },
    },
};
</script>

<style lang="less">
.v-user-info {
    .i-icon {
        align-items: center;
        display: flex;
    }
}
</style>
