import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import db from './plugins/data_note.js'

const app = createApp(App)

app.config.globalProperties.$db = db;

app.use(router).use(Antd).mount('#app')