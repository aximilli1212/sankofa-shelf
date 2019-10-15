import * as firebase from "firebase";
var axios = require("axios");

export default{
    createCustomer({commit,state},payload){
        const customer={
            title:payload.title,
            firstname:payload.firstname,
            lastname:payload.lastname,
            phone:payload.phone,
            email:payload.email,
            company:payload.company,
            address:payload.address,
            prefpay:payload.prefpay.text,
            date:payload.date.toISOString()
        }



        let apiUrl = state.config.url;
        axios.post(apiUrl+'/customer', customer)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        firebase.database().ref('customers').push(customer).
        then((data)=>{
            const key=data.key
            commit('createCustomer',{
                ...customer,
                id:key
            })

        }).catch((error)=>{
            console.log(error)
        })






        // store in local store
        // commit('createCustomer',customer)
        commit('Regform',false)
        commit('ReqDet',true)
        commit('PickDet',true)
        commit('PayDet',true)
        commit('PersonalDet',true)

    },


    loadedMeetups({commit}){
        commit('setLoading',true)
        commit('setLoadingPage',true)
        firebase.database().ref('meetups').once('value').
        then((data)=>{
            const meetups=[]
            const obj = data.val()
            for(let key in obj){
                meetups.push({
                    id:key,
                    title:obj[key].title,
                    description:obj[key].description,
                    imgUrl:obj[key].imgUrl,
                    date:obj[key].date,
                    creatorId:obj[key].creatorId
                })
            }
            commit('setLoadedMeetups',meetups)
            commit('setLoading',false)
        }).
        catch((error)=>{
            console.log(error)
            commit('setLoading',false)
        })
    },


    fetchCustomer({commit,state}){
         let em = state.user.email;
        commit('setLoading',true);
        commit('setGoldLoad',true)
        commit('setLoadingPage',true);
        const db = firebase.database();
        const ref = db.ref();
        const query =ref.child('customers')
            .orderByChild('email')
            .equalTo(em)
            .limitToFirst(1).once('value').
        then((data)=>{
            const customer=[]
            const obj = data.val()
            for(let key in obj) {

                customer.push({
                    id: key,
                    firstname:obj[key].firstname,
                    lastname:obj[key].lastname,
                    phone:obj[key].phone,
                    email:obj[key].email,
                    company:obj[key].company,
                    address:obj[key].address,
                    prefpay:obj[key].prefpay,
                    date:obj[key].date

                })
            }
            commit('setCustomer',customer)
                commit('setGoldLoad',false)


                if(customer.length > 0){
                commit('Regform',false)
                commit('ReqDet',true)
                commit('PickDet',true)
                commit('PayDet',true)
                commit('PersonalDet',true)



            }
            else{
                commit('Regform',true)
                commit('ReqDet',false)
                commit('PickDet',false)
                commit('PayDet',false)
                commit('PersonalDet',false)



            }



            commit('setLoading',false)
            commit('setLoadingPage',false)
        }).
        catch((error)=>{
            console.log(error)
            commit('setLoadingPage',false)
        })
    },


    signUserUp({commit},payload){
        commit('setLoading',true)
        firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password).
        then(
            user =>{
                commit('clearError')
                commit('setLoading',false)
                const newUser={
                    id:user.uid,
                    email:user.email,
                    registeredMeetups:[]
                }
                commit('setUser',newUser)
                commit('setUser_email',newUser)
            }
        ).catch(
            error=>{
                commit('setLoading',false)
                commit('setError',error)
                console.log(error)
            }
        )

    },
    signUserIn({commit},payload){
        commit('setLoading',true)
        firebase.auth().signInWithEmailAndPassword(payload.email,payload.password).
        then(
            user =>{
                commit('clearError')
                commit('setLoading',false)
                commit('setGoldLoad',true)
                const newUser={
                    id:user.uid,
                    email:user.email,
                    registeredMeetups:[]
                }
                commit('setUser',newUser)
            }
        ).catch(
            error=>{
                commit('setLoading',false)
                commit('setError',error)
                console.log(error)
            }
        )


    },
    autoSignIn({commit},payload){
           commit('setUser')
    },
    signup_show({commit},payload){
        commit('set_up',true)
        commit('set_in',false)
        console.log('sign up wanted')
    },
    signin_show({commit},payload){
        commit('set_up',false)
        commit('set_in',true)
        console.log('sign in wanted')
    },
    clearError({commit},payload){
        commit('clearError',false)
    },
    postBooking({commit,state},payload){
        let apiUrl = state.config.url;
        let self = this;
        axios.post(apiUrl+'/booking', payload)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

}