ElevatorService = function(building) {
	this.building = building;
	this.elevators = building.elevators;
}


var move = function(elevator, service) {
		var moveALittle = function(finished) {
			elevator.percentToNextFloor += .01;
			if (elevator.percentToNextFloor >= 1) {
				elevator.percentToNextFloor = 1;
				finished(elevator);
				return;
			}
			
			setTimeout(function(){moveALittle(finished)}, 10);
		}
		moveALittle(function (elevator) {
			var state = elevator.state;
			if (state == 'up') {
				elevator.floor = service.building.floors[elevator.floor.ID+1];
			}
			else {
				elevator.floor = service.building.floors[elevator.floor.ID-1];
			}
			elevator.percentToNextFloor = 0;
			elevator.state = "still";
		});
};

ElevatorService.prototype = {
	moveUp: function(elevator) {
		elevator = elevator?elevator:this.building.elevators[0];
		if (elevator.state != 'still') {
			throw "cannot move while moving";
		}
		if (elevator.floor.ID == this.building.floors.length-1) {
			throw "Cannot move up"
		}
		elevator.state = 'up';
		move(elevator, this);
	},
	moveDown: function(elevator) {
		elevator = elevator?elevator:this.building.elevators[0];
		if (elevator.state != 'still') {
			throw "cannot move while moving";
		}
		if (elevator.floor.ID == 0) {
			throw "Cannot move down"
		}
		elevator.state = 'down';
		move(elevator, this);
	},
}