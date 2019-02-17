var app = angular.module('pizza', [
    'ngRoute',
    'ui.bootstrap',
    'ngTouch',
    'ngAnimate'

]);

app.config(function ($httpProvider) {
    $httpProvider.defaults.headers.get = {
        'Cache-Control': 'no-cache'
    };
});


app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
        .when("/home", {templateUrl: "partials/home.html", controller: "PageCtrl"})
        .when("/menu", {templateUrl: "partials/pricing.html", controller: "PageCtrl"})
        .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
        .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

app.run(function ($rootScope, $location, $timeout) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {

        if (next.$$route.originalPath === '/menu') {
            $timeout(function () {
                $rootScope.refresh()
            }, 100)
        }

        $rootScope.showFooter = !($location.path() !== '/login' && $location.path() !== '/admin');

    })
});

app.controller('PageCtrl', function ($scope, $location, $timeout, $http, $window, $interval, $rootScope) {

    $(document).ready(function () {
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
        name: "Десертони"
    }];
    $scope.types = [
        {
            id: 0,
            path: "images/pizza1.jpg"
        }, {
            id: 1,
            path: "images/pizza2.jpg"
        }, {
            id: 2,
            path: "images/pizza3.jpg"
        }, {
            id: 3,
            path: "images/pizza4.jpg"
        }, {
            id: 4,
            path: "images/pizza5.jpg"
        }];

    $scope.image = $scope.types[0].path;

    $scope.pick = function (id) {
        angular.forEach($scope.types, function (val) {
            if (val.id == id) {
                $scope.image = val.path
            }
        })
    };

    $scope.menuNames = [
        {
            id: 0,
            name: 'НОВИНКИ МЕНЮ'
        },
        // {
        //     id: 1,
        //     name: 'ПОСТНОЕ МЕНЮ'
        // },
        {
            id: 2,
            name: "ПИЦЦА"
        }, {
            id: 3,
            name: 'СУПЫ'
        }, {
            id: 4,
            name: 'САЛАТЫ'
        }, {
            id: 5,
            name: 'ГОРЯЧИЕ БЛЮДА'
        }, {
            id: 6,
            name: 'БЛЮДА ИЗ МОРЕПРОДУКТОВ'
        }, {
            id: 7,
            name: 'БЛЮДА ИЗ ОВОЩЕЙ'
        }, {
            id: 8,
            name: 'ПАСТА'
        }, {
            id: 9,
            name: 'ХОЛОДНЫЕ ЗАКУСКИ'
        }, {
            id: 10,
            name: 'ГОРЯЧИЕ ЗАКУСКИ'
        }, {
            id: 11,
            name: 'ГАРНИР'
        }, {
            id: 12,
            name: 'ДЕСЕРТЫ'
        }, {
            id: 13,
            name: 'НАПИТКИ'
        }, {
            id: 14,
            name: 'АЛКОГОЛЬ'
        }, {
            id: 15,
            name: 'ВАРЕНИКИ'
        }, {
            id: 16,
            name: 'СУШИ'
        }
    ];
    $scope.urls = [
        {
            id: 0,
            path: 'includes/news.html'
        },
        // {
        //     id: 1,
        //     path: 'includes/post.html'
        // },
        {
            id: 2,
            path: 'includes/pizza.html'
        }, {
            id: 3,
            path: 'includes/soup.html'
        }, {
            id: 4,
            path: 'includes/salads.html'
        }, {
            id: 5,
            path: 'includes/entrees.html'
        }, {
            id: 6,
            path: 'includes/fish-entrees.html'
        }, {
            id: 7,
            path: 'includes/vegetables-entrees.html'
        }, {
            id: 8,
            path: 'includes/spaghetti.html'
        }, {
            id: 9,
            path: 'includes/cold-appetizers.html'
        }, {
            id: 10,
            path: 'includes/hot-appetizers.html'
        }, {
            id: 11,
            path: 'includes/sides.html'
        }, {
            id: 12,
            path: 'includes/deserts.html'
        }, {
            id: 13,
            path: 'includes/drinks.html'
        }, {
            id: 14,
            path: 'includes/alco.html'
        }, {
            id: 15,
            path: 'includes/ravioli.html'
        }, {
            id: 16,
            path: 'includes/sushi.html'
        }
    ];


    $scope.url = {};

    $scope.sushi = 'images/menu/sushi.jpg';
    $scope.festival = 'images/menu/festival.jpg';

    $scope.em = document.getElementsByTagName('em');

    $scope.selectMenu = function (id) {

        $scope.selected = id;

        angular.forEach($scope.urls, function (val) {
            if (val.id === id) {
                return $scope.url.contentUrl = val.path;
            }
        });

        if ($scope.screenWidth < 992) {
            $scope.closeNavigator()
        }

        $interval(function () {
            $scope.cleanText();
        }, 0, 5)

    };

    $scope.$watch('url', function (newVal, oldVal) {
        if (newVal) {
            $interval(function () {
                $scope.cleanText();
            }, 0, 5)
        }
    }, true);

    $rootScope.refresh = function () {
        $interval(function () {
            $scope.selectMenu(0);
        }, 0, 3)
    };


    $scope.cleanText = function () {
        angular.forEach($scope.em, function (item) {
            if (item.innerText) {
                item.innerText = process(item.innerText);
            }
        });
        $scope.cleanHtml()
    };
    $scope.cleanHtml = function () {
        angular.forEach($scope.em, function (item) {
            if (item.innerHTML) {
                item.innerHTML = process(item.innerHTML);
            }
        });
    };

    function process(str) {
        return str.replace(/\u2026/g, '').replace(/\.\.+/g, '');
    }

    $scope.screenWidth = $window.innerWidth;

    $scope.isCollapsedNavigator = false;
    $scope.isCollapsedMenu = false;

    $scope.showNavigator = function () {
        $scope.isCollapsedNavigator = false;
        $scope.isCollapsedMenu = true;
    };

    $scope.closeNavigator = function () {
        $scope.isCollapsedNavigator = true;
        $scope.isCollapsedMenu = false;
    };

    $scope.navigateTo = function (path) {

        $location.path('/menu');

        switch (true) {
            case path === 'new':
                $timeout(function () {
                    $scope.selectMenu(0);
                }, 350);
                break;
            case path === 'post':
                $timeout(function () {
                    $scope.selectMenu(1);
                }, 350);
                break;
            case path === 'sushi':
                $timeout(function () {
                    $scope.selectMenu(16);
                }, 350);
                break;
            case path === 'des':
                $timeout(function () {
                    $scope.selectMenu(12);
                }, 350);
                break;
        }

    }
});

