import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as firebase from 'firebase'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import config from '../config'


Vue.use(Vuex)
Vue.use(axios)
export const store = new Vuex.Store({
    state:{
        repository: [
            { el:'repository', title: 'Police Annex' },
            { el:'repository', title: 'West Corridor' },
            { el:'repository', title: 'South Hangar' },

        ],
        shelf:[
            { el:'shelf', title: 'SH-072' },
            { el:'shelf', title: 'SH-072' },
            { el:'shelf', title: 'SH-072' },
            { el:'shelf', title: 'SH-072' },
            { el:'shelf', title: 'SH-072' },
            { el:'shelf', title: 'SH-072' },
            { el:'shelf', title: 'SH-072' },
            { el:'shelf', title: 'SH-072' },
            { el:'shelf', title: 'SH-072' },
            { el:'shelf', title: 'SH-072' },
            { el:'shelf', title: 'SH-072' },
            { el:'shelf', title: 'SH-072' },
            { el:'shelf', title: 'SH-072' },
            { el:'shelf', title: 'SH-072' },
            { el:'shelf', title: 'SH-072' },
            { el:'shelf', title: 'SH-072' },

        ],
        rack:[
            { el:'rack', title: 'RK-342' },
            { el:'rack', title: 'RK-342' },
            { el:'rack', title: 'RK-342' },
            { el:'rack', title: 'RK-342' },
            { el:'rack', title: 'RK-342' },
            { el:'rack', title: 'RK-342' },
            { el:'rack', title: 'RK-342' },
            { el:'rack', title: 'RK-342' },
            { el:'rack', title: 'RK-342' },
            { el:'rack', title: 'RK-342' },
            { el:'rack', title: 'RK-342' },
            { el:'rack', title: 'RK-342' },
            { el:'rack', title: 'RK-342' },

        ],
       bay:[
            { el:'bay', title: 'BY-002' },
            { el:'bay', title: 'BY-002' },
            { el:'bay', title: 'BY-002' },
            { el:'bay', title: 'BY-002' },
            { el:'bay', title: 'BY-002' },
            { el:'bay', title: 'BY-002' },
            { el:'bay', title: 'BY-002' },
            { el:'bay', title: 'BY-002' },
        ],

        box:[
            { el:'box', title: 'BX-742' },
            { el:'box', title: 'BX-142' },
            { el:'box', title: 'BX-042' },
            { el:'box', title: 'BX-942' },
            { el:'box', title: 'BX-342' },
            { el:'box', title: 'BX-342' },
            { el:'box', title: 'BX-342' },
            { el:'box', title: 'BX-342' },
            { el:'box', title: 'BX-342' },

        ],
        envelope:[
            { el:'envelope', title: 'EV-342' },
            { el:'envelope', title: 'EV-342' },
            { el:'envelope', title: 'EV-342' },
            { el:'envelope', title: 'EV-342' },
            { el:'envelope', title: 'EV-342' },
            { el:'envelope', title: 'EV-342' },
            { el:'envelope', title: 'EV-342' },

        ],
        config: config,


    },
    mutations,
    actions,
    getters
})