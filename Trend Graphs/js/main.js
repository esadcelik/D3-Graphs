document.addEventListener('DOMContentLoaded', function() {
}, false);


d3.json("js/countries.json", function(error,data){

if (error) return console.warn(error);

d3.select(".slc")
		.append("select").on('change',onchange)
		.selectAll("option")
		.data(data)
		.enter().append("option")
        .text(function(d) { return d.name; })});




function onchange() {
	selectValue = d3.select('select').property('value')
	
	d3.json("js/countries.json", function(error,data){
	if (error) return console.warn(error);
	
	var t;
	for(var y=0;y<data.length;y++){
		if(data[y].name==selectValue){t=y;break;}
	}
	
	life_exp = [];
	years = [];
	gdp = [];
	population = [];
	
	for(var y=0;y<10;y++){
	life_exp.push(data[t].years[y].life_expectancy);
	years.push(data[t].years[y].year);
	gdp.push(data[t].years[y].gdp);
	population.push(data[t].years[y].population);
	}
	
	draw1(population,years);
	draw2(gdp,years);
	draw3(life_exp,years);

	});
};

function draw1(population,y) {
	var k1 = [];
	for(var g=0;g<population.length;g++){
		k1.push([population[g],y[g]]);
	}
	try {
    	d3.selectAll(".graph1").select("svg").remove(); 
	}
	catch(err) {}
	
	var w = 300;
	var h = 300;
	var padding = 40;
	
	var prefix = d3.formatPrefix(1.21e9);
	
	var xScale = d3.scale.linear()           
            	.domain([d3.min(y),d3.max(y)])  
               	.range([padding, w-padding]);
    
	var yScale = d3.scale.linear()           
			    .domain([parseFloat(d3.min(population)), parseFloat(d3.max(population))])   
			    .range([h-padding, padding]); 
	
	 var xAxis = d3.svg.axis()                  
                .scale(xScale)
                .tickSize(3)
                .orient("bottom")
				.ticks(10);


	var yAxis = d3.svg.axis()
                .scale(yScale)
                .tickSize(3)
                .tickFormat(function (d) {
        			var prefix = d3.formatPrefix(d);
        			return prefix.scale(d) + prefix.symbol;})
                .orient("left")
                .ticks(5);
                
    var svg = d3.select(".graph1")
            .append("svg")
            .attr("width", w)
    		.attr("height", h);
    		
    var area = d3.svg.area()
    					
    					.x(function(d) { return xScale(d[1]); })
    					.y0(h-padding)
    					.y1(function(d) { return yScale(d[0]); });
    					
	svg.append("path")
					.attr("class", "area")
					.attr("d", area(k1));
      
	svg.append("g")  
            .attr("class", "axis")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis);

    svg.append("g")
    		   .attr("class", "axis2")
    		   .attr("transform", "translate(" + padding + ",0)")
    		   .call(yAxis);


	svg.select(".axis").selectAll("text").style("font-size","9px");
	svg.select(".axis2").selectAll("text").style("font-size","9px");
	svg.append("text")
        .attr("x", (w / 2))             
        .attr("y", 20)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")   
        .text("Population");


}



function draw2(gdp,y) {
	var k = [];
	for(var g=0;g<gdp.length;g++){
		k.push([gdp[g],y[g]]);
	}
	
	try {
    	d3.selectAll(".graph2").select("svg").remove(); 
	}
	catch(err) {}
	
	var w = 300;
	var h = 300;
	var padding = 30;
	
	var prefix = d3.formatPrefix(1.21e9);
	
	var xScale = d3.scale.linear()           
            	.domain([d3.min(y),d3.max(y)])  
               	.range([padding, w-padding]);
	var yScale = d3.scale.linear()           
			    .domain([parseFloat(d3.min(gdp)), parseFloat(d3.max(gdp))])   
			    .range([h-padding, padding]); 
	
	 var xAxis = d3.svg.axis()                  
                .scale(xScale)
                .tickSize(3)
                .orient("bottom")
				.ticks(10);


	var yAxis = d3.svg.axis()
                .scale(yScale)
                .tickSize(3)
                .tickFormat(function (d) {
        			var prefix = d3.formatPrefix(d);
        			return prefix.scale(d) + prefix.symbol;})
                .orient("left")
                .ticks(5);
                
    var svg = d3.select(".graph2")
            .append("svg")
            .attr("width", w)
    		.attr("height", h);
    		
    var bars = svg.selectAll("rect")
				.data(k)
				.enter()
					.append("rect")
					.attr("class", "rec")
					.attr("width",15)
					.attr("y",function(d){return yScale(d[0]);})
					.attr("height", function(d) {return 270-yScale(d[0]);})
					.attr("x", function(d,i) {return i*w/12+30;});

	
	svg.append("g")  
            .attr("class", "axis")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis);

    svg.append("g")
    		   .attr("class", "axis2")
    		   .attr("transform", "translate(" + padding + ",0)")
    		   .call(yAxis);


	svg.select(".axis").selectAll("text").style("font-size","9px");
	svg.select(".axis2").selectAll("text").style("font-size","9px");
	svg.append("text")
        .attr("x", (w / 2))             
        .attr("y", 20)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")   
        .text("Change GDP");



}





function draw3(le,y) {
	var k = [];
	for(var g=0;g<le.length;g++){
		k.push([le[g],y[g]]);
	}
	
	try {
    	d3.selectAll(".graph3").select("svg").remove(); 
	}
	catch(err) {}
	
	var w = 300;
	var h = 300;
	var padding = 30;
	
	
	
	var xScale = d3.scale.linear()           
            	.domain([d3.min(y),d3.max(y)])  
               	.range([padding, w-padding]);
	var yScale = d3.scale.linear()           
			    .domain([parseFloat(d3.min(le)), parseFloat(d3.max(le))])   
			    .range([h-padding, padding]); 
	
	 var xAxis = d3.svg.axis()                  
                .scale(xScale)
                .tickSize(3)
                .orient("bottom")
				.ticks(10);

  
  
  
	var yAxis = d3.svg.axis()
                .scale(yScale)
                .tickSize(3)
                .orient("left")
                .ticks(5);
                
    var line = d3.svg.line()
    			.x(function (d) {return xScale(d[1]); })
    			.y(function (d) {return yScale(d[0]); })
    			.interpolate("basis");
	
	var svg = d3.select(".graph3")
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
	
	
	svg.select(".axis").selectAll("text").style("font-size","9px");
	svg.select(".axis2").selectAll("text").style("font-size","9px");
	
	svg.append("path").attr("class", "line").attr("d", line(k));

	svg.append("text")
        .attr("x", (w / 2))             
        .attr("y", 20)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")   
        .text("Life Expectancy");
}

