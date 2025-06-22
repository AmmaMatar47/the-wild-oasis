import { Avatar as AvatarChakraUI, AvatarRootProps } from '@chakra-ui/react';
import Skeleton from './Skeleton';

interface AvatarProps extends AvatarRootProps {
  avatarSrc?: string;
  fullName?: string;
  isLoadingAvatar?: boolean;
}

const Avatar = ({ avatarSrc, fullName, isLoadingAvatar, ...props }: AvatarProps) => {
  return (
    <Skeleton rounded='full' loading={isLoadingAvatar === undefined ? false : isLoadingAvatar}>
      <AvatarChakraUI.Root colorPalette='purple' {...props}>
        <AvatarChakraUI.Fallback name={fullName} />
        <AvatarChakraUI.Image src={avatarSrc} alt='User  avatar' />
      </AvatarChakraUI.Root>
    </Skeleton>
  );
};

export default Avatar;
