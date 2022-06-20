<template>
    <div class="v-token-guide">
        <Button class="margin-top-md" type="text" @click="openGuide">怎么获取 Github Token ?</Button>
        <Drawer title="获取 GitHub Token" class-name="v-token-guide-drawer" v-model="show" width="600">
            <ScrollBar class="guide-container" padding>
                <div class="flex-column margin-top">
                    <div class="font-size-md font-weight-bold text-title">1.登录GitHub，进入设置界面</div>
                    <div class="font-size text-content margin-v">登录GitHub，后点击头像打开菜单，选择 Setting 打开设置。</div>
                    <div class="flex-row">
                        <img class="guide-image" height="400" src="../../assets/guide/setting.png" alt="">
                    </div>
                    <div class="font-size-md font-weight-bold text-title margin-top-md">2.进入开发者设置</div>
                    <div class="font-size text-content margin-v">选择左侧最后一个菜单 Develop Settings，进入开发者设置。</div>
                    <div class="flex-row">
                        <img class="guide-image" height="400" src="../../assets/guide/develop.png" alt="">
                    </div>
                    <div class="font-size-md font-weight-bold text-title margin-top-md">3.打开新建token</div>
                    <div class="font-size text-content margin-v">选择 Personal access tokens 下的 Generate new token，打开新建界面。</div>
                    <div class="flex-row">
                        <img class="guide-image" width="550" src="../../assets/guide/tokenList.png" alt="">
                    </div>
                    <div class="font-size-md font-weight-bold text-title margin-top-md">4.配置token信息</div>
                    <div class="font-size text-content margin-v">输入token的名字，选择有效期为：无有效期。</div>
                    <div class="flex-row">
                        <img class="guide-image" width="550" src="../../assets/guide/name.png" alt="">
                    </div>
                    <div class="font-size text-content margin-v">勾选 Gist 选项，然后新建token。</div>
                    <div class="flex-row">
                        <img class="guide-image" width="550" src="../../assets/guide/create.png" alt="">
                    </div>
                    <div class="font-size-md font-weight-bold text-title margin-top-md">5.获取token</div>
                    <div class="font-size text-content margin-v">复制创建的token内容。</div>
                    <div class="flex-row">
                        <img class="guide-image" width="550" src="../../assets/guide/copy.png" alt="">
                    </div>
                </div>
            </ScrollBar>
        </Drawer>
    </div>
</template>

<script>
import { Drawer, Button } from 'view-design';
import { ScrollBar } from '@components';
export default {
    name: 'TokenGuide', // 引导
    components: {
        Drawer,
        Button,
        ScrollBar,
    },
    data() {
        return {
            show: false,
        };
    },
    methods: {
        openGuide() {
            this.show = true;
        },
    },
};
</script>

<style lang="less">
.v-token-guide-drawer {
    .ivu-drawer-body {
        padding: 0;
    }
    .guide-container {
        height: calc(100vh - 51px);
    }
}
</style>
