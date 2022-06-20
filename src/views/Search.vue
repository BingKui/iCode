<template>
    <div class="v-search-page">
        <div class="drag-element">
            <Input class="search-input" v-model="searchValue" autofocus search placeholder="输入搜索的代码...." @on-change="handleSearch" @on-keydown="clearEvent"></Input>
        </div>
        <ScrollBar v-if="this.searchValue" :style="`height: ${resultHeight}px;`" class="search-result" :offsetAdd="offsetAdd" :offsetMinus="offsetMinus">
            <SearchItem
                v-for="(item, idx) in searchCodeList"
                :key="item.id"
                :active="activeIndex == idx"
                :info="item"
                @select="handleCopyAction"
            />
        </ScrollBar>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { Input } from 'view-design';
import SearchItem from './components/SearchItem.vue';
import { ScrollBar } from '@components';
import { renderEvent } from '@/common/utils';
import { ACTION_KEY } from '@/constants/channel';
import { SEARCH_WINDOW } from '@constants/common';
import { copyText } from '@/common/common';
import { sysNotice } from '@/common/notice';
export default {
    name: 'Search', // 搜索
    components: {
        Input,
        SearchItem,
        ScrollBar,
    },
    computed: {
        ...mapState({
            searchCodeList: state => state.code.searchCodeList,
        }),
        resultHeight() {
            const len = this.searchCodeList.length > SEARCH_WINDOW.itemMaxLength ? SEARCH_WINDOW.itemMaxLength : this.searchCodeList.length;
            return SEARCH_WINDOW.itemHeight * len + 1;
        },
    },
    watch: {
        searchCodeList(list, oldList) {
            const len = list.length > SEARCH_WINDOW.itemMaxLength ? SEARCH_WINDOW.itemMaxLength : list.length;

            if (this.activeIndex >= list.length - 1) {
                this.activeIndex = list.length - 1;
            } else {
                this.activeIndex = 0;
            }
            renderEvent(ACTION_KEY.searchAction, {
                height: len * SEARCH_WINDOW.itemHeight + SEARCH_WINDOW.minHeight + 1,
            });
        },
        searchValue(value, oldVal) {
            if (!value) {
                renderEvent(ACTION_KEY.searchAction, {
                    height: SEARCH_WINDOW.minHeight,
                });
            }
        },
        activeIndex(idx, oldIdx) {
            const itemActive = idx + 1;
            if (idx > oldIdx) {
                // 向下运动
                if (itemActive >= SEARCH_WINDOW.itemMaxLength) {
                    this.offsetAdd = SEARCH_WINDOW.minHeight * (itemActive - SEARCH_WINDOW.itemMaxLength);
                }
                this.offsetMinus = 0;
            } else {
                this.offsetAdd = 0;
                // 向上运动
                this.offsetMinus += SEARCH_WINDOW.itemMaxLength;
            }
        },
    },
    data() {
        return {
            searchValue: '',
            activeIndex: 0,
            offsetAdd: 0,
            offsetMinus: 0,
        };
    },
    async mounted() {
        await this.searchCode(this.searchValue);
        window.removeEventListener('keydown', this.handleKeyCodeEvent);
        window.addEventListener('keydown', this.handleKeyCodeEvent);
    },
    methods: {
        ...mapActions([
            'searchCode',
        ]),
        async handleSearch() {
            if (this.searchValue) {
                await this.searchCode(this.searchValue);
            }
        },
        handleKeyCodeEvent(event) {
            const code = event.keyCode;
            if (code === 40) {
                this.addActiveIndex();
            }
            if (code === 38) {
                this.minuteActiveIndex();
            }
            if (code === 13) {
                // 复制内容，关闭窗口
                this.copyAndClose();
            }
        },
        clearEvent(event) {
            const code = event.keyCode;
            console.log(code);
            if (code === 40 || code === 38) {
                event.preventDefault();
            }
        },
        copyAndClose() {
            if (this.searchCodeList.length === 0) return;
            const item = this.searchCodeList[this.activeIndex];
            this.handleCopyAction(item);
        },

        handleCopyAction(item) {
            copyText(item.content);
            sysNotice('已复制到粘贴板', `${item.name}代码已复制到粘贴板！`);
            window.close();
            this.searchValue = '';
        },
        addActiveIndex() {
            const maxIndex = this.searchCodeList.length - 1;
            if (this.activeIndex < maxIndex) {
                this.activeIndex += 1;
            } else {
                this.activeIndex = maxIndex;
            }
        },
        minuteActiveIndex() {
            let idx = this.activeIndex;
            if (idx > 1) {
                this.activeIndex = idx - 1;
            } else {
                this.activeIndex = 0;
            }
        },
    },
};
</script>

<style lang="less">
.v-search-page {
    width: 680px;
    border: none;
    cursor: default;
    .search-input {
        padding-left: @gap-md;
        cursor: default;
        height: @searchItemHeight;
        outline: none;
        .ivu-input-icon {
            width: @searchItemHeight;
            height: @searchItemHeight;
            font-size: 25px;
            line-height: @searchItemHeight;
        }
        .ivu-input {
            height: @searchItemHeight;
            border: none;
            outline: none;
            font-size: 24px;
            &:focus {
                box-shadow: none;
            }
        }
    }
    .search-result {
        border-top: @border;
        .v-search-item {
            &:last-child {
                border-bottom: none;
            }
        }
    }
}
</style>
