export function createHtml(cart) {
    let emailBody = "";
  
    cart.productsOnCart.forEach((element) => {
      console.log(element);
  
      let product = `<p>- ${element.product.title} por una cantidad de ${element.quantity}</p>`;
  
      emailBody += product;
    });
  
    return emailBody;
  }
  