<template>
    <div class="v-setting-page setting-container padding-all-md">
        <Row :gutter="12">
            <Col :span="12">
                <SettingItem label="跟随系统启动" tip="开启后会随系统启动自动启动">
                    <iSwitch :width="30" :value="autoStart" @on-change="flag => handleAction(flag, 'autoStart')" @click.stop.native />
                </SettingItem>
            </Col>
            <Col :span="12">
                <SettingItem label="Dock显示" tip="仅对Mac生效，开启后在Dock中展示图标">
                    <iSwitch :width="30" :value="dockShow" @on-change="flag => handleAction(flag, 'dockShow')" @click.stop.native />
                </SettingItem>
            </Col>
            <Col :span="12">
                <SettingItem label="自动检查更新" tip="开启后每次启动都会自动检查版本更新">
                    <iSwitch :width="30" :value="autoUpdate" @on-change="flag => handleAction(flag, 'autoUpdate')" @click.stop.native />
                </SettingItem>
            </Col>
            <Col :span="12">
                <SettingItem label="软件更新" tip="检查软件版本，更新版本">
                    <Button size="small" type="primary" @click="checkUpdate">检查更新</Button>
                </SettingItem>
            </Col>
        </Row>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Switch, Button, Row, Col } from 'view-design';
import { checkAppUpdate } from '@common/update';
import SettingItem from './components/SettingItem.vue';
import logger from '@/common/logger';
export default {
    name: 'Setting', // 设置弹窗
    components: {
        iSwitch: Switch,
        Button,
        SettingItem,
        Row,
        Col,
    },
    data() {
        return {
            drawer: false,
        };
    },
    computed: {
        ...mapState({
            setting: state => state.app.setting,
            autoStart: state => state.app.setting.autoStart,
            dockShow: state => state.app.setting.dockShow,
            autoUpdate: state => state.app.setting.autoUpdate,
        }),
    },
    async mounted() {
        await this.getSystemSetting();
        logger.info('设置信息为 => ', this.setting);
    },
    methods: {
        ...mapActions([
            'getSystemSetting',
            'setSystemSetting',
        ]),
        open() {
            this.drawer = true;
        },
        close() {
            this.drawer = false;
        },
        checkUpdate() {
            this.close();
            checkAppUpdate();
        },
        async handleAction(flag, settingKey) {
            const info = {
                [settingKey]: flag,
            };
            await this.setSystemSetting(info);
        },
    },
};
</script>

<style lang="less">
.v-setting-page {
    user-select: none;
    .setting-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
    }
    .setting-tip {
        font-size: @font-size-sm;
        color: @gray;
    }
}
// @media (prefers-color-scheme: dark) {
//     .v-setting {
//         color: @dark-title-color;
//         .setting-tip {
//             color: @dark-switch-color;
//         }
//     }
// }
</style>
