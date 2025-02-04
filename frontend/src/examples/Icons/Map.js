// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import colors from "assets/theme/base/colors";

function Map({ color = "dark", size = "16px" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 42 42"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>map</title>
      <g id="Basic-Elements" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="Rounded-Icons"
          transform="translate(-1869.000000, -293.000000)"
          fill={colors[color] ? colors[color].main : colors.dark.main}
          fillRule="nonzero"
        >
          <g id="Icons-with-opacity" transform="translate(1716.000000, 291.000000)">
            <g id="map" transform="translate(153.000000, 2.000000)">
              <path
                d="M21 0C12.16 0 5 7.16 5 16c0 7.38 6.78 15.35 12.35 21.38a1.71 1.71 0 0 0 2.3 0C30.22 31.35 37 23.38 37 16c0-8.84-7.16-16-16-16ZM21 9c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4Z"
                id="Path"
                opacity="1"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

// Typechecking props for the Map
Map.propTypes = {
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

export default Map;
