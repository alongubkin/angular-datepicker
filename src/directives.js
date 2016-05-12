// mostly taken from http://www.codinginsight.com/angularjs-and-pickadate/

angular.module('angular-datepicker', [])
    .directive('pickADate', function() {    
        return {        
            restrict: "A",
            scope: {            
                pickADate: '=',
                pickADateOptions: '='        
            },
            link: function(scope, element, attrs) {

                var options = {};

                function initPickADate(){

                    options = scope.pickADateOptions ? angular.copy(scope.pickADateOptions) : {};

                    var userOnSet = options.onSet;

                    function onSet(e) {
                        if (typeof userOnSet === 'function') {
                            userOnSet.apply(this, arguments);
                        }

                        if (scope.$$phase || scope.$root.$$phase) // we are coming from $watch or link setup
                                                 return;                    
                        var select = element.pickadate('picker').get('select'); // selected date

                        if (select) {
                            scope.$apply(function() {                        
                                if (e.hasOwnProperty('clear')) {                            
                                    scope.pickADate = null;                            
                                    return;                        
                                }                        
                                if (!scope.pickADate || typeof scope.pickADate === 'string') {
                                    scope.pickADate = new Date(0);
                                }
                                scope.pickADate.setYear(select.obj.getFullYear());
                                scope.pickADate.setMonth(select.obj.getMonth());
                                scope.pickADate.setDate(select.obj.getDate());
                            });
                        }
                    }

                    var userOnOpen = options.onOpen;

                    function onOpen(e) {
                        if (typeof userOnOpen === 'function') {
                            userOnOpen.apply(this, arguments);
                        }

                        var time = scope.pickADate ? scope.pickADate : element.val();

                        element.pickadate('picker').set('select', time, {
                            format: options.format
                        });
                    }

                    var userOnClose = options.onClose;

                    function onClose(e) {
                        if (typeof userOnClose === 'function') {
                            userOnClose.apply(this, arguments);
                        }

                        if (typeof cordova === 'undefined' || !cordova.plugins || !cordova.plugins.Keyboard) {
                            return;
                        }

                        var keyboardShowCallback = function() {
                            cordova.plugins.Keyboard.close();
                            window.removeEventListener('native.keyboardshow', this);
                        };

                        window.addEventListener('native.keyboardshow', keyboardShowCallback);

                        setTimeout(function() {
                            window.removeEventListener('native.keyboardshow', keyboardShowCallback);
                        }, 500);
                    }

                    options = angular.extend(options, {
                        onOpen: onOpen,
                        onSet: onSet,
                        onClose: onClose,
                        container: document.body            
                    });

                    element.pickadate(options);

                    scope.pickADateOptions.container = document.body;
                }

                var list = '';
                for (var i in scope.pickADateOptions) {
                    if (i != 'container') {
                        list += !list ? 'pickADateOptions.' + i : ' + pickADateOptions.' + i;
                    }
                }  


                function reinitPickADate() {
                    initPickADate();
                    if (element.pickadate('picker')) {
                        element.pickadate('picker').changeSettings(options);

                        if (scope.pickADate) {
                            element.pickadate('picker').set('select', scope.pickADate);
                        }
                    }
                }

                scope.$watch(list, reinitPickADate); 
                 

            }    
        };
    })
    .directive('pickATime', function() {    
        return {        
            restrict: "A",
            scope: {            
                pickATime: '=',
                pickATimeOptions: '='        
            },
            link: function(scope, element, attrs) {

                var options = {};

                function initPickATime(){

                    options = scope.pickATimeOptions ? angular.copy(scope.pickATimeOptions) : {};

                    var userOnSet = options.onSet;

                    function onSet(e) {
                        if (typeof userOnSet === 'function') {
                            userOnSet.apply(this, arguments);
                        }

                        if (scope.$$phase || scope.$root.$$phase) // we are coming from $watch or link setup
                            return;                    
                        var select = element.pickatime('picker').get('select'); // selected date

                        if (select) {
                            scope.$apply(function() {                        
                                if (e.hasOwnProperty('clear')) {                            
                                    scope.pickATime = null;                            
                                    return;                        
                                }                        
                                if (!scope.pickATime || typeof scope.pickATime === 'string') {
                                    scope.pickATime = new Date();
                                }
                                scope.pickATime.setHours(select.hour);                        
                                scope.pickATime.setMinutes(select.mins);                        
                                scope.pickATime.setSeconds(0);                        
                                scope.pickATime.setMilliseconds(0);                    
                            });
                        }
                    }



                    var userOnOpen = options.onOpen;

                    function onOpen(e) {
                        if (typeof userOnOpen === 'function') {
                            userOnOpen.apply(this, arguments);
                        }

                        var time = scope.pickATime ? scope.pickATime : element.val();

                        element.pickatime('picker').set('select', time, {
                            format: options.format
                        });
                    }

                    var userOnClose = options.onClose;

                    function onClose(e) {
                        if (typeof userOnClose === 'function') {
                            userOnClose.apply(this, arguments);
                        }

                        if (typeof cordova === 'undefined' || !cordova.plugins || !cordova.plugins.Keyboard) {
                            return;
                        }

                        var keyboardShowCallback = function() {
                            cordova.plugins.Keyboard.close();
                            window.removeEventListener('native.keyboardshow', this);
                        };

                        window.addEventListener('native.keyboardshow', keyboardShowCallback);

                        setTimeout(function() {
                            window.removeEventListener('native.keyboardshow', keyboardShowCallback);
                        }, 500);
                    }



                    element.pickatime(angular.extend(options, {    
                        onOpen: onOpen,            
                        onSet: onSet,
                        onClose: onClose,
                        container: document.body            
                    }));

                    setTimeout(function() {
                        if (scope.pickATime) {
                            element.pickatime('picker').set('select', scope.pickATime);
                        }
                    }, 0);      

                }

                var list = '';
                for (var i in scope.pickATimeOptions) {
                    if (i != 'container') {
                        list += !list ? 'pickATimeOptions.' + i : ' + pickATimeOptions.' + i;
                    }
                }  

                function reinitPickATime() {
                    initPickATime();
                    if (element.pickatime('picker')) {
                        element.pickatime('picker').changeSettings(options);

                        if (scope.pickATime) {
                            element.pickatime('picker').set('select', scope.pickATime);
                        }
                    }
                }

                scope.$watch(list, reinitPickATime);   
            }    
        };
    });
