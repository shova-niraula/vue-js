<template>
    <div>
        <div v-show="editStatus">
            <EditPost></EditPost>
        </div>
        <div v-show="!editStatus">
            <AddPost></AddPost>
        </div>
        <!-- Search form -->
        <div class="md-form mt-0">
            <b-form-input
                    class="form-control"
                    id="input-1"
                    type="text"
                    placeholder="Search"
                    v-model="$store.state.searchText"
                    v-on:keyup="addSearchTextToState"
            ></b-form-input>

        </div>

        <div class="text-left" v-show="$store.state.spinner">
            Loading .....
            <b-spinner label="Loading..."></b-spinner>
        </div>

        <div v-show="!$store.state.spinner" :key="post._id" v-for="post in filterPosts" class="post-div">
            <h2>{{post.title}}</h2>
            <p>{{post.description}}</p>
            <b-button @click="deletePost(post._id)" variant="outline-primary">Delete</b-button>
            <b-button @click="editPost(post)" variant="outline-primary">Edit</b-button>
            <b-button :to="{name: 'post', params: {id: post._id}}" variant="outline-primary">View</b-button>
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
        data() {
            return {
                search: '',
            }
        },
        created() {
            this.$store.dispatch('fetchPosts');
        },
        computed:
            mapState(
                {
                    posts: state => state.posts,
                    filterPosts: state => state.filterPosts,
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
            },
            addSearchTextToState: function () {
                this.$store.dispatch(('fetchFilterPosts'));
            }
        }

    }
</script>
<style scoped lang="scss">
    .post-div {
        margin: 10px;
        padding: 10px;

        button {
            margin-right: 10px;
        }
    }

    .md-form {
        padding: 20px;
        width: 50%;
    }
</style>
