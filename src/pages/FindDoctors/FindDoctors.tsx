import React, { useState, useEffect } from "react";
import style from "./FindDoctors.module.scss";
import Box from "@mui/material/Box";
import { getMap, IDoctor } from "../../api/doctors";
import { CardDoctor } from "../../components/PageDoctors/CardDoctor";
import { getDoctors } from "../../api/doctors";
import { useNavigate, useSearchParams } from "react-router-dom";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useQuery } from "react-query";
import { CircularProgress, Grid } from "@mui/material";

const defaultState = {
  center: [55.751574, 37.573856],
  zoom: 10,
};

const FindDoctors = () => {
  const navigate = useNavigate();
  const [coordsData, setCoordsData] = useState<[number, number][]>([]);
  const [searchParams] = useSearchParams();

  const city = searchParams.get("city") || "";
  const specialization = searchParams.get("specialization") || "";
  console.log(city, specialization);

  const { isLoading, data } = useQuery("doctors", () => getDoctors(specialization, city));

  useEffect(() => {
    async function getCoords(data: IDoctor[]) {
      if (data == undefined) return;
      const newData: [number, number][] = await Promise.all(
        data
          .filter((doc: IDoctor) => doc.address !== null)
          .map(async (doc: IDoctor) => {
            if (doc.address !== null) {
              return await getMap(doc.address);
            }
          }),
      );
      setCoordsData(newData);
    }
    getCoords(data);
  }, [data]);

  if (coordsData.length) defaultState.center = coordsData[0];

  if (isLoading) return <CircularProgress size={120} sx={{ position: "fixed", top: "45vh", left: "45vw" }} />;

  return (
    <Box className={style.container}>
      {
        <Box width={"100%"}>
          <YMaps>
            <Map defaultState={defaultState} className={style.mapYandex}>
              {coordsData.length &&
                coordsData.map((item: [number, number], index: number) => (
                  <Placemark
                    geometry={item}
                    key={index}
                    options={{
                      preset: "islands#darkGreenStretchyIcon",
                    }}
                    properties={{
                      iconContent: `${data[index].nameDoctor} ${data[index].surname}`,
                    }}
                    onClick={() => navigate(`/doctor/${data[index].id}`)}
                  />
                ))}
            </Map>
          </YMaps>
        </Box>
      }
      <Grid container xs={12} spacing={5} flexDirection="column" alignContent={"center"}>
        {data.map((doc: IDoctor, index: number) => (
          <Grid item key={doc.id}>
            <CardDoctor doctor={doc} key={doc.id} coords={coordsData[index]} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export { FindDoctors };
