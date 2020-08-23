<template>
  <div class="admin-page">
    <section class="new-post">
      <AppButton @click="$router.push(this.localePath('admin')+'/new-post')" class="btn btn-primary">Create Post
      </AppButton>
    </section>
    <section class="existing-posts">
      <h1>Existing Posts</h1>
      <post-list :posts="loadedPosts" :isAdmin="isAdmin"></post-list>
    </section>
  </div>
</template>
<script>
import PostList from '@/components/Posts/PostList'
import AppButton from "@/components/UI/AppButton";

export default {
  layout: 'admin',
  data() {
    return {
      isAdmin: true,
    }
  },
  computed:{
    loadedPosts(){
      if(typeof this.$store.getters.loadedPosts === "undefined") return []
      return this.$store.getters.loadedPosts;
    }
  },
  // async fetch({store}) {
  //   await store.dispatch("initializeStore");
  //   //this.loadedPosts = store.getters.loadedPosts();
  // },
  // asyncData(context,callback){
  //   setTimeout(()=>{
  //     callback(null,{
  //       loadedPosts:[{id:'1',title:'first post',previewText: 'this is the first post', thumbnail:'http://www.viptechnews.com/wp-content/uploads/2019/12/tech.jpg'}]
  //     })
  //   }, 3000)
  // },
  components: {
    PostList,
    AppButton
  },
}
</script>
<style>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>
