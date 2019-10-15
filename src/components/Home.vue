<template>
  <div>

                  <v-card class="card--flex-toolbar" width="800">
                      <v-toolbar card prominent>
                          <v-toolbar-title class="body-4 grey--text text--darken-2"><v-icon left>mdi-magnify</v-icon>Find Patient Folder </v-toolbar-title>
                          <small class="grey--text">[Patient ID required]</small>
                          <v-spacer></v-spacer>
                          <v-btn icon>

                          </v-btn>
                          <v-btn icon>
                              <v-icon>mdi-apps</v-icon>
                          </v-btn>
                          <v-btn icon>
                              <v-icon>more_vert</v-icon>
                          </v-btn>
                      </v-toolbar>
                      <v-divider></v-divider>
                      <v-card-text style="height: 200px;">

                          <v-layout justify-center align-center>
                              <v-flex xs12 sm12
                                      class="elevation-6 pa-3"
                              >
                                  <v-text-field
                                          :rules="[(v) => v.query <= 25 || 'Max 25 characters']"
                                          :counter="25"
                                          v-model="query"
                                          label="Search Patient Folder"
                                          placeholder="Please type Patient ID here to Locate Patient Folder."
                                          @keyup.enter="findPatient"
                                  ></v-text-field>
                                  <v-btn large router
                                         :loading="searching"
                                         :disabled="searching"
                                         @click.native="findPatient" class="info">Search<v-icon right>mdi-send</v-icon></v-btn>
                              </v-flex>

                          </v-layout>

                      </v-card-text>
                  </v-card>

      <v-card v-if="search_results">
          <v-flex xs12>
              <v-chip color="green" text-color="white">
                  <v-avatar>
                      <v-icon>mdi-account-check</v-icon>
                  </v-avatar>
                  Patient Folder Found
              </v-chip>

               <v-chip color="red" text-color="white">
                  <v-avatar>
                      <v-icon>mdi-folder-lock</v-icon>
                  </v-avatar>
                  Folder is In-active
              </v-chip>

               <v-chip color="blue" text-color="white">
                  <v-avatar>
                      <v-icon>mdi-store</v-icon>
                  </v-avatar>
                  Repository Details Below
              </v-chip>

              <v-spacer></v-spacer>

          </v-flex>
          <v-card-title primary-title>
              <v-layout row wrap >
                  <v-flex xs6 sm6>
                      <table class="box-table">
                          <tr>
                              <td class="body-2 primary--text">Patient Name:</td>
                              <td class="caption">Caleb Afaglo</td>

                          </tr>

                          <tr>
                              <td class="body-2 primary--text">Patient ID:</td>
                              <td class="caption">IGP-9338394</td>

                          </tr>
                          <tr>
                              <td class="body-2 primary--text">Date Created:</td>
                              <td class="caption">23rd March 2018</td>

                          </tr>

                          <tr>
                              <td class="body-2 primary--text">Last Active:</td>
                              <td class="caption">28th March 2018</td>

                          </tr>
                      </table>

                  </v-flex>

                  <v-flex xs sm6>

                      <table class="box-table">
                          <tr>
                              <td class="body-2 primary--text">Repository:</td>
                              <td class="caption">Minix Repo </td>

                          </tr>

                          <tr>
                              <td class="body-2 primary--text">Shelf:</td>
                              <td class="caption">SH-028</td>

                          </tr>
                          <tr>
                              <td class="body-2 primary--text">Rack:</td>
                              <td class="caption">RK-948</td>

                          </tr>
                          <tr>
                              <td class="body-2 primary--text">Bay:</td>
                              <td class="caption">BY-948</td>

                          </tr>
                          <tr>
                              <td class="body-2 primary--text">Box:</td>
                              <td class="caption">BX-948</td>

                          </tr> <tr>
                              <td class="body-2 primary--text">Envelope:</td>
                              <td class="caption">EN-048</td>

                          </tr>

                      </table>
                  </v-flex>
              </v-layout>
          </v-card-title>
      </v-card>

      <!--//No results-->

