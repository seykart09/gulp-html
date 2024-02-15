/* ========================================================================
 * DOM-based Routing
 * ======================================================================== */

(function ($) {
  // Toggle Sidebar
  $(document).on("click", ".navbar-main .topbar__button", function () {
    $("#navbarAsideContent").toggleClass("sidebar--small");
    $(".sidebar-hubtel-logo-large").toggleClass("d-none");
    $(".sidebar-hubtel-logo-small").toggleClass("d-none");

    $("#navLinkIcon").toggleClass("sidebar--small");
    $(".sidebar-app-icon").toggleClass("sidebar--small");
    $(".body-wrapper").toggleClass("wrapper--full-width ");
    $(".modal-backdrop").remove();
    var $div = $("<div />").appendTo("body");
    $div.attr("class", "modal-backdrop fade d-block d-lg-none show");
  });

  $(document).on("click", ".modal-backdrop", function () {
    $("#navbarAsideContent").toggleClass("sidebar--small");
    $(".body-wrapper").toggleClass("wrapper--full-width ");
    $(this).remove();
  });
  $(document).on("click", ".mobile-button", function () {
    $(".modal-backdrop.d-block").remove();
    $("#navbarAsideContent").toggleClass("sidebar--small");
    $("body > .wrapper").toggleClass("wrapper--full-width ");
  });

  $(document).on("click", ".filter-btn", function () {
    $(".filter-form").slideToggle("slow");
    var text = $(".filter-btn span").text();
    $(".filter-btn span").text(
      text == "Hide Filter" ? "Show Filter" : "Hide Filter"
    );
  });

  // move to another input box after maxLength is hit on verification
  // $(".tel_num").keyup(function () {
  //   console.log($(".tel_num").val())
  //   if (this.value.length === this.maxLength) {
  //     $(this).nextAll(".tel_num").eq(0).focus();
  //   }

  //   if (this.value.length === 0) {
  //     $(this).prevAll(".tel_num").eq(0).focus();
  //   }
  // });

  // New OTP Function
  let otp_fields = $(".otp-form .tel_num"),
    otp_value_field = $(".otp-form .otpVerify");

  otp_fields
    .on("input", function (e) {
      $(this).val(
        $(this)
          .val()
          .replace(/[^0-9]/g, "")
      );
      let opt_value = "";
      otp_fields.each(function () {
        let field_value = $(this).val();
        if (field_value != "") opt_value += field_value;
      });
      otp_value_field.val(opt_value);
    })
    .on("keyup", function (e) {
      let key = e.keyCode || e.charCode;
      if (key == 8 || key == 46 || key == 37 || key == 40) {
        // Backspace or Delete or Left Arrow or Down Arrow
        $(this).prev().focus();
      } else if (key == 38 || key == 39 || $(this).val() != "") {
        // Right Arrow or Top Arrow or Value not empty
        $(this).next().focus();
      }
    })
    .on("paste", function (e) {
      let paste_data = e.originalEvent.clipboardData.getData("text");
      let paste_data_splitted = paste_data.split("");
      $.each(paste_data_splitted, function (index, value) {
        otp_fields.eq(index).val(value);
      });
    });

  jQuery(
    '<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>'
  ).insertAfter(".quantity input");
  jQuery(".quantity").each(function () {
    var spinner = jQuery(this),
      input = spinner.find('input[type="number"]'),
      btnUp = spinner.find(".quantity-up"),
      btnDown = spinner.find(".quantity-down"),
      min = input.attr("min"),
      max = input.attr("max");
    btnUp.click(function () {
      var oldValue = parseFloat(input.val());
      if (oldValue >= max) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue + 1;
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
      $(this).parent().parent().siblings(".updateBtn").removeClass("d-none");
    });
    btnDown.click(function () {
      var oldValue = parseFloat(input.val());
      if (oldValue <= min) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue - 1;
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
      $(this).parent().parent().siblings(".updateBtn").removeClass("d-none");
    });
  });

  // hold onto the drop down menu
  var dropdownMenu;

  // and when you show it, move it to the body
  $(".table-responsive .table").on("show.bs.dropdown", function (e) {
    // grab the menu
    console.log("show");
    dropdownMenu = $(e.target).find(".dropdown-menu");

    console.log(dropdownMenu);

    // detach it and append it to the body
    $("body").append(dropdownMenu.detach());

    // grab the new offset position
    var eOffset = $(e.target).offset();

    // make sure to place it where it would normally go (this could be improved)
    dropdownMenu.css({
      display: "block",
      top: eOffset.top + $(e.target).outerHeight(),
      left: eOffset.left,
    });
  });

  // and when you hide it, reattach the drop down, and hide it normally
  $(".table-responsive .table").on("hide.bs.dropdown", function (e) {
    $(e.target).append(dropdownMenu.detach());
    dropdownMenu.hide();
  });
})(jQuery); // Fully reference jQuery after this point.

