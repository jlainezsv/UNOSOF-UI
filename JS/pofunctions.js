var ww = $(window).width();
/* Date time picker */
$(function() {
    $(".datepicker").datepicker({
        dateFormat: 'dd/mm/yy',
    });
});

// DEMO to collapse or expand the sidebar
$(".simulatecollapse").click(function() {
    if ($(".simulatecollapse").hasClass("collapse-no") == true) {
        $(".simulatecollapse").removeClass("collapse-no").addClass("collapse-yes");
        $(".navbar-static-side").attr("style", "width:50px; transition: width 0.3s");
        $("#page-wrapper").attr("style", "margin:0 0 0 50px; transition: margin 0.3s");

    } else {
        $(".simulatecollapse").removeClass("collapse-yes").addClass("collapse-no");
        $(".navbar-static-side").attr("style", "width:220px; transition: width 0.3s");
        $("#page-wrapper").attr("style", "margin:0 0 0 220px; transition: margin 0.3s");
    }
});

// increase/decrese input
function add(inputclass) {
    var $qty = $("." + inputclass);
    var currentVal = parseInt($qty.val());
    if (!isNaN(currentVal)) {
        $qty.val(currentVal + 1);
    }
}

function less(inputclass) {
    var $qty = $("." + inputclass);
    var currentVal = parseInt($qty.val());
    if (!isNaN(currentVal) && currentVal > 0) {
        $qty.val(currentVal - 1);
    }
}

// show / hide all message labels in packages
$(".allmsjs").click(function() {
    const attr = $(".btn-pckg-addmessage").attr('aria-expanded');
    if ($(this).hasClass("showall")) {
        // detect if showall class is
        $(".btn-pckg-addmessage").each(function() {
            if (typeof attr !== 'undefined' && attr !== false) { //identify if the element has the attr and the value true/false to expand/collapse 
                $(this).attr("aria-expanded", "true");
                let getIDtoShow = $(this).attr("href"); // Get the element reference to show
                $(getIDtoShow).show(function() {
                    $(getIDtoShow).addClass("show").removeAttr("style");
                });
            }
        });
        $(".allmsjs").removeClass("showall").addClass("hideall").html("Hide All");
    } else {
        // detect if showall class is not, hideall is
        $(".btn-pckg-addmessage").each(function() {
            if (typeof attr !== 'undefined' && attr !== true) { //identify if the element has the attr and the value true/false to expand/collapse 
                $(this).attr("aria-expanded", "true");
                let getIDtoShow = $(this).attr("href"); // Get the element reference to hide
                $(getIDtoShow).hide(function() {
                    $(getIDtoShow).removeClass("show").addClass("collapse").removeAttr("style");
                });
            }
        });
        $(".allmsjs").removeClass("hideall").addClass("showall").html("Show All");
    }
});


// layout for small devices
function checkwindows(winwidth) {
    if (winwidth <= 1024) {
        $("#page-wrapper").removeAttr("class").attr("class", "layout-3 panelpack-collapsed");
        $(".panel-packages").addClass("pack-collapse");
        $(".layout").attr("style", "display:none");
        $(".panel-box .topfunctions").addClass("collapse");
        $(".panel-box #box-messages").addClass("collapse");
        $(".taxes").addClass("collapse");

        $(".panel-box .nav-link").click(function() {


            if ($(this).hasClass("packagestab")) {
                $(".panel-box .panel-controls .btn-control-filters").removeClass("d-none");
            } else {
                $(".panel-box .panel-controls .btn-control-filters").addClass("d-none");
            }
        });
    } else {
        $(".layout").attr("style", "display:none");
        $(".panel-box .topfunctions").removeClass("collapse");
        $(".totals-container").removeClass("collapse");
        $(".panel-box .panel-controls .btn-control-filters").removeClass("d-none");

    }
}
checkwindows($(window).width());
window.addEventListener('resize', function(event) {
    checkwindows($(window).width());
});

