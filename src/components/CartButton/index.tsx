import { Handbag } from "phosphor-react";
import { ComponentProps } from 'react';
import { CartButtonContainer } from "./styles";

// Ele vai receber todas as tipagens que o container a baixo receberia 
type CartButtonProps = ComponentProps<typeof CartButtonContainer>

export function CartButton({ ...rest}): CartButtonProps {
  return (
    <CartButtonContainer { ...rest }>
      <Handbag weight="bold" />
    </CartButtonContainer>
  )
}
