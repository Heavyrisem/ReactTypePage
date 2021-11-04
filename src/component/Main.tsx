import React, { useState } from 'react';
import Type from './Type';

import '../style/Main.css';


export enum Language_T {
	en = "en",
	ko = "ko"
}
function Main() {

	return (
		<div className="Main">
			<Type />
		</div>
	);
}

export default Main;
