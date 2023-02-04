import { SectionBenefits } from "../../components/SectionBenefits/SectionBenefits";
import { SectionFindDoctors } from "../../components/SectionFindDoctors/SectionFindDoctors";
import style from "./Home.module.scss";

const Home = () => {
  return (
    <>
      <SectionFindDoctors />
      <SectionBenefits />
      <div>
        <h1 className={style.text}>Home</h1>
      </div>
    </>
  );
};

export { Home };
