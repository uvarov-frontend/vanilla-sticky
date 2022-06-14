export default class VanillaSticky {
	constructor(options) {
		this.HTMLElement = options.HTMLElement ?? null;
		this.position = options.position ?? 'auto';
		this.stretch = options.stretch ?? true;
		this.resize = options.resize ?? true;
		this.indents = {
			top: options.indents?.top ?? 0,
			bottom: options.indents?.bottom ?? 0,
		};
		this.window = {
			min: options.window?.min ?? null,
			max: options.window?.max ?? null,
		};
		this.location = undefined;
		this.freeplace = 0;
		this.scroll = 0;
	}

	calcPosition() {
		this.freeplace = window.innerHeight - this.indents.top - this.indents.bottom;

		if (this.position === 'auto') {
			if (this.HTMLElement.clientHeight < this.freeplace) {
				this.location = 'top';
			} else {
				this.location = 'bottom';
			}
		} else {
			this.location = this.position;
		}

		switch (this.location) {
			case 'top':
				this.scroll = this.indents.top;
				break;
			case 'bottom':
				this.scroll = window.innerHeight - this.HTMLElement.clientHeight - this.indents.bottom;
				break;
			default:
				// eslint-disable-next-line no-console
				console.error(`Invalid position: "${this.position}". Available positions: "auto", "top", "bottom".`);
		}
	}

	stickBlock() {
		this.HTMLElement.style.position = 'sticky';
		this.HTMLElement.style.top = `${this.scroll}px`;

		if (this.stretch && this.location === 'top') {
			this.HTMLElement.style.minHeight = `${this.freeplace}px`;
		}
	}

	windowResize() {
		if (!this.resize) return;

		let currentWindowHeight = window.innerHeight;
		window.addEventListener('resize', (e) => {
			if (this.window.min && window.innerWidth < this.window.min) return;
			if (this.window.max && window.innerWidth > this.window.max) return;

			if (e.target.innerHeight > currentWindowHeight || e.target.innerHeight < currentWindowHeight) {
				currentWindowHeight = e.target.innerHeight;

				this.calcPosition();
				this.stickBlock();
			}
		});
	}

	update() {
		this.calcPosition();
		this.stickBlock();
	}

	init() {
		if (!this.HTMLElement) return;

		this.windowResize();

		if (this.window.min && window.innerWidth < this.window.min) return;
		if (this.window.max && window.innerWidth > this.window.max) return;

		this.calcPosition();
		this.stickBlock();
	}
}

window.VanillaSticky = VanillaSticky;
