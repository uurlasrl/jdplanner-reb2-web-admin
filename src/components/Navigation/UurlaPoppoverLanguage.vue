<template>
  <b-popover
    :target="targhetId"
    triggers="click blur" ref="popover" >
    <div>
      <nuxt-link @click.native="closePopover($event)" :to="switchLocalePath('it')">
        <div class="language-item"><CountryFlag country="it" size="small"></CountryFlag>{{$t('italian')}}</div></nuxt-link>
      <br>
      <nuxt-link @click.native="closePopover($event)" :to="switchLocalePath('en')">
        <div class="language-item"><CountryFlag country="us" size="small"></CountryFlag> {{$t('english')}}</div></nuxt-link>
    </div>
  </b-popover>
</template>

<script>
import CountryFlag from 'vue-country-flag'

export default {
  props:{
    targhetId:{
      type:String,
      required:true
    }
  },
  components:{
    CountryFlag
  },
  methods:{
    closePopover(event){
      this.$refs.popover.doClose()
    }
  },
  name: "UurlaPoppoverLanguage"
}
</script>

<style scoped>
.nav-item a:hover,
.nav-item a:active,
.nav-item a.nuxt-link-active {
  color: red;
}
.language-item{
  display: inline-flex;
}
</style>
