var spd = 1;
var $win = $(window);
var elasticCurve = mojs.easing.path('M0, 100 C13.131828475825143, 94.46990312590648 27.244062244062246, -10.347490347490362 50, -10 C61.755836799889586, -9.820484663895344 67.47423213023549, 11.815811159807817 100, 2.2857142857142856 ');
var fastEasing = mojs.easing.approximate(elasticCurve);

var agent = new(function() {
    var _this = this,
        ua = navigator.userAgent.toLocaleLowerCase();
    _this.ie = (ua.indexOf("msie") != -1) || (ua.indexOf("trident/7") != -1);
    _this.msie = 9999;
    if (document.all) {
        var msieApp = navigator.appVersion.toLowerCase();
        _this.msie = (msieApp.indexOf('msie') > -1) ? parseInt(msieApp.replace(/.*msie[ ]/, '').match(/^[0-9]+/)) : 9000;
    }
});

var View = function() {
    var _this = this;
    _this.set = function() {
        if (typeof(matchMedia) == "function") {
            _this.myView = (window.matchMedia("(max-width:736px)").matches) ? "sp" : "pc";
        } else {
            _this.myView = (window.innerWidth <= 736) ? "sp" : "pc";
        }
    }

    $win.bind("resize", function() {
        _this.set();
    });
    _this.set();
}
var view = new View();

(function() {
    $("<img>").one("load error", function() {
        $(".shadow-main").fadeTo(0, 1);
    }).attr("src", "images/logo_p.png");
})();

