import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from "next/head";
import { useState } from 'react';

import axios from 'axios';
import Stripe from 'stripe';
import { stripe } from '../../lib/stripe';

import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product';
import { useCart } from '../../hooks/userCart';
import { IProduct } from '../../contexts/CartContext';

interface ProductProps {
  product: IProduct;
};

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()
  const { checkIfItemAlreadyExists, addToCart } = useCart()

  if (isFallback) {
    return <p>Loading ...</p>
  }

  const itemAlreadyInCart = checkIfItemAlreadyExists(product.id);

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>

      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button 
            disabled={itemAlreadyInCart} 
            onClick={() => addToCart(product)}
          >
            {itemAlreadyInCart ? 'Produto já está no carrinho' : 'Colocar no carrinho'}
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_O3RFwgkFHRjjlI' } }
    ],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id; // Id da url;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        numberPrice: price.unit_amount / 100,
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1,
  }
}