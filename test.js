function addDays(date, n) {
	return new Date(new Date(date).getTime() + 86400000 * n).toJSON().slice(0, 10);
}

function addDaysFalse(date, n) {
	let d = new Date(date);
	d.setDate(d.getDate() + n);
	return d.toJSON().slice(0, 10);
}

test("addDays", () => {
	var d = "2020-03-29";

	expect(addDays(d, 1) !== addDaysFalse(d, 1)).toBe(true);
});
