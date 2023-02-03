import style from "./Notfound.module.scss";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div>
      <h1 className={style.text}>
        This page does not exist. Go{" "}
        <Link to="/" className={style.link}>
          Home
        </Link>
      </h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae enim
        distinctio facilis sequi facere. Minus, ipsum inventore eius, voluptatum
        quos sit, suscipit cumque tempore iusto ad accusamus aperiam itaque
        doloremque.
      </p>
    </div>
  );
};

export { Notfound };
