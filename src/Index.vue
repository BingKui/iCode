<template>
    <div>
        <router-view v-if="isSearch" />
        <MainLayout v-else>
            <router-view />
            <Update />
        </MainLayout>
    </div>
</template>

<script>
import 'view-design/dist/styles/iview.css';
import MainLayout from '@views/layout/MainLayout';
import '@styles/main';
import Update from './views/components/Update.vue';
export default {
    name: 'index',
    components: {
        MainLayout,
        Update,
    },
    computed: {
        isSearch() {
            return this.$route.path.indexOf('search') > -1;
        },
    },
};
</script>
