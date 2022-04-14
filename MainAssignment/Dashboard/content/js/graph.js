/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 3.0, "series": [{"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-183", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-147", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.css-266", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/check-144", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-264", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/check-145", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Step4/success.txt-158", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-300", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-211", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Step4/success.txt-159", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/bm.png-243", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-302", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "Step5/node_modules/video.js/dist/video.min.js-326", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-209", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Step4/bm.png-129", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/config.json-314", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/check-136", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Step4/css/latofonts.css-178", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/view-224", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Step4/check-133", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-240", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-121", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/view-226", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Step5/css/latofonts.css-331", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/js/prod.js-155", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "Step4/check-169", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Step4/config.json-222", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-271", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Step5/node_modules/bootstrap/dist/js/bootstrap.min.js-333", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/check-161", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-154", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/check-163", "isController": false}, {"data": [[2400.0, 1.0], [2600.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Login/login-79", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/check-171", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "Step4/imgs/asusm.jpg-203", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Step4/entries-316", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/js/prod.js-126", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Step4/canonical.html-149", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.css-239", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/css/latofonts.css-275", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-217", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/submit/firefox-desktop/events/1/259b83ac-ab41-4da7-be8f-791dc6e10eec-292", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/css/latofonts.css-151", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/check-278", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-301", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/imgs/front.jpg-312", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/view-249", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/css/latostyle.css-299", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Step4/bm.png-157", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/bm.png-276", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "Step4/check-280", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/css/latostyle.css-180", "isController": false}, {"data": [[300.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Login/login-80", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/imgs/macbook_air.jpg-174", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-214", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/prod.html-176", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-289", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/config.json-244", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/check-225", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "Step4/v1/tiles-293", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Step4/view-257", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/view-135", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Step4/view-134", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/view-255", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/check-223", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/view-254", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-123", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/view-253", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Step4/view-252", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/css/latostyle.css-208", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/view-251", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/index.html-296", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/view-250", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Step4/canonical.html-127", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Step5/success.txt-329", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-270", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-153", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-177", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-297", "isController": false}, {"data": [[1300.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-236", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-232", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Step5/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-323", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/entries-143", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/bm.png-218", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/addtocart-229", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "Step4/addtocart-228", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/viewcart-281", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/check-247", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Step4/success.txt-132", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Step4/success.txt-131", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Step4/check-245", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "Step4/imgs/dell.jpg-175", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step5/canonical.html-324", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Step4/config.json-142", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/bycat-200", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/bycat-201", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-206", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "Step4/deleteitem-262", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Step5/css/latostyle.css-332", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/prod.html-146", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/deleteitem-261", "isController": false}, {"data": [[300.0, 3.0]], "isOverall": false, "label": "Registration/signup-78", "isController": false}, {"data": [[2000.0, 1.0]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-256", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/addtocart-139", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Step4/addtocart-138", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/cart.html-263", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-185", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/view-287", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Step5/js/index.js-327", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/view-282", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Step5/success.txt-330", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/view-286", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "Step4/nexus1.jpg-313", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/view-164", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/view-285", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/view-284", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/view-162", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "Step4/view-283", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Step4/config.json-130", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Step4/canonical.html-210", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/js/prod.js-216", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Step4/canonical.html-215", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/deletecart-294", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Step4/deletecart-295", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/entries-170", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Step4/config.json-168", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Step4/success.txt-310", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Step4/css/latostyle.css-125", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/addtocart-141", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Step4/success.txt-311", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step5/imgs/front.jpg-320", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/addtocart-140", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "Step4/iphone1.jpg-307", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-148", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-269", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/config.json-160", "isController": false}, {"data": [[2400.0, 1.0], [2600.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Registration/signup-77", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/viewcart-248", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Step4/imgs/Lumia_1520.jpg-258", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/config.json-277", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Step5/imgs/front.jpg-339", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-150", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/viewcart-246", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step5/node_modules/bootstrap/dist/css/bootstrap.min.css-322", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/css/latostyle.css-235", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-156", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-238", "isController": false}, {"data": [[1600.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-273", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "Step4/bycat-172", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "Step4/imgs/sony_vaio_5.jpg-291", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/bycat-173", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Step4/css/latofonts.css-207", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-241", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Step4/addtocart-167", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/addtocart-166", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Step4/cart.html-230", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-205", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/config.json-188", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/viewcart-279", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Step5/index.html-321", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-152", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Step4/success.txt-213", "isController": false}, {"data": [[1700.0, 1.0]], "isOverall": false, "label": "Step4/imgs/galaxy_s6.jpg-290", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Step4/success.txt-212", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-227", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-267", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/view-192", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "Step4/imgs/sony_vaio_5.jpg-260", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step5/node_modules/jquery/dist/jquery.min.js-325", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/view-190", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Step4/canonical.html-305", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Step4/bm.png-309", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/check-317", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-304", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/check-315", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Step4/success.txt-220", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-265", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Step4/success.txt-221", "isController": false}, {"data": [[300.0, 3.0]], "isOverall": false, "label": "InvalidLogin/Invalidlogin-114", "isController": false}, {"data": [[600.0, 3.0]], "isOverall": false, "label": "InvalidLogin/Invalidlogin-113", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-219", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-233", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-119", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Step4/js/index.js-306", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Step4/check-189", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-202", "isController": false}, {"data": [[2600.0, 1.0]], "isOverall": false, "label": "Step5/node_modules/tether/dist/js/tether.min.js-319", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-303", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "Step4/js/prod.js-186", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/check-191", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-182", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Step4/prod.html-204", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Step5/node_modules/video.js/dist/video-js.min.css-328", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-274", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step5/bm.png-336", "isController": false}, {"data": [[2900.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-120", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-181", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Step4/addtocart-195", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Step4/js/cart.js-242", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/addtocart-194", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Step4/config.json-196", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/css/latofonts.css-124", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Step4/Samsung1.jpg-308", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-237", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Step4/imgs/front.jpg-128", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Step4/imgs/Lumia_1520.jpg-165", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/entries-197", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Step4/css/latostyle.css-268", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/js/cart.js-272", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Step4/imgs/galaxy_s6.jpg-137", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/bm.png-187", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Step4/imgs/galaxy_s6.jpg-259", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Step5/node_modules/tether/dist/js/tether.min.js-334", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "Login/v3/firefox/global-recs-112", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/css/latofonts.css-234", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-184", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/check-198", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Step4/check-199", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-231", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-298", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-179", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "Step4/imgs/sony_vaio_5.jpg-193", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "Step4/submit/firefox-desktop/baseline/1/c901a8c0-dcd2-4f6e-8a79-b05bddf50429-288", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 2900.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 14.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 144.0, "series": [{"data": [[0.0, 144.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 79.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 14.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.64992842E12, "maxY": 3.0, "series": [{"data": [[1.64992842E12, 1.0]], "isOverall": false, "label": "Contanct Information", "isController": false}, {"data": [[1.64992842E12, 3.0]], "isOverall": false, "label": "Registration Scenario", "isController": false}, {"data": [[1.64992842E12, 1.0], [1.64992854E12, 1.0], [1.64992848E12, 1.0]], "isOverall": false, "label": "Update the Contact Info", "isController": false}, {"data": [[1.64992842E12, 2.7777777777777777]], "isOverall": false, "label": "Invalid Login", "isController": false}, {"data": [[1.64992842E12, 2.5]], "isOverall": false, "label": "Login Scenario", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64992854E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 59.0, "minX": 1.0, "maxY": 2990.0, "series": [{"data": [[1.0, 409.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-183", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-183-Aggregated", "isController": false}, {"data": [[1.0, 220.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-147", "isController": false}, {"data": [[1.0, 220.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-147-Aggregated", "isController": false}, {"data": [[1.0, 308.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.css-266", "isController": false}, {"data": [[1.0, 308.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.css-266-Aggregated", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "Step4/check-144", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "Step4/check-144-Aggregated", "isController": false}, {"data": [[1.0, 233.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-264", "isController": false}, {"data": [[1.0, 233.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-264-Aggregated", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "Step4/check-145", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "Step4/check-145-Aggregated", "isController": false}, {"data": [[1.0, 101.0]], "isOverall": false, "label": "Step4/success.txt-158", "isController": false}, {"data": [[1.0, 101.0]], "isOverall": false, "label": "Step4/success.txt-158-Aggregated", "isController": false}, {"data": [[1.0, 1436.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-300", "isController": false}, {"data": [[1.0, 1436.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-300-Aggregated", "isController": false}, {"data": [[1.0, 512.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-211", "isController": false}, {"data": [[1.0, 512.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-211-Aggregated", "isController": false}, {"data": [[1.0, 102.0]], "isOverall": false, "label": "Step4/success.txt-159", "isController": false}, {"data": [[1.0, 102.0]], "isOverall": false, "label": "Step4/success.txt-159-Aggregated", "isController": false}, {"data": [[1.0, 413.0]], "isOverall": false, "label": "Step4/bm.png-243", "isController": false}, {"data": [[1.0, 413.0]], "isOverall": false, "label": "Step4/bm.png-243-Aggregated", "isController": false}, {"data": [[1.0, 205.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-302", "isController": false}, {"data": [[1.0, 205.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-302-Aggregated", "isController": false}, {"data": [[2.0, 754.0]], "isOverall": false, "label": "Step5/node_modules/video.js/dist/video.min.js-326", "isController": false}, {"data": [[2.0, 754.0]], "isOverall": false, "label": "Step5/node_modules/video.js/dist/video.min.js-326-Aggregated", "isController": false}, {"data": [[1.0, 308.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-209", "isController": false}, {"data": [[1.0, 308.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-209-Aggregated", "isController": false}, {"data": [[2.0, 73.0]], "isOverall": false, "label": "Step4/bm.png-129", "isController": false}, {"data": [[2.0, 73.0]], "isOverall": false, "label": "Step4/bm.png-129-Aggregated", "isController": false}, {"data": [[1.0, 407.0]], "isOverall": false, "label": "Step4/config.json-314", "isController": false}, {"data": [[1.0, 407.0]], "isOverall": false, "label": "Step4/config.json-314-Aggregated", "isController": false}, {"data": [[1.0, 356.0]], "isOverall": false, "label": "Step4/check-136", "isController": false}, {"data": [[1.0, 356.0]], "isOverall": false, "label": "Step4/check-136-Aggregated", "isController": false}, {"data": [[1.0, 199.0]], "isOverall": false, "label": "Step4/css/latofonts.css-178", "isController": false}, {"data": [[1.0, 199.0]], "isOverall": false, "label": "Step4/css/latofonts.css-178-Aggregated", "isController": false}, {"data": [[1.0, 308.0]], "isOverall": false, "label": "Step4/view-224", "isController": false}, {"data": [[1.0, 308.0]], "isOverall": false, "label": "Step4/view-224-Aggregated", "isController": false}, {"data": [[2.0, 530.0]], "isOverall": false, "label": "Step4/check-133", "isController": false}, {"data": [[2.0, 530.0]], "isOverall": false, "label": "Step4/check-133-Aggregated", "isController": false}, {"data": [[1.0, 411.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-240", "isController": false}, {"data": [[1.0, 411.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-240-Aggregated", "isController": false}, {"data": [[6.0, 143.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-121", "isController": false}, {"data": [[6.0, 143.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-121-Aggregated", "isController": false}, {"data": [[1.0, 614.0]], "isOverall": false, "label": "Step4/view-226", "isController": false}, {"data": [[1.0, 614.0]], "isOverall": false, "label": "Step4/view-226-Aggregated", "isController": false}, {"data": [[2.0, 279.0]], "isOverall": false, "label": "Step5/css/latofonts.css-331", "isController": false}, {"data": [[2.0, 279.0]], "isOverall": false, "label": "Step5/css/latofonts.css-331-Aggregated", "isController": false}, {"data": [[1.0, 397.0]], "isOverall": false, "label": "Step4/js/prod.js-155", "isController": false}, {"data": [[1.0, 397.0]], "isOverall": false, "label": "Step4/js/prod.js-155-Aggregated", "isController": false}, {"data": [[1.0, 717.0]], "isOverall": false, "label": "Step4/check-169", "isController": false}, {"data": [[1.0, 717.0]], "isOverall": false, "label": "Step4/check-169-Aggregated", "isController": false}, {"data": [[1.0, 206.0]], "isOverall": false, "label": "Step4/config.json-222", "isController": false}, {"data": [[1.0, 206.0]], "isOverall": false, "label": "Step4/config.json-222-Aggregated", "isController": false}, {"data": [[1.0, 611.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-271", "isController": false}, {"data": [[1.0, 611.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-271-Aggregated", "isController": false}, {"data": [[2.0, 106.0]], "isOverall": false, "label": "Step5/node_modules/bootstrap/dist/js/bootstrap.min.js-333", "isController": false}, {"data": [[2.0, 106.0]], "isOverall": false, "label": "Step5/node_modules/bootstrap/dist/js/bootstrap.min.js-333-Aggregated", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "Step4/check-161", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "Step4/check-161-Aggregated", "isController": false}, {"data": [[1.0, 310.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-154", "isController": false}, {"data": [[1.0, 310.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-154-Aggregated", "isController": false}, {"data": [[1.0, 316.0]], "isOverall": false, "label": "Step4/check-163", "isController": false}, {"data": [[1.0, 316.0]], "isOverall": false, "label": "Step4/check-163-Aggregated", "isController": false}, {"data": [[11.0, 2382.3333333333335]], "isOverall": false, "label": "Login/login-79", "isController": false}, {"data": [[11.0, 2382.3333333333335]], "isOverall": false, "label": "Login/login-79-Aggregated", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "Step4/check-171", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "Step4/check-171-Aggregated", "isController": false}, {"data": [[1.0, 927.0]], "isOverall": false, "label": "Step4/imgs/asusm.jpg-203", "isController": false}, {"data": [[1.0, 927.0]], "isOverall": false, "label": "Step4/imgs/asusm.jpg-203-Aggregated", "isController": false}, {"data": [[1.0, 500.0]], "isOverall": false, "label": "Step4/entries-316", "isController": false}, {"data": [[1.0, 500.0]], "isOverall": false, "label": "Step4/entries-316-Aggregated", "isController": false}, {"data": [[2.0, 461.0]], "isOverall": false, "label": "Step4/js/prod.js-126", "isController": false}, {"data": [[2.0, 461.0]], "isOverall": false, "label": "Step4/js/prod.js-126-Aggregated", "isController": false}, {"data": [[1.0, 100.0]], "isOverall": false, "label": "Step4/canonical.html-149", "isController": false}, {"data": [[1.0, 100.0]], "isOverall": false, "label": "Step4/canonical.html-149-Aggregated", "isController": false}, {"data": [[1.0, 304.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.css-239", "isController": false}, {"data": [[1.0, 304.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.css-239-Aggregated", "isController": false}, {"data": [[1.0, 410.0]], "isOverall": false, "label": "Step4/css/latofonts.css-275", "isController": false}, {"data": [[1.0, 410.0]], "isOverall": false, "label": "Step4/css/latofonts.css-275-Aggregated", "isController": false}, {"data": [[1.0, 1028.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-217", "isController": false}, {"data": [[1.0, 1028.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-217-Aggregated", "isController": false}, {"data": [[1.0, 399.0]], "isOverall": false, "label": "Step4/submit/firefox-desktop/events/1/259b83ac-ab41-4da7-be8f-791dc6e10eec-292", "isController": false}, {"data": [[1.0, 399.0]], "isOverall": false, "label": "Step4/submit/firefox-desktop/events/1/259b83ac-ab41-4da7-be8f-791dc6e10eec-292-Aggregated", "isController": false}, {"data": [[1.0, 305.0]], "isOverall": false, "label": "Step4/css/latofonts.css-151", "isController": false}, {"data": [[1.0, 305.0]], "isOverall": false, "label": "Step4/css/latofonts.css-151-Aggregated", "isController": false}, {"data": [[1.0, 410.0]], "isOverall": false, "label": "Step4/check-278", "isController": false}, {"data": [[1.0, 410.0]], "isOverall": false, "label": "Step4/check-278-Aggregated", "isController": false}, {"data": [[1.0, 210.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-301", "isController": false}, {"data": [[1.0, 210.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-301-Aggregated", "isController": false}, {"data": [[1.0, 402.0]], "isOverall": false, "label": "Step4/imgs/front.jpg-312", "isController": false}, {"data": [[1.0, 402.0]], "isOverall": false, "label": "Step4/imgs/front.jpg-312-Aggregated", "isController": false}, {"data": [[1.0, 408.0]], "isOverall": false, "label": "Step4/view-249", "isController": false}, {"data": [[1.0, 408.0]], "isOverall": false, "label": "Step4/view-249-Aggregated", "isController": false}, {"data": [[1.0, 403.0]], "isOverall": false, "label": "Step4/css/latostyle.css-299", "isController": false}, {"data": [[1.0, 403.0]], "isOverall": false, "label": "Step4/css/latostyle.css-299-Aggregated", "isController": false}, {"data": [[1.0, 97.0]], "isOverall": false, "label": "Step4/bm.png-157", "isController": false}, {"data": [[1.0, 97.0]], "isOverall": false, "label": "Step4/bm.png-157-Aggregated", "isController": false}, {"data": [[1.0, 407.0]], "isOverall": false, "label": "Step4/bm.png-276", "isController": false}, {"data": [[1.0, 407.0]], "isOverall": false, "label": "Step4/bm.png-276-Aggregated", "isController": false}, {"data": [[1.0, 748.0]], "isOverall": false, "label": "Step4/check-280", "isController": false}, {"data": [[1.0, 748.0]], "isOverall": false, "label": "Step4/check-280-Aggregated", "isController": false}, {"data": [[1.0, 307.0]], "isOverall": false, "label": "Step4/css/latostyle.css-180", "isController": false}, {"data": [[1.0, 307.0]], "isOverall": false, "label": "Step4/css/latostyle.css-180-Aggregated", "isController": false}, {"data": [[8.0, 393.0], [6.0, 536.0], [7.0, 400.0]], "isOverall": false, "label": "Login/login-80", "isController": false}, {"data": [[7.0, 443.0]], "isOverall": false, "label": "Login/login-80-Aggregated", "isController": false}, {"data": [[1.0, 618.0]], "isOverall": false, "label": "Step4/imgs/macbook_air.jpg-174", "isController": false}, {"data": [[1.0, 618.0]], "isOverall": false, "label": "Step4/imgs/macbook_air.jpg-174-Aggregated", "isController": false}, {"data": [[1.0, 618.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-214", "isController": false}, {"data": [[1.0, 618.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-214-Aggregated", "isController": false}, {"data": [[1.0, 405.0]], "isOverall": false, "label": "Step4/prod.html-176", "isController": false}, {"data": [[1.0, 405.0]], "isOverall": false, "label": "Step4/prod.html-176-Aggregated", "isController": false}, {"data": [[1.0, 592.0]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-289", "isController": false}, {"data": [[1.0, 592.0]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-289-Aggregated", "isController": false}, {"data": [[1.0, 404.0]], "isOverall": false, "label": "Step4/config.json-244", "isController": false}, {"data": [[1.0, 404.0]], "isOverall": false, "label": "Step4/config.json-244-Aggregated", "isController": false}, {"data": [[1.0, 614.0]], "isOverall": false, "label": "Step4/check-225", "isController": false}, {"data": [[1.0, 614.0]], "isOverall": false, "label": "Step4/check-225-Aggregated", "isController": false}, {"data": [[1.0, 1112.0]], "isOverall": false, "label": "Step4/v1/tiles-293", "isController": false}, {"data": [[1.0, 1112.0]], "isOverall": false, "label": "Step4/v1/tiles-293-Aggregated", "isController": false}, {"data": [[1.0, 292.0]], "isOverall": false, "label": "Step4/view-257", "isController": false}, {"data": [[1.0, 292.0]], "isOverall": false, "label": "Step4/view-257-Aggregated", "isController": false}, {"data": [[2.0, 328.0]], "isOverall": false, "label": "Step4/view-135", "isController": false}, {"data": [[2.0, 328.0]], "isOverall": false, "label": "Step4/view-135-Aggregated", "isController": false}, {"data": [[2.0, 272.0]], "isOverall": false, "label": "Step4/view-134", "isController": false}, {"data": [[2.0, 272.0]], "isOverall": false, "label": "Step4/view-134-Aggregated", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "Step4/view-255", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "Step4/view-255-Aggregated", "isController": false}, {"data": [[1.0, 614.0]], "isOverall": false, "label": "Step4/check-223", "isController": false}, {"data": [[1.0, 614.0]], "isOverall": false, "label": "Step4/check-223-Aggregated", "isController": false}, {"data": [[1.0, 306.0]], "isOverall": false, "label": "Step4/view-254", "isController": false}, {"data": [[1.0, 306.0]], "isOverall": false, "label": "Step4/view-254-Aggregated", "isController": false}, {"data": [[2.0, 489.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-123", "isController": false}, {"data": [[2.0, 489.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-123-Aggregated", "isController": false}, {"data": [[1.0, 306.0]], "isOverall": false, "label": "Step4/view-253", "isController": false}, {"data": [[1.0, 306.0]], "isOverall": false, "label": "Step4/view-253-Aggregated", "isController": false}, {"data": [[1.0, 512.0]], "isOverall": false, "label": "Step4/view-252", "isController": false}, {"data": [[1.0, 512.0]], "isOverall": false, "label": "Step4/view-252-Aggregated", "isController": false}, {"data": [[1.0, 346.0]], "isOverall": false, "label": "Step4/css/latostyle.css-208", "isController": false}, {"data": [[1.0, 346.0]], "isOverall": false, "label": "Step4/css/latostyle.css-208-Aggregated", "isController": false}, {"data": [[1.0, 615.0]], "isOverall": false, "label": "Step4/view-251", "isController": false}, {"data": [[1.0, 615.0]], "isOverall": false, "label": "Step4/view-251-Aggregated", "isController": false}, {"data": [[1.0, 308.0]], "isOverall": false, "label": "Step4/index.html-296", "isController": false}, {"data": [[1.0, 308.0]], "isOverall": false, "label": "Step4/index.html-296-Aggregated", "isController": false}, {"data": [[1.0, 408.0]], "isOverall": false, "label": "Step4/view-250", "isController": false}, {"data": [[1.0, 408.0]], "isOverall": false, "label": "Step4/view-250-Aggregated", "isController": false}, {"data": [[2.0, 150.0]], "isOverall": false, "label": "Step4/canonical.html-127", "isController": false}, {"data": [[2.0, 150.0]], "isOverall": false, "label": "Step4/canonical.html-127-Aggregated", "isController": false}, {"data": [[2.0, 68.0]], "isOverall": false, "label": "Step5/success.txt-329", "isController": false}, {"data": [[2.0, 68.0]], "isOverall": false, "label": "Step5/success.txt-329-Aggregated", "isController": false}, {"data": [[1.0, 204.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-270", "isController": false}, {"data": [[1.0, 204.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-270-Aggregated", "isController": false}, {"data": [[1.0, 621.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-153", "isController": false}, {"data": [[1.0, 621.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-153-Aggregated", "isController": false}, {"data": [[1.0, 322.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-177", "isController": false}, {"data": [[1.0, 322.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-177-Aggregated", "isController": false}, {"data": [[1.0, 408.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-297", "isController": false}, {"data": [[1.0, 408.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-297-Aggregated", "isController": false}, {"data": [[1.0, 1398.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-236", "isController": false}, {"data": [[1.0, 1398.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-236-Aggregated", "isController": false}, {"data": [[1.0, 410.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-232", "isController": false}, {"data": [[1.0, 410.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-232-Aggregated", "isController": false}, {"data": [[2.0, 184.0]], "isOverall": false, "label": "Step5/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-323", "isController": false}, {"data": [[2.0, 184.0]], "isOverall": false, "label": "Step5/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-323-Aggregated", "isController": false}, {"data": [[1.0, 614.0]], "isOverall": false, "label": "Step4/entries-143", "isController": false}, {"data": [[1.0, 614.0]], "isOverall": false, "label": "Step4/entries-143-Aggregated", "isController": false}, {"data": [[1.0, 306.0]], "isOverall": false, "label": "Step4/bm.png-218", "isController": false}, {"data": [[1.0, 306.0]], "isOverall": false, "label": "Step4/bm.png-218-Aggregated", "isController": false}, {"data": [[1.0, 612.0]], "isOverall": false, "label": "Step4/addtocart-229", "isController": false}, {"data": [[1.0, 612.0]], "isOverall": false, "label": "Step4/addtocart-229-Aggregated", "isController": false}, {"data": [[1.0, 705.0]], "isOverall": false, "label": "Step4/addtocart-228", "isController": false}, {"data": [[1.0, 705.0]], "isOverall": false, "label": "Step4/addtocart-228-Aggregated", "isController": false}, {"data": [[1.0, 483.0]], "isOverall": false, "label": "Step4/viewcart-281", "isController": false}, {"data": [[1.0, 483.0]], "isOverall": false, "label": "Step4/viewcart-281-Aggregated", "isController": false}, {"data": [[1.0, 613.0]], "isOverall": false, "label": "Step4/check-247", "isController": false}, {"data": [[1.0, 613.0]], "isOverall": false, "label": "Step4/check-247-Aggregated", "isController": false}, {"data": [[2.0, 59.0]], "isOverall": false, "label": "Step4/success.txt-132", "isController": false}, {"data": [[2.0, 59.0]], "isOverall": false, "label": "Step4/success.txt-132-Aggregated", "isController": false}, {"data": [[2.0, 64.0]], "isOverall": false, "label": "Step4/success.txt-131", "isController": false}, {"data": [[2.0, 64.0]], "isOverall": false, "label": "Step4/success.txt-131-Aggregated", "isController": false}, {"data": [[1.0, 513.0]], "isOverall": false, "label": "Step4/check-245", "isController": false}, {"data": [[1.0, 513.0]], "isOverall": false, "label": "Step4/check-245-Aggregated", "isController": false}, {"data": [[1.0, 914.0]], "isOverall": false, "label": "Step4/imgs/dell.jpg-175", "isController": false}, {"data": [[1.0, 914.0]], "isOverall": false, "label": "Step4/imgs/dell.jpg-175-Aggregated", "isController": false}, {"data": [[6.0, 372.0]], "isOverall": false, "label": "Step5/canonical.html-324", "isController": false}, {"data": [[6.0, 372.0]], "isOverall": false, "label": "Step5/canonical.html-324-Aggregated", "isController": false}, {"data": [[1.0, 511.0]], "isOverall": false, "label": "Step4/config.json-142", "isController": false}, {"data": [[1.0, 511.0]], "isOverall": false, "label": "Step4/config.json-142-Aggregated", "isController": false}, {"data": [[1.0, 354.0]], "isOverall": false, "label": "Step4/bycat-200", "isController": false}, {"data": [[1.0, 354.0]], "isOverall": false, "label": "Step4/bycat-200-Aggregated", "isController": false}, {"data": [[1.0, 368.0]], "isOverall": false, "label": "Step4/bycat-201", "isController": false}, {"data": [[1.0, 368.0]], "isOverall": false, "label": "Step4/bycat-201-Aggregated", "isController": false}, {"data": [[1.0, 795.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-206", "isController": false}, {"data": [[1.0, 795.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-206-Aggregated", "isController": false}, {"data": [[1.0, 952.0]], "isOverall": false, "label": "Step4/deleteitem-262", "isController": false}, {"data": [[1.0, 952.0]], "isOverall": false, "label": "Step4/deleteitem-262-Aggregated", "isController": false}, {"data": [[2.0, 293.0]], "isOverall": false, "label": "Step5/css/latostyle.css-332", "isController": false}, {"data": [[2.0, 293.0]], "isOverall": false, "label": "Step5/css/latostyle.css-332-Aggregated", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "Step4/prod.html-146", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "Step4/prod.html-146-Aggregated", "isController": false}, {"data": [[1.0, 337.0]], "isOverall": false, "label": "Step4/deleteitem-261", "isController": false}, {"data": [[1.0, 337.0]], "isOverall": false, "label": "Step4/deleteitem-261-Aggregated", "isController": false}, {"data": [[11.0, 372.3333333333333]], "isOverall": false, "label": "Registration/signup-78", "isController": false}, {"data": [[11.0, 372.3333333333333]], "isOverall": false, "label": "Registration/signup-78-Aggregated", "isController": false}, {"data": [[1.0, 2013.0]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-256", "isController": false}, {"data": [[1.0, 2013.0]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-256-Aggregated", "isController": false}, {"data": [[1.0, 410.0]], "isOverall": false, "label": "Step4/addtocart-139", "isController": false}, {"data": [[1.0, 410.0]], "isOverall": false, "label": "Step4/addtocart-139-Aggregated", "isController": false}, {"data": [[1.0, 509.0]], "isOverall": false, "label": "Step4/addtocart-138", "isController": false}, {"data": [[1.0, 509.0]], "isOverall": false, "label": "Step4/addtocart-138-Aggregated", "isController": false}, {"data": [[1.0, 359.0]], "isOverall": false, "label": "Step4/cart.html-263", "isController": false}, {"data": [[1.0, 359.0]], "isOverall": false, "label": "Step4/cart.html-263-Aggregated", "isController": false}, {"data": [[1.0, 613.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-185", "isController": false}, {"data": [[1.0, 613.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-185-Aggregated", "isController": false}, {"data": [[1.0, 407.0]], "isOverall": false, "label": "Step4/view-287", "isController": false}, {"data": [[1.0, 407.0]], "isOverall": false, "label": "Step4/view-287-Aggregated", "isController": false}, {"data": [[2.0, 96.0]], "isOverall": false, "label": "Step5/js/index.js-327", "isController": false}, {"data": [[2.0, 96.0]], "isOverall": false, "label": "Step5/js/index.js-327-Aggregated", "isController": false}, {"data": [[1.0, 411.0]], "isOverall": false, "label": "Step4/view-282", "isController": false}, {"data": [[1.0, 411.0]], "isOverall": false, "label": "Step4/view-282-Aggregated", "isController": false}, {"data": [[2.0, 62.0]], "isOverall": false, "label": "Step5/success.txt-330", "isController": false}, {"data": [[2.0, 62.0]], "isOverall": false, "label": "Step5/success.txt-330-Aggregated", "isController": false}, {"data": [[1.0, 305.0]], "isOverall": false, "label": "Step4/view-286", "isController": false}, {"data": [[1.0, 305.0]], "isOverall": false, "label": "Step4/view-286-Aggregated", "isController": false}, {"data": [[1.0, 1236.0]], "isOverall": false, "label": "Step4/nexus1.jpg-313", "isController": false}, {"data": [[1.0, 1236.0]], "isOverall": false, "label": "Step4/nexus1.jpg-313-Aggregated", "isController": false}, {"data": [[1.0, 399.0]], "isOverall": false, "label": "Step4/view-164", "isController": false}, {"data": [[1.0, 399.0]], "isOverall": false, "label": "Step4/view-164-Aggregated", "isController": false}, {"data": [[1.0, 616.0]], "isOverall": false, "label": "Step4/view-285", "isController": false}, {"data": [[1.0, 616.0]], "isOverall": false, "label": "Step4/view-285-Aggregated", "isController": false}, {"data": [[1.0, 304.0]], "isOverall": false, "label": "Step4/view-284", "isController": false}, {"data": [[1.0, 304.0]], "isOverall": false, "label": "Step4/view-284-Aggregated", "isController": false}, {"data": [[1.0, 306.0]], "isOverall": false, "label": "Step4/view-162", "isController": false}, {"data": [[1.0, 306.0]], "isOverall": false, "label": "Step4/view-162-Aggregated", "isController": false}, {"data": [[1.0, 715.0]], "isOverall": false, "label": "Step4/view-283", "isController": false}, {"data": [[1.0, 715.0]], "isOverall": false, "label": "Step4/view-283-Aggregated", "isController": false}, {"data": [[2.0, 95.0]], "isOverall": false, "label": "Step4/config.json-130", "isController": false}, {"data": [[2.0, 95.0]], "isOverall": false, "label": "Step4/config.json-130-Aggregated", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "Step4/canonical.html-210", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "Step4/canonical.html-210-Aggregated", "isController": false}, {"data": [[1.0, 302.0]], "isOverall": false, "label": "Step4/js/prod.js-216", "isController": false}, {"data": [[1.0, 302.0]], "isOverall": false, "label": "Step4/js/prod.js-216-Aggregated", "isController": false}, {"data": [[1.0, 204.0]], "isOverall": false, "label": "Step4/canonical.html-215", "isController": false}, {"data": [[1.0, 204.0]], "isOverall": false, "label": "Step4/canonical.html-215-Aggregated", "isController": false}, {"data": [[1.0, 610.0]], "isOverall": false, "label": "Step4/deletecart-294", "isController": false}, {"data": [[1.0, 610.0]], "isOverall": false, "label": "Step4/deletecart-294-Aggregated", "isController": false}, {"data": [[1.0, 512.0]], "isOverall": false, "label": "Step4/deletecart-295", "isController": false}, {"data": [[1.0, 512.0]], "isOverall": false, "label": "Step4/deletecart-295-Aggregated", "isController": false}, {"data": [[1.0, 408.0]], "isOverall": false, "label": "Step4/entries-170", "isController": false}, {"data": [[1.0, 408.0]], "isOverall": false, "label": "Step4/entries-170-Aggregated", "isController": false}, {"data": [[1.0, 205.0]], "isOverall": false, "label": "Step4/config.json-168", "isController": false}, {"data": [[1.0, 205.0]], "isOverall": false, "label": "Step4/config.json-168-Aggregated", "isController": false}, {"data": [[1.0, 205.0]], "isOverall": false, "label": "Step4/success.txt-310", "isController": false}, {"data": [[1.0, 205.0]], "isOverall": false, "label": "Step4/success.txt-310-Aggregated", "isController": false}, {"data": [[2.0, 278.0]], "isOverall": false, "label": "Step4/css/latostyle.css-125", "isController": false}, {"data": [[2.0, 278.0]], "isOverall": false, "label": "Step4/css/latostyle.css-125-Aggregated", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "Step4/addtocart-141", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "Step4/addtocart-141-Aggregated", "isController": false}, {"data": [[1.0, 101.0]], "isOverall": false, "label": "Step4/success.txt-311", "isController": false}, {"data": [[1.0, 101.0]], "isOverall": false, "label": "Step4/success.txt-311-Aggregated", "isController": false}, {"data": [[11.0, 347.0]], "isOverall": false, "label": "Step5/imgs/front.jpg-320", "isController": false}, {"data": [[11.0, 347.0]], "isOverall": false, "label": "Step5/imgs/front.jpg-320-Aggregated", "isController": false}, {"data": [[1.0, 305.0]], "isOverall": false, "label": "Step4/addtocart-140", "isController": false}, {"data": [[1.0, 305.0]], "isOverall": false, "label": "Step4/addtocart-140-Aggregated", "isController": false}, {"data": [[1.0, 1139.0]], "isOverall": false, "label": "Step4/iphone1.jpg-307", "isController": false}, {"data": [[1.0, 1139.0]], "isOverall": false, "label": "Step4/iphone1.jpg-307-Aggregated", "isController": false}, {"data": [[1.0, 618.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-148", "isController": false}, {"data": [[1.0, 618.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-148-Aggregated", "isController": false}, {"data": [[1.0, 617.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-269", "isController": false}, {"data": [[1.0, 617.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-269-Aggregated", "isController": false}, {"data": [[1.0, 411.0]], "isOverall": false, "label": "Step4/config.json-160", "isController": false}, {"data": [[1.0, 411.0]], "isOverall": false, "label": "Step4/config.json-160-Aggregated", "isController": false}, {"data": [[11.0, 2389.3333333333335]], "isOverall": false, "label": "Registration/signup-77", "isController": false}, {"data": [[11.0, 2389.3333333333335]], "isOverall": false, "label": "Registration/signup-77-Aggregated", "isController": false}, {"data": [[1.0, 614.0]], "isOverall": false, "label": "Step4/viewcart-248", "isController": false}, {"data": [[1.0, 614.0]], "isOverall": false, "label": "Step4/viewcart-248-Aggregated", "isController": false}, {"data": [[1.0, 223.0]], "isOverall": false, "label": "Step4/imgs/Lumia_1520.jpg-258", "isController": false}, {"data": [[1.0, 223.0]], "isOverall": false, "label": "Step4/imgs/Lumia_1520.jpg-258-Aggregated", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "Step4/config.json-277", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "Step4/config.json-277-Aggregated", "isController": false}, {"data": [[2.0, 101.0]], "isOverall": false, "label": "Step5/imgs/front.jpg-339", "isController": false}, {"data": [[2.0, 101.0]], "isOverall": false, "label": "Step5/imgs/front.jpg-339-Aggregated", "isController": false}, {"data": [[1.0, 397.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-150", "isController": false}, {"data": [[1.0, 397.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-150-Aggregated", "isController": false}, {"data": [[1.0, 616.0]], "isOverall": false, "label": "Step4/viewcart-246", "isController": false}, {"data": [[1.0, 616.0]], "isOverall": false, "label": "Step4/viewcart-246-Aggregated", "isController": false}, {"data": [[2.0, 488.0]], "isOverall": false, "label": "Step5/node_modules/bootstrap/dist/css/bootstrap.min.css-322", "isController": false}, {"data": [[2.0, 488.0]], "isOverall": false, "label": "Step5/node_modules/bootstrap/dist/css/bootstrap.min.css-322-Aggregated", "isController": false}, {"data": [[1.0, 332.0]], "isOverall": false, "label": "Step4/css/latostyle.css-235", "isController": false}, {"data": [[1.0, 332.0]], "isOverall": false, "label": "Step4/css/latostyle.css-235-Aggregated", "isController": false}, {"data": [[1.0, 926.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-156", "isController": false}, {"data": [[1.0, 926.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-156-Aggregated", "isController": false}, {"data": [[1.0, 200.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-238", "isController": false}, {"data": [[1.0, 200.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-238-Aggregated", "isController": false}, {"data": [[1.0, 1640.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-273", "isController": false}, {"data": [[1.0, 1640.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-273-Aggregated", "isController": false}, {"data": [[1.0, 722.0]], "isOverall": false, "label": "Step4/bycat-172", "isController": false}, {"data": [[1.0, 722.0]], "isOverall": false, "label": "Step4/bycat-172-Aggregated", "isController": false}, {"data": [[1.0, 1046.0]], "isOverall": false, "label": "Step4/imgs/sony_vaio_5.jpg-291", "isController": false}, {"data": [[1.0, 1046.0]], "isOverall": false, "label": "Step4/imgs/sony_vaio_5.jpg-291-Aggregated", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "Step4/bycat-173", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "Step4/bycat-173-Aggregated", "isController": false}, {"data": [[1.0, 125.0]], "isOverall": false, "label": "Step4/css/latofonts.css-207", "isController": false}, {"data": [[1.0, 125.0]], "isOverall": false, "label": "Step4/css/latofonts.css-207-Aggregated", "isController": false}, {"data": [[1.0, 614.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-241", "isController": false}, {"data": [[1.0, 614.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-241-Aggregated", "isController": false}, {"data": [[1.0, 509.0]], "isOverall": false, "label": "Step4/addtocart-167", "isController": false}, {"data": [[1.0, 509.0]], "isOverall": false, "label": "Step4/addtocart-167-Aggregated", "isController": false}, {"data": [[1.0, 402.0]], "isOverall": false, "label": "Step4/addtocart-166", "isController": false}, {"data": [[1.0, 402.0]], "isOverall": false, "label": "Step4/addtocart-166-Aggregated", "isController": false}, {"data": [[1.0, 204.0]], "isOverall": false, "label": "Step4/cart.html-230", "isController": false}, {"data": [[1.0, 204.0]], "isOverall": false, "label": "Step4/cart.html-230-Aggregated", "isController": false}, {"data": [[1.0, 716.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-205", "isController": false}, {"data": [[1.0, 716.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-205-Aggregated", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "Step4/config.json-188", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "Step4/config.json-188-Aggregated", "isController": false}, {"data": [[1.0, 612.0]], "isOverall": false, "label": "Step4/viewcart-279", "isController": false}, {"data": [[1.0, 612.0]], "isOverall": false, "label": "Step4/viewcart-279-Aggregated", "isController": false}, {"data": [[11.0, 103.0]], "isOverall": false, "label": "Step5/index.html-321", "isController": false}, {"data": [[11.0, 103.0]], "isOverall": false, "label": "Step5/index.html-321-Aggregated", "isController": false}, {"data": [[1.0, 401.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-152", "isController": false}, {"data": [[1.0, 401.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-152-Aggregated", "isController": false}, {"data": [[1.0, 202.0]], "isOverall": false, "label": "Step4/success.txt-213", "isController": false}, {"data": [[1.0, 202.0]], "isOverall": false, "label": "Step4/success.txt-213-Aggregated", "isController": false}, {"data": [[1.0, 1732.0]], "isOverall": false, "label": "Step4/imgs/galaxy_s6.jpg-290", "isController": false}, {"data": [[1.0, 1732.0]], "isOverall": false, "label": "Step4/imgs/galaxy_s6.jpg-290-Aggregated", "isController": false}, {"data": [[1.0, 202.0]], "isOverall": false, "label": "Step4/success.txt-212", "isController": false}, {"data": [[1.0, 202.0]], "isOverall": false, "label": "Step4/success.txt-212-Aggregated", "isController": false}, {"data": [[1.0, 625.0]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-227", "isController": false}, {"data": [[1.0, 625.0]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-227-Aggregated", "isController": false}, {"data": [[1.0, 205.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-267", "isController": false}, {"data": [[1.0, 205.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-267-Aggregated", "isController": false}, {"data": [[1.0, 366.0]], "isOverall": false, "label": "Step4/view-192", "isController": false}, {"data": [[1.0, 366.0]], "isOverall": false, "label": "Step4/view-192-Aggregated", "isController": false}, {"data": [[1.0, 1134.0]], "isOverall": false, "label": "Step4/imgs/sony_vaio_5.jpg-260", "isController": false}, {"data": [[1.0, 1134.0]], "isOverall": false, "label": "Step4/imgs/sony_vaio_5.jpg-260-Aggregated", "isController": false}, {"data": [[2.0, 316.0]], "isOverall": false, "label": "Step5/node_modules/jquery/dist/jquery.min.js-325", "isController": false}, {"data": [[2.0, 316.0]], "isOverall": false, "label": "Step5/node_modules/jquery/dist/jquery.min.js-325-Aggregated", "isController": false}, {"data": [[1.0, 307.0]], "isOverall": false, "label": "Step4/view-190", "isController": false}, {"data": [[1.0, 307.0]], "isOverall": false, "label": "Step4/view-190-Aggregated", "isController": false}, {"data": [[1.0, 507.0]], "isOverall": false, "label": "Step4/canonical.html-305", "isController": false}, {"data": [[1.0, 507.0]], "isOverall": false, "label": "Step4/canonical.html-305-Aggregated", "isController": false}, {"data": [[1.0, 107.0]], "isOverall": false, "label": "Step4/bm.png-309", "isController": false}, {"data": [[1.0, 107.0]], "isOverall": false, "label": "Step4/bm.png-309-Aggregated", "isController": false}, {"data": [[1.0, 614.0]], "isOverall": false, "label": "Step4/check-317", "isController": false}, {"data": [[1.0, 614.0]], "isOverall": false, "label": "Step4/check-317-Aggregated", "isController": false}, {"data": [[1.0, 923.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-304", "isController": false}, {"data": [[1.0, 923.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-304-Aggregated", "isController": false}, {"data": [[1.0, 419.0]], "isOverall": false, "label": "Step4/check-315", "isController": false}, {"data": [[1.0, 419.0]], "isOverall": false, "label": "Step4/check-315-Aggregated", "isController": false}, {"data": [[1.0, 100.0]], "isOverall": false, "label": "Step4/success.txt-220", "isController": false}, {"data": [[1.0, 100.0]], "isOverall": false, "label": "Step4/success.txt-220-Aggregated", "isController": false}, {"data": [[1.0, 154.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-265", "isController": false}, {"data": [[1.0, 154.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-265-Aggregated", "isController": false}, {"data": [[1.0, 206.0]], "isOverall": false, "label": "Step4/success.txt-221", "isController": false}, {"data": [[1.0, 206.0]], "isOverall": false, "label": "Step4/success.txt-221-Aggregated", "isController": false}, {"data": [[5.0, 310.5], [3.0, 341.0]], "isOverall": false, "label": "InvalidLogin/Invalidlogin-114", "isController": false}, {"data": [[4.333333333333333, 320.6666666666667]], "isOverall": false, "label": "InvalidLogin/Invalidlogin-114-Aggregated", "isController": false}, {"data": [[11.0, 695.0]], "isOverall": false, "label": "InvalidLogin/Invalidlogin-113", "isController": false}, {"data": [[11.0, 695.0]], "isOverall": false, "label": "InvalidLogin/Invalidlogin-113-Aggregated", "isController": false}, {"data": [[1.0, 199.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-219", "isController": false}, {"data": [[1.0, 199.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-219-Aggregated", "isController": false}, {"data": [[1.0, 411.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-233", "isController": false}, {"data": [[1.0, 411.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-233-Aggregated", "isController": false}, {"data": [[8.0, 369.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-119", "isController": false}, {"data": [[8.0, 369.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-119-Aggregated", "isController": false}, {"data": [[1.0, 289.0]], "isOverall": false, "label": "Step4/js/index.js-306", "isController": false}, {"data": [[1.0, 289.0]], "isOverall": false, "label": "Step4/js/index.js-306-Aggregated", "isController": false}, {"data": [[1.0, 511.0]], "isOverall": false, "label": "Step4/check-189", "isController": false}, {"data": [[1.0, 511.0]], "isOverall": false, "label": "Step4/check-189-Aggregated", "isController": false}, {"data": [[1.0, 820.0]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-202", "isController": false}, {"data": [[1.0, 820.0]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-202-Aggregated", "isController": false}, {"data": [[11.0, 2676.0]], "isOverall": false, "label": "Step5/node_modules/tether/dist/js/tether.min.js-319", "isController": false}, {"data": [[11.0, 2676.0]], "isOverall": false, "label": "Step5/node_modules/tether/dist/js/tether.min.js-319-Aggregated", "isController": false}, {"data": [[1.0, 630.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-303", "isController": false}, {"data": [[1.0, 630.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-303-Aggregated", "isController": false}, {"data": [[1.0, 716.0]], "isOverall": false, "label": "Step4/js/prod.js-186", "isController": false}, {"data": [[1.0, 716.0]], "isOverall": false, "label": "Step4/js/prod.js-186-Aggregated", "isController": false}, {"data": [[1.0, 450.0]], "isOverall": false, "label": "Step4/check-191", "isController": false}, {"data": [[1.0, 450.0]], "isOverall": false, "label": "Step4/check-191-Aggregated", "isController": false}, {"data": [[1.0, 1027.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-182", "isController": false}, {"data": [[1.0, 1027.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-182-Aggregated", "isController": false}, {"data": [[1.0, 503.0]], "isOverall": false, "label": "Step4/prod.html-204", "isController": false}, {"data": [[1.0, 503.0]], "isOverall": false, "label": "Step4/prod.html-204-Aggregated", "isController": false}, {"data": [[2.0, 112.0]], "isOverall": false, "label": "Step5/node_modules/video.js/dist/video-js.min.css-328", "isController": false}, {"data": [[2.0, 112.0]], "isOverall": false, "label": "Step5/node_modules/video.js/dist/video-js.min.css-328-Aggregated", "isController": false}, {"data": [[1.0, 514.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-274", "isController": false}, {"data": [[1.0, 514.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-274-Aggregated", "isController": false}, {"data": [[2.0, 305.0]], "isOverall": false, "label": "Step5/bm.png-336", "isController": false}, {"data": [[2.0, 305.0]], "isOverall": false, "label": "Step5/bm.png-336-Aggregated", "isController": false}, {"data": [[11.0, 2990.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-120", "isController": false}, {"data": [[11.0, 2990.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-120-Aggregated", "isController": false}, {"data": [[1.0, 394.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-181", "isController": false}, {"data": [[1.0, 394.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-181-Aggregated", "isController": false}, {"data": [[1.0, 511.0]], "isOverall": false, "label": "Step4/addtocart-195", "isController": false}, {"data": [[1.0, 511.0]], "isOverall": false, "label": "Step4/addtocart-195-Aggregated", "isController": false}, {"data": [[1.0, 512.0]], "isOverall": false, "label": "Step4/js/cart.js-242", "isController": false}, {"data": [[1.0, 512.0]], "isOverall": false, "label": "Step4/js/cart.js-242-Aggregated", "isController": false}, {"data": [[1.0, 303.0]], "isOverall": false, "label": "Step4/addtocart-194", "isController": false}, {"data": [[1.0, 303.0]], "isOverall": false, "label": "Step4/addtocart-194-Aggregated", "isController": false}, {"data": [[1.0, 508.0]], "isOverall": false, "label": "Step4/config.json-196", "isController": false}, {"data": [[1.0, 508.0]], "isOverall": false, "label": "Step4/config.json-196-Aggregated", "isController": false}, {"data": [[2.0, 409.0]], "isOverall": false, "label": "Step4/css/latofonts.css-124", "isController": false}, {"data": [[2.0, 409.0]], "isOverall": false, "label": "Step4/css/latofonts.css-124-Aggregated", "isController": false}, {"data": [[1.0, 289.0]], "isOverall": false, "label": "Step4/Samsung1.jpg-308", "isController": false}, {"data": [[1.0, 289.0]], "isOverall": false, "label": "Step4/Samsung1.jpg-308-Aggregated", "isController": false}, {"data": [[1.0, 515.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-237", "isController": false}, {"data": [[1.0, 515.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-237-Aggregated", "isController": false}, {"data": [[2.0, 139.0]], "isOverall": false, "label": "Step4/imgs/front.jpg-128", "isController": false}, {"data": [[2.0, 139.0]], "isOverall": false, "label": "Step4/imgs/front.jpg-128-Aggregated", "isController": false}, {"data": [[1.0, 520.0]], "isOverall": false, "label": "Step4/imgs/Lumia_1520.jpg-165", "isController": false}, {"data": [[1.0, 520.0]], "isOverall": false, "label": "Step4/imgs/Lumia_1520.jpg-165-Aggregated", "isController": false}, {"data": [[1.0, 305.0]], "isOverall": false, "label": "Step4/entries-197", "isController": false}, {"data": [[1.0, 305.0]], "isOverall": false, "label": "Step4/entries-197-Aggregated", "isController": false}, {"data": [[1.0, 509.0]], "isOverall": false, "label": "Step4/css/latostyle.css-268", "isController": false}, {"data": [[1.0, 509.0]], "isOverall": false, "label": "Step4/css/latostyle.css-268-Aggregated", "isController": false}, {"data": [[1.0, 301.0]], "isOverall": false, "label": "Step4/js/cart.js-272", "isController": false}, {"data": [[1.0, 301.0]], "isOverall": false, "label": "Step4/js/cart.js-272-Aggregated", "isController": false}, {"data": [[1.0, 564.0]], "isOverall": false, "label": "Step4/imgs/galaxy_s6.jpg-137", "isController": false}, {"data": [[1.0, 564.0]], "isOverall": false, "label": "Step4/imgs/galaxy_s6.jpg-137-Aggregated", "isController": false}, {"data": [[1.0, 613.0]], "isOverall": false, "label": "Step4/bm.png-187", "isController": false}, {"data": [[1.0, 613.0]], "isOverall": false, "label": "Step4/bm.png-187-Aggregated", "isController": false}, {"data": [[1.0, 539.0]], "isOverall": false, "label": "Step4/imgs/galaxy_s6.jpg-259", "isController": false}, {"data": [[1.0, 539.0]], "isOverall": false, "label": "Step4/imgs/galaxy_s6.jpg-259-Aggregated", "isController": false}, {"data": [[2.0, 278.0]], "isOverall": false, "label": "Step5/node_modules/tether/dist/js/tether.min.js-334", "isController": false}, {"data": [[2.0, 278.0]], "isOverall": false, "label": "Step5/node_modules/tether/dist/js/tether.min.js-334-Aggregated", "isController": false}, {"data": [[11.0, 2085.3333333333335]], "isOverall": false, "label": "Login/v3/firefox/global-recs-112", "isController": false}, {"data": [[11.0, 2085.3333333333335]], "isOverall": false, "label": "Login/v3/firefox/global-recs-112-Aggregated", "isController": false}, {"data": [[1.0, 406.0]], "isOverall": false, "label": "Step4/css/latofonts.css-234", "isController": false}, {"data": [[1.0, 406.0]], "isOverall": false, "label": "Step4/css/latofonts.css-234-Aggregated", "isController": false}, {"data": [[1.0, 614.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-184", "isController": false}, {"data": [[1.0, 614.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-184-Aggregated", "isController": false}, {"data": [[1.0, 612.0]], "isOverall": false, "label": "Step4/check-198", "isController": false}, {"data": [[1.0, 612.0]], "isOverall": false, "label": "Step4/check-198-Aggregated", "isController": false}, {"data": [[1.0, 302.0]], "isOverall": false, "label": "Step4/check-199", "isController": false}, {"data": [[1.0, 302.0]], "isOverall": false, "label": "Step4/check-199-Aggregated", "isController": false}, {"data": [[1.0, 623.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-231", "isController": false}, {"data": [[1.0, 623.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-231-Aggregated", "isController": false}, {"data": [[1.0, 511.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-298", "isController": false}, {"data": [[1.0, 511.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-298-Aggregated", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-179", "isController": false}, {"data": [[1.0, 409.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-179-Aggregated", "isController": false}, {"data": [[1.0, 725.0]], "isOverall": false, "label": "Step4/imgs/sony_vaio_5.jpg-193", "isController": false}, {"data": [[1.0, 725.0]], "isOverall": false, "label": "Step4/imgs/sony_vaio_5.jpg-193-Aggregated", "isController": false}, {"data": [[1.0, 1052.0]], "isOverall": false, "label": "Step4/submit/firefox-desktop/baseline/1/c901a8c0-dcd2-4f6e-8a79-b05bddf50429-288", "isController": false}, {"data": [[1.0, 1052.0]], "isOverall": false, "label": "Step4/submit/firefox-desktop/baseline/1/c901a8c0-dcd2-4f6e-8a79-b05bddf50429-288-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 11.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 176.53333333333333, "minX": 1.64992842E12, "maxY": 41408.51666666667, "series": [{"data": [[1.64992842E12, 20738.183333333334], [1.64992854E12, 10195.633333333333], [1.64992848E12, 41408.51666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.64992842E12, 680.6666666666666], [1.64992854E12, 176.53333333333333], [1.64992848E12, 881.65]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64992854E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 59.0, "minX": 1.64992842E12, "maxY": 2990.0, "series": [{"data": [[1.64992848E12, 409.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-183", "isController": false}, {"data": [[1.64992842E12, 220.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-147", "isController": false}, {"data": [[1.64992848E12, 308.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.css-266", "isController": false}, {"data": [[1.64992842E12, 409.0]], "isOverall": false, "label": "Step4/check-144", "isController": false}, {"data": [[1.64992848E12, 233.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-264", "isController": false}, {"data": [[1.64992842E12, 409.0]], "isOverall": false, "label": "Step4/check-145", "isController": false}, {"data": [[1.64992842E12, 101.0]], "isOverall": false, "label": "Step4/success.txt-158", "isController": false}, {"data": [[1.64992854E12, 1436.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-300", "isController": false}, {"data": [[1.64992848E12, 512.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-211", "isController": false}, {"data": [[1.64992842E12, 102.0]], "isOverall": false, "label": "Step4/success.txt-159", "isController": false}, {"data": [[1.64992848E12, 413.0]], "isOverall": false, "label": "Step4/bm.png-243", "isController": false}, {"data": [[1.64992854E12, 205.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-302", "isController": false}, {"data": [[1.64992842E12, 754.0]], "isOverall": false, "label": "Step5/node_modules/video.js/dist/video.min.js-326", "isController": false}, {"data": [[1.64992848E12, 308.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-209", "isController": false}, {"data": [[1.64992842E12, 73.0]], "isOverall": false, "label": "Step4/bm.png-129", "isController": false}, {"data": [[1.64992854E12, 407.0]], "isOverall": false, "label": "Step4/config.json-314", "isController": false}, {"data": [[1.64992842E12, 356.0]], "isOverall": false, "label": "Step4/check-136", "isController": false}, {"data": [[1.64992848E12, 199.0]], "isOverall": false, "label": "Step4/css/latofonts.css-178", "isController": false}, {"data": [[1.64992848E12, 308.0]], "isOverall": false, "label": "Step4/view-224", "isController": false}, {"data": [[1.64992842E12, 530.0]], "isOverall": false, "label": "Step4/check-133", "isController": false}, {"data": [[1.64992848E12, 411.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-240", "isController": false}, {"data": [[1.64992842E12, 143.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-121", "isController": false}, {"data": [[1.64992848E12, 614.0]], "isOverall": false, "label": "Step4/view-226", "isController": false}, {"data": [[1.64992842E12, 279.0]], "isOverall": false, "label": "Step5/css/latofonts.css-331", "isController": false}, {"data": [[1.64992842E12, 397.0]], "isOverall": false, "label": "Step4/js/prod.js-155", "isController": false}, {"data": [[1.64992842E12, 717.0]], "isOverall": false, "label": "Step4/check-169", "isController": false}, {"data": [[1.64992848E12, 206.0]], "isOverall": false, "label": "Step4/config.json-222", "isController": false}, {"data": [[1.64992848E12, 611.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-271", "isController": false}, {"data": [[1.64992842E12, 106.0]], "isOverall": false, "label": "Step5/node_modules/bootstrap/dist/js/bootstrap.min.js-333", "isController": false}, {"data": [[1.64992842E12, 409.0]], "isOverall": false, "label": "Step4/check-161", "isController": false}, {"data": [[1.64992842E12, 310.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-154", "isController": false}, {"data": [[1.64992842E12, 316.0]], "isOverall": false, "label": "Step4/check-163", "isController": false}, {"data": [[1.64992842E12, 2382.3333333333335]], "isOverall": false, "label": "Login/login-79", "isController": false}, {"data": [[1.64992842E12, 409.0]], "isOverall": false, "label": "Step4/check-171", "isController": false}, {"data": [[1.64992848E12, 927.0]], "isOverall": false, "label": "Step4/imgs/asusm.jpg-203", "isController": false}, {"data": [[1.64992854E12, 500.0]], "isOverall": false, "label": "Step4/entries-316", "isController": false}, {"data": [[1.64992842E12, 461.0]], "isOverall": false, "label": "Step4/js/prod.js-126", "isController": false}, {"data": [[1.64992842E12, 100.0]], "isOverall": false, "label": "Step4/canonical.html-149", "isController": false}, {"data": [[1.64992848E12, 304.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.css-239", "isController": false}, {"data": [[1.64992848E12, 410.0]], "isOverall": false, "label": "Step4/css/latofonts.css-275", "isController": false}, {"data": [[1.64992848E12, 1028.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-217", "isController": false}, {"data": [[1.64992848E12, 399.0]], "isOverall": false, "label": "Step4/submit/firefox-desktop/events/1/259b83ac-ab41-4da7-be8f-791dc6e10eec-292", "isController": false}, {"data": [[1.64992842E12, 305.0]], "isOverall": false, "label": "Step4/css/latofonts.css-151", "isController": false}, {"data": [[1.64992848E12, 410.0]], "isOverall": false, "label": "Step4/check-278", "isController": false}, {"data": [[1.64992854E12, 210.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-301", "isController": false}, {"data": [[1.64992854E12, 402.0]], "isOverall": false, "label": "Step4/imgs/front.jpg-312", "isController": false}, {"data": [[1.64992848E12, 408.0]], "isOverall": false, "label": "Step4/view-249", "isController": false}, {"data": [[1.64992854E12, 403.0]], "isOverall": false, "label": "Step4/css/latostyle.css-299", "isController": false}, {"data": [[1.64992842E12, 97.0]], "isOverall": false, "label": "Step4/bm.png-157", "isController": false}, {"data": [[1.64992848E12, 407.0]], "isOverall": false, "label": "Step4/bm.png-276", "isController": false}, {"data": [[1.64992848E12, 748.0]], "isOverall": false, "label": "Step4/check-280", "isController": false}, {"data": [[1.64992848E12, 307.0]], "isOverall": false, "label": "Step4/css/latostyle.css-180", "isController": false}, {"data": [[1.64992842E12, 443.0]], "isOverall": false, "label": "Login/login-80", "isController": false}, {"data": [[1.64992848E12, 618.0]], "isOverall": false, "label": "Step4/imgs/macbook_air.jpg-174", "isController": false}, {"data": [[1.64992848E12, 618.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-214", "isController": false}, {"data": [[1.64992848E12, 405.0]], "isOverall": false, "label": "Step4/prod.html-176", "isController": false}, {"data": [[1.64992848E12, 592.0]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-289", "isController": false}, {"data": [[1.64992848E12, 404.0]], "isOverall": false, "label": "Step4/config.json-244", "isController": false}, {"data": [[1.64992848E12, 614.0]], "isOverall": false, "label": "Step4/check-225", "isController": false}, {"data": [[1.64992854E12, 1112.0]], "isOverall": false, "label": "Step4/v1/tiles-293", "isController": false}, {"data": [[1.64992848E12, 292.0]], "isOverall": false, "label": "Step4/view-257", "isController": false}, {"data": [[1.64992842E12, 328.0]], "isOverall": false, "label": "Step4/view-135", "isController": false}, {"data": [[1.64992842E12, 272.0]], "isOverall": false, "label": "Step4/view-134", "isController": false}, {"data": [[1.64992848E12, 409.0]], "isOverall": false, "label": "Step4/view-255", "isController": false}, {"data": [[1.64992848E12, 614.0]], "isOverall": false, "label": "Step4/check-223", "isController": false}, {"data": [[1.64992848E12, 306.0]], "isOverall": false, "label": "Step4/view-254", "isController": false}, {"data": [[1.64992842E12, 489.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-123", "isController": false}, {"data": [[1.64992848E12, 306.0]], "isOverall": false, "label": "Step4/view-253", "isController": false}, {"data": [[1.64992848E12, 512.0]], "isOverall": false, "label": "Step4/view-252", "isController": false}, {"data": [[1.64992848E12, 346.0]], "isOverall": false, "label": "Step4/css/latostyle.css-208", "isController": false}, {"data": [[1.64992848E12, 615.0]], "isOverall": false, "label": "Step4/view-251", "isController": false}, {"data": [[1.64992854E12, 308.0]], "isOverall": false, "label": "Step4/index.html-296", "isController": false}, {"data": [[1.64992848E12, 408.0]], "isOverall": false, "label": "Step4/view-250", "isController": false}, {"data": [[1.64992842E12, 150.0]], "isOverall": false, "label": "Step4/canonical.html-127", "isController": false}, {"data": [[1.64992842E12, 68.0]], "isOverall": false, "label": "Step5/success.txt-329", "isController": false}, {"data": [[1.64992848E12, 204.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-270", "isController": false}, {"data": [[1.64992842E12, 621.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-153", "isController": false}, {"data": [[1.64992848E12, 322.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-177", "isController": false}, {"data": [[1.64992854E12, 408.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-297", "isController": false}, {"data": [[1.64992848E12, 1398.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-236", "isController": false}, {"data": [[1.64992848E12, 410.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-232", "isController": false}, {"data": [[1.64992842E12, 184.0]], "isOverall": false, "label": "Step5/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-323", "isController": false}, {"data": [[1.64992842E12, 614.0]], "isOverall": false, "label": "Step4/entries-143", "isController": false}, {"data": [[1.64992848E12, 306.0]], "isOverall": false, "label": "Step4/bm.png-218", "isController": false}, {"data": [[1.64992848E12, 612.0]], "isOverall": false, "label": "Step4/addtocart-229", "isController": false}, {"data": [[1.64992848E12, 705.0]], "isOverall": false, "label": "Step4/addtocart-228", "isController": false}, {"data": [[1.64992848E12, 483.0]], "isOverall": false, "label": "Step4/viewcart-281", "isController": false}, {"data": [[1.64992848E12, 613.0]], "isOverall": false, "label": "Step4/check-247", "isController": false}, {"data": [[1.64992842E12, 59.0]], "isOverall": false, "label": "Step4/success.txt-132", "isController": false}, {"data": [[1.64992842E12, 64.0]], "isOverall": false, "label": "Step4/success.txt-131", "isController": false}, {"data": [[1.64992848E12, 513.0]], "isOverall": false, "label": "Step4/check-245", "isController": false}, {"data": [[1.64992848E12, 914.0]], "isOverall": false, "label": "Step4/imgs/dell.jpg-175", "isController": false}, {"data": [[1.64992842E12, 372.0]], "isOverall": false, "label": "Step5/canonical.html-324", "isController": false}, {"data": [[1.64992842E12, 511.0]], "isOverall": false, "label": "Step4/config.json-142", "isController": false}, {"data": [[1.64992848E12, 354.0]], "isOverall": false, "label": "Step4/bycat-200", "isController": false}, {"data": [[1.64992848E12, 368.0]], "isOverall": false, "label": "Step4/bycat-201", "isController": false}, {"data": [[1.64992848E12, 795.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-206", "isController": false}, {"data": [[1.64992848E12, 952.0]], "isOverall": false, "label": "Step4/deleteitem-262", "isController": false}, {"data": [[1.64992842E12, 293.0]], "isOverall": false, "label": "Step5/css/latostyle.css-332", "isController": false}, {"data": [[1.64992842E12, 409.0]], "isOverall": false, "label": "Step4/prod.html-146", "isController": false}, {"data": [[1.64992848E12, 337.0]], "isOverall": false, "label": "Step4/deleteitem-261", "isController": false}, {"data": [[1.64992842E12, 372.3333333333333]], "isOverall": false, "label": "Registration/signup-78", "isController": false}, {"data": [[1.64992848E12, 2013.0]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-256", "isController": false}, {"data": [[1.64992842E12, 410.0]], "isOverall": false, "label": "Step4/addtocart-139", "isController": false}, {"data": [[1.64992842E12, 509.0]], "isOverall": false, "label": "Step4/addtocart-138", "isController": false}, {"data": [[1.64992848E12, 359.0]], "isOverall": false, "label": "Step4/cart.html-263", "isController": false}, {"data": [[1.64992848E12, 613.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-185", "isController": false}, {"data": [[1.64992848E12, 407.0]], "isOverall": false, "label": "Step4/view-287", "isController": false}, {"data": [[1.64992842E12, 96.0]], "isOverall": false, "label": "Step5/js/index.js-327", "isController": false}, {"data": [[1.64992848E12, 411.0]], "isOverall": false, "label": "Step4/view-282", "isController": false}, {"data": [[1.64992842E12, 62.0]], "isOverall": false, "label": "Step5/success.txt-330", "isController": false}, {"data": [[1.64992848E12, 305.0]], "isOverall": false, "label": "Step4/view-286", "isController": false}, {"data": [[1.64992854E12, 1236.0]], "isOverall": false, "label": "Step4/nexus1.jpg-313", "isController": false}, {"data": [[1.64992842E12, 399.0]], "isOverall": false, "label": "Step4/view-164", "isController": false}, {"data": [[1.64992848E12, 616.0]], "isOverall": false, "label": "Step4/view-285", "isController": false}, {"data": [[1.64992848E12, 304.0]], "isOverall": false, "label": "Step4/view-284", "isController": false}, {"data": [[1.64992842E12, 306.0]], "isOverall": false, "label": "Step4/view-162", "isController": false}, {"data": [[1.64992848E12, 715.0]], "isOverall": false, "label": "Step4/view-283", "isController": false}, {"data": [[1.64992842E12, 95.0]], "isOverall": false, "label": "Step4/config.json-130", "isController": false}, {"data": [[1.64992848E12, 61.0]], "isOverall": false, "label": "Step4/canonical.html-210", "isController": false}, {"data": [[1.64992848E12, 302.0]], "isOverall": false, "label": "Step4/js/prod.js-216", "isController": false}, {"data": [[1.64992848E12, 204.0]], "isOverall": false, "label": "Step4/canonical.html-215", "isController": false}, {"data": [[1.64992854E12, 610.0]], "isOverall": false, "label": "Step4/deletecart-294", "isController": false}, {"data": [[1.64992854E12, 512.0]], "isOverall": false, "label": "Step4/deletecart-295", "isController": false}, {"data": [[1.64992842E12, 408.0]], "isOverall": false, "label": "Step4/entries-170", "isController": false}, {"data": [[1.64992842E12, 205.0]], "isOverall": false, "label": "Step4/config.json-168", "isController": false}, {"data": [[1.64992854E12, 205.0]], "isOverall": false, "label": "Step4/success.txt-310", "isController": false}, {"data": [[1.64992842E12, 278.0]], "isOverall": false, "label": "Step4/css/latostyle.css-125", "isController": false}, {"data": [[1.64992842E12, 409.0]], "isOverall": false, "label": "Step4/addtocart-141", "isController": false}, {"data": [[1.64992854E12, 101.0]], "isOverall": false, "label": "Step4/success.txt-311", "isController": false}, {"data": [[1.64992842E12, 347.0]], "isOverall": false, "label": "Step5/imgs/front.jpg-320", "isController": false}, {"data": [[1.64992842E12, 305.0]], "isOverall": false, "label": "Step4/addtocart-140", "isController": false}, {"data": [[1.64992854E12, 1139.0]], "isOverall": false, "label": "Step4/iphone1.jpg-307", "isController": false}, {"data": [[1.64992842E12, 618.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-148", "isController": false}, {"data": [[1.64992848E12, 617.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-269", "isController": false}, {"data": [[1.64992842E12, 411.0]], "isOverall": false, "label": "Step4/config.json-160", "isController": false}, {"data": [[1.64992842E12, 2389.3333333333335]], "isOverall": false, "label": "Registration/signup-77", "isController": false}, {"data": [[1.64992848E12, 614.0]], "isOverall": false, "label": "Step4/viewcart-248", "isController": false}, {"data": [[1.64992848E12, 223.0]], "isOverall": false, "label": "Step4/imgs/Lumia_1520.jpg-258", "isController": false}, {"data": [[1.64992848E12, 409.0]], "isOverall": false, "label": "Step4/config.json-277", "isController": false}, {"data": [[1.64992842E12, 101.0]], "isOverall": false, "label": "Step5/imgs/front.jpg-339", "isController": false}, {"data": [[1.64992842E12, 397.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-150", "isController": false}, {"data": [[1.64992848E12, 616.0]], "isOverall": false, "label": "Step4/viewcart-246", "isController": false}, {"data": [[1.64992842E12, 488.0]], "isOverall": false, "label": "Step5/node_modules/bootstrap/dist/css/bootstrap.min.css-322", "isController": false}, {"data": [[1.64992848E12, 332.0]], "isOverall": false, "label": "Step4/css/latostyle.css-235", "isController": false}, {"data": [[1.64992842E12, 926.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-156", "isController": false}, {"data": [[1.64992848E12, 200.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-238", "isController": false}, {"data": [[1.64992848E12, 1640.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-273", "isController": false}, {"data": [[1.64992842E12, 722.0]], "isOverall": false, "label": "Step4/bycat-172", "isController": false}, {"data": [[1.64992854E12, 1046.0]], "isOverall": false, "label": "Step4/imgs/sony_vaio_5.jpg-291", "isController": false}, {"data": [[1.64992842E12, 409.0]], "isOverall": false, "label": "Step4/bycat-173", "isController": false}, {"data": [[1.64992848E12, 125.0]], "isOverall": false, "label": "Step4/css/latofonts.css-207", "isController": false}, {"data": [[1.64992848E12, 614.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-241", "isController": false}, {"data": [[1.64992842E12, 509.0]], "isOverall": false, "label": "Step4/addtocart-167", "isController": false}, {"data": [[1.64992842E12, 402.0]], "isOverall": false, "label": "Step4/addtocart-166", "isController": false}, {"data": [[1.64992848E12, 204.0]], "isOverall": false, "label": "Step4/cart.html-230", "isController": false}, {"data": [[1.64992848E12, 716.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-205", "isController": false}, {"data": [[1.64992848E12, 409.0]], "isOverall": false, "label": "Step4/config.json-188", "isController": false}, {"data": [[1.64992848E12, 612.0]], "isOverall": false, "label": "Step4/viewcart-279", "isController": false}, {"data": [[1.64992842E12, 103.0]], "isOverall": false, "label": "Step5/index.html-321", "isController": false}, {"data": [[1.64992842E12, 401.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-152", "isController": false}, {"data": [[1.64992848E12, 202.0]], "isOverall": false, "label": "Step4/success.txt-213", "isController": false}, {"data": [[1.64992848E12, 1732.0]], "isOverall": false, "label": "Step4/imgs/galaxy_s6.jpg-290", "isController": false}, {"data": [[1.64992848E12, 202.0]], "isOverall": false, "label": "Step4/success.txt-212", "isController": false}, {"data": [[1.64992848E12, 625.0]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-227", "isController": false}, {"data": [[1.64992848E12, 205.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-267", "isController": false}, {"data": [[1.64992848E12, 366.0]], "isOverall": false, "label": "Step4/view-192", "isController": false}, {"data": [[1.64992848E12, 1134.0]], "isOverall": false, "label": "Step4/imgs/sony_vaio_5.jpg-260", "isController": false}, {"data": [[1.64992842E12, 316.0]], "isOverall": false, "label": "Step5/node_modules/jquery/dist/jquery.min.js-325", "isController": false}, {"data": [[1.64992848E12, 307.0]], "isOverall": false, "label": "Step4/view-190", "isController": false}, {"data": [[1.64992854E12, 507.0]], "isOverall": false, "label": "Step4/canonical.html-305", "isController": false}, {"data": [[1.64992854E12, 107.0]], "isOverall": false, "label": "Step4/bm.png-309", "isController": false}, {"data": [[1.64992854E12, 614.0]], "isOverall": false, "label": "Step4/check-317", "isController": false}, {"data": [[1.64992854E12, 923.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-304", "isController": false}, {"data": [[1.64992854E12, 419.0]], "isOverall": false, "label": "Step4/check-315", "isController": false}, {"data": [[1.64992848E12, 100.0]], "isOverall": false, "label": "Step4/success.txt-220", "isController": false}, {"data": [[1.64992848E12, 154.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-265", "isController": false}, {"data": [[1.64992848E12, 206.0]], "isOverall": false, "label": "Step4/success.txt-221", "isController": false}, {"data": [[1.64992842E12, 320.6666666666667]], "isOverall": false, "label": "InvalidLogin/Invalidlogin-114", "isController": false}, {"data": [[1.64992842E12, 695.0]], "isOverall": false, "label": "InvalidLogin/Invalidlogin-113", "isController": false}, {"data": [[1.64992848E12, 199.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-219", "isController": false}, {"data": [[1.64992848E12, 411.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-233", "isController": false}, {"data": [[1.64992842E12, 369.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-119", "isController": false}, {"data": [[1.64992854E12, 289.0]], "isOverall": false, "label": "Step4/js/index.js-306", "isController": false}, {"data": [[1.64992848E12, 511.0]], "isOverall": false, "label": "Step4/check-189", "isController": false}, {"data": [[1.64992848E12, 820.0]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-202", "isController": false}, {"data": [[1.64992842E12, 2676.0]], "isOverall": false, "label": "Step5/node_modules/tether/dist/js/tether.min.js-319", "isController": false}, {"data": [[1.64992854E12, 630.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-303", "isController": false}, {"data": [[1.64992848E12, 716.0]], "isOverall": false, "label": "Step4/js/prod.js-186", "isController": false}, {"data": [[1.64992848E12, 450.0]], "isOverall": false, "label": "Step4/check-191", "isController": false}, {"data": [[1.64992848E12, 1027.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-182", "isController": false}, {"data": [[1.64992848E12, 503.0]], "isOverall": false, "label": "Step4/prod.html-204", "isController": false}, {"data": [[1.64992842E12, 112.0]], "isOverall": false, "label": "Step5/node_modules/video.js/dist/video-js.min.css-328", "isController": false}, {"data": [[1.64992848E12, 514.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-274", "isController": false}, {"data": [[1.64992842E12, 305.0]], "isOverall": false, "label": "Step5/bm.png-336", "isController": false}, {"data": [[1.64992842E12, 2990.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-120", "isController": false}, {"data": [[1.64992848E12, 394.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-181", "isController": false}, {"data": [[1.64992848E12, 511.0]], "isOverall": false, "label": "Step4/addtocart-195", "isController": false}, {"data": [[1.64992848E12, 512.0]], "isOverall": false, "label": "Step4/js/cart.js-242", "isController": false}, {"data": [[1.64992848E12, 303.0]], "isOverall": false, "label": "Step4/addtocart-194", "isController": false}, {"data": [[1.64992848E12, 508.0]], "isOverall": false, "label": "Step4/config.json-196", "isController": false}, {"data": [[1.64992842E12, 409.0]], "isOverall": false, "label": "Step4/css/latofonts.css-124", "isController": false}, {"data": [[1.64992854E12, 289.0]], "isOverall": false, "label": "Step4/Samsung1.jpg-308", "isController": false}, {"data": [[1.64992848E12, 515.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-237", "isController": false}, {"data": [[1.64992842E12, 139.0]], "isOverall": false, "label": "Step4/imgs/front.jpg-128", "isController": false}, {"data": [[1.64992842E12, 520.0]], "isOverall": false, "label": "Step4/imgs/Lumia_1520.jpg-165", "isController": false}, {"data": [[1.64992848E12, 305.0]], "isOverall": false, "label": "Step4/entries-197", "isController": false}, {"data": [[1.64992848E12, 509.0]], "isOverall": false, "label": "Step4/css/latostyle.css-268", "isController": false}, {"data": [[1.64992848E12, 301.0]], "isOverall": false, "label": "Step4/js/cart.js-272", "isController": false}, {"data": [[1.64992842E12, 564.0]], "isOverall": false, "label": "Step4/imgs/galaxy_s6.jpg-137", "isController": false}, {"data": [[1.64992848E12, 613.0]], "isOverall": false, "label": "Step4/bm.png-187", "isController": false}, {"data": [[1.64992848E12, 539.0]], "isOverall": false, "label": "Step4/imgs/galaxy_s6.jpg-259", "isController": false}, {"data": [[1.64992842E12, 278.0]], "isOverall": false, "label": "Step5/node_modules/tether/dist/js/tether.min.js-334", "isController": false}, {"data": [[1.64992842E12, 2085.3333333333335]], "isOverall": false, "label": "Login/v3/firefox/global-recs-112", "isController": false}, {"data": [[1.64992848E12, 406.0]], "isOverall": false, "label": "Step4/css/latofonts.css-234", "isController": false}, {"data": [[1.64992848E12, 614.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-184", "isController": false}, {"data": [[1.64992848E12, 612.0]], "isOverall": false, "label": "Step4/check-198", "isController": false}, {"data": [[1.64992848E12, 302.0]], "isOverall": false, "label": "Step4/check-199", "isController": false}, {"data": [[1.64992848E12, 623.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-231", "isController": false}, {"data": [[1.64992854E12, 511.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-298", "isController": false}, {"data": [[1.64992848E12, 409.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-179", "isController": false}, {"data": [[1.64992848E12, 725.0]], "isOverall": false, "label": "Step4/imgs/sony_vaio_5.jpg-193", "isController": false}, {"data": [[1.64992848E12, 1052.0]], "isOverall": false, "label": "Step4/submit/firefox-desktop/baseline/1/c901a8c0-dcd2-4f6e-8a79-b05bddf50429-288", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64992854E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 59.0, "minX": 1.64992842E12, "maxY": 2664.0, "series": [{"data": [[1.64992848E12, 408.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-183", "isController": false}, {"data": [[1.64992842E12, 202.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-147", "isController": false}, {"data": [[1.64992848E12, 308.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.css-266", "isController": false}, {"data": [[1.64992842E12, 409.0]], "isOverall": false, "label": "Step4/check-144", "isController": false}, {"data": [[1.64992848E12, 74.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-264", "isController": false}, {"data": [[1.64992842E12, 409.0]], "isOverall": false, "label": "Step4/check-145", "isController": false}, {"data": [[1.64992842E12, 101.0]], "isOverall": false, "label": "Step4/success.txt-158", "isController": false}, {"data": [[1.64992854E12, 307.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-300", "isController": false}, {"data": [[1.64992848E12, 408.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-211", "isController": false}, {"data": [[1.64992842E12, 102.0]], "isOverall": false, "label": "Step4/success.txt-159", "isController": false}, {"data": [[1.64992848E12, 413.0]], "isOverall": false, "label": "Step4/bm.png-243", "isController": false}, {"data": [[1.64992854E12, 204.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-302", "isController": false}, {"data": [[1.64992842E12, 279.0]], "isOverall": false, "label": "Step5/node_modules/video.js/dist/video.min.js-326", "isController": false}, {"data": [[1.64992848E12, 307.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-209", "isController": false}, {"data": [[1.64992842E12, 67.0]], "isOverall": false, "label": "Step4/bm.png-129", "isController": false}, {"data": [[1.64992854E12, 407.0]], "isOverall": false, "label": "Step4/config.json-314", "isController": false}, {"data": [[1.64992842E12, 351.0]], "isOverall": false, "label": "Step4/check-136", "isController": false}, {"data": [[1.64992848E12, 198.0]], "isOverall": false, "label": "Step4/css/latofonts.css-178", "isController": false}, {"data": [[1.64992848E12, 308.0]], "isOverall": false, "label": "Step4/view-224", "isController": false}, {"data": [[1.64992842E12, 530.0]], "isOverall": false, "label": "Step4/check-133", "isController": false}, {"data": [[1.64992848E12, 410.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-240", "isController": false}, {"data": [[1.64992842E12, 141.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-121", "isController": false}, {"data": [[1.64992848E12, 614.0]], "isOverall": false, "label": "Step4/view-226", "isController": false}, {"data": [[1.64992842E12, 279.0]], "isOverall": false, "label": "Step5/css/latofonts.css-331", "isController": false}, {"data": [[1.64992842E12, 397.0]], "isOverall": false, "label": "Step4/js/prod.js-155", "isController": false}, {"data": [[1.64992842E12, 717.0]], "isOverall": false, "label": "Step4/check-169", "isController": false}, {"data": [[1.64992848E12, 206.0]], "isOverall": false, "label": "Step4/config.json-222", "isController": false}, {"data": [[1.64992848E12, 509.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-271", "isController": false}, {"data": [[1.64992842E12, 82.0]], "isOverall": false, "label": "Step5/node_modules/bootstrap/dist/js/bootstrap.min.js-333", "isController": false}, {"data": [[1.64992842E12, 409.0]], "isOverall": false, "label": "Step4/check-161", "isController": false}, {"data": [[1.64992842E12, 304.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-154", "isController": false}, {"data": [[1.64992842E12, 310.0]], "isOverall": false, "label": "Step4/check-163", "isController": false}, {"data": [[1.64992842E12, 2382.3333333333335]], "isOverall": false, "label": "Login/login-79", "isController": false}, {"data": [[1.64992842E12, 409.0]], "isOverall": false, "label": "Step4/check-171", "isController": false}, {"data": [[1.64992848E12, 406.0]], "isOverall": false, "label": "Step4/imgs/asusm.jpg-203", "isController": false}, {"data": [[1.64992854E12, 500.0]], "isOverall": false, "label": "Step4/entries-316", "isController": false}, {"data": [[1.64992842E12, 300.0]], "isOverall": false, "label": "Step4/js/prod.js-126", "isController": false}, {"data": [[1.64992842E12, 100.0]], "isOverall": false, "label": "Step4/canonical.html-149", "isController": false}, {"data": [[1.64992848E12, 304.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.css-239", "isController": false}, {"data": [[1.64992848E12, 409.0]], "isOverall": false, "label": "Step4/css/latofonts.css-275", "isController": false}, {"data": [[1.64992848E12, 409.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-217", "isController": false}, {"data": [[1.64992848E12, 399.0]], "isOverall": false, "label": "Step4/submit/firefox-desktop/events/1/259b83ac-ab41-4da7-be8f-791dc6e10eec-292", "isController": false}, {"data": [[1.64992842E12, 305.0]], "isOverall": false, "label": "Step4/css/latofonts.css-151", "isController": false}, {"data": [[1.64992848E12, 410.0]], "isOverall": false, "label": "Step4/check-278", "isController": false}, {"data": [[1.64992854E12, 205.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-301", "isController": false}, {"data": [[1.64992854E12, 399.0]], "isOverall": false, "label": "Step4/imgs/front.jpg-312", "isController": false}, {"data": [[1.64992848E12, 408.0]], "isOverall": false, "label": "Step4/view-249", "isController": false}, {"data": [[1.64992854E12, 403.0]], "isOverall": false, "label": "Step4/css/latostyle.css-299", "isController": false}, {"data": [[1.64992842E12, 97.0]], "isOverall": false, "label": "Step4/bm.png-157", "isController": false}, {"data": [[1.64992848E12, 407.0]], "isOverall": false, "label": "Step4/bm.png-276", "isController": false}, {"data": [[1.64992848E12, 717.0]], "isOverall": false, "label": "Step4/check-280", "isController": false}, {"data": [[1.64992848E12, 307.0]], "isOverall": false, "label": "Step4/css/latostyle.css-180", "isController": false}, {"data": [[1.64992842E12, 440.6666666666667]], "isOverall": false, "label": "Login/login-80", "isController": false}, {"data": [[1.64992848E12, 612.0]], "isOverall": false, "label": "Step4/imgs/macbook_air.jpg-174", "isController": false}, {"data": [[1.64992848E12, 615.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-214", "isController": false}, {"data": [[1.64992848E12, 404.0]], "isOverall": false, "label": "Step4/prod.html-176", "isController": false}, {"data": [[1.64992848E12, 378.0]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-289", "isController": false}, {"data": [[1.64992848E12, 403.0]], "isOverall": false, "label": "Step4/config.json-244", "isController": false}, {"data": [[1.64992848E12, 612.0]], "isOverall": false, "label": "Step4/check-225", "isController": false}, {"data": [[1.64992854E12, 1112.0]], "isOverall": false, "label": "Step4/v1/tiles-293", "isController": false}, {"data": [[1.64992848E12, 284.0]], "isOverall": false, "label": "Step4/view-257", "isController": false}, {"data": [[1.64992842E12, 328.0]], "isOverall": false, "label": "Step4/view-135", "isController": false}, {"data": [[1.64992842E12, 272.0]], "isOverall": false, "label": "Step4/view-134", "isController": false}, {"data": [[1.64992848E12, 409.0]], "isOverall": false, "label": "Step4/view-255", "isController": false}, {"data": [[1.64992848E12, 614.0]], "isOverall": false, "label": "Step4/check-223", "isController": false}, {"data": [[1.64992848E12, 306.0]], "isOverall": false, "label": "Step4/view-254", "isController": false}, {"data": [[1.64992842E12, 477.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-123", "isController": false}, {"data": [[1.64992848E12, 306.0]], "isOverall": false, "label": "Step4/view-253", "isController": false}, {"data": [[1.64992848E12, 512.0]], "isOverall": false, "label": "Step4/view-252", "isController": false}, {"data": [[1.64992848E12, 346.0]], "isOverall": false, "label": "Step4/css/latostyle.css-208", "isController": false}, {"data": [[1.64992848E12, 615.0]], "isOverall": false, "label": "Step4/view-251", "isController": false}, {"data": [[1.64992854E12, 93.0]], "isOverall": false, "label": "Step4/index.html-296", "isController": false}, {"data": [[1.64992848E12, 408.0]], "isOverall": false, "label": "Step4/view-250", "isController": false}, {"data": [[1.64992842E12, 150.0]], "isOverall": false, "label": "Step4/canonical.html-127", "isController": false}, {"data": [[1.64992842E12, 68.0]], "isOverall": false, "label": "Step5/success.txt-329", "isController": false}, {"data": [[1.64992848E12, 203.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-270", "isController": false}, {"data": [[1.64992842E12, 620.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-153", "isController": false}, {"data": [[1.64992848E12, 99.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-177", "isController": false}, {"data": [[1.64992854E12, 407.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-297", "isController": false}, {"data": [[1.64992848E12, 707.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-236", "isController": false}, {"data": [[1.64992848E12, 409.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-232", "isController": false}, {"data": [[1.64992842E12, 113.0]], "isOverall": false, "label": "Step5/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-323", "isController": false}, {"data": [[1.64992842E12, 614.0]], "isOverall": false, "label": "Step4/entries-143", "isController": false}, {"data": [[1.64992848E12, 306.0]], "isOverall": false, "label": "Step4/bm.png-218", "isController": false}, {"data": [[1.64992848E12, 612.0]], "isOverall": false, "label": "Step4/addtocart-229", "isController": false}, {"data": [[1.64992848E12, 705.0]], "isOverall": false, "label": "Step4/addtocart-228", "isController": false}, {"data": [[1.64992848E12, 483.0]], "isOverall": false, "label": "Step4/viewcart-281", "isController": false}, {"data": [[1.64992848E12, 613.0]], "isOverall": false, "label": "Step4/check-247", "isController": false}, {"data": [[1.64992842E12, 59.0]], "isOverall": false, "label": "Step4/success.txt-132", "isController": false}, {"data": [[1.64992842E12, 64.0]], "isOverall": false, "label": "Step4/success.txt-131", "isController": false}, {"data": [[1.64992848E12, 513.0]], "isOverall": false, "label": "Step4/check-245", "isController": false}, {"data": [[1.64992848E12, 499.0]], "isOverall": false, "label": "Step4/imgs/dell.jpg-175", "isController": false}, {"data": [[1.64992842E12, 372.0]], "isOverall": false, "label": "Step5/canonical.html-324", "isController": false}, {"data": [[1.64992842E12, 510.0]], "isOverall": false, "label": "Step4/config.json-142", "isController": false}, {"data": [[1.64992848E12, 354.0]], "isOverall": false, "label": "Step4/bycat-200", "isController": false}, {"data": [[1.64992848E12, 368.0]], "isOverall": false, "label": "Step4/bycat-201", "isController": false}, {"data": [[1.64992848E12, 719.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-206", "isController": false}, {"data": [[1.64992848E12, 952.0]], "isOverall": false, "label": "Step4/deleteitem-262", "isController": false}, {"data": [[1.64992842E12, 293.0]], "isOverall": false, "label": "Step5/css/latostyle.css-332", "isController": false}, {"data": [[1.64992842E12, 406.0]], "isOverall": false, "label": "Step4/prod.html-146", "isController": false}, {"data": [[1.64992848E12, 337.0]], "isOverall": false, "label": "Step4/deleteitem-261", "isController": false}, {"data": [[1.64992842E12, 372.3333333333333]], "isOverall": false, "label": "Registration/signup-78", "isController": false}, {"data": [[1.64992848E12, 1639.0]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-256", "isController": false}, {"data": [[1.64992842E12, 410.0]], "isOverall": false, "label": "Step4/addtocart-139", "isController": false}, {"data": [[1.64992842E12, 509.0]], "isOverall": false, "label": "Step4/addtocart-138", "isController": false}, {"data": [[1.64992848E12, 347.0]], "isOverall": false, "label": "Step4/cart.html-263", "isController": false}, {"data": [[1.64992848E12, 405.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-185", "isController": false}, {"data": [[1.64992848E12, 407.0]], "isOverall": false, "label": "Step4/view-287", "isController": false}, {"data": [[1.64992842E12, 91.0]], "isOverall": false, "label": "Step5/js/index.js-327", "isController": false}, {"data": [[1.64992848E12, 411.0]], "isOverall": false, "label": "Step4/view-282", "isController": false}, {"data": [[1.64992842E12, 62.0]], "isOverall": false, "label": "Step5/success.txt-330", "isController": false}, {"data": [[1.64992848E12, 305.0]], "isOverall": false, "label": "Step4/view-286", "isController": false}, {"data": [[1.64992854E12, 305.0]], "isOverall": false, "label": "Step4/nexus1.jpg-313", "isController": false}, {"data": [[1.64992842E12, 399.0]], "isOverall": false, "label": "Step4/view-164", "isController": false}, {"data": [[1.64992848E12, 616.0]], "isOverall": false, "label": "Step4/view-285", "isController": false}, {"data": [[1.64992848E12, 304.0]], "isOverall": false, "label": "Step4/view-284", "isController": false}, {"data": [[1.64992842E12, 306.0]], "isOverall": false, "label": "Step4/view-162", "isController": false}, {"data": [[1.64992848E12, 715.0]], "isOverall": false, "label": "Step4/view-283", "isController": false}, {"data": [[1.64992842E12, 90.0]], "isOverall": false, "label": "Step4/config.json-130", "isController": false}, {"data": [[1.64992848E12, 61.0]], "isOverall": false, "label": "Step4/canonical.html-210", "isController": false}, {"data": [[1.64992848E12, 302.0]], "isOverall": false, "label": "Step4/js/prod.js-216", "isController": false}, {"data": [[1.64992848E12, 204.0]], "isOverall": false, "label": "Step4/canonical.html-215", "isController": false}, {"data": [[1.64992854E12, 610.0]], "isOverall": false, "label": "Step4/deletecart-294", "isController": false}, {"data": [[1.64992854E12, 512.0]], "isOverall": false, "label": "Step4/deletecart-295", "isController": false}, {"data": [[1.64992842E12, 408.0]], "isOverall": false, "label": "Step4/entries-170", "isController": false}, {"data": [[1.64992842E12, 204.0]], "isOverall": false, "label": "Step4/config.json-168", "isController": false}, {"data": [[1.64992854E12, 205.0]], "isOverall": false, "label": "Step4/success.txt-310", "isController": false}, {"data": [[1.64992842E12, 272.0]], "isOverall": false, "label": "Step4/css/latostyle.css-125", "isController": false}, {"data": [[1.64992842E12, 409.0]], "isOverall": false, "label": "Step4/addtocart-141", "isController": false}, {"data": [[1.64992854E12, 100.0]], "isOverall": false, "label": "Step4/success.txt-311", "isController": false}, {"data": [[1.64992842E12, 311.0]], "isOverall": false, "label": "Step5/imgs/front.jpg-320", "isController": false}, {"data": [[1.64992842E12, 305.0]], "isOverall": false, "label": "Step4/addtocart-140", "isController": false}, {"data": [[1.64992854E12, 409.0]], "isOverall": false, "label": "Step4/iphone1.jpg-307", "isController": false}, {"data": [[1.64992842E12, 616.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-148", "isController": false}, {"data": [[1.64992848E12, 410.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-269", "isController": false}, {"data": [[1.64992842E12, 410.0]], "isOverall": false, "label": "Step4/config.json-160", "isController": false}, {"data": [[1.64992842E12, 2389.3333333333335]], "isOverall": false, "label": "Registration/signup-77", "isController": false}, {"data": [[1.64992848E12, 614.0]], "isOverall": false, "label": "Step4/viewcart-248", "isController": false}, {"data": [[1.64992848E12, 120.0]], "isOverall": false, "label": "Step4/imgs/Lumia_1520.jpg-258", "isController": false}, {"data": [[1.64992848E12, 409.0]], "isOverall": false, "label": "Step4/config.json-277", "isController": false}, {"data": [[1.64992842E12, 71.0]], "isOverall": false, "label": "Step5/imgs/front.jpg-339", "isController": false}, {"data": [[1.64992842E12, 396.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-150", "isController": false}, {"data": [[1.64992848E12, 616.0]], "isOverall": false, "label": "Step4/viewcart-246", "isController": false}, {"data": [[1.64992842E12, 289.0]], "isOverall": false, "label": "Step5/node_modules/bootstrap/dist/css/bootstrap.min.css-322", "isController": false}, {"data": [[1.64992848E12, 332.0]], "isOverall": false, "label": "Step4/css/latostyle.css-235", "isController": false}, {"data": [[1.64992842E12, 411.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-156", "isController": false}, {"data": [[1.64992848E12, 199.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-238", "isController": false}, {"data": [[1.64992848E12, 407.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-273", "isController": false}, {"data": [[1.64992842E12, 722.0]], "isOverall": false, "label": "Step4/bycat-172", "isController": false}, {"data": [[1.64992854E12, 418.0]], "isOverall": false, "label": "Step4/imgs/sony_vaio_5.jpg-291", "isController": false}, {"data": [[1.64992842E12, 407.0]], "isOverall": false, "label": "Step4/bycat-173", "isController": false}, {"data": [[1.64992848E12, 125.0]], "isOverall": false, "label": "Step4/css/latofonts.css-207", "isController": false}, {"data": [[1.64992848E12, 409.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-241", "isController": false}, {"data": [[1.64992842E12, 509.0]], "isOverall": false, "label": "Step4/addtocart-167", "isController": false}, {"data": [[1.64992842E12, 402.0]], "isOverall": false, "label": "Step4/addtocart-166", "isController": false}, {"data": [[1.64992848E12, 203.0]], "isOverall": false, "label": "Step4/cart.html-230", "isController": false}, {"data": [[1.64992848E12, 509.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-205", "isController": false}, {"data": [[1.64992848E12, 409.0]], "isOverall": false, "label": "Step4/config.json-188", "isController": false}, {"data": [[1.64992848E12, 612.0]], "isOverall": false, "label": "Step4/viewcart-279", "isController": false}, {"data": [[1.64992842E12, 81.0]], "isOverall": false, "label": "Step5/index.html-321", "isController": false}, {"data": [[1.64992842E12, 392.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-152", "isController": false}, {"data": [[1.64992848E12, 201.0]], "isOverall": false, "label": "Step4/success.txt-213", "isController": false}, {"data": [[1.64992848E12, 410.0]], "isOverall": false, "label": "Step4/imgs/galaxy_s6.jpg-290", "isController": false}, {"data": [[1.64992848E12, 202.0]], "isOverall": false, "label": "Step4/success.txt-212", "isController": false}, {"data": [[1.64992848E12, 409.0]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-227", "isController": false}, {"data": [[1.64992848E12, 203.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-267", "isController": false}, {"data": [[1.64992848E12, 366.0]], "isOverall": false, "label": "Step4/view-192", "isController": false}, {"data": [[1.64992848E12, 309.0]], "isOverall": false, "label": "Step4/imgs/sony_vaio_5.jpg-260", "isController": false}, {"data": [[1.64992842E12, 96.0]], "isOverall": false, "label": "Step5/node_modules/jquery/dist/jquery.min.js-325", "isController": false}, {"data": [[1.64992848E12, 307.0]], "isOverall": false, "label": "Step4/view-190", "isController": false}, {"data": [[1.64992854E12, 507.0]], "isOverall": false, "label": "Step4/canonical.html-305", "isController": false}, {"data": [[1.64992854E12, 101.0]], "isOverall": false, "label": "Step4/bm.png-309", "isController": false}, {"data": [[1.64992854E12, 614.0]], "isOverall": false, "label": "Step4/check-317", "isController": false}, {"data": [[1.64992854E12, 309.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-304", "isController": false}, {"data": [[1.64992854E12, 419.0]], "isOverall": false, "label": "Step4/check-315", "isController": false}, {"data": [[1.64992848E12, 100.0]], "isOverall": false, "label": "Step4/success.txt-220", "isController": false}, {"data": [[1.64992848E12, 86.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-265", "isController": false}, {"data": [[1.64992848E12, 205.0]], "isOverall": false, "label": "Step4/success.txt-221", "isController": false}, {"data": [[1.64992842E12, 317.0]], "isOverall": false, "label": "InvalidLogin/Invalidlogin-114", "isController": false}, {"data": [[1.64992842E12, 695.0]], "isOverall": false, "label": "InvalidLogin/Invalidlogin-113", "isController": false}, {"data": [[1.64992848E12, 198.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-219", "isController": false}, {"data": [[1.64992848E12, 409.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-233", "isController": false}, {"data": [[1.64992842E12, 293.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-119", "isController": false}, {"data": [[1.64992854E12, 288.0]], "isOverall": false, "label": "Step4/js/index.js-306", "isController": false}, {"data": [[1.64992848E12, 511.0]], "isOverall": false, "label": "Step4/check-189", "isController": false}, {"data": [[1.64992848E12, 614.0]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-202", "isController": false}, {"data": [[1.64992842E12, 2664.0]], "isOverall": false, "label": "Step5/node_modules/tether/dist/js/tether.min.js-319", "isController": false}, {"data": [[1.64992854E12, 613.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-303", "isController": false}, {"data": [[1.64992848E12, 715.0]], "isOverall": false, "label": "Step4/js/prod.js-186", "isController": false}, {"data": [[1.64992848E12, 450.0]], "isOverall": false, "label": "Step4/check-191", "isController": false}, {"data": [[1.64992848E12, 202.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-182", "isController": false}, {"data": [[1.64992848E12, 502.0]], "isOverall": false, "label": "Step4/prod.html-204", "isController": false}, {"data": [[1.64992842E12, 96.0]], "isOverall": false, "label": "Step5/node_modules/video.js/dist/video-js.min.css-328", "isController": false}, {"data": [[1.64992848E12, 512.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-274", "isController": false}, {"data": [[1.64992842E12, 298.0]], "isOverall": false, "label": "Step5/bm.png-336", "isController": false}, {"data": [[1.64992842E12, 2664.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-120", "isController": false}, {"data": [[1.64992848E12, 392.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-181", "isController": false}, {"data": [[1.64992848E12, 511.0]], "isOverall": false, "label": "Step4/addtocart-195", "isController": false}, {"data": [[1.64992848E12, 511.0]], "isOverall": false, "label": "Step4/js/cart.js-242", "isController": false}, {"data": [[1.64992848E12, 303.0]], "isOverall": false, "label": "Step4/addtocart-194", "isController": false}, {"data": [[1.64992848E12, 508.0]], "isOverall": false, "label": "Step4/config.json-196", "isController": false}, {"data": [[1.64992842E12, 377.0]], "isOverall": false, "label": "Step4/css/latofonts.css-124", "isController": false}, {"data": [[1.64992854E12, 112.0]], "isOverall": false, "label": "Step4/Samsung1.jpg-308", "isController": false}, {"data": [[1.64992848E12, 304.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-237", "isController": false}, {"data": [[1.64992842E12, 103.0]], "isOverall": false, "label": "Step4/imgs/front.jpg-128", "isController": false}, {"data": [[1.64992842E12, 305.0]], "isOverall": false, "label": "Step4/imgs/Lumia_1520.jpg-165", "isController": false}, {"data": [[1.64992848E12, 305.0]], "isOverall": false, "label": "Step4/entries-197", "isController": false}, {"data": [[1.64992848E12, 509.0]], "isOverall": false, "label": "Step4/css/latostyle.css-268", "isController": false}, {"data": [[1.64992848E12, 301.0]], "isOverall": false, "label": "Step4/js/cart.js-272", "isController": false}, {"data": [[1.64992842E12, 274.0]], "isOverall": false, "label": "Step4/imgs/galaxy_s6.jpg-137", "isController": false}, {"data": [[1.64992848E12, 613.0]], "isOverall": false, "label": "Step4/bm.png-187", "isController": false}, {"data": [[1.64992848E12, 355.0]], "isOverall": false, "label": "Step4/imgs/galaxy_s6.jpg-259", "isController": false}, {"data": [[1.64992842E12, 272.0]], "isOverall": false, "label": "Step5/node_modules/tether/dist/js/tether.min.js-334", "isController": false}, {"data": [[1.64992842E12, 2080.3333333333335]], "isOverall": false, "label": "Login/v3/firefox/global-recs-112", "isController": false}, {"data": [[1.64992848E12, 406.0]], "isOverall": false, "label": "Step4/css/latofonts.css-234", "isController": false}, {"data": [[1.64992848E12, 613.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-184", "isController": false}, {"data": [[1.64992848E12, 612.0]], "isOverall": false, "label": "Step4/check-198", "isController": false}, {"data": [[1.64992848E12, 302.0]], "isOverall": false, "label": "Step4/check-199", "isController": false}, {"data": [[1.64992848E12, 617.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-231", "isController": false}, {"data": [[1.64992854E12, 510.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-298", "isController": false}, {"data": [[1.64992848E12, 408.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-179", "isController": false}, {"data": [[1.64992848E12, 513.0]], "isOverall": false, "label": "Step4/imgs/sony_vaio_5.jpg-193", "isController": false}, {"data": [[1.64992848E12, 1052.0]], "isOverall": false, "label": "Step4/submit/firefox-desktop/baseline/1/c901a8c0-dcd2-4f6e-8a79-b05bddf50429-288", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64992854E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.64992842E12, "maxY": 2353.0, "series": [{"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-183", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-147", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.css-266", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/check-144", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-264", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/check-145", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/success.txt-158", "isController": false}, {"data": [[1.64992854E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-300", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-211", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/success.txt-159", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/bm.png-243", "isController": false}, {"data": [[1.64992854E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-302", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step5/node_modules/video.js/dist/video.min.js-326", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-209", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/bm.png-129", "isController": false}, {"data": [[1.64992854E12, 0.0]], "isOverall": false, "label": "Step4/config.json-314", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/check-136", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/css/latofonts.css-178", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/view-224", "isController": false}, {"data": [[1.64992842E12, 234.0]], "isOverall": false, "label": "Step4/check-133", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-240", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-121", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/view-226", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step5/css/latofonts.css-331", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/js/prod.js-155", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/check-169", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/config.json-222", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-271", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step5/node_modules/bootstrap/dist/js/bootstrap.min.js-333", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/check-161", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-154", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/check-163", "isController": false}, {"data": [[1.64992842E12, 2028.0]], "isOverall": false, "label": "Login/login-79", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/check-171", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/imgs/asusm.jpg-203", "isController": false}, {"data": [[1.64992854E12, 0.0]], "isOverall": false, "label": "Step4/entries-316", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/js/prod.js-126", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/canonical.html-149", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.css-239", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/css/latofonts.css-275", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-217", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/submit/firefox-desktop/events/1/259b83ac-ab41-4da7-be8f-791dc6e10eec-292", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/css/latofonts.css-151", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/check-278", "isController": false}, {"data": [[1.64992854E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-301", "isController": false}, {"data": [[1.64992854E12, 0.0]], "isOverall": false, "label": "Step4/imgs/front.jpg-312", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/view-249", "isController": false}, {"data": [[1.64992854E12, 0.0]], "isOverall": false, "label": "Step4/css/latostyle.css-299", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/bm.png-157", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/bm.png-276", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/check-280", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/css/latostyle.css-180", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Login/login-80", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/imgs/macbook_air.jpg-174", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-214", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/prod.html-176", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-289", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/config.json-244", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/check-225", "isController": false}, {"data": [[1.64992854E12, 801.0]], "isOverall": false, "label": "Step4/v1/tiles-293", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/view-257", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/view-135", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/view-134", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/view-255", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/check-223", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/view-254", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-123", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/view-253", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/view-252", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/css/latostyle.css-208", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/view-251", "isController": false}, {"data": [[1.64992854E12, 0.0]], "isOverall": false, "label": "Step4/index.html-296", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/view-250", "isController": false}, {"data": [[1.64992842E12, 105.0]], "isOverall": false, "label": "Step4/canonical.html-127", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step5/success.txt-329", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-270", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-153", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-177", "isController": false}, {"data": [[1.64992854E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-297", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-236", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-232", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step5/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-323", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/entries-143", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/bm.png-218", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/addtocart-229", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/addtocart-228", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/viewcart-281", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/check-247", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/success.txt-132", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/success.txt-131", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/check-245", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/imgs/dell.jpg-175", "isController": false}, {"data": [[1.64992842E12, 236.0]], "isOverall": false, "label": "Step5/canonical.html-324", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/config.json-142", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/bycat-200", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/bycat-201", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-206", "isController": false}, {"data": [[1.64992848E12, 613.0]], "isOverall": false, "label": "Step4/deleteitem-262", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step5/css/latostyle.css-332", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/prod.html-146", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/deleteitem-261", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Registration/signup-78", "isController": false}, {"data": [[1.64992848E12, 928.0]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-256", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/addtocart-139", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/addtocart-138", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/cart.html-263", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-185", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/view-287", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step5/js/index.js-327", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/view-282", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step5/success.txt-330", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/view-286", "isController": false}, {"data": [[1.64992854E12, 0.0]], "isOverall": false, "label": "Step4/nexus1.jpg-313", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/view-164", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/view-285", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/view-284", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/view-162", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/view-283", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/config.json-130", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/canonical.html-210", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/js/prod.js-216", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/canonical.html-215", "isController": false}, {"data": [[1.64992854E12, 0.0]], "isOverall": false, "label": "Step4/deletecart-294", "isController": false}, {"data": [[1.64992854E12, 0.0]], "isOverall": false, "label": "Step4/deletecart-295", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/entries-170", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/config.json-168", "isController": false}, {"data": [[1.64992854E12, 0.0]], "isOverall": false, "label": "Step4/success.txt-310", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/css/latostyle.css-125", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/addtocart-141", "isController": false}, {"data": [[1.64992854E12, 0.0]], "isOverall": false, "label": "Step4/success.txt-311", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step5/imgs/front.jpg-320", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/addtocart-140", "isController": false}, {"data": [[1.64992854E12, 0.0]], "isOverall": false, "label": "Step4/iphone1.jpg-307", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-148", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-269", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/config.json-160", "isController": false}, {"data": [[1.64992842E12, 2034.6666666666667]], "isOverall": false, "label": "Registration/signup-77", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/viewcart-248", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/imgs/Lumia_1520.jpg-258", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/config.json-277", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step5/imgs/front.jpg-339", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-150", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/viewcart-246", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step5/node_modules/bootstrap/dist/css/bootstrap.min.css-322", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/css/latostyle.css-235", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-156", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-238", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-273", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/bycat-172", "isController": false}, {"data": [[1.64992854E12, 0.0]], "isOverall": false, "label": "Step4/imgs/sony_vaio_5.jpg-291", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/bycat-173", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/css/latofonts.css-207", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-241", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/addtocart-167", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/addtocart-166", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/cart.html-230", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-205", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/config.json-188", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/viewcart-279", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step5/index.html-321", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-152", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/success.txt-213", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/imgs/galaxy_s6.jpg-290", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/success.txt-212", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-227", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-267", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/view-192", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/imgs/sony_vaio_5.jpg-260", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step5/node_modules/jquery/dist/jquery.min.js-325", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/view-190", "isController": false}, {"data": [[1.64992854E12, 302.0]], "isOverall": false, "label": "Step4/canonical.html-305", "isController": false}, {"data": [[1.64992854E12, 0.0]], "isOverall": false, "label": "Step4/bm.png-309", "isController": false}, {"data": [[1.64992854E12, 0.0]], "isOverall": false, "label": "Step4/check-317", "isController": false}, {"data": [[1.64992854E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-304", "isController": false}, {"data": [[1.64992854E12, 0.0]], "isOverall": false, "label": "Step4/check-315", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/success.txt-220", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-265", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/success.txt-221", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "InvalidLogin/Invalidlogin-114", "isController": false}, {"data": [[1.64992842E12, 404.6666666666667]], "isOverall": false, "label": "InvalidLogin/Invalidlogin-113", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-219", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-233", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-119", "isController": false}, {"data": [[1.64992854E12, 0.0]], "isOverall": false, "label": "Step4/js/index.js-306", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/check-189", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-202", "isController": false}, {"data": [[1.64992842E12, 2352.0]], "isOverall": false, "label": "Step5/node_modules/tether/dist/js/tether.min.js-319", "isController": false}, {"data": [[1.64992854E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-303", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/js/prod.js-186", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/check-191", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-182", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/prod.html-204", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step5/node_modules/video.js/dist/video-js.min.css-328", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-274", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step5/bm.png-336", "isController": false}, {"data": [[1.64992842E12, 2353.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-120", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-181", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/addtocart-195", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/js/cart.js-242", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/addtocart-194", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/config.json-196", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/css/latofonts.css-124", "isController": false}, {"data": [[1.64992854E12, 0.0]], "isOverall": false, "label": "Step4/Samsung1.jpg-308", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-237", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/imgs/front.jpg-128", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/imgs/Lumia_1520.jpg-165", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/entries-197", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/css/latostyle.css-268", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/js/cart.js-272", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step4/imgs/galaxy_s6.jpg-137", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/bm.png-187", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/imgs/galaxy_s6.jpg-259", "isController": false}, {"data": [[1.64992842E12, 0.0]], "isOverall": false, "label": "Step5/node_modules/tether/dist/js/tether.min.js-334", "isController": false}, {"data": [[1.64992842E12, 1927.3333333333333]], "isOverall": false, "label": "Login/v3/firefox/global-recs-112", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/css/latofonts.css-234", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-184", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/check-198", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/check-199", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-231", "isController": false}, {"data": [[1.64992854E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-298", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-179", "isController": false}, {"data": [[1.64992848E12, 0.0]], "isOverall": false, "label": "Step4/imgs/sony_vaio_5.jpg-193", "isController": false}, {"data": [[1.64992848E12, 715.0]], "isOverall": false, "label": "Step4/submit/firefox-desktop/baseline/1/c901a8c0-dcd2-4f6e-8a79-b05bddf50429-288", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64992854E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 59.0, "minX": 1.64992842E12, "maxY": 2990.0, "series": [{"data": [[1.64992842E12, 2990.0], [1.64992854E12, 1436.0], [1.64992848E12, 2013.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.64992842E12, 2085.4], [1.64992854E12, 1168.1000000000001], [1.64992848E12, 829.4000000000008]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.64992842E12, 2990.0], [1.64992854E12, 1436.0], [1.64992848E12, 1959.6100000000006]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.64992842E12, 2486.7999999999993], [1.64992854E12, 1365.9999999999998], [1.64992848E12, 1056.0999999999997]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.64992842E12, 59.0], [1.64992854E12, 101.0], [1.64992848E12, 61.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.64992842E12, 397.0], [1.64992854E12, 459.5], [1.64992848E12, 410.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64992854E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 269.0, "minX": 1.0, "maxY": 1266.0, "series": [{"data": [[4.0, 269.0], [2.0, 410.5], [1.0, 620.5], [18.0, 374.0], [10.0, 1266.0], [3.0, 402.0], [7.0, 278.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 18.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 251.5, "minX": 1.0, "maxY": 1125.0, "series": [{"data": [[4.0, 251.5], [2.0, 409.0], [1.0, 463.0], [18.0, 374.0], [10.0, 1125.0], [3.0, 307.0], [7.0, 272.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 18.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.4166666666666667, "minX": 1.64992842E12, "maxY": 1.9666666666666666, "series": [{"data": [[1.64992842E12, 1.5666666666666667], [1.64992854E12, 0.4166666666666667], [1.64992848E12, 1.9666666666666666]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64992854E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.43333333333333335, "minX": 1.64992842E12, "maxY": 1.9666666666666666, "series": [{"data": [[1.64992842E12, 1.55], [1.64992854E12, 0.43333333333333335], [1.64992848E12, 1.9666666666666666]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64992854E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.64992842E12, "maxY": 0.05, "series": [{"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step5/node_modules/video.js/dist/video.min.js-326-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/css/latofonts.css-151-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/entries-197-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step5/node_modules/tether/dist/js/tether.min.js-319-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/bm.png-218-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step5/node_modules/tether/dist/js/tether.min.js-334-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-147-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/config.json-168-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/view-254-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/addtocart-166-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/canonical.html-215-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/imgs/galaxy_s6.jpg-259-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/config.json-277-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/success.txt-159-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-289-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/view-286-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/check-317-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/addtocart-228-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/addtocart-140-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/css/latostyle.css-208-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/css/latofonts.css-207-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step5/success.txt-329-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/config.json-160-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/success.txt-213-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.css-266-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/check-161-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/check-223-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-271-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/bycat-201-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-123-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/config.json-222-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step5/node_modules/bootstrap/dist/js/bootstrap.min.js-333-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/cart.html-263-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-217-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/view-283-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/addtocart-139-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-265-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/css/latostyle.css-125-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/imgs/dell.jpg-175-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/success.txt-310-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/js/index.js-306-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/view-257-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/js/prod.js-126-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step5/success.txt-330-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-267-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/check-169-success", "isController": false}, {"data": [[1.64992842E12, 0.05]], "isOverall": false, "label": "Login/v3/firefox/global-recs-112-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-219-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/bm.png-309-success", "isController": false}, {"data": [[1.64992842E12, 0.05]], "isOverall": false, "label": "Login/login-80-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/check-199-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-150-success", "isController": false}, {"data": [[1.64992842E12, 0.05]], "isOverall": false, "label": "Login/login-79-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/config.json-142-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-301-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/config.json-130-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-121-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step5/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-323-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-182-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/submit/firefox-desktop/baseline/1/c901a8c0-dcd2-4f6e-8a79-b05bddf50429-288-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/check-191-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-297-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-185-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/check-189-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/view-252-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-269-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/view-162-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step5/canonical.html-324-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/success.txt-221-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/check-247-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/imgs/front.jpg-312-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-177-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/view-134-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/css/latostyle.css-235-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/success.txt-311-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/canonical.html-127-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/view-224-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-233-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-270-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/check-198-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/js/prod.js-155-success", "isController": false}, {"data": [[1.64992842E12, 0.05]], "isOverall": false, "label": "InvalidLogin/Invalidlogin-113-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/check-225-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-209-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/viewcart-281-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/prod.html-146-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-241-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/check-163-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/deletecart-294-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/css/latofonts.css-234-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/check-144-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-240-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/bm.png-276-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/imgs/galaxy_s6.jpg-290-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-148-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-202-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/view-285-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/Samsung1.jpg-308-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/view-255-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/addtocart-229-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-179-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-238-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-236-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/nexus1.jpg-313-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/imgs/sony_vaio_5.jpg-291-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.css-239-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-256-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/imgs/macbook_air.jpg-174-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/deleteitem-261-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-273-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-300-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/prod.html-176-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/view-192-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-302-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/view-282-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/config.json-196-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/imgs/galaxy_s6.jpg-137-success", "isController": false}, {"data": [[1.64992842E12, 0.05]], "isOverall": false, "label": "Registration/signup-78-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/cart.html-230-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/canonical.html-305-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/imgs/front.jpg-128-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/view-226-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/check-245-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/view-164-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step5/js/index.js-327-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/addtocart-138-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/imgs/sony_vaio_5.jpg-260-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/check-136-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/css/latostyle.css-180-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-184-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/css/latostyle.css-268-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-211-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/deleteitem-262-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/bycat-172-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/css/latofonts.css-178-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-205-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/bootstrap-sweetalert/dist/sweetalert.min.js-274-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/iphone1.jpg-307-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step5/bm.png-336-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/entries-170-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-303-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/bm.png-243-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step5/node_modules/bootstrap/dist/css/bootstrap.min.css-322-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/addtocart-194-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/config.json-244-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/success.txt-132-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/view-253-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/check-280-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/bm.png-157-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/imgs/Lumia_1520.jpg-258-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/view-287-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/view-135-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-237-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/addtocart-167-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/check-171-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/success.txt-220-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step5/imgs/front.jpg-320-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-154-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/entries-143-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-231-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step5/node_modules/video.js/dist/video-js.min.css-328-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/viewcart-248-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-214-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step5/css/latostyle.css-332-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/check-133-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/imgs/asusm.jpg-203-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-206-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-152-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step5/imgs/front.jpg-339-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/success.txt-212-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/view-249-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/css/bootstrap.min.css-264-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/check-145-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/view-250-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/success.txt-131-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/view-190-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video.min.js-156-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-119-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/view-284-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/bycat-200-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-298-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/check-315-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/css/latofonts.css-275-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/imgs/Lumia_1520.jpg-165-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step5/node_modules/jquery/dist/jquery.min.js-325-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/canonical.html-149-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/config.json-188-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/imgs/apple_cinema.jpg-227-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-120-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/canonical.html-210-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/entries-316-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/index.html-296-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/jquery/dist/jquery.min.js-181-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step5/css/latofonts.css-331-success", "isController": false}, {"data": [[1.64992842E12, 0.05]], "isOverall": false, "label": "Registration/signup-77-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/view-251-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/bm.png-187-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/v1/tiles-293-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/prod.html-204-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/js/cart.js-242-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-183-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step5/index.html-321-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/tether/dist/js/tether.min.js-153-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/deletecart-295-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/check-278-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/css/latofonts.css-124-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/success.txt-158-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/bootstrap/dist/js/bootstrap.min.js-304-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/addtocart-141-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/viewcart-246-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/bm.png-129-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/js/prod.js-186-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/js/cart.js-272-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/css/latostyle.css-299-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/viewcart-279-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/js/prod.js-216-success", "isController": false}, {"data": [[1.64992842E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/bycat-173-success", "isController": false}, {"data": [[1.64992842E12, 0.05]], "isOverall": false, "label": "InvalidLogin/Invalidlogin-114-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/addtocart-195-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/imgs/sony_vaio_5.jpg-193-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/submit/firefox-desktop/events/1/259b83ac-ab41-4da7-be8f-791dc6e10eec-292-success", "isController": false}, {"data": [[1.64992854E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/config.json-314-success", "isController": false}, {"data": [[1.64992848E12, 0.016666666666666666]], "isOverall": false, "label": "Step4/node_modules/video.js/dist/video-js.min.css-232-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64992854E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.43333333333333335, "minX": 1.64992842E12, "maxY": 1.9666666666666666, "series": [{"data": [[1.64992842E12, 1.55], [1.64992854E12, 0.43333333333333335], [1.64992848E12, 1.9666666666666666]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64992854E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
