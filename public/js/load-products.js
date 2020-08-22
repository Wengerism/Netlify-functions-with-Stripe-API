function createProductFromTemplate(item) {
	const template = document.querySelector('#product');
	const product = template.content.cloneNode(true);
	// Now we've cloned the div within our template we can modify it
	product.querySelector('.product-name').innerText = item.name;
	product.querySelector('.description').innerText = item.description;
	product.querySelector('[name=sku]').value = item.sku;
	product.querySelector('.price').innerText = new Intl.NumberFormat('en-AU', {
		style: 'currency',
		currency: item.currency
	}).format((item.amount / 100).toFixed(2));

	const img = product.querySelector('img');
	img.src = item.image;
	img.alt = item.name;

	return product;
	// So we've created our own version of the product template as a DOM Node, and then we've modified all the details (title, description, sku, price & image), and then we're just returning that DOM node (the cloned and modified template) from the createProductFromTemplate function.
	// So now we can change the pre that we dumped below, and instead of adding all the data, we can loop through it, hence
}

export async function loadProducts() {
	const data = await fetch('/.netlify/functions/get-products')
		.then((res) => res.json())
		.catch((err) => console.error(err));

	const container = document.querySelector('.products');

	// TO BE DONE: Add markup to display the products
	// const pre = document.createElement('pre');
	// pre.innerText = JSON.stringify(data, null, 2);

	// container.appendChild(pre);
	data.forEach((item) => {
		const product = createProductFromTemplate(item);

		container.appendChild(product);
	});
}
