import Vue from 'vue'
import VueRouter from 'vue-router'
import Index2 from '../views/Index2.vue'
import Index1 from '../views/Index1.vue'
import Success from "@/views/Success";
import Newsbot2 from "@/views/Newsbot2";
import Newsbot1 from "@/views/Newsbot1";
import Feedback from "@/views/Feedback";
import Session1 from "@/views/Session1";
import Session2 from "@/views/Session2";
import Session3 from "@/views/Session3";
import Session4 from "@/views/Session4";
import Session5 from "@/views/Session5";
import Session6 from "@/views/Session6";
import Quiz2 from "@/views/Quiz2";
import Quiz1 from "@/views/Quiz1";
import Calibration from "@/views/calibration.vue";
import Demographic from "@/views/Demographic.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Homepage',
        component: Index2
    },
    {
        path: '/calibration',
        name: 'calibration',
        component: Calibration
    },
    {
        path: '/info/uuid/:uuid',
        name: 'Demographic',
        component: Demographic
    },
    {
        path: '/feedback',
        name: 'Feedback',
        component: Feedback
    },
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
        path: '/session4',
        name: 'Session4',
        component: Session4
    },
    {
        path: '/session5',
        name: 'Session5',
        component: Session5
    },
    {
        path: '/session6',
        name: 'Session6',
        component: Session6
    },
    {
        path: '/newsbot2',
        name: 'newsbot2',
        component: Newsbot2
    },
    {
        path: '/newsbot1',
        name: 'newsbot1',
        component: Newsbot1
    },
    {
        path: '/evaluate2',
        name: 'evaluate2',
        component: Quiz2
    },
    {
        path: '/evaluate1',
        name: 'evaluate1',
        component: Quiz1
    },

    {
        path: '/index2',
        name: 'Index2',
        component: Index2
    },
    {
        path: '/index1',
        name: 'Index1',
        component: Index1
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
