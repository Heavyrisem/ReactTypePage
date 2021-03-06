import React, { useEffect, useRef, useState } from 'react';

interface InputElement_P {
    defaultStr: string
    onSubmit: Function
}
function InputElement(props: InputElement_P) {
    const WrapperRef = useRef<HTMLDivElement>(null);
    const InputRef = useRef<HTMLTextAreaElement>(null);
    const [InputText, setText] = useState<string>("");
    const [Focused, setFocused] = useState<boolean>(false);

    const CursorRef = useRef<HTMLSpanElement>(null);

    let RenderPos: number = 0;

    useEffect(() => {
        if (InputRef.current && CursorRef.current && WrapperRef.current) {
            const WrapperPos = WrapperRef.current.getBoundingClientRect();
            const CursorPos = CursorRef.current.getBoundingClientRect();
            console.log(CursorPos.left - WrapperPos.left, CursorPos.top - WrapperPos.top+WrapperPos.height);

            InputRef.current.style.left = `${CursorPos.x - WrapperPos.x}px`;
            InputRef.current.style.top = `${(WrapperPos.y - CursorPos.y - CursorPos.height * 2) * -1}px`;
            
            // InputRef.current.offsetLeft
        }
    }, [InputText])


    function BeforeInputHandler(e: React.KeyboardEvent) {
        // console.log(e.keyCode);
        if (e.keyCode >= 33 && e.keyCode <= 40) {
            // console.log("BLOCK KEY");
            e.preventDefault();
        }

        if (e.keyCode == 13 || e.keyCode == 32) {
            // console.log("ENTER or SPACEBAR");
            if (props.defaultStr == InputText) {
                e.preventDefault();
                if (InputRef.current) InputRef.current.value = "";
                RenderPos = 0;
                setText("");
                props.onSubmit();
            }
        }
        
        if (props.defaultStr.length <= InputText.length && !(e.keyCode == 8)) {
            e.preventDefault();
            e.stopPropagation();
            // console.log("MaxLen")
        }
    }

    function InputEventHandler(e: React.ChangeEvent) {
        const { current } = InputRef;

        if (current != null) {
            // console.log(current.value);
            setText(current.value);
            RenderPos = 0;
        }
    }

    


    return (
        <div ref={WrapperRef}>
            <ul onClick={()=>InputRef.current?.focus()}>
            <textarea className="InputElement" ref={InputRef} onChange={InputEventHandler} onKeyDown={BeforeInputHandler} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} onPaste={(e)=>e.preventDefault()} />
            {props.defaultStr.split(" ").map((Word, idx, arr) => {
                    if (idx < arr.length-1) Word+=" ";

                    return <li key={idx}>{
                        Word.split("").map((Str, i) => {
                            RenderPos++;
                            // console.log(idx, i, arr[idx].length, idx*arr[idx].length+i, Str, arr);
                            let ClassName: string[] = [];
                            let InputArr: string[] = InputText.split("");
                            // if (InputText.length<RenderPos)
                            if (InputText.length == RenderPos) {
                                Str = InputArr[InputArr.length-1]? InputArr[InputArr.length-1]:Str;
                            }

                            if (InputText.length >= RenderPos) {
                                ClassName.push("isPast");
                                
                                
                                if (InputArr[RenderPos-1] != Str) {
                                    if (Str == " ") ClassName.push("space");
                                    ClassName.push("incorrect");
                                }
                            }

                            // console.log(RenderPos, Str);
                            // if (RenderPos == props.defaultStr.length) RenderPos = 0;

                            const ShowCursor = (InputText.length+1 == RenderPos)&&Focused;
                            // console.log(RenderPos);
                            return <span key={idx+i+""} className={ClassName.join(" ")}>{Str}{ShowCursor&& <span ref={CursorRef} className="cursor"></span>}</span>
                        })
                    }</li>
                })
            }
            </ul>
        </div>
    )
}

export default InputElement;