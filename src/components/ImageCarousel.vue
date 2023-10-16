<script>
  export default {
    props: {
        images: {
            type: Array,
            required: true
        },

        count: {
            type: Number,
            required: false,
            default: 3
        },
    },
    emits: {
        'overscrolled': () => true
    },
    data(){
      return {
        currentImgIndex: 0,
        selected: [],
      }
    },
    methods:{
      select(img) {
        const hasImage = this.selected.some(t => t === img);
        if (hasImage) this.selected = this.selected.filter(t => t !== img);
        else this.selected.push(img);
      },

      prev() {
        const index = this.currentImgIndex + this.count;
        this.images.at(index).displayed = false;
        
        const img = this.images.at(this.currentImgIndex);
        img.displayed = true;
        img.order = this.currentImgIndex;

        this.currentImgIndex = this.currentImgIndex - 1;
      },
      
      async next() {
        this.images.at(this.currentImgIndex).displayed = false;

        const index = this.currentImgIndex + this.count;

        if (index >= this.images.length) await this.$emit('overscrolled');

        const img = this.images.at(index);

        img.displayed = true;
        img.order = this.currentImgIndex;

        this.currentImgIndex = this.currentImgIndex + 1;
      }
    }
  }
</script>

<template>
    <div class="slider__container">
      <div class="slider__content">
        <button type="button" class="btn prev__img" @click="prev">
            <svg height="54" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "></polygon></svg>
        </button>

        <div class="slider__wrapper">
            <div v-for="(image, index) in images" :style="{ order: image.order }"
              class="slide" 
              :class="{ 'slide--active': image.displayed, 'slide--selected': selected.some(t => t === image) }"
              @click="select(image)">
              <img :src="image.url" alt="">
            </div>
        </div>

        <button type="button" class="btn nex__img" @click="next">
          <svg height="54" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "></polygon></svg>
        </button>
      </div>
      <div class="image__info" v-if="selected">
        <p v-for="img in selected">{{ img.url }}</p>
      </div>
    </div>
</template>

<style scoped>
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
    flex-direction: column;
    align-items: center;
    font-style: italic;
    }

    .slide{
        width: 30%;
        object-fit: contain;
        display: none;
        cursor: pointer;
        transition: border .25s ease-in-out;
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
        background-color: rgb(13, 202, 240);
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

    @media screen and (max-width: 576px) {
      .slide{
        width: 100%;
      }
    }
</style>