var Op = function() {
    var _this = this,
        done = false;

    _this.show = function() {
        _this.setScale();
        $(".copy-main-img img:last, .sholder img").velocity({
            opacity: 0
        }, 0);
        $(".copy-main-img img").not(":last").velocity({
            rotateY: 90,
            scale: .8
        }, 0);
        $(".package-p-main .package-img, .package-r-main .package-img").velocity({
            translateY: -60,
            opacity: 0
        }, 0);
        $(".package-p-main .package-shadow, .package-r-main .package-shadow").velocity({
            scale: 1.2,
            opacity: 0
        }, 0);
        $(".wrap-spoon-main").velocity({
            translateY: 20,
            opacity: 0
        }, 0);

        var i = 0;
        var add = 400;
        if (agent.msie > 9) {
            $(".copy-main-img img").not(":last").fadeTo(0, 1)
            while (i < 17) {
                $(".copy-main-img img").eq(i).velocity({
                    opacity: 1,
                    rotateY: 0,
                    scale: 1
                }, {
                    duration: 3200 * spd,
                    easing: [0.175, 0.885, 0.320, 1.275],
                    delay: 50 * i * spd + add,
                });
                i = (i + 1) | 0;
            }
        } else {
            while (i < 17) {
                $(".copy-main-img img").eq(i).velocity({
                    opacity: 1,
                }, {
                    duration: 3200 * spd,
                    easing: [0.175, 0.885, 0.320, 1.275],
                    delay: 50 * i * spd + add,
                });
                i = (i + 1) | 0;
            }
        }
        $(".copy-main-img img:last").velocity({
            opacity: 1
        }, {
            duration: 1600 * spd,
            delay: 1800 * spd + add,
            easing: [0.390, 0.575, 0.565, 1.000]
        });

        var pkdl = 1400;
        $(".package-p-main .package-shadow").velocity({
            scale: 1,
            opacity: 1
        }, {
            duration: 1200 * spd,
            delay: pkdl * spd,
            easing: [0.230, 1.000, 0.320, 1.000]
        })
        $(".package-r-main .package-shadow").velocity({
            scale: 1,
            opacity: 1
        }, {
            duration: 1200 * spd,
            delay: (pkdl + 200) * spd,
            easing: [0.230, 1.000, 0.320, 1.000]
        })
        var rad = 180 / Math.PI;
        var pkTy = (view.myView == "pc") ? 40 : 40 * $win.width() / 750;
        var objPackage = {
            t: 0
        };
        $(objPackage).delay(pkdl * spd).animate({
            t: 1
        }, {
            duration: 1300 * spd,
            progress: function() {
                $(".package-p-main .package-img").css({
                    transform: "translate(" + 0 + "px," + (-pkTy + pkTy * Math.sin(objPackage.t * 90 / rad)) + "px)",
                    opacity: objPackage.t
                });
            },
            easing: $.bez([0.25, 0.1, 0.017, 0.993])
        });
        var objPackageR = {
            t: 0
        };
        $(objPackageR).delay(pkdl + 200).animate({
            t: 1
        }, {
            duration: 1300 * spd,
            progress: function() {
                $(".package-r-main .package-img").css({
                    transform: "translate(" + 0 + "px," + (-pkTy + pkTy * Math.sin(objPackageR.t * 90 / rad)) + "px)",
                    opacity: objPackageR.t
                });
            },
            easing: $.bez([0.25, 0.1, 0.017, 0.993])
        });

        var obj = {
            t: 0
        };
        var rad = 180 / Math.PI;
        $(obj).delay(1100 * spd).animate({
            t: 1
        }, {
            duration: 1600,
            progress: function() {
                $(".wrap-spoon-main").css({
                    transform: "translate(" + ((1 - obj.t) * 0) + "px," + (-40 * Math.sin(obj.t * 90 / rad)) + "px)",
                    opacity: obj.t
                });
            },
            easing: $.bez([0.25, 0.1, 0.017, 0.993])
        });

        $(".copy-main .text img").velocity({
            opacity: 0,
            translateY: -15,
            rotateX: 0
        }, 0);
        setTimeout(function() {
            $(".copy-main .text").find(".for-sp, .for-pc:eq(1)").velocity({
                // opacity: 1,
                translateY: 0,
                rotateX: 0
            }, {
                queue: false,
                duration: 1000,
                easing: [0.247, 0.073, 0.067, 0.977]
            }).velocity({
                opacity: 1
            }, 600);
        }, 2200);

        setTimeout(function() {
            $(".copy-main .text").find(".for-pc:eq(0)").velocity({
                // opacity: 1,
                translateY: 0,
                rotateX: 0
            }, {
                queue: false,
                duration: 1000,
                easing: [0.247, 0.073, 0.067, 0.977]
            }).velocity({
                opacity: 1
            }, 600);
        }, 2200 + 100);


        var lt = $(".copy-main .inner").width() / 2;
        var lt1 = $(".hash-1").position().left + $(".hash-1").width();
        $(".hash-1").velocity({
            translateX: lt - lt1,
            translateY: 5,
            rotateZ: 30,
            scale: .9,
            opacity: 0
        }, 0);
        $(".hash-2").velocity({
            translateX: -(lt - lt1),
            translateY: 5,
            rotateZ: -30,
            scale: .9,
            opacity: 0
        }, 0);

        setTimeout(function() {
            $(".hash-1, .hash-2").velocity({
                // opacity: 1,
                translateX: 0,
                translateY: 0,
                rotateZ: 0,
                scale: 1
            }, {
                duration: 700,
                easing: [-0.02, 0.007, 0.01, 0.97],
                queue: false
            }).velocity({
                opacity: 1
            }, {
                duration: 300,
            });
        }, 2000);

        setTimeout(function() {
            _this.slide();
        }, 6000);
    }

    _this.slide = function() {
        // return false;
        if (agent.msie > 9) {
            $("#main .wrap-logo").velocity({
                tween: [180, 0]
            }, {
                duration: 800,
                easing: [0.645, 0.045, 0.355, 1],
                progress: function(elements, complete, remaining, start, tweenValue) {
                    // console.log(tweenValue);
                    $(".wrap-main-p").css({
                        transform: "rotateY(" + tweenValue + "deg)"
                    });
                    $(".wrap-main-r").css({
                        transform: "rotateY(" + (180 - tweenValue) + "deg)"
                    });
                    if (tweenValue >= 90) {
                        $(".wrap-main-p").fadeTo(0, 0);
                        $(".wrap-main-r").fadeTo(0, 1);
                    }
                }
            });
        } else {
            $(".wrap-main-p, .wrap-main-p .wrap-img-main").stop().fadeTo(800, 0);
            $(".wrap-main-r").fadeTo(800, 1);
        }

        setTimeout(function() {
            if (agent.msie > 9) {
                $("#main .wrap-logo").velocity({
                    tween: [0, 180]
                }, {
                    duration: 800,
                    easing: [0.645, 0.045, 0.355, 1],
                    progress: function(elements, complete, remaining, start, tweenValue) {
                        $(".wrap-main-p").css({
                            transform: "rotateY(" + (tweenValue) + "deg)"
                        });
                        $(".wrap-main-r").css({
                            transform: "rotateY(" + (180 - tweenValue) + "deg)"
                        });
                        if (tweenValue <= 90) {
                            $(".wrap-main-p").fadeTo(0, 1);
                            $(".wrap-main-r").fadeTo(0, 0);
                        }
                    }
                });
            } else {
                $(".wrap-main-p, .wrap-main-p .wrap-img-main").stop().fadeTo(800, 1);
                $(".wrap-main-r").fadeTo(800, 0);
            }

            setTimeout(function() {
                _this.slide();
            }, 6000);
        }, 6000);
    }

    _this.setScale = function() {
        var sl = $win.width() / 750 * (501 / 309);
        $(".copy-main-img").css({
            transform: "scale(" + sl + ")"
        });
    }

    $win.bind("load", function() {
        if (!done) _this.show();
        done = true;
    }).bind("resize", function() {
        _this.setScale();
    })
};
var op = new Op();

