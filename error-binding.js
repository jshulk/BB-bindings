// Whenever any attribute of the model changes, trigger a "model:changed" 
// event and this should trigger a dirty check across all the 
// dependent nodes             
define(["backbone"], function(Backbone){
	return Backbone.View.extend({

		initialize: function(){
			//this.bindings = { universal : "mainError"};
			this.on("model:changed", this.performDirtyCheck, this);
		},
		events: {
			"change #emailAddress": "updateEmail"
		},
		bindings: {
			"email" : "mainError, emailError, uniqueError",
			"password" : "mainError, pwdError"
		},
		performDirtyCheck: function($target){
			var bindings = this.bindings[ this.model.changedAttributes.key ];
			var self = this;
			bindings.forEach(function(t){
				
				if( t == "mainError"){
					this.model.isValid() ? self.$("#"+t).hide() : self.$("#"+t).show();
				}
				else if( t == "emailError" ){
					this.model.hasFormatError() ? self.$("#"+t).show() : self.$("#"+t).hide();
				}
				else if(t == "uniqueError"){
					this.model.checkEmailUniqueness() ? self.$("#"+t).hide() : self.$("#"+t).show();
				}
				else if( t == "pwdError" ){
					this.model.checkPwdError() ? self.$("#"+t).show() : self.$("#"+t).hide();
				}

			});
		},
		updateEmail: function(e){
			var $target = $(e.target);
		  	this.model.set("email", $target.val() );
		  	this.trigger("model:changed", $target);
		}
		render: function(){
			// template rendered
			// create the bindings
			this.bindings["emailAddress"] = ["emailError", "uniqueError"];
			this.bindings["password"] = ["pwdError"];
		}
	});
});