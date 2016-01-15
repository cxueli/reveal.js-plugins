var RevealAnything = window.RevealAnything || (function(){
	function parseJSON(str) {
	    var json;
	    try {
        	json = JSON.parse(str);
	    } catch (e) {
        	return null;
    		}
            return json;
	}

	/*
	* Recursively merge properties of two objects without overwriting the first
	*/
	function mergeRecursive(obj1, obj2) {
	  for (var p in obj2) {
	    try {
	      // Property in destination object set; update its value.
	      if ( obj2[p].constructor==Object ) {
	        obj1[p] = mergeRecursive(obj1[p], obj2[p]);
	
	      } else {
	        if ( !obj1[p] ) obj1[p] = obj2[p];
	
	      }
	
	    } catch(e) {
	      // Property in destination object not set; create it and set its value.
	      if ( !obj1[p] ) obj1[p] = obj2[p];
	
	    }
	  }
	
	  return obj1;
	}


	var config = Reveal.getConfig().anything;

	Reveal.addEventListener( 'ready', function( event ) {
		for (var i = 0; i < config.length; i++ ){
			// Get all elements of the class
			var elements = document.getElementsByClassName(config[i].className);
			var f = config[i].f;
			for (var j = 0; j < elements.length; j++ ){
				var options = config[i].defaults;
				var comments = elements[j].innerHTML.trim().match(/<!--[\s\S]*?-->/g);
				if ( comments !== null ) for (var k = 0; k < comments.length; k++ ){
					comments[k] = comments[k].replace(/<!--/,'');
					comments[k] = comments[k].replace(/-->/,'');
					mergeRecursive( options, config[i].defaults);
					options = parseJSON(comments[k]);
					if ( options ) {
						mergeRecursive( options, config[i].defaults);
						break;
					}
				}
// console.log("Options: " + JSON.stringify(options))
				f(elements[j], options);
// console.log(elements[j].outerHTML)
			} 
		}


	} );


})();

