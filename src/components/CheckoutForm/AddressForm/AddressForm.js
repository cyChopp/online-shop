import {
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { commerce } from "../../../lib/commerce";
import FormInput from "../TextField/TextField";

const AddressForm = ({ checkoutToken }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState("");
    const [shippingSybdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSybdivision, setShippingSubdivision] = useState("");
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState("");
    const methods = useForm();

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })); // obj => array of arrays => array of objects

    const subdivisions = Object.entries(shippingSybdivisions).map(([code, name]) => ({ id: code, label: name })); // obj => array of arrays => array of objects

    const options = shippingOptions.map((shippingOption)=>({id:shippingOption.id, label: `${shippingOption.description} - (${shippingOption.price.formatted_with_symbol})`}))

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
    const fetchShippingOptions= async (checkoutTokenId,country,region) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId,{ country , region});
        
        setShippingOptions(options);
     
        if(options.length)setShippingOption(options[0].id)

    };


    useEffect(() => {
        if (checkoutToken) fetchShippingCountries(checkoutToken.id);

    }, []);

    useEffect(() => {
        if (shippingCountry ) fetchShippingSubdivisions(shippingCountry)
    }, [shippingCountry])

    useEffect(() => {
        if (shippingSybdivision ) fetchShippingOptions(checkoutToken.id,shippingCountry,shippingSybdivision)
    }, [shippingSybdivision])

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping address
      </Typography>
            <FormProvider {...methods}>
                <form onSubmit="">
                    <Grid container spacing={3}>
                        <FormInput required name="firstName" label={"First name"} />
                        <FormInput name="lastName" label={"Last name"} required />
                        <FormInput name="address1" label={"Address"} required />
                        <FormInput name="email" label={"Email"} required />
                        <FormInput name="city" label={"City"} required />
                        <FormInput name="zip" label={"ZIP"} required />

                        <Grid item xs={12} sm={12}>
                            <InputLabel>Shipping Country</InputLabel>
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
                                value={shippingSybdivision}
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
                </form>
            </FormProvider>
        </>
    );
};

export default AddressForm;
