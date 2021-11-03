import React, { useEffect, useRef, useState } from "react";
import '../style/Type.css';

const TypeStrings = ["질병은 입을 좇아 들어가고 화근은 입을 좇아 나온다", "말을 많이 하는 것과 말을 잘하는 것은 다르다", "프로에게서 자기 수련과 극기심을 배워라"];

function Type() {

    return (
        <div className="Type">
            <InputElement defaultStr={TypeStrings[2]} />
        </div>
    )
}





interface InputElement_P {
    defaultStr: string
}
function InputElement(props: InputElement_P) {
    const InputRef = useRef<HTMLTextAreaElement>(null);
    const InputCursor = useState<number>(0);

    useEffect(() => {
        const { current } = InputRef;
        if (current != null) {
            console.log("INIT")
        }
    }, [InputRef.current])

    


    return (
        <>
            <textarea className="InputElement" ref={InputRef} />
            <ul>
            {props.defaultStr.split(" ").map((Word, idx, arr) => {
                    if (idx < arr.length) Word+=" ";
                    return <li key={idx}>{Word.split("").map((Str, i) => (<span key={idx+i+""}>{Str}</span>))}</li>
                })
            }
            </ul>
        </>
    )
}

export default Type;