import {
  IconDefinition,
  faAngry,
  faFrownOpen,
  faLaughBeam,
  faMehBlank,
  faSadTear,
  faSurprise,
} from '@fortawesome/free-solid-svg-icons';

export const selectEmoji = (expression: string): IconDefinition => {
  switch (expression.toLowerCase()) {
    case 'angry':
      return faAngry;
    case 'happy':
      return faLaughBeam;
    case 'sad':
      return faSadTear;
    case 'fear':
      return faFrownOpen;
    case 'surprise':
      return faSurprise;
    default:
      return faMehBlank;
  }
};
