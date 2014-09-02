# angular-datepicker

The mobile-friendly, responsive, and lightweight Angular.js date &amp; time input picker. Perfect for Ionic apps!

![datepicker](https://dl.dropboxusercontent.com/u/16304603/datepicker.PNG), ![datepicker](https://dl.dropboxusercontent.com/u/16304603/timepicker.PNG)

This is basically a [pickadate.js](https://github.com/amsul/pickadate.js) fork that completely removes the jQuery dependency and adds Angular.js directives.

### Bower

`bower install angular-native-picker`

### Usage

Include `build/angular-datepicker.js` in your application:

```HTML
<script src="angular-datepicker.js"></script>
```
    
Add the module `angular-datepicker` as a dependency to your app module:

```JavaScript
var myapp = angular.module('myapp', ['angular-datepicker']);
```
    
To create a date or time picker, add the `pick-a-date` or `pick-a-time` directive to your input tag:

```HTML
<input type="text" pick-a-date="date" placeholder="Select Date" /> {{ date }}
<input type="text" pick-a-time="time" placeholder="Select Time" /> {{ time }}
```

You can also provide an options object to the directive which will be passed
into the `pickadate` or `pickatime` constructor.

```javascript
// somewhere in your controller
$scope.options = {
  format: 'yyyy-mm-dd', // ISO formatted date
  onClose: function(e) {
    // do something when the picker closes   
  }
}
```

```HTML
<input type="text" pick-a-date="date" pick-a-date-options="options" /> {{ date }}
<input type="text" pick-a-time="time" pick-a-time-options="options" /> {{ time }}
```

If you don't need to provide any callbacks (like `onClose`) you can specify the
options object as an angular expression:

```HTML
<input type="text" pick-a-date="date" pick-a-date-options="{ format: 'yyyy-mm-dd' }" />
```

For a full list of available options please refer to the pickadate documentation
for [datepicker options](http://amsul.ca/pickadate.js/date.htm) and 
[timepicker options](http://amsul.ca/pickadate.js/time.htm).
