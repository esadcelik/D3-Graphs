document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("from").value=0;
    document.getElementById("to").value=10;

}, false);



function fg() {
var t = [];
var sin = [];
var cos = [];
var tan = [];
var ln = [];
var t0;
var h1;

if(document.getElementById('sin').checked){
for(h1 = parseInt(document.getElementById("from").value); h1 < parseInt(document.getElementById("to").value); h1++) {
    t0 = Math.sin(h1+1);
    t.push(t0);
    sin.push([t0,h1]);
}}else{sin=0;}

if(document.getElementById('cos').checked){
for(h1 = parseInt(document.getElementById("from").value); h1 < parseInt(document.getElementById("to").value); h1++) {
    t0 = Math.cos(h1+1);
    t.push(t0);
    cos.push([t0,h1]);
}}else{cos=0;}

if(document.getElementById('tan').checked){
for(h1 = parseInt(document.getElementById("from").value); h1 < parseInt(document.getElementById("to").value); h1++) {
    t0 = Math.tan(h1+1);
    t.push(t0);
    tan.push([t0,h1]);
}}else{tan=0;}

if(document.getElementById('ln').checked){
for(h1 = parseInt(document.getElementById("from").value); h1 < parseInt(document.getElementById("to").value); h1++) {
    t0 = Math.sqrt(h1+1);
    t.push(t0);
    ln.push([t0,h1]);
}}else{ln=0;}


draw(sin,cos,tan,ln,t);

}




function draw(sindata,cosdata,tandata,lndata,t2) {
	try {
    	d3.select("svg").remove(); 
	}
	catch(err) {}
	
	var w = 400;
	var h = 400;
	var padding = 30;
	
	var xScale = d3.scale.linear()           
            	.domain([parseFloat(document.getElementById("from").value),parseFloat(document.getElementById("to").value)])  
               	.range([padding, w-padding]);
	var yScale = d3.scale.linear()           
			    .domain([parseFloat(d3.min(t2)), parseFloat(d3.max(t2))])   
			    .range([h-padding, padding]); 
	
	 var xAxis = d3.svg.axis()                  
                .scale(xScale)
                .tickSize(1)
                .orient("bottom")
				.ticks(5);
	
	var yAxis = d3.svg.axis()
                .scale(yScale)
                .tickSize(1)
                .orient("left")
                .ticks(5);
                
    var line = d3.svg.line()
    			.x(function (d,i) {return xScale(d[1]); })
    			.y(function (d,i) {return yScale(d[0]); })
    			.interpolate("basis");
    
  
	
	var svg = d3.select(".graph")
            .append("svg")
            .attr("width", w)
    		.attr("height", h);
	
	svg.append("g")  
            .attr("class", "axis")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis);
    svg.append("g")
    		   .attr("class", "axis")
    		   .attr("transform", "translate(" + padding + ",0)")
    		   .call(yAxis);
    
	if(sindata!=0){svg.append("path").attr("class", "line1").attr("d", line(sindata));}
	if(cosdata!=0){svg.append("path").attr("class", "line2").attr("d", line(cosdata));}
	if(tandata!=0){svg.append("path").attr("class", "line3").attr("d", line(tandata));}
	if(lndata!=0){svg.append("path").attr("class", "line4").attr("d", line(lndata));}

}

