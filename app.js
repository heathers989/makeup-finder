$(() => {

    //create variables to use in DOM manipulation
    const $openBtn = $('#openModal');
    const $modal = $('#modal');
    const modalContents = $('#modal-contents')
    const $closeBtn = $('#close');
    let typeInputBox = $('#input-box-type');
    let brandInputBox = $('#input-box-brand')
    let $brand = $('#brand')
    let $prod = $('#name')
    let $price = $('#price')
    let $image = $('#image')
    let $favorite = $('#favorite')
    let parentDiv = $('<div>').addClass('parent')
        $('#container').append(parentDiv)

        //create function for modal div when open
    const openModal = () => {
            $modal.css('display', 'block');
          }

          //create function for modal div when closed
    const closeModal = () => {
            $modal.css('display', 'none');
          }
    
    //add click listeners to the open and close buttons for modal
    $openBtn.on('click', openModal)
    $closeBtn.on('click', closeModal);

//code for product type submission form
 $('#type-form').on('submit', (event) =>{

    event.preventDefault();

    //empty parent div so new searches will replace old ones, not stack
    parentDiv.empty();

    //set the user's search to a variable
    const userInput = $('input[type="text"]').val();

    //retrieve data from API
    $.ajax({
        url: `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${userInput}`
    }).then(
        data => {
            
                //create new array for data
                data.map(x => { 

                    //create variables to be used in AJAX call
                    let $prodDiv = $('<div>').addClass('product').attr('id', x.id)
    
                    let brandDiv = $('<div>').addClass('brands')
                    let nameDiv = $('<div>').addClass('names');
                    let priceDiv = $('<div>').addClass('prices');
                    let imageDiv = $('<div>').addClass('images');
                    let faveDiv = $('<div>').addClass('favorites')
                    let imgUrl = $('<img>');
                    let faveUrl = $('<img>').addClass('fave-icons');

            
                //filter out records where price is zero because they're not accurate
                if (x.price !== '0.0'){

                //get html from x array, assign to variables and append to the appropriate DIVs
                brandDiv.html(x.brand)
                $brand.append(brandDiv)
                
                nameDiv.html(x.name) 
                $prod.append(nameDiv)
                

                priceDiv.html('$' + x.price)
                $price.append(priceDiv)
                
                imgUrl.attr('src', x.image_link)
                $image.append(imageDiv)
                imageDiv.append(imgUrl)

                faveUrl.attr('src', 'https://img.favpng.com/13/20/24/heart-outline-clip-art-png-favpng-ehm1nJyYBQ3jDcCLywzBrGvpD.jpg').css('max-height', '40px')

                faveUrl.attr('title', 'Click to add item to Favorites list')
                $favorite.append(faveDiv);
                faveDiv.append(faveUrl)
            
                
                //replace broken image links with substitute image file
                $("img").on("error", function () {
                    $(this).attr("src", "https://www.warnersstellian.com/Content/images/product_image_not_available.png");
                });

                //append all divs with product info to the product div
                $prodDiv.append(brandDiv, nameDiv, priceDiv, imageDiv, faveDiv)
                
                //append the product div to the parent div
                parentDiv.append($prodDiv)

                //clear out input box value
                typeInputBox.val('')

                //function to handle adding and removing items to/from favorites list
                const addRemoveFave = function () {

                    //assign the image source of the faveUrl variable to a new variable
                    $imgsrc = faveUrl.attr('src')

                    //if the url of the image is the unselected image, change it to the selected image when clicked
                    if ($imgsrc === "https://img.favpng.com/13/20/24/heart-outline-clip-art-png-favpng-ehm1nJyYBQ3jDcCLywzBrGvpD.jpg") {

                        faveUrl.attr('src', 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/red-heart.png')
                        
                        //create a remove button to use in modal favorites list
                        let removeButton = $('<button>').addClass('remove-button').text('Remove')

                        //create a p to contain information of the product being favorited
                        let modalFave = $('<p>').text(`${x.name}`).attr('id', `${x.name}`).data('prodId', x.id)

                    //clone the image from the product being favorited and append it to the p  
                    $(imgUrl).clone().appendTo(modalFave)

                    //append the remove button to the end of the p (modalFave)
                    modalFave.append(removeButton)

                    //append the modalFave to the modalContents div
                    modalContents.append(modalFave);

                    //prevent alert from showing before DOM changes are visible (heart has switched to favorited image)
                    setTimeout(() => {
                        alert( `${x.name} added to favorites`)
                    }, 200)

                    //if the url of the image is the image for favorited items, change it to the unselected (outline) heart when clicked
                    } else if ($imgsrc === 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/red-heart.png') {

                        faveUrl.attr('src', 'https://img.favpng.com/13/20/24/heart-outline-clip-art-png-favpng-ehm1nJyYBQ3jDcCLywzBrGvpD.jpg').css('max-height', '40px')
                       
                    //prevent alert from showing before DOM changes are visible (heart has switched to favorited image)
                        setTimeout(() => {
                            alert( `${x.name} removed from favorites`)
                        }, 200)

                        //if a p exists with an id that matches the name of a product in our array, remove the item with that id from the dom
                        if ($('p').attr('id') === x.name) {
                            let toRemove = document.getElementById(x.name);
                        toRemove.remove(toRemove.selectedIndex);

                        } 
                    }
                    //set a click listener on the remove button
                    $('.remove-button').on('click', (event) => {
                        event.preventDefault()

                            //get the prodid data value of the parent p of the event target
                            const prodId = $(event.target).parent('p').data('prodId')
                            
                            //empty the favorites div that is the child of an item that has an id matching prodId    
                            $(`#${prodId} > div.favorites`).empty()

                            //populate the targeted favorites div with the unselected (outline) heart image
                            $(`#${prodId} > div.favorites`).html( "<img height='40px' src='https://img.favpng.com/13/20/24/heart-outline-clip-art-png-favpng-ehm1nJyYBQ3jDcCLywzBrGvpD.jpg'>").css('max-height', '40px')

                            //remove the parent p of the event target from the modal DIV
                            $(event.target).parent('p').remove();

                            
                        })
                }
                //create click listener for favorite/unselected hearts and call the addRemoveFave function when they're clicked
                faveUrl.on('click', (event) => {
                    event.preventDefault()
                    
                    addRemoveFave()
                })


                }
        });
        },
        () => {
            console.log('something went wrong')
        })

    })  

    $('#brand-form').on('submit', (event) =>{

        event.preventDefault();
    
        parentDiv.empty();
    
        const userInputBrand = $('#input-box-brand').val();
        
    
        $.ajax({
            url: `https://makeup-api.herokuapp.com/api/v1/products.json?brand=${userInputBrand}`
        }).then(
            data => {
                
    
                    data.map(x => { 
    
                        
                        let $prodDiv = $('<div>').addClass('product').attr('id', x.id)
    
                        let brandDiv = $('<div>').addClass('brands')
                        let nameDiv = $('<div>').addClass('names');
                        let priceDiv = $('<div>').addClass('prices');
                        let imageDiv = $('<div>').addClass('images');
                        let faveDiv = $('<div>').addClass('favorites')
                        let imgUrl = $('<img>');
                        let faveUrl = $('<img>').addClass('fave-icons');
    
    
                    if (x.price !== '0.0'){
    
                    brandDiv.html(x.brand)
                    $brand.append(brandDiv)
                    
                    nameDiv.html(x.name) 
                    $prod.append(nameDiv)
    
                    
                    priceDiv.html('$' + x.price)
                    $price.append(priceDiv)
               
                    
                    imgUrl.attr('src', x.image_link)
                    $image.append(imageDiv)
                    imageDiv.append(imgUrl)

                    faveUrl.attr('src', 'https://img.favpng.com/13/20/24/heart-outline-clip-art-png-favpng-ehm1nJyYBQ3jDcCLywzBrGvpD.jpg').css('max-height', '40px')

                    faveUrl.attr('title', 'Click to add item to Favorites list')
                    $favorite.append(faveDiv);
                    faveDiv.append(faveUrl);
                    
                    
    
                    $("img").on("error", function () {
                        $(this).attr("src", "https://www.warnersstellian.com/Content/images/product_image_not_available.png");
                    });
    
                    $prodDiv.append(brandDiv, nameDiv, priceDiv, imageDiv, faveDiv)
                    
                    parentDiv.append($prodDiv)
    
                    brandInputBox.val('')


                    const addRemoveFave = function () {

                        $imgsrc = faveUrl.attr('src')

                        if ($imgsrc === "https://img.favpng.com/13/20/24/heart-outline-clip-art-png-favpng-ehm1nJyYBQ3jDcCLywzBrGvpD.jpg") {

                            faveUrl.attr('src', 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/red-heart.png')
                            
                            let removeButton = $('<button>').addClass('remove-button').text('Remove')

                            let modalFave = $('<p>').text(`${x.name}`).attr('id', `${x.name}`).data('prodId', x.id)
    
                        $(imgUrl).clone().appendTo(modalFave)

                        modalFave.append(removeButton)
    
                        modalContents.append(modalFave);
    
                        setTimeout(() => {
                            alert( `${x.name} added to favorites`)
                        }, 200)
                        } else if ($imgsrc === 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/red-heart.png') {

                            faveUrl.attr('src', 'https://img.favpng.com/13/20/24/heart-outline-clip-art-png-favpng-ehm1nJyYBQ3jDcCLywzBrGvpD.jpg').css('max-height', '40px')
                           

                            setTimeout(() => {
                                alert( `${x.name} removed from favorites`)
                            }, 200)

                            if ($('p').attr('id') === x.name) {
                                let toRemove = document.getElementById(x.name);
                            toRemove.remove(toRemove.selectedIndex);

                            }
                        } 
                            $('.remove-button').on('click', (event) => {
                            event.preventDefault()

                            const prodId = $(event.target).parent('p').data('prodId')
                            console.log(prodId)
                                
                            $(`#${prodId} > div.favorites`).empty()

                            $(`#${prodId} > div.favorites`).html( "<img height='40px' src='https://img.favpng.com/13/20/24/heart-outline-clip-art-png-favpng-ehm1nJyYBQ3jDcCLywzBrGvpD.jpg'>").css('max-height', '40px')

                            $(event.target).parent('p').remove();
                            
                        })
                    }
                    //set click listener on favorite/unselected hearts
                    faveUrl.on('click', (event) => {
                        event.preventDefault()
                        
                        addRemoveFave()
                    })

                    }
                });
            },
            () => {
                console.log('something went wrong')
            })
    
        })  
    

})