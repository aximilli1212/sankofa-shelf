export default{

    loadedMeetups(state){
        return state.loadedMeetups.sort((meetupA,meetupB) => {
                return meetupA.date > meetupB.date

            }

        )
    },

    repository(state){
        return state.repository;

    },
    shelf(state){
        return state.shelf;

    },
    rack(state){
        return state.rack;

    },
    bay(state){
        return state.bay;

    },
    box(state){
        return state.box;

    },
    envelope(state){
        return state.envelope;

    },

    loadedMeetup(state){
        return(meetupId)=>{
            return state.loadedMeetups.find((meetup)=>{
                return meetup.id === meetupId
            })
        }

    },
    sin_show(state){
        return state.s_in
    },
    sup_show(state){
        return state.s_up
    },
    user(state){
        return state.user.id
    },
    bookSet(state){
        return state.bookSet
    },
    Package(state){
        return state.packages
    },
    getBillData(state){
        return state.billData
    },
    getBillRate(state){
        return state.billData[0].rate
    },
    getBookInfo(state){
        return state.bookInfo
    },
    getBookDays(state){
        return state.bookDays
    },
    getBookHours(state){
        return state.bookHours
    },
    getBookMins(state){
        return state.bookMins
    },
    getBookTime(state){
        return state.bookTime
    },
    getGrandTotal(state){
        return state.grandTotal
    },
    bookPackage(state){
        return state.bookPackage
    },

    loading(state){
        return state.loading
    },

    getGoldLoad(state){
        return state.goldLoad
    },
    error(state){
        return state.error
    }
}