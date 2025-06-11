import { Skeleton, Avatar as AvatarChakraUI, AvatarRootProps } from '@chakra-ui/react';

interface AvatarProps extends AvatarRootProps {
  avatarSrc: string;
  fullName: string;
  loadingAvatar?: boolean;
}

const Avatar = ({ avatarSrc, fullName, loadingAvatar, ...props }: AvatarProps) => {
  return (
    <Skeleton
      rounded='full'
      loading={loadingAvatar === undefined ? false : loadingAvatar}
      variant='shine'
    >
      <AvatarChakraUI.Root colorPalette='purple' {...props}>
        <AvatarChakraUI.Fallback name={fullName} />
        <AvatarChakraUI.Image src={avatarSrc} />
      </AvatarChakraUI.Root>
    </Skeleton>
  );
};

export default Avatar;
