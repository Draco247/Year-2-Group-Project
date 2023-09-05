import React, {useEffect} from 'react';

function Logout(props){
  const setLoggedinUser = props.setLoggedinUser;

  useEffect(()=>{
    setLoggedinUser("");
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("current_user")
  },[setLoggedinUser]);


    return(
            <div>
                <p>Logged out</p>
            </div>
        );

}

export default Logout;