Lightweight Overlays/Modal Dialogs
====================================

This is lightweight jQuery plugin for overlays/modal dialogs.


List of functionalities covered
--------------------------------

 1. Handle multiple overlay instances in a page
 2. Ability to pass different content elements dynamically to single overlay instance
 2. Mask layer to disable the content in the background
 2. Closing the overlay using escape key and clicking on mask layer
 3. Dynamically resize the overlay according to screen height
 4. Configurability to show in center of page or relative to triggered element

Basic Usage
-----------
 1. Add the HTML code in page
 
 ```html
  <div class="ol" id="oly1">
		<div class="ol-bg"></div>
		<div class="ol-wr">
			<div class="ol-h"><span></span><a href="javascript:;" class="olCls">X</a></div>
			<div class="ol-c">
				
			</div>
		</div>
	</div>
```
 2. Add jQuery.js, overlay.js, overlay.css to page
 3. Add the following code in ``` $(document).ready ```

```javascript 
	$("#oly1").overlay({
	  contentEl: "#contentEl",
	  head : {m: "This is header for overlay 1."},
		width : 600,
		closeEl : $("#closeOvl1, #oly1 .olCls")
	});
```

This code will 

 1. open a overlay by showing the element with ID `contentEl` 
 2. set the text `This is header for overlay 1.` as header 
 3. set the width as 600px for the overlay
 4. enable the elements `closeOvl1`, `#oly1 .olCls` to close the overlay
 
Options available
------------------

```javascript 
	animClose : false, //Fade out animation while closing
	animOpen : false, //Fade In animation while opening
	closeOnMaskClick : true, //Close the overlay when clicked outside the overlay i.e on mask
	closeOnEscape : true, //Close the overlay when Esc key is pressed
	showInCenter : true, //Show the overlay in center of screen
	resizeToWindowHeight : true, //Resize the overlay as per screen height
	maxHeight : 500, //If resizeToWindowHeight is true, what should be the max height for overlay
	triggerEl : null, //For opening overlay relative to triggering element
	hasMask : true, //Masking the background
	closeEl : null, //Elements which can close the overlay
	width : 500, //Width for the overlay
	h : '', //Header text
	contentEl : null //Content for overlay
	
```