function showIllust() {
    var tx = (view.myView == "pc") ? 30 : 30 * (window.innerWidth / 750);
    // $("#illust .dot").velocity({ scale: 0 }, 0);
    $("#illust .wrap-line").velocity({
        width: 0
    }, 0);
    $(".img-illust-p-1, .img-illust-p-2, .img-illust-p-3").velocity({
        translateX: -tx,
        opacity: 0
    }, 0);
    $(".img-illust-r-1, .img-illust-r-2, .img-illust-r-3").velocity({
        translateX: tx,
        opacity: 0
    }, 0);
    $(".text-illust-p-1, .text-illust-p-2, .text-illust-p-3").velocity({
        translateX: -tx,
        opacity: 0
    }, 0);
    $(".text-illust-r-1, .text-illust-r-2, .text-illust-r-3").velocity({
        translateX: tx,
        opacity: 0
    }, 0);

    $(".stl-illust-p .stl-illust-serif, .stl-illust-r .stl-illust-serif").each(function() {
        var tgt = $(this).get(0);
        new mojs.Html({
            el: tgt,
            scale: {
                0: 1.024
            },
            duration: 800,
            easing: fastEasing
        }).play();
    });
    $(".stl-illust-p .stl-illust-text, .stl-illust-r .stl-illust-text").each(function() {
        var tgt = $(this).get(0);
        new mojs.Html({
            el: tgt,
            scale: {
                0: 1.024
            },
            duration: 800,
            delay: 200,
            easing: fastEasing
        }).play();
    });
    $(".wrap-cup").velocity({
        opacity: 1,
        scale: 1
    }, {
        duration: 1000 * spd,
        easing: [0.250, 0.100, 0.250, 1.000],
        delay: 0 * spd
    })
    setTimeout(function() {
        var i = 0;
        while (i < 6) {
            var adj = 300;
            $(".illust-p li, .illust-r li").eq(i).find("img:eq(0)").velocity({
                scale: 1,
                translateX: 0,
                opacity: 1
            }, {
                duration: 400 * spd,
                delay: (200 * (i % 3) + adj) * spd,
                easing: [0.250, 0.460, 0.450, 0.940]
            })
            $(".illust-p li, .illust-r li").eq(i).find("img:eq(1)").velocity({
                opacity: 1,
                translateX: 0
            }, {
                duration: 400 * spd,
                delay: (200 * (i % 3) + adj + 0) * spd,
                easing: [0.250, 0.460, 0.450, 0.940]
            })
            new mojs.Html({
                el: $("#illust").find(".dot").eq(i).get(0),
                scale: {
                    0: 1.024
                },
                duration: 1000,
                easing: fastEasing,
                isShowStart: false
            }).play();
            var wid = $("#illust .wrap-cup > span").eq(i).width();
            $("#illust").find(".wrap-line").eq(i).find("img").width(wid);
            $("#illust").find(".wrap-line").eq(i).velocity({
                width: wid
            }, {
                duration: 400 * spd,
                delay: 200 * (i % 3) * spd,
                easing: [0.250, 0.460, 0.450, 0.940],
                complete: function() {
                    $(this).width("100%");
                    $(this).find("img").width("100%");
                }
            })
            i = (i + 1) | 0;
        }
    }, 400)
}


