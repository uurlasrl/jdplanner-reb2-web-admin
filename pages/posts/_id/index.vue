<template>
  <div class="single-post-page">
    <section class="post">
      <h2 class="post-title">{{loadedPost.title}}</h2>
      <div class="post-details">
        <div class="post-detail">Last update on {{ loadedPost.updateDate }}</div>
        <div class="post-detail">Written by {{ loadedPost.author }}</div>
      </div>
      <p class="post-content">{{ loadedPost.content}}</p>
    </section>
    <section class="post-feedback">
      <p>Let me know what</p>
    </section>
  </div>
</template>
<script>
export default {
  asyncData(ctx, callback) {
    setTimeout(() => {
      callback(null, {
        loadedPost: {
          id: '',
          title: 'tittle of the post',
          previewText: 'this is a preview text',
          author:'dom',
          thumbnail: 'http://www.viptechnews.com/wp-content/uploads/2019/12/tech.jpg',
          content: 'this is definely the content text of this post',
          updateDate: new Date()
        }
      })
    }, 2000)
  }
}
</script>
<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {elevation: ;
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>
