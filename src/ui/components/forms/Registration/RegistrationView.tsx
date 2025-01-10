import { Autocomplete, Grid, Spacer, TextField, Typography } from '@components';
import { ListItem, Select } from '@mui/material';

import Box from '@mui/material/Box';
import axios from 'axios';
import { AnyARecord } from 'dns';
import _ from 'lodash';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { useRootStore } from 'src/stores';

function RegistrationView(props: any) {
  const { countries, role } = props;
  const { authStore } = useRootStore();
  const [titles, setTtiles] = useState([]);
  const [countryOptions, setCountyOptions] = useState([]);
  const monitoringOptions = _.range(0, 20).map((value: number) => ({
    text: `${value} years`,
    value: value,
  }));

  // const countryOptions = countries.map((country: any) => ({
  //   text: country.name,
  //   value: country._id,
  // }));

  useEffect(() => {
    authStore.signUpUser.roleId = role._id;
  }, []);

  async function checkAuthcode(val: string) {
    console.log(val);
    setTtiles([]);
    try {
      //@ts-ignore
      const { data } = await axios.get(`/v1/clientunits/verifyAuthCode/${val}`);
      if (data?.clientUnitId !== undefined) {
        const client = await axios.get(`/v1/clientunits/${data.clientUnitId}`);
        let arr: any = [];
        client.data.titles.map((title: string) => {
          arr.push({ text: title, value: title });
        });
        const countryIds: any = [];
        client.data.businessUnits.map((bu: any) =>
          countryIds.push(...bu.countryIds)
        );
        console.log(countryIds);
        let countryarr: any = [];
        countryIds.map((countryId: any) => {
          const country = countries.find((el: any) => el._id === countryId);
          countryarr.push({ text: country.name, value: country._id });
        });
        setCountyOptions(countryarr);
        setTtiles(arr);
      }
    } catch (error) {}
  }

  return (
    <Box>
      <Typography variant="h5">Registration</Typography>
      <Spacer spacing={5} />
      <Grid container spacing={4}>
      <Grid item xs={6}>
          <TextField
            type="text"
            state={authStore.signUpUser.profile}
            path="firstName"
            label="First Name"
            helperText="Required"
          />
        </Grid>        
        <Grid item xs={6}>
          <TextField
            type="text"
            state={authStore.signUpUser.profile}
            path="lastName"
            label="Last name"
            helperText="Required"
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            state={authStore.signUpUser}
            path="email"
            label="Email"
            helperText="Required"
          />
        </Grid>

        <Grid item sm={6}>
          <TextField
            state={authStore.signUpUser.profile}
            path="authCode"
            label="Authorization code"
            helperText="Required"
            onChange={(e: any) => {
              checkAuthcode(e);
            }}
          />
        </Grid>
        {titles.length !== 0 && countryOptions.length !== 0 ? (
          <>
            <Grid item sm={12}>
              <Autocomplete
                multiple={false}
                state={authStore}
                path="signUpUser.profile.countryId"
                label="Country"
                options={countryOptions}
                helperText="Required"
                autoHighlight
              />
            </Grid>
            <Grid item sm={6}>
              {/* <TextField
                type="text"
                state={authStore.signUpUser.profile}
                path="title"
                label="Title"
                helperText="Required"
              /> */}
              <Autocomplete
                multiple={false}
                state={authStore}
                path="signUpUser.profile.title"
                label="Title"
                options={titles}
                helperText="Required"
              />
            </Grid>
            <Grid item sm={6}>
              <Autocomplete
                multiple={false}
                state={authStore}
                path="signUpUser.profile.monitoring"
                label="Monitoring Experience"
                options={monitoringOptions}
                helperText="Required"
                defaultValue={{
                  text: '1 years',
                  value: 1,
                }}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid item sm={6} sx={{ pt: '0.5rem !important' }}></Grid>
            <Grid item sm={6} sx={{ pt: '0 !important' }}>
              <Typography
                sx={{
                  color: 'red',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                Invalid Authcode
              </Typography>{' '}
            </Grid>
          </>
        )}
      </Grid>
      <Spacer spacing={5} />
    </Box>
  );
}
export default observer(RegistrationView);
