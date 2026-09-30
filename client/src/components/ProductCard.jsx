function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p className="price">€{product.price}</p>
      <button onClick={() => onAddToCart(product)}>Aggiungi al carrello</button>
    </div>
  );
}

export default ProductCard;