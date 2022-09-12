import "./Button.css";
export const Button = (props) => {
  const { onClick, style } = props;
  return (
    <button className="button-red" style={style} onClick={onClick}>
      {props.children}
    </button>
  );
};
