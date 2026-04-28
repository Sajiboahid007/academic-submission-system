import {
  BaseComponent,
  PARENT_INSTANCE
} from "./chunk-RPYXYHBN.js";
import {
  BaseStyle
} from "./chunk-FNCVWXVE.js";
import {
  PrimeTemplate,
  SharedModule
} from "./chunk-4MTH6KWJ.js";
import {
  Bind
} from "./chunk-RK5R7LWN.js";
import {
  C
} from "./chunk-5TB7H7BT.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle,
  NgTemplateOutlet
} from "./chunk-QNLDJTT2.js";
import "./chunk-EAPXDH6R.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  ViewEncapsulation,
  forwardRef,
  inject,
  setClassMetadata,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetInheritedFactory,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵpureFunction3,
  ɵɵpureFunction7,
  ɵɵqueryRefresh,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate2
} from "./chunk-O7OAUIW2.js";
import "./chunk-RSS3ODKE.js";
import "./chunk-GOMI4DH3.js";

// node_modules/@primeuix/styles/dist/metergroup/index.mjs
var style = "\n    .p-metergroup {\n        display: flex;\n        gap: dt('metergroup.gap');\n    }\n\n    .p-metergroup-meters {\n        display: flex;\n        background: dt('metergroup.meters.background');\n        border-radius: dt('metergroup.border.radius');\n    }\n\n    .p-metergroup-label-list {\n        display: flex;\n        flex-wrap: wrap;\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n    }\n\n    .p-metergroup-label {\n        display: inline-flex;\n        align-items: center;\n        gap: dt('metergroup.label.gap');\n    }\n\n    .p-metergroup-label-marker {\n        display: inline-flex;\n        width: dt('metergroup.label.marker.size');\n        height: dt('metergroup.label.marker.size');\n        border-radius: 100%;\n    }\n\n    .p-metergroup-label-icon {\n        font-size: dt('metergroup.label.icon.size');\n        width: dt('metergroup.label.icon.size');\n        height: dt('metergroup.label.icon.size');\n    }\n\n    .p-metergroup-horizontal {\n        flex-direction: column;\n    }\n\n    .p-metergroup-label-list-horizontal {\n        gap: dt('metergroup.label.list.horizontal.gap');\n    }\n\n    .p-metergroup-horizontal .p-metergroup-meters {\n        height: dt('metergroup.meters.size');\n    }\n\n    .p-metergroup-horizontal .p-metergroup-meter:first-of-type {\n        border-start-start-radius: dt('metergroup.border.radius');\n        border-end-start-radius: dt('metergroup.border.radius');\n    }\n\n    .p-metergroup-horizontal .p-metergroup-meter:last-of-type {\n        border-start-end-radius: dt('metergroup.border.radius');\n        border-end-end-radius: dt('metergroup.border.radius');\n    }\n\n    .p-metergroup-vertical {\n        flex-direction: row;\n    }\n\n    .p-metergroup-label-list-vertical {\n        flex-direction: column;\n        gap: dt('metergroup.label.list.vertical.gap');\n    }\n\n    .p-metergroup-vertical .p-metergroup-meters {\n        flex-direction: column;\n        width: dt('metergroup.meters.size');\n        height: 100%;\n    }\n\n    .p-metergroup-vertical .p-metergroup-label-list {\n        align-items: flex-start;\n    }\n\n    .p-metergroup-vertical .p-metergroup-meter:first-of-type {\n        border-start-start-radius: dt('metergroup.border.radius');\n        border-start-end-radius: dt('metergroup.border.radius');\n    }\n\n    .p-metergroup-vertical .p-metergroup-meter:last-of-type {\n        border-end-start-radius: dt('metergroup.border.radius');\n        border-end-end-radius: dt('metergroup.border.radius');\n    }\n";

