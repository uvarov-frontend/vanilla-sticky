export default class VanillaSticky {
	constructor(options) {
		this.HTMLElement = options.HTMLElement ?? null;
		this.padding = {
			top: options.padding?.top ?? 0,
			bottom: options.padding?.bottom ?? 0,
		};
		this.type = options.type ?? 'bottom';
		this.resize = options.resize ?? true;
		this.position = 0;
	}

	calcPosition() {
		const freePlaceWindow = window.innerHeight - this.padding.top - this.padding.bottom;
		if (this.HTMLElement.clientHeight < freePlaceWindow) this.type = 'top';

		switch (this.type) {
			case 'top':
				this.position = this.padding.top;
				break;
			case 'bottom':
				this.position = window.innerHeight - this.HTMLElement.clientHeight - this.padding.bottom;
				break;
			// no default
		}
	}

	stickBlock() {
		this.HTMLElement.style.position = 'sticky';
		this.HTMLElement.style.top = `${this.position}px`;
	}

	windowResize() {
		if (!this.resize) return;

		let currentWindowHeight = window.innerHeight;
		window.addEventListener('resize', (e) => {
			if (e.target.innerHeight > currentWindowHeight || e.target.innerHeight < currentWindowHeight) {
				this.calcPosition();
				this.stickBlock();
				currentWindowHeight = e.target.innerHeight;
			}
		});
	}

	update() {
		this.calcPosition();
		this.stickBlock();
	}

	init() {
		if (!this.HTMLElement) return;
		this.calcPosition();
		this.stickBlock();
		this.windowResize();
	}
}
