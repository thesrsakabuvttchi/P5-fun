point_list = []
particle_list = []

function add_point_list(x = Math.floor(Math.random()*1000),y = 600, x_spd = 0, y_spd = 10)
{
  let color_list = [color(255,128,49),color(255,100,50),color(200,100,0)]
  point_list.push({
    'x':x,
    'y':y,
    'x_spd':x_spd,
    'y_spd':y_spd,
    'color':color_list[Math.floor(Math.random()*color_list.length)], 
    'weight' : 10
  })
}

function add_particle_list(element)
{
  let color_list = [color(255,128,49),color(255,100,50),color(200,100,0)]


  for(let num_particles = Math.floor(Math.random()*100)+20; num_particles>0; num_particles--)
  {
    let velocity_vector = Math.random()*8
    let angle = Math.random()*12.56

    particle_list.push({
      'x': element['x'],
      'y': element['y'],
      'x_spd':element['x_spd']+velocity_vector*Math.sin(angle),
      'y_spd':element['y_spd']+velocity_vector*Math.cos(angle),
      'color':color_list[Math.floor(Math.random()*color_list.length)], 
      'weight' : 3
    })
  }
}

function add_point_at_random(chance = 0.01)
{
  if(Math.floor(Math.random()*(1/chance))==Math.floor(0.5/chance))
    add_point_list(Math.floor(Math.random()*1000),600,0,Math.floor(Math.random()*5)+5)
}

function explode_points()
{
  new_list = []
  point_list.forEach(element => {
    if(element['y']>0)
    {
      new_list.push(element)
    }   
    else
    {
      add_particle_list(element)
    }
  });
  point_list = new_list
}

function dacay_particles()
{
  new_list = []
  particle_list.forEach(element => {
    if(element['y_spd']>-10)
    {
      new_list.push(element)
    }   
  });
  particle_list = new_list
}

function redraw_point(point1,gravity = 0.1)
{
  stroke(point1['color']);
  strokeWeight(point1['weight']);
  point(point1['x'],point1['y']);
  point1['y'] -= point1['y_spd'];
  point1['x'] -= point1['x_spd'];
  point1['y_spd'] -= gravity;
}

function setup() {
  let test = createCanvas(1000, 600);
  test.center('horizontal')
}

function draw() {
  background(5);
  point_list.forEach(element => {
    redraw_point(element)    
  });

  particle_list.forEach(element => {
    redraw_point(element)    
  });

  add_point_at_random()
  explode_points()
  dacay_particles()
}