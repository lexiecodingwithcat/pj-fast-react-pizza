/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

function Button({
  children,
  disabled,
  to,
  type,
  onclick,
}) {
  const base =
    "text-sm focus:outline-none inline-block rounded-full bg-yellow-400  font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed ";
  const styles = {
    primary: base + "px-4 py-3 md:px-6 md:py-4 ",
    small:
      base +
      "py-2 px-4 md:px-6 md:py-2.5 text-xs",
    secondary:
      "text-sm focus:outline-none inline-block rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6  md:py-3.5",
      round: base + "py-1 px-2.5 md:px-3.5 md:py-2 text-sm",
  };
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  if (onclick)
    return (
      <button
        disabled={disabled}
        className={styles[type]}
        onClick={onclick}
      >
        {children}
      </button>
    );
  return (
    <button
      disabled={disabled}
      className={styles[type]}
    >
      {children}
    </button>
  );
}

export default Button;
