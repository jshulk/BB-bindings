var jsAspect = ( function(){

	var jsAspect = {
		pointcut:{
			prototypeMethods: {},
			method : {}
		}
	};

/*
*
* Simply adds static properties on to the target function.
*/
	jsAspect.introduce = function(target, pointcut, introduction){
		target = (jsAspect.pointcut.prototypMethods == pointcut ) ? target.prototype : target;
		for( var property in introduction ){
			if( introduction.hasOwnProperty(property) ){
				target[property] = introduction[property];
			}
		}
	};

	jsAspect.inject = function(target, pointcut, adviceName, advice, methodName){
		if( jsAspect.pointcuts.method == pointcut ){
			injectAdvice( target, methodName, advice, adviceName );
		}
		else{
			target = ( jsAspect.pointcut.prototypeMethods == pointcut ) ? target.prototype : target;
			for( var method in target ){
				if( target.hasOwnProperty( method ) ){
					injectAdvice( target, method, advice, adviceName );
				}
			}		
		}
	};

	function injectAdvice( target, methodName, advice, adviceName ){
		if( isFunction( target[methodName] )){
			
			if( jsAspect.advices.around == adviceName ){
				advice = wrapAroundAdvice( advice );
			}
			if(!target[methodName][adviceEnhancedFlagName]){
				enhanceWithAdvices( target, methodName );
				target[methodName][adviceEnhancedFlagName] = true;
			}
			target[methodName][adviceName].unshift(advice);
		}
	}

	return jsAspect;

})();