const course_data = [
    {
        "id": "Mechanics and Thermodynamics",
        "x": 300,
        "y": 0,
        "width": 100,
        "height": 50,
        "color": "#fbb800"
    },
    {
        "id": "Calculus",
        "x": 150,
        "y": 0,
        "width": 100,
        "height": 50,
        "color": "#fbb800"
    },
    {
        "id": "Exploring the Grand Challenges",
        "x": 0,
        "y": 0,
        "width": 100,
        "height": 50,
        "color": "#0b183e"
    },
    {
        "id": "Earth and Climate System",
        "x": 450,
        "y": 0,
        "width": 100,
        "height": 50,
        "color": "#00ae84"
    },
    {
        "id": "Chemistry for Earth Sciences",
        "x": 300,
        "y": 100,
        "width": 100,
        "height": 50,
        "color": "#fbb800"
    },
    {
        "id": "Surface, Water and Atmosphere",
        "x": 450,
        "y": 100,
        "width": 100,
        "height": 50,
        "color": "#00ae84"
    },
    {
        "id": "Geodata Fundamentals",
        "x": 0,
        "y": 100,
        "width": 100,
        "height": 50,
        "color": "#15b6c6"
    },
    {
        "id": "Linear Algebra",
        "x": 150,
        "y": 100,
        "width": 100,
        "height": 50,
        "color": "#fbb800"
    },
    {
        "id": "EC&T in the Field",
        "x": 0,
        "y": 200,
        "width": 550,
        "height": 50,
        "color": "#0b183e"
    },
    {
        "id": "Earth's Subsurface",
        "x": 0,
        "y": 300,
        "width": 100,
        "height": 50,
        "color": "#00ae84"
    },
]

const svg = document.getElementById("course_graph");
if (svg === null) {
	console.log("svg is null.");
}

class RectSVG {
	constructor(color, width, height, x, y) {
		this.element = document.createElementNS('http://www.w3.org/2000/svg', "rect");
		this.element.setAttribute("width", width.toString());
		this.element.setAttribute("height", height.toString());
		this.element.setAttribute("x", x);
		this.element.setAttribute("y", y);
		this.element.setAttribute("fill", color);
		this.element.setAttribute("rx", 10);
	}
}

class TextSVG {
	constructor(text, color, width, height, x, y) {
		this.element = document.createElementNS('http://www.w3.org/2000/svg', "text");
		this.element.textContent = text;
		this.element.setAttribute("x", x);
		this.element.setAttribute("y", y);
		this.element.setAttribute("fill", color);
		this.element.setAttribute("font-size", 11);
	}
}

class Course {
	constructor(id, description, x, y, width, height, color) {
		this.id = id;
		this.description = description;
		this.rect = new RectSVG(color, width, height, 0, 0);
		this.text = new TextSVG(description, "black", 100, 50, 50, 25);
		this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.svg.setAttribute("x", x);
		this.svg.setAttribute("y", y);
		this.svg.setAttribute("width", width);
		this.svg.setAttribute("height", height);
		this.svg.appendChild(this.rect.element);
		this.svg.appendChild(this.text.element);
	}

	draw(svg) {
		svg.appendChild(this.svg);
	}
}

//
//const linear = new Course("Linear Algebra", "Linear Algebra", 450, 100);
//const ect_field = new Course("EC&T in the Field", "EC&T in the Field", 300, 50);
//
//const earth_subsurface = new Course("Earth's Subsurface", "Earth's Subsurface", 300, 50);
//const atmosphere_ocean_dynamics = new Course("Atmosphere and Ocean Dynamics", "Atmosphere and Ocean Dynamics", 300, 50);
//const signals_timeseries = new Course("Signals and Time Series", "Signals and Time Series", 300, 50);
//const fluid_dynamics = new Course("Fluid Dynamics", "Fluid Dynamics", 300, 50);
//const ect_society = new Course("EC&T in Society", "EC&T in Society", 300, 50);
//const fields_waves = new Course("Fields & Waves", "Fields & Waves", 300, 50);
//
//const geology_engineering = new Course("Geology for Engineering", "Geology for Engineering", 300, 50);
//const climate_environmental = new Course("Climate and Environmental Change", "Climate and Environmental Change", 300, 50);
//const sensing_spatial = new Course("Sensing and Spatial Analysis", "Sensing and Spatial Analysis", 300, 50);
//const modelling_simulation = new Course("Modelling and Simulation", "Modelling and Simulation", 300, 50);
//
//const field_project = new Course("Field Project", "Field Project", 300, 50);
//
//const design_project = new Course("Engineering Design Project", "Engineering Design Project", 300, 50);
//const elective = new Course("EC&T Elective", "EC&T Elective", 300, 50);
//const spatiotemporal = new Course("Spatiotemporal Data Analysis", "Spatiotemporal Data Analysis", 300, 50);
//
//const thesis = new Course("Bachelor Thesis", "Bachelor Thesis", 300, 50);
let course_list = [];
for (var course of course_data) {
    course_list.push(new Course(
        course.id,
        course.id,
        course.x,
        course.y,
        course.width,
        course.height,
        course.color
    ))
};

for (var course of course_list) {
    course.draw(svg);    
}
