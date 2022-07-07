import React, {useState} from 'react';
import {IProduct} from '../../types/Product';
import {formatPrice} from '../../utils/formatPrice';

interface ProductDetailsProps {
  product: IProduct;
}

export default function ProductDetails({product}: ProductDetailsProps) {
  const productImages = product.media.edges.map((item) => item.node.image.url);
  const [selectedImage, setSelectedImage] = useState(productImages[0]);

  return (
    <div
      id="container"
      className="flex flex-col items-center justify-center w-full bg-zinc-50 px-4"
    >
      <div id="details" className="flex flex-col w-full">
        <div id="images" className="flex flex-col">
          <div id="thumbnails" className="flex w-full overflow-auto gap-2">
            {productImages.map((item) => (
              <img
                key={item}
                className="flex w-20 h-20 cursor-pointer border-zinc-900"
                src={item}
                alt={product.title}
                onClick={() => setSelectedImage(item)}
              />
            ))}
          </div>
          <div id="image">
            <img className="w-full" src={selectedImage} alt={product.title} />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full py-8">
          <p className="font-bold text-base text-center">{product.title}</p>
          <p>5 stars - 5 reviews</p>
          <div id="price" className="flex items-center gap-8 py-4">
            <p className="flex text-2xl font-bold">
              {formatPrice(Number(product.priceRange.minVariantPrice.amount))}
            </p>
            {Number(product.priceRange.minVariantPrice.amount) !==
              Number(product.priceRange.maxVariantPrice.amount) && (
              <p className="flex text-base text-zinc-500 line-through">
                {formatPrice(Number(product.priceRange.maxVariantPrice.amount))}
              </p>
            )}
          </div>
          <div id="description" className="flex w-full px-2 py-6">
            <p className="flex text-center text-base">{product.description}</p>
          </div>
          <div id="quantity" className="flex gap-4">
            <div className="block">
              <input
                type="number"
                defaultValue={1}
                min={1}
                max={99}
                className="flex w-16 bg-zinc-200 px-2 text-xl font-bold h-full rounded"
              />
            </div>
            <button className="flex bg-zinc-900 text-zinc-50 text-base py-4 px-8 rounded border-none">
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div>
        <span>Compre junto</span>
      </div>
    </div>
  );
}
