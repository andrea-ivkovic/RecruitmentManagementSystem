import React from 'react';
import { claim } from './auth.model';

const AuthenticationContext = React.createContext<{
    claims: claim[],
    update(claims: claim[]): void //this will allow us to update the claims
}>({claims: [], update: () => {}})

export default AuthenticationContext;