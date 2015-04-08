var app = angular.module('regressiyaModul', []);
app.controller('RegressiyaController', ['$scope', function($scope) {
  $scope.x = [];  //result x; matrix
  $scope.y = []; //y; array
  $scope.a = []; // a array 
  $scope.errors = [];// errors array
  $scope.power = 1; //power of x array's elements
  $scope.rows = 10;
  $scope.cols = 10;
  $scope.dataFrom = 'file';
  $scope.fileChoose = '';
  $scope.inputStr = '';
  $scope.changeRadioAction = function (){
    $scope.clearData();
  };
  $scope.clearData = function () {
    $scope.x = [];
    $scope.y = [];
    $scope.errors = [];
    $scope.a = [];
  };
  $scope.generateXAndY = function(nums) {
    var len = nums.length;
    $scope.x.push(nums.slice(0, len - 1));
    $scope.y.push(nums[len - 1]);
  };
  $scope.splitFromStrToMatrix = function(str, splitStr) {
    var array = str.split(splitStr);
    var n = array.length; 
    var m = array[0].split(',').length;
    var nums;
    for (var i = 0; i < n; i++) {
      var numsStr = array[i];
      var arr = numsStr.split(',');
      nums = [];
      for (var j = 0; j < m; j++) {
        nums.push(parseInt(arr[j]));
      }
      $scope.generateXAndY(nums);
    }
    $scope.rows = n;
    $scope.cols = m;
  };
  $scope.generateRandom = function(){
    var nums;
    for (var i = 0; i < $scope.rows; i++) {
      nums = [];
      for (var j = 0; j < $scope.cols; j++) {
        nums.push(Math.floor((Math.random() * 100) + 1));
      }
      $scope.generateXAndY(nums);
    }
  };
  $scope.generateNumberMatrixFromFile = function(){
    var str = $scope.fileChoose;
    if (str) {
      $scope.splitFromStrToMatrix(str, '\r\n');
    } else {
      alert('Fayl tanlang');
    }
  };
  $scope.generateNumberMatrixFromInput = function(){
    var str = $scope.inputStr;
    if (str) {
      $scope.splitFromStrToMatrix(str, '\n');
    } else {
      alert('Son kiriting!');
    }
  };
  $scope.result = function() {
    //alert('result');
    $scope.appraisal();
  };
  $scope.generateNumbers = function() {
    $scope.clearData();
    if ($scope.dataFrom == 'file') {
      $scope.generateNumberMatrixFromFile();
    } else if ($scope.dataFrom == 'input') {
      $scope.generateNumberMatrixFromInput();
    } else if ($scope.dataFrom == 'random') {
      $scope.generateRandom(); 
    }
    var r = $scope.rows;
    var c = $scope.cols;
    var columns = c * $scope.power;
    if (columns > c) { //if pow > 1 then calculate x
      for (var i = 0; i < r; i++) {
        for (var j = c; j < columns; j++) {
          var jIndex = j - (j / c) * c;
          var p = j / c + 1;
          var k = Math.pow($scope.x[i][jIndex], p);
           $scope.x[i].push(k);
        }
      }
    }
  };
  $scope.YAppraisal = function(i) {
    var s = 0;
    for (var l = 0; l < $scope.rows; l++) {
      s += $scope.x[l][i] * $scope.y[l];
    }
    return s;
  };
  $scope.sumArr = function (arr) {
    var s = 0;
    for (var i = 0; i < arr.length; i++) {
      s += arr[i];
    }
    return s;
  };
  $scope.sumMatrix = function () {
    var sums = [];
    var n = $scope.cols * $scope.power;
    for (var i = 0; i < n; i++) {
      var s = 0;
      for (var j = 0; j < $scope.rows; j++) {
        s += $scope.x[j][i];
      }
      sums.push(s);
    }
    return sums;
  };
  $scope.gauseMethod = function(matrix, arr) {
      var n, i, j, k, d, s;
      n = arr.length;
      var x = [];//array
      for (k = 0; k < n; k++) {
        for (j = k + 1; j < n; j++) {
          d = matrix[j][k] / matrix[k][k];
          for (i = k; i < n; i++) {
            matrix[j][i] = matrix[j][i] - d * matrix[k][i];
          }
          arr[j] = arr[j] - d * arr[k];
        }
      }
      for (k = n - 1; k > -1; k--) {
        d = 0;
        for (j = k + 1; j < n; j++) {
          s = matrix[k][j] * x[j];
          d = d + s;
        }
        x[k] = (arr[k] - d) / matrix[k][k];
      }
      //x[10] = 10;
      //console.log('x: \n' + x);
      return x;
  };
  $scope.XAppraisal = function(i, j) {
    var s = 0 ;
    for (var l = 0; l < $scope.rows; l++) {
      s += $scope.x[l][i] * $scope.x[l][j];
    }
    return s;
  };
  $scope.appraisal = function () {
    var sumOfX = [];
    var data = [];//matrix
    var dataY = [];
    var m = $scope.cols * $scope.power;
    /*for (var i = 0; i < $scope.rows; i++) {
      for (var j = 0; j < m; j++) {
        console.log ($scope.x[i][j]);
      }
      console.log($scope.y[i]);
    }*/
    sumOfX = $scope.sumMatrix();
    dataY[0] = $scope.sumArr($scope.y);
    for (var i = 1; i < m; i++) {
      dataY[i] = $scope.YAppraisal(i - 1);
    }
    var rowsData = [];
    rowsData.push($scope.rows);
    for (var i = 1; i < m; i++) {
      rowsData.push(sumOfX[i - 1]);
    }
    data[0] = rowsData;
    var colsData = [];
    for (var i = 1; i < m; i++) {
      colsData = [];
      colsData.push(sumOfX[i - 1]);
      data[i] = colsData;
    }
    
    for (var i = 1; i < m; i++) {
      rowsData = [];
      for (var j = 1; j < m; j++) {
        data[i].push($scope.XAppraisal(i - 1, j - 1));
      }
    }
    /*console.log('Y Datas: \n');
    console.log(dataY);
    console.log('Datas: \n');
    for (var i = 0; i < m; i++) {
      console.log (data[i]);
    }
    console.log('\n');
    console.log('\na:\n\n');*/
    $scope.a = $scope.gauseMethod(data, dataY);
    //console.log($scope.a);
    /*for (var i = 0; i < $scope.a.length; i++)
      console.log($scope.a[i] + ',');*/
    $scope.checkData($scope.a);
  };
  $scope.checkData = function(arr) {
    //console.log('Errors');
    for (var i = 0; i < $scope.rows; i++) {
      var s = 0;
      for (var j = 0; j < arr.length - 1; j++) {
        s += $scope.x[i][j] * arr[j + 1];
      }
      //console.log('\n');
      var er = Math.abs($scope.y[i] - s);
      $scope.errors.push(er);
      //console.log (er + ' ');
    }
  };
  /*$scope.readDataFromFile = function () {
    alert("worked");
    var f = $scope.fileChoose.files[0];
    var r = new FileReader();
    r.onload = (function(f) {
      return function(e) {
        var contents = e.target.result;
        alert( "Got the file.n" 
        +"name: " + f.name + "n"
        +"type: " + f.type + "n"
        +"size: " + f.size + " bytesn"
        + "starts with: " + contents//.substr(1, contents.indexOf("n"))
        ); 
      };
    })(f);

    r.readAsText(f);
  };*/
}]);
app.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                        //console.log (scope.fileread);
                    });
                }
                //reader.readAsDataURL(changeEvent.target.files[0]);
                reader.readAsText(changeEvent.target.files[0]);
            });
        }
    }
}]);