// Changing layout
$(".btn-layout").click(function() {
    $(".btn-layout").removeClass("btn-layout-active");
    $(".panel").removeAttr("style");

    function fadepanels(classtoadd) {
        $(".panel").fadeOut(400,
            function() {
                //console.log("se esconden los panels");
                $("#page-wrapper").removeAttr("class");
                $("#page-wrapper").attr("class", classtoadd);
                layout2panelsize();

                $(".layout-1 .panel-packages, .layout-2 .panel-packages").removeClass("pack-collapse");
            });


        setTimeout(function() {
            $(".panel").fadeIn(400, function() {
                //console.log("se muestran los panels");
            });
        }, 800);
    }

    if ($(this).hasClass("btn-layout-1") === true) {
        fadepanels("layout-1");
        $(".btn-layout-1").addClass("btn-layout-active");
        //$(".panel-packages").removeClass("pack-collapse");
        $("#page-wrapper").removeClass("panelpack-def");

    } else if ($(this).hasClass("btn-layout-2") == true) {
        fadepanels("layout-2 panelpack-def");
        $(".btn-layout-2").addClass("btn-layout-active");


        $("layout-2 .this-collapse .nav-tabs").attr("style", "display:none;");
        //$(".panel-packages").removeClass("pack-collapse");

        $(".pack-pan").removeClass("panel-default active");
        $(".panel-packages .tab-content").removeAttr('style');




    } else if ($(this).hasClass("btn-layout-3") == true) {
        fadepanels("layout-3 panelpack-collapsed");
        $(".btn-layout-3").addClass("btn-layout-active");

        $(".panel-packages").addClass("pack-collapse");


        $(".panel-packages").removeClass("expanded-packages");


    }
});

// clicks to modify panels
$(".invent-pan").click(function() {
    $(this).addClass("panel-default").removeClass("invent-pan").attr("onclick", "defaultpanel()");

    if (ww > 992) {
        $(".layout-2 .panel-invent .nav-tabs, .layout-3 .panel-invent .nav-tabs").attr("style", "display:none;");
    }
    //$(".layout-2 .panel-invent .tab-pane").attr("style", "display:none;");
    collapseinvent();
});

$(".box-pan").click(function() {
    $(this).addClass("panel-default").removeClass("invent-pan").attr("onclick", "defaultpanel()");
    if (ww > 992) {
        $(".layout-2 .panel-box .nav-tabs, .layout-3 .panel-box .nav-tabs").attr("style", "display:none;");
    }

    $(".layout-2 .panel-box .topfunctions").attr("style", "visibility: hidden;");
    collapsebox();
});


// Panels Function
function collapseinvent() {
    $(".panel-invent").removeAttr("class").attr("class", "panel panel-invent this-collapse");
    $(".panel-box").removeAttr("class").attr("class", "panel panel-box this-expand");
    $(".panel-box .box-pan").addClass("invent-pan").removeClass("panel-default").removeAttr("onclick");

    setTimeout(function() {
        $(".layout-2 .panel-box .nav-tabs").fadeIn(200, function() {
            $(".panel-box .nav-tabs").removeAttr("style");
            //$(".panel-box .tab-pane").removeAttr("style");
            $(".layout-2 .panel-box .topfunctions").removeAttr("style");
        });
    }, 200);

    setTimeout(function() {
        $(".layout-3 .panel-box .nav-tabs").fadeIn(200, function() {
            $(".panel-box .nav-tabs").removeAttr("style");
        });
    }, 200);
}

function collapsebox() {
    $(".panel-invent").removeAttr("class").attr("class", "panel panel-invent this-expand");
    $(".panel-box").removeAttr("class").attr("class", "panel panel-box this-collapse");
    $(".panel-invent .panel-default").addClass("invent-pan").removeClass("panel-default").removeAttr("onclick");

    setTimeout(function() {
        $(".layout-2 .panel-invent .nav-tabs").fadeIn(200, function() {
            $(".panel-invent .nav-tabs").removeAttr("style");
            //$(".panel-invent .tab-pane").removeAttr("style");
        });
    }, 200);

    setTimeout(function() {
        $(".layout-3 .panel-invent .nav-tabs").fadeIn(200, function() {
            $(".panel-invent .nav-tabs").removeAttr("style");
        });
    }, 200);
}

function defaultpanel() {
    $(".panel-invent").removeAttr("class").attr("class", "panel panel-invent").removeAttr("onclick");
    $(".panel-box").removeAttr("class").attr("class", "panel panel-box").removeAttr("onclick");

    $(".panel-invent .panel-default").addClass("invent-pan").removeClass("panel-default").removeAttr("onclick");
    $(".panel-box .box-pan").addClass("invent-pan").removeClass("panel-default").removeAttr("onclick");

    setTimeout(function() {
        $(".layout-2 .nav-tabs").fadeIn(200, function() {
            $(".nav-tabs").removeAttr("style");
            $(".layout-2 .panel-box .topfunctions").removeAttr("style");
        });
    }, 200);

    setTimeout(function() {
        $(".layout-3 .nav-tabs").fadeIn(200, function() {
            $(".nav-tabs").removeAttr("style");
        });
    }, 200);
}

