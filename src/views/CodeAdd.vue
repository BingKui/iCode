<template>
    <Page class="v-code-add-page" :header="`${isEdit ? '更新' : '添加'}${isPublic ? '公共' : '私有'}代码`">
        <Form ref="addForm" class="margin-top-md" :model="formItem" :rules="ruleValidate" :label-width="80">
            <FormItem label="代码名称" prop="name">
                <Input v-model="formItem.name" placeholder="输入名称"></Input>
            </FormItem>
            <FormItem label="描述" prop="desc">
                <Input v-model="formItem.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="描述信息，可以用来说明，支持搜索"></Input>
            </FormItem>
            <FormItem label="代码" prop="content">
                <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 4,maxRows: 10}" placeholder="输入代码内容"></Input>
            </FormItem>
            <FormItem label="类型" prop="type">
                <Select v-model="formItem.type" filterable>
                    <Option v-for="item in typeList" :value="item.type" :key="item.type">{{ item.value }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button type="primary" :loading="isLoading" @click="() => isEdit ? handleEdit() : handelAdd()">{{isEdit ? '更新' : '添加'}}</Button>
                <Button class="margin-left" @click="handleCancel">取消</Button>
            </FormItem>
        </Form>
    </Page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Form, FormItem, Button, Input, Select, Option } from 'view-design';
import { Page } from '@components';
import { RESOURCE_TYPE_LIST } from '@constants/gist';
import { createUuid } from '@/feature/utils';
import logger from '@/common/logger';
import { addItem, getItem, updateItem } from '@/common/db';
import DB_NAME from '@/constants/db';
import { addContributeItem, addPrivateItem, addPublicItem, updatePrivateItem, updatePublicItem } from '@/common/gist';
import { infoNotice, successNotice } from '@/common/notice';
export default {
    name: 'CodeAdd', // 添加
    components: {
        Page,
        Form,
        FormItem,
        Button,
        Input,
        Select,
        Option,
    },
    data() {
        return {
            isEdit: false,
            editInfo: null,
            isPublic: false,
            isLoading: false,
            typeList: RESOURCE_TYPE_LIST,
            formItem: {
                name: '',
                desc: '',
                content: '',
                type: '',
            },
            ruleValidate: {
                name: [
                    { required: true, message: '名称不能为空', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '代码内容不能为空', trigger: 'blur' },
                ],
                type: [
                    { required: true, message: '类型必选', trigger: 'change' }
                ],
            }
        };
    },
    computed: {
        ...mapState({
            githubToken: state => state.app.setting.githubToken,
            publicId: state => state.app.setting.publicId,
            privateId: state => state.app.setting.privateId,
            userInfo: state => state.app.userInfo,
        }),
    },
    async created() {
        const { isPublic, editId } = this.$route.query;
        this.isPublic = isPublic == 1;
        if (editId) {
            this.isEdit = true;
            const info = await getItem(DB_NAME.local, editId);
            this.editInfo = info;
            this.formItem = {
                name: info.name,
                desc: info.desc,
                content: info.content,
                type: info.type,
            };
        }
    },
    methods: {
        ...mapActions([
            'addContribute',
        ]),
        handelAdd() {
            this.$refs.addForm.validate(async flag => {
                if (!flag) return;
                this.isLoading = true;
                let item = {
                    id: createUuid(),
                    ...this.formItem,
                    isPublic: this.isPublic,
                    date: +new Date(),
                    user: null,
                };
                // 存在用户信息
                if (this.githubToken && this.isPublic) {
                    item = {
                        ...item,
                        user: {
                            avatar: this.userInfo.avatar,
                            name: this.userInfo.name,
                            id: this.userInfo.id,
                            link: this.userInfo.link,
                        },
                    };
                }
                logger.info('添加的内容为 =>', item);
                // 添加到本地
                await addItem(DB_NAME.local, { ...item, isOwner: true });
                // 添加到远程
                if (this.isPublic) {
                    await addPublicItem(this.githubToken, this.publicId, item);
                    await this.addContribute({
                        gistId: this.publicId,
                        avatar: this.userInfo.avatar,
                        name: this.userInfo.name,
                        id: this.userInfo.id,
                        link: this.userInfo.link,
                    });
                } else {
                    await addPrivateItem(this.githubToken, this.privateId, item);
                }
                successNotice(`${item.name}添加成功！`);
                this.isLoading = false;
                this.$router.back();
            });
        },
        handleEdit() {
            this.$refs.addForm.validate(async flag => {
                if (!flag) return;
                let item = {
                    ...this.editInfo,
                    ...this.formItem,
                    isPublic: this.isPublic,
                    date: +new Date(),
                };
                this.isLoading = true;
                // 更新本地
                const _item = await updateItem(DB_NAME.local, this.editInfo._id, item);
                // 更新远程数据
                if (this.isPublic) {
                    await updatePublicItem(this.githubToken, this.publicId, item);
                } else {
                    await updatePrivateItem(this.githubToken, this.privateId, item);
                }
                successNotice(`${item.name}更新成功！`);
                this.isLoading = false;
                this.$router.back();
            });
        },
        handleCancel() {
            this.$router.back();
        },
    },
};
</script>

<style lang="less" scoped>

</style>
