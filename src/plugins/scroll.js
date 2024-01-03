import Scrollbar from 'smooth-scrollbar';

export const core = {
	index() {
		this.SmoothScrollbar();
	},
	checkElement(type, element) {
		let found = false;
		let elements;
		switch (type) {
			case 'class':
				elements = document.getElementsByClassName(element);
				if (
					elements !== undefined &&
					elements !== null &&
					elements.length > 0
				) {
					found = true;
				}
				break;

			case 'id':
				elements = document.getElementById(element);

				if (elements !== undefined && elements !== null) {
					found = true;
				}
				break;
		}
		return found;
	},

	SmoothScrollbar() {
		const elementExistMain = this.checkElement('id', 'my-scrollbar');
		if (elementExistMain) {
			Scrollbar.init(document.querySelector('#my-scrollbar'));
		}
		const elementExistRight = this.checkElement('id', 'sidebar-scrollbar');
		if (elementExistRight) {
			Scrollbar.init(document.querySelector('#sidebar-scrollbar'));
		}
		const elementMainNotification = this.checkElement('id', 'mainNotification');
		if (elementMainNotification) {
			Scrollbar.init(document.querySelector('#mainNotification'));
		}
		const main = this.checkElement('id', 'main');
		if (main) {
			Scrollbar.init(document.querySelector('#main'));
		}
		// const scroll = this.checkElement('class', 'main');
		// console.log(scroll);
		// if (scroll) {
		// 	Scrollbar.init(document.querySelector('#main'));
		// }
	},
};
