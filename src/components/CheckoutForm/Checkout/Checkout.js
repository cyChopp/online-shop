import { Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import AddressForm from '../AddressForm/AddressForm';
import PaymentForm from '../PaymentForm/PaymentForm';
import useStyles from './styles';

const steps = ['Shipping details','Payment details']

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0)


    const classes = useStyles();

    const Form = ()=>{
     return   activeStep===0 ? <AddressForm/> : <PaymentForm/>
    }
    const Confirmation = ()=>{
      return <div>
            Confimation
        </div>
    }


    return (
        <>
        <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper elevation={3} className={classes.paper}>
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step)=>(
                            <Step key={step}> 
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation/> : <Form/>}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
