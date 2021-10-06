import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Toolbar from "../toolbar/toolbar";

const WallboardReadOnly = ({ userInfo }) => {
  const [wb, setWb] = useState({});
  const { id } = useParams();
  const { logout } = useAuth0();

  useEffect(async () => {
    const options = {
      method: "get",
      url: `http://localhost:3004/wallboards/${id}`,
    };

    await axios(options).then((res) => {
      console.log(res.data);
      setWb(res.data);
      setWb((wb) => ({ ...wb }));
    });
  }, [wb.name]);
  return (
    <div className="c-wallboard--read-only">
      <Toolbar template="wb-read-only" wbName={wb.name} logout={logout} />
    </div>
  );
};

export default WallboardReadOnly;
