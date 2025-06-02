import { loadFiles } from "utils/loadFiles";

// Define types for social providers
type SocialType = 'google' | 'facebook' | 'naver' | 'kakao';

interface SocialAuthButtonProps {
  socialType: SocialType;
  socialName?: string; // Make this optional to match the current component usage
}

const SocialAuthButton = ({ socialType }: SocialAuthButtonProps) => {
  const iconMap = loadFiles("icon") as Record<string, string>;

  return (
    <div className="flex justify-center items-center">
      <img
        alt={socialType}
        src={iconMap[socialType]}
        className="w-5 h-5 mr-0.5"
      />
    </div>
  );
};

export default SocialAuthButton;
