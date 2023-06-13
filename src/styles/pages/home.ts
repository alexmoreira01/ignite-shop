import { relative } from "path";
import { styled } from "..";

export const HomeContainer = styled('main', {
  display: "flex",
  // gap: "3rem", keen-slider nao aceita
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 656
});

export const Product = styled('a', {
  background: 'linear-gradient(188deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  // padding: '0.25rem', keen-slider nao aceita
  cursor: 'pointer',
  position: 'relative', //Footer tera position absolute
  overflow: 'hidden',// Aniamção = >Não mostrar apos a div

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover' // Lidar com tamanho de imagem diferente não ira distocer e mas fara caber no container
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',

    borderRadius: 6,

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    background: 'rgba(0, 0, 0, 0.6)',

    //Animação 
    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    strong: {
      fontSize: '$lg',
      color: '$gray100'
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300'
    }
  }, 
  // Animação 
  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    }
  }
})