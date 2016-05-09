angular.module('app', ['ui.router'])

   .config(function($locationProvider, $stateProvider, $urlRouterProvider)
   {
      $locationProvider.html5Mode({
         enabled: true,
         requireBase: true
      });

      //$urlRouterProvider.when('/', '/profile/x/details');
      $urlRouterProvider.otherwise(function ($injector) {
      console.log('otherwise');
         var $state = $injector.get('$state');
         $state.go('base.404', null, { location: false });
      });
  
      $stateProvider
         .state('home', {
            name: 'home',
            url: '/home',
            template: 'STATE: home | <a ui-sref="base.profile.details({id: 1})">go to state with 404</a>'
         })
      .state('base', {
        name: 'base',
        templateUrl: 'assets/base.html',
        abstract: true,
        resolve: {
          x: function() {
            console.log('first resolve which works');
            return true;
          }
        }
      })
      .state('base.404', {
        name: '404',
        views: {
          "errorView@base": {
            template: 'STATE: 404 | <a ui-sref="home">go home state</a>'
          }
        }
      })
      .state('base.profile',{
        name: 'profile',
        url: '/profile/:id',
        abstract: true,
        template: 'STATE: profile <div ui-view></div>',
        resolve: {
          data: function($q, $stateParams) {
            console.log($stateParams.id);
            if ($stateParams.id == 3) {
              console.log("good profile");
              return "good profile";
            } else {
              console.log('second resolve, which fails');
              return $q.reject(404);
            }
          }
        }
      })
      .state('base.profile.details', {
        name: 'profile.details',
        url: '/details',
        template: 'STATE: profile.details',
        resolve: {
          details: function(data) {
            console.log('third resolve, we won\'t get here');
            return true;
          }
        }
      });
   })
  .run(function($rootScope, $state) {
      $rootScope.$on('$stateChangeError', function (event, to, toParams, from, fromParams, error) {
      console.log("state change error");
      console.log(to);
      console.log(error);
         if (error === 404) {
            event.preventDefault();
            return $state.go('base.404', null, { location: false });
         }
      });
  })
;