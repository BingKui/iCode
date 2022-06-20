<template>
    <div class="v-token-bind flex-column-center">
        <Button type="primary" @click="openModal">绑定 Github Token</Button>
        <TokenGuide />
        <Modal
            title="绑定 GitHub Token"
            v-model="showModal"
            class-name="bind-token-modal flex-row-center"
            @on-ok="handleOk"
        >
            <Input placeholder="输入 GitHub Token" autofocus v-model="token" />
        </Modal>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Button, Input, Modal } from 'view-design';
import { errorTip } from '@/common/tip';
import { initGistRepo } from '@/common/gist';
import TokenGuide from './TokenGuide.vue';
import logger from '@/common/logger';
export default {
    name: 'TokenBind', // 绑定token
    components: {
        Button,
        Input,
        Modal,
        TokenGuide,
    },
    data() {
        return {
            showModal: false,
            token: '',
        };
    },
    methods: {
        ...mapActions([
            'getBindUserInfo',
            'setSystemSetting',
        ]),
        openModal() {
            this.showModal = true;
        },
        async handleOk() {
            if (!this.token || !this.token.trim()) {
                errorTip('GitHub Token 不能为空！');
                return false;
            }
            if (!this.token.startsWith('ghp_')) {
                errorTip('不是有效的 GitHub Token ！');
                return false;
            }
            this.$emit('loading', true);
            const token = this.token.trim();
            logger.info('绑定token', token);
            // 执行绑定
            const info = {
                githubToken: token,
            };
            await this.setSystemSetting(info);
            await this.getBindUserInfo(token);
            const ids = await initGistRepo(token);
            logger.success('初始化仓库成功 ->', ids);
            await this.setSystemSetting({ ...ids });
            this.$emit('loading', false);
        },
    },
};
</script>

<style lang="less">
.v-token-bind {
    width: 100%;
    height: 100%;
    min-height: 100px;
}
.bind-token-modal {
    .ivu-modal{
        top: 0;
    }

}
</style>
