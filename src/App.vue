<template>
  <v-app>
    <!--<v-navigation-drawer fixed-->
                         <!--v-model="sideNav"-->
       <!--:clipped="$vuetify.breakpoint.lgAndUp"-->
    <!--&gt;-->
      <!--<v-list>-->
        <!--<v-list-tile-->
          <!--v-for="item in menuItems"-->
          <!--:key="item.title"-->
          <!--:to="item.link"-->
          <!--slot="activator">-->
          <!--<v-list-tile-action>-->
            <!--<v-icon>{{ item.icon }}</v-icon>-->
          <!--</v-list-tile-action>-->
          <!--<v-list-tile-content>{{ item.title }}</v-list-tile-content>-->
        <!--</v-list-tile>-->
        <!--<v-list-tile-->
          <!--v-if="userIsAuthenticated"-->
          <!--@click="onLogout">-->
          <!--<v-list-tile-action>-->
            <!--<v-icon>exit_to_app</v-icon>-->
          <!--</v-list-tile-action>-->
          <!--<v-list-tile-content>Logout</v-list-tile-content>-->
        <!--</v-list-tile>-->
      <!--</v-list>-->
    <!--</v-navigation-drawer>-->
      <v-navigation-drawer
              fixed
              :clipped="$vuetify.breakpoint.lgAndUp"
              app
              v-model="drawer"
      >
          <v-list dense>
              <template v-for="item in nav_items">
                  <v-layout
                          row
                          v-if="item.heading"
                          align-center
                          :key="item.heading"
                  >
                      <v-flex xs6>
                          <v-subheader v-if="item.heading">
                              {{ item.heading }}
                          </v-subheader>
                      </v-flex>
                      <v-flex xs6 class="text-xs-center">
                          <a href="#!" class="body-2 black--text">EDIT</a>
                      </v-flex>
                  </v-layout>

                  <v-list-tile v-else
                               :to="item.link"
                               :key="item.text">
                      <v-list-tile-action>
                          <v-icon>{{ item.icon }}</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                          <v-list-tile-title :to="item.link">
                              {{ item.text }}
                          </v-list-tile-title>
                      </v-list-tile-content>
                  </v-list-tile>
              </template>
          </v-list>
      </v-navigation-drawer>






    <v-toolbar dark
               app
               :clipped-left="$vuetify.breakpoint.lgAndUp"
               fixed
               class="primary">
      <v-toolbar-side-icon
              @click.stop="drawer = !drawer"
        class="hidden-sm-and-up "></v-toolbar-side-icon>
      <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer"> PATIENT RECORDS MANAGEMENT SYSTEM</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}

        </v-btn>
        <v-btn
          v-if="userIsAuthenticated"
          flat
          @click="onLogout">
          <v-icon left dark>mdi-logout-variant</v-icon>
          Logout

        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
      <v-content>
          <v-container fluid fill-height>
              <v-layout justify-center align-center>
      <router-view></router-view>
              </v-layout>
          </v-container>
      </v-content>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false,
          drawer: null,
          nav_items: [
              { icon: 'mdi-view-dashboard', text: 'Dashboard',link:'/' },
              { icon: 'mdi-folder-account', text: 'Shelf Patient Folder',link:'/shelf' },
              { icon: 'mdi-inbox-multiple', text: 'Repository Management',link:'/manage' },
              { icon: 'settings', text: 'Settings' },

          ]
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          {icon: 'face', title: 'Sign up', link: '/signup'},
          {icon: 'lock_open', title: 'Sign in', link: '/signin'}
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
              { icon: 'mdi-folder-account', title: 'Shelf Patient Folder',link:'/shelf' },
              { icon: 'mdi-inbox-multiple', title: 'Repository Management',link:'/manage' },
          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        // return this.$store.getters.user !== null && this.$store.getters.user !== undefined
          return true;
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      },
        checkup(){
          alert('You Caught');
        }

    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
