var app = angular.module('UrlPay');

app.controller('SenderController', function ($scope, $http, SendService, $window) {

  var getRandom = function () {
    var number = '' + Math.random();
    return number.substring(2, number.length);
  };

  $scope.transfer = {
    urlHash: getRandom(),
    amount: "",
    senderCurrency: "EUR",
    country: "Estonia",
    firstName: "",
    lastName: "",

    cardType: "Visa",
    creditCardNumber: "",
    securityCode: "",
    senderTransfered: true
  };

  $scope.getTransferUrl = function () {
    var domainUrl = "http://localhost:8080/app/sender.html#/receive/";
    return domainUrl + $scope.transfer.urlHash;
  };

  $scope.reloadPage = function() {
    console.log("reloading page");
    $window.location.reload();
    //$state.go($state.current.name, $state.params, { reload: true });
  };

  $scope.sendBtn = function () {
    var transfer = $scope.transfer;
    var data = {
      receiver: {
        amount: transfer.amount,
        urlhash: transfer.urlhash,
        receiverAccount: transfer.senderCurrency,
        cardType: transfer.cardType,
        country: transfer.country,
        firstName: transfer.firstName,
        lastName: transfer.lastName,
        currency: transfer.receiverCurrency
      }
    };
    
    $http.get("http://challenge.transferwise.com/?teamname=wearegoingtolondon&data=" + JSON.stringify(data))
      .success(function (data) {
        console.log("Message sent to transferwire");
      }).error(function (err) {
        console.log(err);
      });

    console.log('sending');
    SendService.transfer($scope.transfer, function () {
      console.log('Transfer done');
    }, function (err) {
      console.error('Error occurred');
    });
  };
});
