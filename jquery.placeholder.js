/**
 * Placeholder - v1
 *
 * Terms of Use // Placeholder
 *
 * Copyright (c) 2012, White Whale Web Services
 * All rights reserved.
 */
(function($) {
	"use strict";
	
	var defaults, methods;
	
	// default options
	defaults = {
		className: "placeholder",
		clearSelector: false,
		onlyIfNeeded: true,
		placeholderValue: ""
	};
	
	methods = {
		// init
		// start up placeholder
		init: function(options) {
			var settings;
			
			options   = (typeof options === "object") ? options : {};
			settings  = $.extend({}, defaults, options);
			
			return this
				.each(function() {
					var self = $(this);
					
					// if browser supports placeholders for this, abort
					if (settings.onlyIfNeeded && this.placeholder && "placeholder" in document.createElement(this.tagName)) {
						return;
					}
					
					// abort to avoid double-binding
					if (self.data("placeholder")) {
						return;
					}
					
					// set the placeholder value, overriding any passed in option
					settings.placeholderValue = self.attr("placeholder") || "";
					
					self
						.data("placeholder", settings)  // set settings to prevent double-binding
						.focus(function() {
							methods.clear.apply(self);
						})
						.blur(function() {
							if (!self.val() || self.val() == settings.placeholderValue) {
								self
									.addClass(settings.className)
									.val(settings.placeholderValue);
							}
						})
						.blur();  // trigger blur now
					
					// clear on submit and on click of configured elements
					self
						.parents("form")
						.submit(function() {
							methods.clear.apply(self);
						});
					$(settings.clearSelector)
						.live("click", function() {
							methods.clear.apply(self);
						});
				})
		},
		
		// clear
		// clears the placeholder
		clear: function() {
			var self = $(this),
			    settings = self.data("placeholder");
			
			if (self.val() == settings.placeholderValue) {
				self
					.removeClass(settings.className)
					.val("");
			}
		}
	}
	
	// activate the plugin
	$.fn.placeholder = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === "object" || $.isFunction(method) || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error("Method " + method + " does not exist for jQuery.placeholder.");
		}
	}
})(jQuery);