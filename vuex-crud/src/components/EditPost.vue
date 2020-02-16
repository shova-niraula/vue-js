<template>
    <div>
        <h4 class="text-primary mt-3"> Edit Post</h4>
        <div id="addForm">
            <b-form @submit="onSubmit">
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
                <b-button type="submit" variant="primary" style="margin-right: 10px">
                    Submit
                </b-button>
                <b-button type="reset" variant="danger" @click="hideEditForm">Cancel</b-button>
            </b-form>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

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
            onSubmit: function (event) {
                event.preventDefault();
                this.$store.dispatch('saveEditedRecord');
                this.$store.dispatch(('editPost'), false);
            }
        },
        computed: mapState({
            getEditPost: state => state.editPostRec
        })
    }
</script>

<style scoped>

</style>