$(() => {

    
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

    const openModal = () => {
            $modal.css('display', 'block');
          }

    const closeModal = () => {
            $modal.css('display', 'none');
          }

    $openBtn.on('click', openModal)
    $closeBtn.on('click', closeModal);


 $('#type-form').on('submit', (event) =>{

    event.preventDefault();

    parentDiv.empty();

    const userInput = $('input[type="text"]').val();

    $.ajax({
        url: `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${userInput}`
    }).then(
        data => {
            

                data.map(x => { 

                    
                    let $prodDiv = $('<div>').addClass('product')
    
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
                faveDiv.append(faveUrl)
            
                

                $("img").on("error", function () {
                    $(this).attr("src", "https://www.warnersstellian.com/Content/images/product_image_not_available.png");
                });

                $prodDiv.append(brandDiv, nameDiv, priceDiv, imageDiv, faveDiv)
                
                parentDiv.append($prodDiv)

                typeInputBox.val('')

                const addRemoveFave = function () {

                    $imgsrc = faveUrl.attr('src')

                    if ($imgsrc === "https://img.favpng.com/13/20/24/heart-outline-clip-art-png-favpng-ehm1nJyYBQ3jDcCLywzBrGvpD.jpg") {

                        faveUrl.attr('src', 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/red-heart.png')
                        
                        

                        let modalFave = $('<p>').text(`${x.name}`).attr('id', `${x.name}`)

                    $(imgUrl).clone().appendTo(modalFave)

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
                }

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
    
                        
                        let $prodDiv = $('<div>').addClass('product')
    
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
                            
                            

                            let modalFave = $('<p>').text(`${x.name}`).attr('id', `${x.name}`)
    
                        $(imgUrl).clone().appendTo(modalFave)
    
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
                    }

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