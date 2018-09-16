const store = {
  drivers: [],
  passengers: [],
  trips: []
};

let driverId = 0;
let passengerId = 0;
let tripId = 0;

// A driver has many trips, and has many passengers through trips.
class Driver {
  constructor(name) { // initialized with a name
    // returns a JavaScript object that has attributes of id, and name
    this.id = ++driverId;
    this.name = name;
    store.drivers.push(this);
  }

  trips() {
    // returns all of the trips that a driver has taken
    return store.trips.filter(
      function(trip) {
        return trip.driverId === this.id;
      }.bind(this)
    );
  }

  passengers() {
    // returns all of the passengers that a driver has taken on a trip
    return this.trips().map(
      function(trip) {
        return trip.passenger();
      }
    );
  }
}
// A passenger has many trips, and has many drivers through trips.
class Passenger {
  constructor(name) { // initialized with a name
    // returns a JavaScript object that has attributes of id, and name
    this.id = ++passengerId;
    this.name = name;
    store.passengers.push(this);
  }

  trips() {
    // returns all of the trips that a passenger has taken
    return store.trips.filter(
      function(trip) {
        return trip.passengerId === this.id;
      }.bind(this)
    );
  }

  drivers() {
    // returns all of the drivers that has taken a passenger on a trip
    return this.trips().map(
      function(trip) {
        return trip.driver();
      }
    );
  }
}
// A trip belongs to a driver and belongs to a passenger.
class Trip {
  // initialized with an instance of driver and an instance of passenger
  constructor(driver, passenger) {
    // returns a JavaScript that has attributes id, driverId, and passengerId
    this.id = ++tripId;
    // https://learn.co/tracks/full-stack-web-development-v6/javascript/object-oriented-js/object-relations
    this.driverId = driver.id;
    this.passengerId = passenger.id;
    store.trips.push(this);
  }

  driver() {
    // returns the driver associated with the trip
    return store.drivers.find(
      function(driver) {
        return driver.id === this.driverId;
      }.bind(this) // Adding a ";" throws an error
    );
  }

  passenger() {
    // returns the passenger associated with the trip
    return store.passengers.find(
      function(passenger) {
        return passenger.id === this.passengerId;
      }.bind(this)
    );
  }
}
