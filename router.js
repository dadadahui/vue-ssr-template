/**
 * 我们的服务器代码使用了一个 * 处理程序，它接受任意 URL。
 * 这允许我们将访问的 URL 传递到我们的 Vue 应用程序中，
 * 然后对客户端和服务器复用相同的路由配置！
 */

import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/components/home/home')
const LoginORregister = () => import('@/components/loginorregister/loginorregister')
const LoginPanel = () => import('@/components/base/logregpwdpanel/loginpanel/loginpanel')
const RegisterPanel = () => import('@/components/base/logregpwdpanel/registerpanel/registerpanel')
const SendEmailPanel = () => import('@/components/base/logregpwdpanel/sendemailpanel/sendemailpanel')
const SendVCodePanel = () => import('@/components/base/logregpwdpanel/sendvcodepanel/sendvcodepanel')
const NewPwdPanel = () => import('@/components/base/logregpwdpanel/newpwdpanel/newpwdpanel')
const Recommends = () => import('@/components/base/recommends/recommends')
const Article = () => import('@/components/article/article')
const User = () => import('@/components/user/user')
const Profile = () => import('@/components/profile/profile')
const ChangeImg = () => import('@/components/changeuserimg/changeuserimg')
Vue.use(Router)

export const createRouter = () => {
  return new Router({
    mode: 'history',
    base: '/',
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        redirect: '/homepage',
        children: [
          {
            path: 'homepage',
            component: Recommends
          },
          {
            path: 'article/:id',
            name: 'Article',
            component: Article
          },
        ]
      },
      {
        path: '/user',
        name: 'user',
        component: User,
        meta: { requiresAuth: true },
        redirect: '/user/profile',
        children: [
          { path: 'profile', name: 'profilepanel', component: Profile, meta: { requiresAuth: true } },
          { path: 'changeimg', name: 'changeimg', component: ChangeImg, meta: { requiresAuth: true } }
        ]
      },
      {
        path: '/loginORregister',
        component: LoginORregister,
        name: 'LoginORregister',
        redirect: '/loginORregister/login',
        children: [
          { path: 'login', name: 'loginpanel', component: LoginPanel },
          { path: 'register', name: 'registerpanel', component: RegisterPanel },
          { path: 'sendemail', name: 'sendemailpanel', component: SendEmailPanel },
          { path: 'sendvcode', name: 'sendvcodepanel', component: SendVCodePanel },
          { path: 'newpwd', name: 'newpwdpanel', component: NewPwdPanel },
        ]
      }
    ],
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  })
}