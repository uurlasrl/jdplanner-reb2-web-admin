<template>
  <div class="posts-list">
    <postList :posts="loadedPosts"></postList>
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
    loadedPosts(){
      if(typeof this.$store.getters.loadedPosts === "undefined") return []
      return this.$store.getters.loadedPosts;
    }
  },

  components: {
    PostList
  }
}
</script>
<style scoped>

</style>
