/**
 * AngularJS module for updating browser title/history based on the current ui-router state.
 *
 * @link https://github.com/nonplus/angular-ui-router-title
 *
 * @license angular-ui-router-title v0.0.4
 * (c) Copyright Stepan Riha <github@nonplus.net>
 * License MIT
 */

(function(angular) {

"use strict";
angular.module("ui.router.title", ["ui.router"])
	.run(["$rootScope", "$timeout", "$state", function($rootScope, $timeout, $state) {

		$rootScope.$on("$stateChangeSuccess", function() {
			var title = getTitleValue($state.$current.locals.globals.$title);
			$timeout(function() {
				$rootScope.$title = title;
			});

			$rootScope.$breadcrumbs = [];
			var state = $state.$current;
			while (state) {
			    var stateName = getStateName(state);
			    if (state.resolve && state.resolve.$title && stateName) {
			        $rootScope.$breadcrumbs.unshift({
			            title: getTitleValue(state.locals.globals.$title),
			            state: stateName,
			            stateParams: state.locals.globals.$stateParams
			        })
			    }
			    state = state.parent;
			}
		});

		function getTitleValue(title) {
			return angular.isFunction(title) ? title() : title;
		}

		function getStateName(state) {
		    if (state.abstract)
		        return state.self.defaultSubstate ? state.self.defaultSubstate : null;
		    else
		        return state.self.name;
		}

	}]);


})(window.angular);