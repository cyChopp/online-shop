import { Button, CircularProgress, CssBaseline, Divider, Paper, Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useCartContext } from "../../../Context/CartContext";
import { useCartUpdateContext, useCartUpdateContextCheckout } from "../../../Context/CartUpdateContext";
import { commerce } from "../../../lib/commerce";
import AddressForm from "../AddressForm/AddressForm";
import PaymentForm from "../PaymentForm/PaymentForm";
import useStyles from "./styles";

const steps = ["Shipping details", "Payment details"];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData,setShippingData] = useState({})
  const [isFinished,setIsFinished] = useState(false)
  const history = useHistory()
  const classes = useStyles();

  const [cart, products,setCart] = useCartContext();
  const [order,errorMsg]=useCartUpdateContextCheckout()
  const [handleUpdateCartQuantity,handleRemoveFromCart,handleEmptyCart,handleCaptureCheckout] = useCartUpdateContext()

  let Confirmation = () => order.customer ? (
     <>
      <div>
        <Typography variant='h5'>Thank you for your purchase :{order.customer.firstname}  {order.customer.lastname}</Typography>
        <Divider className={classes.divider}/>
        <Typography variant='subtitle2'>Order ref: {order.customer_reference}</Typography>
      </div>
      <br/>  
      <Button component={Link} to='/' variant='outlined' type='button'>Back to the main page.</Button>
    </>
  ) : isFinished ? (
    <>
      <div>
        <Typography variant='h5'>Thank you for your purchase :{order.customer.firstname}  {order.customer.lastname}</Typography>
        <Divider className={classes.divider}/>
      </div>
      <br/>  
      <Button component={Link} to='/' variant='contained' color='primary' type='button'>Back to the main page.</Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress/>
    </div>
  );

  if(errorMsg){
    Confirmation = () => (
       <>
    <Typography variant='h5'>Error: {errorMsg}</Typography>
    <br/>
    <Button component={Link} variant='contained' color='primary' to='/'>Back to the main page.</Button>
    </>
    );
  }

  const timeout =()=>{
    setTimeout(()=>{
      setIsFinished(true)
    },3000)
  }

  const Form = () => {
    return activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} nextStep={nextStep} shippingData={shippingData} />
    ) : (
      <PaymentForm  shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep}  backStep={backStep} handleCaptureCheckout={handleCaptureCheckout} timeout={timeout}/> 
    );
  };

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        console.log(token,'token success');
        setCheckoutToken(token);
      } catch (error) {
        history.push('/')
      }
    }
    generateToken();
  }, [cart]);

  const nextStep = ()=>{
    setActiveStep((prevStep)=>prevStep+1)
    console.log(activeStep)
  }
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
    <CssBaseline/>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel color="primary">{step}</StepLabel>
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
