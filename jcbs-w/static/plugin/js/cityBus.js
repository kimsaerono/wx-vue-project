/**
 * Author:wangshimin
 * E-mail:shimin.wang@jia007.com
 */
// $(function(){
//     $('.weui-navbar__item').on('click', function () {
//         var self = $(this),url = self.data("url");
//         location.hash = url;
//         // $(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
//     });
// });


// var originId, direction;
//    addBusline("to_air_map", to_air_map_data);
//     addBusline("to_city_map", to_city_map_data);
//
//     //点击标记逻辑
//     $("#container").children('svg').each(function() {
//         $(this).click(function() {
//             clear_image();
//             hide_rect(this);
//             clear_planning(this);
//             clickCount = 0;
//         })
//     });
//
//     var clear_image = function() {
//         $("#container").children('svg').find("image").each(function () {
//             $(this).remove();
//         })
//     };
//
//     var clickCount = 0;
//
//     $("#container").find("[data-point='point']").each(function() {
//         $(this).css("cursor", "hand");
//         $(this).click(function(event) {
//             clickCount++;
//             var tagName = $(this)[0].tagName;
//             //默认tagName为svg
//             var x,y;
//             if (tagName === 'ellipse') {
//                 x = $(this).attr("cx") - 17;
//                 y = $(this).attr("cy") - 50;
//             } else {
//                 x = $(this).attr("x") - 8.24;
//                 y = $(this).attr("y") - 42.56;
//             }
//             var image = document.createElementNS('http://www.w3.org/2000/svg','image');
//             image.setAttribute("x", x);
//             image.setAttribute("y", y);
//             image.setAttribute("width","35");
//             image.setAttribute("height","56");
//
//             if (clickCount % 2 === 1) {
//                 //清楚标记
//                 clear_image();
//                 //标记起点
//                 image.setAttribute("data-mark", "start");
//                 image.href.baseVal = "//webmap1.bdimg.com/wolfman/static/common/images/subways/resStart_b57f6c3.png";
//                 originId = $(this).attr("data-id");
//                 $(this).parent()[0].appendChild(image);
//             } else {
//                 image.href.baseVal = "//webmap0.bdimg.com/wolfman/static/common/images/subways/resEnd_f2c5bd8.png";
//                 show_rect($(this).parent());
//
//                 var that = $(this);
//                 $.post("/mvc/planning", {"originId": originId, "distId": $(this).attr("data-id"),"direction":direction},function (result) {
//                     result = JSON.parse(result);
//                     if (direction == 1) {
//                         planning(result, to_air_map_data, "to_air_map");
//                     } else {
//                         planning(result, to_city_map_data, "to_city_map");
//                     }
//                     $(that).parent()[0].appendChild($(that).parent().find('image[data-mark="start"]')[0]);
//                     $(that).parent()[0].appendChild(image);
//                 })
//             }
//
//             //阻值清楚事件
//             event.stopPropagation();
//         });
//
//         //规划路线逻辑
//
//     });

