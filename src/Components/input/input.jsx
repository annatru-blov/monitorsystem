import style from "./input.module.css";

function Input(props) {
  return (
    <>
      <div>
        <div className={style.inputText}>{props.name}</div>
        <input
          type="text"
          name="first_name"
          className={style.input}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
      </div>
    </>
  );
}

export default Input;
