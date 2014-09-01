
Cu.import("resource://citytemp/common.js");
Cu.import("resource://citytemp/weatherService.js");

CityTempUI.Overlay = {
  init: function() {
  },

  togglePanel: function() {
    let panel = document.getElementById("citytemp-panel");

    if (panel.state == "open" || panel.state == "showing") {
      this.closePanel()
    } else {
      this.openPanel();
    }
  },

  openPanel: function() {
    let panel = document.getElementById("citytemp-panel");
    let anchor = document.getElementById("citytemp-toolbarbutton");
    let position = "after_start";
    if (!anchor) {
      anchor = document.getElementById("browser-bottombox");
      position = "before_end";
    }
    panel.openPopup(anchor, position, 0, 0, false, false);
  },

  closePanel: function() {
    document.getElementById("citytemp-panel").hidePopup();
  },

  findTemp: function() {
    let text = document.getElementById("citytemp-panel-textbox").value;
    let callback = function(result) {
      if (result.error) {
        document.getElementById("citytemp-panel-result-temp").textContent = "0";
        document.getElementById("citytemp-panel-result-place").textContent = result.error;
      } else {
        document.getElementById("citytemp-panel-result-temp").textContent = result.temp;
        document.getElementById("citytemp-panel-result-place").textContent = result.place;
      }
      document.getElementById("citytemp-panel-result-box").hidden = false;
    };

    CityTempBG.WeatherService.findTemp(text, callback);
  }
};

window.addEventListener("load", function() {
  CityTempUI.Overlay.init();
}, false);