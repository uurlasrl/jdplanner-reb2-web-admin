<template>
  <form @submit.prevent="onSave">
    <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>
    <AppControlInput v-model="editedPost.title">Title</AppControlInput>
    <AppControlInput v-model="editedPost.thumbnailLink">Thumbnail Link</AppControlInput>
    <AppControlInput
      control-type="textarea"
      v-model="editedPost.content">Content
    </AppControlInput>
    <AppButton type="submit">Save</AppButton>
    <AppButton
      type="button"
      style="margin-left: 10px"
      btn-style="cancel"
      @click="onCancel">Cancel
    </AppButton>
  </form>
</template>

<script>
import AppButton from "@/components/UI/AppButton";
import AppControlInput from "@/components/UI/AppControlInput";

export default {
  name: "AdminPostForm",
  props:{
    post:{
      type:Object,
      required:false
    }
  },
    data() {
      return {
        editedPost: this.post ? {...this.post } :{
          author: '',
          title: '',
          trumbnailLink: '',
          content: ''
        }
      }
    },
    methods:{
      onSave(){
        //save the post
      },
      onCancel(){
        //back to the admin
        this.$router.back()
      }
    },
    components: {
      AppControlInput,
      AppButton
    }
}
</script>

<style scoped>

</style>
