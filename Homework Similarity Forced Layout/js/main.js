document.addEventListener('DOMContentLoaded', function() {

	change0();

	
}, false);



function change0() {
	
	range1 = d3.select("#f1").property("value");
	range2 = d3.select("#f2").property("value");

	radio1 = d3.selectAll("#r1").property("checked");
	radio2 = d3.selectAll("#r2").property("checked");
	radio3 = d3.selectAll("#r3").property("checked");
	radio4 = d3.selectAll("#r4").property("checked");

	d3.json("input/assignments.json", function(error,data){
	if (error) return console.warn(error);
	
	var dataset = {nodes: [],edges: []};

	for(i=0;i<data.Data.length;i++){
	
	dataset.nodes.push({
	"name": parseInt(data.Data[i].Student_A)
	});
	
	
	}
    for(i=0;i<data.Data.length;i++){
    	
		dataset.edges.push({
		"source": parseInt(data.Data[i].Student_A), 
		"target": parseInt(data.Data[i].Student_B), 
		"met": parseInt(data.Data[i].NormalizedMetric),
		"file": data.Data[i].File
		});
		}
	
	if(radio1==true){sum1 = 1;}
	else{sum1 = 0;}
	if(radio3==true){sum2 = 1;}
	else{sum2 = 0;}
	
	
	draw(dataset,sum1,sum2,range1,range2);

	
	});
};

function draw(data2,sum1,sum2,edgeU,edgeD) {

	try {
    	d3.selectAll(".graph").select("svg").remove(); 
	}
	catch(err) {}

	
	var w = 600;
	var h = 600;

	var emax = d3.max(data2.edges, function(d) {return d.met;});
	var emin = d3.min(data2.edges, function(d) {return d.met;});
	
	var color = d3.scale.linear()
    			.domain([1,35])
    			.range(["white", "red"]);
    
	var eScale = d3.scale.linear()           
            	.domain([emin,emax])  
               	.range([1, 10]);
    
    var cScale = d3.scale.linear()           
            	.domain([emin,emax])  
               	.range([5, 50]);
               	
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
			
	var edges = svg.selectAll("line")
				.data(data2.edges)
				.enter()
				.append("line")
				.style("stroke", "#ccc")
				.style("opacity", 0.5)
				.on('click',function(d){
				window.open("input/"+d.file, '_blank');
   				})
				.style("stroke-width", function(d) {if(d.met>edgeD-20){ return eScale(d.met);}else{return 0} })
				.on("mouseover", function(d) { 
				
        		d3.select(this).style("opacity",1)
        		d3.select("#k"+d.source.index).style("opacity", 1);
        		d3.select("#k"+d.target.index).style("opacity", 1);
        		
        		d3.select(this)
        		var xPosition = 250  ;
				var yPosition =  350 + parseFloat(d3.select(this).attr("y1"));

        		d3.select("#tooltip2")
  						.style("left", xPosition + "px")
  						.style("top", yPosition + "px")
  						.select("#innerg2").text("")
  						.text("Source: "+d.source.name+" Target: "+d.target.name+" Score: "+d.met);

				d3.select("#tooltip2").classed("hidden", false);
        		})
    			.on("mouseout", function(d) {
    			d3.select(this)
 			  				.transition()          
      						.duration(250);
							d3.select("#tooltip2").classed("hidden", true);
							d3.select("#innerg2").text("");
							try {d3.selectAll("#tooltip2").select("svg").remove(); }catch(err) {}
        		d3.select(this).style("opacity",0.5)
        		d3.select("#k"+d.source.index).style("opacity", 0.5)
        		d3.select("#k"+d.target.index).style("opacity", 0.5)
        		});
			

	var nodes = svg.selectAll("circle")
				.data(data2.nodes)
				.enter()
				.append("circle")
				.attr("r", 7)
				.style("opacity", 0.5)
				.attr("id", function(d) {return "k"+d.index;})
				.style("fill", function(d, i) {return colors(i);})
				.call(force.drag)
				.on("mouseover", function(d) { 
        		d3.select(this)

				var xPosition = 250  ;
				var yPosition =  350 + parseFloat(d3.select(this).attr("cy"));
				var str = d3.select(this).attr("id");
				str = str.substr(1);
				d3.select("#tooltip")
  						.style("left", xPosition + "px")
  						.style("top", yPosition + "px")
  						.select("#innerg").text("")
  						.text("Username: "+str+", "+"Score: "+d3.select(this).attr("r"));

				d3.select("#tooltip").classed("hidden", false);
				})
				.on("mouseout", function(d) {  
        					d3.select(this)
 			  				.transition()          
      						.duration(250);
							d3.select("#tooltip").classed("hidden", true);
							d3.select("#innerg").text("");
							try {d3.selectAll("#tooltip").select("svg").remove(); }catch(err) {}
				});
	
	
	var n = [];
	for(i=0;i<data2.edges.length;i++){
		n.push({
		"name":data2.edges[i].source.name,
		"score":svg.select("#k"+data2.edges[i].source.name).attr("r")
		
		
		});
		var h = svg.select("#k"+data2.edges[i].source.name).attr("r");
    	
    	svg.select("#k"+data2.edges[i].source.name)
    		.attr("r", function(d) {
    		if(sum1 == 1){
    		if(edgeU*data2.edges[i].met>150){return cScale(parseInt(h));
    		}
    		return cScale(parseInt(h) + parseInt(data2.edges[i].met));
    		
    		}
    		else {
    		return cScale(Math.max(parseInt(h),parseInt(data2.edges[i].met)));
    		}
    		});
	}
	
	document.getElementById("t").innerHTML = "";		
	n = n.sort(function (a,b) {return d3.descending(parseInt(a.score), parseInt(b.score)); });
	for(i=0;i<n.length;i++){
	d3.select("#t")
    		.append("text")
    		.html("Rank: "+(i+1)+" Name: "+n[i].name+" Score: "+parseInt(n[i].score)+"</br>");
    }		
    n = [];	
	
	
	force.on("tick", function() {
				edges.attr("x1", function(d) { return d.source.x; })
					 .attr("y1", function(d) { return d.source.y; })
					 .attr("x2", function(d) { return d.target.x; })
					 .attr("y2", function(d) { return d.target.y; });
			
				nodes.attr("cx", function(d) { return d.x; })
				     .attr("cy", function(d) { return d.y; });
				     
	
			});											


}



