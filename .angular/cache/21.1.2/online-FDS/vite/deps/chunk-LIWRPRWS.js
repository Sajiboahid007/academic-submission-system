import {
  BaseDirective2,
  CoreModule,
  LAYOUT_CONFIG,
  LAYOUT_VALUES,
  MediaMarshaller,
  StyleBuilder,
  StyleUtils,
  buildLayoutCSS,
  extendObject,
  isFlowHorizontal,
  multiply,
  validateBasis
} from "./chunk-M34J5UC5.js";
import {
  BidiModule,
  Directionality
} from "./chunk-TUHR64KO.js";
import {
  Directive,
  ElementRef,
  Inject,
  Injectable,
  Input,
  NgModule,
  NgZone,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵgetInheritedFactory,
  ɵɵinject
} from "./chunk-O7OAUIW2.js";
import {
  Subject,
  takeUntil
} from "./chunk-RSS3ODKE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// node_modules/ngx-flexible-layout/fesm2022/ngx-flexible-layout-flex.mjs
var FlexAlignStyleBuilder = class _FlexAlignStyleBuilder extends StyleBuilder {
  buildStyles(input) {
    input = input || "stretch";
    const styles = {};
    switch (input) {
      case "start":
        styles["align-self"] = "flex-start";
        break;
      case "end":
        styles["align-self"] = "flex-end";
        break;
      default:
        styles["align-self"] = input;
        break;
    }
    return styles;
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵFlexAlignStyleBuilder_BaseFactory;
    return function FlexAlignStyleBuilder_Factory(__ngFactoryType__) {
      return (ɵFlexAlignStyleBuilder_BaseFactory || (ɵFlexAlignStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(_FlexAlignStyleBuilder)))(__ngFactoryType__ || _FlexAlignStyleBuilder);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _FlexAlignStyleBuilder,
    factory: _FlexAlignStyleBuilder.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexAlignStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var inputs$6 = ["fxFlexAlign", "fxFlexAlign.xs", "fxFlexAlign.sm", "fxFlexAlign.md", "fxFlexAlign.lg", "fxFlexAlign.xl", "fxFlexAlign.lt-sm", "fxFlexAlign.lt-md", "fxFlexAlign.lt-lg", "fxFlexAlign.lt-xl", "fxFlexAlign.gt-xs", "fxFlexAlign.gt-sm", "fxFlexAlign.gt-md", "fxFlexAlign.gt-lg"];
var selector$6 = `
  [fxFlexAlign], [fxFlexAlign.xs], [fxFlexAlign.sm], [fxFlexAlign.md],
  [fxFlexAlign.lg], [fxFlexAlign.xl], [fxFlexAlign.lt-sm], [fxFlexAlign.lt-md],
  [fxFlexAlign.lt-lg], [fxFlexAlign.lt-xl], [fxFlexAlign.gt-xs], [fxFlexAlign.gt-sm],
  [fxFlexAlign.gt-md], [fxFlexAlign.gt-lg]
`;
var FlexAlignDirective = class _FlexAlignDirective extends BaseDirective2 {
  DIRECTIVE_KEY = "flex-align";
  constructor(elRef, styleUtils, styleBuilder, marshal) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.init();
  }
  styleCache = flexAlignCache;
  static ɵfac = function FlexAlignDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FlexAlignDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(FlexAlignStyleBuilder), ɵɵdirectiveInject(MediaMarshaller));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _FlexAlignDirective,
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexAlignDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: StyleUtils
  }, {
    type: FlexAlignStyleBuilder
  }, {
    type: MediaMarshaller
  }], null);
})();
var flexAlignCache = /* @__PURE__ */ new Map();
var DefaultFlexAlignDirective = class _DefaultFlexAlignDirective extends FlexAlignDirective {
  inputs = inputs$6;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDefaultFlexAlignDirective_BaseFactory;
    return function DefaultFlexAlignDirective_Factory(__ngFactoryType__) {
      return (ɵDefaultFlexAlignDirective_BaseFactory || (ɵDefaultFlexAlignDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultFlexAlignDirective)))(__ngFactoryType__ || _DefaultFlexAlignDirective);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _DefaultFlexAlignDirective,
    selectors: [["", "fxFlexAlign", ""], ["", "fxFlexAlign.xs", ""], ["", "fxFlexAlign.sm", ""], ["", "fxFlexAlign.md", ""], ["", "fxFlexAlign.lg", ""], ["", "fxFlexAlign.xl", ""], ["", "fxFlexAlign.lt-sm", ""], ["", "fxFlexAlign.lt-md", ""], ["", "fxFlexAlign.lt-lg", ""], ["", "fxFlexAlign.lt-xl", ""], ["", "fxFlexAlign.gt-xs", ""], ["", "fxFlexAlign.gt-sm", ""], ["", "fxFlexAlign.gt-md", ""], ["", "fxFlexAlign.gt-lg", ""]],
    inputs: {
      fxFlexAlign: "fxFlexAlign",
      "fxFlexAlign.xs": "fxFlexAlign.xs",
      "fxFlexAlign.sm": "fxFlexAlign.sm",
      "fxFlexAlign.md": "fxFlexAlign.md",
      "fxFlexAlign.lg": "fxFlexAlign.lg",
      "fxFlexAlign.xl": "fxFlexAlign.xl",
      "fxFlexAlign.lt-sm": "fxFlexAlign.lt-sm",
      "fxFlexAlign.lt-md": "fxFlexAlign.lt-md",
      "fxFlexAlign.lt-lg": "fxFlexAlign.lt-lg",
      "fxFlexAlign.lt-xl": "fxFlexAlign.lt-xl",
      "fxFlexAlign.gt-xs": "fxFlexAlign.gt-xs",
      "fxFlexAlign.gt-sm": "fxFlexAlign.gt-sm",
      "fxFlexAlign.gt-md": "fxFlexAlign.gt-md",
      "fxFlexAlign.gt-lg": "fxFlexAlign.gt-lg"
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultFlexAlignDirective, [{
    type: Directive,
    args: [{
      selector: selector$6,
      inputs: inputs$6
    }]
  }], null, null);
})();
var FLEX_FILL_CSS = {
  "margin": 0,
  "width": "100%",
  "height": "100%",
  "min-width": "100%",
  "min-height": "100%"
};
var FlexFillStyleBuilder = class _FlexFillStyleBuilder extends StyleBuilder {
  buildStyles(_input) {
    return FLEX_FILL_CSS;
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵFlexFillStyleBuilder_BaseFactory;
    return function FlexFillStyleBuilder_Factory(__ngFactoryType__) {
      return (ɵFlexFillStyleBuilder_BaseFactory || (ɵFlexFillStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(_FlexFillStyleBuilder)))(__ngFactoryType__ || _FlexFillStyleBuilder);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _FlexFillStyleBuilder,
    factory: _FlexFillStyleBuilder.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexFillStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var FlexFillDirective = class _FlexFillDirective extends BaseDirective2 {
  constructor(elRef, styleUtils, styleBuilder, marshal) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.addStyles("");
  }
  styleCache = flexFillCache;
  static ɵfac = function FlexFillDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FlexFillDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(FlexFillStyleBuilder), ɵɵdirectiveInject(MediaMarshaller));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _FlexFillDirective,
    selectors: [["", "fxFill", ""], ["", "fxFlexFill", ""]],
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexFillDirective, [{
    type: Directive,
    args: [{
      selector: `[fxFill], [fxFlexFill]`
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: StyleUtils
  }, {
    type: FlexFillStyleBuilder
  }, {
    type: MediaMarshaller
  }], null);
})();
var flexFillCache = /* @__PURE__ */ new Map();
var FlexOffsetStyleBuilder = class _FlexOffsetStyleBuilder extends StyleBuilder {
  _config;
  constructor(_config) {
    super();
    this._config = _config;
  }
  buildStyles(offset, parent) {
    offset ||= "0";
    offset = multiply(offset, this._config.multiplier);
    const isPercent = String(offset).indexOf("%") > -1;
    const isPx = String(offset).indexOf("px") > -1;
    if (!isPx && !isPercent && !isNaN(+offset)) {
      offset = `${offset}%`;
    }
    const horizontalLayoutKey = parent.isRtl ? "margin-right" : "margin-left";
    const styles = isFlowHorizontal(parent.layout) ? {
      [horizontalLayoutKey]: offset
    } : {
      "margin-top": offset
    };
    return styles;
  }
  static ɵfac = function FlexOffsetStyleBuilder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FlexOffsetStyleBuilder)(ɵɵinject(LAYOUT_CONFIG));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _FlexOffsetStyleBuilder,
    factory: _FlexOffsetStyleBuilder.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexOffsetStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [LAYOUT_CONFIG]
    }]
  }], null);
})();
var inputs$5 = ["fxFlexOffset", "fxFlexOffset.xs", "fxFlexOffset.sm", "fxFlexOffset.md", "fxFlexOffset.lg", "fxFlexOffset.xl", "fxFlexOffset.lt-sm", "fxFlexOffset.lt-md", "fxFlexOffset.lt-lg", "fxFlexOffset.lt-xl", "fxFlexOffset.gt-xs", "fxFlexOffset.gt-sm", "fxFlexOffset.gt-md", "fxFlexOffset.gt-lg"];
var selector$5 = `
  [fxFlexOffset], [fxFlexOffset.xs], [fxFlexOffset.sm], [fxFlexOffset.md],
  [fxFlexOffset.lg], [fxFlexOffset.xl], [fxFlexOffset.lt-sm], [fxFlexOffset.lt-md],
  [fxFlexOffset.lt-lg], [fxFlexOffset.lt-xl], [fxFlexOffset.gt-xs], [fxFlexOffset.gt-sm],
  [fxFlexOffset.gt-md], [fxFlexOffset.gt-lg]
`;
var FlexOffsetDirective = class _FlexOffsetDirective extends BaseDirective2 {
  directionality;
  DIRECTIVE_KEY = "flex-offset";
  constructor(elRef, directionality, styleBuilder, marshal, styler) {
    super(elRef, styleBuilder, styler, marshal);
    this.directionality = directionality;
    this.init([this.directionality.change]);
    if (this.parentElement) {
      this.marshal.trackValue(this.parentElement, "layout-gap").pipe(takeUntil(this.destroySubject)).subscribe(this.triggerUpdate.bind(this));
    }
  }
  // *********************************************
  // Protected methods
  // *********************************************
  /**
   * Using the current fxFlexOffset value, update the inline CSS
   * NOTE: this will assign `margin-left` if the parent flex-direction == 'row',
   *       otherwise `margin-top` is used for the offset.
   */
  updateWithValue(value = "") {
    const layout = this.getFlexFlowDirection(this.parentElement, true);
    const isRtl = this.directionality.value === "rtl";
    if (layout === "row" && isRtl) {
      this.styleCache = flexOffsetCacheRowRtl;
    } else if (layout === "row" && !isRtl) {
      this.styleCache = flexOffsetCacheRowLtr;
    } else if (layout === "column" && isRtl) {
      this.styleCache = flexOffsetCacheColumnRtl;
    } else if (layout === "column" && !isRtl) {
      this.styleCache = flexOffsetCacheColumnLtr;
    }
    this.addStyles(value + "", {
      layout,
      isRtl
    });
  }
  static ɵfac = function FlexOffsetDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FlexOffsetDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Directionality), ɵɵdirectiveInject(FlexOffsetStyleBuilder), ɵɵdirectiveInject(MediaMarshaller), ɵɵdirectiveInject(StyleUtils));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _FlexOffsetDirective,
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexOffsetDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: Directionality
  }, {
    type: FlexOffsetStyleBuilder
  }, {
    type: MediaMarshaller
  }, {
    type: StyleUtils
  }], null);
})();
var DefaultFlexOffsetDirective = class _DefaultFlexOffsetDirective extends FlexOffsetDirective {
  inputs = inputs$5;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDefaultFlexOffsetDirective_BaseFactory;
    return function DefaultFlexOffsetDirective_Factory(__ngFactoryType__) {
      return (ɵDefaultFlexOffsetDirective_BaseFactory || (ɵDefaultFlexOffsetDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultFlexOffsetDirective)))(__ngFactoryType__ || _DefaultFlexOffsetDirective);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _DefaultFlexOffsetDirective,
    selectors: [["", "fxFlexOffset", ""], ["", "fxFlexOffset.xs", ""], ["", "fxFlexOffset.sm", ""], ["", "fxFlexOffset.md", ""], ["", "fxFlexOffset.lg", ""], ["", "fxFlexOffset.xl", ""], ["", "fxFlexOffset.lt-sm", ""], ["", "fxFlexOffset.lt-md", ""], ["", "fxFlexOffset.lt-lg", ""], ["", "fxFlexOffset.lt-xl", ""], ["", "fxFlexOffset.gt-xs", ""], ["", "fxFlexOffset.gt-sm", ""], ["", "fxFlexOffset.gt-md", ""], ["", "fxFlexOffset.gt-lg", ""]],
    inputs: {
      fxFlexOffset: "fxFlexOffset",
      "fxFlexOffset.xs": "fxFlexOffset.xs",
      "fxFlexOffset.sm": "fxFlexOffset.sm",
      "fxFlexOffset.md": "fxFlexOffset.md",
      "fxFlexOffset.lg": "fxFlexOffset.lg",
      "fxFlexOffset.xl": "fxFlexOffset.xl",
      "fxFlexOffset.lt-sm": "fxFlexOffset.lt-sm",
      "fxFlexOffset.lt-md": "fxFlexOffset.lt-md",
      "fxFlexOffset.lt-lg": "fxFlexOffset.lt-lg",
      "fxFlexOffset.lt-xl": "fxFlexOffset.lt-xl",
      "fxFlexOffset.gt-xs": "fxFlexOffset.gt-xs",
      "fxFlexOffset.gt-sm": "fxFlexOffset.gt-sm",
      "fxFlexOffset.gt-md": "fxFlexOffset.gt-md",
      "fxFlexOffset.gt-lg": "fxFlexOffset.gt-lg"
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultFlexOffsetDirective, [{
    type: Directive,
    args: [{
      selector: selector$5,
      inputs: inputs$5
    }]
  }], null, null);
})();
var flexOffsetCacheRowRtl = /* @__PURE__ */ new Map();
var flexOffsetCacheColumnRtl = /* @__PURE__ */ new Map();
var flexOffsetCacheRowLtr = /* @__PURE__ */ new Map();
var flexOffsetCacheColumnLtr = /* @__PURE__ */ new Map();
var FlexOrderStyleBuilder = class _FlexOrderStyleBuilder extends StyleBuilder {
  buildStyles(value) {
    return {
      order: value && parseInt(value, 10) || ""
    };
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵFlexOrderStyleBuilder_BaseFactory;
    return function FlexOrderStyleBuilder_Factory(__ngFactoryType__) {
      return (ɵFlexOrderStyleBuilder_BaseFactory || (ɵFlexOrderStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(_FlexOrderStyleBuilder)))(__ngFactoryType__ || _FlexOrderStyleBuilder);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _FlexOrderStyleBuilder,
    factory: _FlexOrderStyleBuilder.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexOrderStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var inputs$4 = ["fxFlexOrder", "fxFlexOrder.xs", "fxFlexOrder.sm", "fxFlexOrder.md", "fxFlexOrder.lg", "fxFlexOrder.xl", "fxFlexOrder.lt-sm", "fxFlexOrder.lt-md", "fxFlexOrder.lt-lg", "fxFlexOrder.lt-xl", "fxFlexOrder.gt-xs", "fxFlexOrder.gt-sm", "fxFlexOrder.gt-md", "fxFlexOrder.gt-lg"];
var selector$4 = `
  [fxFlexOrder], [fxFlexOrder.xs], [fxFlexOrder.sm], [fxFlexOrder.md],
  [fxFlexOrder.lg], [fxFlexOrder.xl], [fxFlexOrder.lt-sm], [fxFlexOrder.lt-md],
  [fxFlexOrder.lt-lg], [fxFlexOrder.lt-xl], [fxFlexOrder.gt-xs], [fxFlexOrder.gt-sm],
  [fxFlexOrder.gt-md], [fxFlexOrder.gt-lg]
`;
var FlexOrderDirective = class _FlexOrderDirective extends BaseDirective2 {
  DIRECTIVE_KEY = "flex-order";
  constructor(elRef, styleUtils, styleBuilder, marshal) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.init();
  }
  styleCache = flexOrderCache;
  static ɵfac = function FlexOrderDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FlexOrderDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(FlexOrderStyleBuilder), ɵɵdirectiveInject(MediaMarshaller));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _FlexOrderDirective,
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexOrderDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: StyleUtils
  }, {
    type: FlexOrderStyleBuilder
  }, {
    type: MediaMarshaller
  }], null);
})();
var flexOrderCache = /* @__PURE__ */ new Map();
var DefaultFlexOrderDirective = class _DefaultFlexOrderDirective extends FlexOrderDirective {
  inputs = inputs$4;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDefaultFlexOrderDirective_BaseFactory;
    return function DefaultFlexOrderDirective_Factory(__ngFactoryType__) {
      return (ɵDefaultFlexOrderDirective_BaseFactory || (ɵDefaultFlexOrderDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultFlexOrderDirective)))(__ngFactoryType__ || _DefaultFlexOrderDirective);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _DefaultFlexOrderDirective,
    selectors: [["", "fxFlexOrder", ""], ["", "fxFlexOrder.xs", ""], ["", "fxFlexOrder.sm", ""], ["", "fxFlexOrder.md", ""], ["", "fxFlexOrder.lg", ""], ["", "fxFlexOrder.xl", ""], ["", "fxFlexOrder.lt-sm", ""], ["", "fxFlexOrder.lt-md", ""], ["", "fxFlexOrder.lt-lg", ""], ["", "fxFlexOrder.lt-xl", ""], ["", "fxFlexOrder.gt-xs", ""], ["", "fxFlexOrder.gt-sm", ""], ["", "fxFlexOrder.gt-md", ""], ["", "fxFlexOrder.gt-lg", ""]],
    inputs: {
      fxFlexOrder: "fxFlexOrder",
      "fxFlexOrder.xs": "fxFlexOrder.xs",
      "fxFlexOrder.sm": "fxFlexOrder.sm",
      "fxFlexOrder.md": "fxFlexOrder.md",
      "fxFlexOrder.lg": "fxFlexOrder.lg",
      "fxFlexOrder.xl": "fxFlexOrder.xl",
      "fxFlexOrder.lt-sm": "fxFlexOrder.lt-sm",
      "fxFlexOrder.lt-md": "fxFlexOrder.lt-md",
      "fxFlexOrder.lt-lg": "fxFlexOrder.lt-lg",
      "fxFlexOrder.lt-xl": "fxFlexOrder.lt-xl",
      "fxFlexOrder.gt-xs": "fxFlexOrder.gt-xs",
      "fxFlexOrder.gt-sm": "fxFlexOrder.gt-sm",
      "fxFlexOrder.gt-md": "fxFlexOrder.gt-md",
      "fxFlexOrder.gt-lg": "fxFlexOrder.gt-lg"
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultFlexOrderDirective, [{
    type: Directive,
    args: [{
      selector: selector$4,
      inputs: inputs$4
    }]
  }], null, null);
})();
var FlexStyleBuilder = class _FlexStyleBuilder extends StyleBuilder {
  layoutConfig;
  constructor(layoutConfig) {
    super();
    this.layoutConfig = layoutConfig;
  }
  buildStyles(input, parent) {
    let [grow, shrink, ...basisParts] = input.split(" ");
    let basis = basisParts.join(" ");
    const direction = parent.direction.indexOf("column") > -1 ? "column" : "row";
    const max = isFlowHorizontal(direction) ? "max-width" : "max-height";
    const min = isFlowHorizontal(direction) ? "min-width" : "min-height";
    const hasCalc = String(basis).indexOf("calc") > -1;
    const usingCalc = hasCalc || basis === "auto";
    const isPercent = String(basis).indexOf("%") > -1 && !hasCalc;
    const hasUnits = String(basis).indexOf("px") > -1 || String(basis).indexOf("rem") > -1 || String(basis).indexOf("em") > -1 || String(basis).indexOf("vw") > -1 || String(basis).indexOf("vh") > -1;
    let isValue = hasCalc || hasUnits;
    grow = grow == "0" ? 0 : grow;
    shrink = shrink == "0" ? 0 : shrink;
    const isFixed = !grow && !shrink;
    let css = {};
    const clearStyles = {
      "max-width": null,
      "max-height": null,
      "min-width": null,
      "min-height": null
    };
    switch (basis || "") {
      case "":
        const useColumnBasisZero = this.layoutConfig.useColumnBasisZero !== false;
        basis = direction === "row" ? "0%" : useColumnBasisZero ? "0.000000001px" : "auto";
        break;
      case "initial":
      // default
      case "nogrow":
        grow = 0;
        basis = "auto";
        break;
      case "grow":
        basis = "100%";
        break;
      case "noshrink":
        shrink = 0;
        basis = "auto";
        break;
      case "auto":
        break;
      case "none":
        grow = 0;
        shrink = 0;
        basis = "auto";
        break;
      default:
        if (!isValue && !isPercent && !isNaN(basis)) {
          basis = basis + "%";
        }
        if (basis === "0%") {
          isValue = true;
        }
        if (basis === "0px") {
          basis = "0%";
        }
        if (hasCalc) {
          css = extendObject(clearStyles, {
            "flex-grow": grow,
            "flex-shrink": shrink,
            "flex-basis": isValue ? basis : "100%"
          });
        } else {
          css = extendObject(clearStyles, {
            "flex": `${grow} ${shrink} ${isValue ? basis : "100%"}`
          });
        }
        break;
    }
    if (!(css["flex"] || css["flex-grow"])) {
      if (hasCalc) {
        css = extendObject(clearStyles, {
          "flex-grow": grow,
          "flex-shrink": shrink,
          "flex-basis": basis
        });
      } else {
        css = extendObject(clearStyles, {
          "flex": `${grow} ${shrink} ${basis}`
        });
      }
    }
    if (basis !== "0%" && basis !== "0px" && basis !== "0.000000001px" && basis !== "auto") {
      css[min] = isFixed || isValue && grow ? basis : null;
      css[max] = isFixed || !usingCalc && shrink ? basis : null;
    }
    if (!css[min] && !css[max]) {
      if (hasCalc) {
        css = extendObject(clearStyles, {
          "flex-grow": grow,
          "flex-shrink": shrink,
          "flex-basis": basis
        });
      } else {
        css = extendObject(clearStyles, {
          "flex": `${grow} ${shrink} ${basis}`
        });
      }
    } else {
      if (parent.hasWrap) {
        css[hasCalc ? "flex-basis" : "flex"] = css[max] ? hasCalc ? css[max] : `${grow} ${shrink} ${css[max]}` : hasCalc ? css[min] : `${grow} ${shrink} ${css[min]}`;
      }
    }
    return extendObject(css, {
      "box-sizing": "border-box"
    });
  }
  static ɵfac = function FlexStyleBuilder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FlexStyleBuilder)(ɵɵinject(LAYOUT_CONFIG));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _FlexStyleBuilder,
    factory: _FlexStyleBuilder.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [LAYOUT_CONFIG]
    }]
  }], null);
})();
var inputs$3 = ["fxFlex", "fxFlex.xs", "fxFlex.sm", "fxFlex.md", "fxFlex.lg", "fxFlex.xl", "fxFlex.lt-sm", "fxFlex.lt-md", "fxFlex.lt-lg", "fxFlex.lt-xl", "fxFlex.gt-xs", "fxFlex.gt-sm", "fxFlex.gt-md", "fxFlex.gt-lg"];
var selector$3 = `
  [fxFlex], [fxFlex.xs], [fxFlex.sm], [fxFlex.md],
  [fxFlex.lg], [fxFlex.xl], [fxFlex.lt-sm], [fxFlex.lt-md],
  [fxFlex.lt-lg], [fxFlex.lt-xl], [fxFlex.gt-xs], [fxFlex.gt-sm],
  [fxFlex.gt-md], [fxFlex.gt-lg]
`;
var FlexDirective = class _FlexDirective extends BaseDirective2 {
  layoutConfig;
  marshal;
  DIRECTIVE_KEY = "flex";
  direction = void 0;
  wrap = void 0;
  get shrink() {
    return this.flexShrink;
  }
  set shrink(value) {
    this.flexShrink = value || "1";
    this.triggerReflow();
  }
  get grow() {
    return this.flexGrow;
  }
  set grow(value) {
    this.flexGrow = value || "1";
    this.triggerReflow();
  }
  flexGrow = "1";
  flexShrink = "1";
  constructor(elRef, styleUtils, layoutConfig, styleBuilder, marshal) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.layoutConfig = layoutConfig;
    this.marshal = marshal;
    this.init();
  }
  ngOnInit() {
    if (this.parentElement) {
      this.marshal.trackValue(this.parentElement, "layout").pipe(takeUntil(this.destroySubject)).subscribe(this.onLayoutChange.bind(this));
      this.marshal.trackValue(this.nativeElement, "layout-align").pipe(takeUntil(this.destroySubject)).subscribe(this.triggerReflow.bind(this));
    }
  }
  /**
   * Caches the parent container's 'flex-direction' and updates the element's style.
   * Used as a handler for layout change events from the parent flex container.
   */
  onLayoutChange(matcher) {
    const layout = matcher.value;
    const layoutParts = layout.split(" ");
    this.direction = layoutParts[0];
    this.wrap = layoutParts[1] !== void 0 && layoutParts[1] === "wrap";
    this.triggerUpdate();
  }
  /** Input to this is exclusively the basis input value */
  updateWithValue(value) {
    const addFlexToParent = this.layoutConfig.addFlexToParent !== false;
    if (this.direction === void 0) {
      this.direction = this.getFlexFlowDirection(this.parentElement, addFlexToParent);
    }
    if (this.wrap === void 0) {
      this.wrap = this.hasWrap(this.parentElement);
    }
    const direction = this.direction;
    const isHorizontal = direction.startsWith("row");
    const hasWrap = this.wrap;
    if (isHorizontal && hasWrap) {
      this.styleCache = flexRowWrapCache;
    } else if (isHorizontal && !hasWrap) {
      this.styleCache = flexRowCache;
    } else if (!isHorizontal && hasWrap) {
      this.styleCache = flexColumnWrapCache;
    } else if (!isHorizontal && !hasWrap) {
      this.styleCache = flexColumnCache;
    }
    const basis = String(value).replace(";", "");
    const parts = validateBasis(basis, this.flexGrow, this.flexShrink);
    this.addStyles(parts.join(" "), {
      direction,
      hasWrap
    });
  }
  /** Trigger a style reflow, usually based on a shrink/grow input event */
  triggerReflow() {
    const activatedValue = this.activatedValue;
    if (activatedValue !== void 0) {
      const parts = validateBasis(activatedValue + "", this.flexGrow, this.flexShrink);
      this.marshal.updateElement(this.nativeElement, this.DIRECTIVE_KEY, parts.join(" "));
    }
  }
  static ɵfac = function FlexDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FlexDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(LAYOUT_CONFIG), ɵɵdirectiveInject(FlexStyleBuilder), ɵɵdirectiveInject(MediaMarshaller));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _FlexDirective,
    inputs: {
      shrink: [0, "fxShrink", "shrink"],
      grow: [0, "fxGrow", "grow"]
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: StyleUtils
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [LAYOUT_CONFIG]
    }]
  }, {
    type: FlexStyleBuilder
  }, {
    type: MediaMarshaller
  }], {
    shrink: [{
      type: Input,
      args: ["fxShrink"]
    }],
    grow: [{
      type: Input,
      args: ["fxGrow"]
    }]
  });
})();
var DefaultFlexDirective = class _DefaultFlexDirective extends FlexDirective {
  inputs = inputs$3;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDefaultFlexDirective_BaseFactory;
    return function DefaultFlexDirective_Factory(__ngFactoryType__) {
      return (ɵDefaultFlexDirective_BaseFactory || (ɵDefaultFlexDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultFlexDirective)))(__ngFactoryType__ || _DefaultFlexDirective);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _DefaultFlexDirective,
    selectors: [["", "fxFlex", ""], ["", "fxFlex.xs", ""], ["", "fxFlex.sm", ""], ["", "fxFlex.md", ""], ["", "fxFlex.lg", ""], ["", "fxFlex.xl", ""], ["", "fxFlex.lt-sm", ""], ["", "fxFlex.lt-md", ""], ["", "fxFlex.lt-lg", ""], ["", "fxFlex.lt-xl", ""], ["", "fxFlex.gt-xs", ""], ["", "fxFlex.gt-sm", ""], ["", "fxFlex.gt-md", ""], ["", "fxFlex.gt-lg", ""]],
    inputs: {
      fxFlex: "fxFlex",
      "fxFlex.xs": "fxFlex.xs",
      "fxFlex.sm": "fxFlex.sm",
      "fxFlex.md": "fxFlex.md",
      "fxFlex.lg": "fxFlex.lg",
      "fxFlex.xl": "fxFlex.xl",
      "fxFlex.lt-sm": "fxFlex.lt-sm",
      "fxFlex.lt-md": "fxFlex.lt-md",
      "fxFlex.lt-lg": "fxFlex.lt-lg",
      "fxFlex.lt-xl": "fxFlex.lt-xl",
      "fxFlex.gt-xs": "fxFlex.gt-xs",
      "fxFlex.gt-sm": "fxFlex.gt-sm",
      "fxFlex.gt-md": "fxFlex.gt-md",
      "fxFlex.gt-lg": "fxFlex.gt-lg"
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultFlexDirective, [{
    type: Directive,
    args: [{
      inputs: inputs$3,
      selector: selector$3
    }]
  }], null, null);
})();
var flexRowCache = /* @__PURE__ */ new Map();
var flexColumnCache = /* @__PURE__ */ new Map();
var flexRowWrapCache = /* @__PURE__ */ new Map();
var flexColumnWrapCache = /* @__PURE__ */ new Map();
var LayoutAlignStyleBuilder = class _LayoutAlignStyleBuilder extends StyleBuilder {
  buildStyles(align, parent) {
    const css = {}, [mainAxis, crossAxis] = align.split(" ");
    switch (mainAxis) {
      case "center":
        css["justify-content"] = "center";
        break;
      case "space-around":
        css["justify-content"] = "space-around";
        break;
      case "space-between":
        css["justify-content"] = "space-between";
        break;
      case "space-evenly":
        css["justify-content"] = "space-evenly";
        break;
      case "end":
      case "flex-end":
        css["justify-content"] = "flex-end";
        break;
      case "start":
      case "flex-start":
      default:
        css["justify-content"] = "flex-start";
        break;
    }
    switch (crossAxis) {
      case "start":
      case "flex-start":
        css["align-items"] = css["align-content"] = "flex-start";
        break;
      case "center":
        css["align-items"] = css["align-content"] = "center";
        break;
      case "end":
      case "flex-end":
        css["align-items"] = css["align-content"] = "flex-end";
        break;
      case "space-between":
        css["align-content"] = "space-between";
        css["align-items"] = "stretch";
        break;
      case "space-around":
        css["align-content"] = "space-around";
        css["align-items"] = "stretch";
        break;
      case "baseline":
        css["align-content"] = "stretch";
        css["align-items"] = "baseline";
        break;
      case "stretch":
      default:
        css["align-items"] = css["align-content"] = "stretch";
        break;
    }
    return extendObject(css, {
      "display": parent.inline ? "inline-flex" : "flex",
      "flex-direction": parent.layout,
      "box-sizing": "border-box",
      "max-width": crossAxis === "stretch" ? !isFlowHorizontal(parent.layout) ? "100%" : null : null,
      "max-height": crossAxis === "stretch" ? isFlowHorizontal(parent.layout) ? "100%" : null : null
    });
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵLayoutAlignStyleBuilder_BaseFactory;
    return function LayoutAlignStyleBuilder_Factory(__ngFactoryType__) {
      return (ɵLayoutAlignStyleBuilder_BaseFactory || (ɵLayoutAlignStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(_LayoutAlignStyleBuilder)))(__ngFactoryType__ || _LayoutAlignStyleBuilder);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _LayoutAlignStyleBuilder,
    factory: _LayoutAlignStyleBuilder.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutAlignStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var inputs$2 = ["fxLayoutAlign", "fxLayoutAlign.xs", "fxLayoutAlign.sm", "fxLayoutAlign.md", "fxLayoutAlign.lg", "fxLayoutAlign.xl", "fxLayoutAlign.lt-sm", "fxLayoutAlign.lt-md", "fxLayoutAlign.lt-lg", "fxLayoutAlign.lt-xl", "fxLayoutAlign.gt-xs", "fxLayoutAlign.gt-sm", "fxLayoutAlign.gt-md", "fxLayoutAlign.gt-lg"];
var selector$2 = `
  [fxLayoutAlign], [fxLayoutAlign.xs], [fxLayoutAlign.sm], [fxLayoutAlign.md],
  [fxLayoutAlign.lg], [fxLayoutAlign.xl], [fxLayoutAlign.lt-sm], [fxLayoutAlign.lt-md],
  [fxLayoutAlign.lt-lg], [fxLayoutAlign.lt-xl], [fxLayoutAlign.gt-xs], [fxLayoutAlign.gt-sm],
  [fxLayoutAlign.gt-md], [fxLayoutAlign.gt-lg]
`;
var LayoutAlignDirective = class _LayoutAlignDirective extends BaseDirective2 {
  DIRECTIVE_KEY = "layout-align";
  layout = "row";
  // default flex-direction
  inline = false;
  // default inline value
  constructor(elRef, styleUtils, styleBuilder, marshal) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.init();
    this.marshal.trackValue(this.nativeElement, "layout").pipe(takeUntil(this.destroySubject)).subscribe(this.onLayoutChange.bind(this));
  }
  // *********************************************
  // Protected methods
  // *********************************************
  /**
   *
   */
  updateWithValue(value) {
    const layout = this.layout || "row";
    const inline = this.inline;
    if (layout === "row" && inline) {
      this.styleCache = layoutAlignHorizontalInlineCache;
    } else if (layout === "row" && !inline) {
      this.styleCache = layoutAlignHorizontalCache;
    } else if (layout === "row-reverse" && inline) {
      this.styleCache = layoutAlignHorizontalRevInlineCache;
    } else if (layout === "row-reverse" && !inline) {
      this.styleCache = layoutAlignHorizontalRevCache;
    } else if (layout === "column" && inline) {
      this.styleCache = layoutAlignVerticalInlineCache;
    } else if (layout === "column" && !inline) {
      this.styleCache = layoutAlignVerticalCache;
    } else if (layout === "column-reverse" && inline) {
      this.styleCache = layoutAlignVerticalRevInlineCache;
    } else if (layout === "column-reverse" && !inline) {
      this.styleCache = layoutAlignVerticalRevCache;
    }
    this.addStyles(value, {
      layout,
      inline
    });
  }
  /**
   * Cache the parent container 'flex-direction' and update the 'flex' styles
   */
  onLayoutChange(matcher) {
    const layoutKeys = matcher.value.split(" ");
    this.layout = layoutKeys[0];
    this.inline = matcher.value.includes("inline");
    if (!LAYOUT_VALUES.find((x) => x === this.layout)) {
      this.layout = "row";
    }
    this.triggerUpdate();
  }
  static ɵfac = function LayoutAlignDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LayoutAlignDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(LayoutAlignStyleBuilder), ɵɵdirectiveInject(MediaMarshaller));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _LayoutAlignDirective,
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutAlignDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: StyleUtils
  }, {
    type: LayoutAlignStyleBuilder
  }, {
    type: MediaMarshaller
  }], null);
})();
var DefaultLayoutAlignDirective = class _DefaultLayoutAlignDirective extends LayoutAlignDirective {
  inputs = inputs$2;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDefaultLayoutAlignDirective_BaseFactory;
    return function DefaultLayoutAlignDirective_Factory(__ngFactoryType__) {
      return (ɵDefaultLayoutAlignDirective_BaseFactory || (ɵDefaultLayoutAlignDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultLayoutAlignDirective)))(__ngFactoryType__ || _DefaultLayoutAlignDirective);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _DefaultLayoutAlignDirective,
    selectors: [["", "fxLayoutAlign", ""], ["", "fxLayoutAlign.xs", ""], ["", "fxLayoutAlign.sm", ""], ["", "fxLayoutAlign.md", ""], ["", "fxLayoutAlign.lg", ""], ["", "fxLayoutAlign.xl", ""], ["", "fxLayoutAlign.lt-sm", ""], ["", "fxLayoutAlign.lt-md", ""], ["", "fxLayoutAlign.lt-lg", ""], ["", "fxLayoutAlign.lt-xl", ""], ["", "fxLayoutAlign.gt-xs", ""], ["", "fxLayoutAlign.gt-sm", ""], ["", "fxLayoutAlign.gt-md", ""], ["", "fxLayoutAlign.gt-lg", ""]],
    inputs: {
      fxLayoutAlign: "fxLayoutAlign",
      "fxLayoutAlign.xs": "fxLayoutAlign.xs",
      "fxLayoutAlign.sm": "fxLayoutAlign.sm",
      "fxLayoutAlign.md": "fxLayoutAlign.md",
      "fxLayoutAlign.lg": "fxLayoutAlign.lg",
      "fxLayoutAlign.xl": "fxLayoutAlign.xl",
      "fxLayoutAlign.lt-sm": "fxLayoutAlign.lt-sm",
      "fxLayoutAlign.lt-md": "fxLayoutAlign.lt-md",
      "fxLayoutAlign.lt-lg": "fxLayoutAlign.lt-lg",
      "fxLayoutAlign.lt-xl": "fxLayoutAlign.lt-xl",
      "fxLayoutAlign.gt-xs": "fxLayoutAlign.gt-xs",
      "fxLayoutAlign.gt-sm": "fxLayoutAlign.gt-sm",
      "fxLayoutAlign.gt-md": "fxLayoutAlign.gt-md",
      "fxLayoutAlign.gt-lg": "fxLayoutAlign.gt-lg"
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultLayoutAlignDirective, [{
    type: Directive,
    args: [{
      selector: selector$2,
      inputs: inputs$2
    }]
  }], null, null);
})();
var layoutAlignHorizontalCache = /* @__PURE__ */ new Map();
var layoutAlignVerticalCache = /* @__PURE__ */ new Map();
var layoutAlignHorizontalRevCache = /* @__PURE__ */ new Map();
var layoutAlignVerticalRevCache = /* @__PURE__ */ new Map();
var layoutAlignHorizontalInlineCache = /* @__PURE__ */ new Map();
var layoutAlignVerticalInlineCache = /* @__PURE__ */ new Map();
var layoutAlignHorizontalRevInlineCache = /* @__PURE__ */ new Map();
var layoutAlignVerticalRevInlineCache = /* @__PURE__ */ new Map();
var CLEAR_MARGIN_CSS = {
  "margin-left": null,
  "margin-right": null,
  "margin-top": null,
  "margin-bottom": null
};
var LayoutGapStyleBuilder = class _LayoutGapStyleBuilder extends StyleBuilder {
  _styler;
  _config;
  constructor(_styler, _config) {
    super();
    this._styler = _styler;
    this._config = _config;
  }
  buildStyles(gapValue, parent) {
    if (gapValue.endsWith(GRID_SPECIFIER)) {
      gapValue = gapValue.slice(0, gapValue.indexOf(GRID_SPECIFIER));
      gapValue = multiply(gapValue, this._config.multiplier);
      return buildGridMargin(gapValue, parent.directionality);
    } else {
      return {};
    }
  }
  sideEffect(gapValue, _styles, parent) {
    const items = parent.items;
    if (gapValue.endsWith(GRID_SPECIFIER)) {
      gapValue = gapValue.slice(0, gapValue.indexOf(GRID_SPECIFIER));
      gapValue = multiply(gapValue, this._config.multiplier);
      const paddingStyles = buildGridPadding(gapValue, parent.directionality);
      this._styler.applyStyleToElements(paddingStyles, parent.items);
    } else {
      gapValue = multiply(gapValue, this._config.multiplier);
      gapValue = this.addFallbackUnit(gapValue);
      const lastItem = items.pop();
      const gapCss = buildGapCSS(gapValue, parent);
      this._styler.applyStyleToElements(gapCss, items);
      this._styler.applyStyleToElements(CLEAR_MARGIN_CSS, [lastItem]);
    }
  }
  addFallbackUnit(value) {
    return !isNaN(+value) ? `${value}${this._config.defaultUnit}` : value;
  }
  static ɵfac = function LayoutGapStyleBuilder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LayoutGapStyleBuilder)(ɵɵinject(StyleUtils), ɵɵinject(LAYOUT_CONFIG));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _LayoutGapStyleBuilder,
    factory: _LayoutGapStyleBuilder.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutGapStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: StyleUtils
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [LAYOUT_CONFIG]
    }]
  }], null);
})();
var inputs$1 = ["fxLayoutGap", "fxLayoutGap.xs", "fxLayoutGap.sm", "fxLayoutGap.md", "fxLayoutGap.lg", "fxLayoutGap.xl", "fxLayoutGap.lt-sm", "fxLayoutGap.lt-md", "fxLayoutGap.lt-lg", "fxLayoutGap.lt-xl", "fxLayoutGap.gt-xs", "fxLayoutGap.gt-sm", "fxLayoutGap.gt-md", "fxLayoutGap.gt-lg"];
var selector$1 = `
  [fxLayoutGap], [fxLayoutGap.xs], [fxLayoutGap.sm], [fxLayoutGap.md],
  [fxLayoutGap.lg], [fxLayoutGap.xl], [fxLayoutGap.lt-sm], [fxLayoutGap.lt-md],
  [fxLayoutGap.lt-lg], [fxLayoutGap.lt-xl], [fxLayoutGap.gt-xs], [fxLayoutGap.gt-sm],
  [fxLayoutGap.gt-md], [fxLayoutGap.gt-lg]
`;
var LayoutGapDirective = class _LayoutGapDirective extends BaseDirective2 {
  zone;
  directionality;
  styleUtils;
  layout = "row";
  // default flex-direction
  DIRECTIVE_KEY = "layout-gap";
  observerSubject = new Subject();
  /** Special accessor to query for all child 'element' nodes regardless of type, class, etc */
  get childrenNodes() {
    const obj = this.nativeElement.children;
    const buffer = [];
    for (let i = obj.length; i--; ) {
      buffer[i] = obj[i];
    }
    return buffer;
  }
  constructor(elRef, zone, directionality, styleUtils, styleBuilder, marshal) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.zone = zone;
    this.directionality = directionality;
    this.styleUtils = styleUtils;
    const extraTriggers = [this.directionality.change, this.observerSubject.asObservable()];
    this.init(extraTriggers);
    this.marshal.trackValue(this.nativeElement, "layout").pipe(takeUntil(this.destroySubject)).subscribe(this.onLayoutChange.bind(this));
  }
  // *********************************************
  // Lifecycle Methods
  // *********************************************
  ngAfterContentInit() {
    this.buildChildObservable();
    this.triggerUpdate();
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.observer) {
      this.observer.disconnect();
    }
  }
  // *********************************************
  // Protected methods
  // *********************************************
  /**
   * Cache the parent container 'flex-direction' and update the 'margin' styles
   */
  onLayoutChange(matcher) {
    const layout = matcher.value;
    const direction = layout.split(" ");
    this.layout = direction[0];
    if (!LAYOUT_VALUES.find((x) => x === this.layout)) {
      this.layout = "row";
    }
    this.triggerUpdate();
  }
  /**
   *
   */
  updateWithValue(value) {
    const items = this.childrenNodes.filter((el) => el.nodeType === 1 && this.willDisplay(el)).sort((a, b) => {
      const orderA = +this.styler.lookupStyle(a, "order");
      const orderB = +this.styler.lookupStyle(b, "order");
      if (isNaN(orderA) || isNaN(orderB) || orderA === orderB) {
        return 0;
      } else {
        return orderA > orderB ? 1 : -1;
      }
    });
    if (items.length > 0) {
      const directionality = this.directionality.value;
      const layout = this.layout;
      if (layout === "row" && directionality === "rtl") {
        this.styleCache = layoutGapCacheRowRtl;
      } else if (layout === "row" && directionality !== "rtl") {
        this.styleCache = layoutGapCacheRowLtr;
      } else if (layout === "column" && directionality === "rtl") {
        this.styleCache = layoutGapCacheColumnRtl;
      } else if (layout === "column" && directionality !== "rtl") {
        this.styleCache = layoutGapCacheColumnLtr;
      }
      this.addStyles(value, {
        directionality,
        items,
        layout
      });
    }
  }
  /** We need to override clearStyles because in most cases mru isn't populated */
  clearStyles() {
    const gridMode = Object.keys(this.mru).length > 0;
    const childrenStyle = gridMode ? "padding" : getMarginType(this.directionality.value, this.layout);
    if (gridMode) {
      super.clearStyles();
    }
    this.styleUtils.applyStyleToElements({
      [childrenStyle]: ""
    }, this.childrenNodes);
  }
  /** Determine if an element will show or hide based on current activation */
  willDisplay(source) {
    const value = this.marshal.getValue(source, "show-hide");
    return value === true || value === void 0 && this.styleUtils.lookupStyle(source, "display") !== "none";
  }
  buildChildObservable() {
    this.zone.runOutsideAngular(() => {
      if (typeof MutationObserver !== "undefined") {
        this.observer = new MutationObserver((mutations) => {
          const validatedChanges = (it) => {
            return it.addedNodes && it.addedNodes.length > 0 || it.removedNodes && it.removedNodes.length > 0;
          };
          if (mutations.some(validatedChanges)) {
            this.observerSubject.next();
          }
        });
        this.observer.observe(this.nativeElement, {
          childList: true
        });
      }
    });
  }
  observer;
  static ɵfac = function LayoutGapDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LayoutGapDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(Directionality), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(LayoutGapStyleBuilder), ɵɵdirectiveInject(MediaMarshaller));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _LayoutGapDirective,
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutGapDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: NgZone
  }, {
    type: Directionality
  }, {
    type: StyleUtils
  }, {
    type: LayoutGapStyleBuilder
  }, {
    type: MediaMarshaller
  }], null);
})();
var DefaultLayoutGapDirective = class _DefaultLayoutGapDirective extends LayoutGapDirective {
  inputs = inputs$1;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDefaultLayoutGapDirective_BaseFactory;
    return function DefaultLayoutGapDirective_Factory(__ngFactoryType__) {
      return (ɵDefaultLayoutGapDirective_BaseFactory || (ɵDefaultLayoutGapDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultLayoutGapDirective)))(__ngFactoryType__ || _DefaultLayoutGapDirective);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _DefaultLayoutGapDirective,
    selectors: [["", "fxLayoutGap", ""], ["", "fxLayoutGap.xs", ""], ["", "fxLayoutGap.sm", ""], ["", "fxLayoutGap.md", ""], ["", "fxLayoutGap.lg", ""], ["", "fxLayoutGap.xl", ""], ["", "fxLayoutGap.lt-sm", ""], ["", "fxLayoutGap.lt-md", ""], ["", "fxLayoutGap.lt-lg", ""], ["", "fxLayoutGap.lt-xl", ""], ["", "fxLayoutGap.gt-xs", ""], ["", "fxLayoutGap.gt-sm", ""], ["", "fxLayoutGap.gt-md", ""], ["", "fxLayoutGap.gt-lg", ""]],
    inputs: {
      fxLayoutGap: "fxLayoutGap",
      "fxLayoutGap.xs": "fxLayoutGap.xs",
      "fxLayoutGap.sm": "fxLayoutGap.sm",
      "fxLayoutGap.md": "fxLayoutGap.md",
      "fxLayoutGap.lg": "fxLayoutGap.lg",
      "fxLayoutGap.xl": "fxLayoutGap.xl",
      "fxLayoutGap.lt-sm": "fxLayoutGap.lt-sm",
      "fxLayoutGap.lt-md": "fxLayoutGap.lt-md",
      "fxLayoutGap.lt-lg": "fxLayoutGap.lt-lg",
      "fxLayoutGap.lt-xl": "fxLayoutGap.lt-xl",
      "fxLayoutGap.gt-xs": "fxLayoutGap.gt-xs",
      "fxLayoutGap.gt-sm": "fxLayoutGap.gt-sm",
      "fxLayoutGap.gt-md": "fxLayoutGap.gt-md",
      "fxLayoutGap.gt-lg": "fxLayoutGap.gt-lg"
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultLayoutGapDirective, [{
    type: Directive,
    args: [{
      selector: selector$1,
      inputs: inputs$1
    }]
  }], null, null);
})();
var layoutGapCacheRowRtl = /* @__PURE__ */ new Map();
var layoutGapCacheColumnRtl = /* @__PURE__ */ new Map();
var layoutGapCacheRowLtr = /* @__PURE__ */ new Map();
var layoutGapCacheColumnLtr = /* @__PURE__ */ new Map();
var GRID_SPECIFIER = " grid";
function buildGridPadding(value, directionality) {
  const [between, below] = value.split(" ");
  const bottom = below ?? between;
  let paddingRight = "0px", paddingBottom = bottom, paddingLeft = "0px";
  if (directionality === "rtl") {
    paddingLeft = between;
  } else {
    paddingRight = between;
  }
  return {
    "padding": `0px ${paddingRight} ${paddingBottom} ${paddingLeft}`
  };
}
function buildGridMargin(value, directionality) {
  const [between, below] = value.split(" ");
  const bottom = below ?? between;
  const minus = (str) => `-${str}`;
  let marginRight = "0px", marginBottom = minus(bottom), marginLeft = "0px";
  if (directionality === "rtl") {
    marginLeft = minus(between);
  } else {
    marginRight = minus(between);
  }
  return {
    "margin": `0px ${marginRight} ${marginBottom} ${marginLeft}`
  };
}
function getMarginType(directionality, layout) {
  switch (layout) {
    case "column":
      return "margin-bottom";
    case "column-reverse":
      return "margin-top";
    case "row":
      return directionality === "rtl" ? "margin-left" : "margin-right";
    case "row-reverse":
      return directionality === "rtl" ? "margin-right" : "margin-left";
    default:
      return directionality === "rtl" ? "margin-left" : "margin-right";
  }
}
function buildGapCSS(gapValue, parent) {
  const key = getMarginType(parent.directionality, parent.layout);
  const margins = __spreadValues({}, CLEAR_MARGIN_CSS);
  margins[key] = gapValue;
  return margins;
}
var LayoutStyleBuilder = class _LayoutStyleBuilder extends StyleBuilder {
  buildStyles(input, {
    display
  }) {
    const css = buildLayoutCSS(input);
    return __spreadProps(__spreadValues({}, css), {
      display: display === "none" ? display : css.display
    });
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵLayoutStyleBuilder_BaseFactory;
    return function LayoutStyleBuilder_Factory(__ngFactoryType__) {
      return (ɵLayoutStyleBuilder_BaseFactory || (ɵLayoutStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(_LayoutStyleBuilder)))(__ngFactoryType__ || _LayoutStyleBuilder);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _LayoutStyleBuilder,
    factory: _LayoutStyleBuilder.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var inputs = ["fxLayout", "fxLayout.xs", "fxLayout.sm", "fxLayout.md", "fxLayout.lg", "fxLayout.xl", "fxLayout.lt-sm", "fxLayout.lt-md", "fxLayout.lt-lg", "fxLayout.lt-xl", "fxLayout.gt-xs", "fxLayout.gt-sm", "fxLayout.gt-md", "fxLayout.gt-lg"];
var selector = `
  [fxLayout], [fxLayout.xs], [fxLayout.sm], [fxLayout.md],
  [fxLayout.lg], [fxLayout.xl], [fxLayout.lt-sm], [fxLayout.lt-md],
  [fxLayout.lt-lg], [fxLayout.lt-xl], [fxLayout.gt-xs], [fxLayout.gt-sm],
  [fxLayout.gt-md], [fxLayout.gt-lg]
`;
var LayoutDirective = class _LayoutDirective extends BaseDirective2 {
  _config;
  DIRECTIVE_KEY = "layout";
  constructor(elRef, styleUtils, styleBuilder, marshal, _config) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this._config = _config;
    this.init();
  }
  updateWithValue(input) {
    const detectLayoutDisplay = this._config.detectLayoutDisplay;
    const display = detectLayoutDisplay ? this.styler.lookupStyle(this.nativeElement, "display") : "";
    this.styleCache = cacheMap.get(display) ?? /* @__PURE__ */ new Map();
    cacheMap.set(display, this.styleCache);
    if (this.currentValue !== input) {
      this.addStyles(input, {
        display
      });
      this.currentValue = input;
    }
  }
  static ɵfac = function LayoutDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LayoutDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(LayoutStyleBuilder), ɵɵdirectiveInject(MediaMarshaller), ɵɵdirectiveInject(LAYOUT_CONFIG));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _LayoutDirective,
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: StyleUtils
  }, {
    type: LayoutStyleBuilder
  }, {
    type: MediaMarshaller
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [LAYOUT_CONFIG]
    }]
  }], null);
})();
var DefaultLayoutDirective = class _DefaultLayoutDirective extends LayoutDirective {
  inputs = inputs;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDefaultLayoutDirective_BaseFactory;
    return function DefaultLayoutDirective_Factory(__ngFactoryType__) {
      return (ɵDefaultLayoutDirective_BaseFactory || (ɵDefaultLayoutDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultLayoutDirective)))(__ngFactoryType__ || _DefaultLayoutDirective);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _DefaultLayoutDirective,
    selectors: [["", "fxLayout", ""], ["", "fxLayout.xs", ""], ["", "fxLayout.sm", ""], ["", "fxLayout.md", ""], ["", "fxLayout.lg", ""], ["", "fxLayout.xl", ""], ["", "fxLayout.lt-sm", ""], ["", "fxLayout.lt-md", ""], ["", "fxLayout.lt-lg", ""], ["", "fxLayout.lt-xl", ""], ["", "fxLayout.gt-xs", ""], ["", "fxLayout.gt-sm", ""], ["", "fxLayout.gt-md", ""], ["", "fxLayout.gt-lg", ""]],
    inputs: {
      fxLayout: "fxLayout",
      "fxLayout.xs": "fxLayout.xs",
      "fxLayout.sm": "fxLayout.sm",
      "fxLayout.md": "fxLayout.md",
      "fxLayout.lg": "fxLayout.lg",
      "fxLayout.xl": "fxLayout.xl",
      "fxLayout.lt-sm": "fxLayout.lt-sm",
      "fxLayout.lt-md": "fxLayout.lt-md",
      "fxLayout.lt-lg": "fxLayout.lt-lg",
      "fxLayout.lt-xl": "fxLayout.lt-xl",
      "fxLayout.gt-xs": "fxLayout.gt-xs",
      "fxLayout.gt-sm": "fxLayout.gt-sm",
      "fxLayout.gt-md": "fxLayout.gt-md",
      "fxLayout.gt-lg": "fxLayout.gt-lg"
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultLayoutDirective, [{
    type: Directive,
    args: [{
      selector,
      inputs
    }]
  }], null, null);
})();
var cacheMap = /* @__PURE__ */ new Map();
var ALL_DIRECTIVES = [DefaultLayoutDirective, DefaultLayoutGapDirective, DefaultLayoutAlignDirective, DefaultFlexOrderDirective, DefaultFlexOffsetDirective, FlexFillDirective, DefaultFlexAlignDirective, DefaultFlexDirective];
var FlexModule = class _FlexModule {
  static ɵfac = function FlexModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FlexModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _FlexModule,
    imports: [CoreModule, BidiModule, DefaultLayoutDirective, DefaultLayoutGapDirective, DefaultLayoutAlignDirective, DefaultFlexOrderDirective, DefaultFlexOffsetDirective, FlexFillDirective, DefaultFlexAlignDirective, DefaultFlexDirective],
    exports: [DefaultLayoutDirective, DefaultLayoutGapDirective, DefaultLayoutAlignDirective, DefaultFlexOrderDirective, DefaultFlexOffsetDirective, FlexFillDirective, DefaultFlexAlignDirective, DefaultFlexDirective]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CoreModule, BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexModule, [{
    type: NgModule,
    args: [{
      imports: [CoreModule, BidiModule, ...ALL_DIRECTIVES],
      declarations: [],
      exports: [...ALL_DIRECTIVES]
    }]
  }], null, null);
})();

export {
  FlexAlignStyleBuilder,
  FlexAlignDirective,
  DefaultFlexAlignDirective,
  FlexFillStyleBuilder,
  FlexFillDirective,
  FlexOffsetStyleBuilder,
  FlexOffsetDirective,
  DefaultFlexOffsetDirective,
  FlexOrderStyleBuilder,
  FlexOrderDirective,
  DefaultFlexOrderDirective,
  FlexStyleBuilder,
  FlexDirective,
  DefaultFlexDirective,
  LayoutAlignStyleBuilder,
  LayoutAlignDirective,
  DefaultLayoutAlignDirective,
  LayoutGapStyleBuilder,
  LayoutGapDirective,
  DefaultLayoutGapDirective,
  LayoutStyleBuilder,
  LayoutDirective,
  DefaultLayoutDirective,
  FlexModule
};
//# sourceMappingURL=chunk-LIWRPRWS.js.map