<v-card v-if="search_empty">
          <v-flex xs12>
              <v-chip color="red" text-color="white">
                  <v-avatar>
                      <v-icon>mdi-alert-circle</v-icon>
                  </v-avatar>
                  Patient Folder NOT Found
              </v-chip>

              <v-chip color="orange darken-3" text-color="white">
                  <v-avatar>
                      <v-icon>mdi-alert-circle</v-icon>
                  </v-avatar>
                  Please Check Patient ID [{{query}}] and try again
              </v-chip>
              <v-spacer></v-spacer>

          </v-flex>
          <v-card-title primary-title>
              <v-layout row wrap >
                  <v-flex xs12 sm12>
                      <div class="grey--text text--lighten-2 display-4">! No Results found</div>

                  </v-flex>


              </v-layout>
          </v-card-title>
      </v-card>

      <!--Exists but in Active State-->
      <v-card v-if="search_active">
          <v-flex xs12>
              <v-chip color="green" text-color="white">
                  <v-avatar>
                      <v-icon>mdi-account-check</v-icon>
                  </v-avatar>
                  Patient Folder Found
              </v-chip>

              <v-chip color="amber accent-4" text-color="white">
                  <v-avatar>
                      <v-icon>mdi-rotate-right</v-icon>
                  </v-avatar>
                  Folder is Active
              </v-chip>

              <v-chip color="blue" text-color="white">
                  <v-avatar>
                      <v-icon>mdi-store</v-icon>
                  </v-avatar>
                  Location Details Below
              </v-chip>

              <v-spacer></v-spacer>

          </v-flex>
          <v-card-title primary-title>
              <v-layout row wrap >
                  <v-flex xs6 sm6>
                      <table class="box-table">
                          <tr>
                              <td class="body-2 primary--text">Patient Name:</td>
                              <td class="caption">Caleb Afaglo</td>

                          </tr>

                          <tr>
                              <td class="body-2 primary--text">Patient ID:</td>
                              <td class="caption">IGP-9338394</td>

                          </tr>
                          <tr>
                              <td class="body-2 primary--text">Date Created:</td>
                              <td class="caption">23rd March 2018</td>

                          </tr>

                          <tr>
                              <td class="body-2 primary--text">Last Active:</td>
                              <td class="caption">28th March 2018</td>

                          </tr>
                      </table>

                  </v-flex>

                  <v-flex xs sm6>

                      <table class="box-table">
                          <tr>
                              <td class="body-2 primary--text">Triage:</td>
                              <td class="caption">Mrs. Fautina Williams</td>

                          </tr>


                      </table>
                      <v-btn class="teal white--text">Request folder<v-icon right>mdi-folder-download</v-icon></v-btn>
                  </v-flex>
              </v-layout>
          </v-card-title>
      </v-card>




              <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>

</div>
</template>

<script>
  export default {
      data(){
          return{
              searching:false,
              search_results:false,
              search_empty:false,
              search_active:false,
              query:'',
          }
      },
    computed: {
      meetups () {
        return this.$store.getters.featuredMeetups
      },
      loading () {
        // return this.$store.getters.loading
        return false;
      }
    },
    methods: {
      onLoadMeetup (id) {

      },
        findPatient(){
          self = this;

          if(this.query == 'correct'){
              this.searching = true;
              setTimeout(function(){
                  self.searching = false;
                  self.search_results=true;
                  self.search_active=false;
                  self.search_empty=false;
              }, 1500);
          }

          if(this.query == 'wrong'){
              this.searching = true;
              setTimeout(function(){
                  self.searching = false;
                  self.search_empty=true;
                  self.search_active=false;
                  self.search_results=false;
              }, 1500);
          }
            if(this.query == 'active'){
                          this.searching = true;
                          setTimeout(function(){
                              self.searching = false;
                              self.search_empty=false;
                              self.search_active=true;
                              self.search_results=false;
                          }, 1500);
                      }

          }

    }
    }
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
</style>
