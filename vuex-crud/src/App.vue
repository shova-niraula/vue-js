<template>
    <div id="app" class="container">
        <Post></Post>
    </div>
</template>

<script>
    import Post from './components/Posts.vue'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    export default {
        name: 'App',
        components: {
            Post
        }
    }
</script>

<style scoped>

</style>
