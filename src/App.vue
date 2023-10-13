<script>
  export default {
    name: 'App',
    data(){
      return {
        images: [
          '/img/870-536x354-blur_2-grayscale.jpg',
          '/img/1060-536x354-blur_2.jpg',
          '/img/1084-536x354-grayscale.jpg',
          '/img/870-536x354-blur_2-grayscale.jpg',
          '/img/1060-536x354-blur_2.jpg',
          '/img/1084-536x354-grayscale.jpg',
          '/img/870-536x354-blur_2-grayscale.jpg',
          '/img/1060-536x354-blur_2.jpg',
          '/img/1084-536x354-grayscale.jpg',
          '/img/870-536x354-blur_2-grayscale.jpg',
          '/img/1060-536x354-blur_2.jpg',
          '/img/1084-536x354-grayscale.jpg',
          '/img/870-536x354-blur_2-grayscale.jpg',
          '/img/1060-536x354-blur_2.jpg',
          '/img/1084-536x354-grayscale.jpg'
        ],
        viewImages: [

        ],
        currentImgIndex: 0,
        count: 5
      }
    },
    methods:{
      prev() {
        this.viewImages.pop();
        let index = this.currentImgIndex - 1;
        const image = this.images.at(index);
        this.viewImages.unshift(image);  
        this.currentImgIndex--; 
      },
      next() {
        this.viewImages.shift();
        const image = this.images.at(this.currentImgIndex + this.count);
        this.viewImages.push(image);
        this.currentImgIndex++;
      }
    },
    computed:{
      showNextImage(){
        this.images
      }
    },
    async mounted() {
      this.images = await fetch('https://picsum.photos/v2/list?page=1&limit=100').then(x => x.json());
      this.viewImages = this.images.slice(0, this.count);
      
    }
  }
</script>

<template>
  <div class="container">
    <div class="slider__container">
      <div class="slider__wrapper">
        <div class="slide" v-for="image in viewImages">
          <img :src="image.download_url" alt="">
        </div>
      </div>
      <div class="slider__actions">
        <button type="button" class="prev__img" @click="prev">Prev</button>
        <button type="button" class="nex__img" @click="next">Next</button>
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
  .container{
    max-width: 1200px;
    margin: 0 auto;
  }
  .slider__container{
    position: relative;
  }
  .slider__wrapper{
    display: flex;
    max-width: 100%;
    overflow: hidden;
  }

  .slider__actions{
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translate(0, -50%);
  }

  .slide{
    width: 33%;
  }
  .slide img {
    max-width: 100%;
  }
</style>
