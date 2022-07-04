const React = require("react-native");

// BEGIN TO IMPORT FILE
import Font from '../GlobalFile/font.js';
import Color from '../GlobalFile/color.js';
import Stripe from '../StripeSetup/stripesetup.js';
import Loader from '../Loader/loader.js'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MainLogo from '../../Assets/Logo/logo.png'
import StripeLogo from '../../Assets/Logo/stripe_logo.png'
// END TO IMPORT FILE


// BEGIN TO EXPORT IMPORT FILE
export default  {
  Font: Font,
  Color: Color,
  Loader:Loader,
  Stripe:Stripe,
  StripeLogo:StripeLogo,
  FontAwesome:FontAwesome,
  MainLogo:MainLogo
};
// END TO EXPORT IMPORT FILE
