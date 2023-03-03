import SquareButton from "../../components/SquareButton";
import {
  Background,
  screenNameStyle,
  SemiHeader,
} from "../../components/StyledComponents";
import { useWindowDimensions } from "../../utils/WindowWidthHeight";
import { ReactComponent as ArrowLeftIcon } from "../../assets/svgs/arrow-left.svg";
import { ReactComponent as CreditCardIcon } from "../../assets/svgs/creditCardIcon.svg";
import { ReactComponent as PaypalIcon } from "../../assets/svgs/paypalIcon.svg";
import { ReactComponent as WalletIcon } from "../../assets/svgs/walletIcon.svg";
import { Typography } from "@mui/material";
import styled from "styled-components";
import theme from "../../Theme";
import { useEffect, useState } from "react";
import CardPaymentComponent from "./CardPaymentComponent";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../API/paymentApi";
import CheckoutForm from "./CheckoutForm";

const Card = styled.div`
  max-width: 109.67px;
  width: 100%;
  border-radius: 14px;
  height: 98.23px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 6px 30px rgba(30, 61, 83, 0.08);
  color: white;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing(3)};
  border: ${(props) =>
    props.clicked ? `1px solid ${theme.palette.primary.main}` : null};
`;

const cardTitleStyle = {
  fontSize: "16px",
  fontWeight: "400",
  lineHeight: "19.73px",
  color: "#000000",
};

// const stripePromise = loadStripe(
//   "pk_test_51MEy5fGUbdjGry3kvVl0ofHvlMyxvD96op58kdPaG6Lw7Ez67ffjTZIovN91W7Qs0637fUr9dHqZvPD7YWSsyWPx00kXvUNgF1"
// );

const PaymentScreen = ({ creditPack }) => {
  // const [clientSecret, setClientSecret] = useState("");
  const { height } = useWindowDimensions();
  const [paymentMethod, setPaymentMethod] = useState(0);

  // useEffect(() => {
  //   const createPaymentIntentFunction = async (pack) => {
  //     try {
  //       const paymentIntent = await createPaymentIntent(pack);
  //       console.log("payment Intent : ", paymentIntent);
  //       setClientSecret(paymentIntent.data.clientSecret);
  //     } catch (error) {
  //       console.log("payment intent function error : ", error);
  //     }
  //   };
  //   createPaymentIntentFunction(creditPack);
  // }, [creditPack]);
  // const appearance = {
  //   theme: "stripe",
  // };
  // const options = {
  //   clientSecret,
  //   appearance,
  // };
  return (
    // <div>
    //   {clientSecret && (
    //     <Elements options={options} stripe={stripePromise}>
    //       <CheckoutForm creditPack={creditPack} />
    //     </Elements>
    //   )}
    // </div>

    <Background
      style={{
        height: height - 72,
        gap: theme.spacing(5),
      }}
    >
      <SemiHeader>
        <SquareButton>
          <ArrowLeftIcon />
        </SquareButton>
        <Typography style={screenNameStyle}>Payment</Typography>
      </SemiHeader>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "fit-content",
          gap: theme.spacing(4),
        }}
      >
        <Typography
          style={{
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "24.66px",
            color: "#000000",
          }}
        >
          Payment Method
        </Typography>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "fit-content",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Card
            onClick={() => {
              setPaymentMethod(0);
            }}
            clicked={paymentMethod === 0}
          >
            <CreditCardIcon />
            <Typography style={cardTitleStyle}>Card</Typography>
          </Card>
          <Card
            onClick={() => {
              setPaymentMethod(1);
            }}
            clicked={paymentMethod === 1}
          >
            <PaypalIcon />
            <Typography style={cardTitleStyle}>Paypal</Typography>
          </Card>
          <Card
            onClick={() => {
              setPaymentMethod(2);
            }}
            clicked={paymentMethod === 2}
          >
            <WalletIcon />
            <Typography style={cardTitleStyle}>Wallet</Typography>
          </Card>
        </div>
      </div>
      <CardPaymentComponent />
    </Background>
  );
};

export default PaymentScreen;
