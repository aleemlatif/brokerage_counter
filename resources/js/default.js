/*	........................................................................................................
		author: 		Aleem Latif
 		description: 	ALBrokerageCounter-> Aleem's jQuery Plugin - to create Brokerage Counter 		
......................................................................................................... */

(function($){
 
    //	Attach this new method to jQuery
    $.fn.extend({ 
         
        //	start: ALBrokerageCounter plugin method
        ALBrokerageCounter: function(options) {
 			
			//	Set the default values
            var defaults = {
				initBrokerageVal: 0,
                currBrokerageVal: 7, 
				targetBrokerageVal: 15               			
            }
            
			// 	Facilitate overriding of default values of the plugin    
            var options =  $.extend(defaults, options);
			
            //	Iterate through the matched objects and return the flow back to jQuery
            return this.each(function() {
				 	
				 	var o = options;                
					var obj = $(this);              
					//obj.html('');			
					
					obj.slider({
							
							// initialize slider values
							orientation: "horizontal",
							range: "min",
							step: 1,
							animate: 'slow',							
							value: o.currBrokerageVal,
							min: o.initBrokerageVal,
							max: o.targetBrokerageVal,
							
							// Initialize Brokerage values - at slider creation time
							create: function (event, ui)	{
															
								$( "#currBrokerage" ).text( "$" + obj.slider( "value" ) );
								$( "#target-block > h3" ).text( "$" + o.targetBrokerageVal );
								
								// find the brokerageDiff 															
								var currentVal = obj.slider( "value" );	
								var brokerageDiff = o.targetBrokerageVal - currentVal;								
								
								// adjust poistion of CurrentValue w.r.t slider-arrow	
								var leftPosAdj = (brokerageDiff > 5)? 10 : 15;							
								var leftPos = $('.ui-slider-handle').position().left;								
								var leftPos = (leftPos - leftPosAdj )+ "px";																 
								$( "#currBrokerage" ).css( { "left": leftPos} );
								
								// show appropriate message and update the brokerageDiff value
								if (brokerageDiff > 0)	{
									$('.unqualified').removeClass('hidden');
									$('.qualified').addClass('hidden');
									$('span.brokerage-diff').text('$'+ brokerageDiff );
								} else	{
									$('.unqualified').addClass('hidden');
									$('.qualified').removeClass('hidden');									
								}																
						 
							},
							
							// Adjust values when the slider-pointer moves
							slide: function( event, ui ) {
								
								$( "#currBrokerage" ).html( "$" + ui.value );								
								
								// find the brokerageDiff 			
								var currentVal = ui.value;	
								var brokerageDiff = o.targetBrokerageVal - currentVal;	
								
								// adjust poistion of CurrentValue w.r.t slider-arrow	
								var leftPosAdj = (brokerageDiff > 5)? 10 : 15;							
								var leftPos = $('.ui-slider-handle').position().left;								
								var leftPos = (leftPos - leftPosAdj )+ "px";																 
								$( "#currBrokerage" ).css( { "left": leftPos} );							
								
								if (brokerageDiff > 0)	{
									$('.unqualified').removeClass('hidden');
									$('.qualified').addClass('hidden');
									$('span.brokerage-diff').text('$'+ brokerageDiff );
								} else	{
									$('.unqualified').addClass('hidden');
									$('.qualified').removeClass('hidden');									
								}																	
							},
							stop: function(event, ui)	{
								// find the brokerageDiff 			
								var currentVal = ui.value;	
								var brokerageDiff = o.targetBrokerageVal - currentVal;	
								
								// adjust poistion of CurrentValue w.r.t slider-arrow	
								var leftPosAdj = (brokerageDiff > 5)? 10 : 15;							
								var leftPos = $('.ui-slider-handle').position().left;								
								var leftPos = (leftPos - leftPosAdj )+ "px";																 
								$( "#currBrokerage" ).css( { "left": leftPos} );
							}
							
					});	// end slider					
					
            }); //	end: ALBrokerageCounter plugin
        }
    });
     
      
})(jQuery);

//==================================
jQuery(function($) {    

	/** 		
	 	- Please adjust the below Current and Target Brokerage values to test the functionality of this Brokerage Counter
	*/
	
	// Call ALBrokerageCounter plugin with the over-riding default values
    $('#brokerage-meter').ALBrokerageCounter({currBrokerageVal: 14, targetBrokerageVal : 15});	
});