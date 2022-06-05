import navLayoutTemplate from './nav-layout-template';

const navLayout = {
	open: false,

	createNavLayout() {
		const layout = document.createElement('div');
		layout.className = 'layout-navigation';
		layout.innerHTML = navLayoutTemplate;

		document.body.append(layout);
	},

	openNavLayout() {
		document.body.classList.add('show-nav-layout');
		this.open = true;
	},

	closeNavLayout() {
		document.body.classList.remove('show-nav-layout');
		this.open = false;
	},

	hasClick() {
		document.addEventListener('click', (e) => {
			if (e.target.closest('.layout-navigation button') && !this.open) {
				this.openNavLayout();
			} else if (e.target.closest('.layout-navigation button') && this.open) {
				this.closeNavLayout();
			} else if (!e.target.closest('.layout-navigation') && this.open) {
				this.closeNavLayout();
			}
		});
	},

	init() {
		this.createNavLayout();
		this.hasClick();
	},
};

document.addEventListener('DOMContentLoaded', () => {
	navLayout.init();
});
