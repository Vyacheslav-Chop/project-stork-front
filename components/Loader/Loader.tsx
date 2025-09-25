import css from "./Loader.module.css";

interface LoaderProps {
  size?: number;
  thickness?: number;
  color?: string;
  borderColor?: string;
  shadowColor?: string;
  innerSize?: number;
  innerThickness?: number;
  innerColor?: string;
  innerBorderColor?: string;
}

export default function Loader({
  size = 50,
  thickness = 4,
  color = "#ffffff",
  borderColor = "rgba(255, 255, 255, 0.3)",
  shadowColor = "rgba(255, 255, 255, 0.6)",
  innerSize = size / 2,
  innerThickness = 2,
  innerColor = "#f0f0f0",
  innerBorderColor = "rgba(255, 255, 255, 0.2)",
}: LoaderProps) {
  const shadowLayers = [10, 20, 30, 40]
    .map((radius) => `0 0 ${radius}px ${shadowColor}`)
    .join(", ");

  const outerStyles = {
    width: `${size}px`,
    height: `${size}px`,
    borderWidth: `${thickness}px`,
    borderTopColor: color,
    borderRightColor: borderColor,
    borderBottomColor: borderColor,
    borderLeftColor: borderColor,
    boxShadow: shadowLayers,
  };

  const innerStyles = {
    width: `${innerSize}px`,
    height: `${innerSize}px`,
    borderWidth: `${innerThickness}px`,
    borderTopColor: innerColor,
    borderRightColor: innerBorderColor,
    borderBottomColor: innerBorderColor,
    borderLeftColor: innerBorderColor,
  };

  return (
    <div className={css.backdrop}>
      <span className={css.spinner_wrapper} style={outerStyles}>
        <span className={css.spinner_inner} style={innerStyles}></span>
      </span>
    </div>
  );
}
