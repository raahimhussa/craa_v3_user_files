import { observer } from 'mobx-react';
import Image from 'next/image';
type ImageProps = {
  height: number;
  width: number;
  src: string;
};
function NextImageView({
  height = 150,
  width = 150,
  src = 'https://via.placeholder.com/150',
  ...rest
}: ImageProps) {
  return <Image {...rest} width={width} height={height} src={src} />;
}
export default observer(NextImageView);
