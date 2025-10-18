const url_svg = 'http://www.w3.org/2000/svg';

const course_data = [
    {
        "id": "Mechanics and Thermodynamics",
        "x": 400,
        "y": 0,
        "width": 100,
        "height": 50,
        "color": "#fbb800",
        "children": [
            "Chemistry for Earth Sciences"
        ]
    },
    {
        "id": "Calculus",
        "x": 250,
        "y": 0,
        "width": 100,
        "height": 50,
        "color": "#fbb800",
        "children": [
            "Linear Algebra",
            "Fields and Waves",
            "Fluid Dynamics"
        ]
    },
    {
        "id": "Exploring the Grand Challenges",
        "x": 100,
        "y": 0,
        "width": 100,
        "height": 50,
        "color": "#0b183e",
        "children": [
            "EC&T in the Field"
        ]
    },
    {
        "id": "Earth and Climate System",
        "x": 550,
        "y": 0,
        "width": 100,
        "height": 50,
        "color": "#00ae84",
        "children": [
            "Surface, Water and Atmosphere"
        ]
    },
    {
        "id": "Chemistry for Earth Sciences",
        "x": 400,
        "y": 100,
        "width": 100,
        "height": 50,
        "color": "#fbb800",
        "children": [
        ]
    },
    {
        "id": "Surface, Water and Atmosphere",
        "x": 550,
        "y": 100,
        "width": 100,
        "height": 50,
        "color": "#00ae84",
        "children": [
        ]
    },
    {
        "id": "Geodata Fundamentals",
        "x": 100,
        "y": 100,
        "width": 100,
        "height": 50,
        "color": "#15b6c6",
        "children": [
        ]
    },
    {
        "id": "Linear Algebra",
        "x": 250,
        "y": 100,
        "width": 100,
        "height": 50,
        "color": "#fbb800",
        "children": [
        ]
    },
    {
        "id": "EC&T in the Field",
        "x": 100,
        "y": 200,
        "width": 550,
        "height": 50,
        "color": "#0b183e",
        "children": [
        ]
    },
    {
        "id": "Earth's Subsurface",
        "x": 100,
        "y": 300,
        "width": 100,
        "height": 50,
        "color": "#00ae84",
        "children": [
        ]
    },
    {
        "id": "Earth's Subsurface",
        "x": 100,
        "y": 300,
        "width": 100,
        "height": 50,
        "color": "#00ae84",
        "children": [
        ]
    },
    {
        "id": "Signals and Time Series",
        "x": 250,
        "y": 300,
        "width": 100,
        "height": 50,
        "color": "#15b6c6",
        "children": [
        ]
    },
    {
        "id": "Fields and Waves",
        "x": 400,
        "y": 300,
        "width": 100,
        "height": 50,
        "color": "#fbb800",
        "children": [
        ]
    },
    {
        "id": "Fluid Dynamics",
        "x": 550,
        "y": 300,
        "width": 100,
        "height": 50,
        "color": "#fbb800",
        "children": [
        ]
    },
    {
        "id": "EC&T in Society",
        "x": 100,
        "y": 400,
        "width": 550,
        "height": 50,
        "color": "#0b183e",
        "children": [
        ]
    },
    {
        "id": "Climate and Environmental Change",
        "x": 100,
        "y": 500,
        "width": 100,
        "height": 50,
        "color": "#00ae84",
        "children": [
        ]
    },
    {
        "id": "Geology for Engineering",
        "x": 250,
        "y": 500,
        "width": 100,
        "height": 50,
        "color": "#00ae84",
        "children": [
        ]
    },
    {
        "id": "Sensing and Spatial Analysis",
        "x": 400,
        "y": 500,
        "width": 100,
        "height": 50,
        "color": "#15b6c6",
        "children": [
        ]
    },
    {
        "id": "Modelling and Simulation",
        "x": 550,
        "y": 500,
        "width": 100,
        "height": 50,
        "color": "#fbb800",
        "children": [
        ]
    },
    {
        "id": "Field Project",
        "x": 100,
        "y": 600,
        "width": 550,
        "height": 50,
        "color": "#0b183e",
        "children": [
        ]
    },
    {
        "id": "Minor",
        "x": 100,
        "y": 700,
        "width": 550,
        "height": 50,
        "color": "#eb7350",
        "children": [
        ]
    },
    {
        "id": "EC&T Elective",
        "x": 100,
        "y": 800,
        "width": 100,
        "height": 50,
        "color": "#eb7350",
        "children": [
        ]
    },
    {
        "id": "Spatiotemporal Geodata Science",
        "x": 250,
        "y": 800,
        "width": 100,
        "height": 50,
        "color": "#15b6c6",
        "children": [
        ]
    },
    {
        "id": "Engineering Design Project",
        "x": 400,
        "y": 800,
        "width": 100,
        "height": 50,
        "color": "#0b183e",
        "children": [
        ]
    },
    {
        "id": "Bachelor Thesis",
        "x": 550,
        "y": 800,
        "width": 100,
        "height": 50,
        "color": "#007ec5",
        "children": [
        ]
    },
]

