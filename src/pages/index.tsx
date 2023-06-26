import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { useKeenSlider } from 'keen-slider/react';

import { HomeContainer, Product } from "../styles/pages/home";

import { stripe } from "../lib/stripe";
import Stripe from "stripe";

import 'keen-slider/keen-slider.min.css';
import { CartButton } from "../components/CartButton";
import { useCart } from "../hooks/userCart";
import { IProduct } from "../contexts/CartContext";
import { MouseEvent } from "react";

interface HomeProps {
  products: IProduct[]
}

export default function Home({ products }: HomeProps) {
  const { addToCart, checkIfItemAlreadyExists } = useCart();

  const [sliderREF] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  });

  function handleAddToCart(e: MouseEvent<HTMLButtonElement>, product: IProduct) {
    // Previnir a navegação do link e ira adicionar no carrinho
    e.preventDefault();
    addToCart(product);
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>

      </Head>

      <HomeContainer ref={sliderREF} className="keen-slider" >
        {products.map(product => {
          return (
            <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
              <Product className="keen-slider__slide">
                <Image 
                  src={product.imageUrl} 
                  width={520} 
                  height={480} 
                  alt="" 
                />

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>
                  <CartButton 
                    color="green" 
                    size="large" 
                    onClick={(e) => handleAddToCart(e, product)} 
                    disabled={checkIfItemAlreadyExists(product.id)}
                  />
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    // Retornando a lista dos preços
    expand: ['data.default_price']
  });

  // Criando nova lista dos produtos com base no que queremos
  const products = response.data.map(product => {

    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
      numberPrice: price.unit_amount / 100,
      defaultPriceId: price.id
    }
    // O preço não é relativo ao momento atual e sua formatação pode estar do lado do servidor
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, // 2 hours 
  }
}