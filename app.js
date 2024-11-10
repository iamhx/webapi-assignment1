const obj = require('./Hongxuan_Travel');

obj.searchFlights("Australia", "USA", "14/11/2024", "16/11/2024");
console.log("===========================");
const myBooking = obj.bookFlight("TC789", 2, ["Hongxuan", "Joshua"]);
console.log("===========================");
obj.cancelBooking("1731234794833");
console.log("===========================");
obj.cancelBooking(myBooking.bookingId);
console.log("===========================");
obj.viewBooking(myBooking.bookingId);
obj.getBookingsByFlightId("TC789"); //My booking shouldn't be printed