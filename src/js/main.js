/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
	const contentSticky = new VanillaSticky({
		HTMLElement: document.querySelector('.main-content'),
		padding: {
			top: 70,
			bottom: 10,
		},
	});
	contentSticky.init();

	const mainSidebarSticky = new VanillaSticky({
		HTMLElement: document.querySelector('.main-sidebar'),
		padding: {
			top: 70,
			bottom: 10,
		},
	});
	mainSidebarSticky.init();

	const additionalSidebarSticky = new VanillaSticky({
		HTMLElement: document.querySelector('.additional-sidebar'),
		padding: {
			top: 70,
			bottom: 10,
		},
	});
	additionalSidebarSticky.init();

	// Temp
	// hljs.highlightAll();
});
