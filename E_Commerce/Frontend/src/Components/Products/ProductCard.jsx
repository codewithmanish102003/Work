const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }
  
  const ProductCard = ({ product }) => {
    const discountedPrice = product.price * (1 - product.discount / 100)
  
    return (
      <div
        className="max-w-sm rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
        style={{ backgroundColor: product.bgcolor }}
      >
        <div className="relative h-48 w-full flex items-center justify-center">

        {product.image ? (
          <img
            src={`data:image/jpeg;base64,${product.image}`}
            alt={product.name}
            className="w-[1/2] object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            No Image
          </div>
        )}
        </div>
        <div className="px-6 py-4" style={{ backgroundColor: product.panelcolor, color: product.textcolor }}>
          <div className="font-bold text-xl mb-2">{product.name}</div>
          <p className="text-base mb-2">
            {product.discount > 0 ? (
              <>
                <span className="line-through">{formatCurrency(product.price)}</span>
                <span className="ml-2 font-bold">{formatCurrency(discountedPrice)}</span>
                <span className="ml-2 text-sm bg-red-500 text-white px-2 py-1 rounded">{product.discount}% OFF</span>
              </>
            ) : (
              <span className="font-bold">{formatCurrency(product.price)}</span>
            )}
          </p>
          <p className="text-sm">Sold by: {product.owner.name}</p>
        </div>
        <div className="px-6 pt-4 pb-2" style={{ backgroundColor: product.panelcolor, color: product.textcolor }}>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{new Date(product.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    )
  }
  
  export default ProductCard
  
  