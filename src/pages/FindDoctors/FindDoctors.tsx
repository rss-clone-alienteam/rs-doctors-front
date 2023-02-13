import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { IDoctor } from "../../components/PageDoctors/CardDoctor";
import { CardDoctor } from "../../components/PageDoctors/CardDoctor";
import { getDoctors } from "../../api/doctors";
import { useSearchParams } from "react-router-dom";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

const FindDoctors = () => {
  const [products, setProducts] = useState<IDoctor[]>([]);
  const [searchParams] = useSearchParams();

  const defaultState = {
    center: [55.751574, 37.573856],
    zoom: 5,
  };

  const city = searchParams.get("city") || "";
  const specialization = searchParams.get("specialization") || "";
  console.log(city, specialization);

  async function getData(specialization: string, city: string) {
    const data = await getDoctors(specialization, city);
    setProducts(data);
  }

  useEffect(() => {
    getData(specialization, city);
  }, []);

  return (
    <Box display={"flex"} flexDirection={"column"} align-items={"center"}>
      <Box>
        {/* <Box max-height={"50vh"} max-width={"100%"}> */}
        <YMaps>
          <Map
            defaultState={defaultState}
            style={{ width: "500px", height: "250px", display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <Placemark geometry={[55.684758, 37.738521]} />
            <Placemark geometry={[56.684758, 38.738521]} />
            <Placemark geometry={[54.684758, 39.738521]} />
            <Placemark geometry={[55.684758, 39.738521]} />
          </Map>
        </YMaps>
      </Box>
      <Box width={"70vw"}>
        {products.map((doc: IDoctor) => (
          <CardDoctor doctor={doc} key={doc.id} />
        ))}
      </Box>
    </Box>
  );
};

export { FindDoctors };
