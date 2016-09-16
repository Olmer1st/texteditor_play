main_app.controller("mainCtrl", function($scope, $sce, $q) {
    $scope.text = {
        value: ""
    };
    $scope.result = []
    $scope.data = [{
        label: "test"
    }, {
        label: "test1"

    }, {
        label: "test2"
    }];

    $scope.macros = {
        "{test}": "<span style='color:blue;font-weight:bold;'>{test}</span>",
        "{test1}": "<span style='color:blue;font-weight:bold;'>{test1}</span>",
        "{test2}": "<span style='color:blue;font-weight:bold;'>{test2}</span>"
    };
    $scope.getDataText = function(item) {
        // note item.label is sent when the typedText wasn't found
        return "<span style='color:blue;font-weight:bold;'>{" + item.label + "}</span>";
    };

    function cleanHtml() {
        var strInputCode = $scope.text.value || "";
        strInputCode = strInputCode.replace(/<div>/gi, '\r\n').replace(/<\/div>/gi, '');
        var strTagStrippedText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
        return strTagStrippedText.replace(/&nbsp;/g, " ");
    };

    $scope.test = function() {
        $scope.result = cleanHtml().split("\r\n").map(function(line){
          return line.trim();
        });
    }
});
