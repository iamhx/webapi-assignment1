module.exports = {

    /* DUMMY DATA */
    "flightDetails": [
        ["JS123", "Japan", "Singapore", "11/11/2024", "12/11/2024"],
        ["GC456", "Germany", "Canada", "12/11/2024", "13/11/2024"],
        ["TC789", "Thailand", "China", "15/11/2024", "16/11/2024"],
        ["AUN876", "Australia", "USA", "14/11/2024", "16/11/2024"],
        ["SSK543", "Singapore", "South Korea", "13/11/2024", "13/11/2024"]
    ],

    "booking": [
        {
            bookingId: '1731234794512',
            flightId: 'TC789',
            noOfPax: 3,
            passengerDetails: ['John', 'Jack', 'Julian'],
            status: "Confirmed"
        },
        {
            bookingId: '1731234794833',
            flightId: 'AUN876',
            noOfPax: 1,
            passengerDetails: ['Jimmy'],
            status: "Confirmed"
        },
        {
            bookingId: '1731234794318',
            flightId: 'TC789',
            noOfPax: 3,
            passengerDetails: ['Mike', 'Jerry', 'Daryl'],
            status: "Confirmed"
        },
        {
            bookingId: '1731234794411',
            flightId: 'JS123',
            noOfPax: 3,
            passengerDetails: ['Holly', "Richard", "Mickey"],
            status: "Confirmed"
        },
    ],

    /* FUNCTIONS */

    //This function is used to find flights by the following parameters.
    searchFlights(departCountry, arrivalCountry, departDate, returnDate) {

        // const is used because I am not planning to assign another variable into it
        const matchingFlights = [];

        //Without using any array methods, search the flights and push into matchingFlights
        for (const flight of this.flightDetails) {

            //Destructure array into the appropriate variables, skipping the Flight ID
            const [, departure, arrival, flightDepartDate, flightReturnDate] = flight;

            if (departure === departCountry &&
                arrival === arrivalCountry &&
                flightDepartDate === departDate &&
                flightReturnDate === returnDate) {

                matchingFlights.push(flight);
            }
        }

        console.log(matchingFlights);
        return matchingFlights;
    },

    //This function is used to book a flight based on the parameters.
    bookFlight(flightId, noOfPax, passengerDetails) {

        //The find method returns the array that meets the condition (predicate) defined
        const foundFlight = this.flightDetails.find(flight => flight[0] === flightId);

        if (!foundFlight) {
            console.log("No such flight found.");
            return;
        }

        //Have to make sure passengerDetails is an array to be able to compare the count.
        //Also have to make sure noOfPax is a number.
        if (passengerDetails.constructor !== Array || isNaN(noOfPax)) {
            console.log("Invalid parameters.");
            return;
        }

        //If it ain't the same, the passenger probably doesn't know how to count
        if (noOfPax !== passengerDetails.length) {
            console.log("Invalid number of passengers.");
            return;
        }

        /* Create a booking id based on the milliseconds passed since
        1/1/1970 12AM, where I am not even born yet*/
        const bookingId = Date.now().toString();

        const booking = {
            "bookingId": bookingId,
            "flightId": flightId,
            "noOfPax": noOfPax,
            "passengerDetails": passengerDetails
        }

        this.booking.push(booking);
        console.log("Booking confirmed:", booking);
        return booking;
    },

    cancelBooking(bookingId) {

        //The findIndex returns the index of the object that meets the condition defined
        const foundBookingIndex = this.booking.findIndex(obj => obj.bookingId === bookingId);

        //Why -1? Because the documentation says if condition is not met, return -1
        if (foundBookingIndex === -1) {
            console.log("Booking ID is invalid.");
            return;
        }

        const foundBookingId = this.booking[foundBookingIndex].bookingId;
        this.booking[foundBookingIndex].status = "Cancelled";

        /* This is a template literal for string interpolation, enclosed with backtick 
        (I don't know why, I just follow rules) */
        console.log(`Booking for ${foundBookingId} is successfully cancelled.`);
        console.log(this.booking);
    },

    viewBooking(bookingId) {

        //The find function should return the object that meets condition defined
        const foundBooking = this.booking.find(obj => obj.bookingId === bookingId);

        if (!foundBooking) {
            console.log("Booking ID is invalid.");
            return;
        }

        console.log(foundBooking);
        return;
    },

    getBookingsByFlightId(flightId) {

        /*The filter function returns the object that meets the condition defined,
        in this case, find all bookings that aren't cancelled
        */
        const bookingsForFlight = this.booking.filter(booking =>
            booking.flightId === flightId && booking.status !== "Cancelled"
        );

        console.log(`Bookings for flight ${flightId}:`, bookingsForFlight);
        return bookingsForFlight;
    }
}


