import * as Dialog from '@radix-ui/react-dialog';
import { CartButton } from "../CartButton";
import { CartClose, CartContent, CartFinalization, CartProduct, CartProductDetails, CartProductImage, FinalizationDetails } from './styles';
import { X } from 'phosphor-react';
import Image from 'next/image';

export function Cart() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>

        <CartButton />
      </Dialog.Trigger>

      <Dialog.Portal>
        <CartContent>
          <CartClose>
            <X size={24} weight='bold' />
          </CartClose>

          <h2>Sacola de compras</h2>

          <section>
            {/* <p>Parece que seu carrinho está vazio</p> */}

            <CartProduct>
              <CartProductImage>
                <Image
                  width={100}
                  height={93}
                  alt=''
                  src="https://s3-alpha-sig.figma.com/img/387d/13ce/de131bd1ccf9bbe6b2331e88d3df20cd?Expires=1688342400&Signature=TtDORHdxL~C4Aq78hUl4xIXTNR~U73kt7z8GwqNvaeB8zBMRLN~bQAB5GUGNzvB5K11Ce8Cj4k8unGHrPzRMrFqrxvwt4EiATpeyHUwXd-sGO~7WfV~2PMMbu2DNG-KKV1kXtXSezB5alZvr25Py6dr9wFTmlqzX-2-ajmOeqFbLLEBa~ywqw1-rTUJNYSwzyvr1l6JQVLr6Dq4IAgX7eDDM0zB66PD9vYRj3VkG6Yja5hcCoaENKngNIWJNxXJre~HKplrBsX-hi6Fobo9g7ZZB81UAMhJSl~DZFVjfPJOaV5eaY8fTPMLsY-1738hx7Ws43AApXIRKxmXMDhJaXw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                />
              </CartProductImage>

              <CartProductDetails>
                <p>Produto 1</p>

                <strong>R$ 50.00</strong>

                <button>Remover</button>
              </CartProductDetails>
            </CartProduct>
          </section>

          <CartFinalization>
            <FinalizationDetails>
              <div>
                <span>Quantidade</span>
                <p>2 itens</p>
              </div>

              <div>
                <span>Valor total</span>
                <p>R$ 100.00</p>
              </div>

            </FinalizationDetails>

            <button>Finalizar compra</button>
          </CartFinalization>

        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}