function showProductInfo(tgt) {
    $(tgt).find(".package").velocity({
        opacity: 0,
        translateY: -60
    }, 0);
    $(tgt).find(".shadow").velocity({
        opacity: 0,
        scale: 1.2
    }, 0);

    new mojs.Html({
        el: $(tgt).find(".tl-product").get(0),
        x: {
            "-30": 0
        },
        opacity: {
            0: 1
        },
        duration: 400,
        delay: 200,
        easing: mojs.easing.bezier(0.250, 0.460, 0.450, 0.940)
    }).play();

    var objText = $(tgt).find(".text-product, .caption-product, .btn-product");
    objText.each(function(i) {
        new mojs.Html({
            el: $(this).get(0),
            opacity: {
                0: 1
            },
            y: {
                30: 0
            },
            duration: 400,
            delay: 200 * (i + 2),
            easing: mojs.easing.bezier(0.250, 0.460, 0.450, 0.940)
        }).play();
    });

    new mojs.Html({
        el: $(tgt).find(".icon-new-product").get(0),
        scale: {
            0: 1
        },
        duration: 400,
        delay: 300,
        easing: mojs.easing.bezier(0.25, 0.46, 0.33, 0.98)
    }).play();
    var eas = [0.230, 1.000, 0.320, 1.000]
    $(tgt).find(".package").velocity({
        opacity: 1,
        translateY: 0
    }, {
        duration: 1000,
        easing: eas,
    })
    $(tgt).find(".shadow").velocity({
        opacity: 1,
        scale: 1
    }, {
        duration: 1000,
        easing: eas,
    })
}

