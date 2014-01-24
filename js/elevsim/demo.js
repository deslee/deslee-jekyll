building = new Building(4, 15, 1); // elevators, floors, people
service = new ElevatorService(building);
view = new View("building", building);
$canvasContainer = $('.container');

$('#up').on('click', function() {
     var num = $('#elevNum').val();
     num.split(',').forEach(function(number) {
      service.moveUp(building.elevators[number-1]);
     });
});
$('#pe').on('click', function() {
  building.addElevator();
});

$('#se').on('click', function() {
  building.removeElevator();
});

$('#pf').on('click', function() {
  building.addFloor();
});


$('#sf').on('click', function() {
  building.removeFloor();
});

$('#down').on('click', function() {
     var num = $('#elevNum').val();
     num.split(',').forEach(function(number) {
      service.moveDown(building.elevators[number-1]);
     });
});

window.onload = 
$(document).ready(function() {
 window.onresize = function() {
      $('#building').attr('width', $canvasContainer.width());
       $('#building').attr('height', $canvasContainer.height());
        view.updateView();
 };
 window.onresize();
});