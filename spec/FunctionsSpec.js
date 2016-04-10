describe("Functions",function(){

	describe("Function Types", function(){

		it("Function Statments are hoisted",function(){
			var result= add(2,2);
			expect(result).toBe(4);
			function add(a, b){
				return a + b;
			}
		});

		it("Function Expressions are not hoisted",function(){
			//try moving this statment below invocation
			var add = function (a, b){
				return a + b;
			}
			var result= add(2,2);
			expect(result).toBe(4);
			
		});

	});

	describe("Arguments", function(){
		
		it("arguments is array like", function(){
			function log(){ 
				expect(arguments[0]).toBe(1);
				expect(arguments[1]).toBe(2);
				expect(arguments.length).toBe(3);
			};
			
			log(1,2,3);

		});
			
	});

	describe("Scope", function(){
		it("JS has function scope NOT block scope", function(){
				function scopeTest() {


					for (var i = 0; i <= 5; i++)
					{
					  var insideForLoop = i; 
					}

					expect(insideForLoop).toBeDefined();
					expect(insideForLoop).toBe(5);

				}

				scopeTest( );

		});

		it("closures have access to outer variables", function(){
			
			function outer() {
			  var outerVariable = "outer";

			  function inner() {
			    expect(outerVariable).toBe("outer");
			  }
			  inner();
			}

			outer();

		});

		it("closures can be returned and invoked later", function(){
			
			function outer() {
			  var outerVariable = "outer";

			  return function closure(){
			    expect(outerVariable).toBe("outer");
			  }
			}

			 var closure = outer();
			 closure();
		});

		it("module pattern: return object literal", function(){
			
			var Module = (function () {
			  var privateMethod = function () {};

			  return {
			    publicMethodOne: function () {
			      // I can call `privateMethod()` you know...
			    },
			    publicMethodTwo: function () {

			    }
			  };

			})();

			expect(Module.privateMethod).toBeUndefined();
			expect(Module.publicMethodOne).toBeDefined();
			expect(Module.publicMethodTwo).toBeDefined();

		});

		it("module pattern: create object and return", function(){
			
			var Module = (function () {
			  
			  var objectForPublicStuff = {};
			  
			  var privateMethod = function () {};
			  var privateMethod2 = function () {};

			  objectForPublicStuff.publicMethod = function () {
			    // take it away Mr. Public Method
			  };
			  
			  return objectForPublicStuff;

			})();

			expect(Module.privateMethod).toBeUndefined();
			expect(Module.publicMethod).toBeDefined();

		});


		
		it("revealing module pattern", function(){
			var Module = (function () {

			  var privateMethod = function (text) {
			    console.log(text);
			  };

			  var someMethod = function (text) {
			    privateMethod(text);
			  };

			  var anotherMethod = function () {
			    // public
			  };
			  
			  return {
			    someMethod: someMethod,
			    anotherMethod: anotherMethod
			  };

			})();

			expect(Module.someMethod).toBeDefined();
			//expect(Module.someMethod("Hey")).toBe("Hey");
			
		});
			
	});


		
	describe("Invocation Patterns", function(){

		it("Function Invocation", function(){
			function doStuff(){
	    		expect(this).toEqual(window);
			}
			doStuff();
		});

		it("Function Invocation in Strict Mode", function(){
			function doStuff(){
				"use strict"
	    		expect(this).toBeUndefined();
			}
			doStuff();
		});

		it("Method Invocation with dot notation", function(){
			 var myObj = {
			    doStuff: function(){
			      expect(this).toBe(myObj);
			    }
			 };
			 myObj.doStuff();
		});

		it("Method Invocation without dot notation", function(){
			 var myObj = {
			    doStuff: function(){
			      expect(this).toBe(window);
			    }
			 };
			 var fn = myObj.doStuff;
  			 fn();
		});

		it("Method Invocation without dot notation and strict mode", function(){
			 var myObj = {
			    doStuff: function(){
			      "use strict";
			      expect(this).toBeUndefined();
			    }
			 };
			 var fn = myObj.doStuff;
  			 fn();
		});

		it("Constructor Invocation with 'new' Keyword", function(){
			 function Greeter(){
			    this.greeting = "Hello";
			    console.log(this);
			    expect(this.constructor).toBe(Greeter);
			    
			 }
			  
			 var greeter = new Greeter();
			 expect(greeter.greeting).toEqual("Hello");
		});
		// A call to "new Foo()" creates a new object instance, said to be of type "Foo"
		// The object instance is assigned a prototype of "Foo.prototype"
		// The "Foo" function is then invoked with the new object instance assigned to "this" in that function invocation
		// The "Foo" object instance is returned from the function call
		
		it("Call Invocation",function(){
			function doStuff(b){
		      return this.a + b;
	  		}
			  
			var myContext = {a: 1};
			var result = doStuff.call(myContext, 2);
			expect(result).toBe(3);
		});
		//exercise add a another parameter c, pass 3, result 6

		it("Call Invocation",function(){
			function doStuff(b, c){
		      return this.a + b + c;
	  		}
			  
			var myContext = {a: 1};
			var result = doStuff.call(myContext, 2, 3);
			expect(result).toBe(6);
		});

		it("Apply Invocation",function(){
			function doStuff(b, c){
		      return this.a + b + c;
	  		}
			  
			var myContext = {a: 1};
			var result = doStuff.apply(myContext, [2, 3]);
			expect(result).toBe(6);
		});

		it("Bind Invocation",function(){
			function doStuff(b, c){
			  return this.a + b + c;
			}

			//bind the function to a context
			var myContext = {a: 1};
			var boundStuff = doStuff.bind(myContext);

			// call the bound function with additional params
			var result = boundStuff(2, 3);
			expect(result).toBe(6);
		});
		//The .bind method is only available in ECMAScript 5 
		//Underscore.js, for example, as a "_.bind" method that gives you this functionality. 

		it("Callbacks: When Method Invocation becomes Function Invocation", function(){
			var myObj = {
			    foo: "bar",
			    
			    moreStuff: function(cb){
			      cb();
			    },

			    doStuff: function(){
			      expect(this.foo).toBeUndefined();
			    }
			};
			  
			myObj.moreStuff(myObj.doStuff);

		});



	});

	describe('ECMAScript 2015', function() {
		describe('Arrow Functions', function() {
			it('provide terse syntax for defining a function', function() {
				// function add (a, b) {
				// 	 return a + b; 
				// }

				var add = (a, b) => a + b; 

				expect(add(2,3)).toBe(5);

			});

            it('are useful with array methods', function () {
                var numbers = [1,2,3,4];
                var sum = 0;
                numbers.forEach(n => sum += n);

                var double = numbers.map(n  => n*2);
                expect(double).toEqual([2,4,6,8]);
                
            });

            it('lexically binds to "this"', function (done) {
                var self = this;
                this.name = 'Craig';

                //fails
                //setTimeout(function(){
                //    expect(this.name).toBe('Craig');
                //    done();
                //},15);

                //capture this in closure variable
                //setTimeout(function(){
                //    expect(self.name).toBe('Craig');
                //    done();
                //},15);

                setTimeout(()=>{
                    expect(this.name).toBe('Craig');
                    done();
                },15);

            });
		});




	});

});
