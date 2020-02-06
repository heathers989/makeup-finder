# makeup-finder
uses makeup API to allow user to search for products by brand or product type and add to list of favorites
 (SEIR-flex Project 1)

 Technologies used: Git/GitHub, HTML, CSS, JavaScript, Jquery.
 
Approach taken: I took inspiration from other online retail sites such as Sephora and Ulta, where clicking a heart would add an item to a list of favorites, and clicking it again would remove that item from the favorites list. I wanted the favorites list to only show when specifially referenced, so I used a modal window for that. 

API used: http://makeup-api.herokuapp.com/

Live site: https://heathers989.github.io/

Unsolved problems: 

-Responsive design - when using a mobile view, the column headers all show first, and then the corresponding items. Current workaround is hiding headers. Plan to test using UL/LI instead of DIVs and/or experimenting with flex-order

-One of the remove options requires the product name being the ID of the favorited item, which works 95% of the time but on items with special characters in the names it occasionally does not. Will work on a more intuitive method for matching the clicked item to the corresponding favorite.
