import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
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
      path: '/test',
      name: 'test',
      component: (resolve) => {
        require(['@/components/test'], resolve)
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
          path: '/',
          name: 'indexdefault',
          component: (resolve)=> {
            require(['@/components/indexdefault'], resolve)
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
        },
        {
          path: 'sginList',
          name: 'sginList',
          component: (resolve)=> {
            require(['@/components/sginList'], resolve)
          },
        },
        {
          path: 'sginListManage',
          name: 'sginListManage',
          component: (resolve)=> {
            require(['@/components/sginListManage'], resolve)
          },
        },
        {
          path: 'recruitList',
          name: 'recruitList',
          component: (resolve)=> {
            require(['@/components/recruitList'], resolve)
          },
        },
        {
          path: 'recruitListManage',
          name: 'recruitListManage',
          component: (resolve)=> {
            require(['@/components/recruitListManage'], resolve)
          },
        },
        {
          path: 'systemOrg',
          name: 'systemOrg',
          component: (resolve)=> {
            require(['@/components/systemOrg'], resolve)
          },
        },
        {
          path: 'systemAdmin',
          name: 'systemAdmin',
          component: (resolve)=> {
            require(['@/components/systemAdmin'], resolve)
          },
        },
        {
          path: 'resetPwd',
          name: 'resetPwd',
          component: (resolve)=> {
            require(['@/components/resetPwd'], resolve)
          },
        },
        {
          path: 'my',
          name: 'my',
          component: (resolve)=> {
            require(['@/components/my'], resolve)
          },
        },
        {
          path: 'volDetails',
          name: 'volDetails',
          component: (resolve)=> {
            require(['@/components/volDetails'], resolve)
          },
        },
        {
          path: 'addRecrutAct',
          name: 'addRecrutAct',
          component: (resolve)=> {
            require(['@/components/addRecrutAct'], resolve)
          },
        },
        {
          path: 'addSignAct',
          name: 'addSignAct',
          component: (resolve)=> {
            require(['@/components/addSignAct'], resolve)
          },
        }
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  if(to.name!='login' && !sessionStorage.getItem('token')){
    next({path: '/login'});
  }else{
    next();
  }
})

export default router
