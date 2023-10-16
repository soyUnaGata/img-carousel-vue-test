<script>
  import constants from './common/constants.js'
  import api from './services/api.js'
  import ImageCarousel from './components/ImageCarousel.vue'

  export default {
    name: 'App',

    components: {
      'image-carousel': ImageCarousel
    },

    data(){
      return {
        isMobile: false,
        images: [],

        page: 1,
        count: 100
      }
    },

    computed: {
      slideCount(){
        return this.isMobile ? 1 : (this.images.length > 3 ? 3 : this.images.length);
      }
    },

    methods:{
      async addImagesToList(){
        this.images = this.images.concat(await api.list(this.page, this.count));
        this.page++;
      }
    },
    async mounted() {
      this.isMobile = window.innerWidth <= constants.MOBILE_WIDTH;
      await this.addImagesToList();
    }
  }
</script>

<template>
  <div class="container" :class="{ 'mobile': isMobile }">
    <image-carousel :images="images" :count="slideCount" @overscrolled="addImagesToList"></image-carousel>
  </div>
</template>

<style>

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
  }
  .container{
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
