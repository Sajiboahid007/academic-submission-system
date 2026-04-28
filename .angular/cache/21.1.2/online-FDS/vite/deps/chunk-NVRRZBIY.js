import {
  BaseDirective2,
  CoreModule,
  MediaMarshaller,
  StyleBuilder,
  StyleUtils
} from "./chunk-M34J5UC5.js";
import {
  coerceBooleanProperty
} from "./chunk-AIEYJCOW.js";
import {
  Directive,
  ElementRef,
  Injectable,
  Input,
  NgModule,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵgetInheritedFactory
} from "./chunk-O7OAUIW2.js";

// node_modules/ngx-flexible-layout/fesm2022/ngx-flexible-layout-grid.mjs
var DEFAULT_MAIN$1 = "start";
var DEFAULT_CROSS$1 = "stretch";
var GridAlignColumnsStyleBuilder = class _GridAlignColumnsStyleBuilder extends StyleBuilder {
  buildStyles(input, parent) {
    return buildCss$2(input || `${DEFAULT_MAIN$1} ${DEFAULT_CROSS$1}`, parent.inline);
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵGridAlignColumnsStyleBuilder_BaseFactory;
    return function GridAlignColumnsStyleBuilder_Factory(__ngFactoryType__) {
      return (ɵGridAlignColumnsStyleBuilder_BaseFactory || (ɵGridAlignColumnsStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(_GridAlignColumnsStyleBuilder)))(__ngFactoryType__ || _GridAlignColumnsStyleBuilder);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _GridAlignColumnsStyleBuilder,
    factory: _GridAlignColumnsStyleBuilder.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridAlignColumnsStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var GridAlignColumnsDirective = class _GridAlignColumnsDirective extends BaseDirective2 {
  DIRECTIVE_KEY = "grid-align-columns";
  get inline() {
    return this._inline;
  }
  set inline(val) {
    this._inline = coerceBooleanProperty(val);
  }
  _inline = false;
  constructor(elementRef, styleBuilder, styler, marshal) {
    super(elementRef, styleBuilder, styler, marshal);
    this.init();
  }
  // *********************************************
  // Protected methods
  // *********************************************
  updateWithValue(value) {
    this.styleCache = this.inline ? alignColumnsInlineCache : alignColumnsCache;
    this.addStyles(value, {
      inline: this.inline
    });
  }
  static ɵfac = function GridAlignColumnsDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GridAlignColumnsDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(GridAlignColumnsStyleBuilder), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(MediaMarshaller));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _GridAlignColumnsDirective,
    inputs: {
      inline: [0, "gdInline", "inline"]
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridAlignColumnsDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: GridAlignColumnsStyleBuilder
  }, {
    type: StyleUtils
  }, {
    type: MediaMarshaller
  }], {
    inline: [{
      type: Input,
      args: ["gdInline"]
    }]
  });
})();
var alignColumnsCache = /* @__PURE__ */ new Map();
var alignColumnsInlineCache = /* @__PURE__ */ new Map();
var inputs$a = ["gdAlignColumns", "gdAlignColumns.xs", "gdAlignColumns.sm", "gdAlignColumns.md", "gdAlignColumns.lg", "gdAlignColumns.xl", "gdAlignColumns.lt-sm", "gdAlignColumns.lt-md", "gdAlignColumns.lt-lg", "gdAlignColumns.lt-xl", "gdAlignColumns.gt-xs", "gdAlignColumns.gt-sm", "gdAlignColumns.gt-md", "gdAlignColumns.gt-lg"];
var selector$a = `
  [gdAlignColumns],
  [gdAlignColumns.xs], [gdAlignColumns.sm], [gdAlignColumns.md],
  [gdAlignColumns.lg], [gdAlignColumns.xl], [gdAlignColumns.lt-sm],
  [gdAlignColumns.lt-md], [gdAlignColumns.lt-lg], [gdAlignColumns.lt-xl],
  [gdAlignColumns.gt-xs], [gdAlignColumns.gt-sm], [gdAlignColumns.gt-md],
  [gdAlignColumns.gt-lg]
`;
var DefaultGridAlignColumnsDirective = class _DefaultGridAlignColumnsDirective extends GridAlignColumnsDirective {
  inputs = inputs$a;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDefaultGridAlignColumnsDirective_BaseFactory;
    return function DefaultGridAlignColumnsDirective_Factory(__ngFactoryType__) {
      return (ɵDefaultGridAlignColumnsDirective_BaseFactory || (ɵDefaultGridAlignColumnsDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultGridAlignColumnsDirective)))(__ngFactoryType__ || _DefaultGridAlignColumnsDirective);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _DefaultGridAlignColumnsDirective,
    selectors: [["", "gdAlignColumns", ""], ["", "gdAlignColumns.xs", ""], ["", "gdAlignColumns.sm", ""], ["", "gdAlignColumns.md", ""], ["", "gdAlignColumns.lg", ""], ["", "gdAlignColumns.xl", ""], ["", "gdAlignColumns.lt-sm", ""], ["", "gdAlignColumns.lt-md", ""], ["", "gdAlignColumns.lt-lg", ""], ["", "gdAlignColumns.lt-xl", ""], ["", "gdAlignColumns.gt-xs", ""], ["", "gdAlignColumns.gt-sm", ""], ["", "gdAlignColumns.gt-md", ""], ["", "gdAlignColumns.gt-lg", ""]],
    inputs: {
      gdAlignColumns: "gdAlignColumns",
      "gdAlignColumns.xs": "gdAlignColumns.xs",
      "gdAlignColumns.sm": "gdAlignColumns.sm",
      "gdAlignColumns.md": "gdAlignColumns.md",
      "gdAlignColumns.lg": "gdAlignColumns.lg",
      "gdAlignColumns.xl": "gdAlignColumns.xl",
      "gdAlignColumns.lt-sm": "gdAlignColumns.lt-sm",
      "gdAlignColumns.lt-md": "gdAlignColumns.lt-md",
      "gdAlignColumns.lt-lg": "gdAlignColumns.lt-lg",
      "gdAlignColumns.lt-xl": "gdAlignColumns.lt-xl",
      "gdAlignColumns.gt-xs": "gdAlignColumns.gt-xs",
      "gdAlignColumns.gt-sm": "gdAlignColumns.gt-sm",
      "gdAlignColumns.gt-md": "gdAlignColumns.gt-md",
      "gdAlignColumns.gt-lg": "gdAlignColumns.gt-lg"
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultGridAlignColumnsDirective, [{
    type: Directive,
    args: [{
      selector: selector$a,
      inputs: inputs$a
    }]
  }], null, null);
})();
function buildCss$2(align, inline) {
  const css = {}, [mainAxis, crossAxis] = align.split(" ");
  switch (mainAxis) {
    case "center":
      css["align-content"] = "center";
      break;
    case "space-around":
      css["align-content"] = "space-around";
      break;
    case "space-between":
      css["align-content"] = "space-between";
      break;
    case "space-evenly":
      css["align-content"] = "space-evenly";
      break;
    case "end":
      css["align-content"] = "end";
      break;
    case "start":
      css["align-content"] = "start";
      break;
    case "stretch":
      css["align-content"] = "stretch";
      break;
    default:
      css["align-content"] = DEFAULT_MAIN$1;
      break;
  }
  switch (crossAxis) {
    case "start":
      css["align-items"] = "start";
      break;
    case "center":
      css["align-items"] = "center";
      break;
    case "end":
      css["align-items"] = "end";
      break;
    case "stretch":
      css["align-items"] = "stretch";
      break;
    default:
      css["align-items"] = DEFAULT_CROSS$1;
      break;
  }
  css["display"] = inline ? "inline-grid" : "grid";
  return css;
}
var DEFAULT_MAIN = "start";
var DEFAULT_CROSS = "stretch";
var GridAlignRowsStyleBuilder = class _GridAlignRowsStyleBuilder extends StyleBuilder {
  buildStyles(input, parent) {
    return buildCss$1(input || `${DEFAULT_MAIN} ${DEFAULT_CROSS}`, parent.inline);
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵGridAlignRowsStyleBuilder_BaseFactory;
    return function GridAlignRowsStyleBuilder_Factory(__ngFactoryType__) {
      return (ɵGridAlignRowsStyleBuilder_BaseFactory || (ɵGridAlignRowsStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(_GridAlignRowsStyleBuilder)))(__ngFactoryType__ || _GridAlignRowsStyleBuilder);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _GridAlignRowsStyleBuilder,
    factory: _GridAlignRowsStyleBuilder.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridAlignRowsStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var GridAlignRowsDirective = class _GridAlignRowsDirective extends BaseDirective2 {
  DIRECTIVE_KEY = "grid-align-rows";
  get inline() {
    return this._inline;
  }
  set inline(val) {
    this._inline = coerceBooleanProperty(val);
  }
  _inline = false;
  constructor(elementRef, styleBuilder, styler, marshal) {
    super(elementRef, styleBuilder, styler, marshal);
    this.init();
  }
  // *********************************************
  // Protected methods
  // *********************************************
  updateWithValue(value) {
    this.styleCache = this.inline ? alignRowsInlineCache : alignRowsCache;
    this.addStyles(value, {
      inline: this.inline
    });
  }
  static ɵfac = function GridAlignRowsDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GridAlignRowsDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(GridAlignRowsStyleBuilder), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(MediaMarshaller));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _GridAlignRowsDirective,
    inputs: {
      inline: [0, "gdInline", "inline"]
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridAlignRowsDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: GridAlignRowsStyleBuilder
  }, {
    type: StyleUtils
  }, {
    type: MediaMarshaller
  }], {
    inline: [{
      type: Input,
      args: ["gdInline"]
    }]
  });
})();
var alignRowsCache = /* @__PURE__ */ new Map();
var alignRowsInlineCache = /* @__PURE__ */ new Map();
var inputs$9 = ["gdAlignRows", "gdAlignRows.xs", "gdAlignRows.sm", "gdAlignRows.md", "gdAlignRows.lg", "gdAlignRows.xl", "gdAlignRows.lt-sm", "gdAlignRows.lt-md", "gdAlignRows.lt-lg", "gdAlignRows.lt-xl", "gdAlignRows.gt-xs", "gdAlignRows.gt-sm", "gdAlignRows.gt-md", "gdAlignRows.gt-lg"];
var selector$9 = `
  [gdAlignRows],
  [gdAlignRows.xs], [gdAlignRows.sm], [gdAlignRows.md],
  [gdAlignRows.lg], [gdAlignRows.xl], [gdAlignRows.lt-sm],
  [gdAlignRows.lt-md], [gdAlignRows.lt-lg], [gdAlignRows.lt-xl],
  [gdAlignRows.gt-xs], [gdAlignRows.gt-sm], [gdAlignRows.gt-md],
  [gdAlignRows.gt-lg]
`;
var DefaultGridAlignRowsDirective = class _DefaultGridAlignRowsDirective extends GridAlignRowsDirective {
  inputs = inputs$9;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDefaultGridAlignRowsDirective_BaseFactory;
    return function DefaultGridAlignRowsDirective_Factory(__ngFactoryType__) {
      return (ɵDefaultGridAlignRowsDirective_BaseFactory || (ɵDefaultGridAlignRowsDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultGridAlignRowsDirective)))(__ngFactoryType__ || _DefaultGridAlignRowsDirective);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _DefaultGridAlignRowsDirective,
    selectors: [["", "gdAlignRows", ""], ["", "gdAlignRows.xs", ""], ["", "gdAlignRows.sm", ""], ["", "gdAlignRows.md", ""], ["", "gdAlignRows.lg", ""], ["", "gdAlignRows.xl", ""], ["", "gdAlignRows.lt-sm", ""], ["", "gdAlignRows.lt-md", ""], ["", "gdAlignRows.lt-lg", ""], ["", "gdAlignRows.lt-xl", ""], ["", "gdAlignRows.gt-xs", ""], ["", "gdAlignRows.gt-sm", ""], ["", "gdAlignRows.gt-md", ""], ["", "gdAlignRows.gt-lg", ""]],
    inputs: {
      gdAlignRows: "gdAlignRows",
      "gdAlignRows.xs": "gdAlignRows.xs",
      "gdAlignRows.sm": "gdAlignRows.sm",
      "gdAlignRows.md": "gdAlignRows.md",
      "gdAlignRows.lg": "gdAlignRows.lg",
      "gdAlignRows.xl": "gdAlignRows.xl",
      "gdAlignRows.lt-sm": "gdAlignRows.lt-sm",
      "gdAlignRows.lt-md": "gdAlignRows.lt-md",
      "gdAlignRows.lt-lg": "gdAlignRows.lt-lg",
      "gdAlignRows.lt-xl": "gdAlignRows.lt-xl",
      "gdAlignRows.gt-xs": "gdAlignRows.gt-xs",
      "gdAlignRows.gt-sm": "gdAlignRows.gt-sm",
      "gdAlignRows.gt-md": "gdAlignRows.gt-md",
      "gdAlignRows.gt-lg": "gdAlignRows.gt-lg"
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultGridAlignRowsDirective, [{
    type: Directive,
    args: [{
      selector: selector$9,
      inputs: inputs$9
    }]
  }], null, null);
})();
function buildCss$1(align, inline) {
  const css = {}, [mainAxis, crossAxis] = align.split(" ");
  switch (mainAxis) {
    case "center":
    case "space-around":
    case "space-between":
    case "space-evenly":
    case "end":
    case "start":
    case "stretch":
      css["justify-content"] = mainAxis;
      break;
    default:
      css["justify-content"] = DEFAULT_MAIN;
      break;
  }
  switch (crossAxis) {
    case "start":
    case "center":
    case "end":
    case "stretch":
      css["justify-items"] = crossAxis;
      break;
    default:
      css["justify-items"] = DEFAULT_CROSS;
      break;
  }
  css["display"] = inline ? "inline-grid" : "grid";
  return css;
}
var DEFAULT_VALUE$7 = "auto";
var GridAreaStyleBuilder = class _GridAreaStyleBuilder extends StyleBuilder {
  buildStyles(input) {
    return {
      "grid-area": input || DEFAULT_VALUE$7
    };
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵGridAreaStyleBuilder_BaseFactory;
    return function GridAreaStyleBuilder_Factory(__ngFactoryType__) {
      return (ɵGridAreaStyleBuilder_BaseFactory || (ɵGridAreaStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(_GridAreaStyleBuilder)))(__ngFactoryType__ || _GridAreaStyleBuilder);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _GridAreaStyleBuilder,
    factory: _GridAreaStyleBuilder.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridAreaStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var GridAreaDirective = class _GridAreaDirective extends BaseDirective2 {
  DIRECTIVE_KEY = "grid-area";
  constructor(elRef, styleUtils, styleBuilder, marshal) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.init();
  }
  styleCache = gridAreaCache;
  static ɵfac = function GridAreaDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GridAreaDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(GridAreaStyleBuilder), ɵɵdirectiveInject(MediaMarshaller));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _GridAreaDirective,
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridAreaDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: StyleUtils
  }, {
    type: GridAreaStyleBuilder
  }, {
    type: MediaMarshaller
  }], null);
})();
var gridAreaCache = /* @__PURE__ */ new Map();
var inputs$8 = ["gdArea", "gdArea.xs", "gdArea.sm", "gdArea.md", "gdArea.lg", "gdArea.xl", "gdArea.lt-sm", "gdArea.lt-md", "gdArea.lt-lg", "gdArea.lt-xl", "gdArea.gt-xs", "gdArea.gt-sm", "gdArea.gt-md", "gdArea.gt-lg"];
var selector$8 = `
  [gdArea],
  [gdArea.xs], [gdArea.sm], [gdArea.md], [gdArea.lg], [gdArea.xl],
  [gdArea.lt-sm], [gdArea.lt-md], [gdArea.lt-lg], [gdArea.lt-xl],
  [gdArea.gt-xs], [gdArea.gt-sm], [gdArea.gt-md], [gdArea.gt-lg]
`;
var DefaultGridAreaDirective = class _DefaultGridAreaDirective extends GridAreaDirective {
  inputs = inputs$8;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDefaultGridAreaDirective_BaseFactory;
    return function DefaultGridAreaDirective_Factory(__ngFactoryType__) {
      return (ɵDefaultGridAreaDirective_BaseFactory || (ɵDefaultGridAreaDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultGridAreaDirective)))(__ngFactoryType__ || _DefaultGridAreaDirective);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _DefaultGridAreaDirective,
    selectors: [["", "gdArea", ""], ["", "gdArea.xs", ""], ["", "gdArea.sm", ""], ["", "gdArea.md", ""], ["", "gdArea.lg", ""], ["", "gdArea.xl", ""], ["", "gdArea.lt-sm", ""], ["", "gdArea.lt-md", ""], ["", "gdArea.lt-lg", ""], ["", "gdArea.lt-xl", ""], ["", "gdArea.gt-xs", ""], ["", "gdArea.gt-sm", ""], ["", "gdArea.gt-md", ""], ["", "gdArea.gt-lg", ""]],
    inputs: {
      gdArea: "gdArea",
      "gdArea.xs": "gdArea.xs",
      "gdArea.sm": "gdArea.sm",
      "gdArea.md": "gdArea.md",
      "gdArea.lg": "gdArea.lg",
      "gdArea.xl": "gdArea.xl",
      "gdArea.lt-sm": "gdArea.lt-sm",
      "gdArea.lt-md": "gdArea.lt-md",
      "gdArea.lt-lg": "gdArea.lt-lg",
      "gdArea.lt-xl": "gdArea.lt-xl",
      "gdArea.gt-xs": "gdArea.gt-xs",
      "gdArea.gt-sm": "gdArea.gt-sm",
      "gdArea.gt-md": "gdArea.gt-md",
      "gdArea.gt-lg": "gdArea.gt-lg"
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultGridAreaDirective, [{
    type: Directive,
    args: [{
      selector: selector$8,
      inputs: inputs$8
    }]
  }], null, null);
})();
var DEFAULT_VALUE$6 = "none";
var DELIMETER = "|";
var GridAreasStyleBuiler = class _GridAreasStyleBuiler extends StyleBuilder {
  buildStyles(input, parent) {
    const areas = (input || DEFAULT_VALUE$6).split(DELIMETER).map((v) => `"${v.trim()}"`);
    return {
      "display": parent.inline ? "inline-grid" : "grid",
      "grid-template-areas": areas.join(" ")
    };
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵGridAreasStyleBuiler_BaseFactory;
    return function GridAreasStyleBuiler_Factory(__ngFactoryType__) {
      return (ɵGridAreasStyleBuiler_BaseFactory || (ɵGridAreasStyleBuiler_BaseFactory = ɵɵgetInheritedFactory(_GridAreasStyleBuiler)))(__ngFactoryType__ || _GridAreasStyleBuiler);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _GridAreasStyleBuiler,
    factory: _GridAreasStyleBuiler.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridAreasStyleBuiler, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var GridAreasDirective = class _GridAreasDirective extends BaseDirective2 {
  DIRECTIVE_KEY = "grid-areas";
  get inline() {
    return this._inline;
  }
  set inline(val) {
    this._inline = coerceBooleanProperty(val);
  }
  _inline = false;
  constructor(elRef, styleUtils, styleBuilder, marshal) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.init();
  }
  // *********************************************
  // Protected methods
  // *********************************************
  updateWithValue(value) {
    this.styleCache = this.inline ? areasInlineCache : areasCache;
    this.addStyles(value, {
      inline: this.inline
    });
  }
  static ɵfac = function GridAreasDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GridAreasDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(GridAreasStyleBuiler), ɵɵdirectiveInject(MediaMarshaller));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _GridAreasDirective,
    inputs: {
      inline: [0, "gdInline", "inline"]
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridAreasDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: StyleUtils
  }, {
    type: GridAreasStyleBuiler
  }, {
    type: MediaMarshaller
  }], {
    inline: [{
      type: Input,
      args: ["gdInline"]
    }]
  });
})();
var areasCache = /* @__PURE__ */ new Map();
var areasInlineCache = /* @__PURE__ */ new Map();
var inputs$7 = ["gdAreas", "gdAreas.xs", "gdAreas.sm", "gdAreas.md", "gdAreas.lg", "gdAreas.xl", "gdAreas.lt-sm", "gdAreas.lt-md", "gdAreas.lt-lg", "gdAreas.lt-xl", "gdAreas.gt-xs", "gdAreas.gt-sm", "gdAreas.gt-md", "gdAreas.gt-lg"];
var selector$7 = `
  [gdAreas],
  [gdAreas.xs], [gdAreas.sm], [gdAreas.md], [gdAreas.lg], [gdAreas.xl],
  [gdAreas.lt-sm], [gdAreas.lt-md], [gdAreas.lt-lg], [gdAreas.lt-xl],
  [gdAreas.gt-xs], [gdAreas.gt-sm], [gdAreas.gt-md], [gdAreas.gt-lg]
`;
var DefaultGridAreasDirective = class _DefaultGridAreasDirective extends GridAreasDirective {
  inputs = inputs$7;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDefaultGridAreasDirective_BaseFactory;
    return function DefaultGridAreasDirective_Factory(__ngFactoryType__) {
      return (ɵDefaultGridAreasDirective_BaseFactory || (ɵDefaultGridAreasDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultGridAreasDirective)))(__ngFactoryType__ || _DefaultGridAreasDirective);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _DefaultGridAreasDirective,
    selectors: [["", "gdAreas", ""], ["", "gdAreas.xs", ""], ["", "gdAreas.sm", ""], ["", "gdAreas.md", ""], ["", "gdAreas.lg", ""], ["", "gdAreas.xl", ""], ["", "gdAreas.lt-sm", ""], ["", "gdAreas.lt-md", ""], ["", "gdAreas.lt-lg", ""], ["", "gdAreas.lt-xl", ""], ["", "gdAreas.gt-xs", ""], ["", "gdAreas.gt-sm", ""], ["", "gdAreas.gt-md", ""], ["", "gdAreas.gt-lg", ""]],
    inputs: {
      gdAreas: "gdAreas",
      "gdAreas.xs": "gdAreas.xs",
      "gdAreas.sm": "gdAreas.sm",
      "gdAreas.md": "gdAreas.md",
      "gdAreas.lg": "gdAreas.lg",
      "gdAreas.xl": "gdAreas.xl",
      "gdAreas.lt-sm": "gdAreas.lt-sm",
      "gdAreas.lt-md": "gdAreas.lt-md",
      "gdAreas.lt-lg": "gdAreas.lt-lg",
      "gdAreas.lt-xl": "gdAreas.lt-xl",
      "gdAreas.gt-xs": "gdAreas.gt-xs",
      "gdAreas.gt-sm": "gdAreas.gt-sm",
      "gdAreas.gt-md": "gdAreas.gt-md",
      "gdAreas.gt-lg": "gdAreas.gt-lg"
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultGridAreasDirective, [{
    type: Directive,
    args: [{
      selector: selector$7,
      inputs: inputs$7
    }]
  }], null, null);
})();
var DEFAULT_VALUE$5 = "initial";
var GridAutoStyleBuilder = class _GridAutoStyleBuilder extends StyleBuilder {
  buildStyles(input, parent) {
    let [direction, dense] = (input || DEFAULT_VALUE$5).split(" ");
    if (direction !== "column" && direction !== "row" && direction !== "dense") {
      direction = "row";
    }
    dense = dense === "dense" && direction !== "dense" ? " dense" : "";
    return {
      "display": parent.inline ? "inline-grid" : "grid",
      "grid-auto-flow": direction + dense
    };
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵGridAutoStyleBuilder_BaseFactory;
    return function GridAutoStyleBuilder_Factory(__ngFactoryType__) {
      return (ɵGridAutoStyleBuilder_BaseFactory || (ɵGridAutoStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(_GridAutoStyleBuilder)))(__ngFactoryType__ || _GridAutoStyleBuilder);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _GridAutoStyleBuilder,
    factory: _GridAutoStyleBuilder.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridAutoStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var GridAutoDirective = class _GridAutoDirective extends BaseDirective2 {
  get inline() {
    return this._inline;
  }
  set inline(val) {
    this._inline = coerceBooleanProperty(val);
  }
  _inline = false;
  DIRECTIVE_KEY = "grid-auto";
  constructor(elementRef, styleBuilder, styler, marshal) {
    super(elementRef, styleBuilder, styler, marshal);
    this.init();
  }
  // *********************************************
  // Protected methods
  // *********************************************
  updateWithValue(value) {
    this.styleCache = this.inline ? autoInlineCache : autoCache;
    this.addStyles(value, {
      inline: this.inline
    });
  }
  static ɵfac = function GridAutoDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GridAutoDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(GridAutoStyleBuilder), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(MediaMarshaller));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _GridAutoDirective,
    inputs: {
      inline: [0, "gdInline", "inline"]
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridAutoDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: GridAutoStyleBuilder
  }, {
    type: StyleUtils
  }, {
    type: MediaMarshaller
  }], {
    inline: [{
      type: Input,
      args: ["gdInline"]
    }]
  });
})();
var autoCache = /* @__PURE__ */ new Map();
var autoInlineCache = /* @__PURE__ */ new Map();
var inputs$6 = ["gdAuto", "gdAuto.xs", "gdAuto.sm", "gdAuto.md", "gdAuto.lg", "gdAuto.xl", "gdAuto.lt-sm", "gdAuto.lt-md", "gdAuto.lt-lg", "gdAuto.lt-xl", "gdAuto.gt-xs", "gdAuto.gt-sm", "gdAuto.gt-md", "gdAuto.gt-lg"];
var selector$6 = `
  [gdAuto],
  [gdAuto.xs], [gdAuto.sm], [gdAuto.md], [gdAuto.lg], [gdAuto.xl],
  [gdAuto.lt-sm], [gdAuto.lt-md], [gdAuto.lt-lg], [gdAuto.lt-xl],
  [gdAuto.gt-xs], [gdAuto.gt-sm], [gdAuto.gt-md], [gdAuto.gt-lg]
`;
var DefaultGridAutoDirective = class _DefaultGridAutoDirective extends GridAutoDirective {
  inputs = inputs$6;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDefaultGridAutoDirective_BaseFactory;
    return function DefaultGridAutoDirective_Factory(__ngFactoryType__) {
      return (ɵDefaultGridAutoDirective_BaseFactory || (ɵDefaultGridAutoDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultGridAutoDirective)))(__ngFactoryType__ || _DefaultGridAutoDirective);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _DefaultGridAutoDirective,
    selectors: [["", "gdAuto", ""], ["", "gdAuto.xs", ""], ["", "gdAuto.sm", ""], ["", "gdAuto.md", ""], ["", "gdAuto.lg", ""], ["", "gdAuto.xl", ""], ["", "gdAuto.lt-sm", ""], ["", "gdAuto.lt-md", ""], ["", "gdAuto.lt-lg", ""], ["", "gdAuto.lt-xl", ""], ["", "gdAuto.gt-xs", ""], ["", "gdAuto.gt-sm", ""], ["", "gdAuto.gt-md", ""], ["", "gdAuto.gt-lg", ""]],
    inputs: {
      gdAuto: "gdAuto",
      "gdAuto.xs": "gdAuto.xs",
      "gdAuto.sm": "gdAuto.sm",
      "gdAuto.md": "gdAuto.md",
      "gdAuto.lg": "gdAuto.lg",
      "gdAuto.xl": "gdAuto.xl",
      "gdAuto.lt-sm": "gdAuto.lt-sm",
      "gdAuto.lt-md": "gdAuto.lt-md",
      "gdAuto.lt-lg": "gdAuto.lt-lg",
      "gdAuto.lt-xl": "gdAuto.lt-xl",
      "gdAuto.gt-xs": "gdAuto.gt-xs",
      "gdAuto.gt-sm": "gdAuto.gt-sm",
      "gdAuto.gt-md": "gdAuto.gt-md",
      "gdAuto.gt-lg": "gdAuto.gt-lg"
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultGridAutoDirective, [{
    type: Directive,
    args: [{
      selector: selector$6,
      inputs: inputs$6
    }]
  }], null, null);
})();
var DEFAULT_VALUE$4 = "auto";
var GridColumnStyleBuilder = class _GridColumnStyleBuilder extends StyleBuilder {
  buildStyles(input) {
    return {
      "grid-column": input || DEFAULT_VALUE$4
    };
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵGridColumnStyleBuilder_BaseFactory;
    return function GridColumnStyleBuilder_Factory(__ngFactoryType__) {
      return (ɵGridColumnStyleBuilder_BaseFactory || (ɵGridColumnStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(_GridColumnStyleBuilder)))(__ngFactoryType__ || _GridColumnStyleBuilder);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _GridColumnStyleBuilder,
    factory: _GridColumnStyleBuilder.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridColumnStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var GridColumnDirective = class _GridColumnDirective extends BaseDirective2 {
  DIRECTIVE_KEY = "grid-column";
  constructor(elementRef, styleBuilder, styler, marshal) {
    super(elementRef, styleBuilder, styler, marshal);
    this.init();
  }
  styleCache = columnCache;
  static ɵfac = function GridColumnDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GridColumnDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(GridColumnStyleBuilder), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(MediaMarshaller));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _GridColumnDirective,
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridColumnDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: GridColumnStyleBuilder
  }, {
    type: StyleUtils
  }, {
    type: MediaMarshaller
  }], null);
})();
var columnCache = /* @__PURE__ */ new Map();
var inputs$5 = ["gdColumn", "gdColumn.xs", "gdColumn.sm", "gdColumn.md", "gdColumn.lg", "gdColumn.xl", "gdColumn.lt-sm", "gdColumn.lt-md", "gdColumn.lt-lg", "gdColumn.lt-xl", "gdColumn.gt-xs", "gdColumn.gt-sm", "gdColumn.gt-md", "gdColumn.gt-lg"];
var selector$5 = `
  [gdColumn],
  [gdColumn.xs], [gdColumn.sm], [gdColumn.md], [gdColumn.lg], [gdColumn.xl],
  [gdColumn.lt-sm], [gdColumn.lt-md], [gdColumn.lt-lg], [gdColumn.lt-xl],
  [gdColumn.gt-xs], [gdColumn.gt-sm], [gdColumn.gt-md], [gdColumn.gt-lg]
`;
var DefaultGridColumnDirective = class _DefaultGridColumnDirective extends GridColumnDirective {
  inputs = inputs$5;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDefaultGridColumnDirective_BaseFactory;
    return function DefaultGridColumnDirective_Factory(__ngFactoryType__) {
      return (ɵDefaultGridColumnDirective_BaseFactory || (ɵDefaultGridColumnDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultGridColumnDirective)))(__ngFactoryType__ || _DefaultGridColumnDirective);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _DefaultGridColumnDirective,
    selectors: [["", "gdColumn", ""], ["", "gdColumn.xs", ""], ["", "gdColumn.sm", ""], ["", "gdColumn.md", ""], ["", "gdColumn.lg", ""], ["", "gdColumn.xl", ""], ["", "gdColumn.lt-sm", ""], ["", "gdColumn.lt-md", ""], ["", "gdColumn.lt-lg", ""], ["", "gdColumn.lt-xl", ""], ["", "gdColumn.gt-xs", ""], ["", "gdColumn.gt-sm", ""], ["", "gdColumn.gt-md", ""], ["", "gdColumn.gt-lg", ""]],
    inputs: {
      gdColumn: "gdColumn",
      "gdColumn.xs": "gdColumn.xs",
      "gdColumn.sm": "gdColumn.sm",
      "gdColumn.md": "gdColumn.md",
      "gdColumn.lg": "gdColumn.lg",
      "gdColumn.xl": "gdColumn.xl",
      "gdColumn.lt-sm": "gdColumn.lt-sm",
      "gdColumn.lt-md": "gdColumn.lt-md",
      "gdColumn.lt-lg": "gdColumn.lt-lg",
      "gdColumn.lt-xl": "gdColumn.lt-xl",
      "gdColumn.gt-xs": "gdColumn.gt-xs",
      "gdColumn.gt-sm": "gdColumn.gt-sm",
      "gdColumn.gt-md": "gdColumn.gt-md",
      "gdColumn.gt-lg": "gdColumn.gt-lg"
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultGridColumnDirective, [{
    type: Directive,
    args: [{
      selector: selector$5,
      inputs: inputs$5
    }]
  }], null, null);
})();
var DEFAULT_VALUE$3 = "none";
var AUTO_SPECIFIER$1 = "!";
var GridColumnsStyleBuilder = class _GridColumnsStyleBuilder extends StyleBuilder {
  buildStyles(input, parent) {
    input = input || DEFAULT_VALUE$3;
    let auto = false;
    if (input.endsWith(AUTO_SPECIFIER$1)) {
      input = input.substring(0, input.indexOf(AUTO_SPECIFIER$1));
      auto = true;
    }
    const css = {
      "display": parent.inline ? "inline-grid" : "grid",
      "grid-auto-columns": "",
      "grid-template-columns": ""
    };
    const key = auto ? "grid-auto-columns" : "grid-template-columns";
    css[key] = input;
    return css;
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵGridColumnsStyleBuilder_BaseFactory;
    return function GridColumnsStyleBuilder_Factory(__ngFactoryType__) {
      return (ɵGridColumnsStyleBuilder_BaseFactory || (ɵGridColumnsStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(_GridColumnsStyleBuilder)))(__ngFactoryType__ || _GridColumnsStyleBuilder);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _GridColumnsStyleBuilder,
    factory: _GridColumnsStyleBuilder.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridColumnsStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var GridColumnsDirective = class _GridColumnsDirective extends BaseDirective2 {
  DIRECTIVE_KEY = "grid-columns";
  get inline() {
    return this._inline;
  }
  set inline(val) {
    this._inline = coerceBooleanProperty(val);
  }
  _inline = false;
  constructor(elementRef, styleBuilder, styler, marshal) {
    super(elementRef, styleBuilder, styler, marshal);
    this.init();
  }
  // *********************************************
  // Protected methods
  // *********************************************
  updateWithValue(value) {
    this.styleCache = this.inline ? columnsInlineCache : columnsCache;
    this.addStyles(value, {
      inline: this.inline
    });
  }
  static ɵfac = function GridColumnsDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GridColumnsDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(GridColumnsStyleBuilder), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(MediaMarshaller));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _GridColumnsDirective,
    inputs: {
      inline: [0, "gdInline", "inline"]
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridColumnsDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: GridColumnsStyleBuilder
  }, {
    type: StyleUtils
  }, {
    type: MediaMarshaller
  }], {
    inline: [{
      type: Input,
      args: ["gdInline"]
    }]
  });
})();
var columnsCache = /* @__PURE__ */ new Map();
var columnsInlineCache = /* @__PURE__ */ new Map();
var inputs$4 = ["gdColumns", "gdColumns.xs", "gdColumns.sm", "gdColumns.md", "gdColumns.lg", "gdColumns.xl", "gdColumns.lt-sm", "gdColumns.lt-md", "gdColumns.lt-lg", "gdColumns.lt-xl", "gdColumns.gt-xs", "gdColumns.gt-sm", "gdColumns.gt-md", "gdColumns.gt-lg"];
var selector$4 = `
  [gdColumns],
  [gdColumns.xs], [gdColumns.sm], [gdColumns.md], [gdColumns.lg], [gdColumns.xl],
  [gdColumns.lt-sm], [gdColumns.lt-md], [gdColumns.lt-lg], [gdColumns.lt-xl],
  [gdColumns.gt-xs], [gdColumns.gt-sm], [gdColumns.gt-md], [gdColumns.gt-lg]
`;
var DefaultGridColumnsDirective = class _DefaultGridColumnsDirective extends GridColumnsDirective {
  inputs = inputs$4;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDefaultGridColumnsDirective_BaseFactory;
    return function DefaultGridColumnsDirective_Factory(__ngFactoryType__) {
      return (ɵDefaultGridColumnsDirective_BaseFactory || (ɵDefaultGridColumnsDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultGridColumnsDirective)))(__ngFactoryType__ || _DefaultGridColumnsDirective);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _DefaultGridColumnsDirective,
    selectors: [["", "gdColumns", ""], ["", "gdColumns.xs", ""], ["", "gdColumns.sm", ""], ["", "gdColumns.md", ""], ["", "gdColumns.lg", ""], ["", "gdColumns.xl", ""], ["", "gdColumns.lt-sm", ""], ["", "gdColumns.lt-md", ""], ["", "gdColumns.lt-lg", ""], ["", "gdColumns.lt-xl", ""], ["", "gdColumns.gt-xs", ""], ["", "gdColumns.gt-sm", ""], ["", "gdColumns.gt-md", ""], ["", "gdColumns.gt-lg", ""]],
    inputs: {
      gdColumns: "gdColumns",
      "gdColumns.xs": "gdColumns.xs",
      "gdColumns.sm": "gdColumns.sm",
      "gdColumns.md": "gdColumns.md",
      "gdColumns.lg": "gdColumns.lg",
      "gdColumns.xl": "gdColumns.xl",
      "gdColumns.lt-sm": "gdColumns.lt-sm",
      "gdColumns.lt-md": "gdColumns.lt-md",
      "gdColumns.lt-lg": "gdColumns.lt-lg",
      "gdColumns.lt-xl": "gdColumns.lt-xl",
      "gdColumns.gt-xs": "gdColumns.gt-xs",
      "gdColumns.gt-sm": "gdColumns.gt-sm",
      "gdColumns.gt-md": "gdColumns.gt-md",
      "gdColumns.gt-lg": "gdColumns.gt-lg"
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultGridColumnsDirective, [{
    type: Directive,
    args: [{
      selector: selector$4,
      inputs: inputs$4
    }]
  }], null, null);
})();
var DEFAULT_VALUE$2 = "0";
var GridGapStyleBuilder = class _GridGapStyleBuilder extends StyleBuilder {
  buildStyles(input, parent) {
    return {
      "display": parent.inline ? "inline-grid" : "grid",
      "grid-gap": input || DEFAULT_VALUE$2
    };
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵGridGapStyleBuilder_BaseFactory;
    return function GridGapStyleBuilder_Factory(__ngFactoryType__) {
      return (ɵGridGapStyleBuilder_BaseFactory || (ɵGridGapStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(_GridGapStyleBuilder)))(__ngFactoryType__ || _GridGapStyleBuilder);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _GridGapStyleBuilder,
    factory: _GridGapStyleBuilder.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridGapStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var GridGapDirective = class _GridGapDirective extends BaseDirective2 {
  DIRECTIVE_KEY = "grid-gap";
  get inline() {
    return this._inline;
  }
  set inline(val) {
    this._inline = coerceBooleanProperty(val);
  }
  _inline = false;
  constructor(elRef, styleUtils, styleBuilder, marshal) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.init();
  }
  // *********************************************
  // Protected methods
  // *********************************************
  updateWithValue(value) {
    this.styleCache = this.inline ? gapInlineCache : gapCache;
    this.addStyles(value, {
      inline: this.inline
    });
  }
  static ɵfac = function GridGapDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GridGapDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(GridGapStyleBuilder), ɵɵdirectiveInject(MediaMarshaller));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _GridGapDirective,
    inputs: {
      inline: [0, "gdInline", "inline"]
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridGapDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: StyleUtils
  }, {
    type: GridGapStyleBuilder
  }, {
    type: MediaMarshaller
  }], {
    inline: [{
      type: Input,
      args: ["gdInline"]
    }]
  });
})();
var gapCache = /* @__PURE__ */ new Map();
var gapInlineCache = /* @__PURE__ */ new Map();
var inputs$3 = ["gdGap", "gdGap.xs", "gdGap.sm", "gdGap.md", "gdGap.lg", "gdGap.xl", "gdGap.lt-sm", "gdGap.lt-md", "gdGap.lt-lg", "gdGap.lt-xl", "gdGap.gt-xs", "gdGap.gt-sm", "gdGap.gt-md", "gdGap.gt-lg"];
var selector$3 = `
  [gdGap],
  [gdGap.xs], [gdGap.sm], [gdGap.md], [gdGap.lg], [gdGap.xl],
  [gdGap.lt-sm], [gdGap.lt-md], [gdGap.lt-lg], [gdGap.lt-xl],
  [gdGap.gt-xs], [gdGap.gt-sm], [gdGap.gt-md], [gdGap.gt-lg]
`;
var DefaultGridGapDirective = class _DefaultGridGapDirective extends GridGapDirective {
  inputs = inputs$3;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDefaultGridGapDirective_BaseFactory;
    return function DefaultGridGapDirective_Factory(__ngFactoryType__) {
      return (ɵDefaultGridGapDirective_BaseFactory || (ɵDefaultGridGapDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultGridGapDirective)))(__ngFactoryType__ || _DefaultGridGapDirective);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _DefaultGridGapDirective,
    selectors: [["", "gdGap", ""], ["", "gdGap.xs", ""], ["", "gdGap.sm", ""], ["", "gdGap.md", ""], ["", "gdGap.lg", ""], ["", "gdGap.xl", ""], ["", "gdGap.lt-sm", ""], ["", "gdGap.lt-md", ""], ["", "gdGap.lt-lg", ""], ["", "gdGap.lt-xl", ""], ["", "gdGap.gt-xs", ""], ["", "gdGap.gt-sm", ""], ["", "gdGap.gt-md", ""], ["", "gdGap.gt-lg", ""]],
    inputs: {
      gdGap: "gdGap",
      "gdGap.xs": "gdGap.xs",
      "gdGap.sm": "gdGap.sm",
      "gdGap.md": "gdGap.md",
      "gdGap.lg": "gdGap.lg",
      "gdGap.xl": "gdGap.xl",
      "gdGap.lt-sm": "gdGap.lt-sm",
      "gdGap.lt-md": "gdGap.lt-md",
      "gdGap.lt-lg": "gdGap.lt-lg",
      "gdGap.lt-xl": "gdGap.lt-xl",
      "gdGap.gt-xs": "gdGap.gt-xs",
      "gdGap.gt-sm": "gdGap.gt-sm",
      "gdGap.gt-md": "gdGap.gt-md",
      "gdGap.gt-lg": "gdGap.gt-lg"
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultGridGapDirective, [{
    type: Directive,
    args: [{
      selector: selector$3,
      inputs: inputs$3
    }]
  }], null, null);
})();
var ROW_DEFAULT = "stretch";
var COL_DEFAULT = "stretch";
var GridAlignStyleBuilder = class _GridAlignStyleBuilder extends StyleBuilder {
  buildStyles(input) {
    return buildCss(input || ROW_DEFAULT);
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵGridAlignStyleBuilder_BaseFactory;
    return function GridAlignStyleBuilder_Factory(__ngFactoryType__) {
      return (ɵGridAlignStyleBuilder_BaseFactory || (ɵGridAlignStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(_GridAlignStyleBuilder)))(__ngFactoryType__ || _GridAlignStyleBuilder);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _GridAlignStyleBuilder,
    factory: _GridAlignStyleBuilder.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridAlignStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var GridAlignDirective = class _GridAlignDirective extends BaseDirective2 {
  DIRECTIVE_KEY = "grid-align";
  constructor(elementRef, styleBuilder, styler, marshal) {
    super(elementRef, styleBuilder, styler, marshal);
    this.init();
  }
  styleCache = alignCache;
  static ɵfac = function GridAlignDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GridAlignDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(GridAlignStyleBuilder), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(MediaMarshaller));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _GridAlignDirective,
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridAlignDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: GridAlignStyleBuilder
  }, {
    type: StyleUtils
  }, {
    type: MediaMarshaller
  }], null);
})();
var alignCache = /* @__PURE__ */ new Map();
var inputs$2 = ["gdGridAlign", "gdGridAlign.xs", "gdGridAlign.sm", "gdGridAlign.md", "gdGridAlign.lg", "gdGridAlign.xl", "gdGridAlign.lt-sm", "gdGridAlign.lt-md", "gdGridAlign.lt-lg", "gdGridAlign.lt-xl", "gdGridAlign.gt-xs", "gdGridAlign.gt-sm", "gdGridAlign.gt-md", "gdGridAlign.gt-lg"];
var selector$2 = `
  [gdGridAlign],
  [gdGridAlign.xs], [gdGridAlign.sm], [gdGridAlign.md], [gdGridAlign.lg],[gdGridAlign.xl],
  [gdGridAlign.lt-sm], [gdGridAlign.lt-md], [gdGridAlign.lt-lg], [gdGridAlign.lt-xl],
  [gdGridAlign.gt-xs], [gdGridAlign.gt-sm], [gdGridAlign.gt-md], [gdGridAlign.gt-lg]
`;
var DefaultGridAlignDirective = class _DefaultGridAlignDirective extends GridAlignDirective {
  inputs = inputs$2;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDefaultGridAlignDirective_BaseFactory;
    return function DefaultGridAlignDirective_Factory(__ngFactoryType__) {
      return (ɵDefaultGridAlignDirective_BaseFactory || (ɵDefaultGridAlignDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultGridAlignDirective)))(__ngFactoryType__ || _DefaultGridAlignDirective);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _DefaultGridAlignDirective,
    selectors: [["", "gdGridAlign", ""], ["", "gdGridAlign.xs", ""], ["", "gdGridAlign.sm", ""], ["", "gdGridAlign.md", ""], ["", "gdGridAlign.lg", ""], ["", "gdGridAlign.xl", ""], ["", "gdGridAlign.lt-sm", ""], ["", "gdGridAlign.lt-md", ""], ["", "gdGridAlign.lt-lg", ""], ["", "gdGridAlign.lt-xl", ""], ["", "gdGridAlign.gt-xs", ""], ["", "gdGridAlign.gt-sm", ""], ["", "gdGridAlign.gt-md", ""], ["", "gdGridAlign.gt-lg", ""]],
    inputs: {
      gdGridAlign: "gdGridAlign",
      "gdGridAlign.xs": "gdGridAlign.xs",
      "gdGridAlign.sm": "gdGridAlign.sm",
      "gdGridAlign.md": "gdGridAlign.md",
      "gdGridAlign.lg": "gdGridAlign.lg",
      "gdGridAlign.xl": "gdGridAlign.xl",
      "gdGridAlign.lt-sm": "gdGridAlign.lt-sm",
      "gdGridAlign.lt-md": "gdGridAlign.lt-md",
      "gdGridAlign.lt-lg": "gdGridAlign.lt-lg",
      "gdGridAlign.lt-xl": "gdGridAlign.lt-xl",
      "gdGridAlign.gt-xs": "gdGridAlign.gt-xs",
      "gdGridAlign.gt-sm": "gdGridAlign.gt-sm",
      "gdGridAlign.gt-md": "gdGridAlign.gt-md",
      "gdGridAlign.gt-lg": "gdGridAlign.gt-lg"
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultGridAlignDirective, [{
    type: Directive,
    args: [{
      selector: selector$2,
      inputs: inputs$2
    }]
  }], null, null);
})();
function buildCss(align = "") {
  const css = {}, [rowAxis, columnAxis] = align.split(" ");
  switch (rowAxis) {
    case "end":
      css["justify-self"] = "end";
      break;
    case "center":
      css["justify-self"] = "center";
      break;
    case "stretch":
      css["justify-self"] = "stretch";
      break;
    case "start":
      css["justify-self"] = "start";
      break;
    default:
      css["justify-self"] = ROW_DEFAULT;
      break;
  }
  switch (columnAxis) {
    case "end":
      css["align-self"] = "end";
      break;
    case "center":
      css["align-self"] = "center";
      break;
    case "stretch":
      css["align-self"] = "stretch";
      break;
    case "start":
      css["align-self"] = "start";
      break;
    default:
      css["align-self"] = COL_DEFAULT;
      break;
  }
  return css;
}
var DEFAULT_VALUE$1 = "auto";
var GridRowStyleBuilder = class _GridRowStyleBuilder extends StyleBuilder {
  buildStyles(input) {
    return {
      "grid-row": input || DEFAULT_VALUE$1
    };
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵGridRowStyleBuilder_BaseFactory;
    return function GridRowStyleBuilder_Factory(__ngFactoryType__) {
      return (ɵGridRowStyleBuilder_BaseFactory || (ɵGridRowStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(_GridRowStyleBuilder)))(__ngFactoryType__ || _GridRowStyleBuilder);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _GridRowStyleBuilder,
    factory: _GridRowStyleBuilder.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridRowStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var GridRowDirective = class _GridRowDirective extends BaseDirective2 {
  DIRECTIVE_KEY = "grid-row";
  constructor(elementRef, styleBuilder, styler, marshal) {
    super(elementRef, styleBuilder, styler, marshal);
    this.init();
  }
  styleCache = rowCache;
  static ɵfac = function GridRowDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GridRowDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(GridRowStyleBuilder), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(MediaMarshaller));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _GridRowDirective,
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridRowDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: GridRowStyleBuilder
  }, {
    type: StyleUtils
  }, {
    type: MediaMarshaller
  }], null);
})();
var rowCache = /* @__PURE__ */ new Map();
var inputs$1 = ["gdRow", "gdRow.xs", "gdRow.sm", "gdRow.md", "gdRow.lg", "gdRow.xl", "gdRow.lt-sm", "gdRow.lt-md", "gdRow.lt-lg", "gdRow.lt-xl", "gdRow.gt-xs", "gdRow.gt-sm", "gdRow.gt-md", "gdRow.gt-lg"];
var selector$1 = `
  [gdRow],
  [gdRow.xs], [gdRow.sm], [gdRow.md], [gdRow.lg], [gdRow.xl],
  [gdRow.lt-sm], [gdRow.lt-md], [gdRow.lt-lg], [gdRow.lt-xl],
  [gdRow.gt-xs], [gdRow.gt-sm], [gdRow.gt-md], [gdRow.gt-lg]
`;
var DefaultGridRowDirective = class _DefaultGridRowDirective extends GridRowDirective {
  inputs = inputs$1;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDefaultGridRowDirective_BaseFactory;
    return function DefaultGridRowDirective_Factory(__ngFactoryType__) {
      return (ɵDefaultGridRowDirective_BaseFactory || (ɵDefaultGridRowDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultGridRowDirective)))(__ngFactoryType__ || _DefaultGridRowDirective);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _DefaultGridRowDirective,
    selectors: [["", "gdRow", ""], ["", "gdRow.xs", ""], ["", "gdRow.sm", ""], ["", "gdRow.md", ""], ["", "gdRow.lg", ""], ["", "gdRow.xl", ""], ["", "gdRow.lt-sm", ""], ["", "gdRow.lt-md", ""], ["", "gdRow.lt-lg", ""], ["", "gdRow.lt-xl", ""], ["", "gdRow.gt-xs", ""], ["", "gdRow.gt-sm", ""], ["", "gdRow.gt-md", ""], ["", "gdRow.gt-lg", ""]],
    inputs: {
      gdRow: "gdRow",
      "gdRow.xs": "gdRow.xs",
      "gdRow.sm": "gdRow.sm",
      "gdRow.md": "gdRow.md",
      "gdRow.lg": "gdRow.lg",
      "gdRow.xl": "gdRow.xl",
      "gdRow.lt-sm": "gdRow.lt-sm",
      "gdRow.lt-md": "gdRow.lt-md",
      "gdRow.lt-lg": "gdRow.lt-lg",
      "gdRow.lt-xl": "gdRow.lt-xl",
      "gdRow.gt-xs": "gdRow.gt-xs",
      "gdRow.gt-sm": "gdRow.gt-sm",
      "gdRow.gt-md": "gdRow.gt-md",
      "gdRow.gt-lg": "gdRow.gt-lg"
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultGridRowDirective, [{
    type: Directive,
    args: [{
      selector: selector$1,
      inputs: inputs$1
    }]
  }], null, null);
})();
var DEFAULT_VALUE = "none";
var AUTO_SPECIFIER = "!";
var GridRowsStyleBuilder = class _GridRowsStyleBuilder extends StyleBuilder {
  buildStyles(input, parent) {
    input = input || DEFAULT_VALUE;
    let auto = false;
    if (input.endsWith(AUTO_SPECIFIER)) {
      input = input.substring(0, input.indexOf(AUTO_SPECIFIER));
      auto = true;
    }
    const css = {
      "display": parent.inline ? "inline-grid" : "grid",
      "grid-auto-rows": "",
      "grid-template-rows": ""
    };
    const key = auto ? "grid-auto-rows" : "grid-template-rows";
    css[key] = input;
    return css;
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵGridRowsStyleBuilder_BaseFactory;
    return function GridRowsStyleBuilder_Factory(__ngFactoryType__) {
      return (ɵGridRowsStyleBuilder_BaseFactory || (ɵGridRowsStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(_GridRowsStyleBuilder)))(__ngFactoryType__ || _GridRowsStyleBuilder);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _GridRowsStyleBuilder,
    factory: _GridRowsStyleBuilder.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridRowsStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var GridRowsDirective = class _GridRowsDirective extends BaseDirective2 {
  DIRECTIVE_KEY = "grid-rows";
  get inline() {
    return this._inline;
  }
  set inline(val) {
    this._inline = coerceBooleanProperty(val);
  }
  _inline = false;
  constructor(elementRef, styleBuilder, styler, marshal) {
    super(elementRef, styleBuilder, styler, marshal);
    this.init();
  }
  // *********************************************
  // Protected methods
  // *********************************************
  updateWithValue(value) {
    this.styleCache = this.inline ? rowsInlineCache : rowsCache;
    this.addStyles(value, {
      inline: this.inline
    });
  }
  static ɵfac = function GridRowsDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GridRowsDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(GridRowsStyleBuilder), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(MediaMarshaller));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _GridRowsDirective,
    inputs: {
      inline: [0, "gdInline", "inline"]
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridRowsDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: GridRowsStyleBuilder
  }, {
    type: StyleUtils
  }, {
    type: MediaMarshaller
  }], {
    inline: [{
      type: Input,
      args: ["gdInline"]
    }]
  });
})();
var rowsCache = /* @__PURE__ */ new Map();
var rowsInlineCache = /* @__PURE__ */ new Map();
var inputs = ["gdRows", "gdRows.xs", "gdRows.sm", "gdRows.md", "gdRows.lg", "gdRows.xl", "gdRows.lt-sm", "gdRows.lt-md", "gdRows.lt-lg", "gdRows.lt-xl", "gdRows.gt-xs", "gdRows.gt-sm", "gdRows.gt-md", "gdRows.gt-lg"];
var selector = `
  [gdRows],
  [gdRows.xs], [gdRows.sm], [gdRows.md], [gdRows.lg], [gdRows.xl],
  [gdRows.lt-sm], [gdRows.lt-md], [gdRows.lt-lg], [gdRows.lt-xl],
  [gdRows.gt-xs], [gdRows.gt-sm], [gdRows.gt-md], [gdRows.gt-lg]
`;
var DefaultGridRowsDirective = class _DefaultGridRowsDirective extends GridRowsDirective {
  inputs = inputs;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDefaultGridRowsDirective_BaseFactory;
    return function DefaultGridRowsDirective_Factory(__ngFactoryType__) {
      return (ɵDefaultGridRowsDirective_BaseFactory || (ɵDefaultGridRowsDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultGridRowsDirective)))(__ngFactoryType__ || _DefaultGridRowsDirective);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _DefaultGridRowsDirective,
    selectors: [["", "gdRows", ""], ["", "gdRows.xs", ""], ["", "gdRows.sm", ""], ["", "gdRows.md", ""], ["", "gdRows.lg", ""], ["", "gdRows.xl", ""], ["", "gdRows.lt-sm", ""], ["", "gdRows.lt-md", ""], ["", "gdRows.lt-lg", ""], ["", "gdRows.lt-xl", ""], ["", "gdRows.gt-xs", ""], ["", "gdRows.gt-sm", ""], ["", "gdRows.gt-md", ""], ["", "gdRows.gt-lg", ""]],
    inputs: {
      gdRows: "gdRows",
      "gdRows.xs": "gdRows.xs",
      "gdRows.sm": "gdRows.sm",
      "gdRows.md": "gdRows.md",
      "gdRows.lg": "gdRows.lg",
      "gdRows.xl": "gdRows.xl",
      "gdRows.lt-sm": "gdRows.lt-sm",
      "gdRows.lt-md": "gdRows.lt-md",
      "gdRows.lt-lg": "gdRows.lt-lg",
      "gdRows.lt-xl": "gdRows.lt-xl",
      "gdRows.gt-xs": "gdRows.gt-xs",
      "gdRows.gt-sm": "gdRows.gt-sm",
      "gdRows.gt-md": "gdRows.gt-md",
      "gdRows.gt-lg": "gdRows.gt-lg"
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultGridRowsDirective, [{
    type: Directive,
    args: [{
      selector,
      inputs
    }]
  }], null, null);
})();
var ALL_DIRECTIVES = [DefaultGridAlignDirective, DefaultGridAlignColumnsDirective, DefaultGridAlignRowsDirective, DefaultGridAreaDirective, DefaultGridAreasDirective, DefaultGridAutoDirective, DefaultGridColumnDirective, DefaultGridColumnsDirective, DefaultGridGapDirective, DefaultGridRowDirective, DefaultGridRowsDirective];
var GridModule = class _GridModule {
  static ɵfac = function GridModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GridModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _GridModule,
    imports: [CoreModule, DefaultGridAlignDirective, DefaultGridAlignColumnsDirective, DefaultGridAlignRowsDirective, DefaultGridAreaDirective, DefaultGridAreasDirective, DefaultGridAutoDirective, DefaultGridColumnDirective, DefaultGridColumnsDirective, DefaultGridGapDirective, DefaultGridRowDirective, DefaultGridRowsDirective],
    exports: [DefaultGridAlignDirective, DefaultGridAlignColumnsDirective, DefaultGridAlignRowsDirective, DefaultGridAreaDirective, DefaultGridAreasDirective, DefaultGridAutoDirective, DefaultGridColumnDirective, DefaultGridColumnsDirective, DefaultGridGapDirective, DefaultGridRowDirective, DefaultGridRowsDirective]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CoreModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridModule, [{
    type: NgModule,
    args: [{
      imports: [CoreModule, ...ALL_DIRECTIVES],
      declarations: [],
      exports: [...ALL_DIRECTIVES]
    }]
  }], null, null);
})();

export {
  GridAlignColumnsStyleBuilder,
  GridAlignColumnsDirective,
  DefaultGridAlignColumnsDirective,
  GridAlignRowsStyleBuilder,
  GridAlignRowsDirective,
  DefaultGridAlignRowsDirective,
  GridAreaStyleBuilder,
  GridAreaDirective,
  DefaultGridAreaDirective,
  GridAreasStyleBuiler,
  GridAreasDirective,
  DefaultGridAreasDirective,
  GridAutoStyleBuilder,
  GridAutoDirective,
  DefaultGridAutoDirective,
  GridColumnStyleBuilder,
  GridColumnDirective,
  DefaultGridColumnDirective,
  GridColumnsStyleBuilder,
  GridColumnsDirective,
  DefaultGridColumnsDirective,
  GridGapStyleBuilder,
  GridGapDirective,
  DefaultGridGapDirective,
  GridAlignStyleBuilder,
  GridAlignDirective,
  DefaultGridAlignDirective,
  GridRowStyleBuilder,
  GridRowDirective,
  DefaultGridRowDirective,
  GridRowsStyleBuilder,
  GridRowsDirective,
  DefaultGridRowsDirective,
  GridModule
};
//# sourceMappingURL=chunk-NVRRZBIY.js.map