var selected = "Bachelor Thesis";

const svg = document.getElementById("course_graph");
if (svg === null) {
    console.log("svg is null.");
}

class LineSVG {
    constructor(x1, y1, x2, y2, linewidth, color) {
        this.element = document.createElementNS(url_svg, "line");
        this.element.setAttribute('x1', x1);
        this.element.setAttribute('y1', y1);
        this.element.setAttribute('x2', x2);
        this.element.setAttribute('y2', y2);
        this.element.setAttribute('stroke', color);
        this.element.setAttribute('stroke-width', linewidth);

    }

    handleClick() {
        this.element.stroke = 'red';
    }
}

class MarkerSVG {
    constructor(id, refX, refY, markerWidth, markerHeight, orient, color) {
        this.element = document.createElementNS(url_svg, "marker");
        this.element.setAttribute('id', id);
        this.element.setAttribute('refX', refX);
        this.element.setAttribute('refY', refY);
        this.element.setAttribute('markerWidth', markerWidth);
        this.element.setAttribute('markerHeight', markerHeight);
        this.element.setAttribute('orient', orient);
        this.element.setAttribute('markerUnits', 'strokeWidth');

        const path = document.createElementNS(url_svg, "path");
        path.setAttribute('d', 'M0,0 L4,0 L2,2 Z');
        path.setAttribute('fill', color);

        this.element.appendChild(path);
    }

    handleClick() {
        this.element.path.fill = 'red';
    }
}

class RectSVG {
    constructor(color, width, height, x, y) {
        this.element = document.createElementNS(url_svg, "rect");
        this.element.setAttribute("width", width.toString());
        this.element.setAttribute("height", height.toString());
        this.element.setAttribute("x", x);
        this.element.setAttribute("y", y);
        this.element.setAttribute("fill", color);
        this.element.setAttribute("rx", 10);
        this.element.setAttribute("stroke-width", "5px");
    }
}

class TextSVG {
    constructor(text, color, width, height, x, y) {
        this.element = document.createElementNS(url_svg, "text");
        this.element.textContent = text;
        this.element.setAttribute("x", x);
        this.element.setAttribute("y", y);
        this.element.setAttribute("fill", color);
        this.element.setAttribute("font-size", 11);
    }
}

class Arrow {
    constructor(x1, y1, x2, y2) {
        this.svg = document.createElementNS(url_svg, "svg");
        this.svg.setAttribute("x", 0);
        this.svg.setAttribute("y", 0);
        this.svg.setAttribute("width", 2000);
        this.svg.setAttribute("height", 2000);

        let marker_id = `arrow${x1}`;
        this.marker = new MarkerSVG(marker_id, 2, 0, 4, 4, "down", "black");

        this.line_origin = new LineSVG(x1, y1, x1, y1 + 27.5, "5px", "black");
        this.line_end = new LineSVG(x2, y2 - 27.5, x2, y2 - 10, "5px", "black");
        this.line_end.element.setAttribute("marker-end", `url(#${marker_id})`);

        let lines_between = []
        if (y2 - y1 <= 100) {
            lines_between.push(new LineSVG(x1 - 2.5, y1 + 25, x2 + 2.5, y2 - 25, "5px", "black"));
        }
        else if (x1 > 400) {
            let offset = 700 - x1;
            lines_between.push(new LineSVG(x1 + 2.5, y1 + 25, x1 + offset, y1 + 25, "5px", "black"));
            lines_between.push(new LineSVG(x1 + offset, y1 + 22.5, x1 + offset, y2 - 22.5, "5px", "black"));
            lines_between.push(new LineSVG(x2 + 2.5, y2 - 25, x1 + offset, y2 - 25, "5px", "black"));
        }
        else {
            let offset = x1 - 50;
            lines_between.push(new LineSVG(x1 + 2.5, y1 + 25, x1 - offset, y1 + 25, "5px", "black"));
            lines_between.push(new LineSVG(x1 - offset, y1 + 22.5, x1 - offset, y2 - 22.5, "5px", "black"));
            lines_between.push(new LineSVG(x2 + 2.5, y2 - 25, x1 - offset, y2 - 25, "5px", "black"));
        }

        for (var line of lines_between) {
            this.svg.appendChild(line.element);
        }
        this.svg.appendChild(this.line_origin.element);
        this.svg.appendChild(this.line_end.element);
        this.svg.appendChild(this.marker.element);

    }

