<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news!</h1>

    </section>
    <PostList :posts="loadedPosts"></PostList>

  </div>
</template>

<script>
import PostList from "@/components/Posts/PostList";

// sap.ui.getCore().attachInit(function () {
//   alert("UI5 is ready");
// });


export default {
  name: 'HomePage',
  components: {
    PostList
  },
  // async fetch({ store }) {
  //   await store.dispatch("initializeStore");
  //  },
  computed:{
    loadedPosts(){
      if(typeof this.$store.getters.loadedPosts === "undefined") return []
      return this.$store.getters.loadedPosts;
    }
  }

}
</script>

<style scoped>
.intro {
  height: 120px;
  position: relative;
  padding: 30px;
  background-image: url('~assets/images/header.jpg');
  box-sizing: border-box;
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}


</style>
