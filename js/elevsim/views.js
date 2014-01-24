View = function(canvasId, building) {
	var self = this;
	self.container = new createjs.Stage(canvasId);
	self.building = building;
	self.elevatorDisplays = [];
	self.floorDisplays = [];
	self.removeChildren = function(deletedDisplay) {
		self.container.removeChild(deletedDisplay.displayObject);
	};
	
    function handleTick() {
        self.updateView();
    }
	createjs.Ticker.addEventListener("tick", handleTick);
}

var ViewDisplays = {
	Elevator: function(elevator) {
		this.elevator = elevator;
		this.width = 20;
		this.c = 20;
		this.displayObject = new createjs.Shape();
		this.displayObject.graphics.beginStroke('black').drawRect(0,0, this.c, this.c);
	},
	Floor: function(floor) {
		var self=this;
		self.floor = floor;
		self.displayObject = new createjs.Container();
		self.line = new createjs.Shape();
		self.line.graphics.beginStroke('grey').drawRect(0,0,1,.0001);
		self.text = new createjs.Text(floor.ID);
		self.displayObject.addChild(self.line);
		self.displayObject.addChild(self.text);
	},
}

ViewDisplays.Elevator.prototype = {

	// this function places the elevator on the x/y plane
	update: function(idx, numberOfElevators, view) {
		var cWidth = view.container.canvas.width;
		var cHeight = view.container.canvas.height;
		
		var floorNum = this.elevator.floor.ID;
		var offset = view.floorHeight * floorNum;
		var o = this.elevator.percentToNextFloor * view.floorHeight;
		offset += this.elevator.state == "up"?o:-o;
		
		this.width = view.floorHeight / 2;
		this.displayObject.scaleY = view.floorHeight/this.c;
		this.displayObject.scaleX = this.width/this.c;
		
		var x = cWidth / numberOfElevators * idx // divide space by n to get n subspaces
			+ cWidth / numberOfElevators / 2 - (this.width / 2); // divide subspace by 2 to center elevator
			
		var y = cHeight - view.floorHeight - offset;
		
		this.displayObject.x = x;
		this.displayObject.y = y;
	},
}

ViewDisplays.Floor.prototype = {
	update: function(idx, numberOfFloors, view) {
		var self = this;
		var cWidth = view.container.canvas.width;
		var cHeight = view.container.canvas.height;
		var height = cHeight / numberOfFloors;
		var bottomPosition = cHeight - (height * idx);
		
		self.line.y = bottomPosition;
		self.text.y = bottomPosition - height;
		
		self.line.scaleX = view.container.canvas.width;
		this.x = 0;
		this.y = 40;
		view.floorHeight = height;
	}
}

View.prototype = {
	updateView: function() {
		var self = this;
		
		var elevatorDisplays = self.elevatorDisplays;
		var floorDisplays = self.floorDisplays;
		
		var createOrUpdate = function(displays, ctor) {
			return function(model, i, models) {
				if (!displays[i]) { // create if it doesn't exist.
					displays[i] = new ctor(model);
					displays[i].update(i, models.length, self);
					self.container.addChild(displays[i].displayObject);
				} else {
					displays[i].update(i, models.length, self); // update stuff about it
				}
			}
		}
		
		self.building.floors.forEach(createOrUpdate(floorDisplays, ViewDisplays.Floor));
		self.building.elevators.forEach(createOrUpdate(elevatorDisplays, ViewDisplays.Elevator));
		
		elevatorDisplays.splice(self.building.elevators.length).forEach(self.removeChildren);
		floorDisplays.splice(self.building.floors.length).forEach(self.removeChildren);
		
		self.container.update();
	},
	
	disposeView: function() {
		var self = this;
		var filter = function(display) {
			self.removeChildren(display);
			return false;
		};
		self.elevatorDisplays = self.elevatorDisplays.filter(filter);
		self.floorDisplays = self.floorDisplays.filter(filter);
	}
};