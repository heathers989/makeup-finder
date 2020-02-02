$(() => {

    let typeInputBox = $('#input-box-type');
    let brandInputBox = $('#input-box-brand')
    let $brand = $('#brand')
    let $prod = $('#name')
    let $price = $('#price')
    let $image = $('#image')
    let $favorite = $('#favorite')
    let parentDiv = $('<div>').addClass('parent')
        $('#container').append(parentDiv)


 $('#type-form').on('submit', (event) =>{

    event.preventDefault();

    parentDiv.empty();

    const userInput = $('input[type="text"]').val();

    $.ajax({
        url: `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${userInput}`
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

                priceDiv.html(x.price)
                $price.append(priceDiv)
                
                imgUrl.attr('src', x.image_link)
                $image.append(imageDiv)
                imageDiv.append(imgUrl)

                faveUrl.attr('src', 'https://img.favpng.com/13/20/24/heart-outline-clip-art-png-favpng-ehm1nJyYBQ3jDcCLywzBrGvpD.jpg').css('max-height', '40px')
                $favorite.append(faveDiv);
                faveDiv.append(faveUrl)
                

                $("img").on("error", function () {
                    $(this).attr("src", "https://www.warnersstellian.com/Content/images/product_image_not_available.png");
                });

                $prodDiv.append(brandDiv, nameDiv, priceDiv, imageDiv, faveDiv)
                
                parentDiv.append($prodDiv)

                typeInputBox.val('')

                faveUrl.on('click', (event) => {
                    event.preventDefault();
                    faveUrl.attr('src', 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/red-heart.png')
                    console.log( `${x.name} added to favorites`)

                    });

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
        console.log('user input is', userInputBrand);
    
        $.ajax({
            url: `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${userInputBrand}`
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
    
                    priceDiv.html(x.price)
                    $price.append(priceDiv)
                    
                    imgUrl.attr('src', x.image_link)
                    $image.append(imageDiv)
                    imageDiv.append(imgUrl)

                    faveUrl.attr('src', 'https://img.favpng.com/13/20/24/heart-outline-clip-art-png-favpng-ehm1nJyYBQ3jDcCLywzBrGvpD.jpg').css('max-height', '40px')
                    $favorite.append(faveDiv);
                    faveDiv.append(faveUrl)
                    
    
                    $("img").on("error", function () {
                        $(this).attr("src", "https://www.warnersstellian.com/Content/images/product_image_not_available.png");
                    });
    
                    $prodDiv.append(brandDiv, nameDiv, priceDiv, imageDiv, faveDiv)
                    
                    parentDiv.append($prodDiv)
    
                    brandInputBox.val('')

                    faveUrl.on('click', (event) => {
                        event.preventDefault();
                        faveUrl.attr('src', 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/red-heart.png')
                        console.log( `${x.name} added to favorites`)

                        });


                    }
                });
            },
            () => {
                console.log('something went wrong')
            })
    
        })  
    

})