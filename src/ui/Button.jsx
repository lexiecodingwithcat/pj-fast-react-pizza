/* eslint-disable react/prop-types */

function Button({children, disabled}) {
    return (
        <button disabled={disabled}>{children}</button>
    )
}

export default Button
