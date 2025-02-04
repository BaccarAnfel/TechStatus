// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import colors from "assets/theme/base/colors";

function Store({ color = "dark", size = "16px" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 42 42"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>store</title>
      <g id="Basic-Elements" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="Rounded-Icons"
          transform="translate(-2020.000000, -442.000000)"
          fill={colors[color] ? colors[color].main : colors.dark.main}
          fillRule="nonzero"
        >
          <g id="Icons-with-opacity" transform="translate(1716.000000, 291.000000)">
            <g id="store" transform="translate(304.000000, 151.000000)">
              {/* Store Icon Paths */}
              <path
                d="M10,20 L2,20 C0.895,20 0,20.895 0,22 L0,40 C0,41.105 0.895,42 2,42 L40,42 C41.105,42 42,41.105 42,40 L42,22 C42,20.895 41.105,20 40,20 L32,20 L32,10 L10,10 L10,20 Z"
                id="Path"
              />
              <path
                d="M20,10 L20,20 L22,20 L22,10 L20,10 Z"
                id="Path"
              />
              <path
                d="M30,10 L30,20 L32,20 L32,10 L30,10 Z"
                id="Path"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

// Typechecking props for the Store
Store.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
    "white",
  ]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Store;