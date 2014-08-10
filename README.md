# angular-datepicker

The mobile-friendly, responsive, and lightweight Angular.js date &amp; time input picker. Perfect for Ionic apps!

![datepicker](https://dl.dropboxusercontent.com/u/16304603/datepicker.PNG), ![datepicker](https://dl.dropboxusercontent.com/u/16304603/timepicker.PNG)

This is basically a [pickadate.js](https://github.com/amsul/pickadate.js) fork that completely removes the jQuery dependency and adds Angular.js directives.

### Bower

`bower install angular-native-datepicker`

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
