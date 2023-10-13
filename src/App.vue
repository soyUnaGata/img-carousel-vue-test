<script>
  import constants from './common/constants.js'
  import api from './services/api.js'

  export default {
    name: 'App',
    data(){
      return {
        isMobile: false,
        viewImages: [],

        currentImgIndex: 0,

        page: 1,
        count: 10,

        selected: null,
      }
    },

    computed: {
      slideCount(){
        return this.isMobile ? 1 : (this.viewImages.length > 3 ? 3 : this.viewImages.length);
      }
    },

    watch: {
      selected: {
        handler: function(value) {
          if (!value || value.displayed) return;
          this.selected = null;
        },
        deep: true
      }
    },

    methods:{
      select(img) {
        this.selected = img;
      },

      async addImagesToList(){
        const list = await api.list(this.page, this.count);
        const ordered = list.map((img, i) => ({ ...img, order: this.viewImages.length + i }))
        this.viewImages = this.viewImages.concat(ordered);
        this.displayImages();
        this.page++;
      },

      displayImages(){
        for (let i = this.currentImgIndex; i < this.slideCount; i++){
          this.viewImages.at(i).displayed = true;
        }
      },

      prev() {
        const index = this.currentImgIndex + this.slideCount;
        this.viewImages.at(index).displayed = false;
        
        const img = this.viewImages.at(this.currentImgIndex);
        img.displayed = true;
        img.order = this.currentImgIndex;

        this.currentImgIndex = this.currentImgIndex - 1;
      },
      
      async next() {
        this.viewImages.at(this.currentImgIndex).displayed = false;

        const index = this.currentImgIndex + this.slideCount;

        if (index >= this.viewImages.length) await this.addImagesToList();

        const img = this.viewImages.at(index);

        img.displayed = true;
        img.order = this.currentImgIndex;

        this.currentImgIndex = this.currentImgIndex + 1;
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
    <div class="slider__container">
      <div class="slider__content">
        <button type="button" class="btn prev__img" @click="prev">
            <svg height="54" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "></polygon></svg>
        </button>

        <div class="slider__wrapper">
            <div v-for="(image, index) in viewImages" :style="{ order: image.order }"
              class="slide" 
              :class="{ 'slide--active': image.displayed, 'slide--selected': selected === image }"
              @click="select(image)">
              <img :src="image.url" alt="">
            </div>
        </div>

        <button type="button" class="btn nex__img" @click="next">
          <svg height="54" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "></polygon></svg>
        </button>
      </div>
      <div class="image__info" v-if="selected">
        <span>{{ selected.url }}</span>
      </div>
    </div>
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
  .slider__container{
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .slider__wrapper{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .slider__content{
    display: flex;
    align-items: center;
  }

  .image__info{
    width: 100%;
    display: flex;
    justify-content: center;
    font-style: italic;
  }

  .slide{
    width: 30%;
    object-fit: contain;
    display: none;
    cursor: pointer;
  }
  .slide img {
    width: 100%;
    border-radius: 24px;
    object-fit: cover;
    height: 320px;
  }
  .slide--active{
    display: block;
  }
  .slide--selected{
    border-radius: 24px;
    border: 5px solid rgb(13, 202, 240);
    background-color: rgb(13, 202, 240);;
  }

  img{
    object-fit: cover;
  }

  .btn {
    background: transparent;
    border: none;
    cursor: pointer;
  }
  .btn.nex__img svg{
    transform: rotate(180deg);
  }


  
</style>