app.controller('LoginCtrl', function ($scope, $rootScope, LoginService, $location) {

    $scope.formSubmit = function () {
        if (LoginService.login($scope.username, $scope.password)) {
            $scope.error = '';
            $scope.username = '';
            $scope.password = '';

            $location.path('/admin')
        } else {
            $scope.error = "Incorrect username/password !";
        }
    };

});

app.factory('LoginService', function () {

    var admin = 'admin';
    var pass = 'pass';
    var isAuthenticated = false;

    return {
        login: function (username, password) {
            isAuthenticated = username === admin && password === pass;
            return isAuthenticated;
        },
        isAuthenticated: function () {
            return isAuthenticated;
        }
    };
});

app.controller('AdminCtrl', function ($scope, $rootScope, $location, $timeout) {

    $scope.welcome = "Hello I'm admin panel";

    $scope.menuTemplates = [
        {
            id: 0,
            name: "ПИЦЦА",
            path: 'includes/pizza.html'
        }, {
            id: 1,
            name: 'СУПЫ',
            path: 'includes/soup.html'
        }, {
            id: 2,
            name: 'САЛАТЫ',
            path: 'includes/salads.html'
        }, {
            id: 3,
            name: 'ГОРЯЧИЕ БЛЮДА',
            path: 'includes/entrees.html'
        }, {
            id: 4,
            name: 'БЛЮДА ИЗ МОРЕПРОДУКТОВ',
            path: 'includes/fish-entrees.html'
        }, {
            id: 5,
            name: 'БЛЮДА ИЗ ОВОЩЕЙ',
            path: 'includes/vegetables-entrees.html'
        }, {
            id: 6,
            name: 'ПАСТА',
            path: 'includes/spaghetti.html'
        }, {
            id: 7,
            name: 'ХОЛОДНЫЕ ЗАКУСКИ',
            path: 'includes/cold-appetizers.html'
        }, {
            id: 8,
            name: 'ГОРЯЧИЕ ЗАКУСКИ',
            path: 'includes/hot-appetizers.html'
        }, {
            id: 9,
            name: 'ГАРНИР',
            path: 'includes/sides.html'
        }, {
            id: 10,
            name: 'ДЕСЕРТЫ',
            path: 'includes/deserts.html'
        }, {
            id: 11,
            name: 'НАПИТКИ',
            path: 'includes/drinks.html'
        }, {
            id: 12,
            name: 'АЛКОГОЛЬ',
            path: 'includes/alco.html'
        }, {
            id: 13,
            name: 'ВАРЕНИКИ',
            path: 'includes/ravioli.html'
        }, {
            id: 14,
            name: 'СУШИ',
            path: 'includes/sushi.html'
        }, {
            id: 15,
            name: 'ФЕСТИВАЛЬ МИРОВАЯ КУХНЯ',
            path: 'includes/festival.html'

        }
    ];

    $scope.loadTemplate = function (item) {
        $scope.templateHtml = item.path;
    }
});
