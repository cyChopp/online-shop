import { Button, Paper, Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useCartContext } from "../../../Context/CartContext";
import { useCartUpdateContext } from "../../../Context/CartUpdateContext";
import { commerce } from "../../../lib/commerce";
import AddressForm from "../AddressForm/AddressForm";
import PaymentForm from "../PaymentForm/PaymentForm";
import useStyles from "./styles";

const steps = ["Shipping details", "Payment details"];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData,setShippingData] = useState({})

  const classes = useStyles();

  const [cart, ...rest] = useCartContext();
  const [handleUpdateCartQuantity,handleRemoveFromCart,handleEmptyCart,handleCaptureCheckout,{order,errorMsg}] = useCartUpdateContext()

  const Form = () => {
    return activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm  shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} handleCaptureCheckout={handleCaptureCheckout}/>
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

  const nextStep = ()=>(setActiveStep((prevStep)=>prevStep+1))
  const backStep = ()=>(setActiveStep((prevStep)=>prevStep-1))

  
  const next  = (data)=>{
    setShippingData(data);
    nextStep()
  }
  const prStep = ()=>{
    backStep()
  }

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
