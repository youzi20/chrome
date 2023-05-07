import React, { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";

import { getChromeStorageSync, getLocationSearch } from "../../utils";

const SelectBar = styled.div`
display: flex;
flex-wrap: wrap;
margin: -5px;
padding: 15px 20px;
`;

const SelectTab = styled.div`
position: relative;
display: flex;
align-items: center;
justify-content: center;
font-size: 12px;
color: #525666;
line-height: 12px;
margin: 5px;
padding: 8px 12px;
border-radius: 3px;
background: #fff;
cursor: pointer;

&.active {
color: #fff;
background-color: #2878ff;
    /* color: #2878ff;
    background: #fff url(../../assets/images/svg/checked.svg) no-repeat right bottom; */
}
`;

const Body = styled.div`
display: grid;
row-gap: 5px;
padding: 0 20px;
`;

const Card = styled.div`
padding: 0 10px;
border-radius: 4px;
background: #fff;
`;

const Title = styled.div`
font-size: 14px;
font-weight: 600;
padding: 10px 0;
border-bottom: 1px solid #f3f4f5;
`;

const Box = styled.div`
padding: 10px 0;
`;

const Img = styled.img`
width: 100%;
`;

const ImgWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100px;
height: 100px;
overflow: hidden;
`;


const TextWrapper = ({ text }) => {
    if (!text) return <div style={{ fontSize: 12, textAlign: "center", padding: 5 }}>暂无内容</div>;

    return <div>
        <pre>{text}</pre>
    </div>
}

const ImagesWrapper = ({ images }) => {
    if (!images?.length) return <div style={{ fontSize: 12, textAlign: "center", padding: 5 }}>暂无内容</div>;

    return <div>
        {images.map(item => <ImgWrapper>
            <Img src={item.src} />
        </ImgWrapper>)}
    </div>
}

const Content = () => {
    const [sort] = useState(["text", "images"]);
    const [checked, setChecked] = useState({
        text: "文字",
        images: "图片"
    });

    const [data, setData] = useState<{ text: string, images: string[] }>();

    console.log(data);

    const selectChangeHandle = ({ value, text }) => {
        const _checked = { ...checked };

        if (_checked[value]) {
            delete _checked[value];
        } else {
            _checked[value] = text;
        }

        setChecked({ ..._checked });
    }

    console.log(checked);

    useEffect(() => {
        const key = getLocationSearch("storageKey");

        getChromeStorageSync(key, (res) => {
            setData(res);
        });
    }, []);

    return <>
        <SelectBar>
            {[
                { text: "文字", value: "text" },
                { text: "图片", value: "images" },
            ].map(item =>
                <SelectTab
                    className={checked[item.value] ? "active" : ""}
                    onClick={() => selectChangeHandle(item)}
                    key={item.value}
                >
                    {item.text}
                </SelectTab>)}
        </SelectBar>
        <Body>
            {sort.map(key => checked[key] ? <Card key={key}>
                <Title>{checked[key]}</Title>
                <Box>
                    {key === "text" ? <TextWrapper text={data?.text} /> : null}
                    {key === "images" ? <ImagesWrapper images={data?.images} /> : null}
                </Box>
            </Card> : null)}
        </Body>
    </>
}

export default Content;
