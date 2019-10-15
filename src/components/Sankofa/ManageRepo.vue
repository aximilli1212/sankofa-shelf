<template>
    <div>
        <v-layout row>
            <v-flex xs12 sm6>
                <v-card>
                    <v-toolbar color="primary" dark>
                        <v-toolbar-side-icon></v-toolbar-side-icon>
                        <v-toolbar-title>Storage Elements</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>more_vert</v-icon>
                        </v-btn>
                    </v-toolbar>


                    <v-list>
                        <v-list-tile v-for="item in items" :key="item.title" avatar @click="changeElement(item.el)">
                            <v-list-tile-action>
                                <v-icon :color="item.col">{{item.icon}}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="item.title"></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>


            <v-flex xs12 sm6 class="ml-5">
                <v-card>
                    <v-toolbar :color="activeRep.col" dark>
                        <v-icon>{{activeRep.icon}}</v-icon>
                        <v-toolbar-title >{{activeRep.title}}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>more_vert</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-flex style="overflow-y:scroll;height:350px" v-chat-scroll>
                        <v-list-tile v-for="item in rep_items" :key="item.title" avatar @click="">
                            <v-list-tile-action>
                                <v-icon> {{activeRep.icon}}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="item.title"></v-list-tile-title>
                            </v-list-tile-content>
                                <v-btn small :class="activeRep.col" dark @click="deleteItem(item)">Remove</v-btn>
                        </v-list-tile>
                    </v-flex>

                        <v-list class="align-center">
                            <v-layout>
                                   <v-flex xs12 sm7>
                                       <v-text-field
                                               :prepend-icon="activeRep.icon"
                                               v-model="repEntity"
                                               :label="textAdd"
                                               :hint="textHint"
                                               persistent-hint
                                               @keyup.enter="addEntity(activeRep.rep)"
                                               :error="addError"

                                       ></v-text-field>

                                   </v-flex>
                            <v-flex xs12 sm4>
                                    <v-btn class="orange" @click="addEntity(activeRep.rep)"> {{textAdd}} <v-icon right>mdi-plus-circle-outline</v-icon></v-btn>
                                   </v-flex>
                        </v-layout>



                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
    
</template>

<script>
    export default {
        name: "property",
        data(){
            return{
                repEntity:'',
                addError:false,
                items: [
                    { col:'red',el:'repository',icon: 'mdi-store', title: 'Repository' },
                    { col:'teal',el:'shelf',icon: 'mdi-buffer', title: 'Shelf' },
                    { col:'green',el:'rack',icon: 'mdi-blur-linear', title: 'Rack' },
                    // { col:'orange',el:'bay',icon: 'mdi-shape-square-plus', title: 'Bay' },
                    { col:'orange',el:'box',icon: 'mdi-package-variant', title: 'Box' },
                    // { col:'brown',el:'envelope',icon: 'mdi-folder-open', title: 'Envelope' },
                ],
                activeRep:{rep:'Repository',col:'red',icon: 'mdi-store',title:'Repository Elements'},

            repData: {
                'repository':
                    {rep:'Repository',col: 'red', icon: 'mdi-store', title: 'Repository Elements'},

                'shelf':
                    {rep:'Shelf',col: 'teal', icon: 'mdi-buffer', title: 'Shelf Elements'},

                'rack':
                    {rep:'Rack',col: 'green', icon: 'mdi-blur-linear', title: 'Rack Elements'},

                // 'bay':
                //     {rep:'Bay',col: 'orange', icon: 'mdi-shape-square-plus', title: 'Bay Elements'},

                'box':
                    {rep:'Box',col: 'orange', icon: 'mdi-package-variant', title: 'Box Elements'},

                // 'envelope':
                //     {rep:'Envelope',col: 'brown', icon: 'mdi-folder-open', title: 'Envelope Elements'},
            },


                rep_items: [
                    { el:'repository', title: 'Police Annex' },
                    { el:'repository', title: 'West Corridor' },
                    { el:'repository', title: 'South Hangar' },


                ]
            }
        },
        mounted(){
            this.rep_items = this.$store.getters.repository;
        },
        methods:{
            changeElement(el){
                this.activeRep = this.repData[el];
                this.rep_items = this.$store.getters[el];

                this.repEntity='';
            },


            addEntity(rep){

                let r = rep.toLowerCase();
                let self = this;

                if(this.repEntity !== ''){
                    const pushPayload={
                        el:r,
                        title:this.repEntity,
                    }

                    console.log(r);
                    console.log(pushPayload);

                    self.$store.commit('pushUp',pushPayload);

                    self.repEntity='';
                    this.addError = false;

                }
                else{
                    this.addError = true;
                }
            },

            deleteItem (item) {
                const index = this.items.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.rep_items.splice(index, 1)
            },
        },
        computed:{
            textHint(){
                return 'Please type '+this.activeRep.rep+' and press enter';
            },
            textAdd(){
                return 'Add '+this.activeRep.rep;
            }
        }
    }
</script>

<style scoped>

</style>