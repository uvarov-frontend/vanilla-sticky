"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var VanillaSticky = /*#__PURE__*/function () {
  function VanillaSticky(options) {
    var _options$HTMLElement, _options$type, _options$stretch, _options$resize, _options$indents$top, _options$indents, _options$indents$bott, _options$indents2, _options$window$min, _options$window, _options$window$max, _options$window2;

    _classCallCheck(this, VanillaSticky);

    this.HTMLElement = (_options$HTMLElement = options.HTMLElement) !== null && _options$HTMLElement !== void 0 ? _options$HTMLElement : null;
    this.position = (_options$type = options.type) !== null && _options$type !== void 0 ? _options$type : 'auto';
    this.stretch = (_options$stretch = options.stretch) !== null && _options$stretch !== void 0 ? _options$stretch : true;
    this.resize = (_options$resize = options.resize) !== null && _options$resize !== void 0 ? _options$resize : true;
    this.indents = {
      top: (_options$indents$top = (_options$indents = options.indents) === null || _options$indents === void 0 ? void 0 : _options$indents.top) !== null && _options$indents$top !== void 0 ? _options$indents$top : 0,
      bottom: (_options$indents$bott = (_options$indents2 = options.indents) === null || _options$indents2 === void 0 ? void 0 : _options$indents2.bottom) !== null && _options$indents$bott !== void 0 ? _options$indents$bott : 0
    };
    this.window = {
      min: (_options$window$min = (_options$window = options.window) === null || _options$window === void 0 ? void 0 : _options$window.min) !== null && _options$window$min !== void 0 ? _options$window$min : null,
      max: (_options$window$max = (_options$window2 = options.window) === null || _options$window2 === void 0 ? void 0 : _options$window2.max) !== null && _options$window$max !== void 0 ? _options$window$max : null
    };
    this.location = undefined;
    this.freeplace = 0;
    this.scroll = 0;
  }

  _createClass(VanillaSticky, [{
    key: "calcPosition",
    value: function calcPosition() {
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
          console.error("Invalid position: \"".concat(this.position, "\". Available positions: \"auto\", \"top\", \"bottom\"."));
      }
    }
  }, {
    key: "stickBlock",
    value: function stickBlock() {
      this.HTMLElement.style.position = 'sticky';
      this.HTMLElement.style.top = "".concat(this.scroll, "px");

      if (this.stretch && this.location === 'top') {
        this.HTMLElement.style.minHeight = "".concat(this.freeplace, "px");
      }
    }
  }, {
    key: "windowResize",
    value: function windowResize() {
      var _this = this;

      if (!this.resize) return;
      var currentWindowHeight = window.innerHeight;
      window.addEventListener('resize', function (e) {
        if (e.target.innerHeight > currentWindowHeight || e.target.innerHeight < currentWindowHeight) {
          currentWindowHeight = e.target.innerHeight;
          if (_this.window.min && window.innerWidth < _this.window.min) return;
          if (_this.window.max && window.innerWidth > _this.window.max) return;

          _this.calcPosition();

          _this.stickBlock();
        }
      });
    }
  }, {
    key: "update",
    value: function update() {
      this.calcPosition();
      this.stickBlock();
    }
  }, {
    key: "init",
    value: function init() {
      if (!this.HTMLElement) return;
      this.windowResize();
      if (this.window.min && window.innerWidth < this.window.min) return;
      if (this.window.max && window.innerWidth > this.window.max) return;
      this.calcPosition();
      this.stickBlock();
    }
  }]);

  return VanillaSticky;
}();

exports.default = VanillaSticky;