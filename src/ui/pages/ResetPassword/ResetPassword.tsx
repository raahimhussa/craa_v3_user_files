import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import { Typography, Box, Alert, Link, Container, Paper } from '@mui/material';

import PasswordResetForm from 'src/ui/components/forms/PasswordReset/PasswordResetForm';
import { BearHeadLayout } from '@layouts';
import SigninView from '../Signin/SigninView';

interface DecodedToken {
    email: string;
    id: string;
    iat: number;
    exp: number;
  }

const ResetPassword = () => {
    const [isTokenValid, setTokenValid] = useState<boolean | null>(null);
    const router = useRouter();
    const { token } = router.query;

    useEffect(() => {        
        try {
          const decoded = jwt.decode(token as string) as DecodedToken || null;

          if(decoded ) {
            setTokenValid(true);                
          } else {
            setTokenValid(false);
          }
    
        } catch (err) {
          console.error('Error: ', err);  
          setTokenValid(false);        
        }
      }, [token]);

    return (
        <BearHeadLayout>
        <Container component="main" maxWidth="xs">
        <Paper
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 2,
            mt: 8,
            }}
            elevation={5}
        >
            <Typography component="h1" variant="h5">
            Reset Password
            </Typography>            
            {!isTokenValid && <><Alert severity="error">Invalid token. Please request a new password reset link.</Alert><Link href="/auth/signin?from=reset-password"  sx={{mt: '10px', fontSize:'0.9em'}}><a>Go to ForgotPassword</a></Link></>}            
            {isTokenValid && <PasswordResetForm disabled={!isTokenValid} />}            
        </Paper>
        </Container>        
        </BearHeadLayout>
    );
}

export default ResetPassword;
