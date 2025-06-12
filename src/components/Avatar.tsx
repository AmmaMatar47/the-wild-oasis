import { Skeleton, Avatar as AvatarChakraUI, AvatarRootProps } from '@chakra-ui/react';

interface AvatarProps extends AvatarRootProps {
  avatarSrc?: string;
  fullName?: string;
  isLoadingAvatar?: boolean;
}

const Avatar = ({ avatarSrc, fullName, isLoadingAvatar, ...props }: AvatarProps) => {
  return (
    <Skeleton
      rounded='full'
      loading={isLoadingAvatar === undefined ? false : isLoadingAvatar}
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
