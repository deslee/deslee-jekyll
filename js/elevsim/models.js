var Elevator = function(ID, floor) {
	this.ID = ID;
	this.floor = floor;
	this.percentToNextFloor = 0;
	this.state = 'still';
};
var Person = function(ID, floor) {
	self = this;
	self.ID = ID;
	self.states = {
		onFloor: function(floor) {
			this.floor = floor;
			act = function() {
				
			}
		},
	};
	self.state = self.states.onFloor(floor);
};

var Floor = function(ID) {
	this.ID = ID;
}

var Building = function(num_elevators, num_floors, num_people) {
	var self = this;
	self.elevators = [];
	self.people = [];
	self.floors = [];
	
	for (var i = 0; i < num_floors; ++i) {
		self.addFloor();
	}
	for (var i = 0; i < num_elevators; ++i) {
		self.addElevator();
	}
	for (var i = 0; i < num_people; ++i) {
		self.addPerson();
	}
};

Building.prototype = {
	addFloor: function() {
		var self = this;
		self.floors.push(new Floor(self.floors.length));
	},
	removeFloor: function() {
		var self = this;
		self.floors.pop();
	},
	addElevator: function() {
		var self = this;
		self.elevators.push(new Elevator(self.elevators.length, self.floors[0]));
	},
	removeElevator: function() {
		var self = this;
		self.elevators.pop();
	},
	addPerson: function() {
		var self = this;
		self.people.push(new Person(self.people.length, 0));
	},
}