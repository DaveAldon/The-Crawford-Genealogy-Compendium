import { hext } from '@davealdon/hext'

export const getBlurStyle = (color?: string) => {
  return {
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    backgroundColor: hext(color || '#808080', 30),
  }
}