    draw(svg) {
        svg.appendChild(this.svg);
    }

    handleClick() {
        for (var svg_child of this.svg.children) {
            if (svg_child.tagName === "line") {
                svg_child.setAttribute("stroke", "red");
            }
            else if (svg_child.tagName === "marker") {
                // What needs to be colored in the marker is the <path> tag which is a child of <marker>
                // Hence children[0].
                svg_child.children[0].setAttribute("fill", "red");
            }
        }
    }

    handleUnclick() {
        for (var svg_child of this.svg.children) {
            if (svg_child.tagName === "line") {
                svg_child.setAttribute("stroke", "black");
            }
            else if (svg_child.tagName === "marker") {
                // What needs to be colored in the marker is the <path> tag which is a child of <marker>
                // Hence children[0].
                svg_child.children[0].setAttribute("fill", "black");
            }
        }
    }
}

class Course {
    constructor(id, description, x, y, width, height, color, children) {
        this.id = id;
        this.description = description;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.children = children;
        this.color = color;

        this.rect = new RectSVG(this.color, width, height, 0, 0);

        this.text = document.createElementNS(url_svg, "foreignObject");
        this.text.setAttribute("x", 5);
        this.text.setAttribute("y", 0);
        this.text.setAttribute("width", width - 10);
        this.text.setAttribute("height", height);

        const div = document.createElement("div");
        div.style.width = "100%";
        div.style.height = "100%";
        div.style.fontSize = "11px";
        div.style.fontFamily = "sans-serif";
        div.style.alignContent = "center";
        div.style.textAlign = "center";
        // Bit of a sin to hardcode this so maybe remove later
        if (color === "#0b183e") {
            div.style.color = "white";
        }
        else {
            div.style.color = "black";
        }
        div.textContent = description;
        this.text.appendChild(div)

        this.svg = document.createElementNS(url_svg, "svg");
        this.svg.setAttribute("x", x);
        this.svg.setAttribute("y", y);
        this.svg.setAttribute("width", width);
        this.svg.setAttribute("height", height);
        this.svg.appendChild(this.rect.element);
        this.svg.appendChild(this.text);

        this.svg.addEventListener("mouseover", (e) => {
            this.rect.element.setAttribute('fill', 'red');
        });

        this.svg.addEventListener("mouseleave", (e) => {
            this.rect.element.setAttribute('fill', this.color);
        });

        this.svg.addEventListener("click", (e) => {
            course_dict[selected].handleUnclick();
            selected = this.id;
            this.handleClick();
        });
    }

    handleClick() {
        this.rect.element.setAttribute('stroke', 'red');

        if (links[this.id]) {
            for (var arrow of links[this.id]) {
                arrow.handleClick();
            }
        }
    }

    handleUnclick() {
        this.rect.element.setAttribute('stroke', 'transparent');

        if (links[this.id]) {
            for (var arrow of links[this.id]) {
                arrow.handleUnclick();
            }
        }
    }

    draw(svg) {
        svg.appendChild(this.svg);
    }
}

// Create courses
let course_dict = {};
for (var course of course_data) {
    course_dict[course.id] = new Course(
        course.id,
        course.id,
        course.x,
        course.y,
        course.width,
        course.height,
        course.color,
    );
};

// Create links (arrows)
let links = {};
for (var course of course_data) {
    let links_current = []
    if (!course.children) {
        continue
    }

    var x1, y1, x2, y2;
    var course1 = course_dict[course.id];

    for (var course2_id of course.children) {
        var course2 = course_dict[course2_id];
        if (!course2) {
            console.log("key:", course2_id, "not found, did you mistype it?");
            continue
        }

        x1 = course1.x + course1.width / 2;
        y1 = course1.y + course1.height;
        x2 = course2.x + course2.width / 2;
        y2 = course2.y;

        links_current.push(new Arrow(x1, y1, x2, y2));
        links[course.id] = links_current
    };
};

for (var key in course_dict) {
    course_dict[key].draw(svg);
}
for (var key in links) {
    for (var link of links[key]) {
        link.draw(svg);
    }
}

// const arrow = new Arrow(600, 50, 600, 100, 3, "black");
// arrow.draw(svg);
