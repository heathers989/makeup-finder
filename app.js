$(() => {


 $('form').on('submit', (event) =>{

    event.preventDefault();

    const userInput = $('input[type="text"]').val();

    const productNameUl = $('#product-name')

    

    $.ajax({
        url: `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${userInput}`
    }).then(
        data => {
console.log(data)

            let $prod = $('#name')
            let $price = $('#price')
            let $image = $('#image')
                data.map(x => { 
                let nameDiv = $('<div>').addClass('names');
                let priceDiv = $('<div>').addClass('prices');
                let imageDiv = $('<div>').addClass('images');
                let imgUrl = $('<img>');

                nameDiv.html(x.name) 
                $prod.append(nameDiv)

                priceDiv.html(x.price)
                $price.append(priceDiv)
                
                imgUrl.attr('src', x.image_link)
                $image.append(imageDiv)
                imageDiv.append(imgUrl)
            });
        },
        () => {
            console.log('something went wrong')
        }
    )




})
   

})