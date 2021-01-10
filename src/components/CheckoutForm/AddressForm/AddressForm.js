import {
    Button,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { commerce } from "../../../lib/commerce";
import FormInput from "../TextField/TextField";
import useStyles from './styles'

const AddressForm = ({ checkoutToken ,next}) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState("");
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState("");
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState("");
    const methods = useForm();

    const classes = useStyles();

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })); // obj => array of arrays => array of objects

    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })); // obj => array of arrays => array of objects

    const options = shippingOptions.map((shippingOption) => ({ id: shippingOption.id, label: `${shippingOption.description} - (${shippingOption.price.formatted_with_symbol})` }))

    const fetchShippingCountries = async (checkoutTokenId) => {


        const response = await commerce.services.localeListShippingCountries(
            checkoutTokenId
        );
        setShippingCountries(response.countries);
        setShippingCountry(Object.keys(response.countries)[0])
    };
    const fetchShippingSubdivisions = async (countryCode) => {
        const response = await commerce.services.localeListSubdivisions(
            countryCode
        );
        setShippingSubdivisions(response.subdivisions);
        setShippingSubdivision(Object.keys(response.subdivisions)[0])
    };
    const fetchShippingOptions = async (checkoutTokenId, country, region) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });

        setShippingOptions(options);

        if (options.length) setShippingOption(options[0].id)

    };


    useEffect(() => {
        if (checkoutToken) fetchShippingCountries(checkoutToken.id);

    }, []);

    useEffect(() => {
        if (shippingCountry) fetchShippingSubdivisions(shippingCountry)
    }, [shippingCountry])

    useEffect(() => {
        if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
    }, [shippingSubdivision])

    const handleNext =(data)=>{
        next({...data,shippingCountry,shippingSubdivision,shippingOption})
    }

    return (
        <>
            <Typography variant="h6" gutterBottom >
                Shipping address
      </Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleNext)}>
                    <Grid container spacing={3}>
                        <FormInput  name="firstName" label={"First name"} />
                        <FormInput name="lastName" label={"Last name"}  />
                        <FormInput name="address1" label={"Address"}  />
                        <FormInput name="email" label={"Email"}  />
                        <FormInput name="city" label={"City"}  />
                        <FormInput name="zip" label={"ZIP"}  />

                        <Grid item xs={12} sm={12}>
                            <InputLabel >Shipping Country</InputLabel>
                            <Select
                                value={shippingCountry}
                                fullWidth
                                onChange={(e) => setShippingCountry(e.target.value)}
                            >
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Select Region</InputLabel>
                            <Select
                                value={shippingSubdivision}
                                fullWidth
                                onChange={(e) => setShippingSubdivision(e.target.value)}
                            >
                                {subdivisions.map((city) => (
                                    <MenuItem key={city.id} value={city.id}>
                                        {city.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Option</InputLabel>
                            <Select
                                value={shippingOption}
                                fullWidth
                                onChange={(e) => setShippingOption(e.target.value)}
                            >
                                {options.map((options) => (
                                    <MenuItem key={options.id} value={options.id}>
                                        {options.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div className={classes.btnWrapper}>
                        <Button component={NavLink} to={'/cart'} className={classes.checkoutButton} variant='outlined' color='secondary'>Back</Button>
                        <Button type='submit' className={classes.checkoutButton} variant='contained' color='secondary'>Next</Button>

                    </div>
                </form>
            </FormProvider>
        </>
    );
};

export default AddressForm;