// node_modules/primeng/fesm2022/primeng-metergroup.mjs
var _c0 = (a0, a1) => ({
  $implicit: a0,
  icon: a1
});
var _c1 = (a0) => ({
  color: a0
});
var _c2 = (a0) => ({
  backgroundColor: a0
});
function MeterGroupLabel_li_1_ng_container_1_i_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "i", 6);
  }
  if (rf & 2) {
    const labelItem_r1 = ɵɵnextContext(2).$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(labelItem_r1.icon);
    ɵɵproperty("ngClass", ctx_r1.cx("labelIcon"))("pBind", ctx_r1.ptm("labelIcon"))("ngStyle", ɵɵpureFunction1(5, _c1, labelItem_r1.color));
  }
}
function MeterGroupLabel_li_1_ng_container_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 7);
  }
  if (rf & 2) {
    const labelItem_r1 = ɵɵnextContext(2).$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cx("labelMarker"));
    ɵɵproperty("pBind", ctx_r1.ptm("labelMarker"))("ngStyle", ɵɵpureFunction1(4, _c2, labelItem_r1.color));
  }
}
function MeterGroupLabel_li_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MeterGroupLabel_li_1_ng_container_1_i_1_Template, 1, 7, "i", 4)(2, MeterGroupLabel_li_1_ng_container_1_span_2_Template, 1, 6, "span", 5);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const labelItem_r1 = ɵɵnextContext().$implicit;
    ɵɵadvance();
    ɵɵproperty("ngIf", labelItem_r1.icon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !labelItem_r1.icon);
  }
}
function MeterGroupLabel_li_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MeterGroupLabel_li_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 0);
    ɵɵtemplate(1, MeterGroupLabel_li_1_ng_container_1_Template, 3, 2, "ng-container", 2)(2, MeterGroupLabel_li_1_ng_container_2_Template, 1, 0, "ng-container", 3);
    ɵɵelementStart(3, "span", 0);
    ɵɵtext(4);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const labelItem_r1 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cx("label"));
    ɵɵproperty("pBind", ctx_r1.ptm("label"));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.iconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.iconTemplate)("ngTemplateOutletContext", ɵɵpureFunction2(11, _c0, labelItem_r1, labelItem_r1.icon));
    ɵɵadvance();
    ɵɵclassMap(ctx_r1.cx("labelText"));
    ɵɵproperty("pBind", ctx_r1.ptm("labelText"));
    ɵɵadvance();
    ɵɵtextInterpolate2("", labelItem_r1.label, " (", ctx_r1.parentInstance.percentValue(labelItem_r1.value), ")");
  }
}
var _c3 = ["label"];
var _c4 = ["meter"];
var _c5 = ["end"];
var _c6 = ["start"];
var _c7 = ["icon"];
var _c8 = (a0, a1, a2) => ({
  $implicit: a0,
  totalPercent: a1,
  percentages: a2
});
var _c9 = (a0, a1, a2, a3, a4, a5, a6) => ({
  $implicit: a0,
  index: a1,
  orientation: a2,
  class: a3,
  size: a4,
  totalPercent: a5,
  dataP: a6
});
function MeterGroup_Conditional_0_p_meterGroupLabel_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "p-meterGroupLabel", 4);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("value", ctx_r0.value)("labelPosition", ctx_r0.labelPosition)("labelOrientation", ctx_r0.labelOrientation)("min", ctx_r0.min)("max", ctx_r0.max)("iconTemplate", ctx_r0.iconTemplate || ctx_r0._iconTemplate)("pt", ctx_r0.pt)("unstyled", ctx_r0.unstyled());
  }
}
function MeterGroup_Conditional_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MeterGroup_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MeterGroup_Conditional_0_p_meterGroupLabel_0_Template, 1, 8, "p-meterGroupLabel", 3)(1, MeterGroup_Conditional_0_ng_container_1_Template, 1, 0, "ng-container", 0);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngIf", !ctx_r0.labelTemplate && !ctx_r0._labelTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.labelTemplate || ctx_r0.labelTemplate)("ngTemplateOutletContext", ɵɵpureFunction3(3, _c8, ctx_r0.value, ctx_r0.totalPercent(), ctx_r0.percentages()));
  }
}
function MeterGroup_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MeterGroup_ng_container_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MeterGroup_ng_container_3_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "span", 6);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const meterItem_r2 = ɵɵnextContext().$implicit;
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵclassMap(ctx_r0.cx("meter"));
    ɵɵproperty("pBind", ctx_r0.ptm("meter"))("ngStyle", ctx_r0.meterStyle(meterItem_r2));
    ɵɵattribute("data-p", ctx_r0.dataP);
  }
}
function MeterGroup_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MeterGroup_ng_container_3_ng_container_1_Template, 1, 0, "ng-container", 0)(2, MeterGroup_ng_container_3_ng_container_2_Template, 2, 5, "ng-container", 5);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const meterItem_r2 = ctx.$implicit;
    const index_r3 = ctx.index;
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.meterTemplate || ctx_r0._meterTemplate)("ngTemplateOutletContext", ɵɵpureFunction7(3, _c9, meterItem_r2, index_r3, ctx_r0.orientation, ctx_r0.cx("meter"), ctx_r0.percentValue(meterItem_r2.value), ctx_r0.totalPercent(), ctx_r0.dataP));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.meterTemplate && !ctx_r0._meterTemplate && meterItem_r2.value > 0);
  }
}
function MeterGroup_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MeterGroup_Conditional_5_p_meterGroupLabel_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "p-meterGroupLabel", 4);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("value", ctx_r0.value)("labelPosition", ctx_r0.labelPosition)("labelOrientation", ctx_r0.labelOrientation)("min", ctx_r0.min)("max", ctx_r0.max)("iconTemplate", ctx_r0.iconTemplate || ctx_r0._iconTemplate)("pt", ctx_r0.pt)("unstyled", ctx_r0.unstyled());
  }
}
function MeterGroup_Conditional_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MeterGroup_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MeterGroup_Conditional_5_p_meterGroupLabel_0_Template, 1, 8, "p-meterGroupLabel", 3)(1, MeterGroup_Conditional_5_ng_container_1_Template, 1, 0, "ng-container", 0);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngIf", !ctx_r0.labelTemplate && !ctx_r0._labelTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.labelTemplate || ctx_r0._labelTemplate)("ngTemplateOutletContext", ɵɵpureFunction3(3, _c8, ctx_r0.value, ctx_r0.totalPercent(), ctx_r0.percentages()));
  }
}
var classes = {
  root: ({
    instance
  }) => ["p-metergroup p-component", {
    "p-metergroup-horizontal": instance.orientation === "horizontal",
    "p-metergroup-vertical": instance.orientation === "vertical"
  }],
  meters: "p-metergroup-meters",
  meter: "p-metergroup-meter",
  labelList: ({
    instance
  }) => ["p-metergroup-label-list", {
    "p-metergroup-label-list-vertical": instance.labelOrientation === "vertical",
    "p-metergroup-label-list-horizontal": instance.labelOrientation === "horizontal"
  }],
  label: "p-metergroup-label",
  labelIcon: "p-metergroup-label-icon",
  labelMarker: "p-metergroup-label-marker",
  labelText: "p-metergroup-label-text"
};
var MeterGroupStyle = class _MeterGroupStyle extends BaseStyle {
  name = "metergroup";
  style = style;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵMeterGroupStyle_BaseFactory;
    return function MeterGroupStyle_Factory(__ngFactoryType__) {
      return (ɵMeterGroupStyle_BaseFactory || (ɵMeterGroupStyle_BaseFactory = ɵɵgetInheritedFactory(_MeterGroupStyle)))(__ngFactoryType__ || _MeterGroupStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _MeterGroupStyle,
    factory: _MeterGroupStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MeterGroupStyle, [{
    type: Injectable
  }], null, null);
})();
var MeterGroupClasses;
(function(MeterGroupClasses2) {
  MeterGroupClasses2["root"] = "p-metergroup";
  MeterGroupClasses2["meters"] = "p-metergroup-meters";
  MeterGroupClasses2["meter"] = "p-metergroup-meter";
  MeterGroupClasses2["labelList"] = "p-metergroup-label-list";
  MeterGroupClasses2["label"] = "p-metergroup-label";
  MeterGroupClasses2["labelIcon"] = "p-metergroup-label-icon";
  MeterGroupClasses2["labelMarker"] = "p-metergroup-label-marker";
  MeterGroupClasses2["labelText"] = "p-metergroup-label-text";
})(MeterGroupClasses || (MeterGroupClasses = {}));
var METERGROUP_INSTANCE = new InjectionToken("METERGROUP_INSTANCE");
var MeterGroupLabel = class _MeterGroupLabel extends BaseComponent {
  value = [];
  labelPosition = "end";
  labelOrientation = "horizontal";
  min;
  max;
  iconTemplate;
  parentInstance = inject(forwardRef(() => MeterGroup));
  _componentStyle = inject(MeterGroupStyle);
  get dataP() {
    return this.cn({
      [this.labelOrientation]: this.labelOrientation
    });
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵMeterGroupLabel_BaseFactory;
    return function MeterGroupLabel_Factory(__ngFactoryType__) {
      return (ɵMeterGroupLabel_BaseFactory || (ɵMeterGroupLabel_BaseFactory = ɵɵgetInheritedFactory(_MeterGroupLabel)))(__ngFactoryType__ || _MeterGroupLabel);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _MeterGroupLabel,
    selectors: [["p-meterGroupLabel"], ["p-metergrouplabel"]],
    inputs: {
      value: "value",
      labelPosition: "labelPosition",
      labelOrientation: "labelOrientation",
      min: "min",
      max: "max",
      iconTemplate: "iconTemplate"
    },
    features: [ɵɵInheritDefinitionFeature],
    decls: 2,
    vars: 6,
    consts: [[3, "pBind"], [3, "class", "pBind", 4, "ngFor", "ngForOf", "ngForTrackBy"], [4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "class", "ngClass", "pBind", "ngStyle", 4, "ngIf"], [3, "class", "pBind", "ngStyle", 4, "ngIf"], [3, "ngClass", "pBind", "ngStyle"], [3, "pBind", "ngStyle"]],
    template: function MeterGroupLabel_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "ol", 0);
        ɵɵtemplate(1, MeterGroupLabel_li_1_Template, 5, 14, "li", 1);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.cx("labelList"));
        ɵɵproperty("pBind", ctx.ptm("labelList"));
        ɵɵattribute("data-p", ctx.dataP);
        ɵɵadvance();
        ɵɵproperty("ngForOf", ctx.value)("ngForTrackBy", ctx.parentInstance.trackByFn);
      }
    },
    dependencies: [CommonModule, NgClass, NgForOf, NgIf, NgTemplateOutlet, NgStyle, SharedModule, Bind],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MeterGroupLabel, [{
    type: Component,
    args: [{
      selector: "p-meterGroupLabel, p-metergrouplabel",
      standalone: true,
      imports: [CommonModule, SharedModule, Bind],
      template: `
        <ol [class]="cx('labelList')" [pBind]="ptm('labelList')" [attr.data-p]="dataP">
            <li *ngFor="let labelItem of value; let index = index; trackBy: parentInstance.trackByFn" [class]="cx('label')" [pBind]="ptm('label')">
                <ng-container *ngIf="!iconTemplate">
                    <i *ngIf="labelItem.icon" [class]="labelItem.icon" [ngClass]="cx('labelIcon')" [pBind]="ptm('labelIcon')" [ngStyle]="{ color: labelItem.color }"></i>
                    <span *ngIf="!labelItem.icon" [class]="cx('labelMarker')" [pBind]="ptm('labelMarker')" [ngStyle]="{ backgroundColor: labelItem.color }"></span>
                </ng-container>
                <ng-container *ngTemplateOutlet="iconTemplate; context: { $implicit: labelItem, icon: labelItem.icon }"></ng-container>
                <span [class]="cx('labelText')" [pBind]="ptm('labelText')">{{ labelItem.label }} ({{ parentInstance.percentValue(labelItem.value) }})</span>
            </li>
        </ol>
    `
    }]
  }], null, {
    value: [{
      type: Input
    }],
    labelPosition: [{
      type: Input
    }],
    labelOrientation: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    iconTemplate: [{
      type: Input
    }]
  });
})();
var MeterGroup = class _MeterGroup extends BaseComponent {
  componentName = "MeterGroup";
  $pcMeterGroup = inject(METERGROUP_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  /**
   * Current value of the metergroup.
   * @group Props
   */
  value;
  /**
   * Mininum boundary value.
   * @group Props
   */
  min = 0;
  /**
   * Maximum boundary value.
   * @group Props
   */
  max = 100;
  /**
   * Specifies the layout of the component, valid values are 'horizontal' and 'vertical'.
   * @group Props
   */
  orientation = "horizontal";
  /**
   * Specifies the label position of the component, valid values are 'start' and 'end'.
   * @group Props
   */
  labelPosition = "end";
  /**
   * Specifies the label orientation of the component, valid values are 'horizontal' and 'vertical'.
   * @group Props
   */
  labelOrientation = "horizontal";
  /**
   * Style class of the element.
   * @deprecated since v20.0.0, use `class` instead.
   * @group Props
   */
  styleClass;
  get vertical() {
    return this.orientation === "vertical";
  }
  /**
   * Custom label template.
   * @param {MeterGroupLabelTemplateContext} context - label context.
   * @see {@link MeterGroupLabelTemplateContext}
   * @group Templates
   */
  labelTemplate;
  /**
   * Custom meter template.
   * @param {MeterGroupMeterTemplateContext} context - meter context.
   * @see {@link MeterGroupMeterTemplateContext}
   * @group Templates
   */
  meterTemplate;
  /**
   * Custom end template.
   * @param {MeterGroupLabelTemplateContext} context - end context.
   * @see {@link MeterGroupLabelTemplateContext}
   * @group Templates
   */
  endTemplate;
  /**
   * Custom start template.
   * @param {MeterGroupLabelTemplateContext} context - start context.
   * @see {@link MeterGroupLabelTemplateContext}
   * @group Templates
   */
  startTemplate;
  /**
   * Custom icon template.
   * @param {MeterGroupIconTemplateContext} context - icon context.
   * @see {@link MeterGroupIconTemplateContext}
   * @group Templates
   */
  iconTemplate;
  templates;
  _labelTemplate;
  _meterTemplate;
  _endTemplate;
  _startTemplate;
  _iconTemplate;
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  _componentStyle = inject(MeterGroupStyle);
  constructor() {
    super();
  }
  onAfterViewInit() {
    const _container = this.el.nativeElement;
    const height = C(_container);
    this.vertical && (_container.style.height = height + "px");
  }
  onAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "label":
          this._labelTemplate = item.template;
          break;
        case "meter":
          this._meterTemplate = item.template;
          break;
        case "icon":
          this._iconTemplate = item.template;
          break;
        case "start":
          this._startTemplate = item.template;
          break;
        case "end":
          this._endTemplate = item.template;
          break;
      }
    });
  }
  percent(meter = 0) {
    if (this.max === this.min) {
      return 100;
    }
    const percentOfItem = (meter - this.min) / (this.max - this.min) * 100;
    return Math.round(Math.max(0, Math.min(100, percentOfItem)));
  }
  percentValue(meter) {
    return this.percent(meter) + "%";
  }
  meterStyle(val) {
    return {
      backgroundColor: val.color,
      width: this.orientation === "horizontal" && this.percentValue(val.value || 0),
      height: this.orientation === "vertical" && this.percentValue(val.value || 0)
    };
  }
  totalPercent() {
    if (!this.value) {
      return 0;
    }
    return this.percent(this.value.reduce((total, val) => total + (val.value || 0), 0));
  }
  percentages() {
    if (!this.value) {
      return [];
    }
    let sum = 0;
    const sumsArray = [];
    this.value.forEach((item) => {
      sum += item.value || 0;
      sumsArray.push(sum);
    });
    return sumsArray;
  }
  trackByFn(index) {
    return index;
  }
  get dataP() {
    return this.cn({
      [this.orientation]: this.orientation
    });
  }
  static ɵfac = function MeterGroup_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MeterGroup)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MeterGroup,
    selectors: [["p-meterGroup"], ["p-metergroup"], ["p-meter-group"]],
    contentQueries: function MeterGroup_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c3, 4)(dirIndex, _c4, 4)(dirIndex, _c5, 4)(dirIndex, _c6, 4)(dirIndex, _c7, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.labelTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.meterTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.endTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.startTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.iconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    hostVars: 7,
    hostBindings: function MeterGroup_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("aria-valuemin", ctx.min)("role", "meter")("aria-valuemax", ctx.max)("aria-valuenow", ctx.totalPercent())("data-p", ctx.dataP);
        ɵɵclassMap(ctx.cn(ctx.cx("root"), ctx.styleClass));
      }
    },
    inputs: {
      value: "value",
      min: "min",
      max: "max",
      orientation: "orientation",
      labelPosition: "labelPosition",
      labelOrientation: "labelOrientation",
      styleClass: "styleClass"
    },
    features: [ɵɵProvidersFeature([MeterGroupStyle, {
      provide: METERGROUP_INSTANCE,
      useExisting: _MeterGroup
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _MeterGroup
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    decls: 6,
    vars: 20,
    consts: [[4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "pBind"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "value", "labelPosition", "labelOrientation", "min", "max", "iconTemplate", "pt", "unstyled", 4, "ngIf"], [3, "value", "labelPosition", "labelOrientation", "min", "max", "iconTemplate", "pt", "unstyled"], [4, "ngIf"], [3, "pBind", "ngStyle"]],
    template: function MeterGroup_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵconditionalCreate(0, MeterGroup_Conditional_0_Template, 2, 7);
        ɵɵtemplate(1, MeterGroup_ng_container_1_Template, 1, 0, "ng-container", 0);
        ɵɵelementStart(2, "div", 1);
        ɵɵtemplate(3, MeterGroup_ng_container_3_Template, 3, 11, "ng-container", 2);
        ɵɵelementEnd();
        ɵɵtemplate(4, MeterGroup_ng_container_4_Template, 1, 0, "ng-container", 0);
        ɵɵconditionalCreate(5, MeterGroup_Conditional_5_Template, 2, 7);
      }
      if (rf & 2) {
        ɵɵconditional(ctx.labelPosition === "start" ? 0 : -1);
        ɵɵadvance();
        ɵɵproperty("ngTemplateOutlet", ctx.startTemplate || ctx._startTemplate)("ngTemplateOutletContext", ɵɵpureFunction3(12, _c8, ctx.value, ctx.totalPercent(), ctx.percentages()));
        ɵɵadvance();
        ɵɵclassMap(ctx.cx("meters"));
        ɵɵproperty("pBind", ctx.ptm("meters"));
        ɵɵattribute("data-p", ctx.dataP);
        ɵɵadvance();
        ɵɵproperty("ngForOf", ctx.value)("ngForTrackBy", ctx.trackByFn);
        ɵɵadvance();
        ɵɵproperty("ngTemplateOutlet", ctx.endTemplate || ctx._endTemplate)("ngTemplateOutletContext", ɵɵpureFunction3(16, _c8, ctx.value, ctx.totalPercent(), ctx.percentages()));
        ɵɵadvance();
        ɵɵconditional(ctx.labelPosition === "end" ? 5 : -1);
      }
    },
    dependencies: [CommonModule, NgForOf, NgIf, NgTemplateOutlet, NgStyle, MeterGroupLabel, SharedModule, Bind],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MeterGroup, [{
    type: Component,
    args: [{
      selector: "p-meterGroup, p-metergroup, p-meter-group",
      standalone: true,
      imports: [CommonModule, MeterGroupLabel, SharedModule, Bind],
      template: `
        @if (labelPosition === 'start') {
            <p-meterGroupLabel
                *ngIf="!labelTemplate && !_labelTemplate"
                [value]="value"
                [labelPosition]="labelPosition"
                [labelOrientation]="labelOrientation"
                [min]="min"
                [max]="max"
                [iconTemplate]="iconTemplate || _iconTemplate"
                [pt]="pt"
                [unstyled]="unstyled()"
            />
            <ng-container *ngTemplateOutlet="labelTemplate || labelTemplate; context: { $implicit: value, totalPercent: totalPercent(), percentages: percentages() }"></ng-container>
        }
        <ng-container *ngTemplateOutlet="startTemplate || _startTemplate; context: { $implicit: value, totalPercent: totalPercent(), percentages: percentages() }"></ng-container>
        <div [class]="cx('meters')" [pBind]="ptm('meters')" [attr.data-p]="dataP">
            <ng-container *ngFor="let meterItem of value; let index = index; trackBy: trackByFn">
                <ng-container
                    *ngTemplateOutlet="
                        meterTemplate || _meterTemplate;
                        context: {
                            $implicit: meterItem,
                            index: index,
                            orientation: this.orientation,
                            class: cx('meter'),
                            size: percentValue(meterItem.value),
                            totalPercent: totalPercent(),
                            dataP: dataP
                        }
                    "
                >
                </ng-container>
                <ng-container *ngIf="!meterTemplate && !_meterTemplate && meterItem.value > 0">
                    <span [class]="cx('meter')" [attr.data-p]="dataP" [pBind]="ptm('meter')" [ngStyle]="meterStyle(meterItem)"></span>
                </ng-container>
            </ng-container>
        </div>
        <ng-container *ngTemplateOutlet="endTemplate || _endTemplate; context: { $implicit: value, totalPercent: totalPercent(), percentages: percentages() }"></ng-container>
        @if (labelPosition === 'end') {
            <p-meterGroupLabel
                *ngIf="!labelTemplate && !_labelTemplate"
                [value]="value"
                [labelPosition]="labelPosition"
                [labelOrientation]="labelOrientation"
                [min]="min"
                [max]="max"
                [iconTemplate]="iconTemplate || _iconTemplate"
                [pt]="pt"
                [unstyled]="unstyled()"
            />
            <ng-container *ngTemplateOutlet="labelTemplate || _labelTemplate; context: { $implicit: value, totalPercent: totalPercent(), percentages: percentages() }"></ng-container>
        }
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [MeterGroupStyle, {
        provide: METERGROUP_INSTANCE,
        useExisting: MeterGroup
      }, {
        provide: PARENT_INSTANCE,
        useExisting: MeterGroup
      }],
      host: {
        "[attr.aria-valuemin]": "min",
        "[attr.role]": '"meter"',
        "[attr.aria-valuemax]": "max",
        "[attr.aria-valuenow]": "totalPercent()",
        "[attr.data-p]": "dataP",
        "[class]": "cn(cx('root'), styleClass)"
      },
      hostDirectives: [Bind]
    }]
  }], () => [], {
    value: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    orientation: [{
      type: Input
    }],
    labelPosition: [{
      type: Input
    }],
    labelOrientation: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    labelTemplate: [{
      type: ContentChild,
      args: ["label", {
        descendants: false
      }]
    }],
    meterTemplate: [{
      type: ContentChild,
      args: ["meter", {
        descendants: false
      }]
    }],
    endTemplate: [{
      type: ContentChild,
      args: ["end", {
        descendants: false
      }]
    }],
    startTemplate: [{
      type: ContentChild,
      args: ["start", {
        descendants: false
      }]
    }],
    iconTemplate: [{
      type: ContentChild,
      args: ["icon", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var MeterGroupModule = class _MeterGroupModule {
  static ɵfac = function MeterGroupModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MeterGroupModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MeterGroupModule,
    imports: [MeterGroup, SharedModule],
    exports: [MeterGroup, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [MeterGroup, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MeterGroupModule, [{
    type: NgModule,
    args: [{
      imports: [MeterGroup, SharedModule],
      exports: [MeterGroup, SharedModule]
    }]
  }], null, null);
})();
export {
  MeterGroup,
  MeterGroupClasses,
  MeterGroupLabel,
  MeterGroupModule,
  MeterGroupStyle
};
//# sourceMappingURL=primeng_metergroup.js.map
