import Auth0Lock from 'auth0-lock'
import logo from '@/assets/logo.svg'

const AUTH0_CLIENT_ID = 'GwNOClBkpC2TiE0dcDUGWroXexizYxr3'
const AUTH0_DOMAIN = 'nadespots.eu.auth0.com'

const lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
  autoclose: true,
  auth: {
    responseType: 'token',
    redirect: false
  },
  theme: {
    logo: logo,
    primaryColor: '#34495e',
    labeledSubmitButton: false
  },
  socialButtonStyle: 'small'
})

export default lock
