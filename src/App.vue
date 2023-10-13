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
        count: 10
      }
    },

    computed: {
      slideCount(){
        return this.isMobile ? 1 : (this.images.length > 3 ? 3 : this.images.length);
      }
    },

    methods:{
      async addImagesToList(){
        const list = await api.list(this.page, this.count);
        const ordered = list.map((img, i) => ({ ...img, order: this.images.length + i }))
        this.images = this.images.concat(ordered);
        this.page++;
      },

      displayImages(){
        for (let i = 0; i < this.slideCount; i++){
          this.images.at(i).displayed = true;
        }
      }
    },
    async mounted() {
      this.isMobile = window.innerWidth <= constants.MOBILE_WIDTH;
      await this.addImagesToList();
      this.displayImages();
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
