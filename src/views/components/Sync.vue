<template>
    <div v-if="githubToken" :class="`v-sync flex-row-center pointer-element ${isSync ? 'sync' : ''}`" @click.stop="handleSync" title="同步">
        <Refresh theme="outline" size="30" fill="#333" :strokeWidth="3" />
        <!-- 本地多出的部分，选择处理方式 -->
        <Drawer v-model="showMore" title="本地多出代码处理" :width="600" :mask-closable="false" :closable="false">
            <div class="text-sub font-size margin-bottom">本地代码与线上不一致，以下为多出的部分：</div>
            <div>
                <CodeItem v-for="item in moreList" :key="item.id" :info="item" :onlyShow="true" />
            </div>
            <Space>
                <Button type="error" @click="delAll">全部删除</Button>
                <Button type="primary" @click="updateAll">同步到线上</Button>
            </Space>
        </Drawer>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { Drawer, Button, Tag } from 'view-design';
import { Space } from '@components';
import CodeItem from './CodeItem.vue';
import { Refresh } from '@icon-park/vue';
import { addPrivateItem, addPublicItem, syncPrivateCode, syncPublicCode } from '@/common/gist';
import { errorTip, successTip } from '@/common/tip';
import { delItem } from '@/common/db';
import DB_NAME from '@/constants/db';
export default {
    name: 'Sync', // 同步
    components: {
        Refresh,
        Drawer,
        Space,
        Button,
        Tag,
        CodeItem,
    },
    computed: {
        ...mapState({
            githubToken: state => state.app.setting.githubToken,
            publicId: state => state.app.setting.publicId,
            privateId: state => state.app.setting.privateId,
        }),
    },
    data() {
        return {
            isSync: false,
            isPrivate: false,
            showMore: false,
            moreList: [],
        };
    },
    methods: {
        ...mapActions([
            'updateLocal',
        ]),
        async handleSync() {
            this.isSync = true;
            await this.syncPrivate();
        },
        async syncPrivate() {
            const list = await syncPrivateCode(this.githubToken, this.privateId);
            if (!list) errorTip('私有代码同步失败！');
            this.isPrivate = true;
            if (list && list.length > 0) {
                this.moreList = list;
                this.showMore = true;
            } else {
                successTip('私有代码同步完成！');
                await this.syncPublic();
            }
        },
        async syncPublic() {
            const list = await syncPublicCode(this.githubToken, this.publicId);
            if (!list) errorTip('公共代码同步失败！');
            this.isPrivate = false;
            if (list && list.length > 0) {
                this.moreList = list;
                this.showMore = true;
            } else {
                successTip('公共代码同步完成！');
                await this.updateLocal();
                successTip('代码同步完成！');
                this.isSync = false;
            }
        },
        async delAll() {
            for (let i = 0; i < this.moreList.length; i++) {
                const item = this.moreList[i];
                await delItem(DB_NAME.local, item._id);
            }
            this.showMore = false;
            this.isPrivate ? successTip('私有代码同步完成！') : successTip('公共代码同步完成！');
            this.isPrivate && await this.syncPublic();
        },
        async updateAll() {
            for (let i = 0; i < this.moreList.length; i++) {
                const item = this.moreList[i];
                this.isPrivate ? await addPrivateItem(this.githubToken, this,this.privateId, item)
                    : await addPublicItem(this.githubToken, this.publicId, item);
            }
            this.showMore = false;
            this.isPrivate ? successTip('私有代码同步完成！') : successTip('公共代码同步完成！');
            this.isPrivate && await this.syncPublic();
        },
    },
};
</script>

<style lang="less" scoped>
.v-sync {
    position: fixed;
    height: 60px;
    width: 60px;
    border-radius: 60px;
    right: @gap-lg;
    bottom: @gap-lg;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .2);
    &.sync {
        animation: fadenum 2s infinite;
    }
}
@keyframes fadenum{
   100%{transform:rotate(360deg);}
}
</style>
