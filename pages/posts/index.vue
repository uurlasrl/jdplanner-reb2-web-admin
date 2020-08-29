<template>
  <div class="posts-list">
    <postList :posts="loadedPostsData"></postList>
  </div>
</template>
<script>
import PostList from "@/components/Posts/PostList";

export default {
  data(){
    return {
      loadedPosts:[]
    }
  },
  computed:{
    loadedPostsData(){
      if(typeof this.$store.getters.loadedPosts === "undefined") return []
      return this.$store.getters.loadedPosts;
    }
  },

  components: {
    PostList
  },
  middleware:'auth'
}
</script>
<style scoped>

</style>
