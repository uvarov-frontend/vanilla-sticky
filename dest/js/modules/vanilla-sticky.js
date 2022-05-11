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
    var _options$HTMLElement, _options$padding$top, _options$padding, _options$padding$bott, _options$padding2, _options$type, _options$resize;

    _classCallCheck(this, VanillaSticky);

    this.HTMLElement = (_options$HTMLElement = options.HTMLElement) !== null && _options$HTMLElement !== void 0 ? _options$HTMLElement : null;
    this.padding = {
      top: (_options$padding$top = (_options$padding = options.padding) === null || _options$padding === void 0 ? void 0 : _options$padding.top) !== null && _options$padding$top !== void 0 ? _options$padding$top : 0,
      bottom: (_options$padding$bott = (_options$padding2 = options.padding) === null || _options$padding2 === void 0 ? void 0 : _options$padding2.bottom) !== null && _options$padding$bott !== void 0 ? _options$padding$bott : 0
    };
    this.type = (_options$type = options.type) !== null && _options$type !== void 0 ? _options$type : 'bottom';
    this.resize = (_options$resize = options.resize) !== null && _options$resize !== void 0 ? _options$resize : true;
    this.position = 0;
  }

  _createClass(VanillaSticky, [{
    key: "calcPosition",
    value: function calcPosition() {
      var freePlaceWindow = window.innerHeight - this.padding.top - this.padding.bottom;
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
  }, {
    key: "stickBlock",
    value: function stickBlock() {
      this.HTMLElement.style.position = 'sticky';
      this.HTMLElement.style.top = "".concat(this.position, "px");
    }
  }, {
    key: "windowResize",
    value: function windowResize() {
      var _this = this;

      if (!this.resize) return;
      var currentWindowHeight = window.innerHeight;
      window.addEventListener('resize', function (e) {
        if (e.target.innerHeight > currentWindowHeight || e.target.innerHeight < currentWindowHeight) {
          _this.calcPosition();

          _this.stickBlock();

          currentWindowHeight = e.target.innerHeight;
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
      this.calcPosition();
      this.stickBlock();
      this.windowResize();
    }
  }]);

  return VanillaSticky;
}();

exports.default = VanillaSticky;