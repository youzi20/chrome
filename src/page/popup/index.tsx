import React, { useEffect, useState } from "react";
import { render } from 'react-dom';

import styled from "@emotion/styled";
import { Button } from "@mui/material";

const Wrapper = styled.div`
width: 300px;
height: 400px;
`;

const App = () => {
    const [data, setData] = useState<{ code: 0 | 1, message: string }>();


    const login = () => {
        fetch("https://glados.rocks/api/user/checkin", {
            method: "POST",
            headers: {
                "content-type": "application/json; charset=utf-8",
                "authorization": "4310095846877666429944647253849-1120-1792",
                "cookies": "__stripe_mid=53ce9c23-a51d-4f1e-b83c-9785e3c89aac7615d8; koa:sess=eyJ1c2VySWQiOjU0MjE2LCJfZXhwaXJlIjoxNjkyMjUzOTI0NDEwLCJfbWF4QWdlIjoyNTkyMDAwMDAwMH0=; koa:sess.sig=nsRz5dsuBHyJ4KWefED6sOFElbk; _ga=GA1.2.1594834264.1666333885; _gid=GA1.2.1608414195.1676607608; __stripe_sid=244c44f6-512f-4718-b19d-3d0cd3cc95d34850b4; _ga_CZFVKMNT9J=GS1.1.1676607607.1.1.1676609475.0.0.0"
            },
            body: `{"token": "glados.network"}`
        })
            .then((response) => response.json())
            .then((res) => setData(res));
    }

    console.log(data);

    useEffect(() => {
        login();
    }, []);

    return <React.StrictMode>
        <Wrapper>
            {/* <Button variant="contained" onClick={login}>签到</Button> */}
            {data ?
                data.code === 0 ? <div>签到成功</div> :
                    data.code === 1 ? <div>{data.message}</div> : <></>
                : "loading"}
        </Wrapper>
    </React.StrictMode>
}


render(<App />, document.querySelector("#root"));