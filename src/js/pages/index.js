import VanillaSticky from '@/js/modules/vanilla-sticky.js';

document.addEventListener('DOMContentLoaded', () => {
	const contentSticky = new VanillaSticky({
		HTMLElement: document.querySelector('.main-content'),
		indents: {
			top: 70,
			bottom: 10,
		},
	});
	contentSticky.init();

	const mainSidebarSticky = new VanillaSticky({
		HTMLElement: document.querySelector('.main-sidebar'),
		indents: {
			top: 70,
			bottom: 10,
		},
	});
	mainSidebarSticky.init();

	const additionalSidebarSticky = new VanillaSticky({
		HTMLElement: document.querySelector('.additional-sidebar'),
		indents: {
			top: 70,
			bottom: 10,
		},
		window: {
			min: 1200,
			max: null,
		},
	});
	additionalSidebarSticky.init();
});
