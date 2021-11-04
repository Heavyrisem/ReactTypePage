import React, { useEffect, useRef, useState } from "react";
import '../style/Type.css';
import InputElement from "./InputElement";
import { Language_T } from "./Main";

import Texts from './Text.json';


function Type() {
    const [TextList, setTextList] = useState<string[]>([""]);
    const [index, setIndex] = useState<number>(0);
	const [Language, setLanguage] = useState<Language_T>(Language_T.ko);


    useEffect(() => {
        // console.log(Language)
        let TextArr: string[];
        switch (Language) {
            case Language_T.en: TextArr = Texts.TextList.en; break;
            case Language_T.ko: TextArr = Texts.TextList.ko; break;
        }

        TextArr.sort(() => Math.random() - 0.5);
        // console.log(TextArr)
        setTextList(TextArr);
    }, [Language]);

    function InputEmitted() {
        setIndex(index+1);
        // console.log("End", TextList[index+1]);
    }

	function ChangeLanguage() {
		const LangList = ["ko", "en"];
		setLanguage(LangList[Number(!LangList.indexOf(Language))] as Language_T)
	}

    return (
        <div className="Type">
			<div className="LanguageSwitcher" onClick={ChangeLanguage}>{Language} - 클릭하여 언어 변경</div>
            <InputElement defaultStr={TextList[index]? TextList[index]:"모두 타이핑 하셨습니다."} onSubmit={InputEmitted} />
        </div>
    )
}



export default Type;