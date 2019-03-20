import { createStackNavigator } from "react-navigation";
import {
  Agreement,
  SignUpNew,
  CodeConfirm,
  CreatePin,
  RepeatPin
} from "../screens/auth";
const auth = createStackNavigator(
  {
    SignUp: {
      screen: SignUpNew
    },
    Agreement: {
      screen: Agreement
    },
    CodeConfirm: {
      screen: CodeConfirm
    },
    CreatePin: {
      screen: CreatePin
    },
    RepeatPin: {
      screen: RepeatPin
    }
  },
  {
    navigationOptions: {
      header: null
    }
  }
);
export default auth;
