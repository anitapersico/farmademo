import { CATEGORIES } from '../constants';

function ProductCard({ product, onAddToCart }) {
  const categoryInfo = CATEGORIES.find((c) => c.id === product.category);
  const imageUrl = product.image?.trim()
    ? product.image
    : `https://picsum.photos/seed/${product._id}/400/300`;

  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <img
          src={imageUrl}
          alt={product.name}
          className="product-image"
          referrerPolicy="no-referrer"
        />
        {categoryInfo && <span className="category-badge">{categoryInfo.label}</span>}
      </div>
      <div className="product-card-body">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className="price">€{product.price}</p>
        <button onClick={() => onAddToCart(product)}>Aggiungi al carrello</button>
      </div>
    </div>
  );
}

export default ProductCard;