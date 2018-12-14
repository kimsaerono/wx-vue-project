(function () {
  var out$ = typeof exports != 'undefined' && exports || typeof define != 'undefined' && {} || this;

  var flushsvg = function (selector, dataLines) {
    var svg = document.getElementById(selector);

    var gEle = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svg.appendChild(gEle);
    for (var i in dataLines) {
      var night = dataLines[i].night;
      if(!night || night == "underfind") {
        gEle.appendChild(drawLine(dataLines[i]));
      }
    }

    add_rect(selector);
  };
  var getStartCicleEle = function(station,name,lineOl,color) {
    var x = station['sxy'].split(',')[0];
    var y = station['sxy'].split(',')[1];
    // var ele = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    // ele.setAttribute("data-point", "point");
    // ele.setAttribute("eletype", "0");
    // ele.setAttribute("fill", color);
    // // ele.textContent = start;
    // ele.setAttribute("mcx", "12982403.12");
    // ele.setAttribute("mcy", "4846746.01");
    // ele.setAttribute("cx", x);
    // ele.setAttribute("cy", y);
    // ele.setAttribute("rx", "35");
    // ele.setAttribute("ry", "35");
    // ele.setAttribute("stroke", color);
    // ele.setAttribute("stroke-width", "3");
    // ele.setAttributeNS(null, "opacity", "0.3");
    var XLink_NS = 'http://www.w3.org/1999/xlink';
    var image = document.createElementNS('http://www.w3.org/2000/svg','image');
    image.setAttribute("x", x);
    image.setAttribute("y", y);
    image.setAttributeNS(null, 'type', 'png');
    image.setAttributeNS(null, 'width', '50');
    image.setAttributeNS(null, 'height', '50');
    image.setAttributeNS(XLink_NS, 'xlink:href', "static/img/"+lineOl+".png");
    // image.href.baseVal = "../../../src/assets/assets/lines/"+lineOl+".png";
    // ele.appendChild(image);
    return image;
  };
  // var getStartTextEle = function(station,name,color) {
  //   var x = station['sxy'].split(',')[0];
  //   var y = station['sxy'].split(',')[1];
  //   var textEle = document.createElementNS("http://www.w3.org/2000/svg", "text");
  //   textEle.setAttribute("class", "station-text");
  //   textEle.setAttribute("x", x);
  //   textEle.setAttribute("y", y);
  //   if(name && name!=""){
  //     textEle.setAttribute("fill",'white');
  //     textEle.setAttribute("style","font-size:3rem;font-weight:900");
  //   }
  //   var tspanEle = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
  //   tspanEle.setAttribute("dy", "14.773333344");
  //   tspanEle.appendChild(document.createTextNode(name));
  //   textEle.appendChild(tspanEle);
  //   return textEle;
  // };
  var getTextEle = function(station) {
    var x = station['xy'].split(',')[0];
    var y = station['xy'].split(',')[1];
    var name = station['name'];
    var textEle = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textEle.setAttribute("class", "station-text");
    textEle.setAttribute("x", x);
    textEle.setAttribute("y", y);
    textEle.setAttribute("style","font-size:2.5rem");
    var tspanEle = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    tspanEle.setAttribute("dy", "14.773333344");
    tspanEle.appendChild(document.createTextNode(name));

    textEle.appendChild(tspanEle);
    return textEle;
  };

  var getPointEles = function(station,lineId,color,lineName) {
    var x =  station.point_xy.split(',')[0];
    var y =  station.point_xy.split(',')[1];
    var transfer = station.transfer;
    // var start = station.start;
    var html = "";

    var eles = [];

    if (transfer) {
      var ele = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      ele.setAttribute("data-point", "point");
      ele.setAttribute("height", "20");
      ele.setAttribute("version", "1.1");
      ele.setAttribute("viewBox", "0 0 105 105");
      ele.setAttribute("width", "20");
      ele.setAttribute("x", x);
      ele.setAttribute("y", y);
      ele.setAttribute("data-id", station.id);

      var gEle = document.createElementNS("http://www.w3.org/2000/svg", "g");
      ele.appendChild(gEle);
      var circleEle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circleEle.setAttribute("cx", "52.5");
      circleEle.setAttribute("cy", "52.5");
      circleEle.setAttribute("fill", "#ffffff");
      circleEle.setAttribute("opacity", "1.00");
      circleEle.setAttribute("r", "46.5");
      circleEle.setAttribute("stroke", "#231715");
      circleEle.setAttribute("stroke-width", "12");
      var pathEle1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathEle1.setAttributeNS(null, "d", " M 41.04 25.08 C 45.36 23.43 49.98 23.10 54.56 23.33 C 54.46 25.06 54.33 26.78 54.18 28.50 C 48.07 29.49 41.77 31.66 37.79 36.65 C 34.07 42.79 35.78 50.27 34.68 57.03 C 38.42 56.52 42.05 55.42 45.82 55.05 C 40.62 60.86 35.86 67.04 30.95 73.08 C 24.97 67.36 20.01 60.68 14.51 54.51 C 18.24 55.38 22.01 56.08 25.79 56.70 C 25.66 50.84 25.92 44.99 26.63 39.17 C 27.98 32.10 34.23 26.75 41.04 25.08 Z");
      pathEle1.setAttributeNS(null, "fill", "#231715");
      pathEle1.setAttributeNS(null, "opacity", "1.00");
      var pathEle2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathEle2.setAttributeNS(null, "d", " M 72.20 33.89 C 77.70 39.68 82.54 46.05 88.00 51.88 C 84.33 52.04 80.80 51.02 77.23 50.38 C 77.35 55.93 76.91 61.45 76.50 66.98 C 75.98 72.11 72.47 76.44 68.36 79.30 C 62.34 82.73 55.32 84.35 48.40 83.72 C 48.52 82.01 48.64 80.30 48.77 78.59 C 56.66 77.89 64.33 72.81 67.18 65.30 C 68.20 60.37 67.69 55.28 67.82 50.27 C 64.33 50.61 60.97 51.72 57.46 51.93 C 62.48 46.00 67.37 39.97 72.20 33.89 Z");
      pathEle2.setAttributeNS(null, "fill", "#231715");
      pathEle2.setAttributeNS(null, "opacity", "1.00");
      gEle.appendChild(circleEle);
      gEle.appendChild(pathEle1);
      gEle.appendChild(pathEle2);

      eles.push(ele);
    } else {
      var ele = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
      // if(start && start!=''){
      //     ele.setAttribute("data-point", "point");
      //     ele.setAttribute("eletype", "0");
      //     ele.setAttribute("fill", color);
      //     ele.textContent = start;
      //     ele.setAttribute("mcx", "12982403.12");
      //     ele.setAttribute("mcy", "4846746.01");
      //     ele.setAttribute("cx", x);
      //     ele.setAttribute("cy", y);
      //     ele.setAttribute("rx", "28");
      //     ele.setAttribute("ry", "28");
      //     ele.setAttribute("stroke", color);
      //     ele.setAttribute("stroke-width", "2.5");
      //     ele.setAttribute("data-id", station.id);
      //     ele.setAttribute("data-line", lineId);
      //     ele.setAttribute("data-ol", station.ol);
      //     ele.setAttributeNS(null, "opacity", "0.60");
      //     // ele.setAttribute("data-start", 'start');
      // }else{
      ele.setAttribute("data-point", "point");
      ele.setAttribute("eletype", "0");
      ele.setAttribute("fill", "white");
      ele.setAttribute("mcx", "12982403.12");
      ele.setAttribute("mcy", "4846746.01");
      // ele.setAttribute("data-start", start);
      ele.setAttribute("cx", x);
      ele.setAttribute("cy", y);
      ele.setAttribute("rx", "25");
      ele.setAttribute("ry", "25");
      ele.setAttribute("stroke", color);
      ele.setAttribute("stroke-width", "3");
      ele.setAttribute("data-id", station.id);
      ele.setAttribute("data-line", lineId);
      ele.setAttribute("data-ol", station.ol);
      ele.setAttribute("data-name", station.name);
      ele.setAttribute("data-linename", lineName);
      // }
      eles.push(ele);
      var svgEle = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svgEle.setAttribute("height", "70");
      svgEle.setAttribute("version", "1.1");
      svgEle.setAttribute("viewBox", "0 0 168 168");
      svgEle.setAttribute("width", "70");
      svgEle.setAttribute("x", "2910.02");
      svgEle.setAttribute("y", "30.93");
      svgEle.setAttribute("name", "灰机~");

      var gEle = document.createElementNS("http://www.w3.org/2000/svg", "g");
      svgEle.appendChild(gEle);
      var pathEle1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathEle1.setAttributeNS(null, "d", " M 15.93 0.00 L 149.38 0.00 C 153.66 0.62 158.11 1.65 161.39 4.66 C 164.85 7.53 166.43 11.88 168.00 15.95 L 168.00 153.32 C 166.49 156.53 165.04 159.87 162.62 162.52 C 160.11 165.06 156.82 166.63 153.57 168.00 L 16.53 168.00 C 8.37 167.62 2.27 160.81 0.00 153.41 L 0.00 17.57 C 0.49 8.75 7.54 1.83 15.93 0.00 M 13.54 5.75 C 7.34 7.91 4.23 14.79 4.47 21.01 C 4.50 63.34 4.42 105.68 4.51 148.01 C 4.13 155.58 9.84 163.78 17.97 163.52 C 59.65 163.59 101.33 163.54 143.00 163.54 C 146.42 163.40 149.91 163.78 153.27 163.04 C 159.01 161.01 163.43 155.27 163.20 149.05 C 163.28 106.03 163.26 63.00 163.21 19.97 C 163.51 12.70 157.73 4.67 149.96 5.18 C 107.98 4.88 65.99 5.15 24.01 5.04 C 20.52 5.10 16.95 4.93 13.54 5.75 Z");
      pathEle1.setAttributeNS(null, "fill", "#033572");
      pathEle1.setAttributeNS(null, "opacity", "1.00");
      var pathEle2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathEle2.setAttributeNS(null, "d", " M 75.98 22.70 C 81.33 22.35 86.71 22.53 92.07 22.54 C 94.92 22.29 96.52 25.46 96.37 27.94 C 96.49 42.04 96.21 56.16 96.50 70.27 C 110.91 77.62 124.67 86.21 138.91 93.90 C 141.06 95.17 143.59 96.04 145.14 98.09 C 145.20 101.96 146.17 106.15 144.42 109.78 C 128.59 103.93 112.46 98.88 96.57 93.15 C 96.15 105.57 96.41 118.03 96.47 130.46 C 99.03 132.22 101.46 134.16 104.02 135.94 C 107.29 138.26 111.05 140.17 113.23 143.70 C 112.90 144.63 112.59 145.57 112.30 146.51 C 107.36 146.70 102.36 147.08 97.45 146.42 C 93.67 144.36 90.71 141.09 87.12 138.74 C 86.06 137.95 84.59 137.84 83.40 138.38 C 79.63 140.84 76.75 144.62 72.57 146.44 C 67.56 147.13 62.43 146.66 57.39 146.50 C 57.64 144.81 56.98 142.67 58.56 141.49 C 63.24 137.43 68.69 134.34 73.53 130.48 C 74.26 128.78 73.92 126.84 74.03 125.03 C 73.85 114.40 74.17 103.75 73.82 93.12 C 62.70 96.88 51.63 100.82 40.47 104.48 C 35.40 106.34 30.12 107.76 25.38 110.40 C 24.90 106.06 24.76 101.68 25.24 97.34 C 41.33 88.02 57.76 79.28 73.72 69.74 C 74.29 55.83 73.81 41.90 73.99 27.98 C 74.10 26.09 74.20 23.83 75.98 22.70 Z");
      pathEle2.setAttributeNS(null, "fill", "#033572");
      pathEle2.setAttributeNS(null, "opacity", "1.00");
      gEle.appendChild(pathEle1);
      gEle.appendChild(pathEle2);

      eles.push(svgEle);
    }

    return eles;
  };

  var add_rect = function (selector) {
    var g = document.getElementById(selector).children[0];
    var rectObj = document.createElementNS("http://www.w3.org/2000/svg","rect");
    rectObj.setAttribute("width", "34860");
    rectObj.setAttribute("height", "18000");
    rectObj.setAttribute("fill-opacity", "0.9");
    rectObj.setAttribute("fill", "white");
    rectObj.setAttribute("x", "-1000");
    rectObj.setAttribute("y", "-1000");
    rectObj.setAttribute("style", "display:none");

    g.appendChild(rectObj);
  };

  out$.hide_rect = function (selector) {
    $(selector).find("rect").each(function() {
      $(this).hide();
    });
  };

  out$.show_rect = function (selector) {
    $(selector).find("rect").each(function() {
      $(this).show();
    });
  };

  out$.drawLine = function(line) {
    var name = line['name'];
    var color = line['color'];
    var stations = line['stations'];
    var lineId = line['id'];
    var path_data = '';
    var draw_name_img = '';
    var first = true;
    var d = document.createDocumentFragment();

    var eles = [];
      for (var i in stations) {
        var s = stations[i];
        var start = s.start;
        eles.push(getTextEle(s));
        if(start && start!=""){
          eles.push(getStartCicleEle(s,line.name,start,line.color));
          // eles.push(getStartTextEle(s,line.lineOl,line.color));
        }
        var pointEles = getPointEles(s,lineId,line.color,name);
        for (var n in pointEles) {
          eles.push(pointEles[n]);
        }

        if (Number(i) < stations.length - 1) {
          //最后一个不添加path
          if (first) {
            path_data += ' M' + s['draw_args'].substr(1, s['draw_args'].length);
            first = false;
          } else {
            path_data += s['draw_args'];
          }
        }

      }

    var pathEle = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathEle.setAttributeNS(null, "d", path_data);
    pathEle.setAttributeNS(null, "eletype", "1");
    pathEle.setAttributeNS(null, "fill", "none");
    pathEle.setAttributeNS(null, "stroke", color);
    pathEle.setAttributeNS(null, "stroke-width", "12");
    d.appendChild(pathEle);

    for (var i in eles) {
      d.appendChild(eles[i]);
    }
    return d;
  };

  out$.addBusline = function(selector, lineData) {
    flushsvg(selector, lineData);
  }
})();
