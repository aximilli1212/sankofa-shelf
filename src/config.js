const BaseUrl = 'http://goldapi.vag:8000/api'
const config = {
  locale: 'en-US',
  url: BaseUrl,
    api:
        {
            allBookings: BaseUrl + "/bookings",
            singleBooking: BaseUrl + "/booking/",
            stateBooking: BaseUrl + "/book_state/",
            allCustomers: BaseUrl + "/customers/",
            singleCustomer: BaseUrl + "/customer/",
            objectFetch: BaseUrl + "/object/",

        },
    messages:
        {
            networkError: `There was a network error while processing your request. 
                       Make sure you have network connection and try again. If the problem persists please contact IT Service Desk`,
            internalServerError: `An application error occured while processing  you request. If the problem persists please contact IT Service Desk `,
        },
}

global.config = config

export default config
