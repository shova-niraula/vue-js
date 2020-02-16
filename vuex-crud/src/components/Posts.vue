<template>

    <div>
        <div v-show="editStatus">
            <EditPost></EditPost>
        </div>
        <div v-show="!editStatus">
            <AddPost></AddPost>
        </div>
        <div :key="post._id" v-for="post in posts">
            <h2>{{post.title}}</h2>
            <p>{{post.description}}</p>
            <b-button @click="deletePost(post._id)" style="margin-right: 10px" variant="outline-primary">Delete
            </b-button>
            <b-button @click="editPost(post)" style="margin-right: 10px" variant="outline-primary">Edit</b-button>
            <b-button :to="{ name: 'post', params: { id: post._id }}" variant="outline-primary">View</b-button>
        </div>
    </div>
</template>

<script>

    import AddPost from "./AddPost";
    import EditPost from "./EditPost";
    import {mapState} from 'vuex';

    export default {
        name: 'Posts',
        components: {AddPost, EditPost},
        created() {
            this.$store.dispatch('fetchPosts');
        },
        computed:
            mapState(
                {
                    posts: state => state.posts,
                    editStatus: state => state.editPost
                }),
        methods: {
            deletePost: function (id) {
                this.$store.dispatch(('deletePost'), id);
            },
            editPost: function (editPostRec) {
                let payload = {
                    editRecord: editPostRec,
                    status: true
                }
                this.$store.dispatch(('editPost'), payload);
            }
        }

    }
</script>
