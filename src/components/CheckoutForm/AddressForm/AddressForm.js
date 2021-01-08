import { Grid, Typography } from '@material-ui/core';
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from '../TextField/TextField';

const AddressForm = () => {
    const methods = useForm();

    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping address</Typography>
            <FormProvider  {...methods}>
                <form onSubmit=''>
                    <Grid container spacing={3}> 
                        <FormInput required name='firstName' label={'First name'} />
                        <FormInput name='lastName' label={'Last name'} required/>
                        <FormInput name='address1' label={'Address'} required/>
                        <FormInput name='email' label={'Email'} required/>
                        <FormInput name='city' label={'City'} required/>
                        <FormInput name='zip' label={'ZIP'} required/>
                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
