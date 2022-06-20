<template>
    <div class="v-main-layout">
        <Layout>
            <Sider class="left-silder">
                <MainMenu />
            </Sider>
        </Layout>
        <Layout :style="{marginLeft: '200px'}">
            <Content class="right-content">
                <ScrollBar class="main-content-scrollbar">
                    <slot></slot>
                </ScrollBar>
            </Content>
        </Layout>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Sider, Layout, Content, Header, Spin } from 'view-design';
import ScrollBar from '@components/ScrollBar';
import MainMenu from './MainMenu';
export default {
    name: 'MainLayout',
    components: {
        Sider,
        MainMenu,
        Header,
        Layout,
        Content,
        ScrollBar,
        Spin,
    },
    async created() {
        // 获取配置的信息
        await this.getSystemSetting();
        await this.getContribute();
    },
    methods: {
        ...mapActions([
            'getSystemSetting',
            'getContribute',
        ]),
    },
};
</script>

<style lang="less">
@header-height: 40px;
@content-height: 100vh;
.v-main-layout {
    .v-main-header {
        height: @header-height;
        .border-line(@border-color, 0, 0);
    }
    .v-main-content {
        height: @content-height;
    }
    .left-silder {
        height: @content-height;
        position: fixed;
        left: 0;
        background-color: @white;
        user-select: none;
        .ivu-menu-item-group-title {
            -webkit-app-region: drag;
        }
    }
    .right-content {
        overflow: hidden;
        height: @content-height;
        padding: 0;
        .main-content-scrollbar {
            height: @content-height;
        }
    }
}
</style>
