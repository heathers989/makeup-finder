$(() => {


 $('form').on('submit', (event) =>{

    event.preventDefault();

    const userInput = $('input[type="text"]').val();

    const productNameUl = $('#product-name')

    

    $.ajax({
        url: `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${userInput}`
    }).then(
        data => {

            let $prod = $('#name')
            let $price = $('#price')
            let $image = $('#image')
            let parentDiv = $('<div>').addClass('parent')
            $('#container').append(parentDiv)

                data.map(x => { 
                let $prodDiv = $('<div>').addClass('product')
                let nameDiv = $('<div>').addClass('names');
                let priceDiv = $('<div>').addClass('prices');
                let imageDiv = $('<div>').addClass('images');
                let imgUrl = $('<img>');

                if (x.price !== '0.0'){

                nameDiv.html(x.name) 
                console.log(nameDiv.html(x.name))
                $prod.append(nameDiv)

                priceDiv.html(x.price)
                $price.append(priceDiv)
                
                imgUrl.attr('src', x.image_link)
                $image.append(imageDiv)
                imageDiv.append(imgUrl)

                $prodDiv.append(nameDiv, priceDiv, imageDiv)
                parentDiv.append($prodDiv)
                }
            });
        },
        () => {
            console.log('something went wrong')
        }
    )




})
   

})