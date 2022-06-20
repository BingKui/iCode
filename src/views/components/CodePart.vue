<template>
    <div class="v-code-part">
        <div class="copy pointer-element" @click.stop="copyCode">
            <Copy theme="outline" size="18" fill="#FFFFFF" :strokeWidth="3"/>
        </div>
        <VueCodeHighlight :lang="type">
            <pre>{{ code }}</pre>
        </VueCodeHighlight>
    </div>
</template>

<script>
import { Button } from 'view-design';
import { Copy } from '@icon-park/vue';
import { component as VueCodeHighlight } from 'vue-code-highlight';
import 'vue-code-highlight/themes/duotone-sea.css';
import { copyText } from '@/common/common';
import { successTip } from '@/common/tip';
export default {
    name: 'CodePart', // 代码部分，高亮，复制
    components: {
        Button,
        Copy,
        VueCodeHighlight,
    },
    props: {
        type: {
            type: String,
            default: 'text',
        },
        code: {
            type: String,
            default: '',
        },
    },
    methods: {
        copyCode() {
            const { code } = this.$props;
            copyText(code);
            successTip('已复制到粘贴板！');
        },
    },
};
</script>

<style lang="less" scoped>
.v-code-part {
    position: relative;
    .copy {
        position: absolute;
        right: @gap;
        top: @gap;
    }
}
</style>
