describe('Primitives', function() {
	
	it('string', function() {
		var testString = "test";
		expect(testString).toBe("test");
		expect(typeof testString).toBe("string");
	});

	it('number', function() {
		var testNumber = 5;
		expect(testNumber).not.toBe("5");
		expect(testNumber).toBe(5);
		expect(typeof testNumber).toBe("number");
	});

	it('boolean', function() {
		var testBoolean = true;
		expect(testBoolean).toBe(true);
		expect(testBoolean).toBeTruthy();
	});

});	