//Events JS

// Get the current URL path
const currentPath = window.location.href;

// Get all the navlinks
const navlinks = document.querySelectorAll(".navlink");
const submenuLinks = document.querySelectorAll(".submenu a");

//check and set the active navlink based on the current URL path
navlinks.forEach((navlink) => {
  if (navlink.href === currentPath) {
    navlink.setAttribute("aria-current", "page");
  } else {
    navlink.removeAttribute("aria-current");
  }
});

// Check and set the active navlink for submenu links based on the current URL path
submenuLinks.forEach((submenuLink) => {
  if (submenuLink.href === currentPath) {
    const parentNavlink = submenuLink
      .closest(".position-relative")
      .querySelector(".navlink");
    parentNavlink.setAttribute("aria-current", "page");
  }
});

if (window.innerWidth <= 1200) {
  submenuLinks.forEach((submenuLink) => {
    submenuLink.addEventListener("click", (event) => {
      navlinks.forEach((navlink) => {
        navlink.removeAttribute("aria-current");
      });
      event.target
        .closest(".position-relative")
        .querySelector(".navlink")
        .setAttribute("aria-current", "page");
    });
  });
}

//For Hubtel Academy
document.addEventListener("DOMContentLoaded", function () {
  var url = window.location.pathname;
  var filename = url.substring(url.lastIndexOf("/") + 1);

  // Remove active class from all links
  var links = document.querySelectorAll(".navbar-nav .academy-nav");
  links.forEach(function (link) {
    link.classList.remove("active");
  });

  // Add active class to the link corresponding to the current page
  var activeLink = document.querySelector(
    '.navbar-nav .academy-nav[href="' + filename + '"]'
  );
  if (activeLink) {
    activeLink.classList.add("active");
  }
});

//menu collapse on menu item click
const menulinks = document.getElementById("menu-link");
const input = document.getElementById("check");

menulinks.addEventListener("click", menu);

function menu(event) {
  if (event.target instanceof HTMLAnchorElement) {
    check.checked = false;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var check = document.getElementById("check");
  var nav = document.getElementById("events-admin-nav");
  var blackBg = document.querySelector(".black-bg");

  // Function to close the navbar
  function closeNavbar() {
    check.checked = false;
  }

  // Listen for clicks on the document
  document.addEventListener("click", function (event) {
    var isClickInsideNavbar = nav.contains(event.target);

    // If the click target is not inside the navbar and the navbar is open
    if (!isClickInsideNavbar && check.checked) {
      closeNavbar();
    }
  });

  // Listen for clicks on the black background
  blackBg.addEventListener("click", function () {
    closeNavbar();
  });
});

// Add an event listener to the "View details & items" dropdown item
document
  .querySelector(".event-dropdown-item.view-details")
  .addEventListener("click", function () {
    // Programmatically trigger a click event on the "Details" tab
    document.getElementById("details-tab").click();
  });

document.addEventListener("DOMContentLoaded", function () {
  var input = document.querySelectorAll(".fit-content-input");

  if (input) {
    input.addEventListener("input", resizeInput);
    resizeInput.call(input);
  }

  function resizeInput() {
    if (this.value.length == 0) {
      this.style.width = this.placeholder.length + "ch";
      return;
    }
    this.style.width = this.value.length + 1 + "ch";
  }
});
