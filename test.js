function stackBlurImage(t, e, r, i) {
    var a = document.getElementById(t),
        n = a.naturalWidth,
        o = a.naturalHeight,
        c = document.getElementById(e);
    c.style.width = n + "px", c.style.height = o + "px", c.width = n, c.height = o;
    var s = c.getContext("2d");
    s.clearRect(0, 0, n, o), s.drawImage(a, 0, 0), isNaN(r) || r < 1 || (i ? stackBlurCanvasRGBA(e, 0, 0, n, o, r) : stackBlurCanvasRGB(e, 0, 0, n, o, r))
}

function stackBlurCanvasRGBA(t, e, r, i, a, n) {
    if (!(isNaN(n) || n < 1)) {
        n |= 0;
        var o, c = t.getContext("2d");
        try {
            try {
                o = c.getImageData(e, r, i, a)
            } catch (t) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead"), o = c.getImageData(e, r, i, a)
                } catch (t) {
                    throw alert("Cannot access local image"), new Error("unable to access local image data: " + t)
                }
            }
        } catch (t) {
            throw alert("Cannot access image"), new Error("unable to access image data: " + t)
        }
        var s, h, l, u, d, f, p, x, g, v, y, m, b, w, k, C, M, A, I, _, F, S, R, P, E = o.data,
            D = n + n + 1,
            B = i - 1,
            q = a - 1,
            U = n + 1,
            G = U * (U + 1) / 2,
            O = new BlurStack,
            N = O;
        for (l = 1; l < D; l++)
            if (N = N.next = new BlurStack, l == U) var L = N;
        N.next = O;
        var z = null,
            H = null;
        p = f = 0;
        var X = mul_table[n],
            V = shg_table[n];
        for (h = 0; h < a; h++) {
            for (C = M = A = I = x = g = v = y = 0, m = U * (_ = E[f]), b = U * (F = E[f + 1]), w = U * (S = E[f + 2]), k = U * (R = E[f + 3]), x += G * _, g += G * F, v += G * S, y += G * R, N = O, l = 0; l < U; l++) N.r = _, N.g = F, N.b = S, N.a = R, N = N.next;
            for (l = 1; l < U; l++) u = f + ((B < l ? B : l) << 2), x += (N.r = _ = E[u]) * (P = U - l), g += (N.g = F = E[u + 1]) * P, v += (N.b = S = E[u + 2]) * P, y += (N.a = R = E[u + 3]) * P, C += _, M += F, A += S, I += R, N = N.next;
            for (z = O, H = L, s = 0; s < i; s++) E[f + 3] = R = y * X >> V, 0 != R ? (R = 255 / R, E[f] = (x * X >> V) * R, E[f + 1] = (g * X >> V) * R, E[f + 2] = (v * X >> V) * R) : E[f] = E[f + 1] = E[f + 2] = 0, x -= m, g -= b, v -= w, y -= k, m -= z.r, b -= z.g, w -= z.b, k -= z.a, u = p + ((u = s + n + 1) < B ? u : B) << 2, x += C += z.r = E[u], g += M += z.g = E[u + 1], v += A += z.b = E[u + 2], y += I += z.a = E[u + 3], z = z.next, m += _ = H.r, b += F = H.g, w += S = H.b, k += R = H.a, C -= _, M -= F, A -= S, I -= R, H = H.next, f += 4;
            p += i
        }
        for (s = 0; s < i; s++) {
            for (M = A = I = C = g = v = y = x = 0, m = U * (_ = E[f = s << 2]), b = U * (F = E[f + 1]), w = U * (S = E[f + 2]), k = U * (R = E[f + 3]), x += G * _, g += G * F, v += G * S, y += G * R, N = O, l = 0; l < U; l++) N.r = _, N.g = F, N.b = S, N.a = R, N = N.next;
            for (d = i, l = 1; l <= n; l++) f = d + s << 2, x += (N.r = _ = E[f]) * (P = U - l), g += (N.g = F = E[f + 1]) * P, v += (N.b = S = E[f + 2]) * P, y += (N.a = R = E[f + 3]) * P, C += _, M += F, A += S, I += R, N = N.next, l < q && (d += i);
            for (f = s, z = O, H = L, h = 0; h < a; h++) E[(u = f << 2) + 3] = R = y * X >> V, R > 0 ? (R = 255 / R, E[u] = (x * X >> V) * R, E[u + 1] = (g * X >> V) * R, E[u + 2] = (v * X >> V) * R) : E[u] = E[u + 1] = E[u + 2] = 0, x -= m, g -= b, v -= w, y -= k, m -= z.r, b -= z.g, w -= z.b, k -= z.a, u = s + ((u = h + U) < q ? u : q) * i << 2, x += C += z.r = E[u], g += M += z.g = E[u + 1], v += A += z.b = E[u + 2], y += I += z.a = E[u + 3], z = z.next, m += _ = H.r, b += F = H.g, w += S = H.b, k += R = H.a, C -= _, M -= F, A -= S, I -= R, H = H.next, f += i
        }
        c.putImageData(o, e, r)
    }
}

function stackBlurCanvasRGB(t, e, r, i, a, n) {
    if (!(isNaN(n) || n < 1)) {
        n |= 0;
        var o, c = document.getElementById(t).getContext("2d");
        try {
            try {
                o = c.getImageData(e, r, i, a)
            } catch (t) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead"), o = c.getImageData(e, r, i, a)
                } catch (t) {
                    throw alert("Cannot access local image"), new Error("unable to access local image data: " + t)
                }
            }
        } catch (t) {
            throw alert("Cannot access image"), new Error("unable to access image data: " + t)
        }
        var s, h, l, u, d, f, p, x, g, v, y, m, b, w, k, C, M, A, I, _, F = o.data,
            S = n + n + 1,
            R = i - 1,
            P = a - 1,
            E = n + 1,
            D = E * (E + 1) / 2,
            B = new BlurStack,
            q = B;
        for (l = 1; l < S; l++)
            if (q = q.next = new BlurStack, l == E) var U = q;
        q.next = B;
        var G = null,
            O = null;
        p = f = 0;
        var N = mul_table[n],
            L = shg_table[n];
        for (h = 0; h < a; h++) {
            for (w = k = C = x = g = v = 0, y = E * (M = F[f]), m = E * (A = F[f + 1]), b = E * (I = F[f + 2]), x += D * M, g += D * A, v += D * I, q = B, l = 0; l < E; l++) q.r = M, q.g = A, q.b = I, q = q.next;
            for (l = 1; l < E; l++) u = f + ((R < l ? R : l) << 2), x += (q.r = M = F[u]) * (_ = E - l), g += (q.g = A = F[u + 1]) * _, v += (q.b = I = F[u + 2]) * _, w += M, k += A, C += I, q = q.next;
            for (G = B, O = U, s = 0; s < i; s++) F[f] = x * N >> L, F[f + 1] = g * N >> L, F[f + 2] = v * N >> L, x -= y, g -= m, v -= b, y -= G.r, m -= G.g, b -= G.b, u = p + ((u = s + n + 1) < R ? u : R) << 2, x += w += G.r = F[u], g += k += G.g = F[u + 1], v += C += G.b = F[u + 2], G = G.next, y += M = O.r, m += A = O.g, b += I = O.b, w -= M, k -= A, C -= I, O = O.next, f += 4;
            p += i
        }
        for (s = 0; s < i; s++) {
            for (k = C = w = g = v = x = 0, y = E * (M = F[f = s << 2]), m = E * (A = F[f + 1]), b = E * (I = F[f + 2]), x += D * M, g += D * A, v += D * I, q = B, l = 0; l < E; l++) q.r = M, q.g = A, q.b = I, q = q.next;
            for (d = i, l = 1; l <= n; l++) f = d + s << 2, x += (q.r = M = F[f]) * (_ = E - l), g += (q.g = A = F[f + 1]) * _, v += (q.b = I = F[f + 2]) * _, w += M, k += A, C += I, q = q.next, l < P && (d += i);
            for (f = s, G = B, O = U, h = 0; h < a; h++) F[u = f << 2] = x * N >> L, F[u + 1] = g * N >> L, F[u + 2] = v * N >> L, x -= y, g -= m, v -= b, y -= G.r, m -= G.g, b -= G.b, u = s + ((u = h + E) < P ? u : P) * i << 2, x += w += G.r = F[u], g += k += G.g = F[u + 1], v += C += G.b = F[u + 2], G = G.next, y += M = O.r, m += A = O.g, b += I = O.b, w -= M, k -= A, C -= I, O = O.next, f += i
        }
        c.putImageData(o, e, r)
    }
}

