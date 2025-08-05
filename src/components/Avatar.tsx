import { Avatar as AvatarChakraUI, AvatarRootProps } from "@chakra-ui/react";
import Skeleton from "./Skeleton";

interface AvatarProps extends AvatarRootProps {
  avatarSrc?: string;
  fullName?: string;
  isLoadingAvatar?: boolean;
}

const Avatar = ({
  avatarSrc,
  fullName,
  isLoadingAvatar,
  ...props
}: AvatarProps) => {
  return (
    <Skeleton
      rounded="full"
      loading={isLoadingAvatar === undefined ? false : isLoadingAvatar}
    >
      <AvatarChakraUI.Root colorPalette="purple" {...props}>
        <AvatarChakraUI.Fallback name={fullName} fontSize={props.fontSize} />
        <AvatarChakraUI.Image src={avatarSrc} alt="Profile picture" />
      </AvatarChakraUI.Root>
    </Skeleton>
  );
};

export default Avatar;
