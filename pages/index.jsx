import {
  BritainIcon,
  FranceIcon,
  GermanyIcon,
  ItalyIcon,
  PolandIcon,
  UkraineIcon
} from 'components/Icons/FlagIcons';
import {
  DribbbleIcon,
  FacebookIcon,
  GithubIcon,
  LikedinIcon,
  TwitterIcon,
  WebsiteIcon
} from 'components/Icons/SocialIcons';
// Icons just for check working
export default function Home() {
  return (
    <div>
      Home site
      <GermanyIcon className="icon-large" />
      <PolandIcon />
      <BritainIcon />
      <ItalyIcon />
      <UkraineIcon />
      <FranceIcon />
      <p>Social:</p>
      <WebsiteIcon className="icon-large primary-blue" />
      <FacebookIcon />
      <TwitterIcon className="icon-medium primary-black" />
      <GithubIcon className="icon-small primary-green" />
      <DribbbleIcon className="secondary-blue" />
      <LikedinIcon />
    </div>
  );
}
