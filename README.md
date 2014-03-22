# angular-datepicker

The mobile-friendly, responsive, and lightweight Angular.js date &amp; time input picker.

![datepicker](https://dl.dropboxusercontent.com/u/16304603/datepicker.PNG), ![datepicker](https://dl.dropboxusercontent.com/u/16304603/timepicker.PNG)

This is basically a [pickadate.js](https://github.com/amsul/pickadate.js) fork that completely removes the jQuery dependency and adds Angular.js directives.

### Usage

Just add the `pick-a-date` or `pick-a-time` attribute to your input:

    <input type="text" pick-a-date="date" placeholder="Select Date" /> {{ date }}
    
    <input type="text" pick-a-time="time" placeholder="Select Time" /> {{ time }}
