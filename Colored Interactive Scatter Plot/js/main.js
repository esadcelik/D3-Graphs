con = ["","All", "Africa", "Americas", "Asia", "Oceania", "Europe"];

d3.select(".slc")
		.append("select").on('change',onchange)
		.selectAll("option")
		.data(con)
		.enter().append("option")
        .text(function(d) { return d; })

function onchange() {
	selected = d3.select('select').property('value')
	
	if(selected == "All"){document.getElementById('d').style.display = 'block';}else{document.getElementById('d').style.display = 'none';}
	
	
	d3.json("js/countries.json", function(error,data){
	if (error) return console.warn(error);
	if(selected != ""){draw(data,selected);}
	
	
	});
};

function draw(data,option) {
	
	try {
    	d3.selectAll(".graph").select("svg").remove(); 
	}
	catch(err) {}
	
	var ymax = d3.max(data, function(d) {if(d.continent == option || option == "All"){return d.latitude;}});	
	var ymin = d3.min(data, function(d) {if(d.continent == option || option == "All"){return d.latitude;}});
	
	var xmax = d3.max(data, function(d) {if(d.continent == option || option == "All"){return d.longitude;}});
	var xmin = d3.min(data, function(d) {if(d.continent == option || option == "All"){return d.longitude;}});
	
	var rmax = d3.max(data, function(d) {if(d.continent == option || option == "All"){return d.years[17].population;}});
	var rmin = d3.min(data, function(d) {if(d.continent == option || option == "All"){return d.years[17].population;}});
	
	var w = 600;
	var h = 300;
	var padding = 30;
	
	
	var xScale = d3.scale.linear()           
            	.domain([xmin,xmax])  
               	.range([padding, w-padding]);
    
	var yScale = d3.scale.linear()           
			    .domain([ymin,ymax])   
			    .range([h-padding, padding]); 
	
	var rScale = d3.scale.linear()           
			    .domain([rmin,rmax])   
			    .range([5, 13]); 
	
	 var xAxis = d3.svg.axis()                  
                .scale(xScale)
                .tickSize(3)
                .orient("bottom")
				.ticks(10);


	var yAxis = d3.svg.axis()
                .scale(yScale)
                .tickSize(3)
                .tickFormat(function (d) {
        			return d;})
                .orient("left")
                .ticks(5);
                
    var svg = d3.select(".graph")
            .append("svg")
            .attr("width", w)
    		.attr("height", h);

	svg.append("g")  
            .attr("class", "axis")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis);

    svg.append("g")
    		   .attr("class", "axis2")
    		   .attr("transform", "translate(" + padding + ",0)")
    		   .call(yAxis);

	svg.selectAll("circle")
   		.data(data) 
   		.enter()
   		.append("circle")
   		.attr("fill", function(d) {
   		if(d.continent == "Africa"){return "green"}
   		if(d.continent == "Americas"){return "blue"}
   		if(d.continent == "Asia"){return "orange"}
   		if(d.continent == "Oceania"){return "yellow"}
   		if(d.continent == "Europe"){return "red"}})
   		.on("mouseover", function(d) { 
        		d3.select(this)
          
			var xPosition = xScale(d.longitude) / 2;
			var yPosition = h - parseFloat(d3.select(this).attr("cy"))  ;

			d3.select("#tooltip")
  				.style("left", xPosition + "px")
  				.style("top", yPosition + "px")
  				.select("#innerg").text("")
  				.text(d.name+" (latitude: "+d.latitude+", longitude: "+d.longitude+")");

			d3.select("#tooltip").classed("hidden", false);
		})
		.attr("cx", function(d) {   
        		return xScale(d.longitude);
  		 })
   		.attr("cy", function(d) {    
        		return yScale(d.latitude);
   		})
 		.attr("r", function(d) {if(d.continent == option || option == "All"){
   			 return rScale(d.years[17].population);  
		}})
		.on("mouseout", function(d) {  
        		d3.select(this)
 			  .transition()          
      		.duration(250);
			d3.select("#tooltip").classed("hidden", true);
			d3.select("#innerg").text("");
			try {d3.selectAll("#tooltip").select("svg").remove(); }catch(err) {}
		})
		.on("click", function(d) { 
				try {d3.selectAll("#tooltip").select("svg").remove(); }catch(err) {}
        		d3.select(this)
 			  	.transition()
      			  .duration(250);
      			  d3.select("#innerg").text("");
      			  
      			  
    var t;
	for(var y=0;y<data.length;y++){
		if(data[y].name==d.name){t=y;break;}
	}
	years = [];
	population = [];
	for(var y=0;y<10;y++){
	years.push(data[t].years[y].year);
	population.push(data[t].years[y].population);
	}
	var k = [];
	for(var g=0;g<population.length;g++){
		k.push([population[g],y[g]]);
	}
	var w2 = 300;
	var h2 = 300;
	var padding2 = 30;
	
	var prefix = d3.formatPrefix(1.21e9);
	
	var xScale2 = d3.scale.linear()           
            	.domain([d3.min(years),d3.max(years)])  
               	.range([padding, w2-padding2]);
	var yScale2 = d3.scale.linear()           
			    .domain([parseFloat(d3.min(population)), parseFloat(d3.max(population))])   
			    .range([h2-padding2, padding2]); 
	
	 var xAxis = d3.svg.axis()                  
                .scale(xScale2)
                .tickSize(3)
                .orient("bottom")
				.ticks(10);


	var yAxis = d3.svg.axis()
                .scale(yScale2)
                .tickSize(3)
                .tickFormat(function (d) {
        			var prefix = d3.formatPrefix(d);
        			return prefix.scale(d) + prefix.symbol;})
                .orient("left")
                .ticks(5);
                
    var svg = d3.select("#tooltip").classed("hidden", false)
            .append("svg")
            .attr("width", w2)
    		.attr("height", h2);
    		
    var bars = svg.selectAll("rect")
				.data(population)
				.enter()
					.append("rect")
					.attr("class", "rec")
					.attr("width",15)
					.attr("y",function(d){return yScale2(d);})
					.attr("height", function(d) {return 270-yScale2(d);})
					.attr("x", function(d,i) {return i*w2/12+30;});

	
	svg.append("g")  
            .attr("class", "axis")
            .attr("transform", "translate(0," + (h2 - padding2) + ")")
            .call(xAxis);

    svg.append("g")
    		   .attr("class", "axis2")
    		   .attr("transform", "translate(" + padding2 + ",0)")
    		   .call(yAxis);


	svg.select(".axis").selectAll("text").style("font-size","9px");
	svg.select(".axis2").selectAll("text").style("font-size","9px");
	svg.append("text")
        .attr("x", (w2 / 2))             
        .attr("y", 20)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")   
        .text("Change Population");



		}); 

	svg.select(".axis").selectAll("text").style("font-size","9px");
	svg.select(".axis2").selectAll("text").style("font-size","9px");
	svg.append("text")
        .attr("x", (w / 2))             
        .attr("y", 20)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")   
        .text("");


}



