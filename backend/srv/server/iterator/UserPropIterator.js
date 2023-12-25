const aUpdatableProps = [
	'firstname',
	'lastname',
	'email',
	// 'password',
	'date_started',
	'date_end',
	'position',
	'salary',
	'pc',
	'car',
	'comments',
];

class IterateUserProps {
	constructor() {
		this.i = 0;
	}
	hasNext() {
		if (this.i < aUpdatableProps.length - 1) {
			this.i++;
			return aUpdatableProps[this.i - 1];
		} else {
			return undefined;
		}
	}
}

module.exports = IterateUserProps;
