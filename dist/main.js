window.addEventListener("load", () => {
  const handleLoading = () => {
    const elBody = document.querySelector("body");
    let count = 0;
    const elLoading = document.querySelector(".loading");
    const elLoadingPercent = document.querySelector(
      ".loading .loading__percent"
    );
    const elLoadingProgressBg = document.querySelector(
      ".loading .loading__progress .loading__progress-bg"
    );

    let imgLoad = imagesLoaded(elBody);

    imgLoad.on("progress", loading);
    imgLoad.on("done", done);

    function loading(instance, image) {
      count++;
      let progressPercent = Math.floor(count / instance.images.length) * 100;
      if (elLoadingPercent) {
        elLoadingPercent.textContent = `${progressPercent}%`;
      }
      if (elLoadingProgressBg) {
        elLoadingProgressBg.style.width = `${progressPercent}%`;
      }
      document.body.classList.add("--disable-scroll");
    }

    function done() {
      document.body.classList.remove("--disable-scroll");
      if (elLoading) {
        elLoading.classList.add("--loaded");
      }
    }
  };
  handleLoading();

  const handleMenuHref = () => {
    const linksMenu = document.querySelectorAll(".menu li a");
    const currentPath = window.location.pathname;
    console.log("Cur", currentPath);

    linksMenu.forEach(function (link) {
      if (link.pathname === currentPath) {
        link.classList.add("--active");
      } else {
        link.classList.remove("--active");
      }
    });
  };

  handleMenuHref();

  const handleBgHeader = () => {
    const elHeader = document.querySelector(".header");
    window.addEventListener("scroll", () => {
      let value = window.scrollY;
      if (value > elHeader.offsetHeight) {
        elHeader.classList.add("--scroll");
      } else {
        elHeader.classList.remove("--scroll");
      }
    });
  };
  handleBgHeader();

  // handleProgressbar
  const handleProgressbar = () => {
    const elProgress = document.querySelector(".progressbar");

    window.addEventListener("scroll", () => {
      let valueY = window.scrollY;
      let heightBody = document.body.offsetHeight - window.innerHeight;
      let percent = (valueY / heightBody) * 100;
      elProgress.style.width = `${percent}%`;
    });
  };
  handleProgressbar();

  // handle menuToggle
  const handleToggle = () => {
    const elTogle = document.querySelector(".header__hamburger");

    const elHam = document.querySelector(".header__hamburger span");
    const elMenuMobile = document.querySelector(".menumobile");
    const elProgress = document.querySelector(".progressbar");
    elTogle.addEventListener("click", function () {
      elHam.classList.toggle("--close");
      elMenuMobile.classList.toggle("--active");

      if (elMenuMobile.classList.contains("--active")) {
        elProgress.classList.add("--hide");
      } else {
        elProgress.classList.remove("--hide");
      }

      if (document.body.classList.contains("--disable-scroll")) {
        document.body.classList.remove("--disable-scroll");
      } else {
        document.body.classList.add("--disable-scroll");
      }
    });

    window.addEventListener("resize", function () {
      if (
        window.innerWidth > 992 &&
        elMenuMobile.classList.contains("--active")
      ) {
        elMenuMobile.classList.remove("--active");
        // elProgress.classList.remove("--hide");
        elHam.classList.remove("--close");
        document.body.classList.remove("--disable-scroll");
      }
    });
  };
  handleToggle();
  // handleSlider
  const handleSlider = () => {
    const sliders = document.querySelector(".reviews .reviews__list");
    const elItems = document.querySelectorAll(
      ".reviews .reviews__list .reviews__list-item"
    );

    const changeSlider = () => {
      elItems.forEach((item) => {
        if (item.classList.contains("is-selected")) {
          item.classList.add("--active");
        } else {
          item.classList.remove("--active");
        }
      });
    };

    if (!sliders) return;

    if (elItems) {
      let flkty = new FlickityResponsive(sliders, {
        // options
        cellAlign: "center",
        contain: true,
        draggable: ">1",
        wrapAround: true,
        prevNextButtons: false,
        groupCells: 2,
        on: {
          ready: function () {
            changeSlider();
          },
          change: function () {
            changeSlider();
          },
        },
        responsive: [
          {
            breakpoint: 1199,
            settings: {
              cellAlign: "center",
              groupCells: 1,
            },
          },
          {
            breakpoint: 576,
            settings: {
              cellAlign: "center",
              groupCells: 1,
            },
          },
        ],
      });
    }
  };

  handleSlider();

  // handleHeightSlider
  const handleSliderHeight = () => {
    const elItems = document.querySelectorAll(
      ".reviews .reviews__list .reviews__list-item"
    );

    if (!elItems) return;

    let temp = elItems[0]?.offsetHeight;

    elItems.forEach((itemH) => {
      let height = itemH.offsetHeight;
      if (temp < height) {
        temp = height;
      }
      return temp;
    });

    elItems.forEach((item) => {
      item.style.height = temp + `px`;
    });
  };

  handleSliderHeight();

  // handleBackToTop
  const handleBackToTop = () => {
    const elBackToTop = document.querySelector(".backtotop");
    const bodyHeight = document.body.offsetHeight;
    const heightFooter = document.querySelector(".footer .footer__copyright");

    elBackToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });

    window.addEventListener("scroll", () => {
      let valueY = window.scrollY;
      if (valueY >= bodyHeight / 2) {
        elBackToTop.classList.add("--active");
        elBackToTop.classList.remove("--footer");

        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - heightFooter.clientHeight
        ) {
          elBackToTop.classList.remove("--active");
          elBackToTop.classList.add("--footer");
        }
      } else {
        elBackToTop.classList.remove("--active");
        elBackToTop.classList.remove("--footer");
      }
    });
  };
  handleBackToTop();

  const handlePopupvideo = () => {
    const elPopupvideo = document.querySelector(".popupvideo");
    const elVideo = document.querySelector(".getstarted .getstarted__img");
    const elClose = document.querySelector(
      ".popupvideo .popupvideo__inner .popupvideo__inner-content .close"
    );
    const elIframe = document.querySelector(
      ".popupvideo .popupvideo__inner .popupvideo__inner-content iframe"
    );

    if (!elPopupvideo) return;

    elVideo?.addEventListener("click", () => {
      let dataVideo = elVideo.getAttribute("data-video");
      if (dataVideo) {
        elPopupvideo.classList.add("--active");
        document.body.classList.add("--disable-scroll");
        elIframe.setAttribute(
          "src",
          `https://www.youtube.com/embed/${dataVideo}?autoplay=1`
        );
      }
    });

    const handleClose = () => {
      elPopupvideo.classList.remove("--active");
      document.body.classList.remove("--disable-scroll");
      elIframe.setAttribute("src", "");
    };

    elClose.addEventListener("click", handleClose);

    elPopupvideo.addEventListener("click", handleClose);
  };

  handlePopupvideo();

  // handleEmail
  const handleEmail = () => {
    const elFormEmail = document.querySelector(".sub .sub__form");

    const elInputEmail = document.querySelector(".sub .sub__form input");
    const elTextErrEmail = document.querySelector(".sub .sub__form .texterror");

    const elSubmit = document.querySelector(".sub .sub__form .sub__form-btn");

    if (!elFormEmail) return;

    elSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      let isValid = true;
      if (elInputEmail.value.trim() === "") {
        elTextErrEmail.classList.add("--active");
        elFormEmail.classList.add("--error");
        elInputEmail.classList.add("--error");
        elTextErrEmail.textContent = "Please fill out this field";
        isValid = false;
      } else if (
        !validateEmail(elInputEmail.value) &&
        elInputEmail.value.trim() !== ""
      ) {
        elTextErrEmail.classList.add("--active");
        elInputEmail.classList.add("--error");
        elFormEmail.classList.add("--error");

        elTextErrEmail.textContent = "Email is not valid";
        isValid = false;
      } else {
        elTextErrEmail.classList.remove("--active");
        elFormEmail.classList.remove("--error");
        elInputEmail.classList.remove("--error");

        elInputEmail.value = "";
      }
    });

    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }
  };
  handleEmail();

  // handleTabs
  const handleTabs = () => {
    const elTabs = document.querySelectorAll(".tabs .tabs__inner li");
    let elPostsList = document.querySelector(".postslist.--active");
    elTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        elTabs.forEach((t) => t.classList.remove("--active"));
        tab.classList.add("--active");

        let dataId = tab.getAttribute("data-tab");
        console.log("DATA", dataId);
        if (dataId) {
          elPostsList.classList.remove("--active");
          elPostsList = document.querySelector(`.postslist-${dataId}`);
          elPostsList.classList.add("--active");
        }
      });
    });
  };

  handleTabs();

  // handlePage
  const handlePagination = () => {
    const elPageNumber = document.querySelectorAll(
      ".lastestposts__pagination-number li a"
    );

    // const elBackBtn = document.querySelector(
    //   ".lastestposts__pagination .lastestposts__pagination-btn.--back"
    // );

    // if (elBackBtn.classList.contains("--disable")) {
    //   console.log("ABC");
    // }

    elPageNumber.forEach((page) => {
      page.addEventListener("click", (e) => {
        e.preventDefault();
        elPageNumber.forEach((p) => p.classList.remove("--active"));
        page.classList.add("--active");
      });
    });
  };

  handlePagination();

  const handleForm = () => {
    const elInputName = document.querySelector("#name");
    const elInputEmail = document.querySelector("#email");
    const elInputSubject = document.querySelector("#subject");
    const elInputMess = document.querySelector("#message");
    const elBtnSend = document.querySelector("#form .btnmain");

    function hasWhiteSpace(s) {
      return /\s/g.test(s);
    }

    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }

    // if(!elForm) return;

    if (!elBtnSend) return;

    elBtnSend.addEventListener("click", (e) => {
      e.preventDefault();

      if (elInputName.value.trim() === "") {
        elInputName.nextElementSibling.classList.add("--active");
        elInputName.classList.add("--error");
        elInputName.nextElementSibling.textContent =
          "Please fill out this field";
      } else if (
        hasWhiteSpace(elInputName.value.trim()) &&
        elInputName.value.trim() !== ""
      ) {
        elInputName.nextElementSibling.classList.add("--active");
        elInputName.classList.add("--error");
        elInputName.nextElementSibling.textContent =
          " Username cannot have spaces";
      } else if (elInputName.value.trim().length < 6) {
        elInputName.nextElementSibling.classList.add("--active");
        elInputName.classList.add("--error");
        elInputName.nextElementSibling.textContent =
          "Username must be at least 6 characters";
      } else {
        elInputName.nextElementSibling.classList.remove("--active");
        elInputName.classList.remove("--error");
      }

      if (elInputEmail.value.trim() === "") {
        elInputEmail.nextElementSibling.classList.add("--active");
        elInputEmail.classList.add("--error");
        elInputEmail.nextElementSibling.textContent =
          "Please fill out this field";
        isValid = false;
      } else if (
        !validateEmail(elInputEmail.value) &&
        elInputEmail.value.trim() !== ""
      ) {
        elInputEmail.nextElementSibling.classList.add("--active");
        elInputEmail.classList.add("--error");

        elInputEmail.nextElementSibling.textContent = "Email is not valid";
      } else {
        elInputEmail.nextElementSibling.classList.remove("--active");
        elInputEmail.classList.remove("--active");
        elInputEmail.classList.remove("--error");
      }

      if (elInputSubject.value.trim() === "") {
        elInputSubject.nextElementSibling.classList.add("--active");
        elInputSubject.classList.add("--error");
      } else {
        elInputSubject.nextElementSibling.classList.remove("--active");
        elInputSubject.classList.remove("--error");
      }

      if (elInputMess.value.trim() === "") {
        elInputMess.nextElementSibling.classList.add("--active");
        elInputMess.classList.add("--error");
      } else {
        elInputMess.nextElementSibling.classList.remove("--active");
        elInputMess.classList.remove("--error");
      }
    });
  };

  handleForm();

  // faq

  const handleFAQ = () => {
    let elQuestion = document.querySelectorAll(".faq .faq__list-item");
    let icPlus = document.querySelectorAll(
      ".faq .faq__list-item .question span"
    );
    let elAnswer = document.querySelectorAll(".faq .faq__list-item .answer");

    elQuestion.forEach((item, index) => {
      item.addEventListener("click", function () {
        let currentlyActiveIcon = document.querySelector(
          ".faq .faq__list-item .question span.--active"
        );

        if (currentlyActiveIcon && currentlyActiveIcon !== icPlus[index]) {
          currentlyActiveIcon.classList.remove("--active");
        }

        icPlus[index].classList.toggle("--active");

        elAnswer.forEach((answer, i) => {
          if (i !== index) {
            answer.style.maxHeight = null;
            answer.style.marginTop = 0;
          }
        });

        if (!elAnswer[index].style.maxHeight) {
          elAnswer[index].style.maxHeight = elAnswer[index].scrollHeight + "px";
          elAnswer[index].style.marginTop = "16px";
        } else {
          elAnswer[index].style.maxHeight = null;
          elAnswer[index].style.marginTop = 0;
        }
      });
    });
    window.addEventListener("resize", function () {
      elAnswer.forEach((answer, index) => {
        if (icPlus[index].classList.contains("--active")) {
          answer.style.maxHeight = answer.scrollHeight + "px";
          answer.style.marginTop = "16px";
        } else {
          answer.style.maxHeight = null;
          answer.style.marginTop = 0;
        }
      });
    });
  };

  handleFAQ();
});
