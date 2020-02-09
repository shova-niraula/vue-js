<template>
    <div>
        <b-form v-on:submit.prevent="onSubmit">
            <b-form-group label="Title">
                <b-form-input
                        id="input-1"
                        type="title"
                        required
                        placeholder="Title"
                        v-model="editPost.title"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Description">
                <b-textarea id="text-area1" type="description" required placeholder="Description"
                            v-model="editPost.description">
                </b-textarea>
            </b-form-group>

            <b-button type="submit" variant="primary" style="margin-right: 10px" @click="$emit('updatePost', editPost)">Update</b-button>
            <b-button type="submit" variant="danger" @click="$emit('cancelUpdate')">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
    export default {
        name: "EditPost",
        props: ["editPost"],
    }
</script>

<style scoped>

</style>