function showProductSecret(tgt) {
    var color = {
        "#cheese-pudding": "#e50012",
        "#rare-cheese": "#e3007f"
    }
    var shape = {
        "#cheese-pudding": "circle",
        "#rare-cheese": "polygon"
    }
    $(tgt).find(".cup-secret").velocity({
        translateY: 120
    }, 0);
    $(tgt).find(".spoon-secret").velocity({
        translateY: 180
    }, 0);
    $(tgt).find(".secret li").velocity({
        opacity: 0,
        translateX: -30
    }, 0);
    $(tgt).find(".tl-secret").velocity({
        opacity: 0
    }, 0);
    $(tgt).find(".wrap-line").velocity({
        width: 0
    }, 0);
    $(tgt).find(".num-secret").velocity({
        opacity: 0,
        scale: 0
    }, 0);

    var adjDelay = (view.myView == "pc") ? 0 : -400;

    setTimeout(function() {
        var tl = new mojs.Html({
            el: tgt + " .tl-secret",
            scaleY: {
                0: 1.024
            },
            opacity: {
                0: 1
            },
            duration: 800,
            easing: fastEasing
        }).play();
        new mojs.Burst({
            degree: 120,
            count: 3,
            parent: tl.el,
            angle: -60,
            y: 0,
            top: "-6%",
            left: "44%",
            radius: {
                20: 45
            },
            timeline: {
                delay: 300
            },
            children: {
                shape: shape[tgt],
                scale: {
                    1: 0
                },
                radius: "rand(8, 5)",
                fill: color[tgt],
                strokeWidth: 0,
                duration: 1000,
                isForce3d: true
            }
        }).play();
    }, 400 + adjDelay);
    if (view.myView == "pc") {
        $(tgt).find(".cup-secret").velocity({
            translateY: 0
        }, {
            duration: 800,
            easing: [0.250, 0.460, 0.450, 0.940],
        });
        $(tgt).find(".spoon-secret").velocity({
            translateY: 0
        }, {
            duration: 800,
            easing: [0.250, 0.100, 0.250, 1.000]
        });
    }
    var i = 0;
    var num = (tgt == "#cheese-pudding") ? 2 : 3;
    setTimeout(function() {
        while (i < num) {
            var adj = 300;
            $(tgt).find(".secret li").eq(i).velocity({
                scale: 1,
                translateX: 0,
                opacity: 1
            }, {
                duration: 400 * spd,
                delay: (200 * (i % 3) + adj) * spd,
                easing: [0.250, 0.460, 0.450, 0.940]
            })
            if (view.myView == "pc") {
                $(tgt).find(".num-secret").eq(i).velocity({
                    scale: 1,
                    opacity: 1
                }, {
                    duration: 400 * spd,
                    delay: (200 * (i % 3) + adj) * spd,
                    easing: [0.250, 0.460, 0.450, 0.940]
                });
                new mojs.Html({
                    el: $(tgt).find(".dot").eq(i).get(0),
                    scale: {
                        0: 1.024
                    },
                    duration: 1000,
                    easing: fastEasing,
                    isShowStart: false
                }).play();
                var wid = $(tgt).find(".wrap-cup-secret > span").eq(i).width();
                $(tgt).find(".wrap-line").eq(i).find("img").width(wid);
                $(tgt).find(".wrap-line").eq(i).velocity({
                    width: wid
                }, {
                    duration: 400 * spd,
                    delay: 200 * (i % 3) * spd,
                    easing: [0.250, 0.460, 0.450, 0.940],
                    complete: function() {
                        $(this).width("100%");
                        $(this).find("img").width("100%");
                    }
                });
            }
            i = (i + 1) | 0;
        }
    }, 500 + adjDelay);
}

function showProductSecretSp(tgt) {
    $(tgt).find(".wrap-line").velocity({
        width: 0
    }, 0);
    $(tgt).find(".num-secret").velocity({
        opacity: 0,
        scale: 0
    }, 0);

    $(tgt).find(".cup-secret").velocity({
        translateY: 0
    }, {
        duration: 1000,
        easing: [0.250, 0.100, 0.250, 1.000]
    });
    $(tgt).find(".spoon-secret").velocity({
        translateY: 0
    }, {
        duration: 1000,
        easing: [0.250, 0.100, 0.250, 1.000]
    });
    setTimeout(function() {
        var i = 0;
        var num = (tgt == "#cheese-pudding") ? 2 : 3;
        while (i < num) {
            var adj = 300;
            $(tgt).find(".num-secret").eq(i).velocity({
                scale: 1,
                opacity: 1
            }, {
                duration: 400 * spd,
                delay: (200 * (i % 3) + adj) * spd,
                easing: [0.250, 0.460, 0.450, 0.940]
            })
            new mojs.Html({
                el: $(tgt).find(".dot").eq(i).get(0),
                scale: {
                    0: 1.024
                },
                duration: 1000,
                easing: fastEasing,
                isShowStart: false
            }).play();
            var wid = $(tgt).find(".wrap-cup-secret > span").eq(i).width();
            $(tgt).find(".wrap-line").eq(i).find("img").width(wid);
            $(tgt).find(".wrap-line").eq(i).velocity({
                width: wid
            }, {
                duration: 400 * spd,
                delay: 200 * (i % 3) * spd,
                easing: [0.250, 0.460, 0.450, 0.940],
                complete: function() {
                    $(this).width("100%");
                    $(this).find("img").width("100%");
                }
            })
            i = (i + 1) | 0;
        }
    }, 800);
}

