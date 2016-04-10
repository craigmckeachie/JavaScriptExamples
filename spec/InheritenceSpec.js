describe('Inheritence', function() {
	it('Pseudoclassical', function() {
		var Mammal = function(name){
			this.name = name;
			this.legs = 4;
		};

		//Mammal.prototype = {};

		Mammal.prototype.blood = "warm";
		Mammal.prototype.get_name = function(){
			return this.name;	
		};

		Mammal.prototype.says = function(){
			return this.saying || '';	
		};

		// var mammal  = {};
		// mammal.__proto__ = Mammal.prototype;
		// Mammal.call(mammal, "hdsfghj");

		var mammel = new Mammal("Joe the Mammal");
		expect(mammel.get_name()).toBe("Joe the Mammal");

		var Cat = function(name){
			//this.name = name;
			Mammal.call(this, name);
			this.saying = "meow";
		};

		Cat.prototype = new Mammal();
		Cat.prototype.purr = function(){
			return "rrrrrr";
		};
		Cat.prototype.get_name = function(){
			return this.says() + " " + this.name + " " + this.purr();
		};

		var cat = new Cat("PKitty");
		expect(cat.says()).toBe("meow");
		expect(cat.purr()).toBe("rrrrrr");
		expect(cat.get_name()).toBe("meow PKitty rrrrrr");


	});

	it('Pseudoclassical with Object Create', function() {
		// Shape - superclass
		function Shape() {
		  this.x = 0;
		  this.y = 0;
		}

		// superclass method
		Shape.prototype.move = function(x, y) {
		  this.x += x;
		  this.y += y;
		  return 'Shape moved.';
		};

		// Rectangle - subclass
		function Rectangle() {
		  Shape.call(this); // call super constructor.
		}

		// subclass extends superclass
		Rectangle.prototype = Object.create(Shape.prototype);
		Rectangle.prototype.constructor = Rectangle;

		var rect = new Rectangle();

		console.log('Is rect an instance of Rectangle? ' + (rect instanceof Rectangle)); // true
		console.log('Is rect an instance of Shape? ' + (rect instanceof Shape)); // true
		expect(rect.move(1, 1)).toEqual("Shape moved."); // Outputs, 'Shape moved.'
	});

	it('Prototypal', function() {
		var mammal = {
			name: "Joe the Animal",
			get_name: function(){
				return this.name;
			},
			says: function(){
				return this.saying || '';
			}
		};

		var cat = Object.create(mammal);
		cat.name = "PKitty";
		cat.saying = "meow"
		cat.purr = function(){
			return "rrrrrr";
		};		cat.get_name = function(){
			return this.says() + " " + this.name + " " + this.purr();
		};

		expect(cat.says()).toBe("meow");
		expect(cat.purr()).toBe("rrrrrr");
		expect(cat.get_name()).toBe("meow PKitty rrrrrr");


	});

	it('Functional', function() {
		var mammal = function(spec){

		};

		
	});
});