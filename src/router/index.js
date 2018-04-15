import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'pagedefault',
      component: (resolve) => {
        require(['@/components/login'], resolve)
      }
    },
    {
      path: '/login',
      name: 'login',
      component: (resolve) => {
        require(['@/components/login'], resolve)
      }
    },
    {
      path: '/register',
      name: 'register',
      component: (resolve) => {
        require(['@/components/register'], resolve)
      }
    },
    {
      path: '/forgetpw',
      name: 'forgetpw',
      component: (resolve) => {
        require(['@/components/forgetpw'], resolve)
      }
    },
    {
      path: '/index',
      name: 'index',
      component:(resolve) => {
        require(['@/components/index'], resolve)
      },
      children:[
        {
          path: '',
          name: 'indexdefault',
          component: (resolve)=> {
            require(['@/components/volManage'], resolve)
          },
        },
        {
          path: 'volManage',
          name: 'volManage',
          component: (resolve)=> {
            require(['@/components/volManage'], resolve)
          },
        },
        {
          path: 'volCheck',
          name: 'volCheck',
          component: (resolve)=> {
            require(['@/components/volCheck'], resolve)
          },
        },
        {
          path: 'volHonorManage',
          name: 'volHonorManage',
          component: (resolve)=> {
            require(['@/components/volHonorManage'], resolve)
          },
        }
      ]
    },
  ]
})