var ScrollShow = function() {
    var _this = this;
    var obj = $("#illust, #cheese-pudding .package-product, #cheese-pudding .secret, #rare-cheese .package-product, #rare-cheese .secret, #cheese-pudding .wrap-cup-secret, #rare-cheese .wrap-cup-secret");
    var arr = [];
    var len = obj.length;

    $(".cup-secret").velocity({
        translateY: 120
    }, 0);
    $(".spoon-secret").velocity({
        translateY: 180
    }, 0);

    obj.each(function(index) {
        arr[index] = [];
        arr[index][0] = false;
        arr[index][1] = $(this).offset().top + $(this).outerHeight() * .3;
        arr[index][2] = $(this).get(0);
    })

    _this.set = function() {
        obj.each(function(index) {
            if (!arr[index][0]) {
                arr[index][1] = $(this).offset().top + $(this).outerHeight() * .3;
            }
        });
    }
    _this.check = function() {
        var i = 0;
        var sctop = $win.scrollTop();
        var winH = window.innerHeight;
        while (i < len) {
            if (!arr[i][0]) {
                if (sctop + winH > arr[i][1] + 50) {
                    arr[i][0] = true;
                    if (arr[i][2] == $("#illust").get(0)) {
                        showIllust();
                    } else if (arr[i][2] == $("#cheese-pudding .package-product").get(0)) {
                        showProductInfo("#cheese-pudding");
                    } else if (arr[i][2] == $("#cheese-pudding .secret").get(0)) {
                        showProductSecret("#cheese-pudding");
                    } else if (arr[i][2] == $("#rare-cheese .package-product").get(0)) {
                        showProductInfo("#rare-cheese");
                    } else if (arr[i][2] == $("#rare-cheese .secret").get(0)) {
                        showProductSecret("#rare-cheese");
                    } else if (view.myView == "sp") {
                        if (arr[i][2] == $("#cheese-pudding .wrap-cup-secret").get(0)) {
                            showProductSecretSp("#cheese-pudding");
                        } else if (arr[i][2] == $("#rare-cheese .wrap-cup-secret").get(0)) {
                            showProductSecretSp("#rare-cheese");
                        }
                    }
                }
            }
            i = (i + 1) | 0;
        }
    }

    $(window).bind("scroll", function() {
        var n = $(window).scrollTop() - $("#product").offset().top;
        $(".sticky div").height(n);
    });

    $win.bind("load", function() {
        _this.set();
        $win.bind("scroll.show", function() {
            _this.check();
        });
        // _this.check();
    }).bind("resize", function() {
        _this.set();
    });
};
new ScrollShow();

var sideFix = new(function() {
    var _this = this,
        $sticky = $("#side-logo");

    _this.check = function() {
        var sa = $win.scrollTop() - $("#product").offset().top;
        var sa2 = $win.scrollTop() + $(".sticky").height() - $("#banner").offset().top;
        if (sa2 >= 0) {
            $sticky.removeClass("lay-fix").removeClass("lay-top");
            $sticky.addClass("lay-bottom");
        } else if (sa >= 0) {
            $sticky.removeClass("lay-bottom").removeClass("lay-top");
            $sticky.addClass("lay-fix");
        } else if (sa < 0) {
            $sticky.removeClass("lay-bottom").removeClass("lay-fix");
            $sticky.addClass("lay-top");
        }
    };

    $win.bind("scroll", function() {
        _this.check();
    });
});