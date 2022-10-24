import { ReactElement, useContext, useEffect, useState } from "react"
import AuthenticationContext from "./AuthenticationContext";

export default function Authorized(props: authorizeProps) {

    const [isAuthorized, setIsAuthorized] = useState(false);
    const { claims } = useContext(AuthenticationContext);

    useEffect(() => {
        if (props.roles) {
            let index = -1;
            for (let i = 0; i < props.roles.length; i++) {
                index = claims.findIndex(claim => claim.name === 'role' && claim.value === props.roles![i]);
                if(index > -1){
                    i=props.roles.length;
                }
            }
            setIsAuthorized(index > -1);
        }
    }, [claims]);

    return (
        <>
            {isAuthorized ? props.authorized : props.notAuthorized}
        </>
    )
}

interface authorizeProps {
    authorized?: ReactElement;
    notAuthorized?: ReactElement;
    roles?: string[];
}