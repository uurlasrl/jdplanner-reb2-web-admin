<template>
  <section class="posts">
    <post-preview v-for="post in posts"
                  :key="post.id"
                  :id="post.id"
                  :isAdmin="isAdmin"
                  :thumbnail="post.thumbnail"
                  :title="post.title"
                  :preview-text="post.previewText"></post-preview>

  </section>
</template>
<script>
import PostPreview from "@/components/Posts/PostPreview";

export default {
  name:'PostList',
  props:{
    isAdmin:{
      type:Boolean,
      default:false
    },
    posts:{
      type:Array,
      required:true
    }
  },
  components: {
    PostPreview
  }
}
</script>

<style scoped>
.posts-list{
  display: flex;
  justify-content: center;
  align-items: center;
}
.posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
