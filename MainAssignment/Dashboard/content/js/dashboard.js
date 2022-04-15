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
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 99.92156862745098, "KoPercent": 0.0784313725490196};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9450980392156862, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.9, 500, 1500, "Step4/check-225"], "isController": false}, {"data": [0.92, 500, 1500, "Step4/view-257"], "isController": false}, {"data": [0.68, 500, 1500, "Step4/view-135"], "isController": false}, {"data": [0.98, 500, 1500, "Step4/check-145"], "isController": false}, {"data": [0.96, 500, 1500, "Step4/view-255"], "isController": false}, {"data": [0.92, 500, 1500, "Step4/view-254"], "isController": false}, {"data": [0.94, 500, 1500, "Step4/addtocart-141"], "isController": false}, {"data": [0.875, 500, 1500, "Step5/node_modules/tether/dist/js/tether.min.js-319"], "isController": false}, {"data": [1.0, 500, 1500, "Step5/imgs/front.jpg-320"], "isController": false}, {"data": [0.96, 500, 1500, "Step4/check-191"], "isController": false}, {"data": [0.96, 500, 1500, "Step4/view-253"], "isController": false}, {"data": [0.975, 500, 1500, "Step5/node_modules/video.js/dist/video.min.js-326"], "isController": false}, {"data": [1.0, 500, 1500, "Step5/node_modules/video.js/dist/video-js.min.css-328"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "Registration/signup-77"], "isController": false}, {"data": [1.0, 500, 1500, "Step5/success.txt-329"], "isController": false}, {"data": [1.0, 500, 1500, "Step5/bm.png-336"], "isController": false}, {"data": [0.84, 500, 1500, "Step4/viewcart-248"], "isController": false}, {"data": [0.92, 500, 1500, "Step4/check-136"], "isController": false}, {"data": [1.0, 500, 1500, "Step5/imgs/front.jpg-339"], "isController": false}, {"data": [1.0, 500, 1500, "Step5/node_modules/bootstrap/dist/css/bootstrap.min.css-322"], "isController": false}, {"data": [0.95, 500, 1500, "Step5/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-323"], "isController": false}, {"data": [0.96, 500, 1500, "Step4/addtocart-195"], "isController": false}, {"data": [0.96, 500, 1500, "Step4/view-226"], "isController": false}, {"data": [1.0, 500, 1500, "Step5/css/latofonts.css-331"], "isController": false}, {"data": [0.9, 500, 1500, "Step4/addtocart-229"], "isController": false}, {"data": [0.94, 500, 1500, "Step4/bycat-173"], "isController": false}, {"data": [0.94, 500, 1500, "Step4/viewcart-281"], "isController": false}, {"data": [0.96, 500, 1500, "Step4/addtocart-167"], "isController": false}, {"data": [0.96, 500, 1500, "Step4/check-247"], "isController": false}, {"data": [1.0, 500, 1500, "Step5/index.html-321"], "isController": false}, {"data": [1.0, 500, 1500, "Step5/node_modules/bootstrap/dist/js/bootstrap.min.js-333"], "isController": false}, {"data": [0.98, 500, 1500, "Step4/check-163"], "isController": false}, {"data": [0.7666666666666667, 500, 1500, "Login/login-79"], "isController": false}, {"data": [0.94, 500, 1500, "Step4/view-192"], "isController": false}, {"data": [0.96, 500, 1500, "Step4/check-171"], "isController": false}, {"data": [1.0, 500, 1500, "Step5/node_modules/tether/dist/js/tether.min.js-334"], "isController": false}, {"data": [1.0, 500, 1500, "Step5/canonical.html-324"], "isController": false}, {"data": [0.975, 500, 1500, "Step5/node_modules/jquery/dist/jquery.min.js-325"], "isController": false}, {"data": [0.94, 500, 1500, "Step4/bycat-201"], "isController": false}, {"data": [0.96, 500, 1500, "Step4/deleteitem-262"], "isController": false}, {"data": [1.0, 500, 1500, "Step5/css/latostyle.css-332"], "isController": false}, {"data": [0.55, 500, 1500, "Login/v3/firefox/global-recs-112"], "isController": false}, {"data": [1.0, 500, 1500, "Registration/signup-78"], "isController": false}, {"data": [1.0, 500, 1500, "Step4/check-317"], "isController": false}, {"data": [0.86, 500, 1500, "Step4/addtocart-139"], "isController": false}, {"data": [0.96, 500, 1500, "Step4/check-199"], "isController": false}, {"data": [0.98, 500, 1500, "Step4/view-287"], "isController": false}, {"data": [0.7, 500, 1500, "InvalidLogin/Invalidlogin-114"], "isController": false}, {"data": [1.0, 500, 1500, "Step5/js/index.js-327"], "isController": false}, {"data": [0.95, 500, 1500, "InvalidLogin/Invalidlogin-113"], "isController": false}, {"data": [1.0, 500, 1500, "Step5/success.txt-330"], "isController": false}, {"data": [0.98, 500, 1500, "Step4/check-280"], "isController": false}, {"data": [1.0, 500, 1500, "Step4/view-286"], "isController": false}, {"data": [0.92, 500, 1500, "Step4/view-164"], "isController": false}, {"data": [0.96, 500, 1500, "Step4/view-285"], "isController": false}, {"data": [1.0, 500, 1500, "Step4/submit/firefox-desktop/baseline/1/c901a8c0-dcd2-4f6e-8a79-b05bddf50429-288"], "isController": false}, {"data": [0.98, 500, 1500, "Step4/deletecart-295"], "isController": false}, {"data": [0.8666666666666667, 500, 1500, "Login/login-80"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1275, 1, 0.0784313725490196, 360.3003921568622, 13, 4023, 336.0, 498.8000000000002, 588.0, 1647.0400000000013, 71.49265448020635, 493.82039748514075, 33.25635022989795], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Step4/check-225", 25, 0, 0.0, 416.56000000000006, 258, 804, 435.0, 570.2000000000003, 760.4999999999999, 804.0, 4.649432769202157, 2.773313999442068, 2.1385574553654454], "isController": false}, {"data": ["Step4/view-257", 25, 0, 0.0, 393.84, 262, 612, 398.0, 544.8000000000001, 596.6999999999999, 612.0, 4.618510992056161, 3.505197268150748, 2.02510882366525], "isController": false}, {"data": ["Step4/view-135", 25, 0, 0.0, 907.4, 406, 4023, 457.0, 2240.4000000000024, 3705.2999999999993, 4023.0, 4.741134079271762, 3.5189956500094826, 2.092766214678551], "isController": false}, {"data": ["Step4/check-145", 25, 0, 0.0, 347.19999999999993, 267, 549, 339.0, 448.6, 523.1999999999999, 549.0, 5.380972879896685, 3.0757725059190704, 2.4750373304993545], "isController": false}, {"data": ["Step4/view-255", 25, 0, 0.0, 415.44000000000005, 266, 600, 418.0, 506.40000000000003, 575.6999999999999, 600.0, 4.463488662738797, 3.234983150330298, 1.9571351655954294], "isController": false}, {"data": ["Step4/view-254", 25, 0, 0.0, 405.6, 258, 622, 414.0, 554.6000000000003, 618.7, 622.0, 4.386734514827163, 3.118694069134936, 1.9234802706615197], "isController": false}, {"data": ["Step4/addtocart-141", 25, 0, 0.0, 494.4399999999999, 268, 3604, 369.0, 470.8000000000001, 2674.299999999998, 3604.0, 5.235602094240838, 1.5696580497382198, 2.7814136125654447], "isController": false}, {"data": ["Step5/node_modules/tether/dist/js/tether.min.js-319", 20, 0, 0.0, 452.25, 178, 1474, 229.0, 1354.6000000000004, 1468.6999999999998, 1474.0, 3.988831272437176, 36.27616112385321, 1.686683536098923], "isController": false}, {"data": ["Step5/imgs/front.jpg-320", 20, 0, 0.0, 156.2, 69, 287, 84.5, 278.8, 286.6, 287.0, 5.437737901033171, 132.48644813757477, 2.26749422240348], "isController": false}, {"data": ["Step4/check-191", 25, 0, 0.0, 412.24, 274, 624, 414.0, 500.00000000000006, 589.4999999999999, 624.0, 4.5167118337850045, 2.668388663053297, 2.077511009485095], "isController": false}, {"data": ["Step4/view-253", 25, 0, 0.0, 424.4800000000001, 268, 728, 445.0, 507.40000000000003, 666.4999999999999, 728.0, 4.362240446693422, 3.4449771527656603, 1.91700019630082], "isController": false}, {"data": ["Step5/node_modules/video.js/dist/video.min.js-326", 20, 0, 0.0, 240.80000000000004, 118, 993, 141.0, 360.5, 961.3999999999995, 993.0, 6.211180124223602, 974.6409161490683, 2.61427600931677], "isController": false}, {"data": ["Step5/node_modules/video.js/dist/video-js.min.css-328", 20, 0, 0.0, 130.85, 51, 313, 57.0, 295.00000000000006, 312.25, 313.0, 7.830853563038372, 95.60218040328897, 3.4336457517619423], "isController": false}, {"data": ["Registration/signup-77", 15, 0, 0.0, 628.5333333333334, 394, 1612, 424.0, 1464.4, 1612.0, 1612.0, 3.009630818619583, 1.3196525757423756, 1.404886261035313], "isController": false}, {"data": ["Step5/success.txt-329", 20, 0, 0.0, 21.85, 14, 76, 17.5, 42.10000000000004, 74.39999999999998, 76.0, 6.024096385542169, 1.2942394578313254, 1.7825207078313254], "isController": false}, {"data": ["Step5/bm.png-336", 20, 0, 0.0, 125.20000000000002, 50, 274, 56.5, 257.9, 273.2, 274.0, 8.126777732629012, 33.83921995631857, 3.325312373019098], "isController": false}, {"data": ["Step4/viewcart-248", 25, 1, 4.0, 430.32, 290, 633, 450.0, 550.4000000000001, 611.0999999999999, 633.0, 4.261847937265599, 2.951662653426526, 2.0268749467269007], "isController": false}, {"data": ["Step4/check-136", 25, 0, 0.0, 483.52, 262, 3279, 304.0, 802.0000000000011, 2630.3999999999987, 3279.0, 5.3361792956243335, 3.1379235592315906, 2.454434031483458], "isController": false}, {"data": ["Step5/imgs/front.jpg-339", 20, 0, 0.0, 77.8, 54, 376, 61.0, 84.00000000000003, 361.4499999999998, 376.0, 8.048289738430585, 196.10946931589538, 3.356073943661972], "isController": false}, {"data": ["Step5/node_modules/bootstrap/dist/css/bootstrap.min.css-322", 20, 0, 0.0, 125.54999999999995, 67, 325, 70.5, 304.00000000000006, 324.09999999999997, 325.0, 5.932957579353308, 164.88929008454465, 2.6362262681696826], "isController": false}, {"data": ["Step5/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js-323", 20, 0, 0.0, 222.05000000000004, 61, 767, 178.0, 696.800000000001, 765.75, 767.0, 6.449532408900355, 458.82628587552404, 2.872057400838439], "isController": false}, {"data": ["Step4/addtocart-195", 25, 0, 0.0, 413.9200000000001, 299, 535, 446.0, 490.00000000000006, 526.9, 535.0, 4.411505205576143, 1.3225899395623788, 2.343612140462326], "isController": false}, {"data": ["Step4/view-226", 25, 0, 0.0, 401.32000000000005, 258, 605, 434.0, 517.4000000000001, 587.9, 605.0, 4.612546125461255, 3.7976029174354244, 2.0405111277675276], "isController": false}, {"data": ["Step5/css/latofonts.css-331", 20, 0, 0.0, 124.10000000000001, 49, 270, 53.5, 263.20000000000005, 269.7, 270.0, 8.445945945945946, 10.773529877533784, 3.4889014991554057], "isController": false}, {"data": ["Step4/addtocart-229", 25, 0, 0.0, 440.12000000000006, 300, 539, 466.0, 514.6, 532.4, 539.0, 4.497211728728188, 1.3482851569526892, 2.3935355392156863], "isController": false}, {"data": ["Step4/bycat-173", 25, 0, 0.0, 418.88, 293, 656, 418.0, 522.2, 617.3, 656.0, 4.617657923900997, 6.815735246582934, 2.0788479520687106], "isController": false}, {"data": ["Step4/viewcart-281", 25, 0, 0.0, 406.71999999999997, 294, 548, 403.0, 527.0, 546.2, 548.0, 4.688672168042011, 2.052759283570893, 2.2298665486684173], "isController": false}, {"data": ["Step4/addtocart-167", 25, 0, 0.0, 375.00000000000006, 298, 607, 361.0, 502.8000000000001, 587.8, 607.0, 5.006007208650381, 1.5008244268121747, 2.6594413295955146], "isController": false}, {"data": ["Step4/check-247", 25, 0, 0.0, 406.96, 269, 637, 431.0, 514.4000000000001, 607.5999999999999, 637.0, 4.446025253423439, 2.624717955272986, 2.0449979437133203], "isController": false}, {"data": ["Step5/index.html-321", 20, 0, 0.0, 112.40000000000002, 54, 263, 65.0, 258.9, 262.8, 263.0, 5.770340450086556, 70.45844904068089, 3.020412579342181], "isController": false}, {"data": ["Step5/node_modules/bootstrap/dist/js/bootstrap.min.js-333", 20, 0, 0.0, 151.04999999999998, 53, 283, 81.5, 269.5, 282.34999999999997, 283.0, 8.281573498964804, 124.95390139751552, 3.550401138716356], "isController": false}, {"data": ["Step4/check-163", 25, 0, 0.0, 371.0, 265, 580, 383.0, 475.8, 551.8, 580.0, 5.145091582630171, 3.0587167498456473, 2.366541147869932], "isController": false}, {"data": ["Login/login-79", 15, 0, 0.0, 641.9333333333333, 379, 1612, 448.0, 1489.6000000000001, 1612.0, 1612.0, 2.9644268774703555, 1.2998317070158103, 1.3808902544466404], "isController": false}, {"data": ["Step4/view-192", 25, 0, 0.0, 411.40000000000003, 270, 531, 436.0, 514.4000000000001, 530.7, 531.0, 4.402183483007572, 3.307312301901743, 1.9431513030463108], "isController": false}, {"data": ["Step4/check-171", 25, 0, 0.0, 371.48, 261, 564, 380.0, 502.6000000000001, 554.4, 564.0, 4.847779716889665, 2.8281871121776225, 2.2297893033740546], "isController": false}, {"data": ["Step5/node_modules/tether/dist/js/tether.min.js-334", 20, 0, 0.0, 76.8, 51, 257, 53.0, 241.0000000000003, 256.95, 257.0, 8.841732979664014, 80.20116669429709, 3.738740605658709], "isController": false}, {"data": ["Step5/canonical.html-324", 20, 0, 0.0, 45.400000000000006, 30, 76, 43.5, 73.9, 75.9, 76.0, 5.927682276229993, 1.7482031713100177, 1.742414419087137], "isController": false}, {"data": ["Step5/node_modules/jquery/dist/jquery.min.js-325", 20, 0, 0.0, 160.19999999999996, 68, 525, 78.5, 336.10000000000014, 515.8499999999999, 525.0, 5.934718100890208, 208.52623099035608, 2.492117952522255], "isController": false}, {"data": ["Step4/bycat-201", 25, 0, 0.0, 388.0, 257, 588, 375.0, 536.8000000000001, 574.8, 588.0, 4.753755466818787, 4.173834438581479, 2.1354760886100017], "isController": false}, {"data": ["Step4/deleteitem-262", 25, 0, 0.0, 397.52, 264, 517, 403.0, 500.0, 512.8, 517.0, 4.49802087081684, 2.3893978836811804, 2.165551063781936], "isController": false}, {"data": ["Step5/css/latostyle.css-332", 20, 0, 0.0, 145.2, 51, 468, 60.0, 260.0, 457.59999999999985, 468.0, 8.417508417508417, 8.138431844486533, 3.4771543560606064], "isController": false}, {"data": ["Login/v3/firefox/global-recs-112", 10, 0, 0.0, 946.3000000000001, 457, 1419, 910.5, 1409.5, 1419.0, 1419.0, 6.978367062107467, 71.92829182658758, 2.9644430390788554], "isController": false}, {"data": ["Registration/signup-78", 15, 0, 0.0, 306.0, 267, 414, 300.0, 400.2, 414.0, 414.0, 3.9745627980922094, 2.2602738308161103, 1.9119820647853736], "isController": false}, {"data": ["Step4/check-317", 25, 0, 0.0, 331.24, 269, 464, 297.0, 417.8, 452.29999999999995, 464.0, 5.671506352087114, 3.48864103618421, 2.608671378743194], "isController": false}, {"data": ["Step4/addtocart-139", 25, 0, 0.0, 759.1600000000001, 289, 3692, 380.0, 3511.2000000000003, 3650.0, 3692.0, 5.242189138184106, 1.57163287638918, 2.784912979660306], "isController": false}, {"data": ["Step4/check-199", 25, 0, 0.0, 405.00000000000006, 258, 585, 437.0, 529.6000000000001, 583.5, 585.0, 4.520795660036167, 2.6741565890596743, 2.0793894100361663], "isController": false}, {"data": ["Step4/view-287", 25, 0, 0.0, 375.16, 274, 522, 387.0, 483.6, 514.8, 522.0, 5.038291011688835, 3.9377393188230556, 2.209172523679968], "isController": false}, {"data": ["InvalidLogin/Invalidlogin-114", 10, 0, 0.0, 1175.8, 271, 3396, 325.0, 3393.2, 3396.0, 3396.0, 2.7925160569673277, 1.6198774783580006, 1.3771685632504886], "isController": false}, {"data": ["Step5/js/index.js-327", 20, 0, 0.0, 135.15, 50, 272, 58.0, 262.7, 271.55, 272.0, 7.8277886497064575, 22.167395425636006, 3.080662915851272], "isController": false}, {"data": ["InvalidLogin/Invalidlogin-113", 10, 0, 0.0, 525.3000000000001, 416, 1321, 443.0, 1234.9000000000003, 1321.0, 1321.0, 6.261740763932373, 2.7456265654351912, 2.916846039448967], "isController": false}, {"data": ["Step5/success.txt-330", 20, 0, 0.0, 17.299999999999997, 13, 36, 15.0, 29.800000000000026, 35.75, 36.0, 6.0259114191021395, 1.2946294064477253, 1.7830577734257307], "isController": false}, {"data": ["Step4/check-280", 25, 0, 0.0, 402.32, 259, 562, 408.0, 489.20000000000005, 543.4, 562.0, 4.601509295048777, 2.811773824314375, 2.1165145292655994], "isController": false}, {"data": ["Step4/view-286", 25, 0, 0.0, 347.72, 265, 477, 358.0, 441.00000000000006, 468.9, 477.0, 5.232314776056928, 3.800786155295103, 2.294247396923399], "isController": false}, {"data": ["Step4/view-164", 25, 0, 0.0, 380.12000000000006, 269, 645, 326.0, 606.6, 635.1, 645.0, 5.159958720330238, 3.558355908152735, 2.277638028895769], "isController": false}, {"data": ["Step4/view-285", 25, 0, 0.0, 400.5199999999999, 259, 588, 395.0, 489.6, 562.8, 588.0, 4.816027740319784, 3.9143394215950686, 2.1164184405702176], "isController": false}, {"data": ["Step4/submit/firefox-desktop/baseline/1/c901a8c0-dcd2-4f6e-8a79-b05bddf50429-288", 25, 0, 0.0, 327.92, 283, 357, 331.0, 355.4, 356.7, 357.0, 5.319148936170213, 3.2205784574468086, 6.91904920212766], "isController": false}, {"data": ["Step4/deletecart-295", 25, 0, 0.0, 347.6, 263, 501, 334.0, 444.00000000000006, 487.49999999999994, 501.0, 5.39490720759603, 1.664834646094087, 2.449835792511869], "isController": false}, {"data": ["Login/login-80", 15, 0, 0.0, 573.7333333333333, 264, 3333, 382.0, 1644.600000000001, 3333.0, 3333.0, 3.8870173620108837, 2.063712668437419, 1.8660720069966312], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Test failed: text expected to contain /&quot;prod_id&quot;:1/", 1, 100.0, 0.0784313725490196], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1275, 1, "Test failed: text expected to contain /&quot;prod_id&quot;:1/", 1, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Step4/viewcart-248", 25, 1, "Test failed: text expected to contain /&quot;prod_id&quot;:1/", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
