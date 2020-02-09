<template>
    <div>
        <h1>Posts</h1>
        <span>Total Post <b> {{totalNumberOfPosts()}}</b></span>
        <div :key="post._id" v-for="post in posts">
            <Post :post="post" v-bind="isEditPost" @deletePost="$emit('deletePost', post._id)"
                  @setEditStatus="$emit('setEditStatus', post)"></Post>
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
