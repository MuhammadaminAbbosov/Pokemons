import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Pokemon = (props) => {
    const [data, setData] = useState([])
    const [types, setTypes] = useState([])
    function getData() {
        axios.get(props.url)
            .then(response => {
                setData(response.data.sprites.front_default)
                setTypes(response.data.types)
            })
    }
    useEffect(getData, [])
    
    return (
        <Wrapper to={`/${props.id + 1}`}>
                <h2>#{props.id + 1}</h2>
                <img src={data} alt=""/>
                <p className="title"> {props.title}</p>
                <div className="types">
                {
                    types.map(item => <p key={Math.random()}>{item.type.name}</p>)
                }
                </div>
        </Wrapper>
    );
}

export default Pokemon;

const Wrapper = styled(Link)`
    padding: 40px;
    background: linear-gradient(to right, #0f2027, #203a43, #2c5364); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
    box-shadow: 0 0 5px #000;
    transition: 0.3s ease-in;
    color: white;
    text-decoration: none;
    :hover {
        background: linear-gradient(to left, #0f2027, #203a43, #2c5364); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        transform: translateY(-10px);
    }

    h2 {
        text-align: left;
    }

    .title {
        text-transform: capitalize;
    }

    .types {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;

        p {
            border-radius: 3px;
            font-size: 12px;
            padding: 4px 8px;
            :nth-child(1) {
                background: linear-gradient(to right, #59c173, #a17fe0, #5d26c1); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            }

            :nth-child(2) {
                background: linear-gradient(to right, #3e5151, #decba4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            }
        }
    }
`