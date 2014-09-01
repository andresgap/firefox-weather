var EXPORTED_SYMBOLS = [];

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;

Cu.import("resource://citytemp/common.js");
Cu.import("resource://gre/modules/Services.jsm");

CityTempBG.WeatherService = {
  init: function() {

  },

  findTemp: function(query_terms, callback) {
    let url = "http://api.openweathermap.org/data/2.5/find?units=metric&q=" + query_terms;
    let loadHandler = function(response) {
      if (response.cod == "200") {
        let item = response.list[0];
        let place = item.name == "" ? item.sys.country: item.name + ", " + item.sys.country;
        callback({temp: item.main.temp, place: place });
      } else {
        callback({error: "Place not found" });
      }
    };
    let errorHandler = function(error) {
      callback({error: "API Error" });
    };

    this._callAPI(url, loadHandler, errorHandler);
  },

  _callAPI: function(url, aLoadHandler, aErrorHandler) {
    let request = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance();

    request.mozBackgroundRequest = true;
    request.open("GET", url, true);
    request.addEventListener("load", function(event) {
      let response = JSON.parse(event.target.responseText);
      if (aLoadHandler) {
        aLoadHandler(response.data || response);
      }
    }, false);
    request.addEventListener("error", function(event) {
      let error = JSON.parse(event.target.responseText);
      if (aErrorHandler) {
        aErrorHandler(error);
      }
    }, false);

    request.send(null);
  },
};

(function() { this.init(); }).apply(CityTempBG.WeatherService);