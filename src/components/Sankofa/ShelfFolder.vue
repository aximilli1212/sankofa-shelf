<template>
    <div>

        <v-dialog v-model="dialog" max-width="600px">
            <v-toolbar color="primary">
                <v-toolbar-side-icon></v-toolbar-side-icon>
                <v-toolbar-title class="white--text">Shelf Folder {{editedItem.pid}}</v-toolbar-title>
            </v-toolbar>
            <v-card >

                <v-container grid-list-lg>
                    <v-layout row>
                        <v-flex xs5>
                            <v-card-media
                                    src="/static/img/f2.png"
                                    height="125px"
                                    contain
                            ></v-card-media>
                            <v-card class="pa-2 pl-4" flat>
                                <div justify-center class="headline primary--text">{{editedItem.name}}</div>
                            </v-card>

                            <v-card class="pa-2 pl-4">
                                <div justify-center class="headline orange--text">Shelf Details</div>
                            </v-card>


                            <table class="box-table">
                                <tr>
                                    <td class=" primary--text"><v-icon small>mdi-store</v-icon> Repository: </td>
                                    <td class="caption">{{rep}}</td>
                                </tr>

                                <tr>
                                    <td class=" primary--text"><v-icon small>mdi-blur-linear</v-icon> Rack:</td>
                                    <td class="caption">{{rack}}</td>
                                </tr>
                                <tr>
                                    <td class=" primary--text"><v-icon small>mdi-buffer</v-icon> Shelf:</td>
                                    <td class="caption">{{shelf}}</td>
                                </tr>
                                <!--<tr>-->
                                    <!--<td class=" primary&#45;&#45;text"><v-icon small>mdi-shape-square-plus</v-icon> Bay:</td>-->
                                    <!--<td class="caption">{{bay}}</td>-->

                                <!--</tr>-->

                                <tr>
                                    <td class=" primary--text"><v-icon small>mdi-package-variant</v-icon> Box:</td>
                                    <td class="caption">{{box}}</td>

                                </tr>

                                <tr>
                                    <td class=" primary--text"><v-icon small>mdi-folder-lock</v-icon> Folder Count:</td>
                                    <td class="caption">{{envelope}}</td>
                            </tr>


                            </table>

                        </v-flex>
                        <v-flex xs7 class="pr-5 pl-5">
                            <v-select
                                    prepend-icon="mdi-store"
                                    :items="repItems"
                                    v-model="rep"
                                    label="Repository"
                                    hint="Select Repository Name here"
                                    persistent-hint
                            ></v-select>
                            <v-select
                                    prepend-icon="mdi-blur-linear"
                                    :items="rackItems"
                                    v-model="rack"
                                    label="Rack"
                                    hint="Select Rack Name here"
                                    persistent-hint
                            ></v-select>
                            <v-select
                                    prepend-icon="mdi-buffer"
                                    :items="shelfItems"
                                    v-model="shelf"
                                    label="Shelf"
                                    hint="Select Shelf Name here"
                                    persistent-hint
                            ></v-select>


                            <!--<v-select-->
                                    <!--prepend-icon="mdi-shape-square-plus"-->
                                    <!--:items="bayItems"-->
                                    <!--v-model="bay"-->
                                    <!--label="Bay"-->
                                    <!--hint="Select Bay Name here"-->
                                    <!--persistent-hint-->
                            <!--&gt;</v-select>-->
                            <v-select
                                    prepend-icon="mdi-package-variant"
                                    :items="boxItems"
                                    v-model="box"
                                    label="Box"
                                    hint="Select Box Name here"
                                    persistent-hint
                            ></v-select>

                            <v-text-field
                                    prepend-icon="mdi-folder-open"
                                    v-model="envelope"
                                    label="Folder Count"
                                    hint="Select Envelope Count here"
                                    persistent-hint
                            ></v-text-field>

                        </v-flex>
                    </v-layout>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                    <v-btn color="blue darken-1"
                           dark @click.native="save"
                    >Shelf Folder <v-icon right>mdi-format-indent-increase</v-icon></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-card>
            <v-card-title>


                <v-chip color="primary" text-color="white">
                    <v-avatar>
                        <v-icon>mdi-folder-lock</v-icon>
                    </v-avatar>
                    In-Active Patient Folders
                </v-chip>
                <v-spacer></v-spacer>
                <v-text-field
                        append-icon="mdi-search"
                        label="Search"
                        single-line
                        hide-details
                        v-model="search"
                ></v-text-field>
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="items"
                    class="elevation-1"
                    :loading="false"
                    :search="search"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.pid }}</td>
                    <td class="text-xs-right">{{ props.item.inactive }}</td>
                    <td class="text-xs-right">{{ props.item.maturity }}</td>
                    <td class="justify-center layout px-0">
                        <v-btn  class="mx-0 elevation-3 primary darken-1" dark round @click="editItem(props.item)">
                            Shelf Folder
                            <v-icon color="green darken-5" right>edit</v-icon>
                        </v-btn>
                    </td>
                </template>
                <template slot="no-data">
                    <v-alert :value="true" color="error" icon="warning">
                        Sorry No Life Insurance Data Added. (click Add )
                    </v-alert>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                </v-alert>
            </v-data-table>
        </v-card>
    </div>
