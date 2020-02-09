<template>
    <div>
        <h1>Posts</h1>
        <span>Total Post <b> {{totalNumberOfPosts()}}</b></span>
        <div v-bind:key="post._id" v-for="post in posts">
            <Post v-bind:post="post" v-bind="isEditPost" v-on:deletePost="$emit('deletePost', post._id)"
                  v-on:setEditStatus="$emit('setEditStatus', post)"></Post>
        </div>

    </div>
</template>

<script>
    import Post from "./Post";

    export default {
        name: "Posts",
        props: ["posts", "isEditPost"],
        components: {
            Post
        },
        methods: {
            totalNumberOfPosts: function () {
                return this.posts.length;
            }
        }
    }
</script>

<style scoped>

</style>
