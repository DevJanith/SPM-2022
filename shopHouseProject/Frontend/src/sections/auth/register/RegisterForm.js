import * as React from 'react';
import { useState } from 'react';
import BuyerRegisterForm from './Forms/BuyerRegisterForm';
import InitialRegisterForm from './Forms/InitalRegisterForm';
import TraderRegisterForm from './Forms/TraderRegisterForm';


export default function RegisterForm() {
  const [userType, setUserType] = useState("initial")

  const props = {
    userType,
    setUserType
  }

  switch (userType) {
    case "buyer":
      return (
        <BuyerRegisterForm  {...props} />
      )
      break;
    case "trader":
      return (
        <TraderRegisterForm {...props} />
      )
      break;
    default:
      return (
        <InitialRegisterForm  {...props} />
      )
      break;
  }

}
