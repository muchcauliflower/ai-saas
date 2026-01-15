import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";

const BotAvatar = () => {
  return (
    <Avatar>
      <AvatarImage className="p-1" src="/logo.svg" />
    </Avatar>
  );
};

export default BotAvatar;
