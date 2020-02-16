<template>
    <div id="app" class="container">
        <Header></Header>
        <router-view></router-view>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import Header from "./components/Header";

    export default {
        name: 'App',
        components: {Header}
    }
</script>

<style scoped>

</style>