</template>
<script>
    export default {
        data: () => ({
        dialog: false,
        errorMessages: [],
        e1: null,
        rep:null,
        shelf: null,
        rack: null,
        bay: null,
        box: null,
        envelope: null,
        benSet:['1'],
        mother:false,
        father:false,
        formHasErrors: false,
        search:'',
        premiums: [
            { text: 'Monthly' },
            { text: 'Quarterly' },
            { text: 'At Source' },
            { text: 'Yearly' }
        ],
        headers: [
            {
                text: 'Fullname',
                align: 'center',
                sortable: false,
                value: 'name'
            },
            { text: 'Patient ID', value: 'pid',align: 'center', },
            { text: 'In-Active Date', value: 'inactive' ,align: 'center',},
            { text: 'Maturity Date', value: 'maturity',align: 'center', },
            { text: 'Actions', value: 'name', sortable: false }
        ],
        items: [],
        editedIndex: -1,
        editedItem: {
            fname: '',
            lname: '',
            pid: '',
            inactive: '',
            maturity: '',
            mo_name:'',


        },
        defaultItem: {
            name: '',
            phone: '',
            email: '',
            address: '',
            dob: '',
            maturity: '',
        },
        repItems: [
            'Police Main', 'Police Annex 3', 'South Corridor'
        ],
        shelfItems: [
            'SH-034', 'SH-474', 'SH-449', 'SH-336'
        ],
        rackItems: [
            'RK-144', 'RK-220', 'RK-020', 'RK-110'
        ],
        bayItems: [
            'BY-600', 'BY-022', 'BY-937', 'BY-901'
        ],
        boxItems: [
            'BX-322', 'BX-003', 'BX-902', 'BX-991'
        ],
        envelopeItems: [
            'EN-887', 'EN-334', 'EN-998', 'EN-380'
        ],
    }),
    computed:{
        formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        }
    },

    watch: {
        dialog (val) {
            val || this.close()
        }
    },

    created () {
        this.initialize()
    },

    methods: {
        initialize () {
            this.items = [
                {
                    name: 'Collins Asare',
                    pid: '0243393839',
                    inactive: '2nd May 2017',
                    maturity: '23-05-2019',
                },{
                    name: 'Benjamin Strange',
                    pid: '0243393839',
                    inactive: '2nd May 2017',
                    maturity: '23-05-2019',
                },{
                    name: 'Caleb  Afaglo',
                    pid: '0243393839',
                    inactive: '2nd May 2017',
                    maturity: '23-05-2019',
                },{
                    name: 'Mr. Sulemana Kodine',
                    pid: '0243393839',
                    inactive: '2nd May 2017',
                    maturity: '23-05-2019',
                },{
                    name: 'Ms. Gloria Smooth',
                    pid: '0243393839',
                    inactive: '2nd May 2017',
                    maturity: '23-05-2019',
                },{
                    name: 'Patrick Stone',
                    pid: '0243393839',
                    inactive: '2nd May 2017',
                    maturity: '23-05-2019',
                },{
                    name: 'Edward Sheeran',
                    pid: '0243393839',
                    inactive: '2nd May 2017',
                    maturity: '23-05-2019',
                },{
                    name: 'Sonita Hyndai',
                    pid: '0243393839',
                    inactive: '2nd May 2017',
                    maturity: '23-05-2019',
                },{
                    name: 'Beatrice Oduro',
                    pid: '0243393839',
                    inactive: '2nd May 2017',
                    maturity: '23-05-2019',
                },
            ]
        },
        addBen(){
            this.benSet.push('1');
        },
        remBen(){
            this.benSet.splice(0,1);
        },

        editItem (item) {
            this.editedIndex = this.items.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            const index = this.items.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
        },

        close () {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
        }, 300)
        },

        save () {
            if (this.editedIndex > -1) {
                Object.assign(this.items[this.editedIndex], this.editedItem)
            } else {
                this.items.push(this.editedItem)
            }
            this.close()
        }
    }
    }
</script>

<style scoped>
    .scroll_up{
        overflow-y:scroll;
    }
</style>