function BlurStack() {
    this.r = 0, this.g = 0, this.b = 0, this.a = 0, this.next = null
}! function (t) {
    var e = function () {
        var e = 65,
            r = {
                eventName: "click",
                onShow: function () {},
                onBeforeShow: function () {},
                onHide: function () {},
                onChange: function () {},
                onSubmit: function () {},
                color: "ff0000",
                livePreview: !0,
                flat: !1
            },
            i = function (e, r) {
                var i = U(e);
                t(r).data("colorpicker").fields.eq(1).val(i.r).end().eq(2).val(i.g).end().eq(3).val(i.b).end()
            },
            a = function (e, r) {
                t(r).data("colorpicker").fields.eq(4).val(e.h).end().eq(5).val(e.s).end().eq(6).val(e.b).end()
            },
            n = function (e, r) {
                t(r).data("colorpicker").fields.eq(0).val(O(e)).end()
            },
            o = function (e, r) {
                t(r).data("colorpicker").selector.css("backgroundColor", "#" + O({
                    h: e.h,
                    s: 100,
                    b: 100
                })), t(r).data("colorpicker").selectorIndic.css({
                    left: parseInt(150 * e.s / 100, 10),
                    top: parseInt(150 * (100 - e.b) / 100, 10)
                })
            },
            c = function (e, r) {
                t(r).data("colorpicker").hue.css("top", parseInt(150 - 150 * e.h / 360, 10))
            },
            s = function (e, r) {
                t(r).data("colorpicker").currentColor.css("backgroundColor", "#" + O(e))
            },
            h = function (e, r) {
                t(r).data("colorpicker").newColor.css("backgroundColor", "#" + O(e))
            },
            l = function (r) {
                var i = r.charCode || r.keyCode || -1;
                if (i > e && i <= 90 || 32 == i) return !1;
                !0 === t(this).parent().parent().data("colorpicker").livePreview && u.apply(this)
            },
            u = function (e) {
                var r, s = t(this).parent().parent();
                this.parentNode.className.indexOf("_hex") > 0 ? s.data("colorpicker").color = r = B(E(this.value)) : this.parentNode.className.indexOf("_hsb") > 0 ? s.data("colorpicker").color = r = R({
                    h: parseInt(s.data("colorpicker").fields.eq(4).val(), 10),
                    s: parseInt(s.data("colorpicker").fields.eq(5).val(), 10),
                    b: parseInt(s.data("colorpicker").fields.eq(6).val(), 10)
                }) : s.data("colorpicker").color = r = q(P({
                    r: parseInt(s.data("colorpicker").fields.eq(1).val(), 10),
                    g: parseInt(s.data("colorpicker").fields.eq(2).val(), 10),
                    b: parseInt(s.data("colorpicker").fields.eq(3).val(), 10)
                })), e && (i(r, s.get(0)), n(r, s.get(0)), a(r, s.get(0))), o(r, s.get(0)), c(r, s.get(0)), h(r, s.get(0)), s.data("colorpicker").onChange.apply(s, [r, O(r), U(r)])
            },
            d = function (e) {
                t(this).parent().parent().data("colorpicker").fields.parent().removeClass("colorpicker_focus")
            },
            f = function () {
                e = this.parentNode.className.indexOf("_hex") > 0 ? 70 : 65, t(this).parent().parent().data("colorpicker").fields.parent().removeClass("colorpicker_focus"), t(this).parent().addClass("colorpicker_focus")
            },
            p = function (e) {
                var r = t(this).parent().find("input").focus(),
                    i = {
                        el: t(this).parent().addClass("colorpicker_slider"),
                        max: this.parentNode.className.indexOf("_hsb_h") > 0 ? 360 : this.parentNode.className.indexOf("_hsb") > 0 ? 100 : 255,
                        y: e.pageY,
                        field: r,
                        val: parseInt(r.val(), 10),
                        preview: t(this).parent().parent().data("colorpicker").livePreview
                    };
                t(document).bind("mouseup", i, g), t(document).bind("mousemove", i, x)
            },
            x = function (t) {
                return t.data.field.val(Math.max(0, Math.min(t.data.max, parseInt(t.data.val + t.pageY - t.data.y, 10)))), t.data.preview && u.apply(t.data.field.get(0), [!0]), !1
            },
            g = function (e) {
                return u.apply(e.data.field.get(0), [!0]), e.data.el.removeClass("colorpicker_slider").find("input").focus(), t(document).unbind("mouseup", g), t(document).unbind("mousemove", x), !1
            },
            v = function (e) {
                var r = {
                    cal: t(this).parent(),
                    y: t(this).offset().top
                };
                r.preview = r.cal.data("colorpicker").livePreview, t(document).bind("mouseup", r, m), t(document).bind("mousemove", r, y)
            },
            y = function (t) {
                return u.apply(t.data.cal.data("colorpicker").fields.eq(4).val(parseInt(360 * (150 - Math.max(0, Math.min(150, t.pageY - t.data.y))) / 150, 10)).get(0), [t.data.preview]), !1
            },
            m = function (e) {
                return i(e.data.cal.data("colorpicker").color, e.data.cal.get(0)), n(e.data.cal.data("colorpicker").color, e.data.cal.get(0)), t(document).unbind("mouseup", m), t(document).unbind("mousemove", y), !1
            },
            b = function (e) {
                var r = {
                    cal: t(this).parent(),
                    pos: t(this).offset()
                };
                r.preview = r.cal.data("colorpicker").livePreview, t(document).bind("mouseup", r, k), t(document).bind("mousemove", r, w)
            },
            w = function (t) {
                return u.apply(t.data.cal.data("colorpicker").fields.eq(6).val(parseInt(100 * (150 - Math.max(0, Math.min(150, t.pageY - t.data.pos.top))) / 150, 10)).end().eq(5).val(parseInt(100 * Math.max(0, Math.min(150, t.pageX - t.data.pos.left)) / 150, 10)).get(0), [t.data.preview]), !1
            },
            k = function (e) {
                return i(e.data.cal.data("colorpicker").color, e.data.cal.get(0)), n(e.data.cal.data("colorpicker").color, e.data.cal.get(0)), t(document).unbind("mouseup", k), t(document).unbind("mousemove", w), !1
            },
            C = function (e) {
                t(this).addClass("colorpicker_focus")
            },
            M = function (e) {
                t(this).removeClass("colorpicker_focus")
            },
            A = function (e) {
                var r = t(this).parent(),
                    i = r.data("colorpicker").color;
                r.data("colorpicker").origColor = i, s(i, r.get(0)), r.data("colorpicker").onSubmit("#" + O(i), r.data("colorpicker").el)
            },
            I = function (e) {
                var r = t("#" + t(this).data("colorpickerId"));
                r.data("colorpicker").onBeforeShow.apply(this, [r.get(0)]);
                var i = t(this).offset(),
                    a = S(),
                    n = i.top + this.offsetHeight,
                    o = i.left;
                return n + 176 > a.t + a.h && (n -= this.offsetHeight + 176), o + 356 > a.l + a.w && (o -= 356), r.css({
                    left: o + "px",
                    top: n + "px"
                }), 0 != r.data("colorpicker").onShow.apply(this, [r.get(0)]) && r.show(), t(document).bind("mousedown", {
                    cal: r
                }, _), !1
            },
            _ = function (e) {
                try {
                    F(e.data.cal.get(0), e.target, e.data.cal.get(0)) || (0 != e.data.cal.data("colorpicker").onHide.apply(this, [e.data.cal.get(0)]) && e.data.cal.hide(), t(document).unbind("mousedown", _))
                } catch (t) {}
            },
            F = function (t, e, r) {
                if (t == e) return !0;
                if (t.contains) return t.contains(e);
                if (t.compareDocumentPosition) return !!(16 & t.compareDocumentPosition(e));
                for (var i = e.parentNode; i && i != r;) {
                    if (i == t) return !0;
                    i = i.parentNode
                }
                return !1
            },
            S = function () {
                var t = "CSS1Compat" == document.compatMode;
                return {
                    l: window.pageXOffset || (t ? document.documentElement.scrollLeft : document.body.scrollLeft),
                    t: window.pageYOffset || (t ? document.documentElement.scrollTop : document.body.scrollTop),
                    w: window.innerWidth || (t ? document.documentElement.clientWidth : document.body.clientWidth),
                    h: window.innerHeight || (t ? document.documentElement.clientHeight : document.body.clientHeight)
                }
            },
            R = function (t) {
                return {
                    h: Math.min(360, Math.max(0, t.h)),
                    s: Math.min(100, Math.max(0, t.s)),
                    b: Math.min(100, Math.max(0, t.b))
                }
            },
            P = function (t) {
                return {
                    r: Math.min(255, Math.max(0, t.r)),
                    g: Math.min(255, Math.max(0, t.g)),
                    b: Math.min(255, Math.max(0, t.b))
                }
            },
            E = function (t) {
                var e = 6 - t.length;
                if (e > 0) {
                    for (var r = [], i = 0; i < e; i++) r.push("0");
                    r.push(t), t = r.join("")
                }
                return t
            },
            D = function (t) {
                return {
                    r: (t = parseInt(t.indexOf("#") > -1 ? t.substring(1) : t, 16)) >> 16,
                    g: (65280 & t) >> 8,
                    b: 255 & t
                }
            },
            B = function (t) {
                return q(D(t))
            },
            q = function (t) {
                var e = {
                        h: 0,
                        s: 0,
                        b: 0
                    },
                    r = Math.min(t.r, t.g, t.b),
                    i = Math.max(t.r, t.g, t.b),
                    a = i - r;
                return e.b = i, e.s = 0 != i ? 255 * a / i : 0, 0 != e.s ? t.r == i ? e.h = (t.g - t.b) / a : t.g == i ? e.h = 2 + (t.b - t.r) / a : e.h = 4 + (t.r - t.g) / a : e.h = -1, e.h *= 60, e.h < 0 && (e.h += 360), e.s *= 100 / 255, e.b *= 100 / 255, e
            },
            U = function (t) {
                var e = {},
                    r = Math.round(t.h),
                    i = Math.round(255 * t.s / 100),
                    a = Math.round(255 * t.b / 100);
                if (0 == i) e.r = e.g = e.b = a;
                else {
                    var n = a,
                        o = (255 - i) * a / 255,
                        c = r % 60 * (n - o) / 60;
                    360 == r && (r = 0), r < 60 ? (e.r = n, e.b = o, e.g = o + c) : r < 120 ? (e.g = n, e.b = o, e.r = n - c) : r < 180 ? (e.g = n, e.r = o, e.b = o + c) : r < 240 ? (e.b = n, e.r = o, e.g = n - c) : r < 300 ? (e.b = n, e.g = o, e.r = o + c) : r < 360 ? (e.r = n, e.g = o, e.b = n - c) : (e.r = 0, e.g = 0, e.b = 0)
                }
                return {
                    r: Math.round(e.r),
                    g: Math.round(e.g),
                    b: Math.round(e.b)
                }
            },
            G = function (e) {
                var r = [e.r.toString(16), e.g.toString(16), e.b.toString(16)];
                return t.each(r, function (t, e) {
                    1 == e.length && (r[t] = "0" + e)
                }), r.join("")
            },
            O = function (t) {
                return G(U(t))
            },
            N = function () {
                var e = t(this).parent(),
                    r = e.data("colorpicker").origColor;
                console.log(r), e.data("colorpicker").color = r, i(r, e.get(0)), n(r, e.get(0)), a(r, e.get(0)), o(r, e.get(0)), c(r, e.get(0)), h(r, e.get(0))
            },
            L = function (e) {
                var r = t(this.offsetParent),
                    i = t(e.target).attr("data-color");
                r.data("colorpicker").onSubmit(i, r.data("colorpicker").el), t(".colorpicker").hide()
            };
        return {
            init: function (e) {
                if ("string" == typeof (e = t.extend({}, r, e || {})).color) e.color = B(e.color);
                else if (void 0 != e.color.r && void 0 != e.color.g && void 0 != e.color.b) e.color = q(e.color);
                else {
                    if (void 0 == e.color.h || void 0 == e.color.s || void 0 == e.color.b) return this;
                    e.color = R(e.color)
                }
                return this.each(function () {
                    if (!t(this).data("colorpickerId")) {
                        var r = t.extend({}, e);
                        r.origColor = e.color;
                        var x = "collorpicker_" + parseInt(1e3 * Math.random());
                        t(this).data("colorpickerId", x);
                        var g = t('<div class="colorpicker"><div class="colorpicker_color"><div><div></div></div></div><div class="colorpicker_hue"><div></div></div><div class="colorpicker_new_color"></div><div class="colorpicker_current_color"></div><div class="colorpicker_hex"><input type="text" maxlength="6" size="6" /></div><div class="colorpicker_rgb_r colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_g colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_h colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_s colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_submit">Submit</div><div class="colorlist"></div></div>').attr("id", x);
                        r.flat ? g.appendTo(this).show() : g.appendTo(document.body), r.fields = g.find("input").bind("keyup", l).bind("change", u).bind("blur", d).bind("focus", f), g.find("span").bind("mousedown", p).end().find(">div.colorpicker_current_color").bind("click", N), r.selector = g.find("div.colorpicker_color").bind("mousedown", b), r.selectorIndic = r.selector.find("div div"), r.el = this, r.hue = g.find("div.colorpicker_hue div"), g.find("div.colorpicker_hue").bind("mousedown", v), r.newColor = g.find("div.colorpicker_new_color"), r.currentColor = g.find("div.colorpicker_current_color"), g.data("colorpicker", r), g.find("div.colorpicker_submit").bind("mouseenter", C).bind("mouseleave", M).bind("click", A);
                        t(g.find("div.colorlist")).html('<ul class="colorlistul"><li class="nocolorli" data-color="#"></li></ul>'), g.find("ul.colorlistul").bind("click", L), i(r.color, g.get(0)), a(r.color, g.get(0)), n(r.color, g.get(0)), c(r.color, g.get(0)), o(r.color, g.get(0)), s(r.color, g.get(0)), h(r.color, g.get(0)), r.flat ? g.css({
                            position: "relative",
                            display: "block"
                        }) : t(this).bind(r.eventName, I)
                    }
                })
            },
            showPicker: function () {
                return this.each(function () {
                    t(this).data("colorpickerId") && I.apply(this)
                })
            },
            hidePicker: function () {
                return this.each(function () {
                    t(this).data("colorpickerId") && t("#" + t(this).data("colorpickerId")).hide()
                })
            },
            setColor: function (e) {
                if ("string" == typeof e) e = B(e);
                else if (void 0 != e.r && void 0 != e.g && void 0 != e.b) e = q(e);
                else {
                    if (void 0 == e.h || void 0 == e.s || void 0 == e.b) return this;
                    e = R(e)
                }
                return this.each(function () {
                    if (t(this).data("colorpickerId")) {
                        var r = t("#" + t(this).data("colorpickerId"));
                        r.data("colorpicker").color = e, r.data("colorpicker").origColor = e, i(e, r.get(0)), a(e, r.get(0)), n(e, r.get(0)), c(e, r.get(0)), o(e, r.get(0)), s(e, r.get(0)), h(e, r.get(0))
                    }
                })
            }
        }
    }();
    t.fn.extend({
        ColorPicker: e.init,
        ColorPickerHide: e.hidePicker,
        ColorPickerShow: e.showPicker,
        ColorPickerSetColor: e.setColor
    })
}(jQuery),
function () {
    function t(t) {
        if (t = t || {}, this.method = t.method || 2, this.colors = t.colors || 256, this.width = 1e3, this.height = 1e3, this.blur = t.blur || 0, this.initColors = t.initColors || 4096, this.initDist = t.initDist || .02, this.distIncr = t.distIncr || .01, this.hueGroups = t.hueGroups || 1, this.satGroups = t.satGroups || 1, this.lumGroups = t.lumGroups || 1, this.minHueCols = t.minHueCols || 1, this.hueStats = this.minHueCols ? new i(this.hueGroups, this.minHueCols) : null, this.boxSize = t.boxSize || [64, 64], this.boxPxls = t.boxPxls || 1, this.palLocked = !1, this.dithKern = t.ditherKern || null, this.dithSerp = t.dithSerp || !1, this.dithDelta = t.dithDelta || 0, this.histogram = {}, this.idxrgb = t.palette ? t.palette.slice(0) : [], this.idxi32 = [], this.i32idx = {}, this.i32rgb = {}, this.idxhex = [], this.reduceOut32, this.useCache = !1 !== t.useCache, this.cacheFreq = t.cacheFreq || 10, this.reIndex = t.reIndex || 0 == this.idxrgb.length, this.colorDist = "manhattan" == t.colorDist ? o : n, this.averageRGB = {
                r: 255,
                g: 255,
                b: 255
            }, this.idxrgb.length > 0) {
            var e = this;
            this.idxrgb.forEach(function (t, i) {
                var a = (255 << 24 | t[2] << 16 | t[1] << 8 | t[0]) >>> 0;
                e.idxi32[i] = a, e.i32idx[a] = i, e.i32rgb[a] = t, e.idxhex[i] = r(t[0], t[1], t[2])
            })
        }
    }

    function e(t) {
        var e = t.toString(16);
        return 1 == e.length ? "0" + e : e
    }

    function r(t, r, i) {
        return e(t) + e(r) + e(i)
    }

    function i(t, e) {
        this.numGroups = t, this.minCols = e, this.stats = {};
        for (var r = -1; r < t; r++) this.stats[r] = {
            num: 0,
            cols: []
        };
        this.groupsFull = 0
    }

    function a(t, e, r) {
        return w ? Math.sqrt(w * t * t + k * e * e + C * r * r) : Math.sqrt(M * t * t + A * e * e + I * r * r)
    }

    function n(t, e) {
        var r = e[0] - t[0],
            i = e[1] - t[1],
            a = e[2] - t[2],
            n = this.averageRGB.r + this.averageRGB.g + this.averageRGB.b;
        return w || (w = (this.averageRGB.r / n).toFixed(3), k = (this.averageRGB.g / n).toFixed(3), C = (this.averageRGB.b / n).toFixed(3)), b || (b = Math.sqrt(255 * w * 255 + 255 * k * 255 + 255 * C * 255)), Math.sqrt(w * r * r + k * i * i + C * a * a) / b
    }

    function o(t, e) {
        var r = Math.abs(e[0] - t[0]),
            i = Math.abs(e[1] - t[1]),
            a = Math.abs(e[2] - t[2]);
        return (M * r + A * i + I * a) / _
    }

    function c(t, e, r) {
        var i, n, o, c, s, h;
        if (t /= 255, e /= 255, r /= 255, i = Math.max(t, e, r), n = Math.min(t, e, r), s = (i + n) / 2, i == n) o = c = 0;
        else {
            switch (h = i - n, c = s > .5 ? h / (2 - i - n) : h / (i + n), i) {
                case t:
                    o = (e - r) / h + (e < r ? 6 : 0);
                    break;
                case e:
                    o = (r - t) / h + 2;
                    break;
                case r:
                    o = (t - e) / h + 4
            }
            o /= 6
        }
        return {
            h: o,
            s: c,
            l: a(t, e, r)
        }
    }

    function s(t, e) {
        var r = 1 / e,
            i = r / 2;
        if (t >= 1 - i || t <= i) return 0;
        for (var a = 1; a < e; a++) {
            var n = a * r;
            if (t >= n - i && t <= n + i) return a
        }
    }

    function h(t) {
        return t
    }

    function l(t) {
        return t
    }

    function u(t) {
        return Object.prototype.toString.call(t).slice(8, -1)
    }

    function d(t, e, r) {
        var i, a, n, o, c, s, h, l;
        switch (r && (l = r.blur), u(t)) {
            case "HTMLImageElement":
                MAX_VALUE = 2400, (i = document.createElement("canvas")).width = t.naturalWidth, i.height = t.naturalHeight;
                var d = i.width / i.height;
                i.width < 1e3 && (i.width = 1e3, i.height = 1e3 / d), i.height < 1e3 && (i.width = 1e3 * d, i.height = 1e3), i.width > MAX_VALUE && (i.width = MAX_VALUE, i.height = MAX_VALUE / d), i.height > MAX_VALUE && (i.width = MAX_VALUE * d, i.height = MAX_VALUE), a = i.getContext("2d"), void 0 != r && (r.width = i.width, r.height = i.height), a.drawImage(t, 0, 0, t.naturalWidth, t.naturalHeight, 0, 0, i.width, i.height), a.filter = "blur(" + l + "px)", f(a.getImageData(0, 0, i.width, i.height)), a.drawImage(t, 0, 0, i.width, i.height), h = f(a.getImageData(0, 0, i.width, i.height));
            case "Canvas":
            case "HTMLCanvasElement":
                i = i || t, a = a || i.getContext("2d");
            case "CanvasRenderingContext2D":
                a = a || t, i = i || a.canvas, n = a.getImageData(0, 0, i.width, i.height);
            case "ImageData":
                e = (n = n || t).width, o = "CanvasPixelArray" == u(n.data) ? new Uint8Array(n.data) : n.data;
            case "Array":
            case "CanvasPixelArray":
                o = o || new Uint8Array(t);
            case "Uint8Array":
            case "Uint8ClampedArray":
                o = o || t, c = new Uint32Array(o.buffer);
            case "Uint32Array":
                c = c || t, o = o || new Uint8Array(c.buffer), e = e || c.length, s = c.length / e
        }
        return {
            can: i,
            ctx: a,
            imgd: n,
            buf8: o,
            buf32: c,
            width: e,
            height: s,
            avgRGB: h
        }
    }

    function f(t) {
        for (var e = 0;
            (e += 4 * P) < t.data.length;) ++S, R.r += t.data[e], R.g += t.data[e + 1], R.b += t.data[e + 2];
        return R.r = ~~(R.r / S), R.g = ~~(R.g / S), R.b = ~~(R.b / S), S = 0, R
    }

    function p(t, e, r, i) {
        for (var a = t % r, n = e % i, o = t - a, c = e - n, s = [], h = 0; h < e; h += i)
            for (var l = 0; l < t; l += r) s.push({
                x: l,
                y: h,
                w: l == o ? a : r,
                h: h == c ? n : i
            });
        return s
    }

    function x(t, e, r) {
        var i = t,
            a = i.y * e + i.x,
            n = (i.y + i.h - 1) * e + (i.x + i.w - 1),
            o = 0,
            c = e - i.w + 1,
            s = a;
        do {
            r.call(this, s), s += ++o % i.w == 0 ? c : 1
        } while (s <= n)
    }

    function g(t, e) {
        var r = [];
        for (var i in t) r.push(i);
        return F.call(r, function (r, i) {
            return e ? t[i] - t[r] : t[r] - t[i]
        })
    }
    var v;
    t.prototype.sample = function (t, e, r, i, a) {
        if (this.palLocked) throw "Cannot sample additional images, palette already assembled.";
        if (v = d(t, e, this), this.averageRGB = v.avgRGB, console.log("sample ", v.buf8.length), i) a(r);
        else switch (this.method) {
            case 1:
                this.colorStats1D(v.buf32, a);
                break;
            case 2:
                this.colorStats2D(v.buf32, v.width)
        }
    }, t.prototype.reduce = function (t, e, r, i) {
        function a(t) {
            for (; s < o; s++) {
                var e = n[s];
                c[s] = t.nearestColor(e), s + 1 < o && s % 8e3 == 0 && setTimeout(a, 0)
            }
        }
        if (console.log("reduce 1"), this.palLocked || this.buildPal(), r = r || this.dithKern, i = void 0 !== i ? i : this.dithSerp, e = e || 1, r) c = this.dither(t, r, i);
        else {
            var n = d(t, null, this).buf32,
                o = n.length,
                c = new Uint32Array(o),
                s = 0;
            a(this)
        }
        if (console.log("reduce 2"), this.reduceOut32 = c, 1 == e) return new Uint8Array(c.buffer);
        if (2 == e) {
            for (var h = [], o = c.length, s = 0; s < o; s++) {
                var l = c[s];
                h[s] = this.i32idx[l]
            }
            return h
        }
    }, t.prototype.replaceColor = function (t, e) {
        for (var r = (255 << 24) + (e.b << 16) + (e.g << 8) + e.r, i = this.reduceOut32[0], a = 0; a < this.reduceOut32.length; a++) this.reduceOut32[a] == i && (this.reduceOut32[a] = r);
        return new Uint8Array(this.reduceOut32.buffer)
    }, t.prototype.dither = function (t, e, r) {
        var i = {
            FloydSteinberg: [
                [7 / 16, 1, 0],
                [3 / 16, -1, 1],
                [5 / 16, 0, 1],
                [1 / 16, 1, 1]
            ],
            FalseFloydSteinberg: [
                [3 / 8, 1, 0],
                [3 / 8, 0, 1],
                [.25, 1, 1]
            ],
            Stucki: [
                [8 / 42, 1, 0],
                [4 / 42, 2, 0],
                [2 / 42, -2, 1],
                [4 / 42, -1, 1],
                [8 / 42, 0, 1],
                [4 / 42, 1, 1],
                [2 / 42, 2, 1],
                [1 / 42, -2, 2],
                [2 / 42, -1, 2],
                [4 / 42, 0, 2],
                [2 / 42, 1, 2],
                [1 / 42, 2, 2]
            ],
            Atkinson: [
                [1 / 8, 1, 0],
                [1 / 8, 2, 0],
                [1 / 8, -1, 1],
                [1 / 8, 0, 1],
                [1 / 8, 1, 1],
                [1 / 8, 0, 2]
            ],
            Jarvis: [
                [7 / 48, 1, 0],
                [5 / 48, 2, 0],
                [3 / 48, -2, 1],
                [5 / 48, -1, 1],
                [7 / 48, 0, 1],
                [5 / 48, 1, 1],
                [3 / 48, 2, 1],
                [1 / 48, -2, 2],
                [3 / 48, -1, 2],
                [5 / 48, 0, 2],
                [3 / 48, 1, 2],
                [1 / 48, 2, 2]
            ],
            Burkes: [
                [.25, 1, 0],
                [.125, 2, 0],
                [2 / 32, -2, 1],
                [.125, -1, 1],
                [.25, 0, 1],
                [.125, 1, 1],
                [2 / 32, 2, 1]
            ],
            Sierra: [
                [5 / 32, 1, 0],
                [3 / 32, 2, 0],
                [2 / 32, -2, 1],
                [.125, -1, 1],
                [5 / 32, 0, 1],
                [.125, 1, 1],
                [2 / 32, 2, 1],
                [2 / 32, -1, 2],
                [3 / 32, 0, 2],
                [2 / 32, 1, 2]
            ],
            TwoSierra: [
                [.25, 1, 0],
                [3 / 16, 2, 0],
                [1 / 16, -2, 1],
                [.125, -1, 1],
                [3 / 16, 0, 1],
                [.125, 1, 1],
                [1 / 16, 2, 1]
            ],
            SierraLite: [
                [.5, 1, 0],
                [.25, -1, 1],
                [.25, 0, 1]
            ]
        };
        if (!e || !i[e]) throw "Unknown dithering kernel: " + e;
        for (var a = i[e], n = d(t, null, this), o = n.buf32, c = n.width, s = n.height, h = (o.length, r ? -1 : 1), l = 0; l < s; l++) {
            r && (h *= -1);
            for (var u = l * c, f = 1 == h ? 0 : c - 1, p = 1 == h ? c : 0; f !== p; f += h) {
                var x = u + f,
                    g = o[x],
                    v = 255 & g,
                    y = (65280 & g) >> 8,
                    m = (16711680 & g) >> 16,
                    b = this.nearestColor(g),
                    w = 255 & b,
                    k = (65280 & b) >> 8,
                    C = (16711680 & b) >> 16;
                if (o[x] = 255 << 24 | C << 16 | k << 8 | w, !(this.dithDelta && this.colorDist([v, y, m], [w, k, C]) < this.dithDelta))
                    for (var M = v - w, A = y - k, I = m - C, _ = 1 == h ? 0 : a.length - 1, F = 1 == h ? a.length : 0; _ !== F; _ += h) {
                        var S = a[_][1] * h,
                            R = a[_][2],
                            P = R * c;
                        if (S + f >= 0 && S + f < c && R + l >= 0 && R + l < s) {
                            var E = a[_][0],
                                D = x + (P + S),
                                B = 255 & o[D],
                                q = (65280 & o[D]) >> 8,
                                U = (16711680 & o[D]) >> 16,
                                G = Math.max(0, Math.min(255, B + M * E)),
                                O = Math.max(0, Math.min(255, q + A * E)),
                                N = Math.max(0, Math.min(255, U + I * E));
                            o[D] = 255 << 24 | N << 16 | O << 8 | G
                        }
                    }
            }
        }
        return o
    }, t.prototype.buildPal = function (t) {
        if (!(this.palLocked || this.idxrgb.length > 0 && this.idxrgb.length <= this.colors)) {
            var e = this.histogram,
                r = g(e, !0);
            if (0 == r.length) throw "Nothing has been sampled, palette cannot be built.";
            switch (console.log("buildPal ", r.length), this.method) {
                case 1:
                    for (var i = this.initColors, a = e[r[i - 1]], n = r.slice(0, i), o = i, c = r.length; o < c && e[r[o]] == a;) n.push(r[o++]);
                    this.hueStats && this.hueStats.inject(n);
                    break;
                case 2:
                    n = r
            }
            n = n.map(function (t) {
                return +t
            }), this.reducePal(n), !t && this.reIndex && this.sortPal(), this.useCache && this.cacheHistogram(n), this.palLocked = !0
        }
    }, t.prototype.palette = function (t, e, r) {
        return r && (this.histogram = r), this.buildPal(e), t ? this.idxrgb : new Uint8Array(new Uint32Array(this.idxi32).buffer)
    }, t.prototype.prunePal = function (t) {
        for (var e, r = 0; r < this.idxrgb.length; r++) t[r] || (e = this.idxi32[r], this.idxrgb[r] = null, this.idxi32[r] = null, delete this.i32idx[e]);
        if (this.reIndex) {
            for (var i = [], a = [], n = {}, r = 0, o = 0; r < this.idxrgb.length; r++) this.idxrgb[r] && (e = this.idxi32[r], i[o] = this.idxrgb[r], n[e] = o, a[o] = e, o++);
            this.idxrgb = i, this.idxi32 = a, this.i32idx = n
        }
    }, t.prototype.reducePal = function (t) {
        if (this.idxrgb.length > this.colors) {
            for (var e, r = t.length, i = {}, a = 0, n = !1, o = 0; o < r; o++) a != this.colors || n || (this.prunePal(i), n = !0), e = this.nearestIndex(t[o]), a < this.colors && !i[e] && (i[e] = !0, a++);
            n || (this.prunePal(i), n = !0)
        } else {
            var c = t.map(function (t) {
                    return [255 & t, (65280 & t) >> 8, (16711680 & t) >> 16]
                }),
                s = r = c.length,
                h = this.initDist;
            if (s > this.colors) {
                for (; s > this.colors;) {
                    for (var l = [], o = 0; o < r; o++) {
                        var u = c[o];
                        t[o];
                        if (u)
                            for (var d = o + 1; d < r; d++) {
                                var f = c[d],
                                    p = t[d];
                                if (f) {
                                    var x = this.colorDist(u, f);
                                    x < h && (l.push([d, f, p, x]), delete c[d], s--)
                                }
                            }
                    }
                    h += s > 3 * this.colors ? this.initDist : this.distIncr
                }
                if (s < this.colors) {
                    F.call(l, function (t, e) {
                        return e[3] - t[3]
                    });
                    for (var g = 0; s < this.colors;) c[l[g][0]] = l[g][1], s++, g++
                }
            }
            for (var r = c.length, o = 0; o < r; o++) c[o] && (this.idxrgb.push(c[o]), this.idxi32.push(t[o]), this.i32idx[t[o]] = this.idxi32.length - 1, this.i32rgb[t[o]] = c[o])
        }
    };
    var y, m;
    t.prototype.colorStats1D = function (t, e) {
        var r = this.histogram,
            i = t.length;
        console.log("colorStats1D ", i), m = i, (y = new Worker("libs/worker.js")).addEventListener("message", function (t) {
            e(JSON.parse(t.data.histG))
        }, !1), y.postMessage({
            buf32: t,
            col: void 0,
            histG: r
        })
    }, t.prototype.colorStats2D = function (t, e) {
        var r = this.boxSize[0],
            i = this.boxSize[1],
            a = r * i,
            n = p(e, t.length / e, r, i),
            o = this.histogram,
            c = this;
        n.forEach(function (r) {
            var i, n = Math.max(Math.round(r.w * r.h / a) * c.boxPxls, 2),
                s = {};
            x(r, e, function (e) {
                (4278190080 & (i = t[e])) >> 24 != 0 && (c.hueStats && c.hueStats.check(i), i in o ? o[i]++ : i in s ? ++s[i] >= n && (o[i] = s[i]) : s[i] = 1)
            })
        }), this.hueStats && this.hueStats.inject(o)
    }, t.prototype.sortPal = function () {
        var t = this;
        this.idxi32.sort(function (e, r) {
            var i = t.i32idx[e],
                a = t.i32idx[r],
                n = t.idxrgb[i],
                o = t.idxrgb[a],
                u = c(n[0], n[1], n[2]),
                d = c(o[0], o[1], o[2]),
                f = n[0] == n[1] && n[1] == n[2] ? -1 : s(u.h, t.hueGroups),
                p = (o[0] == o[1] && o[1] == o[2] ? -1 : s(d.h, t.hueGroups)) - f;
            if (p) return -p;
            var x = l(+d.l.toFixed(2)) - l(+u.l.toFixed(2));
            if (x) return -x;
            var g = h(+d.s.toFixed(2)) - h(+u.s.toFixed(2));
            return g ? -g : void 0
        }), this.idxi32.forEach(function (e, r) {
            t.idxrgb[r] = t.i32rgb[e], t.i32idx[e] = r
        })
    }, t.prototype.nearestColor = function (t) {
        var e = this.nearestIndex(t);
        return null === e ? 0 : this.idxi32[e]
    }, t.prototype.nearestIndex = function (t) {
        if ((4278190080 & t) >> 24 == 0) return null;
        if (this.useCache && "" + t in this.i32idx) return this.i32idx[t];
        for (var e, r = 100, i = [255 & t, (65280 & t) >> 8, (16711680 & t) >> 16], a = this.idxrgb.length, n = 0; n < a; n++)
            if (this.idxrgb[n]) {
                var o = this.colorDist(i, this.idxrgb[n]);
                o < r && (r = o, e = n)
            }
        return e
    }, Array.closest = function () {
        function t(e, r) {
            return e.length && r.length ? t(e.slice(2), r.slice(2)) + Math.abs(parseInt(e.slice(0, 2), 16) - parseInt(r.slice(0, 2), 16)) : 16777215
        }
        return function (e, r) {
            return e.sort(function (e, i) {
                return t(e, r) - t(i, r)
            })
        }
    }(), t.prototype.cacheHistogram = function (t) {
        for (var e = 0, r = t[e]; e < t.length && this.histogram[r] >= this.cacheFreq; r = t[e++]) this.i32idx[r] = this.nearestIndex(r)
    }, i.prototype.check = function (t) {
        this.groupsFull == this.numGroups + 1 && (this.check = function () {});
        var e = 255 & t,
            r = (65280 & t) >> 8,
            i = (16711680 & t) >> 16,
            a = e == r && r == i ? -1 : s(c(e, r, i).h, this.numGroups),
            n = this.stats[a],
            o = this.minCols;
        ++n.num > o || (n.num == o && this.groupsFull++, n.num <= o && this.stats[a].cols.push(t))
    }, i.prototype.inject = function (t) {
        for (var e = -1; e < this.numGroups; e++)
            if (this.stats[e].num <= this.minCols) switch (u(t)) {
                case "Array":
                    this.stats[e].cols.forEach(function (e) {
                        -1 == t.indexOf(e) && t.push(e)
                    });
                    break;
                case "Object":
                    this.stats[e].cols.forEach(function (e) {
                        t[e] ? t[e]++ : t[e] = 1
                    })
            }
    };
    var b, w, k, C, M = .299,
        A = .587,
        I = .114,
        _ = 255 * M + 255 * A + 255 * I,
        F = function () {
            var t = "abcdefghijklmnopqrstuvwxyz";
            return "xyzvwtursopqmnklhijfgdeabc" == t.split("").sort(function (e, r) {
                return ~~(t.indexOf(r) / 2.3) - ~~(t.indexOf(e) / 2.3)
            }).join("")
        }() ? Array.prototype.sort : function (t) {
            var e = u(this[0]);
            if ("Number" == e || "String" == e) {
                for (var r, i = {}, a = this.length, n = 0; n < a; n++) r = this[n], i[r] || 0 === i[r] || (i[r] = n);
                return this.sort(function (e, r) {
                    return t(e, r) || i[e] - i[r]
                })
            }
            i = this.map(function (t) {
                return t
            });
            return this.sort(function (e, r) {
                return t(e, r) || i.indexOf(e) - i.indexOf(r)
            })
        },
        S = 0,
        R = {
            r: 0,
            g: 0,
            b: 0
        },
        P = 5;
    this.RgbQuant = t, "undefined" != typeof module && module.exports && (module.exports = t)
}.call(this);
var Potrace = function () {
        function t(t, e) {
            this.x = t, this.y = e
        }

        function e(t, e) {
            this.w = t, this.h = e, this.size = t * e, this.arraybuffer = new ArrayBuffer(this.size), this.data = new Int8Array(this.arraybuffer)
        }

        function r() {
            this.area = 0, this.len = 0, this.curve = {}, this.pt = [], this.minX = 1e5, this.minY = 1e5, this.maxX = -1, this.maxY = -1
        }

        function i(t) {
            this.n = t, this.tag = new Array(t), this.c = new Array(3 * t), this.alphaCurve = 0, this.vertex = new Array(t), this.alpha = new Array(t), this.alpha0 = new Array(t), this.beta = new Array(t)
        }

        function a() {
            var t = u.width / u.height;
            d.width = u.width, d.height = u.height, d.width > p && (d.width = p, d.height = p / t), d.height > p && (d.height = p, d.width = p * t);
            var e = d.getContext("2d");
            e.fillStyle = "#ffffff", e.fillRect(0, 0, d.width, d.height), e.drawImage(u, 0, 0, d.width, d.height)
        }

        function n() {
            var t = d.getContext("2d");
            f = new e(d.width, d.height);
            var r, i, a, n = t.getImageData(0, 0, f.w, f.h),
                o = n.data.length;
            for (r = 0, i = 0; r < o; r += 4, i++) a = .2126 * n.data[r] + .7153 * n.data[r + 1] + .0721 * n.data[r + 2], f.data[i] = a < 128 ? 1 : 0;
            g.isReady = !0
        }

        function o() {
            function e(t, e) {
                var r, i, n;
                for (r = 2; r < 5; r++) {
                    for (n = 0, i = 1 - r; i <= r - 1; i++) n += a.at(t + i, e + r - 1) ? 1 : -1, n += a.at(t + r - 1, e + i - 1) ? 1 : -1, n += a.at(t + i - 1, e - r) ? 1 : -1, n += a.at(t - r, e + i) ? 1 : -1;
                    if (n > 0) return 1;
                    if (n < 0) return 0
                }
                return 0
            }
            for (var i, a = f.copy(), n = new t(0, 0); n = function (t) {
                    for (var e = a.w * t.y + t.x; e < a.size && 1 !== a.data[e];) e++;
                    return e < a.size && a.index(e)
                }(n);)(function (t) {
                var e, r, i, n, o, c, s = t.pt[0].y,
                    h = t.len;
                for (o = 1; o < h; o++)
                    if (e = t.pt[o].x, (r = t.pt[o].y) !== s) {
                        for (n = s < r ? s : r, i = t.maxX, c = e; c < i; c++) a.flip(c, n);
                        s = r
                    }
            })(i = function (i) {
                var n, o = new r,
                    c = i.x,
                    s = i.y,
                    h = 0,
                    l = 1;
                for (o.sign = f.at(i.x, i.y) ? "+" : "-"; o.pt.push(new t(c, s)), c > o.maxX && (o.maxX = c), c < o.minX && (o.minX = c), s > o.maxY && (o.maxY = s), s < o.minY && (o.minY = s), o.len++, c += h, s += l, o.area -= c * l, c !== i.x || s !== i.y;) {
                    var u = a.at(c + (h + l - 1) / 2, s + (l - h - 1) / 2),
                        d = a.at(c + (h - l - 1) / 2, s + (l + h - 1) / 2);
                    d && !u ? "right" === g.turnpolicy || "black" === g.turnpolicy && "+" === o.sign || "white" === g.turnpolicy && "-" === o.sign || "majority" === g.turnpolicy && e(c, s) || "minority" === g.turnpolicy && !e(c, s) ? (n = h, h = -l, l = n) : (n = h, h = l, l = -n) : d ? (n = h, h = -l, l = n) : u || (n = h, h = l, l = -n)
                }
                return o
            }(n)), i.area > g.turdsize && x.push(i)
        }

        function c() {
            function e() {
                this.data = [0, 0, 0, 0, 0, 0, 0, 0, 0]
            }

            function r(t, e, r, i, a) {
                this.x = t, this.y = e, this.xy = r, this.x2 = i, this.y2 = a
            }

            function a(t, e) {
                return t >= e ? t % e : t >= 0 ? t : e - 1 - (-1 - t) % e
            }

            function n(t, e) {
                return t.x * e.y - t.y * e.x
            }

            function o(t, e, r) {
                return t <= r ? t <= e && e < r : t <= e || e < r
            }

            function c(t) {
                return t > 0 ? 1 : t < 0 ? -1 : 0
            }

            function s(t, e) {
                var r, i, a, n = new Array(3);
                for (n[0] = e.x, n[1] = e.y, n[2] = 1, a = 0, r = 0; r < 3; r++)
                    for (i = 0; i < 3; i++) a += n[r] * t.at(r, i) * n[i];
                return a
            }

            function h(e, r, i) {
                var a = new t;
                return a.x = r.x + e * (i.x - r.x), a.y = r.y + e * (i.y - r.y), a
            }

            function l(e, r) {
                var i = new t;
                return i.y = c(r.x - e.x), i.x = -c(r.y - e.y), i
            }

            function u(t, e) {
                var r = l(t, e);
                return r.y * (e.x - t.x) - r.x * (e.y - t.y)
            }

            function d(t, e, r) {
                var i, a, n, o;
                return i = e.x - t.x, a = e.y - t.y, n = r.x - t.x, o = r.y - t.y, i * o - n * a
            }

            function f(t, e, r, i) {
                var a, n, o, c;
                return a = e.x - t.x, n = e.y - t.y, o = i.x - r.x, c = i.y - r.y, a * c - o * n
            }

            function p(t, e, r) {
                var i, a, n, o;
                return i = e.x - t.x, a = e.y - t.y, n = r.x - t.x, o = r.y - t.y, i * n + a * o
            }

            function v(t, e, r, i) {
                var a, n, o, c;
                return a = e.x - t.x, n = e.y - t.y, o = i.x - r.x, c = i.y - r.y, a * o + n * c
            }

            function y(t, e) {
                return Math.sqrt((t.x - e.x) * (t.x - e.x) + (t.y - e.y) * (t.y - e.y))
            }

            function m(e, r, i, a, n) {
                var o = 1 - e,
                    c = new t;
                return c.x = o * o * o * r.x + o * o * e * 3 * i.x + e * e * o * 3 * a.x + e * e * e * n.x, c.y = o * o * o * r.y + o * o * e * 3 * i.y + e * e * o * 3 * a.y + e * e * e * n.y, c
            }

            function b(t, e, r, i, a, n) {
                var o, c, s, h, l, u, d, p, x, g;
                return o = f(t, e, a, n), c = f(e, r, a, n), s = f(r, i, a, n), h = o - 2 * c + s, l = -2 * o + 2 * c, u = o, d = l * l - 4 * h * u, 0 === h || d < 0 ? -1 : (p = Math.sqrt(d), x = (-l + p) / (2 * h), g = (-l - p) / (2 * h), x >= 0 && x <= 1 ? x : g >= 0 && g <= 1 ? g : -1)
            }
            e.prototype.at = function (t, e) {
                return this.data[3 * t + e]
            };
            for (var w = 0; w < x.length; w++) {
                var k = x[w];
                ! function (t) {
                    var e, i, a;
                    t.x0 = t.pt[0].x, t.y0 = t.pt[0].y, t.sums = [];
                    var n = t.sums;
                    for (n.push(new r(0, 0, 0, 0, 0)), e = 0; e < t.len; e++) i = t.pt[e].x - t.x0, a = t.pt[e].y - t.y0, n.push(new r(n[e].x + i, n[e].y + a, n[e].xy + i * a, n[e].x2 + i * i, n[e].y2 + a * a))
                }(k),
                function (e) {
                    var r, i = e.len,
                        s = e.pt,
                        h = new Array(i),
                        l = new Array(i),
                        u = new Array(4);
                    e.lon = new Array(i);
                    var d, f, p, x, g, v, y, m, b = [new t, new t],
                        w = new t,
                        k = new t,
                        C = new t,
                        M = 0;
                    for (f = i - 1; f >= 0; f--) s[f].x != s[M].x && s[f].y != s[M].y && (M = f + 1), l[f] = M;
                    for (f = i - 1; f >= 0; f--) {
                        for (u[0] = u[1] = u[2] = u[3] = 0, u[r = (3 + 3 * (s[a(f + 1, i)].x - s[f].x) + (s[a(f + 1, i)].y - s[f].y)) / 2]++, b[0].x = 0, b[0].y = 0, b[1].x = 0, b[1].y = 0, M = l[f], x = f;;) {
                            if (d = 0, r = (3 + 3 * c(s[M].x - s[x].x) + c(s[M].y - s[x].y)) / 2, u[r]++, u[0] && u[1] && u[2] && u[3]) {
                                h[f] = x, d = 1;
                                break
                            }
                            if (w.x = s[M].x - s[f].x, w.y = s[M].y - s[f].y, n(b[0], w) < 0 || n(b[1], w) > 0) break;
                            if (Math.abs(w.x) <= 1 && Math.abs(w.y) <= 1 || (k.x = w.x + (w.y >= 0 && (w.y > 0 || w.x < 0) ? 1 : -1), k.y = w.y + (w.x <= 0 && (w.x < 0 || w.y < 0) ? 1 : -1), n(b[0], k) >= 0 && (b[0].x = k.x, b[0].y = k.y), k.x = w.x + (w.y <= 0 && (w.y < 0 || w.x < 0) ? 1 : -1), k.y = w.y + (w.x >= 0 && (w.x > 0 || w.y < 0) ? 1 : -1), n(b[1], k) <= 0 && (b[1].x = k.x, b[1].y = k.y)), x = M, M = l[x], !o(M, f, x)) break
                        }
                        0 === d && (C.x = c(s[M].x - s[x].x), C.y = c(s[M].y - s[x].y), w.x = s[x].x - s[f].x, w.y = s[x].y - s[f].y, g = n(b[0], w), v = n(b[0], C), y = n(b[1], w), m = n(b[1], C), p = 1e7, v < 0 && (p = Math.floor(g / -v)), m > 0 && (p = Math.min(p, Math.floor(-y / m))), h[f] = a(x + p, i))
                    }
                    for (p = h[i - 1], e.lon[i - 1] = p, f = i - 2; f >= 0; f--) o(f + 1, h[f], p) && (p = h[f]), e.lon[f] = p;
                    for (f = i - 1; o(a(f + 1, i), p, e.lon[f]); f--) e.lon[f] = p
                }(k),
                function (t) {
                    var e, r, i, n, o, c, s, h = t.len,
                        l = new Array(h + 1),
                        u = new Array(h + 1),
                        d = new Array(h),
                        f = new Array(h + 1),
                        p = new Array(h + 1),
                        x = new Array(h + 1);
                    for (e = 0; e < h; e++)(s = a(t.lon[a(e - 1, h)] - 1, h)) == e && (s = a(e + 1, h)), d[e] = s < e ? h : s;
                    for (r = 1, e = 0; e < h; e++)
                        for (; r <= d[e];) f[r] = e, r++;
                    for (e = 0, r = 0; e < h; r++) p[r] = e, e = d[e];
                    for (p[r] = h, e = h, r = i = r; r > 0; r--) x[r] = e, e = f[e];
                    for (x[0] = 0, l[0] = 0, r = 1; r <= i; r++)
                        for (e = x[r]; e <= p[r]; e++) {
                            for (c = -1, n = p[r - 1]; n >= f[e]; n--) o = function (t, e, r) {
                                var i, a, n, o, c, s, h, l, u, d, f, p, x, g, v = t.len,
                                    y = t.pt,
                                    m = t.sums,
                                    b = 0;
                                return r >= v && (r -= v, b = 1), 0 === b ? (i = m[r + 1].x - m[e].x, a = m[r + 1].y - m[e].y, o = m[r + 1].x2 - m[e].x2, n = m[r + 1].xy - m[e].xy, c = m[r + 1].y2 - m[e].y2, s = r + 1 - e) : (i = m[r + 1].x - m[e].x + m[v].x, a = m[r + 1].y - m[e].y + m[v].y, o = m[r + 1].x2 - m[e].x2 + m[v].x2, n = m[r + 1].xy - m[e].xy + m[v].xy, c = m[r + 1].y2 - m[e].y2 + m[v].y2, s = r + 1 - e + v), f = (y[e].x + y[r].x) / 2 - y[0].x, p = (y[e].y + y[r].y) / 2 - y[0].y, g = y[r].x - y[e].x, x = -(y[r].y - y[e].y), h = (o - 2 * i * f) / s + f * f, l = (n - i * p - a * f) / s + f * p, u = (c - 2 * a * p) / s + p * p, d = x * x * h + 2 * x * g * l + g * g * u, Math.sqrt(d)
                            }(t, n, e) + l[n], (c < 0 || o < c) && (u[e] = n, c = o);
                            l[e] = c
                        }
                    for (t.m = i, t.po = new Array(i), e = h, r = i - 1; e > 0; r--) e = u[e], t.po[r] = e
                }(k),
                function (r) {
                    var n, o, c, h, l, u = r.m,
                        d = r.po,
                        f = r.len,
                        p = r.pt,
                        x = r.x0,
                        g = r.y0,
                        v = new Array(u),
                        y = new Array(u),
                        m = new Array(u),
                        b = new Array(3),
                        w = new t;
                    for (r.curve = new i(u), o = 0; o < u; o++) c = a((c = d[a(o + 1, u)]) - d[o], f) + d[o], v[o] = new t, y[o] = new t,
                        function (t, e, r, i, a) {
                            for (var n, o, c, s, h, l, u, d, f, p, x, g = t.len, v = t.sums, y = 0; r >= g;) r -= g, y += 1;
                            for (; e >= g;) e -= g, y -= 1;
                            for (; r < 0;) r += g, y -= 1;
                            for (; e < 0;) e += g, y += 1;
                            n = v[r + 1].x - v[e].x + y * v[g].x, o = v[r + 1].y - v[e].y + y * v[g].y, c = v[r + 1].x2 - v[e].x2 + y * v[g].x2, s = v[r + 1].xy - v[e].xy + y * v[g].xy, h = v[r + 1].y2 - v[e].y2 + y * v[g].y2, l = r + 1 - e + y * g, i.x = n / l, i.y = o / l, u = (c - n * n / l) / l, d = (s - n * o / l) / l, u -= p = (u + (f = (h - o * o / l) / l) + Math.sqrt((u - f) * (u - f) + 4 * d * d)) / 2, f -= p, Math.abs(u) >= Math.abs(f) ? 0 !== (x = Math.sqrt(u * u + d * d)) && (a.x = -d / x, a.y = u / x) : 0 !== (x = Math.sqrt(f * f + d * d)) && (a.x = -f / x, a.y = d / x), 0 === x && (a.x = a.y = 0)
                        }(r, d[o], c, v[o], y[o]);
                    for (o = 0; o < u; o++)
                        if (m[o] = new e, 0 == (n = y[o].x * y[o].x + y[o].y * y[o].y))
                            for (c = 0; c < 3; c++)
                                for (h = 0; h < 3; h++) m[o].data[3 * c + h] = 0;
                        else
                            for (b[0] = y[o].y, b[1] = -y[o].x, b[2] = -b[1] * v[o].y - b[0] * v[o].x, l = 0; l < 3; l++)
                                for (h = 0; h < 3; h++) m[o].data[3 * l + h] = b[l] * b[h] / n;
                    var k, C, M, A, I, _, F, S, R, P;
                    for (o = 0; o < u; o++) {
                        for (k = new e, C = new t, w.x = p[d[o]].x - x, w.y = p[d[o]].y - g, c = a(o - 1, u), l = 0; l < 3; l++)
                            for (h = 0; h < 3; h++) k.data[3 * l + h] = m[c].at(l, h) + m[o].at(l, h);
                        for (;;) {
                            if (0 != (I = k.at(0, 0) * k.at(1, 1) - k.at(0, 1) * k.at(1, 0))) {
                                C.x = (-k.at(0, 2) * k.at(1, 1) + k.at(1, 2) * k.at(0, 1)) / I, C.y = (k.at(0, 2) * k.at(1, 0) - k.at(1, 2) * k.at(0, 0)) / I;
                                break
                            }
                            for (k.at(0, 0) > k.at(1, 1) ? (b[0] = -k.at(0, 1), b[1] = k.at(0, 0)) : k.at(1, 1) ? (b[0] = -k.at(1, 1), b[1] = k.at(1, 0)) : (b[0] = 1, b[1] = 0), n = b[0] * b[0] + b[1] * b[1], b[2] = -b[1] * w.y - b[0] * w.x, l = 0; l < 3; l++)
                                for (h = 0; h < 3; h++) k.data[3 * l + h] += b[l] * b[h] / n
                        }
                        if (M = Math.abs(C.x - w.x), A = Math.abs(C.y - w.y), M <= .5 && A <= .5) r.curve.vertex[o] = new t(C.x + x, C.y + g);
                        else {
                            if (_ = s(k, w), S = w.x, R = w.y, 0 !== k.at(0, 0))
                                for (P = 0; P < 2; P++) C.y = w.y - .5 + P, C.x = -(k.at(0, 1) * C.y + k.at(0, 2)) / k.at(0, 0), M = Math.abs(C.x - w.x), F = s(k, C), M <= .5 && F < _ && (_ = F, S = C.x, R = C.y);
                            if (0 !== k.at(1, 1))
                                for (P = 0; P < 2; P++) C.x = w.x - .5 + P, C.y = -(k.at(1, 0) * C.x + k.at(1, 2)) / k.at(1, 1), A = Math.abs(C.y - w.y), F = s(k, C), A <= .5 && F < _ && (_ = F, S = C.x, R = C.y);
                            for (l = 0; l < 2; l++)
                                for (h = 0; h < 2; h++) C.x = w.x - .5 + l, C.y = w.y - .5 + h, (F = s(k, C)) < _ && (_ = F, S = C.x, R = C.y);
                            r.curve.vertex[o] = new t(S + x, R + g)
                        }
                    }
                }(k), "-" === k.sign && function (t) {
                        var e, r, i, a = t.curve,
                            n = a.n,
                            o = a.vertex;
                        for (e = 0, r = n - 1; e < r; e++, r--) i = o[e], o[e] = o[r], o[r] = i
                    }(k),
                    function (t) {
                        var e, r, i, n, o, c, s, l, f, p = t.curve.n,
                            x = t.curve;
                        for (e = 0; e < p; e++) r = a(e + 1, p), i = a(e + 2, p), f = h(.5, x.vertex[i], x.vertex[r]), 0 !== (o = u(x.vertex[e], x.vertex[i])) ? (n = d(x.vertex[e], x.vertex[r], x.vertex[i]) / o, c = (n = Math.abs(n)) > 1 ? 1 - 1 / n : 0, c /= .75) : c = 4 / 3, x.alpha0[r] = c, c >= g.alphamax ? (x.tag[r] = "CORNER", x.c[3 * r + 1] = x.vertex[r], x.c[3 * r + 2] = f) : (c < .55 ? c = .55 : c > 1 && (c = 1), s = h(.5 + .5 * c, x.vertex[e], x.vertex[r]), l = h(.5 + .5 * c, x.vertex[i], x.vertex[r]), x.tag[r] = "CURVE", x.c[3 * r + 0] = s, x.c[3 * r + 1] = l, x.c[3 * r + 2] = f), x.alpha[r] = c, x.beta[r] = .5;
                        x.alphacurve = 1
                    }(k), g.optcurve && function (e) {
                        function r() {
                            this.pen = 0, this.c = [new t, new t], this.t = 0, this.s = 0, this.alpha = 0
                        }
                        var n, o, s, l, u, x, w, k, C, M, A = e.curve,
                            I = A.n,
                            _ = A.vertex,
                            F = new Array(I + 1),
                            S = new Array(I + 1),
                            R = new Array(I + 1),
                            P = new Array(I + 1),
                            E = new r,
                            D = new Array(I),
                            B = new Array(I + 1);
                        for (o = 0; o < I; o++) "CURVE" == A.tag[o] ? D[o] = c(d(_[a(o - 1, I)], _[o], _[a(o + 1, I)])) : D[o] = 0;
                        for (x = 0, B[0] = 0, l = A.vertex[0], o = 0; o < I; o++) u = a(o + 1, I), "CURVE" == A.tag[u] && (x += .3 * (w = A.alpha[u]) * (4 - w) * d(A.c[3 * o + 2], _[u], A.c[3 * u + 2]) / 2, x += d(l, A.c[3 * o + 2], A.c[3 * u + 2]) / 2), B[o + 1] = x;
                        for (F[0] = -1, S[0] = 0, R[0] = 0, s = 1; s <= I; s++)
                            for (F[s] = s - 1, S[s] = S[s - 1], R[s] = R[s - 1] + 1, o = s - 2; o >= 0 && ! function (t, e, r, i, n, o, s) {
                                    var l, u, x, g, w, k, C, M, A, I, _, F, S, R, P, E, D, B, q, U, G, O, N, L = t.curve.n,
                                        z = t.curve,
                                        H = z.vertex;
                                    if (e == r) return 1;
                                    if (l = e, w = a(e + 1, L), u = a(l + 1, L), 0 === (g = o[u])) return 1;
                                    for (M = y(H[e], H[w]), l = u; l != r; l = u) {
                                        if (u = a(l + 1, L), x = a(l + 2, L), o[u] != g) return 1;
                                        if (c(f(H[e], H[w], H[u], H[x])) != g) return 1;
                                        if (v(H[e], H[w], H[u], H[x]) < M * y(H[u], H[x]) * -.999847695156) return 1
                                    }
                                    if (_ = z.c[3 * a(e, L) + 2].copy(), F = H[a(e + 1, L)].copy(), S = H[a(r, L)].copy(), R = z.c[3 * a(r, L) + 2].copy(), k = s[r] - s[e], k -= d(H[0], z.c[3 * e + 2], z.c[3 * r + 2]) / 2, e >= r && (k += s[L]), B = d(_, F, S), q = d(_, F, R), U = d(_, S, R), G = B + U - q, q == B) return 1;
                                    if (N = U / (U - G), O = q / (q - B), 0 == (E = q * N / 2)) return 1;
                                    for (D = k / E, C = 2 - Math.sqrt(4 - D / .3), i.c[0] = h(N * C, _, F), i.c[1] = h(O * C, R, S), i.alpha = C, i.t = N, i.s = O, F = i.c[0].copy(), S = i.c[1].copy(), i.pen = 0, l = a(e + 1, L); l != r; l = u) {
                                        if (u = a(l + 1, L), (N = b(_, F, S, R, H[l], H[u])) < -.5) return 1;
                                        if (P = m(N, _, F, S, R), 0 === (M = y(H[l], H[u]))) return 1;
                                        if (A = d(H[l], H[u], P) / M, Math.abs(A) > n) return 1;
                                        if (p(H[l], H[u], P) < 0 || p(H[u], H[l], P) < 0) return 1;
                                        i.pen += A * A
                                    }
                                    for (l = e; l != r; l = u) {
                                        if (u = a(l + 1, L), (N = b(_, F, S, R, z.c[3 * l + 2], z.c[3 * u + 2])) < -.5) return 1;
                                        if (P = m(N, _, F, S, R), 0 === (M = y(z.c[3 * l + 2], z.c[3 * u + 2]))) return 1;
                                        if (A = d(z.c[3 * l + 2], z.c[3 * u + 2], P) / M, I = d(z.c[3 * l + 2], z.c[3 * u + 2], H[u]) / M, (I *= .75 * z.alpha[u]) < 0 && (A = -A, I = -I), A < I - n) return 1;
                                        A < I && (i.pen += (A - I) * (A - I))
                                    }
                                    return 0
                                }(e, o, a(s, I), E, g.opttolerance, D, B); o--)(R[s] > R[o] + 1 || R[s] == R[o] + 1 && S[s] > S[o] + E.pen) && (F[s] = o, S[s] = S[o] + E.pen, R[s] = R[o] + 1, P[s] = E, E = new r);
                        for (k = new i(n = R[I]), C = new Array(n), M = new Array(n), s = I, o = n - 1; o >= 0; o--) F[s] == s - 1 ? (k.tag[o] = A.tag[a(s, I)], k.c[3 * o + 0] = A.c[3 * a(s, I) + 0], k.c[3 * o + 1] = A.c[3 * a(s, I) + 1], k.c[3 * o + 2] = A.c[3 * a(s, I) + 2], k.vertex[o] = A.vertex[a(s, I)], k.alpha[o] = A.alpha[a(s, I)], k.alpha0[o] = A.alpha0[a(s, I)], k.beta[o] = A.beta[a(s, I)], C[o] = M[o] = 1) : (k.tag[o] = "CURVE", k.c[3 * o + 0] = P[s].c[0], k.c[3 * o + 1] = P[s].c[1], k.c[3 * o + 2] = A.c[3 * a(s, I) + 2], k.vertex[o] = h(P[s].s, A.c[3 * a(s, I) + 2], _[a(s, I)]), k.alpha[o] = P[s].alpha, k.alpha0[o] = P[s].alpha, C[o] = P[s].s, M[o] = P[s].t), s = F[s];
                        for (o = 0; o < n; o++) u = a(o + 1, n), k.beta[o] = C[o] / (C[o] + M[u]);
                        k.alphacurve = 1, e.curve = k
                    }(k)
            }
        }

        function s(t) {
            t && (l = t), g.isReady ? (o(), c(), l(), l = null) : setTimeout(function () {
                s(t)
            }, 100)
        }

        function h() {
            f = null, x = [], l = null, g.isReady = !1
        }
        t.prototype.copy = function () {
            return new t(this.x, this.y)
        }, e.prototype.at = function (t, e) {
            return t >= 0 && t < this.w && e >= 0 && e < this.h && 1 === this.data[this.w * e + t]
        }, e.prototype.index = function (e) {
            var r = new t;
            return r.y = Math.floor(e / this.w), r.x = e - r.y * this.w, r
        }, e.prototype.flip = function (t, e) {
            this.at(t, e) ? this.data[this.w * e + t] = 0 : this.data[this.w * e + t] = 1
        }, e.prototype.copy = function () {
            var t, r = new e(this.w, this.h);
            for (t = 0; t < this.size; t++) r.data[t] = this.data[t];
            return r
        };
        var l, u = document.createElement("img"),
            d = document.createElement("canvas"),
            f = null,
            p = 800,
            x = [],
            g = {
                isReady: !1,
                turnpolicy: "minority",
                turdsize: 5,
                optcurve: !0,
                alphamax: 1,
                opttolerance: 1
            };
        return u.onload = function () {
            a(), n()
        }, {
            loadImageFromFile: function (t) {
                g.isReady && h(), u.file = t;
                var e = new FileReader;
                e.onload = function (t) {
                    return function (e) {
                        t.src = e.target.result
                    }
                }(u), e.readAsDataURL(t)
            },
            loadImageFromUrl: function (t) {
                g.isReady && h(), u.src = t
            },
            setParameter: function (t) {
                var e;
                for (e in t) t.hasOwnProperty(e) && (g[e] = t[e])
            },
            loadFromCanvas: function (t) {
                g.isReady && h(), d.width = t.width, d.height = t.height;
                var r = d.getContext("2d");
                r.clearRect(0, 0, d.width, d.height), r.drawImage(t, 0, 0, d.width, d.height), f = new e(d.width, d.height);
                var i, a, n, o = r.getImageData(0, 0, f.w, f.h),
                    c = o.data.length;
                for (i = 0, a = 0; i < c; i += 4, a++) o.data[i + 3] > 0 && (n = .2126 * o.data[i] + .7153 * o.data[i + 1] + .0721 * o.data[i + 2], f.data[a] = n < 128 ? 1 : 0);
                g.isReady = !0
            },
            process: s,
            getSVG: function (t, e, r) {
                var i, a, n, o, c = f.w * t,
                    s = f.h * t,
                    h = x.length,
                    l = '<svg id="svg" version="1.1" width="' + c + '" height="' + s + '" xmlns="http://www.w3.org/2000/svg">';
                for (l += '<path d="', i = 0; i < h; i++) l += function (e) {
                    var r, i = e.n,
                        a = "M" + (e.c[3 * (i - 1) + 2].x * t).toFixed(3) + " " + (e.c[3 * (i - 1) + 2].y * t).toFixed(3) + " ";
                    for (r = 0; r < i; r++) "CURVE" === e.tag[r] ? a += function (r) {
                        var i = "C " + (e.c[3 * r + 0].x * t).toFixed(3) + " " + (e.c[3 * r + 0].y * t).toFixed(3) + ",";
                        return i += (e.c[3 * r + 1].x * t).toFixed(3) + " " + (e.c[3 * r + 1].y * t).toFixed(3) + ",", i += (e.c[3 * r + 2].x * t).toFixed(3) + " " + (e.c[3 * r + 2].y * t).toFixed(3) + " "
                    }(r) : "CORNER" === e.tag[r] && (a += function (r) {
                        var i = "L " + (e.c[3 * r + 1].x * t).toFixed(3) + " " + (e.c[3 * r + 1].y * t).toFixed(3) + " ";
                        return i += (e.c[3 * r + 2].x * t).toFixed(3) + " " + (e.c[3 * r + 2].y * t).toFixed(3) + " "
                    }(r));
                    return a
                }(x[i].curve);
                return "curve" === e ? (a = "black", n = "none", o = "") : (a = "none", n = r, o = ' fill-rule="evenodd"'), l += '" stroke="' + a + '" fill="' + n + '"' + o + "/></svg>"
            },
            getPath: function (t, e, r, i) {
                f.w, f.h;
                var a, n, o, c, s = x.length,
                    h = "";
                for (h += '<path d="', a = 0; a < s; a++) h += function (e) {
                    var r, i = e.n,
                        a = "M" + (e.c[3 * (i - 1) + 2].x * t).toFixed(3) + " " + (e.c[3 * (i - 1) + 2].y * t).toFixed(3) + " ";
                    for (r = 0; r < i; r++) "CURVE" === e.tag[r] ? a += function (r) {
                        var i = "C " + (e.c[3 * r + 0].x * t).toFixed(3) + " " + (e.c[3 * r + 0].y * t).toFixed(3) + ",";
                        return i += (e.c[3 * r + 1].x * t).toFixed(3) + " " + (e.c[3 * r + 1].y * t).toFixed(3) + ",", i += (e.c[3 * r + 2].x * t).toFixed(3) + " " + (e.c[3 * r + 2].y * t).toFixed(3) + " "
                    }(r) : "CORNER" === e.tag[r] && (a += function (r) {
                        var i = "L " + (e.c[3 * r + 1].x * t).toFixed(3) + " " + (e.c[3 * r + 1].y * t).toFixed(3) + " ";
                        return i += (e.c[3 * r + 2].x * t).toFixed(3) + " " + (e.c[3 * r + 2].y * t).toFixed(3) + " "
                    }(r));
                    return a
                }(x[a].curve);
                return "curve" === e ? (n = "black", o = "none", c = "") : (n = "none", o = r, c = ' fill-rule="evenodd"'), h += '" stroke="' + n + '" fill="' + o + '"' + c + "/>", i && (h = h.replace("<path d", '<path id="' + i + '" d')), h
            },
            getPathd: function (t, e, r) {
                f.w, f.h;
                var i, a = x.length,
                    n = "";
                for (i = 0; i < a; i++) n += function (e) {
                    var r, i = e.n,
                        a = "M" + (e.c[3 * (i - 1) + 2].x * t).toFixed(3) + " " + (e.c[3 * (i - 1) + 2].y * t).toFixed(3) + " ";
                    for (r = 0; r < i; r++) "CURVE" === e.tag[r] ? a += function (r) {
                        var i = "C " + (e.c[3 * r + 0].x * t).toFixed(3) + " " + (e.c[3 * r + 0].y * t).toFixed(3) + ",";
                        return i += (e.c[3 * r + 1].x * t).toFixed(3) + " " + (e.c[3 * r + 1].y * t).toFixed(3) + ",", i += (e.c[3 * r + 2].x * t).toFixed(3) + " " + (e.c[3 * r + 2].y * t).toFixed(3) + " "
                    }(r) : "CORNER" === e.tag[r] && (a += function (r) {
                        var i = "L " + (e.c[3 * r + 1].x * t).toFixed(3) + " " + (e.c[3 * r + 1].y * t).toFixed(3) + " ";
                        return i += (e.c[3 * r + 2].x * t).toFixed(3) + " " + (e.c[3 * r + 2].y * t).toFixed(3) + " "
                    }(r));
                    return a
                }(x[i].curve);
                return n
            },
            img: u
        }
    }(),
    mul_table = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259],
    shg_table = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];