<template>
  <div class="container">
    <div class="flex w-full h-screen items-center justify-center bg-grey-lighter">
      <label
        class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide uppercase border border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white">
        <template v-if="$fetchState.pending">
          <div class="spinner" />
        </template>
        <template v-else>
          <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path
              d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span class="mt-2 text-base leading-normal">Select a file</span>
          <input type='file' class="hidden" @change="$fetch" ref="uploader" />
        </template>
      </label>
      <template v-if="image && distance !== undefined">
        <img :src="image" />
        <p> Generated new image with estimated distance of {{distance}} from original </p>
      </template>
      <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">
        GitHub
      </a>

    </div>
  </div>
</template>

<script>
  export default {
    async fetch() {
      const files = this.$refs.uploader.files;
      const formData = new FormData();
      formData.append('image', files[0]);
      formData.append('strength', )
      let resp = await this.$http.post('/generate', formData).then(r => r.json());
      this.image = `data:image/png;base64, ${resp.image}`;
      this.distance = resp.output.distance;
    },
    data() {
      return {
        image: undefined,
        distance: undefined
      }
    }
  }

</script>

<style>
  /* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  .spinner:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border-top: 2px solid #07d;
    border-right: 2px solid transparent;
    animation: spinner .6s linear infinite;
  }

</style>
