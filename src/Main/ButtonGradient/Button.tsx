import React from "react";

import style from "./Button.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: string;
}

export const Button: React.FC<Props> = ({
	children,
	className,
	icon,
	...props
}) => {
	return (
		<button {...props} className={`${style.Button} ${className || ""}`}>
			{icon && <img className={style.MyButtonImage} src={icon} alt="" />}
			{children}
		</button>
	);
};
