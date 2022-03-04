import React, { useState } from "react";
import styled from "styled-components";

const SelectBar = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, 50px);
column-gap: 10px;
padding: 15px 20px;
`;

const SelectLabel = styled.label`
display: grid;
grid-template-columns: repeat(2, max-content);
align-items: center;
column-gap: 3px;
cursor: pointer;
`;


const Content = () => {
    const [labelList, setLabelList] = useState([
        { text: "文字", value: "text" },
        { text: "图片", value: "images" },
    ]);

    return <div>
        <SelectBar>
            {labelList.map(item =>
                <SelectLabel>
                    <input type="radio" />
                    {item.text}
                </SelectLabel>)}
        </SelectBar>
    </div>
}

export default Content;
