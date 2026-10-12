var pn = Array.isArray, No = Array.prototype.indexOf, Xt = Array.prototype.includes, Fr = Array.from, Do = Object.defineProperty, yr = Object.getOwnPropertyDescriptor, Lo = Object.getOwnPropertyDescriptors, Io = Object.prototype, Ro = Array.prototype, fa = Object.getPrototypeOf, Zn = Object.isExtensible;
const Fo = () => {
};
function Bo(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function va() {
  var e, t, r = new Promise((n, a) => {
    e = n, t = a;
  });
  return { promise: r, resolve: e, reject: t };
}
const te = 2, It = 4, Br = 8, _a = 1 << 24, Mt = 16, Ye = 32, Rt = 64, on = 128, je = 512, X = 1024, de = 2048, Je = 4096, ze = 8192, Fe = 16384, ar = 32768, sn = 1 << 25, $t = 65536, Gn = 1 << 17, pa = 1 << 18, Ht = 1 << 19, Ho = 1 << 20, We = 1 << 25, Ft = 65536, ln = 1 << 21, hn = 1 << 22, bt = 1 << 23, Yt = /* @__PURE__ */ Symbol("$state"), Uo = /* @__PURE__ */ Symbol(""), ct = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), Ko = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
);
function Vo() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Wo(e, t, r) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function Zo() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Go() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Yo() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Jo() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Qo() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const Xo = 1, $o = 2, ha = 4, ei = 8, ti = 16, ri = 1, ni = 2, ne = /* @__PURE__ */ Symbol(), ma = "http://www.w3.org/1999/xhtml", ai = "http://www.w3.org/2000/svg", oi = "http://www.w3.org/1998/Math/MathML";
function ii() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function si() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function ga(e) {
  return e === this.v;
}
function li(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function ya(e) {
  return !li(e, this.v);
}
let Oe = null;
function er(e) {
  Oe = e;
}
function Hr(e, t = !1, r) {
  Oe = {
    p: Oe,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    r: (
      /** @type {Effect} */
      j
    ),
    l: null
  };
}
function Ur(e) {
  var t = (
    /** @type {ComponentContext} */
    Oe
  ), r = t.e;
  if (r !== null) {
    t.e = null;
    for (var n of r)
      qi(n);
  }
  return t.i = !0, Oe = t.p, /** @type {T} */
  {};
}
function ba() {
  return !0;
}
let Ot = [];
function wa() {
  var e = Ot;
  Ot = [], Bo(e);
}
function wt(e) {
  if (Ot.length === 0 && !br) {
    var t = Ot;
    queueMicrotask(() => {
      t === Ot && wa();
    });
  }
  Ot.push(e);
}
function ui() {
  for (; Ot.length > 0; )
    wa();
}
function xa(e) {
  var t = j;
  if (t === null)
    return A.f |= bt, e;
  if ((t.f & ar) === 0 && (t.f & It) === 0)
    throw e;
  gt(e, t);
}
function gt(e, t) {
  for (; t !== null; ) {
    if ((t.f & on) !== 0) {
      if ((t.f & ar) === 0)
        throw e;
      try {
        t.b.error(e);
        return;
      } catch (r) {
        e = r;
      }
    }
    t = t.parent;
  }
  throw e;
}
const ci = -7169;
function Y(e, t) {
  e.f = e.f & ci | t;
}
function mn(e) {
  (e.f & je) !== 0 || e.deps === null ? Y(e, X) : Y(e, Je);
}
function ka(e) {
  if (e !== null)
    for (const t of e)
      (t.f & te) === 0 || (t.f & Ft) === 0 || (t.f ^= Ft, ka(
        /** @type {Derived} */
        t.deps
      ));
}
function za(e, t, r) {
  (e.f & de) !== 0 ? t.add(e) : (e.f & Je) !== 0 && r.add(e), ka(e.deps), Y(e, X);
}
const _t = /* @__PURE__ */ new Set();
let T = null, Ie = null, un = null, br = !1, en = !1, Gt = null, Nr = null;
var Yn = 0;
let di = 1;
class Et {
  id = di++;
  /**
   * The current values of any signals that are updated in this batch.
   * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
   * They keys of this map are identical to `this.#previous`
   * @type {Map<Value, [any, boolean]>}
   */
  current = /* @__PURE__ */ new Map();
  /**
   * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
   * They keys of this map are identical to `this.#current`
   * @type {Map<Value, any>}
   */
  previous = /* @__PURE__ */ new Map();
  /**
   * When the batch is committed (and the DOM is updated), we need to remove old branches
   * and append new ones by calling the functions added inside (if/each/key/etc) blocks
   * @type {Set<(batch: Batch) => void>}
   */
  #e = /* @__PURE__ */ new Set();
  /**
   * If a fork is discarded, we need to destroy any effects that are no longer needed
   * @type {Set<(batch: Batch) => void>}
   */
  #l = /* @__PURE__ */ new Set();
  /**
   * Async effects that are currently in flight
   * @type {Map<Effect, number>}
   */
  #t = /* @__PURE__ */ new Map();
  /**
   * Async effects that are currently in flight, _not_ inside a pending boundary
   * @type {Map<Effect, number>}
   */
  #n = /* @__PURE__ */ new Map();
  /**
   * A deferred that resolves when the batch is committed, used with `settled()`
   * TODO replace with Promise.withResolvers once supported widely enough
   * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
   */
  #a = null;
  /**
   * The root effects that need to be flushed
   * @type {Effect[]}
   */
  #r = [];
  /**
   * Deferred effects (which run after async work has completed) that are DIRTY
   * @type {Set<Effect>}
   */
  #o = /* @__PURE__ */ new Set();
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Set<Effect>}
   */
  #i = /* @__PURE__ */ new Set();
  /**
   * A map of branches that still exist, but will be destroyed when this batch
   * is committed — we skip over these during `process`.
   * The value contains child effects that were dirty/maybe_dirty before being reset,
   * so they can be rescheduled if the branch survives.
   * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
   */
  #s = /* @__PURE__ */ new Map();
  is_fork = !1;
  #d = !1;
  /** @type {Set<Batch>} */
  #u = /* @__PURE__ */ new Set();
  #f() {
    return this.is_fork || this.#n.size > 0;
  }
  #_() {
    for (const n of this.#u)
      for (const a of n.#n.keys()) {
        for (var t = !1, r = a; r.parent !== null; ) {
          if (this.#s.has(r)) {
            t = !0;
            break;
          }
          r = r.parent;
        }
        if (!t)
          return !0;
      }
    return !1;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(t) {
    this.#s.has(t) || this.#s.set(t, { d: [], m: [] });
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   */
  unskip_effect(t) {
    var r = this.#s.get(t);
    if (r) {
      this.#s.delete(t);
      for (var n of r.d)
        Y(n, de), this.schedule(n);
      for (n of r.m)
        Y(n, Je), this.schedule(n);
    }
  }
  #v() {
    if (Yn++ > 1e3 && (_t.delete(this), vi()), !this.#f()) {
      for (const i of this.#o)
        this.#i.delete(i), Y(i, de), this.schedule(i);
      for (const i of this.#i)
        Y(i, Je), this.schedule(i);
    }
    const t = this.#r;
    this.#r = [], this.apply();
    var r = Gt = [], n = [], a = Nr = [];
    for (const i of t)
      try {
        this.#c(i, r, n);
      } catch (s) {
        throw Ta(i), s;
      }
    if (T = null, a.length > 0) {
      var o = Et.ensure();
      for (const i of a)
        o.schedule(i);
    }
    if (Gt = null, Nr = null, this.#f() || this.#_()) {
      this.#p(n), this.#p(r);
      for (const [i, s] of this.#s)
        Sa(i, s);
    } else {
      this.#t.size === 0 && _t.delete(this), this.#o.clear(), this.#i.clear();
      for (const i of this.#e) i(this);
      this.#e.clear(), Jn(n), Jn(r), this.#a?.resolve();
    }
    var l = (
      /** @type {Batch | null} */
      /** @type {unknown} */
      T
    );
    if (this.#r.length > 0) {
      const i = l ??= this;
      i.#r.push(...this.#r.filter((s) => !i.#r.includes(s)));
    }
    l !== null && (_t.add(l), l.#v()), _t.has(this) || this.#g();
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {Effect[]} effects
   * @param {Effect[]} render_effects
   */
  #c(t, r, n) {
    t.f ^= X;
    for (var a = t.first; a !== null; ) {
      var o = a.f, l = (o & (Ye | Rt)) !== 0, i = l && (o & X) !== 0, s = i || (o & ze) !== 0 || this.#s.has(a);
      if (!s && a.fn !== null) {
        l ? a.f ^= X : (o & It) !== 0 ? r.push(a) : Mr(a) && ((o & Mt) !== 0 && this.#i.add(a), nr(a));
        var u = a.first;
        if (u !== null) {
          a = u;
          continue;
        }
      }
      for (; a !== null; ) {
        var _ = a.next;
        if (_ !== null) {
          a = _;
          break;
        }
        a = a.parent;
      }
    }
  }
  /**
   * @param {Effect[]} effects
   */
  #p(t) {
    for (var r = 0; r < t.length; r += 1)
      za(t[r], this.#o, this.#i);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} old_value
   * @param {boolean} [is_derived]
   */
  capture(t, r, n = !1) {
    r !== ne && !this.previous.has(t) && this.previous.set(t, r), (t.f & bt) === 0 && (this.current.set(t, [t.v, n]), Ie?.set(t, t.v));
  }
  activate() {
    T = this;
  }
  deactivate() {
    T = null, Ie = null;
  }
  flush() {
    try {
      en = !0, T = this, this.#v();
    } finally {
      Yn = 0, un = null, Gt = null, Nr = null, en = !1, T = null, Ie = null, xt.clear();
    }
  }
  discard() {
    for (const t of this.#l) t(this);
    this.#l.clear(), _t.delete(this);
  }
  #g() {
    for (const u of _t) {
      var t = u.id < this.id, r = [];
      for (const [_, [y, h]] of this.current) {
        if (u.current.has(_)) {
          var n = (
            /** @type {[any, boolean]} */
            u.current.get(_)[0]
          );
          if (t && y !== n)
            u.current.set(_, [y, h]);
          else
            continue;
        }
        r.push(_);
      }
      var a = [...u.current.keys()].filter((_) => !this.current.has(_));
      if (a.length === 0)
        t && u.discard();
      else if (r.length > 0) {
        u.activate();
        var o = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
        for (var i of r)
          Ea(i, a, o, l);
        if (u.#r.length > 0) {
          u.apply();
          for (var s of u.#r)
            u.#c(s, [], []);
          u.#r = [];
        }
        u.deactivate();
      }
    }
    for (const u of _t)
      u.#u.has(this) && (u.#u.delete(this), u.#u.size === 0 && !u.#f() && (u.activate(), u.#v()));
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(t, r) {
    let n = this.#t.get(r) ?? 0;
    if (this.#t.set(r, n + 1), t) {
      let a = this.#n.get(r) ?? 0;
      this.#n.set(r, a + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   * @param {boolean} skip - whether to skip updates (because this is triggered by a stale reaction)
   */
  decrement(t, r, n) {
    let a = this.#t.get(r) ?? 0;
    if (a === 1 ? this.#t.delete(r) : this.#t.set(r, a - 1), t) {
      let o = this.#n.get(r) ?? 0;
      o === 1 ? this.#n.delete(r) : this.#n.set(r, o - 1);
    }
    this.#d || n || (this.#d = !0, wt(() => {
      this.#d = !1, this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(t, r) {
    for (const n of t)
      this.#o.add(n);
    for (const n of r)
      this.#i.add(n);
    t.clear(), r.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(t) {
    this.#e.add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    this.#l.add(t);
  }
  settled() {
    return (this.#a ??= va()).promise;
  }
  static ensure() {
    if (T === null) {
      const t = T = new Et();
      en || (_t.add(T), br || wt(() => {
        T === t && t.flush();
      }));
    }
    return T;
  }
  apply() {
    {
      Ie = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(t) {
    if (un = t, t.b?.is_pending && (t.f & (It | Br | _a)) !== 0 && (t.f & ar) === 0) {
      t.b.defer_effect(t);
      return;
    }
    for (var r = t; r.parent !== null; ) {
      r = r.parent;
      var n = r.f;
      if (Gt !== null && r === j && (A === null || (A.f & te) === 0))
        return;
      if ((n & (Rt | Ye)) !== 0) {
        if ((n & X) === 0)
          return;
        r.f ^= X;
      }
    }
    this.#r.push(r);
  }
}
function fi(e) {
  var t = br;
  br = !0;
  try {
    for (var r; ; ) {
      if (ui(), T === null)
        return (
          /** @type {T} */
          r
        );
      T.flush();
    }
  } finally {
    br = t;
  }
}
function vi() {
  try {
    Zo();
  } catch (e) {
    gt(e, un);
  }
}
let ut = null;
function Jn(e) {
  var t = e.length;
  if (t !== 0) {
    for (var r = 0; r < t; ) {
      var n = e[r++];
      if ((n.f & (Fe | ze)) === 0 && Mr(n) && (ut = /* @__PURE__ */ new Set(), nr(n), n.deps === null && n.first === null && n.nodes === null && n.teardown === null && n.ac === null && Ka(n), ut?.size > 0)) {
        xt.clear();
        for (const a of ut) {
          if ((a.f & (Fe | ze)) !== 0) continue;
          const o = [a];
          let l = a.parent;
          for (; l !== null; )
            ut.has(l) && (ut.delete(l), o.push(l)), l = l.parent;
          for (let i = o.length - 1; i >= 0; i--) {
            const s = o[i];
            (s.f & (Fe | ze)) === 0 && nr(s);
          }
        }
        ut.clear();
      }
    }
    ut = null;
  }
}
function Ea(e, t, r, n) {
  if (!r.has(e) && (r.add(e), e.reactions !== null))
    for (const a of e.reactions) {
      const o = a.f;
      (o & te) !== 0 ? Ea(
        /** @type {Derived} */
        a,
        t,
        r,
        n
      ) : (o & (hn | Mt)) !== 0 && (o & de) === 0 && Ma(a, t, n) && (Y(a, de), gn(
        /** @type {Effect} */
        a
      ));
    }
}
function Ma(e, t, r) {
  const n = r.get(e);
  if (n !== void 0) return n;
  if (e.deps !== null)
    for (const a of e.deps) {
      if (Xt.call(t, a))
        return !0;
      if ((a.f & te) !== 0 && Ma(
        /** @type {Derived} */
        a,
        t,
        r
      ))
        return r.set(
          /** @type {Derived} */
          a,
          !0
        ), !0;
    }
  return r.set(e, !1), !1;
}
function gn(e) {
  T.schedule(e);
}
function Sa(e, t) {
  if (!((e.f & Ye) !== 0 && (e.f & X) !== 0)) {
    (e.f & de) !== 0 ? t.d.push(e) : (e.f & Je) !== 0 && t.m.push(e), Y(e, X);
    for (var r = e.first; r !== null; )
      Sa(r, t), r = r.next;
  }
}
function Ta(e) {
  Y(e, X);
  for (var t = e.first; t !== null; )
    Ta(t), t = t.next;
}
function _i(e) {
  let t = 0, r = Bt(0), n;
  return () => {
    xn() && (d(r), zn(() => (t === 0 && (n = Tn(() => e(() => wr(r)))), t += 1, () => {
      wt(() => {
        t -= 1, t === 0 && (n?.(), n = void 0, wr(r));
      });
    })));
  };
}
var pi = $t | Ht;
function hi(e, t, r, n) {
  new mi(e, t, r, n);
}
class mi {
  /** @type {Boundary | null} */
  parent;
  is_pending = !1;
  /**
   * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
   * Inherited from parent boundary, or defaults to identity.
   * @type {(error: unknown) => unknown}
   */
  transform_error;
  /** @type {TemplateNode} */
  #e;
  /** @type {TemplateNode | null} */
  #l = null;
  /** @type {BoundaryProps} */
  #t;
  /** @type {((anchor: Node) => void)} */
  #n;
  /** @type {Effect} */
  #a;
  /** @type {Effect | null} */
  #r = null;
  /** @type {Effect | null} */
  #o = null;
  /** @type {Effect | null} */
  #i = null;
  /** @type {DocumentFragment | null} */
  #s = null;
  #d = 0;
  #u = 0;
  #f = !1;
  /** @type {Set<Effect>} */
  #_ = /* @__PURE__ */ new Set();
  /** @type {Set<Effect>} */
  #v = /* @__PURE__ */ new Set();
  /**
   * A source containing the number of pending async deriveds/expressions.
   * Only created if `$effect.pending()` is used inside the boundary,
   * otherwise updating the source results in needless `Batch.ensure()`
   * calls followed by no-op flushes
   * @type {Source<number> | null}
   */
  #c = null;
  #p = _i(() => (this.#c = Bt(this.#d), () => {
    this.#c = null;
  }));
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(t, r, n, a) {
    this.#e = t, this.#t = r, this.#n = (o) => {
      var l = (
        /** @type {Effect} */
        j
      );
      l.b = this, l.f |= on, n(o);
    }, this.parent = /** @type {Effect} */
    j.b, this.transform_error = a ?? this.parent?.transform_error ?? ((o) => o), this.#a = Vr(() => {
      this.#y();
    }, pi);
  }
  #g() {
    try {
      this.#r = Ae(() => this.#n(this.#e));
    } catch (t) {
      this.error(t);
    }
  }
  /**
   * @param {unknown} error The deserialized error from the server's hydration comment
   */
  #w(t) {
    const r = this.#t.failed;
    r && (this.#i = Ae(() => {
      r(
        this.#e,
        () => t,
        () => () => {
        }
      );
    }));
  }
  #x() {
    const t = this.#t.pending;
    t && (this.is_pending = !0, this.#o = Ae(() => t(this.#e)), wt(() => {
      var r = this.#s = document.createDocumentFragment(), n = kt();
      r.append(n), this.#r = this.#m(() => Ae(() => this.#n(n))), this.#u === 0 && (this.#e.before(r), this.#s = null, Dt(
        /** @type {Effect} */
        this.#o,
        () => {
          this.#o = null;
        }
      ), this.#h(
        /** @type {Batch} */
        T
      ));
    }));
  }
  #y() {
    try {
      if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#d = 0, this.#r = Ae(() => {
        this.#n(this.#e);
      }), this.#u > 0) {
        var t = this.#s = document.createDocumentFragment();
        Sn(this.#r, t);
        const r = (
          /** @type {(anchor: Node) => void} */
          this.#t.pending
        );
        this.#o = Ae(() => r(this.#e));
      } else
        this.#h(
          /** @type {Batch} */
          T
        );
    } catch (r) {
      this.error(r);
    }
  }
  /**
   * @param {Batch} batch
   */
  #h(t) {
    this.is_pending = !1, t.transfer_effects(this.#_, this.#v);
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    za(t, this.#_, this.#v);
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!this.#t.pending;
  }
  /**
   * @template T
   * @param {() => T} fn
   */
  #m(t) {
    var r = j, n = A, a = Oe;
    Qe(this.#a), Ce(this.#a), er(this.#a.ctx);
    try {
      return Et.ensure(), t();
    } catch (o) {
      return xa(o), null;
    } finally {
      Qe(r), Ce(n), er(a);
    }
  }
  /**
   * Updates the pending count associated with the currently visible pending snippet,
   * if any, such that we can replace the snippet with content once work is done
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  #b(t, r) {
    if (!this.has_pending_snippet()) {
      this.parent && this.parent.#b(t, r);
      return;
    }
    this.#u += t, this.#u === 0 && (this.#h(r), this.#o && Dt(this.#o, () => {
      this.#o = null;
    }), this.#s && (this.#e.before(this.#s), this.#s = null));
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(t, r) {
    this.#b(t, r), this.#d += t, !(!this.#c || this.#f) && (this.#f = !0, wt(() => {
      this.#f = !1, this.#c && tr(this.#c, this.#d);
    }));
  }
  get_effect_pending() {
    return this.#p(), d(
      /** @type {Source<number>} */
      this.#c
    );
  }
  /** @param {unknown} error */
  error(t) {
    var r = this.#t.onerror;
    let n = this.#t.failed;
    if (!r && !n)
      throw t;
    this.#r && (pe(this.#r), this.#r = null), this.#o && (pe(this.#o), this.#o = null), this.#i && (pe(this.#i), this.#i = null);
    var a = !1, o = !1;
    const l = () => {
      if (a) {
        si();
        return;
      }
      a = !0, o && Qo(), this.#i !== null && Dt(this.#i, () => {
        this.#i = null;
      }), this.#m(() => {
        this.#y();
      });
    }, i = (s) => {
      try {
        o = !0, r?.(s, l), o = !1;
      } catch (u) {
        gt(u, this.#a && this.#a.parent);
      }
      n && (this.#i = this.#m(() => {
        try {
          return Ae(() => {
            var u = (
              /** @type {Effect} */
              j
            );
            u.b = this, u.f |= on, n(
              this.#e,
              () => s,
              () => l
            );
          });
        } catch (u) {
          return gt(
            u,
            /** @type {Effect} */
            this.#a.parent
          ), null;
        }
      }));
    };
    wt(() => {
      var s;
      try {
        s = this.transform_error(t);
      } catch (u) {
        gt(u, this.#a && this.#a.parent);
        return;
      }
      s !== null && typeof s == "object" && typeof /** @type {any} */
      s.then == "function" ? s.then(
        i,
        /** @param {unknown} e */
        (u) => gt(u, this.#a && this.#a.parent)
      ) : i(s);
    });
  }
}
function Aa(e, t, r, n) {
  const a = bn;
  var o = e.filter((h) => !h.settled);
  if (r.length === 0 && o.length === 0) {
    n(t.map(a));
    return;
  }
  var l = (
    /** @type {Effect} */
    j
  ), i = gi(), s = o.length === 1 ? o[0].promise : o.length > 1 ? Promise.all(o.map((h) => h.promise)) : null;
  function u(h) {
    i();
    try {
      n(h);
    } catch (b) {
      (l.f & Fe) === 0 && gt(b, l);
    }
    Lr();
  }
  if (r.length === 0) {
    s.then(() => u(t.map(a)));
    return;
  }
  var _ = yn();
  function y() {
    Promise.all(r.map((h) => /* @__PURE__ */ yi(h))).then((h) => u([...t.map(a), ...h])).catch((h) => gt(h, l)).finally(() => _());
  }
  s ? s.then(() => {
    i(), y(), Lr();
  }) : y();
}
function gi() {
  var e = (
    /** @type {Effect} */
    j
  ), t = A, r = Oe, n = (
    /** @type {Batch} */
    T
  );
  return function(o = !0) {
    Qe(e), Ce(t), er(r), o && (e.f & Fe) === 0 && (n?.activate(), n?.apply());
  };
}
function Lr(e = !0) {
  Qe(null), Ce(null), er(null), e && T?.deactivate();
}
function yn() {
  var e = (
    /** @type {Effect} */
    j
  ), t = (
    /** @type {Boundary} */
    e.b
  ), r = (
    /** @type {Batch} */
    T
  ), n = t.is_rendered();
  return t.update_pending_count(1, r), r.increment(n, e), (a = !1) => {
    t.update_pending_count(-1, r), r.decrement(n, e, a);
  };
}
// @__NO_SIDE_EFFECTS__
function bn(e) {
  var t = te | de, r = A !== null && (A.f & te) !== 0 ? (
    /** @type {Derived} */
    A
  ) : null;
  return j !== null && (j.f |= Ht), {
    ctx: Oe,
    deps: null,
    effects: null,
    equals: ga,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      ne
    ),
    wv: 0,
    parent: r ?? j,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function yi(e, t, r) {
  let n = (
    /** @type {Effect | null} */
    j
  );
  n === null && Vo();
  var a = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), o = Bt(
    /** @type {V} */
    ne
  ), l = !A, i = /* @__PURE__ */ new Map();
  return Ci(() => {
    var s = (
      /** @type {Effect} */
      j
    ), u = va();
    a = u.promise;
    try {
      Promise.resolve(e()).then(u.resolve, u.reject).finally(Lr);
    } catch (b) {
      u.reject(b), Lr();
    }
    var _ = (
      /** @type {Batch} */
      T
    );
    if (l) {
      if ((s.f & ar) !== 0)
        var y = yn();
      if (
        /** @type {Boundary} */
        n.b.is_rendered()
      )
        i.get(_)?.reject(ct), i.delete(_);
      else {
        for (const b of i.values())
          b.reject(ct);
        i.clear();
      }
      i.set(_, u);
    }
    const h = (b, g = void 0) => {
      if (y) {
        var k = g === ct;
        y(k);
      }
      if (!(g === ct || (s.f & Fe) !== 0)) {
        if (_.activate(), g)
          o.f |= bt, tr(o, g);
        else {
          (o.f & bt) !== 0 && (o.f ^= bt), tr(o, b);
          for (const [m, x] of i) {
            if (i.delete(m), m === _) break;
            x.reject(ct);
          }
        }
        _.deactivate();
      }
    };
    u.promise.then(h, (b) => h(null, b || "unknown"));
  }), kn(() => {
    for (const s of i.values())
      s.reject(ct);
  }), new Promise((s) => {
    function u(_) {
      function y() {
        _ === a ? s(o) : u(a);
      }
      _.then(y, y);
    }
    u(a);
  });
}
// @__NO_SIDE_EFFECTS__
function Te(e) {
  const t = /* @__PURE__ */ bn(e);
  return Za(t), t;
}
// @__NO_SIDE_EFFECTS__
function bi(e) {
  const t = /* @__PURE__ */ bn(e);
  return t.equals = ya, t;
}
function wi(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var r = 0; r < t.length; r += 1)
      pe(
        /** @type {Effect} */
        t[r]
      );
  }
}
function xi(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & te) === 0)
      return (t.f & Fe) === 0 ? (
        /** @type {Effect} */
        t
      ) : null;
    t = t.parent;
  }
  return null;
}
function wn(e) {
  var t, r = j;
  Qe(xi(e));
  try {
    e.f &= ~Ft, wi(e), t = Qa(e);
  } finally {
    Qe(r);
  }
  return t;
}
function ja(e) {
  var t = e.v, r = wn(e);
  if (!e.equals(r) && (e.wv = Ya(), (!T?.is_fork || e.deps === null) && (e.v = r, T?.capture(e, t, !0), e.deps === null))) {
    Y(e, X);
    return;
  }
  rr || (Ie !== null ? (xn() || T?.is_fork) && Ie.set(e, r) : mn(e));
}
function ki(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(ct), t.teardown = Fo, t.ac = null, kr(t, 0), En(t));
}
function qa(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && nr(t);
}
let cn = /* @__PURE__ */ new Set();
const xt = /* @__PURE__ */ new Map();
let Oa = !1;
function Bt(e, t) {
  var r = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: ga,
    rv: 0,
    wv: 0
  };
  return r;
}
// @__NO_SIDE_EFFECTS__
function G(e, t) {
  const r = Bt(e);
  return Za(r), r;
}
// @__NO_SIDE_EFFECTS__
function zi(e, t = !1, r = !0) {
  const n = Bt(e);
  return t || (n.equals = ya), n;
}
function M(e, t, r = !1) {
  A !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!Re || (A.f & Gn) !== 0) && ba() && (A.f & (te | Mt | hn | Gn)) !== 0 && (qe === null || !Xt.call(qe, e)) && Jo();
  let n = r ? yt(t) : t;
  return tr(e, n, Nr);
}
function tr(e, t, r = null) {
  if (!e.equals(t)) {
    var n = e.v;
    rr ? xt.set(e, t) : xt.set(e, n), e.v = t;
    var a = Et.ensure();
    if (a.capture(e, n), (e.f & te) !== 0) {
      const o = (
        /** @type {Derived} */
        e
      );
      (e.f & de) !== 0 && wn(o), Ie === null && mn(o);
    }
    e.wv = Ya(), Ca(e, de, r), j !== null && (j.f & X) !== 0 && (j.f & (Ye | Rt)) === 0 && (Se === null ? Di([e]) : Se.push(e)), !a.is_fork && cn.size > 0 && !Oa && Ei();
  }
  return t;
}
function Ei() {
  Oa = !1;
  for (const e of cn)
    (e.f & X) !== 0 && Y(e, Je), Mr(e) && nr(e);
  cn.clear();
}
function wr(e) {
  M(e, e.v + 1);
}
function Ca(e, t, r) {
  var n = e.reactions;
  if (n !== null)
    for (var a = n.length, o = 0; o < a; o++) {
      var l = n[o], i = l.f, s = (i & de) === 0;
      if (s && Y(l, t), (i & te) !== 0) {
        var u = (
          /** @type {Derived} */
          l
        );
        Ie?.delete(u), (i & Ft) === 0 && (i & je && (l.f |= Ft), Ca(u, Je, r));
      } else if (s) {
        var _ = (
          /** @type {Effect} */
          l
        );
        (i & Mt) !== 0 && ut !== null && ut.add(_), r !== null ? r.push(_) : gn(_);
      }
    }
}
function yt(e) {
  if (typeof e != "object" || e === null || Yt in e)
    return e;
  const t = fa(e);
  if (t !== Io && t !== Ro)
    return e;
  var r = /* @__PURE__ */ new Map(), n = pn(e), a = /* @__PURE__ */ G(0), o = Lt, l = (i) => {
    if (Lt === o)
      return i();
    var s = A, u = Lt;
    Ce(null), ta(o);
    var _ = i();
    return Ce(s), ta(u), _;
  };
  return n && r.set("length", /* @__PURE__ */ G(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(i, s, u) {
        (!("value" in u) || u.configurable === !1 || u.enumerable === !1 || u.writable === !1) && Go();
        var _ = r.get(s);
        return _ === void 0 ? l(() => {
          var y = /* @__PURE__ */ G(u.value);
          return r.set(s, y), y;
        }) : M(_, u.value, !0), !0;
      },
      deleteProperty(i, s) {
        var u = r.get(s);
        if (u === void 0) {
          if (s in i) {
            const _ = l(() => /* @__PURE__ */ G(ne));
            r.set(s, _), wr(a);
          }
        } else
          M(u, ne), wr(a);
        return !0;
      },
      get(i, s, u) {
        if (s === Yt)
          return e;
        var _ = r.get(s), y = s in i;
        if (_ === void 0 && (!y || yr(i, s)?.writable) && (_ = l(() => {
          var b = yt(y ? i[s] : ne), g = /* @__PURE__ */ G(b);
          return g;
        }), r.set(s, _)), _ !== void 0) {
          var h = d(_);
          return h === ne ? void 0 : h;
        }
        return Reflect.get(i, s, u);
      },
      getOwnPropertyDescriptor(i, s) {
        var u = Reflect.getOwnPropertyDescriptor(i, s);
        if (u && "value" in u) {
          var _ = r.get(s);
          _ && (u.value = d(_));
        } else if (u === void 0) {
          var y = r.get(s), h = y?.v;
          if (y !== void 0 && h !== ne)
            return {
              enumerable: !0,
              configurable: !0,
              value: h,
              writable: !0
            };
        }
        return u;
      },
      has(i, s) {
        if (s === Yt)
          return !0;
        var u = r.get(s), _ = u !== void 0 && u.v !== ne || Reflect.has(i, s);
        if (u !== void 0 || j !== null && (!_ || yr(i, s)?.writable)) {
          u === void 0 && (u = l(() => {
            var h = _ ? yt(i[s]) : ne, b = /* @__PURE__ */ G(h);
            return b;
          }), r.set(s, u));
          var y = d(u);
          if (y === ne)
            return !1;
        }
        return _;
      },
      set(i, s, u, _) {
        var y = r.get(s), h = s in i;
        if (n && s === "length")
          for (var b = u; b < /** @type {Source<number>} */
          y.v; b += 1) {
            var g = r.get(b + "");
            g !== void 0 ? M(g, ne) : b in i && (g = l(() => /* @__PURE__ */ G(ne)), r.set(b + "", g));
          }
        if (y === void 0)
          (!h || yr(i, s)?.writable) && (y = l(() => /* @__PURE__ */ G(void 0)), M(y, yt(u)), r.set(s, y));
        else {
          h = y.v !== ne;
          var k = l(() => yt(u));
          M(y, k);
        }
        var m = Reflect.getOwnPropertyDescriptor(i, s);
        if (m?.set && m.set.call(_, u), !h) {
          if (n && typeof s == "string") {
            var x = (
              /** @type {Source<number>} */
              r.get("length")
            ), B = Number(s);
            Number.isInteger(B) && B >= x.v && M(x, B + 1);
          }
          wr(a);
        }
        return !0;
      },
      ownKeys(i) {
        d(a);
        var s = Reflect.ownKeys(i).filter((y) => {
          var h = r.get(y);
          return h === void 0 || h.v !== ne;
        });
        for (var [u, _] of r)
          _.v !== ne && !(u in i) && s.push(u);
        return s;
      },
      setPrototypeOf() {
        Yo();
      }
    }
  );
}
function Qn(e) {
  try {
    if (e !== null && typeof e == "object" && Yt in e)
      return e[Yt];
  } catch {
  }
  return e;
}
function Mi(e, t) {
  return Object.is(Qn(e), Qn(t));
}
var Xn, Pa, Na, Da, La;
function Si() {
  if (Xn === void 0) {
    Xn = window, Pa = document, Na = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, r = Text.prototype;
    Da = yr(t, "firstChild").get, La = yr(t, "nextSibling").get, Zn(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), Zn(r) && (r.__t = void 0);
  }
}
function kt(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function Ze(e) {
  return (
    /** @type {TemplateNode | null} */
    Da.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function Er(e) {
  return (
    /** @type {TemplateNode | null} */
    La.call(e)
  );
}
function c(e, t) {
  return /* @__PURE__ */ Ze(e);
}
function Zt(e, t = !1) {
  {
    var r = /* @__PURE__ */ Ze(e);
    return r instanceof Comment && r.data === "" ? /* @__PURE__ */ Er(r) : r;
  }
}
function f(e, t = 1, r = !1) {
  let n = e;
  for (; t--; )
    n = /** @type {TemplateNode} */
    /* @__PURE__ */ Er(n);
  return n;
}
function Ti(e) {
  e.textContent = "";
}
function Ia() {
  return !1;
}
function Ra(e, t, r) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(t ?? ma, e, void 0)
  );
}
let $n = !1;
function Ai() {
  $n || ($n = !0, document.addEventListener(
    "reset",
    (e) => {
      Promise.resolve().then(() => {
        if (!e.defaultPrevented)
          for (
            const t of
            /**@type {HTMLFormElement} */
            e.target.elements
          )
            t.__on_r?.();
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function Kr(e) {
  var t = A, r = j;
  Ce(null), Qe(null);
  try {
    return e();
  } finally {
    Ce(t), Qe(r);
  }
}
function Fa(e, t, r, n = r) {
  e.addEventListener(t, () => Kr(r));
  const a = e.__on_r;
  a ? e.__on_r = () => {
    a(), n(!0);
  } : e.__on_r = () => n(!0), Ai();
}
function ji(e, t) {
  var r = t.last;
  r === null ? t.last = t.first = e : (r.next = e, e.prev = r, t.last = e);
}
function Xe(e, t) {
  var r = j;
  r !== null && (r.f & ze) !== 0 && (e |= ze);
  var n = {
    ctx: Oe,
    deps: null,
    nodes: null,
    f: e | de | je,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: r,
    b: r && r.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  }, a = n;
  if ((e & It) !== 0)
    Gt !== null ? Gt.push(n) : Et.ensure().schedule(n);
  else if (t !== null) {
    try {
      nr(n);
    } catch (l) {
      throw pe(n), l;
    }
    a.deps === null && a.teardown === null && a.nodes === null && a.first === a.last && // either `null`, or a singular child
    (a.f & Ht) === 0 && (a = a.first, (e & Mt) !== 0 && (e & $t) !== 0 && a !== null && (a.f |= $t));
  }
  if (a !== null && (a.parent = r, r !== null && ji(a, r), A !== null && (A.f & te) !== 0 && (e & Rt) === 0)) {
    var o = (
      /** @type {Derived} */
      A
    );
    (o.effects ??= []).push(a);
  }
  return n;
}
function xn() {
  return A !== null && !Re;
}
function kn(e) {
  const t = Xe(Br, null);
  return Y(t, X), t.teardown = e, t;
}
function qi(e) {
  return Xe(It | Ho, e);
}
function Oi(e) {
  Et.ensure();
  const t = Xe(Rt | Ht, e);
  return (r = {}) => new Promise((n) => {
    r.outro ? Dt(t, () => {
      pe(t), n(void 0);
    }) : (pe(t), n(void 0));
  });
}
function Ba(e) {
  return Xe(It, e);
}
function Ci(e) {
  return Xe(hn | Ht, e);
}
function zn(e, t = 0) {
  return Xe(Br | t, e);
}
function P(e, t = [], r = [], n = []) {
  Aa(n, t, r, (a) => {
    Xe(Br, () => e(...a.map(d)));
  });
}
function Pi(e, t = [], r = [], n = []) {
  if (r.length > 0 || n.length > 0)
    var a = yn();
  Aa(n, t, r, (o) => {
    Xe(It, () => e(...o.map(d))), a && a();
  });
}
function Vr(e, t = 0) {
  var r = Xe(Mt | t, e);
  return r;
}
function Ae(e) {
  return Xe(Ye | Ht, e);
}
function Ha(e) {
  var t = e.teardown;
  if (t !== null) {
    const r = rr, n = A;
    ea(!0), Ce(null);
    try {
      t.call(null);
    } finally {
      ea(r), Ce(n);
    }
  }
}
function En(e, t = !1) {
  var r = e.first;
  for (e.first = e.last = null; r !== null; ) {
    const a = r.ac;
    a !== null && Kr(() => {
      a.abort(ct);
    });
    var n = r.next;
    (r.f & Rt) !== 0 ? r.parent = null : pe(r, t), r = n;
  }
}
function Ni(e) {
  for (var t = e.first; t !== null; ) {
    var r = t.next;
    (t.f & Ye) === 0 && pe(t), t = r;
  }
}
function pe(e, t = !0) {
  var r = !1;
  (t || (e.f & pa) !== 0) && e.nodes !== null && e.nodes.end !== null && (Ua(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), r = !0), Y(e, sn), En(e, t && !r), kr(e, 0);
  var n = e.nodes && e.nodes.t;
  if (n !== null)
    for (const o of n)
      o.stop();
  Ha(e), e.f ^= sn, e.f |= Fe;
  var a = e.parent;
  a !== null && a.first !== null && Ka(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Ua(e, t) {
  for (; e !== null; ) {
    var r = e === t ? null : /* @__PURE__ */ Er(e);
    e.remove(), e = r;
  }
}
function Ka(e) {
  var t = e.parent, r = e.prev, n = e.next;
  r !== null && (r.next = n), n !== null && (n.prev = r), t !== null && (t.first === e && (t.first = n), t.last === e && (t.last = r));
}
function Dt(e, t, r = !0) {
  var n = [];
  Va(e, n, !0);
  var a = () => {
    r && pe(e), t && t();
  }, o = n.length;
  if (o > 0) {
    var l = () => --o || a();
    for (var i of n)
      i.out(l);
  } else
    a();
}
function Va(e, t, r) {
  if ((e.f & ze) === 0) {
    e.f ^= ze;
    var n = e.nodes && e.nodes.t;
    if (n !== null)
      for (const i of n)
        (i.is_global || r) && t.push(i);
    for (var a = e.first; a !== null; ) {
      var o = a.next, l = (a.f & $t) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (a.f & Ye) !== 0 && (e.f & Mt) !== 0;
      Va(a, t, l ? r : !1), a = o;
    }
  }
}
function Mn(e) {
  Wa(e, !0);
}
function Wa(e, t) {
  if ((e.f & ze) !== 0) {
    e.f ^= ze, (e.f & X) === 0 && (Y(e, de), Et.ensure().schedule(e));
    for (var r = e.first; r !== null; ) {
      var n = r.next, a = (r.f & $t) !== 0 || (r.f & Ye) !== 0;
      Wa(r, a ? t : !1), r = n;
    }
    var o = e.nodes && e.nodes.t;
    if (o !== null)
      for (const l of o)
        (l.is_global || t) && l.in();
  }
}
function Sn(e, t) {
  if (e.nodes)
    for (var r = e.nodes.start, n = e.nodes.end; r !== null; ) {
      var a = r === n ? null : /* @__PURE__ */ Er(r);
      t.append(r), r = a;
    }
}
let Dr = !1, rr = !1;
function ea(e) {
  rr = e;
}
let A = null, Re = !1;
function Ce(e) {
  A = e;
}
let j = null;
function Qe(e) {
  j = e;
}
let qe = null;
function Za(e) {
  A !== null && (qe === null ? qe = [e] : qe.push(e));
}
let _e = null, ke = 0, Se = null;
function Di(e) {
  Se = e;
}
let Ga = 1, Ct = 0, Lt = Ct;
function ta(e) {
  Lt = e;
}
function Ya() {
  return ++Ga;
}
function Mr(e) {
  var t = e.f;
  if ((t & de) !== 0)
    return !0;
  if (t & te && (e.f &= ~Ft), (t & Je) !== 0) {
    for (var r = (
      /** @type {Value[]} */
      e.deps
    ), n = r.length, a = 0; a < n; a++) {
      var o = r[a];
      if (Mr(
        /** @type {Derived} */
        o
      ) && ja(
        /** @type {Derived} */
        o
      ), o.wv > e.wv)
        return !0;
    }
    (t & je) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    Ie === null && Y(e, X);
  }
  return !1;
}
function Ja(e, t, r = !0) {
  var n = e.reactions;
  if (n !== null && !(qe !== null && Xt.call(qe, e)))
    for (var a = 0; a < n.length; a++) {
      var o = n[a];
      (o.f & te) !== 0 ? Ja(
        /** @type {Derived} */
        o,
        t,
        !1
      ) : t === o && (r ? Y(o, de) : (o.f & X) !== 0 && Y(o, Je), gn(
        /** @type {Effect} */
        o
      ));
    }
}
function Qa(e) {
  var t = _e, r = ke, n = Se, a = A, o = qe, l = Oe, i = Re, s = Lt, u = e.f;
  _e = /** @type {null | Value[]} */
  null, ke = 0, Se = null, A = (u & (Ye | Rt)) === 0 ? e : null, qe = null, er(e.ctx), Re = !1, Lt = ++Ct, e.ac !== null && (Kr(() => {
    e.ac.abort(ct);
  }), e.ac = null);
  try {
    e.f |= ln;
    var _ = (
      /** @type {Function} */
      e.fn
    ), y = _();
    e.f |= ar;
    var h = e.deps, b = T?.is_fork;
    if (_e !== null) {
      var g;
      if (b || kr(e, ke), h !== null && ke > 0)
        for (h.length = ke + _e.length, g = 0; g < _e.length; g++)
          h[ke + g] = _e[g];
      else
        e.deps = h = _e;
      if (xn() && (e.f & je) !== 0)
        for (g = ke; g < h.length; g++)
          (h[g].reactions ??= []).push(e);
    } else !b && h !== null && ke < h.length && (kr(e, ke), h.length = ke);
    if (ba() && Se !== null && !Re && h !== null && (e.f & (te | Je | de)) === 0)
      for (g = 0; g < /** @type {Source[]} */
      Se.length; g++)
        Ja(
          Se[g],
          /** @type {Effect} */
          e
        );
    if (a !== null && a !== e) {
      if (Ct++, a.deps !== null)
        for (let k = 0; k < r; k += 1)
          a.deps[k].rv = Ct;
      if (t !== null)
        for (const k of t)
          k.rv = Ct;
      Se !== null && (n === null ? n = Se : n.push(.../** @type {Source[]} */
      Se));
    }
    return (e.f & bt) !== 0 && (e.f ^= bt), y;
  } catch (k) {
    return xa(k);
  } finally {
    e.f ^= ln, _e = t, ke = r, Se = n, A = a, qe = o, er(l), Re = i, Lt = s;
  }
}
function Li(e, t) {
  let r = t.reactions;
  if (r !== null) {
    var n = No.call(r, e);
    if (n !== -1) {
      var a = r.length - 1;
      a === 0 ? r = t.reactions = null : (r[n] = r[a], r.pop());
    }
  }
  if (r === null && (t.f & te) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (_e === null || !Xt.call(_e, t))) {
    var o = (
      /** @type {Derived} */
      t
    );
    (o.f & je) !== 0 && (o.f ^= je, o.f &= ~Ft), mn(o), ki(o), kr(o, 0);
  }
}
function kr(e, t) {
  var r = e.deps;
  if (r !== null)
    for (var n = t; n < r.length; n++)
      Li(e, r[n]);
}
function nr(e) {
  var t = e.f;
  if ((t & Fe) === 0) {
    Y(e, X);
    var r = j, n = Dr;
    j = e, Dr = !0;
    try {
      (t & (Mt | _a)) !== 0 ? Ni(e) : En(e), Ha(e);
      var a = Qa(e);
      e.teardown = typeof a == "function" ? a : null, e.wv = Ga;
      var o;
    } finally {
      Dr = n, j = r;
    }
  }
}
async function Ii() {
  await Promise.resolve(), fi();
}
function d(e) {
  var t = e.f, r = (t & te) !== 0;
  if (A !== null && !Re) {
    var n = j !== null && (j.f & Fe) !== 0;
    if (!n && (qe === null || !Xt.call(qe, e))) {
      var a = A.deps;
      if ((A.f & ln) !== 0)
        e.rv < Ct && (e.rv = Ct, _e === null && a !== null && a[ke] === e ? ke++ : _e === null ? _e = [e] : _e.push(e));
      else {
        (A.deps ??= []).push(e);
        var o = e.reactions;
        o === null ? e.reactions = [A] : Xt.call(o, A) || o.push(A);
      }
    }
  }
  if (rr && xt.has(e))
    return xt.get(e);
  if (r) {
    var l = (
      /** @type {Derived} */
      e
    );
    if (rr) {
      var i = l.v;
      return ((l.f & X) === 0 && l.reactions !== null || $a(l)) && (i = wn(l)), xt.set(l, i), i;
    }
    var s = (l.f & je) === 0 && !Re && A !== null && (Dr || (A.f & je) !== 0), u = (l.f & ar) === 0;
    Mr(l) && (s && (l.f |= je), ja(l)), s && !u && (qa(l), Xa(l));
  }
  if (Ie?.has(e))
    return Ie.get(e);
  if ((e.f & bt) !== 0)
    throw e.v;
  return e.v;
}
function Xa(e) {
  if (e.f |= je, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ??= []).push(e), (t.f & te) !== 0 && (t.f & je) === 0 && (qa(
        /** @type {Derived} */
        t
      ), Xa(
        /** @type {Derived} */
        t
      ));
}
function $a(e) {
  if (e.v === ne) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (xt.has(t) || (t.f & te) !== 0 && $a(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function Tn(e) {
  var t = Re;
  try {
    return Re = !0, e();
  } finally {
    Re = t;
  }
}
const Ri = ["touchstart", "touchmove"];
function Fi(e) {
  return Ri.includes(e);
}
const mr = /* @__PURE__ */ Symbol("events"), eo = /* @__PURE__ */ new Set(), dn = /* @__PURE__ */ new Set();
function Bi(e, t, r, n = {}) {
  function a(o) {
    if (n.capture || fn.call(t, o), !o.cancelBubble)
      return Kr(() => r?.call(this, o));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? wt(() => {
    t.addEventListener(e, a, n);
  }) : t.addEventListener(e, a, n), a;
}
function to(e, t, r, n, a) {
  var o = { capture: n, passive: a }, l = Bi(e, t, r, o);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && kn(() => {
    t.removeEventListener(e, l, o);
  });
}
function K(e, t, r) {
  (t[mr] ??= {})[e] = r;
}
function ro(e) {
  for (var t = 0; t < e.length; t++)
    eo.add(e[t]);
  for (var r of dn)
    r(e);
}
let ra = null;
function fn(e) {
  var t = this, r = (
    /** @type {Node} */
    t.ownerDocument
  ), n = e.type, a = e.composedPath?.() || [], o = (
    /** @type {null | Element} */
    a[0] || e.target
  );
  ra = e;
  var l = 0, i = ra === e && e[mr];
  if (i) {
    var s = a.indexOf(i);
    if (s !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e[mr] = t;
      return;
    }
    var u = a.indexOf(t);
    if (u === -1)
      return;
    s <= u && (l = s);
  }
  if (o = /** @type {Element} */
  a[l] || e.target, o !== t) {
    Do(e, "currentTarget", {
      configurable: !0,
      get() {
        return o || r;
      }
    });
    var _ = A, y = j;
    Ce(null), Qe(null);
    try {
      for (var h, b = []; o !== null; ) {
        var g = o.assignedSlot || o.parentNode || /** @type {any} */
        o.host || null;
        try {
          var k = o[mr]?.[n];
          k != null && (!/** @type {any} */
          o.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === o) && k.call(o, e);
        } catch (m) {
          h ? b.push(m) : h = m;
        }
        if (e.cancelBubble || g === t || g === null)
          break;
        o = g;
      }
      if (h) {
        for (let m of b)
          queueMicrotask(() => {
            throw m;
          });
        throw h;
      }
    } finally {
      e[mr] = t, delete e.currentTarget, Ce(_), Qe(y);
    }
  }
}
const Hi = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (e) => e
  })
);
function Ui(e) {
  return (
    /** @type {string} */
    Hi?.createHTML(e) ?? e
  );
}
function no(e) {
  var t = Ra("template");
  return t.innerHTML = Ui(e.replaceAll("<!>", "<!---->")), t.content;
}
function zr(e, t) {
  var r = (
    /** @type {Effect} */
    j
  );
  r.nodes === null && (r.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function C(e, t) {
  var r = (t & ri) !== 0, n = (t & ni) !== 0, a, o = !e.startsWith("<!>");
  return () => {
    a === void 0 && (a = no(o ? e : "<!>" + e), r || (a = /** @type {TemplateNode} */
    /* @__PURE__ */ Ze(a)));
    var l = (
      /** @type {TemplateNode} */
      n || Na ? document.importNode(a, !0) : a.cloneNode(!0)
    );
    if (r) {
      var i = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Ze(l)
      ), s = (
        /** @type {TemplateNode} */
        l.lastChild
      );
      zr(i, s);
    } else
      zr(l, l);
    return l;
  };
}
// @__NO_SIDE_EFFECTS__
function Ki(e, t, r = "svg") {
  var n = !e.startsWith("<!>"), a = `<${r}>${n ? e : "<!>" + e}</${r}>`, o;
  return () => {
    if (!o) {
      var l = (
        /** @type {DocumentFragment} */
        no(a)
      ), i = (
        /** @type {Element} */
        /* @__PURE__ */ Ze(l)
      );
      o = /** @type {Element} */
      /* @__PURE__ */ Ze(i);
    }
    var s = (
      /** @type {TemplateNode} */
      o.cloneNode(!0)
    );
    return zr(s, s), s;
  };
}
// @__NO_SIDE_EFFECTS__
function Vi(e, t) {
  return /* @__PURE__ */ Ki(e, t, "svg");
}
function q(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function p(e, t) {
  var r = t == null ? "" : typeof t == "object" ? `${t}` : t;
  r !== (e.__t ??= e.nodeValue) && (e.__t = r, e.nodeValue = `${r}`);
}
function Wi(e, t) {
  return Zi(e, t);
}
const Cr = /* @__PURE__ */ new Map();
function Zi(e, { target: t, anchor: r, props: n = {}, events: a, context: o, intro: l = !0, transformError: i }) {
  Si();
  var s = void 0, u = Oi(() => {
    var _ = r ?? t.appendChild(kt());
    hi(
      /** @type {TemplateNode} */
      _,
      {
        pending: () => {
        }
      },
      (b) => {
        Hr({});
        var g = (
          /** @type {ComponentContext} */
          Oe
        );
        o && (g.c = o), a && (n.$$events = a), s = e(b, n) || {}, Ur();
      },
      i
    );
    var y = /* @__PURE__ */ new Set(), h = (b) => {
      for (var g = 0; g < b.length; g++) {
        var k = b[g];
        if (!y.has(k)) {
          y.add(k);
          var m = Fi(k);
          for (const O of [t, document]) {
            var x = Cr.get(O);
            x === void 0 && (x = /* @__PURE__ */ new Map(), Cr.set(O, x));
            var B = x.get(k);
            B === void 0 ? (O.addEventListener(k, fn, { passive: m }), x.set(k, 1)) : x.set(k, B + 1);
          }
        }
      }
    };
    return h(Fr(eo)), dn.add(h), () => {
      for (var b of y)
        for (const m of [t, document]) {
          var g = (
            /** @type {Map<string, number>} */
            Cr.get(m)
          ), k = (
            /** @type {number} */
            g.get(b)
          );
          --k == 0 ? (m.removeEventListener(b, fn), g.delete(b), g.size === 0 && Cr.delete(m)) : g.set(b, k);
        }
      dn.delete(h), _ !== r && _.parentNode?.removeChild(_);
    };
  });
  return Gi.set(s, u), s;
}
let Gi = /* @__PURE__ */ new WeakMap();
class Yi {
  /** @type {TemplateNode} */
  anchor;
  /** @type {Map<Batch, Key>} */
  #e = /* @__PURE__ */ new Map();
  /**
   * Map of keys to effects that are currently rendered in the DOM.
   * These effects are visible and actively part of the document tree.
   * Example:
   * ```
   * {#if condition}
   * 	foo
   * {:else}
   * 	bar
   * {/if}
   * ```
   * Can result in the entries `true->Effect` and `false->Effect`
   * @type {Map<Key, Effect>}
   */
  #l = /* @__PURE__ */ new Map();
  /**
   * Similar to #onscreen with respect to the keys, but contains branches that are not yet
   * in the DOM, because their insertion is deferred.
   * @type {Map<Key, Branch>}
   */
  #t = /* @__PURE__ */ new Map();
  /**
   * Keys of effects that are currently outroing
   * @type {Set<Key>}
   */
  #n = /* @__PURE__ */ new Set();
  /**
   * Whether to pause (i.e. outro) on change, or destroy immediately.
   * This is necessary for `<svelte:element>`
   */
  #a = !0;
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, r = !0) {
    this.anchor = t, this.#a = r;
  }
  /**
   * @param {Batch} batch
   */
  #r = (t) => {
    if (this.#e.has(t)) {
      var r = (
        /** @type {Key} */
        this.#e.get(t)
      ), n = this.#l.get(r);
      if (n)
        Mn(n), this.#n.delete(r);
      else {
        var a = this.#t.get(r);
        a && (this.#l.set(r, a.effect), this.#t.delete(r), a.fragment.lastChild.remove(), this.anchor.before(a.fragment), n = a.effect);
      }
      for (const [o, l] of this.#e) {
        if (this.#e.delete(o), o === t)
          break;
        const i = this.#t.get(l);
        i && (pe(i.effect), this.#t.delete(l));
      }
      for (const [o, l] of this.#l) {
        if (o === r || this.#n.has(o)) continue;
        const i = () => {
          if (Array.from(this.#e.values()).includes(o)) {
            var u = document.createDocumentFragment();
            Sn(l, u), u.append(kt()), this.#t.set(o, { effect: l, fragment: u });
          } else
            pe(l);
          this.#n.delete(o), this.#l.delete(o);
        };
        this.#a || !n ? (this.#n.add(o), Dt(l, i, !1)) : i();
      }
    }
  };
  /**
   * @param {Batch} batch
   */
  #o = (t) => {
    this.#e.delete(t);
    const r = Array.from(this.#e.values());
    for (const [n, a] of this.#t)
      r.includes(n) || (pe(a.effect), this.#t.delete(n));
  };
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(t, r) {
    var n = (
      /** @type {Batch} */
      T
    ), a = Ia();
    if (r && !this.#l.has(t) && !this.#t.has(t))
      if (a) {
        var o = document.createDocumentFragment(), l = kt();
        o.append(l), this.#t.set(t, {
          effect: Ae(() => r(l)),
          fragment: o
        });
      } else
        this.#l.set(
          t,
          Ae(() => r(this.anchor))
        );
    if (this.#e.set(n, t), a) {
      for (const [i, s] of this.#l)
        i === t ? n.unskip_effect(s) : n.skip_effect(s);
      for (const [i, s] of this.#t)
        i === t ? n.unskip_effect(s.effect) : n.skip_effect(s.effect);
      n.oncommit(this.#r), n.ondiscard(this.#o);
    } else
      this.#r(n);
  }
}
function ce(e, t, r = !1) {
  var n = new Yi(e), a = r ? $t : 0;
  function o(l, i) {
    n.ensure(l, i);
  }
  Vr(() => {
    var l = !1;
    t((i, s = 0) => {
      l = !0, o(s, i);
    }), l || o(-1, null);
  }, a);
}
function Pr(e, t) {
  return t;
}
function Ji(e, t, r) {
  for (var n = [], a = t.length, o, l = t.length, i = 0; i < a; i++) {
    let y = t[i];
    Dt(
      y,
      () => {
        if (o) {
          if (o.pending.delete(y), o.done.add(y), o.pending.size === 0) {
            var h = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            vn(e, Fr(o.done)), h.delete(o), h.size === 0 && (e.outrogroups = null);
          }
        } else
          l -= 1;
      },
      !1
    );
  }
  if (l === 0) {
    var s = n.length === 0 && r !== null;
    if (s) {
      var u = (
        /** @type {Element} */
        r
      ), _ = (
        /** @type {Element} */
        u.parentNode
      );
      Ti(_), _.append(u), e.items.clear();
    }
    vn(e, t, !s);
  } else
    o = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function vn(e, t, r = !0) {
  var n;
  if (e.pending.size > 0) {
    n = /* @__PURE__ */ new Set();
    for (const l of e.pending.values())
      for (const i of l)
        n.add(
          /** @type {EachItem} */
          e.items.get(i).e
        );
  }
  for (var a = 0; a < t.length; a++) {
    var o = t[a];
    if (n?.has(o)) {
      o.f |= We;
      const l = document.createDocumentFragment();
      Sn(o, l);
    } else
      pe(t[a], r);
  }
}
var na;
function pr(e, t, r, n, a, o = null) {
  var l = e, i = /* @__PURE__ */ new Map(), s = (t & ha) !== 0;
  if (s) {
    var u = (
      /** @type {Element} */
      e
    );
    l = u.appendChild(kt());
  }
  var _ = null, y = /* @__PURE__ */ bi(() => {
    var O = r();
    return pn(O) ? O : O == null ? [] : Fr(O);
  }), h, b = /* @__PURE__ */ new Map(), g = !0;
  function k(O) {
    (B.effect.f & Fe) === 0 && (B.pending.delete(O), B.fallback = _, Qi(B, h, l, t, n), _ !== null && (h.length === 0 ? (_.f & We) === 0 ? Mn(_) : (_.f ^= We, gr(_, null, l)) : Dt(_, () => {
      _ = null;
    })));
  }
  function m(O) {
    B.pending.delete(O);
  }
  var x = Vr(() => {
    h = /** @type {V[]} */
    d(y);
    for (var O = h.length, V = /* @__PURE__ */ new Set(), se = (
      /** @type {Batch} */
      T
    ), he = Ia(), R = 0; R < O; R += 1) {
      var re = h[R], fe = n(re, R), D = g ? null : i.get(fe);
      D ? (D.v && tr(D.v, re), D.i && tr(D.i, R), he && se.unskip_effect(D.e)) : (D = Xi(
        i,
        g ? l : na ??= kt(),
        re,
        fe,
        R,
        a,
        t,
        r
      ), g || (D.e.f |= We), i.set(fe, D)), V.add(fe);
    }
    if (O === 0 && o && !_ && (g ? _ = Ae(() => o(l)) : (_ = Ae(() => o(na ??= kt())), _.f |= We)), O > V.size && Wo(), !g)
      if (b.set(se, V), he) {
        for (const [Pe, $e] of i)
          V.has(Pe) || se.skip_effect($e.e);
        se.oncommit(k), se.ondiscard(m);
      } else
        k(se);
    d(y);
  }), B = { effect: x, items: i, pending: b, outrogroups: null, fallback: _ };
  g = !1;
}
function hr(e) {
  for (; e !== null && (e.f & Ye) === 0; )
    e = e.next;
  return e;
}
function Qi(e, t, r, n, a) {
  var o = (n & ei) !== 0, l = t.length, i = e.items, s = hr(e.effect.first), u, _ = null, y, h = [], b = [], g, k, m, x;
  if (o)
    for (x = 0; x < l; x += 1)
      g = t[x], k = a(g, x), m = /** @type {EachItem} */
      i.get(k).e, (m.f & We) === 0 && (m.nodes?.a?.measure(), (y ??= /* @__PURE__ */ new Set()).add(m));
  for (x = 0; x < l; x += 1) {
    if (g = t[x], k = a(g, x), m = /** @type {EachItem} */
    i.get(k).e, e.outrogroups !== null)
      for (const D of e.outrogroups)
        D.pending.delete(m), D.done.delete(m);
    if ((m.f & ze) !== 0 && (Mn(m), o && (m.nodes?.a?.unfix(), (y ??= /* @__PURE__ */ new Set()).delete(m))), (m.f & We) !== 0)
      if (m.f ^= We, m === s)
        gr(m, null, r);
      else {
        var B = _ ? _.next : s;
        m === e.effect.last && (e.effect.last = m.prev), m.prev && (m.prev.next = m.next), m.next && (m.next.prev = m.prev), pt(e, _, m), pt(e, m, B), gr(m, B, r), _ = m, h = [], b = [], s = hr(_.next);
        continue;
      }
    if (m !== s) {
      if (u !== void 0 && u.has(m)) {
        if (h.length < b.length) {
          var O = b[0], V;
          _ = O.prev;
          var se = h[0], he = h[h.length - 1];
          for (V = 0; V < h.length; V += 1)
            gr(h[V], O, r);
          for (V = 0; V < b.length; V += 1)
            u.delete(b[V]);
          pt(e, se.prev, he.next), pt(e, _, se), pt(e, he, O), s = O, _ = he, x -= 1, h = [], b = [];
        } else
          u.delete(m), gr(m, s, r), pt(e, m.prev, m.next), pt(e, m, _ === null ? e.effect.first : _.next), pt(e, _, m), _ = m;
        continue;
      }
      for (h = [], b = []; s !== null && s !== m; )
        (u ??= /* @__PURE__ */ new Set()).add(s), b.push(s), s = hr(s.next);
      if (s === null)
        continue;
    }
    (m.f & We) === 0 && h.push(m), _ = m, s = hr(m.next);
  }
  if (e.outrogroups !== null) {
    for (const D of e.outrogroups)
      D.pending.size === 0 && (vn(e, Fr(D.done)), e.outrogroups?.delete(D));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (s !== null || u !== void 0) {
    var R = [];
    if (u !== void 0)
      for (m of u)
        (m.f & ze) === 0 && R.push(m);
    for (; s !== null; )
      (s.f & ze) === 0 && s !== e.fallback && R.push(s), s = hr(s.next);
    var re = R.length;
    if (re > 0) {
      var fe = (n & ha) !== 0 && l === 0 ? r : null;
      if (o) {
        for (x = 0; x < re; x += 1)
          R[x].nodes?.a?.measure();
        for (x = 0; x < re; x += 1)
          R[x].nodes?.a?.fix();
      }
      Ji(e, R, fe);
    }
  }
  o && wt(() => {
    if (y !== void 0)
      for (m of y)
        m.nodes?.a?.apply();
  });
}
function Xi(e, t, r, n, a, o, l, i) {
  var s = (l & Xo) !== 0 ? (l & ti) === 0 ? /* @__PURE__ */ zi(r, !1, !1) : Bt(r) : null, u = (l & $o) !== 0 ? Bt(a) : null;
  return {
    v: s,
    i: u,
    e: Ae(() => (o(t, s ?? r, u ?? a, i), () => {
      e.delete(n);
    }))
  };
}
function gr(e, t, r) {
  if (e.nodes)
    for (var n = e.nodes.start, a = e.nodes.end, o = t && (t.f & We) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : r; n !== null; ) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Er(n)
      );
      if (o.before(n), n === a)
        return;
      n = l;
    }
}
function pt(e, t, r) {
  t === null ? e.effect.first = r : t.next = r, r === null ? e.effect.last = t : r.prev = t;
}
function $i(e, t, r = !1, n = !1, a = !1, o = !1) {
  var l = e, i = "";
  if (r)
    var s = (
      /** @type {Element} */
      e
    );
  P(() => {
    var u = (
      /** @type {Effect} */
      j
    );
    if (i !== (i = t() ?? "")) {
      if (r) {
        u.nodes = null, s.innerHTML = /** @type {string} */
        i, i !== "" && zr(
          /** @type {TemplateNode} */
          /* @__PURE__ */ Ze(s),
          /** @type {TemplateNode} */
          s.lastChild
        );
        return;
      }
      if (u.nodes !== null && (Ua(
        u.nodes.start,
        /** @type {TemplateNode} */
        u.nodes.end
      ), u.nodes = null), i !== "") {
        var _ = n ? ai : a ? oi : void 0, y = (
          /** @type {HTMLTemplateElement | SVGElement | MathMLElement} */
          Ra(n ? "svg" : a ? "math" : "template", _)
        );
        y.innerHTML = /** @type {any} */
        i;
        var h = n || a ? y : (
          /** @type {HTMLTemplateElement} */
          y.content
        );
        if (zr(
          /** @type {TemplateNode} */
          /* @__PURE__ */ Ze(h),
          /** @type {TemplateNode} */
          h.lastChild
        ), n || a)
          for (; /* @__PURE__ */ Ze(h); )
            l.before(
              /** @type {TemplateNode} */
              /* @__PURE__ */ Ze(h)
            );
        else
          l.before(h);
      }
    }
  });
}
function es(e, t) {
  var r;
  r = document.head.appendChild(kt()), Vr(() => t(r), pa | Ht);
}
function ao(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (r = ao(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function ts() {
  for (var e, t, r = 0, n = "", a = arguments.length; r < a; r++) (e = arguments[r]) && (t = ao(e)) && (n && (n += " "), n += t);
  return n;
}
function rs(e) {
  return typeof e == "object" ? ts(e) : e ?? "";
}
const aa = [...` 	
\r\f \v\uFEFF`];
function ns(e, t, r) {
  var n = e == null ? "" : "" + e;
  if (t && (n = n ? n + " " + t : t), r) {
    for (var a of Object.keys(r))
      if (r[a])
        n = n ? n + " " + a : a;
      else if (n.length)
        for (var o = a.length, l = 0; (l = n.indexOf(a, l)) >= 0; ) {
          var i = l + o;
          (l === 0 || aa.includes(n[l - 1])) && (i === n.length || aa.includes(n[i])) ? n = (l === 0 ? "" : n.substring(0, l)) + n.substring(i + 1) : l = i;
        }
  }
  return n === "" ? null : n;
}
function zt(e, t, r, n, a, o) {
  var l = e.__className;
  if (l !== r || l === void 0) {
    var i = ns(r, n, o);
    i == null ? e.removeAttribute("class") : t ? e.className = i : e.setAttribute("class", i), e.__className = r;
  } else if (o && a !== o)
    for (var s in o) {
      var u = !!o[s];
      (a == null || u !== !!a[s]) && e.classList.toggle(s, u);
    }
  return o;
}
function oo(e, t, r = !1) {
  if (e.multiple) {
    if (t == null)
      return;
    if (!pn(t))
      return ii();
    for (var n of e.options)
      n.selected = t.includes(xr(n));
    return;
  }
  for (n of e.options) {
    var a = xr(n);
    if (Mi(a, t)) {
      n.selected = !0;
      return;
    }
  }
  (!r || t !== void 0) && (e.selectedIndex = -1);
}
function as(e) {
  var t = new MutationObserver(() => {
    oo(e, e.__value);
  });
  t.observe(e, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), kn(() => {
    t.disconnect();
  });
}
function oa(e, t, r = t) {
  var n = /* @__PURE__ */ new WeakSet(), a = !0;
  Fa(e, "change", (o) => {
    var l = o ? "[selected]" : ":checked", i;
    if (e.multiple)
      i = [].map.call(e.querySelectorAll(l), xr);
    else {
      var s = e.querySelector(l) ?? // will fall back to first non-disabled option if no option is selected
      e.querySelector("option:not([disabled])");
      i = s && xr(s);
    }
    r(i), e.__value = i, T !== null && n.add(T);
  }), Ba(() => {
    var o = t();
    if (e === document.activeElement) {
      var l = (
        /** @type {Batch} */
        T
      );
      if (n.has(l))
        return;
    }
    if (oo(e, o, a), a && o === void 0) {
      var i = e.querySelector(":checked");
      i !== null && (o = xr(i), r(o));
    }
    e.__value = o, a = !1;
  }), as(e);
}
function xr(e) {
  return "__value" in e ? e.__value : e.value;
}
const os = /* @__PURE__ */ Symbol("is custom element"), is = /* @__PURE__ */ Symbol("is html"), ss = Ko ? "progress" : "PROGRESS";
function ls(e, t) {
  var r = io(e);
  r.value === (r.value = // treat null and undefined the same for the initial value
  t ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  e.value === t && (t !== 0 || e.nodeName !== ss) || (e.value = t ?? "");
}
function S(e, t, r, n) {
  var a = io(e);
  a[t] !== (a[t] = r) && (t === "loading" && (e[Uo] = r), r == null ? e.removeAttribute(t) : typeof r != "string" && us(e).includes(t) ? e[t] = r : e.setAttribute(t, r));
}
function io(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ??= {
      [os]: e.nodeName.includes("-"),
      [is]: e.namespaceURI === ma
    }
  );
}
var ia = /* @__PURE__ */ new Map();
function us(e) {
  var t = e.getAttribute("is") || e.nodeName, r = ia.get(t);
  if (r) return r;
  ia.set(t, r = []);
  for (var n, a = e, o = Element.prototype; o !== a; ) {
    n = Lo(a);
    for (var l in n)
      n[l].set && r.push(l);
    a = fa(a);
  }
  return r;
}
function so(e, t, r = t) {
  var n = /* @__PURE__ */ new WeakSet();
  Fa(e, "input", async (a) => {
    var o = a ? e.defaultValue : e.value;
    if (o = tn(e) ? rn(o) : o, r(o), T !== null && n.add(T), await Ii(), o !== (o = t())) {
      var l = e.selectionStart, i = e.selectionEnd, s = e.value.length;
      if (e.value = o ?? "", i !== null) {
        var u = e.value.length;
        l === i && i === s && u > s ? (e.selectionStart = u, e.selectionEnd = u) : (e.selectionStart = l, e.selectionEnd = Math.min(i, u));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  Tn(t) == null && e.value && (r(tn(e) ? rn(e.value) : e.value), T !== null && n.add(T)), zn(() => {
    var a = t();
    if (e === document.activeElement) {
      var o = (
        /** @type {Batch} */
        T
      );
      if (n.has(o))
        return;
    }
    tn(e) && a === rn(e.value) || e.type === "date" && !a && !e.value || a !== e.value && (e.value = a ?? "");
  });
}
function tn(e) {
  var t = e.type;
  return t === "number" || t === "range";
}
function rn(e) {
  return e === "" ? null : +e;
}
function sa(e, t) {
  return e === t || e?.[Yt] === t;
}
function la(e = {}, t, r, n) {
  var a = (
    /** @type {ComponentContext} */
    Oe.r
  ), o = (
    /** @type {Effect} */
    j
  );
  return Ba(() => {
    var l, i;
    return zn(() => {
      l = i, i = [], Tn(() => {
        e !== r(...i) && (t(e, ...i), l && sa(r(...l), e) && t(null, ...l));
      });
    }), () => {
      let s = o;
      for (; s !== a && s.parent !== null && s.parent.f & sn; )
        s = s.parent;
      const u = () => {
        i && sa(r(...i), e) && t(null, ...i);
      }, _ = s.teardown;
      s.teardown = () => {
        u(), _?.();
      };
    };
  }), e;
}
function Pt(e, t, r, n) {
  var a = (
    /** @type {V} */
    n
  ), o = !0, l = () => (o && (o = !1, a = /** @type {V} */
  n), a), i;
  i = /** @type {V} */
  e[t], i === void 0 && n !== void 0 && (i = l());
  var s;
  return s = () => {
    var u = (
      /** @type {V} */
      e[t]
    );
    return u === void 0 ? l() : (o = !0, u);
  }, s;
}
const cs = "5";
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(cs);
var ds = /* @__PURE__ */ Vi('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></svg>');
function Jt(e, t) {
  const r = Pt(t, "size", 3, 18), n = Pt(t, "class", 3, ""), a = {
    "file-text": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
    eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
    x: '<path d="M18 6 6 18"/><path d="M6 6l12 12"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    "map-pin": '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    cart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
    loader: '<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>',
    grid: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    list: '<line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/>',
    minus: '<path d="M5 12h14"/>',
    "chevron-down": '<path d="m6 9 6 6 6-6"/>',
    "chevron-up": '<path d="m18 15-6-6-6 6"/>',
    // Te trzy były wołane (orders „Wróć"/„Dalej", OrderDrawer „Edytuj pozycje")
    // i renderowały pusty svg — nieznana nazwa nie krzyczy, tylko znika.
    "chevron-left": '<path d="m15 18-6-6 6-6"/>',
    "chevron-right": '<path d="m9 18 6-6-6-6"/>',
    edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/>',
    package: '<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
    "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
    bookmark: '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    menu: '<path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    "credit-card": '<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>',
    "trending-up": '<path d="M22 7l-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
    "more-vertical": '<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',
    "grip-vertical": '<circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/>'
  };
  var o = ds();
  $i(o, () => a[t.name] ?? "", !0), P(() => {
    S(o, "width", r()), S(o, "height", r()), zt(o, 0, rs(n()));
  }), q(e, o);
}
const fs = {
  "ui.cookies.save": "Zapisz wybór",
  "ui.projects.count": "Wyniki: {visible} z {total}",
  "ui.motion.enable": "Włącz animację",
  "ui.motion.reduce": "Ogranicz animację",
  "ui.motion.resume": "Wznów",
  "ui.motion.pause": "Wstrzymaj",
  "ui.motion.replay": "Powtórz",
  "ui.motion.attention.0": "Zapytania trafiają różnymi drogami.",
  "ui.motion.attention.1": "Kontakt i ustalenia spotykają się przy sprawie.",
  "ui.motion.attention.2": "Sprawa ma opiekuna i następny krok.",
  "ui.motion.conversation.0": "Znasz potrzebę klienta.",
  "ui.motion.conversation.1": "Uzgadniasz ofertę i warunki zakupu.",
  "ui.motion.conversation.2": "Zamówienie ma dane potrzebne do realizacji.",
  "ui.motion.production.0": "Ustalenia stają się zadaniami zespołu.",
  "ui.motion.production.1": "Każdy etap dostaje właściwe informacje.",
  "ui.motion.production.2": "Status i dokumentacja wracają do sprawy klienta.",
  "ui.motion.knowledge.0": "Każdy etap zostawia informację.",
  "ui.motion.knowledge.1": "Statusy i terminy składają się na obraz sprawy.",
  "ui.motion.knowledge.2": "Zespół widzi, co sprawdzić i co zrobić dalej.",
  "demo.title": "Demo Dopina B2B — katalog bez logowania",
  "demo.brand": "Demo Dopina B2B",
  "demo.banner": "fikcyjne produkty i ceny · zdjęcia AI",
  "demo.back_offer": "Wróć do oferty ISIKO ↗",
  "demo.navigation": "Nawigacja demo",
  "demo.catalog": "Katalog",
  "demo.orders": "Zamówienia",
  "demo.cart": "Koszyk",
  "demo.cart_count": "Koszyk: {count} sztuk",
  "demo.close_notice": "Zamknij informację",
  "demo.account": "Kontrahent demonstracyjny · Twój cennik hurtowy",
  "demo.catalog_heading": "Katalog produktów",
  "demo.catalog_intro": "Wybierz ilość i dodaj produkty do koszyka. Bez logowania.",
  "demo.product_count": "3 produkty",
  "demo.search_placeholder": "Szukaj produktu lub kodu…",
  "demo.search_label": "Szukaj produktu lub kodu",
  "demo.category": "Kategoria",
  "demo.all": "Wszystkie",
  "demo.no_product": "Nie znaleźliśmy produktu.",
  "demo.no_product_help": "Zmień nazwę lub kategorię.",
  "demo.show_all": "Pokaż wszystkie produkty",
  "demo.terms": "Twoje warunki",
  "demo.terms_help": "Ceny netto i brutto, minimalne ilości oraz opakowania.",
  "demo.next_step": "Jeden następny krok",
  "demo.next_step_help": "Dodaj produkty, sprawdź koszyk i utwórz zamówienie demo.",
  "demo.no_personal_data": "Bez danych osobowych",
  "demo.no_personal_data_help": "Przykładowy kontrahent jest gotowy. Po odświeżeniu zaczynasz od nowa.",
  "demo.order_example": "Zamówienie demonstracyjne",
  "demo.your_cart": "Twój koszyk",
  "demo.cart_help": "Ilości dopasowujemy do pełnych opakowań i dostępnego stanu.",
  "demo.back_catalog": "Wróć do katalogu",
  "demo.package": "opakowanie {count} szt.",
  "demo.net_per_unit": "netto / szt.",
  "demo.quantity": "Ilość",
  "demo.cart_quantity": "Ilość w koszyku: {name}",
  "demo.net": "netto",
  "demo.gross": "brutto",
  "demo.remove": "Usuń: {name}",
  "demo.summary": "Podsumowanie",
  "demo.products_net": "Produkty netto",
  "demo.tax": "VAT 23%",
  "demo.total_gross": "Razem brutto",
  "demo.transport_help": "Transport: 0 zł w przykładzie. To dane demonstracyjne, nie oferta sprzedaży.",
  "demo.go_summary": "Przejdź do podsumowania",
  "demo.empty_cart": "Koszyk jest pusty.",
  "demo.empty_cart_help": "Zacznij od wybrania produktu.",
  "demo.go_catalog": "Przejdź do katalogu",
  "demo.history": "Historia tego podglądu",
  "demo.demo_orders": "Zamówienia demo",
  "demo.orders_help": "Potwierdzenia pozostają tylko w otwartym podglądzie.",
  "demo.new_order": "Nowe zamówienie",
  "demo.example_status": "Demonstracyjne",
  "demo.delivery_summary": "Dostawa: {delivery}. Odbiorca: Kontrahent demonstracyjny.",
  "demo.order_item": "{name} — {count} szt.",
  "demo.repeat_order": "Powtórz zamówienie",
  "demo.no_orders": "Jeszcze bez zamówień.",
  "demo.no_orders_help": "Dodaj produkty i przejdź przez podsumowanie, aby zobaczyć przykład.",
  "demo.open_catalog": "Otwórz katalog",
  "demo.order_created": "Utworzono {number} wyłącznie w tym demo. Nic nie zostało wysłane.",
  "demo.footer": "Dopina B2B · demo prezentacyjne ISIKO",
  "demo.contact": "Porozmawiajmy o Twoim panelu ↗",
  "demo.footer_help": "Brak płatności i wysyłki do firmy. Odświeżenie usuwa koszyk i zamówienia z tego podglądu.",
  "demo.close_product": "Zamknij produkt",
  "demo.available": "Dostępne: {count} szt.",
  "demo.minimum": "Minimalne zamówienie: {count} szt.",
  "demo.multiple": "Wielokrotność: {count} szt.",
  "demo.product_added": "Dodano {count} szt. produktu: {name}.",
  "demo.add_package": "Dodaj opakowanie do koszyka",
  "demo.close_summary": "Zamknij podsumowanie",
  "demo.last_step": "Ostatni krok demo",
  "demo.confirm_heading": "Sprawdź i potwierdź.",
  "demo.recipient": "Odbiorca: Kontrahent demonstracyjny.",
  "demo.address_help": "Adres przykładowy — nie podajesz własnych danych.",
  "demo.delivery": "Sposób dostawy",
  "demo.courier": "Kurier",
  "demo.pickup": "Odbiór osobisty",
  "demo.payment_help": "Płatność: demonstracyjny termin 14 dni.",
  "demo.confirm_help": "Przycisk utworzy wyłącznie lokalny przykład. Nie zamawiasz towaru i nie powstaje zobowiązanie.",
  "demo.create_order": "Utwórz zamówienie demo",
  "demo.card_added": "Dodano {count} szt do koszyka",
  "demo.favorite_remove": "Usuń z ulubionych",
  "demo.favorite_add": "Dodaj do ulubionych",
  "demo.unavailable": "Niedostępny",
  "demo.promotion": "Promo",
  "demo.manufacturer": "Dopina demo",
  "demo.product_quantity": "Ilość: {name}",
  "demo.package_help": "Sprzedaż po {count} szt — wpisana ilość zostanie dociągnięta do pełnej paczki",
  "demo.add_cart": "Dodaj do koszyka",
  "demo.add_product": "Dodaj do koszyka: {name}",
  "demo.price_on_request": "Cena na zapytanie",
  "demo.product.1.name": "Butelka stalowa 750 ml",
  "demo.product.1.category": "Akcesoria",
  "demo.product.1.description": "Matowa stal, zakręcane zamknięcie. Przykładowy produkt do firmowego zestawu.",
  "demo.product.2.name": "Kubek ceramiczny 300 ml",
  "demo.product.2.category": "Ceramika",
  "demo.product.2.description": "Gładka ceramika w kolorze kości słoniowej. Sprzedaż w opakowaniach po 6 sztuk.",
  "demo.product.3.name": "Notes kraft A5",
  "demo.product.3.category": "Artykuły biurowe",
  "demo.product.3.description": "Twarda okładka kraft i granatowe zamknięcie. Przykładowy notes do codziennej pracy."
}, Ir = typeof document > "u" ? null : document, Rr = Ir?.getElementById("isiko-i18n")?.textContent;
let Nt = {};
try {
  Rr && (Nt = JSON.parse(Rr) || {});
} catch {
  console.error("Invalid isiko-i18n JSON");
}
const Ge = (Ir?.documentElement.lang || Nt.locale || "pl").toLowerCase().split("-")[0], nn = !Rr && Ge === "pl" ? fs : Nt.locale === Ge && Nt.messages && typeof Nt.messages == "object" ? Nt.messages : {}, ua = /* @__PURE__ */ new Set();
function _n(e) {
  return ua.has(e) || (ua.add(e), console.error("Missing ISIKO translation: " + Ge + ":" + e)), Ir && (Ir.documentElement.dataset.i18nError = e), "⟦" + e + "⟧";
}
function v(e, t = {}) {
  return (Object.prototype.hasOwnProperty.call(nn, e) && typeof nn[e] == "string" ? nn[e] : _n(e)).replace(/\{([a-zA-Z]\w*)\}/g, (n, a) => Object.prototype.hasOwnProperty.call(t, a) ? String(t[a]) : _n(e + "." + a));
}
function an(e, t) {
  const r = Nt[e];
  return typeof r == "string" && /^\/(?!\/)[a-zA-Z0-9/_-]*\/$/.test(r) ? r : !Rr && Ge === "pl" ? t : (_n(e), "#");
}
var vs = /* @__PURE__ */ C('<span class="nums lowercase text-[var(--color-text-faint)] line-through"> </span>'), _s = /* @__PURE__ */ C('<div class="mt-1 flex items-baseline gap-1.5 whitespace-nowrap text-[10px] uppercase tracking-wide text-[var(--color-text-faint)]"> <span class="nums text-[var(--color-text-muted)]"> </span><!></div>'), ps = /* @__PURE__ */ C('<div class="flex items-baseline gap-1.5 whitespace-nowrap"><span> </span> <span class="text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-faint)]"> </span></div> <!>', 1), hs = /* @__PURE__ */ C("<span> </span>"), ms = /* @__PURE__ */ C('<div class="min-w-0"><!></div>');
function gs(e, t) {
  Hr(t, !0);
  const r = Pt(t, "gross", 3, null), n = Pt(t, "net", 3, null), a = Pt(t, "baseGross", 3, null), o = Pt(t, "size", 3, "md"), l = (g) => g == null ? "—" : Ge === "pl" ? g.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " zł" : g.toLocaleString(Ge, { style: "currency", currency: "PLN" }), i = { sm: "text-[14px]", md: "text-[16px]", lg: "text-[20px]" }, s = /* @__PURE__ */ Te(() => a() != null && r() != null && a() > r()), u = /* @__PURE__ */ Te(() => n() != null && n() > 0);
  var _ = ms(), y = c(_);
  {
    var h = (g) => {
      var k = ps(), m = Zt(k), x = c(m), B = c(x), O = f(x, 2), V = c(O), se = f(m, 2);
      {
        var he = (R) => {
          var re = _s(), fe = c(re), D = f(fe), Pe = c(D), $e = f(D);
          {
            var or = (Ne) => {
              var et = vs(), St = c(et);
              P((ir) => p(St, ir), [() => l(a())]), q(Ne, et);
            };
            ce($e, (Ne) => {
              d(s) && Ne(or);
            });
          }
          P(
            (Ne, et) => {
              p(fe, `${Ne ?? ""} `), p(Pe, et);
            },
            [() => v("demo.gross"), () => l(r())]
          ), q(R, re);
        };
        ce(se, (R) => {
          r() != null && R(he);
        });
      }
      P(
        (R, re) => {
          zt(x, 1, `nums font-semibold leading-none tracking-tight ${i[o()] ?? ""} ${d(s) ? "text-[var(--color-danger)]" : "text-[var(--color-text)]"}`), p(B, R), p(V, re);
        },
        [() => l(n()), () => v("demo.net")]
      ), q(g, k);
    }, b = (g) => {
      var k = hs(), m = c(k);
      P(
        (x) => {
          zt(k, 1, `font-semibold leading-none ${i[o()] ?? ""} text-[var(--color-text-muted)]`), p(m, x);
        },
        [() => v("demo.price_on_request")]
      ), q(g, k);
    };
    ce(y, (g) => {
      d(u) ? g(h) : g(b, -1);
    });
  }
  q(e, _), Ur();
}
const mt = [
  { id: 1, name: v("demo.product.1.name"), sku: "DEMO-BUT-750", category: v("demo.product.1.category"), netCents: 3200, stock_available: 120, min_qty: 5, qty_multiple: 5, image_url: "/assets/demo/bottle.png", description: v("demo.product.1.description") },
  { id: 2, name: v("demo.product.2.name"), sku: "DEMO-KUB-300", category: v("demo.product.2.category"), netCents: 1400, stock_available: 36, min_qty: 6, qty_multiple: 6, image_url: "/assets/demo/mug.png", description: v("demo.product.2.description") },
  { id: 3, name: v("demo.product.3.name"), sku: "DEMO-NOT-A5", category: v("demo.product.3.category"), netCents: 1e3, stock_available: 200, min_qty: 10, qty_multiple: 10, image_url: "/assets/demo/notebook.png", description: v("demo.product.3.description") }
].map((e) => ({ ...e, price_net: e.netCents / 100, price_gross: Math.round(e.netCents * 1.23) / 100, in_stock: !0 }));
function Qt(e, t) {
  const r = Number(t);
  if (!Number.isFinite(r)) return e.min_qty;
  const n = Math.floor(e.stock_available / e.qty_multiple) * e.qty_multiple;
  return Math.min(n, Math.max(e.min_qty, Math.ceil(r / e.qty_multiple) * e.qty_multiple));
}
function lo(e) {
  const t = e.reduce((n, a) => {
    const o = mt.find((l) => l.id === a.id);
    return n + (o ? o.netCents * Qt(o, a.qty) : 0);
  }, 0), r = Math.round(t * 23 / 100);
  return { net: t, vat: r, gross: t + r };
}
const ht = (e) => (e / 100).toLocaleString(Ge, { style: "currency", currency: "PLN" }), ca = 5;
function ys(e, t, r) {
  const n = t && t > 0 ? t : 1, a = r && r > 1 ? r : 1;
  let o = Math.max(n, Math.ceil(Number(e) || 0));
  return a > 1 && (o = Math.ceil(o / a) * a), o;
}
class bs {
  #e;
  get items() {
    return d(this.#e);
  }
  set items(t) {
    M(this.#e, t, !0);
  }
  constructor() {
    this.#e = /* @__PURE__ */ G(yt([]));
  }
  persist() {
  }
  add(t, r) {
    if (t = mt.find((i) => i.id === t?.id), !t) return;
    r = Qt(t, r ?? t.min_qty);
    const n = t.qty_multiple ?? ca, a = t.min_qty ?? t.qty_multiple ?? ca, o = r ?? a, l = this.items.find((i) => i.id === t.id);
    l ? l.qty = Qt(t, l.qty + o) : this.items.push({
      id: t.id,
      name: t.name,
      sku: t.sku,
      price_gross: t.price_gross ?? null,
      price_net: t.price_net ?? null,
      qty: ys(o, a, n),
      min_qty: a,
      qty_multiple: n,
      units_per_carton: t.units_per_carton ?? null
    }), this.persist();
  }
  setQty(t, r) {
    const n = this.items.find((o) => o.id === t);
    if (!n) return;
    const a = mt.find((o) => o.id === t);
    a && (n.qty = Qt(a, r), this.persist());
  }
  remove(t) {
    this.items = this.items.filter((r) => r.id !== t), this.persist();
  }
  clear() {
    this.items = [], this.persist();
  }
  // Aktualizuj ceny pozycji świeżymi cenami kontraktowymi z serwera (checkout_summary.lines).
  // Naprawia „zamrożony" snapshot ceny (np. 18,15 dodane z ulubionych przed fixem) BEZ
  // re-dodawania przez klienta — koszyk sam pokaże aktualną cenę cennika (17,90).
  syncPrices(t) {
    if (!Array.isArray(t) || !t.length) return;
    const r = new Map(t.map((a) => [a.product_id, a]));
    let n = !1;
    for (const a of this.items) {
      const o = r.get(a.id);
      o && (o.price_net != null && o.price_net !== a.price_net && (a.price_net = o.price_net, n = !0), o.price_gross != null && o.price_gross !== a.price_gross && (a.price_gross = o.price_gross, n = !0));
    }
    n && this.persist();
  }
  get count() {
    return this.items.reduce((t, r) => t + r.qty, 0);
  }
  get totals() {
    const t = lo(this.items);
    return { net: t.net / 100, vat: t.vat / 100, gross: t.gross / 100 };
  }
}
const xe = new bs(), da = { has: () => !1 }, ws = { success: () => {
} };
var xs = /* @__PURE__ */ C("<button><!></button>"), ks = /* @__PURE__ */ C('<img loading="lazy" width="1254" height="1254"/>'), zs = /* @__PURE__ */ C('<span class="text-[var(--color-text-faint)] opacity-50"><!></span>'), Es = /* @__PURE__ */ C('<span class="absolute left-2 top-2 rounded bg-[var(--color-danger)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-[var(--shadow-sm)]"> </span>'), Ms = /* @__PURE__ */ C('<span class="absolute left-2 top-2 rounded bg-[var(--color-accent)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-[var(--shadow-sm)]"> </span>'), Ss = /* @__PURE__ */ C('<span class="nums shrink-0 rounded border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-1.5 py-1 text-[10px] font-semibold text-[var(--color-text-secondary)]"> </span>'), Ts = /* @__PURE__ */ C('<div class="nums mt-1 text-[11px] text-[var(--color-text-muted)]"> </div>'), As = /* @__PURE__ */ C('<a class="group relative flex h-full flex-col rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] p-3.5 text-inherit no-underline shadow-[var(--shadow-sm)] transition-all duration-150 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-md)]"><!> <div class="relative mb-2.5 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[var(--radius-sm)] bg-white"><!>  <!> <!></div> <div class="mb-2 flex items-center justify-between gap-2"><span style="max-width:62%; text-transform:uppercase;" class="truncate rounded bg-[var(--color-dark)] px-2 py-1 text-[10px] font-bold tracking-wide text-white"> </span> <!></div> <div class="line-clamp-2 min-h-[34px] text-[13px] font-semibold leading-snug text-[var(--color-text)]"> </div> <!> <div class="mt-auto flex items-end justify-between gap-2 border-t border-[var(--color-border-soft)] pt-2.5"><div class="min-w-0"><!></div> <div class="flex shrink-0 items-center gap-1"><input type="number" class="nums h-9 w-12 rounded border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-1.5 text-center text-[13px] focus:border-[var(--color-accent)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-40"/> <button><!></button></div></div></a>');
function js(e, t) {
  Hr(t, !0);
  const r = Pt(t, "showFav", 3, !0), n = /* @__PURE__ */ Te(() => {
    const w = t.product.thumbnail_url || t.product.primary_image || t.product.image_url || t.product.thumbnail || t.product.images?.[0]?.url || t.product.images?.[0]?.image_url || null;
    if (!w) return null;
    let z = String(w);
    return z.startsWith("http://") && (z = "https://" + z.slice(7)), z;
  });
  let a = /* @__PURE__ */ G(!1);
  const o = /* @__PURE__ */ Te(() => t.product.unlimited_stock === !0 || t.product.in_stock !== !1 && t.product.stock_available !== 0), l = /* @__PURE__ */ Te(() => t.product.discount_base_gross != null && t.product.price_gross != null && Number(t.product.discount_base_gross) > Number(t.product.price_gross));
  let i = /* @__PURE__ */ G(!1), s = /* @__PURE__ */ G(yt(
    t.product.qty_multiple ?? t.product.min_qty ?? 5
    // default wielokrotność 5 szt (W2W global)
  ));
  const u = /* @__PURE__ */ Te(() => t.product.min_qty ?? t.product.qty_multiple ?? 5), _ = /* @__PURE__ */ Te(() => t.product.qty_multiple ?? 5);
  function y() {
    M(s, Qt(t.product, d(s)), !0);
  }
  function h(w) {
    w.preventDefault(), w.stopPropagation(), !(!t.product?.id || !d(
      o
      // brak ID / niedostępny = nie dodajemy
    )) && (y(), xe.add(t.product, d(
      s
      // qty po clampie = dokładnie to, co wyląduje w koszyku
    )), M(i, !0), ws.success(v("demo.card_added", { count: d(s) })), setTimeout(() => M(i, !1), 1200));
  }
  const b = /* @__PURE__ */ Te(() => da.has(t.product));
  let g = /* @__PURE__ */ G(!1);
  async function k(w) {
    if (w.preventDefault(), w.stopPropagation(), !d(g)) {
      M(g, !0);
      try {
        await da.toggle(t.product);
      } catch (z) {
        z?.status === 401 && window.location.assign("/login?redirectTo=" + encodeURIComponent(location.pathname));
      } finally {
        M(g, !1);
      }
    }
  }
  var m = As(), x = c(m);
  {
    var B = (w) => {
      var z = xs(), le = c(z);
      Jt(le, { name: "heart", size: 15 }), P(
        (rt, ur) => {
          S(z, "title", rt), S(z, "aria-label", ur), S(z, "aria-pressed", d(b)), z.disabled = d(g), zt(z, 1, `absolute right-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-card)]/90 shadow-[var(--shadow-sm)] transition-all hover:scale-110 active:scale-90 disabled:opacity-50 ${d(b) ? "text-[var(--color-accent)] [&_svg]:fill-current" : "text-[var(--color-text-faint)] hover:text-[var(--color-accent)]"}`);
        },
        [
          () => d(b) ? v("demo.favorite_remove") : v("demo.favorite_add"),
          () => d(b) ? v("demo.favorite_remove") : v("demo.favorite_add")
        ]
      ), K("click", z, k), q(w, z);
    };
    ce(x, (w) => {
      r() && w(B);
    });
  }
  var O = f(x, 2), V = c(O);
  {
    var se = (w) => {
      var z = ks();
      P(() => {
        S(z, "src", d(n)), S(z, "alt", t.product.name), zt(z, 1, `h-full w-full object-contain p-2 ${d(o) ? "" : "opacity-40 grayscale"}`);
      }), to("error", z, () => M(a, !0)), q(w, z);
    }, he = (w) => {
      var z = zs(), le = c(z);
      Jt(le, { name: "cart", size: 32 }), q(w, z);
    };
    ce(V, (w) => {
      d(n) && !d(a) ? w(se) : w(he, -1);
    });
  }
  var R = f(V, 2);
  {
    var re = (w) => {
      var z = Es(), le = c(z);
      P((rt) => p(le, rt), [() => v("demo.unavailable")]), q(w, z);
    };
    ce(R, (w) => {
      d(o) || w(re);
    });
  }
  var fe = f(R, 2);
  {
    var D = (w) => {
      var z = Ms(), le = c(z);
      P((rt) => p(le, rt), [() => v("demo.promotion")]), q(w, z);
    };
    ce(fe, (w) => {
      d(l) && d(o) && w(D);
    });
  }
  var Pe = f(O, 2), $e = c(Pe), or = c($e), Ne = f($e, 2);
  {
    var et = (w) => {
      var z = Ss(), le = c(z);
      P(() => p(le, `${t.product.nicotine_mg ?? ""} mg`)), q(w, z);
    };
    ce(Ne, (w) => {
      t.product.nicotine_mg != null && w(et);
    });
  }
  var St = f(Pe, 2), ir = c(St), Sr = f(St, 2);
  {
    var sr = (w) => {
      var z = Ts(), le = c(z);
      P(() => p(le, `${t.product.capacity_ml ?? ""} ml`)), q(w, z);
    };
    ce(Sr, (w) => {
      t.product.capacity_ml != null && w(sr);
    });
  }
  var Tr = f(Sr, 2), lr = c(Tr), Wr = c(lr);
  {
    let w = /* @__PURE__ */ Te(() => t.product.price_gross ?? t.product.base_price);
    gs(Wr, {
      get net() {
        return t.product.price_net;
      },
      get gross() {
        return d(w);
      },
      get baseGross() {
        return t.product.discount_base_gross;
      },
      size: "md"
    });
  }
  var Zr = f(lr, 2), me = c(Zr), tt = f(me, 2), Ar = c(tt);
  Jt(Ar, { name: "plus", size: 14 }), P(
    (w, z, le, rt, ur) => {
      S(m, "href", `#produkt-${t.product.id ?? ""}`), p(or, w), p(ir, t.product.name), S(me, "min", d(u)), S(me, "max", t.product.stock_available), S(me, "step", d(_)), me.disabled = !d(o), S(me, "aria-label", z), S(me, "title", le), S(tt, "title", rt), S(tt, "aria-label", ur), tt.disabled = !d(o), zt(tt, 1, `flex h-9 w-9 shrink-0 items-center justify-center rounded text-white transition-all hover:scale-105 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 ${d(i) ? "bg-[var(--color-success)]" : "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)]"}`);
    },
    [
      () => t.product.manufacturer || v("demo.manufacturer"),
      () => v("demo.product_quantity", { name: t.product.name }),
      () => v("demo.package_help", { count: d(_) }),
      () => d(o) ? v("demo.add_cart") : v("demo.unavailable"),
      () => v("demo.add_product", { name: t.product.name })
    ]
  ), K("click", m, (w) => {
    t.onOpen && (w.preventDefault(), t.onOpen());
  }), K("change", me, y), K("mousedown", me, (w) => w.stopPropagation()), K("click", me, (w) => {
    w.preventDefault(), w.stopPropagation();
  }), so(me, () => d(s), (w) => M(s, w)), K("click", tt, h), q(e, m), Ur();
}
ro(["click", "change", "mousedown"]);
var qs = /* @__PURE__ */ C('<div class="demo-notice" role="status"> <button>×</button></div>'), Os = /* @__PURE__ */ C("<option> </option>"), Cs = /* @__PURE__ */ C('<div class="product-grid"></div>'), Ps = /* @__PURE__ */ C('<div class="empty"><h2> </h2><p> </p><button class="primary"> </button></div>'), Ns = /* @__PURE__ */ C('<div class="catalog-heading"><div><p class="account-line"> </p><h1> </h1><p> </p></div><span class="catalog-count"> </span></div> <div class="catalog-tools"><label class="demo-search"><!><input type="search"/></label><label class="category-label"> <select><option> </option><!></select></label></div> <!> <div class="shop-facts"><div><strong> </strong><p> </p></div><div><strong> </strong><p> </p></div><div><strong> </strong><p> </p></div></div>', 1), Ds = /* @__PURE__ */ C('<article class="cart-item"><img width="1254" height="1254"/><div><h2> </h2><small> </small><p> </p></div><label> <input type="number"/></label><strong> <small> </small></strong><button class="remove">×</button></article>'), Ls = /* @__PURE__ */ C('<div class="cart-layout"><div class="cart-items"></div><aside class="cart-summary"><h2> </h2><dl><div><dt> </dt><dd> </dd></div><div><dt> </dt><dd> </dd></div><div class="total"><dt> </dt><dd> </dd></div></dl><p> </p><button class="primary"> </button></aside></div>'), Is = /* @__PURE__ */ C('<div class="empty"><!><h2> </h2><p> </p><button class="primary"> </button></div>'), Rs = /* @__PURE__ */ C('<div class="catalog-heading"><div><p class="account-line"> </p><h1> </h1><p> </p></div><button class="secondary"> </button></div> <!>', 1), Fs = /* @__PURE__ */ C("<p> </p>"), Bs = /* @__PURE__ */ C('<details><summary><strong> </strong><span> </span><span class="demo-status"> </span><b> </b></summary><div class="order-detail"><p> </p><!><button class="secondary"> </button></div></details>'), Hs = /* @__PURE__ */ C('<div class="order-list"></div>'), Us = /* @__PURE__ */ C('<div class="empty"><h2> </h2><p> </p><button class="primary"> </button></div>'), Ks = /* @__PURE__ */ C('<div class="catalog-heading"><div><p class="account-line"> </p><h1> </h1><p> </p></div><button class="secondary"> </button></div> <!>', 1), Vs = /* @__PURE__ */ C('<button class="dialog-close">×</button><div class="product-detail"><img width="1254" height="1254"/><div><p class="account-line"> </p><h2> </h2><p> </p><strong> <small> </small></strong><p> <br/> <br/> </p><button class="primary"> </button></div></div>', 1), Ws = /* @__PURE__ */ C('<div class="demo-banner"><span><strong> </strong> </span><a> </a></div> <header class="shop-head"><a class="dopina-brand">dopina<span>B2B</span></a><nav><button> </button><button> <span> </span></button></nav><button class="cart-button"><!><span> </span><b> </b></button></header> <main class="shop-main"><!> <!></main> <footer class="shop-footer"><span> </span><a> </a><p> </p></footer> <dialog class="product-dialog"><!></dialog> <dialog class="checkout-dialog"><button class="dialog-close">×</button><p class="account-line"> </p><h2> </h2><p> <br/> </p><label> <select><option> </option><option> </option></select></label><p> </p><div class="checkout-total"> <strong> </strong></div><p class="demo-note"> </p><button class="primary"> </button></dialog>', 1);
function Zs(e, t) {
  Hr(t, !0);
  let r = /* @__PURE__ */ G("catalog"), n = /* @__PURE__ */ G(""), a = /* @__PURE__ */ G(""), o = /* @__PURE__ */ G(null), l, i, s = /* @__PURE__ */ G(yt([])), u = /* @__PURE__ */ G("courier"), _ = /* @__PURE__ */ G("");
  const y = /* @__PURE__ */ Te(() => mt.filter((E) => (d(a) === "" || E.category === d(a)) && `${E.name} ${E.sku}`.toLocaleLowerCase(Ge).includes(d(n).toLocaleLowerCase(Ge)))), h = /* @__PURE__ */ Te(() => lo(xe.items));
  function b(E) {
    M(o, E, !0), l.showModal();
  }
  function g(E, F) {
    const J = mt.find((ee) => ee.id === E), $ = Qt(J, F.value);
    xe.setQty(E, $), F.value = String($);
  }
  function k() {
    if (!xe.items.length) return;
    const E = {
      number: `DEMO/${String(d(s).length + 1).padStart(3, "0")}`,
      date: (/* @__PURE__ */ new Date()).toLocaleDateString(Ge),
      items: xe.items.map((F) => ({ ...F })),
      total: d(h).gross,
      delivery: d(u)
    };
    M(s, [E, ...d(s)], !0), xe.clear(), i.close(), M(r, "orders"), M(_, v("demo.order_created", { number: E.number }), !0);
  }
  var m = Ws();
  es("1cja33o", (E) => {
    Pi(
      (F) => {
        Pa.title = F ?? "";
      },
      [() => v("demo.title")]
    );
  });
  var x = Zt(m), B = c(x), O = c(B), V = c(O), se = f(O), he = f(B), R = c(he), re = f(x, 2), fe = c(re), D = f(fe), Pe = c(D);
  let $e;
  var or = c(Pe), Ne = f(Pe);
  let et;
  var St = c(Ne), ir = f(St), Sr = c(ir), sr = f(D), Tr = c(sr);
  Jt(Tr, { name: "cart", size: 19 });
  var lr = f(Tr), Wr = c(lr), Zr = f(lr), me = c(Zr), tt = f(re, 2), Ar = c(tt);
  {
    var w = (E) => {
      var F = qs(), J = c(F), $ = f(J);
      P(
        (ee) => {
          p(J, d(_)), S($, "aria-label", ee);
        },
        [() => v("demo.close_notice")]
      ), K("click", $, () => M(_, "")), q(E, F);
    };
    ce(Ar, (E) => {
      d(_) && E(w);
    });
  }
  var z = f(Ar, 2);
  {
    var le = (E) => {
      var F = Ns(), J = Zt(F), $ = c(J), ee = c($), nt = c(ee), ge = f(ee), at = c(ge), Be = f(ge), ot = c(Be), Ee = f($), it = c(Ee), De = f(J, 2), Le = c(De), He = c(Le);
      Jt(He, { name: "search", size: 18 });
      var L = f(He), H = f(Le), U = c(H), I = f(U), Q = c(I), ae = c(Q);
      Q.value = Q.__value = "";
      var oe = f(Q);
      pr(oe, 17, () => [...new Set(mt.map((W) => W.category))], Pr, (W, Z) => {
        var N = Os(), be = c(N), we = {};
        P(() => {
          p(be, d(Z)), we !== (we = d(Z)) && (N.__value = d(Z));
        }), q(W, N);
      });
      var ie = f(De, 2);
      {
        var ue = (W) => {
          var Z = Cs();
          pr(Z, 21, () => d(y), (N) => N.id, (N, be) => {
            js(N, {
              get product() {
                return d(be);
              },
              showFav: !1,
              onOpen: () => b(d(be))
            });
          }), q(W, Z);
        }, ye = (W) => {
          var Z = Ps(), N = c(Z), be = c(N), we = f(N), ft = c(we), lt = f(we), qt = c(lt);
          P(
            (vt, fr, vr) => {
              p(be, vt), p(ft, fr), p(qt, vr);
            },
            [
              () => v("demo.no_product"),
              () => v("demo.no_product_help"),
              () => v("demo.show_all")
            ]
          ), K("click", lt, () => {
            M(n, ""), M(a, "");
          }), q(W, Z);
        };
        ce(ie, (W) => {
          d(y).length ? W(ue) : W(ye, -1);
        });
      }
      var ve = f(ie, 2), Me = c(ve), st = c(Me), dt = c(st), cr = f(st), Ut = c(cr), Kt = f(Me), Tt = c(Kt), At = c(Tt), dr = f(Tt), Ue = c(dr), Ke = f(Kt), Ve = c(Ke), jt = c(Ve), Vt = f(Ve), Xr = c(Vt);
      P(
        (W, Z, N, be, we, ft, lt, qt, vt, fr, vr, $r, qr, Or) => {
          p(nt, W), p(at, Z), p(ot, N), p(it, be), S(L, "placeholder", we), S(L, "aria-label", ft), p(U, lt), p(ae, qt), p(dt, vt), p(Ut, fr), p(At, vr), p(Ue, $r), p(jt, qr), p(Xr, Or);
        },
        [
          () => v("demo.account"),
          () => v("demo.catalog_heading"),
          () => v("demo.catalog_intro"),
          () => v("demo.product_count"),
          () => v("demo.search_placeholder"),
          () => v("demo.search_label"),
          () => v("demo.category"),
          () => v("demo.all"),
          () => v("demo.terms"),
          () => v("demo.terms_help"),
          () => v("demo.next_step"),
          () => v("demo.next_step_help"),
          () => v("demo.no_personal_data"),
          () => v("demo.no_personal_data_help")
        ]
      ), so(L, () => d(n), (W) => M(n, W)), oa(I, () => d(a), (W) => M(a, W)), q(E, F);
    }, rt = (E) => {
      var F = Rs(), J = Zt(F), $ = c(J), ee = c($), nt = c(ee), ge = f(ee), at = c(ge), Be = f(ge), ot = c(Be), Ee = f($), it = c(Ee), De = f(J, 2);
      {
        var Le = (L) => {
          var H = Ls(), U = c(H);
          pr(U, 21, () => xe.items, Pr, (W, Z) => {
            const N = /* @__PURE__ */ Te(() => mt.find((_r) => _r.id === d(Z).id));
            var be = Ds(), we = c(be), ft = f(we), lt = c(ft), qt = c(lt), vt = f(lt), fr = c(vt), vr = f(vt), $r = c(vr), qr = f(ft), Or = c(qr), Wt = f(Or), Kn = f(qr), Vn = c(Kn), Mo = f(Vn), So = c(Mo), Wn = f(Kn);
            P(
              (_r, To, Ao, jo, qo, Oo, Co, Po) => {
                S(we, "src", d(N).image_url), S(we, "alt", d(N).name), p(qt, d(Z).name), p(fr, `${d(N).sku ?? ""} · ${_r ?? ""}`), p($r, `${To ?? ""} ${Ao ?? ""}`), p(Or, jo), ls(Wt, d(Z).qty), S(Wt, "min", d(N).min_qty), S(Wt, "step", d(N).qty_multiple), S(Wt, "max", d(N).stock_available), S(Wt, "aria-label", qo), p(Vn, Oo), p(So, Co), S(Wn, "aria-label", Po);
              },
              [
                () => v("demo.package", { count: d(N).qty_multiple }),
                () => ht(d(N).netCents),
                () => v("demo.net_per_unit"),
                () => v("demo.quantity"),
                () => v("demo.cart_quantity", { name: d(N).name }),
                () => ht(d(N).netCents * d(Z).qty),
                () => v("demo.net"),
                () => v("demo.remove", { name: d(N).name })
              ]
            ), to("blur", Wt, (_r) => g(d(Z).id, _r.currentTarget)), K("click", Wn, () => xe.remove(d(Z).id)), q(W, be);
          });
          var I = f(U), Q = c(I), ae = c(Q), oe = f(Q), ie = c(oe), ue = c(ie), ye = c(ue), ve = f(ue), Me = c(ve), st = f(ie), dt = c(st), cr = c(dt), Ut = f(dt), Kt = c(Ut), Tt = f(st), At = c(Tt), dr = c(At), Ue = f(At), Ke = c(Ue), Ve = f(oe), jt = c(Ve), Vt = f(Ve), Xr = c(Vt);
          P(
            (W, Z, N, be, we, ft, lt, qt, vt) => {
              p(ae, W), p(ye, Z), p(Me, N), p(cr, be), p(Kt, we), p(dr, ft), p(Ke, lt), p(jt, qt), p(Xr, vt);
            },
            [
              () => v("demo.summary"),
              () => v("demo.products_net"),
              () => ht(d(h).net),
              () => v("demo.tax"),
              () => ht(d(h).vat),
              () => v("demo.total_gross"),
              () => ht(d(h).gross),
              () => v("demo.transport_help"),
              () => v("demo.go_summary")
            ]
          ), K("click", Vt, () => i.showModal()), q(L, H);
        }, He = (L) => {
          var H = Is(), U = c(H);
          Jt(U, { name: "cart", size: 35 });
          var I = f(U), Q = c(I), ae = f(I), oe = c(ae), ie = f(ae), ue = c(ie);
          P(
            (ye, ve, Me) => {
              p(Q, ye), p(oe, ve), p(ue, Me);
            },
            [
              () => v("demo.empty_cart"),
              () => v("demo.empty_cart_help"),
              () => v("demo.go_catalog")
            ]
          ), K("click", ie, () => M(r, "catalog")), q(L, H);
        };
        ce(De, (L) => {
          xe.items.length ? L(Le) : L(He, -1);
        });
      }
      P(
        (L, H, U, I) => {
          p(nt, L), p(at, H), p(ot, U), p(it, I);
        },
        [
          () => v("demo.order_example"),
          () => v("demo.your_cart"),
          () => v("demo.cart_help"),
          () => v("demo.back_catalog")
        ]
      ), K("click", Ee, () => M(r, "catalog")), q(E, F);
    }, ur = (E) => {
      var F = Ks(), J = Zt(F), $ = c(J), ee = c($), nt = c(ee), ge = f(ee), at = c(ge), Be = f(ge), ot = c(Be), Ee = f($), it = c(Ee), De = f(J, 2);
      {
        var Le = (L) => {
          var H = Hs();
          pr(H, 21, () => d(s), Pr, (U, I) => {
            var Q = Bs(), ae = c(Q), oe = c(ae), ie = c(oe), ue = f(oe), ye = c(ue), ve = f(ue), Me = c(ve), st = f(ve), dt = c(st), cr = f(ae), Ut = c(cr), Kt = c(Ut), Tt = f(Ut);
            pr(Tt, 17, () => d(I).items, Pr, (Ue, Ke) => {
              var Ve = Fs(), jt = c(Ve);
              P((Vt) => p(jt, Vt), [
                () => v("demo.order_item", { name: d(Ke).name, count: d(Ke).qty })
              ]), q(Ue, Ve);
            });
            var At = f(Tt), dr = c(At);
            P(
              (Ue, Ke, Ve, jt) => {
                p(ie, d(I).number), p(ye, d(I).date), p(Me, Ue), p(dt, Ke), p(Kt, Ve), p(dr, jt);
              },
              [
                () => v("demo.example_status"),
                () => ht(d(I).total),
                () => v("demo.delivery_summary", { delivery: v("demo." + d(I).delivery) }),
                () => v("demo.repeat_order")
              ]
            ), K("click", At, () => {
              for (const Ue of d(I).items) xe.add(mt.find((Ke) => Ke.id === Ue.id), Ue.qty);
              M(r, "cart");
            }), q(U, Q);
          }), q(L, H);
        }, He = (L) => {
          var H = Us(), U = c(H), I = c(U), Q = f(U), ae = c(Q), oe = f(Q), ie = c(oe);
          P(
            (ue, ye, ve) => {
              p(I, ue), p(ae, ye), p(ie, ve);
            },
            [
              () => v("demo.no_orders"),
              () => v("demo.no_orders_help"),
              () => v("demo.open_catalog")
            ]
          ), K("click", oe, () => M(r, "catalog")), q(L, H);
        };
        ce(De, (L) => {
          d(s).length ? L(Le) : L(He, -1);
        });
      }
      P(
        (L, H, U, I) => {
          p(nt, L), p(at, H), p(ot, U), p(it, I);
        },
        [
          () => v("demo.history"),
          () => v("demo.demo_orders"),
          () => v("demo.orders_help"),
          () => v("demo.new_order")
        ]
      ), K("click", Ee, () => M(r, "catalog")), q(E, F);
    };
    ce(z, (E) => {
      d(r) === "catalog" ? E(le) : d(r) === "cart" ? E(rt, 1) : E(ur, -1);
    });
  }
  var An = f(tt, 2), jn = c(An), uo = c(jn), Gr = f(jn), co = c(Gr), fo = f(Gr), vo = c(fo), Yr = f(An, 2), _o = c(Yr);
  {
    var po = (E) => {
      var F = Vs(), J = Zt(F), $ = f(J), ee = c($), nt = f(ee), ge = c(nt), at = c(ge), Be = f(ge), ot = c(Be), Ee = f(Be), it = c(Ee), De = f(Ee), Le = c(De), He = f(Le), L = c(He), H = f(De), U = c(H), I = f(U, 2, !0), Q = f(I, 2, !0), ae = f(H), oe = c(ae);
      P(
        (ie, ue, ye, ve, Me, st, dt) => {
          S(J, "aria-label", ie), S(ee, "src", d(o).image_url), S(ee, "alt", d(o).name), p(at, d(o).sku), p(ot, d(o).name), p(it, d(o).description), p(Le, `${ue ?? ""} `), p(L, ye), p(U, ve), p(I, Me), p(Q, st), p(oe, dt);
        },
        [
          () => v("demo.close_product"),
          () => ht(d(o).netCents),
          () => v("demo.net_per_unit"),
          () => v("demo.available", { count: d(o).stock_available }),
          () => v("demo.minimum", { count: d(o).min_qty }),
          () => v("demo.multiple", { count: d(o).qty_multiple }),
          () => v("demo.add_package")
        ]
      ), K("click", J, () => l.close()), K("click", ae, () => {
        xe.add(d(o)), l.close(), M(_, v("demo.product_added", { count: d(o).min_qty, name: d(o).name }), !0);
      }), q(E, F);
    };
    ce(_o, (E) => {
      d(o) && E(po);
    });
  }
  la(Yr, (E) => l = E, () => l);
  var qn = f(Yr, 2), Jr = c(qn), On = f(Jr), ho = c(On), Cn = f(On), mo = c(Cn), Pn = f(Cn), Nn = c(Pn), go = f(Nn, 2, !0), Dn = f(Pn), Ln = c(Dn), In = f(Ln), jr = c(In), yo = c(jr);
  jr.value = jr.__value = "courier";
  var Qr = f(jr), bo = c(Qr);
  Qr.value = Qr.__value = "pickup";
  var Rn = f(Dn), wo = c(Rn), Fn = f(Rn), Bn = c(Fn), xo = f(Bn), ko = c(xo), Hn = f(Fn), zo = c(Hn), Un = f(Hn), Eo = c(Un);
  la(qn, (E) => i = E, () => i), P(
    (E, F, J, $, ee, nt, ge, at, Be, ot, Ee, it, De, Le, He, L, H, U, I, Q, ae, oe, ie, ue, ye, ve, Me) => {
      p(V, E), p(se, ` · ${F ?? ""}`), S(he, "href", J), p(R, $), S(fe, "href", ee), S(D, "aria-label", nt), $e = zt(Pe, 1, "", null, $e, { active: d(r) === "catalog" }), p(or, ge), et = zt(Ne, 1, "", null, et, { active: d(r) === "orders" }), p(St, `${at ?? ""} `), p(Sr, d(s).length), S(sr, "aria-label", Be), p(Wr, ot), p(me, xe.count), p(uo, Ee), S(Gr, "href", it), p(co, De), p(vo, Le), S(Jr, "aria-label", He), p(ho, L), p(mo, H), p(Nn, U), p(go, I), p(Ln, Q), p(yo, ae), p(bo, oe), p(wo, ie), p(Bn, `${ue ?? ""} `), p(ko, ye), p(zo, ve), p(Eo, Me);
    },
    [
      () => v("demo.brand"),
      () => v("demo.banner"),
      () => an("b2bUrl", "/rozwiazania/dopina-b2b/"),
      () => v("demo.back_offer"),
      () => an("dopinaUrl", "/dopina/"),
      () => v("demo.navigation"),
      () => v("demo.catalog"),
      () => v("demo.orders"),
      () => v("demo.cart_count", { count: xe.count }),
      () => v("demo.cart"),
      () => v("demo.footer"),
      () => an("b2bUrl", "/rozwiazania/dopina-b2b/"),
      () => v("demo.contact"),
      () => v("demo.footer_help"),
      () => v("demo.close_summary"),
      () => v("demo.last_step"),
      () => v("demo.confirm_heading"),
      () => v("demo.recipient"),
      () => v("demo.address_help"),
      () => v("demo.delivery"),
      () => v("demo.courier"),
      () => v("demo.pickup"),
      () => v("demo.payment_help"),
      () => v("demo.total_gross"),
      () => ht(d(h).gross),
      () => v("demo.confirm_help"),
      () => v("demo.create_order")
    ]
  ), K("click", Pe, () => M(r, "catalog")), K("click", Ne, () => M(r, "orders")), K("click", sr, () => M(r, "cart")), K("click", Jr, () => i.close()), oa(In, () => d(u), (E) => M(u, E)), K("click", Un, k), q(e, m), Ur();
}
ro(["click"]);
Wi(Zs, { target: document.getElementById("demo-app") });
document.querySelectorAll(".language-menu").forEach((e) => {
  document.addEventListener("keydown", (t) => {
    t.key === "Escape" && e.open && (e.open = !1, e.querySelector("summary").focus());
  }), document.addEventListener("pointerdown", (t) => {
    e.open && !e.contains(t.target) && (e.open = !1);
  });
});
document.querySelectorAll("[data-language-link]").forEach((e) => {
  const t = new URL(e.href, location.href);
  t.origin === location.origin && (t.search = location.search, t.hash = location.hash, e.href = t.href);
});
