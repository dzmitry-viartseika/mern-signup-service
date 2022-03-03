<template>
  <div class="app-dashboard">
    Dashboard wewew

    <label>File
      <input type="file" id="file" ref="file" @change="handleFileUpload()"/>
    </label>
    <button @click="submitFile()">Submit</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import '@/assets/icons/Eye';
import { namespace } from 'vuex-class';
import UploadService from '@/services/Upload/UploadService';

const User = namespace('User');

@Component({
  metaInfo() {
    return {
      title: 'Dashboard',
      meta: [
        {
          name: 'description',
          content: 'App Dashboard',
        },
      ],
    };
  },
})
export default class Dashboard extends Vue {
  file: '';

  created() {
    console.log('created', this);
  }

  handleFileUpload() {
    this.file = this.$refs.file.files[0];
  }

  async submitFile() {
    const formData = new FormData();
    formData.append('file', this.file);
    console.log('formData', formData);
    try {
      const result = await UploadService.upload(this.file);
      console.log('result', result);
    } catch (e) {
      console.log('e', e);
    }
    // axios.post( '/single-file',
    //     formData,
    //     {
    //       headers: {
    //         'Content-Type': 'multipart/form-data'
    //       }
    //     }
    // ).then(function(){
    //   console.log('SUCCESS!!');
    // })
    // .catch(function(){
    //   console.log('FAILURE!!');
    // });
  }
}
</script>

<style scoped lang="scss">

</style>
