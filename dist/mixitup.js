function H() {
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
function j() {
  return {
    onMixStart: null,
    onMixBusy: null,
    onMixEnd: null,
    onMixFail: null,
    onMixClick: null
  };
}
function W() {
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
function z() {
  return {
    enable: !0,
    live: !1,
    scope: "global",
    toggleLogic: "or",
    toggleDefault: "all"
  };
}
function q() {
  return {
    uidKey: "",
    dirtyCheck: !1
  };
}
function Y() {
  return {
    enable: !1,
    showWarnings: !0,
    fauxAsync: !1
  };
}
function G() {
  return {
    allowNestedTargets: !0,
    containerClassName: "",
    siblingBefore: null,
    siblingAfter: null
  };
}
function V() {
  return {
    filter: "all",
    sort: "default:asc",
    dataset: null
  };
}
function X() {
  return {
    target: null
  };
}
function K() {
  return {
    target: ".mix",
    control: ""
  };
}
function $() {
  return {};
}
function Z() {
  return {
    animation: H(),
    behavior: U(),
    callbacks: j(),
    controls: z(),
    classNames: W(),
    data: q(),
    debug: Y(),
    layout: G(),
    load: V(),
    render: X(),
    selectors: K(),
    templates: $()
  };
}
function I() {
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
function E() {
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
function Q() {
  return {
    selector: "",
    collection: null,
    action: "show"
  };
}
function N() {
  return {
    sortString: "",
    attribute: "",
    order: "asc",
    collection: null,
    next: null
  };
}
function J() {
  return {
    index: 0,
    collection: [],
    position: "before",
    sibling: null
  };
}
function tt() {
  return {
    targets: [],
    collection: []
  };
}
function et() {
  return {
    dataset: null
  };
}
function it() {
  return {
    containerClassName: ""
  };
}
function st() {
  return {
    filter: null,
    sort: null,
    insert: null,
    remove: null,
    changeLayout: null
  };
}
const T = {
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
  let s = [];
  const n = e;
  try {
    if (Array.isArray(e))
      for (let a = 0; a < e.length; a++)
        s.push(String(a));
    else e && (s = Object.keys(e));
    for (let a = 0; a < s.length; a++) {
      const r = s[a];
      !t || typeof n[r] != "object" || m(n[r]) ? o[r] = n[r] : Array.isArray(n[r]) ? (o[r] || (o[r] = []), g(o[r], n[r], t, i)) : (o[r] || (o[r] = {}), g(o[r], n[r], t, i));
    }
  } catch (a) {
    if (i)
      nt(a, o);
    else
      throw a;
  }
  return o;
}
function nt(o, e) {
  const t = /property "?(\w*)"?[,:] object/i;
  if (o instanceof TypeError) {
    const i = t.exec(o.message);
    if (i) {
      const s = i[1];
      let n = "", a = -1;
      for (const c in e) {
        let l = 0;
        for (; l < s.length && s.charAt(l) === c.charAt(l); )
          l++;
        l > a && (a = l, n = c);
      }
      let r = "";
      a > 1 && (r = `Did you mean "${n}"?`);
      const h = `[MixItUp] Invalid config property "${s}". ${r}`.trim();
      throw new TypeError(h);
    }
  }
  throw o;
}
function at(o) {
  const e = /\${([\w]*)}/g, t = {};
  let i;
  for (; i = e.exec(o); )
    t[i[1]] = new RegExp("\\${" + i[1] + "}", "g");
  return (s) => {
    let n = o;
    s = s || {};
    for (const a in t)
      n = n.replace(t[a], typeof s[a] < "u" ? s[a] : "");
    return n;
  };
}
function rt(o, e) {
  let t = 0, i = o.previousElementSibling;
  for (; i !== null; )
    (!e || i.matches(e)) && ++t, i = i.previousElementSibling;
  return t;
}
function _(o) {
  return o.toLowerCase().replace(/([_-][a-z])/g, (e) => e.toUpperCase().replace(/[_-]/, ""));
}
function ot(o) {
  const e = _(o);
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function lt(o) {
  return o.replace(/([A-Z])/g, "-$1").replace(/^-/, "").toLowerCase();
}
function m(o, e) {
  return e = e || window.document, window.HTMLElement && o instanceof window.HTMLElement || e.defaultView && e.defaultView.HTMLElement && o instanceof e.defaultView.HTMLElement ? !0 : o !== null && o.nodeType === 1 && typeof o.nodeName == "string";
}
function ct(o, e) {
  e = e || window.document;
  const t = e.createDocumentFragment(), i = e.createElement("div");
  for (i.innerHTML = o.trim(); i.firstChild; )
    t.appendChild(i.firstChild);
  return t;
}
function D(o) {
  var t;
  let e;
  for (; o && o.nodeName === "#text"; )
    e = o, o = o.previousSibling, (t = e.parentElement) == null || t.removeChild(e);
}
function R(o, e) {
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
function ht(o) {
  const e = o.slice(), t = e.length;
  let i = t;
  for (; i--; ) {
    const s = ~~(Math.random() * t), n = e[i];
    e[i] = e[s], e[s] = n;
  }
  return e;
}
function ft(o, e) {
  return o ? Array.from(o.querySelectorAll(":scope > " + e)) : [];
}
function A(o) {
  const e = [];
  for (let t = 0; t < o.length; t++)
    o[t] !== "" && e.push(o[t]);
  return e;
}
function O() {
  return ("00000" + (Math.random() * 16777216 << 0).toString(16)).substr(-6).toUpperCase();
}
function k(o) {
  return o = o && typeof o.body == "object" ? o : window.document, {
    scrollTop: window.pageYOffset,
    scrollLeft: window.pageXOffset,
    docHeight: o.documentElement.scrollHeight,
    docWidth: o.documentElement.scrollWidth,
    viewportHeight: o.documentElement.clientHeight,
    viewportWidth: o.documentElement.clientWidth
  };
}
function F(o) {
  if (o.offsetParent) return !0;
  const e = window.getComputedStyle(o);
  return e.position === "fixed" && e.visibility !== "hidden" && e.opacity !== "0";
}
function w(o, e, t) {
  let i = "";
  return i += o.block, i.length && (i += o.delineatorElement), i += o["element" + ot(e)], t && (i.length && (i += o.delineatorModifier), i += t), i;
}
function dt(o, e) {
  const t = e.split(".");
  if (!e)
    return o;
  let i = o;
  for (let s = 0; s < t.length; s++) {
    if (!i)
      return null;
    i = i[t[s]];
  }
  return typeof i < "u" ? i : null;
}
const M = {
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
function gt() {
  const o = {};
  for (const e in M) {
    const t = M[e], i = _(e);
    o[i] = at(t);
  }
  return o;
}
const f = gt();
class y {
  constructor() {
    this.id = "", this.sortString = "", this.mixer = null, this.callback = null, this.isShown = !1, this.isBound = !1, this.isExcluded = !1, this.isInDom = !1, this.handler = null, this.operation = null, this.data = null, this.dom = { el: null };
  }
  init(e, t, i) {
    if (this.mixer = t, e || (e = this.render(i)), this.cacheDom(e), this.bindEvents(), this.dom.el.style.display !== "none" && (this.isShown = !0), i && t.config.data.uidKey) {
      const s = i[t.config.data.uidKey];
      if (typeof s > "u" || String(s).length < 1)
        throw new TypeError(
          f.errorDatasetInvalidUidKey({
            uidKey: t.config.data.uidKey
          })
        );
      this.id = s, this.data = i, t.cache[s] = this;
    }
  }
  render(e) {
    const t = this.mixer.config.render.target;
    if (typeof t != "function")
      throw new TypeError(
        f.errorDatasetRendererNotSet()
      );
    const i = t(e);
    if (i && typeof i == "object" && m(i))
      return i;
    if (typeof i == "string") {
      const s = document.createElement("div");
      return s.innerHTML = i, s.firstElementChild;
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
  move(e) {
    this.isExcluded || this.mixer.targetsMoved++, this.applyStylesIn(e), requestAnimationFrame(() => {
      this.applyStylesOut(e);
    });
  }
  applyTween(e, t) {
    const i = e.posIn, s = [], n = {
      x: i.x,
      y: i.y
    };
    t === 0 ? this.hide() : this.isShown || this.show();
    for (const a of T.TWEENABLE) {
      const r = e.tweenData[a];
      if (a === "x") {
        if (!r) continue;
        n.x = i.x + r * t;
      } else if (a === "y") {
        if (!r) continue;
        n.y = i.y + r * t;
      } else if (r && typeof r == "object" && "value" in r) {
        if (!r.value) continue;
        const h = i[a];
        n[a] = {
          value: h.value + r.value * t,
          unit: r.unit
        }, s.push(
          a + "(" + n[a].value + r.unit + ")"
        );
      } else {
        if (!r) continue;
        n[a] = i[a] + r * t, this.dom.el.style[a] = n[a];
      }
    }
    (n.x || n.y) && s.unshift("translate(" + n.x + "px, " + n.y + "px)"), s.length && (this.dom.el.style.transform = s.join(" "));
  }
  applyStylesIn(e) {
    const t = e.posIn, i = this.dom.el, s = this.mixer.effectsIn.opacity !== 1;
    let n = [];
    n.push("translate(" + t.x + "px, " + t.y + "px)"), this.mixer.config.animation.animateResizeTargets && (e.statusChange !== "show" && (i.style.width = t.width + "px", i.style.height = t.height + "px"), i.style.marginRight = t.marginRight + "px", i.style.marginBottom = t.marginBottom + "px"), s && (i.style.opacity = String(t.opacity)), e.statusChange === "show" && (n = n.concat(this.mixer.transformIn)), i.style.transform = n.join(" ");
  }
  applyStylesOut(e) {
    const t = [];
    let i = [];
    const s = this.mixer.config.animation.animateResizeTargets, n = typeof this.mixer.effectsIn.opacity < "u", a = this.dom.el;
    if (t.push(this.writeTransitionRule(
      T.transformRule,
      e.staggerIndex
    )), e.statusChange !== "none" && t.push(this.writeTransitionRule(
      "opacity",
      e.staggerIndex,
      e.duration
    )), s && (t.push(this.writeTransitionRule(
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
    const r = e.posOut;
    switch (s && r.width > 0 && r.height > 0 && (a.style.width = r.width + "px", a.style.height = r.height + "px", a.style.marginRight = r.marginRight + "px", a.style.marginBottom = r.marginBottom + "px"), !this.mixer.config.animation.nudge && e.statusChange === "hide" && i.push("translate(" + r.x + "px, " + r.y + "px)"), e.statusChange) {
      case "hide":
        n && (a.style.opacity = String(this.mixer.effectsOut.opacity)), i = i.concat(this.mixer.transformOut);
        break;
      case "show":
        n && (a.style.opacity = "1");
    }
    (this.mixer.config.animation.nudge || !this.mixer.config.animation.nudge && e.statusChange !== "hide") && i.push("translate(" + r.x + "px, " + r.y + "px)"), a.style.transform = i.join(" ");
  }
  writeTransitionRule(e, t, i) {
    const s = this.getDelay(t);
    return e + " " + (i && i > 0 ? i : this.mixer.config.animation.duration) + "ms " + s + "ms " + (e === "opacity" ? "linear" : this.mixer.config.animation.easing);
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
      const s = t.getBoundingClientRect();
      i.top = s.top, i.right = s.right, i.bottom = s.bottom, i.left = s.left, i.width = s.width, i.height = s.height;
    }
    if (this.mixer.config.animation.animateResizeTargets) {
      const s = window.getComputedStyle(t);
      i.marginBottom = parseFloat(s.marginBottom), i.marginRight = parseFloat(s.marginRight);
    }
    return i;
  }
  cleanUp() {
    const e = this.dom.el;
    e.style.transform = "", e.style.transition = "", e.style.opacity = "", this.mixer.config.animation.animateResizeTargets && (e.style.width = "", e.style.height = "", e.style.marginRight = "", e.style.marginBottom = "");
  }
}
function ut() {
  return {
    base: "",
    active: "",
    disabled: ""
  };
}
const mt = ["mixStart", "mixBusy", "mixEnd", "mixFail", "mixClick"];
function b(o, e, t, i) {
  if (!mt.includes(o))
    throw new Error('Event type "' + o + '" not found.');
  const s = {
    state: { ...t.state },
    futureState: t.futureState ? { ...t.futureState } : null,
    instance: t.instance,
    originalEvent: t.originalEvent || null
  }, n = new CustomEvent(o, {
    bubbles: !0,
    cancelable: !0,
    detail: s
  });
  e.dispatchEvent(n);
}
const v = [];
class pt {
  constructor() {
    this.el = null, this.selector = "", this.bound = [], this.pending = -1, this.type = "", this.status = "inactive", this.filter = "", this.sort = "", this.canDisable = !1, this.handler = null, this.classNames = ut();
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
    this.bindClick(), v.push(this);
  }
  isBound(e) {
    return this.bound.indexOf(e) > -1;
  }
  addBinding(e) {
    this.isBound(e) || this.bound.push(e);
  }
  removeBinding(e) {
    let t = this.bound.indexOf(e);
    t > -1 && this.bound.splice(t, 1), this.bound.length < 1 && (this.unbindClick(), t = v.indexOf(this), t > -1 && v.splice(t, 1), this.status === "active" && this.renderStatus(this.el, "inactive"));
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
    let t = null, i = !1, s;
    const n = {};
    this.pending = 0;
    const a = this.bound[0];
    if (this.selector ? t = e.target.closest(
      a.config.selectors.control + this.selector
    ) : t = this.el, !t)
      return;
    switch (this.type) {
      case "filter":
        n.filter = this.filter || t.getAttribute("data-filter");
        break;
      case "sort":
        n.sort = this.sort || t.getAttribute("data-sort");
        break;
      case "multimix":
        n.filter = this.filter || t.getAttribute("data-filter"), n.sort = this.sort || t.getAttribute("data-sort");
        break;
      case "toggle":
        n.filter = this.filter || t.getAttribute("data-toggle"), this.status === "live" ? i = t.classList.contains(this.classNames.active) : i = this.status === "active";
        break;
    }
    const r = [];
    for (let h = 0; h < this.bound.length; h++) {
      const c = {};
      g(c, n), r.push(c);
    }
    this.pending = this.bound.length;
    for (let h = 0; h < this.bound.length; h++) {
      const c = this.bound[h], l = r[h];
      l && (c.lastClicked || (c.lastClicked = t), b("mixClick", c.dom.container, {
        state: c.state,
        instance: c,
        originalEvent: e,
        control: c.lastClicked
      }, c.dom.document), !(typeof c.config.callbacks.onMixClick == "function" && (s = c.config.callbacks.onMixClick.call(
        c.lastClicked,
        c.state,
        e,
        c
      ), s === !1)) && (this.type === "toggle" ? i ? c.toggleOff(l.filter) : c.toggleOn(l.filter) : c.multimix(l)));
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
    for (let s = 0; s < i.length; s++) {
      const n = i[s], a = {};
      switch (this.type) {
        case "filter":
          a.filter = n.getAttribute("data-filter");
          break;
        case "sort":
          a.sort = n.getAttribute("data-sort");
          break;
        case "multimix":
          a.filter = n.getAttribute("data-filter"), a.sort = n.getAttribute("data-sort");
          break;
        case "toggle":
          a.filter = n.getAttribute("data-toggle");
          break;
      }
      this.parseStatusChange(n, e, a, t);
    }
  }
  parseStatusChange(e, t, i, s) {
    switch (this.type) {
      case "filter":
        t.filter === i.filter ? this.renderStatus(e, "active") : this.renderStatus(e, "inactive");
        break;
      case "multimix":
        t.sort === i.sort && t.filter === i.filter ? this.renderStatus(e, "active") : this.renderStatus(e, "inactive");
        break;
      case "sort":
        let n = "";
        t.sort.match(/:asc/g) && (n = t.sort.replace(/:asc/g, "")), t.sort === i.sort || n === i.sort ? this.renderStatus(e, "active") : this.renderStatus(e, "inactive");
        break;
      case "toggle":
        s.length < 1 && this.renderStatus(e, "inactive"), t.filter === i.filter && this.renderStatus(e, "active");
        for (let a = 0; a < s.length; a++) {
          if (s[a] === i.filter) {
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
function S(o, e, t = !1, i = "") {
  return Object.freeze({ type: o, selector: e, live: t, parent: i });
}
const wt = [
  S("multimix", "[data-filter][data-sort]"),
  S("filter", "[data-filter]"),
  S("sort", "[data-sort]"),
  S("toggle", "[data-toggle]")
], x = /* @__PURE__ */ new Map();
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
function P() {
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
const L = {
  scale: { value: 0.01, unit: "" },
  translateX: { value: 20, unit: "px" },
  translateY: { value: 20, unit: "px" },
  translateZ: { value: 20, unit: "px" },
  rotateX: { value: 20, unit: "deg" },
  rotateY: { value: 20, unit: "deg" },
  rotateZ: { value: 20, unit: "deg" }
};
class yt {
  constructor() {
    this.config = Z(), this.id = "", this.isBusy = !1, this.isToggling = !1, this.incPadding = !0, this.controls = [], this.targets = [], this.origOrder = [], this.cache = {}, this.toggleArray = [], this.targetsMoved = 0, this.targetsImmovable = 0, this.targetsBound = 0, this.targetsDone = 0, this.staggerDuration = 0, this.effectsIn = null, this.effectsOut = null, this.transformIn = [], this.transformOut = [], this.queue = [], this.state = null, this.lastOperation = null, this.lastClicked = null, this.userCallback = null, this.userDeferred = null, this.dom = {
      document: null,
      body: null,
      container: null,
      parent: null,
      targets: []
    };
  }
  attach(e, t, i, s) {
    this.id = i, s && g(this.config, s, !0, !0), this.sanitizeConfig(), this.cacheDom(e, t), this.config.layout.containerClassName && this.dom.container.classList.add(this.config.layout.containerClassName), this.config.data.uidKey && (this.config.controls.enable = !1), this.indexTargets(), this.state = this.getInitialState();
    for (const n of this.lastOperation.toHide)
      n.hide();
    this.config.controls.enable && (this.initControls(), this.buildToggleArray(null, this.state), this.updateControls({
      filter: this.state.activeFilter,
      sort: this.state.activeSort
    })), this.parseEffects();
  }
  sanitizeConfig() {
    this.config.controls.scope = this.config.controls.scope.toLowerCase().trim(), this.config.controls.toggleLogic = this.config.controls.toggleLogic.toLowerCase().trim(), this.config.controls.toggleDefault = this.config.controls.toggleDefault.toLowerCase().trim(), this.config.animation.effects = this.config.animation.effects.trim();
  }
  getInitialState() {
    let e = this.createMutableState(), t = I();
    if (e.activeContainerClassName = this.config.layout.containerClassName, this.config.load.dataset) {
      if (!this.config.data.uidKey || typeof this.config.data.uidKey != "string")
        throw new TypeError(f.errorConfigDataUidKeyNotSet());
      t.startDataset = t.newDataset = e.activeDataset = this.config.load.dataset.slice(), t.startContainerClassName = t.newContainerClassName = e.activeContainerClassName, t.show = this.targets.slice();
    } else
      e.activeFilter = this.parseFilterArgs([this.config.load.filter]).command, e.activeSort = this.parseSortArgs([this.config.load.sort]).command, e.totalTargets = this.targets.length, e.activeSort.collection || e.activeSort.attribute || e.activeSort.order === "random" || e.activeSort.order === "desc" ? (t.newSort = e.activeSort, this.sortOperation(t), this.printSort(!1, t), this.targets = t.newOrder) : t.startOrder = t.newOrder = this.targets, t.startFilter = t.newFilter = e.activeFilter, t.startSort = t.newSort = e.activeSort, t.startContainerClassName = t.newContainerClassName = e.activeContainerClassName, t.newFilter.selector === "all" ? t.newFilter.selector = this.config.selectors.target : t.newFilter.selector === "none" && (t.newFilter.selector = "");
    return this.lastOperation = t, t.newFilter && this.filterOperation(t), e = this.buildState(t), e;
  }
  cacheDom(e, t) {
    this.dom.document = t, this.dom.body = this.dom.document.querySelector("body"), this.dom.container = e, this.dom.parent = e;
  }
  indexTargets() {
    const e = this.config.layout.allowNestedTargets ? this.dom.container.querySelectorAll(this.config.selectors.target) : ft(this.dom.container, this.config.selectors.target);
    this.dom.targets = Array.from(e), this.targets = [];
    const t = this.config.load.dataset;
    if (t && t.length !== this.dom.targets.length)
      throw new Error(f.errorDatasetPrerenderedMismatch());
    if (this.dom.targets.length) {
      for (let i = 0; i < this.dom.targets.length; i++) {
        const s = this.dom.targets[i], n = new y();
        n.init(s, this, t ? t[i] : void 0), n.isInDom = !0, this.targets.push(n);
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
        throw new Error(f.errorConfigInvalidControlsScope());
    }
    for (const t of wt)
      if (this.config.controls.live || t.live) {
        let i;
        if (t.parent) {
          const s = this.dom[t.parent];
          if (!s || Array.isArray(s) && s.length < 1) continue;
          i = typeof s.length == "number" ? Array.from(s) : [s];
        } else
          i = [e];
        for (const s of i) {
          const n = this.getControl(s, t.type, t.selector);
          this.controls.push(n);
        }
      } else {
        const i = e.querySelectorAll(
          this.config.selectors.control + t.selector
        );
        for (let s = 0; s < i.length; s++) {
          const n = i[s], a = this.getControl(n, t.type, "");
          a && this.controls.push(a);
        }
      }
  }
  getControl(e, t, i) {
    if (!i)
      for (const n of v) {
        if (n.el === e && n.isBound(this))
          return null;
        if (n.el === e && n.type === t && n.selector === i)
          return n.addBinding(this), n;
      }
    const s = new pt();
    return s.init(e, t, i), s.classNames.base = w(this.config.classNames, t), s.classNames.active = w(this.config.classNames, t, this.config.classNames.modifierActive), s.classNames.disabled = w(this.config.classNames, t, this.config.classNames.modifierDisabled), s.addBinding(this), s;
  }
  getToggleSelector() {
    this.toggleArray = A(this.toggleArray);
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
    (i === this.config.selectors.target || i === "all") && (i = ""), this.config.controls.toggleLogic === "or" ? this.toggleArray = i.split(",") : this.toggleArray = this.splitCompoundSelector(i), this.toggleArray = A(this.toggleArray);
  }
  splitCompoundSelector(e) {
    const t = e.split(/([\.\[])/g), i = [];
    let s = "";
    t[0] === "" && t.shift();
    for (let n = 0; n < t.length; n++)
      n % 2 === 0 && (s = ""), s += t[n], n % 2 !== 0 && i.push(s);
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
    const i = this.getNextSibling(e.index, e.sibling, e.position), s = this.dom.document.createDocumentFragment();
    let n;
    if (i ? n = rt(i, this.config.selectors.target) : n = this.targets.length, e.collection) {
      for (const a of e.collection) {
        if (this.dom.targets.indexOf(a) > -1)
          throw new Error(f.errorInsertPreexistingElement());
        if (a.style.display = "none", s.appendChild(a), s.appendChild(this.dom.document.createTextNode(" ")), !m(a, this.dom.document) || !a.matches(this.config.selectors.target)) continue;
        const r = new y();
        r.init(a, this), r.isInDom = !0, this.targets.splice(n, 0, r), n++;
      }
      this.dom.parent.insertBefore(s, i);
    }
    t.startOrder = this.origOrder = this.targets;
  }
  getNextSibling(e, t, i) {
    let s = null;
    return e = Math.max(e, 0), t && i === "before" ? s = t : t && i === "after" ? s = t.nextElementSibling || null : this.targets.length > 0 && typeof e < "u" ? s = e < this.targets.length || !this.targets.length ? this.targets[e].dom.el : this.targets[this.targets.length - 1].dom.el.nextElementSibling : this.targets.length === 0 && this.dom.parent.children.length > 0 && (this.config.layout.siblingAfter ? s = this.config.layout.siblingAfter : this.config.layout.siblingBefore ? s = this.config.layout.siblingBefore.nextElementSibling : s = this.dom.parent.children[0]), s;
  }
  filterOperation(e) {
    const t = e.newFilter.action;
    for (const i of e.newOrder) {
      let s = !1;
      e.newFilter.collection ? s = e.newFilter.collection.indexOf(i.dom.el) > -1 : e.newFilter.selector === "" ? s = !1 : s = i.dom.el.matches(e.newFilter.selector), this.evaluateHideShow(s, i, t, e);
    }
    if (e.toRemove.length)
      for (let i = 0; i < e.show.length; i++) {
        const s = e.show[i];
        if (e.toRemove.indexOf(s) > -1) {
          e.show.splice(i, 1);
          const n = e.toShow.indexOf(s);
          n > -1 && e.toShow.splice(n, 1), e.toHide.push(s), e.hide.push(s), i--;
        }
      }
    e.matching = e.show.slice(), e.show.length === 0 && e.newFilter.selector !== "" && this.targets.length !== 0 && (e.hasFailed = !0);
  }
  evaluateHideShow(e, t, i, s) {
    e === !0 && i === "show" || e === !1 && i === "hide" ? (s.show.push(t), t.isShown || s.toShow.push(t)) : (s.hide.push(t), t.isShown && s.toHide.push(t));
  }
  sortOperation(e) {
    if (e.startOrder = this.targets, e.newSort.collection) {
      const t = [];
      for (const i of e.newSort.collection) {
        if (this.dom.targets.indexOf(i) < 0)
          throw new Error(f.errorSortNonExistentElement());
        const s = new y();
        s.init(i, this), s.isInDom = !0, t.push(s);
      }
      e.newOrder = t;
    } else e.newSort.order === "random" ? e.newOrder = ht(e.startOrder) : e.newSort.attribute === "" ? (e.newOrder = this.origOrder.slice(), e.newSort.order === "desc" && e.newOrder.reverse()) : (e.newOrder = e.startOrder.slice(), e.newOrder.sort((t, i) => this.compare(t, i, e.newSort)));
    R(e.newOrder, e.startOrder) && (e.willSort = !1);
  }
  compare(e, t, i) {
    const s = i.order;
    let n = this.getAttributeValue(e, i.attribute), a = this.getAttributeValue(t, i.attribute);
    return isNaN(n * 1) || isNaN(a * 1) ? (n = n.toLowerCase(), a = a.toLowerCase()) : (n = n * 1, a = a * 1), n < a ? s === "asc" ? -1 : 1 : n > a ? s === "asc" ? 1 : -1 : n === a && i.next ? this.compare(e, t, i.next) : 0;
  }
  getAttributeValue(e, t) {
    const i = e.dom.el.getAttribute("data-" + t);
    return i === null && this.config.debug.showWarnings && console.warn(f.warningInconsistentSortingAttributes({
      attribute: "data-" + t
    })), i || 0;
  }
  printSort(e, t) {
    const i = e ? t.newOrder : t.startOrder, s = e ? t.startOrder : t.newOrder, n = i.length ? i[i.length - 1].dom.el.nextElementSibling : null, a = window.document.createDocumentFragment();
    for (const h of i) {
      const c = h.dom.el;
      c.style.position !== "absolute" && (D(c.previousSibling), c.parentElement.removeChild(c));
    }
    const r = n ? n.previousSibling : this.dom.parent.lastChild;
    r && r.nodeName === "#text" && D(r);
    for (const h of s) {
      const c = h.dom.el;
      m(a.lastChild) && a.appendChild(window.document.createTextNode(" ")), a.appendChild(c);
    }
    this.dom.parent.firstChild && this.dom.parent.firstChild !== n && a.insertBefore(window.document.createTextNode(" "), a.childNodes[0]), n ? (a.appendChild(window.document.createTextNode(" ")), this.dom.parent.insertBefore(a, n)) : this.dom.parent.appendChild(a);
  }
  parseSortString(e, t) {
    const i = e.split(" ");
    let s = t;
    for (let n = 0; n < i.length; n++) {
      const a = i[n].split(":");
      switch (s.sortString = i[n], s.attribute = lt(a[0]), s.order = a[1] || "asc", s.attribute) {
        case "default":
          s.attribute = "";
          break;
        case "random":
          s.attribute = "", s.order = "random";
          break;
      }
      if (!s.attribute || s.order === "random") break;
      n < i.length - 1 && (s.next = N(), Object.freeze(s), s = s.next);
    }
    return t;
  }
  parseEffects() {
    const e = this.config.animation.effectsIn || this.config.animation.effects, t = this.config.animation.effectsOut || this.config.animation.effects;
    this.effectsIn = u(), this.effectsOut = u(), this.transformIn = [], this.transformOut = [], this.effectsIn.opacity = this.effectsOut.opacity = 1, this.parseEffect("fade", e, this.effectsIn, this.transformIn), this.parseEffect("fade", t, this.effectsOut, this.transformOut, !0);
    for (const i in L)
      this.parseEffect(i, e, this.effectsIn, this.transformIn), this.parseEffect(i, t, this.effectsOut, this.transformOut, !0);
    this.parseEffect("stagger", e, this.effectsIn, this.transformIn), this.parseEffect("stagger", t, this.effectsOut, this.transformOut, !0);
  }
  parseEffect(e, t, i, s, n = !1) {
    const a = /\(([^)]+)\)/;
    if (typeof t != "string")
      throw new TypeError(f.errorConfigInvalidAnimationEffects());
    if (t.indexOf(e) < 0) {
      e === "stagger" && (this.staggerDuration = 0);
      return;
    }
    const r = t.indexOf(e + "(");
    let h = "";
    if (r > -1) {
      const l = t.substring(r), d = a.exec(l);
      d && (h = d[1]);
    }
    const c = ["%", "px", "em", "rem", "vh", "vw", "deg"];
    switch (e) {
      case "fade":
        i.opacity = h ? parseFloat(h) : 0;
        break;
      case "stagger":
        this.staggerDuration = h ? parseFloat(h) : 100;
        break;
      default: {
        const l = i[e], d = L[e];
        if (n && this.config.animation.reverseOut && e !== "scale" ? l.value = (h ? parseFloat(h) : d.value) * -1 : l.value = h ? parseFloat(h) : d.value, h) {
          for (const C of c)
            if (h.indexOf(C) > -1) {
              l.unit = C;
              break;
            }
        } else
          l.unit = d.unit;
        s.push(e + "(" + l.value + l.unit + ")");
      }
    }
  }
  buildState(e) {
    const t = [], i = [], s = [], n = [];
    for (const a of this.targets)
      (!e.toRemove.length || e.toRemove.indexOf(a) < 0) && t.push(a.dom.el);
    for (const a of e.matching)
      i.push(a.dom.el);
    for (const a of e.show)
      s.push(a.dom.el);
    for (const a of e.hide)
      (!e.toRemove.length || e.toRemove.indexOf(a) < 0) && n.push(a.dom.el);
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
      show: s,
      hide: n,
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
    var s, n;
    (!this.config.animation.duration || !this.config.animation.effects || !F(this.dom.container)) && (e = !1), !t.toShow.length && !t.toHide.length && !t.willSort && !t.willChangeLayout && (e = !1), !((n = (s = t.startState) == null ? void 0 : s.show) != null && n.length) && !t.show.length && (e = !1), b("mixStart", this.dom.container, {
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
    const i = new Promise((s, n) => {
      e = s, t = n;
    });
    return { resolve: e, reject: t, promise: i };
  }
  getStartMixData(e) {
    const t = window.getComputedStyle(this.dom.parent), i = this.dom.parent.getBoundingClientRect(), s = t.boxSizing;
    this.incPadding = s === "border-box";
    for (let n = 0; n < e.show.length; n++) {
      const r = e.show[n].getPosData();
      e.showPosData[n] = { startPosData: r };
    }
    for (let n = 0; n < e.toHide.length; n++) {
      const r = e.toHide[n].getPosData();
      e.toHidePosData[n] = { startPosData: r };
    }
    e.startX = i.left, e.startY = i.top, e.startHeight = this.incPadding ? i.height : i.height - parseFloat(t.paddingTop) - parseFloat(t.paddingBottom) - parseFloat(t.borderTop) - parseFloat(t.borderBottom), e.startWidth = this.incPadding ? i.width : i.width - parseFloat(t.paddingLeft) - parseFloat(t.paddingRight) - parseFloat(t.borderLeft) - parseFloat(t.borderRight);
  }
  setInter(e) {
    this.config.animation.clampHeight && (this.dom.parent.style.height = e.startHeight + "px", this.dom.parent.style.overflow = "hidden"), this.config.animation.clampWidth && (this.dom.parent.style.width = e.startWidth + "px", this.dom.parent.style.overflow = "hidden");
    for (const t of e.toShow)
      t.show();
    e.willChangeLayout && (this.dom.container.classList.remove(e.startContainerClassName), this.dom.container.classList.add(e.newContainerClassName));
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
      const n = e.show[s];
      e.showPosData[s].finalPosData = n.getPosData();
    }
    for (let s = 0; s < e.toHide.length; s++) {
      const n = e.toHide[s];
      e.toHidePosData[s].finalPosData = n.getPosData();
    }
    (this.config.animation.clampHeight || this.config.animation.clampWidth) && (this.dom.parent.style.height = this.dom.parent.style.width = this.dom.parent.style.overflow = "");
    let t = null;
    this.incPadding || (t = window.getComputedStyle(this.dom.parent));
    const i = this.dom.parent.getBoundingClientRect();
    e.newX = i.left, e.newY = i.top, e.newHeight = this.incPadding ? i.height : i.height - parseFloat(t.paddingTop) - parseFloat(t.paddingBottom) - parseFloat(t.borderTop) - parseFloat(t.borderBottom), e.newWidth = this.incPadding ? i.width : i.width - parseFloat(t.paddingLeft) - parseFloat(t.paddingRight) - parseFloat(t.borderLeft) - parseFloat(t.borderRight), e.viewportDeltaX = e.docState.viewportWidth - this.dom.document.documentElement.clientWidth, e.viewportDeltaY = e.docState.viewportHeight - this.dom.document.documentElement.clientHeight, e.willSort && this.printSort(!0, e);
    for (const s of e.toShow)
      s.hide();
    for (const s of e.toHide)
      s.show();
    e.willChangeLayout && (this.dom.container.classList.remove(e.newContainerClassName), this.dom.container.classList.add(this.config.layout.containerClassName));
  }
  getTweenData(e) {
    const t = Object.getOwnPropertyNames(this.effectsIn);
    for (let i = 0; i < e.show.length; i++) {
      const s = e.show[i], n = e.showPosData[i];
      if (n.posIn = u(), n.posOut = u(), n.tweenData = u(), s.isShown ? (n.posIn.x = n.startPosData.x - n.interPosData.x, n.posIn.y = n.startPosData.y - n.interPosData.y) : n.posIn.x = n.posIn.y = 0, n.posOut.x = n.finalPosData.x - n.interPosData.x, n.posOut.y = n.finalPosData.y - n.interPosData.y, n.posIn.opacity = s.isShown ? 1 : this.effectsIn.opacity, n.posOut.opacity = 1, n.tweenData.opacity = n.posOut.opacity - n.posIn.opacity, !s.isShown && !this.config.animation.nudge && (n.posIn.x = n.posOut.x, n.posIn.y = n.posOut.y), n.tweenData.x = n.posOut.x - n.posIn.x, n.tweenData.y = n.posOut.y - n.posIn.y, this.config.animation.animateResizeTargets) {
        n.posIn.width = n.startPosData.width, n.posIn.height = n.startPosData.height;
        let a = (n.startPosData.width || n.finalPosData.width) - n.interPosData.width;
        n.posIn.marginRight = n.startPosData.marginRight - a;
        let r = (n.startPosData.height || n.finalPosData.height) - n.interPosData.height;
        n.posIn.marginBottom = n.startPosData.marginBottom - r, n.posOut.width = n.finalPosData.width, n.posOut.height = n.finalPosData.height, a = (n.finalPosData.width || n.startPosData.width) - n.interPosData.width, n.posOut.marginRight = n.finalPosData.marginRight - a, r = (n.finalPosData.height || n.startPosData.height) - n.interPosData.height, n.posOut.marginBottom = n.finalPosData.marginBottom - r, n.tweenData.width = n.posOut.width - n.posIn.width, n.tweenData.height = n.posOut.height - n.posIn.height, n.tweenData.marginRight = n.posOut.marginRight - n.posIn.marginRight, n.tweenData.marginBottom = n.posOut.marginBottom - n.posIn.marginBottom;
      }
      for (const a of t) {
        const r = this.effectsIn[a];
        typeof r != "object" || !("value" in r) || !r.value || (n.posIn[a].value = r.value, n.posOut[a].value = 0, n.tweenData[a].value = n.posOut[a].value - n.posIn[a].value, n.posIn[a].unit = n.posOut[a].unit = n.tweenData[a].unit = r.unit);
      }
    }
    for (let i = 0; i < e.toHide.length; i++) {
      const s = e.toHide[i], n = e.toHidePosData[i];
      if (n.posIn = u(), n.posOut = u(), n.tweenData = u(), n.posIn.x = s.isShown ? n.startPosData.x - n.interPosData.x : 0, n.posIn.y = s.isShown ? n.startPosData.y - n.interPosData.y : 0, n.posOut.x = this.config.animation.nudge ? 0 : n.posIn.x, n.posOut.y = this.config.animation.nudge ? 0 : n.posIn.y, n.tweenData.x = n.posOut.x - n.posIn.x, n.tweenData.y = n.posOut.y - n.posIn.y, this.config.animation.animateResizeTargets) {
        n.posIn.width = n.startPosData.width, n.posIn.height = n.startPosData.height;
        const a = n.startPosData.width - n.interPosData.width;
        n.posIn.marginRight = n.startPosData.marginRight - a;
        const r = n.startPosData.height - n.interPosData.height;
        n.posIn.marginBottom = n.startPosData.marginBottom - r;
      }
      n.posIn.opacity = 1, n.posOut.opacity = this.effectsOut.opacity, n.tweenData.opacity = n.posOut.opacity - n.posIn.opacity;
      for (const a of t) {
        const r = this.effectsOut[a];
        typeof r != "object" || !("value" in r) || !r.value || (n.posIn[a].value = 0, n.posOut[a].value = r.value, n.tweenData[a].value = n.posOut[a].value - n.posIn[a].value, n.posIn[a].unit = n.posOut[a].unit = n.tweenData[a].unit = r.unit);
      }
    }
  }
  moveTargets(e) {
    const t = this.checkProgress.bind(this);
    let i = -1;
    for (let s = 0; s < e.show.length; s++) {
      const n = e.show[s], a = e.showPosData[s], r = P(), h = n.isShown ? "none" : "show", c = this.willTransition(
        h,
        e.hasEffect,
        a.posIn,
        a.posOut
      );
      c && i++, n.show(), r.posIn = a.posIn, r.posOut = a.posOut, r.statusChange = h, r.staggerIndex = i, r.operation = e, r.callback = c ? t : null, n.move(r);
    }
    for (let s = 0; s < e.toHide.length; s++) {
      const n = e.toHide[s], a = e.toHidePosData[s], r = P(), h = this.willTransition("hide", a.posIn, a.posOut);
      r.posIn = a.posIn, r.posOut = a.posOut, r.statusChange = "hide", r.staggerIndex = s, r.operation = e, r.callback = h ? t : null, n.move(r);
    }
    this.config.animation.animateResizeContainer && (this.dom.parent.style.transition = "height " + this.config.animation.duration + "ms ease, width " + this.config.animation.duration + "ms ease ", requestAnimationFrame(() => {
      e.startHeight !== e.newHeight && e.viewportDeltaY !== e.startHeight - e.newHeight && (this.dom.parent.style.height = e.newHeight + "px"), e.startWidth !== e.newWidth && e.viewportDeltaX !== e.startWidth - e.newWidth && (this.dom.parent.style.width = e.newWidth + "px");
    })), e.willChangeLayout && (this.dom.container.classList.remove(this.config.layout.containerClassName), this.dom.container.classList.add(e.newContainerClassName));
  }
  hasEffect() {
    const e = [
      "scale",
      "translateX",
      "translateY",
      "translateZ",
      "rotateX",
      "rotateY",
      "rotateZ"
    ];
    if (this.effectsIn.opacity !== 1) return !0;
    for (const t of e) {
      const i = this.effectsIn[t];
      if ((typeof i == "object" && i && i.value !== void 0 ? i.value : i) !== 0) return !0;
    }
    return !1;
  }
  willTransition(e, t, i, s) {
    let n, a, r;
    if (s !== void 0 ? (n = t, a = i, r = s) : (n = !0, a = t, r = i), F(this.dom.container)) {
      if (e !== "none" && n || a.x !== r.x || a.y !== r.y)
        return !0;
      if (this.config.animation.animateResizeTargets)
        return a.width !== r.width || a.height !== r.height || a.marginRight !== r.marginRight || a.marginBottom !== r.marginBottom;
    } else return !1;
    return !1;
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
    if (e.willSort && this.printSort(!1, e), this.dom.parent.style.transition = "", this.dom.parent.style.height = "", this.dom.parent.style.width = "", this.dom.parent.style.overflow = "", this.dom.parent.style.perspective = "", this.dom.parent.style.perspectiveOrigin = "", e.willChangeLayout && (this.dom.container.classList.remove(e.startContainerClassName), this.dom.container.classList.add(e.newContainerClassName)), e.toRemove.length) {
      for (let t = 0; t < this.targets.length; t++) {
        const i = this.targets[t];
        if (e.toRemove.indexOf(i) > -1) {
          const s = i.dom.el.previousSibling, n = i.dom.el.nextSibling;
          s && s.nodeName === "#text" && n && n.nodeName === "#text" && D(s), e.willSort || this.dom.parent.removeChild(i.dom.el), this.targets.splice(t, 1), i.isInDom = !1, t--;
        }
      }
      this.origOrder = this.targets;
    }
    if (e.willSort && (this.targets = e.newOrder), this.state = e.newState, this.lastOperation = e, this.dom.targets = this.state.targets, b("mixEnd", this.dom.container, {
      state: this.state,
      instance: this
    }, this.dom.document), typeof this.config.callbacks.onMixEnd == "function" && this.config.callbacks.onMixEnd.call(this.dom.container, this.state, this), e.hasFailed && (b("mixFail", this.dom.container, {
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
    t.animate = this.config.animation.enable, t.command = st();
    for (const s of e)
      s !== null && (typeof s == "object" ? g(t.command, s) : typeof s == "boolean" ? t.animate = s : typeof s == "function" && (t.callback = s));
    const i = t.command;
    return i.insert && typeof i.insert == "object" && !i.insert.collection && (i.insert = this.parseInsertArgs([i.insert]).command), i.remove && typeof i.remove == "object" && !i.remove.targets && (i.remove = this.parseRemoveArgs([i.remove]).command), i.filter && typeof i.filter != "object" && (i.filter = this.parseFilterArgs([i.filter]).command), i.sort && typeof i.sort != "object" && (i.sort = this.parseSortArgs([i.sort]).command), i.changeLayout && typeof i.changeLayout != "object" && (i.changeLayout = this.parseChangeLayoutArgs([i.changeLayout]).command), Object.freeze(t), t;
  }
  parseFilterArgs(e) {
    const t = p();
    t.animate = this.config.animation.enable, t.command = Q();
    const i = t.command;
    for (const s of e)
      typeof s == "string" ? i.selector = s : s === null ? i.collection = [] : typeof s == "object" && m(s, this.dom.document) ? i.collection = [s] : typeof s == "object" && typeof s.length < "u" ? i.collection = Array.from(s) : typeof s == "object" ? g(i, s) : typeof s == "boolean" ? t.animate = s : typeof s == "function" && (t.callback = s);
    if (i.selector && i.collection)
      throw new Error(f.errorFilterInvalidArguments());
    return Object.freeze(t), t;
  }
  parseSortArgs(e) {
    const t = p();
    t.animate = this.config.animation.enable, t.command = N();
    let i = "";
    for (const s of e)
      if (s !== null)
        switch (typeof s) {
          case "string":
            i = s;
            break;
          case "object":
            s.length && (t.command.collection = Array.from(s));
            break;
          case "boolean":
            t.animate = s;
            break;
          case "function":
            t.callback = s;
            break;
        }
    return i && (t.command = this.parseSortString(i, t.command)), Object.freeze(t), t;
  }
  parseInsertArgs(e) {
    const t = p();
    t.animate = this.config.animation.enable, t.command = J();
    const i = t.command;
    for (const s of e)
      s !== null && (typeof s == "number" ? i.index = s : typeof s == "string" && ["before", "after"].indexOf(s) > -1 ? i.position = s : typeof s == "string" ? i.collection = Array.from(ct(s).childNodes) : typeof s == "object" && m(s, this.dom.document) ? i.collection.length ? i.sibling = s : i.collection = [s] : typeof s == "object" && s.length ? i.collection.length ? i.sibling = s[0] : i.collection = Array.from(s) : typeof s == "object" && s.childNodes && s.childNodes.length ? i.collection.length ? i.sibling = s.childNodes[0] : i.collection = Array.from(s.childNodes) : typeof s == "object" ? g(i, s) : typeof s == "boolean" ? t.animate = s : typeof s == "function" && (t.callback = s));
    if (i.index && i.sibling)
      throw new Error(f.errorInsertInvalidArguments());
    return !i.collection.length && this.config.debug.showWarnings && console.warn(f.warningInsertNoElements()), Object.freeze(t), t;
  }
  parseRemoveArgs(e) {
    const t = p();
    t.animate = this.config.animation.enable, t.command = tt();
    const i = t.command;
    for (const s of e)
      if (s !== null)
        switch (typeof s) {
          case "number":
            this.targets[s] && (i.targets[0] = this.targets[s]);
            break;
          case "string":
            i.collection = Array.from(this.dom.parent.querySelectorAll(s));
            break;
          case "object":
            s && s.length ? i.collection = Array.from(s) : m(s, this.dom.document) ? i.collection = [s] : g(i, s);
            break;
          case "boolean":
            t.animate = s;
            break;
          case "function":
            t.callback = s;
            break;
        }
    if (i.collection.length)
      for (const s of this.targets)
        i.collection.indexOf(s.dom.el) > -1 && i.targets.push(s);
    return !i.targets.length && this.config.debug.showWarnings && console.warn(f.warningRemoveNoElements()), Object.freeze(t), t;
  }
  parseDatasetArgs(e) {
    const t = p();
    t.animate = this.config.animation.enable, t.command = et();
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
    t.animate = this.config.animation.enable, t.command = it();
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
      this.config.debug.showWarnings && console.warn(f.warningMultimixInstanceQueueFull()), t.resolve(this.state), b("mixBusy", this.dom.container, {
        state: this.state,
        instance: this
      }, this.dom.document), typeof this.config.callbacks.onMixBusy == "function" && this.config.callbacks.onMixBusy.call(this.dom.container, this.state, this);
    return t.promise;
  }
  getDataOperation(e) {
    const t = I();
    let i = [];
    if (this.dom.targets.length && !(i = this.state.activeDataset || []).length)
      throw new Error(f.errorDatasetNotSet());
    return t.id = O(), t.startState = this.state, t.startDataset = i, t.newDataset = e.slice(), this.diffDatasets(t), t.startOrder = this.targets, t.newOrder = t.show, this.config.animation.enable && (this.getStartMixData(t), this.setInter(t), t.docState = k(this.dom.document), this.getInterMixData(t), this.setFinal(t), this.getFinalMixData(t), this.parseEffects(), t.hasEffect = this.hasEffect(), this.getTweenData(t)), this.targets = t.show.slice(), t.newState = this.buildState(t), Array.prototype.push.apply(this.targets, t.toRemove), t;
  }
  diffDatasets(e) {
    const t = [], i = [], s = [], n = {};
    let a = null, r = null;
    for (const h of e.newDataset) {
      const c = h[this.config.data.uidKey];
      if (typeof c > "u" || c.toString().length < 1)
        throw new TypeError(f.errorDatasetInvalidUidKey({
          uidKey: this.config.data.uidKey
        }));
      if (!n[c])
        n[c] = !0;
      else
        throw new Error(f.errorDatasetDuplicateUid({
          uid: c
        }));
      let l = this.cache[c];
      if (l instanceof y) {
        if (this.config.data.dirtyCheck && !B(h, l.data)) {
          const d = l.render(h);
          l.data = h, d !== l.dom.el && (l.isInDom && (l.unbindEvents(), this.dom.parent.replaceChild(d, l.dom.el)), l.isShown || (d.style.display = "none"), l.dom.el = d, l.isInDom && l.bindEvents());
        }
      } else
        l = new y(), l.init(null, this, h), l.hide();
      l.isInDom ? (r = l.dom.el.nextElementSibling, i.push(c), a && (a.lastElementChild && a.appendChild(this.dom.document.createTextNode(" ")), this.insertDatasetFrag(a, l.dom.el, s), a = null)) : (a || (a = this.dom.document.createDocumentFragment()), a.lastElementChild && a.appendChild(this.dom.document.createTextNode(" ")), a.appendChild(l.dom.el), l.isInDom = !0, l.unbindEvents(), l.bindEvents(), l.hide(), e.toShow.push(l), s.push(l)), e.show.push(l);
    }
    a && (r = r || this.config.layout.siblingAfter, r && a.appendChild(this.dom.document.createTextNode(" ")), this.insertDatasetFrag(a, r, s));
    for (const h of e.startDataset) {
      const c = h[this.config.data.uidKey], l = this.cache[c];
      e.show.indexOf(l) < 0 ? (e.hide.push(l), e.toHide.push(l), e.toRemove.push(l)) : t.push(c);
    }
    R(t, i) || (e.willSort = !0);
  }
  insertDatasetFrag(e, t, i) {
    const s = t ? Array.from(this.dom.parent.children).indexOf(t) : this.targets.length;
    this.dom.parent.insertBefore(e, t);
    let n = s;
    for (; i.length; )
      this.targets.splice(n, 0, i.shift()), n++;
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
    const s = this.getToggleSelector();
    return this.multimix({
      filter: s
    }, t.animate, t.callback);
  }
  toggleOff(...e) {
    const t = this.parseFilterArgs(e), i = t.command.selector, s = this.toggleArray.indexOf(i);
    this.isToggling = !0, s > -1 && this.toggleArray.splice(s, 1);
    const n = this.getToggleSelector();
    return this.multimix({
      filter: n
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
      const i = E();
      return i.args = e, i.instruction = t, i.triggerElement = this.lastClicked, i.isToggling = this.isToggling, this.queueMix(i);
    } else {
      const i = this.getOperation(t.command);
      if (!i)
        return Promise.resolve(this.state);
      this.config.controls.enable && (t.command.filter && !this.isToggling && (this.toggleArray.length = 0, this.buildToggleArray(i.command)), this.queue.length < 1 && this.updateControls(i.command)), t.callback && (this.userCallback = t.callback);
      const s = t.animate ^ this.config.animation.enable ? t.animate : this.config.animation.enable;
      return this.goMix(s, i);
    }
  }
  dataset(...e) {
    const t = this.parseDatasetArgs(e);
    if (this.isBusy) {
      const i = E();
      return i.args = e, i.instruction = t, this.queueMix(i);
    } else {
      t.callback && (this.userCallback = t.callback);
      const i = t.animate ^ this.config.animation.enable ? t.animate : this.config.animation.enable, s = this.getDataOperation(t.command.dataset);
      return this.goMix(i, s);
    }
  }
  getOperation(e) {
    const t = e.sort, i = e.filter, s = e.changeLayout, n = e.remove, a = e.insert, r = I();
    return r.id = O(), r.command = e, r.startState = this.state, r.triggerElement = this.lastClicked, this.isBusy ? (this.config.debug.showWarnings && console.warn(f.warningGetOperationInstanceBusy()), null) : (a && this.insertTargets(a, r), n && (r.toRemove = n.targets), r.startSort = r.newSort = this.state.activeSort, r.startOrder = r.newOrder = this.targets, t && (r.startSort = this.state.activeSort, r.newSort = t, r.willSort = this.willSortCheck(t, this.state.activeSort), r.willSort && this.sortOperation(r)), r.startFilter = this.state.activeFilter, i ? r.newFilter = i : r.newFilter = { ...r.startFilter }, r.newFilter.selector === "all" ? r.newFilter.selector = this.config.selectors.target : r.newFilter.selector === "none" && (r.newFilter.selector = ""), this.filterOperation(r), r.startContainerClassName = this.state.activeContainerClassName, s ? (r.newContainerClassName = s.containerClassName, r.newContainerClassName !== r.startContainerClassName && (r.willChangeLayout = !0)) : r.newContainerClassName = r.startContainerClassName, this.config.animation.enable && (this.getStartMixData(r), this.setInter(r), r.docState = k(this.dom.document), this.getInterMixData(r), this.setFinal(r), this.getFinalMixData(r), this.parseEffects(), r.hasEffect = this.hasEffect(), this.getTweenData(r)), r.willSort && (this.targets = r.newOrder), r.newState = this.buildState(r), r);
  }
  tween(e, t) {
    t = Math.min(t, 1), t = Math.max(t, 0);
    for (let i = 0; i < e.show.length; i++) {
      const s = e.show[i], n = e.showPosData[i];
      s.applyTween(n, t);
    }
    for (let i = 0; i < e.hide.length; i++) {
      const s = e.hide[i];
      s.isShown && s.hide();
      const n = e.toHide.indexOf(s);
      if (n > -1) {
        const a = e.toHidePosData[n];
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
    return e ? dt(this.config, e) : this.config;
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
class bt {
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
    for (let s = 0; s < this.length; s++) {
      const n = this[s];
      i.push(n[e](...t));
    }
    return Promise.all(i);
  }
}
function St(o) {
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
function vt(o, e, t, i) {
  const s = t || window.document;
  let n;
  if (typeof o == "string")
    n = s.querySelectorAll(o);
  else if (o && typeof o == "object" && m(o, s))
    n = [o];
  else if (o && typeof o == "object" && "length" in o)
    n = o;
  else
    throw new Error(f.errorFactoryInvalidContainer());
  if (n.length < 1)
    throw new Error(f.errorFactoryContainerNotFound());
  const a = [];
  for (let r = 0; r < n.length; r++) {
    const h = n[r];
    if (r > 0 && !i) break;
    let c;
    h.id ? c = h.id : (c = "MixItUp" + O(), h.id = c);
    let l, d;
    x.has(c) ? (l = x.get(c), (!e || e && e.debug && e.debug.showWarnings !== !1) && console.warn(f.warningFactoryPreexistingInstance())) : (l = new yt(), l.attach(h, s, c, e), x.set(c, l)), e && e.debug && e.debug.enable ? a.push(l) : (d = St(l), a.push(d));
  }
  return i ? new bt(a) : a[0];
}
export {
  vt as default
};
//# sourceMappingURL=mixitup.js.map
