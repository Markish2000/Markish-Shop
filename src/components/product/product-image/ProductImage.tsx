import Image from 'next/image';

interface Props {
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
  height: number;
  src?: string;
  style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
  title: string;
  width: number;
  onMouseEnter?: any;
  onMouseLeave?: any;
}

export const ProductImage = ({
  alt,
  className,
  height,
  src,
  title,
  width,
  style,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  let localSrc: string;

  if (src) {
    if (src.startsWith('http')) {
      localSrc = src;
    } else {
      localSrc = `/products/${src}`;
    }
  } else {
    localSrc = 'imgs/placeholder.jpg';
  }

  return (
    <Image
      className={className}
      src={localSrc}
      width={width}
      height={height}
      alt={alt}
      title={title}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};
