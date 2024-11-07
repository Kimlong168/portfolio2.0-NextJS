import {
  TelegramShareButton,
  TelegramIcon,
  FacebookShareButton,
  FacebookIcon,
  LineShareButton,
  LineIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

interface SharingButtonProps {
  url: string; // URL to be shared
  title: string; // Title of the shared content
}

const SharingButton: React.FC<SharingButtonProps> = ({ url, title }) => {
  
  return (
    <div>
      <div className="font-semibold text-center p-4">Share this blog</div>
      <div className="flex gap-2 justify-center p-2">
        <TelegramShareButton url={url} title={`====${title}====`}>
          <TelegramIcon size={32} round={true} />
        </TelegramShareButton>
        <FacebookShareButton
          url={url}
          hashtag="#kimlong"
          // quote={`====${title}====`}
        >
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <LineShareButton url={url} title={`====${title}====`}>
          <LineIcon size={32} round={true} />
        </LineShareButton>
        <TwitterShareButton url={url} title={`====${title}====`}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
      </div>
    </div>
  );
};
export default SharingButton;
