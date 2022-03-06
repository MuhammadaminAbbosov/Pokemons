import axios from "axios"
import { useEffect, useState } from "react"
import { useParams , useNavigate} from "react-router-dom"
import styled from "styled-components"
import Loader from "../components/Loader"

export default function PokemonDetail() {
  const {id} = useParams()
  const [data ,setData] = useState([])
  const [img, setImg] = useState('')
  const [types, setType] = useState([])
  const [ability, setAbility] = useState([])
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate()

  const fetchPoke = () => {
    setLoading(true)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => {
        setLoading(false)
        setData(response.data)
        setImg(response.data.sprites.front_default)
        setType(response.data.types)
        setAbility(response.data.abilities)
        setStats(response.data.stats)
      })
  } 
  
  useEffect(fetchPoke,[id])

  return (
    <Wrapper>
        {loading && <Loader />}
        <img className="img__animated" src="https://icon-library.com/images/pokeball-icon-png/pokeball-icon-png-5.jpg" alt=""/>
        <div className="top">
          <img  onClick={() => navigate(-1)} src="https://www.svgrepo.com/show/932/left-arrow.svg"  alt=""/>
          <h2>{data.name}</h2>
          <b>#{data.id}</b>
        </div>
        <div className="image_back">
          <img className="poke-img" src={img} alt="" />
        </div>

        <div className="types">
          {
            types.map(item => <p key={Math.random()}>{item.type.name}</p>)
          }
        </div>

        <div className="about">
          <h3>About</h3>
          <span>
            <p>height: {data.height}m</p>
            <p>weight: {data.weight}kg</p>
          </span>
        </div>

        <div className="abilities">
          <h3>Abilities</h3>
          <span>
            {
              ability.map(item => <p key={Math.random()}>{item.ability.name}</p>)
            }
          </span>
        </div>

        <div className="stats">
          <h3>Base Stats</h3>
          <div className="stats__main">
            <div className="stats__name">
              {
                stats.map(item => <p key={Math.random()}>{item.stat.name}</p>)
              }
            </div>
            <span></span>
            <div className="stats__progress">
                {
                  stats.map(item => 
                    <div  key={Math.random()} className="progresses">
                      <p>{item.base_stat} %</p>
                      <div className="progress">
                        <div className="progress__bar" style={{width: item.base_stat + "%"}}>
                          <div className="progress__bar-back"></div>
                        </div>
                      </div>
                    </div>
                  )
                }
            </div>
          </div>
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 600px;
  width: 400px;
  background: linear-gradient(to left, #5d4157, #a8caba);
  padding: 25px;
  border-radius: 16px;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    text-transform: capitalize;

    img {
      width: 20px;
      cursor: pointer;
    }
  }
  .about, .abilities {
    text-align: center;
    color: white;
    margin-top: 10px;

    span {
      display: flex;
      justify-content: center;
      gap: 20px;

      p {
        font-size: 14px;
        font-family: 'Courier New', Courier, monospace;
      }
    }
  }

  .stats {
    color: white;
    margin-top: 10px;
    h3 {
      text-align: center;
    }


    .stats__main {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-size: 14px;
      .stats__name {
        text-align: right;
        p {
          margin-bottom: 10px;
        }
      }
      span {
        height: 160px;
        width: 1.5px;
        background-color: #fff;
      }

      .progresses {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;

        .progress {
          width: 190px;
          height: 4px;
          background-color: rgba(120, 255, 214, 0.3);
          border-radius: 2px;
          @media (max-width: 700px) {
            width: 150px;
          }

          .progress__bar {
            height: 100%;
            
            .progress__bar-back {
              border-radius: 2px;
              height: 100%;
              background: linear-gradient(to left, #a8ff78, #78ffd6);
              animation-name: progress;
              animation-duration: 1s;
              animation-timing-function: linear;
              animation-iteration-count: 1;
            }
          }
        }
      }
    }
  }
  @keyframes progress {
    0% {
      width: 0;
    }

    100% {
      width: 100%;
    }
  }
  @keyframes imgShow {
    0% {
      transform: translateY(0px) ;
    }

    50% {
      transform: translateY(8px) ;
    }

    100% {
      transform: translateY(0px) ;
    }
  }
  
  .image_back {
    border-radius: 50%;
    background-color: rgba(232, 232, 232, 0.4);
    width: 140px;
    margin: 20px auto;

      .poke-img {
        display: block;
        width: 100%;
        margin: auto;
        animation-name: imgShow;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
  }

  @media (max-width: 700px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
    border: none;
  }

  .types {
        margin-top: 10px;
        display: flex;
        align-items: center;
        
        justify-content: center;
        gap: 10px;

        p {
            border-radius: 3px;
            color: white;
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

    .img__animated {
      position: absolute;
      width: 130px;
      opacity: 0.2;
      right: 10px;
      top: 20px;
      animation-name: img__animated;
      animation-duration: 8s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }

    @keyframes img__animated {
      0% {
        transform: rotate(0deg) ;
      }
      100% {
        transform: rotate(360deg) ;
      }
    }

`