$(".btn-packages-fullpanel").click(function() {
    if ($("#page-wrapper").hasClass("layout-1")) {
        // Actions of full packages button on layout 1
        if ($(".panel-packages").hasClass("full-panel-packages")) {
            console.log("Estamos en Layot 1 y packages esta full width");
            $(".panel-packages").removeClass("full-panel-packages")
        } else {
            console.log("Estamos en Layot 1 y packages esta Default width");
            $(".panel-packages").addClass("full-panel-packages");
        }
    } else {
        // Actions of full packages button on layout 2 and 3 when panel packages is default size

        if ($(".panel-packages").hasClass("pack-collapse")) {
            // Actions when panel packages is collapse and we expand to full
            $(".panel-packages").addClass("full-panel-packages wascollapse").removeClass('pack-collapse');
        } else if ($(".panel-packages").hasClass("wascollapse")) {
            // Actions when panel packages is full and return to collapse
            $(".panel-packages").removeClass("full-panel-packages wascollapse").addClass('pack-collapse');

        }
        if ($(".panel-packages").hasClass("wasdefault")) {
            // Actions when panel packages is full and return to default
            $(".panel-packages").removeClass("full-panel-packages wasdefault");
        } else {
            // Actions when panel packages is default and and we expand to full
            $(".panel-packages").addClass("full-panel-packages wasdefault");
        }

    }
});
$(".pack-pan").click(function() {
    if ($("#page-wrapper").hasClass("layout-2")) {
        console.log('pack-pan layout 2')
        if ($(this).hasClass("active")) {
            console.log("was active");
            $(this).addClass("panel-default");
            $(".panel-packages").addClass("pack-collapse");
            $(".layout-2").removeClass("panelpack-def").addClass("panelpack-collapsed");
        } else {
            console.log("was not active");
            $(this).removeClass("panel-default");
            $(".panel-packages").removeClass("pack-collapse");
            $(".layout-2").removeClass("panelpack-collapsed").addClass("panelpack-def");
        }
    } else if ($("#page-wrapper").hasClass("layout-3")) {
        console.log('pack-pan layout 3');
        if ($(".panel-packages").hasClass("pack-collapse")) {
            $(".panel-packages .expandcollapse").addClass("active panel-default");
            $(".panel-packages").addClass("expanded-packages").removeClass("pack-collapse");

            setTimeout(function() {
                $(".panel-packages .tab-content").fadeIn(200, function() {
                    $(".panel-packages .tab-content").attr("style", "display: inherit;");
                });
            }, 200);

        } else {
            $(".panel-packages .tab-content").removeAttr("style");
            $(".panel-packages").addClass("pack-collapse").removeClass("expanded-packages");
        }
    }
});

//  $(".pack-pan").click(function() {
//      if ($("#page-wrapper").hasClass("layout-3")) {
//          if ($(".panel-packages").hasClass("pack-collapse")) {
//              $(".panel-packages .expandcollapse").addClass("active panel-default");
//              $(".panel-packages").addClass("expanded-packages").removeClass("pack-collapse");

//              setTimeout(function() {
//                  $(".panel-packages .tab-content").fadeIn(200, function() {
//                      $(".panel-packages .tab-content").attr("style", "display: inherit;");
//                  });
//              }, 200);

//          } else {
//              $(".panel-packages .tab-content").removeAttr("style");
//              $(".panel-packages").addClass("pack-collapse").removeClass("expanded-packages");
//          }
//      } else {
//          console.log("layout 1 y 2");
//          if ($(this).hasClass("active")) {
//              console.log("was active");
//              $(this).addClass("panel-default");
//              $(".panel-packages").addClass("pack-collapse");
//              $(".layout-2").removeClass("panelpack-def").addClass("panelpack-collapsed");
//          } else {
//              console.log("was not active");
//              $(this).removeClass("panel-default");
//              $(".panel-packages").removeClass("pack-collapse");
//              $(".layout-2").removeClass("panelpack-collapsed").addClass("panelpack-def");
//          }
//      }
//  });
// set width to panels in layout 2 (3 colums)
function layout2panelsize() {
    const layout2width = $(".layout-2").width();
    const panelsWidth = $(".layout-2").width() / 3;
    if ($("#page-wrapper").hasClass("layout-2")) {
        $(".layout-2").addClass("panelpack-def");
    } else {
        //$(".panel").removeAttr("style");
        $(".layout-2").addClass("panelpack-collapsed");
    }
}