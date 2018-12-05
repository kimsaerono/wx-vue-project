(function () {
  var out$ = typeof exports != 'undefined' && exports || typeof define != 'undefined' && {} || this;

  var dataLines = [];

  var get_plan_line = function (pathInfo, dataLines) {
    var startStationOl = pathInfo.startStationOl;
    var endStationOl = pathInfo.endStationOl;
    var lineId = pathInfo.startLineId;
    if (Number(startStationOl) > Number(endStationOl)) {
      startStationOl = pathInfo.endStationOl;
      endStationOl = pathInfo.startStationOl;
      lineId = pathInfo.endLineId;
    }
    var planLine = {};
    var findStartFlag = false;
    var findEndFlag = false;
    for (var i in dataLines) {
      var line = dataLines[i];
      if (line.id == lineId) {
        for (var n in line.stations) {
          var station = line.stations[n];
          if (station.ol == startStationOl) {
            planLine.name = line.name;
            planLine.color = line.color;
            planLine.stations = [];
            planLine.stations.push(station);
            findStartFlag = true;
          } else if (findStartFlag) {
            planLine.stations.push(station);
            if (station.ol == endStationOl) {
              findEndFlag = true;
              break;
            }
          }
        }
        break;
      }
    }

    if (!findEndFlag) {
      console.log("不在一条线上");
      return;
    }

    var planLines = [];
    planLines.push(planLine);
    return planLines;
  };

  var contains = function(array, code) {
    for (var i in array) {
      var item = array[i];
      if (item === code) {
        return true;
      }
    }
    return false;
  };

  out$.clear_planning = function (selector) {
    $(selector).find('rect').each(function () {
      $(this).nextAll().remove();
    });
  };

  out$.planning = function(pathInfo, dataLines, selector) {
    var svg = document.getElementById(selector);

    var g = svg.children[0];
    var planLines = get_plan_line(pathInfo, dataLines);
    if (planLines) {
      for (var i in planLines) {
        g.appendChild(drawLine(planLines[i]));
      }
      return true;
    }
    return false;
  }
})();
