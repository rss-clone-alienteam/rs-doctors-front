import React, { useState, useEffect } from "react";
import style from "./FindDoctors.module.scss";
import Box from "@mui/material/Box";
import { getMap, IDoctor } from "../../api/doctors";
import { CardDoctor } from "../../components/PageDoctors/CardDoctor";
import { getDoctors } from "../../api/doctors";
import { useNavigate, useSearchParams } from "react-router-dom";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { Grid } from "@mui/material";
import { Search } from "../../components/SectionFindDoctors/Search/Search";

const FindDoctors = () => {
  const [coordsData, setCoordsData] = useState<[number, number][]>([]);
  const [data, setData] = useState<IDoctor[]>([]);
  const [defaultState, setDefaultState] = useState({
    center: [55.751574, 37.573856],
    zoom: 10,
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // const { isLoading, data } = useQuery("doctors", () => getDoctors(specialization, city));

  useEffect(() => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAa");

    const city = searchParams.get("city") || "";
    const specialization = searchParams.get("specialization") || "";

    async function getCoords() {
      const dataDoc = await getDoctors(specialization, city);

      data.toString() !== dataDoc.toString() ? setData(dataDoc) : true;

      if (dataDoc == undefined) return;

      const newData: [number, number][] = await Promise.all(
        dataDoc
          .filter((doc: IDoctor) => doc.address !== null)
          .map(async (doc: IDoctor) => {
            if (doc.address !== null) {
              return await getMap(doc.address);
            }
          }),
      );

      setCoordsData(newData);
      setDefaultState({ center: newData[0], zoom: 10 });
    }

    getCoords();
  }, [data, searchParams]);

  // if (isLoading) return <CircularProgress size={120} sx={{ position: "fixed", top: "45vh", left: "45vw" }} />;

  return (
    <>
      <Box>
        <Search />
      </Box>
      <Box className={style.container}>
        <Grid container spacing={5} flexDirection="column" alignContent={"center"} width="70%">
          {data !== undefined &&
            data.map((doc: IDoctor, index: number) => (
              <Grid item key={doc.id}>
                <CardDoctor doctor={doc} key={doc.id} coords={coordsData[index]} />
              </Grid>
            ))}
        </Grid>
        <Box width={"30%"} marginLeft={"30px"}>
          <YMaps>
            {defaultState && (
              <Map defaultState={defaultState} className={style.mapYandex}>
                {coordsData.map((item: [number, number], index: number) => (
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
            )}
          </YMaps>
        </Box>
      </Box>
    </>
  );
};

export { FindDoctors };
