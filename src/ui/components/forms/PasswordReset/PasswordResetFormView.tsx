import { SyntheticEvent, useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { IconButton, InputAdornment, List, ListItem, ListItemIcon, CircularProgress } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { URLS, API_ENDPOINTS } from 'src/utils/constants';
import { checkPasswordRules } from 'src/utils/helpers';

interface PasswordResetFormViewProps {
  // onSubmit: (password: string, confirmPassword: string) => void;
  disabled: boolean
}

const sendRequest = async (url: string, body: any) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return response;

};

const PasswordResetFormView: React.FC<PasswordResetFormViewProps> = ({ disabled }: PasswordResetFormViewProps ) => {
  const router = useRouter();
  const token = router.query.token;

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [isPasswordValid, setIsPasswordValid] = useState(false);
  
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [passwordRules, setPasswordRules] = useState<ReturnType<typeof checkPasswordRules>>({
    length: false,
    upper: false,
    lower: false,
    number: false,
  });

  useEffect(() => {
    const rules = checkPasswordRules(password);
    setIsPasswordValid(allRulesMet(rules));
  }, [password]);

  const allRulesMet = (rules: ReturnType<typeof checkPasswordRules>) => {
    return rules.length && rules.upper && rules.lower && rules.number;
  }

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    // now the token comes from router query
    if (!token) {
      // handle case where there is no token
      setIsPasswordValid(false);
      return;
    }

    setLoading(true); // start loading

    let api_url = URLS.Dev.API;

    if(process.env.NODE_ENV === 'development') {
      api_url = URLS.Local.API;
    }

    try {
      const response = await sendRequest(api_url+API_ENDPOINTS.RESET_PASSWORD, { token, password });      
      const data = await response.json();      
      
      if (response.ok && data.success) {
        setLoading(true)
        setSuccessMessage('Password reset successful.' + ' Redirecting to sign-in page...');
        setTimeout(() => {
          router.push('/auth/signin');
        }, 2000);        
      } else {
        // setErrorMessage(data.message || 'Password reset failed.');
        setErrorMessage('Password reset failed.');
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? 'An unexpected error occurred: ' + error.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false); // end loading
    }

  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    const rules = checkPasswordRules(password);
    setPasswordRules(rules);
    setIsPasswordValid(password === passwordConfirm && allRulesMet(rules));
    setErrorMessage(password ? '' : 'Password cannot be empty');
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = e.target.value;
    setPasswordConfirm(confirmPassword);
    setIsPasswordValid(password === confirmPassword && allRulesMet(checkPasswordRules(password)));
    setErrorMessage(password === confirmPassword ? '' : 'Passwords do not match');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (    
    <Box component="form" autoComplete="off"  onSubmit={onSubmit} sx={{ mt: 2 }} noValidate>
    <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: '0.95em',  mt: 2, mb: 0 }}>Password Requirements:</Typography>
    <Box border={1} borderColor="divider" borderRadius="borderRadius" p={1} mb={2}>
      <List sx={{ height: 'fit-content !important', pl: 0, '& .MuiListItem-gutters': { py: 0.5 } }}>
        <ListItem sx={{pb: '0px !important'}}>
          <ListItemIcon sx={{ minWidth: '1.5em'}}>
            <FiberManualRecordIcon sx={{fontSize: '10px'}} />
          </ListItemIcon>        
          <Typography sx={{ fontSize: '0.87em', color: passwordRules.length ? 'success.main' : 'error.main' }}>
            At least 8 characters long
          </Typography>        
        </ListItem>
        <ListItem sx={{pt: '0px !important', pb: '0px !important'}}>
          <ListItemIcon sx={{ minWidth: '1.5em'}}>
            <FiberManualRecordIcon sx={{fontSize: '10px'}} />
          </ListItemIcon>
          <Typography sx={{ fontSize: '0.87em', color: passwordRules.upper ? 'success.main' : 'error.main' }}>
            At least 1 uppercase letter
          </Typography>        
        </ListItem>
        <ListItem sx={{pt: '0px !important', pb: '0px !important'}}>
          <ListItemIcon sx={{ minWidth: '1.5em'}}>
            <FiberManualRecordIcon sx={{fontSize: '10px'}} />
          </ListItemIcon>
          <Typography sx={{ fontSize: '0.87em', color: passwordRules.lower ? 'success.main' : 'error.main' }}>
            At least 1 lowercase letter
          </Typography>             
        </ListItem>
        <ListItem sx={{pt: '0px !important', pb: '0px !important'}}>
          <ListItemIcon sx={{ minWidth: '1.5em'}}>
            <FiberManualRecordIcon sx={{fontSize: '10px'}} />
          </ListItemIcon>
          <Typography sx={{ fontSize: '0.87em', color: passwordRules.number ? 'success.main' : 'error.main' }}>
            At least 1 number
          </Typography>        
        </ListItem>
      </List>
    </Box>
      <TextField
        id="newPassword"
        label="New Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={handlePasswordChange}
        // onChange={(e) => setPassword(e.target.value)}              
        required
        fullWidth
        sx={{ mt: 1 }} // reduced the margin-top here
        // margin="normal"
        autoFocus 
        disabled={disabled}
        InputProps={{ // toggle button for showing/hiding password characters
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}                
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}               
      />
      <TextField
        label="Confirm Password"
        type={showPassword ? 'text' : 'password'}
        value={passwordConfirm}
        onChange={handleConfirmPasswordChange}       
        required
        fullWidth
        margin="normal"
        disabled={disabled}        
      />
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}      
      {!errorMessage && successMessage && <Typography color="success.main">{successMessage}</Typography>}
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} fullWidth disabled={
            loading ||
            password !== passwordConfirm ||
            !Object.values(passwordRules).every(Boolean)
      }>
        {loading ? <CircularProgress size={24} /> : "Submit"}
      </Button>
    </Box>    
  );
}

export default PasswordResetFormView;
