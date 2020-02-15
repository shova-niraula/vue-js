<template>
    <div>
        <h3> Edit Post</h3>
        <h1>{{getEditPost.title}}</h1>
        <div id="addForm">
            <b-form v-on:submit.prevent="onSubmit">
                <b-form-group label="Title">
                    <b-form-input
                            id="input-1"
                            type="title"
                            required
                            placeholder="Title" v-model="getEditPost.title"
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="Description">
                    <b-textarea id="text-area1" type="description" required placeholder="Description"
                                v-model="getEditPost.description">
                    </b-textarea>
                </b-form-group>
                <b-button type="submit" variant="primary" style="margin-right: 10px" @click="editPost">
                    Submit
                </b-button>
                <b-button type="reset" variant="danger" @click="hideEditForm">Cancel</b-button>
            </b-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EditPost",
        data() {
            return {
                title: '',
                desc: ''
            }
        },
        methods: {
            hideEditForm: function () {
                this.$store.dispatch(('editPost'), false);
            },
            editPost: function () {
                this.$store.dispatch('saveEditedRecord');
                this.$store.dispatch(('editPost'), false);
            }
        },
        computed: {
            getEditPost: function () {
                return this.$store.state.editPostRec;
            }
        }
    }
</script>

<style scoped>

</style>