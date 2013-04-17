MapEscape
=========

A jQuery / Zepto plugin for maps.

This plugin detects if the viewable area on your map is greater than or beyond the screen height, and places a scrollable area to the right of your map. 
This scrollable area then allows you to scroll out of the map and reach the rest of the content on your web page.

1. Simple to integrate with one line of code.
2. Completely customisable via options, and CSS
3. Less than 1k minified
4. Compatable with both jQuery and Zepto

IMPLEMENTATION
-----------------

//simple initialise mapescape
$(document).ready(function(){
	$('.map').mapescape();
});


OPTIONS
---------

- alwaysOn			| Boolean |	if false map height is measured against window height - true always shows scoll area
- hiddenClass		|	String	|	CSS class to hide the control
- scrollText		|	String	| text in scroll indicator - leave blank for none
- threshhold		|	Integer	| Amount of viewable scroll area below the map before control is shown
- tabCenter			|	Boolean	| Position the scroll indicator with JS - false to position with CSS
- scrollFollow	|	Boolean	|	set to false for static scroll tab


FILES
-----------------
demos/scripts/mapescape.min.js

demos/css/mapescape.css

demos/images/scroll-icon.png





