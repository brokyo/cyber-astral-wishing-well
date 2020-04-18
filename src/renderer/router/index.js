import Vue from 'vue'
import Router from 'vue-router'

import ImageManipulation from '@/views/image_manipulation.vue'
import Kaleidoscope from '@/views/Kaleidoscope.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'image-manipulation',
      component: Kaleidoscope
    }
  ]
})
