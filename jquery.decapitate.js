/*
 * Decapitate - jQuery Plugin
 * Simple sticky table headers
 *
 * Copyright (c) 2012 Tom Beynon
 *
 * Version: 0.1
 * Requires: jQuery v1.4.2+
 *
 */

(function( $ ){

  var methods = {
  
    init : function( options ) { 
    
    	return this.each(function(){
    	
	      var table = $(this),
	      		data  = table.data("decapitate");
	      		
	      var settings = $.extend({
		      
	      }, options);
				
				if(!data){
					// Table hasn't been initialized yet
					var data = {};
					data.tableWidth  = table.width();
					data.thRow       = table.children("thead").children("tr:first-child");
					data.thArr       = data.thRow.children("th");
					data.tdRow       = table.children("tbody").children("tr:last-child");
					data.tdArr       = data.tdRow.children("td");
					data.thWidthsArr = [];
					data.tdWidthsArr = [];
					data.tablePos    = table.offset();
					
					// Get the widths of each th
				  data.thArr.each(function(){
				  	var width = $(this).width();
				  	$(this).width(width);
				    data.thWidthsArr.push(width);
				  });
				  
				  // Get the widths of each td
				  data.tdArr.each(function(){
				  	var width = $(this).width();
				  	$(this).width(width);
				    data.tdWidthsArr.push(width);
				  });
				  
				  // Set the width of the table and the thRow (in px)
				  table.width(data.tableWidth);
				  data.thRow.width(data.tableWidth);
				  
				  table.data('decapitate', data);	
				  
				  _bindScroll.call(table);
				  
				}
			  
			});
			
    }
    
  };
  
  function _bindScroll(){
		// Attach the scroll event
		
		var table   = $(this),
  			data    = table.data("decapitate"),
  			thFixed = false;
  			
	  $(window).scroll(function(){
	  	var	scrollTop = $(window).scrollTop(),
	  			scrollLeft = $(window).scrollLeft();
	  			
	    if(scrollTop > data.tablePos.top){
				if(!thFixed){
					data.thRow.css({
		      	"position": "fixed",
		      	"z-index": "1000"
		      });
				}
	      data.thRow.css({
	      	"top": "0px",
	      	"left": data.tablePos.left - scrollLeft
	      });
	      thFixed = true;
	    }else if(thFixed){
	      data.thRow.css({
	      	"position": "static"
	      });
	      thFixed = false;
	    }
	    
	  });
	}

  $.fn.decapitate = function( method ) {
    
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.decapitate' );
    }    
  
  };

})( jQuery );