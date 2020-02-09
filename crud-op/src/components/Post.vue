<template>
    <div panel panel-default v-cloak>
        <h5>{{post.title}}</h5>
        <p>{{post.description}}</p>
        <button type="button" class="btn btn-link" style="margin-right: 5px" @click="$emit('deletePost', post._id)">
            Delete
        </button>
        <button type="button" class="btn btn-link" @click="setEditStatus">Edit</button>
    </div>
</template>

<script>
    export default {
        name: "Post",
        props: ["post", "isEditPost"],
        methods: {
            setEditStatus: function () {
                this.isEditPost = true;
                this.$emit('setEditStatus', this.post);
            }
        }
    }
</script>

<style scoped>

</style>
