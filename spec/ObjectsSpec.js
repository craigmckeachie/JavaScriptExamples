describe("Objects",function(){
	
	describe("Initialization",function(){
		it("should be undefined", function(){
			var customer;
			expect(customer).toBeUndefined();
		});

		it("should be null", function(){
			var customer = null;
			expect(customer).toBeNull();
		});

		it("Global Namespace Pollution",function(){
			//expect(window.Patient).toBeDefined();	
			expect(window.Patient).toBeUndefined();
			expect(ERT.Patient).toBeDefined();
		});

	});

	describe("Object Literals", function(){
		var customer= {
				first_name : "Craig",
				"last-name" : "McKeachie"
		};

		describe("Retrieval", function(){

			it("first_name can be retrieved", function(){
			expect(customer.first_name).toBe("Craig");	
			});

			it("objects are just hash tables",function(){
				expect(customer["last-name"]).toBe("McKeachie");
				//name must be constant, legal javaScript name, not a reserved word
			});

			it("default values",function(){
				expect(customer.middle_name).toBeFalsy();
				expect(customer.middle_name || "not provided").toBe("not provided");
			});

			it("retrieving properties from undefined",function(){
				customer.order = null;
				expect(customer.order && customer.order.status || "unknown").toBe("unknown");
			});

			it("setting a property",function(){
				customer.first_name = "John";
				expect(customer.first_name).toBe("John");
			});

			it("setting a property not legal name",function(){
				customer["last-name"] = "Doe";
				expect(customer["last-name"]).toBe("Doe");
			});

		});


		describe("Reference", function(){

			it("objects are passed by reference",function(){
				var customer2 = customer;
				expect(customer2).toEqual(customer);

				function addNumber(myCustomer){
					myCustomer.number = 1;
				};

				addNumber(customer);
				expect(customer2.number).toEqual(1);
				
			});

		});

		describe("Reflection",function(){
			var carRental = {
				confirmation: "3453E",
				type: "compact",
				provider: {name:"Enterprise"},
				cost: 300
			};

			it("should be able to check types",function(){
				expect(typeof carRental.provider).toBe("object");
				expect(typeof carRental.type).toBe("string");
				expect(typeof carRental.cost).toBe("number");
			});

			it("functions from prototype are available",function(){
				expect(typeof carRental.toString).toBe("function");
				
			});

			it("Has own property doesn't look at prototype chain",function(){
				expect(carRental.hasOwnProperty("toString")).toBeFalsy();
			});

			it("Enumeration",function(){
				var counter = 0;
				for(var name in carRental){
					console.log(name + ":" + carRental[name]);
					counter++;
				}
				expect(counter).toEqual(4); 
			});





		});
		
	});

	
});



