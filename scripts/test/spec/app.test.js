describe('app', () => {

	beforeEach(() => {
		app = new App();
	});

	it('app not undefined', () => {
		expect(app).not.toBe(undefined);
	});

	it('constructor(): for app object instatiation', () => {
		expect(app.template).toBe('');
	});

	it('getResponse(): fake json response to return an array with two test objects', () => {
		expect(response.responseJSON).toEqual([{}, {}]);
	});

	it('createModules(): instantiate new Outcome object for response array items', () => {
		expect(app.template).toBe('');
		response.responseJSON.forEach((item) => {
			var outcome = new Outcome();
			expect(outcome).toEqual(new Outcome());
		});
	});
});