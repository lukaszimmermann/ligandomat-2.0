/*
 Highcharts 4.1.9 JS v/Highstock 2.1.9 (2015-10-07)

 (c) 2009-2014 Torstein Honsi

 License: www.highcharts.com/license

 Highcharts funnel module

 (c) 2010-2014 Torstein Honsi

 License: www.highcharts.com/license
 Highcharts 4.1.9 JS v/Highstock 2.1.9 (2015-10-07)
 Data module

 (c) 2012-2014 Torstein Honsi

 License: www.highcharts.com/license
 Highcharts 4.1.9 JS v/Highstock 2.1.9 (2015-10-07)
 Plugin for displaying a message when there is no data visible in chart.

 (c) 2010-2014 Highsoft AS
 Author: Oystein Moseng

 License: www.highcharts.com/license
 Highcharts 4.1.9 JS v/Highstock 2.1.9 (2015-10-07)
 Solid angular gauge module

 (c) 2010-2014 Torstein Honsi

 License: www.highcharts.com/license
 Highcharts 4.1.9 JS v/Highstock 2.1.9 (2015-10-07)

 (c) 2011-2014 Torstein Honsi

 License: www.highcharts.com/license
 */
(function () {
    function r() {
        var a, b = arguments, c, d = {}, e = function (a, b) {
            var c, d;
            "object" !== typeof a && (a = {});
            for (d in b)b.hasOwnProperty(d) && ((c = b[d]) && "object" === typeof c && "[object Array]" !== Object.prototype.toString.call(c) && "renderTo" !== d && "number" !== typeof c.nodeType ? a[d] = e(a[d] || {}, c) : a[d] = b[d]);
            return a
        };
        !0 === b[0] && (d = b[1], b = Array.prototype.slice.call(b, 2));
        c = b.length;
        for (a = 0; a < c; a++)d = e(d, b[a]);
        return d
    }

    function C(a, b) {
        return parseInt(a, b || 10)
    }

    function ia(a) {
        return "string" === typeof a
    }

    function Y(a) {
        return a &&
            "object" === typeof a
    }

    function P(a) {
        return "[object Array]" === Object.prototype.toString.call(a)
    }

    function T(a) {
        return "number" === typeof a
    }

    function J(a) {
        return na.log(a) / na.LN10
    }

    function p(a) {
        return na.pow(10, a)
    }

    function q(a, b) {
        for (var c = a.length; c--;)if (a[c] === b) {
            a.splice(c, 1);
            break
        }
    }

    function t(a) {
        return a !== G && null !== a
    }

    function F(a, b, c) {
        var d, e;
        if (ia(b))t(c) ? a.setAttribute(b, c) : a && a.getAttribute && (e = a.getAttribute(b)); else if (t(b) && Y(b))for (d in b)a.setAttribute(d, b[d]);
        return e
    }

    function B(a) {
        return P(a) ?
            a : [a]
    }

    function A(a, b) {
        Ia && !ua && b && b.opacity !== G && (b.filter = "alpha(opacity=" + 100 * b.opacity + ")");
        O(a.style, b)
    }

    function E(a, b, c, d, e) {
        a = da.createElement(a);
        b && O(a, b);
        e && A(a, {padding: 0, border: "none", margin: 0});
        c && A(a, c);
        d && d.appendChild(a);
        return a
    }

    function R(a, b) {
        var c = function () {
            return G
        };
        c.prototype = new a;
        O(c.prototype, b);
        return c
    }

    function oa(a, b) {
        return Array((b || 2) + 1 - String(a).length).join(0) + a
    }

    function za(a, b) {
        return /%$/.test(a) ? b * parseFloat(a) / 100 : parseFloat(a)
    }

    function U(a) {
        return 6E4 * (mb && mb(a) ||
            zb || 0)
    }

    function n(a, b) {
        for (var c = "{", d = !1, e, f, g, h, k, m = []; -1 !== (c = a.indexOf(c));) {
            e = a.slice(0, c);
            if (d) {
                f = e.split(":");
                g = f.shift().split(".");
                k = g.length;
                e = b;
                for (h = 0; h < k; h++)e = e[g[h]];
                f.length && (f = f.join(":"), g = /\.([0-9])/, h = ma.lang, k = void 0, /f$/.test(f) ? (k = (k = f.match(g)) ? k[1] : -1, null !== e && (e = V.numberFormat(e, k, h.decimalPoint, -1 < f.indexOf(",") ? h.thousandsSep : ""))) : e = va(f, e))
            }
            m.push(e);
            a = a.slice(c + 1);
            c = (d = !d) ? "}" : "{"
        }
        m.push(a);
        return m.join("")
    }

    function v(a) {
        return na.pow(10, ea(na.log(a) / na.LN10))
    }

    function Q(a,
               b, c, d, e) {
        var f, g = a;
        c = z(c, 1);
        f = a / c;
        b || (b = [1, 2, 2.5, 5, 10], !1 === d && (1 === c ? b = [1, 2, 5, 10] : .1 >= c && (b = [1 / c])));
        for (d = 0; d < b.length && !(g = b[d], e && g * c >= a || !e && f <= (b[d] + (b[d + 1] || b[d])) / 2); d++);
        return g * c
    }

    function N(a, b) {
        var c = a.length, d, e;
        for (e = 0; e < c; e++)a[e].ss_i = e;
        a.sort(function (a, c) {
            d = b(a, c);
            return 0 === d ? a.ss_i - c.ss_i : d
        });
        for (e = 0; e < c; e++)delete a[e].ss_i
    }

    function M(a) {
        for (var b = a.length, c = a[0]; b--;)a[b] < c && (c = a[b]);
        return c
    }

    function fa(a) {
        for (var b = a.length, c = a[0]; b--;)a[b] > c && (c = a[b]);
        return c
    }

    function ba(a,
                b) {
        for (var c in a)a[c] && a[c] !== b && a[c].destroy && a[c].destroy(), delete a[c]
    }

    function Ja(a) {
        nb || (nb = E("div"));
        a && nb.appendChild(a);
        nb.innerHTML = ""
    }

    function Aa(a, b) {
        var c = "Highcharts error #" + a + ": www.highcharts.com/errors/" + a;
        if (b)throw c;
        qa.console && console.log(c)
    }

    function xa(a, b) {
        return parseFloat(a.toPrecision(b || 14))
    }

    function ab(a, b) {
        b.renderer.globalAnimation = z(a, b.animation)
    }

    function Ya() {
        var a = ma.global, b = a.useUTC, c = b ? "getUTC" : "get", d = b ? "setUTC" : "set";
        ta = a.Date || window.Date;
        zb = b && a.timezoneOffset;
        mb = b && a.getTimezoneOffset;
        ob = function (a, c, d, h, k, m) {
            var l;
            b ? (l = ta.UTC.apply(0, arguments), l += U(l)) : l = (new ta(a, c, z(d, 1), z(h, 0), z(k, 0), z(m, 0))).getTime();
            return l
        };
        Ab = c + "Minutes";
        Bb = c + "Hours";
        Cb = c + "Day";
        eb = c + "Date";
        fb = c + "Month";
        gb = c + "FullYear";
        Qb = d + "Milliseconds";
        Rb = d + "Seconds";
        Sb = d + "Minutes";
        Tb = d + "Hours";
        Db = d + "Date";
        Eb = d + "Month";
        Fb = d + "FullYear"
    }

    function ka() {
    }

    function Ea(a, b, c, d) {
        this.axis = a;
        this.pos = b;
        this.type = c || "";
        this.isNew = !0;
        c || d || this.addLabel()
    }

    function Ka(a, b, c, d, e) {
        var f = a.chart.inverted;
        this.axis = a;
        this.isNegative = c;
        this.options = b;
        this.x = d;
        this.total = null;
        this.points = {};
        this.stack = e;
        this.alignOptions = {
            align: b.align || (f ? c ? "left" : "right" : "center"),
            verticalAlign: b.verticalAlign || (f ? "middle" : c ? "bottom" : "top"),
            y: z(b.y, f ? 4 : c ? 14 : -6),
            x: z(b.x, f ? c ? -6 : 6 : 0)
        };
        this.textAlign = b.textAlign || (f ? c ? "right" : "left" : "center")
    }

    function wa(a) {
        var b = a.options, c = b.navigator, d = c.enabled, b = b.scrollbar, e = b.enabled, f = d ? c.height : 0, g = e ? b.height : 0;
        this.handles = [];
        this.scrollbarButtons = [];
        this.elementsToDestroy = [];
        this.chart = a;
        this.setBaseSeries();
        this.height = f;
        this.scrollbarHeight = g;
        this.scrollbarEnabled = e;
        this.navigatorEnabled = d;
        this.navigatorOptions = c;
        this.scrollbarOptions = b;
        this.outlineHeight = f + g;
        this.init()
    }

    function Ra(a) {
        this.init(a)
    }

    function Ba(a, b, c) {
        this.init.call(this, a, b, c)
    }

    var G, da = document, qa = window, na = Math, K = na.round, ea = na.floor, La = na.ceil, I = na.max, S = na.min, ha = na.abs, Ca = na.cos, Ma = na.sin, Na = na.PI, bb = 2 * Na / 360, Ta = navigator.userAgent, Ub = qa.opera, Ia = /(msie|trident|edge)/i.test(Ta) && !Ub, pb = !Ia && /AppleWebKit/.test(Ta),
        Za = /Firefox/.test(Ta), hb = /(Mobile|Android|Windows Phone)/.test(Ta), ua = !!da.createElementNS && !!da.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, ec = Za && 4 > parseInt(Ta.split("Firefox/")[1], 10), Fa = !ua && !Ia && !!da.createElement("canvas").getContext, cb, Vb = {}, Gb = 0, nb, ma, va, Hb, ga, la = function () {
            return G
        }, ra = [], ib = 0, fc = /^[0-9]+$/, qb = ["plotTop", "marginRight", "marginBottom", "plotLeft"], ta, ob, zb, mb, Ab, Bb, Cb, eb, fb, gb, Qb, Rb, Sb, Tb, Db, Eb, Fb, L = {}, V;
    V = qa.Highcharts = qa.Highcharts ? Aa(16, !0) : {};
    V.seriesTypes =
        L;
    var O = V.extend = function (a, b) {
        var c;
        a || (a = {});
        for (c in b)a[c] = b[c];
        return a
    }, z = V.pick = function () {
        var a = arguments, b, c, d = a.length;
        for (b = 0; b < d; b++)if (c = a[b], c !== G && null !== c)return c
    }, W = V.wrap = function (a, b, c) {
        var d = a[b];
        a[b] = function () {
            var a = Array.prototype.slice.call(arguments);
            a.unshift(d);
            return c.apply(this, a)
        }
    };
    va = function (a, b, c) {
        if (!t(b) || isNaN(b))return ma.lang.invalidDate || "";
        a = z(a, "%Y-%m-%d %H:%M:%S");
        var d = new ta(b - U(b)), e, f = d[Bb](), g = d[Cb](), h = d[eb](), k = d[fb](), m = d[gb](), l = ma.lang, u = l.weekdays,
            d = O({
                a: u[g].substr(0, 3),
                A: u[g],
                d: oa(h),
                e: h,
                w: g,
                b: l.shortMonths[k],
                B: l.months[k],
                m: oa(k + 1),
                y: m.toString().substr(2, 2),
                Y: m,
                H: oa(f),
                k: f,
                I: oa(f % 12 || 12),
                l: f % 12 || 12,
                M: oa(d[Ab]()),
                p: 12 > f ? "AM" : "PM",
                P: 12 > f ? "am" : "pm",
                S: oa(d.getSeconds()),
                L: oa(K(b % 1E3), 3)
            }, V.dateFormats);
        for (e in d)for (; -1 !== a.indexOf("%" + e);)a = a.replace("%" + e, "function" === typeof d[e] ? d[e](b) : d[e]);
        return c ? a.substr(0, 1).toUpperCase() + a.substr(1) : a
    };
    ga = {
        millisecond: 1,
        second: 1E3,
        minute: 6E4,
        hour: 36E5,
        day: 864E5,
        week: 6048E5,
        month: 24192E5,
        year: 314496E5
    };
    V.numberFormat = function (a, b, c, d) {
        var e = ma.lang;
        a = +a || 0;
        var f = -1 === b ? S((a.toString().split(".")[1] || "").length, 20) : isNaN(b = ha(b)) ? 2 : b;
        b = void 0 === c ? e.decimalPoint : c;
        d = void 0 === d ? e.thousandsSep : d;
        e = 0 > a ? "-" : "";
        c = String(C(a = ha(a).toFixed(f)));
        var g = 3 < c.length ? c.length % 3 : 0;
        return e + (g ? c.substr(0, g) + d : "") + c.substr(g).replace(/(\d{3})(?=\d)/g, "$1" + d) + (f ? b + ha(a - c).toFixed(f).slice(2) : "")
    };
    Hb = {
        init: function (a, b, c) {
            b = b || "";
            var d = a.shift, e = -1 < b.indexOf("C"), f = e ? 7 : 3, g;
            b = b.split(" ");
            c = [].concat(c);
            var h, k, m = function (a) {
                for (g =
                         a.length; g--;)"M" === a[g] && a.splice(g + 1, 0, a[g + 1], a[g + 2], a[g + 1], a[g + 2])
            };
            e && (m(b), m(c));
            a.isArea && (h = b.splice(b.length - 6, 6), k = c.splice(c.length - 6, 6));
            if (d <= c.length / f && b.length === c.length)for (; d--;)c = [].concat(c).splice(0, f).concat(c);
            a.shift = 0;
            if (b.length)for (a = c.length; b.length < a;)d = [].concat(b).splice(b.length - f, f), e && (d[f - 6] = d[f - 2], d[f - 5] = d[f - 1]), b = b.concat(d);
            h && (b = b.concat(h), c = c.concat(k));
            return [b, c]
        }, step: function (a, b, c, d) {
            var e = [], f = a.length;
            if (1 === c)e = d; else if (f === b.length && 1 > c)for (; f--;)d =
                parseFloat(a[f]), e[f] = isNaN(d) ? a[f] : c * parseFloat(b[f] - d) + d; else e = b;
            return e
        }
    };
    (function (a) {
        qa.HighchartsAdapter = qa.HighchartsAdapter || a && {
                init: function (b) {
                    var c = a.fx;
                    a.extend(a.easing, {
                        easeOutQuad: function (a, b, c, g, h) {
                            return -g * (b /= h) * (b - 2) + c
                        }
                    });
                    a.each(["cur", "_default", "width", "height", "opacity"], function (b, e) {
                        var f = c.step, g;
                        "cur" === e ? f = c.prototype : "_default" === e && a.Tween && (f = a.Tween.propHooks[e], e = "set");
                        (g = f[e]) && (f[e] = function (a) {
                            var c;
                            a = b ? a : this;
                            if ("align" !== a.prop)return c = a.elem, c.attr ? c.attr(a.prop,
                                "cur" === e ? G : a.now) : g.apply(this, arguments)
                        })
                    });
                    W(a.cssHooks.opacity, "get", function (a, b, c) {
                        return b.attr ? b.opacity || 0 : a.call(this, b, c)
                    });
                    this.addAnimSetter("d", function (a) {
                        var c = a.elem, f;
                        a.started || (f = b.init(c, c.d, c.toD), a.start = f[0], a.end = f[1], a.started = !0);
                        c.attr("d", b.step(a.start, a.end, a.pos, c.toD))
                    });
                    this.each = Array.prototype.forEach ? function (a, b) {
                        return Array.prototype.forEach.call(a, b)
                    } : function (a, b) {
                        var c, g = a.length;
                        for (c = 0; c < g; c++)if (!1 === b.call(a[c], a[c], c, a))return c
                    };
                    a.fn.highcharts = function () {
                        var a =
                            "Chart", b = arguments, c, g;
                        this[0] && (ia(b[0]) && (a = b[0], b = Array.prototype.slice.call(b, 1)), c = b[0], c !== G && (c.chart = c.chart || {}, c.chart.renderTo = this[0], new V[a](c, b[1]), g = this), c === G && (g = ra[F(this[0], "data-highcharts-chart")]));
                        return g
                    }
                }, addAnimSetter: function (b, c) {
                    a.Tween ? a.Tween.propHooks[b] = {set: c} : a.fx.step[b] = c
                }, getScript: a.getScript, inArray: a.inArray, adapterRun: function (b, c) {
                    return a(b)[c]()
                }, grep: a.grep, map: function (a, c) {
                    for (var d = [], e = 0, f = a.length; e < f; e++)d[e] = c.call(a[e], a[e], e, a);
                    return d
                },
                offset: function (b) {
                    return a(b).offset()
                }, addEvent: function (b, c, d) {
                    a(b).bind(c, d)
                }, removeEvent: function (b, c, d) {
                    var e = da.removeEventListener ? "removeEventListener" : "detachEvent";
                    da[e] && b && !b[e] && (b[e] = function () {
                    });
                    a(b).unbind(c, d)
                }, fireEvent: function (b, c, d, e) {
                    var f = a.Event(c), g = "detached" + c, h;
                    !Ia && d && (delete d.layerX, delete d.layerY, delete d.returnValue);
                    O(f, d);
                    b[c] && (b[g] = b[c], b[c] = null);
                    a.each(["preventDefault", "stopPropagation"], function (a, b) {
                        var c = f[b];
                        f[b] = function () {
                            try {
                                c.call(f)
                            } catch (a) {
                                "preventDefault" ===
                                b && (h = !0)
                            }
                        }
                    });
                    a(b).trigger(f);
                    b[g] && (b[c] = b[g], b[g] = null);
                    !e || f.isDefaultPrevented() || h || e(f)
                }, washMouseEvent: function (a) {
                    var c = a.originalEvent || a;
                    c.pageX === G && (c.pageX = a.pageX, c.pageY = a.pageY);
                    return c
                }, animate: function (b, c, d) {
                    var e = a(b);
                    b.style || (b.style = {});
                    c.d && (b.toD = c.d, c.d = 1);
                    e.stop();
                    c.opacity !== G && b.attr && (c.opacity += "px");
                    b.hasAnim = 1;
                    e.animate(c, d)
                }, stop: function (b) {
                    b.hasAnim && a(b).stop()
                }
            }
    })(qa.jQuery);
    var rb = qa.HighchartsAdapter, Da = rb || {};
    rb && rb.init.call(rb, Hb);
    var sb = Da.adapterRun, Ua =
        Da.inArray, x = V.each = Da.each, jb = Da.grep, gc = Da.offset, Ga = Da.map, X = Da.addEvent, pa = Da.removeEvent, ja = Da.fireEvent, hc = Da.washMouseEvent, tb = Da.animate, db = Da.stop;
    ma = {
        colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
        symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
        lang: {
            loading: "Loading...",
            months: "January February March April May June July August September October November December".split(" "),
            shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
            decimalPoint: ".",
            numericSymbols: "kMGTPE".split(""),
            resetZoom: "Reset zoom",
            resetZoomTitle: "Reset zoom level 1:1",
            thousandsSep: " "
        },
        global: {
            useUTC: !0,
            canvasToolsURL: "http://code.highcharts.com@product.cdnpath@//Highstock 2.1.9/modules/canvas-tools.js",
            VMLRadialGradientURL: "http://code.highcharts.com@product.cdnpath@//Highstock 2.1.9/gfx/vml-radial-gradient.png"
        },
        chart: {
            borderColor: "#4572A7",
            borderRadius: 0,
            defaultSeriesType: "line",
            ignoreHiddenSeries: !0,
            spacing: [10, 10, 15, 10],
            backgroundColor: "#FFFFFF",
            plotBorderColor: "#C0C0C0",
            resetZoomButton: {theme: {zIndex: 20}, position: {align: "right", x: -10, y: 10}}
        },
        title: {text: "Chart title", align: "center", margin: 15, style: {color: "#333333", fontSize: "18px"}},
        subtitle: {text: "", align: "center", style: {color: "#555555"}},
        plotOptions: {
            line: {
                allowPointSelect: !1,
                showCheckbox: !1,
                animation: {duration: 1E3},
                events: {},
                lineWidth: 2,
                marker: {
                    lineWidth: 0, radius: 4, lineColor: "#FFFFFF", states: {
                        hover: {
                            enabled: !0, lineWidthPlus: 1,
                            radiusPlus: 2
                        }, select: {fillColor: "#FFFFFF", lineColor: "#000000", lineWidth: 2}
                    }
                },
                point: {events: {}},
                dataLabels: {
                    align: "center",
                    formatter: function () {
                        return null === this.y ? "" : V.numberFormat(this.y, -1)
                    },
                    style: {
                        color: "contrast",
                        fontSize: "11px",
                        fontWeight: "bold",
                        textShadow: "0 0 6px contrast, 0 0 3px contrast"
                    },
                    verticalAlign: "bottom",
                    x: 0,
                    y: 0,
                    padding: 5
                },
                cropThreshold: 300,
                pointRange: 0,
                softThreshold: !0,
                states: {hover: {lineWidthPlus: 1, marker: {}, halo: {size: 10, opacity: .25}}, select: {marker: {}}},
                stickyTracking: !0,
                turboThreshold: 1E3
            }
        },
        labels: {style: {position: "absolute", color: "#3E576F"}},
        legend: {
            enabled: !0,
            align: "center",
            layout: "horizontal",
            labelFormatter: function () {
                return this.name
            },
            borderColor: "#909090",
            borderRadius: 0,
            navigation: {activeColor: "#274b6d", inactiveColor: "#CCC"},
            shadow: !1,
            itemStyle: {color: "#333333", fontSize: "12px", fontWeight: "bold"},
            itemHoverStyle: {color: "#000"},
            itemHiddenStyle: {color: "#CCC"},
            itemCheckboxStyle: {position: "absolute", width: "13px", height: "13px"},
            symbolPadding: 5,
            verticalAlign: "bottom",
            x: 0,
            y: 0,
            title: {style: {fontWeight: "bold"}}
        },
        loading: {
            labelStyle: {fontWeight: "bold", position: "relative", top: "45%"},
            style: {position: "absolute", backgroundColor: "white", opacity: .5, textAlign: "center"}
        },
        tooltip: {
            enabled: !0,
            animation: ua,
            backgroundColor: "rgba(249, 249, 249, .85)",
            borderWidth: 1,
            borderRadius: 3,
            dateTimeLabelFormats: {
                millisecond: "%A, %b %e, %H:%M:%S.%L",
                second: "%A, %b %e, %H:%M:%S",
                minute: "%A, %b %e, %H:%M",
                hour: "%A, %b %e, %H:%M",
                day: "%A, %b %e, %Y",
                week: "Week from %A, %b %e, %Y",
                month: "%B %Y",
                year: "%Y"
            },
            footerFormat: "",
            headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
            pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
            shadow: !0,
            snap: hb ? 25 : 10,
            style: {
                color: "#333333",
                cursor: "default",
                fontSize: "12px",
                padding: "8px",
                pointerEvents: "none",
                whiteSpace: "nowrap"
            }
        },
        credits: {
            enabled: !0,
            text: "Highcharts.com",
            href: "http://www.highcharts.com",
            position: {align: "right", x: -10, verticalAlign: "bottom", y: -5},
            style: {cursor: "pointer", color: "#909090", fontSize: "9px"}
        }
    };
    var Z = ma.plotOptions, kb = Z.line;
    Ya();
    var ic = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
        jc = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/, kc = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, Oa = function (a) {
            var b = [], c, d;
            (function (a) {
                a && a.stops ? d = Ga(a.stops, function (a) {
                    return Oa(a[1])
                }) : (c = ic.exec(a)) ? b = [C(c[1]), C(c[2]), C(c[3]), parseFloat(c[4], 10)] : (c = jc.exec(a)) ? b = [C(c[1], 16), C(c[2], 16), C(c[3], 16), 1] : (c = kc.exec(a)) && (b = [C(c[1]), C(c[2]), C(c[3]), 1])
            })(a);
            return {
                get: function (c) {
                    var f;
                    d ? (f = r(a), f.stops = [].concat(f.stops), x(d, function (a, b) {
                        f.stops[b] = [f.stops[b][0], a.get(c)]
                    })) :
                        f = b && !isNaN(b[0]) ? "rgb" === c ? "rgb(" + b[0] + "," + b[1] + "," + b[2] + ")" : "a" === c ? b[3] : "rgba(" + b.join(",") + ")" : a;
                    return f
                }, brighten: function (a) {
                    if (d)x(d, function (b) {
                        b.brighten(a)
                    }); else if (T(a) && 0 !== a) {
                        var c;
                        for (c = 0; 3 > c; c++)b[c] += C(255 * a), 0 > b[c] && (b[c] = 0), 255 < b[c] && (b[c] = 255)
                    }
                    return this
                }, rgba: b, setOpacity: function (a) {
                    b[3] = a;
                    return this
                }, raw: a
            }
        };
    ka.prototype = {
        opacity: 1,
        textProps: "fontSize fontWeight fontFamily fontStyle color lineHeight width textDecoration textOverflow textShadow".split(" "),
        init: function (a,
                        b) {
            this.element = "span" === b ? E(b) : da.createElementNS("http://www.w3.org/2000/svg", b);
            this.renderer = a
        },
        animate: function (a, b, c) {
            b = z(b, this.renderer.globalAnimation, !0);
            db(this);
            b ? (b = r(b, {}), c && (b.complete = c), tb(this, a, b)) : this.attr(a, null, c);
            return this
        },
        colorGradient: function (a, b, c) {
            var d = this.renderer, e, f, g, h, k, m, l, u, w, y, H, D = [];
            a.linearGradient ? f = "linearGradient" : a.radialGradient && (f = "radialGradient");
            if (f) {
                g = a[f];
                k = d.gradients;
                l = a.stops;
                y = c.radialReference;
                P(g) && (a[f] = g = {
                    x1: g[0], y1: g[1], x2: g[2], y2: g[3],
                    gradientUnits: "userSpaceOnUse"
                });
                "radialGradient" === f && y && !t(g.gradientUnits) && (h = g, g = r(g, d.getRadialAttr(y, h), {gradientUnits: "userSpaceOnUse"}));
                for (H in g)"id" !== H && D.push(H, g[H]);
                for (H in l)D.push(l[H]);
                D = D.join(",");
                k[D] ? a = k[D].attr("id") : (g.id = a = "highcharts-" + Gb++, k[D] = m = d.createElement(f).attr(g).add(d.defs), m.radAttr = h, m.stops = [], x(l, function (a) {
                    0 === a[1].indexOf("rgba") ? (e = Oa(a[1]), u = e.get("rgb"), w = e.get("a")) : (u = a[1], w = 1);
                    a = d.createElement("stop").attr({offset: a[0], "stop-color": u, "stop-opacity": w}).add(m);
                    m.stops.push(a)
                }));
                c.setAttribute(b, "url(" + d.url + "#" + a + ")");
                c.gradient = D
            }
        },
        applyTextShadow: function (a) {
            var b = this.element, c, d = -1 !== a.indexOf("contrast"), e = {}, f = this.renderer.forExport, g = f || b.style.textShadow !== G && !Ia;
            d && (e.textShadow = a = a.replace(/contrast/g, this.renderer.getContrast(b.style.fill)));
            if (pb || f)e.textRendering = "geometricPrecision";
            g ? this.css(e) : (this.fakeTS = !0, this.ySetter = this.xSetter, c = [].slice.call(b.getElementsByTagName("tspan")), x(a.split(/\s?,\s?/g), function (a) {
                var d = b.firstChild,
                    e, f;
                a = a.split(" ");
                e = a[a.length - 1];
                (f = a[a.length - 2]) && x(c, function (a, c) {
                    var g;
                    0 === c && (a.setAttribute("x", b.getAttribute("x")), c = b.getAttribute("y"), a.setAttribute("y", c || 0), null === c && b.setAttribute("y", 0));
                    g = a.cloneNode(1);
                    F(g, {
                        "class": "highcharts-text-shadow",
                        fill: e,
                        stroke: e,
                        "stroke-opacity": 1 / I(C(f), 3),
                        "stroke-width": f,
                        "stroke-linejoin": "round"
                    });
                    b.insertBefore(g, d)
                })
            }))
        },
        attr: function (a, b, c) {
            var d, e = this.element, f, g = this, h;
            "string" === typeof a && b !== G && (d = a, a = {}, a[d] = b);
            if ("string" === typeof a)g =
                (this[a + "Getter"] || this._defaultGetter).call(this, a, e); else {
                for (d in a)b = a[d], h = !1, this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(d) && (f || (this.symbolAttr(a), f = !0), h = !0), !this.rotation || "x" !== d && "y" !== d || (this.doTransform = !0), h || (this[d + "Setter"] || this._defaultSetter).call(this, b, d, e), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(d) && this.updateShadows(d, b);
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            }
            c && c();
            return g
        },
        updateShadows: function (a,
                                 b) {
            for (var c = this.shadows, d = c.length; d--;)c[d].setAttribute(a, "height" === a ? I(b - (c[d].cutHeight || 0), 0) : "d" === a ? this.d : b)
        },
        addClass: function (a) {
            var b = this.element, c = F(b, "class") || "";
            -1 === c.indexOf(a) && F(b, "class", c + " " + a);
            return this
        },
        symbolAttr: function (a) {
            var b = this;
            x("x y r start end width height innerR anchorX anchorY".split(" "), function (c) {
                b[c] = z(a[c], b[c])
            });
            b.attr({d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b)})
        },
        clip: function (a) {
            return this.attr("clip-path", a ? "url(" + this.renderer.url +
            "#" + a.id + ")" : "none")
        },
        crisp: function (a) {
            var b, c = {}, d, e = a.strokeWidth || this.strokeWidth || 0;
            d = K(e) % 2 / 2;
            a.x = ea(a.x || this.x || 0) + d;
            a.y = ea(a.y || this.y || 0) + d;
            a.width = ea((a.width || this.width || 0) - 2 * d);
            a.height = ea((a.height || this.height || 0) - 2 * d);
            a.strokeWidth = e;
            for (b in a)this[b] !== a[b] && (this[b] = c[b] = a[b]);
            return c
        },
        css: function (a) {
            var b = this.styles, c = {}, d = this.element, e, f, g = "";
            e = !b;
            a && a.color && (a.fill = a.color);
            if (b)for (f in a)a[f] !== b[f] && (c[f] = a[f], e = !0);
            if (e) {
                e = this.textWidth = a && a.width && "text" === d.nodeName.toLowerCase() &&
                    C(a.width) || this.textWidth;
                b && (a = O(b, c));
                this.styles = a;
                e && (Fa || !ua && this.renderer.forExport) && delete a.width;
                if (Ia && !ua)A(this.element, a); else {
                    b = function (a, b) {
                        return "-" + b.toLowerCase()
                    };
                    for (f in a)g += f.replace(/([A-Z])/g, b) + ":" + a[f] + ";";
                    F(d, "style", g)
                }
                e && this.added && this.renderer.buildText(this)
            }
            return this
        },
        on: function (a, b) {
            var c = this, d = c.element;
            cb && "click" === a ? (d.ontouchstart = function (a) {
                c.touchEventFired = ta.now();
                a.preventDefault();
                b.call(d, a)
            }, d.onclick = function (a) {
                (-1 === Ta.indexOf("Android") ||
                1100 < ta.now() - (c.touchEventFired || 0)) && b.call(d, a)
            }) : d["on" + a] = b;
            return this
        },
        setRadialReference: function (a) {
            var b = this.renderer.gradients[this.element.gradient];
            this.element.radialReference = a;
            b && b.radAttr && b.animate(this.renderer.getRadialAttr(a, b.radAttr));
            return this
        },
        translate: function (a, b) {
            return this.attr({translateX: a, translateY: b})
        },
        invert: function () {
            this.inverted = !0;
            this.updateTransform();
            return this
        },
        updateTransform: function () {
            var a = this.translateX || 0, b = this.translateY || 0, c = this.scaleX,
                d = this.scaleY, e = this.inverted, f = this.rotation, g = this.element;
            e && (a += this.attr("width"), b += this.attr("height"));
            a = ["translate(" + a + "," + b + ")"];
            e ? a.push("rotate(90) scale(-1,1)") : f && a.push("rotate(" + f + " " + (g.getAttribute("x") || 0) + " " + (g.getAttribute("y") || 0) + ")");
            (t(c) || t(d)) && a.push("scale(" + z(c, 1) + " " + z(d, 1) + ")");
            a.length && g.setAttribute("transform", a.join(" "))
        },
        toFront: function () {
            var a = this.element;
            a.parentNode.appendChild(a);
            return this
        },
        align: function (a, b, c) {
            var d, e, f, g, h = {};
            e = this.renderer;
            f = e.alignedObjects;
            if (a) {
                if (this.alignOptions = a, this.alignByTranslate = b, !c || ia(c))this.alignTo = d = c || "renderer", q(f, this), f.push(this), c = null
            } else a = this.alignOptions, b = this.alignByTranslate, d = this.alignTo;
            c = z(c, e[d], e);
            d = a.align;
            e = a.verticalAlign;
            f = (c.x || 0) + (a.x || 0);
            g = (c.y || 0) + (a.y || 0);
            if ("right" === d || "center" === d)f += (c.width - (a.width || 0)) / {right: 1, center: 2}[d];
            h[b ? "translateX" : "x"] = K(f);
            if ("bottom" === e || "middle" === e)g += (c.height - (a.height || 0)) / ({bottom: 1, middle: 2}[e] || 1);
            h[b ? "translateY" : "y"] = K(g);
            this[this.placed ?
                "animate" : "attr"](h);
            this.placed = !0;
            this.alignAttr = h;
            return this
        },
        getBBox: function (a) {
            var b, c = this.renderer, d, e = this.rotation, f = this.element, g = this.styles, h = e * bb;
            d = this.textStr;
            var k, m = f.style, l, u;
            d !== G && (u = ["", e || 0, g && g.fontSize, f.style.width].join(), u = "" === d || fc.test(d) ? "num:" + d.toString().length + u : d + u);
            u && !a && (b = c.cache[u]);
            if (!b) {
                if ("http://www.w3.org/2000/svg" === f.namespaceURI || c.forExport) {
                    try {
                        l = this.fakeTS && function (a) {
                                x(f.querySelectorAll(".highcharts-text-shadow"), function (b) {
                                    b.style.display =
                                        a
                                })
                            }, Za && m.textShadow ? (k = m.textShadow, m.textShadow = "") : l && l("none"), b = f.getBBox ? O({}, f.getBBox()) : {
                            width: f.offsetWidth,
                            height: f.offsetHeight
                        }, k ? m.textShadow = k : l && l("")
                    } catch (w) {
                    }
                    if (!b || 0 > b.width)b = {width: 0, height: 0}
                } else b = this.htmlGetBBox();
                c.isSVG && (a = b.width, d = b.height, Ia && g && "11px" === g.fontSize && "16.9" === d.toPrecision(3) && (b.height = d = 14), e && (b.width = ha(d * Ma(h)) + ha(a * Ca(h)), b.height = ha(d * Ca(h)) + ha(a * Ma(h))));
                u && (c.cache[u] = b)
            }
            return b
        },
        show: function (a) {
            return this.attr({
                visibility: a ? "inherit" :
                    "visible"
            })
        },
        hide: function () {
            return this.attr({visibility: "hidden"})
        },
        fadeOut: function (a) {
            var b = this;
            b.animate({opacity: 0}, {
                duration: a || 150, complete: function () {
                    b.attr({y: -9999})
                }
            })
        },
        add: function (a) {
            var b = this.renderer, c = this.element, d;
            a && (this.parentGroup = a);
            this.parentInverted = a && a.inverted;
            void 0 !== this.textStr && b.buildText(this);
            this.added = !0;
            if (!a || a.handleZ || this.zIndex)d = this.zIndexSetter();
            d || (a ? a.element : b.box).appendChild(c);
            if (this.onAdd)this.onAdd();
            return this
        },
        safeRemoveChild: function (a) {
            var b =
                a.parentNode;
            b && b.removeChild(a)
        },
        destroy: function () {
            var a = this, b = a.element || {}, c = a.shadows, d = a.renderer.isSVG && "SPAN" === b.nodeName && a.parentGroup, e, f;
            b.onclick = b.onmouseout = b.onmouseover = b.onmousemove = b.point = null;
            db(a);
            a.clipPath && (a.clipPath = a.clipPath.destroy());
            if (a.stops) {
                for (f = 0; f < a.stops.length; f++)a.stops[f] = a.stops[f].destroy();
                a.stops = null
            }
            a.safeRemoveChild(b);
            for (c && x(c, function (b) {
                a.safeRemoveChild(b)
            }); d && d.div && 0 === d.div.childNodes.length;)b = d.parentGroup, a.safeRemoveChild(d.div), delete d.div,
                d = b;
            a.alignTo && q(a.renderer.alignedObjects, a);
            for (e in a)delete a[e];
            return null
        },
        shadow: function (a, b, c) {
            var d = [], e, f, g = this.element, h, k, m, l;
            if (a) {
                k = z(a.width, 3);
                m = (a.opacity || .15) / k;
                l = this.parentInverted ? "(-1,-1)" : "(" + z(a.offsetX, 1) + ", " + z(a.offsetY, 1) + ")";
                for (e = 1; e <= k; e++)f = g.cloneNode(0), h = 2 * k + 1 - 2 * e, F(f, {
                    isShadow: "true",
                    stroke: a.color || "black",
                    "stroke-opacity": m * e,
                    "stroke-width": h,
                    transform: "translate" + l,
                    fill: "none"
                }), c && (F(f, "height", I(F(f, "height") - h, 0)), f.cutHeight = h), b ? b.element.appendChild(f) :
                    g.parentNode.insertBefore(f, g), d.push(f);
                this.shadows = d
            }
            return this
        },
        xGetter: function (a) {
            "circle" === this.element.nodeName && (a = {x: "cx", y: "cy"}[a] || a);
            return this._defaultGetter(a)
        },
        _defaultGetter: function (a) {
            a = z(this[a], this.element ? this.element.getAttribute(a) : null, 0);
            /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
            return a
        },
        dSetter: function (a, b, c) {
            a && a.join && (a = a.join(" "));
            /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
            c.setAttribute(b, a);
            this[b] = a
        },
        dashstyleSetter: function (a) {
            var b;
            if (a = a && a.toLowerCase()) {
                a =
                    a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                for (b = a.length; b--;)a[b] = C(a[b]) * this["stroke-width"];
                a = a.join(",").replace("NaN", "none");
                this.element.setAttribute("stroke-dasharray", a)
            }
        },
        alignSetter: function (a) {
            this.element.setAttribute("text-anchor", {left: "start", center: "middle", right: "end"}[a])
        },
        opacitySetter: function (a,
                                 b, c) {
            this[b] = a;
            c.setAttribute(b, a)
        },
        titleSetter: function (a) {
            var b = this.element.getElementsByTagName("title")[0];
            b || (b = da.createElementNS("http://www.w3.org/2000/svg", "title"), this.element.appendChild(b));
            b.appendChild(da.createTextNode(String(z(a), "").replace(/<[^>]*>/g, "")))
        },
        textSetter: function (a) {
            a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
        },
        fillSetter: function (a, b, c) {
            "string" === typeof a ? c.setAttribute(b, a) : a && this.colorGradient(a, b, c)
        },
        visibilitySetter: function (a,
                                    b, c) {
            "inherit" === a ? c.removeAttribute(b) : c.setAttribute(b, a)
        },
        zIndexSetter: function (a, b) {
            var c = this.renderer, d = this.parentGroup, c = (d || c).element || c.box, e, f, g = this.element, h;
            e = this.added;
            var k;
            t(a) && (g.setAttribute(b, a), a = +a, this[b] === a && (e = !1), this[b] = a);
            if (e) {
                (a = this.zIndex) && d && (d.handleZ = !0);
                d = c.childNodes;
                for (k = 0; k < d.length && !h; k++)e = d[k], f = F(e, "zIndex"), e !== g && (C(f) > a || !t(a) && t(f)) && (c.insertBefore(g, e), h = !0);
                h || c.appendChild(g)
            }
            return h
        },
        _defaultSetter: function (a, b, c) {
            c.setAttribute(b, a)
        }
    };
    ka.prototype.yGetter =
        ka.prototype.xGetter;
    ka.prototype.translateXSetter = ka.prototype.translateYSetter = ka.prototype.rotationSetter = ka.prototype.verticalAlignSetter = ka.prototype.scaleXSetter = ka.prototype.scaleYSetter = function (a, b) {
        this[b] = a;
        this.doTransform = !0
    };
    ka.prototype["stroke-widthSetter"] = ka.prototype.strokeSetter = function (a, b, c) {
        this[b] = a;
        this.stroke && this["stroke-width"] ? (this.strokeWidth = this["stroke-width"], ka.prototype.fillSetter.call(this, this.stroke, "stroke", c), c.setAttribute("stroke-width", this["stroke-width"]),
            this.hasStroke = !0) : "stroke-width" === b && 0 === a && this.hasStroke && (c.removeAttribute("stroke"), this.hasStroke = !1)
    };
    var Pa = function () {
        this.init.apply(this, arguments)
    };
    Pa.prototype = {
        Element: ka, init: function (a, b, c, d, e, f) {
            var g = location, h;
            d = this.createElement("svg").attr({version: "1.1"}).css(this.getStyle(d));
            h = d.element;
            a.appendChild(h);
            -1 === a.innerHTML.indexOf("xmlns") && F(h, "xmlns", "http://www.w3.org/2000/svg");
            this.isSVG = !0;
            this.box = h;
            this.boxWrapper = d;
            this.alignedObjects = [];
            this.url = (Za || pb) && da.getElementsByTagName("base").length ?
                g.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
            this.createElement("desc").add().element.appendChild(da.createTextNode("Created with Highcharts 4.1.9 /Highstock 2.1.9"));
            this.defs = this.createElement("defs").add();
            this.allowHTML = f;
            this.forExport = e;
            this.gradients = {};
            this.cache = {};
            this.setSize(b, c, !1);
            var k;
            Za && a.getBoundingClientRect && (this.subPixelFix = b = function () {
                A(a, {left: 0, top: 0});
                k = a.getBoundingClientRect();
                A(a, {left: La(k.left) - k.left + "px", top: La(k.top) - k.top + "px"})
            },
                b(), X(qa, "resize", b))
        }, getStyle: function (a) {
            return this.style = O({
                fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                fontSize: "12px"
            }, a)
        }, isHidden: function () {
            return !this.boxWrapper.getBBox().width
        }, destroy: function () {
            var a = this.defs;
            this.box = null;
            this.boxWrapper = this.boxWrapper.destroy();
            ba(this.gradients || {});
            this.gradients = null;
            a && (this.defs = a.destroy());
            this.subPixelFix && pa(qa, "resize", this.subPixelFix);
            return this.alignedObjects = null
        }, createElement: function (a) {
            var b =
                new this.Element;
            b.init(this, a);
            return b
        }, draw: function () {
        }, getRadialAttr: function (a, b) {
            return {cx: a[0] - a[2] / 2 + b.cx * a[2], cy: a[1] - a[2] / 2 + b.cy * a[2], r: b.r * a[2]}
        }, buildText: function (a) {
            for (var b = a.element, c = this, d = c.forExport, e = z(a.textStr, "").toString(), f = -1 !== e.indexOf("<"), g = b.childNodes, h, k, m = F(b, "x"), l = a.styles, u = a.textWidth, w = l && l.lineHeight, y = l && l.textShadow, H = l && "ellipsis" === l.textOverflow, D = g.length, t = u && !a.added && this.box, n = function (a) {
                return w ? C(w) : c.fontMetrics(/(px|em)$/.test(a && a.style.fontSize) ?
                    a.style.fontSize : l && l.fontSize || c.style.fontSize || 12, a).h
            }, v = function (a) {
                return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
            }; D--;)b.removeChild(g[D]);
            f || y || H || -1 !== e.indexOf(" ") ? (h = /<.*style="([^"]+)".*>/, k = /<.*href="(http[^"]+)".*>/, t && t.appendChild(b), e = f ? e.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) : [e], "" === e[e.length - 1] && e.pop(), x(e, function (e,
                                                                                                                                                                                                                                                                                                                                                                                                                       f) {
                var g, w = 0;
                e = e.replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
                g = e.split("|||");
                x(g, function (e) {
                    if ("" !== e || 1 === g.length) {
                        var y = {}, D = da.createElementNS("http://www.w3.org/2000/svg", "tspan"), t;
                        h.test(e) && (t = e.match(h)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), F(D, "style", t));
                        k.test(e) && !d && (F(D, "onclick", 'location.href="' + e.match(k)[1] + '"'), A(D, {cursor: "pointer"}));
                        e = v(e.replace(/<(.|\n)*?>/g, "") || " ");
                        if (" " !== e) {
                            D.appendChild(da.createTextNode(e));
                            w ? y.dx = 0 : f && null !== m && (y.x = m);
                            F(D, y);
                            b.appendChild(D);
                            !w && f && (!ua && d && A(D, {display: "block"}), F(D, "dy", n(D)));
                            if (u) {
                                for (var y = e.replace(/([^\^])-/g, "$1- ").split(" "), z = 1 < g.length || f || 1 < y.length && "nowrap" !== l.whiteSpace, Va, x, q, p = [], Q = n(D), r = 1, M = a.rotation, N = e, ub = N.length; (z || H) && (y.length || p.length);)a.rotation = 0, Va = a.getBBox(!0), q = Va.width, !ua && c.forExport && (q = c.measureSpanWidth(D.firstChild.data, a.styles)), Va = q > u, void 0 === x && (x = Va), H && x ? (ub /= 2, "" === N || !Va && .5 > ub ? y = [] : (Va && (x = !0), N = e.substring(0, N.length + (Va ? -1 : 1) * La(ub)), y = [N +
                                (3 < u ? "\u2026" : "")], D.removeChild(D.firstChild))) : Va && 1 !== y.length ? (D.removeChild(D.firstChild), p.unshift(y.pop())) : (y = p, p = [], y.length && (r++, D = da.createElementNS("http://www.w3.org/2000/svg", "tspan"), F(D, {
                                    dy: Q,
                                    x: m
                                }), t && F(D, "style", t), b.appendChild(D)), q > u && (u = q)), y.length && D.appendChild(da.createTextNode(y.join(" ").replace(/- /g, "-")));
                                x && a.attr("title", a.textStr);
                                a.rotation = M
                            }
                            w++
                        }
                    }
                })
            }), t && t.removeChild(b), y && a.applyTextShadow && a.applyTextShadow(y)) : b.appendChild(da.createTextNode(v(e)))
        }, getContrast: function (a) {
            a =
                Oa(a).rgba;
            return 384 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
        }, button: function (a, b, c, d, e, f, g, h, k) {
            var m = this.label(a, b, c, k, null, null, null, null, "button"), l = 0, u, w, y, H, D, t;
            a = {x1: 0, y1: 0, x2: 0, y2: 1};
            e = r({
                "stroke-width": 1,
                stroke: "#CCCCCC",
                fill: {linearGradient: a, stops: [[0, "#FEFEFE"], [1, "#F6F6F6"]]},
                r: 2,
                padding: 5,
                style: {color: "black"}
            }, e);
            y = e.style;
            delete e.style;
            f = r(e, {stroke: "#68A", fill: {linearGradient: a, stops: [[0, "#FFF"], [1, "#ACF"]]}}, f);
            H = f.style;
            delete f.style;
            g = r(e, {
                stroke: "#68A", fill: {
                    linearGradient: a, stops: [[0,
                        "#9BD"], [1, "#CDF"]]
                }
            }, g);
            D = g.style;
            delete g.style;
            h = r(e, {style: {color: "#CCC"}}, h);
            t = h.style;
            delete h.style;
            X(m.element, Ia ? "mouseover" : "mouseenter", function () {
                3 !== l && m.attr(f).css(H)
            });
            X(m.element, Ia ? "mouseout" : "mouseleave", function () {
                3 !== l && (u = [e, f, g][l], w = [y, H, D][l], m.attr(u).css(w))
            });
            m.setState = function (a) {
                (m.state = l = a) ? 2 === a ? m.attr(g).css(D) : 3 === a && m.attr(h).css(t) : m.attr(e).css(y)
            };
            return m.on("click", function (a) {
                3 !== l && d.call(m, a)
            }).attr(e).css(O({cursor: "default"}, y))
        }, crispLine: function (a,
                                b) {
            a[1] === a[4] && (a[1] = a[4] = K(a[1]) - b % 2 / 2);
            a[2] === a[5] && (a[2] = a[5] = K(a[2]) + b % 2 / 2);
            return a
        }, path: function (a) {
            var b = {fill: "none"};
            P(a) ? b.d = a : Y(a) && O(b, a);
            return this.createElement("path").attr(b)
        }, circle: function (a, b, c) {
            a = Y(a) ? a : {x: a, y: b, r: c};
            b = this.createElement("circle");
            b.xSetter = function (a) {
                this.element.setAttribute("cx", a)
            };
            b.ySetter = function (a) {
                this.element.setAttribute("cy", a)
            };
            return b.attr(a)
        }, arc: function (a, b, c, d, e, f) {
            Y(a) && (b = a.y, c = a.r, d = a.innerR, e = a.start, f = a.end, a = a.x);
            a = this.symbol("arc",
                a || 0, b || 0, c || 0, c || 0, {innerR: d || 0, start: e || 0, end: f || 0});
            a.r = c;
            return a
        }, rect: function (a, b, c, d, e, f) {
            e = Y(a) ? a.r : e;
            var g = this.createElement("rect");
            a = Y(a) ? a : a === G ? {} : {x: a, y: b, width: I(c, 0), height: I(d, 0)};
            f !== G && (a.strokeWidth = f, a = g.crisp(a));
            e && (a.r = e);
            g.rSetter = function (a) {
                F(this.element, {rx: a, ry: a})
            };
            return g.attr(a)
        }, setSize: function (a, b, c) {
            var d = this.alignedObjects, e = d.length;
            this.width = a;
            this.height = b;
            for (this.boxWrapper[z(c, !0) ? "animate" : "attr"]({width: a, height: b}); e--;)d[e].align()
        }, g: function (a) {
            var b =
                this.createElement("g");
            return t(a) ? b.attr({"class": "highcharts-" + a}) : b
        }, image: function (a, b, c, d, e) {
            var f = {preserveAspectRatio: "none"};
            1 < arguments.length && O(f, {x: b, y: c, width: d, height: e});
            f = this.createElement("image").attr(f);
            f.element.setAttributeNS ? f.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : f.element.setAttribute("hc-svg-href", a);
            return f
        }, symbol: function (a, b, c, d, e, f) {
            var g, h = this.symbols[a], h = h && h(K(b), K(c), d, e, f), k = /^url\((.*?)\)$/, m, l;
            h ? (g = this.path(h), O(g, {
                symbolName: a,
                x: b, y: c, width: d, height: e
            }), f && O(g, f)) : k.test(a) && (l = function (a, b) {
                a.element && (a.attr({
                    width: b[0],
                    height: b[1]
                }), a.alignByTranslate || a.translate(K((d - b[0]) / 2), K((e - b[1]) / 2)))
            }, m = a.match(k)[1], a = Vb[m] || f && f.width && f.height && [f.width, f.height], g = this.image(m).attr({
                x: b,
                y: c
            }), g.isImg = !0, a ? l(g, a) : (g.attr({width: 0, height: 0}), E("img", {
                onload: function () {
                    0 === this.width && (A(this, {
                        position: "absolute",
                        top: "-999em"
                    }), document.body.appendChild(this));
                    l(g, Vb[m] = [this.width, this.height]);
                    this.parentNode && this.parentNode.removeChild(this)
                },
                src: m
            })));
            return g
        }, symbols: {
            circle: function (a, b, c, d) {
                var e = .166 * c;
                return ["M", a + c / 2, b, "C", a + c + e, b, a + c + e, b + d, a + c / 2, b + d, "C", a - e, b + d, a - e, b, a + c / 2, b, "Z"]
            }, square: function (a, b, c, d) {
                return ["M", a, b, "L", a + c, b, a + c, b + d, a, b + d, "Z"]
            }, triangle: function (a, b, c, d) {
                return ["M", a + c / 2, b, "L", a + c, b + d, a, b + d, "Z"]
            }, "triangle-down": function (a, b, c, d) {
                return ["M", a, b, "L", a + c, b, a + c / 2, b + d, "Z"]
            }, diamond: function (a, b, c, d) {
                return ["M", a + c / 2, b, "L", a + c, b + d / 2, a + c / 2, b + d, a, b + d / 2, "Z"]
            }, arc: function (a, b, c, d, e) {
                var f = e.start;
                c = e.r || c || d;
                var g =
                    e.end - .001;
                d = e.innerR;
                var h = e.open, k = Ca(f), m = Ma(f), l = Ca(g), g = Ma(g);
                e = e.end - f < Na ? 0 : 1;
                return ["M", a + c * k, b + c * m, "A", c, c, 0, e, 1, a + c * l, b + c * g, h ? "M" : "L", a + d * l, b + d * g, "A", d, d, 0, e, 0, a + d * k, b + d * m, h ? "" : "Z"]
            }, callout: function (a, b, c, d, e) {
                var f = S(e && e.r || 0, c, d), g = f + 6, h = e && e.anchorX;
                e = e && e.anchorY;
                var k;
                k = ["M", a + f, b, "L", a + c - f, b, "C", a + c, b, a + c, b, a + c, b + f, "L", a + c, b + d - f, "C", a + c, b + d, a + c, b + d, a + c - f, b + d, "L", a + f, b + d, "C", a, b + d, a, b + d, a, b + d - f, "L", a, b + f, "C", a, b, a, b, a + f, b];
                h && h > c && e > b + g && e < b + d - g ? k.splice(13, 3, "L", a + c, e - 6, a + c + 6, e, a +
                    c, e + 6, a + c, b + d - f) : h && 0 > h && e > b + g && e < b + d - g ? k.splice(33, 3, "L", a, e + 6, a - 6, e, a, e - 6, a, b + f) : e && e > d && h > a + g && h < a + c - g ? k.splice(23, 3, "L", h + 6, b + d, h, b + d + 6, h - 6, b + d, a + f, b + d) : e && 0 > e && h > a + g && h < a + c - g && k.splice(3, 3, "L", h - 6, b, h, b - 6, h + 6, b, c - f, b);
                return k
            }
        }, clipRect: function (a, b, c, d) {
            var e = "highcharts-" + Gb++, f = this.createElement("clipPath").attr({id: e}).add(this.defs);
            a = this.rect(a, b, c, d, 0).add(f);
            a.id = e;
            a.clipPath = f;
            a.count = 0;
            return a
        }, text: function (a, b, c, d) {
            var e = Fa || !ua && this.forExport, f = {};
            if (d && (this.allowHTML || !this.forExport))return this.html(a,
                b, c);
            f.x = Math.round(b || 0);
            c && (f.y = Math.round(c));
            if (a || 0 === a)f.text = a;
            a = this.createElement("text").attr(f);
            e && a.css({position: "absolute"});
            d || (a.xSetter = function (a, b, c) {
                var d = c.getElementsByTagName("tspan"), e, f = c.getAttribute(b), w;
                for (w = 0; w < d.length; w++)e = d[w], e.getAttribute(b) === f && e.setAttribute(b, a);
                c.setAttribute(b, a)
            });
            return a
        }, fontMetrics: function (a, b) {
            var c, d;
            a = a || this.style.fontSize;
            !a && b && qa.getComputedStyle && (b = b.element || b, a = (c = qa.getComputedStyle(b, "")) && c.fontSize);
            a = /px/.test(a) ? C(a) :
                /em/.test(a) ? 12 * parseFloat(a) : 12;
            c = 24 > a ? a + 3 : K(1.2 * a);
            d = K(.8 * c);
            return {h: c, b: d, f: a}
        }, rotCorr: function (a, b, c) {
            var d = a;
            b && c && (d = I(d * Ca(b * bb), 4));
            return {x: -a / 3 * Ma(b * bb), y: d}
        }, label: function (a, b, c, d, e, f, g, h, k) {
            function m() {
                var a, b;
                a = H.element.style;
                n = (void 0 === p || void 0 === Q || y.styles.textAlign) && t(H.textStr) && H.getBBox();
                y.width = (p || n.width || 0) + 2 * v + q;
                y.height = (Q || n.height || 0) + 2 * v;
                B = v + w.fontMetrics(a && a.fontSize, H).b;
                fa && (D || (a = K(-z * v) + N, b = (h ? -B : 0) + N, y.box = D = d ? w.symbol(d, a, b, y.width, y.height, F) : w.rect(a,
                    b, y.width, y.height, 0, F["stroke-width"]), D.isImg || D.attr("fill", "none"), D.add(y)), D.isImg || D.attr(O({
                    width: K(y.width),
                    height: K(y.height)
                }, F)), F = null)
            }

            function l() {
                var a = y.styles, a = a && a.textAlign, b = q + v * (1 - z), c;
                c = h ? 0 : B;
                t(p) && n && ("center" === a || "right" === a) && (b += {center: .5, right: 1}[a] * (p - n.width));
                if (b !== H.x || c !== H.y)H.attr("x", b), c !== G && H.attr("y", c);
                H.x = b;
                H.y = c
            }

            function u(a, b) {
                D ? D.attr(a, b) : F[a] = b
            }

            var w = this, y = w.g(k), H = w.text("", 0, 0, g).attr({zIndex: 1}), D, n, z = 0, v = 3, q = 0, p, Q, M, A, N = 0, F = {}, B, fa;
            y.onAdd = function () {
                H.add(y);
                y.attr({text: a || 0 === a ? a : "", x: b, y: c});
                D && t(e) && y.attr({anchorX: e, anchorY: f})
            };
            y.widthSetter = function (a) {
                p = a
            };
            y.heightSetter = function (a) {
                Q = a
            };
            y.paddingSetter = function (a) {
                t(a) && a !== v && (v = y.padding = a, l())
            };
            y.paddingLeftSetter = function (a) {
                t(a) && a !== q && (q = a, l())
            };
            y.alignSetter = function (a) {
                z = {left: 0, center: .5, right: 1}[a]
            };
            y.textSetter = function (a) {
                a !== G && H.textSetter(a);
                m();
                l()
            };
            y["stroke-widthSetter"] = function (a, b) {
                a && (fa = !0);
                N = a % 2 / 2;
                u(b, a)
            };
            y.strokeSetter = y.fillSetter = y.rSetter = function (a, b) {
                "fill" === b &&
                a && (fa = !0);
                u(b, a)
            };
            y.anchorXSetter = function (a, b) {
                e = a;
                u(b, K(a) - N - M)
            };
            y.anchorYSetter = function (a, b) {
                f = a;
                u(b, a - A)
            };
            y.xSetter = function (a) {
                y.x = a;
                z && (a -= z * ((p || n.width) + v));
                M = K(a);
                y.attr("translateX", M)
            };
            y.ySetter = function (a) {
                A = y.y = K(a);
                y.attr("translateY", A)
            };
            var E = y.css;
            return O(y, {
                css: function (a) {
                    if (a) {
                        var b = {};
                        a = r(a);
                        x(y.textProps, function (c) {
                            a[c] !== G && (b[c] = a[c], delete a[c])
                        });
                        H.css(b)
                    }
                    return E.call(y, a)
                }, getBBox: function () {
                    return {width: n.width + 2 * v, height: n.height + 2 * v, x: n.x - v, y: n.y - v}
                }, shadow: function (a) {
                    D &&
                    D.shadow(a);
                    return y
                }, destroy: function () {
                    pa(y.element, "mouseenter");
                    pa(y.element, "mouseleave");
                    H && (H = H.destroy());
                    D && (D = D.destroy());
                    ka.prototype.destroy.call(y);
                    y = w = m = l = u = null
                }
            })
        }
    };
    O(ka.prototype, {
        htmlCss: function (a) {
            var b = this.element;
            if (b = a && "SPAN" === b.tagName && a.width)delete a.width, this.textWidth = b, this.updateTransform();
            a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
            this.styles = O(this.styles, a);
            A(this.element, a);
            return this
        }, htmlGetBBox: function () {
            var a = this.element;
            "text" === a.nodeName && (a.style.position = "absolute");
            return {x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight}
        }, htmlUpdateTransform: function () {
            if (this.added) {
                var a = this.renderer, b = this.element, c = this.translateX || 0, d = this.translateY || 0, e = this.x || 0, f = this.y || 0, g = this.textAlign || "left", h = {
                    left: 0,
                    center: .5,
                    right: 1
                }[g], k = this.shadows, m = this.styles;
                A(b, {marginLeft: c, marginTop: d});
                k && x(k, function (a) {
                    A(a, {marginLeft: c + 1, marginTop: d + 1})
                });
                this.inverted && x(b.childNodes, function (c) {
                    a.invertChild(c,
                        b)
                });
                if ("SPAN" === b.tagName) {
                    var l = this.rotation, u, w = C(this.textWidth), y = [l, g, b.innerHTML, this.textWidth, this.textAlign].join();
                    y !== this.cTT && (u = a.fontMetrics(b.style.fontSize).b, t(l) && this.setSpanRotation(l, h, u), k = z(this.elemWidth, b.offsetWidth), k > w && /[ \-]/.test(b.textContent || b.innerText) && (A(b, {
                        width: w + "px",
                        display: "block",
                        whiteSpace: m && m.whiteSpace || "normal"
                    }), k = w), this.getSpanCorrection(k, u, h, l, g));
                    A(b, {left: e + (this.xCorr || 0) + "px", top: f + (this.yCorr || 0) + "px"});
                    pb && (u = b.offsetHeight);
                    this.cTT =
                        y
                }
            } else this.alignOnAdd = !0
        }, setSpanRotation: function (a, b, c) {
            var d = {}, e = Ia ? "-ms-transform" : pb ? "-webkit-transform" : Za ? "MozTransform" : Ub ? "-o-transform" : "";
            d[e] = d.transform = "rotate(" + a + "deg)";
            d[e + (Za ? "Origin" : "-origin")] = d.transformOrigin = 100 * b + "% " + c + "px";
            A(this.element, d)
        }, getSpanCorrection: function (a, b, c) {
            this.xCorr = -a * c;
            this.yCorr = -b
        }
    });
    O(Pa.prototype, {
        html: function (a, b, c) {
            var d = this.createElement("span"), e = d.element, f = d.renderer;
            d.textSetter = function (a) {
                a !== e.innerHTML && delete this.bBox;
                e.innerHTML =
                    this.textStr = a;
                d.htmlUpdateTransform()
            };
            d.xSetter = d.ySetter = d.alignSetter = d.rotationSetter = function (a, b) {
                "align" === b && (b = "textAlign");
                d[b] = a;
                d.htmlUpdateTransform()
            };
            d.attr({text: a, x: K(b), y: K(c)}).css({
                position: "absolute",
                fontFamily: this.style.fontFamily,
                fontSize: this.style.fontSize
            });
            e.style.whiteSpace = "nowrap";
            d.css = d.htmlCss;
            f.isSVG && (d.add = function (a) {
                var b, c = f.box.parentNode, m = [];
                if (this.parentGroup = a) {
                    if (b = a.div, !b) {
                        for (; a;)m.push(a), a = a.parentGroup;
                        x(m.reverse(), function (a) {
                            var d, e = F(a.element,
                                "class");
                            e && (e = {className: e});
                            b = a.div = a.div || E("div", e, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px"
                                }, b || c);
                            d = b.style;
                            O(a, {
                                translateXSetter: function (b, c) {
                                    d.left = b + "px";
                                    a[c] = b;
                                    a.doTransform = !0
                                }, translateYSetter: function (b, c) {
                                    d.top = b + "px";
                                    a[c] = b;
                                    a.doTransform = !0
                                }
                            });
                            x(["opacity", "visibility"], function (b) {
                                W(a, b + "Setter", function (a, b, c, e) {
                                    a.call(this, b, c, e);
                                    d[c] = b
                                })
                            })
                        })
                    }
                } else b = c;
                b.appendChild(e);
                d.added = !0;
                d.alignOnAdd && d.htmlUpdateTransform();
                return d
            });
            return d
        }
    });
    Ea.prototype =
    {
        addLabel: function () {
            var a = this.axis, b = a.options, c = a.chart, d = a.categories, e = a.names, f = this.pos, g = b.labels, h = a.tickPositions, k = f === h[0], m = f === h[h.length - 1], e = d ? z(d[f], e[f], f) : f, d = this.label, h = h.info, l;
            a.isDatetimeAxis && h && (l = b.dateTimeLabelFormats[h.higherRanks[f] || h.unitName]);
            this.isFirst = k;
            this.isLast = m;
            b = a.labelFormatter.call({
                axis: a,
                chart: c,
                isFirst: k,
                isLast: m,
                dateTimeLabelFormat: l,
                value: a.isLog ? xa(p(e)) : e
            });
            t(d) ? d && d.attr({text: b}) : (this.labelLength = (this.label = d = t(b) && g.enabled ? c.renderer.text(b,
                    0, 0, g.useHTML).css(r(g.style)).add(a.labelGroup) : null) && d.getBBox().width, this.rotation = 0)
        }, getLabelSize: function () {
        return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
    }, handleOverflow: function (a) {
        var b = this.axis, c = a.x, d = b.chart.chartWidth, e = b.chart.spacing, f = z(b.labelLeft, S(b.pos, e[3])), e = z(b.labelRight, I(b.pos + b.len, d - e[1])), g = this.label, h = this.rotation, k = {
            left: 0,
            center: .5,
            right: 1
        }[b.labelAlign], m = g.getBBox().width, l = b.slotWidth, u = 1, w, y = {};
        if (h)0 > h && c - k * m < f ? w = K(c / Ca(h * bb) -
            f) : 0 < h && c + k * m > e && (w = K((d - c) / Ca(h * bb))); else if (d = c + (1 - k) * m, c - k * m < f ? l = a.x + l * (1 - k) - f : d > e && (l = e - a.x + l * k, u = -1), l = S(b.slotWidth, l), l < b.slotWidth && "center" === b.labelAlign && (a.x += u * (b.slotWidth - l - k * (b.slotWidth - S(m, l)))), m > l || b.autoRotation && g.styles.width)w = l;
        w && (y.width = w, b.options.labels.style.textOverflow || (y.textOverflow = "ellipsis"), g.css(y))
    }, getPosition: function (a, b, c, d) {
        var e = this.axis, f = e.chart, g = d && f.oldChartHeight || f.chartHeight;
        return {
            x: a ? e.translate(b + c, null, null, d) + e.transB : e.left + e.offset +
            (e.opposite ? (d && f.oldChartWidth || f.chartWidth) - e.right - e.left : 0),
            y: a ? g - e.bottom + e.offset - (e.opposite ? e.height : 0) : g - e.translate(b + c, null, null, d) - e.transB
        }
    }, getLabelPosition: function (a, b, c, d, e, f, g, h) {
        var k = this.axis, m = k.transA, l = k.reversed, u = k.staggerLines, w = k.tickRotCorr || {x: 0, y: 0};
        c = z(e.y, w.y + (2 === k.side ? 8 : -(c.getBBox().height / 2)));
        a = a + e.x + w.x - (f && d ? f * m * (l ? -1 : 1) : 0);
        b = b + c - (f && !d ? f * m * (l ? 1 : -1) : 0);
        u && (b += g / (h || 1) % u * (k.labelOffset / u));
        return {x: a, y: K(b)}
    }, getMarkPath: function (a, b, c, d, e, f) {
        return f.crispLine(["M",
            a, b, "L", a + (e ? 0 : -c), b + (e ? c : 0)], d)
    }, render: function (a, b, c) {
        var d = this.axis, e = d.options, f = d.chart.renderer, g = d.horiz, h = this.type, k = this.label, m = this.pos, l = e.labels, u = this.gridLine, w = h ? h + "Grid" : "grid", y = h ? h + "Tick" : "tick", H = e[w + "LineWidth"], D = e[w + "LineColor"], t = e[w + "LineDashStyle"], n = e[y + "Length"], w = z(e[y + "Width"], !h && d.isXAxis ? 1 : 0), v = e[y + "Color"], q = e[y + "Position"], y = this.mark, x = l.step, p = !0, Q = d.tickmarkOffset, r = this.getPosition(g, m, Q, b), M = r.x, r = r.y, N = g && M === d.pos + d.len || !g && r === d.pos ? -1 : 1;
        c = z(c, 1);
        this.isActive = !0;
        if (H && (m = d.getPlotLinePath(m + Q, H * N, b, !0), u === G && (u = {
                stroke: D,
                "stroke-width": H
            }, t && (u.dashstyle = t), h || (u.zIndex = 1), b && (u.opacity = 0), this.gridLine = u = H ? f.path(m).attr(u).add(d.gridGroup) : null), !b && u && m))u[this.isNew ? "attr" : "animate"]({
            d: m,
            opacity: c
        });
        w && n && ("inside" === q && (n = -n), d.opposite && (n = -n), h = this.getMarkPath(M, r, n, w * N, g, f), y ? y.animate({
            d: h,
            opacity: c
        }) : this.mark = f.path(h).attr({stroke: v, "stroke-width": w, opacity: c}).add(d.axisGroup));
        k && !isNaN(M) && (k.xy = r = this.getLabelPosition(M, r, k, g, l, Q, a,
            x), this.isFirst && !this.isLast && !z(e.showFirstLabel, 1) || this.isLast && !this.isFirst && !z(e.showLastLabel, 1) ? p = !1 : !g || d.isRadial || l.step || l.rotation || b || 0 === c || this.handleOverflow(r), x && a % x && (p = !1), p && !isNaN(r.y) ? (r.opacity = c, k[this.isNew ? "attr" : "animate"](r), this.isNew = !1) : k.attr("y", -9999))
    }, destroy: function () {
        ba(this, this.axis)
    }
    };
    V.PlotLineOrBand = function (a, b) {
        this.axis = a;
        b && (this.options = b, this.id = b.id)
    };
    V.PlotLineOrBand.prototype = {
        render: function () {
            var a = this, b = a.axis, c = b.horiz, d = a.options, e = d.label,
                f = a.label, g = d.width, h = d.to, k = d.from, m = t(k) && t(h), l = d.value, u = d.dashStyle, w = a.svgElem, y = [], H, D = d.color, n = d.zIndex, v = d.events, z = {}, q = b.chart.renderer;
            b.isLog && (k = J(k), h = J(h), l = J(l));
            if (g)y = b.getPlotLinePath(l, g), z = {
                stroke: D,
                "stroke-width": g
            }, u && (z.dashstyle = u); else if (m)y = b.getPlotBandPath(k, h, d), D && (z.fill = D), d.borderWidth && (z.stroke = d.borderColor, z["stroke-width"] = d.borderWidth); else return;
            t(n) && (z.zIndex = n);
            if (w)y ? w.animate({d: y}, null, w.onGetPath) : (w.hide(), w.onGetPath = function () {
                w.show()
            }, f && (a.label =
                f = f.destroy())); else if (y && y.length && (a.svgElem = w = q.path(y).attr(z).add(), v))for (H in d = function (b) {
                w.on(b, function (c) {
                    v[b].apply(a, [c])
                })
            }, v)d(H);
            e && t(e.text) && y && y.length && 0 < b.width && 0 < b.height ? (e = r({
                align: c && m && "center",
                x: c ? !m && 4 : 10,
                verticalAlign: !c && m && "middle",
                y: c ? m ? 16 : 10 : m ? 6 : -4,
                rotation: c && !m && 90
            }, e), f || (z = {
                align: e.textAlign || e.align,
                rotation: e.rotation
            }, t(n) && (z.zIndex = n), a.label = f = q.text(e.text, 0, 0, e.useHTML).attr(z).css(e.style).add()), b = [y[1], y[4], m ? y[6] : y[1]], m = [y[2], y[5], m ? y[7] : y[2]],
                y = M(b), c = M(m), f.align(e, !1, {
                x: y,
                y: c,
                width: fa(b) - y,
                height: fa(m) - c
            }), f.show()) : f && f.hide();
            return a
        }, destroy: function () {
            q(this.axis.plotLinesAndBands, this);
            delete this.axis;
            ba(this)
        }
    };
    var ca = V.Axis = function () {
        this.init.apply(this, arguments)
    };
    ca.prototype = {
        defaultOptions: {
            dateTimeLabelFormats: {
                millisecond: "%H:%M:%S.%L",
                second: "%H:%M:%S",
                minute: "%H:%M",
                hour: "%H:%M",
                day: "%e. %b",
                week: "%e. %b",
                month: "%b '%y",
                year: "%Y"
            },
            endOnTick: !1,
            gridLineColor: "#D8D8D8",
            labels: {
                enabled: !0, style: {
                    color: "#606060", cursor: "default",
                    fontSize: "11px"
                }, x: 0, y: 15
            },
            lineColor: "#C0D0E0",
            lineWidth: 1,
            minPadding: .01,
            maxPadding: .01,
            minorGridLineColor: "#E0E0E0",
            minorGridLineWidth: 1,
            minorTickColor: "#A0A0A0",
            minorTickLength: 2,
            minorTickPosition: "outside",
            startOfWeek: 1,
            startOnTick: !1,
            tickColor: "#C0D0E0",
            tickLength: 10,
            tickmarkPlacement: "between",
            tickPixelInterval: 100,
            tickPosition: "outside",
            title: {align: "middle", style: {color: "#707070"}},
            type: "linear"
        },
        defaultYAxisOptions: {
            endOnTick: !0,
            gridLineWidth: 1,
            tickPixelInterval: 72,
            showLastLabel: !0,
            labels: {
                x: -8,
                y: 3
            },
            lineWidth: 0,
            maxPadding: .05,
            minPadding: .05,
            startOnTick: !0,
            title: {rotation: 270, text: "Values"},
            stackLabels: {
                enabled: !1, formatter: function () {
                    return V.numberFormat(this.total, -1)
                }, style: r(Z.line.dataLabels.style, {color: "#000000"})
            }
        },
        defaultLeftAxisOptions: {labels: {x: -15, y: null}, title: {rotation: 270}},
        defaultRightAxisOptions: {labels: {x: 15, y: null}, title: {rotation: 90}},
        defaultBottomAxisOptions: {labels: {autoRotation: [-45], x: 0, y: null}, title: {rotation: 0}},
        defaultTopAxisOptions: {
            labels: {
                autoRotation: [-45],
                x: 0, y: -15
            }, title: {rotation: 0}
        },
        init: function (a, b) {
            var c = b.isX;
            this.chart = a;
            this.horiz = a.inverted ? !c : c;
            this.coll = (this.isXAxis = c) ? "xAxis" : "yAxis";
            this.opposite = b.opposite;
            this.side = b.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
            this.setOptions(b);
            var d = this.options, e = d.type;
            this.labelFormatter = d.labels.formatter || this.defaultLabelFormatter;
            this.userOptions = b;
            this.minPixelPadding = 0;
            this.reversed = d.reversed;
            this.visible = !1 !== d.visible;
            this.zoomEnabled = !1 !== d.zoomEnabled;
            this.categories = d.categories ||
                "category" === e;
            this.names = this.names || [];
            this.isLog = "logarithmic" === e;
            this.isDatetimeAxis = "datetime" === e;
            this.isLinked = t(d.linkedTo);
            this.ticks = {};
            this.labelEdge = [];
            this.minorTicks = {};
            this.plotLinesAndBands = [];
            this.alternateBands = {};
            this.len = 0;
            this.minRange = this.userMinRange = d.minRange || d.maxZoom;
            this.range = d.range;
            this.offset = d.offset || 0;
            this.stacks = {};
            this.oldStacks = {};
            this.stacksTouched = 0;
            this.min = this.max = null;
            this.crosshair = z(d.crosshair, B(a.options.tooltip.crosshairs)[c ? 0 : 1], !1);
            var f, d = this.options.events;
            -1 === Ua(this, a.axes) && (c && !this.isColorAxis ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this), a[this.coll].push(this));
            this.series = this.series || [];
            a.inverted && c && this.reversed === G && (this.reversed = !0);
            this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
            for (f in d)X(this, f, d[f]);
            this.isLog && (this.val2lin = J, this.lin2val = p)
        },
        setOptions: function (a) {
            this.options = r(this.defaultOptions, this.isXAxis ? {} : this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions,
                this.defaultLeftAxisOptions][this.side], r(ma[this.coll], a))
        },
        defaultLabelFormatter: function () {
            var a = this.axis, b = this.value, c = a.categories, d = this.dateTimeLabelFormat, e = ma.lang.numericSymbols, f = e && e.length, g, h = a.options.labels.format, a = a.isLog ? b : a.tickInterval;
            if (h)g = n(h, this); else if (c)g = b; else if (d)g = va(d, b); else if (f && 1E3 <= a)for (; f-- && g === G;)c = Math.pow(1E3, f + 1), a >= c && 0 === 10 * b % c && null !== e[f] && (g = V.numberFormat(b / c, -1) + e[f]);
            g === G && (g = 1E4 <= ha(b) ? V.numberFormat(b, -1) : V.numberFormat(b, -1, G, ""));
            return g
        },
        getSeriesExtremes: function () {
            var a = this, b = a.chart;
            a.hasVisibleSeries = !1;
            a.dataMin = a.dataMax = a.threshold = null;
            a.softThreshold = !a.isXAxis;
            a.buildStacks && a.buildStacks();
            x(a.series, function (c) {
                if (c.visible || !b.options.chart.ignoreHiddenSeries) {
                    var d = c.options, e = d.threshold, f;
                    a.hasVisibleSeries = !0;
                    a.isLog && 0 >= e && (e = null);
                    if (a.isXAxis)d = c.xData, d.length && (a.dataMin = S(z(a.dataMin, d[0]), M(d)), a.dataMax = I(z(a.dataMax, d[0]), fa(d))); else if (c.getExtremes(), f = c.dataMax, c = c.dataMin, t(c) && t(f) && (a.dataMin = S(z(a.dataMin,
                            c), c), a.dataMax = I(z(a.dataMax, f), f)), t(e) && (a.threshold = e), !d.softThreshold || a.isLog)a.softThreshold = !1
                }
            })
        },
        translate: function (a, b, c, d, e, f) {
            var g = this.linkedParent || this, h = 1, k = 0, m = d ? g.oldTransA : g.transA;
            d = d ? g.oldMin : g.min;
            var l = g.minPixelPadding;
            e = (g.doPostTranslate || g.isLog && e) && g.lin2val;
            m || (m = g.transA);
            c && (h *= -1, k = g.len);
            g.reversed && (h *= -1, k -= h * (g.sector || g.len));
            b ? (a = a * h + k - l, a = a / m + d, e && (a = g.lin2val(a))) : (e && (a = g.val2lin(a)), "between" === f && (f = .5), a = h * (a - d) * m + k + h * l + (T(f) ? m * f * g.pointRange : 0));
            return a
        },
        toPixels: function (a, b) {
            return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
        },
        toValue: function (a, b) {
            return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
        },
        getPlotLinePath: function (a, b, c, d, e) {
            var f = this.chart, g = this.left, h = this.top, k, m, l = c && f.oldChartHeight || f.chartHeight, u = c && f.oldChartWidth || f.chartWidth, w;
            k = this.transB;
            var y = function (a, b, c) {
                if (a < b || a > c)d ? a = S(I(b, a), c) : w = !0;
                return a
            };
            e = z(e, this.translate(a, null, null, c));
            a = c = K(e + k);
            k = m = K(l - e - k);
            isNaN(e) ? w = !0 : this.horiz ? (k = h, m = l -
                this.bottom, a = c = y(a, g, g + this.width)) : (a = g, c = u - this.right, k = m = y(k, h, h + this.height));
            return w && !d ? null : f.renderer.crispLine(["M", a, k, "L", c, m], b || 1)
        },
        getLinearTickPositions: function (a, b, c) {
            var d, e = xa(ea(b / a) * a), f = xa(La(c / a) * a), g = [];
            if (b === c && T(b))return [b];
            for (b = e; b <= f;) {
                g.push(b);
                b = xa(b + a);
                if (b === d)break;
                d = b
            }
            return g
        },
        getMinorTickPositions: function () {
            var a = this.options, b = this.tickPositions, c = this.minorTickInterval, d = [], e, f = this.pointRangePadding || 0;
            e = this.min - f;
            var f = this.max + f, g = f - e;
            if (g && g / c < this.len /
                3)if (this.isLog)for (f = b.length, e = 1; e < f; e++)d = d.concat(this.getLogTickPositions(c, b[e - 1], b[e], !0)); else if (this.isDatetimeAxis && "auto" === a.minorTickInterval)d = d.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c), e, f, a.startOfWeek)); else for (b = e + (b[0] - e) % c; b <= f; b += c)d.push(b);
            0 !== d.length && this.trimTicks(d, a.startOnTick, a.endOnTick);
            return d
        },
        adjustForMinRange: function () {
            var a = this.options, b = this.min, c = this.max, d, e = this.dataMax - this.dataMin >= this.minRange, f, g, h, k, m, l;
            this.isXAxis && this.minRange ===
            G && !this.isLog && (t(a.min) || t(a.max) ? this.minRange = null : (x(this.series, function (a) {
                k = a.xData;
                for (g = m = a.xIncrement ? 1 : k.length - 1; 0 < g; g--)if (h = k[g] - k[g - 1], f === G || h < f)f = h
            }), this.minRange = S(5 * f, this.dataMax - this.dataMin)));
            c - b < this.minRange && (l = this.minRange, d = (l - c + b) / 2, d = [b - d, z(a.min, b - d)], e && (d[2] = this.dataMin), b = fa(d), c = [b + l, z(a.max, b + l)], e && (c[2] = this.dataMax), c = M(c), c - b < l && (d[0] = c - l, d[1] = z(a.min, c - l), b = fa(d)));
            this.min = b;
            this.max = c
        },
        setAxisTranslation: function (a) {
            var b = this, c = b.max - b.min, d = b.axisPointRange ||
                0, e, f = 0, g = 0, h = b.linkedParent, k = !!b.categories, m = b.transA, l = b.isXAxis;
            if (l || k || d)h ? (f = h.minPointOffset, g = h.pointRangePadding) : x(b.series, function (a) {
                var c = k ? 1 : l ? a.pointRange : b.axisPointRange || 0, h = a.options.pointPlacement, m = a.closestPointRange;
                d = I(d, c);
                b.single || (f = I(f, ia(h) ? 0 : c / 2), g = I(g, "on" === h ? 0 : c));
                !a.noSharedTooltip && t(m) && (e = t(e) ? S(e, m) : m)
            }), h = b.ordinalSlope && e ? b.ordinalSlope / e : 1, b.minPointOffset = f *= h, b.pointRangePadding = g *= h, b.pointRange = S(d, c), l && (b.closestPointRange = e);
            a && (b.oldTransA = m);
            b.translationSlope =
                b.transA = m = b.len / (c + g || 1);
            b.transB = b.horiz ? b.left : b.bottom;
            b.minPixelPadding = m * f
        },
        minFromRange: function () {
            return this.max - this.range
        },
        setTickInterval: function (a) {
            var b = this, c = b.chart, d = b.options, e = b.isLog, f = b.isDatetimeAxis, g = b.isXAxis, h = b.isLinked, k = d.maxPadding, m = d.minPadding, l = d.tickInterval, u = d.tickPixelInterval, w = b.categories, y = b.threshold, H = b.softThreshold, D, n, q, p;
            f || w || h || this.getTickAmount();
            q = z(b.userMin, d.min);
            p = z(b.userMax, d.max);
            h ? (b.linkedParent = c[b.coll][d.linkedTo], c = b.linkedParent.getExtremes(),
                b.min = z(c.min, c.dataMin), b.max = z(c.max, c.dataMax), d.type !== b.linkedParent.options.type && Aa(11, 1)) : (!H && t(y) && (b.dataMin >= y ? (D = y, m = 0) : b.dataMax <= y && (n = y, k = 0)), b.min = z(q, D, b.dataMin), b.max = z(p, n, b.dataMax));
            e && (!a && 0 >= S(b.min, z(b.dataMin, b.min)) && Aa(10, 1), b.min = xa(J(b.min), 15), b.max = xa(J(b.max), 15));
            b.range && t(b.max) && (b.userMin = b.min = q = I(b.min, b.minFromRange()), b.userMax = p = b.max, b.range = null);
            b.beforePadding && b.beforePadding();
            b.adjustForMinRange();
            !(w || b.axisPointRange || b.usePercentage || h) && t(b.min) &&
            t(b.max) && (c = b.max - b.min) && (!t(q) && m && (b.min -= c * m), !t(p) && k && (b.max += c * k));
            T(d.floor) && (b.min = I(b.min, d.floor));
            T(d.ceiling) && (b.max = S(b.max, d.ceiling));
            H && t(b.dataMin) && (y = y || 0, !t(q) && b.min < y && b.dataMin >= y ? b.min = y : !t(p) && b.max > y && b.dataMax <= y && (b.max = y));
            b.tickInterval = b.min === b.max || void 0 === b.min || void 0 === b.max ? 1 : h && !l && u === b.linkedParent.options.tickPixelInterval ? l = b.linkedParent.tickInterval : z(l, this.tickAmount ? (b.max - b.min) / I(this.tickAmount - 1, 1) : void 0, w ? 1 : (b.max - b.min) * u / I(b.len, u));
            g && !a &&
            x(b.series, function (a) {
                a.processData(b.min !== b.oldMin || b.max !== b.oldMax)
            });
            b.setAxisTranslation(!0);
            b.beforeSetTickPositions && b.beforeSetTickPositions();
            b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval));
            b.pointRange && (b.tickInterval = I(b.pointRange, b.tickInterval));
            a = z(d.minTickInterval, b.isDatetimeAxis && b.closestPointRange);
            !l && b.tickInterval < a && (b.tickInterval = a);
            f || e || l || (b.tickInterval = Q(b.tickInterval, null, v(b.tickInterval), z(d.allowDecimals, !(.5 < b.tickInterval &&
            5 > b.tickInterval && 1E3 < b.max && 9999 > b.max)), !!this.tickAmount));
            !this.tickAmount && this.len && (b.tickInterval = b.unsquish());
            this.setTickPositions()
        },
        setTickPositions: function () {
            var a = this.options, b, c = a.tickPositions, d = a.tickPositioner, e = a.startOnTick, f = a.endOnTick, g;
            this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
            this.minorTickInterval = "auto" === a.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : a.minorTickInterval;
            this.tickPositions = b = c && c.slice();
            !b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()]), this.tickPositions = b, d && (d = d.apply(this, [this.min, this.max]))) && (this.tickPositions = b = d);
            this.isLinked || (this.trimTicks(b, e, f), this.min === this.max &&
            t(this.min) && !this.tickAmount && (g = !0, this.min -= .5, this.max += .5), this.single = g, c || d || this.adjustTickAmount())
        },
        trimTicks: function (a, b, c) {
            var d = a[0], e = a[a.length - 1], f = this.minPointOffset || 0;
            b ? this.min = d : this.min - f > d && a.shift();
            c ? this.max = e : this.max + f < e && a.pop();
            0 === a.length && t(d) && a.push((e + d) / 2)
        },
        getTickAmount: function () {
            var a = {}, b, c = this.options, d = c.tickAmount, e = c.tickPixelInterval;
            !t(c.tickInterval) && this.len < e && !this.isRadial && !this.isLog && c.startOnTick && c.endOnTick && (d = 2);
            d || !1 === this.chart.options.chart.alignTicks ||
            !1 === c.alignTicks || (x(this.chart[this.coll], function (c) {
                var d = c.options, e = c.horiz, d = [e ? d.left : d.top, e ? d.width : d.height, d.pane].join();
                c.series.length && (a[d] ? b = !0 : a[d] = 1)
            }), b && (d = La(this.len / e) + 1));
            4 > d && (this.finalTickAmt = d, d = 5);
            this.tickAmount = d
        },
        adjustTickAmount: function () {
            var a = this.tickInterval, b = this.tickPositions, c = this.tickAmount, d = this.finalTickAmt, e = b && b.length;
            if (e < c) {
                for (; b.length < c;)b.push(xa(b[b.length - 1] + a));
                this.transA *= (e - 1) / (c - 1);
                this.max = b[b.length - 1]
            } else e > c && (this.tickInterval *=
                2, this.setTickPositions());
            if (t(d)) {
                for (a = c = b.length; a--;)(3 === d && 1 === a % 2 || 2 >= d && 0 < a && a < c - 1) && b.splice(a, 1);
                this.finalTickAmt = G
            }
        },
        setScale: function () {
            var a, b;
            this.oldMin = this.min;
            this.oldMax = this.max;
            this.oldAxisLength = this.len;
            this.setAxisSize();
            b = this.len !== this.oldAxisLength;
            x(this.series, function (b) {
                if (b.isDirtyData || b.isDirty || b.xAxis.isDirty)a = !0
            });
            b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
        },
        setExtremes: function (a, b, c, d, e) {
            var f = this, g = f.chart;
            c = z(c, !0);
            x(f.series, function (a) {
                delete a.kdTree
            });
            e = O(e, {min: a, max: b});
            ja(f, "setExtremes", e, function () {
                f.userMin = a;
                f.userMax = b;
                f.eventArgs = e;
                c && g.redraw(d)
            })
        },
        zoom: function (a, b) {
            var c = this.dataMin, d = this.dataMax, e = this.options,
                f = S(c, z(e.min, c)), e = I(d, z(e.max, d));
            this.allowZoomOutside || (t(c) && a <= f && (a = f), t(d) && b >= e && (b = e));
            this.displayBtn = a !== G || b !== G;
            this.setExtremes(a, b, !1, G, {trigger: "zoom"});
            return !0
        },
        setAxisSize: function () {
            var a = this.chart, b = this.options, c = b.offsetLeft || 0, d = this.horiz, e = z(b.width, a.plotWidth - c + (b.offsetRight || 0)), f = z(b.height, a.plotHeight), g = z(b.top, a.plotTop), b = z(b.left, a.plotLeft + c), c = /%$/;
            c.test(f) && (f = parseFloat(f) / 100 * a.plotHeight);
            c.test(g) && (g = parseFloat(g) / 100 * a.plotHeight + a.plotTop);
            this.left =
                b;
            this.top = g;
            this.width = e;
            this.height = f;
            this.bottom = a.chartHeight - f - g;
            this.right = a.chartWidth - e - b;
            this.len = I(d ? e : f, 0);
            this.pos = d ? b : g
        },
        getExtremes: function () {
            var a = this.isLog;
            return {
                min: a ? xa(p(this.min)) : this.min,
                max: a ? xa(p(this.max)) : this.max,
                dataMin: this.dataMin,
                dataMax: this.dataMax,
                userMin: this.userMin,
                userMax: this.userMax
            }
        },
        getThreshold: function (a) {
            var b = this.isLog, c = b ? p(this.min) : this.min, b = b ? p(this.max) : this.max;
            null === a ? a = 0 > b ? b : c : c > a ? a = c : b < a && (a = b);
            return this.translate(a, 0, 1, 0, 1)
        },
        autoLabelAlign: function (a) {
            a =
                (z(a, 0) - 90 * this.side + 720) % 360;
            return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
        },
        unsquish: function () {
            var a = this.ticks, b = this.options.labels, c = this.horiz, d = this.tickInterval, e = d, f = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / d), g, h = b.rotation, k = this.chart.renderer.fontMetrics(b.style.fontSize, a[0] && a[0].label), m, l = Number.MAX_VALUE, u, w = function (a) {
                a /= f || 1;
                a = 1 < a ? La(a) : 1;
                return a * d
            };
            c ? (u = !b.staggerLines && !b.step && (t(h) ? [h] : f < z(b.autoRotationLimit, 80) && b.autoRotation)) && x(u, function (a) {
                var b;
                if (a === h || a && -90 <= a && 90 >= a)m = w(ha(k.h / Ma(bb * a))), b = m + ha(a / 360), b < l && (l = b, g = a, e = m)
            }) : b.step || (e = w(k.h));
            this.autoRotation = u;
            this.labelRotation = z(g, h);
            return e
        },
        renderUnsquish: function () {
            var a = this.chart, b = a.renderer, c = this.tickPositions, d = this.ticks, e = this.options.labels, f = this.horiz, g = a.margin, h = this.categories ? c.length : c.length - 1, k = this.slotWidth = f && !e.step && !e.rotation && (this.staggerLines || 1) * a.plotWidth / h || !f && (g[3] && g[3] - a.spacing[3] || .33 * a.chartWidth), m = I(1, K(k - 2 * (e.padding || 5))), l = {}, g = b.fontMetrics(e.style.fontSize,
                d[0] && d[0].label), h = e.style.textOverflow, u, w = 0;
            ia(e.rotation) || (l.rotation = e.rotation || 0);
            if (this.autoRotation)x(c, function (a) {
                (a = d[a]) && a.labelLength > w && (w = a.labelLength)
            }), w > m && w > g.h ? l.rotation = this.labelRotation : this.labelRotation = 0; else if (k && (u = {width: m + "px"}, !h))for (u.textOverflow = "clip", k = c.length; !f && k--;)if (m = c[k], m = d[m].label)"ellipsis" === m.styles.textOverflow && m.css({textOverflow: "clip"}), m.getBBox().height > this.len / c.length - (g.h - g.f) && (m.specCss = {textOverflow: "ellipsis"});
            l.rotation &&
            (u = {width: (w > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight) + "px"}, h || (u.textOverflow = "ellipsis"));
            this.labelAlign = l.align = e.align || this.autoLabelAlign(this.labelRotation);
            x(c, function (a) {
                var b = (a = d[a]) && a.label;
                b && (b.attr(l), u && b.css(r(u, b.specCss)), delete b.specCss, a.rotation = l.rotation)
            });
            this.tickRotCorr = b.rotCorr(g.b, this.labelRotation || 0, 2 === this.side)
        },
        hasData: function () {
            return this.hasVisibleSeries || t(this.min) && t(this.max) && !!this.tickPositions
        },
        getOffset: function () {
            var a = this, b = a.chart,
                c = b.renderer, d = a.options, e = a.tickPositions, f = a.ticks, g = a.horiz, h = a.side, k = b.inverted ? [1, 0, 3, 2][h] : h, m, l, u = 0, w, y = 0, H = d.title, D = d.labels, n = 0, v = b.axisOffset, b = b.clipOffset, q = [-1, 1, 1, -1][h], p, r = a.axisParent;
            m = a.hasData();
            a.showAxis = l = m || z(d.showEmpty, !0);
            a.staggerLines = a.horiz && D.staggerLines;
            a.axisGroup || (a.gridGroup = c.g("grid").attr({zIndex: d.gridZIndex || 1}).add(r), a.axisGroup = c.g("axis").attr({zIndex: d.zIndex || 2}).add(r), a.labelGroup = c.g("axis-labels").attr({zIndex: D.zIndex || 7}).addClass("highcharts-" +
                a.coll.toLowerCase() + "-labels").add(r));
            if (m || a.isLinked)x(e, function (b) {
                f[b] ? f[b].addLabel() : f[b] = new Ea(a, b)
            }), a.renderUnsquish(), x(e, function (b) {
                if (0 === h || 2 === h || {1: "left", 3: "right"}[h] === a.labelAlign)n = I(f[b].getLabelSize(), n)
            }), a.staggerLines && (n *= a.staggerLines, a.labelOffset = n); else for (p in f)f[p].destroy(), delete f[p];
            H && H.text && !1 !== H.enabled && (a.axisTitle || (a.axisTitle = c.text(H.text, 0, 0, H.useHTML).attr({
                zIndex: 7,
                rotation: H.rotation || 0,
                align: H.textAlign || {low: "left", middle: "center", high: "right"}[H.align]
            }).addClass("highcharts-" +
                this.coll.toLowerCase() + "-title").css(H.style).add(a.axisGroup), a.axisTitle.isNew = !0), l && (u = a.axisTitle.getBBox()[g ? "height" : "width"], w = H.offset, y = t(w) ? 0 : z(H.margin, g ? 5 : 10)), a.axisTitle[l ? "show" : "hide"]());
            a.offset = q * z(d.offset, v[h]);
            a.tickRotCorr = a.tickRotCorr || {x: 0, y: 0};
            c = 2 === h ? a.tickRotCorr.y : 0;
            g = n + y + (n && q * (g ? z(D.y, a.tickRotCorr.y + 8) : D.x) - c);
            a.axisTitleMargin = z(w, g);
            v[h] = I(v[h], a.axisTitleMargin + u + q * a.offset, g);
            d = d.offset ? 0 : 2 * ea(d.lineWidth / 2);
            b[k] = I(b[k], d)
        },
        getLinePath: function (a) {
            var b = this.chart,
                c = this.opposite, d = this.offset, e = this.horiz, f = this.left + (c ? this.width : 0) + d, d = b.chartHeight - this.bottom - (c ? this.height : 0) + d;
            c && (a *= -1);
            return b.renderer.crispLine(["M", e ? this.left : f, e ? d : this.top, "L", e ? b.chartWidth - this.right : f, e ? d : b.chartHeight - this.bottom], a)
        },
        getTitlePosition: function () {
            var a = this.horiz, b = this.left, c = this.top, d = this.len, e = this.options.title, f = a ? b : c, g = this.opposite, h = this.offset, k = e.x || 0, m = e.y || 0, l = C(e.style.fontSize || 12), d = {
                low: f + (a ? 0 : d),
                middle: f + d / 2,
                high: f + (a ? d : 0)
            }[e.align], b = (a ?
                c + this.height : b) + (a ? 1 : -1) * (g ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? l : 0);
            return {x: a ? d + k : b + (g ? this.width : 0) + h + k, y: a ? b + m - (g ? this.height : 0) + h : d + m}
        },
        render: function () {
            var a = this, b = a.chart, c = b.renderer, d = a.options, e = a.isLog, f = a.isLinked, g = a.tickPositions, h = a.axisTitle, k = a.ticks, m = a.minorTicks, l = a.alternateBands, u = d.stackLabels, w = d.alternateGridColor, y = a.tickmarkOffset, H = d.lineWidth, D, n = b.hasRendered && t(a.oldMin) && !isNaN(a.oldMin), v = a.showAxis, z = c.globalAnimation, q, r;
            a.labelEdge.length = 0;
            a.overlap = !1;
            x([k, m, l], function (a) {
                for (var b in a)a[b].isActive = !1
            });
            if (a.hasData() || f)a.minorTickInterval && !a.categories && x(a.getMinorTickPositions(), function (b) {
                m[b] || (m[b] = new Ea(a, b, "minor"));
                n && m[b].isNew && m[b].render(null, !0);
                m[b].render(null, !1, 1)
            }), g.length && (x(g, function (b, c) {
                if (!f || b >= a.min && b <= a.max)k[b] || (k[b] = new Ea(a, b)), n && k[b].isNew && k[b].render(c, !0, .1), k[b].render(c)
            }), y && (0 === a.min || a.single) && (k[-1] || (k[-1] = new Ea(a, -1, null, !0)), k[-1].render(-1))), w && x(g, function (b, c) {
                r = g[c + 1] !== G ? g[c + 1] + y :
                a.max - y;
                0 === c % 2 && b < a.max && r <= a.max - y && (l[b] || (l[b] = new V.PlotLineOrBand(a)), q = b + y, l[b].options = {
                    from: e ? p(q) : q,
                    to: e ? p(r) : r,
                    color: w
                }, l[b].render(), l[b].isActive = !0)
            }), a._addedPlotLB || (x((d.plotLines || []).concat(d.plotBands || []), function (b) {
                a.addPlotBandOrLine(b)
            }), a._addedPlotLB = !0);
            x([k, m, l], function (a) {
                var c, d, e = [], f = z ? z.duration || 500 : 0, g = function () {
                    for (d = e.length; d--;)a[e[d]] && !a[e[d]].isActive && (a[e[d]].destroy(), delete a[e[d]])
                };
                for (c in a)a[c].isActive || (a[c].render(c, !1, 0), a[c].isActive = !1, e.push(c));
                a !== l && b.hasRendered && f ? f && setTimeout(g, f) : g()
            });
            H && (D = a.getLinePath(H), a.axisLine ? a.axisLine.animate({d: D}) : a.axisLine = c.path(D).attr({
                stroke: d.lineColor,
                "stroke-width": H,
                zIndex: 7
            }).add(a.axisGroup), a.axisLine[v ? "show" : "hide"]());
            h && v && (h[h.isNew ? "attr" : "animate"](a.getTitlePosition()), h.isNew = !1);
            u && u.enabled && a.renderStackTotals();
            a.isDirty = !1
        },
        redraw: function () {
            this.visible && (this.render(), x(this.plotLinesAndBands, function (a) {
                a.render()
            }));
            x(this.series, function (a) {
                a.isDirty = !0
            })
        },
        destroy: function (a) {
            var b =
                this, c = b.stacks, d, e = b.plotLinesAndBands;
            a || pa(b);
            for (d in c)ba(c[d]), c[d] = null;
            x([b.ticks, b.minorTicks, b.alternateBands], function (a) {
                ba(a)
            });
            for (a = e.length; a--;)e[a].destroy();
            x("stackTotalGroup axisLine axisTitle axisGroup cross gridGroup labelGroup".split(" "), function (a) {
                b[a] && (b[a] = b[a].destroy())
            });
            this.cross && this.cross.destroy()
        },
        drawCrosshair: function (a, b) {
            var c, d = this.crosshair, e = d.animation;
            if (!this.crosshair || !1 === (t(b) || !z(this.crosshair.snap, !0)) || b && b.series && b.series[this.coll] !== this)this.hideCrosshair();
            else if (z(d.snap, !0) ? t(b) && (c = this.isXAxis ? b.plotX : this.len - b.plotY) : c = this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos, c = this.isRadial ? this.getPlotLinePath(this.isXAxis ? b.x : z(b.stackY, b.y)) || null : this.getPlotLinePath(null, null, null, null, c) || null, null === c)this.hideCrosshair(); else if (this.cross)this.cross.attr({visibility: "visible"})[e ? "animate" : "attr"]({d: c}, e); else e = this.categories && !this.isRadial, e = {
                "stroke-width": d.width || (e ? this.transA : 1),
                stroke: d.color || (e ? "rgba(155,200,255,0.2)" : "#C0C0C0"),
                zIndex: d.zIndex || 2
            }, d.dashStyle && (e.dashstyle = d.dashStyle), this.cross = this.chart.renderer.path(c).attr(e).add()
        },
        hideCrosshair: function () {
            this.cross && this.cross.hide()
        }
    };
    O(ca.prototype, {
        getPlotBandPath: function (a, b) {
            var c = this.getPlotLinePath(b, null, null, !0), d = this.getPlotLinePath(a, null, null, !0);
            d && c && d.toString() !== c.toString() ? d.push(c[4], c[5], c[1], c[2]) : d = null;
            return d
        }, addPlotBand: function (a) {
            return this.addPlotBandOrLine(a, "plotBands")
        }, addPlotLine: function (a) {
            return this.addPlotBandOrLine(a,
                "plotLines")
        }, addPlotBandOrLine: function (a, b) {
            var c = (new V.PlotLineOrBand(this, a)).render(), d = this.userOptions;
            c && (b && (d[b] = d[b] || [], d[b].push(a)), this.plotLinesAndBands.push(c));
            return c
        }, removePlotBandOrLine: function (a) {
            for (var b = this.plotLinesAndBands, c = this.options, d = this.userOptions, e = b.length; e--;)b[e].id === a && b[e].destroy();
            x([c.plotLines || [], d.plotLines || [], c.plotBands || [], d.plotBands || []], function (b) {
                for (e = b.length; e--;)b[e].id === a && q(b, b[e])
            })
        }
    });
    ca.prototype.getTimeTicks = function (a, b, c,
                                          d) {
        var e = [], f = {}, g = ma.global.useUTC, h, k = new ta(b - U(b)), m = a.unitRange, l = a.count;
        if (t(b)) {
            k[Qb](m >= ga.second ? 0 : l * ea(k.getMilliseconds() / l));
            if (m >= ga.second)k[Rb](m >= ga.minute ? 0 : l * ea(k.getSeconds() / l));
            if (m >= ga.minute)k[Sb](m >= ga.hour ? 0 : l * ea(k[Ab]() / l));
            if (m >= ga.hour)k[Tb](m >= ga.day ? 0 : l * ea(k[Bb]() / l));
            if (m >= ga.day)k[Db](m >= ga.month ? 1 : l * ea(k[eb]() / l));
            m >= ga.month && (k[Eb](m >= ga.year ? 0 : l * ea(k[fb]() / l)), h = k[gb]());
            if (m >= ga.year)k[Fb](h - h % l);
            if (m === ga.week)k[Db](k[eb]() - k[Cb]() + z(d, 1));
            b = 1;
            if (zb || mb)k = k.getTime(),
                k = new ta(k + U(k));
            h = k[gb]();
            d = k.getTime();
            for (var u = k[fb](), w = k[eb](), y = (ga.day + (g ? U(k) : 6E4 * k.getTimezoneOffset())) % ga.day; d < c;)e.push(d), d = m === ga.year ? ob(h + b * l, 0) : m === ga.month ? ob(h, u + b * l) : g || m !== ga.day && m !== ga.week ? d + m * l : ob(h, u, w + b * l * (m === ga.day ? 1 : 7)), b++;
            e.push(d);
            x(jb(e, function (a) {
                return m <= ga.hour && a % ga.day === y
            }), function (a) {
                f[a] = "day"
            })
        }
        e.info = O(a, {higherRanks: f, totalRange: m * l});
        return e
    };
    ca.prototype.normalizeTimeTickInterval = function (a, b) {
        var c = b || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200,
                500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]], d = c[c.length - 1], e = ga[d[0]], f = d[1], g;
        for (g = 0; g < c.length && !(d = c[g], e = ga[d[0]], f = d[1], c[g + 1] && a <= (e * f[f.length - 1] + ga[c[g + 1][0]]) / 2); g++);
        e === ga.year && a < 5 * e && (f = [1, 2, 5]);
        c = Q(a / e, f, "year" === d[0] ? I(v(a / e), 1) : 1);
        return {unitRange: e, count: c, unitName: d[0]}
    };
    ca.prototype.getLogTickPositions = function (a, b, c, d) {
        var e = this.options, f = this.len, g = [];
        d || (this._minorAutoInterval =
            null);
        if (.5 <= a)a = K(a), g = this.getLinearTickPositions(a, b, c); else if (.08 <= a)for (var f = ea(b), h, k, m, l, u, e = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; f < c + 1 && !u; f++)for (k = e.length, h = 0; h < k && !u; h++)m = J(p(f) * e[h]), m > b && (!d || l <= c) && l !== G && g.push(l), l > c && (u = !0), l = m; else b = p(b), c = p(c), a = e[d ? "minorTickInterval" : "tickInterval"], a = z("auto" === a ? null : a, this._minorAutoInterval, e.tickPixelInterval / (d ? 5 : 1) * (c - b) / ((d ? f / this.tickPositions.length : f) || 1)), a = Q(a, null, v(a)), g = Ga(this.getLinearTickPositions(a, b, c),
            J), d || (this._minorAutoInterval = a / 5);
        d || (this.tickInterval = a);
        return g
    };
    var Ib = V.Tooltip = function () {
        this.init.apply(this, arguments)
    };
    Ib.prototype = {
        init: function (a, b) {
            var c = b.borderWidth, d = b.style, e = C(d.padding);
            this.chart = a;
            this.options = b;
            this.crosshairs = [];
            this.now = {x: 0, y: 0};
            this.isHidden = !0;
            this.label = a.renderer.label("", 0, 0, b.shape || "callout", null, null, b.useHTML, null, "tooltip").attr({
                padding: e,
                fill: b.backgroundColor,
                "stroke-width": c,
                r: b.borderRadius,
                zIndex: 8
            }).css(d).css({padding: 0}).add().attr({y: -9999});
            Fa || this.label.shadow(b.shadow);
            this.shared = b.shared
        }, destroy: function () {
            this.label && (this.label = this.label.destroy());
            clearTimeout(this.hideTimer);
            clearTimeout(this.tooltipTimeout)
        }, move: function (a, b, c, d) {
            var e = this, f = e.now, g = !1 !== e.options.animation && !e.isHidden && (1 < ha(a - f.x) || 1 < ha(b - f.y)), h = e.followPointer || 1 < e.len;
            O(f, {
                x: g ? (2 * f.x + a) / 3 : a,
                y: g ? (f.y + b) / 2 : b,
                anchorX: h ? G : g ? (2 * f.anchorX + c) / 3 : c,
                anchorY: h ? G : g ? (f.anchorY + d) / 2 : d
            });
            e.label.attr(f);
            g && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout =
                setTimeout(function () {
                    e && e.move(a, b, c, d)
                }, 32))
        }, hide: function (a) {
            var b = this;
            clearTimeout(this.hideTimer);
            this.isHidden || (this.hideTimer = setTimeout(function () {
                b.label.fadeOut();
                b.isHidden = !0
            }, z(a, this.options.hideDelay, 500)))
        }, getAnchor: function (a, b) {
            var c, d = this.chart, e = d.inverted, f = d.plotTop, g = d.plotLeft, h = 0, k = 0, m, l;
            a = B(a);
            c = a[0].tooltipPos;
            this.followPointer && b && (b.chartX === G && (b = d.pointer.normalize(b)), c = [b.chartX - d.plotLeft, b.chartY - f]);
            c || (x(a, function (a) {
                m = a.series.yAxis;
                l = a.series.xAxis;
                h +=
                    a.plotX + (!e && l ? l.left - g : 0);
                k += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!e && m ? m.top - f : 0)
            }), h /= a.length, k /= a.length, c = [e ? d.plotWidth - k : h, this.shared && !e && 1 < a.length && b ? b.chartY - f : e ? d.plotHeight - h : k]);
            return Ga(c, K)
        }, getPosition: function (a, b, c) {
            var d = this.chart, e = this.distance, f = {}, g = c.h || 0, h, k = ["y", d.chartHeight, b, c.plotY + d.plotTop, d.plotTop, d.plotTop + d.plotHeight], m = ["x", d.chartWidth, a, c.plotX + d.plotLeft, d.plotLeft, d.plotLeft + d.plotWidth], l = z(c.ttBelow, d.inverted && !c.negative || !d.inverted && c.negative),
                u = function (a, b, c, d, h, k) {
                    var m = c < d - e, u = d + e + c < b, w = d - e - c;
                    d += e;
                    if (l && u)f[a] = d; else if (!l && m)f[a] = w; else if (m)f[a] = S(k - c, 0 > w - g ? w : w - g); else if (u)f[a] = I(h, d + g + c > b ? d : d + g); else return !1
                }, w = function (a, b, c, d) {
                    if (d < e || d > b - e)return !1;
                    f[a] = d < c / 2 ? 1 : d > b - c / 2 ? b - c - 2 : d - c / 2
                }, y = function (a) {
                    var b = k;
                    k = m;
                    m = b;
                    h = a
                }, H = function () {
                    !1 !== u.apply(0, k) ? !1 !== w.apply(0, m) || h || (y(!0), H()) : h ? f.x = f.y = 0 : (y(!0), H())
                };
            (d.inverted || 1 < this.len) && y();
            H();
            return f
        }, defaultFormatter: function (a) {
            var b = this.points || B(this), c;
            c = [a.tooltipFooterHeaderFormatter(b[0])];
            c = c.concat(a.bodyFormatter(b));
            c.push(a.tooltipFooterHeaderFormatter(b[0], !0));
            return c.join("")
        }, refresh: function (a, b) {
            var c = this.chart, d = this.label, e = this.options, f, g, h, k = {}, m, l = [];
            m = e.formatter || this.defaultFormatter;
            var k = c.hoverPoints, u, w = this.shared;
            clearTimeout(this.hideTimer);
            this.followPointer = B(a)[0].series.tooltipOptions.followPointer;
            h = this.getAnchor(a, b);
            f = h[0];
            g = h[1];
            !w || a.series && a.series.noSharedTooltip ? k = a.getLabelConfig() : (c.hoverPoints = a, k && x(k, function (a) {
                a.setState()
            }), x(a, function (a) {
                a.setState("hover");
                l.push(a.getLabelConfig())
            }), k = {x: a[0].category, y: a[0].y}, k.points = l, this.len = l.length, a = a[0]);
            m = m.call(k, this);
            k = a.series;
            this.distance = z(k.tooltipOptions.distance, 16);
            !1 === m ? this.hide() : (this.isHidden && (db(d), d.attr("opacity", 1).show()), d.attr({text: m}), u = e.borderColor || a.color || k.color || "#606060", d.attr({stroke: u}), this.updatePosition({
                plotX: f,
                plotY: g,
                negative: a.negative,
                ttBelow: a.ttBelow,
                h: h[2] || 0
            }), this.isHidden = !1);
            ja(c, "tooltipRefresh", {text: m, x: f + c.plotLeft, y: g + c.plotTop, borderColor: u})
        },
        updatePosition: function (a) {
            var b = this.chart, c = this.label, c = (this.options.positioner || this.getPosition).call(this, c.width, c.height, a);
            this.move(K(c.x), K(c.y || 0), a.plotX + b.plotLeft, a.plotY + b.plotTop)
        }, getXDateFormat: function (a, b, c) {
            var d;
            b = b.dateTimeLabelFormats;
            var e = c && c.closestPointRange, f, g = {
                millisecond: 15,
                second: 12,
                minute: 9,
                hour: 6,
                day: 3
            }, h, k = "millisecond";
            if (e) {
                h = va("%m-%d %H:%M:%S.%L", a.x);
                for (f in ga) {
                    if (e === ga.week && +va("%w", a.x) === c.options.startOfWeek && "00:00:00.000" === h.substr(6)) {
                        f = "week";
                        break
                    } else if (ga[f] > e) {
                        f = k;
                        break
                    } else if (g[f] && h.substr(g[f]) !== "01-01 00:00:00.000".substr(g[f]))break;
                    "week" !== f && (k = f)
                }
                f && (d = b[f])
            } else d = b.day;
            return d || b.year
        }, tooltipFooterHeaderFormatter: function (a, b) {
            var c = b ? "footer" : "header", d = a.series, e = d.tooltipOptions, f = e.xDateFormat, g = d.xAxis, h = g && "datetime" === g.options.type && T(a.key), c = e[c + "Format"];
            h && !f && (f = this.getXDateFormat(a, e, g));
            h && f && (c = c.replace("{point.key}", "{point.key:" + f + "}"));
            return n(c, {point: a, series: d})
        }, bodyFormatter: function (a) {
            return Ga(a,
                function (a) {
                    var c = a.series.tooltipOptions;
                    return (c.pointFormatter || a.point.tooltipFormatter).call(a.point, c.pointFormat)
                })
        }
    };
    var Ha;
    cb = da.documentElement.ontouchstart !== G;
    var Wa = V.Pointer = function (a, b) {
        this.init(a, b)
    };
    Wa.prototype = {
        init: function (a, b) {
            var c = b.chart, d = c.events, e = Fa ? "" : c.zoomType, c = a.inverted, f;
            this.options = b;
            this.chart = a;
            this.zoomX = f = /x/.test(e);
            this.zoomY = e = /y/.test(e);
            this.zoomHor = f && !c || e && c;
            this.zoomVert = e && !c || f && c;
            this.hasZoom = f || e;
            this.runChartClick = d && !!d.click;
            this.pinchDown =
                [];
            this.lastValidTouch = {};
            V.Tooltip && b.tooltip.enabled && (a.tooltip = new Ib(a, b.tooltip), this.followTouchMove = z(b.tooltip.followTouchMove, !0));
            this.setDOMEvents()
        }, normalize: function (a, b) {
            var c, d;
            a = a || window.event;
            a = hc(a);
            a.target || (a.target = a.srcElement);
            d = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
            b || (this.chartPosition = b = gc(this.chart.container));
            d.pageX === G ? (c = I(a.x, a.clientX - b.left), d = a.y) : (c = d.pageX - b.left, d = d.pageY - b.top);
            return O(a, {chartX: K(c), chartY: K(d)})
        }, getCoordinates: function (a) {
            var b =
            {xAxis: [], yAxis: []};
            x(this.chart.axes, function (c) {
                b[c.isXAxis ? "xAxis" : "yAxis"].push({axis: c, value: c.toValue(a[c.horiz ? "chartX" : "chartY"])})
            });
            return b
        }, runPointActions: function (a) {
            var b = this.chart, c = b.series, d = b.tooltip, e = d ? d.shared : !1, f = b.hoverPoint, g = b.hoverSeries, h, k = Number.MAX_VALUE, m, l, u = [], w, y;
            if (!e && !g)for (h = 0; h < c.length; h++)if (c[h].directTouch || !c[h].options.stickyTracking)c = [];
            g && (e ? g.noSharedTooltip : g.directTouch) && f ? w = f : (x(c, function (b) {
                m = b.noSharedTooltip && e;
                l = !e && b.directTouch;
                b.visible && !m && !l && z(b.options.enableMouseTracking, !0) && (y = b.searchPoint(a, !m && 1 === b.kdDimensions)) && u.push(y)
            }), x(u, function (a) {
                a && "number" === typeof a.dist && a.dist < k && (k = a.dist, w = a)
            }));
            if (w && (w !== this.prevKDPoint || d && d.isHidden)) {
                if (e && !w.series.noSharedTooltip) {
                    for (h = u.length; h--;)(u[h].clientX !== w.clientX || u[h].series.noSharedTooltip) && u.splice(h, 1);
                    u.length && d && d.refresh(u, a);
                    x(u, function (b) {
                        b.onMouseOver(a, b !== (g && g.directTouch && f || w))
                    })
                } else if (d && d.refresh(w, a), !g || !g.directTouch)w.onMouseOver(a);
                this.prevKDPoint =
                    w
            } else c = g && g.tooltipOptions.followPointer, d && c && !d.isHidden && (c = d.getAnchor([{}], a), d.updatePosition({
                plotX: c[0],
                plotY: c[1]
            }));
            d && !this._onDocumentMouseMove && (this._onDocumentMouseMove = function (a) {
                if (ra[Ha])ra[Ha].pointer.onDocumentMouseMove(a)
            }, X(da, "mousemove", this._onDocumentMouseMove));
            x(b.axes, function (b) {
                b.drawCrosshair(a, z(w, f))
            })
        }, reset: function (a, b) {
            var c = this.chart, d = c.hoverSeries, e = c.hoverPoint, f = c.hoverPoints, g = c.tooltip, h = g && g.shared ? f : e;
            (a = a && g && h) && B(h)[0].plotX === G && (a = !1);
            if (a)g.refresh(h),
            e && (e.setState(e.state, !0), x(c.axes, function (a) {
                z(a.options.crosshair && a.options.crosshair.snap, !0) ? a.drawCrosshair(null, e) : a.hideCrosshair()
            })); else {
                if (e)e.onMouseOut();
                f && x(f, function (a) {
                    a.setState()
                });
                if (d)d.onMouseOut();
                g && g.hide(b);
                this._onDocumentMouseMove && (pa(da, "mousemove", this._onDocumentMouseMove), this._onDocumentMouseMove = null);
                x(c.axes, function (a) {
                    a.hideCrosshair()
                });
                this.hoverX = c.hoverPoints = c.hoverPoint = null
            }
        }, scaleGroups: function (a, b) {
            var c = this.chart, d;
            x(c.series, function (e) {
                d = a ||
                    e.getPlotBox();
                e.xAxis && e.xAxis.zoomEnabled && (e.group.attr(d), e.markerGroup && (e.markerGroup.attr(d), e.markerGroup.clip(b ? c.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(d))
            });
            c.clipRect.attr(b || c.clipBox)
        }, dragStart: function (a) {
            var b = this.chart;
            b.mouseIsDown = a.type;
            b.cancelClick = !1;
            b.mouseDownX = this.mouseDownX = a.chartX;
            b.mouseDownY = this.mouseDownY = a.chartY
        }, drag: function (a) {
            var b = this.chart, c = b.options.chart, d = a.chartX, e = a.chartY, f = this.zoomHor, g = this.zoomVert, h = b.plotLeft, k = b.plotTop,
                m = b.plotWidth, l = b.plotHeight, u, w = this.selectionMarker, y = this.mouseDownX, H = this.mouseDownY, D = c.panKey && a[c.panKey + "Key"];
            w && w.touch || (d < h ? d = h : d > h + m && (d = h + m), e < k ? e = k : e > k + l && (e = k + l), this.hasDragged = Math.sqrt(Math.pow(y - d, 2) + Math.pow(H - e, 2)), 10 < this.hasDragged && (u = b.isInsidePlot(y - h, H - k), b.hasCartesianSeries && (this.zoomX || this.zoomY) && u && !D && !w && (this.selectionMarker = w = b.renderer.rect(h, k, f ? 1 : m, g ? 1 : l, 0).attr({
                fill: c.selectionMarkerFill || "rgba(69,114,167,0.25)",
                zIndex: 7
            }).add()), w && f && (d -= y, w.attr({
                width: ha(d),
                x: (0 < d ? 0 : d) + y
            })), w && g && (d = e - H, w.attr({
                height: ha(d),
                y: (0 < d ? 0 : d) + H
            })), u && !w && c.panning && b.pan(a, c.panning)))
        }, drop: function (a) {
            var b = this, c = this.chart, d = this.hasPinched;
            if (this.selectionMarker) {
                var e = {
                    xAxis: [],
                    yAxis: [],
                    originalEvent: a.originalEvent || a
                }, f = this.selectionMarker, g = f.attr ? f.attr("x") : f.x, h = f.attr ? f.attr("y") : f.y, k = f.attr ? f.attr("width") : f.width, m = f.attr ? f.attr("height") : f.height, l;
                if (this.hasDragged || d)x(c.axes, function (c) {
                    if (c.zoomEnabled && t(c.min) && (d || b[{xAxis: "zoomX", yAxis: "zoomY"}[c.coll]])) {
                        var f =
                            c.horiz, y = "touchend" === a.type ? c.minPixelPadding : 0, H = c.toValue((f ? g : h) + y), f = c.toValue((f ? g + k : h + m) - y);
                        e[c.coll].push({axis: c, min: S(H, f), max: I(H, f)});
                        l = !0
                    }
                }), l && ja(c, "selection", e, function (a) {
                    c.zoom(O(a, d ? {animation: !1} : null))
                });
                this.selectionMarker = this.selectionMarker.destroy();
                d && this.scaleGroups()
            }
            c && (A(c.container, {cursor: c._cursor}), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
        }, onContainerMouseDown: function (a) {
            a = this.normalize(a);
            a.preventDefault &&
            a.preventDefault();
            this.dragStart(a)
        }, onDocumentMouseUp: function (a) {
            ra[Ha] && ra[Ha].pointer.drop(a)
        }, onDocumentMouseMove: function (a) {
            var b = this.chart, c = this.chartPosition;
            a = this.normalize(a, c);
            !c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
        }, onContainerMouseLeave: function () {
            var a = ra[Ha];
            a && (a.pointer.reset(), a.pointer.chartPosition = null)
        }, onContainerMouseMove: function (a) {
            var b = this.chart;
            Ha = b.index;
            a = this.normalize(a);
            a.returnValue = !1;
            "mousedown" === b.mouseIsDown && this.drag(a);
            !this.inClass(a.target, "highcharts-tracker") && !b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || b.openMenu || this.runPointActions(a)
        }, inClass: function (a, b) {
            for (var c; a;) {
                if (c = F(a, "class")) {
                    if (-1 !== c.indexOf(b))return !0;
                    if (-1 !== c.indexOf("highcharts-container"))return !1
                }
                a = a.parentNode
            }
        }, onTrackerMouseOut: function (a) {
            var b = this.chart.hoverSeries;
            a = a.relatedTarget || a.toElement;
            if (b && !b.options.stickyTracking && !this.inClass(a, "highcharts-tooltip") && !this.inClass(a,
                    "highcharts-series-" + b.index))b.onMouseOut()
        }, onContainerClick: function (a) {
            var b = this.chart, c = b.hoverPoint, d = b.plotLeft, e = b.plotTop;
            a = this.normalize(a);
            a.originalEvent = a;
            b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (ja(c.series, "click", O(a, {point: c})), b.hoverPoint && c.firePointEvent("click", a)) : (O(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY - e) && ja(b, "click", a)))
        }, setDOMEvents: function () {
            var a = this, b = a.chart.container;
            b.onmousedown = function (b) {
                a.onContainerMouseDown(b)
            };
            b.onmousemove = function (b) {
                a.onContainerMouseMove(b)
            };
            b.onclick = function (b) {
                a.onContainerClick(b)
            };
            X(b, "mouseleave", a.onContainerMouseLeave);
            1 === ib && X(da, "mouseup", a.onDocumentMouseUp);
            cb && (b.ontouchstart = function (b) {
                a.onContainerTouchStart(b)
            }, b.ontouchmove = function (b) {
                a.onContainerTouchMove(b)
            }, 1 === ib && X(da, "touchend", a.onDocumentTouchEnd))
        }, destroy: function () {
            var a;
            pa(this.chart.container, "mouseleave", this.onContainerMouseLeave);
            ib || (pa(da, "mouseup", this.onDocumentMouseUp), pa(da, "touchend", this.onDocumentTouchEnd));
            clearInterval(this.tooltipTimeout);
            for (a in this)this[a] = null
        }
    };
    O(V.Pointer.prototype, {
        pinchTranslate: function (a, b, c, d, e, f) {
            (this.zoomHor || this.pinchHor) && this.pinchTranslateDirection(!0, a, b, c, d, e, f);
            (this.zoomVert || this.pinchVert) && this.pinchTranslateDirection(!1, a, b, c, d, e, f)
        }, pinchTranslateDirection: function (a, b, c, d, e, f, g, h) {
            var k = this.chart, m = a ? "x" : "y", l = a ? "X" : "Y", u = "chart" + l, w = a ? "width" : "height", y = k["plot" + (a ? "Left" : "Top")], H, D, n = h || 1, t = k.inverted, v = k.bounds[a ? "h" : "v"], z = 1 === b.length, q = b[0][u],
                p = c[0][u], x = !z && b[1][u], r = !z && c[1][u], Q;
            c = function () {
                !z && 20 < ha(q - x) && (n = h || ha(p - r) / ha(q - x));
                D = (y - p) / n + q;
                H = k["plot" + (a ? "Width" : "Height")] / n
            };
            c();
            b = D;
            b < v.min ? (b = v.min, Q = !0) : b + H > v.max && (b = v.max - H, Q = !0);
            Q ? (p -= .8 * (p - g[m][0]), z || (r -= .8 * (r - g[m][1])), c()) : g[m] = [p, r];
            t || (f[m] = D - y, f[w] = H);
            f = t ? 1 / n : n;
            e[w] = H;
            e[m] = b;
            d[t ? a ? "scaleY" : "scaleX" : "scale" + l] = n;
            d["translate" + l] = f * y + (p - f * q)
        }, pinch: function (a) {
            var b = this, c = b.chart, d = b.pinchDown, e = a.touches, f = e.length, g = b.lastValidTouch, h = b.hasZoom, k = b.selectionMarker, m = {},
                l = 1 === f && (b.inClass(a.target, "highcharts-tracker") && c.runTrackerClick || b.runChartClick), u = {};
            1 < f && (b.initiated = !0);
            h && b.initiated && !l && a.preventDefault();
            Ga(e, function (a) {
                return b.normalize(a)
            });
            "touchstart" === a.type ? (x(e, function (a, b) {
                d[b] = {chartX: a.chartX, chartY: a.chartY}
            }), g.x = [d[0].chartX, d[1] && d[1].chartX], g.y = [d[0].chartY, d[1] && d[1].chartY], x(c.axes, function (a) {
                if (a.zoomEnabled) {
                    var b = c.bounds[a.horiz ? "h" : "v"], d = a.minPixelPadding, e = a.toPixels(z(a.options.min, a.dataMin)), f = a.toPixels(z(a.options.max,
                        a.dataMax)), g = S(e, f), e = I(e, f);
                    b.min = S(a.pos, g - d);
                    b.max = I(a.pos + a.len, e + d)
                }
            }), b.res = !0) : d.length && (k || (b.selectionMarker = k = O({
                destroy: la,
                touch: !0
            }, c.plotBox)), b.pinchTranslate(d, e, m, k, u, g), b.hasPinched = h, b.scaleGroups(m, u), !h && b.followTouchMove && 1 === f ? this.runPointActions(b.normalize(a)) : b.res && (b.res = !1, this.reset(!1, 0)))
        }, touch: function (a, b) {
            var c = this.chart;
            Ha = c.index;
            1 === a.touches.length ? (a = this.normalize(a), c.isInsidePlot(a.chartX - c.plotLeft, a.chartY - c.plotTop) && !c.openMenu ? (b && this.runPointActions(a),
                this.pinch(a)) : b && this.reset()) : 2 === a.touches.length && this.pinch(a)
        }, onContainerTouchStart: function (a) {
            this.touch(a, !0)
        }, onContainerTouchMove: function (a) {
            this.touch(a)
        }, onDocumentTouchEnd: function (a) {
            ra[Ha] && ra[Ha].pointer.drop(a)
        }
    });
    if (qa.PointerEvent || qa.MSPointerEvent) {
        var Qa = {}, Jb = !!qa.PointerEvent, lc = function () {
            var a, b = [];
            b.item = function (a) {
                return this[a]
            };
            for (a in Qa)Qa.hasOwnProperty(a) && b.push({pageX: Qa[a].pageX, pageY: Qa[a].pageY, target: Qa[a].target});
            return b
        }, Kb = function (a, b, c, d) {
            a = a.originalEvent ||
                a;
            "touch" !== a.pointerType && a.pointerType !== a.MSPOINTER_TYPE_TOUCH || !ra[Ha] || (d(a), d = ra[Ha].pointer, d[b]({
                type: c,
                target: a.currentTarget,
                preventDefault: la,
                touches: lc()
            }))
        };
        O(Wa.prototype, {
            onContainerPointerDown: function (a) {
                Kb(a, "onContainerTouchStart", "touchstart", function (a) {
                    Qa[a.pointerId] = {pageX: a.pageX, pageY: a.pageY, target: a.currentTarget}
                })
            }, onContainerPointerMove: function (a) {
                Kb(a, "onContainerTouchMove", "touchmove", function (a) {
                    Qa[a.pointerId] = {pageX: a.pageX, pageY: a.pageY};
                    Qa[a.pointerId].target ||
                    (Qa[a.pointerId].target = a.currentTarget)
                })
            }, onDocumentPointerUp: function (a) {
                Kb(a, "onDocumentTouchEnd", "touchend", function (a) {
                    delete Qa[a.pointerId]
                })
            }, batchMSEvents: function (a) {
                a(this.chart.container, Jb ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                a(this.chart.container, Jb ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                a(da, Jb ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
            }
        });
        W(Wa.prototype, "init", function (a, b, c) {
            a.call(this, b, c);
            this.hasZoom && A(b.container, {
                "-ms-touch-action": "none",
                "touch-action": "none"
            })
        });
        W(Wa.prototype, "setDOMEvents", function (a) {
            a.apply(this);
            (this.hasZoom || this.followTouchMove) && this.batchMSEvents(X)
        });
        W(Wa.prototype, "destroy", function (a) {
            this.batchMSEvents(pa);
            a.call(this)
        })
    }
    var vb = V.Legend = function (a, b) {
        this.init(a, b)
    };
    vb.prototype = {
        init: function (a, b) {
            var c = this, d = b.itemStyle, e = b.itemMarginTop || 0;
            this.options = b;
            b.enabled && (c.itemStyle = d, c.itemHiddenStyle = r(d, b.itemHiddenStyle), c.itemMarginTop = e, c.padding = d = z(b.padding, 8), c.initialItemX = d, c.initialItemY =
                d - 5, c.maxItemWidth = 0, c.chart = a, c.itemHeight = 0, c.symbolWidth = z(b.symbolWidth, 16), c.pages = [], c.render(), X(c.chart, "endResize", function () {
                c.positionCheckboxes()
            }))
        }, colorizeItem: function (a, b) {
            var c = this.options, d = a.legendItem, e = a.legendLine, f = a.legendSymbol, g = this.itemHiddenStyle.color, c = b ? c.itemStyle.color : g, h = b ? a.legendColor || a.color || "#CCC" : g, g = a.options && a.options.marker, k = {fill: h}, m;
            d && d.css({fill: c, color: c});
            e && e.attr({stroke: h});
            if (f) {
                if (g && f.isMarker)for (m in k.stroke = h, g = a.convertAttribs(g),
                    g)d = g[m], d !== G && (k[m] = d);
                f.attr(k)
            }
        }, positionItem: function (a) {
            var b = this.options, c = b.symbolPadding, b = !b.rtl, d = a._legendItemPos, e = d[0], d = d[1], f = a.checkbox;
            (a = a.legendGroup) && a.element && a.translate(b ? e : this.legendWidth - e - 2 * c - 4, d);
            f && (f.x = e, f.y = d)
        }, destroyItem: function (a) {
            var b = a.checkbox;
            x(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) {
                a[b] && (a[b] = a[b].destroy())
            });
            b && Ja(a.checkbox)
        }, destroy: function () {
            var a = this.group, b = this.box;
            b && (this.box = b.destroy());
            a && (this.group = a.destroy())
        },
        positionCheckboxes: function (a) {
            var b = this.group.alignAttr, c, d = this.clipHeight || this.legendHeight;
            b && (c = b.translateY, x(this.allItems, function (e) {
                var f = e.checkbox, g;
                f && (g = c + f.y + (a || 0) + 3, A(f, {
                    left: b.translateX + e.checkboxOffset + f.x - 20 + "px",
                    top: g + "px",
                    display: g > c - 6 && g < c + d - 6 ? "" : "none"
                }))
            }))
        }, renderTitle: function () {
            var a = this.padding, b = this.options.title, c = 0;
            b.text && (this.title || (this.title = this.chart.renderer.label(b.text, a - 3, a - 4, null, null, null, null, null, "legend-title").attr({zIndex: 1}).css(b.style).add(this.group)),
                a = this.title.getBBox(), c = a.height, this.offsetWidth = a.width, this.contentGroup.attr({translateY: c}));
            this.titleHeight = c
        }, setText: function (a) {
            var b = this.options;
            a.legendItem.attr({text: b.labelFormat ? n(b.labelFormat, a) : b.labelFormatter.call(a)})
        }, renderItem: function (a) {
            var b = this.chart, c = b.renderer, d = this.options, e = "horizontal" === d.layout, f = this.symbolWidth, g = d.symbolPadding, h = this.itemStyle, k = this.itemHiddenStyle, m = this.padding, l = e ? z(d.itemDistance, 20) : 0, u = !d.rtl, w = d.width, y = d.itemMarginBottom || 0, H =
                this.itemMarginTop, D = this.initialItemX, n = a.legendItem, t = a.series && a.series.drawLegendSymbol ? a.series : a, v = t.options, v = this.createCheckboxForItem && v && v.showCheckbox, q = d.useHTML;
            n || (a.legendGroup = c.g("legend-item").attr({zIndex: 1}).add(this.scrollGroup), a.legendItem = n = c.text("", u ? f + g : -g, this.baseline || 0, q).css(r(a.visible ? h : k)).attr({
                align: u ? "left" : "right",
                zIndex: 2
            }).add(a.legendGroup), this.baseline || (this.fontMetrics = c.fontMetrics(h.fontSize, n), this.baseline = this.fontMetrics.f + 3 + H, n.attr("y", this.baseline)),
                t.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, n, q, h, k), this.colorizeItem(a, a.visible), v && this.createCheckboxForItem(a));
            this.setText(a);
            c = n.getBBox();
            f = a.checkboxOffset = d.itemWidth || a.legendItemWidth || f + g + c.width + l + (v ? 20 : 0);
            this.itemHeight = g = K(a.legendItemHeight || c.height);
            e && this.itemX - D + f > (w || b.chartWidth - 2 * m - D - d.x) && (this.itemX = D, this.itemY += H + this.lastLineHeight + y, this.lastLineHeight = 0);
            this.maxItemWidth = I(this.maxItemWidth, f);
            this.lastItemY = H + this.itemY + y;
            this.lastLineHeight =
                I(g, this.lastLineHeight);
            a._legendItemPos = [this.itemX, this.itemY];
            e ? this.itemX += f : (this.itemY += H + g + y, this.lastLineHeight = g);
            this.offsetWidth = w || I((e ? this.itemX - D - l : f) + m, this.offsetWidth)
        }, getAllItems: function () {
            var a = [];
            x(this.chart.series, function (b) {
                var c = b.options;
                z(c.showInLegend, t(c.linkedTo) ? !1 : G, !0) && (a = a.concat(b.legendItems || ("point" === c.legendType ? b.data : b)))
            });
            return a
        }, adjustMargins: function (a, b) {
            var c = this.chart, d = this.options, e = d.align.charAt(0) + d.verticalAlign.charAt(0) + d.layout.charAt(0);
            this.display && !d.floating && x([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (f, g) {
                f.test(e) && !t(a[g]) && (c[qb[g]] = I(c[qb[g]], c.legend[(g + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][g] * d[g % 2 ? "x" : "y"] + z(d.margin, 12) + b[g]))
            })
        }, render: function () {
            var a = this, b = a.chart, c = b.renderer, d = a.group, e, f, g, h, k = a.box, m = a.options, l = a.padding, u = m.borderWidth, w = m.backgroundColor;
            a.itemX = a.initialItemX;
            a.itemY = a.initialItemY;
            a.offsetWidth = 0;
            a.lastItemY = 0;
            d || (a.group = d = c.g("legend").attr({zIndex: 7}).add(),
                a.contentGroup = c.g().attr({zIndex: 1}).add(d), a.scrollGroup = c.g().add(a.contentGroup));
            a.renderTitle();
            e = a.getAllItems();
            N(e, function (a, b) {
                return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
            });
            m.reversed && e.reverse();
            a.allItems = e;
            a.display = f = !!e.length;
            a.lastLineHeight = 0;
            x(e, function (b) {
                a.renderItem(b)
            });
            g = (m.width || a.offsetWidth) + l;
            h = a.lastItemY + a.lastLineHeight + a.titleHeight;
            h = a.handleOverflow(h);
            h += l;
            if (u || w)k ? 0 < g && 0 < h && (k[k.isNew ? "attr" : "animate"](k.crisp({
                width: g,
                height: h
            })), k.isNew = !1) : (a.box = k = c.rect(0, 0, g, h, m.borderRadius, u || 0).attr({
                stroke: m.borderColor,
                "stroke-width": u || 0,
                fill: w || "none"
            }).add(d).shadow(m.shadow), k.isNew = !0), k[f ? "show" : "hide"]();
            a.legendWidth = g;
            a.legendHeight = h;
            x(e, function (b) {
                a.positionItem(b)
            });
            f && d.align(O({width: g, height: h}, m), !0, "spacingBox");
            b.isResizing || this.positionCheckboxes()
        }, handleOverflow: function (a) {
            var b = this, c = this.chart, d = c.renderer, e = this.options, f = e.y, f = c.spacingBox.height + ("top" === e.verticalAlign ? -f : f) - this.padding,
                g = e.maxHeight, h, k = this.clipRect, m = e.navigation, l = z(m.animation, !0), u = m.arrowSize || 12, w = this.nav, y = this.pages, H = this.padding, D, n = this.allItems, t = function (a) {
                    k.attr({height: a});
                    b.contentGroup.div && (b.contentGroup.div.style.clip = "rect(" + H + "px,9999px," + (H + a) + "px,0)")
                };
            "horizontal" === e.layout && (f /= 2);
            g && (f = S(f, g));
            y.length = 0;
            a > f ? (this.clipHeight = h = I(f - 20 - this.titleHeight - H, 0), this.currentPage = z(this.currentPage, 1), this.fullHeight = a, x(n, function (a, b) {
                var c = a._legendItemPos[1], d = K(a.legendItem.getBBox().height),
                    e = y.length;
                if (!e || c - y[e - 1] > h && (D || c) !== y[e - 1])y.push(D || c), e++;
                b === n.length - 1 && c + d - y[e - 1] > h && y.push(c);
                c !== D && (D = c)
            }), k || (k = b.clipRect = d.clipRect(0, H, 9999, 0), b.contentGroup.clip(k)), t(h), w || (this.nav = w = d.g().attr({zIndex: 1}).add(this.group), this.up = d.symbol("triangle", 0, 0, u, u).on("click", function () {
                b.scroll(-1, l)
            }).add(w), this.pager = d.text("", 15, 10).css(m.style).add(w), this.down = d.symbol("triangle-down", 0, 0, u, u).on("click", function () {
                b.scroll(1, l)
            }).add(w)), b.scroll(0), a = f) : w && (t(c.chartHeight), w.hide(),
                this.scrollGroup.attr({translateY: 1}), this.clipHeight = 0);
            return a
        }, scroll: function (a, b) {
            var c = this.pages, d = c.length, e = this.currentPage + a, f = this.clipHeight, g = this.options.navigation, h = g.activeColor, g = g.inactiveColor, k = this.pager, m = this.padding;
            e > d && (e = d);
            0 < e && (b !== G && ab(b, this.chart), this.nav.attr({
                translateX: m,
                translateY: f + this.padding + 7 + this.titleHeight,
                visibility: "visible"
            }), this.up.attr({fill: 1 === e ? g : h}).css({cursor: 1 === e ? "default" : "pointer"}), k.attr({text: e + "/" + d}), this.down.attr({
                x: 18 + this.pager.getBBox().width,
                fill: e === d ? g : h
            }).css({cursor: e === d ? "default" : "pointer"}), c = -c[e - 1] + this.initialItemY, this.scrollGroup.animate({translateY: c}), this.currentPage = e, this.positionCheckboxes(c))
        }
    };
    var lb = V.LegendSymbolMixin = {
        drawRectangle: function (a, b) {
            var c = a.options.symbolHeight || a.fontMetrics.f;
            b.legendSymbol = this.chart.renderer.rect(0, a.baseline - c + 1, a.symbolWidth, c, a.options.symbolRadius || 0).attr({zIndex: 3}).add(b.legendGroup)
        }, drawLineMarker: function (a) {
            var b = this.options, c = b.marker, d;
            d = a.symbolWidth;
            var e = this.chart.renderer,
                f = this.legendGroup;
            a = a.baseline - K(.3 * a.fontMetrics.b);
            var g;
            b.lineWidth && (g = {"stroke-width": b.lineWidth}, b.dashStyle && (g.dashstyle = b.dashStyle), this.legendLine = e.path(["M", 0, a, "L", d, a]).attr(g).add(f));
            c && !1 !== c.enabled && (b = c.radius, this.legendSymbol = d = e.symbol(this.symbol, d / 2 - b, a - b, 2 * b, 2 * b).add(f), d.isMarker = !0)
        }
    };
    (/Trident\/7\.0/.test(Ta) || Za) && W(vb.prototype, "positionItem", function (a, b) {
        var c = this, d = function () {
            b._legendItemPos && a.call(c, b)
        };
        d();
        setTimeout(d)
    });
    var Sa = V.Chart = function () {
        this.init.apply(this,
            arguments)
    };
    Sa.prototype = {
        callbacks: [], init: function (a, b) {
            var c, d = a.series;
            a.series = null;
            c = r(ma, a);
            c.series = a.series = d;
            this.userOptions = a;
            d = c.chart;
            this.margin = this.splashArray("margin", d);
            this.spacing = this.splashArray("spacing", d);
            var e = d.events;
            this.bounds = {h: {}, v: {}};
            this.callback = b;
            this.isResizing = 0;
            this.options = c;
            this.axes = [];
            this.series = [];
            this.hasCartesianSeries = d.showAxes;
            var f = this, g;
            f.index = ra.length;
            ra.push(f);
            ib++;
            !1 !== d.reflow && X(f, "load", function () {
                f.initReflow()
            });
            if (e)for (g in e)X(f,
                g, e[g]);
            f.xAxis = [];
            f.yAxis = [];
            f.animation = Fa ? !1 : z(d.animation, !0);
            f.pointCount = f.colorCounter = f.symbolCounter = 0;
            f.firstRender()
        }, initSeries: function (a) {
            var b = this.options.chart;
            (b = L[a.type || b.type || b.defaultSeriesType]) || Aa(17, !0);
            b = new b;
            b.init(this, a);
            return b
        }, isInsidePlot: function (a, b, c) {
            var d = c ? b : a;
            a = c ? a : b;
            return 0 <= d && d <= this.plotWidth && 0 <= a && a <= this.plotHeight
        }, redraw: function (a) {
            var b = this.axes, c = this.series, d = this.pointer, e = this.legend, f = this.isDirtyLegend, g, h, k = this.hasCartesianSeries, m =
                this.isDirtyBox, l = c.length, u = l, w = this.renderer, y = w.isHidden(), H = [];
            ab(a, this);
            y && this.cloneRenderTo();
            for (this.layOutTitles(); u--;)if (a = c[u], a.options.stacking && (g = !0, a.isDirty)) {
                h = !0;
                break
            }
            if (h)for (u = l; u--;)a = c[u], a.options.stacking && (a.isDirty = !0);
            x(c, function (a) {
                a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), f = !0)
            });
            f && e.options.enabled && (e.render(), this.isDirtyLegend = !1);
            g && this.getStacks();
            k && !this.isResizing && (this.maxTicks = null, x(b, function (a) {
                a.setScale()
            }));
            this.getMargins();
            k && (x(b, function (a) {
                a.isDirty && (m = !0)
            }), x(b, function (a) {
                var b = a.min + "," + a.max;
                a.extKey !== b && (a.extKey = b, H.push(function () {
                    ja(a, "afterSetExtremes", O(a.eventArgs, a.getExtremes()));
                    delete a.eventArgs
                }));
                (m || g) && a.redraw()
            }));
            m && this.drawChartBox();
            x(c, function (a) {
                a.isDirty && a.visible && (!a.isCartesian || a.xAxis) && a.redraw()
            });
            d && d.reset(!0);
            w.draw();
            ja(this, "redraw");
            y && this.cloneRenderTo(!0);
            x(H, function (a) {
                a.call()
            })
        }, get: function (a) {
            var b = this.axes, c = this.series, d, e;
            for (d = 0; d < b.length; d++)if (b[d].options.id ===
                a)return b[d];
            for (d = 0; d < c.length; d++)if (c[d].options.id === a)return c[d];
            for (d = 0; d < c.length; d++)for (e = c[d].points || [], b = 0; b < e.length; b++)if (e[b].id === a)return e[b];
            return null
        }, getAxes: function () {
            var a = this, b = this.options, c = b.xAxis = B(b.xAxis || {}), b = b.yAxis = B(b.yAxis || {});
            x(c, function (a, b) {
                a.index = b;
                a.isX = !0
            });
            x(b, function (a, b) {
                a.index = b
            });
            c = c.concat(b);
            x(c, function (b) {
                new ca(a, b)
            })
        }, getSelectedPoints: function () {
            var a = [];
            x(this.series, function (b) {
                a = a.concat(jb(b.points || [], function (a) {
                    return a.selected
                }))
            });
            return a
        }, getSelectedSeries: function () {
            return jb(this.series, function (a) {
                return a.selected
            })
        }, setTitle: function (a, b, c) {
            var d = this, e = d.options, f;
            f = e.title = r(e.title, a);
            e = e.subtitle = r(e.subtitle, b);
            x([["title", a, f], ["subtitle", b, e]], function (a) {
                var b = a[0], c = d[b], e = a[1];
                a = a[2];
                c && e && (d[b] = c = c.destroy());
                a && a.text && !c && (d[b] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
                    align: a.align,
                    "class": "highcharts-" + b,
                    zIndex: a.zIndex || 4
                }).css(a.style).add())
            });
            d.layOutTitles(c)
        }, layOutTitles: function (a) {
            var b = 0, c =
                this.title, d = this.subtitle, e = this.options, f = e.title, e = e.subtitle, g = this.renderer, h = this.spacingBox.width - 44;
            c && (c.css({width: (f.width || h) + "px"}).align(O({y: g.fontMetrics(f.style.fontSize, c).b - 3}, f), !1, "spacingBox"), f.floating || f.verticalAlign || (b = c.getBBox().height));
            d && (d.css({width: (e.width || h) + "px"}).align(O({y: b + (f.margin - 13) + g.fontMetrics(e.style.fontSize, c).b}, e), !1, "spacingBox"), e.floating || e.verticalAlign || (b = La(b + d.getBBox().height)));
            c = this.titleOffset !== b;
            this.titleOffset = b;
            !this.isDirtyBox &&
            c && (this.isDirtyBox = c, this.hasRendered && z(a, !0) && this.isDirtyBox && this.redraw())
        }, getChartSize: function () {
            var a = this.options.chart, b = a.width, a = a.height, c = this.renderToClone || this.renderTo;
            t(b) || (this.containerWidth = sb(c, "width"));
            t(a) || (this.containerHeight = sb(c, "height"));
            this.chartWidth = I(0, b || this.containerWidth || 600);
            this.chartHeight = I(0, z(a, 19 < this.containerHeight ? this.containerHeight : 400))
        }, cloneRenderTo: function (a) {
            var b = this.renderToClone, c = this.container;
            a ? b && (this.renderTo.appendChild(c),
                Ja(b), delete this.renderToClone) : (c && c.parentNode === this.renderTo && this.renderTo.removeChild(c), this.renderToClone = b = this.renderTo.cloneNode(0), A(b, {
                position: "absolute",
                top: "-9999px",
                display: "block"
            }), b.style.setProperty && b.style.setProperty("display", "block", "important"), da.body.appendChild(b), c && b.appendChild(c))
        }, getContainer: function () {
            var a, b = this.options, c = b.chart, d, e, f;
            this.renderTo = a = c.renderTo;
            f = "highcharts-" + Gb++;
            ia(a) && (this.renderTo = a = da.getElementById(a));
            a || Aa(13, !0);
            d = C(F(a, "data-highcharts-chart"));
            !isNaN(d) && ra[d] && ra[d].hasRendered && ra[d].destroy();
            F(a, "data-highcharts-chart", this.index);
            a.innerHTML = "";
            c.skipClone || a.offsetWidth || this.cloneRenderTo();
            this.getChartSize();
            d = this.chartWidth;
            e = this.chartHeight;
            this.container = a = E("div", {
                className: "highcharts-container" + (c.className ? " " + c.className : ""),
                id: f
            }, O({
                position: "relative",
                overflow: "hidden",
                width: d + "px",
                height: e + "px",
                textAlign: "left",
                lineHeight: "normal",
                zIndex: 0,
                "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
            }, c.style), this.renderToClone ||
                a);
            this._cursor = a.style.cursor;
            this.renderer = new (V[c.renderer] || Pa)(a, d, e, c.style, c.forExport, b.exporting && b.exporting.allowHTML);
            Fa && this.renderer.create(this, a, d, e);
            this.renderer.chartIndex = this.index
        }, getMargins: function (a) {
            var b = this.spacing, c = this.margin, d = this.titleOffset;
            this.resetMargins();
            d && !t(c[0]) && (this.plotTop = I(this.plotTop, d + this.options.title.margin + b[0]));
            this.legend.adjustMargins(c, b);
            this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin);
            this.extraTopMargin && (this.plotTop +=
                this.extraTopMargin);
            a || this.getAxisMargins()
        }, getAxisMargins: function () {
            var a = this, b = a.axisOffset = [0, 0, 0, 0], c = a.margin;
            a.hasCartesianSeries && x(a.axes, function (a) {
                a.visible && a.getOffset()
            });
            x(qb, function (d, e) {
                t(c[e]) || (a[d] += b[e])
            });
            a.setChartSize()
        }, reflow: function (a) {
            var b = this, c = b.options.chart, d = b.renderTo, e = c.width || sb(d, "width"), f = c.height || sb(d, "height"), c = a ? a.target : qa, d = function () {
                b.container && (b.setSize(e, f, !1), b.hasUserSize = null)
            };
            if (!b.hasUserSize && !b.isPrinting && e && f && (c === qa || c === da)) {
                if (e !==
                    b.containerWidth || f !== b.containerHeight)clearTimeout(b.reflowTimeout), a ? b.reflowTimeout = setTimeout(d, 100) : d();
                b.containerWidth = e;
                b.containerHeight = f
            }
        }, initReflow: function () {
            var a = this, b = function (b) {
                a.reflow(b)
            };
            X(qa, "resize", b);
            X(a, "destroy", function () {
                pa(qa, "resize", b)
            })
        }, setSize: function (a, b, c) {
            var d = this, e, f, g, h = d.renderer;
            d.isResizing += 1;
            g = function () {
                d && ja(d, "endResize", null, function () {
                    --d.isResizing
                })
            };
            ab(c, d);
            d.oldChartHeight = d.chartHeight;
            d.oldChartWidth = d.chartWidth;
            t(a) && (d.chartWidth = e =
                I(0, K(a)), d.hasUserSize = !!e);
            t(b) && (d.chartHeight = f = I(0, K(b)));
            a = h.globalAnimation;
            (a ? tb : A)(d.container, {width: e + "px", height: f + "px"}, a);
            d.setChartSize(!0);
            h.setSize(e, f, c);
            d.maxTicks = null;
            x(d.axes, function (a) {
                a.isDirty = !0;
                a.setScale()
            });
            x(d.series, function (a) {
                a.isDirty = !0
            });
            d.isDirtyLegend = !0;
            d.isDirtyBox = !0;
            d.layOutTitles();
            d.getMargins();
            d.redraw(c);
            d.oldChartHeight = null;
            ja(d, "resize");
            a = h.globalAnimation;
            !1 === a ? g() : setTimeout(g, a && a.duration || 500)
        }, setChartSize: function (a) {
            var b = this.inverted,
                c = this.renderer, d = this.chartWidth, e = this.chartHeight, f = this.options.chart, g = this.spacing, h = this.clipOffset, k, m, l, u;
            this.plotLeft = k = K(this.plotLeft);
            this.plotTop = m = K(this.plotTop);
            this.plotWidth = l = I(0, K(d - k - this.marginRight));
            this.plotHeight = u = I(0, K(e - m - this.marginBottom));
            this.plotSizeX = b ? u : l;
            this.plotSizeY = b ? l : u;
            this.plotBorderWidth = f.plotBorderWidth || 0;
            this.spacingBox = c.spacingBox = {x: g[3], y: g[0], width: d - g[3] - g[1], height: e - g[0] - g[2]};
            this.plotBox = c.plotBox = {x: k, y: m, width: l, height: u};
            d = 2 * ea(this.plotBorderWidth /
                    2);
            b = La(I(d, h[3]) / 2);
            c = La(I(d, h[0]) / 2);
            this.clipBox = {
                x: b,
                y: c,
                width: ea(this.plotSizeX - I(d, h[1]) / 2 - b),
                height: I(0, ea(this.plotSizeY - I(d, h[2]) / 2 - c))
            };
            a || x(this.axes, function (a) {
                a.setAxisSize();
                a.setAxisTranslation()
            })
        }, resetMargins: function () {
            var a = this;
            x(qb, function (b, c) {
                a[b] = z(a.margin[c], a.spacing[c])
            });
            a.axisOffset = [0, 0, 0, 0];
            a.clipOffset = [0, 0, 0, 0]
        }, drawChartBox: function () {
            var a = this.options.chart, b = this.renderer, c = this.chartWidth, d = this.chartHeight, e = this.chartBackground, f = this.plotBackground, g = this.plotBorder,
                h = this.plotBGImage, k = a.borderWidth || 0, m = a.backgroundColor, l = a.plotBackgroundColor, u = a.plotBackgroundImage, w = a.plotBorderWidth || 0, y, H = this.plotLeft, D = this.plotTop, n = this.plotWidth, t = this.plotHeight, v = this.plotBox, q = this.clipRect, z = this.clipBox;
            y = k + (a.shadow ? 8 : 0);
            if (k || m)e ? e.animate(e.crisp({
                width: c - y,
                height: d - y
            })) : (e = {fill: m || "none"}, k && (e.stroke = a.borderColor, e["stroke-width"] = k), this.chartBackground = b.rect(y / 2, y / 2, c - y, d - y, a.borderRadius, k).attr(e).addClass("highcharts-background").add().shadow(a.shadow));
            l && (f ? f.animate(v) : this.plotBackground = b.rect(H, D, n, t, 0).attr({fill: l}).add().shadow(a.plotShadow));
            u && (h ? h.animate(v) : this.plotBGImage = b.image(u, H, D, n, t).add());
            q ? q.animate({width: z.width, height: z.height}) : this.clipRect = b.clipRect(z);
            w && (g ? g.animate(g.crisp({
                x: H,
                y: D,
                width: n,
                height: t,
                strokeWidth: -w
            })) : this.plotBorder = b.rect(H, D, n, t, 0, -w).attr({
                stroke: a.plotBorderColor,
                "stroke-width": w,
                fill: "none",
                zIndex: 1
            }).add());
            this.isDirtyBox = !1
        }, propFromSeries: function () {
            var a = this, b = a.options.chart, c, d = a.options.series,
                e, f;
            x(["inverted", "angular", "polar"], function (g) {
                c = L[b.type || b.defaultSeriesType];
                f = a[g] || b[g] || c && c.prototype[g];
                for (e = d && d.length; !f && e--;)(c = L[d[e].type]) && c.prototype[g] && (f = !0);
                a[g] = f
            })
        }, linkSeries: function () {
            var a = this, b = a.series;
            x(b, function (a) {
                a.linkedSeries.length = 0
            });
            x(b, function (b) {
                var d = b.options.linkedTo;
                ia(d) && (d = ":previous" === d ? a.series[b.index - 1] : a.get(d)) && (d.linkedSeries.push(b), b.linkedParent = d, b.visible = z(b.options.visible, d.options.visible, b.visible))
            })
        }, renderSeries: function () {
            x(this.series,
                function (a) {
                    a.translate();
                    a.render()
                })
        }, renderLabels: function () {
            var a = this, b = a.options.labels;
            b.items && x(b.items, function (c) {
                var d = O(b.style, c.style), e = C(d.left) + a.plotLeft, f = C(d.top) + a.plotTop + 12;
                delete d.left;
                delete d.top;
                a.renderer.text(c.html, e, f).attr({zIndex: 2}).css(d).add()
            })
        }, render: function () {
            var a = this.axes, b = this.renderer, c = this.options, d, e, f, g;
            this.setTitle();
            this.legend = new vb(this, c.legend);
            this.getStacks && this.getStacks();
            this.getMargins(!0);
            this.setChartSize();
            d = this.plotWidth;
            e = this.plotHeight -=
                13;
            x(a, function (a) {
                a.setScale()
            });
            this.getAxisMargins();
            f = 1.1 < d / this.plotWidth;
            g = 1.1 < e / this.plotHeight;
            if (f || g)this.maxTicks = null, x(a, function (a) {
                (a.horiz && f || !a.horiz && g) && a.setTickInterval(!0)
            }), this.getMargins();
            this.drawChartBox();
            this.hasCartesianSeries && x(a, function (a) {
                a.visible && a.render()
            });
            this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({zIndex: 3}).add());
            this.renderSeries();
            this.renderLabels();
            this.showCredits(c.credits);
            this.hasRendered = !0
        }, showCredits: function (a) {
            a.enabled && !this.credits && (this.credits = this.renderer.text(a.text, 0, 0).on("click", function () {
                a.href && (location.href = a.href)
            }).attr({align: a.position.align, zIndex: 8}).css(a.style).add().align(a.position))
        }, destroy: function () {
            var a = this, b = a.axes, c = a.series, d = a.container, e, f = d && d.parentNode;
            ja(a, "destroy");
            ra[a.index] = G;
            ib--;
            a.renderTo.removeAttribute("data-highcharts-chart");
            pa(a);
            for (e = b.length; e--;)b[e] = b[e].destroy();
            for (e = c.length; e--;)c[e] = c[e].destroy();
            x("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer scroller rangeSelector legend resetZoomButton tooltip renderer".split(" "),
                function (b) {
                    var c = a[b];
                    c && c.destroy && (a[b] = c.destroy())
                });
            d && (d.innerHTML = "", pa(d), f && Ja(d));
            for (e in a)delete a[e]
        }, isReadyToRender: function () {
            var a = this;
            return !ua && qa == qa.top && "complete" !== da.readyState || Fa && !qa.canvg ? (Fa ? CanVGController.push(function () {
                a.firstRender()
            }, a.options.global.canvasToolsURL) : da.attachEvent("onreadystatechange", function () {
                da.detachEvent("onreadystatechange", a.firstRender);
                "complete" === da.readyState && a.firstRender()
            }), !1) : !0
        }, firstRender: function () {
            var a = this, b = a.options,
                c = a.callback;
            a.isReadyToRender() && (a.getContainer(), ja(a, "init"), a.resetMargins(), a.setChartSize(), a.propFromSeries(), a.getAxes(), x(b.series || [], function (b) {
                a.initSeries(b)
            }), a.linkSeries(), ja(a, "beforeRender"), V.Pointer && (a.pointer = new Wa(a, b)), a.render(), a.renderer.draw(), c && c.apply(a, [a]), x(a.callbacks, function (b) {
                a.index !== G && b.apply(a, [a])
            }), ja(a, "load"), a.cloneRenderTo(!0))
        }, splashArray: function (a, b) {
            var c = b[a], c = Y(c) ? c : [c, c, c, c];
            return [z(b[a + "Top"], c[0]), z(b[a + "Right"], c[1]), z(b[a + "Bottom"],
                c[2]), z(b[a + "Left"], c[3])]
        }
    };
    var Wb = V.CenteredSeriesMixin = {
        getCenter: function () {
            var a = this.options, b = this.chart, c = 2 * (a.slicedOffset || 0), d = b.plotWidth - 2 * c, b = b.plotHeight - 2 * c, e = a.center, e = [z(e[0], "50%"), z(e[1], "50%"), a.size || "100%", a.innerSize || 0], f = S(d, b), g, h;
            for (g = 0; 4 > g; ++g)h = e[g], a = 2 > g || 2 === g && /%$/.test(h), e[g] = za(h, [d, b, f, e[2]][g]) + (a ? c : 0);
            e[3] > e[2] && (e[3] = e[2]);
            return e
        }
    }, ya = function () {
    };
    ya.prototype = {
        init: function (a, b, c) {
            this.series = a;
            this.color = a.color;
            this.applyOptions(b, c);
            this.pointAttr = {};
            a.options.colorByPoint && (b = a.options.colors || a.chart.options.colors, this.color = this.color || b[a.colorCounter++], a.colorCounter === b.length && (a.colorCounter = 0));
            a.chart.pointCount++;
            return this
        }, applyOptions: function (a, b) {
            var c = this.series, d = c.options.pointValKey || c.pointValKey;
            a = ya.prototype.optionsToObject.call(this, a);
            O(this, a);
            this.options = this.options ? O(this.options, a) : a;
            d && (this.y = this[d]);
            this.x === G && c && (this.x = b === G ? c.autoIncrement() : b);
            return this
        }, optionsToObject: function (a) {
            var b = {}, c = this.series,
                d = c.options.keys, e = d || c.pointArrayMap || ["y"], f = e.length, g = 0, h = 0;
            if ("number" === typeof a || null === a)b[e[0]] = a; else if (P(a))for (!d && a.length > f && (c = typeof a[0], "string" === c ? b.name = a[0] : "number" === c && (b.x = a[0]), g++); h < f;)d && void 0 === a[g] || (b[e[h]] = a[g]), g++, h++; else"object" === typeof a && (b = a, a.dataLabels && (c._hasPointLabels = !0), a.marker && (c._hasPointMarkers = !0));
            return b
        }, destroy: function () {
            var a = this.series.chart, b = a.hoverPoints, c;
            a.pointCount--;
            b && (this.setState(), q(b, this), b.length || (a.hoverPoints = null));
            if (this === a.hoverPoint)this.onMouseOut();
            if (this.graphic || this.dataLabel)pa(this), this.destroyElements();
            this.legendItem && a.legend.destroyItem(this);
            for (c in this)this[c] = null
        }, destroyElements: function () {
            for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], b, c = 6; c--;)b = a[c], this[b] && (this[b] = this[b].destroy())
        }, getLabelConfig: function () {
            return {
                x: this.category,
                y: this.y,
                color: this.color,
                key: this.name || this.category,
                series: this.series,
                point: this,
                percentage: this.percentage,
                total: this.total ||
                this.stackTotal
            }
        }, tooltipFormatter: function (a) {
            var b = this.series, c = b.tooltipOptions, d = z(c.valueDecimals, ""), e = c.valuePrefix || "", f = c.valueSuffix || "";
            x(b.pointArrayMap || ["y"], function (b) {
                b = "{point." + b;
                if (e || f)a = a.replace(b + "}", e + b + "}" + f);
                a = a.replace(b + "}", b + ":,." + d + "f}")
            });
            return n(a, {point: this, series: this.series})
        }, firePointEvent: function (a, b, c) {
            var d = this, e = this.series.options;
            (e.point.events[a] || d.options && d.options.events && d.options.events[a]) && this.importEvents();
            "click" === a && e.allowPointSelect &&
            (c = function (a) {
                d.select && d.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
            });
            ja(this, a, b, c)
        }, visible: !0
    };
    var aa = V.Series = function () {
    };
    aa.prototype = {
        isCartesian: !0,
        type: "line",
        pointClass: ya,
        sorted: !0,
        requireSorting: !0,
        pointAttrToOptions: {stroke: "lineColor", "stroke-width": "lineWidth", fill: "fillColor", r: "radius"},
        directTouch: !1,
        axisTypes: ["xAxis", "yAxis"],
        colorCounter: 0,
        parallelArrays: ["x", "y"],
        init: function (a, b) {
            var c = this, d, e, f = a.series, g = function (a, b) {
                return z(a.options.index, a._i) - z(b.options.index,
                        b._i)
            };
            c.chart = a;
            c.options = b = c.setOptions(b);
            c.linkedSeries = [];
            c.bindAxes();
            O(c, {name: b.name, state: "", pointAttr: {}, visible: !1 !== b.visible, selected: !0 === b.selected});
            Fa && (b.animation = !1);
            e = b.events;
            for (d in e)X(c, d, e[d]);
            if (e && e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect)a.runTrackerClick = !0;
            c.getColor();
            c.getSymbol();
            x(c.parallelArrays, function (a) {
                c[a + "Data"] = []
            });
            c.setData(b.data, !1);
            c.isCartesian && (a.hasCartesianSeries = !0);
            f.push(c);
            c._i = f.length - 1;
            N(f, g);
            this.yAxis &&
            N(this.yAxis.series, g);
            x(f, function (a, b) {
                a.index = b;
                a.name = a.name || "Series " + (b + 1)
            })
        },
        bindAxes: function () {
            var a = this, b = a.options, c = a.chart, d;
            x(a.axisTypes || [], function (e) {
                x(c[e], function (c) {
                    d = c.options;
                    if (b[e] === d.index || b[e] !== G && b[e] === d.id || b[e] === G && 0 === d.index)c.series.push(a), a[e] = c, c.isDirty = !0
                });
                a[e] || a.optionalAxis === e || Aa(18, !0)
            })
        },
        updateParallelArrays: function (a, b) {
            var c = a.series, d = arguments;
            x(c.parallelArrays, "number" === typeof b ? function (d) {
                var f = "y" === d && c.toYData ? c.toYData(a) : a[d];
                c[d +
                "Data"][b] = f
            } : function (a) {
                Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2))
            })
        },
        autoIncrement: function () {
            var a = this.options, b = this.xIncrement, c, d = a.pointIntervalUnit, b = z(b, a.pointStart, 0);
            this.pointInterval = c = z(this.pointInterval, a.pointInterval, 1);
            if ("month" === d || "year" === d)a = new ta(b), a = "month" === d ? +a[Eb](a[fb]() + c) : +a[Fb](a[gb]() + c), c = a - b;
            this.xIncrement = b + c;
            return b
        },
        getSegments: function () {
            var a = -1, b = [], c, d = this.points, e = d.length;
            if (e)if (this.options.connectNulls) {
                for (c = e; c--;)null ===
                d[c].y && d.splice(c, 1);
                d.length && (b = [d])
            } else x(d, function (c, g) {
                null === c.y ? (g > a + 1 && b.push(d.slice(a + 1, g)), a = g) : g === e - 1 && b.push(d.slice(a + 1, g + 1))
            });
            this.segments = b
        },
        setOptions: function (a) {
            var b = this.chart, c = b.options.plotOptions, b = b.userOptions || {}, d = b.plotOptions || {}, e = c[this.type];
            this.userOptions = a;
            c = r(e, c.series, a);
            this.tooltipOptions = r(ma.tooltip, ma.plotOptions[this.type].tooltip, b.tooltip, d.series && d.series.tooltip, d[this.type] && d[this.type].tooltip, a.tooltip);
            null === e.marker && delete c.marker;
            this.zoneAxis = c.zoneAxis;
            a = this.zones = (c.zones || []).slice();
            !c.negativeColor && !c.negativeFillColor || c.zones || a.push({
                value: c[this.zoneAxis + "Threshold"] || c.threshold || 0,
                color: c.negativeColor,
                fillColor: c.negativeFillColor
            });
            a.length && t(a[a.length - 1].value) && a.push({color: this.color, fillColor: this.fillColor});
            return c
        },
        getCyclic: function (a, b, c) {
            var d = this.userOptions, e = "_" + a + "Index", f = a + "Counter";
            b || (t(d[e]) ? b = d[e] : (d[e] = b = this.chart[f] % c.length, this.chart[f] += 1), b = c[b]);
            this[a] = b
        },
        getColor: function () {
            this.options.colorByPoint ?
                this.options.color = null : this.getCyclic("color", this.options.color || Z[this.type].color, this.chart.options.colors)
        },
        getSymbol: function () {
            var a = this.options.marker;
            this.getCyclic("symbol", a.symbol, this.chart.options.symbols);
            /^url/.test(this.symbol) && (a.radius = 0)
        },
        drawLegendSymbol: lb.drawLineMarker,
        setData: function (a, b, c, d) {
            var e = this, f = e.points, g = f && f.length || 0, h, k = e.options, m = e.chart, l = null, u = e.xAxis, w = u && !!u.categories, y = k.turboThreshold, H = this.xData, D = this.yData, n = (h = e.pointArrayMap) && h.length;
            a =
                a || [];
            h = a.length;
            b = z(b, !0);
            if (!1 !== d && h && g === h && !e.cropped && !e.hasGroupedData && e.visible)x(a, function (a, b) {
                f[b].update && f[b].update(a, !1, null, !1)
            }); else {
                e.xIncrement = null;
                e.pointRange = w ? 1 : k.pointRange;
                e.colorCounter = 0;
                x(this.parallelArrays, function (a) {
                    e[a + "Data"].length = 0
                });
                if (y && h > y) {
                    for (c = 0; null === l && c < h;)l = a[c], c++;
                    if (T(l)) {
                        w = z(k.pointStart, 0);
                        l = z(k.pointInterval, 1);
                        for (c = 0; c < h; c++)H[c] = w, D[c] = a[c], w += l;
                        e.xIncrement = w
                    } else if (P(l))if (n)for (c = 0; c < h; c++)l = a[c], H[c] = l[0], D[c] = l.slice(1, n + 1); else for (c =
                                                                                                                                0; c < h; c++)l = a[c], H[c] = l[0], D[c] = l[1]; else Aa(12)
                } else for (c = 0; c < h; c++)a[c] !== G && (l = {series: e}, e.pointClass.prototype.applyOptions.apply(l, [a[c]]), e.updateParallelArrays(l, c), w && t(l.name) && (u.names[l.x] = l.name));
                ia(D[0]) && Aa(14, !0);
                e.data = [];
                e.options.data = a;
                for (c = g; c--;)f[c] && f[c].destroy && f[c].destroy();
                u && (u.minRange = u.userMinRange);
                e.isDirty = e.isDirtyData = m.isDirtyBox = !0;
                c = !1
            }
            "point" === k.legendType && (this.processData(), this.generatePoints());
            b && m.redraw(c)
        },
        processData: function (a) {
            var b = this.xData,
                c = this.yData, d = b.length, e;
            e = 0;
            var f, g, h = this.xAxis, k, m = this.options;
            k = m.cropThreshold;
            var l = this.getExtremesFromAll || m.getExtremesFromAll, u = this.isCartesian, w, y;
            if (u && !this.isDirty && !h.isDirty && !this.yAxis.isDirty && !a)return !1;
            h && (a = h.getExtremes(), w = a.min, y = a.max);
            if (u && this.sorted && !l && (!k || d > k || this.forceCrop))if (b[d - 1] < w || b[0] > y)b = [], c = []; else if (b[0] < w || b[d - 1] > y)e = this.cropData(this.xData, this.yData, w, y), b = e.xData, c = e.yData, e = e.start, f = !0;
            for (k = b.length - 1; 0 <= k; k--)d = b[k] - b[k - 1], 0 < d && (g === G ||
            d < g) ? g = d : 0 > d && this.requireSorting && Aa(15);
            this.cropped = f;
            this.cropStart = e;
            this.processedXData = b;
            this.processedYData = c;
            null === m.pointRange && (this.pointRange = g || 1);
            this.closestPointRange = g
        },
        cropData: function (a, b, c, d) {
            var e = a.length, f = 0, g = e, h = z(this.cropShoulder, 1), k;
            for (k = 0; k < e; k++)if (a[k] >= c) {
                f = I(0, k - h);
                break
            }
            for (; k < e; k++)if (a[k] > d) {
                g = k + h;
                break
            }
            return {xData: a.slice(f, g), yData: b.slice(f, g), start: f, end: g}
        },
        generatePoints: function () {
            var a = this.options.data, b = this.data, c, d = this.processedXData, e = this.processedYData,
                f = this.pointClass, g = d.length, h = this.cropStart || 0, k, m = this.hasGroupedData, l, u = [], w;
            b || m || (b = [], b.length = a.length, b = this.data = b);
            for (w = 0; w < g; w++)k = h + w, m ? u[w] = (new f).init(this, [d[w]].concat(B(e[w]))) : (b[k] ? l = b[k] : a[k] !== G && (b[k] = l = (new f).init(this, a[k], d[w])), u[w] = l), u[w].index = k;
            if (b && (g !== (c = b.length) || m))for (w = 0; w < c; w++)w !== h || m || (w += g), b[w] && (b[w].destroyElements(), b[w].plotX = G);
            this.data = b;
            this.points = u
        },
        getExtremes: function (a) {
            var b = this.yAxis, c = this.processedXData, d, e = [], f = 0;
            d = this.xAxis.getExtremes();
            var g = d.min, h = d.max, k, m, l, u;
            a = a || this.stackedYData || this.processedYData;
            d = a.length;
            for (u = 0; u < d; u++)if (m = c[u], l = a[u], k = null !== l && l !== G && (!b.isLog || l.length || 0 < l), m = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[u + 1] || m) >= g && (c[u - 1] || m) <= h, k && m)if (k = l.length)for (; k--;)null !== l[k] && (e[f++] = l[k]); else e[f++] = l;
            this.dataMin = M(e);
            this.dataMax = fa(e)
        },
        translate: function () {
            this.processedXData || this.processData();
            this.generatePoints();
            for (var a = this.options, b = a.stacking, c = this.xAxis,
                     d = c.categories, e = this.yAxis, f = this.points, g = f.length, h = !!this.modifyValue, k = a.pointPlacement, m = "between" === k || T(k), l = a.threshold, u = a.startFromThreshold ? l : 0, w, y, H, D, n = Number.MAX_VALUE, a = 0; a < g; a++) {
                var v = f[a], q = v.x, p = v.y;
                y = v.low;
                var x = b && e.stacks[(this.negStacks && p < (u ? 0 : l) ? "-" : "") + this.stackKey];
                e.isLog && null !== p && 0 >= p && (v.y = p = null, Aa(10));
                v.plotX = w = S(I(-1E5, c.translate(q, 0, 0, 0, 1, k, "flags" === this.type)), 1E5);
                b && this.visible && x && x[q] && (D = this.getStackIndicator(D, q, this.index), x = x[q], p = x.points[D.key],
                    y = p[0], p = p[1], y === u && (y = z(l, e.min)), e.isLog && 0 >= y && (y = null), v.total = v.stackTotal = x.total, v.percentage = x.total && v.y / x.total * 100, v.stackY = p, x.setOffset(this.pointXOffset || 0, this.barW || 0));
                v.yBottom = t(y) ? e.translate(y, 0, 1, 0, 1) : null;
                h && (p = this.modifyValue(p, v));
                v.plotY = y = "number" === typeof p && Infinity !== p ? S(I(-1E5, e.translate(p, 0, 1, 0, 1)), 1E5) : G;
                v.isInside = y !== G && 0 <= y && y <= e.len && 0 <= w && w <= c.len;
                v.clientX = m ? c.translate(q, 0, 0, 0, 1) : w;
                v.negative = v.y < (l || 0);
                v.category = d && d[v.x] !== G ? d[v.x] : v.x;
                a && (n = S(n, ha(w -
                    H)));
                H = w
            }
            this.closestPointRangePx = n;
            this.getSegments()
        },
        setClip: function (a) {
            var b = this.chart, c = this.options, d = b.renderer, e = b.inverted, f = this.clipBox, g = f || b.clipBox, h = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, g.height, c.xAxis, c.yAxis].join(), k = b[h], m = b[h + "m"];
            k || (a && (g.width = 0, b[h + "m"] = m = d.clipRect(-99, e ? -b.plotLeft : -b.plotTop, 99, e ? b.chartWidth : b.chartHeight)), b[h] = k = d.clipRect(g));
            a && (k.count += 1);
            !1 !== c.clip && (this.group.clip(a || f ? k : b.clipRect), this.markerGroup.clip(m), this.sharedClipKey =
                h);
            a || (--k.count, 0 >= k.count && h && b[h] && (f || (b[h] = b[h].destroy()), b[h + "m"] && (b[h + "m"] = b[h + "m"].destroy())))
        },
        animate: function (a) {
            var b = this.chart, c = this.options.animation, d;
            c && !Y(c) && (c = Z[this.type].animation);
            a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({width: b.plotSizeX}, c), b[d + "m"] && b[d + "m"].animate({width: b.plotSizeX + 99}, c), this.animate = null)
        },
        afterAnimate: function () {
            this.setClip();
            ja(this, "afterAnimate")
        },
        drawPoints: function () {
            var a, b = this.points, c = this.chart, d, e, f, g, h, k, m, l, u =
                this.options.marker, w = this.pointAttr[""], y, n, D, v = this.markerGroup, t = z(u.enabled, this.xAxis.isRadial, this.closestPointRangePx > 2 * u.radius);
            if (!1 !== u.enabled || this._hasPointMarkers)for (f = b.length; f--;)g = b[f], d = ea(g.plotX), e = g.plotY, l = g.graphic, y = g.marker || {}, n = !!g.marker, a = t && y.enabled === G || y.enabled, D = g.isInside, a && e !== G && !isNaN(e) && null !== g.y ? (a = g.pointAttr[g.selected ? "select" : ""] || w, h = a.r, k = z(y.symbol, this.symbol), m = 0 === k.indexOf("url"), l ? l[D ? "show" : "hide"](!0).animate(O({
                x: d - h,
                y: e - h
            }, l.symbolName ?
            {
                width: 2 * h,
                height: 2 * h
            } : {})) : D && (0 < h || m) && (g.graphic = c.renderer.symbol(k, d - h, e - h, 2 * h, 2 * h, n ? y : u).attr(a).add(v))) : l && (g.graphic = l.destroy())
        },
        convertAttribs: function (a, b, c, d) {
            var e = this.pointAttrToOptions, f, g, h = {};
            a = a || {};
            b = b || {};
            c = c || {};
            d = d || {};
            for (f in e)g = e[f], h[f] = z(a[g], b[f], c[f], d[f]);
            return h
        },
        getAttribs: function () {
            var a = this, b = a.options, c = Z[a.type].marker ? b.marker : b, d = c.states, e = d.hover, f, g = a.color, h = a.options.negativeColor;
            f = {stroke: g, fill: g};
            var k = a.points || [], m, l, u = [], w = a.pointAttrToOptions;
            m = a.hasPointSpecificOptions;
            var y = c.lineColor, n = c.fillColor;
            l = b.turboThreshold;
            var D = a.zones, v = a.zoneAxis || "y", q;
            b.marker ? (e.radius = e.radius || c.radius + e.radiusPlus, e.lineWidth = e.lineWidth || c.lineWidth + e.lineWidthPlus) : (e.color = e.color || Oa(e.color || g).brighten(e.brightness).get(), e.negativeColor = e.negativeColor || Oa(e.negativeColor || h).brighten(e.brightness).get());
            u[""] = a.convertAttribs(c, f);
            x(["hover", "select"], function (b) {
                u[b] = a.convertAttribs(d[b], u[""])
            });
            a.pointAttr = u;
            g = k.length;
            if (!l || g < l || m)for (; g--;) {
                l =
                    k[g];
                (c = l.options && l.options.marker || l.options) && !1 === c.enabled && (c.radius = 0);
                if (D.length) {
                    m = 0;
                    for (f = D[m]; l[v] >= f.value;)f = D[++m];
                    l.color = l.fillColor = z(f.color, a.color)
                }
                m = b.colorByPoint || l.color;
                if (l.options)for (q in w)t(c[w[q]]) && (m = !0);
                if (m) {
                    c = c || {};
                    m = [];
                    d = c.states || {};
                    f = d.hover = d.hover || {};
                    if (!b.marker || l.negative && !f.fillColor && !e.fillColor)f[a.pointAttrToOptions.fill] = f.color || !l.options.color && e[l.negative && h ? "negativeColor" : "color"] || Oa(l.color).brighten(f.brightness || e.brightness).get();
                    f =
                    {color: l.color};
                    n || (f.fillColor = l.color);
                    y || (f.lineColor = l.color);
                    c.hasOwnProperty("color") && !c.color && delete c.color;
                    m[""] = a.convertAttribs(O(f, c), u[""]);
                    m.hover = a.convertAttribs(d.hover, u.hover, m[""]);
                    m.select = a.convertAttribs(d.select, u.select, m[""])
                } else m = u;
                l.pointAttr = m
            }
        },
        destroy: function () {
            var a = this, b = a.chart, c = /AppleWebKit\/533/.test(Ta), d, e = a.data || [], f, g, h;
            ja(a, "destroy");
            pa(a);
            x(a.axisTypes || [], function (b) {
                if (h = a[b])q(h.series, a), h.isDirty = h.forceRedraw = !0
            });
            a.legendItem && a.chart.legend.destroyItem(a);
            for (d = e.length; d--;)(f = e[d]) && f.destroy && f.destroy();
            a.points = null;
            clearTimeout(a.animationTimeout);
            for (g in a)a[g] instanceof ka && !a[g].survive && (d = c && "group" === g ? "hide" : "destroy", a[g][d]());
            b.hoverSeries === a && (b.hoverSeries = null);
            q(b.series, a);
            for (g in a)delete a[g]
        },
        getSegmentPath: function (a) {
            var b = this, c = [], d = b.options.step;
            x(a, function (e, f) {
                var g = e.plotX, h = e.plotY, k;
                b.getPointSpline ? c.push.apply(c, b.getPointSpline(a, e, f)) : (c.push(f ? "L" : "M"), d && f && (k = a[f - 1], "right" === d ? c.push(k.plotX, h, "L") : "center" ===
                d ? c.push((k.plotX + g) / 2, k.plotY, "L", (k.plotX + g) / 2, h, "L") : c.push(g, k.plotY, "L")), c.push(e.plotX, e.plotY))
            });
            return c
        },
        getGraphPath: function () {
            var a = this, b = [], c, d = [];
            x(a.segments, function (e) {
                c = a.getSegmentPath(e);
                1 < e.length ? b = b.concat(c) : d.push(e[0])
            });
            a.singlePoints = d;
            return a.graphPath = b
        },
        drawGraph: function () {
            var a = this, b = this.options, c = [["graph", b.lineColor || this.color, b.dashStyle]], d = b.lineWidth, e = "square" !== b.linecap, f = this.getGraphPath(), g = this.fillGraph && this.color || "none";
            x(this.zones, function (d,
                                    e) {
                c.push(["zoneGraph" + e, d.color || a.color, d.dashStyle || b.dashStyle])
            });
            x(c, function (c, k) {
                var m = c[0], l = a[m];
                l ? l.animate({d: f}) : (d || g) && f.length && (l = {
                    stroke: c[1],
                    "stroke-width": d,
                    fill: g,
                    zIndex: 1
                }, c[2] ? l.dashstyle = c[2] : e && (l["stroke-linecap"] = l["stroke-linejoin"] = "round"), a[m] = a.chart.renderer.path(f).attr(l).add(a.group).shadow(2 > k && b.shadow))
            })
        },
        applyZones: function () {
            var a = this, b = this.chart, c = b.renderer, d = this.zones, e, f, g = this.clips || [], h, k = this.graph, m = this.area, l = I(b.chartWidth, b.chartHeight), u =
                this[(this.zoneAxis || "y") + "Axis"], w, y = u.reversed, n = b.inverted, D = u.horiz, v, t, q, p = !1;
            d.length && (k || m) && u.min !== G && (k && k.hide(), m && m.hide(), w = u.getExtremes(), x(d, function (d, x) {
                e = y ? D ? b.plotWidth : 0 : D ? 0 : u.toPixels(w.min);
                e = S(I(z(f, e), 0), l);
                f = S(I(K(u.toPixels(z(d.value, w.max), !0)), 0), l);
                p && (e = f = u.toPixels(w.max));
                v = Math.abs(e - f);
                t = S(e, f);
                q = I(e, f);
                u.isXAxis ? (h = {
                    x: n ? q : t,
                    y: 0,
                    width: v,
                    height: l
                }, D || (h.x = b.plotHeight - h.x)) : (h = {
                    x: 0,
                    y: n ? q : t,
                    width: l,
                    height: v
                }, D && (h.y = b.plotWidth - h.y));
                b.inverted && c.isVML && (h = u.isXAxis ?
                {x: 0, y: y ? t : q, height: h.width, width: b.chartWidth} : {
                    x: h.y - b.plotLeft - b.spacingBox.x,
                    y: 0,
                    width: h.height,
                    height: b.chartHeight
                });
                g[x] ? g[x].animate(h) : (g[x] = c.clipRect(h), k && a["zoneGraph" + x].clip(g[x]), m && a["zoneArea" + x].clip(g[x]));
                p = d.value > w.max
            }), this.clips = g)
        },
        invertGroups: function () {
            function a() {
                var a = {width: b.yAxis.len, height: b.xAxis.len};
                x(["group", "markerGroup"], function (c) {
                    b[c] && b[c].attr(a).invert()
                })
            }

            var b = this, c = b.chart;
            b.xAxis && (X(c, "resize", a), X(b, "destroy", function () {
                pa(c, "resize", a)
            }), a(),
                b.invertGroups = a)
        },
        plotGroup: function (a, b, c, d, e) {
            var f = this[a], g = !f;
            g && (this[a] = f = this.chart.renderer.g(b).attr({
                visibility: c,
                zIndex: d || .1
            }).add(e), f.addClass("highcharts-series-" + this.index));
            f[g ? "attr" : "animate"](this.getPlotBox());
            return f
        },
        getPlotBox: function () {
            var a = this.chart, b = this.xAxis, c = this.yAxis;
            a.inverted && (b = c, c = this.xAxis);
            return {translateX: b ? b.left : a.plotLeft, translateY: c ? c.top : a.plotTop, scaleX: 1, scaleY: 1}
        },
        render: function () {
            var a = this, b = a.chart, c, d = a.options, e = (c = d.animation) && !!a.animate &&
                b.renderer.isSVG && z(c.duration, 500) || 0, f = a.visible ? "visible" : "hidden", g = d.zIndex, h = a.hasRendered, k = b.seriesGroup;
            c = a.plotGroup("group", "series", f, g, k);
            a.markerGroup = a.plotGroup("markerGroup", "markers", f, g, k);
            e && a.animate(!0);
            a.getAttribs();
            c.inverted = a.isCartesian ? b.inverted : !1;
            a.drawGraph && (a.drawGraph(), a.applyZones());
            x(a.points, function (a) {
                a.redraw && a.redraw()
            });
            a.drawDataLabels && a.drawDataLabels();
            a.visible && a.drawPoints();
            a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
            b.inverted &&
            a.invertGroups();
            !1 === d.clip || a.sharedClipKey || h || c.clip(b.clipRect);
            e && a.animate();
            h || (e ? a.animationTimeout = setTimeout(function () {
                a.afterAnimate()
            }, e) : a.afterAnimate());
            a.isDirty = a.isDirtyData = !1;
            a.hasRendered = !0
        },
        redraw: function () {
            var a = this.chart, b = this.isDirtyData, c = this.isDirty, d = this.group, e = this.xAxis, f = this.yAxis;
            d && (a.inverted && d.attr({
                width: a.plotWidth,
                height: a.plotHeight
            }), d.animate({translateX: z(e && e.left, a.plotLeft), translateY: z(f && f.top, a.plotTop)}));
            this.translate();
            this.render();
            b &&
            ja(this, "updatedData");
            (c || b) && delete this.kdTree
        },
        kdDimensions: 1,
        kdAxisArray: ["clientX", "plotY"],
        searchPoint: function (a, b) {
            var c = this.xAxis, d = this.yAxis, e = this.chart.inverted;
            return this.searchKDTree({
                clientX: e ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                plotY: e ? d.len - a.chartX + d.pos : a.chartY - d.pos
            }, b)
        },
        buildKDTree: function () {
            function a(b, d, g) {
                var h, k;
                if (k = b && b.length)return h = c.kdAxisArray[d % g], b.sort(function (a, b) {
                    return a[h] - b[h]
                }), k = Math.floor(k / 2), {
                    point: b[k], left: a(b.slice(0, k), d + 1, g), right: a(b.slice(k +
                        1), d + 1, g)
                }
            }

            function b() {
                var b = jb(c.points || [], function (a) {
                    return null !== a.y
                });
                c.kdTree = a(b, d, d)
            }

            var c = this, d = c.kdDimensions;
            delete c.kdTree;
            c.options.kdSync ? b() : setTimeout(b)
        },
        searchKDTree: function (a, b) {
            function c(a, b, m, l) {
                var u = b.point, w = d.kdAxisArray[m % l], y, n, D = u;
                n = t(a[e]) && t(u[e]) ? Math.pow(a[e] - u[e], 2) : null;
                y = t(a[f]) && t(u[f]) ? Math.pow(a[f] - u[f], 2) : null;
                y = (n || 0) + (y || 0);
                u.dist = t(y) ? Math.sqrt(y) : Number.MAX_VALUE;
                u.distX = t(n) ? Math.sqrt(n) : Number.MAX_VALUE;
                w = a[w] - u[w];
                y = 0 > w ? "left" : "right";
                n = 0 > w ? "right" :
                    "left";
                b[y] && (y = c(a, b[y], m + 1, l), D = y[g] < D[g] ? y : u);
                b[n] && Math.sqrt(w * w) < D[g] && (a = c(a, b[n], m + 1, l), D = a[g] < D[g] ? a : D);
                return D
            }

            var d = this, e = this.kdAxisArray[0], f = this.kdAxisArray[1], g = b ? "distX" : "dist";
            this.kdTree || this.buildKDTree();
            if (this.kdTree)return c(a, this.kdTree, this.kdDimensions, this.kdDimensions)
        }
    };
    Ka.prototype = {
        destroy: function () {
            ba(this, this.axis)
        }, render: function (a) {
            var b = this.options, c = b.format, c = c ? n(c, this) : b.formatter.call(this);
            this.label ? this.label.attr({text: c, visibility: "hidden"}) : this.label =
                this.axis.chart.renderer.text(c, null, null, b.useHTML).css(b.style).attr({
                    align: this.textAlign,
                    rotation: b.rotation,
                    visibility: "hidden"
                }).add(a)
        }, setOffset: function (a, b) {
            var c = this.axis, d = c.chart, e = d.inverted, f = c.reversed, f = this.isNegative && !f || !this.isNegative && f, g = c.translate(c.usePercentage ? 100 : this.total, 0, 0, 0, 1), c = c.translate(0), c = ha(g - c), h = d.xAxis[0].translate(this.x) + a, k = d.plotHeight, f = {
                x: e ? f ? g : g - c : h,
                y: e ? k - h - b : f ? k - g - c : k - g,
                width: e ? c : b,
                height: e ? b : c
            };
            if (e = this.label)e.align(this.alignOptions, null,
                f), f = e.alignAttr, e[!1 === this.options.crop || d.isInsidePlot(f.x, f.y) ? "show" : "hide"](!0)
        }
    };
    Sa.prototype.getStacks = function () {
        var a = this;
        x(a.yAxis, function (a) {
            a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
        });
        x(a.series, function (b) {
            !b.options.stacking || !0 !== b.visible && !1 !== a.options.chart.ignoreHiddenSeries || (b.stackKey = b.type + z(b.options.stack, ""))
        })
    };
    ca.prototype.buildStacks = function () {
        var a = this.series, b = z(this.options.reversedStacks, !0), c = a.length;
        if (!this.isXAxis) {
            for (this.usePercentage = !1; c--;)a[b ?
                c : a.length - c - 1].setStackedPoints();
            if (this.usePercentage)for (c = 0; c < a.length; c++)a[c].setPercentStacks()
        }
    };
    ca.prototype.renderStackTotals = function () {
        var a = this.chart, b = a.renderer, c = this.stacks, d, e, f = this.stackTotalGroup;
        f || (this.stackTotalGroup = f = b.g("stack-labels").attr({visibility: "visible", zIndex: 6}).add());
        f.translate(a.plotLeft, a.plotTop);
        for (d in c)for (e in a = c[d], a)a[e].render(f)
    };
    ca.prototype.resetStacks = function () {
        var a = this.stacks, b, c;
        if (!this.isXAxis)for (b in a)for (c in a[b])a[b][c].touched <
        this.stacksTouched ? (a[b][c].destroy(), delete a[b][c]) : (a[b][c].total = null, a[b][c].cum = 0)
    };
    ca.prototype.cleanStacks = function () {
        var a, b, c;
        if (!this.isXAxis)for (b in this.oldStacks && (a = this.stacks = this.oldStacks), a)for (c in a[b])a[b][c].cum = a[b][c].total
    };
    aa.prototype.setStackedPoints = function () {
        if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
            var a = this.processedXData, b = this.processedYData, c = [], d = b.length, e = this.options, f = e.threshold, g = e.startFromThreshold ?
                f : 0, h = e.stack, e = e.stacking, k = this.stackKey, m = "-" + k, l = this.negStacks, u = this.yAxis, w = u.stacks, y = u.oldStacks, n, D, v, t, q, p, x;
            u.stacksTouched += 1;
            for (q = 0; q < d; q++)p = a[q], x = b[q], n = this.getStackIndicator(n, p, this.index), t = n.key, v = (D = l && x < (g ? 0 : f)) ? m : k, w[v] || (w[v] = {}), w[v][p] || (y[v] && y[v][p] ? (w[v][p] = y[v][p], w[v][p].total = null) : w[v][p] = new Ka(u, u.options.stackLabels, D, p, h)), v = w[v][p], v.points[t] = [z(v.cum, g)], v.touched = u.stacksTouched, "percent" === e ? (D = D ? k : m, l && w[D] && w[D][p] ? (D = w[D][p], v.total = D.total = I(D.total,
                    v.total) + ha(x) || 0) : v.total = xa(v.total + (ha(x) || 0))) : v.total = xa(v.total + (x || 0)), v.cum = z(v.cum, g) + (x || 0), v.points[t].push(v.cum), c[q] = v.cum;
            "percent" === e && (u.usePercentage = !0);
            this.stackedYData = c;
            u.oldStacks = {}
        }
    };
    aa.prototype.setPercentStacks = function () {
        var a = this, b = a.stackKey, c = a.yAxis.stacks, d = a.processedXData, e;
        x([b, "-" + b], function (b) {
            for (var g = d.length, h, k; g--;)if (h = d[g], e = a.getStackIndicator(e, h, a.index), h = (k = c[b] && c[b][h]) && k.points[e.key])k = k.total ? 100 / k.total : 0, h[0] = xa(h[0] * k), h[1] = xa(h[1] * k),
                a.stackedYData[g] = h[1]
        })
    };
    aa.prototype.getStackIndicator = function (a, b, c) {
        t(a) && a.x === b ? a.index++ : a = {x: b, index: 0};
        a.key = [c, b, a.index].join();
        return a
    };
    O(Sa.prototype, {
        addSeries: function (a, b, c) {
            var d, e = this;
            a && (b = z(b, !0), ja(e, "addSeries", {options: a}, function () {
                d = e.initSeries(a);
                e.isDirtyLegend = !0;
                e.linkSeries();
                b && e.redraw(c)
            }));
            return d
        }, addAxis: function (a, b, c, d) {
            var e = b ? "xAxis" : "yAxis", f = this.options;
            new ca(this, r(a, {index: this[e].length, isX: b}));
            f[e] = B(f[e] || {});
            f[e].push(a);
            z(c, !0) && this.redraw(d)
        },
        showLoading: function (a) {
            var b = this, c = b.options, d = b.loadingDiv, e = c.loading, f = function () {
                d && A(d, {
                    left: b.plotLeft + "px",
                    top: b.plotTop + "px",
                    width: b.plotWidth + "px",
                    height: b.plotHeight + "px"
                })
            };
            d || (b.loadingDiv = d = E("div", {className: "highcharts-loading"}, O(e.style, {
                zIndex: 10,
                display: "none"
            }), b.container), b.loadingSpan = E("span", null, e.labelStyle, d), X(b, "redraw", f));
            b.loadingSpan.innerHTML = a || c.lang.loading;
            b.loadingShown || (A(d, {opacity: 0, display: ""}), tb(d, {opacity: e.style.opacity}, {
                duration: e.showDuration ||
                0
            }), b.loadingShown = !0);
            f()
        }, hideLoading: function () {
            var a = this.options, b = this.loadingDiv;
            b && tb(b, {opacity: 0}, {
                duration: a.loading.hideDuration || 100, complete: function () {
                    A(b, {display: "none"})
                }
            });
            this.loadingShown = !1
        }
    });
    O(ya.prototype, {
        update: function (a, b, c, d) {
            function e() {
                f.applyOptions(a);
                null === f.y && h && (f.graphic = h.destroy());
                Y(a) && !P(a) && (f.redraw = function () {
                    h && h.element && a && a.marker && a.marker.symbol && (f.graphic = h.destroy());
                    a && a.dataLabels && f.dataLabel && (f.dataLabel = f.dataLabel.destroy());
                    f.redraw =
                        null
                });
                k = f.index;
                g.updateParallelArrays(f, k);
                u && f.name && (u[f.x] = f.name);
                l.data[k] = f.options;
                g.isDirty = g.isDirtyData = !0;
                !g.fixedBox && g.hasCartesianSeries && (m.isDirtyBox = !0);
                "point" === l.legendType && (m.isDirtyLegend = !0);
                b && m.redraw(c)
            }

            var f = this, g = f.series, h = f.graphic, k, m = g.chart, l = g.options, u = g.xAxis && g.xAxis.names;
            b = z(b, !0);
            !1 === d ? e() : f.firePointEvent("update", {options: a}, e)
        }, remove: function (a, b) {
            this.series.removePoint(Ua(this, this.series.data), a, b)
        }
    });
    O(aa.prototype, {
        addPoint: function (a, b, c, d) {
            var e =
                this, f = e.options, g = e.data, h = e.graph, k = e.area, m = e.chart, l = e.xAxis && e.xAxis.names, u = h && h.shift || 0, w = ["graph", "area"], h = f.data, y, n = e.xData;
            ab(d, m);
            if (c) {
                for (d = e.zones.length; d--;)w.push("zoneGraph" + d, "zoneArea" + d);
                x(w, function (a) {
                    e[a] && (e[a].shift = u + (f.step ? 2 : 1))
                })
            }
            k && (k.isArea = !0);
            b = z(b, !0);
            k = {series: e};
            e.pointClass.prototype.applyOptions.apply(k, [a]);
            w = k.x;
            d = n.length;
            if (e.requireSorting && w < n[d - 1])for (y = !0; d && n[d - 1] > w;)d--;
            e.updateParallelArrays(k, "splice", d, 0, 0);
            e.updateParallelArrays(k, d);
            l && k.name &&
            (l[w] = k.name);
            h.splice(d, 0, a);
            y && (e.data.splice(d, 0, null), e.processData());
            "point" === f.legendType && e.generatePoints();
            c && (g[0] && g[0].remove ? g[0].remove(!1) : (g.shift(), e.updateParallelArrays(k, "shift"), h.shift()));
            e.isDirty = !0;
            e.isDirtyData = !0;
            b && (e.getAttribs(), m.redraw())
        }, removePoint: function (a, b, c) {
            var d = this, e = d.data, f = e[a], g = d.points, h = d.chart, k = function () {
                e.length === g.length && g.splice(a, 1);
                e.splice(a, 1);
                d.options.data.splice(a, 1);
                d.updateParallelArrays(f || {series: d}, "splice", a, 1);
                f && f.destroy();
                d.isDirty = !0;
                d.isDirtyData = !0;
                b && h.redraw()
            };
            ab(c, h);
            b = z(b, !0);
            f ? f.firePointEvent("remove", null, k) : k()
        }, remove: function (a, b) {
            var c = this, d = c.chart;
            a = z(a, !0);
            c.isRemoving || (c.isRemoving = !0, ja(c, "remove", null, function () {
                c.destroy();
                d.isDirtyLegend = d.isDirtyBox = !0;
                d.linkSeries();
                a && d.redraw(b)
            }));
            c.isRemoving = !1
        }, update: function (a, b) {
            var c = this, d = this.chart, e = this.userOptions, f = this.type, g = L[f].prototype, h = ["group", "markerGroup", "dataLabelsGroup"], k;
            if (a.type && a.type !== f || void 0 !== a.zIndex)h.length = 0;
            x(h, function (a) {
                h[a] = c[a];
                delete c[a]
            });
            a = r(e, {animation: !1, index: this.index, pointStart: this.xData[0]}, {data: this.options.data}, a);
            this.remove(!1);
            for (k in g)this[k] = G;
            O(this, L[a.type || f].prototype);
            x(h, function (a) {
                c[a] = h[a]
            });
            this.init(d, a);
            d.linkSeries();
            z(b, !0) && d.redraw(!1)
        }
    });
    O(ca.prototype, {
        update: function (a, b) {
            var c = this.chart;
            a = c.options[this.coll][this.options.index] = r(this.userOptions, a);
            this.destroy(!0);
            this._addedPlotLB = this.chart._labelPanes = G;
            this.init(c, O(a, {events: G}));
            c.isDirtyBox = !0;
            z(b, !0) && c.redraw()
        }, remove: function (a) {
            for (var b = this.chart, c = this.coll, d = this.series, e = d.length; e--;)d[e] && d[e].remove(!1);
            q(b.axes, this);
            q(b[c], this);
            b.options[c].splice(this.options.index, 1);
            x(b[c], function (a, b) {
                a.options.index = b
            });
            this.destroy();
            b.isDirtyBox = !0;
            z(a, !0) && b.redraw()
        }, setTitle: function (a, b) {
            this.update({title: a}, b)
        }, setCategories: function (a, b) {
            this.update({categories: a}, b)
        }
    });
    var mc = R(aa);
    L.line = mc;
    Z.area = r(kb, {softThreshold: !1, threshold: 0});
    var Xb = R(aa, {
        type: "area", getSegments: function () {
            var a =
                this, b = [], c = [], d = [], e = this.xAxis, f = this.yAxis, g = f.stacks[this.stackKey], h = {}, k, m, l = this.points, u = this.options.connectNulls, w, y, n;
            if (this.options.stacking && !this.cropped) {
                for (y = 0; y < l.length; y++)h[l[y].x] = l[y];
                for (n in g)null !== g[n].total && d.push(+n);
                d.sort(function (a, b) {
                    return a - b
                });
                x(d, function (b) {
                    var d = null, l;
                    if (!u || h[b] && null !== h[b].y)if (h[b])c.push(h[b]); else {
                        for (y = a.index; y <= f.series.length; y++)if (w = a.getStackIndicator(null, b, y), l = g[b].points[w.key]) {
                            d = l[1];
                            break
                        }
                        k = e.translate(b);
                        m = f.getThreshold(d);
                        c.push({y: null, plotX: k, clientX: k, plotY: m, yBottom: m, onMouseOver: la})
                    }
                });
                c.length && b.push(c)
            } else aa.prototype.getSegments.call(this), b = this.segments;
            this.segments = b
        }, getSegmentPath: function (a) {
            var b = aa.prototype.getSegmentPath.call(this, a), c = [].concat(b), d, e = this.options;
            d = b.length;
            var f = this.yAxis.getThreshold(e.threshold), g;
            3 === d && c.push("L", b[1], b[2]);
            if (e.stacking && !this.closedStacks)for (d = a.length - 1; 0 <= d; d--)g = z(a[d].yBottom, f), d < a.length - 1 && e.step && c.push(a[d + 1].plotX, g), c.push(a[d].plotX, g);
            else this.closeSegment(c, a, f);
            this.areaPath = this.areaPath.concat(c);
            return b
        }, closeSegment: function (a, b, c) {
            a.push("L", b[b.length - 1].plotX, c, "L", b[0].plotX, c)
        }, drawGraph: function () {
            this.areaPath = [];
            aa.prototype.drawGraph.apply(this);
            var a = this, b = this.areaPath, c = this.options, d = [["area", this.color, c.fillColor]];
            x(this.zones, function (b, f) {
                d.push(["zoneArea" + f, b.color || a.color, b.fillColor || c.fillColor])
            });
            x(d, function (d) {
                var f = d[0], g = a[f];
                g ? g.animate({d: b}) : a[f] = a.chart.renderer.path(b).attr({
                    fill: z(d[2],
                        Oa(d[1]).setOpacity(z(c.fillOpacity, .75)).get()), zIndex: 0
                }).add(a.group)
            })
        }, drawLegendSymbol: lb.drawRectangle
    });
    L.area = Xb;
    Z.spline = r(kb);
    var Yb = R(aa, {
        type: "spline", getPointSpline: function (a, b, c) {
            var d = b.plotX, e = b.plotY, f = a[c - 1], g = a[c + 1], h, k, m, l;
            if (f && g) {
                a = f.plotY;
                m = g.plotX;
                var g = g.plotY, u;
                h = (1.5 * d + f.plotX) / 2.5;
                k = (1.5 * e + a) / 2.5;
                m = (1.5 * d + m) / 2.5;
                l = (1.5 * e + g) / 2.5;
                u = (l - k) * (m - d) / (m - h) + e - l;
                k += u;
                l += u;
                k > a && k > e ? (k = I(a, e), l = 2 * e - k) : k < a && k < e && (k = S(a, e), l = 2 * e - k);
                l > g && l > e ? (l = I(g, e), k = 2 * e - l) : l < g && l < e && (l = S(g, e), k =
                    2 * e - l);
                b.rightContX = m;
                b.rightContY = l
            }
            c ? (b = ["C", f.rightContX || f.plotX, f.rightContY || f.plotY, h || d, k || e, d, e], f.rightContX = f.rightContY = null) : b = ["M", d, e];
            return b
        }
    });
    L.spline = Yb;
    Z.areaspline = r(Z.area);
    var Lb = Xb.prototype, nc = R(Yb, {
        type: "areaspline",
        closedStacks: !0,
        getSegmentPath: Lb.getSegmentPath,
        closeSegment: Lb.closeSegment,
        drawGraph: Lb.drawGraph,
        drawLegendSymbol: lb.drawRectangle
    });
    L.areaspline = nc;
    Z.column = r(kb, {
        borderColor: "#FFFFFF",
        borderRadius: 0,
        groupPadding: .2,
        marker: null,
        pointPadding: .1,
        minPointLength: 0,
        cropThreshold: 50,
        pointRange: null,
        states: {
            hover: {brightness: .1, shadow: !1, halo: !1},
            select: {color: "#C0C0C0", borderColor: "#000000", shadow: !1}
        },
        dataLabels: {align: null, verticalAlign: null, y: null},
        softThreshold: !1,
        startFromThreshold: !0,
        stickyTracking: !1,
        tooltip: {distance: 6},
        threshold: 0
    });
    var Mb = R(aa, {
        type: "column",
        pointAttrToOptions: {stroke: "borderColor", fill: "color", r: "borderRadius"},
        cropShoulder: 0,
        directTouch: !0,
        trackerGroups: ["group", "dataLabelsGroup"],
        negStacks: !0,
        init: function () {
            aa.prototype.init.apply(this,
                arguments);
            var a = this, b = a.chart;
            b.hasRendered && x(b.series, function (b) {
                b.type === a.type && (b.isDirty = !0)
            })
        },
        getColumnMetrics: function () {
            var a = this, b = a.options, c = a.xAxis, d = a.yAxis, e = c.reversed, f, g = {}, h, k = 0;
            !1 === b.grouping ? k = 1 : x(a.chart.series, function (b) {
                var c = b.options, e = b.yAxis;
                b.type === a.type && b.visible && d.len === e.len && d.pos === e.pos && (c.stacking ? (f = b.stackKey, g[f] === G && (g[f] = k++), h = g[f]) : !1 !== c.grouping && (h = k++), b.columnIndex = h)
            });
            var m = S(ha(c.transA) * (c.ordinalSlope || b.pointRange || c.closestPointRange ||
                c.tickInterval || 1), c.len), l = m * b.groupPadding, u = (m - 2 * l) / k, b = S(b.maxPointWidth || c.len, z(b.pointWidth, u * (1 - 2 * b.pointPadding)));
            return a.columnMetrics = {
                width: b,
                offset: (u - b) / 2 + (l + ((e ? k - (a.columnIndex || 0) : a.columnIndex) || 0) * u - m / 2) * (e ? -1 : 1)
            }
        },
        crispCol: function (a, b, c, d) {
            var e = this.chart, f = this.borderWidth, g = -(f % 2 ? .5 : 0), f = f % 2 ? .5 : 1;
            e.inverted && e.renderer.isVML && (f += 1);
            c = Math.round(a + c) + g;
            a = Math.round(a) + g;
            c -= a;
            g = .5 >= ha(b);
            d = Math.round(b + d) + f;
            b = Math.round(b) + f;
            d -= b;
            g && (--b, d += 1);
            return {x: a, y: b, width: c, height: d}
        },
        translate: function () {
            var a = this, b = a.chart, c = a.options, d = a.borderWidth = z(c.borderWidth, 2 > a.closestPointRange * a.xAxis.transA ? 0 : 1), e = a.yAxis, f = a.translatedThreshold = e.getThreshold(c.threshold), g = z(c.minPointLength, 5), h = a.getColumnMetrics(), k = h.width, m = a.barW = I(k, 1 + 2 * d), l = a.pointXOffset = h.offset;
            b.inverted && (f -= .5);
            c.pointPadding && (m = La(m));
            aa.prototype.translate.apply(a);
            x(a.points, function (c) {
                var d = S(z(c.yBottom, f), 9E4), h = 999 + ha(d), h = S(I(-h, c.plotY), e.len + h), n = c.plotX + l, v = m, t = S(h, d), q, p = I(h, d) - t;
                ha(p) <
                g && g && (p = g, q = !e.reversed && !c.negative || e.reversed && c.negative, t = ha(t - f) > g ? d - g : f - (q ? g : 0));
                c.barX = n;
                c.pointWidth = k;
                c.tooltipPos = b.inverted ? [e.len + e.pos - b.plotLeft - h, a.xAxis.len - n - v / 2, p] : [n + v / 2, h + e.pos - b.plotTop, p];
                c.shapeType = "rect";
                c.shapeArgs = a.crispCol(n, t, v, p)
            })
        },
        getSymbol: la,
        drawLegendSymbol: lb.drawRectangle,
        drawGraph: la,
        drawPoints: function () {
            var a = this, b = this.chart, c = a.options, d = b.renderer, e = c.animationLimit || 250, f, g;
            x(a.points, function (h) {
                var k = h.plotY, m = h.graphic;
                k === G || isNaN(k) || null === h.y ?
                m && (h.graphic = m.destroy()) : (f = h.shapeArgs, k = t(a.borderWidth) ? {"stroke-width": a.borderWidth} : {}, g = h.pointAttr[h.selected ? "select" : ""] || a.pointAttr[""], m ? (db(m), m.attr(k)[b.pointCount < e ? "animate" : "attr"](r(f))) : h.graphic = d[h.shapeType](f).attr(k).attr(g).add(h.group || a.group).shadow(c.shadow, null, c.stacking && !c.borderRadius))
            })
        },
        animate: function (a) {
            var b = this.yAxis, c = this.options, d = this.chart.inverted, e = {};
            ua && (a ? (e.scaleY = .001, a = S(b.pos + b.len, I(b.pos, b.toPixels(c.threshold))), d ? e.translateX = a - b.len :
                e.translateY = a, this.group.attr(e)) : (e.scaleY = 1, e[d ? "translateX" : "translateY"] = b.pos, this.group.animate(e, this.options.animation), this.animate = null))
        },
        remove: function () {
            var a = this, b = a.chart;
            b.hasRendered && x(b.series, function (b) {
                b.type === a.type && (b.isDirty = !0)
            });
            aa.prototype.remove.apply(a, arguments)
        }
    });
    L.column = Mb;
    Z.bar = r(Z.column);
    var oc = R(Mb, {type: "bar", inverted: !0});
    L.bar = oc;
    Z.scatter = r(kb, {
        lineWidth: 0, marker: {enabled: !0}, tooltip: {
            headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px;"> {series.name}</span><br/>',
            pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
        }
    });
    var Zb = R(aa, {
        type: "scatter",
        sorted: !1,
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
        takeOrdinalPosition: !1,
        kdDimensions: 2,
        drawGraph: function () {
            this.options.lineWidth && aa.prototype.drawGraph.call(this)
        }
    });
    L.scatter = Zb;
    Z.pie = r(kb, {
        borderColor: "#FFFFFF",
        borderWidth: 1,
        center: [null, null],
        clip: !1,
        colorByPoint: !0,
        dataLabels: {
            distance: 30, enabled: !0, formatter: function () {
                return null === this.y ? void 0 :
                    this.point.name
            }, x: 0
        },
        ignoreHiddenPoint: !0,
        legendType: "point",
        marker: null,
        size: null,
        showInLegend: !1,
        slicedOffset: 10,
        states: {hover: {brightness: .1, shadow: !1}},
        stickyTracking: !1,
        tooltip: {followPointer: !0}
    });
    var Nb = {
        type: "pie",
        isCartesian: !1,
        pointClass: R(ya, {
            init: function () {
                ya.prototype.init.apply(this, arguments);
                var a = this, b;
                a.name = z(a.name, "Slice");
                b = function (b) {
                    a.slice("select" === b.type)
                };
                X(a, "select", b);
                X(a, "unselect", b);
                return a
            }, setVisible: function (a, b) {
                var c = this, d = c.series, e = d.chart, f = d.options.ignoreHiddenPoint;
                b = z(b, f);
                a !== c.visible && (c.visible = c.options.visible = a = a === G ? !c.visible : a, d.options.data[Ua(c, d.data)] = c.options, x(["graphic", "dataLabel", "connector", "shadowGroup"], function (b) {
                    if (c[b])c[b][a ? "show" : "hide"](!0)
                }), c.legendItem && e.legend.colorizeItem(c, a), a || "hover" !== c.state || c.setState(""), f && (d.isDirty = !0), b && e.redraw())
            }, slice: function (a, b, c) {
                var d = this.series;
                ab(c, d.chart);
                z(b, !0);
                this.sliced = this.options.sliced = a = t(a) ? a : !this.sliced;
                d.options.data[Ua(this, d.data)] = this.options;
                a = a ? this.slicedTranslation :
                {translateX: 0, translateY: 0};
                this.graphic.animate(a);
                this.shadowGroup && this.shadowGroup.animate(a)
            }, haloPath: function (a) {
                var b = this.shapeArgs, c = this.series.chart;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.plotLeft + b.x, c.plotTop + b.y, b.r + a, b.r + a, {
                    innerR: this.shapeArgs.r,
                    start: b.start,
                    end: b.end
                })
            }
        }),
        requireSorting: !1,
        directTouch: !0,
        noSharedTooltip: !0,
        trackerGroups: ["group", "dataLabelsGroup"],
        axisTypes: [],
        pointAttrToOptions: {
            stroke: "borderColor", "stroke-width": "borderWidth",
            fill: "color"
        },
        animate: function (a) {
            var b = this, c = b.points, d = b.startAngleRad;
            a || (x(c, function (a) {
                var c = a.graphic, g = a.shapeArgs;
                c && (c.attr({r: a.startR || b.center[3] / 2, start: d, end: d}), c.animate({
                    r: g.r,
                    start: g.start,
                    end: g.end
                }, b.options.animation))
            }), b.animate = null)
        },
        updateTotals: function () {
            var a, b = 0, c = this.points, d = c.length, e, f = this.options.ignoreHiddenPoint;
            for (a = 0; a < d; a++)e = c[a], b += f && !e.visible ? 0 : e.y;
            this.total = b;
            for (a = 0; a < d; a++)e = c[a], e.percentage = 0 < b && (e.visible || !f) ? e.y / b * 100 : 0, e.total = b
        },
        generatePoints: function () {
            aa.prototype.generatePoints.call(this);
            this.updateTotals()
        },
        translate: function (a) {
            this.generatePoints();
            var b = 0, c = this.options, d = c.slicedOffset, e = d + c.borderWidth, f, g, h, k = c.startAngle || 0, m = this.startAngleRad = Na / 180 * (k - 90), k = (this.endAngleRad = Na / 180 * (z(c.endAngle, k + 360) - 90)) - m, l = this.points, u = c.dataLabels.distance, c = c.ignoreHiddenPoint, w, y = l.length, n;
            a || (this.center = a = this.getCenter());
            this.getX = function (b, c) {
                h = na.asin(S((b - a[1]) / (a[2] / 2 + u), 1));
                return a[0] + (c ? -1 : 1) * Ca(h) * (a[2] / 2 + u)
            };
            for (w = 0; w < y; w++) {
                n = l[w];
                f = m + b * k;
                if (!c || n.visible)b += n.percentage /
                    100;
                g = m + b * k;
                n.shapeType = "arc";
                n.shapeArgs = {
                    x: a[0],
                    y: a[1],
                    r: a[2] / 2,
                    innerR: a[3] / 2,
                    start: K(1E3 * f) / 1E3,
                    end: K(1E3 * g) / 1E3
                };
                h = (g + f) / 2;
                h > 1.5 * Na ? h -= 2 * Na : h < -Na / 2 && (h += 2 * Na);
                n.slicedTranslation = {translateX: K(Ca(h) * d), translateY: K(Ma(h) * d)};
                f = Ca(h) * a[2] / 2;
                g = Ma(h) * a[2] / 2;
                n.tooltipPos = [a[0] + .7 * f, a[1] + .7 * g];
                n.half = h < -Na / 2 || h > Na / 2 ? 1 : 0;
                n.angle = h;
                e = S(e, u / 2);
                n.labelPos = [a[0] + f + Ca(h) * u, a[1] + g + Ma(h) * u, a[0] + f + Ca(h) * e, a[1] + g + Ma(h) * e, a[0] + f, a[1] + g, 0 > u ? "center" : n.half ? "right" : "left", h]
            }
        },
        drawGraph: null,
        drawPoints: function () {
            var a =
                this, b = a.chart.renderer, c, d, e = a.options.shadow, f, g, h;
            e && !a.shadowGroup && (a.shadowGroup = b.g("shadow").add(a.group));
            x(a.points, function (k) {
                null !== k.y && (d = k.graphic, g = k.shapeArgs, f = k.shadowGroup, e && !f && (f = k.shadowGroup = b.g("shadow").add(a.shadowGroup)), c = k.sliced ? k.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }, f && f.attr(c), d ? d.setRadialReference(a.center).animate(O(g, c)) : (h = {"stroke-linejoin": "round"}, k.visible || (h.visibility = "hidden"), k.graphic = d = b[k.shapeType](g).setRadialReference(a.center).attr(k.pointAttr[k.selected ?
                    "select" : ""]).attr(h).attr(c).add(a.group).shadow(e, f)))
            })
        },
        searchPoint: la,
        sortByAngle: function (a, b) {
            a.sort(function (a, d) {
                return void 0 !== a.angle && (d.angle - a.angle) * b
            })
        },
        drawLegendSymbol: lb.drawRectangle,
        getCenter: Wb.getCenter,
        getSymbol: la
    }, Nb = R(aa, Nb);
    L.pie = Nb;
    aa.prototype.drawDataLabels = function () {
        var a = this, b = a.options, c = b.cursor, d = b.dataLabels, e = a.points, f, g, h = a.hasRendered || 0, k, m, l = a.chart.renderer;
        if (d.enabled || a._hasPointLabels)a.dlProcessOptions && a.dlProcessOptions(d), m = a.plotGroup("dataLabelsGroup",
            "data-labels", d.defer ? "hidden" : "visible", d.zIndex || 6), z(d.defer, !0) && (m.attr({opacity: +h}), h || X(a, "afterAnimate", function () {
            a.visible && m.show();
            m[b.animation ? "animate" : "attr"]({opacity: 1}, {duration: 200})
        })), g = d, x(e, function (e) {
            var h, y = e.dataLabel, v, D, q = e.connector, p = !0, x, Q = {};
            f = e.dlOptions || e.options && e.options.dataLabels;
            h = z(f && f.enabled, g.enabled);
            if (y && !h)e.dataLabel = y.destroy(); else if (h) {
                d = r(g, f);
                x = d.style;
                h = d.rotation;
                v = e.getLabelConfig();
                k = d.format ? n(d.format, v) : d.formatter.call(v, d);
                x.color =
                    z(d.color, x.color, a.color, "black");
                if (y)t(k) ? (y.attr({text: k}), p = !1) : (e.dataLabel = y = y.destroy(), q && (e.connector = q.destroy())); else if (t(k)) {
                    y = {
                        fill: d.backgroundColor,
                        stroke: d.borderColor,
                        "stroke-width": d.borderWidth,
                        r: d.borderRadius || 0,
                        rotation: h,
                        padding: d.padding,
                        zIndex: 1
                    };
                    "contrast" === x.color && (Q.color = d.inside || 0 > d.distance || b.stacking ? l.getContrast(e.color || a.color) : "#000000");
                    c && (Q.cursor = c);
                    for (D in y)y[D] === G && delete y[D];
                    y = e.dataLabel = l[h ? "text" : "label"](k, 0, -999, d.shape, null, null, d.useHTML).attr(y).css(O(x,
                        Q)).add(m).shadow(d.shadow)
                }
                y && a.alignDataLabel(e, y, d, null, p)
            }
        })
    };
    aa.prototype.alignDataLabel = function (a, b, c, d, e) {
        var f = this.chart, g = f.inverted, h = z(a.plotX, -999), k = z(a.plotY, -999), m = b.getBBox(), l = f.renderer.fontMetrics(c.style.fontSize).b, u = this.visible && (a.series.forceDL || f.isInsidePlot(h, K(k), g) || d && f.isInsidePlot(h, g ? d.x + 1 : d.y + d.height - 1, g));
        u && (d = O({
            x: g ? f.plotWidth - k : h,
            y: K(g ? f.plotHeight - h : k),
            width: 0,
            height: 0
        }, d), O(c, {width: m.width, height: m.height}), c.rotation ? (a = f.renderer.rotCorr(l, c.rotation),
            b[e ? "attr" : "animate"]({
                x: d.x + c.x + d.width / 2 + a.x,
                y: d.y + c.y + d.height / 2
            }).attr({align: c.align})) : (b.align(c, null, d), g = b.alignAttr, "justify" === z(c.overflow, "justify") ? this.justifyDataLabel(b, c, g, m, d, e) : z(c.crop, !0) && (u = f.isInsidePlot(g.x, g.y) && f.isInsidePlot(g.x + m.width, g.y + m.height)), c.shape && b.attr({
            anchorX: a.plotX,
            anchorY: a.plotY
        })));
        u || (db(b), b.attr({y: -999}), b.placed = !1)
    };
    aa.prototype.justifyDataLabel = function (a, b, c, d, e, f) {
        var g = this.chart, h = b.align, k = b.verticalAlign, m, l, u = a.box ? 0 : a.padding || 0;
        m =
            c.x + u;
        0 > m && ("right" === h ? b.align = "left" : b.x = -m, l = !0);
        m = c.x + d.width - u;
        m > g.plotWidth && ("left" === h ? b.align = "right" : b.x = g.plotWidth - m, l = !0);
        m = c.y + u;
        0 > m && ("bottom" === k ? b.verticalAlign = "top" : b.y = -m, l = !0);
        m = c.y + d.height - u;
        m > g.plotHeight && ("top" === k ? b.verticalAlign = "bottom" : b.y = g.plotHeight - m, l = !0);
        l && (a.placed = !f, a.align(b, null, e))
    };
    L.pie && (L.pie.prototype.drawDataLabels = function () {
        var a = this, b = a.data, c, d = a.chart, e = a.options.dataLabels, f = z(e.connectorPadding, 10), g = z(e.connectorWidth, 1), h = d.plotWidth, k = d.plotHeight,
            m, l, u = z(e.softConnector, !0), w = e.distance, y = a.center, n = y[2] / 2, v = y[1], t = 0 < w, q, p, r, Q = [[], []], M, N, A, G, F, B = [0, 0, 0, 0], E = function (a, b) {
                return b.y - a.y
            };
        if (a.visible && (e.enabled || a._hasPointLabels)) {
            aa.prototype.drawDataLabels.apply(a);
            x(b, function (a) {
                a.dataLabel && a.visible && Q[a.half].push(a)
            });
            for (G = 2; G--;) {
                var ba = [], oa = [], R = Q[G], L = R.length, J;
                if (L) {
                    a.sortByAngle(R, G - .5);
                    for (F = b = 0; !b && R[F];)b = R[F] && R[F].dataLabel && (R[F].dataLabel.getBBox().height || 21), F++;
                    if (0 < w) {
                        p = S(v + n + w, d.plotHeight);
                        for (F = I(0, v - n - w); F <=
                        p; F += b)ba.push(F);
                        p = ba.length;
                        if (L > p) {
                            c = [].concat(R);
                            c.sort(E);
                            for (F = L; F--;)c[F].rank = F;
                            for (F = L; F--;)R[F].rank >= p && R.splice(F, 1);
                            L = R.length
                        }
                        for (F = 0; F < L; F++) {
                            c = R[F];
                            r = c.labelPos;
                            c = 9999;
                            var O, C;
                            for (C = 0; C < p; C++)O = ha(ba[C] - r[1]), O < c && (c = O, J = C);
                            if (J < F && null !== ba[F])J = F; else for (p < L - F + J && null !== ba[F] && (J = p - L + F); null === ba[J];)J++;
                            oa.push({i: J, y: ba[J]});
                            ba[J] = null
                        }
                        oa.sort(E)
                    }
                    for (F = 0; F < L; F++) {
                        c = R[F];
                        r = c.labelPos;
                        q = c.dataLabel;
                        A = !1 === c.visible ? "hidden" : "inherit";
                        c = r[1];
                        if (0 < w) {
                            if (p = oa.pop(), J = p.i, N = p.y, c > N &&
                                null !== ba[J + 1] || c < N && null !== ba[J - 1])N = S(I(0, c), d.plotHeight)
                        } else N = c;
                        M = e.justify ? y[0] + (G ? -1 : 1) * (n + w) : a.getX(N === v - n - w || N === v + n + w ? c : N, G);
                        q._attr = {visibility: A, align: r[6]};
                        q._pos = {x: M + e.x + ({left: f, right: -f}[r[6]] || 0), y: N + e.y - 10};
                        q.connX = M;
                        q.connY = N;
                        null === this.options.size && (p = q.width, M - p < f ? B[3] = I(K(p - M + f), B[3]) : M + p > h - f && (B[1] = I(K(M + p - h + f), B[1])), 0 > N - b / 2 ? B[0] = I(K(-N + b / 2), B[0]) : N + b / 2 > k && (B[2] = I(K(N + b / 2 - k), B[2])))
                    }
                }
            }
            if (0 === fa(B) || this.verifyDataLabelOverflow(B))this.placeDataLabels(), t && g && x(this.points,
                function (b) {
                    m = b.connector;
                    r = b.labelPos;
                    (q = b.dataLabel) && q._pos && b.visible ? (A = q._attr.visibility, M = q.connX, N = q.connY, l = u ? ["M", M + ("left" === r[6] ? 5 : -5), N, "C", M, N, 2 * r[2] - r[4], 2 * r[3] - r[5], r[2], r[3], "L", r[4], r[5]] : ["M", M + ("left" === r[6] ? 5 : -5), N, "L", r[2], r[3], "L", r[4], r[5]], m ? (m.animate({d: l}), m.attr("visibility", A)) : b.connector = m = a.chart.renderer.path(l).attr({
                        "stroke-width": g,
                        stroke: e.connectorColor || b.color || "#606060",
                        visibility: A
                    }).add(a.dataLabelsGroup)) : m && (b.connector = m.destroy())
                })
        }
    }, L.pie.prototype.placeDataLabels =
        function () {
            x(this.points, function (a) {
                var b = a.dataLabel;
                b && a.visible && ((a = b._pos) ? (b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({y: -999}))
            })
        }, L.pie.prototype.alignDataLabel = la, L.pie.prototype.verifyDataLabelOverflow = function (a) {
        var b = this.center, c = this.options, d = c.center, e = c.minSize || 80, f = e, g;
        null !== d[0] ? f = I(b[2] - I(a[1], a[3]), e) : (f = I(b[2] - a[1] - a[3], e), b[0] += (a[3] - a[1]) / 2);
        null !== d[1] ? f = I(S(f, b[2] - I(a[0], a[2])), e) : (f = I(S(f, b[2] - a[0] - a[2]), e), b[1] += (a[0] - a[2]) / 2);
        f < b[2] ? (b[2] =
            f, b[3] = Math.min(za(c.innerSize || 0, f), f), this.translate(b), x(this.points, function (a) {
            a.dataLabel && (a.dataLabel._pos = null)
        }), this.drawDataLabels && this.drawDataLabels()) : g = !0;
        return g
    });
    L.column && (L.column.prototype.alignDataLabel = function (a, b, c, d, e) {
        var f = this.chart.inverted, g = a.series, h = a.dlBox || a.shapeArgs, k = z(a.below, a.plotY > z(this.translatedThreshold, g.yAxis.len)), m = z(c.inside, !!this.options.stacking);
        h && (d = r(h), f && (d = {
            x: g.yAxis.len - d.y - d.height,
            y: g.xAxis.len - d.x - d.width,
            width: d.height,
            height: d.width
        }),
        m || (f ? (d.x += k ? 0 : d.width, d.width = 0) : (d.y += k ? d.height : 0, d.height = 0)));
        c.align = z(c.align, !f || m ? "center" : k ? "right" : "left");
        c.verticalAlign = z(c.verticalAlign, f || m ? "middle" : k ? "top" : "bottom");
        aa.prototype.alignDataLabel.call(this, a, b, c, d, e)
    });
    var $a = V.TrackerMixin = {
        drawTrackerPoint: function () {
            var a = this, b = a.chart, c = b.pointer, d = a.options.cursor, e = d && {cursor: d}, f = function (a) {
                for (var c = a.target, d; c && !d;)d = c.point, c = c.parentNode;
                if (d !== G && d !== b.hoverPoint)d.onMouseOver(a)
            };
            x(a.points, function (a) {
                a.graphic &&
                (a.graphic.element.point = a);
                a.dataLabel && (a.dataLabel.element.point = a)
            });
            a._hasTracking || (x(a.trackerGroups, function (b) {
                if (a[b] && (a[b].addClass("highcharts-tracker").on("mouseover", f).on("mouseout", function (a) {
                        c.onTrackerMouseOut(a)
                    }).css(e), cb))a[b].on("touchstart", f)
            }), a._hasTracking = !0)
        }, drawTrackerGraph: function () {
            var a = this, b = a.options, c = b.trackByArea, d = [].concat(c ? a.areaPath : a.graphPath), e = d.length, f = a.chart, g = f.pointer, h = f.renderer, k = f.options.tooltip.snap, m = a.tracker, l = b.cursor, u = l && {cursor: l},
                l = a.singlePoints, w, y = function () {
                    if (f.hoverSeries !== a)a.onMouseOver()
                }, n = "rgba(192,192,192," + (ua ? 1E-4 : .002) + ")";
            if (e && !c)for (w = e + 1; w--;)"M" === d[w] && d.splice(w + 1, 0, d[w + 1] - k, d[w + 2], "L"), (w && "M" === d[w] || w === e) && d.splice(w, 0, "L", d[w - 2] + k, d[w - 1]);
            for (w = 0; w < l.length; w++)e = l[w], d.push("M", e.plotX - k, e.plotY, "L", e.plotX + k, e.plotY);
            m ? m.attr({d: d}) : (a.tracker = h.path(d).attr({
                "stroke-linejoin": "round",
                visibility: a.visible ? "visible" : "hidden",
                stroke: n,
                fill: c ? n : "none",
                "stroke-width": b.lineWidth + (c ? 0 : 2 * k),
                zIndex: 2
            }).add(a.group),
                x([a.tracker, a.markerGroup], function (a) {
                    a.addClass("highcharts-tracker").on("mouseover", y).on("mouseout", function (a) {
                        g.onTrackerMouseOut(a)
                    }).css(u);
                    if (cb)a.on("touchstart", y)
                }))
        }
    };
    L.column && (Mb.prototype.drawTracker = $a.drawTrackerPoint);
    L.pie && (L.pie.prototype.drawTracker = $a.drawTrackerPoint);
    L.scatter && (Zb.prototype.drawTracker = $a.drawTrackerPoint);
    O(vb.prototype, {
        setItemEvents: function (a, b, c, d, e) {
            var f = this;
            (c ? b : a.legendGroup).on("mouseover", function () {
                a.setState("hover");
                b.css(f.options.itemHoverStyle)
            }).on("mouseout",
                function () {
                    b.css(a.visible ? d : e);
                    a.setState()
                }).on("click", function (b) {
                var c = function () {
                    a.setVisible && a.setVisible()
                };
                b = {browserEvent: b};
                a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : ja(a, "legendItemClick", b, c)
            })
        }, createCheckboxForItem: function (a) {
            a.checkbox = E("input", {
                type: "checkbox",
                checked: a.selected,
                defaultChecked: a.selected
            }, this.options.itemCheckboxStyle, this.chart.container);
            X(a.checkbox, "click", function (b) {
                ja(a.series || a, "checkboxClick", {checked: b.target.checked, item: a}, function () {
                    a.select()
                })
            })
        }
    });
    ma.legend.itemStyle.cursor = "pointer";
    O(Sa.prototype, {
        showResetZoom: function () {
            var a = this, b = ma.lang, c = a.options.chart.resetZoomButton, d = c.theme, e = d.states, f = "chart" === c.relativeTo ? null : "plotBox";
            this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function () {
                a.zoomOut()
            }, d, e && e.hover).attr({align: c.position.align, title: b.resetZoomTitle}).add().align(c.position, !1, f)
        }, zoomOut: function () {
            var a = this;
            ja(a, "selection", {resetSelection: !0}, function () {
                a.zoom()
            })
        }, zoom: function (a) {
            var b, c = this.pointer,
                d = !1, e;
            !a || a.resetSelection ? x(this.axes, function (a) {
                b = a.zoom()
            }) : x(a.xAxis.concat(a.yAxis), function (a) {
                var e = a.axis, h = e.isXAxis;
                if (c[h ? "zoomX" : "zoomY"] || c[h ? "pinchX" : "pinchY"])b = e.zoom(a.min, a.max), e.displayBtn && (d = !0)
            });
            e = this.resetZoomButton;
            d && !e ? this.showResetZoom() : !d && Y(e) && (this.resetZoomButton = e.destroy());
            b && this.redraw(z(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
        }, pan: function (a, b) {
            var c = this, d = c.hoverPoints, e;
            d && x(d, function (a) {
                a.setState()
            });
            x("xy" === b ? [1, 0] : [1],
                function (b) {
                    var d = a[b ? "chartX" : "chartY"], h = c[b ? "xAxis" : "yAxis"][0], k = c[b ? "mouseDownX" : "mouseDownY"], m = (h.pointRange || 0) / 2, l = h.getExtremes(), u = h.toValue(k - d, !0) + m, m = h.toValue(k + c[b ? "plotWidth" : "plotHeight"] - d, !0) - m, k = k > d;
                    h.series.length && (k || u > S(l.dataMin, l.min)) && (!k || m < I(l.dataMax, l.max)) && (h.setExtremes(u, m, !1, !1, {trigger: "pan"}), e = !0);
                    c[b ? "mouseDownX" : "mouseDownY"] = d
                });
            e && c.redraw(!1);
            A(c.container, {cursor: "move"})
        }
    });
    O(ya.prototype, {
        select: function (a, b) {
            var c = this, d = c.series, e = d.chart;
            a = z(a, !c.selected);
            c.firePointEvent(a ? "select" : "unselect", {accumulate: b}, function () {
                c.selected = c.options.selected = a;
                d.options.data[Ua(c, d.data)] = c.options;
                c.setState(a && "select");
                b || x(e.getSelectedPoints(), function (a) {
                    a.selected && a !== c && (a.selected = a.options.selected = !1, d.options.data[Ua(a, d.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                })
            })
        }, onMouseOver: function (a, b) {
            var c = this.series, d = c.chart, e = d.tooltip, f = d.hoverPoint;
            if (d.hoverSeries !== c)c.onMouseOver();
            if (f && f !== this)f.onMouseOut();
            this.series &&
            (this.firePointEvent("mouseOver"), !e || e.shared && !c.noSharedTooltip || e.refresh(this, a), this.setState("hover"), b || (d.hoverPoint = this))
        }, onMouseOut: function () {
            var a = this.series.chart, b = a.hoverPoints;
            this.firePointEvent("mouseOut");
            b && -1 !== Ua(this, b) || (this.setState(), a.hoverPoint = null)
        }, importEvents: function () {
            if (!this.hasImportedEvents) {
                var a = r(this.series.options.point, this.options).events, b;
                this.events = a;
                for (b in a)X(this, b, a[b]);
                this.hasImportedEvents = !0
            }
        }, setState: function (a, b) {
            var c = ea(this.plotX),
                d = this.plotY, e = this.series, f = e.options.states, g = Z[e.type].marker && e.options.marker, h = g && !g.enabled, k = g && g.states[a], m = k && !1 === k.enabled, l = e.stateMarkerGraphic, u = this.marker || {}, w = e.chart, y = e.halo, n;
            a = a || "";
            n = this.pointAttr[a] || e.pointAttr[a];
            if (!(a === this.state && !b || this.selected && "select" !== a || f[a] && !1 === f[a].enabled || a && (m || h && !1 === k.enabled) || a && u.states && u.states[a] && !1 === u.states[a].enabled)) {
                if (this.graphic)g = g && this.graphic.symbolName && n.r, this.graphic.attr(r(n, g ? {
                    x: c - g, y: d - g, width: 2 * g, height: 2 *
                    g
                } : {})), l && l.hide(); else {
                    if (a && k)if (g = k.radius, u = u.symbol || e.symbol, l && l.currentSymbol !== u && (l = l.destroy()), l)l[b ? "animate" : "attr"]({
                        x: c - g,
                        y: d - g
                    }); else u && (e.stateMarkerGraphic = l = w.renderer.symbol(u, c - g, d - g, 2 * g, 2 * g).attr(n).add(e.markerGroup), l.currentSymbol = u);
                    l && (l[a && w.isInsidePlot(c, d, w.inverted) ? "show" : "hide"](), l.element.point = this)
                }
                (c = f[a] && f[a].halo) && c.size ? (y || (e.halo = y = w.renderer.path().add(w.seriesGroup)), y.attr(O({fill: Oa(this.color || e.color).setOpacity(c.opacity).get()}, c.attributes))[b ?
                    "animate" : "attr"]({d: this.haloPath(c.size)})) : y && y.attr({d: []});
                this.state = a
            }
        }, haloPath: function (a) {
            var b = this.series, c = b.chart, d = b.getPlotBox(), e = c.inverted;
            return c.renderer.symbols.circle(d.translateX + (e ? b.yAxis.len - this.plotY : this.plotX) - a, d.translateY + (e ? b.xAxis.len - this.plotX : this.plotY) - a, 2 * a, 2 * a)
        }
    });
    O(aa.prototype, {
        onMouseOver: function () {
            var a = this.chart, b = a.hoverSeries;
            if (b && b !== this)b.onMouseOut();
            this.options.events.mouseOver && ja(this, "mouseOver");
            this.setState("hover");
            a.hoverSeries = this
        },
        onMouseOut: function () {
            var a = this.options, b = this.chart, c = b.tooltip, d = b.hoverPoint;
            b.hoverSeries = null;
            if (d)d.onMouseOut();
            this && a.events.mouseOut && ja(this, "mouseOut");
            !c || a.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
            this.setState()
        }, setState: function (a) {
            var b = this.options, c = this.graph, d = b.states, e = b.lineWidth, b = 0;
            a = a || "";
            if (this.state !== a && (this.state = a, !d[a] || !1 !== d[a].enabled) && (a && (e = d[a].lineWidth || e + (d[a].lineWidthPlus || 0)), c && !c.dashstyle))for (a = {"stroke-width": e}, c.attr(a); this["zoneGraph" +
            b];)this["zoneGraph" + b].attr(a), b += 1
        }, setVisible: function (a, b) {
            var c = this, d = c.chart, e = c.legendItem, f, g = d.options.chart.ignoreHiddenSeries, h = c.visible;
            f = (c.visible = a = c.userOptions.visible = a === G ? !h : a) ? "show" : "hide";
            x(["group", "dataLabelsGroup", "markerGroup", "tracker"], function (a) {
                if (c[a])c[a][f]()
            });
            if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c)c.onMouseOut();
            e && d.legend.colorizeItem(c, a);
            c.isDirty = !0;
            c.options.stacking && x(d.series, function (a) {
                a.options.stacking && a.visible && (a.isDirty = !0)
            });
            x(c.linkedSeries, function (b) {
                b.setVisible(a, !1)
            });
            g && (d.isDirtyBox = !0);
            !1 !== b && d.redraw();
            ja(c, f)
        }, show: function () {
            this.setVisible(!0)
        }, hide: function () {
            this.setVisible(!1)
        }, select: function (a) {
            this.selected = a = a === G ? !this.selected : a;
            this.checkbox && (this.checkbox.checked = a);
            ja(this, a ? "select" : "unselect")
        }, drawTracker: $a.drawTrackerGraph
    });
    W(aa.prototype, "init", function (a) {
        var b;
        a.apply(this, Array.prototype.slice.call(arguments, 1));
        (b = this.xAxis) && b.options.ordinal && X(this, "updatedData", function () {
            delete b.ordinalIndex
        })
    });
    W(ca.prototype, "getTimeTicks", function (a, b, c, d, e, f, g, h) {
        var k = 0, m = 0, l, u = {}, w, y, n, v = [], p = -Number.MAX_VALUE, q = this.options.tickPixelInterval;
        if (!this.options.ordinal && !this.options.breaks || !f || 3 > f.length || c === G)return a.call(this, b, c, d, e);
        for (y = f.length; m < y; m++) {
            n = m && f[m - 1] > d;
            f[m] < c && (k = m);
            if (m === y - 1 || f[m + 1] - f[m] > 5 * g || n) {
                if (f[m] > p) {
                    for (l = a.call(this, b, f[k], f[m], e); l.length && l[0] <= p;)l.shift();
                    l.length && (p = l[l.length - 1]);
                    v = v.concat(l)
                }
                k = m + 1
            }
            if (n)break
        }
        a = l.info;
        if (h && a.unitRange <= ga.hour) {
            m = v.length -
                1;
            for (k = 1; k < m; k++)va("%d", v[k]) !== va("%d", v[k - 1]) && (u[v[k]] = "day", w = !0);
            w && (u[v[0]] = "day");
            a.higherRanks = u
        }
        v.info = a;
        if (h && t(q)) {
            h = a = v.length;
            var m = [], x;
            for (w = []; h--;)k = this.translate(v[h]), x && (w[h] = x - k), m[h] = x = k;
            w.sort();
            w = w[ea(w.length / 2)];
            w < .6 * q && (w = null);
            h = v[a - 1] > d ? a - 1 : a;
            for (x = void 0; h--;)k = m[h], d = x - k, x && d < .8 * q && (null === w || d < .8 * w) ? (u[v[h]] && !u[v[h + 1]] ? (d = h + 1, x = k) : d = h, v.splice(d, 1)) : x = k
        }
        return v
    });
    O(ca.prototype, {
        beforeSetTickPositions: function () {
            var a, b = [], c = !1, d, e = this.getExtremes(), f = e.min, g =
                e.max, h, k = this.isXAxis && !!this.options.breaks;
            if ((e = this.options.ordinal) || k) {
                x(this.series, function (c, d) {
                    if (!1 !== c.visible && (!1 !== c.takeOrdinalPosition || k) && (b = b.concat(c.processedXData), a = b.length, b.sort(function (a, b) {
                            return a - b
                        }), a))for (d = a - 1; d--;)b[d] === b[d + 1] && b.splice(d, 1)
                });
                a = b.length;
                if (2 < a) {
                    d = b[1] - b[0];
                    for (h = a - 1; h-- && !c;)b[h + 1] - b[h] !== d && (c = !0);
                    !this.options.keepOrdinalPadding && (b[0] - f > d || g - b[b.length - 1] > d) && (c = !0)
                }
                c ? (this.ordinalPositions = b, d = this.val2lin(I(f, b[0]), !0), h = I(this.val2lin(S(g,
                    b[b.length - 1]), !0), 1), this.ordinalSlope = g = (g - f) / (h - d), this.ordinalOffset = f - d * g) : this.ordinalPositions = this.ordinalSlope = this.ordinalOffset = G
            }
            this.doPostTranslate = e && c || k;
            this.groupIntervalFactor = null
        }, val2lin: function (a, b) {
            var c = this.ordinalPositions;
            if (c) {
                var d = c.length, e, f;
                for (e = d; e--;)if (c[e] === a) {
                    f = e;
                    break
                }
                for (e = d - 1; e--;)if (a > c[e] || 0 === e) {
                    c = (a - c[e]) / (c[e + 1] - c[e]);
                    f = e + c;
                    break
                }
                return b ? f : this.ordinalSlope * (f || 0) + this.ordinalOffset
            }
            return a
        }, lin2val: function (a, b) {
            var c = this.ordinalPositions;
            if (c) {
                var d =
                    this.ordinalSlope, e = this.ordinalOffset, f = c.length - 1, g, h;
                if (b)0 > a ? a = c[0] : a > f ? a = c[f] : (f = ea(a), h = a - f); else for (; f--;)if (g = d * f + e, a >= g) {
                    d = d * (f + 1) + e;
                    h = (a - g) / (d - g);
                    break
                }
                return h !== G && c[f] !== G ? c[f] + (h ? h * (c[f + 1] - c[f]) : 0) : a
            }
            return a
        }, getExtendedPositions: function () {
            var a = this.chart, b = this.series[0].currentDataGrouping, c = this.ordinalIndex, d = b ? b.count + b.unitName : "raw", e = this.getExtremes(), f, g;
            c || (c = this.ordinalIndex = {});
            c[d] || (f = {
                series: [], getExtremes: function () {
                    return {min: e.dataMin, max: e.dataMax}
                }, options: {ordinal: !0},
                val2lin: ca.prototype.val2lin
            }, x(this.series, function (c) {
                g = {xAxis: f, xData: c.xData, chart: a, destroyGroupedData: la};
                g.options = {
                    dataGrouping: b ? {
                        enabled: !0,
                        forced: !0,
                        approximation: "open",
                        units: [[b.unitName, [b.count]]]
                    } : {enabled: !1}
                };
                c.processData.apply(g);
                f.series.push(g)
            }), this.beforeSetTickPositions.apply(f), c[d] = f.ordinalPositions);
            return c[d]
        }, getGroupIntervalFactor: function (a, b, c) {
            var d = 0;
            c = c.processedXData;
            var e = c.length, f = [], g = this.groupIntervalFactor;
            if (!g) {
                for (; d < e - 1; d++)f[d] = c[d + 1] - c[d];
                f.sort(function (a,
                                 b) {
                    return a - b
                });
                d = f[ea(e / 2)];
                a = I(a, c[0]);
                b = S(b, c[e - 1]);
                this.groupIntervalFactor = g = e * d / (b - a)
            }
            return g
        }, postProcessTickInterval: function (a) {
            var b = this.ordinalSlope;
            return b ? this.options.breaks ? this.closestPointRange : a / (b / this.closestPointRange) : a
        }
    });
    W(Sa.prototype, "pan", function (a, b) {
        var c = this.xAxis[0], d = b.chartX, e = !1;
        if (c.options.ordinal && c.series.length) {
            var f = this.mouseDownX, g = c.getExtremes(), h = g.dataMax, k = g.min, m = g.max, l = this.hoverPoints, u = c.closestPointRange, f = (f - d) / (c.translationSlope * (c.ordinalSlope ||
                u)), w = {ordinalPositions: c.getExtendedPositions()}, u = c.lin2val, y = c.val2lin, n;
            w.ordinalPositions ? 1 < ha(f) && (l && x(l, function (a) {
                a.setState()
            }), 0 > f ? (l = w, n = c.ordinalPositions ? c : w) : (l = c.ordinalPositions ? c : w, n = w), w = n.ordinalPositions, h > w[w.length - 1] && w.push(h), this.fixedRange = m - k, f = c.toFixedRange(null, null, u.apply(l, [y.apply(l, [k, !0]) + f, !0]), u.apply(n, [y.apply(n, [m, !0]) + f, !0])), f.min >= S(g.dataMin, k) && f.max <= I(h, m) && c.setExtremes(f.min, f.max, !0, !1, {trigger: "pan"}), this.mouseDownX = d, A(this.container, {cursor: "move"})) :
                e = !0
        } else e = !0;
        e && a.apply(this, Array.prototype.slice.call(arguments, 1))
    });
    W(aa.prototype, "getSegments", function (a) {
        var b, c = this.options.gapSize, d = this.xAxis;
        a.apply(this, Array.prototype.slice.call(arguments, 1));
        c && (b = this.segments, x(b, function (a, f) {
            for (var g = a.length - 1; g--;)if (a[g].x < d.min && a[g + 1].x > d.max) {
                b.length = 0;
                break
            } else a[g + 1].x - a[g].x > d.closestPointRange * c && b.splice(f + 1, 0, a.splice(g + 1, a.length - g))
        }))
    });
    var sa = aa.prototype, $b = Ib.prototype, pc = sa.processData, qc = sa.generatePoints, rc = sa.destroy,
        sc = $b.tooltipFooterHeaderFormatter, tc = {
            approximation: "average", groupPixelWidth: 2, dateTimeLabelFormats: {
                millisecond: ["%A, %b %e, %H:%M:%S.%L", "%A, %b %e, %H:%M:%S.%L", "-%H:%M:%S.%L"],
                second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"],
                minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                month: ["%B %Y", "%B", "-%B %Y"],
                year: ["%Y",
                    "%Y", "-%Y"]
            }
        }, ac = {
            line: {},
            spline: {},
            area: {},
            areaspline: {},
            column: {approximation: "sum", groupPixelWidth: 10},
            arearange: {approximation: "range"},
            areasplinerange: {approximation: "range"},
            columnrange: {approximation: "range", groupPixelWidth: 10},
            candlestick: {approximation: "ohlc", groupPixelWidth: 10},
            ohlc: {approximation: "ohlc", groupPixelWidth: 5}
        }, bc = [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1]], ["week", [1]], ["month",
            [1, 3, 6]], ["year", null]], Xa = {
            sum: function (a) {
                var b = a.length, c;
                if (!b && a.hasNulls)c = null; else if (b)for (c = 0; b--;)c += a[b];
                return c
            }, average: function (a) {
                var b = a.length;
                a = Xa.sum(a);
                "number" === typeof a && b && (a /= b);
                return a
            }, open: function (a) {
                return a.length ? a[0] : a.hasNulls ? null : G
            }, high: function (a) {
                return a.length ? fa(a) : a.hasNulls ? null : G
            }, low: function (a) {
                return a.length ? M(a) : a.hasNulls ? null : G
            }, close: function (a) {
                return a.length ? a[a.length - 1] : a.hasNulls ? null : G
            }, ohlc: function (a, b, c, d) {
                a = Xa.open(a);
                b = Xa.high(b);
                c = Xa.low(c);
                d = Xa.close(d);
                if ("number" === typeof a || "number" === typeof b || "number" === typeof c || "number" === typeof d)return [a, b, c, d]
            }, range: function (a, b) {
                a = Xa.low(a);
                b = Xa.high(b);
                if ("number" === typeof a || "number" === typeof b)return [a, b]
            }
        };
    sa.groupData = function (a, b, c, d) {
        var e = this.data, f = this.options.data, g = [], h = [], k = a.length, m, l, u = !!b, w = [[], [], [], []];
        d = "function" === typeof d ? d : Xa[d];
        var y = this.pointArrayMap, n = y && y.length, v;
        for (v = 0; v <= k && !(a[v] >= c[0]); v++);
        for (; v <= k; v++) {
            for (; (c[1] !== G && a[v] >= c[1] || v === k) &&
                   (m = c.shift(), l = d.apply(0, w), l !== G && (g.push(m), h.push(l)), w[0] = [], w[1] = [], w[2] = [], w[3] = [], v !== k););
            if (v === k)break;
            if (y) {
                m = this.cropStart + v;
                m = e && e[m] || this.pointClass.prototype.applyOptions.apply({series: this}, [f[m]]);
                var p;
                for (l = 0; l < n; l++)p = m[y[l]], "number" === typeof p ? w[l].push(p) : null === p && (w[l].hasNulls = !0)
            } else m = u ? b[v] : null, "number" === typeof m ? w[0].push(m) : null === m && (w[0].hasNulls = !0)
        }
        return [g, h]
    };
    sa.processData = function () {
        var a = this.chart, b = this.options, c = b.dataGrouping, d = !1 !== this.allowDG && c &&
            z(c.enabled, a.options._stock), e;
        this.forceCrop = d;
        this.groupPixelWidth = null;
        this.hasProcessed = !0;
        if (!1 !== pc.apply(this, arguments) && d) {
            this.destroyGroupedData();
            var f = this.processedXData, g = this.processedYData, h = a.plotSizeX, a = this.xAxis, k = a.options.ordinal, m = this.groupPixelWidth = a.getGroupPixelWidth && a.getGroupPixelWidth(), d = this.pointRange;
            if (m) {
                e = !0;
                this.points = null;
                var l = a.getExtremes(), d = l.min, l = l.max, k = k && a.getGroupIntervalFactor(d, l, this) || 1, h = m * (l - d) / h * k, m = a.getTimeTicks(a.normalizeTimeTickInterval(h,
                    c.units || bc), d, l, a.options.startOfWeek, f, this.closestPointRange), g = sa.groupData.apply(this, [f, g, m, c.approximation]), f = g[0], g = g[1];
                if (c.smoothed) {
                    c = f.length - 1;
                    for (f[c] = Math.min(f[c], l); c-- && 0 < c;)f[c] += h / 2;
                    f[0] = Math.max(f[0], d)
                }
                this.currentDataGrouping = m.info;
                null === b.pointRange && (this.pointRange = m.info.totalRange);
                this.closestPointRange = m.info.totalRange;
                t(f[0]) && f[0] < a.dataMin && (a.min === a.dataMin && (a.min = f[0]), a.dataMin = f[0]);
                this.processedXData = f;
                this.processedYData = g
            } else this.currentDataGrouping =
                null, this.pointRange = d;
            this.hasGroupedData = e
        }
    };
    sa.destroyGroupedData = function () {
        var a = this.groupedData;
        x(a || [], function (b, c) {
            b && (a[c] = b.destroy ? b.destroy() : null)
        });
        this.groupedData = null
    };
    sa.generatePoints = function () {
        qc.apply(this);
        this.destroyGroupedData();
        this.groupedData = this.hasGroupedData ? this.points : null
    };
    $b.tooltipFooterHeaderFormatter = function (a, b) {
        var c = a.series, d = c.tooltipOptions, e = c.options.dataGrouping, f = d.xDateFormat, g, h = c.xAxis;
        h && "datetime" === h.options.type && e && T(a.key) ? (c = c.currentDataGrouping,
            e = e.dateTimeLabelFormats, c ? (h = e[c.unitName], 1 === c.count ? f = h[0] : (f = h[1], g = h[2])) : !f && e && (f = this.getXDateFormat(a, d, h)), f = va(f, a.key), g && (f += va(g, a.key + c.totalRange - 1)), d = d[(b ? "footer" : "header") + "Format"].replace("{point.key}", f)) : d = sc.call(this, a, b);
        return d
    };
    sa.destroy = function () {
        for (var a = this.groupedData || [], b = a.length; b--;)a[b] && a[b].destroy();
        rc.apply(this)
    };
    W(sa, "setOptions", function (a, b) {
        var c = a.call(this, b), d = this.type, e = this.chart.options.plotOptions, f = Z[d].dataGrouping;
        ac[d] && (f || (f = r(tc,
            ac[d])), c.dataGrouping = r(f, e.series && e.series.dataGrouping, e[d].dataGrouping, b.dataGrouping));
        this.chart.options._stock && (this.requireSorting = !0);
        return c
    });
    W(ca.prototype, "setScale", function (a) {
        a.call(this);
        x(this.series, function (a) {
            a.hasProcessed = !1
        })
    });
    ca.prototype.getGroupPixelWidth = function () {
        var a = this.series, b = a.length, c, d = 0, e = !1, f;
        for (c = b; c--;)(f = a[c].options.dataGrouping) && (d = I(d, f.groupPixelWidth));
        for (c = b; c--;)(f = a[c].options.dataGrouping) && a[c].hasProcessed && (b = (a[c].processedXData || a[c].data).length,
        a[c].groupPixelWidth || b > this.chart.plotSizeX / d || b && f.forced) && (e = !0);
        return e ? d : 0
    };
    ca.prototype.setDataGrouping = function (a, b) {
        var c;
        b = z(b, !0);
        a || (a = {forced: !1, units: null});
        if (this instanceof ca)for (c = this.series.length; c--;)this.series[c].update({dataGrouping: a}, !1); else x(this.chart.options.series, function (b) {
            b.dataGrouping = a
        }, !1);
        b && this.chart.redraw()
    };
    Z.ohlc = r(Z.column, {
        lineWidth: 1,
        tooltip: {pointFormat: '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>'},
        states: {hover: {lineWidth: 3}},
        threshold: null
    });
    var cc = R(L.column, {
        type: "ohlc",
        pointArrayMap: ["open", "high", "low", "close"],
        toYData: function (a) {
            return [a.open, a.high, a.low, a.close]
        },
        pointValKey: "high",
        pointAttrToOptions: {stroke: "color", "stroke-width": "lineWidth"},
        upColorProp: "stroke",
        getAttribs: function () {
            L.column.prototype.getAttribs.apply(this, arguments);
            var a = this.options, b = a.states, a = a.upColor || this.color, c = r(this.pointAttr), d = this.upColorProp;
            c[""][d] = a;
            c.hover[d] = b.hover.upColor || a;
            c.select[d] =
                b.select.upColor || a;
            x(this.points, function (a) {
                a.open < a.close && !a.options.color && (a.pointAttr = c)
            })
        },
        translate: function () {
            var a = this.yAxis;
            L.column.prototype.translate.apply(this);
            x(this.points, function (b) {
                null !== b.open && (b.plotOpen = a.translate(b.open, 0, 1, 0, 1));
                null !== b.close && (b.plotClose = a.translate(b.close, 0, 1, 0, 1))
            })
        },
        drawPoints: function () {
            var a = this, b = a.chart, c, d, e, f, g, h, k, m;
            x(a.points, function (l) {
                l.plotY !== G && (k = l.graphic, c = l.pointAttr[l.selected ? "selected" : ""] || a.pointAttr[""], f = c["stroke-width"] %
                    2 / 2, m = K(l.plotX) - f, g = K(l.shapeArgs.width / 2), h = ["M", m, K(l.yBottom), "L", m, K(l.plotY)], null !== l.open && (d = K(l.plotOpen) + f, h.push("M", m, d, "L", m - g, d)), null !== l.close && (e = K(l.plotClose) + f, h.push("M", m, e, "L", m + g, e)), k ? k.attr(c).animate({d: h}) : l.graphic = b.renderer.path(h).attr(c).add(a.group))
            })
        },
        animate: null
    });
    L.ohlc = cc;
    Z.candlestick = r(Z.column, {
        lineColor: "black",
        lineWidth: 1,
        states: {hover: {lineWidth: 2}},
        tooltip: Z.ohlc.tooltip,
        threshold: null,
        upColor: "white"
    });
    var uc = R(cc, {
        type: "candlestick", pointAttrToOptions: {
            fill: "color",
            stroke: "lineColor", "stroke-width": "lineWidth"
        }, upColorProp: "fill", getAttribs: function () {
            L.ohlc.prototype.getAttribs.apply(this, arguments);
            var a = this.options, b = a.states, c = a.upLineColor || a.lineColor, d = b.hover.upLineColor || c, e = b.select.upLineColor || c;
            x(this.points, function (a) {
                a.open < a.close && (a.lineColor && (a.pointAttr = r(a.pointAttr), c = a.lineColor), a.pointAttr[""].stroke = c, a.pointAttr.hover.stroke = d, a.pointAttr.select.stroke = e)
            })
        }, drawPoints: function () {
            var a = this, b = a.chart, c, d = a.pointAttr[""], e, f, g, h,
                k, m, l, u, w, y, n;
            x(a.points, function (v) {
                w = v.graphic;
                v.plotY !== G && (c = v.pointAttr[v.selected ? "selected" : ""] || d, l = c["stroke-width"] % 2 / 2, u = K(v.plotX) - l, e = v.plotOpen, f = v.plotClose, g = na.min(e, f), h = na.max(e, f), n = K(v.shapeArgs.width / 2), k = K(g) !== K(v.plotY), m = h !== v.yBottom, g = K(g) + l, h = K(h) + l, y = ["M", u - n, h, "L", u - n, g, "L", u + n, g, "L", u + n, h, "Z", "M", u, g, "L", u, k ? K(v.plotY) : g, "M", u, h, "L", u, m ? K(v.yBottom) : h], w ? w.attr(c).animate({d: y}) : v.graphic = b.renderer.path(y).attr(c).add(a.group).shadow(a.options.shadow))
            })
        }
    });
    L.candlestick =
        uc;
    var wb = Pa.prototype.symbols;
    Z.flags = r(Z.column, {
        fillColor: "white",
        lineWidth: 1,
        pointRange: 0,
        shape: "flag",
        stackDistance: 12,
        states: {hover: {lineColor: "black", fillColor: "#FCFFC5"}},
        style: {fontSize: "11px", fontWeight: "bold", textAlign: "center"},
        tooltip: {pointFormat: "{point.text}<br/>"},
        threshold: null,
        y: -30
    });
    L.flags = R(L.column, {
        type: "flags",
        sorted: !1,
        noSharedTooltip: !0,
        allowDG: !1,
        takeOrdinalPosition: !1,
        trackerGroups: ["markerGroup"],
        forceCrop: !0,
        init: aa.prototype.init,
        pointAttrToOptions: {
            fill: "fillColor",
            stroke: "color", "stroke-width": "lineWidth", r: "radius"
        },
        translate: function () {
            L.column.prototype.translate.apply(this);
            var a = this.chart, b = this.points, c = b.length - 1, d, e, f = this.options.onSeries, f = (d = f && a.get(f)) && d.options.step, g = d && d.points, h = g && g.length, k = this.xAxis, m = k.getExtremes(), l, u, w;
            if (d && d.visible && h)for (d = d.currentDataGrouping, u = g[h - 1].x + (d ? d.totalRange : 0), b.sort(function (a, b) {
                return a.x - b.x
            }); h-- && b[c] && !(d = b[c], l = g[h], l.x <= d.x && l.plotY !== G && (d.x <= u && (d.plotY = l.plotY, l.x < d.x && !f && (w = g[h + 1]) &&
            w.plotY !== G && (d.plotY += (d.x - l.x) / (w.x - l.x) * (w.plotY - l.plotY))), c--, h++, 0 > c)););
            x(b, function (c, d) {
                var f;
                c.plotY === G && (c.x >= m.min && c.x <= m.max ? c.plotY = a.chartHeight - k.bottom - (k.opposite ? k.height : 0) + k.offset - a.plotTop : c.shapeArgs = {});
                (e = b[d - 1]) && e.plotX === c.plotX && (e.stackIndex === G && (e.stackIndex = 0), f = e.stackIndex + 1);
                c.stackIndex = f
            })
        },
        drawPoints: function () {
            var a, b = this.pointAttr[""], c = this.points, d = this.chart.renderer, e, f, g = this.options, h = g.y, k, m, l, u, w, y;
            for (m = c.length; m--;)l = c[m], a = l.plotX > this.xAxis.len,
                e = l.plotX, 0 < e && (e -= z(l.lineWidth, g.lineWidth) % 2), u = l.stackIndex, k = l.options.shape || g.shape, f = l.plotY, f !== G && (f = l.plotY + h - (u !== G && u * g.stackDistance)), w = u ? G : l.plotX, y = u ? G : l.plotY, u = l.graphic, f !== G && 0 <= e && !a ? (a = l.pointAttr[l.selected ? "select" : ""] || b, u ? u.attr({
                x: e,
                y: f,
                r: a.r,
                anchorX: w,
                anchorY: y
            }) : l.graphic = d.label(l.options.title || g.title || "A", e, f, k, w, y, g.useHTML).css(r(g.style, l.style)).attr(a).attr({
                align: "flag" === k ? "left" : "center",
                width: g.width,
                height: g.height
            }).add(this.markerGroup).shadow(g.shadow),
                l.tooltipPos = [e, f]) : u && (l.graphic = u.destroy())
        },
        drawTracker: function () {
            var a = this.points;
            $a.drawTrackerPoint.apply(this);
            x(a, function (b) {
                var c = b.graphic;
                c && X(c.element, "mouseover", function () {
                    0 < b.stackIndex && !b.raised && (b._y = c.y, c.attr({y: b._y - 8}), b.raised = !0);
                    x(a, function (a) {
                        a !== b && a.raised && a.graphic && (a.graphic.attr({y: a._y}), a.raised = !1)
                    })
                })
            })
        },
        animate: la,
        buildKDTree: la,
        setClip: la
    });
    wb.flag = function (a, b, c, d, e) {
        return ["M", e && e.anchorX || a, e && e.anchorY || b, "L", a, b + d, a, b, a + c, b, a + c, b + d, a, b + d, "Z"]
    };
    x(["circle",
        "square"], function (a) {
        wb[a + "pin"] = function (b, c, d, e, f) {
            var g = f && f.anchorX;
            f = f && f.anchorY;
            "circle" === a && e > d && (b -= K((e - d) / 2), d = e);
            b = wb[a](b, c, d, e);
            g && f && b.push("M", g, c > f ? c : c + e, "L", g, f);
            return b
        }
    });
    Pa === V.VMLRenderer && x(["flag", "circlepin", "squarepin"], function (a) {
        VMLRenderer.prototype.symbols[a] = wb[a]
    });
    var Ob = [].concat(bc), xb = function (a) {
        var b = jb(arguments, function (a) {
            return "number" === typeof a
        });
        if (b.length)return Math[a].apply(0, b)
    };
    Ob[4] = ["day", [1, 2, 3, 4]];
    Ob[5] = ["week", [1, 2, 3]];
    O(ma, {
        navigator: {
            handles: {
                backgroundColor: "#ebe7e8",
                borderColor: "#b2b1b6"
            },
            height: 40,
            margin: 25,
            maskFill: "rgba(128,179,236,0.3)",
            maskInside: !0,
            outlineColor: "#b2b1b6",
            outlineWidth: 1,
            series: {
                type: L.areaspline === G ? "line" : "areaspline",
                color: "#4572A7",
                compare: null,
                fillOpacity: .05,
                dataGrouping: {approximation: "average", enabled: !0, groupPixelWidth: 2, smoothed: !0, units: Ob},
                dataLabels: {enabled: !1, zIndex: 2},
                id: "highcharts-navigator-series",
                lineColor: null,
                lineWidth: 1,
                marker: {enabled: !1},
                pointRange: 0,
                shadow: !1,
                threshold: null
            },
            xAxis: {
                tickWidth: 0,
                lineWidth: 0,
                gridLineColor: "#EEE",
                gridLineWidth: 1,
                tickPixelInterval: 200,
                labels: {align: "left", style: {color: "#888"}, x: 3, y: -4},
                crosshair: !1
            },
            yAxis: {
                gridLineWidth: 0,
                startOnTick: !1,
                endOnTick: !1,
                minPadding: .1,
                maxPadding: .1,
                labels: {enabled: !1},
                crosshair: !1,
                title: {text: null},
                tickWidth: 0
            }
        }, scrollbar: {
            height: hb ? 20 : 14,
            barBackgroundColor: "#bfc8d1",
            barBorderRadius: 0,
            barBorderWidth: 1,
            barBorderColor: "#bfc8d1",
            buttonArrowColor: "#666",
            buttonBackgroundColor: "#ebe7e8",
            buttonBorderColor: "#bbb",
            buttonBorderRadius: 0,
            buttonBorderWidth: 1,
            minWidth: 6,
            rifleColor: "#666",
            trackBackgroundColor: "#eeeeee",
            trackBorderColor: "#eeeeee",
            trackBorderWidth: 1,
            liveRedraw: ua && !hb
        }
    });
    wa.prototype = {
        drawHandle: function (a, b) {
            var c = this.chart, d = c.renderer, e = this.elementsToDestroy, f = this.handles, g = this.navigatorOptions.handles, g = {
                fill: g.backgroundColor,
                stroke: g.borderColor,
                "stroke-width": 1
            }, h;
            this.rendered || (f[b] = d.g("navigator-handle-" + ["left", "right"][b]).css({cursor: "ew-resize"}).attr({zIndex: 4 - b}).add(), h = d.rect(-4.5, 0, 9, 16, 0, 1).attr(g).add(f[b]), e.push(h), h = d.path(["M", -1.5, 4, "L",
                -1.5, 12, "M", .5, 4, "L", .5, 12]).attr(g).add(f[b]), e.push(h));
            f[b][c.isResizing ? "animate" : "attr"]({
                translateX: this.scrollerLeft + this.scrollbarHeight + parseInt(a, 10),
                translateY: this.top + this.height / 2 - 8
            })
        }, drawScrollbarButton: function (a) {
            var b = this.chart.renderer, c = this.elementsToDestroy, d = this.scrollbarButtons, e = this.scrollbarHeight, f = this.scrollbarOptions, g;
            this.rendered || (d[a] = b.g().add(this.scrollbarGroup), g = b.rect(-.5, -.5, e + 1, e + 1, f.buttonBorderRadius, f.buttonBorderWidth).attr({
                stroke: f.buttonBorderColor,
                "stroke-width": f.buttonBorderWidth, fill: f.buttonBackgroundColor
            }).add(d[a]), c.push(g), g = b.path(["M", e / 2 + (a ? -1 : 1), e / 2 - 3, "L", e / 2 + (a ? -1 : 1), e / 2 + 3, e / 2 + (a ? 2 : -2), e / 2]).attr({fill: f.buttonArrowColor}).add(d[a]), c.push(g));
            a && d[a].attr({translateX: this.scrollerWidth - e})
        }, render: function (a, b, c, d) {
            var e = this.chart, f = e.renderer, g, h, k, m, l = this.scrollbarGroup, u = this.navigatorGroup, w = this.scrollbar, u = this.xAxis, y = this.scrollbarTrack, n = this.scrollbarHeight, v = this.scrollbarEnabled, p = this.navigatorOptions, q = this.scrollbarOptions,
                x = q.minWidth, r = this.height, Q = this.top, N = this.navigatorEnabled, M = p.outlineWidth, F = M / 2, A = 0, G = this.outlineHeight, B = q.barBorderRadius, fa = q.barBorderWidth, E = Q + F, ba;
            if (t(a) && !isNaN(a)) {
                this.navigatorLeft = g = z(u.left, e.plotLeft + n);
                this.navigatorWidth = h = z(u.len, e.plotWidth - 2 * n);
                this.scrollerLeft = k = g - n;
                this.scrollerWidth = m = m = h + 2 * n;
                u.getExtremes && (ba = this.getUnionExtremes(!0), !ba || ba.dataMin === u.min && ba.dataMax === u.max || u.setExtremes(ba.dataMin, ba.dataMax, !0, !1));
                c = z(c, u.translate(a));
                d = z(d, u.translate(b));
                if (isNaN(c) || Infinity === ha(c))c = 0, d = m;
                if (!(u.translate(d, !0) - u.translate(c, !0) < e.xAxis[0].minRange)) {
                    this.zoomedMax = S(I(c, d, 0), h);
                    this.zoomedMin = I(this.fixedWidth ? this.zoomedMax - this.fixedWidth : S(c, d), 0);
                    this.range = this.zoomedMax - this.zoomedMin;
                    c = K(this.zoomedMax);
                    b = K(this.zoomedMin);
                    a = c - b;
                    this.rendered || (N && (this.navigatorGroup = u = f.g("navigator").attr({zIndex: 3}).add(), this.leftShade = f.rect().attr({fill: p.maskFill}).add(u), p.maskInside ? this.leftShade.css({cursor: "ew-resize "}) : this.rightShade = f.rect().attr({fill: p.maskFill}).add(u),
                        this.outline = f.path().attr({
                            "stroke-width": M,
                            stroke: p.outlineColor
                        }).add(u)), v && (this.scrollbarGroup = l = f.g("scrollbar").add(), w = q.trackBorderWidth, this.scrollbarTrack = y = f.rect().attr({
                        x: 0,
                        y: -w % 2 / 2,
                        fill: q.trackBackgroundColor,
                        stroke: q.trackBorderColor,
                        "stroke-width": w,
                        r: q.trackBorderRadius || 0,
                        height: n
                    }).add(l), this.scrollbar = w = f.rect().attr({
                        y: -fa % 2 / 2,
                        height: n,
                        fill: q.barBackgroundColor,
                        stroke: q.barBorderColor,
                        "stroke-width": fa,
                        r: B
                    }).add(l), this.scrollbarRifles = f.path().attr({stroke: q.rifleColor, "stroke-width": 1}).add(l)));
                    e = e.isResizing ? "animate" : "attr";
                    if (N) {
                        this.leftShade[e](p.maskInside ? {x: g + b, y: Q, width: c - b, height: r} : {
                            x: g,
                            y: Q,
                            width: b,
                            height: r
                        });
                        if (this.rightShade)this.rightShade[e]({x: g + c, y: Q, width: h - c, height: r});
                        this.outline[e]({d: ["M", k, E, "L", g + b - F, E, g + b - F, E + G, "L", g + c - F, E + G, "L", g + c - F, E, k + m, E].concat(p.maskInside ? ["M", g + b + F, E, "L", g + c - F, E] : [])});
                        this.drawHandle(b + F, 0);
                        this.drawHandle(c + F, 1)
                    }
                    v && l && (this.drawScrollbarButton(0), this.drawScrollbarButton(1), l[e]({
                        translateX: k,
                        translateY: K(E + r)
                    }), y[e]({width: m}), g = n +
                        b, h = a - fa, h < x && (A = (x - h) / 2, h = x, g -= A), this.scrollbarPad = A, w[e]({
                        x: ea(g) + fa % 2 / 2,
                        width: h
                    }), x = n + b + a / 2 - .5, this.scrollbarRifles.attr({visibility: 12 < a ? "visible" : "hidden"})[e]({d: ["M", x - 3, n / 4, "L", x - 3, 2 * n / 3, "M", x, n / 4, "L", x, 2 * n / 3, "M", x + 3, n / 4, "L", x + 3, 2 * n / 3]}));
                    this.scrollbarPad = A;
                    this.rendered = !0
                }
            }
        }, addEvents: function () {
            var a = this.chart.container, b = this.mouseDownHandler, c = this.mouseMoveHandler, d = this.mouseUpHandler, e;
            e = [[a, "mousedown", b], [a, "mousemove", c], [document, "mouseup", d]];
            cb && e.push([a, "touchstart", b],
                [a, "touchmove", c], [document, "touchend", d]);
            x(e, function (a) {
                X.apply(null, a)
            });
            this._events = e
        }, removeEvents: function () {
            x(this._events, function (a) {
                pa.apply(null, a)
            });
            this._events = G;
            this.navigatorEnabled && this.baseSeries && pa(this.baseSeries, "updatedData", this.updatedDataHandler)
        }, init: function () {
            var a = this, b = a.chart, c, d, e = a.scrollbarHeight, f = a.navigatorOptions, g = a.height, h = a.top, k, m, l = a.baseSeries;
            a.mouseDownHandler = function (d) {
                d = b.pointer.normalize(d);
                var e = a.zoomedMin, f = a.zoomedMax, h = a.top, l = a.scrollbarHeight,
                    m = a.scrollerLeft, u = a.scrollerWidth, w = a.navigatorLeft, n = a.navigatorWidth, v = a.scrollbarPad, p = a.range, q = d.chartX, t = d.chartY;
                d = b.xAxis[0];
                var x, z = hb ? 10 : 7;
                t > h && t < h + g + l && ((h = !a.scrollbarEnabled || t < h + g) && na.abs(q - e - w) < z ? (a.grabbedLeft = !0, a.otherHandlePos = f, a.fixedExtreme = d.max, b.fixedRange = null) : h && na.abs(q - f - w) < z ? (a.grabbedRight = !0, a.otherHandlePos = e, a.fixedExtreme = d.min, b.fixedRange = null) : q > w + e - v && q < w + f + v ? (a.grabbedCenter = q, a.fixedWidth = p, k = q - e) : q > m && q < m + u && (f = h ? q - w - p / 2 : q < w ? e - .2 * p : q > m + u - l ? e + .2 * p : q < w + e ?
                e - p : f, 0 > f ? f = 0 : f + p >= n && (f = n - p, x = a.getUnionExtremes().dataMax), f !== e && (a.fixedWidth = p, e = c.toFixedRange(f, f + p, null, x), d.setExtremes(e.min, e.max, !0, !1, {trigger: "navigator"}))))
            };
            a.mouseMoveHandler = function (c) {
                var d = a.scrollbarHeight, e = a.navigatorLeft, f = a.navigatorWidth, g = a.scrollerLeft, h = a.scrollerWidth, l = a.range, u;
                0 !== c.pageX && (c = b.pointer.normalize(c), u = c.chartX, u < e ? u = e : u > g + h - d && (u = g + h - d), a.grabbedLeft ? (m = !0, a.render(0, 0, u - e, a.otherHandlePos)) : a.grabbedRight ? (m = !0, a.render(0, 0, a.otherHandlePos, u - e)) :
                a.grabbedCenter && (m = !0, u < k ? u = k : u > f + k - l && (u = f + k - l), a.render(0, 0, u - k, u - k + l)), m && a.scrollbarOptions.liveRedraw && setTimeout(function () {
                    a.mouseUpHandler(c)
                }, 0))
            };
            a.mouseUpHandler = function (d) {
                var e, f;
                m && (a.zoomedMin === a.otherHandlePos ? e = a.fixedExtreme : a.zoomedMax === a.otherHandlePos && (f = a.fixedExtreme), e = c.toFixedRange(a.zoomedMin, a.zoomedMax, e, f), b.xAxis[0].setExtremes(e.min, e.max, !0, !1, {
                    trigger: "navigator",
                    triggerOp: "navigator-drag",
                    DOMEvent: d
                }));
                "mousemove" !== d.type && (a.grabbedLeft = a.grabbedRight = a.grabbedCenter =
                    a.fixedWidth = a.fixedExtreme = a.otherHandlePos = m = k = null)
            };
            var u = b.xAxis.length, w = b.yAxis.length;
            b.extraBottomMargin = a.outlineHeight + f.margin;
            a.navigatorEnabled ? (a.xAxis = c = new ca(b, r({
                breaks: l && l.xAxis.options.breaks,
                ordinal: l && l.xAxis.options.ordinal
            }, f.xAxis, {
                id: "navigator-x-axis",
                isX: !0,
                type: "datetime",
                index: u,
                height: g,
                offset: 0,
                offsetLeft: e,
                offsetRight: -e,
                keepOrdinalPadding: !0,
                startOnTick: !1,
                endOnTick: !1,
                minPadding: 0,
                maxPadding: 0,
                zoomEnabled: !1
            })), a.yAxis = d = new ca(b, r(f.yAxis, {
                id: "navigator-y-axis",
                alignTicks: !1, height: g, offset: 0, index: w, zoomEnabled: !1
            })), l || f.series.data ? a.addBaseSeries() : 0 === b.series.length && W(b, "redraw", function (c, d) {
                0 < b.series.length && !a.series && (a.setBaseSeries(), b.redraw = c);
                c.call(b, d)
            })) : a.xAxis = c = {
                translate: function (a, c) {
                    var d = b.xAxis[0], f = d.getExtremes(), g = b.plotWidth - 2 * e, h = xb("min", d.options.min, f.dataMin), d = xb("max", d.options.max, f.dataMax) - h;
                    return c ? a * d / g + h : g * (a - h) / d
                }, toFixedRange: ca.prototype.toFixedRange
            };
            W(b, "getMargins", function (b) {
                var e = this.legend, f = e.options;
                b.apply(this, [].slice.call(arguments, 1));
                a.top = h = a.navigatorOptions.top || this.chartHeight - a.height - a.scrollbarHeight - this.spacing[2] - ("bottom" === f.verticalAlign && f.enabled && !f.floating ? e.legendHeight + z(f.margin, 10) : 0);
                c && d && (c.options.top = d.options.top = h, c.setAxisSize(), d.setAxisSize())
            });
            a.addEvents()
        }, getUnionExtremes: function (a) {
            var b = this.chart.xAxis[0], c = this.xAxis, d = c.options, e = b.options, f;
            a && null === b.dataMin || (f = {
                dataMin: z(d && d.min, xb("min", e.min, b.dataMin, c.dataMin)), dataMax: z(d && d.max, xb("max",
                    e.max, b.dataMax, c.dataMax))
            });
            return f
        }, setBaseSeries: function (a) {
            var b = this.chart;
            a = a || b.options.navigator.baseSeries;
            this.series && this.series.remove();
            this.baseSeries = b.series[a] || "string" === typeof a && b.get(a) || b.series[0];
            this.xAxis && this.addBaseSeries()
        }, addBaseSeries: function () {
            var a = this.baseSeries, b = a ? a.options : {}, c = b.data, d = this.navigatorOptions.series, e;
            e = d.data;
            this.hasNavigatorData = !!e;
            b = r(b, d, {
                enableMouseTracking: !1,
                group: "nav",
                padXAxis: !1,
                xAxis: "navigator-x-axis",
                yAxis: "navigator-y-axis",
                name: "Navigator",
                showInLegend: !1,
                isInternal: !0,
                visible: !0
            });
            b.data = e || c;
            this.series = this.chart.initSeries(b);
            a && !1 !== this.navigatorOptions.adaptToUpdatedData && (X(a, "updatedData", this.updatedDataHandler), a.userOptions.events = O(a.userOptions.event, {updatedData: this.updatedDataHandler}))
        }, updatedDataHandler: function () {
            var a = this.chart.scroller, b = a.baseSeries, c = b.xAxis, d = c.getExtremes(), e = d.min, f = d.max, g = d.dataMin, d = d.dataMax, h = f - e, k, m, l, u, w, n = a.series;
            k = n.xData;
            var v = !!c.setExtremes;
            m = f >= k[k.length -
                1] - (this.closestPointRange || 0);
            k = e <= g;
            a.hasNavigatorData || (n.options.pointStart = b.xData[0], n.setData(b.options.data, !1), w = !0);
            k && (u = g, l = u + h);
            m && (l = d, k || (u = I(l - h, n.xData[0])));
            v && (k || m) ? isNaN(u) || c.setExtremes(u, l, !0, !1, {trigger: "updatedData"}) : (w && this.chart.redraw(!1), a.render(I(e, g), S(f, d)))
        }, destroy: function () {
            this.removeEvents();
            x([this.xAxis, this.yAxis, this.leftShade, this.rightShade, this.outline, this.scrollbarTrack, this.scrollbarRifles, this.scrollbarGroup, this.scrollbar], function (a) {
                a && a.destroy &&
                a.destroy()
            });
            this.xAxis = this.yAxis = this.leftShade = this.rightShade = this.outline = this.scrollbarTrack = this.scrollbarRifles = this.scrollbarGroup = this.scrollbar = null;
            x([this.scrollbarButtons, this.handles, this.elementsToDestroy], function (a) {
                ba(a)
            })
        }
    };
    V.Scroller = wa;
    W(ca.prototype, "zoom", function (a, b, c) {
        var d = this.chart, e = d.options, f = e.chart.zoomType, g = e.navigator, e = e.rangeSelector, h;
        this.isXAxis && (g && g.enabled || e && e.enabled) && ("x" === f ? d.resetZoomButton = "blocked" : "y" === f ? h = !1 : "xy" === f && (d = this.previousZoom,
            t(b) ? this.previousZoom = [this.min, this.max] : d && (b = d[0], c = d[1], delete this.previousZoom)));
        return h !== G ? h : a.call(this, b, c)
    });
    W(Sa.prototype, "init", function (a, b, c) {
        X(this, "beforeRender", function () {
            var a = this.options;
            if (a.navigator.enabled || a.scrollbar.enabled)this.scroller = new wa(this)
        });
        a.call(this, b, c)
    });
    W(aa.prototype, "addPoint", function (a, b, c, d, e) {
        var f = this.options.turboThreshold;
        f && this.xData.length > f && Y(b) && !P(b) && this.chart.scroller && Aa(20, !0);
        a.call(this, b, c, d, e)
    });
    O(ma, {
        rangeSelector: {
            buttonTheme: {
                width: 28,
                height: 18,
                fill: "#f7f7f7",
                padding: 2,
                r: 0,
                "stroke-width": 0,
                style: {color: "#444", cursor: "pointer", fontWeight: "normal"},
                zIndex: 7,
                states: {
                    hover: {fill: "#e7e7e7"},
                    select: {fill: "#e7f0f9", style: {color: "black", fontWeight: "bold"}}
                }
            }, height: 35, inputPosition: {align: "right"}, labelStyle: {color: "#666"}
        }
    });
    ma.lang = r(ma.lang, {rangeSelectorZoom: "Zoom", rangeSelectorFrom: "From", rangeSelectorTo: "To"});
    Ra.prototype = {
        clickButton: function (a, b) {
            var c = this, d = c.selected, e = c.chart, f = c.buttons, g = c.buttonOptions[a], h = e.xAxis[0],
                k = e.scroller && e.scroller.getUnionExtremes() || h || {}, m = k.dataMin, l = k.dataMax, u, w = h && K(S(h.max, z(l, h.max))), n = g.type, v, k = g._range, p, q, t, r = g.dataGrouping;
            if (null !== m && null !== l && a !== c.selected) {
                e.fixedRange = k;
                r && (this.forcedDataGrouping = !0, ca.prototype.setDataGrouping.call(h || {chart: this.chart}, r, !1));
                if ("month" === n || "year" === n)h ? (n = {
                    range: g,
                    max: w,
                    dataMin: m,
                    dataMax: l
                }, u = h.minFromRange.call(n), "number" === typeof n.newMax && (w = n.newMax)) : k = g; else if (k)u = I(w - k, m), w = S(u + k, l); else if ("ytd" === n)if (h)l === G && (m =
                    Number.MAX_VALUE, l = Number.MIN_VALUE, x(e.series, function (a) {
                    a = a.xData;
                    m = S(a[0], m);
                    l = I(a[a.length - 1], l)
                }), b = !1), w = new ta(l), u = w.getFullYear(), u = p = I(m || 0, ta.UTC(u, 0, 1)), w = w.getTime(), w = S(l || w, w); else {
                    X(e, "beforeRender", function () {
                        c.clickButton(a)
                    });
                    return
                } else"all" === n && h && (u = m, w = l);
                f[d] && f[d].setState(0);
                f[a] && f[a].setState(2);
                h ? (h.setExtremes(u, w, z(b, 1), 0, {
                    trigger: "rangeSelectorButton",
                    rangeSelectorButton: g
                }), c.setSelected(a)) : (v = e.options.xAxis[0], t = v.range, v.range = k, q = v.min, v.min = p, c.setSelected(a),
                    X(e, "load", function () {
                        v.range = t;
                        v.min = q
                    }))
            }
        },
        setSelected: function (a) {
            this.selected = this.options.selected = a
        },
        defaultButtons: [{type: "month", count: 1, text: "1m"}, {type: "month", count: 3, text: "3m"}, {
            type: "month",
            count: 6,
            text: "6m"
        }, {type: "ytd", text: "YTD"}, {type: "year", count: 1, text: "1y"}, {type: "all", text: "All"}],
        init: function (a) {
            var b = this, c = a.options.rangeSelector, d = c.buttons || [].concat(b.defaultButtons), e = c.selected, f = b.blurInputs = function () {
                var a = b.minInput, c = b.maxInput;
                a && a.blur && ja(a, "blur");
                c && c.blur &&
                ja(c, "blur")
            };
            b.chart = a;
            b.options = c;
            b.buttons = [];
            a.extraTopMargin = c.height;
            b.buttonOptions = d;
            X(a.container, "mousedown", f);
            X(a, "resize", f);
            x(d, b.computeButtonRange);
            e !== G && d[e] && this.clickButton(e, !1);
            X(a, "load", function () {
                X(a.xAxis[0], "setExtremes", function (c) {
                    this.max - this.min !== a.fixedRange && "rangeSelectorButton" !== c.trigger && "updatedData" !== c.trigger && b.forcedDataGrouping && this.setDataGrouping(!1, !1)
                });
                X(a.xAxis[0], "afterSetExtremes", function () {
                    b.updateButtonStates(!0)
                })
            })
        },
        updateButtonStates: function (a) {
            var b =
                this, c = this.chart, d = c.xAxis[0], e = c.scroller && c.scroller.getUnionExtremes() || d, f = e.dataMin, g = e.dataMax, h = b.selected, k = b.options.allButtonsEnabled, m = b.buttons;
            a && c.fixedRange !== K(d.max - d.min) && (m[h] && m[h].setState(0), b.setSelected(null));
            x(b.buttonOptions, function (a, e) {
                var w = K(d.max - d.min), n = a._range, v = a.type, p = a.count || 1, q = n > g - f, t = n < d.minRange, x = "all" === a.type && d.max - d.min >= g - f && 2 !== m[e].state, z = "ytd" === a.type && va("%Y", f) === va("%Y", g), r = c.renderer.forExport && e === h, n = n === w;
                ("month" === v || "year" === v) &&
                w >= 864E5 * {month: 28, year: 365}[v] * p && w <= 864E5 * {month: 31, year: 366}[v] * p && (n = !0);
                r || n && e !== h ? (b.setSelected(e), m[e].setState(2)) : !k && (q || t || x || z) ? m[e].setState(3) : 3 === m[e].state && m[e].setState(0)
            })
        },
        computeButtonRange: function (a) {
            var b = a.type, c = a.count || 1, d = {
                millisecond: 1,
                second: 1E3,
                minute: 6E4,
                hour: 36E5,
                day: 864E5,
                week: 6048E5
            };
            if (d[b])a._range = d[b] * c; else if ("month" === b || "year" === b)a._range = 864E5 * {
                    month: 30,
                    year: 365
                }[b] * c
        },
        setInputValue: function (a, b) {
            var c = this.chart.options.rangeSelector;
            t(b) && (this[a +
            "Input"].HCTime = b);
            this[a + "Input"].value = va(c.inputEditDateFormat || "%Y-%m-%d", this[a + "Input"].HCTime);
            this[a + "DateBox"].attr({text: va(c.inputDateFormat || "%b %e, %Y", this[a + "Input"].HCTime)})
        },
        showInput: function (a) {
            var b = this.inputGroup, c = this[a + "DateBox"];
            A(this[a + "Input"], {
                left: b.translateX + c.x + "px",
                top: b.translateY + "px",
                width: c.width - 2 + "px",
                height: c.height - 2 + "px",
                border: "2px solid silver"
            })
        },
        hideInput: function (a) {
            A(this[a + "Input"], {border: 0, width: "1px", height: "1px"});
            this.setInputValue(a)
        },
        drawInput: function (a) {
            var b =
                this, c = b.chart, d = c.renderer.style, e = c.renderer, f = c.options.rangeSelector, g = b.div, h = "min" === a, k, m, l = this.inputGroup;
            this[a + "Label"] = m = e.label(ma.lang[h ? "rangeSelectorFrom" : "rangeSelectorTo"], this.inputGroup.offset).attr({padding: 2}).css(r(d, f.labelStyle)).add(l);
            l.offset += m.width + 5;
            this[a + "DateBox"] = e = e.label("", l.offset).attr({
                padding: 2,
                width: f.inputBoxWidth || 90,
                height: f.inputBoxHeight || 17,
                stroke: f.inputBoxBorderColor || "silver",
                "stroke-width": 1
            }).css(r({textAlign: "center", color: "#444"}, d, f.inputStyle)).on("click",
                function () {
                    b.showInput(a);
                    b[a + "Input"].focus()
                }).add(l);
            l.offset += e.width + (h ? 10 : 0);
            this[a + "Input"] = k = E("input", {
                name: a,
                className: "highcharts-range-selector",
                type: "text"
            }, O({
                position: "absolute",
                border: 0,
                width: "1px",
                height: "1px",
                padding: 0,
                textAlign: "center",
                fontSize: d.fontSize,
                fontFamily: d.fontFamily,
                top: c.plotTop + "px"
            }, f.inputStyle), g);
            k.onfocus = function () {
                b.showInput(a)
            };
            k.onblur = function () {
                b.hideInput(a)
            };
            k.onchange = function () {
                var a = k.value, d = (f.inputDateParser || ta.parse)(a), e = c.xAxis[0], g = e.dataMin,
                    l = e.dataMax;
                isNaN(d) && (d = a.split("-"), d = ta.UTC(C(d[0]), C(d[1]) - 1, C(d[2])));
                isNaN(d) || (ma.global.useUTC || (d += 6E4 * (new ta).getTimezoneOffset()), h ? d > b.maxInput.HCTime ? d = G : d < g && (d = g) : d < b.minInput.HCTime ? d = G : d > l && (d = l), d !== G && c.xAxis[0].setExtremes(h ? d : e.min, h ? e.max : d, G, G, {trigger: "rangeSelectorInput"}))
            }
        },
        getPosition: function () {
            var a = this.chart, b = a.options.rangeSelector, a = z((b.buttonPosition || {}).y, a.plotTop - a.axisOffset[0] - b.height);
            return {buttonTop: a, inputTop: a - 10}
        },
        render: function (a, b) {
            var c = this,
                d = c.chart, e = d.renderer, f = d.container, g = d.options, h = g.exporting && g.navigation && g.navigation.buttonOptions, k = g.rangeSelector, m = c.buttons, g = ma.lang, l = c.div, l = c.inputGroup, u = k.buttonTheme, n = k.buttonPosition || {}, v = k.inputEnabled, p = u && u.states, q = d.plotLeft, r, Q = this.getPosition(), N = c.group, M = c.rendered;
            M || (c.group = N = e.g("range-selector-buttons").add(), c.zoomText = e.text(g.rangeSelectorZoom, z(n.x, q), 15).css(k.labelStyle).add(N), r = z(n.x, q) + c.zoomText.getBBox().width + 5, x(c.buttonOptions, function (a, b) {
                m[b] = e.button(a.text,
                    r, 0, function () {
                        c.clickButton(b);
                        c.isActive = !0
                    }, u, p && p.hover, p && p.select, p && p.disabled).css({textAlign: "center"}).add(N);
                r += m[b].width + z(k.buttonSpacing, 5);
                c.selected === b && m[b].setState(2)
            }), c.updateButtonStates(), !1 !== v && (c.div = l = E("div", null, {
                position: "relative",
                height: 0,
                zIndex: 1
            }), f.parentNode.insertBefore(l, f), c.inputGroup = l = e.g("input-group").add(), l.offset = 0, c.drawInput("min"), c.drawInput("max")));
            N[M ? "animate" : "attr"]({translateY: Q.buttonTop});
            !1 !== v && (l.align(O({
                y: Q.inputTop, width: l.offset,
                x: h && Q.inputTop < (h.y || 0) + h.height - d.spacing[0] ? -40 : 0
            }, k.inputPosition), !0, d.spacingBox), t(v) || (d = N.getBBox(), l[l.translateX < d.x + d.width + 10 ? "hide" : "show"]()), c.setInputValue("min", a), c.setInputValue("max", b));
            c.rendered = !0
        },
        destroy: function () {
            var a = this.minInput, b = this.maxInput, c = this.chart, d = this.blurInputs, e;
            pa(c.container, "mousedown", d);
            pa(c, "resize", d);
            ba(this.buttons);
            a && (a.onfocus = a.onblur = a.onchange = null);
            b && (b.onfocus = b.onblur = b.onchange = null);
            for (e in this)this[e] && "chart" !== e && (this[e].destroy ?
                this[e].destroy() : this[e].nodeType && Ja(this[e])), this[e] = null
        }
    };
    ca.prototype.toFixedRange = function (a, b, c, d) {
        var e = this.chart && this.chart.fixedRange;
        a = z(c, this.translate(a, !0));
        b = z(d, this.translate(b, !0));
        c = e && (b - a) / e;
        .7 < c && 1.3 > c && (d ? a = b - e : b = a + e);
        return {min: a, max: b}
    };
    ca.prototype.minFromRange = function () {
        var a = this.range, b = {month: "Month", year: "FullYear"}[a.type], c, d = this.max, e, f, g = function (a, c) {
            var d = new ta(a);
            d["set" + b](d["get" + b]() + c);
            return d.getTime() - a
        };
        "number" === typeof a ? (c = this.max - a, f = a) : c =
            d + g(d, -a.count);
        e = z(this.dataMin, Number.MIN_VALUE);
        isNaN(c) && (c = e);
        c <= e && (c = e, void 0 === f && (f = g(c, a.count)), this.newMax = S(c + f, this.dataMax));
        isNaN(d) && (c = void 0);
        return c
    };
    W(Sa.prototype, "init", function (a, b, c) {
        X(this, "init", function () {
            this.options.rangeSelector.enabled && (this.rangeSelector = new Ra(this))
        });
        a.call(this, b, c)
    });
    V.RangeSelector = Ra;
    Sa.prototype.callbacks.push(function (a) {
        function b() {
            f = a.xAxis[0].getExtremes();
            g.render(f.min, f.max)
        }

        function c() {
            f = a.xAxis[0].getExtremes();
            isNaN(f.min) || h.render(f.min,
                f.max)
        }

        function d(a) {
            "navigator-drag" !== a.triggerOp && g.render(a.min, a.max)
        }

        function e(a) {
            h.render(a.min, a.max)
        }

        var f, g = a.scroller, h = a.rangeSelector;
        g && (X(a.xAxis[0], "afterSetExtremes", d), W(a, "drawChartBox", function (a) {
            var c = this.isDirtyBox;
            a.call(this);
            c && b()
        }), b());
        h && (X(a.xAxis[0], "afterSetExtremes", e), X(a, "resize", c), c());
        X(a, "destroy", function () {
            g && pa(a.xAxis[0], "afterSetExtremes", d);
            h && (pa(a, "resize", c), pa(a.xAxis[0], "afterSetExtremes", e))
        })
    });
    V.StockChart = function (a, b) {
        var c = a.series, d, e = z(a.navigator &&
            a.navigator.enabled, !0) ? {startOnTick: !1, endOnTick: !1} : null, f = {
            marker: {
                enabled: !1,
                radius: 2
            }
        }, g = {shadow: !1, borderWidth: 0};
        a.xAxis = Ga(B(a.xAxis || {}), function (a) {
            return r({
                minPadding: 0,
                maxPadding: 0,
                ordinal: !0,
                title: {text: null},
                labels: {overflow: "justify"},
                showLastLabel: !0
            }, a, {type: "datetime", categories: null}, e)
        });
        a.yAxis = Ga(B(a.yAxis || {}), function (a) {
            d = z(a.opposite, !0);
            return r({labels: {y: -2}, opposite: d, showLastLabel: !1, title: {text: null}}, a)
        });
        a.series = null;
        a = r({
            chart: {panning: !0, pinchType: "x"},
            navigator: {enabled: !0},
            scrollbar: {enabled: !0},
            rangeSelector: {enabled: !0},
            title: {text: null, style: {fontSize: "16px"}},
            tooltip: {shared: !0, crosshairs: !0},
            legend: {enabled: !1},
            plotOptions: {
                line: f,
                spline: f,
                area: f,
                areaspline: f,
                arearange: f,
                areasplinerange: f,
                column: g,
                columnrange: g,
                candlestick: g,
                ohlc: g
            }
        }, a, {_stock: !0, chart: {inverted: !1}});
        a.series = c;
        return new Sa(a, b)
    };
    W(Wa.prototype, "init", function (a, b, c) {
        var d = c.chart.pinchType || "";
        a.call(this, b, c);
        this.pinchX = this.pinchHor = -1 !== d.indexOf("x");
        this.pinchY = this.pinchVert = -1 !== d.indexOf("y");
        this.hasZoom = this.hasZoom || this.pinchHor || this.pinchVert
    });
    W(ca.prototype, "autoLabelAlign", function (a) {
        var b = this.chart, c = this.options, b = b._labelPanes = b._labelPanes || {}, d = this.options.labels;
        return this.chart.options._stock && "yAxis" === this.coll && (c = c.top + "," + c.height, !b[c] && d.enabled) ? (15 === d.x && (d.x = 0), void 0 === d.align && (d.align = "right"), b[c] = 1, "right") : a.call(this, [].slice.call(arguments, 1))
    });
    W(ca.prototype, "getPlotLinePath", function (a, b, c, d, e, f) {
        var g = this, h = this.isLinked && !this.series ? this.linkedParent.series :
            this.series, k = g.chart, m = k.renderer, l = g.left, u = g.top, n, v, p, q, r = [], Q = [], N;
        if ("colorAxis" === g.coll)return a.apply(this, [].slice.call(arguments, 1));
        Q = g.isXAxis ? t(g.options.yAxis) ? [k.yAxis[g.options.yAxis]] : Ga(h, function (a) {
            return a.yAxis
        }) : t(g.options.xAxis) ? [k.xAxis[g.options.xAxis]] : Ga(h, function (a) {
            return a.xAxis
        });
        x(g.isXAxis ? k.yAxis : k.xAxis, function (a) {
            if (t(a.options.id) ? -1 === a.options.id.indexOf("navigator") : 1) {
                var b = a.isXAxis ? "yAxis" : "xAxis", b = t(a.options[b]) ? k[b][a.options[b]] : k[b][0];
                g === b &&
                Q.push(a)
            }
        });
        N = Q.length ? [] : [g.isXAxis ? k.yAxis[0] : k.xAxis[0]];
        x(Q, function (a) {
            -1 === Ua(a, N) && N.push(a)
        });
        f = z(f, g.translate(b, null, null, d));
        isNaN(f) || (g.horiz ? x(N, function (a) {
            var b;
            v = a.pos;
            q = v + a.len;
            n = p = K(f + g.transB);
            if (n < l || n > l + g.width)e ? n = p = S(I(l, n), l + g.width) : b = !0;
            b || r.push("M", n, v, "L", p, q)
        }) : x(N, function (a) {
            var b;
            n = a.pos;
            p = n + a.len;
            v = q = K(u + g.height - f);
            if (v < u || v > u + g.height)e ? v = q = S(I(u, v), g.top + g.height) : b = !0;
            b || r.push("M", n, v, "L", p, q)
        }));
        return 0 < r.length ? m.crispPolyLine(r, c || 1) : null
    });
    ca.prototype.getPlotBandPath =
        function (a, b) {
            var c = this.getPlotLinePath(b, null, null, !0), d = this.getPlotLinePath(a, null, null, !0), e = [], f;
            if (d && c && d.toString() !== c.toString())for (f = 0; f < d.length; f += 6)e.push("M", d[f + 1], d[f + 2], "L", d[f + 4], d[f + 5], c[f + 4], c[f + 5], c[f + 1], c[f + 2]); else e = null;
            return e
        };
    Pa.prototype.crispPolyLine = function (a, b) {
        var c;
        for (c = 0; c < a.length; c += 6)a[c + 1] === a[c + 4] && (a[c + 1] = a[c + 4] = K(a[c + 1]) - b % 2 / 2), a[c + 2] === a[c + 5] && (a[c + 2] = a[c + 5] = K(a[c + 2]) + b % 2 / 2);
        return a
    };
    Pa === V.VMLRenderer && (VMLRenderer.prototype.crispPolyLine = Pa.prototype.crispPolyLine);
    W(ca.prototype, "hideCrosshair", function (a, b) {
        a.call(this, b);
        t(this.crossLabelArray) && (t(b) ? this.crossLabelArray[b] && this.crossLabelArray[b].hide() : x(this.crossLabelArray, function (a) {
            a.hide()
        }))
    });
    W(ca.prototype, "drawCrosshair", function (a, b, c) {
        var d, e;
        a.call(this, b, c);
        if (t(this.crosshair.label) && this.crosshair.label.enabled && t(c)) {
            e = this.chart;
            var f = this.options.crosshair.label, g = this.isXAxis ? "x" : "y";
            d = this.horiz;
            var h = this.opposite, k = this.left, m = this.top;
            a = this.crossLabel;
            var l, u = f.format, v = "";
            a ||
            (a = this.crossLabel = e.renderer.label().attr({
                align: f.align || (d ? "center" : h ? "right" === this.labelAlign ? "right" : "left" : "left" === this.labelAlign ? "left" : "center"),
                zIndex: 12,
                height: d ? 16 : G,
                fill: f.backgroundColor || this.series[0] && this.series[0].color || "gray",
                padding: z(f.padding, 2),
                stroke: f.borderColor || null,
                "stroke-width": f.borderWidth || 0
            }).css(O({color: "white", fontWeight: "normal", fontSize: "11px", textAlign: "center"}, f.style)).add());
            d ? (b = c.plotX + k, l = m + (h ? 0 : this.height)) : (b = h ? this.width + k : 0, l = c.plotY + m);
            if (l <
                m || l > m + this.height)this.hideCrosshair(); else {
                u || f.formatter || (this.isDatetimeAxis && (v = "%b %d, %Y"), u = "{value" + (v ? ":" + v : "") + "}");
                a.attr({
                    text: u ? n(u, {value: c[g]}) : f.formatter.call(this, c[g]),
                    x: b,
                    y: l,
                    visibility: "visible"
                });
                c = a.getBBox();
                if (d) {
                    if ("inside" === this.options.tickPosition && !h || "inside" !== this.options.tickPosition && h)l = a.y - c.height
                } else l = a.y - c.height / 2;
                d ? (d = k - c.x, e = k + this.width - c.x) : (d = "left" === this.labelAlign ? k : 0, e = "right" === this.labelAlign ? k + this.width : e.chartWidth);
                a.translateX < d && (b += d -
                    a.translateX);
                a.translateX + c.width >= e && (b -= a.translateX + c.width - e);
                a.attr({x: b, y: l, visibility: "visible"})
            }
        }
    });
    var vc = sa.init, wc = sa.processData, xc = ya.prototype.tooltipFormatter;
    sa.init = function () {
        vc.apply(this, arguments);
        this.setCompare(this.options.compare)
    };
    sa.setCompare = function (a) {
        this.modifyValue = "value" === a || "percent" === a ? function (b, c) {
            var d = this.compareValue;
            b !== G && (b = "value" === a ? b - d : b = b / d * 100 - 100, c && (c.change = b));
            return b
        } : null;
        this.chart.hasRendered && (this.isDirty = !0)
    };
    sa.processData = function () {
        var a =
            0, b, c, d;
        wc.apply(this, arguments);
        if (this.xAxis && this.processedYData)for (b = this.processedXData, c = this.processedYData, d = c.length; a < d; a++)if ("number" === typeof c[a] && b[a] >= this.xAxis.min) {
            this.compareValue = c[a];
            break
        }
    };
    W(sa, "getExtremes", function (a) {
        a.apply(this, [].slice.call(arguments, 1));
        this.modifyValue && (this.dataMax = this.modifyValue(this.dataMax), this.dataMin = this.modifyValue(this.dataMin))
    });
    ca.prototype.setCompare = function (a, b) {
        this.isXAxis || (x(this.series, function (b) {
            b.setCompare(a)
        }), z(b, !0) &&
        this.chart.redraw())
    };
    ya.prototype.tooltipFormatter = function (a) {
        a = a.replace("{point.change}", (0 < this.change ? "+" : "") + V.numberFormat(this.change, z(this.series.tooltipOptions.changeDecimals, 2)));
        return xc.apply(this, [a])
    };
    W(aa.prototype, "render", function (a) {
        this.chart.options._stock && this.xAxis && (!this.clipBox && this.animate ? (this.clipBox = r(this.chart.clipBox), this.clipBox.width = this.xAxis.len, this.clipBox.height = this.yAxis.len) : this.chart[this.sharedClipKey] && (db(this.chart[this.sharedClipKey]), this.chart[this.sharedClipKey].attr({
            width: this.xAxis.len,
            height: this.yAxis.len
        })));
        a.call(this)
    });
    O(Ba.prototype, {
        init: function (a, b, c) {
            var d = this, e = d.defaultOptions;
            d.chart = b;
            d.options = a = r(e, b.angular ? {background: {}} : void 0, a);
            (a = a.background) && x([].concat(B(a)).reverse(), function (a) {
                var b = a.backgroundColor, e = c.userOptions;
                a = r(d.defaultBackgroundOptions, a);
                b && (a.backgroundColor = b);
                a.color = a.backgroundColor;
                c.options.plotBands.unshift(a);
                e.plotBands = e.plotBands || [];
                e.plotBands !== c.options.plotBands && e.plotBands.unshift(a)
            })
        },
        defaultOptions: {
            center: ["50%",
                "50%"], size: "85%", startAngle: 0
        },
        defaultBackgroundOptions: {
            shape: "circle",
            borderWidth: 1,
            borderColor: "silver",
            backgroundColor: {linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1}, stops: [[0, "#FFF"], [1, "#DDD"]]},
            from: -Number.MAX_VALUE,
            innerRadius: 0,
            to: Number.MAX_VALUE,
            outerRadius: "105%"
        }
    });
    var yb = ca.prototype, Pb = Ea.prototype, yc = {
        getOffset: la, redraw: function () {
            this.isDirty = !1
        }, render: function () {
            this.isDirty = !1
        }, setScale: la, setCategories: la, setTitle: la
    }, dc = {
        isRadial: !0,
        defaultRadialGaugeOptions: {
            labels: {
                align: "center",
                x: 0, y: null
            },
            minorGridLineWidth: 0,
            minorTickInterval: "auto",
            minorTickLength: 10,
            minorTickPosition: "inside",
            minorTickWidth: 1,
            tickLength: 10,
            tickPosition: "inside",
            tickWidth: 2,
            title: {rotation: 0},
            zIndex: 2
        },
        defaultRadialXOptions: {
            gridLineWidth: 1,
            labels: {align: null, distance: 15, x: 0, y: null},
            maxPadding: 0,
            minPadding: 0,
            showLastLabel: !1,
            tickLength: 0
        },
        defaultRadialYOptions: {
            gridLineInterpolation: "circle",
            labels: {align: "right", x: -3, y: -2},
            showLastLabel: !1,
            title: {x: 4, text: null, rotation: 90}
        },
        setOptions: function (a) {
            a =
                this.options = r(this.defaultOptions, this.defaultRadialOptions, a);
            a.plotBands || (a.plotBands = [])
        },
        getOffset: function () {
            yb.getOffset.call(this);
            this.chart.axisOffset[this.side] = 0;
            this.center = this.pane.center = Wb.getCenter.call(this.pane)
        },
        getLinePath: function (a, b) {
            var c = this.center;
            b = z(b, c[2] / 2 - this.offset);
            return this.chart.renderer.symbols.arc(this.left + c[0], this.top + c[1], b, b, {
                start: this.startAngleRad,
                end: this.endAngleRad,
                open: !0,
                innerR: 0
            })
        },
        setAxisTranslation: function () {
            yb.setAxisTranslation.call(this);
            this.center && (this.transA = this.isCircular ? (this.endAngleRad - this.startAngleRad) / (this.max - this.min || 1) : this.center[2] / 2 / (this.max - this.min || 1), this.minPixelPadding = this.isXAxis ? this.transA * this.minPointOffset : 0)
        },
        beforeSetTickPositions: function () {
            this.autoConnect && (this.max += this.categories && 1 || this.pointRange || this.closestPointRange || 0)
        },
        setAxisSize: function () {
            yb.setAxisSize.call(this);
            this.isRadial && (this.center = this.pane.center = V.CenteredSeriesMixin.getCenter.call(this.pane), this.isCircular && (this.sector =
                this.endAngleRad - this.startAngleRad), this.len = this.width = this.height = this.center[2] * z(this.sector, 1) / 2)
        },
        getPosition: function (a, b) {
            return this.postTranslate(this.isCircular ? this.translate(a) : 0, z(this.isCircular ? b : this.translate(a), this.center[2] / 2) - this.offset)
        },
        postTranslate: function (a, b) {
            var c = this.chart, d = this.center;
            a = this.startAngleRad + a;
            return {x: c.plotLeft + d[0] + Math.cos(a) * b, y: c.plotTop + d[1] + Math.sin(a) * b}
        },
        getPlotBandPath: function (a, b, c) {
            var d = this.center, e = this.startAngleRad, f = d[2] / 2, g = [z(c.outerRadius,
                "100%"), c.innerRadius, z(c.thickness, 10)], h = /%$/, k, m = this.isCircular;
            "polygon" === this.options.gridLineInterpolation ? d = this.getPlotLinePath(a).concat(this.getPlotLinePath(b, !0)) : (a = Math.max(a, this.min), b = Math.min(b, this.max), m || (g[0] = this.translate(a), g[1] = this.translate(b)), g = Ga(g, function (a) {
                h.test(a) && (a = C(a, 10) * f / 100);
                return a
            }), "circle" !== c.shape && m ? (a = e + this.translate(a), b = e + this.translate(b)) : (a = -Math.PI / 2, b = 1.5 * Math.PI, k = !0), d = this.chart.renderer.symbols.arc(this.left + d[0], this.top + d[1], g[0],
                g[0], {start: Math.min(a, b), end: Math.max(a, b), innerR: z(g[1], g[0] - g[2]), open: k}));
            return d
        },
        getPlotLinePath: function (a, b) {
            var c = this, d = c.center, e = c.chart, f = c.getPosition(a), g, h, k;
            c.isCircular ? k = ["M", d[0] + e.plotLeft, d[1] + e.plotTop, "L", f.x, f.y] : "circle" === c.options.gridLineInterpolation ? (a = c.translate(a)) && (k = c.getLinePath(0, a)) : (x(e.xAxis, function (a) {
                a.pane === c.pane && (g = a)
            }), k = [], a = c.translate(a), d = g.tickPositions, g.autoConnect && (d = d.concat([d[0]])), b && (d = [].concat(d).reverse()), x(d, function (b, c) {
                h = g.getPosition(b,
                    a);
                k.push(c ? "L" : "M", h.x, h.y)
            }));
            return k
        },
        getTitlePosition: function () {
            var a = this.center, b = this.chart, c = this.options.title;
            return {
                x: b.plotLeft + a[0] + (c.x || 0),
                y: b.plotTop + a[1] - {high: .5, middle: .25, low: 0}[c.align] * a[2] + (c.y || 0)
            }
        }
    };
    W(yb, "init", function (a, b, c) {
        var d = b.angular, e = b.polar, f = c.isX, g = d && f, h, k;
        k = b.options;
        var m = c.pane || 0;
        if (d) {
            if (O(this, g ? yc : dc), h = !f)this.defaultRadialOptions = this.defaultRadialGaugeOptions
        } else e && (O(this, dc), this.defaultRadialOptions = (h = f) ? this.defaultRadialXOptions : r(this.defaultYAxisOptions,
            this.defaultRadialYOptions));
        a.call(this, b, c);
        g || !d && !e || (a = this.options, b.panes || (b.panes = []), this.pane = m = b.panes[m] = b.panes[m] || new Ba(B(k.pane)[m], b, this), m = m.options, b.inverted = !1, k.chart.zoomType = null, this.startAngleRad = b = (m.startAngle - 90) * Math.PI / 180, this.endAngleRad = k = (z(m.endAngle, m.startAngle + 360) - 90) * Math.PI / 180, this.offset = a.offset || 0, (this.isCircular = h) && c.max === G && k - b === 2 * Math.PI && (this.autoConnect = !0))
    });
    W(Pb, "getPosition", function (a, b, c, d, e) {
        var f = this.axis;
        return f.getPosition ? f.getPosition(c) :
            a.call(this, b, c, d, e)
    });
    W(Pb, "getLabelPosition", function (a, b, c, d, e, f, g, h, k) {
        var m = this.axis, l = f.y, u = 20, n = f.align, v = (m.translate(this.pos) + m.startAngleRad + Math.PI / 2) / Math.PI * 180 % 360;
        m.isRadial ? (a = m.getPosition(this.pos, m.center[2] / 2 + z(f.distance, -25)), "auto" === f.rotation ? d.attr({rotation: v}) : null === l && (l = m.chart.renderer.fontMetrics(d.styles.fontSize).b - d.getBBox().height / 2), null === n && (m.isCircular ? (this.label.getBBox().width > m.len * m.tickInterval / (m.max - m.min) && (u = 0), n = v > u && v < 180 - u ? "left" : v > 180 + u &&
        v < 360 - u ? "right" : "center") : n = "center", d.attr({align: n})), a.x += f.x, a.y += l) : a = a.call(this, b, c, d, e, f, g, h, k);
        return a
    });
    W(Pb, "getMarkPath", function (a, b, c, d, e, f, g) {
        var h = this.axis;
        h.isRadial ? (a = h.getPosition(this.pos, h.center[2] / 2 + d), b = ["M", b, c, "L", a.x, a.y]) : b = a.call(this, b, c, d, e, f, g);
        return b
    });
    Z.arearange = r(Z.area, {
        lineWidth: 1,
        marker: null,
        threshold: null,
        tooltip: {pointFormat: '<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'},
        trackByArea: !0,
        dataLabels: {align: null, verticalAlign: null, xLow: 0, xHigh: 0, yLow: 0, yHigh: 0},
        states: {hover: {halo: !1}}
    });
    L.arearange = R(L.area, {
        type: "arearange",
        pointArrayMap: ["low", "high"],
        dataLabelCollections: ["dataLabel", "dataLabelUpper"],
        toYData: function (a) {
            return [a.low, a.high]
        },
        pointValKey: "low",
        deferTranslatePolar: !0,
        highToXY: function (a) {
            var b = this.chart, c = this.xAxis.postTranslate(a.rectPlotX, this.yAxis.len - a.plotHigh);
            a.plotHighX = c.x - b.plotLeft;
            a.plotHigh = c.y - b.plotTop
        },
        getSegments: function () {
            var a = this;
            x(a.points,
                function (b) {
                    a.options.connectNulls || null !== b.low && null !== b.high ? null === b.low && null !== b.high && (b.y = b.high) : b.y = null
                });
            aa.prototype.getSegments.call(this)
        },
        translate: function () {
            var a = this, b = a.yAxis;
            L.area.prototype.translate.apply(a);
            x(a.points, function (a) {
                var d = a.low, e = a.high, f = a.plotY;
                null === e && null === d ? a.y = null : null === d ? (a.plotLow = a.plotY = null, a.plotHigh = b.translate(e, 0, 1, 0, 1)) : null === e ? (a.plotLow = f, a.plotHigh = null) : (a.plotLow = f, a.plotHigh = b.translate(e, 0, 1, 0, 1))
            });
            this.chart.polar && x(this.points,
                function (b) {
                    a.highToXY(b)
                })
        },
        getSegmentPath: function (a) {
            var b, c = [], d = a.length, e = aa.prototype.getSegmentPath, f, g;
            g = this.options;
            var h = g.step;
            for (b = HighchartsAdapter.grep(a, function (a) {
                return null !== a.plotLow
            }); d--;)f = a[d], null !== f.plotHigh && c.push({plotX: f.plotHighX || f.plotX, plotY: f.plotHigh});
            a = e.call(this, b);
            h && (!0 === h && (h = "left"), g.step = {left: "right", center: "center", right: "left"}[h]);
            c = e.call(this, c);
            g.step = h;
            g = [].concat(a, c);
            this.chart.polar || (c[0] = "L");
            this.areaPath = this.areaPath.concat(a, c);
            return g
        },
        drawDataLabels: function () {
            var a = this.data, b = a.length, c, d = [], e = aa.prototype, f = this.options.dataLabels, g = f.align, h = f.inside, k, m, l = this.chart.inverted;
            if (f.enabled || this._hasPointLabels) {
                for (c = b; c--;)if (k = a[c])m = h ? k.plotHigh < k.plotLow : k.plotHigh > k.plotLow, k.y = k.high, k._plotY = k.plotY, k.plotY = k.plotHigh, d[c] = k.dataLabel, k.dataLabel = k.dataLabelUpper, k.below = m, l ? (g || (f.align = m ? "right" : "left"), f.x = f.xHigh) : f.y = f.yHigh;
                e.drawDataLabels && e.drawDataLabels.apply(this, arguments);
                for (c = b; c--;)if (k = a[c])m =
                    h ? k.plotHigh < k.plotLow : k.plotHigh > k.plotLow, k.dataLabelUpper = k.dataLabel, k.dataLabel = d[c], k.y = k.low, k.plotY = k._plotY, k.below = !m, l ? (g || (f.align = m ? "left" : "right"), f.x = f.xLow) : f.y = f.yLow;
                e.drawDataLabels && e.drawDataLabels.apply(this, arguments)
            }
            f.align = g
        },
        alignDataLabel: function () {
            L.column.prototype.alignDataLabel.apply(this, arguments)
        },
        setStackedPoints: la,
        getSymbol: la,
        drawPoints: la
    });
    Z.areasplinerange = r(Z.arearange);
    L.areasplinerange = R(L.arearange, {type: "areasplinerange", getPointSpline: L.spline.prototype.getPointSpline});
    (function () {
        var a = L.column.prototype;
        Z.columnrange = r(Z.column, Z.arearange, {lineWidth: 1, pointRange: null});
        L.columnrange = R(L.arearange, {
            type: "columnrange",
            translate: function () {
                var b = this, c = b.yAxis, d;
                a.translate.apply(b);
                x(b.points, function (a) {
                    var f = a.shapeArgs, g = b.options.minPointLength, h;
                    a.tooltipPos = null;
                    a.plotHigh = d = c.translate(a.high, 0, 1, 0, 1);
                    a.plotLow = a.plotY;
                    h = d;
                    a = a.plotY - d;
                    Math.abs(a) < g ? (g -= a, a += g, h -= g / 2) : 0 > a && (a *= -1, h -= a);
                    f.height = a;
                    f.y = h
                })
            },
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            drawGraph: la,
            crispCol: a.crispCol,
            pointAttrToOptions: a.pointAttrToOptions,
            drawPoints: a.drawPoints,
            drawTracker: a.drawTracker,
            animate: a.animate,
            getColumnMetrics: a.getColumnMetrics
        })
    })();
    Z.gauge = r(Z.line, {
        dataLabels: {
            enabled: !0,
            defer: !1,
            y: 15,
            borderWidth: 1,
            borderColor: "silver",
            borderRadius: 3,
            crop: !1,
            verticalAlign: "top",
            zIndex: 2
        }, dial: {}, pivot: {}, tooltip: {headerFormat: ""}, showInLegend: !1
    });
    var zc = {
        type: "gauge", pointClass: R(ya, {
            setState: function (a) {
                this.state = a
            }
        }), angular: !0, drawGraph: la, fixedBox: !0, forceDL: !0,
        trackerGroups: ["group", "dataLabelsGroup"], translate: function () {
            var a = this.yAxis, b = this.options, c = a.center;
            this.generatePoints();
            x(this.points, function (d) {
                var e = r(b.dial, d.dial), f = C(z(e.radius, 80)) * c[2] / 200, g = C(z(e.baseLength, 70)) * f / 100, h = C(z(e.rearLength, 10)) * f / 100, k = e.baseWidth || 3, m = e.topWidth || 1, l = b.overshoot, u = a.startAngleRad + a.translate(d.y, null, null, null, !0);
                l && "number" === typeof l ? (l = l / 180 * Math.PI, u = Math.max(a.startAngleRad - l, Math.min(a.endAngleRad + l, u))) : !1 === b.wrap && (u = Math.max(a.startAngleRad,
                    Math.min(a.endAngleRad, u)));
                u = 180 * u / Math.PI;
                d.shapeType = "path";
                d.shapeArgs = {
                    d: e.path || ["M", -h, -k / 2, "L", g, -k / 2, f, -m / 2, f, m / 2, g, k / 2, -h, k / 2, "z"],
                    translateX: c[0],
                    translateY: c[1],
                    rotation: u
                };
                d.plotX = c[0];
                d.plotY = c[1]
            })
        }, drawPoints: function () {
            var a = this, b = a.yAxis.center, c = a.pivot, d = a.options, e = d.pivot, f = a.chart.renderer;
            x(a.points, function (b) {
                var c = b.graphic, e = b.shapeArgs, m = e.d, l = r(d.dial, b.dial);
                c ? (c.animate(e), e.d = m) : b.graphic = f[b.shapeType](e).attr({
                    stroke: l.borderColor || "none", "stroke-width": l.borderWidth ||
                    0, fill: l.backgroundColor || "black", rotation: e.rotation
                }).add(a.group)
            });
            c ? c.animate({
                translateX: b[0],
                translateY: b[1]
            }) : a.pivot = f.circle(0, 0, z(e.radius, 5)).attr({
                "stroke-width": e.borderWidth || 0,
                stroke: e.borderColor || "silver",
                fill: e.backgroundColor || "black"
            }).translate(b[0], b[1]).add(a.group)
        }, animate: function (a) {
            var b = this;
            a || (x(b.points, function (a) {
                var d = a.graphic;
                d && (d.attr({rotation: 180 * b.yAxis.startAngleRad / Math.PI}), d.animate({rotation: a.shapeArgs.rotation}, b.options.animation))
            }), b.animate = null)
        },
        render: function () {
            this.group = this.plotGroup("group", "series", this.visible ? "visible" : "hidden", this.options.zIndex, this.chart.seriesGroup);
            aa.prototype.render.call(this);
            this.group.clip(this.chart.clipRect)
        }, setData: function (a, b) {
            aa.prototype.setData.call(this, a, !1);
            this.processData();
            this.generatePoints();
            z(b, !0) && this.chart.redraw()
        }, drawTracker: $a && $a.drawTrackerPoint
    };
    L.gauge = R(L.line, zc);
    Z.boxplot = r(Z.column, {
        fillColor: "#FFFFFF",
        lineWidth: 1,
        medianWidth: 2,
        states: {hover: {brightness: -.3}},
        threshold: null,
        tooltip: {pointFormat: '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>'},
        whiskerLength: "50%",
        whiskerWidth: 2
    });
    L.boxplot = R(L.column, {
        type: "boxplot", pointArrayMap: ["low", "q1", "median", "q3", "high"], toYData: function (a) {
            return [a.low, a.q1, a.median, a.q3, a.high]
        }, pointValKey: "high", pointAttrToOptions: {fill: "fillColor", stroke: "color", "stroke-width": "lineWidth"},
        drawDataLabels: la, translate: function () {
            var a = this.yAxis, b = this.pointArrayMap;
            L.column.prototype.translate.apply(this);
            x(this.points, function (c) {
                x(b, function (b) {
                    null !== c[b] && (c[b + "Plot"] = a.translate(c[b], 0, 1, 0, 1))
                })
            })
        }, drawPoints: function () {
            var a = this, b = a.options, c = a.chart.renderer, d, e, f, g, h, k, m, l, u, n, v, p, q, t, r, Q, N, M, F, A, B, E, fa = !1 !== a.doQuartiles, ba, I = a.options.whiskerLength;
            x(a.points, function (x) {
                u = x.graphic;
                B = x.shapeArgs;
                v = {};
                t = {};
                Q = {};
                E = x.color || a.color;
                x.plotY !== G && (d = x.pointAttr[x.selected ? "selected" :
                    ""], N = B.width, M = ea(B.x), F = M + N, A = K(N / 2), e = ea(fa ? x.q1Plot : x.lowPlot), f = ea(fa ? x.q3Plot : x.lowPlot), g = ea(x.highPlot), h = ea(x.lowPlot), v.stroke = x.stemColor || b.stemColor || E, v["stroke-width"] = z(x.stemWidth, b.stemWidth, b.lineWidth), v.dashstyle = x.stemDashStyle || b.stemDashStyle, t.stroke = x.whiskerColor || b.whiskerColor || E, t["stroke-width"] = z(x.whiskerWidth, b.whiskerWidth, b.lineWidth), Q.stroke = x.medianColor || b.medianColor || E, Q["stroke-width"] = z(x.medianWidth, b.medianWidth, b.lineWidth), m = v["stroke-width"] % 2 / 2, l =
                    M + A + m, n = ["M", l, f, "L", l, g, "M", l, e, "L", l, h], fa && (m = d["stroke-width"] % 2 / 2, l = ea(l) + m, e = ea(e) + m, f = ea(f) + m, M += m, F += m, p = ["M", M, f, "L", M, e, "L", F, e, "L", F, f, "L", M, f, "z"]), I && (m = t["stroke-width"] % 2 / 2, g += m, h += m, ba = /%$/.test(I) ? A * parseFloat(I) / 100 : I / 2, q = ["M", l - ba, g, "L", l + ba, g, "M", l - ba, h, "L", l + ba, h]), m = Q["stroke-width"] % 2 / 2, k = K(x.medianPlot) + m, r = ["M", M, k, "L", F, k], u ? (x.stem.animate({d: n}), I && x.whiskers.animate({d: q}), fa && x.box.animate({d: p}), x.medianShape.animate({d: r})) : (x.graphic = u = c.g().add(a.group), x.stem = c.path(n).attr(v).add(u),
                I && (x.whiskers = c.path(q).attr(t).add(u)), fa && (x.box = c.path(p).attr(d).add(u)), x.medianShape = c.path(r).attr(Q).add(u)))
            })
        }, setStackedPoints: la
    });
    Z.errorbar = r(Z.boxplot, {
        color: "#000000",
        grouping: !1,
        linkedTo: ":previous",
        tooltip: {pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'},
        whiskerWidth: null
    });
    L.errorbar = R(L.boxplot, {
        type: "errorbar", pointArrayMap: ["low", "high"], toYData: function (a) {
            return [a.low, a.high]
        }, pointValKey: "high", doQuartiles: !1,
        drawDataLabels: L.arearange ? L.arearange.prototype.drawDataLabels : la, getColumnMetrics: function () {
            return this.linkedParent && this.linkedParent.columnMetrics || L.column.prototype.getColumnMetrics.call(this)
        }
    });
    Z.waterfall = r(Z.column, {
        lineWidth: 1,
        lineColor: "#333",
        dashStyle: "dot",
        borderColor: "#333",
        dataLabels: {inside: !0},
        states: {hover: {lineWidthPlus: 0}}
    });
    L.waterfall = R(L.column, {
        type: "waterfall", upColorProp: "fill", pointValKey: "y", translate: function () {
            var a = this.options, b = this.yAxis, c, d, e, f, g, h, k, m, l, u = a.threshold,
                n = a.stacking;
            L.column.prototype.translate.apply(this);
            k = m = u;
            d = this.points;
            c = 0;
            for (a = d.length; c < a; c++)e = d[c], h = this.processedYData[c], f = e.shapeArgs, l = (g = n && b.stacks[(this.negStacks && h < u ? "-" : "") + this.stackKey]) ? g[e.x].points[this.index + "," + c] : [0, h], e.isSum ? e.y = h : e.isIntermediateSum && (e.y = h - m), g = I(k, k + e.y) + l[0], f.y = b.translate(g, 0, 1), e.isSum ? (f.y = b.translate(l[1], 0, 1), f.height = Math.min(b.translate(l[0], 0, 1), b.len) - f.y) : e.isIntermediateSum ? (f.y = b.translate(l[1], 0, 1), f.height = Math.min(b.translate(m, 0,
                    1), b.len) - f.y, m = l[1]) : (0 !== k && (f.height = 0 < h ? b.translate(k, 0, 1) - f.y : b.translate(k, 0, 1) - b.translate(k - h, 0, 1)), k += h), 0 > f.height && (f.y += f.height, f.height *= -1), e.plotY = f.y = K(f.y) - this.borderWidth % 2 / 2, f.height = I(K(f.height), .001), e.yBottom = f.y + f.height, f = e.plotY + (e.negative ? f.height : 0), this.chart.inverted ? e.tooltipPos[0] = b.len - f : e.tooltipPos[1] = f
        }, processData: function (a) {
            var b = this.yData, c = this.options.data, d, e = b.length, f, g, h, k, m, l;
            g = f = h = k = this.options.threshold || 0;
            for (l = 0; l < e; l++)m = b[l], d = c && c[l] ? c[l] :
            {}, "sum" === m || d.isSum ? b[l] = g : "intermediateSum" === m || d.isIntermediateSum ? b[l] = f : (g += m, f += m), h = Math.min(g, h), k = Math.max(g, k);
            aa.prototype.processData.call(this, a);
            this.dataMin = h;
            this.dataMax = k
        }, toYData: function (a) {
            return a.isSum ? 0 === a.x ? null : "sum" : a.isIntermediateSum ? 0 === a.x ? null : "intermediateSum" : a.y
        }, getAttribs: function () {
            L.column.prototype.getAttribs.apply(this, arguments);
            var a = this, b = a.options, c = b.states, d = b.upColor || a.color, b = V.Color(d).brighten(.1).get(), e = r(a.pointAttr), f = a.upColorProp;
            e[""][f] =
                d;
            e.hover[f] = c.hover.upColor || b;
            e.select[f] = c.select.upColor || d;
            x(a.points, function (b) {
                b.options.color || (0 < b.y ? (b.pointAttr = e, b.color = d) : b.pointAttr = a.pointAttr)
            })
        }, getGraphPath: function () {
            var a = this.data, b = a.length, c = K(this.options.lineWidth + this.borderWidth) % 2 / 2, d = [], e, f, g;
            for (g = 1; g < b; g++)f = a[g].shapeArgs, e = a[g - 1].shapeArgs, f = ["M", e.x + e.width, e.y + c, "L", f.x, e.y + c], 0 > a[g - 1].y && (f[2] += e.height, f[5] += e.height), d = d.concat(f);
            return d
        }, getExtremes: la, drawGraph: aa.prototype.drawGraph
    });
    Z.bubble = r(Z.scatter,
        {
            dataLabels: {
                formatter: function () {
                    return this.point.z
                }, inside: !0, verticalAlign: "middle"
            },
            marker: {lineColor: null, lineWidth: 1},
            minSize: 8,
            maxSize: "20%",
            softThreshold: !1,
            states: {hover: {halo: {size: 5}}},
            tooltip: {pointFormat: "({point.x}, {point.y}), Size: {point.z}"},
            turboThreshold: 0,
            zThreshold: 0,
            zoneAxis: "z"
        });
    var Ac = R(ya, {
        haloPath: function () {
            return ya.prototype.haloPath.call(this, this.shapeArgs.r + this.series.options.states.hover.halo.size)
        }, ttBelow: !1
    });
    L.bubble = R(L.scatter, {
        type: "bubble",
        pointClass: Ac,
        pointArrayMap: ["y", "z"],
        parallelArrays: ["x", "y", "z"],
        trackerGroups: ["group", "dataLabelsGroup"],
        bubblePadding: !0,
        zoneAxis: "z",
        pointAttrToOptions: {stroke: "lineColor", "stroke-width": "lineWidth", fill: "fillColor"},
        applyOpacity: function (a) {
            var b = this.options.marker, c = z(b.fillOpacity, .5);
            a = a || b.fillColor || this.color;
            1 !== c && (a = Oa(a).setOpacity(c).get("rgba"));
            return a
        },
        convertAttribs: function () {
            var a = aa.prototype.convertAttribs.apply(this, arguments);
            a.fill = this.applyOpacity(a.fill);
            return a
        },
        getRadii: function (a,
                            b, c, d) {
            var e, f, g, h = this.zData, k = [], m = this.options, l = "width" !== m.sizeBy, u = m.zThreshold, n = b - a;
            f = 0;
            for (e = h.length; f < e; f++)g = h[f], m.sizeByAbsoluteValue && (g = Math.abs(g - u), b = Math.max(b - u, Math.abs(a - u)), a = 0), null === g ? g = null : g < a ? g = c / 2 - 1 : (g = 0 < n ? (g - a) / n : .5, l && 0 <= g && (g = Math.sqrt(g)), g = na.ceil(c + g * (d - c)) / 2), k.push(g);
            this.radii = k
        },
        animate: function (a) {
            var b = this.options.animation;
            a || (x(this.points, function (a) {
                var d = a.graphic;
                a = a.shapeArgs;
                d && a && (d.attr("r", 1), d.animate({r: a.r}, b))
            }), this.animate = null)
        },
        translate: function () {
            var a,
                b = this.data, c, d, e = this.radii;
            L.scatter.prototype.translate.call(this);
            for (a = b.length; a--;)c = b[a], d = e ? e[a] : 0, "number" === typeof d && d >= this.minPxSize / 2 ? (c.shapeType = "circle", c.shapeArgs = {
                x: c.plotX,
                y: c.plotY,
                r: d
            }, c.dlBox = {
                x: c.plotX - d,
                y: c.plotY - d,
                width: 2 * d,
                height: 2 * d
            }) : c.shapeArgs = c.plotY = c.dlBox = G
        },
        drawLegendSymbol: function (a, b) {
            var c = C(a.itemStyle.fontSize) / 2;
            b.legendSymbol = this.chart.renderer.circle(c, a.baseline - c, c).attr({zIndex: 3}).add(b.legendGroup);
            b.legendSymbol.isMarker = !0
        },
        drawPoints: L.column.prototype.drawPoints,
        alignDataLabel: L.column.prototype.alignDataLabel,
        buildKDTree: la,
        applyZones: la
    });
    ca.prototype.beforePadding = function () {
        var a = this, b = this.len, c = this.chart, d = 0, e = b, f = this.isXAxis, g = f ? "xData" : "yData", h = this.min, k = {}, m = na.min(c.plotWidth, c.plotHeight), l = Number.MAX_VALUE, u = -Number.MAX_VALUE, n = this.max - h, v = b / n, p = [];
        x(this.series, function (b) {
            var d = b.options;
            !b.bubblePadding || !b.visible && c.options.chart.ignoreHiddenSeries || (a.allowZoomOutside = !0, p.push(b), f && (x(["minSize", "maxSize"], function (a) {
                var b = d[a],
                    c = /%$/.test(b), b = C(b);
                k[a] = c ? m * b / 100 : b
            }), b.minPxSize = k.minSize, b.maxPxSize = k.maxSize, b = b.zData, b.length && (l = z(d.zMin, na.min(l, na.max(M(b), !1 === d.displayNegative ? d.zThreshold : -Number.MAX_VALUE))), u = z(d.zMax, na.max(u, fa(b))))))
        });
        x(p, function (a) {
            var b = a[g], c = b.length, k;
            f && a.getRadii(l, u, a.minPxSize, a.maxPxSize);
            if (0 < n)for (; c--;)"number" === typeof b[c] && (k = a.radii[c], d = Math.min((b[c] - h) * v - k, d), e = Math.max((b[c] - h) * v + k, e))
        });
        p.length && 0 < n && !this.isLog && (e -= b, v *= (b + d - e) / b, x([["min", "userMin", d], ["max", "userMax",
            e]], function (b) {
            z(a.options[b[0]], a[b[1]]) === G && (a[b[0]] += b[2] / v)
        }))
    };
    (function () {
        function a(a, b, c) {
            a.call(this, b, c);
            this.chart.polar && (this.closeSegment = function (a) {
                var b = this.xAxis.center;
                a.push("L", b[0], b[1])
            }, this.closedStacks = !0)
        }

        function b(a, b) {
            var c = this.chart, d = this.options.animation, e = this.group, l = this.markerGroup, u = this.xAxis.center, n = c.plotLeft, v = c.plotTop;
            c.polar ? c.renderer.isSVG && (!0 === d && (d = {}), b ? (c = {
                translateX: u[0] + n,
                translateY: u[1] + v,
                scaleX: .001,
                scaleY: .001
            }, e.attr(c), l && l.attr(c)) :
                (c = {
                    translateX: n,
                    translateY: v,
                    scaleX: 1,
                    scaleY: 1
                }, e.animate(c, d), l && l.animate(c, d), this.animate = null)) : a.call(this, b)
        }

        var c = aa.prototype, d = Wa.prototype, e;
        c.searchPointByAngle = function (a) {
            var b = this.chart, c = this.xAxis.pane.center;
            return this.searchKDTree({clientX: 180 + -180 / Math.PI * Math.atan2(a.chartX - c[0] - b.plotLeft, a.chartY - c[1] - b.plotTop)})
        };
        W(c, "buildKDTree", function (a) {
            this.chart.polar && (this.kdByAngle ? this.searchPoint = this.searchPointByAngle : this.kdDimensions = 2);
            a.apply(this)
        });
        c.toXY = function (a) {
            var b,
                c = this.chart, d = a.plotX;
            b = a.plotY;
            a.rectPlotX = d;
            a.rectPlotY = b;
            b = this.xAxis.postTranslate(a.plotX, this.yAxis.len - b);
            a.plotX = a.polarPlotX = b.x - c.plotLeft;
            a.plotY = a.polarPlotY = b.y - c.plotTop;
            this.kdByAngle ? (c = (d / Math.PI * 180 + this.xAxis.pane.options.startAngle) % 360, 0 > c && (c += 360), a.clientX = c) : a.clientX = a.plotX
        };
        L.area && W(L.area.prototype, "init", a);
        L.areaspline && W(L.areaspline.prototype, "init", a);
        L.spline && W(L.spline.prototype, "getPointSpline", function (a, b, c, d) {
            var e, l, n, v, p, q, t;
            this.chart.polar ? (e = c.plotX,
                l = c.plotY, a = b[d - 1], n = b[d + 1], this.connectEnds && (a || (a = b[b.length - 2]), n || (n = b[1])), a && n && (v = a.plotX, p = a.plotY, b = n.plotX, q = n.plotY, v = (1.5 * e + v) / 2.5, p = (1.5 * l + p) / 2.5, n = (1.5 * e + b) / 2.5, t = (1.5 * l + q) / 2.5, b = Math.sqrt(Math.pow(v - e, 2) + Math.pow(p - l, 2)), q = Math.sqrt(Math.pow(n - e, 2) + Math.pow(t - l, 2)), v = Math.atan2(p - l, v - e), p = Math.atan2(t - l, n - e), t = Math.PI / 2 + (v + p) / 2, Math.abs(v - t) > Math.PI / 2 && (t -= Math.PI), v = e + Math.cos(t) * b, p = l + Math.sin(t) * b, n = e + Math.cos(Math.PI + t) * q, t = l + Math.sin(Math.PI + t) * q, c.rightContX = n, c.rightContY = t),
                d ? (c = ["C", a.rightContX || a.plotX, a.rightContY || a.plotY, v || e, p || l, e, l], a.rightContX = a.rightContY = null) : c = ["M", e, l]) : c = a.call(this, b, c, d);
            return c
        });
        W(c, "translate", function (a) {
            var b = this.chart;
            a.call(this);
            if (b.polar && (this.kdByAngle = b.tooltip && b.tooltip.shared, !this.preventPostTranslate))for (a = this.points, b = a.length; b--;)this.toXY(a[b])
        });
        W(c, "getSegmentPath", function (a, b) {
            var c = this.points;
            this.chart.polar && !1 !== this.options.connectEnds && b[b.length - 1] === c[c.length - 1] && null !== c[0].y && (this.connectEnds = !0, b = [].concat(b, [c[0]]));
            return a.call(this, b)
        });
        W(c, "animate", b);
        L.column && (e = L.column.prototype, W(e, "animate", b), W(e, "translate", function (a) {
            var b = this.xAxis, c = this.yAxis.len, d = b.center, e = b.startAngleRad, l = this.chart.renderer, n, v;
            this.preventPostTranslate = !0;
            a.call(this);
            if (b.isRadial)for (b = this.points, v = b.length; v--;)n = b[v], a = n.barX + e, n.shapeType = "path", n.shapeArgs = {
                d: l.symbols.arc(d[0], d[1], c - n.plotY, null, {
                    start: a,
                    end: a + n.pointWidth,
                    innerR: c - z(n.yBottom, c)
                })
            }, this.toXY(n), n.tooltipPos = [n.plotX,
                n.plotY], n.ttBelow = n.plotY > d[1]
        }), W(e, "alignDataLabel", function (a, b, d, e, m, l) {
            this.chart.polar ? (a = b.rectPlotX / Math.PI * 180, null === e.align && (e.align = 20 < a && 160 > a ? "left" : 200 < a && 340 > a ? "right" : "center"), null === e.verticalAlign && (e.verticalAlign = 45 > a || 315 < a ? "bottom" : 135 < a && 225 > a ? "top" : "middle"), c.alignDataLabel.call(this, b, d, e, m, l)) : a.call(this, b, d, e, m, l)
        }));
        W(d, "getCoordinates", function (a, b) {
            var c = this.chart, d = {xAxis: [], yAxis: []};
            c.polar ? x(c.axes, function (a) {
                var e = a.isXAxis, f = a.center, n = b.chartX - f[0] - c.plotLeft,
                    f = b.chartY - f[1] - c.plotTop;
                d[e ? "xAxis" : "yAxis"].push({
                    axis: a,
                    value: a.translate(e ? Math.PI - Math.atan2(n, f) : Math.sqrt(Math.pow(n, 2) + Math.pow(f, 2)), !0)
                })
            }) : d = a.call(this, b);
            return d
        })
    })();
    O(V, {
        Color: Oa,
        Point: ya,
        Tick: Ea,
        Renderer: Pa,
        SVGElement: ka,
        SVGRenderer: Pa,
        arrayMin: M,
        arrayMax: fa,
        charts: ra,
        dateFormat: va,
        error: Aa,
        format: n,
        pathAnim: Hb,
        getOptions: function () {
            return ma
        },
        hasBidiBug: ec,
        isTouchDevice: hb,
        setOptions: function (a) {
            ma = r(!0, ma, a);
            Ya();
            return ma
        },
        addEvent: X,
        removeEvent: pa,
        createElement: E,
        discardElement: Ja,
        css: A,
        each: x,
        map: Ga,
        merge: r,
        splat: B,
        extendClass: R,
        pInt: C,
        svg: ua,
        canvas: Fa,
        vml: !ua && !Fa,
        product: "Highcharts 4.1.9",
        version: "/Highstock 2.1.9"
    })
})();
(function (r) {
    var C = r.getOptions(), ia = C.plotOptions, Y = r.seriesTypes, P = r.merge, T = function () {
    }, J = r.each, p = r.pick;
    ia.funnel = P(ia.pie, {
        animation: !1,
        center: ["50%", "50%"],
        width: "90%",
        neckWidth: "30%",
        height: "100%",
        neckHeight: "25%",
        reversed: !1,
        dataLabels: {connectorWidth: 1, connectorColor: "#606060"},
        size: !0,
        states: {select: {color: "#C0C0C0", borderColor: "#000000", shadow: !1}}
    });
    Y.funnel = r.extendClass(Y.pie, {
        type: "funnel", animate: T, translate: function () {
            var p = function (n, v) {
                return /%$/.test(n) ? v * parseInt(n, 10) / 100 :
                    parseInt(n, 10)
            }, t = 0, r = this.chart, B = this.options, A = B.reversed, E = B.ignoreHiddenPoint, R = r.plotWidth, oa = r.plotHeight, C = 0, r = B.center, U = p(r[0], R), n = p(r[1], oa), v = p(B.width, R), Q, N, M = p(B.height, oa), fa = p(B.neckWidth, R), ba = p(B.neckHeight, oa), Ja = M - ba, p = this.data, P, Y, ia = "left" === B.dataLabels.position ? 1 : 0, Ya, ka, Ea, Ka, wa, Ra, Ba;
            this.getWidthAt = N = function (n) {
                return n > M - ba || M === ba ? fa : fa + (M - ba - n) / (M - ba) * (v - fa)
            };
            this.getX = function (n, v) {
                return U + (v ? -1 : 1) * (N(A ? oa - n : n) / 2 + B.dataLabels.distance)
            };
            this.center = [U, n, M];
            this.centerX =
                U;
            J(p, function (n) {
                E && !1 === n.visible || (t += n.y)
            });
            J(p, function (v) {
                Ba = null;
                Y = t ? v.y / t : 0;
                ka = n - M / 2 + C * M;
                wa = ka + Y * M;
                Q = N(ka);
                Ya = U - Q / 2;
                Ea = Ya + Q;
                Q = N(wa);
                Ka = U - Q / 2;
                Ra = Ka + Q;
                ka > Ja ? (Ya = Ka = U - fa / 2, Ea = Ra = U + fa / 2) : wa > Ja && (Ba = wa, Q = N(Ja), Ka = U - Q / 2, Ra = Ka + Q, wa = Ja);
                A && (ka = M - ka, wa = M - wa, Ba = Ba ? M - Ba : null);
                P = ["M", Ya, ka, "L", Ea, ka, Ra, wa];
                Ba && P.push(Ra, Ba, Ka, Ba);
                P.push(Ka, wa, "Z");
                v.shapeType = "path";
                v.shapeArgs = {d: P};
                v.percentage = 100 * Y;
                v.plotX = U;
                v.plotY = (ka + (Ba || wa)) / 2;
                v.tooltipPos = [U, v.plotY];
                v.slice = T;
                v.half = ia;
                E && !1 === v.visible || (C +=
                    Y)
            })
        }, drawPoints: function () {
            var q = this, t = q.options, r = q.chart.renderer;
            J(q.data, function (B) {
                var A = B.options, E = B.graphic, R = B.shapeArgs;
                E ? E.animate(R) : B.graphic = r.path(R).attr({
                    fill: B.color,
                    stroke: p(A.borderColor, t.borderColor),
                    "stroke-width": p(A.borderWidth, t.borderWidth)
                }).add(q.group)
            })
        }, sortByAngle: function (p) {
            p.sort(function (p, q) {
                return p.plotY - q.plotY
            })
        }, drawDataLabels: function () {
            var p = this.data, t = this.options.dataLabels.distance, r, B, A, E = p.length, R, J;
            for (this.center[2] -= 2 * t; E--;)A = p[E], B = (r = A.half) ?
                1 : -1, J = A.plotY, R = this.getX(J, r), A.labelPos = [0, J, R + (t - 5) * B, J, R + t * B, J, r ? "right" : "left", 0];
            Y.pie.prototype.drawDataLabels.call(this)
        }
    });
    C.plotOptions.pyramid = r.merge(C.plotOptions.funnel, {neckWidth: "0%", neckHeight: "0%", reversed: !0});
    r.seriesTypes.pyramid = r.extendClass(r.seriesTypes.funnel, {type: "pyramid"})
})(Highcharts);
(function (r) {
    var C = r.each, ia = r.pick, Y = HighchartsAdapter.inArray, P = r.splat, T, J = function (p, q) {
        this.init(p, q)
    };
    r.extend(J.prototype, {
        init: function (p, q) {
            this.options = p;
            this.chartOptions = q;
            this.columns = p.columns || this.rowsToColumns(p.rows) || [];
            this.firstRowAsNames = ia(p.firstRowAsNames, !0);
            this.decimalRegex = p.decimalPoint && new RegExp("^([0-9]+)" + p.decimalPoint + "([0-9]+)$");
            this.rawColumns = [];
            this.columns.length ? this.dataFound() : (this.parseCSV(), this.parseTable(), this.parseGoogleSpreadsheet())
        }, getColumnDistribution: function () {
            var p =
                this.chartOptions, q = this.options, t = [], F = function (p) {
                return (r.seriesTypes[p || "line"].prototype.pointArrayMap || [0]).length
            }, B = p && p.chart && p.chart.type, A = [], E = [], R = 0, J;
            C(p && p.series || [], function (p) {
                A.push(F(p.type || B))
            });
            C(q && q.seriesMapping || [], function (p) {
                t.push(p.x || 0)
            });
            0 === t.length && t.push(0);
            C(q && q.seriesMapping || [], function (q) {
                var t = new T, n, v = A[R] || F(B), Q = r.seriesTypes[((p && p.series || [])[R] || {}).type || B || "line"].prototype.pointArrayMap || ["y"];
                t.addColumnReader(q.x, "x");
                for (n in q)q.hasOwnProperty(n) &&
                "x" !== n && t.addColumnReader(q[n], n);
                for (J = 0; J < v; J++)t.hasReader(Q[J]) || t.addColumnReader(void 0, Q[J]);
                E.push(t);
                R++
            });
            q = r.seriesTypes[B || "line"].prototype.pointArrayMap;
            void 0 === q && (q = ["y"]);
            this.valueCount = {global: F(B), xColumns: t, individual: A, seriesBuilders: E, globalPointArrayMap: q}
        }, dataFound: function () {
            this.options.switchRowsAndColumns && (this.columns = this.rowsToColumns(this.columns));
            this.getColumnDistribution();
            this.parseTypes();
            !1 !== this.parsed() && this.complete()
        }, parseCSV: function () {
            var p = this,
                q = this.options, t = q.csv, r = this.columns, B = q.startRow || 0, A = q.endRow || Number.MAX_VALUE, E = q.startColumn || 0, J = q.endColumn || Number.MAX_VALUE, oa, P, U = 0;
            t && (P = t.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split(q.lineDelimiter || "\n"), oa = q.itemDelimiter || (-1 !== t.indexOf("\t") ? "\t" : ","), C(P, function (n, v) {
                var q = p.trim(n), t = 0 === q.indexOf("#");
                v >= B && v <= A && !t && "" !== q && (q = n.split(oa), C(q, function (n, v) {
                    v >= E && v <= J && (r[v - E] || (r[v - E] = []), r[v - E][U] = n)
                }), U += 1)
            }), this.dataFound())
        }, parseTable: function () {
            var p = this.options,
                q = p.table, t = this.columns, r = p.startRow || 0, B = p.endRow || Number.MAX_VALUE, A = p.startColumn || 0, E = p.endColumn || Number.MAX_VALUE;
            q && ("string" === typeof q && (q = document.getElementById(q)), C(q.getElementsByTagName("tr"), function (p, q) {
                q >= r && q <= B && C(p.children, function (p, B) {
                    ("TD" === p.tagName || "TH" === p.tagName) && B >= A && B <= E && (t[B - A] || (t[B - A] = []), t[B - A][q - r] = p.innerHTML)
                })
            }), this.dataFound())
        }, parseGoogleSpreadsheet: function () {
            var p = this, q = this.options, t = q.googleSpreadsheetKey, r = this.columns, B = q.startRow || 0, A = q.endRow ||
                Number.MAX_VALUE, E = q.startColumn || 0, J = q.endColumn || Number.MAX_VALUE, C, P;
            t && jQuery.ajax({
                dataType: "json",
                url: "https://spreadsheets.google.com/feeds/cells/" + t + "/" + (q.googleSpreadsheetWorksheet || "od6") + "/public/values?alt=json-in-script&callback=?",
                error: q.error,
                success: function (q) {
                    q = q.feed.entry;
                    var n, v = q.length, t = 0, N = 0, M;
                    for (M = 0; M < v; M++)n = q[M], t = Math.max(t, n.gs$cell.col), N = Math.max(N, n.gs$cell.row);
                    for (M = 0; M < t; M++)M >= E && M <= J && (r[M - E] = [], r[M - E].length = Math.min(N, A - B));
                    for (M = 0; M < v; M++)n = q[M], C = n.gs$cell.row -
                        1, P = n.gs$cell.col - 1, P >= E && P <= J && C >= B && C <= A && (r[P - E][C - B] = n.content.$t);
                    p.dataFound()
                }
            })
        }, trim: function (p, q) {
            "string" === typeof p && (p = p.replace(/^\s+|\s+$/g, ""), q && /^[0-9\s]+$/.test(p) && (p = p.replace(/\s/g, "")), this.decimalRegex && (p = p.replace(this.decimalRegex, "$1.$2")));
            return p
        }, parseTypes: function () {
            for (var p = this.columns, q = p.length; q--;)this.parseColumn(p[q], q)
        }, parseColumn: function (p, q) {
            var t = this.rawColumns, r = this.columns, B = p.length, A, E, J, C, T = this.firstRowAsNames, U = -1 !== Y(q, this.valueCount.xColumns),
                n = [], v = this.chartOptions, Q, N = (this.options.columnTypes || [])[q], v = U && (v && v.xAxis && "category" === P(v.xAxis)[0].type || "string" === N);
            for (t[q] || (t[q] = []); B--;)A = n[B] || p[B], J = this.trim(A), C = this.trim(A, !0), E = parseFloat(C), void 0 === t[q][B] && (t[q][B] = J), v || 0 === B && T ? p[B] = J : +C === E ? (p[B] = E, 31536E6 < E && "float" !== N ? p.isDatetime = !0 : p.isNumeric = !0, void 0 !== p[B + 1] && (Q = E > p[B + 1])) : (E = this.parseDate(A), U && "number" === typeof E && !isNaN(E) && "float" !== N ? (n[B] = A, p[B] = E, p.isDatetime = !0, void 0 !== p[B + 1] && (A = E > p[B + 1], A !== Q && void 0 !==
            Q && (this.alternativeFormat ? (this.dateFormat = this.alternativeFormat, B = p.length, this.alternativeFormat = this.dateFormats[this.dateFormat].alternative) : p.unsorted = !0), Q = A)) : (p[B] = "" === J ? null : J, 0 !== B && (p.isDatetime || p.isNumeric) && (p.mixed = !0)));
            U && p.mixed && (r[q] = t[q]);
            if (U && Q && this.options.sort)for (q = 0; q < r.length; q++)r[q].reverse(), T && r[q].unshift(r[q].pop())
        }, dateFormats: {
            "YYYY-mm-dd": {
                regex: /^([0-9]{4})[\-\/\.]([0-9]{2})[\-\/\.]([0-9]{2})$/, parser: function (p) {
                    return Date.UTC(+p[1], p[2] - 1, +p[3])
                }
            }, "dd/mm/YYYY": {
                regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/,
                parser: function (p) {
                    return Date.UTC(+p[3], p[2] - 1, +p[1])
                }, alternative: "mm/dd/YYYY"
            }, "mm/dd/YYYY": {
                regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/, parser: function (p) {
                    return Date.UTC(+p[3], p[1] - 1, +p[2])
                }
            }, "dd/mm/YY": {
                regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/, parser: function (p) {
                    return Date.UTC(+p[3] + 2E3, p[2] - 1, +p[1])
                }, alternative: "mm/dd/YY"
            }, "mm/dd/YY": {
                regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/, parser: function (p) {
                    return Date.UTC(+p[3] + 2E3, p[1] - 1, +p[2])
                }
            }
        },
        parseDate: function (p) {
            var q = this.options.parseDate, t, r, B = this.options.dateFormat || this.dateFormat, A;
            if (q)t = q(p); else if ("string" === typeof p) {
                if (B)q = this.dateFormats[B], (A = p.match(q.regex)) && (t = q.parser(A)); else for (r in this.dateFormats)if (q = this.dateFormats[r], A = p.match(q.regex)) {
                    this.dateFormat = r;
                    this.alternativeFormat = q.alternative;
                    t = q.parser(A);
                    break
                }
                A || (A = Date.parse(p), "object" === typeof A && null !== A && A.getTime ? t = A.getTime() - 6E4 * A.getTimezoneOffset() : "number" !== typeof A || isNaN(A) || (t = A - 6E4 * (new Date(A)).getTimezoneOffset()))
            }
            return t
        },
        rowsToColumns: function (p) {
            var q, t, r, B, A;
            if (p)for (A = [], t = p.length, q = 0; q < t; q++)for (B = p[q].length, r = 0; r < B; r++)A[r] || (A[r] = []), A[r][q] = p[q][r];
            return A
        }, parsed: function () {
            if (this.options.parsed)return this.options.parsed.call(this, this.columns)
        }, getFreeIndexes: function (p, q) {
            var t, r, B = [], A = [], E;
            for (r = 0; r < p; r += 1)B.push(!0);
            for (t = 0; t < q.length; t += 1)for (E = q[t].getReferencedColumnIndexes(), r = 0; r < E.length; r += 1)B[E[r]] = !1;
            for (r = 0; r < B.length; r += 1)B[r] && A.push(r);
            return A
        }, complete: function () {
            var p = this.columns,
                q, t = this.options, r, B, A, E, J = [], C;
            if (t.complete || t.afterComplete) {
                for (A = 0; A < p.length; A++)this.firstRowAsNames && (p[A].name = p[A].shift());
                r = [];
                B = this.getFreeIndexes(p.length, this.valueCount.seriesBuilders);
                for (A = 0; A < this.valueCount.seriesBuilders.length; A++)C = this.valueCount.seriesBuilders[A], C.populateColumns(B) && J.push(C);
                for (; 0 < B.length;) {
                    C = new T;
                    C.addColumnReader(0, "x");
                    A = Y(0, B);
                    -1 !== A && B.splice(A, 1);
                    for (A = 0; A < this.valueCount.global; A++)C.addColumnReader(void 0, this.valueCount.globalPointArrayMap[A]);
                    C.populateColumns(B) && J.push(C)
                }
                0 < J.length && 0 < J[0].readers.length && (C = p[J[0].readers[0].columnIndex], void 0 !== C && (C.isDatetime ? q = "datetime" : C.isNumeric || (q = "category")));
                if ("category" === q)for (A = 0; A < J.length; A++)for (C = J[A], B = 0; B < C.readers.length; B++)"x" === C.readers[B].configName && (C.readers[B].configName = "name");
                for (A = 0; A < J.length; A++) {
                    C = J[A];
                    B = [];
                    for (E = 0; E < p[0].length; E++)B[E] = C.read(p, E);
                    r[A] = {data: B};
                    C.name && (r[A].name = C.name);
                    "category" === q && (r[A].turboThreshold = 0)
                }
                p = {series: r};
                q && (p.xAxis = {type: q});
                t.complete && t.complete(p);
                t.afterComplete && t.afterComplete(p)
            }
        }
    });
    r.Data = J;
    r.data = function (p, q) {
        return new J(p, q)
    };
    r.wrap(r.Chart.prototype, "init", function (p, q, t) {
        var J = this;
        q && q.data ? r.data(r.extend(q.data, {
            afterComplete: function (B) {
                var A, E;
                if (q.hasOwnProperty("series"))if ("object" === typeof q.series)for (A = Math.max(q.series.length, B.series.length); A--;)E = q.series[A] || {}, q.series[A] = r.merge(E, B.series[A]); else delete q.series;
                q = r.merge(B, q);
                p.call(J, q, t)
            }
        }), q) : p.call(J, q, t)
    });
    T = function () {
        this.readers =
            [];
        this.pointIsArray = !0
    };
    T.prototype.populateColumns = function (p) {
        var q = !0;
        C(this.readers, function (q) {
            void 0 === q.columnIndex && (q.columnIndex = p.shift())
        });
        C(this.readers, function (p) {
            void 0 === p.columnIndex && (q = !1)
        });
        return q
    };
    T.prototype.read = function (p, q) {
        var t = this.pointIsArray, r = t ? [] : {}, B;
        C(this.readers, function (A) {
            var B = p[A.columnIndex][q];
            t ? r.push(B) : r[A.configName] = B
        });
        void 0 === this.name && 2 <= this.readers.length && (B = this.getReferencedColumnIndexes(), 2 <= B.length && (B.shift(), B.sort(), this.name = p[B.shift()].name));
        return r
    };
    T.prototype.addColumnReader = function (p, q) {
        this.readers.push({columnIndex: p, configName: q});
        "x" !== q && "y" !== q && void 0 !== q && (this.pointIsArray = !1)
    };
    T.prototype.getReferencedColumnIndexes = function () {
        var p, q = [], t;
        for (p = 0; p < this.readers.length; p += 1)t = this.readers[p], void 0 !== t.columnIndex && q.push(t.columnIndex);
        return q
    };
    T.prototype.hasReader = function (p) {
        var q, t;
        for (q = 0; q < this.readers.length; q += 1)if (t = this.readers[q], t.configName === p)return !0
    }
})(Highcharts);
(function (r) {
    function C() {
        return !!this.points.length
    }

    function ia() {
        this.hasData() ? this.hideNoData() : this.showNoData()
    }

    var Y = r.seriesTypes, P = r.Chart.prototype, T = r.getOptions(), J = r.extend, p = r.each;
    J(T.lang, {noData: "No data to display"});
    T.noData = {
        position: {x: 0, y: 0, align: "center", verticalAlign: "middle"},
        attr: {},
        style: {fontWeight: "bold", fontSize: "12px", color: "#60606a"}
    };
    p(["pie", "gauge", "waterfall", "bubble"], function (p) {
        Y[p] && (Y[p].prototype.hasData = C)
    });
    r.Series.prototype.hasData = function () {
        return this.visible &&
            void 0 !== this.dataMax && void 0 !== this.dataMin
    };
    P.showNoData = function (p) {
        var t = this.options;
        p = p || t.lang.noData;
        t = t.noData;
        this.noDataLabel || (this.noDataLabel = this.renderer.label(p, 0, 0, null, null, null, t.useHTML, null, "no-data").attr(t.attr).css(t.style).add(), this.noDataLabel.align(J(this.noDataLabel.getBBox(), t.position), !1, "plotBox"))
    };
    P.hideNoData = function () {
        this.noDataLabel && (this.noDataLabel = this.noDataLabel.destroy())
    };
    P.hasData = function () {
        for (var p = this.series, t = p.length; t--;)if (p[t].hasData() && !p[t].options.isInternal)return !0;
        return !1
    };
    P.callbacks.push(function (p) {
        r.addEvent(p, "load", ia);
        r.addEvent(p, "redraw", ia)
    })
})(Highcharts);
(function (r) {
    function C(n, v, p) {
        var q;
        v.rgba.length && n.rgba.length ? (n = n.rgba, v = v.rgba, q = 1 !== v[3] || 1 !== n[3], n = (q ? "rgba(" : "rgb(") + Math.round(v[0] + (n[0] - v[0]) * (1 - p)) + "," + Math.round(v[1] + (n[1] - v[1]) * (1 - p)) + "," + Math.round(v[2] + (n[2] - v[2]) * (1 - p)) + (q ? "," + (v[3] + (n[3] - v[3]) * (1 - p)) : "") + ")") : n = v.raw || "none";
        return n
    }

    var ia = function () {
        }, Y = r.getOptions(), P = r.each, T = r.extend, J = r.format, p = r.pick, q = r.wrap, t = r.Chart, F = r.seriesTypes, B = F.pie, A = F.column, E = r.Tick, R = HighchartsAdapter.fireEvent, oa = HighchartsAdapter.inArray,
        za = 1;
    P(["fill", "stroke"], function (n) {
        HighchartsAdapter.addAnimSetter(n, function (v) {
            v.elem.attr(n, C(r.Color(v.start), r.Color(v.end), v.pos))
        })
    });
    T(Y.lang, {drillUpText: "\u25c1 Back to {series.name}"});
    Y.drilldown = {
        activeAxisLabelStyle: {
            cursor: "pointer",
            color: "#0d233a",
            fontWeight: "bold",
            textDecoration: "underline"
        },
        activeDataLabelStyle: {cursor: "pointer", color: "#0d233a", fontWeight: "bold", textDecoration: "underline"},
        animation: {duration: 500},
        drillUpButton: {position: {align: "right", x: -10, y: 10}}
    };
    r.SVGRenderer.prototype.Element.prototype.fadeIn =
        function (n) {
            this.attr({
                opacity: .1,
                visibility: "inherit"
            }).animate({opacity: p(this.newOpacity, 1)}, n || {duration: 250})
        };
    t.prototype.addSeriesAsDrilldown = function (n, v) {
        this.addSingleSeriesAsDrilldown(n, v);
        this.applyDrilldown()
    };
    t.prototype.addSingleSeriesAsDrilldown = function (n, v) {
        var p = n.series, q = p.xAxis, t = p.yAxis, r;
        r = n.color || p.color;
        var A, B = [], J = [], E, F;
        this.drilldownLevels || (this.drilldownLevels = []);
        E = p.options._levelNumber || 0;
        (F = this.drilldownLevels[this.drilldownLevels.length - 1]) && F.levelNumber !==
        E && (F = void 0);
        v = T({color: r, _ddSeriesId: za++}, v);
        A = oa(n, p.points);
        P(p.chart.series, function (n) {
            n.xAxis !== q || n.isDrilling || (n.options._ddSeriesId = n.options._ddSeriesId || za++, n.options._colorIndex = n.userOptions._colorIndex, n.options._levelNumber = n.options._levelNumber || E, F ? (B = F.levelSeries, J = F.levelSeriesOptions) : (B.push(n), J.push(n.options)))
        });
        r = {
            levelNumber: E,
            seriesOptions: p.options,
            levelSeriesOptions: J,
            levelSeries: B,
            shapeArgs: n.shapeArgs,
            bBox: n.graphic ? n.graphic.getBBox() : {},
            color: r,
            lowerSeriesOptions: v,
            pointOptions: p.options.data[A],
            pointIndex: A,
            oldExtremes: {xMin: q && q.userMin, xMax: q && q.userMax, yMin: t && t.userMin, yMax: t && t.userMax}
        };
        this.drilldownLevels.push(r);
        r = r.lowerSeries = this.addSeries(v, !1);
        r.options._levelNumber = E + 1;
        q && (q.oldPos = q.pos, q.userMin = q.userMax = null, t.userMin = t.userMax = null);
        p.type === r.type && (r.animate = r.animateDrilldown || ia, r.options.animation = !0)
    };
    t.prototype.applyDrilldown = function () {
        var n = this.drilldownLevels, v;
        n && 0 < n.length && (v = n[n.length - 1].levelNumber, P(this.drilldownLevels,
            function (n) {
                n.levelNumber === v && P(n.levelSeries, function (n) {
                    n.options && n.options._levelNumber === v && n.remove(!1)
                })
            }));
        this.redraw();
        this.showDrillUpButton()
    };
    t.prototype.getDrilldownBackText = function () {
        var n = this.drilldownLevels;
        if (n && 0 < n.length)return n = n[n.length - 1], n.series = n.seriesOptions, J(this.options.lang.drillUpText, n)
    };
    t.prototype.showDrillUpButton = function () {
        var n = this, v = this.getDrilldownBackText(), p = n.options.drilldown.drillUpButton, q, r;
        this.drillUpButton ? this.drillUpButton.attr({text: v}).align() :
            (r = (q = p.theme) && q.states, this.drillUpButton = this.renderer.button(v, null, null, function () {
                n.drillUp()
            }, q, r && r.hover, r && r.select).attr({
                align: p.position.align,
                zIndex: 9
            }).add().align(p.position, !1, p.relativeTo || "plotBox"))
    };
    t.prototype.drillUp = function () {
        for (var n = this, v = n.drilldownLevels, p = v[v.length - 1].levelNumber, q = v.length, r = n.series, t, A, B, E, J = function (v) {
            var p;
            P(r, function (n) {
                n.options._ddSeriesId === v._ddSeriesId && (p = n)
            });
            p = p || n.addSeries(v, !1);
            p.type === B.type && p.animateDrillupTo && (p.animate = p.animateDrillupTo);
            v === A.seriesOptions && (E = p)
        }; q--;)if (A = v[q], A.levelNumber === p) {
            v.pop();
            B = A.lowerSeries;
            if (!B.chart)for (t = r.length; t--;)if (r[t].options.id === A.lowerSeriesOptions.id && r[t].options._levelNumber === p + 1) {
                B = r[t];
                break
            }
            B.xData = [];
            P(A.levelSeriesOptions, J);
            R(n, "drillup", {seriesOptions: A.seriesOptions});
            E.type === B.type && (E.drilldownLevel = A, E.options.animation = n.options.drilldown.animation, B.animateDrillupFrom && B.chart && B.animateDrillupFrom(A));
            E.options._levelNumber = p;
            B.remove(!1);
            E.xAxis && (t = A.oldExtremes,
                E.xAxis.setExtremes(t.xMin, t.xMax, !1), E.yAxis.setExtremes(t.yMin, t.yMax, !1))
        }
        this.redraw();
        0 === this.drilldownLevels.length ? this.drillUpButton = this.drillUpButton.destroy() : this.drillUpButton.attr({text: this.getDrilldownBackText()}).align();
        this.ddDupes.length = []
    };
    A.prototype.supportsDrilldown = !0;
    A.prototype.animateDrillupTo = function (n) {
        if (!n) {
            var v = this, p = v.drilldownLevel;
            P(this.points, function (n) {
                n.graphic && n.graphic.hide();
                n.dataLabel && n.dataLabel.hide();
                n.connector && n.connector.hide()
            });
            setTimeout(function () {
                v.points &&
                P(v.points, function (n, v) {
                    var q = v === (p && p.pointIndex) ? "show" : "fadeIn", r = "show" === q ? !0 : void 0;
                    if (n.graphic)n.graphic[q](r);
                    if (n.dataLabel)n.dataLabel[q](r);
                    if (n.connector)n.connector[q](r)
                })
            }, Math.max(this.chart.options.drilldown.animation.duration - 50, 0));
            this.animate = ia
        }
    };
    A.prototype.animateDrilldown = function (n) {
        var v = this, q = this.chart.drilldownLevels, r, t = this.chart.options.drilldown.animation, A = this.xAxis;
        n || (P(q, function (n) {
            v.options._ddSeriesId === n.lowerSeriesOptions._ddSeriesId && (r = n.shapeArgs,
                r.fill = n.color)
        }), r.x += p(A.oldPos, A.pos) - A.pos, P(this.points, function (n) {
            n.graphic && n.graphic.attr(r).animate(T(n.shapeArgs, {fill: n.color}), t);
            n.dataLabel && n.dataLabel.fadeIn(t)
        }), this.animate = null)
    };
    A.prototype.animateDrillupFrom = function (n) {
        var v = this.chart.options.drilldown.animation, p = this.group, q = this;
        P(q.trackerGroups, function (n) {
            if (q[n])q[n].on("mouseover")
        });
        delete this.group;
        P(this.points, function (q) {
            var t = q.graphic, A = function () {
                t.destroy();
                p && (p = p.destroy())
            };
            t && (delete q.graphic, v ? t.animate(T(n.shapeArgs,
                {fill: n.color}), r.merge(v, {complete: A})) : (t.attr(n.shapeArgs), A()))
        })
    };
    B && T(B.prototype, {
        supportsDrilldown: !0,
        animateDrillupTo: A.prototype.animateDrillupTo,
        animateDrillupFrom: A.prototype.animateDrillupFrom,
        animateDrilldown: function (n) {
            var v = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1], p = this.chart.options.drilldown.animation, q = v.shapeArgs, t = q.start, A = (q.end - t) / this.points.length;
            n || (P(this.points, function (n, B) {
                n.graphic.attr(r.merge(q, {start: t + B * A, end: t + (B + 1) * A, fill: v.color}))[p ?
                    "animate" : "attr"](T(n.shapeArgs, {fill: n.color}), p)
            }), this.animate = null)
        }
    });
    r.Point.prototype.doDrilldown = function (n, v) {
        var p = this.series.chart, q = p.options.drilldown, r = (q.series || []).length, t;
        p.ddDupes || (p.ddDupes = []);
        for (; r-- && !t;)q.series[r].id === this.drilldown && -1 === oa(this.drilldown, p.ddDupes) && (t = q.series[r], p.ddDupes.push(this.drilldown));
        R(p, "drilldown", {
            point: this,
            seriesOptions: t,
            category: v,
            points: void 0 !== v && this.series.xAxis.ddPoints[v].slice(0)
        });
        t && (n ? p.addSingleSeriesAsDrilldown(this,
            t) : p.addSeriesAsDrilldown(this, t))
    };
    r.Axis.prototype.drilldownCategory = function (n) {
        var v, p, q = this.ddPoints[n];
        for (v in q)(p = q[v]) && p.series && p.series.visible && p.doDrilldown && p.doDrilldown(!0, n);
        this.chart.applyDrilldown()
    };
    r.Axis.prototype.getDDPoints = function (n, v) {
        var p = this.ddPoints;
        p || (this.ddPoints = p = {});
        p[n] || (p[n] = []);
        p[n].levelNumber !== v && (p[n].length = 0);
        return p[n]
    };
    E.prototype.drillable = function () {
        var n = this.pos, v = this.label, p = this.axis, q = p.ddPoints && p.ddPoints[n];
        v && q && q.length ? (v.basicStyles ||
        (v.basicStyles = r.merge(v.styles)), v.addClass("highcharts-drilldown-axis-label").css(p.chart.options.drilldown.activeAxisLabelStyle).on("click", function () {
            p.drilldownCategory(n)
        })) : v && v.basicStyles && (v.styles = {}, v.css(v.basicStyles), v.on("click", null))
    };
    q(E.prototype, "addLabel", function (n) {
        n.call(this);
        this.drillable()
    });
    q(r.Point.prototype, "init", function (n, v, p, q) {
        var t = n.call(this, v, p, q);
        n = (p = v.xAxis) && p.ticks[q];
        p = p && p.getDDPoints(q, v.options._levelNumber);
        t.drilldown && (r.addEvent(t, "click", function () {
            v.xAxis &&
            !1 === v.chart.options.drilldown.allowPointDrilldown ? v.xAxis.drilldownCategory(q) : t.doDrilldown()
        }), p && (p.push(t), p.levelNumber = v.options._levelNumber));
        n && n.drillable();
        return t
    });
    q(r.Series.prototype, "drawDataLabels", function (n) {
        var p = this.chart.options.drilldown.activeDataLabelStyle;
        n.call(this);
        P(this.points, function (n) {
            n.drilldown && n.dataLabel && n.dataLabel.attr({"class": "highcharts-drilldown-data-label"}).css(p)
        })
    });
    var U, Y = function (n) {
        n.call(this);
        P(this.points, function (n) {
            n.drilldown && n.graphic &&
            n.graphic.attr({"class": "highcharts-drilldown-point"}).css({cursor: "pointer"})
        })
    };
    for (U in F)F[U].prototype.supportsDrilldown && q(F[U].prototype, "drawTracker", Y)
})(Highcharts);
(function (r) {
    var C = r.getOptions().plotOptions, ia = r.pInt, Y = r.pick, P = r.each, T;
    C.solidgauge = r.merge(C.gauge, {colorByPoint: !0});
    T = {
        initDataClasses: function (J) {
            var p = this, q = this.chart, t, F = 0, B = this.options;
            this.dataClasses = t = [];
            P(J.dataClasses, function (A, E) {
                var C;
                A = r.merge(A);
                t.push(A);
                A.color || ("category" === B.dataClassColor ? (C = q.options.colors, A.color = C[F++], F === C.length && (F = 0)) : A.color = p.tweenColors(r.Color(B.minColor), r.Color(B.maxColor), E / (J.dataClasses.length - 1)))
            })
        }, initStops: function (J) {
            this.stops =
                J.stops || [[0, this.options.minColor], [1, this.options.maxColor]];
            P(this.stops, function (p) {
                p.color = r.Color(p[1])
            })
        }, toColor: function (r, p) {
            var q, t = this.stops, F, B = this.dataClasses, A, E;
            if (B)for (E = B.length; E--;) {
                if (A = B[E], F = A.from, t = A.to, (void 0 === F || r >= F) && (void 0 === t || r <= t)) {
                    q = A.color;
                    p && (p.dataClass = E);
                    break
                }
            } else {
                this.isLog && (r = this.val2lin(r));
                q = 1 - (this.max - r) / (this.max - this.min);
                for (E = t.length; E-- && !(q > t[E][0]););
                F = t[E] || t[E + 1];
                t = t[E + 1] || F;
                q = 1 - (t[0] - q) / (t[0] - F[0] || 1);
                q = this.tweenColors(F.color, t.color,
                    q)
            }
            return q
        }, tweenColors: function (r, p, q) {
            var t;
            p.rgba.length && r.rgba.length ? (r = r.rgba, p = p.rgba, t = 1 !== p[3] || 1 !== r[3], r = (t ? "rgba(" : "rgb(") + Math.round(p[0] + (r[0] - p[0]) * (1 - q)) + "," + Math.round(p[1] + (r[1] - p[1]) * (1 - q)) + "," + Math.round(p[2] + (r[2] - p[2]) * (1 - q)) + (t ? "," + (p[3] + (r[3] - p[3]) * (1 - q)) : "") + ")") : r = p.raw || "none";
            return r
        }
    };
    P(["fill", "stroke"], function (C) {
        HighchartsAdapter.addAnimSetter(C, function (p) {
            p.elem.attr(C, T.tweenColors(r.Color(p.start), r.Color(p.end), p.pos))
        })
    });
    r.seriesTypes.solidgauge = r.extendClass(r.seriesTypes.gauge,
        {
            type: "solidgauge", pointAttrToOptions: {}, bindAxes: function () {
            var C;
            r.seriesTypes.gauge.prototype.bindAxes.call(this);
            C = this.yAxis;
            r.extend(C, T);
            C.options.dataClasses && C.initDataClasses(C.options);
            C.initStops(C.options)
        }, drawPoints: function () {
            var C = this, p = C.yAxis, q = p.center, t = C.options, F = C.chart.renderer, B = t.overshoot, A = B && "number" === typeof B ? B / 180 * Math.PI : 0;
            r.each(C.points, function (r) {
                var B = r.graphic, P = p.startAngleRad + p.translate(r.y, null, null, null, !0), T = ia(Y(r.options.radius, t.radius, 100)) * q[2] /
                    200, U = ia(Y(r.options.innerRadius, t.innerRadius, 60)) * q[2] / 200, n = p.toColor(r.y, r), v = Math.min(p.startAngleRad, p.endAngleRad), Q = Math.max(p.startAngleRad, p.endAngleRad);
                "none" === n && (n = r.color || C.color || "none");
                "none" !== n && (r.color = n);
                P = Math.max(v - A, Math.min(Q + A, P));
                !1 === t.wrap && (P = Math.max(v, Math.min(Q, P)));
                v = Math.min(P, p.startAngleRad);
                P = Math.max(P, p.startAngleRad);
                P - v > 2 * Math.PI && (P = v + 2 * Math.PI);
                r.shapeArgs = U = {x: q[0], y: q[1], r: T, innerR: U, start: v, end: P, fill: n};
                r.startR = T;
                B ? (r = U.d, B.animate(U), r && (U.d = r)) :
                    r.graphic = F.arc(U).attr({
                        stroke: t.borderColor || "none",
                        "stroke-width": t.borderWidth || 0,
                        fill: n,
                        "sweep-flag": 0
                    }).add(C.group)
            })
        }, animate: function (C) {
            C || (this.startAngleRad = this.yAxis.startAngleRad, r.seriesTypes.pie.prototype.animate.call(this, C))
        }
        })
})(Highcharts);
(function (r) {
    var C = r.Axis, ia = r.Chart, Y = r.Color, P = r.Legend, T = r.LegendSymbolMixin, J = r.Series, p = r.Point, q = r.getOptions(), t = r.each, F = r.extend, B = r.extendClass, A = r.merge, E = r.pick, R = r.seriesTypes, oa = r.wrap, za = function () {
    }, U = r.ColorAxis = function () {
        this.isColorAxis = !0;
        this.init.apply(this, arguments)
    };
    F(U.prototype, C.prototype);
    F(U.prototype, {
        defaultColorAxisOptions: {
            lineWidth: 0,
            minPadding: 0,
            maxPadding: 0,
            gridLineWidth: 1,
            tickPixelInterval: 72,
            startOnTick: !0,
            endOnTick: !0,
            offset: 0,
            marker: {
                animation: {duration: 50},
                color: "gray", width: .01
            },
            labels: {overflow: "justify"},
            minColor: "#EFEFFF",
            maxColor: "#003875",
            tickLength: 5
        }, init: function (n, p) {
            var r = "vertical" !== n.options.legend.layout, q;
            q = A(this.defaultColorAxisOptions, {side: r ? 2 : 1, reversed: !r}, p, {
                opposite: !r,
                showEmpty: !1,
                title: null,
                isColor: !0
            });
            C.prototype.init.call(this, n, q);
            p.dataClasses && this.initDataClasses(p);
            this.initStops(p);
            this.horiz = r;
            this.zoomEnabled = !1
        }, tweenColors: function (n, p, r) {
            var q;
            p.rgba.length && n.rgba.length ? (n = n.rgba, p = p.rgba, q = 1 !== p[3] || 1 !== n[3],
                n = (q ? "rgba(" : "rgb(") + Math.round(p[0] + (n[0] - p[0]) * (1 - r)) + "," + Math.round(p[1] + (n[1] - p[1]) * (1 - r)) + "," + Math.round(p[2] + (n[2] - p[2]) * (1 - r)) + (q ? "," + (p[3] + (n[3] - p[3]) * (1 - r)) : "") + ")") : n = p.raw || "none";
            return n
        }, initDataClasses: function (n) {
            var p = this, r = this.chart, q, B = 0, C = this.options, E = n.dataClasses.length;
            this.dataClasses = q = [];
            this.legendItems = [];
            t(n.dataClasses, function (n, t) {
                var F;
                n = A(n);
                q.push(n);
                n.color || ("category" === C.dataClassColor ? (F = r.options.colors, n.color = F[B++], B === F.length && (B = 0)) : n.color = p.tweenColors(Y(C.minColor),
                    Y(C.maxColor), 2 > E ? .5 : t / (E - 1)))
            })
        }, initStops: function (n) {
            this.stops = n.stops || [[0, this.options.minColor], [1, this.options.maxColor]];
            t(this.stops, function (n) {
                n.color = Y(n[1])
            })
        }, setOptions: function (n) {
            C.prototype.setOptions.call(this, n);
            this.options.crosshair = this.options.marker;
            this.coll = "colorAxis"
        }, setAxisSize: function () {
            var n = this.legendSymbol, p = this.chart, r, q, t;
            n && (this.left = r = n.attr("x"), this.top = q = n.attr("y"), this.width = t = n.attr("width"), this.height = n = n.attr("height"), this.right = p.chartWidth - r -
                t, this.bottom = p.chartHeight - q - n, this.len = this.horiz ? t : n, this.pos = this.horiz ? r : q)
        }, toColor: function (n, p) {
            var r, q = this.stops, t, A = this.dataClasses, B, C;
            if (A)for (C = A.length; C--;) {
                if (B = A[C], t = B.from, q = B.to, (void 0 === t || n >= t) && (void 0 === q || n <= q)) {
                    r = B.color;
                    p && (p.dataClass = C);
                    break
                }
            } else {
                this.isLog && (n = this.val2lin(n));
                r = 1 - (this.max - n) / (this.max - this.min || 1);
                for (C = q.length; C-- && !(r > q[C][0]););
                t = q[C] || q[C + 1];
                q = q[C + 1] || t;
                r = 1 - (q[0] - r) / (q[0] - t[0] || 1);
                r = this.tweenColors(t.color, q.color, r)
            }
            return r
        }, getOffset: function () {
            var n =
                this.legendGroup, p = this.chart.axisOffset[this.side];
            n && (this.axisParent = n, C.prototype.getOffset.call(this), this.added || (this.added = !0, this.labelLeft = 0, this.labelRight = this.width), this.chart.axisOffset[this.side] = p)
        }, setLegendColor: function () {
            var n, p = this.options;
            n = this.reversed;
            n = this.horiz ? [+n, 0, +!n, 0] : [0, +!n, 0, +n];
            this.legendColor = {
                linearGradient: {x1: n[0], y1: n[1], x2: n[2], y2: n[3]},
                stops: p.stops || [[0, p.minColor], [1, p.maxColor]]
            }
        }, drawLegendSymbol: function (n, p) {
            var r = n.padding, q = n.options, t = this.horiz,
                A = E(q.symbolWidth, t ? 200 : 12), B = E(q.symbolHeight, t ? 12 : 200), C = E(q.labelPadding, t ? 16 : 30), q = E(q.itemDistance, 10);
            this.setLegendColor();
            p.legendSymbol = this.chart.renderer.rect(0, n.baseline - 11, A, B).attr({zIndex: 1}).add(p.legendGroup);
            p.legendSymbol.getBBox();
            this.legendItemWidth = A + r + (t ? q : C);
            this.legendItemHeight = B + r + (t ? C : 0)
        }, setState: za, visible: !0, setVisible: za, getSeriesExtremes: function () {
            var n;
            this.series.length && (n = this.series[0], this.dataMin = n.valueMin, this.dataMax = n.valueMax)
        }, drawCrosshair: function (n,
                                    p) {
            var r = p && p.plotX, q = p && p.plotY, t, A = this.pos, B = this.len;
            p && (t = this.toPixels(p[p.series.colorKey]), t < A ? t = A - 2 : t > A + B && (t = A + B + 2), p.plotX = t, p.plotY = this.len - t, C.prototype.drawCrosshair.call(this, n, p), p.plotX = r, p.plotY = q, this.cross && this.cross.attr({fill: this.crosshair.color}).add(this.legendGroup))
        }, getPlotLinePath: function (n, p, r, q, t) {
            return "number" === typeof t ? this.horiz ? ["M", t - 4, this.top - 6, "L", t + 4, this.top - 6, t, this.top, "Z"] : ["M", this.left, t, "L", this.left - 6, t + 6, this.left - 6, t - 6, "Z"] : C.prototype.getPlotLinePath.call(this,
                n, p, r, q)
        }, update: function (n, p) {
            var r = this.chart, q = r.legend;
            t(this.series, function (n) {
                n.isDirtyData = !0
            });
            n.dataClasses && q.allItems && (t(q.allItems, function (n) {
                n.isDataClass && n.legendGroup.destroy()
            }), r.isDirtyLegend = !0);
            r.options[this.coll] = A(this.userOptions, n);
            C.prototype.update.call(this, n, p);
            this.legendItem && (this.setLegendColor(), q.colorizeItem(this, !0))
        }, getDataClassLegendSymbols: function () {
            var n = this, p = this.chart, q = this.legendItems, A = p.options.legend, B = A.valueDecimals, C = A.valueSuffix || "", E;
            q.length ||
            t(this.dataClasses, function (A, J) {
                var N = !0, P = A.from, R = A.to;
                E = "";
                void 0 === P ? E = "< " : void 0 === R && (E = "> ");
                void 0 !== P && (E += r.numberFormat(P, B) + C);
                void 0 !== P && void 0 !== R && (E += " - ");
                void 0 !== R && (E += r.numberFormat(R, B) + C);
                q.push(F({
                    chart: p,
                    name: E,
                    options: {},
                    drawLegendSymbol: T.drawRectangle,
                    visible: !0,
                    setState: za,
                    isDataClass: !0,
                    setVisible: function () {
                        N = this.visible = !N;
                        t(n.series, function (n) {
                            t(n.points, function (n) {
                                n.dataClass === J && n.setVisible(N)
                            })
                        });
                        p.legend.colorizeItem(this, N)
                    }
                }, A))
            });
            return q
        }, name: ""
    });
    t(["fill", "stroke"], function (n) {
        HighchartsAdapter.addAnimSetter(n, function (p) {
            p.elem.attr(n, U.prototype.tweenColors(Y(p.start), Y(p.end), p.pos))
        })
    });
    oa(ia.prototype, "getAxes", function (n) {
        var p = this.options.colorAxis;
        n.call(this);
        this.colorAxis = [];
        p && new U(this, p)
    });
    oa(P.prototype, "getAllItems", function (n) {
        var p = [], q = this.chart.colorAxis[0];
        q && (q.options.dataClasses ? p = p.concat(q.getDataClassLegendSymbols()) : p.push(q), t(q.series, function (n) {
            n.options.showInLegend = !1
        }));
        return p.concat(n.call(this))
    });
    ia = {
        pointAttrToOptions: {
            stroke: "borderColor",
            "stroke-width": "borderWidth",
            fill: "color",
            dashstyle: "dashStyle"
        },
        pointArrayMap: ["value"],
        axisTypes: ["xAxis", "yAxis", "colorAxis"],
        optionalAxis: "colorAxis",
        trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
        getSymbol: za,
        parallelArrays: ["x", "y", "value"],
        colorKey: "value",
        translateColors: function () {
            var n = this, p = this.options.nullColor, q = this.colorAxis, r = this.colorKey;
            t(this.data, function (t) {
                var A = t[r];
                if (A = t.options.color || (null === A ? p : q && void 0 !== A ? q.toColor(A,
                            t) : t.color || n.color))t.color = A
            })
        }
    };
    q.plotOptions.heatmap = A(q.plotOptions.scatter, {
        animation: !1,
        borderWidth: 0,
        nullColor: "#F8F8F8",
        dataLabels: {
            formatter: function () {
                return this.point.value
            }, inside: !0, verticalAlign: "middle", crop: !1, overflow: !1, padding: 0
        },
        marker: null,
        pointRange: null,
        tooltip: {pointFormat: "{point.x}, {point.y}: {point.value}<br/>"},
        states: {normal: {animation: !0}, hover: {halo: !1, brightness: .2}}
    });
    R.heatmap = B(R.scatter, A(ia, {
        type: "heatmap",
        pointArrayMap: ["y", "value"],
        hasPointSpecificOptions: !0,
        pointClass: B(p, {
            setVisible: function (n) {
                var p = this, q = n ? "show" : "hide";
                t(["graphic", "dataLabel"], function (n) {
                    if (p[n])p[n][q]()
                })
            }
        }),
        supportsDrilldown: !0,
        getExtremesFromAll: !0,
        directTouch: !0,
        init: function () {
            var n;
            R.scatter.prototype.init.apply(this, arguments);
            n = this.options;
            this.pointRange = n.pointRange = E(n.pointRange, n.colsize || 1);
            this.yAxis.axisPointRange = n.rowsize || 1
        },
        translate: function () {
            var n = this.options, p = this.xAxis, q = this.yAxis, r = function (n, p, q) {
                return Math.min(Math.max(p, n), q)
            };
            this.generatePoints();
            t(this.points, function (t) {
                var A = (n.colsize || 1) / 2, B = (n.rowsize || 1) / 2, C = r(Math.round(p.len - p.translate(t.x - A, 0, 1, 0, 1)), 0, p.len), A = r(Math.round(p.len - p.translate(t.x + A, 0, 1, 0, 1)), 0, p.len), E = r(Math.round(q.translate(t.y - B, 0, 1, 0, 1)), 0, q.len), B = r(Math.round(q.translate(t.y + B, 0, 1, 0, 1)), 0, q.len);
                t.plotX = t.clientX = (C + A) / 2;
                t.plotY = (E + B) / 2;
                t.shapeType = "rect";
                t.shapeArgs = {x: Math.min(C, A), y: Math.min(E, B), width: Math.abs(A - C), height: Math.abs(B - E)}
            });
            this.translateColors();
            this.chart.hasRendered && t(this.points, function (n) {
                n.shapeArgs.fill =
                    n.options.color || n.color
            })
        },
        drawPoints: R.column.prototype.drawPoints,
        animate: za,
        getBox: za,
        drawLegendSymbol: T.drawRectangle,
        getExtremes: function () {
            J.prototype.getExtremes.call(this, this.valueData);
            this.valueMin = this.dataMin;
            this.valueMax = this.dataMax;
            J.prototype.getExtremes.call(this)
        }
    }))
})(Highcharts);
