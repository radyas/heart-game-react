import {useState} from "react";

export const AnswerComponent = (props: any) => {
    const [hover, setHover] = useState(false)
  return (
      <>
          <div className={`border border-info m-2 ${hover ? 'bg-info' : ''}`}
               onMouseEnter={() => setHover(true)}
               onMouseLeave={() => setHover(false)}
               onClick={props.onClick}>
              <h2>{props.value}</h2>
          </div>
      </>
  )
}