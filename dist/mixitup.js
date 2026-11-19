// src/config/animation.ts
function e() {
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
// src/config/behavior.ts
function t() {
	return { liveSort: !1 };
}
// src/config/callbacks.ts
function n() {
	return {
		onMixStart: null,
		onMixBusy: null,
		onMixEnd: null,
		onMixFail: null,
		onMixClick: null
	};
}
// src/config/class-names.ts
function r() {
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
// src/config/controls.ts
function i() {
	return {
		enable: !0,
		live: !1,
		scope: "global",
		toggleLogic: "or",
		toggleDefault: "all"
	};
}
// src/config/data.ts
function a() {
	return {
		uidKey: "",
		dirtyCheck: !1
	};
}
// src/config/debug.ts
function o() {
	return {
		enable: !1,
		showWarnings: !0,
		fauxAsync: !1
	};
}
// src/config/layout.ts
function s() {
	return {
		allowNestedTargets: !0,
		containerClassName: "",
		siblingBefore: null,
		siblingAfter: null
	};
}
// src/config/load.ts
function c() {
	return {
		filter: "all",
		sort: "default:asc",
		dataset: null
	};
}
// src/config/render.ts
function l() {
	return { target: null };
}
// src/config/selectors.ts
function u() {
	return {
		target: ".mix",
		control: ""
	};
}
// src/config/templates.ts
function d() {
	return {};
}
// src/config/defaults.ts
function f() {
	let f = {
		animation: Object.seal(e()),
		behavior: Object.seal(t()),
		callbacks: Object.seal(n()),
		controls: Object.seal(i()),
		classNames: Object.seal(r()),
		data: Object.seal(a()),
		debug: Object.seal(o()),
		layout: Object.seal(s()),
		load: Object.seal(c()),
		render: Object.seal(l()),
		selectors: Object.seal(u()),
		templates: Object.seal(d())
	};
	return Object.seal(f);
}
// src/operation.ts
function p() {
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
// src/internal/queue-item.ts
function m() {
	return {
		args: [],
		instruction: null,
		triggerElement: null,
		deferred: null,
		isToggling: !1
	};
}
// src/internal/user-instruction.ts
function h() {
	return {
		command: {},
		animate: !1,
		callback: null
	};
}
// src/types/commands.ts
function ee() {
	return {
		selector: "",
		collection: null,
		action: "show"
	};
}
function g() {
	return {
		sortString: "",
		attribute: "",
		order: "asc",
		collection: null,
		next: null
	};
}
function te() {
	return {
		index: 0,
		collection: [],
		position: "before",
		sibling: null
	};
}
function ne() {
	return {
		targets: [],
		collection: []
	};
}
function re() {
	return { dataset: null };
}
function _() {
	return { containerClassName: "" };
}
function v() {
	return {
		filter: null,
		sort: null,
		insert: null,
		remove: null,
		changeLayout: null
	};
}
// src/features.ts
var y = {
	boxSizingProp: "boxSizing",
	transformProp: "transform",
	transformRule: "transform",
	transitionProp: "transition",
	perspectiveProp: "perspective",
	perspectiveOriginProp: "perspectiveOrigin",
	hasTransitions: !0,
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
// src/helpers.ts
function b(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t === null || t === Object.prototype || Object.getPrototypeOf(t) === null && Object.prototype.hasOwnProperty.call(t, "constructor") && typeof t.constructor == "function" && Function.prototype.toString.call(t.constructor) === Function.prototype.toString.call(Object);
}
function x(e) {
	return !(Symbol.toStringTag in e) && Object.prototype.toString.call(e) === "[object Date]";
}
function S(e, t, n = !1, r = !1) {
	if (!t) return e;
	try {
		for (let i of Object.keys(t)) {
			if (i === "__proto__" || i === "constructor" || i === "prototype") continue;
			let a = t[i];
			n && b(a) ? (Object.prototype.hasOwnProperty.call(e, i) && b(e[i]) || (e[i] = {}), S(e[i], a, !0, r)) : e[i] = n && Array.isArray(a) ? a.slice() : a;
		}
	} catch (t) {
		if (r) ie(t, e);
		else throw t;
	}
	return e;
}
function ie(e, t) {
	let n = /property "?(\w*)"?[,:] object/i;
	if (e instanceof TypeError) {
		let r = n.exec(e.message);
		if (r) {
			let e = r[1], n = "", i = -1;
			for (let r in t) {
				let t = 0;
				for (; t < e.length && e.charAt(t) === r.charAt(t);) t++;
				t > i && (i = t, n = r);
			}
			let a = "";
			i > 1 && (a = `Did you mean "${n}"?`);
			let o = `[MixItUp] Invalid config property "${e}". ${a}`.trim();
			throw TypeError(o);
		}
	}
	throw e;
}
function C(e) {
	let t = /\${([\w]*)}/g, n = {}, r;
	for (; r = t.exec(e);) n[r[1]] = RegExp("\\${" + r[1] + "}", "g");
	return (t) => {
		let r = e;
		t ||= {};
		for (let e in n) r = r.replace(n[e], t[e] === void 0 ? "" : t[e]);
		return r;
	};
}
function ae(e, t) {
	let n = 0, r = e.previousElementSibling;
	for (; r !== null;) (!t || r.matches(t)) && ++n, r = r.previousElementSibling;
	return n;
}
function w(e) {
	return e.toLowerCase().replace(/([_-][a-z])/g, (e) => e.toUpperCase().replace(/[_-]/, ""));
}
function T(e) {
	let t = w(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}
function E(e) {
	return e.replace(/([A-Z])/g, "-$1").replace(/^-/, "").toLowerCase();
}
function D(e, t) {
	let n = (t ?? e?.ownerDocument)?.defaultView;
	return n?.HTMLElement && e instanceof n.HTMLElement || e?.nodeType === 1 && typeof e.nodeName == "string";
}
function oe(e, t) {
	t ||= window.document;
	let n = t.createDocumentFragment(), r = t.createElement("div");
	for (r.innerHTML = e.trim(); r.firstChild;) n.appendChild(r.firstChild);
	return n;
}
function O(e) {
	let t;
	for (; e && e.nodeName === "#text";) t = e, e = e.previousSibling, t.parentElement?.removeChild(t);
}
function k(e, t) {
	let n = e.length;
	if (n !== t.length) return !1;
	for (; n--;) if (e[n] !== t[n]) return !1;
	return !0;
}
function A(e, t) {
	if (e === t) return !0;
	if (e === null || t === null || typeof e != "object" || typeof t != "object") return !1;
	if (Array.isArray(e) || Array.isArray(t)) {
		if (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length) return !1;
	} else if (!b(e) || !b(t)) return x(e) && x(t) && Date.prototype.getTime.call(e) === Date.prototype.getTime.call(t);
	let n = Object.keys(e);
	if (n.length !== Object.keys(t).length) return !1;
	for (let r of n) if (!Object.prototype.hasOwnProperty.call(t, r) || !A(e[r], t[r])) return !1;
	return !0;
}
function se(e) {
	let t = e.slice(), n = t.length, r = n;
	for (; r--;) {
		let e = ~~(Math.random() * n), i = t[r];
		t[r] = t[e], t[e] = i;
	}
	return t;
}
function ce(e, t) {
	return e ? Array.from(e.querySelectorAll(":scope > " + t)) : [];
}
function j(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) e[n] !== "" && t.push(e[n]);
	return t;
}
function M() {
	return ("00000" + (Math.random() * 16777216 | 0).toString(16)).substr(-6).toUpperCase();
}
function N(e = document) {
	let t = e.defaultView;
	return {
		scrollTop: t?.pageYOffset ?? e.documentElement.scrollTop,
		scrollLeft: t?.pageXOffset ?? e.documentElement.scrollLeft,
		docHeight: e.documentElement.scrollHeight,
		docWidth: e.documentElement.scrollWidth,
		viewportHeight: e.documentElement.clientHeight,
		viewportWidth: e.documentElement.clientWidth
	};
}
function P(e) {
	if (e.offsetParent) return !0;
	let t = e.ownerDocument.defaultView?.getComputedStyle(e);
	return t?.position === "fixed" && t.visibility !== "hidden" && t.opacity !== "0";
}
function F(e, t, n) {
	let r = "";
	return r += e.block, r.length && (r += e.delineatorElement), r += e["element" + T(t)], n && (r.length && (r += e.delineatorModifier), r += n), r;
}
function le(e, t) {
	let n = t.split(".");
	if (!t) return e;
	let r = e;
	for (let e = 0; e < n.length; e++) {
		if (!r) return null;
		r = r[n[e]];
	}
	return r === void 0 ? null : r;
}
// src/messages.ts
var I = {
	ERROR_FACTORY_INVALID_CONTAINER: "[MixItUp] An invalid selector or element reference was passed to the mixitup factory function",
	ERROR_FACTORY_CONTAINER_NOT_FOUND: "[MixItUp] The provided selector yielded no container element",
	ERROR_CONFIG_INVALID_ANIMATION_EFFECTS: "[MixItUp] Invalid value for `animation.effects`",
	ERROR_CONFIG_INVALID_CONTROLS_SCOPE: "[MixItUp] Invalid value for `controls.scope`",
	ERROR_CONFIG_INVALID_PROPERTY: "[MixItUp] Invalid configuration object property \"${erroneous}\"${suggestion}",
	ERROR_CONFIG_INVALID_PROPERTY_SUGGESTION: ". Did you mean \"${probableMatch}\"?",
	ERROR_CONFIG_DATA_UID_KEY_NOT_SET: "[MixItUp] To use the dataset API, a UID key must be specified using `data.uidKey`",
	ERROR_DATASET_INVALID_UID_KEY: "[MixItUp] The specified UID key \"${uidKey}\" is not present on one or more dataset items",
	ERROR_DATASET_DUPLICATE_UID: "[MixItUp] The UID \"${uid}\" was found on two or more dataset items. UIDs must be unique.",
	ERROR_INSERT_INVALID_ARGUMENTS: "[MixItUp] Please provider either an index or a sibling and position to insert, not both",
	ERROR_INSERT_PREEXISTING_ELEMENT: "[MixItUp] An element to be inserted already exists in the container",
	ERROR_FILTER_INVALID_ARGUMENTS: "[MixItUp] Please provide either a selector or collection `.filter()`, not both",
	ERROR_DATASET_NOT_SET: "[MixItUp] To use the dataset API with pre-rendered targets, a starting dataset must be set using `load.dataset`",
	ERROR_DATASET_PRERENDERED_MISMATCH: "[MixItUp] `load.dataset` does not match pre-rendered targets",
	ERROR_DATASET_RENDERER_NOT_SET: "[MixItUp] To insert an element via the dataset API, a target renderer function must be provided to `render.target`",
	ERROR_SORT_NON_EXISTENT_ELEMENT: "[MixItUp] An element to be sorted does not already exist in the container",
	WARNING_FACTORY_PREEXISTING_INSTANCE: "[MixItUp] WARNING: This element already has an active MixItUp instance. The provided configuration object will be ignored. If you wish to perform additional methods on this instance, please create a reference.",
	WARNING_INSERT_NO_ELEMENTS: "[MixItUp] WARNING: No valid elements were passed to `.insert()`",
	WARNING_REMOVE_NO_ELEMENTS: "[MixItUp] WARNING: No valid elements were passed to `.remove()`",
	WARNING_MULTIMIX_INSTANCE_QUEUE_FULL: "[MixItUp] WARNING: An operation was requested but the MixItUp instance was busy. The operation was rejected because the queue is full or queuing is disabled.",
	WARNING_GET_OPERATION_INSTANCE_BUSY: "[MixItUp] WARNING: Operations can be be created while the MixItUp instance is busy.",
	WARNING_NO_PROMISE_IMPLEMENTATION: "[MixItUp] WARNING: No Promise implementations could be found. If you wish to use promises with MixItUp please install an ES6 Promise polyfill.",
	WARNING_INCONSISTENT_SORTING_ATTRIBUTES: "[MixItUp] WARNING: The requested sorting data attribute \"${attribute}\" was not present on one or more target elements which may product unexpected sort output"
};
function ue() {
	let e = {};
	for (let t in I) {
		let n = I[t], r = w(t);
		e[r] = C(n);
	}
	return e;
}
var L = ue(), R = class {
	constructor() {
		this.id = "", this.sortString = "", this.mixer = null, this.callback = null, this.isShown = !1, this.isBound = !1, this.isInDom = !1, this.handler = null, this.operation = null, this.data = null, this.dom = { el: null };
	}
	init(e, t, n) {
		if (this.mixer = t, e ||= this.render(n), this.cacheDom(e), this.bindEvents(), this.dom.el.style.display !== "none" && (this.isShown = !0), n && t.config.data.uidKey) {
			let e = n[t.config.data.uidKey];
			if (e == null || String(e).length < 1) throw TypeError(L.errorDatasetInvalidUidKey({ uidKey: t.config.data.uidKey }));
			this.id = String(e), this.data = n, t.cache[this.id] = this;
		}
	}
	render(e) {
		let t = this.mixer.config.render.target;
		if (typeof t != "function") throw TypeError(L.errorDatasetRendererNotSet());
		let n = t(e);
		if (n && typeof n == "object" && D(n, this.mixer.dom.document)) return n;
		if (typeof n == "string") {
			let e = this.mixer.dom.document.createElement("div");
			return e.innerHTML = n, e.firstElementChild;
		}
		return n;
	}
	cacheDom(e) {
		this.dom.el = e;
	}
	getSortString(e) {
		let t = this.dom.el.getAttribute("data-" + e) || "", n = Number(t);
		this.sortString = isNaN(n) ? t.toLowerCase() : n;
	}
	show() {
		this.isShown ||= (this.dom.el.style.display = "", !0);
	}
	hide() {
		this.isShown &&= (this.dom.el.style.display = "none", !1);
	}
	applyTween(e, t) {
		let n = e.posIn, r = [], i = {
			x: n.x,
			y: n.y
		};
		t === 0 ? this.hide() : this.isShown || this.show();
		for (let a of y.TWEENABLE) {
			let o = e.tweenData[a];
			if (a === "x") {
				if (!o) continue;
				i.x = n.x + o * t;
			} else if (a === "y") {
				if (!o) continue;
				i.y = n.y + o * t;
			} else if (o && typeof o == "object" && "value" in o) {
				if (!o.value) continue;
				i[a] = {
					value: n[a].value + o.value * t,
					unit: o.unit
				}, r.push(a + "(" + i[a].value + o.unit + ")");
			} else {
				if (!o) continue;
				i[a] = n[a] + o * t, this.dom.el.style[a] = i[a];
			}
		}
		(i.x || i.y) && r.unshift("translate(" + i.x + "px, " + i.y + "px)"), r.length && (this.dom.el.style.transform = r.join(" "));
	}
	applyStylesIn(e) {
		let t = e.posIn, n = this.dom.el, r = this.mixer.effectsIn.opacity !== 1, i = [];
		i.push("translate(" + t.x + "px, " + t.y + "px)"), this.mixer.config.animation.animateResizeTargets && (e.statusChange !== "show" && (n.style.width = t.width + "px", n.style.height = t.height + "px"), n.style.marginRight = t.marginRight + "px", n.style.marginBottom = t.marginBottom + "px"), r && (n.style.opacity = String(t.opacity)), e.statusChange === "show" && (i = i.concat(this.mixer.transformIn)), n.style.transform = i.join(" ");
	}
	applyStylesOut(e, t) {
		let n = [], r = [], i = this.mixer.config.animation.animateResizeTargets, a = this.mixer.effectsIn.opacity !== void 0, o = this.dom.el;
		n.push(this.writeTransitionRule(y.transformRule, t)), e.statusChange !== "none" && n.push(this.writeTransitionRule("opacity", t, e.duration)), i && (n.push(this.writeTransitionRule("width", t, e.duration)), n.push(this.writeTransitionRule("height", t, e.duration)), n.push(this.writeTransitionRule("margin", t, e.duration))), this.operation = e.operation, this.callback = e.callback, this.mixer.targetsBound++, this.isBound = !0, this.applyTransition(n);
		let s = e.posOut;
		switch (i && s.width > 0 && s.height > 0 && (o.style.width = s.width + "px", o.style.height = s.height + "px", o.style.marginRight = s.marginRight + "px", o.style.marginBottom = s.marginBottom + "px"), !this.mixer.config.animation.nudge && e.statusChange === "hide" && r.push("translate(" + s.x + "px, " + s.y + "px)"), e.statusChange) {
			case "hide":
				a && (o.style.opacity = String(this.mixer.effectsOut.opacity)), r = r.concat(this.mixer.transformOut);
				break;
			case "show": a && (o.style.opacity = "1");
		}
		return (this.mixer.config.animation.nudge || !this.mixer.config.animation.nudge && e.statusChange !== "hide") && r.push("translate(" + s.x + "px, " + s.y + "px)"), o.style.transform = r.join(" "), t + Math.max(this.mixer.config.animation.duration, e.duration);
	}
	writeTransitionRule(e, t, n) {
		return e + " " + (n && n > 0 ? n : this.mixer.config.animation.duration) + "ms " + t + "ms " + (e === "opacity" ? "linear" : this.mixer.config.animation.easing);
	}
	getDelay(e) {
		let t = e;
		return typeof this.mixer.config.animation.staggerSequence == "function" && (t = this.mixer.config.animation.staggerSequence.call(this, e, this.mixer.state)), this.mixer.staggerDuration ? t * this.mixer.staggerDuration : 0;
	}
	applyTransition(e) {
		this.dom.el.style.transition = e.join(", ");
	}
	handleTransitionEnd(e) {
		let t = e.propertyName, n = this.mixer.config.animation.animateResizeTargets;
		if (this.isBound && e.target === this.dom.el && (t.indexOf("transform") > -1 || t.indexOf("opacity") > -1 || n && t.indexOf("height") > -1 || n && t.indexOf("width") > -1 || n && t.indexOf("margin") > -1)) {
			let e = this.callback, t = this.operation;
			this.isBound = !1, this.callback = null, this.operation = null, e(this, t);
		}
	}
	bindEvents() {
		this.handler = (e) => {
			this.handleTransitionEnd(e);
		}, this.dom.el.addEventListener("transitionend", this.handler), this.dom.el.addEventListener("transitioncancel", this.handler);
	}
	unbindEvents() {
		this.handler &&= (this.dom.el.removeEventListener("transitionend", this.handler), this.dom.el.removeEventListener("transitioncancel", this.handler), null);
	}
	getPosData(e) {
		let t = this.dom.el, n = {
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
			scale: {
				value: 0,
				unit: ""
			},
			translateX: {
				value: 0,
				unit: ""
			},
			translateY: {
				value: 0,
				unit: ""
			},
			translateZ: {
				value: 0,
				unit: ""
			},
			rotateX: {
				value: 0,
				unit: ""
			},
			rotateY: {
				value: 0,
				unit: ""
			},
			rotateZ: {
				value: 0,
				unit: ""
			}
		};
		if (this.mixer.config.animation.animateResizeTargets || e) {
			let e = t.getBoundingClientRect();
			n.top = e.top, n.right = e.right, n.bottom = e.bottom, n.left = e.left, n.width = e.width, n.height = e.height;
		}
		if (this.mixer.config.animation.animateResizeTargets) {
			let e = t.ownerDocument.defaultView.getComputedStyle(t);
			n.marginBottom = parseFloat(e.marginBottom), n.marginRight = parseFloat(e.marginRight);
		}
		return n;
	}
	cleanUp() {
		let e = this.dom.el;
		this.isBound = !1, this.callback = null, this.operation = null, e.style.transform = "", e.style.transition = "", e.style.opacity = "", this.mixer.config.animation.animateResizeTargets && (e.style.width = "", e.style.height = "", e.style.marginRight = "", e.style.marginBottom = "");
	}
};
// src/internal/ui-class-names.ts
function z() {
	return {
		base: "",
		active: "",
		disabled: ""
	};
}
// src/events.ts
var B = [
	"mixStart",
	"mixBusy",
	"mixEnd",
	"mixFail",
	"mixClick"
];
function V(e, t, n, r) {
	if (!B.includes(e)) throw Error("Event type \"" + e + "\" not found.");
	let i = {
		state: { ...n.state },
		futureState: n.futureState ? { ...n.futureState } : null,
		instance: n.instance,
		originalEvent: n.originalEvent || null
	};
	n.control && (i.control = n.control);
	let a = new ((r?.defaultView?.CustomEvent) ?? CustomEvent)(e, {
		bubbles: !0,
		cancelable: !0,
		detail: i
	});
	t.dispatchEvent(a);
}
// src/control.ts
var H = [], de = class {
	constructor() {
		this.el = null, this.selector = "", this.bound = [], this.pending = -1, this.type = "", this.status = "inactive", this.filter = "", this.sort = "", this.canDisable = !1, this.handler = null, this.classNames = z();
	}
	init(e, t, n) {
		if (this.el = e, this.type = t, this.selector = n, this.selector) this.status = "live";
		else switch (this.canDisable = typeof e.disabled == "boolean", this.type) {
			case "filter":
				this.filter = e.getAttribute("data-filter") || "";
				break;
			case "toggle":
				this.filter = e.getAttribute("data-toggle") || "";
				break;
			case "sort":
				this.sort = e.getAttribute("data-sort") || "";
				break;
			case "multimix": this.filter = e.getAttribute("data-filter") || "", this.sort = e.getAttribute("data-sort") || "";
		}
		this.bindClick(), H.push(this);
	}
	isBound(e) {
		return this.bound.indexOf(e) > -1;
	}
	addBinding(e) {
		this.isBound(e) || this.bound.push(e);
	}
	removeBinding(e) {
		let t = this.bound.indexOf(e);
		t > -1 && this.bound.splice(t, 1), this.bound.length < 1 && (this.unbindClick(), t = H.indexOf(this), t > -1 && H.splice(t, 1), this.status === "active" && this.renderStatus(this.el, "inactive"));
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
		let t = null, n = !1, r, i = {};
		this.pending = 0;
		let a = this.bound[0];
		if (t = this.selector ? e.target.closest(a.config.selectors.control + this.selector) : this.el, !t) return;
		switch (this.type) {
			case "filter":
				i.filter = this.filter || t.getAttribute("data-filter");
				break;
			case "sort":
				i.sort = this.sort || t.getAttribute("data-sort");
				break;
			case "multimix":
				i.filter = this.filter || t.getAttribute("data-filter"), i.sort = this.sort || t.getAttribute("data-sort");
				break;
			case "toggle": i.filter = this.filter || t.getAttribute("data-toggle"), n = this.status === "live" ? t.classList.contains(this.classNames.active) : this.status === "active";
		}
		let o = [];
		for (let e = 0; e < this.bound.length; e++) {
			let e = {};
			S(e, i), o.push(e);
		}
		this.pending = this.bound.length;
		for (let i = 0; i < this.bound.length; i++) {
			let a = this.bound[i], s = o[i];
			s && (V("mixClick", a.dom.container, {
				state: a.state,
				instance: a,
				originalEvent: e,
				control: t
			}, a.dom.document), typeof a.config.callbacks.onMixClick == "function" && (r = a.config.callbacks.onMixClick.call(t, a.state, e, a), r === !1) || a.mixControl(s, t, this.type === "toggle" ? !n : void 0));
		}
	}
	update(e, t) {
		if (this.pending--, this.pending = Math.max(0, this.pending), !(this.pending > 0)) {
			if (this.status === "live") this.updateLive(e, t);
			else {
				let n = {
					sort: this.sort,
					filter: this.filter
				};
				this.parseStatusChange(this.el, e, n, t);
			}
		}
	}
	updateLive(e, t) {
		if (!this.el) return;
		let n = this.el.querySelectorAll(this.selector);
		for (let r = 0; r < n.length; r++) {
			let i = n[r], a = {};
			switch (this.type) {
				case "filter":
					a.filter = i.getAttribute("data-filter");
					break;
				case "sort":
					a.sort = i.getAttribute("data-sort");
					break;
				case "multimix":
					a.filter = i.getAttribute("data-filter"), a.sort = i.getAttribute("data-sort");
					break;
				case "toggle": a.filter = i.getAttribute("data-toggle");
			}
			this.parseStatusChange(i, e, a, t);
		}
	}
	parseStatusChange(e, t, n, r) {
		switch (this.type) {
			case "filter":
				t.filter === n.filter ? this.renderStatus(e, "active") : this.renderStatus(e, "inactive");
				break;
			case "multimix":
				t.sort === n.sort && t.filter === n.filter ? this.renderStatus(e, "active") : this.renderStatus(e, "inactive");
				break;
			case "sort":
				let i = "";
				t.sort.match(/:asc/g) && (i = t.sort.replace(/:asc/g, "")), t.sort === n.sort || i === n.sort ? this.renderStatus(e, "active") : this.renderStatus(e, "inactive");
				break;
			case "toggle":
				r.length < 1 && this.renderStatus(e, "inactive"), t.filter === n.filter && this.renderStatus(e, "active");
				for (let t = 0; t < r.length; t++) {
					if (r[t] === n.filter) {
						this.renderStatus(e, "active");
						break;
					}
					this.renderStatus(e, "inactive");
				}
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
			case "disabled": this.canDisable && (this.el.disabled = !0), e.classList.add(this.classNames.disabled), e.classList.remove(this.classNames.active);
		}
		this.status !== "live" && (this.status = t);
	}
};
// src/control-definition.ts
function U(e, t, n = !1, r = "") {
	return Object.freeze({
		type: e,
		selector: t,
		live: n,
		parent: r
	});
}
var fe = [
	U("multimix", "[data-filter][data-sort]"),
	U("filter", "[data-filter]"),
	U("sort", "[data-sort]"),
	U("toggle", "[data-toggle]")
], W = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap();
function pe(e, t) {
	W.set(e, t);
	let n = e.ownerDocument;
	if (!t.controls.length || !n.defaultView) return;
	G.set(e, n);
	let r = K.get(n);
	if (r) {
		r.count++;
		return;
	}
	let i = new n.defaultView.MutationObserver((e) => {
		for (let { removedNodes: t } of e) for (let e of t) {
			if (e.nodeType !== 1 || e.isConnected) continue;
			let t = e;
			if (G.has(t) && W.get(t)?.destroy(), !t.firstElementChild) continue;
			let r = n.createTreeWalker(t, 1);
			for (; r.nextNode();) {
				let e = r.currentNode;
				G.has(e) && W.get(e)?.destroy();
			}
		}
	});
	i.observe(n, {
		childList: !0,
		subtree: !0
	}), K.set(n, {
		observer: i,
		count: 1
	});
}
function me(e) {
	W.delete(e);
	let t = G.get(e);
	if (!t) return;
	G.delete(e);
	let n = K.get(t);
	--n.count === 0 && (n.observer.disconnect(), K.delete(t));
}
// src/mixer.ts
var he = [
	"scale",
	"translateX",
	"translateY",
	"translateZ",
	"rotateX",
	"rotateY",
	"rotateZ"
], ge = [
	"%",
	"px",
	"em",
	"rem",
	"vh",
	"vw",
	"deg"
];
function q(e, t) {
	let n = 0;
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		t(i) || (e[n++] = i);
	}
	e.length = n;
}
var J = 100;
function Y() {
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
		scale: {
			value: 0,
			unit: ""
		},
		translateX: {
			value: 0,
			unit: ""
		},
		translateY: {
			value: 0,
			unit: ""
		},
		translateZ: {
			value: 0,
			unit: ""
		},
		rotateX: {
			value: 0,
			unit: ""
		},
		rotateY: {
			value: 0,
			unit: ""
		},
		rotateZ: {
			value: 0,
			unit: ""
		}
	};
}
function X() {
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
var Z = {
	scale: {
		value: .01,
		unit: ""
	},
	translateX: {
		value: 20,
		unit: "px"
	},
	translateY: {
		value: 20,
		unit: "px"
	},
	translateZ: {
		value: 20,
		unit: "px"
	},
	rotateX: {
		value: 20,
		unit: "deg"
	},
	rotateY: {
		value: 20,
		unit: "deg"
	},
	rotateZ: {
		value: 20,
		unit: "deg"
	}
}, Q = class {
	constructor() {
		this.config = f(), this.id = "", this.isBusy = !1, this.destroyed = !1, this.activeOperation = null, this.frame = null, this.timer = null, this.refreshPending = !1, this.incPadding = !0, this.controls = [], this.targets = [], this.origOrder = [], this.cache = Object.create(null), this.toggleArray = [], this.targetsBound = 0, this.targetsDone = 0, this.staggerDuration = 0, this.effectsIn = null, this.effectsOut = null, this.transformIn = [], this.transformOut = [], this.queue = [], this.state = null, this.lastOperation = null, this.userCallback = null, this.userDeferred = null, this.dom = {
			document: null,
			body: null,
			container: null,
			parent: null,
			targets: []
		};
	}
	attach(e, t, n, r) {
		this.id = n, r && S(this.config, r, !0, !0), this.sanitizeConfig(), this.cacheDom(e), this.config.layout.containerClassName && this.dom.container.classList.add(this.config.layout.containerClassName), this.config.data.uidKey && (this.config.controls.enable = !1), this.indexTargets(this.findTargets(), this.config.load.dataset), this.state = this.getInitialState();
		for (let e of this.lastOperation.toHide) e.hide();
		this.config.controls.enable && (this.initControls(t), this.buildToggleArray(null, this.state), this.updateControls({
			filter: this.state.activeFilter,
			sort: this.state.activeSort
		})), this.parseEffects();
	}
	sanitizeConfig() {
		this.config.controls.scope = this.config.controls.scope.toLowerCase().trim(), this.config.controls.toggleLogic = this.config.controls.toggleLogic.toLowerCase().trim(), this.config.controls.toggleDefault = this.config.controls.toggleDefault.toLowerCase().trim(), this.config.animation.effects = this.config.animation.effects.trim();
	}
	getInitialState() {
		let e = this.createMutableState(), t = p();
		if (e.activeContainerClassName = this.config.layout.containerClassName, this.config.load.dataset) {
			if (!this.config.data.uidKey || typeof this.config.data.uidKey != "string") throw TypeError(L.errorConfigDataUidKeyNotSet());
			t.startDataset = t.newDataset = e.activeDataset = this.config.load.dataset.slice(), t.startContainerClassName = t.newContainerClassName = e.activeContainerClassName, t.show = this.targets.slice();
		} else e.activeFilter = this.parseFilterArgs([this.config.load.filter]).command, e.activeSort = this.parseSortArgs([this.config.load.sort]).command, e.totalTargets = this.targets.length, e.activeSort.collection || e.activeSort.attribute || e.activeSort.order === "random" || e.activeSort.order === "desc" ? (t.newSort = e.activeSort, this.sortOperation(t), this.printSort(!1, t), this.targets = t.newOrder) : t.startOrder = t.newOrder = this.targets, t.startFilter = t.newFilter = e.activeFilter, t.startSort = t.newSort = e.activeSort, t.startContainerClassName = t.newContainerClassName = e.activeContainerClassName, t.newFilter.selector === "all" ? t.newFilter.selector = this.config.selectors.target : t.newFilter.selector === "none" && (t.newFilter.selector = "");
		return this.lastOperation = t, t.newFilter && this.filterOperation(t), e = this.buildState(t), e;
	}
	cacheDom(e) {
		this.dom.document = e.ownerDocument, this.dom.body = this.dom.document.querySelector("body"), this.dom.container = e, this.dom.parent = e;
	}
	findTargets() {
		return this.config.layout.allowNestedTargets ? Array.from(this.dom.container.querySelectorAll(this.config.selectors.target)) : ce(this.dom.container, this.config.selectors.target);
	}
	indexTargets(e, t) {
		if (t && t.length !== e.length) throw Error(L.errorDatasetPrerenderedMismatch());
		for (let e of this.targets) e.unbindEvents(), e.isInDom = !1;
		if (this.dom.targets = e, this.dom.parent = this.dom.container, this.targets = [], this.dom.targets.length) {
			for (let e = 0; e < this.dom.targets.length; e++) {
				let n = this.dom.targets[e], r = new R();
				r.init(n, this, t ? t[e] : void 0), r.isInDom = !0, this.targets.push(r);
			}
			this.dom.parent = this.dom.targets[0].parentElement === this.dom.container ? this.dom.container : this.dom.targets[0].parentElement;
		}
		this.origOrder = this.targets;
	}
	initControls(e) {
		let t;
		switch (this.config.controls.scope) {
			case "local":
				t = this.dom.container;
				break;
			case "global":
				t = e;
				break;
			default: throw Error(L.errorConfigInvalidControlsScope());
		}
		for (let e of fe) if (this.config.controls.live || e.live) {
			let n;
			if (e.parent) {
				let t = this.dom[e.parent];
				if (!t || Array.isArray(t) && t.length < 1) continue;
				n = typeof t.length == "number" ? Array.from(t) : [t];
			} else n = [t];
			for (let t of n) {
				let n = this.getControl(t, e.type, e.selector);
				this.controls.push(n);
			}
		} else {
			let n = t.querySelectorAll(this.config.selectors.control + e.selector);
			for (let t = 0; t < n.length; t++) {
				let r = n[t], i = this.getControl(r, e.type, "");
				i && this.controls.push(i);
			}
		}
	}
	getControl(e, t, n) {
		if (!n) {
			for (let r of H) if (r.el === e && r.isBound(this)) return null;
			else if (r.el === e && r.type === t && r.selector === n) return r.addBinding(this), r;
		}
		let r = new de();
		return r.init(e, t, n), r.classNames.base = F(this.config.classNames, t), r.classNames.active = F(this.config.classNames, t, this.config.classNames.modifierActive), r.classNames.disabled = F(this.config.classNames, t, this.config.classNames.modifierDisabled), r.addBinding(this), r;
	}
	getToggleSelector() {
		this.toggleArray = j(this.toggleArray);
		let e = this.config.controls.toggleLogic === "or" ? ", " : "", t = this.toggleArray.join(e);
		return t === "" && (t = this.config.controls.toggleDefault), t;
	}
	buildToggleArray(e, t) {
		let n = "";
		if (e && e.filter) n = e.filter.selector.replace(/\s/g, "");
		else if (t) n = t.activeFilter.selector.replace(/\s/g, "");
		else return;
		(n === this.config.selectors.target || n === "all") && (n = ""), this.toggleArray = this.config.controls.toggleLogic === "or" ? n.split(",") : this.splitCompoundSelector(n), this.toggleArray = j(this.toggleArray);
	}
	splitCompoundSelector(e) {
		let t = e.split(/([\.\[])/g), n = [], r = "";
		t[0] === "" && t.shift();
		for (let e = 0; e < t.length; e++) e % 2 == 0 && (r = ""), r += t[e], e % 2 != 0 && n.push(r);
		return n;
	}
	updateControls(e) {
		let t = {};
		t.filter = e.filter ? e.filter.selector : this.state.activeFilter.selector, t.sort = e.sort ? this.buildSortString(e.sort) : this.buildSortString(this.state.activeSort), t.filter === this.config.selectors.target && (t.filter = "all"), t.filter === "" && (t.filter = "none"), Object.freeze(t);
		for (let e of this.controls) e.update(t, this.toggleArray);
	}
	buildSortString(e) {
		let t = e.sortString;
		return e.next && (t += " " + this.buildSortString(e.next)), t;
	}
	insertTargets(e, t) {
		e.index === void 0 && (e.index = 0);
		let n = this.getNextSibling(e.index, e.sibling, e.position), r = this.dom.document.createDocumentFragment(), i;
		if (i = n ? ae(n, this.config.selectors.target) : this.targets.length, e.collection) {
			let t = new Set(this.dom.targets);
			for (let n of e.collection) {
				if (t.has(n)) throw Error(L.errorInsertPreexistingElement());
				if (n.style.display = "none", r.appendChild(n), r.appendChild(this.dom.document.createTextNode(" ")), !D(n, this.dom.document) || !n.matches(this.config.selectors.target)) continue;
				let e = new R();
				e.init(n, this), e.isInDom = !0, this.targets.splice(i, 0, e), i++;
			}
			this.dom.parent.insertBefore(r, n);
		}
		t.startOrder = this.origOrder = this.targets;
	}
	getNextSibling(e, t, n) {
		let r = null;
		return e = Math.max(e, 0), t && n === "before" ? r = t : t && n === "after" ? r = t.nextElementSibling || null : this.targets.length > 0 && e !== void 0 ? r = e < this.targets.length ? this.targets[e].dom.el : this.targets[this.targets.length - 1].dom.el.nextElementSibling : this.targets.length === 0 && this.dom.parent.children.length > 0 && (r = this.config.layout.siblingAfter ? this.config.layout.siblingAfter : this.config.layout.siblingBefore ? this.config.layout.siblingBefore.nextElementSibling : this.dom.parent.children[0]), r;
	}
	filterOperation(e) {
		let t = e.newFilter.action, n = e.newFilter.collection ? new Set(e.newFilter.collection) : null;
		for (let r of e.newOrder) {
			let i = !1;
			i = n ? n.has(r.dom.el) : e.newFilter.selector !== "" && r.dom.el.matches(e.newFilter.selector), this.evaluateHideShow(i, r, t, e);
		}
		if (e.toRemove.length) {
			let t = new Set(e.toRemove);
			q(e.show, (n) => t.has(n) ? (e.toHide.push(n), e.hide.push(n), !0) : !1), q(e.toShow, (e) => t.has(e));
		}
		e.matching = e.show.slice(), e.show.length === 0 && e.newFilter.selector !== "" && this.targets.length !== 0 && (e.hasFailed = !0);
	}
	evaluateHideShow(e, t, n, r) {
		e === !0 && n === "show" || e === !1 && n === "hide" ? (r.show.push(t), t.isShown || r.toShow.push(t)) : (r.hide.push(t), t.isShown && r.toHide.push(t));
	}
	sortOperation(e) {
		if (e.startOrder = this.targets, e.newSort.collection) {
			let t = [], n = new Set(this.dom.targets), r = /* @__PURE__ */ new Map();
			for (let e of this.targets) r.set(e.dom.el, e);
			for (let i of e.newSort.collection) {
				if (!n.has(i)) throw Error(L.errorSortNonExistentElement());
				let e = r.get(i);
				e || (e = new R(), e.init(i, this), e.isInDom = !0), t.push(e);
			}
			e.newOrder = t;
		} else if (e.newSort.order === "random") e.newOrder = se(e.startOrder);
		else if (e.newSort.attribute === "") e.newOrder = this.origOrder.slice(), e.newSort.order === "desc" && e.newOrder.reverse();
		else {
			let t = e.startOrder, n = /* @__PURE__ */ new Map();
			for (let r of t) {
				let t = [];
				for (let n = e.newSort; n; n = n.next) t.push(this.getSortKey(r, n.attribute));
				n.set(r, t);
			}
			e.newOrder = t.slice(), e.newOrder.sort((t, r) => this.compare(n.get(t), n.get(r), e.newSort));
		}
		k(e.newOrder, e.startOrder) && (e.willSort = !1);
	}
	compare(e, t, n, r = 0) {
		let i = n.order, a = e[r], o = t[r], s = a.isNumeric && o.isNumeric, c = s ? a.number : a.string, l = s ? o.number : o.string;
		return c < l ? i === "asc" ? -1 : 1 : c > l ? i === "asc" ? 1 : -1 : c === l && n.next ? this.compare(e, t, n.next, r + 1) : 0;
	}
	getSortKey(e, t) {
		let n = e.dom.el.getAttribute("data-" + t);
		n === null && this.config.debug.showWarnings && console.warn(L.warningInconsistentSortingAttributes({ attribute: "data-" + t }));
		let r = n || "0", i = Number(r);
		return {
			isNumeric: !isNaN(i),
			number: i,
			string: r.toLowerCase()
		};
	}
	printSort(e, t) {
		let n = e ? t.newOrder : t.startOrder, r = e ? t.startOrder : t.newOrder, i = n.length ? n[n.length - 1].dom.el.nextElementSibling : null, a = this.dom.document, o = a.createDocumentFragment(), s;
		for (let e of n) {
			let t = e.dom.el;
			t.parentElement ? t.style.position !== "absolute" && (O(t.previousSibling), t.parentElement.removeChild(t)) : (s ??= /* @__PURE__ */ new Set()).add(e);
		}
		let c = i ? i.previousSibling : this.dom.parent.lastChild;
		c && c.nodeName === "#text" && O(c);
		for (let e of r) {
			if (s?.has(e)) continue;
			let t = e.dom.el;
			o.lastElementChild && o.appendChild(a.createTextNode(" ")), o.appendChild(t);
		}
		this.dom.parent.firstChild && this.dom.parent.firstChild !== i && o.insertBefore(a.createTextNode(" "), o.firstChild), i ? (o.appendChild(a.createTextNode(" ")), this.dom.parent.insertBefore(o, i)) : this.dom.parent.appendChild(o);
	}
	parseSortString(e, t) {
		let n = e.split(" "), r = t;
		for (let e = 0; e < n.length; e++) {
			let t = n[e].split(":");
			switch (r.sortString = n[e], r.attribute = E(t[0]), r.order = t[1] || "asc", r.attribute) {
				case "default":
					r.attribute = "";
					break;
				case "random": r.attribute = "", r.order = "random";
			}
			if (!r.attribute || r.order === "random") break;
			e < n.length - 1 && (r.next = g(), Object.freeze(r), r = r.next);
		}
		return t;
	}
	parseEffects() {
		let e = this.config.animation.effectsIn || this.config.animation.effects, t = this.config.animation.effectsOut || this.config.animation.effects;
		this.effectsIn = Y(), this.effectsOut = Y(), this.transformIn = [], this.transformOut = [], this.effectsIn.opacity = this.effectsOut.opacity = 1, this.parseEffect("fade", e, this.effectsIn, this.transformIn), this.parseEffect("fade", t, this.effectsOut, this.transformOut, !0);
		for (let n in Z) this.parseEffect(n, e, this.effectsIn, this.transformIn), this.parseEffect(n, t, this.effectsOut, this.transformOut, !0);
		this.parseEffect("stagger", e, this.effectsIn, this.transformIn), this.parseEffect("stagger", t, this.effectsOut, this.transformOut, !0);
	}
	parseEffect(e, t, n, r, i = !1) {
		let a = /\(([^)]+)\)/;
		if (typeof t != "string") throw TypeError(L.errorConfigInvalidAnimationEffects());
		if (t.indexOf(e) < 0) {
			e === "stagger" && (this.staggerDuration = 0);
			return;
		}
		let o = t.indexOf(e + "("), s = "";
		if (o > -1) {
			let e = t.substring(o), n = a.exec(e);
			n && (s = n[1]);
		}
		switch (e) {
			case "fade":
				n.opacity = s ? parseFloat(s) : 0;
				break;
			case "stagger":
				this.staggerDuration = s ? parseFloat(s) : 100;
				break;
			default: {
				let t = n[e], a = Z[e];
				if (t.value = i && this.config.animation.reverseOut && e !== "scale" ? (s ? parseFloat(s) : a.value) * -1 : s ? parseFloat(s) : a.value, s) {
					for (let e of ge) if (s.indexOf(e) > -1) {
						t.unit = e;
						break;
					}
				} else t.unit = a.unit;
				r.push(e + "(" + t.value + t.unit + ")");
			}
		}
	}
	buildState(e) {
		let t = [], n = [], r = [], i = [], a = new Set(e.toRemove);
		for (let e of this.targets) a.has(e) || t.push(e.dom.el);
		for (let t of e.matching) n.push(t.dom.el);
		for (let t of e.show) r.push(t.dom.el);
		for (let t of e.hide) a.has(t) || i.push(t.dom.el);
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
			show: r,
			hide: i,
			matching: n
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
		let n = this.dom.document.defaultView;
		e && this.config.animation.enable && t.docState && n && this.config.animation.duration && this.config.animation.effects && P(this.dom.container) || (e = !1), t.toShow.length || t.toHide.length || t.willSort || t.willChangeLayout || (e = !1), !t.startState?.show?.length && !t.show.length && (e = !1);
		let r = this.userDeferred ??= this.createDeferred();
		this.isBusy = !0, this.activeOperation = t;
		try {
			V("mixStart", this.dom.container, {
				state: t.startState,
				futureState: t.newState,
				instance: this
			}, this.dom.document), this.destroyed || this.config.callbacks.onMixStart?.call(this.dom.container, t.startState, t.newState, this);
		} catch (e) {
			return r.reject(e), this.cleanUp(t, !1), r.promise;
		}
		return this.destroyed ? r.promise : (this.dom.container.classList.remove(F(this.config.classNames, "container", this.config.classNames.modifierFailed)), !e || !y.hasTransitions ? (this.config.debug.fauxAsync ? this.scheduleCompletion(t, this.config.animation.duration) : this.cleanUp(t), r.promise) : ((n.pageYOffset !== t.docState.scrollTop || n.pageXOffset !== t.docState.scrollLeft) && n.scrollTo(t.docState.scrollLeft, t.docState.scrollTop), this.config.animation.applyPerspective && (this.dom.parent.style.perspective = this.config.animation.perspectiveDistance, this.dom.parent.style.perspectiveOrigin = this.config.animation.perspectiveOrigin), this.config.animation.animateResizeContainer && t.startHeight !== t.newHeight && t.viewportDeltaY !== t.startHeight - t.newHeight && (this.dom.parent.style.height = t.startHeight + "px"), this.config.animation.animateResizeContainer && t.startWidth !== t.newWidth && t.viewportDeltaX !== t.startWidth - t.newWidth && (this.dom.parent.style.width = t.startWidth + "px"), t.startHeight === t.newHeight && (this.dom.parent.style.height = t.startHeight + "px"), t.startWidth === t.newWidth && (this.dom.parent.style.width = t.startWidth + "px"), t.startHeight === t.newHeight && t.startWidth === t.newWidth && (this.dom.parent.style.overflow = "hidden"), this.scheduleCompletion(t, this.config.animation.duration + J), this.frame = n.requestAnimationFrame(() => {
			this.activeOperation === t && (this.frame = null, this.moveTargets(t));
		}), r.promise));
	}
	scheduleCompletion(e, t) {
		this.timer !== null && window.clearTimeout(this.timer), this.timer = window.setTimeout(() => this.cleanUp(e), t);
	}
	cancelScheduledWork() {
		this.frame !== null && this.dom.document.defaultView.cancelAnimationFrame(this.frame), this.timer !== null && window.clearTimeout(this.timer), this.frame = this.timer = null;
	}
	createDeferred() {
		let e, t, n = new Promise((n, r) => {
			e = n, t = r;
		});
		return {
			resolve: e,
			reject: t,
			promise: n
		};
	}
	getStartMixData(e) {
		let t = this.dom.document.defaultView.getComputedStyle(this.dom.parent), n = this.dom.parent.getBoundingClientRect(), r = t.boxSizing;
		this.incPadding = r === "border-box";
		for (let t = 0; t < e.show.length; t++) {
			let n = e.show[t].getPosData();
			e.showPosData[t] = { startPosData: n };
		}
		for (let t = 0; t < e.toHide.length; t++) {
			let n = e.toHide[t].getPosData();
			e.toHidePosData[t] = { startPosData: n };
		}
		e.startX = n.left, e.startY = n.top, e.startHeight = this.incPadding ? n.height : n.height - parseFloat(t.paddingTop) - parseFloat(t.paddingBottom) - parseFloat(t.borderTop) - parseFloat(t.borderBottom), e.startWidth = this.incPadding ? n.width : n.width - parseFloat(t.paddingLeft) - parseFloat(t.paddingRight) - parseFloat(t.borderLeft) - parseFloat(t.borderRight);
	}
	setInter(e) {
		this.config.animation.clampHeight && (this.dom.parent.style.height = e.startHeight + "px", this.dom.parent.style.overflow = "hidden"), this.config.animation.clampWidth && (this.dom.parent.style.width = e.startWidth + "px", this.dom.parent.style.overflow = "hidden");
		for (let t of e.toShow) t.show();
		e.willChangeLayout && (e.startContainerClassName && this.dom.container.classList.remove(e.startContainerClassName), e.newContainerClassName && this.dom.container.classList.add(e.newContainerClassName));
	}
	getInterMixData(e) {
		for (let t = 0; t < e.show.length; t++) {
			let n = e.show[t];
			e.showPosData[t].interPosData = n.getPosData();
		}
		for (let t = 0; t < e.toHide.length; t++) {
			let n = e.toHide[t];
			e.toHidePosData[t].interPosData = n.getPosData();
		}
	}
	setFinal(e) {
		e.willSort && this.printSort(!1, e);
		for (let t of e.toHide) t.hide();
	}
	getFinalMixData(e) {
		for (let t = 0; t < e.show.length; t++) {
			let n = e.show[t];
			e.showPosData[t].finalPosData = n.getPosData();
		}
		for (let t = 0; t < e.toHide.length; t++) {
			let n = e.toHide[t];
			e.toHidePosData[t].finalPosData = n.getPosData();
		}
		(this.config.animation.clampHeight || this.config.animation.clampWidth) && (this.dom.parent.style.height = this.dom.parent.style.width = this.dom.parent.style.overflow = "");
		let t = null;
		this.incPadding || (t = this.dom.document.defaultView.getComputedStyle(this.dom.parent));
		let n = this.dom.parent.getBoundingClientRect();
		e.newX = n.left, e.newY = n.top, e.newHeight = this.incPadding ? n.height : n.height - parseFloat(t.paddingTop) - parseFloat(t.paddingBottom) - parseFloat(t.borderTop) - parseFloat(t.borderBottom), e.newWidth = this.incPadding ? n.width : n.width - parseFloat(t.paddingLeft) - parseFloat(t.paddingRight) - parseFloat(t.borderLeft) - parseFloat(t.borderRight);
		let r = this.dom.document && "documentElement" in this.dom.document ? this.dom.document.documentElement : null;
		e.viewportDeltaX = e.docState.viewportWidth - (r ? r.clientWidth : 0), e.viewportDeltaY = e.docState.viewportHeight - (r ? r.clientHeight : 0), e.willSort && this.printSort(!0, e);
		for (let t of e.toShow) t.hide();
		for (let t of e.toHide) t.show();
		e.willChangeLayout && (e.newContainerClassName && this.dom.container.classList.remove(e.newContainerClassName), this.config.layout.containerClassName && this.dom.container.classList.add(this.config.layout.containerClassName));
	}
	getTweenData(e) {
		let t = Object.getOwnPropertyNames(this.effectsIn);
		for (let n = 0; n < e.show.length; n++) {
			let r = e.show[n], i = e.showPosData[n];
			if (i.posIn = Y(), i.posOut = Y(), i.tweenData = Y(), r.isShown ? (i.posIn.x = i.startPosData.x - i.interPosData.x, i.posIn.y = i.startPosData.y - i.interPosData.y) : i.posIn.x = i.posIn.y = 0, i.posOut.x = i.finalPosData.x - i.interPosData.x, i.posOut.y = i.finalPosData.y - i.interPosData.y, i.posIn.opacity = r.isShown ? 1 : this.effectsIn.opacity, i.posOut.opacity = 1, i.tweenData.opacity = i.posOut.opacity - i.posIn.opacity, !r.isShown && !this.config.animation.nudge && (i.posIn.x = i.posOut.x, i.posIn.y = i.posOut.y), i.tweenData.x = i.posOut.x - i.posIn.x, i.tweenData.y = i.posOut.y - i.posIn.y, this.config.animation.animateResizeTargets) {
				i.posIn.width = i.startPosData.width, i.posIn.height = i.startPosData.height;
				let e = (i.startPosData.width || i.finalPosData.width) - i.interPosData.width;
				i.posIn.marginRight = i.startPosData.marginRight - e;
				let t = (i.startPosData.height || i.finalPosData.height) - i.interPosData.height;
				i.posIn.marginBottom = i.startPosData.marginBottom - t, i.posOut.width = i.finalPosData.width, i.posOut.height = i.finalPosData.height, e = (i.finalPosData.width || i.startPosData.width) - i.interPosData.width, i.posOut.marginRight = i.finalPosData.marginRight - e, t = (i.finalPosData.height || i.startPosData.height) - i.interPosData.height, i.posOut.marginBottom = i.finalPosData.marginBottom - t, i.tweenData.width = i.posOut.width - i.posIn.width, i.tweenData.height = i.posOut.height - i.posIn.height, i.tweenData.marginRight = i.posOut.marginRight - i.posIn.marginRight, i.tweenData.marginBottom = i.posOut.marginBottom - i.posIn.marginBottom;
			}
			for (let e of t) {
				let t = this.effectsIn[e];
				typeof t == "object" && "value" in t && t.value && (i.posIn[e].value = t.value, i.posOut[e].value = 0, i.tweenData[e].value = i.posOut[e].value - i.posIn[e].value, i.posIn[e].unit = i.posOut[e].unit = i.tweenData[e].unit = t.unit);
			}
		}
		for (let n = 0; n < e.toHide.length; n++) {
			let r = e.toHide[n], i = e.toHidePosData[n];
			if (i.posIn = Y(), i.posOut = Y(), i.tweenData = Y(), i.posIn.x = r.isShown ? i.startPosData.x - i.interPosData.x : 0, i.posIn.y = r.isShown ? i.startPosData.y - i.interPosData.y : 0, i.posOut.x = this.config.animation.nudge ? 0 : i.posIn.x, i.posOut.y = this.config.animation.nudge ? 0 : i.posIn.y, i.tweenData.x = i.posOut.x - i.posIn.x, i.tweenData.y = i.posOut.y - i.posIn.y, this.config.animation.animateResizeTargets) {
				i.posIn.width = i.startPosData.width, i.posIn.height = i.startPosData.height;
				let e = i.startPosData.width - i.interPosData.width;
				i.posIn.marginRight = i.startPosData.marginRight - e;
				let t = i.startPosData.height - i.interPosData.height;
				i.posIn.marginBottom = i.startPosData.marginBottom - t;
			}
			i.posIn.opacity = 1, i.posOut.opacity = this.effectsOut.opacity, i.tweenData.opacity = i.posOut.opacity - i.posIn.opacity;
			for (let e of t) {
				let t = this.effectsOut[e];
				typeof t == "object" && "value" in t && t.value && (i.posIn[e].value = 0, i.posOut[e].value = t.value, i.tweenData[e].value = i.posOut[e].value - i.posIn[e].value, i.posIn[e].unit = i.posOut[e].unit = i.tweenData[e].unit = t.unit);
			}
		}
	}
	moveTargets(e) {
		let t = this.checkProgress.bind(this), n = P(this.dom.container), r = [], i = -1;
		for (let a = 0; a < e.show.length; a++) {
			let o = e.show[a], s = e.showPosData[a], c = X(), l = o.isShown ? "none" : "show", u = n && this.willTransition(l, e.hasEffect, s.posIn, s.posOut);
			u && i++, o.show(), c.posIn = s.posIn, c.posOut = s.posOut, c.statusChange = l, c.staggerIndex = i, c.operation = e, c.callback = u ? t : null, o.applyStylesIn(c), r.push([o, c]);
		}
		for (let i = 0; i < e.toHide.length; i++) {
			let a = e.toHide[i], o = e.toHidePosData[i], s = X(), c = n && this.willTransition("hide", !0, o.posIn, o.posOut);
			s.posIn = o.posIn, s.posOut = o.posOut, s.statusChange = "hide", s.staggerIndex = i, s.operation = e, s.callback = c ? t : null, a.applyStylesIn(s), r.push([a, s]);
		}
		this.config.animation.animateResizeContainer && (this.dom.parent.style.transition = "height " + this.config.animation.duration + "ms ease, width " + this.config.animation.duration + "ms ease "), this.frame = this.dom.document.defaultView.requestAnimationFrame(() => {
			if (this.activeOperation !== e) return;
			this.frame = null, this.config.animation.animateResizeContainer && (e.startHeight !== e.newHeight && e.viewportDeltaY !== e.startHeight - e.newHeight && (this.dom.parent.style.height = e.newHeight + "px"), e.startWidth !== e.newWidth && e.viewportDeltaX !== e.startWidth - e.newWidth && (this.dom.parent.style.width = e.newWidth + "px"));
			let t = 0;
			try {
				for (let [n, i] of r) {
					if (!i.callback) continue;
					let r = n.getDelay(i.staggerIndex);
					if (this.activeOperation !== e) return;
					t = Math.max(t, n.applyStylesOut(i, r));
				}
			} catch (t) {
				if (this.activeOperation !== e) return;
				this.userDeferred.reject(t), this.cleanUp(e, !1);
				return;
			}
			this.targetsBound ? this.scheduleCompletion(e, t + J) : this.cleanUp(e);
		}), e.willChangeLayout && (this.config.layout.containerClassName && this.dom.container.classList.remove(this.config.layout.containerClassName), e.newContainerClassName && this.dom.container.classList.add(e.newContainerClassName));
	}
	hasEffect() {
		if (this.effectsIn.opacity !== 1) return !0;
		for (let e of he) {
			let t = this.effectsIn[e];
			if ((typeof t == "object" && t && t.value !== void 0 ? t.value : t) !== 0) return !0;
		}
		return !1;
	}
	willTransition(e, t, n, r) {
		return e !== "none" && t || n.x !== r.x || n.y !== r.y ? !0 : this.config.animation.animateResizeTargets ? n.width !== r.width || n.height !== r.height || n.marginRight !== r.marginRight || n.marginBottom !== r.marginBottom : !1;
	}
	checkProgress(e, t) {
		t === this.activeOperation && (this.targetsDone++, this.targetsBound === this.targetsDone && this.cleanUp(t));
	}
	finishOperation(e) {
		this.targetsBound = this.targetsDone = 0;
		for (let t of e.show) t.cleanUp(), t.show();
		for (let t of e.toHide) t.cleanUp(), t.hide();
		if (e.willSort && this.printSort(!1, e), this.dom.parent.style.transition = "", this.dom.parent.style.height = "", this.dom.parent.style.width = "", this.dom.parent.style.overflow = "", this.dom.parent.style.perspective = "", this.dom.parent.style.perspectiveOrigin = "", e.willChangeLayout && (e.startContainerClassName && this.dom.container.classList.remove(e.startContainerClassName), e.newContainerClassName && this.dom.container.classList.add(e.newContainerClassName)), e.toRemove.length) {
			let t = new Set(e.toRemove);
			q(this.targets, (n) => {
				if (!t.has(n)) return !1;
				let r = n.dom.el.previousSibling, i = n.dom.el.nextSibling;
				return r && r.nodeName === "#text" && i && i.nodeName === "#text" && O(r), e.willSort || n.dom.el.remove(), n.unbindEvents(), n.isInDom = !1, !0;
			}), this.origOrder = this.targets;
		}
		e.willSort && (this.targets = e.newOrder), this.state = e.newState, this.lastOperation = e, this.dom.targets = this.state.targets;
	}
	cleanUp(e, t = !0) {
		if (this.activeOperation !== e) return;
		this.activeOperation = null, this.cancelScheduledWork();
		let n = this.userDeferred;
		try {
			this.finishOperation(e), this.refreshPending && !this.destroyed && this.refreshTargets();
			let r = this.state;
			t && !this.destroyed && (V("mixEnd", this.dom.container, {
				state: r,
				instance: this
			}, this.dom.document), this.destroyed || this.config.callbacks.onMixEnd?.call(this.dom.container, r, this), r.hasFailed && !this.destroyed && (this.dom.container.classList.add(F(this.config.classNames, "container", this.config.classNames.modifierFailed)), V("mixFail", this.dom.container, {
				state: r,
				instance: this
			}, this.dom.document), this.destroyed || this.config.callbacks.onMixFail?.call(this.dom.container, r, this)), this.destroyed || this.userCallback?.call(this.dom.container, r, this)), n.resolve(r);
		} catch (e) {
			n.reject(e);
		} finally {
			this.userCallback = null, this.userDeferred = null, this.isBusy = !1, this.drainQueue();
		}
	}
	drainQueue() {
		for (; !this.destroyed && !this.isBusy && this.queue.length;) {
			let e = this.queue.shift();
			this.userDeferred = e.deferred;
			try {
				"dataset" in e.instruction.command ? this.dataset(...e.args) : this.runMultimix(e.args, e.triggerElement, e.isToggling);
			} catch (t) {
				e.deferred.reject(t), this.userDeferred = null, this.userCallback = null;
			}
		}
	}
	parseMultimixArgs(e) {
		let t = h();
		t.animate = this.config.animation.enable, t.command = v();
		for (let n of e) n !== null && (typeof n == "object" ? S(t.command, n) : typeof n == "boolean" ? t.animate = n : typeof n == "function" && (t.callback = n));
		let n = t.command;
		return n.insert && typeof n.insert == "object" && !n.insert.collection && (n.insert = this.parseInsertArgs([n.insert]).command), n.remove && typeof n.remove == "object" && !n.remove.targets && (n.remove = this.parseRemoveArgs([n.remove]).command), n.filter != null && (typeof n.filter == "string" || D(n.filter, this.dom.document) || typeof n.filter.length == "number") && (n.filter = this.parseFilterArgs([n.filter]).command), n.sort != null && (typeof n.sort == "string" || typeof n.sort.length == "number") && (n.sort = this.parseSortArgs([n.sort]).command), n.changeLayout && typeof n.changeLayout != "object" && (n.changeLayout = this.parseChangeLayoutArgs([n.changeLayout]).command), Object.freeze(t), t;
	}
	parseFilterArgs(e) {
		let t = h();
		t.animate = this.config.animation.enable, t.command = ee();
		let n = t.command;
		for (let r of e) typeof r == "string" ? n.selector = r : r === null ? n.collection = [] : typeof r == "object" && D(r, this.dom.document) ? n.collection = [r] : typeof r == "object" && r.length !== void 0 ? n.collection = Array.from(r) : typeof r == "object" ? S(n, r) : typeof r == "boolean" ? t.animate = r : typeof r == "function" && (t.callback = r);
		if (n.selector && n.collection) throw Error(L.errorFilterInvalidArguments());
		return Object.freeze(t), t;
	}
	parseSortArgs(e) {
		let t = h();
		t.animate = this.config.animation.enable, t.command = g();
		let n = "";
		for (let r of e) if (r !== null) switch (typeof r) {
			case "string":
				n = r;
				break;
			case "object":
				typeof r.length == "number" && (t.command.collection = Array.from(r));
				break;
			case "boolean":
				t.animate = r;
				break;
			case "function": t.callback = r;
		}
		return n && (t.command = this.parseSortString(n, t.command)), Object.freeze(t), t;
	}
	parseInsertArgs(e) {
		let t = h();
		t.animate = this.config.animation.enable, t.command = te();
		let n = t.command;
		for (let r of e) r !== null && (typeof r == "number" ? n.index = r : typeof r == "string" && ["before", "after"].indexOf(r) > -1 ? n.position = r : typeof r == "string" ? n.collection = Array.from(oe(r, this.dom.document).childNodes) : typeof r == "object" && D(r, this.dom.document) ? n.collection.length ? n.sibling = r : n.collection = [r] : typeof r == "object" && r.length ? n.collection.length ? n.sibling = r[0] : n.collection = Array.from(r) : typeof r == "object" && r.childNodes && r.childNodes.length ? n.collection.length ? n.sibling = r.childNodes[0] : n.collection = Array.from(r.childNodes) : typeof r == "object" ? S(n, r) : typeof r == "boolean" ? t.animate = r : typeof r == "function" && (t.callback = r));
		if (n.index && n.sibling) throw Error(L.errorInsertInvalidArguments());
		return !n.collection.length && this.config.debug.showWarnings && console.warn(L.warningInsertNoElements()), Object.freeze(t), t;
	}
	parseRemoveArgs(e) {
		let t = h();
		t.animate = this.config.animation.enable, t.command = ne();
		let n = t.command;
		for (let r of e) if (r !== null) switch (typeof r) {
			case "number":
				this.targets[r] && (n.targets[0] = this.targets[r]);
				break;
			case "string":
				n.collection = Array.from(this.dom.parent.querySelectorAll(r));
				break;
			case "object":
				r && r.length ? n.collection = Array.from(r) : D(r, this.dom.document) ? n.collection = [r] : S(n, r);
				break;
			case "boolean":
				t.animate = r;
				break;
			case "function": t.callback = r;
		}
		if (n.collection.length) {
			let e = new Set(n.collection);
			for (let t of this.targets) e.has(t.dom.el) && n.targets.push(t);
		}
		return !n.targets.length && this.config.debug.showWarnings && console.warn(L.warningRemoveNoElements()), Object.freeze(t), t;
	}
	parseDatasetArgs(e) {
		let t = h();
		t.animate = this.config.animation.enable, t.command = re();
		for (let n of e) if (n !== null) switch (typeof n) {
			case "object":
				Array.isArray(n) || typeof n.length == "number" ? t.command.dataset = n : S(t.command, n);
				break;
			case "boolean":
				t.animate = n;
				break;
			case "function": t.callback = n;
		}
		return Object.freeze(t), t;
	}
	parseChangeLayoutArgs(e) {
		let t = h();
		t.animate = this.config.animation.enable, t.command = _();
		for (let n of e) if (n !== null) switch (typeof n) {
			case "string":
				t.command.containerClassName = n;
				break;
			case "object":
				S(t.command, n);
				break;
			case "boolean":
				t.animate = n;
				break;
			case "function": t.callback = n;
		}
		return Object.freeze(t), t;
	}
	queueMix(e) {
		let t = this.createDeferred();
		if (this.config.animation.queue && this.queue.length < this.config.animation.queueLimit) {
			if (e.deferred = t, this.queue.push(e), this.config.controls.enable) {
				if (e.isToggling) {
					this.buildToggleArray(e.instruction.command);
					let t = this.getToggleSelector();
					this.updateControls({ filter: { selector: t } });
				} else this.updateControls(e.instruction.command);
			}
		} else this.config.debug.showWarnings && console.warn(L.warningMultimixInstanceQueueFull()), t.resolve(this.state), V("mixBusy", this.dom.container, {
			state: this.state,
			instance: this
		}, this.dom.document), typeof this.config.callbacks.onMixBusy == "function" && this.config.callbacks.onMixBusy.call(this.dom.container, this.state, this);
		return t.promise;
	}
	getDataOperation(e) {
		let t = p(), n = [];
		if (this.dom.targets.length && !(n = this.state.activeDataset || []).length) throw Error(L.errorDatasetNotSet());
		return t.id = M(), t.startState = this.state, t.startDataset = n, t.newDataset = e.slice(), this.diffDatasets(t), t.startOrder = this.targets, t.newOrder = t.show, this.config.animation.enable && this.dom.document.defaultView && (this.getStartMixData(t), this.setInter(t), t.docState = N(this.dom.document), this.getInterMixData(t), this.setFinal(t), this.getFinalMixData(t), this.parseEffects(), t.hasEffect = this.hasEffect(), this.getTweenData(t)), this.targets = t.show.slice(), t.newState = this.buildState(t), Array.prototype.push.apply(this.targets, t.toRemove), t;
	}
	diffDatasets(e) {
		let t = [], n = [], r = [], i = /* @__PURE__ */ new Set(), a = null, o = null;
		for (let t of e.newDataset) {
			let s = t[this.config.data.uidKey];
			if (s == null || String(s).length < 1) throw TypeError(L.errorDatasetInvalidUidKey({ uidKey: this.config.data.uidKey }));
			let c = String(s);
			if (i.has(c)) throw Error(L.errorDatasetDuplicateUid({ uid: c }));
			i.add(c);
			let l = this.cache[c];
			if (l instanceof R) {
				if (this.config.data.dirtyCheck && !A(t, l.data)) {
					let e = l.render(t);
					l.data = t, e !== l.dom.el && (l.isInDom && (l.unbindEvents(), this.dom.parent.replaceChild(e, l.dom.el)), l.isShown || (e.style.display = "none"), l.dom.el = e, l.isInDom && l.bindEvents());
				}
			} else l = new R(), l.init(null, this, t), l.hide();
			l.isInDom ? (o = l.dom.el.nextElementSibling, n.push(c), a &&= (a.lastElementChild && a.appendChild(this.dom.document.createTextNode(" ")), this.insertDatasetFrag(a, l.dom.el, r), null)) : (a ||= this.dom.document.createDocumentFragment(), a.lastElementChild && a.appendChild(this.dom.document.createTextNode(" ")), a.appendChild(l.dom.el), l.isInDom = !0, l.unbindEvents(), l.bindEvents(), l.hide(), e.toShow.push(l), r.push(l)), e.show.push(l);
		}
		a && (o ||= this.config.layout.siblingAfter, o && a.appendChild(this.dom.document.createTextNode(" ")), this.insertDatasetFrag(a, o, r));
		let s = new Set(e.show);
		for (let n of e.startDataset) {
			let r = String(n[this.config.data.uidKey]), i = this.cache[r];
			s.has(i) ? t.push(r) : (e.hide.push(i), e.toHide.push(i), e.toRemove.push(i));
		}
		k(t, n) || (e.willSort = !0);
	}
	insertDatasetFrag(e, t, n) {
		let r = t ? Array.from(this.dom.parent.children).indexOf(t) : this.targets.length;
		this.dom.parent.insertBefore(e, t);
		let i = Math.min(r, this.targets.length);
		for (let e = this.targets.length - 1; e >= i; e--) this.targets[e + n.length] = this.targets[e];
		for (let e = 0; e < n.length; e++) this.targets[i + e] = n[e];
		n.length = 0;
	}
	willSortCheck(e, t) {
		return this.config.behavior.liveSort || e.order === "random" || e.attribute !== t.attribute || e.order !== t.order || e.collection !== t.collection || e.next === null && t.next || e.next && t.next === null ? !0 : e.next && t.next ? this.willSortCheck(e.next, t.next) : !1;
	}
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
		let t = this.parseFilterArgs(e);
		return this.multimix({ filter: t.command }, t.animate, t.callback);
	}
	toggleOn(...e) {
		return this.toggle(e, !0, null);
	}
	toggleOff(...e) {
		return this.toggle(e, !1, null);
	}
	toggle(e, t, n) {
		let r = this.parseFilterArgs(e), i = r.command.selector, a = this.toggleArray.indexOf(i);
		return t && a < 0 && this.toggleArray.push(i), !t && a > -1 && this.toggleArray.splice(a, 1), this.runMultimix([
			{ filter: this.getToggleSelector() },
			r.animate,
			r.callback
		], n, !0);
	}
	mixControl(e, t, n) {
		return n === void 0 ? this.runMultimix([e], t, !1) : this.toggle([e.filter], n, t);
	}
	sort(...e) {
		let t = this.parseSortArgs(e);
		return this.multimix({ sort: t.command }, t.animate, t.callback);
	}
	changeLayout(...e) {
		let t = this.parseChangeLayoutArgs(e);
		return this.multimix({ changeLayout: t.command }, t.animate, t.callback);
	}
	multimix(...e) {
		return this.runMultimix(e, null, !1);
	}
	runMultimix(e, t, n) {
		if (this.destroyed) return Promise.resolve(this.state);
		let r = this.parseMultimixArgs(e);
		if (this.isBusy) {
			let i = m();
			return i.args = e, i.instruction = r, i.triggerElement = t, i.isToggling = n, this.queueMix(i);
		}
		{
			let e = this.getOperation(r.command, t);
			return e ? (this.config.controls.enable && (r.command.filter && !n && (this.toggleArray.length = 0, this.buildToggleArray(e.command)), this.queue.length < 1 && this.updateControls(e.command)), r.callback && (this.userCallback = r.callback), this.goMix(r.animate, e)) : Promise.resolve(this.state);
		}
	}
	dataset(...e) {
		if (this.destroyed) return Promise.resolve(this.state);
		let t = this.parseDatasetArgs(e);
		if (this.isBusy) {
			let n = m();
			return n.args = e, n.instruction = t, this.queueMix(n);
		}
		{
			let e = this.getDataOperation(t.command.dataset);
			return t.callback && (this.userCallback = t.callback), this.goMix(t.animate, e);
		}
	}
	getOperation(e, t = null) {
		let n = e.sort, r = e.filter, i = e.changeLayout, a = e.remove, o = e.insert, s = p();
		return s.id = M(), s.command = e, s.startState = this.state, s.triggerElement = t, this.isBusy ? (this.config.debug.showWarnings && console.warn(L.warningGetOperationInstanceBusy()), null) : (o && this.insertTargets(o, s), a && (s.toRemove = a.targets), s.startSort = s.newSort = this.state.activeSort, s.startOrder = s.newOrder = this.targets, n && (s.startSort = this.state.activeSort, s.newSort = n, s.willSort = this.willSortCheck(n, this.state.activeSort), s.willSort && this.sortOperation(s)), s.startFilter = this.state.activeFilter, s.newFilter = r || { ...s.startFilter }, s.newFilter.selector === "all" ? s.newFilter.selector = this.config.selectors.target : s.newFilter.selector === "none" && (s.newFilter.selector = ""), this.filterOperation(s), s.startContainerClassName = this.state.activeContainerClassName, i ? (s.newContainerClassName = i.containerClassName, s.newContainerClassName !== s.startContainerClassName && (s.willChangeLayout = !0)) : s.newContainerClassName = s.startContainerClassName, this.config.animation.enable && this.dom.document.defaultView && (this.getStartMixData(s), this.setInter(s), s.docState = N(this.dom.document), this.getInterMixData(s), this.setFinal(s), this.getFinalMixData(s), this.parseEffects(), s.hasEffect = this.hasEffect(), this.getTweenData(s)), s.willSort && (this.targets = s.newOrder), s.newState = this.buildState(s), s);
	}
	tween(e, t) {
		t = Math.min(t, 1), t = Math.max(t, 0);
		for (let n = 0; n < e.show.length; n++) {
			let r = e.show[n], i = e.showPosData[n];
			r.applyTween(i, t);
		}
		let n = /* @__PURE__ */ new Map();
		for (let t = e.toHide.length - 1; t >= 0; t--) n.set(e.toHide[t], t);
		for (let r = 0; r < e.hide.length; r++) {
			let i = e.hide[r];
			i.isShown && i.hide();
			let a = n.get(i);
			if (a !== void 0) {
				let n = e.toHidePosData[a];
				i.isShown || i.show(), i.applyTween(n, t);
			}
		}
	}
	insert(...e) {
		let t = this.parseInsertArgs(e);
		return this.multimix({ insert: t.command }, t.animate, t.callback);
	}
	insertBefore(...e) {
		let t = this.parseInsertArgs(e), n = t.command;
		return this.insert(n.collection, "before", n.sibling, t.animate, t.callback);
	}
	insertAfter(...e) {
		let t = this.parseInsertArgs(e), n = t.command;
		return this.insert(n.collection, "after", n.sibling, t.animate, t.callback);
	}
	prepend(...e) {
		let t = this.parseInsertArgs(e), n = t.command;
		return this.insert(0, n.collection, t.animate, t.callback);
	}
	append(...e) {
		let t = this.parseInsertArgs(e), n = t.command;
		return this.insert(this.state.totalTargets, n.collection, t.animate, t.callback);
	}
	remove(...e) {
		let t = this.parseRemoveArgs(e);
		return this.multimix({ remove: t.command }, t.animate, t.callback);
	}
	getConfig(e) {
		return e ? le(this.config, e) : this.config;
	}
	configure(e) {
		S(this.config, e, !0, !0);
	}
	getState() {
		let e = { ...this.state };
		return Object.freeze(e), e;
	}
	forceRefresh() {
		this.destroyed || (this.activeOperation ? this.refreshPending = !0 : this.refreshTargets());
	}
	refreshTargets() {
		this.refreshPending = !1;
		let e = this.state, t = this.findTargets(), n = e.activeDataset && this.matchRefreshDataset(t, e.activeDataset), r = this.origOrder;
		this.indexTargets(t, n);
		let i = p();
		i.newOrder = this.targets, i.newContainerClassName = e.activeContainerClassName, i.newDataset = n, i.newSort = e.activeSort, i.newFilter = e.activeFilter;
		let a = i.newSort;
		if (a && (a.attribute || a.collection || a.order !== "asc")) {
			let e = new Map(this.targets.map((e) => [e.dom.el, e]));
			this.origOrder = [];
			for (let t of r) {
				let n = e.get(t.dom.el);
				n && (this.origOrder.push(n), e.delete(t.dom.el));
			}
			for (let t of e.values()) this.origOrder.push(t);
			if (a.collection) {
				let e = new Set(t), n = a.collection.filter((t) => e.delete(t));
				for (let t of e) n.push(t);
				i.newSort = {
					...a,
					collection: n
				};
			}
			a.order !== "random" && (i.willSort = !0, this.sortOperation(i), i.willSort && this.printSort(!1, i), this.targets = i.newOrder);
		}
		if (i.newFilter) {
			this.filterOperation(i);
			for (let e of i.toShow) e.show();
			for (let e of i.toHide) e.hide();
		} else {
			i.show = this.targets.slice();
			for (let e of this.targets) e.show();
		}
		this.state = this.buildState(i), this.dom.targets = this.state.targets, this.lastOperation = i, this.dom.container.classList.toggle(F(this.config.classNames, "container", this.config.classNames.modifierFailed), i.hasFailed);
	}
	matchRefreshDataset(e, t) {
		let n = new Map(t.map((e) => [this.cache[String(e[this.config.data.uidKey])].dom.el, e])), r = new Set(n.keys());
		for (let t of e) r.delete(t);
		let i = r.values();
		return e.map((r) => {
			let a = n.get(r);
			if (a) return a;
			let o = i.next();
			if (e.length !== t.length || o.done) throw Error(L.errorDatasetPrerenderedMismatch());
			return n.get(o.value);
		});
	}
	forceRender() {
		for (let e in this.cache) {
			let t = this.cache[e], n = t.render(t.data);
			n !== t.dom.el && (t.isInDom && (t.unbindEvents(), this.dom.parent.replaceChild(n, t.dom.el)), t.isShown || (n.style.display = "none"), t.dom.el = n, t.isInDom && t.bindEvents());
		}
		this.state = this.buildState(this.lastOperation);
	}
	destroy(e = !1) {
		if (this.destroyed) return;
		this.destroyed = !0, this.activeOperation && this.cleanUp(this.activeOperation, !1);
		for (let e of this.queue) e.deferred.resolve(this.state);
		this.queue.length = 0, this.userDeferred?.resolve(this.state), this.userDeferred = null, this.userCallback = null, this.isBusy = !1;
		for (let e of this.controls) e.removeBinding(this);
		this.controls.length = 0;
		for (let t of this.targets) e && t.show(), t.unbindEvents();
		let t = this.dom.container;
		this.state?.activeContainerClassName && t.classList.remove(this.state.activeContainerClassName), this.config.layout.containerClassName && t.classList.remove(this.config.layout.containerClassName), t.classList.remove(F(this.config.classNames, "container", this.config.classNames.modifierFailed)), this.cache = Object.create(null), this.dom.container.id.match(/^MixItUp/) && this.dom.container.removeAttribute("id"), me(t);
	}
}, $ = class {
	constructor(e) {
		for (let t = 0; t < e.length; t++) this[t] = e[t];
		this.length = e.length, Object.freeze(this);
	}
	mixitup(e, ...t) {
		let n = [];
		for (let r = 0; r < this.length; r++) {
			let i = this[r];
			n.push(i[e](...t));
		}
		return Promise.all(n);
	}
};
// src/index.ts
function _e(e) {
	let t = {
		configure: e.configure.bind(e),
		show: e.show.bind(e),
		hide: e.hide.bind(e),
		filter: e.filter.bind(e),
		toggleOn: e.toggleOn.bind(e),
		toggleOff: e.toggleOff.bind(e),
		sort: e.sort.bind(e),
		changeLayout: e.changeLayout.bind(e),
		multimix: e.multimix.bind(e),
		dataset: e.dataset.bind(e),
		tween: e.tween.bind(e),
		insert: e.insert.bind(e),
		insertBefore: e.insertBefore.bind(e),
		insertAfter: e.insertAfter.bind(e),
		prepend: e.prepend.bind(e),
		append: e.append.bind(e),
		remove: e.remove.bind(e),
		destroy: e.destroy.bind(e),
		forceRefresh: e.forceRefresh.bind(e),
		forceRender: e.forceRender.bind(e),
		isMixing: e.isMixing.bind(e),
		getOperation: e.getOperation.bind(e),
		getConfig: e.getConfig.bind(e),
		getState: e.getState.bind(e)
	};
	return Object.freeze(t);
}
function ve(e, t, n, r) {
	let i = n || window.document, a;
	if (typeof e == "string") a = i.querySelectorAll(e);
	else if (e && typeof e == "object" && D(e, i)) a = [e];
	else if (e && typeof e == "object" && "length" in e) a = e;
	else throw Error(L.errorFactoryInvalidContainer());
	if (a.length < 1) throw Error(L.errorFactoryContainerNotFound());
	let o = [];
	for (let e = 0; e < a.length; e++) {
		let i = a[e];
		if (e > 0 && !r) break;
		let s;
		i.id ? s = i.id : (s = "MixItUp" + M(), i.id = s);
		let c = W.get(i);
		c ? (!t || t && t.debug && t.debug.showWarnings !== !1) && console.warn(L.warningFactoryPreexistingInstance()) : (c = new Q(), c.attach(i, n || i.ownerDocument, s, t), pe(i, c)), t && t.debug && t.debug.enable ? o.push(c) : o.push(_e(c));
	}
	return r ? new $(o) : o[0];
}
export { $ as Collection, Q as Mixer, ve as default, L as messages, C as template };

//# sourceMappingURL=mixitup.js.map