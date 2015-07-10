document.addEventListener('DOMContentLoaded', function() {

	
	d3.json("input/assignments.json", function(error,data){
	if (error) return console.warn(error);
	
	//console.log(data.Data[0].Student_A);
	//console.log(data);
	
	
	var data2 = {nodes: [],edges: []};

	for(i=0;i<data.Data.length;i++){
	
	var item = data.Data[i];
	var t = 0
	
	for(j=0;j<data2.nodes.length;j++){
	
		if(data2.nodes[j].name == item.Student_A){
			t = 1;
		}
	}
	
	if(t == 0){
	
	data2.nodes.push({ 
        "name" : item.Student_A
    });
    }
	
	
	
    
    data2.edges.push({ 
        "source" : parseInt(item.Student_A),
        "target" : parseInt(item.Student_B)
    });
		
		
		
	
	}
	
	console.log(data2);
	
	draw(data2);
	});
	
	
	
	range1 = d3.select("#f1").property("value");
	range2 = d3.select("#f2").property("value");
	
	radio1 = d3.selectAll("#r1").property("checked");
	radio2 = d3.selectAll("#r2").property("checked");
	radio3 = d3.selectAll("#r3").property("checked");
	radio4 = d3.selectAll("#r4").property("checked");


    //console.log(range1);
    //console.log(range2);
    //console.log(radio1);
    //console.log(radio2);
    //console.log(radio3);
    //console.log(radio4);
    
    
    
}, false);



function change0() {
	range1 = d3.select("#f1").property("value");
	range2 = d3.select("#f2").property("value");
	
};

function draw(data2) {
	
	try {
    	d3.selectAll(".graph").select("svg").remove(); 
	}
	catch(err) {}

	
	var w = 600;
	var h = 300;

		
			
			
			//Initialize a default force layout, using the nodes and edges in dataset
			var force = d3.layout.force()
					   .nodes(data2.nodes)
				        .links(data2.edges)
					   .size([w, h])
                        .linkStrength(1)
					   .linkDistance([50])
					   .charge([-100])
                        .gravity(0.1)
					   .start();

			var colors = d3.scale.category10();
			
			var svg = d3.select(".graph")
				   .append("svg")
				   .attr("width", w)
				   .attr("height", h);
			
			//Create edges as lines
			var edges = svg.selectAll("line")
				.data(data2.edges)
				.enter()
				.append("line")
				.style("stroke", "#ccc")
				.style("stroke-width", 1);
			
			//Create nodes as circles
			var nodes = svg.selectAll("circle")
				.data(data2.nodes)
				.enter()
				.append("circle")
				.attr("r", 10)
				.style("fill", function(d, i) {
					return colors(i);
				})
				.call(force.drag);
			
			//Every time the simulation "ticks", this will be called
			force.on("tick", function() {
				edges.attr("x1", function(d) { return d.source.x; })
					 .attr("y1", function(d) { return d.source.y; })
					 .attr("x2", function(d) { return d.target.x; })
					 .attr("y2", function(d) { return d.target.y; });
			
				nodes.attr("cx", function(d) { return d.x; })
				     .attr("cy", function(d) { return d.y; });
				     
	
			});											


}



