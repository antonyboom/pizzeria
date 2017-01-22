var app = angular.module('pizza', [
    'ngRoute',
    'ui.bootstrap',
    'ngTouch'
]);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
    .when("/menu", {templateUrl: "partials/pricing.html", controller: "PageCtrl"})
    .when("/home", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

app.controller('PageCtrl', function ($scope, $location, $http, $window, $interval) {

    $(document).ready(function() {
        $('.carousel').carousel({interval: 3000});
    });

    $scope.cafeTitles = [{
            id: 0,
            name: "Пиццерия 'БВ'"
        }, {
            id: 1,
            name: "Пиццерия 'ИЧ'"
        }, {
            id: 2,
            name: "Пиццерия 'ЛБ'"
        }, {
            id: 3,
            name: "Пиццерия г.Запрудня"
        }, {
            id: 4,
            name: "Десертонни"
        }];

    $scope.types = [{
        "id": 0,
            "path": "images/pizza1.jpg"
        },{
        "id": 1,
            "path": "images/pizza2.jpg"
        },{
        "id": 2,
            "path": "images/pizza3.jpg"
        },{
        "id": 3,
            "path": "images/pizza4.jpg"
        },{
        "id": 4,
            "path": "images/pizza5.jpg"
        }];

    $scope.image = $scope.types[0].path;

    $scope.pick = function (id) {
        angular.forEach($scope.types, function (val) {
            if (val.id == id){
                $scope.image = val.path
            }
        })
    };

    $scope.menuNames = [
        {
            id: 0,
            name: "ПИЦЦА"
        },{
            id: 1,
            name: 'СУПЫ'
        },{
            id: 2,
            name: 'САЛАТЫ'
        },{
            id: 3,
            name: 'ГОРЯЧИЕ БЛЮДА'
        },{
            id: 4,
            name: 'БЛЮДА ИЗ МОРЕПРОДУКТОВ'
        },{
            id: 5,
            name: 'БЛЮДА ИЗ ОВОЩЕЙ'
        },{
            id: 6,
            name: 'ПАСТА'
        },{
            id: 7,
            name: 'ХОЛОДНЫЕ ЗАКУСКИ'
        },{
            id: 8,
            name: 'ГОРЯЧИЕ ЗАКУСКИ'
        },{
            id: 9,
            name: 'ГАРНИР'
        },{
            id: 10,
            name: 'ДЕСЕРТЫ'
        },{
            id: 11,
            name: 'НАПИТКИ'
        },{
            id: 12,
            name: 'АЛКОГОЛЬ'
        },{
            id: 13,
            name: 'ВАРЕНИКИ'
        },{
            id: 14,
            name: 'СУШИ'
        },{
            id: 15,
            name: 'ФЕСТИВАЛЬ МИРОВАЯ КУХНЯ'
        }
    ];
    $scope.urls = [
        {
            id: 0,
            path: 'includes/pizza.html'
        },{
            id: 1,
            path: 'includes/soup.html'
        },{
            id: 2,
            path: 'includes/salads.html'
        },{
            id: 3,
            path: 'includes/entrees.html'
        },{
            id: 4,
            path: 'includes/fish-entrees.html'
        },{
            id: 5,
            path: 'includes/vegetables-entrees.html'
        },{
            id: 6,
            path: 'includes/spaghetti.html'
        },{
            id: 7,
            path: 'includes/cold-appetizers.html'
        },{
            id: 8,
            path: 'includes/hot-appetizers.html'
        },{
            id: 9,
            path: 'includes/sides.html'
        },{
            id: 10,
            path: 'includes/deserts.html'
        },{
            id: 11,
            path: 'includes/drinks.html'
        },{
            id: 12,
            path: 'includes/alco.html'
        },{
            id: 13,
            path: 'includes/ravioli.html'
        },{
            id: 14,
            path: 'includes/sushi.html'
        },{
            id: 15,
            path: 'includes/festival.html'
        }
    ];

    $scope.url = {};
    $scope.url.contentUrl = 'includes/pizza.html';

    $scope.sushi = 'images/menu/sushi.jpg';
    $scope.festival = 'images/menu/festival.jpg';

    $scope.selectMenu = function (id) {

        angular.forEach($scope.urls, function (val) {
            if (val.id == id){
                $scope.url.contentUrl = val.path;
            }
        });

        if ($scope.screenWidth < 992) {
            $scope.closeNavigator()
        }

        if ($scope.screenWidth < 500) {
            $interval(function () {
                $scope.cleanText();
                $scope.cleanHtml();
            }, 100, 10)
        } else {
            $interval(function () {
                $scope.cleanText();
                $scope.cleanHtml();
            }, 0, 5)
        }


    };

    $scope.selectMenu(0);

    $scope.em = document.getElementsByTagName('em');

    $scope.cleanText = function () {
        angular.forEach($scope.em, function (item) {
            if(item.innerText){
                item.innerText = process(item.innerText);
            }
        });
    };
    $scope.cleanHtml = function () {
        angular.forEach($scope.em, function (item) {
            if(item.innerHTML){
                item.innerHTML = process(item.innerHTML);
            }
        });
    };

    function process( str ) {
        return str.replace(/\u2026/g, '').replace(/\.\.+/g, '');
    }

    $scope.screenWidth = $window.innerWidth;

    $scope.isCollapsedNavigator = false;
    $scope.isCollapsedMenu = false;
    $scope.navigatorButton = false;

    if ($scope.screenWidth < 992){

        $scope.isCollapsedNavigator = true;
        $scope.navigatorButton = true;

    }

    $scope.showNavigator = function () {

        $scope.isCollapsedNavigator = false;
        $scope.isCollapsedMenu = true;
        $scope.navigatorButton = false;

    };

    $scope.closeNavigator = function () {

        $scope.isCollapsedNavigator = true;
        $scope.isCollapsedMenu = false;
        $scope.navigatorButton = true;

    };

});
