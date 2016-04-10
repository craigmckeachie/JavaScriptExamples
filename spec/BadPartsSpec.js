describe("Bad Parts",function(){

	describe("variable hoisting", function(){
				
		it("should create variable on window", function(){
			fullname = "John Doe";
			expect(fullname).toBe("John Doe");
			expect(window.fullname).toBeDefined();
			
		});
		afterEach(function() {
		    delete window.fullname
		});


		it("should throw exception when using strict", function(){
			var setFullName = function (){
				"use strict";
				fullname = "John Doe";
				return fullname;
			}
			
			expect(setFullName).toThrowError(ReferenceError);
			
		});

		it("should hoist declaration", function(){
			var setFullName = function (){
				"use strict"
				fullname = "Ray Romano";
				return fullname;
				var fullname;
			}
			
			expect(setFullName()).toBe("Ray Romano");
			
		});

		it("should not hoist assignment", function(){
			var setFullName = function (){
				"use strict"
				return fullname;
				fullname = "Ray Romano";
				var fullname;
			}
			
			expect(setFullName()).toBeUndefined();
			
		});

	});

});