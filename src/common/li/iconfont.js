!(function(d) {
  var e,
    c =
      '<svg><symbol id="iconEye" viewBox="0 0 1024 1024"><path d="M512 737.92a32 32 0 0 1-32-32V535.253a32 32 0 0 1 64 0V705.92a32 32 0 0 1-32 32z m247.467-72.107a32 32 0 0 1-22.614-9.386L616.107 535.68a32 32 0 0 1 45.226-45.013L782.08 611.413a32 32 0 0 1-22.613 54.614z m-495.36 0.427a32 32 0 0 1-22.614-54.613l121.174-120.96a32 32 0 0 1 45.226 45.226L287.147 656.64a32 32 0 0 1-23.04 9.6z"  ></path><path d="M512 565.333c-235.947 0-421.973-215.466-429.653-224a32 32 0 0 1 48.64-42.666c1.706 1.92 174.933 202.026 381.013 202.026s379.307-199.466 381.013-202.026a32 32 0 0 1 48.64 42.666c-7.68 8.534-193.706 224-429.653 224z"  ></path></symbol></svg>',
    t = (e = document.getElementsByTagName("script"))[
      e.length - 1
    ].getAttribute("data-injectcss");
  if (t && !d.__iconfont__svg__cssinject__) {
    d.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
      );
    } catch (e) {
      console && console.log(e);
    }
  }
  !(function(e) {
    if (document.addEventListener)
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState))
        setTimeout(e, 0);
      else {
        var t = function() {
          document.removeEventListener("DOMContentLoaded", t, !1), e();
        };
        document.addEventListener("DOMContentLoaded", t, !1);
      }
    else
      document.attachEvent &&
        ((o = e),
        (i = d.document),
        (a = !1),
        (c = function() {
          try {
            i.documentElement.doScroll("left");
          } catch (e) {
            return void setTimeout(c, 50);
          }
          n();
        })(),
        (i.onreadystatechange = function() {
          "complete" == i.readyState && ((i.onreadystatechange = null), n());
        }));
    function n() {
      a || ((a = !0), o());
    }
    var o, i, a, c;
  })(function() {
    var e, t, n, o, i, a;
    ((e = document.createElement("div")).innerHTML = c),
      (c = null),
      (t = e.getElementsByTagName("svg")[0]) &&
        (t.setAttribute("aria-hidden", "true"),
        (t.style.position = "absolute"),
        (t.style.width = 0),
        (t.style.height = 0),
        (t.style.overflow = "hidden"),
        (n = t),
        (o = document.body).firstChild
          ? ((i = n), (a = o.firstChild).parentNode.insertBefore(i, a))
          : o.appendChild(n));
  });
})(window);
