import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Success from "@/views/Success";
import Newsbot from "@/views/Newsbot";
import Demographic from "@/views/Demographic";
import Quiz from "@/views/Quiz";
import Feedback from "@/views/Feedback";
import Session1 from "@/views/Session1";
import Session2 from "@/views/Session2";
import Session3 from "@/views/Session3";

Vue.use(VueRouter)

const routes = [
    {
        path: '/session1',
        name: 'Session1',
        component: Session1
    },
    {
        path: '/session2',
        name: 'Session2',
        component: Session2
    },
    {
        path: '/session3',
        name: 'Session3',
        component: Session3
    },
    {
        path: '/newsbot',
        name: 'newsbot',
        component: Newsbot
    },
    {
        path: '/evaluate',
        name: 'evaluate',
        component: Quiz
    },
    {
        path: '/feedback',
        name: 'feedback',
        component: Feedback
    },
    {
        path: '/info',
        name: 'info',
        component: Demographic
    },

    {
        path: '/',
        name: 'Home',
        component: Index
    },
    {
        path: '/index',
        name: 'Index',
        component: Index
    },
    {
        path: '/success',
        name: 'Thanks',
        component: Success
    },
]

const router = new VueRouter({
    routes,
    mode: 'hash',
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        if (savedPosition) {
            return savedPosition
        }
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
