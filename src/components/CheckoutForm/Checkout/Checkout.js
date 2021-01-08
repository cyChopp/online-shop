import { Paper, Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useCartContext } from "../../../Context/CartContext";
import { commerce } from "../../../lib/commerce";
import AddressForm from "../AddressForm/AddressForm";
import PaymentForm from "../PaymentForm/PaymentForm";
import useStyles from "./styles";

const steps = ["Shipping details", "Payment details"];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);

  const classes = useStyles();

  const [cart, ...rest] = useCartContext();

  const Form = () => {
    return activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} />
    ) : (
      <PaymentForm />
    );
  };
  const Confirmation = () => {
    return <div>Confimation</div>;
  };

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        console.log(token);
        setCheckoutToken(token);
      } catch (error) {
        console.log("Failed to generate a token");
      }
    };
    generateToken();
  }, [cart]);

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
