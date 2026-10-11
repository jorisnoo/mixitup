function j() {
  return {
    enable: !0,
    effects: "fade scale",
    effectsIn: "",
    effectsOut: "",
    duration: 600,
    easing: "ease",
    applyPerspective: !0,
    perspectiveDistance: "3000px",
    perspectiveOrigin: "50% 50%",
    queue: !0,
    queueLimit: 3,
    animateResizeContainer: !0,
    animateResizeTargets: !1,
    staggerSequence: null,
    reverseOut: !1,
    nudge: !0,
    clampHeight: !0,
    clampWidth: !0
  };
}
function U() {
  return {
    liveSort: !1
  };
}
function W() {
  return {
    onMixStart: null,
    onMixBusy: null,
    onMixEnd: null,
    onMixFail: null,
    onMixClick: null
  };
}
function z() {
  return {
    block: "mixitup",
    elementContainer: "container",
    elementFilter: "control",
    elementSort: "control",
    elementMultimix: "control",
    elementToggle: "control",
    modifierActive: "active",
    modifierDisabled: "disabled",
    modifierFailed: "failed",
    delineatorElement: "-",
    delineatorModifier: "-"
  };
}
function q() {
  return {
    enable: !0,
    live: !1,
    scope: "global",
    toggleLogic: "or",
    toggleDefault: "all"
  };
}
function Y() {
  return {
    uidKey: "",
    dirtyCheck: !1
  };
}
function G() {
  return {
    enable: !1,
    showWarnings: !0,
    fauxAsync: !1
  };
}
function X() {
  return {
    allowNestedTargets: !0,
    containerClassName: "",
    siblingBefore: null,
    siblingAfter: null
  };
}
function K() {
  return {
    filter: "all",
    sort: "default:asc",
    dataset: null
  };
}
function V() {
  return {
    target: null
  };
}
function $() {
  return {
    target: ".mix",
    control: ""
  };
}
function Z() {
  return {};
}
function Q() {
  const o = {
    animation: Object.seal(j()),
    behavior: Object.seal(U()),
    callbacks: Object.seal(W()),
    controls: Object.seal(q()),
    classNames: Object.seal(z()),
    data: Object.seal(Y()),
    debug: Object.seal(G()),
    layout: Object.seal(X()),
    load: Object.seal(K()),
    render: Object.seal(V()),
    selectors: Object.seal($()),
    templates: Object.seal(Z())
  };
  return Object.seal(o);
}
function D() {
  return {
    id: "",
    args: [],
    command: null,
    showPosData: [],
    toHidePosData: [],
    startState: null,
    newState: null,
    docState: null,
    willSort: !1,
    willChangeLayout: !1,
    hasEffect: !1,
    hasFailed: !1,
    triggerElement: null,
    show: [],
    hide: [],
    matching: [],
    toShow: [],
    toHide: [],
    toMove: [],
    toRemove: [],
    startOrder: [],
    newOrder: [],
    startSort: null,
    newSort: null,
    startFilter: null,
    newFilter: null,
    startDataset: null,
    newDataset: null,
    viewportDeltaX: 0,
    viewportDeltaY: 0,
    startX: 0,
    startY: 0,
    startHeight: 0,
    startWidth: 0,
    newX: 0,
    newY: 0,
    newHeight: 0,
    newWidth: 0,
    startContainerClassName: "",
    startDisplay: "",
    newContainerClassName: "",
    newDisplay: ""
  };
}
function N() {
  return {
    args: [],
    instruction: null,
    triggerElement: null,
    deferred: null,
    isToggling: !1
  };
}
function p() {
  return {
    command: {},
    animate: !1,
    callback: null
  };
}
function J() {
  return {
    selector: "",
    collection: null,
    action: "show"
  };
}
function T() {
  return {
    sortString: "",
    attribute: "",
    order: "asc",
    collection: null,
    next: null
  };
}
function tt() {
  return {
    index: 0,
    collection: [],
    position: "before",
    sibling: null
  };
}
function et() {
  return {
    targets: [],
    collection: []
  };
}
function it() {
  return {
    dataset: null
  };
}
function st() {
  return {
    containerClassName: ""
  };
}
function nt() {
  return {
    filter: null,
    sort: null,
    insert: null,
    remove: null,
    changeLayout: null
  };
}
const R = {
  transformRule: "transform",
  TWEENABLE: [
    "opacity",
    "width",
    "height",
    "marginRight",
    "marginBottom",
    "x",
    "y",
    "scale",
    "translateX",
    "translateY",
    "translateZ",
    "rotateX",
    "rotateY",
    "rotateZ"
  ]
};
function g(o, e, t = !1, i = !1) {
  let n = [];
  const s = e;
  try {
    if (Array.isArray(e))
      for (let r = 0; r < e.length; r++)
        n.push(String(r));
    else e && (n = Object.keys(e));
    for (let r = 0; r < n.length; r++) {
      const a = n[r];
      !t || typeof s[a] != "object" || m(s[a]) ? o[a] = s[a] : Array.isArray(s[a]) ? (o[a] || (o[a] = []), g(o[a], s[a], t, i)) : (o[a] || (o[a] = {}), g(o[a], s[a], t, i));
    }
  } catch (r) {
    if (i)
      at(r, o);
    else
      throw r;
  }
  return o;
}
function at(o, e) {
  const t = /property "?(\w*)"?[,:] object/i;
  if (o instanceof TypeError) {
    const i = t.exec(o.message);
    if (i) {
      const n = i[1];
      let s = "", r = -1;
      for (const l in e) {
        let h = 0;
        for (; h < n.length && n.charAt(h) === l.charAt(h); )
          h++;
        h > r && (r = h, s = l);
      }
      let a = "";
      r > 1 && (a = `Did you mean "${s}"?`);
      const c = `[MixItUp] Invalid config property "${n}". ${a}`.trim();
      throw new TypeError(c);
    }
  }
  throw o;
}
function rt(o) {
  const e = /\${([\w]*)}/g, t = {};
  let i;
  for (; i = e.exec(o); )
    t[i[1]] = new RegExp("\\${" + i[1] + "}", "g");
  return (n) => {
    let s = o;
    n = n || {};
    for (const r in t)
      s = s.replace(t[r], typeof n[r] < "u" ? n[r] : "");
    return s;
  };
}
function ot(o, e) {
  let t = 0, i = o.previousElementSibling;
  for (; i !== null; )
    (!e || i.matches(e)) && ++t, i = i.previousElementSibling;
  return t;
}
function H(o) {
  return o.toLowerCase().replace(/([_-][a-z])/g, (e) => e.toUpperCase().replace(/[_-]/, ""));
}
function lt(o) {
  const e = H(o);
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function ct(o) {
  return o.replace(/([A-Z])/g, "-$1").replace(/^-/, "").toLowerCase();
}
function m(o, e) {
  return e = e || window.document, window.HTMLElement && o instanceof window.HTMLElement || e.defaultView && e.defaultView.HTMLElement && o instanceof e.defaultView.HTMLElement ? !0 : o !== null && o.nodeType === 1 && typeof o.nodeName == "string";
}
function ht(o, e) {
  e = e || window.document;
  const t = e.createDocumentFragment(), i = e.createElement("div");
  for (i.innerHTML = o.trim(); i.firstChild; )
    t.appendChild(i.firstChild);
  return t;
}
function C(o) {
  var t;
  let e;
  for (; o && o.nodeName === "#text"; )
    e = o, o = o.previousSibling, (t = e.parentElement) == null || t.removeChild(e);
}
function A(o, e) {
  let t = o.length;
  if (t !== e.length) return !1;
  for (; t--; )
    if (o[t] !== e[t]) return !1;
  return !0;
}
function B(o, e) {
  if (typeof o == "object" && o && typeof e == "object" && e) {
    if (Object.keys(o).length !== Object.keys(e).length) return !1;
    for (const t in o)
      if (!Object.prototype.hasOwnProperty.call(e, t) || !B(o[t], e[t])) return !1;
  } else if (o !== e)
    return !1;
  return !0;
}
function ft(o) {
  const e = o.slice(), t = e.length;
  let i = t;
  for (; i--; ) {
    const n = ~~(Math.random() * t), s = e[i];
    e[i] = e[n], e[n] = s;
  }
  return e;
}
function dt(o, e) {
  return o ? Array.from(o.querySelectorAll(":scope > " + e)) : [];
}
function k(o) {
  const e = [];
  for (let t = 0; t < o.length; t++)
    o[t] !== "" && e.push(o[t]);
  return e;
}
function E() {
  return ("00000" + (Math.random() * 16777216 << 0).toString(16)).substr(-6).toUpperCase();
}
function F(o) {
  return o = o && typeof o.body == "object" ? o : window.document, {
    scrollTop: window.pageYOffset,
    scrollLeft: window.pageXOffset,
    docHeight: o.documentElement.scrollHeight,
    docWidth: o.documentElement.scrollWidth,
    viewportHeight: o.documentElement.clientHeight,
    viewportWidth: o.documentElement.clientWidth
  };
}
function M(o) {
  if (o.offsetParent) return !0;
  const e = window.getComputedStyle(o);
  return e.position === "fixed" && e.visibility !== "hidden" && e.opacity !== "0";
}
function w(o, e, t) {
  let i = "";
  return i += o.block, i.length && (i += o.delineatorElement), i += o["element" + lt(e)], t && (i.length && (i += o.delineatorModifier), i += t), i;
}
function gt(o, e) {
  const t = e.split(".");
  if (!e)
    return o;
  let i = o;
  for (let n = 0; n < t.length; n++) {
    if (!i)
      return null;
    i = i[t[n]];
  }
  return typeof i < "u" ? i : null;
}
const P = {
  // Errors
  ERROR_FACTORY_INVALID_CONTAINER: "[MixItUp] An invalid selector or element reference was passed to the mixitup factory function",
  ERROR_FACTORY_CONTAINER_NOT_FOUND: "[MixItUp] The provided selector yielded no container element",
  ERROR_CONFIG_INVALID_ANIMATION_EFFECTS: "[MixItUp] Invalid value for `animation.effects`",
  ERROR_CONFIG_INVALID_CONTROLS_SCOPE: "[MixItUp] Invalid value for `controls.scope`",
  ERROR_CONFIG_INVALID_PROPERTY: '[MixItUp] Invalid configuration object property "${erroneous}"${suggestion}',
  ERROR_CONFIG_INVALID_PROPERTY_SUGGESTION: '. Did you mean "${probableMatch}"?',
  ERROR_CONFIG_DATA_UID_KEY_NOT_SET: "[MixItUp] To use the dataset API, a UID key must be specified using `data.uidKey`",
  ERROR_DATASET_INVALID_UID_KEY: '[MixItUp] The specified UID key "${uidKey}" is not present on one or more dataset items',
  ERROR_DATASET_DUPLICATE_UID: '[MixItUp] The UID "${uid}" was found on two or more dataset items. UIDs must be unique.',
  ERROR_INSERT_INVALID_ARGUMENTS: "[MixItUp] Please provider either an index or a sibling and position to insert, not both",
  ERROR_INSERT_PREEXISTING_ELEMENT: "[MixItUp] An element to be inserted already exists in the container",
  ERROR_FILTER_INVALID_ARGUMENTS: "[MixItUp] Please provide either a selector or collection `.filter()`, not both",
  ERROR_DATASET_NOT_SET: "[MixItUp] To use the dataset API with pre-rendered targets, a starting dataset must be set using `load.dataset`",
  ERROR_DATASET_PRERENDERED_MISMATCH: "[MixItUp] `load.dataset` does not match pre-rendered targets",
  ERROR_DATASET_RENDERER_NOT_SET: "[MixItUp] To insert an element via the dataset API, a target renderer function must be provided to `render.target`",
  ERROR_SORT_NON_EXISTENT_ELEMENT: "[MixItUp] An element to be sorted does not already exist in the container",
  // Warnings
  WARNING_FACTORY_PREEXISTING_INSTANCE: "[MixItUp] WARNING: This element already has an active MixItUp instance. The provided configuration object will be ignored. If you wish to perform additional methods on this instance, please create a reference.",
  WARNING_INSERT_NO_ELEMENTS: "[MixItUp] WARNING: No valid elements were passed to `.insert()`",
  WARNING_REMOVE_NO_ELEMENTS: "[MixItUp] WARNING: No valid elements were passed to `.remove()`",
  WARNING_MULTIMIX_INSTANCE_QUEUE_FULL: "[MixItUp] WARNING: An operation was requested but the MixItUp instance was busy. The operation was rejected because the queue is full or queuing is disabled.",
  WARNING_GET_OPERATION_INSTANCE_BUSY: "[MixItUp] WARNING: Operations can be be created while the MixItUp instance is busy.",
  WARNING_NO_PROMISE_IMPLEMENTATION: "[MixItUp] WARNING: No Promise implementations could be found. If you wish to use promises with MixItUp please install an ES6 Promise polyfill.",
  WARNING_INCONSISTENT_SORTING_ATTRIBUTES: '[MixItUp] WARNING: The requested sorting data attribute "${attribute}" was not present on one or more target elements which may product unexpected sort output'
};
function ut() {
  const o = {};
  for (const e in P) {
    const t = P[e], i = H(e);
    o[i] = rt(t);
  }
  return o;
}
const d = ut();
class b {
  constructor() {
    this.id = "", this.sortString = "", this.mixer = null, this.callback = null, this.isShown = !1, this.isBound = !1, this.isExcluded = !1, this.isInDom = !1, this.handler = null, this.operation = null, this.data = null, this.dom = { el: null };
  }
  init(e, t, i) {
    if (this.mixer = t, e || (e = this.render(i)), this.cacheDom(e), this.bindEvents(), this.dom.el.style.display !== "none" && (this.isShown = !0), i && t.config.data.uidKey) {
      const n = i[t.config.data.uidKey];
      if (typeof n > "u" || String(n).length < 1)
        throw new TypeError(
          d.errorDatasetInvalidUidKey({
            uidKey: t.config.data.uidKey
          })
        );
      this.id = n, this.data = i, t.cache[n] = this;
    }
  }
  render(e) {
    const t = this.mixer.config.render.target;
    if (typeof t != "function")
      throw new TypeError(
        d.errorDatasetRendererNotSet()
      );
    const i = t(e);
    if (i && typeof i == "object" && m(i))
      return i;
    if (typeof i == "string") {
      const n = document.createElement("div");
      return n.innerHTML = i, n.firstElementChild;
    }
    return i;
  }
  cacheDom(e) {
    this.dom.el = e;
  }
  getSortString(e) {
    const t = this.dom.el.getAttribute("data-" + e) || "", i = Number(t);
    this.sortString = isNaN(i) ? t.toLowerCase() : i;
  }
  show() {
    this.isShown || (this.dom.el.style.display = "", this.isShown = !0);
  }
  hide() {
    this.isShown && (this.dom.el.style.display = "none", this.isShown = !1);
  }
  /**
   * Applies the starting styles of a move. The mixer applies the end styles
   * (`applyStylesOut`) for all moved targets in a single animation frame.
   */
  move(e) {
    this.isExcluded || this.mixer.targetsMoved++, this.applyStylesIn(e);
  }
  applyTween(e, t) {
    const i = e.posIn, n = [], s = {
      x: i.x,
      y: i.y
    };
    t === 0 ? this.hide() : this.isShown || this.show();
    for (const r of R.TWEENABLE) {
      const a = e.tweenData[r];
      if (r === "x") {
        if (!a) continue;
        s.x = i.x + a * t;
      } else if (r === "y") {
        if (!a) continue;
        s.y = i.y + a * t;
      } else if (a && typeof a == "object" && "value" in a) {
        if (!a.value) continue;
        const c = i[r];
        s[r] = {
          value: c.value + a.value * t,
          unit: a.unit
        }, n.push(
          r + "(" + s[r].value + a.unit + ")"
        );
      } else {
        if (!a) continue;
        s[r] = i[r] + a * t, this.dom.el.style[r] = s[r];
      }
    }
    (s.x || s.y) && n.unshift("translate(" + s.x + "px, " + s.y + "px)"), n.length && (this.dom.el.style.transform = n.join(" "));
  }
  applyStylesIn(e) {
    const t = e.posIn, i = this.dom.el, n = this.mixer.effectsIn.opacity !== 1;
    let s = [];
    s.push("translate(" + t.x + "px, " + t.y + "px)"), this.mixer.config.animation.animateResizeTargets && (e.statusChange !== "show" && (i.style.width = t.width + "px", i.style.height = t.height + "px"), i.style.marginRight = t.marginRight + "px", i.style.marginBottom = t.marginBottom + "px"), n && (i.style.opacity = String(t.opacity)), e.statusChange === "show" && (s = s.concat(this.mixer.transformIn)), i.style.transform = s.join(" ");
  }
  applyStylesOut(e) {
    const t = [];
    let i = [];
    const n = this.mixer.config.animation.animateResizeTargets, s = typeof this.mixer.effectsIn.opacity < "u", r = this.dom.el;
    if (t.push(this.writeTransitionRule(
      R.transformRule,
      e.staggerIndex
    )), e.statusChange !== "none" && t.push(this.writeTransitionRule(
      "opacity",
      e.staggerIndex,
      e.duration
    )), n && (t.push(this.writeTransitionRule(
      "width",
      e.staggerIndex,
      e.duration
    )), t.push(this.writeTransitionRule(
      "height",
      e.staggerIndex,
      e.duration
    )), t.push(this.writeTransitionRule(
      "margin",
      e.staggerIndex,
      e.duration
    ))), !e.callback) {
      this.mixer.targetsImmovable++, this.mixer.targetsMoved === this.mixer.targetsImmovable && this.mixer.cleanUp(e.operation);
      return;
    }
    this.operation = e.operation, this.callback = e.callback, this.isExcluded || this.mixer.targetsBound++, this.isBound = !0, this.applyTransition(t);
    const a = e.posOut;
    switch (n && a.width > 0 && a.height > 0 && (r.style.width = a.width + "px", r.style.height = a.height + "px", r.style.marginRight = a.marginRight + "px", r.style.marginBottom = a.marginBottom + "px"), !this.mixer.config.animation.nudge && e.statusChange === "hide" && i.push("translate(" + a.x + "px, " + a.y + "px)"), e.statusChange) {
      case "hide":
        s && (r.style.opacity = String(this.mixer.effectsOut.opacity)), i = i.concat(this.mixer.transformOut);
        break;
      case "show":
        s && (r.style.opacity = "1");
    }
    (this.mixer.config.animation.nudge || !this.mixer.config.animation.nudge && e.statusChange !== "hide") && i.push("translate(" + a.x + "px, " + a.y + "px)"), r.style.transform = i.join(" ");
  }
  writeTransitionRule(e, t, i) {
    const n = this.getDelay(t);
    return e + " " + (i && i > 0 ? i : this.mixer.config.animation.duration) + "ms " + n + "ms " + (e === "opacity" ? "linear" : this.mixer.config.animation.easing);
  }
  getDelay(e) {
    let t = e;
    return typeof this.mixer.config.animation.staggerSequence == "function" && (t = this.mixer.config.animation.staggerSequence.call(this, e, this.mixer.state)), this.mixer.staggerDuration ? t * this.mixer.staggerDuration : 0;
  }
  applyTransition(e) {
    this.dom.el.style.transition = e.join(", ");
  }
  handleTransitionEnd(e) {
    const t = e.propertyName, i = this.mixer.config.animation.animateResizeTargets;
    this.isBound && e.target.matches(this.mixer.config.selectors.target) && (t.indexOf("transform") > -1 || t.indexOf("opacity") > -1 || i && t.indexOf("height") > -1 || i && t.indexOf("width") > -1 || i && t.indexOf("margin") > -1) && (this.callback.call(this, this, this.operation), this.isBound = !1, this.callback = null, this.operation = null);
  }
  bindEvents() {
    this.handler = (e) => {
      e.type === "transitionend" && this.handleTransitionEnd(e);
    }, this.dom.el.addEventListener("transitionend", this.handler);
  }
  unbindEvents() {
    this.handler && this.dom.el.removeEventListener("transitionend", this.handler);
  }
  getPosData(e) {
    const t = this.dom.el, i = {
      x: t.offsetLeft,
      y: t.offsetTop,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: 0,
      height: 0,
      marginRight: 0,
      marginBottom: 0,
      opacity: 1,
      scale: { value: 0, unit: "" },
      translateX: { value: 0, unit: "" },
      translateY: { value: 0, unit: "" },
      translateZ: { value: 0, unit: "" },
      rotateX: { value: 0, unit: "" },
      rotateY: { value: 0, unit: "" },
      rotateZ: { value: 0, unit: "" }
    };
    if (this.mixer.config.animation.animateResizeTargets || e) {
      const n = t.getBoundingClientRect();
      i.top = n.top, i.right = n.right, i.bottom = n.bottom, i.left = n.left, i.width = n.width, i.height = n.height;
    }
    if (this.mixer.config.animation.animateResizeTargets) {
      const n = window.getComputedStyle(t);
      i.marginBottom = parseFloat(n.marginBottom), i.marginRight = parseFloat(n.marginRight);
    }
    return i;
  }
  cleanUp() {
    const e = this.dom.el;
    e.style.transform = "", e.style.transition = "", e.style.opacity = "", this.mixer.config.animation.animateResizeTargets && (e.style.width = "", e.style.height = "", e.style.marginRight = "", e.style.marginBottom = "");
  }
}
function mt() {
  return {
    base: "",
    active: "",
    disabled: ""
  };
}
const pt = ["mixStart", "mixBusy", "mixEnd", "mixFail", "mixClick"];
function y(o, e, t, i) {
  if (!pt.includes(o))
    throw new Error('Event type "' + o + '" not found.');
  const n = {
    state: { ...t.state },
    futureState: t.futureState ? { ...t.futureState } : null,
    instance: t.instance,
    originalEvent: t.originalEvent || null
  }, s = new CustomEvent(o, {
    bubbles: !0,
    cancelable: !0,
    detail: n
  });
  e.dispatchEvent(s);
}
const I = [];
class wt {
  constructor() {
    this.el = null, this.selector = "", this.bound = [], this.pending = -1, this.type = "", this.status = "inactive", this.filter = "", this.sort = "", this.canDisable = !1, this.handler = null, this.classNames = mt();
  }
  init(e, t, i) {
    if (this.el = e, this.type = t, this.selector = i, this.selector)
      this.status = "live";
    else
      switch (this.canDisable = typeof e.disabled == "boolean", this.type) {
        case "filter":
          this.filter = e.getAttribute("data-filter") || "";
          break;
        case "toggle":
          this.filter = e.getAttribute("data-toggle") || "";
          break;
        case "sort":
          this.sort = e.getAttribute("data-sort") || "";
          break;
        case "multimix":
          this.filter = e.getAttribute("data-filter") || "", this.sort = e.getAttribute("data-sort") || "";
          break;
      }
    this.bindClick(), I.push(this);
  }
  isBound(e) {
    return this.bound.indexOf(e) > -1;
  }
  addBinding(e) {
    this.isBound(e) || this.bound.push(e);
  }
  removeBinding(e) {
    let t = this.bound.indexOf(e);
    t > -1 && this.bound.splice(t, 1), this.bound.length < 1 && (this.unbindClick(), t = I.indexOf(this), t > -1 && I.splice(t, 1), this.status === "active" && this.renderStatus(this.el, "inactive"));
  }
  bindClick() {
    this.handler = (e) => {
      this.handleClick(e);
    }, this.el.addEventListener("click", this.handler);
  }
  unbindClick() {
    this.handler && this.el.removeEventListener("click", this.handler), this.handler = null;
  }
  handleClick(e) {
    let t = null, i = !1, n;
    const s = {};
    this.pending = 0;
    const r = this.bound[0];
    if (this.selector ? t = e.target.closest(
      r.config.selectors.control + this.selector
    ) : t = this.el, !t)
      return;
    switch (this.type) {
      case "filter":
        s.filter = this.filter || t.getAttribute("data-filter");
        break;
      case "sort":
        s.sort = this.sort || t.getAttribute("data-sort");
        break;
      case "multimix":
        s.filter = this.filter || t.getAttribute("data-filter"), s.sort = this.sort || t.getAttribute("data-sort");
        break;
      case "toggle":
        s.filter = this.filter || t.getAttribute("data-toggle"), this.status === "live" ? i = t.classList.contains(this.classNames.active) : i = this.status === "active";
        break;
    }
    const a = [];
    for (let c = 0; c < this.bound.length; c++) {
      const l = {};
      g(l, s), a.push(l);
    }
    this.pending = this.bound.length;
    for (let c = 0; c < this.bound.length; c++) {
      const l = this.bound[c], h = a[c];
      h && (l.lastClicked || (l.lastClicked = t), y("mixClick", l.dom.container, {
        state: l.state,
        instance: l,
        originalEvent: e,
        control: l.lastClicked
      }, l.dom.document), !(typeof l.config.callbacks.onMixClick == "function" && (n = l.config.callbacks.onMixClick.call(
        l.lastClicked,
        l.state,
        e,
        l
      ), n === !1)) && (this.type === "toggle" ? i ? l.toggleOff(h.filter) : l.toggleOn(h.filter) : l.multimix(h)));
    }
  }
  update(e, t) {
    if (this.pending--, this.pending = Math.max(0, this.pending), !(this.pending > 0))
      if (this.status === "live")
        this.updateLive(e, t);
      else {
        const i = {
          sort: this.sort,
          filter: this.filter
        };
        this.parseStatusChange(this.el, e, i, t);
      }
  }
  updateLive(e, t) {
    if (!this.el) return;
    const i = this.el.querySelectorAll(this.selector);
    for (let n = 0; n < i.length; n++) {
      const s = i[n], r = {};
      switch (this.type) {
        case "filter":
          r.filter = s.getAttribute("data-filter");
          break;
        case "sort":
          r.sort = s.getAttribute("data-sort");
          break;
        case "multimix":
          r.filter = s.getAttribute("data-filter"), r.sort = s.getAttribute("data-sort");
          break;
        case "toggle":
          r.filter = s.getAttribute("data-toggle");
          break;
      }
      this.parseStatusChange(s, e, r, t);
    }
  }
  parseStatusChange(e, t, i, n) {
    switch (this.type) {
      case "filter":
        t.filter === i.filter ? this.renderStatus(e, "active") : this.renderStatus(e, "inactive");
        break;
      case "multimix":
        t.sort === i.sort && t.filter === i.filter ? this.renderStatus(e, "active") : this.renderStatus(e, "inactive");
        break;
      case "sort":
        let s = "";
        t.sort.match(/:asc/g) && (s = t.sort.replace(/:asc/g, "")), t.sort === i.sort || s === i.sort ? this.renderStatus(e, "active") : this.renderStatus(e, "inactive");
        break;
      case "toggle":
        n.length < 1 && this.renderStatus(e, "inactive"), t.filter === i.filter && this.renderStatus(e, "active");
        for (let r = 0; r < n.length; r++) {
          if (n[r] === i.filter) {
            this.renderStatus(e, "active");
            break;
          }
          this.renderStatus(e, "inactive");
        }
        break;
    }
  }
  renderStatus(e, t) {
    switch (t) {
      case "active":
        e.classList.add(this.classNames.active), e.classList.remove(this.classNames.disabled), this.canDisable && (this.el.disabled = !1);
        break;
      case "inactive":
        e.classList.remove(this.classNames.active), e.classList.remove(this.classNames.disabled), this.canDisable && (this.el.disabled = !1);
        break;
      case "disabled":
        this.canDisable && (this.el.disabled = !0), e.classList.add(this.classNames.disabled), e.classList.remove(this.classNames.active);
        break;
    }
    this.status !== "live" && (this.status = t);
  }
}
function v(o, e, t = !1, i = "") {
  return Object.freeze({ type: o, selector: e, live: t, parent: i });
}
const bt = [
  v("multimix", "[data-filter][data-sort]"),
  v("filter", "[data-filter]"),
  v("sort", "[data-sort]"),
  v("toggle", "[data-toggle]")
], yt = [
  "scale",
  "translateX",
  "translateY",
  "translateZ",
  "rotateX",
  "rotateY",
  "rotateZ"
], St = ["%", "px", "em", "rem", "vh", "vw", "deg"];
function O(o, e) {
  let t = 0;
  for (let i = 0; i < o.length; i++) {
    const n = o[i];
    e(n) || (o[t++] = n);
  }
  o.length = t;
}
const x = /* @__PURE__ */ new Map();
function u() {
  return {
    x: 0,
    y: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
    marginRight: 0,
    marginBottom: 0,
    opacity: 1,
    scale: { value: 0, unit: "" },
    translateX: { value: 0, unit: "" },
    translateY: { value: 0, unit: "" },
    translateZ: { value: 0, unit: "" },
    rotateX: { value: 0, unit: "" },
    rotateY: { value: 0, unit: "" },
    rotateZ: { value: 0, unit: "" }
  };
}
function L() {
  return {
    posIn: null,
    posOut: null,
    operation: null,
    callback: null,
    statusChange: "none",
    duration: 0,
    staggerIndex: 0,
    tweenData: {}
  };
}
const _ = {
  scale: { value: 0.01, unit: "" },
  translateX: { value: 20, unit: "px" },
  translateY: { value: 20, unit: "px" },
  translateZ: { value: 20, unit: "px" },
  rotateX: { value: 20, unit: "deg" },
  rotateY: { value: 20, unit: "deg" },
  rotateZ: { value: 20, unit: "deg" }
};
class vt {
  constructor() {
    this.config = Q(), this.id = "", this.isBusy = !1, this.isToggling = !1, this.incPadding = !0, this.controls = [], this.targets = [], this.origOrder = [], this.cache = {}, this.toggleArray = [], this.targetsMoved = 0, this.targetsImmovable = 0, this.targetsBound = 0, this.targetsDone = 0, this.staggerDuration = 0, this.effectsIn = null, this.effectsOut = null, this.transformIn = [], this.transformOut = [], this.queue = [], this.state = null, this.lastOperation = null, this.lastClicked = null, this.userCallback = null, this.userDeferred = null, this.dom = {
      document: null,
      body: null,
      container: null,
      parent: null,
      targets: []
    };
  }
  attach(e, t, i, n) {
    this.id = i, n && g(this.config, n, !0, !0), this.sanitizeConfig(), this.cacheDom(e, t), this.config.layout.containerClassName && this.dom.container.classList.add(this.config.layout.containerClassName), this.config.data.uidKey && (this.config.controls.enable = !1), this.indexTargets(), this.state = this.getInitialState();
    for (const s of this.lastOperation.toHide)
      s.hide();
    this.config.controls.enable && (this.initControls(), this.buildToggleArray(null, this.state), this.updateControls({
      filter: this.state.activeFilter,
      sort: this.state.activeSort
    })), this.parseEffects();
  }
  sanitizeConfig() {
    this.config.controls.scope = this.config.controls.scope.toLowerCase().trim(), this.config.controls.toggleLogic = this.config.controls.toggleLogic.toLowerCase().trim(), this.config.controls.toggleDefault = this.config.controls.toggleDefault.toLowerCase().trim(), this.config.animation.effects = this.config.animation.effects.trim();
  }
  getInitialState() {
    let e = this.createMutableState(), t = D();
    if (e.activeContainerClassName = this.config.layout.containerClassName, this.config.load.dataset) {
      if (!this.config.data.uidKey || typeof this.config.data.uidKey != "string")
        throw new TypeError(d.errorConfigDataUidKeyNotSet());
      t.startDataset = t.newDataset = e.activeDataset = this.config.load.dataset.slice(), t.startContainerClassName = t.newContainerClassName = e.activeContainerClassName, t.show = this.targets.slice();
    } else
      e.activeFilter = this.parseFilterArgs([this.config.load.filter]).command, e.activeSort = this.parseSortArgs([this.config.load.sort]).command, e.totalTargets = this.targets.length, e.activeSort.collection || e.activeSort.attribute || e.activeSort.order === "random" || e.activeSort.order === "desc" ? (t.newSort = e.activeSort, this.sortOperation(t), this.printSort(!1, t), this.targets = t.newOrder) : t.startOrder = t.newOrder = this.targets, t.startFilter = t.newFilter = e.activeFilter, t.startSort = t.newSort = e.activeSort, t.startContainerClassName = t.newContainerClassName = e.activeContainerClassName, t.newFilter.selector === "all" ? t.newFilter.selector = this.config.selectors.target : t.newFilter.selector === "none" && (t.newFilter.selector = "");
    return this.lastOperation = t, t.newFilter && this.filterOperation(t), e = this.buildState(t), e;
  }
  cacheDom(e, t) {
    this.dom.document = t, this.dom.body = this.dom.document.querySelector("body"), this.dom.container = e, this.dom.parent = e;
  }
  indexTargets() {
    const e = this.config.layout.allowNestedTargets ? this.dom.container.querySelectorAll(this.config.selectors.target) : dt(this.dom.container, this.config.selectors.target);
    this.dom.targets = Array.from(e), this.targets = [];
    const t = this.config.load.dataset;
    if (t && t.length !== this.dom.targets.length)
      throw new Error(d.errorDatasetPrerenderedMismatch());
    if (this.dom.targets.length) {
      for (let i = 0; i < this.dom.targets.length; i++) {
        const n = this.dom.targets[i], s = new b();
        s.init(n, this, t ? t[i] : void 0), s.isInDom = !0, this.targets.push(s);
      }
      this.dom.parent = this.dom.targets[0].parentElement === this.dom.container ? this.dom.container : this.dom.targets[0].parentElement;
    }
    this.origOrder = this.targets;
  }
  initControls() {
    let e;
    switch (this.config.controls.scope) {
      case "local":
        e = this.dom.container;
        break;
      case "global":
        e = this.dom.document;
        break;
      default:
        throw new Error(d.errorConfigInvalidControlsScope());
    }
    for (const t of bt)
      if (this.config.controls.live || t.live) {
        let i;
        if (t.parent) {
          const n = this.dom[t.parent];
          if (!n || Array.isArray(n) && n.length < 1) continue;
          i = typeof n.length == "number" ? Array.from(n) : [n];
        } else
          i = [e];
        for (const n of i) {
          const s = this.getControl(n, t.type, t.selector);
          this.controls.push(s);
        }
      } else {
        const i = e.querySelectorAll(
          this.config.selectors.control + t.selector
        );
        for (let n = 0; n < i.length; n++) {
          const s = i[n], r = this.getControl(s, t.type, "");
          r && this.controls.push(r);
        }
      }
  }
  getControl(e, t, i) {
    if (!i)
      for (const s of I) {
        if (s.el === e && s.isBound(this))
          return null;
        if (s.el === e && s.type === t && s.selector === i)
          return s.addBinding(this), s;
      }
    const n = new wt();
    return n.init(e, t, i), n.classNames.base = w(this.config.classNames, t), n.classNames.active = w(this.config.classNames, t, this.config.classNames.modifierActive), n.classNames.disabled = w(this.config.classNames, t, this.config.classNames.modifierDisabled), n.addBinding(this), n;
  }
  getToggleSelector() {
    this.toggleArray = k(this.toggleArray);
    const e = this.config.controls.toggleLogic === "or" ? ", " : "";
    let t = this.toggleArray.join(e);
    return t === "" && (t = this.config.controls.toggleDefault), t;
  }
  buildToggleArray(e, t) {
    let i = "";
    if (e && e.filter)
      i = e.filter.selector.replace(/\s/g, "");
    else if (t)
      i = t.activeFilter.selector.replace(/\s/g, "");
    else
      return;
    (i === this.config.selectors.target || i === "all") && (i = ""), this.config.controls.toggleLogic === "or" ? this.toggleArray = i.split(",") : this.toggleArray = this.splitCompoundSelector(i), this.toggleArray = k(this.toggleArray);
  }
  splitCompoundSelector(e) {
    const t = e.split(/([\.\[])/g), i = [];
    let n = "";
    t[0] === "" && t.shift();
    for (let s = 0; s < t.length; s++)
      s % 2 === 0 && (n = ""), n += t[s], s % 2 !== 0 && i.push(n);
    return i;
  }
  updateControls(e) {
    const t = {};
    e.filter ? t.filter = e.filter.selector : t.filter = this.state.activeFilter.selector, e.sort ? t.sort = this.buildSortString(e.sort) : t.sort = this.buildSortString(this.state.activeSort), t.filter === this.config.selectors.target && (t.filter = "all"), t.filter === "" && (t.filter = "none"), Object.freeze(t);
    for (const i of this.controls)
      i.update(t, this.toggleArray);
  }
  buildSortString(e) {
    let t = e.sortString;
    return e.next && (t += " " + this.buildSortString(e.next)), t;
  }
  insertTargets(e, t) {
    typeof e.index > "u" && (e.index = 0);
    const i = this.getNextSibling(e.index, e.sibling, e.position), n = this.dom.document.createDocumentFragment();
    let s;
    if (i ? s = ot(i, this.config.selectors.target) : s = this.targets.length, e.collection) {
      const r = new Set(this.dom.targets);
      for (const a of e.collection) {
        if (r.has(a))
          throw new Error(d.errorInsertPreexistingElement());
        if (a.style.display = "none", n.appendChild(a), n.appendChild(this.dom.document.createTextNode(" ")), !m(a, this.dom.document) || !a.matches(this.config.selectors.target)) continue;
        const c = new b();
        c.init(a, this), c.isInDom = !0, this.targets.splice(s, 0, c), s++;
      }
      this.dom.parent.insertBefore(n, i);
    }
    t.startOrder = this.origOrder = this.targets;
  }
  getNextSibling(e, t, i) {
    let n = null;
    return e = Math.max(e, 0), t && i === "before" ? n = t : t && i === "after" ? n = t.nextElementSibling || null : this.targets.length > 0 && typeof e < "u" ? n = e < this.targets.length ? this.targets[e].dom.el : this.targets[this.targets.length - 1].dom.el.nextElementSibling : this.targets.length === 0 && this.dom.parent.children.length > 0 && (this.config.layout.siblingAfter ? n = this.config.layout.siblingAfter : this.config.layout.siblingBefore ? n = this.config.layout.siblingBefore.nextElementSibling : n = this.dom.parent.children[0]), n;
  }
  filterOperation(e) {
    const t = e.newFilter.action, i = e.newFilter.collection ? new Set(e.newFilter.collection) : null;
    for (const n of e.newOrder) {
      let s = !1;
      i ? s = i.has(n.dom.el) : e.newFilter.selector === "" ? s = !1 : s = n.dom.el.matches(e.newFilter.selector), this.evaluateHideShow(s, n, t, e);
    }
    if (e.toRemove.length) {
      const n = new Set(e.toRemove);
      O(e.show, (s) => n.has(s) ? (e.toHide.push(s), e.hide.push(s), !0) : !1), O(e.toShow, (s) => n.has(s));
    }
    e.matching = e.show.slice(), e.show.length === 0 && e.newFilter.selector !== "" && this.targets.length !== 0 && (e.hasFailed = !0);
  }
  evaluateHideShow(e, t, i, n) {
    e === !0 && i === "show" || e === !1 && i === "hide" ? (n.show.push(t), t.isShown || n.toShow.push(t)) : (n.hide.push(t), t.isShown && n.toHide.push(t));
  }
  sortOperation(e) {
    if (e.startOrder = this.targets, e.newSort.collection) {
      const t = [], i = new Set(this.dom.targets), n = /* @__PURE__ */ new Map();
      for (const s of this.targets)
        n.set(s.dom.el, s);
      for (const s of e.newSort.collection) {
        if (!i.has(s))
          throw new Error(d.errorSortNonExistentElement());
        let r = n.get(s);
        r || (r = new b(), r.init(s, this), r.isInDom = !0), t.push(r);
      }
      e.newOrder = t;
    } else if (e.newSort.order === "random")
      e.newOrder = ft(e.startOrder);
    else if (e.newSort.attribute === "")
      e.newOrder = this.origOrder.slice(), e.newSort.order === "desc" && e.newOrder.reverse();
    else {
      const t = e.startOrder, i = /* @__PURE__ */ new Map();
      for (const n of t) {
        const s = [];
        for (let r = e.newSort; r; r = r.next)
          s.push(this.getSortKey(n, r.attribute));
        i.set(n, s);
      }
      e.newOrder = t.slice(), e.newOrder.sort((n, s) => this.compare(i.get(n), i.get(s), e.newSort));
    }
    A(e.newOrder, e.startOrder) && (e.willSort = !1);
  }
  compare(e, t, i, n = 0) {
    const s = i.order, r = e[n], a = t[n], c = r.isNumeric && a.isNumeric, l = c ? r.number : r.string, h = c ? a.number : a.string;
    return l < h ? s === "asc" ? -1 : 1 : l > h ? s === "asc" ? 1 : -1 : l === h && i.next ? this.compare(e, t, i.next, n + 1) : 0;
  }
  /**
   * Reads a target's sort attribute once so that comparisons don't touch the DOM.
   */
  getSortKey(e, t) {
    const i = e.dom.el.getAttribute("data-" + t);
    i === null && this.config.debug.showWarnings && console.warn(d.warningInconsistentSortingAttributes({
      attribute: "data-" + t
    }));
    const n = i || "0", s = Number(n);
    return {
      isNumeric: !isNaN(s),
      number: s,
      string: n.toLowerCase()
    };
  }
  printSort(e, t) {
    const i = e ? t.newOrder : t.startOrder, n = e ? t.startOrder : t.newOrder, s = i.length ? i[i.length - 1].dom.el.nextElementSibling : null, r = window.document.createDocumentFragment();
    for (const c of i) {
      const l = c.dom.el;
      l.style.position !== "absolute" && (C(l.previousSibling), l.parentElement.removeChild(l));
    }
    const a = s ? s.previousSibling : this.dom.parent.lastChild;
    a && a.nodeName === "#text" && C(a);
    for (const c of n) {
      const l = c.dom.el;
      m(r.lastChild) && r.appendChild(window.document.createTextNode(" ")), r.appendChild(l);
    }
    this.dom.parent.firstChild && this.dom.parent.firstChild !== s && r.insertBefore(window.document.createTextNode(" "), r.childNodes[0]), s ? (r.appendChild(window.document.createTextNode(" ")), this.dom.parent.insertBefore(r, s)) : this.dom.parent.appendChild(r);
  }
  parseSortString(e, t) {
    const i = e.split(" ");
    let n = t;
    for (let s = 0; s < i.length; s++) {
      const r = i[s].split(":");
      switch (n.sortString = i[s], n.attribute = ct(r[0]), n.order = r[1] || "asc", n.attribute) {
        case "default":
          n.attribute = "";
          break;
        case "random":
          n.attribute = "", n.order = "random";
          break;
      }
      if (!n.attribute || n.order === "random") break;
      s < i.length - 1 && (n.next = T(), Object.freeze(n), n = n.next);
    }
    return t;
  }
  parseEffects() {
    const e = this.config.animation.effectsIn || this.config.animation.effects, t = this.config.animation.effectsOut || this.config.animation.effects;
    this.effectsIn = u(), this.effectsOut = u(), this.transformIn = [], this.transformOut = [], this.effectsIn.opacity = this.effectsOut.opacity = 1, this.parseEffect("fade", e, this.effectsIn, this.transformIn), this.parseEffect("fade", t, this.effectsOut, this.transformOut, !0);
    for (const i in _)
      this.parseEffect(i, e, this.effectsIn, this.transformIn), this.parseEffect(i, t, this.effectsOut, this.transformOut, !0);
    this.parseEffect("stagger", e, this.effectsIn, this.transformIn), this.parseEffect("stagger", t, this.effectsOut, this.transformOut, !0);
  }
  parseEffect(e, t, i, n, s = !1) {
    const r = /\(([^)]+)\)/;
    if (typeof t != "string")
      throw new TypeError(d.errorConfigInvalidAnimationEffects());
    if (t.indexOf(e) < 0) {
      e === "stagger" && (this.staggerDuration = 0);
      return;
    }
    const a = t.indexOf(e + "(");
    let c = "";
    if (a > -1) {
      const l = t.substring(a), h = r.exec(l);
      h && (c = h[1]);
    }
    switch (e) {
      case "fade":
        i.opacity = c ? parseFloat(c) : 0;
        break;
      case "stagger":
        this.staggerDuration = c ? parseFloat(c) : 100;
        break;
      default: {
        const l = i[e], h = _[e];
        if (s && this.config.animation.reverseOut && e !== "scale" ? l.value = (c ? parseFloat(c) : h.value) * -1 : l.value = c ? parseFloat(c) : h.value, c) {
          for (const f of St)
            if (c.indexOf(f) > -1) {
              l.unit = f;
              break;
            }
        } else
          l.unit = h.unit;
        n.push(e + "(" + l.value + l.unit + ")");
      }
    }
  }
  buildState(e) {
    const t = [], i = [], n = [], s = [], r = new Set(e.toRemove);
    for (const a of this.targets)
      r.has(a) || t.push(a.dom.el);
    for (const a of e.matching)
      i.push(a.dom.el);
    for (const a of e.show)
      n.push(a.dom.el);
    for (const a of e.hide)
      r.has(a) || s.push(a.dom.el);
    return {
      id: this.id,
      container: this.dom.container,
      activeFilter: e.newFilter,
      activeSort: e.newSort,
      activeDataset: e.newDataset,
      activeContainerClassName: e.newContainerClassName,
      hasFailed: e.hasFailed,
      totalTargets: this.targets.length,
      totalShow: e.show.length,
      totalHide: e.hide.length,
      totalMatching: e.matching.length,
      triggerElement: e.triggerElement,
      targets: t,
      show: n,
      hide: s,
      matching: i
    };
  }
  createMutableState() {
    return {
      id: "",
      container: null,
      activeFilter: null,
      activeSort: null,
      activeDataset: null,
      activeContainerClassName: "",
      hasFailed: !1,
      totalTargets: 0,
      totalShow: 0,
      totalHide: 0,
      totalMatching: 0,
      triggerElement: null,
      targets: [],
      show: [],
      hide: [],
      matching: []
    };
  }
  goMix(e, t) {
    var n, s;
    (!this.config.animation.duration || !this.config.animation.effects || !M(this.dom.container)) && (e = !1), !t.toShow.length && !t.toHide.length && !t.willSort && !t.willChangeLayout && (e = !1), !((s = (n = t.startState) == null ? void 0 : n.show) != null && s.length) && !t.show.length && (e = !1), y("mixStart", this.dom.container, {
      state: t.startState,
      futureState: t.newState,
      instance: this
    }, this.dom.document), typeof this.config.callbacks.onMixStart == "function" && this.config.callbacks.onMixStart.call(
      this.dom.container,
      t.startState,
      t.newState,
      this
    ), this.dom.container.classList.remove(
      w(this.config.classNames, "container", this.config.classNames.modifierFailed)
    );
    let i;
    return this.userDeferred ? i = this.userDeferred : (i = this.createDeferred(), this.userDeferred = i), this.isBusy = !0, e ? (window.pageYOffset !== t.docState.scrollTop && window.scrollTo(t.docState.scrollLeft, t.docState.scrollTop), this.config.animation.applyPerspective && (this.dom.parent.style.perspective = this.config.animation.perspectiveDistance, this.dom.parent.style.perspectiveOrigin = this.config.animation.perspectiveOrigin), this.config.animation.animateResizeContainer && t.startHeight !== t.newHeight && t.viewportDeltaY !== t.startHeight - t.newHeight && (this.dom.parent.style.height = t.startHeight + "px"), this.config.animation.animateResizeContainer && t.startWidth !== t.newWidth && t.viewportDeltaX !== t.startWidth - t.newWidth && (this.dom.parent.style.width = t.startWidth + "px"), t.startHeight === t.newHeight && (this.dom.parent.style.height = t.startHeight + "px"), t.startWidth === t.newWidth && (this.dom.parent.style.width = t.startWidth + "px"), t.startHeight === t.newHeight && t.startWidth === t.newWidth && (this.dom.parent.style.overflow = "hidden"), requestAnimationFrame(() => {
      this.moveTargets(t);
    }), i.promise) : (this.config.debug.fauxAsync ? setTimeout(() => {
      this.cleanUp(t);
    }, this.config.animation.duration) : this.cleanUp(t), i.promise);
  }
  createDeferred() {
    let e, t;
    const i = new Promise((n, s) => {
      e = n, t = s;
    });
    return { resolve: e, reject: t, promise: i };
  }
  getStartMixData(e) {
    const t = window.getComputedStyle(this.dom.parent), i = this.dom.parent.getBoundingClientRect(), n = t.boxSizing;
    this.incPadding = n === "border-box";
    for (let s = 0; s < e.show.length; s++) {
      const a = e.show[s].getPosData();
      e.showPosData[s] = { startPosData: a };
    }
    for (let s = 0; s < e.toHide.length; s++) {
      const a = e.toHide[s].getPosData();
      e.toHidePosData[s] = { startPosData: a };
    }
    e.startX = i.left, e.startY = i.top, e.startHeight = this.incPadding ? i.height : i.height - parseFloat(t.paddingTop) - parseFloat(t.paddingBottom) - parseFloat(t.borderTop) - parseFloat(t.borderBottom), e.startWidth = this.incPadding ? i.width : i.width - parseFloat(t.paddingLeft) - parseFloat(t.paddingRight) - parseFloat(t.borderLeft) - parseFloat(t.borderRight);
  }
  setInter(e) {
    this.config.animation.clampHeight && (this.dom.parent.style.height = e.startHeight + "px", this.dom.parent.style.overflow = "hidden"), this.config.animation.clampWidth && (this.dom.parent.style.width = e.startWidth + "px", this.dom.parent.style.overflow = "hidden");
    for (const t of e.toShow)
      t.show();
    e.willChangeLayout && (e.startContainerClassName && this.dom.container.classList.remove(e.startContainerClassName), e.newContainerClassName && this.dom.container.classList.add(e.newContainerClassName));
  }
  getInterMixData(e) {
    for (let t = 0; t < e.show.length; t++) {
      const i = e.show[t];
      e.showPosData[t].interPosData = i.getPosData();
    }
    for (let t = 0; t < e.toHide.length; t++) {
      const i = e.toHide[t];
      e.toHidePosData[t].interPosData = i.getPosData();
    }
  }
  setFinal(e) {
    e.willSort && this.printSort(!1, e);
    for (const t of e.toHide)
      t.hide();
  }
  getFinalMixData(e) {
    for (let s = 0; s < e.show.length; s++) {
      const r = e.show[s];
      e.showPosData[s].finalPosData = r.getPosData();
    }
    for (let s = 0; s < e.toHide.length; s++) {
      const r = e.toHide[s];
      e.toHidePosData[s].finalPosData = r.getPosData();
    }
    (this.config.animation.clampHeight || this.config.animation.clampWidth) && (this.dom.parent.style.height = this.dom.parent.style.width = this.dom.parent.style.overflow = "");
    let t = null;
    this.incPadding || (t = window.getComputedStyle(this.dom.parent));
    const i = this.dom.parent.getBoundingClientRect();
    e.newX = i.left, e.newY = i.top, e.newHeight = this.incPadding ? i.height : i.height - parseFloat(t.paddingTop) - parseFloat(t.paddingBottom) - parseFloat(t.borderTop) - parseFloat(t.borderBottom), e.newWidth = this.incPadding ? i.width : i.width - parseFloat(t.paddingLeft) - parseFloat(t.paddingRight) - parseFloat(t.borderLeft) - parseFloat(t.borderRight);
    const n = this.dom.document && "documentElement" in this.dom.document ? this.dom.document.documentElement : null;
    e.viewportDeltaX = e.docState.viewportWidth - (n ? n.clientWidth : 0), e.viewportDeltaY = e.docState.viewportHeight - (n ? n.clientHeight : 0), e.willSort && this.printSort(!0, e);
    for (const s of e.toShow)
      s.hide();
    for (const s of e.toHide)
      s.show();
    e.willChangeLayout && (e.newContainerClassName && this.dom.container.classList.remove(e.newContainerClassName), this.config.layout.containerClassName && this.dom.container.classList.add(this.config.layout.containerClassName));
  }
  getTweenData(e) {
    const t = Object.getOwnPropertyNames(this.effectsIn);
    for (let i = 0; i < e.show.length; i++) {
      const n = e.show[i], s = e.showPosData[i];
      if (s.posIn = u(), s.posOut = u(), s.tweenData = u(), n.isShown ? (s.posIn.x = s.startPosData.x - s.interPosData.x, s.posIn.y = s.startPosData.y - s.interPosData.y) : s.posIn.x = s.posIn.y = 0, s.posOut.x = s.finalPosData.x - s.interPosData.x, s.posOut.y = s.finalPosData.y - s.interPosData.y, s.posIn.opacity = n.isShown ? 1 : this.effectsIn.opacity, s.posOut.opacity = 1, s.tweenData.opacity = s.posOut.opacity - s.posIn.opacity, !n.isShown && !this.config.animation.nudge && (s.posIn.x = s.posOut.x, s.posIn.y = s.posOut.y), s.tweenData.x = s.posOut.x - s.posIn.x, s.tweenData.y = s.posOut.y - s.posIn.y, this.config.animation.animateResizeTargets) {
        s.posIn.width = s.startPosData.width, s.posIn.height = s.startPosData.height;
        let r = (s.startPosData.width || s.finalPosData.width) - s.interPosData.width;
        s.posIn.marginRight = s.startPosData.marginRight - r;
        let a = (s.startPosData.height || s.finalPosData.height) - s.interPosData.height;
        s.posIn.marginBottom = s.startPosData.marginBottom - a, s.posOut.width = s.finalPosData.width, s.posOut.height = s.finalPosData.height, r = (s.finalPosData.width || s.startPosData.width) - s.interPosData.width, s.posOut.marginRight = s.finalPosData.marginRight - r, a = (s.finalPosData.height || s.startPosData.height) - s.interPosData.height, s.posOut.marginBottom = s.finalPosData.marginBottom - a, s.tweenData.width = s.posOut.width - s.posIn.width, s.tweenData.height = s.posOut.height - s.posIn.height, s.tweenData.marginRight = s.posOut.marginRight - s.posIn.marginRight, s.tweenData.marginBottom = s.posOut.marginBottom - s.posIn.marginBottom;
      }
      for (const r of t) {
        const a = this.effectsIn[r];
        typeof a != "object" || !("value" in a) || !a.value || (s.posIn[r].value = a.value, s.posOut[r].value = 0, s.tweenData[r].value = s.posOut[r].value - s.posIn[r].value, s.posIn[r].unit = s.posOut[r].unit = s.tweenData[r].unit = a.unit);
      }
    }
    for (let i = 0; i < e.toHide.length; i++) {
      const n = e.toHide[i], s = e.toHidePosData[i];
      if (s.posIn = u(), s.posOut = u(), s.tweenData = u(), s.posIn.x = n.isShown ? s.startPosData.x - s.interPosData.x : 0, s.posIn.y = n.isShown ? s.startPosData.y - s.interPosData.y : 0, s.posOut.x = this.config.animation.nudge ? 0 : s.posIn.x, s.posOut.y = this.config.animation.nudge ? 0 : s.posIn.y, s.tweenData.x = s.posOut.x - s.posIn.x, s.tweenData.y = s.posOut.y - s.posIn.y, this.config.animation.animateResizeTargets) {
        s.posIn.width = s.startPosData.width, s.posIn.height = s.startPosData.height;
        const r = s.startPosData.width - s.interPosData.width;
        s.posIn.marginRight = s.startPosData.marginRight - r;
        const a = s.startPosData.height - s.interPosData.height;
        s.posIn.marginBottom = s.startPosData.marginBottom - a;
      }
      s.posIn.opacity = 1, s.posOut.opacity = this.effectsOut.opacity, s.tweenData.opacity = s.posOut.opacity - s.posIn.opacity;
      for (const r of t) {
        const a = this.effectsOut[r];
        typeof a != "object" || !("value" in a) || !a.value || (s.posIn[r].value = 0, s.posOut[r].value = a.value, s.tweenData[r].value = s.posOut[r].value - s.posIn[r].value, s.posIn[r].unit = s.posOut[r].unit = s.tweenData[r].unit = a.unit);
      }
    }
  }
  moveTargets(e) {
    const t = this.checkProgress.bind(this), i = M(this.dom.container), n = [];
    let s = -1;
    for (let r = 0; r < e.show.length; r++) {
      const a = e.show[r], c = e.showPosData[r], l = L(), h = a.isShown ? "none" : "show", f = i && this.willTransition(
        h,
        e.hasEffect,
        c.posIn,
        c.posOut
      );
      f && s++, a.show(), l.posIn = c.posIn, l.posOut = c.posOut, l.statusChange = h, l.staggerIndex = s, l.operation = e, l.callback = f ? t : null, a.move(l), n.push([a, l]);
    }
    for (let r = 0; r < e.toHide.length; r++) {
      const a = e.toHide[r], c = e.toHidePosData[r], l = L(), h = i && this.willTransition(
        "hide",
        !0,
        c.posIn,
        c.posOut
      );
      l.posIn = c.posIn, l.posOut = c.posOut, l.statusChange = "hide", l.staggerIndex = r, l.operation = e, l.callback = h ? t : null, a.move(l), n.push([a, l]);
    }
    requestAnimationFrame(() => {
      for (const [r, a] of n)
        r.applyStylesOut(a);
    }), this.config.animation.animateResizeContainer && (this.dom.parent.style.transition = "height " + this.config.animation.duration + "ms ease, width " + this.config.animation.duration + "ms ease ", requestAnimationFrame(() => {
      e.startHeight !== e.newHeight && e.viewportDeltaY !== e.startHeight - e.newHeight && (this.dom.parent.style.height = e.newHeight + "px"), e.startWidth !== e.newWidth && e.viewportDeltaX !== e.startWidth - e.newWidth && (this.dom.parent.style.width = e.newWidth + "px");
    })), e.willChangeLayout && (this.config.layout.containerClassName && this.dom.container.classList.remove(this.config.layout.containerClassName), e.newContainerClassName && this.dom.container.classList.add(e.newContainerClassName));
  }
  hasEffect() {
    if (this.effectsIn.opacity !== 1) return !0;
    for (const e of yt) {
      const t = this.effectsIn[e];
      if ((typeof t == "object" && t && t.value !== void 0 ? t.value : t) !== 0) return !0;
    }
    return !1;
  }
  willTransition(e, t, i, n) {
    return e !== "none" && t || i.x !== n.x || i.y !== n.y ? !0 : this.config.animation.animateResizeTargets ? i.width !== n.width || i.height !== n.height || i.marginRight !== n.marginRight || i.marginBottom !== n.marginBottom : !1;
  }
  checkProgress(e, t) {
    this.targetsDone++, this.targetsBound === this.targetsDone && this.cleanUp(t);
  }
  cleanUp(e) {
    this.targetsMoved = this.targetsImmovable = this.targetsBound = this.targetsDone = 0;
    for (const t of e.show)
      t.cleanUp(), t.show();
    for (const t of e.toHide)
      t.cleanUp(), t.hide();
    if (e.willSort && this.printSort(!1, e), this.dom.parent.style.transition = "", this.dom.parent.style.height = "", this.dom.parent.style.width = "", this.dom.parent.style.overflow = "", this.dom.parent.style.perspective = "", this.dom.parent.style.perspectiveOrigin = "", e.willChangeLayout && (e.startContainerClassName && this.dom.container.classList.remove(e.startContainerClassName), e.newContainerClassName && this.dom.container.classList.add(e.newContainerClassName)), e.toRemove.length) {
      const t = new Set(e.toRemove);
      O(this.targets, (i) => {
        if (!t.has(i)) return !1;
        const n = i.dom.el.previousSibling, s = i.dom.el.nextSibling;
        return n && n.nodeName === "#text" && s && s.nodeName === "#text" && C(n), e.willSort || this.dom.parent.removeChild(i.dom.el), i.isInDom = !1, !0;
      }), this.origOrder = this.targets;
    }
    if (e.willSort && (this.targets = e.newOrder), this.state = e.newState, this.lastOperation = e, this.dom.targets = this.state.targets, y("mixEnd", this.dom.container, {
      state: this.state,
      instance: this
    }, this.dom.document), typeof this.config.callbacks.onMixEnd == "function" && this.config.callbacks.onMixEnd.call(this.dom.container, this.state, this), e.hasFailed && (y("mixFail", this.dom.container, {
      state: this.state,
      instance: this
    }, this.dom.document), typeof this.config.callbacks.onMixFail == "function" && this.config.callbacks.onMixFail.call(this.dom.container, this.state, this), this.dom.container.classList.add(
      w(this.config.classNames, "container", this.config.classNames.modifierFailed)
    )), typeof this.userCallback == "function" && this.userCallback.call(this.dom.container, this.state, this), this.userDeferred && typeof this.userDeferred.resolve == "function" && this.userDeferred.resolve(this.state), this.userCallback = null, this.userDeferred = null, this.lastClicked = null, this.isToggling = !1, this.isBusy = !1, this.queue.length) {
      const t = this.queue.shift();
      this.userDeferred = t.deferred, this.isToggling = t.isToggling, this.lastClicked = t.triggerElement, t.instruction && t.instruction.command && t.instruction.command.filter !== void 0 ? this.multimix(...t.args) : this.dataset(...t.args);
    }
  }
  parseMultimixArgs(e) {
    const t = p();
    t.animate = this.config.animation.enable, t.command = nt();
    for (const n of e)
      n !== null && (typeof n == "object" ? g(t.command, n) : typeof n == "boolean" ? t.animate = n : typeof n == "function" && (t.callback = n));
    const i = t.command;
    return i.insert && typeof i.insert == "object" && !i.insert.collection && (i.insert = this.parseInsertArgs([i.insert]).command), i.remove && typeof i.remove == "object" && !i.remove.targets && (i.remove = this.parseRemoveArgs([i.remove]).command), i.filter && typeof i.filter != "object" && (i.filter = this.parseFilterArgs([i.filter]).command), i.sort && typeof i.sort != "object" && (i.sort = this.parseSortArgs([i.sort]).command), i.changeLayout && typeof i.changeLayout != "object" && (i.changeLayout = this.parseChangeLayoutArgs([i.changeLayout]).command), Object.freeze(t), t;
  }
  parseFilterArgs(e) {
    const t = p();
    t.animate = this.config.animation.enable, t.command = J();
    const i = t.command;
    for (const n of e)
      typeof n == "string" ? i.selector = n : n === null ? i.collection = [] : typeof n == "object" && m(n, this.dom.document) ? i.collection = [n] : typeof n == "object" && typeof n.length < "u" ? i.collection = Array.from(n) : typeof n == "object" ? g(i, n) : typeof n == "boolean" ? t.animate = n : typeof n == "function" && (t.callback = n);
    if (i.selector && i.collection)
      throw new Error(d.errorFilterInvalidArguments());
    return Object.freeze(t), t;
  }
  parseSortArgs(e) {
    const t = p();
    t.animate = this.config.animation.enable, t.command = T();
    let i = "";
    for (const n of e)
      if (n !== null)
        switch (typeof n) {
          case "string":
            i = n;
            break;
          case "object":
            n.length && (t.command.collection = Array.from(n));
            break;
          case "boolean":
            t.animate = n;
            break;
          case "function":
            t.callback = n;
            break;
        }
    return i && (t.command = this.parseSortString(i, t.command)), Object.freeze(t), t;
  }
  parseInsertArgs(e) {
    const t = p();
    t.animate = this.config.animation.enable, t.command = tt();
    const i = t.command;
    for (const n of e)
      n !== null && (typeof n == "number" ? i.index = n : typeof n == "string" && ["before", "after"].indexOf(n) > -1 ? i.position = n : typeof n == "string" ? i.collection = Array.from(ht(n).childNodes) : typeof n == "object" && m(n, this.dom.document) ? i.collection.length ? i.sibling = n : i.collection = [n] : typeof n == "object" && n.length ? i.collection.length ? i.sibling = n[0] : i.collection = Array.from(n) : typeof n == "object" && n.childNodes && n.childNodes.length ? i.collection.length ? i.sibling = n.childNodes[0] : i.collection = Array.from(n.childNodes) : typeof n == "object" ? g(i, n) : typeof n == "boolean" ? t.animate = n : typeof n == "function" && (t.callback = n));
    if (i.index && i.sibling)
      throw new Error(d.errorInsertInvalidArguments());
    return !i.collection.length && this.config.debug.showWarnings && console.warn(d.warningInsertNoElements()), Object.freeze(t), t;
  }
  parseRemoveArgs(e) {
    const t = p();
    t.animate = this.config.animation.enable, t.command = et();
    const i = t.command;
    for (const n of e)
      if (n !== null)
        switch (typeof n) {
          case "number":
            this.targets[n] && (i.targets[0] = this.targets[n]);
            break;
          case "string":
            i.collection = Array.from(this.dom.parent.querySelectorAll(n));
            break;
          case "object":
            n && n.length ? i.collection = Array.from(n) : m(n, this.dom.document) ? i.collection = [n] : g(i, n);
            break;
          case "boolean":
            t.animate = n;
            break;
          case "function":
            t.callback = n;
            break;
        }
    if (i.collection.length) {
      const n = new Set(i.collection);
      for (const s of this.targets)
        n.has(s.dom.el) && i.targets.push(s);
    }
    return !i.targets.length && this.config.debug.showWarnings && console.warn(d.warningRemoveNoElements()), Object.freeze(t), t;
  }
  parseDatasetArgs(e) {
    const t = p();
    t.animate = this.config.animation.enable, t.command = it();
    for (const i of e)
      if (i !== null)
        switch (typeof i) {
          case "object":
            Array.isArray(i) || typeof i.length == "number" ? t.command.dataset = i : g(t.command, i);
            break;
          case "boolean":
            t.animate = i;
            break;
          case "function":
            t.callback = i;
            break;
        }
    return Object.freeze(t), t;
  }
  parseChangeLayoutArgs(e) {
    const t = p();
    t.animate = this.config.animation.enable, t.command = st();
    for (const i of e)
      if (i !== null)
        switch (typeof i) {
          case "string":
            t.command.containerClassName = i;
            break;
          case "object":
            g(t.command, i);
            break;
          case "boolean":
            t.animate = i;
            break;
          case "function":
            t.callback = i;
            break;
        }
    return Object.freeze(t), t;
  }
  queueMix(e) {
    const t = this.createDeferred();
    if (this.config.animation.queue && this.queue.length < this.config.animation.queueLimit) {
      if (e.deferred = t, this.queue.push(e), this.config.controls.enable)
        if (this.isToggling) {
          this.buildToggleArray(e.instruction.command);
          const i = this.getToggleSelector();
          this.updateControls({
            filter: { selector: i }
          });
        } else
          this.updateControls(e.instruction.command);
    } else
      this.config.debug.showWarnings && console.warn(d.warningMultimixInstanceQueueFull()), t.resolve(this.state), y("mixBusy", this.dom.container, {
        state: this.state,
        instance: this
      }, this.dom.document), typeof this.config.callbacks.onMixBusy == "function" && this.config.callbacks.onMixBusy.call(this.dom.container, this.state, this);
    return t.promise;
  }
  getDataOperation(e) {
    const t = D();
    let i = [];
    if (this.dom.targets.length && !(i = this.state.activeDataset || []).length)
      throw new Error(d.errorDatasetNotSet());
    return t.id = E(), t.startState = this.state, t.startDataset = i, t.newDataset = e.slice(), this.diffDatasets(t), t.startOrder = this.targets, t.newOrder = t.show, this.config.animation.enable && (this.getStartMixData(t), this.setInter(t), t.docState = F(this.dom.document), this.getInterMixData(t), this.setFinal(t), this.getFinalMixData(t), this.parseEffects(), t.hasEffect = this.hasEffect(), this.getTweenData(t)), this.targets = t.show.slice(), t.newState = this.buildState(t), Array.prototype.push.apply(this.targets, t.toRemove), t;
  }
  diffDatasets(e) {
    const t = [], i = [], n = [], s = {};
    let r = null, a = null;
    for (const l of e.newDataset) {
      const h = l[this.config.data.uidKey];
      if (typeof h > "u" || h.toString().length < 1)
        throw new TypeError(d.errorDatasetInvalidUidKey({
          uidKey: this.config.data.uidKey
        }));
      if (!s[h])
        s[h] = !0;
      else
        throw new Error(d.errorDatasetDuplicateUid({
          uid: h
        }));
      let f = this.cache[h];
      if (f instanceof b) {
        if (this.config.data.dirtyCheck && !B(l, f.data)) {
          const S = f.render(l);
          f.data = l, S !== f.dom.el && (f.isInDom && (f.unbindEvents(), this.dom.parent.replaceChild(S, f.dom.el)), f.isShown || (S.style.display = "none"), f.dom.el = S, f.isInDom && f.bindEvents());
        }
      } else
        f = new b(), f.init(null, this, l), f.hide();
      f.isInDom ? (a = f.dom.el.nextElementSibling, i.push(h), r && (r.lastElementChild && r.appendChild(this.dom.document.createTextNode(" ")), this.insertDatasetFrag(r, f.dom.el, n), r = null)) : (r || (r = this.dom.document.createDocumentFragment()), r.lastElementChild && r.appendChild(this.dom.document.createTextNode(" ")), r.appendChild(f.dom.el), f.isInDom = !0, f.unbindEvents(), f.bindEvents(), f.hide(), e.toShow.push(f), n.push(f)), e.show.push(f);
    }
    r && (a = a || this.config.layout.siblingAfter, a && r.appendChild(this.dom.document.createTextNode(" ")), this.insertDatasetFrag(r, a, n));
    const c = new Set(e.show);
    for (const l of e.startDataset) {
      const h = l[this.config.data.uidKey], f = this.cache[h];
      c.has(f) ? t.push(h) : (e.hide.push(f), e.toHide.push(f), e.toRemove.push(f));
    }
    A(t, i) || (e.willSort = !0);
  }
  insertDatasetFrag(e, t, i) {
    const n = t ? Array.from(this.dom.parent.children).indexOf(t) : this.targets.length;
    this.dom.parent.insertBefore(e, t), this.targets.splice(n, 0, ...i), i.length = 0;
  }
  willSortCheck(e, t) {
    return this.config.behavior.liveSort || e.order === "random" || e.attribute !== t.attribute || e.order !== t.order || e.collection !== t.collection || e.next === null && t.next || e.next && t.next === null ? !0 : e.next && t.next ? this.willSortCheck(e.next, t.next) : !1;
  }
  // Public API methods
  show() {
    return this.filter("all");
  }
  hide() {
    return this.filter("none");
  }
  isMixing() {
    return this.isBusy;
  }
  filter(...e) {
    const t = this.parseFilterArgs(e);
    return this.multimix({
      filter: t.command
    }, t.animate, t.callback);
  }
  toggleOn(...e) {
    const t = this.parseFilterArgs(e), i = t.command.selector;
    this.isToggling = !0, this.toggleArray.indexOf(i) < 0 && this.toggleArray.push(i);
    const n = this.getToggleSelector();
    return this.multimix({
      filter: n
    }, t.animate, t.callback);
  }
  toggleOff(...e) {
    const t = this.parseFilterArgs(e), i = t.command.selector, n = this.toggleArray.indexOf(i);
    this.isToggling = !0, n > -1 && this.toggleArray.splice(n, 1);
    const s = this.getToggleSelector();
    return this.multimix({
      filter: s
    }, t.animate, t.callback);
  }
  sort(...e) {
    const t = this.parseSortArgs(e);
    return this.multimix({
      sort: t.command
    }, t.animate, t.callback);
  }
  changeLayout(...e) {
    const t = this.parseChangeLayoutArgs(e);
    return this.multimix({
      changeLayout: t.command
    }, t.animate, t.callback);
  }
  multimix(...e) {
    const t = this.parseMultimixArgs(e);
    if (this.isBusy) {
      const i = N();
      return i.args = e, i.instruction = t, i.triggerElement = this.lastClicked, i.isToggling = this.isToggling, this.queueMix(i);
    } else {
      const i = this.getOperation(t.command);
      if (!i)
        return Promise.resolve(this.state);
      this.config.controls.enable && (t.command.filter && !this.isToggling && (this.toggleArray.length = 0, this.buildToggleArray(i.command)), this.queue.length < 1 && this.updateControls(i.command)), t.callback && (this.userCallback = t.callback);
      const n = t.animate ^ this.config.animation.enable ? t.animate : this.config.animation.enable;
      return this.goMix(n, i);
    }
  }
  dataset(...e) {
    const t = this.parseDatasetArgs(e);
    if (this.isBusy) {
      const i = N();
      return i.args = e, i.instruction = t, this.queueMix(i);
    } else {
      t.callback && (this.userCallback = t.callback);
      const i = t.animate ^ this.config.animation.enable ? t.animate : this.config.animation.enable, n = this.getDataOperation(t.command.dataset);
      return this.goMix(i, n);
    }
  }
  getOperation(e) {
    const t = e.sort, i = e.filter, n = e.changeLayout, s = e.remove, r = e.insert, a = D();
    return a.id = E(), a.command = e, a.startState = this.state, a.triggerElement = this.lastClicked, this.isBusy ? (this.config.debug.showWarnings && console.warn(d.warningGetOperationInstanceBusy()), null) : (r && this.insertTargets(r, a), s && (a.toRemove = s.targets), a.startSort = a.newSort = this.state.activeSort, a.startOrder = a.newOrder = this.targets, t && (a.startSort = this.state.activeSort, a.newSort = t, a.willSort = this.willSortCheck(t, this.state.activeSort), a.willSort && this.sortOperation(a)), a.startFilter = this.state.activeFilter, i ? a.newFilter = i : a.newFilter = { ...a.startFilter }, a.newFilter.selector === "all" ? a.newFilter.selector = this.config.selectors.target : a.newFilter.selector === "none" && (a.newFilter.selector = ""), this.filterOperation(a), a.startContainerClassName = this.state.activeContainerClassName, n ? (a.newContainerClassName = n.containerClassName, a.newContainerClassName !== a.startContainerClassName && (a.willChangeLayout = !0)) : a.newContainerClassName = a.startContainerClassName, this.config.animation.enable && (this.getStartMixData(a), this.setInter(a), a.docState = F(this.dom.document), this.getInterMixData(a), this.setFinal(a), this.getFinalMixData(a), this.parseEffects(), a.hasEffect = this.hasEffect(), this.getTweenData(a)), a.willSort && (this.targets = a.newOrder), a.newState = this.buildState(a), a);
  }
  tween(e, t) {
    t = Math.min(t, 1), t = Math.max(t, 0);
    for (let n = 0; n < e.show.length; n++) {
      const s = e.show[n], r = e.showPosData[n];
      s.applyTween(r, t);
    }
    const i = /* @__PURE__ */ new Map();
    for (let n = e.toHide.length - 1; n >= 0; n--)
      i.set(e.toHide[n], n);
    for (let n = 0; n < e.hide.length; n++) {
      const s = e.hide[n];
      s.isShown && s.hide();
      const r = i.get(s);
      if (typeof r < "u") {
        const a = e.toHidePosData[r];
        s.isShown || s.show(), s.applyTween(a, t);
      }
    }
  }
  insert(...e) {
    const t = this.parseInsertArgs(e);
    return this.multimix({
      insert: t.command
    }, t.animate, t.callback);
  }
  insertBefore(...e) {
    const t = this.parseInsertArgs(e), i = t.command;
    return this.insert(i.collection, "before", i.sibling, t.animate, t.callback);
  }
  insertAfter(...e) {
    const t = this.parseInsertArgs(e), i = t.command;
    return this.insert(i.collection, "after", i.sibling, t.animate, t.callback);
  }
  prepend(...e) {
    const t = this.parseInsertArgs(e), i = t.command;
    return this.insert(0, i.collection, t.animate, t.callback);
  }
  append(...e) {
    const t = this.parseInsertArgs(e), i = t.command;
    return this.insert(this.state.totalTargets, i.collection, t.animate, t.callback);
  }
  remove(...e) {
    const t = this.parseRemoveArgs(e);
    return this.multimix({
      remove: t.command
    }, t.animate, t.callback);
  }
  getConfig(e) {
    return e ? gt(this.config, e) : this.config;
  }
  configure(e) {
    g(this.config, e, !0, !0);
  }
  getState() {
    const e = { ...this.state };
    return Object.freeze(e), e;
  }
  forceRefresh() {
    this.indexTargets();
  }
  forceRender() {
    for (const e in this.cache) {
      const t = this.cache[e], i = t.render(t.data);
      i !== t.dom.el && (t.isInDom && (t.unbindEvents(), this.dom.parent.replaceChild(i, t.dom.el)), t.isShown || (i.style.display = "none"), t.dom.el = i, t.isInDom && t.bindEvents());
    }
    this.state = this.buildState(this.lastOperation);
  }
  destroy(e = !1) {
    for (const t of this.controls)
      t.removeBinding(this);
    for (const t of this.targets)
      e && t.show(), t.unbindEvents();
    this.dom.container.id.match(/^MixItUp/) && this.dom.container.removeAttribute("id"), x.delete(this.id);
  }
}
class It {
  constructor(e) {
    for (let t = 0; t < e.length; t++)
      this[t] = e[t];
    this.length = e.length, Object.freeze(this);
  }
  /**
   * Calls a method on all instances in the collection by passing the method
   * name as a string followed by any applicable parameters.
   */
  mixitup(e, ...t) {
    const i = [];
    for (let n = 0; n < this.length; n++) {
      const s = this[n];
      i.push(s[e](...t));
    }
    return Promise.all(i);
  }
}
function xt(o) {
  const e = {
    configure: o.configure.bind(o),
    show: o.show.bind(o),
    hide: o.hide.bind(o),
    filter: o.filter.bind(o),
    toggleOn: o.toggleOn.bind(o),
    toggleOff: o.toggleOff.bind(o),
    sort: o.sort.bind(o),
    changeLayout: o.changeLayout.bind(o),
    multimix: o.multimix.bind(o),
    dataset: o.dataset.bind(o),
    tween: o.tween.bind(o),
    insert: o.insert.bind(o),
    insertBefore: o.insertBefore.bind(o),
    insertAfter: o.insertAfter.bind(o),
    prepend: o.prepend.bind(o),
    append: o.append.bind(o),
    remove: o.remove.bind(o),
    destroy: o.destroy.bind(o),
    forceRefresh: o.forceRefresh.bind(o),
    forceRender: o.forceRender.bind(o),
    isMixing: o.isMixing.bind(o),
    getOperation: o.getOperation.bind(o),
    getConfig: o.getConfig.bind(o),
    getState: o.getState.bind(o)
  };
  return Object.freeze(e);
}
function Dt(o, e, t, i) {
  const n = t || window.document;
  let s;
  if (typeof o == "string")
    s = n.querySelectorAll(o);
  else if (o && typeof o == "object" && m(o, n))
    s = [o];
  else if (o && typeof o == "object" && "length" in o)
    s = o;
  else
    throw new Error(d.errorFactoryInvalidContainer());
  if (s.length < 1)
    throw new Error(d.errorFactoryContainerNotFound());
  const r = [];
  for (let a = 0; a < s.length; a++) {
    const c = s[a];
    if (a > 0 && !i) break;
    let l;
    c.id ? l = c.id : (l = "MixItUp" + E(), c.id = l);
    let h, f;
    x.has(l) ? (h = x.get(l), (!e || e && e.debug && e.debug.showWarnings !== !1) && console.warn(d.warningFactoryPreexistingInstance())) : (h = new vt(), h.attach(c, n, l, e), x.set(l, h)), e && e.debug && e.debug.enable ? r.push(h) : (f = xt(h), r.push(f));
  }
  return i ? new It(r) : r[0];
}
export {
  It as Collection,
  vt as Mixer,
  Dt as default,
  d as messages,
  rt as template
};
//# sourceMappingURL=mixitup.js.map
