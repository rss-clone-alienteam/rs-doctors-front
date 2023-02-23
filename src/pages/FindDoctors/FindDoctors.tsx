import React, { useState, useEffect } from "react";
import style from "./FindDoctors.module.scss";
import Box from "@mui/material/Box";
import { getMap, IDoctor } from "../../api/doctors";
import { CardDoctor } from "../../components/PageDoctors/CardDoctor";
import { getDoctors } from "../../api/doctors";
import { useNavigate, useSearchParams } from "react-router-dom";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { CircularProgress, Grid } from "@mui/material";
import { Search } from "../../components/SectionFindDoctors/Search/Search";
import { useQuery } from "react-query";

interface ICoordinates {
  center: [number, number];
  zoom: number;
}

const FindDoctors = () => {
  const [coordsData, setCoordsData] = useState<[number, number][]>();
  const [defaultState, setDefaultState] = useState<ICoordinates>();

  const [searchParams] = useSearchParams();

  const city = searchParams.get("city") || "";
  const specialization = searchParams.get("specialization") || "";
  console.log(city, specialization);

  const navigate = useNavigate();

  const { isLoading: doctorsIsLoading, data: listDoctors, refetch: refreshListDoctors } = useQuery("doctors", () => getDoctors(specialization, city));

  const {
    isLoading: CoordsIsLoading,
    data: listCoords,
    refetch: refreshListCoords,
  } = useQuery(
    "coords",
    async () => {
      const newData: [number, number][] = await Promise.all(
        listDoctors
          .filter((doc: IDoctor) => doc.address !== null)
          .map(async (doc: IDoctor) => {
            if (doc.address !== null) {
              return await getMap(doc.address);
            }
          }),
      );
      return newData;
    },
    {
      enabled: !!listDoctors,
      onSuccess(data) {
        console.log(data);
        setCoordsData(data);
        setDefaultState({ center: data[0], zoom: 10 });
      },
    },
  );

  useEffect(() => {
    if (listDoctors) refreshListDoctors();
    if (listCoords) refreshListCoords();
  }, [listCoords, listDoctors, refreshListCoords, refreshListDoctors, searchParams]);

  if (doctorsIsLoading || CoordsIsLoading) return <CircularProgress size={120} sx={{ position: "fixed", top: "45vh", left: "45vw" }} />;

  return (
    <>
      <Box>
        <Search />
      </Box>
      <Box className={style.container}>
        <Grid container spacing={5} flexDirection="column" alignContent={"center"} width="70%">
          {listDoctors !== undefined &&
            listCoords !== undefined &&
            listDoctors.map((doc: IDoctor, index: number) => (
              <Grid item key={doc.id}>
                <CardDoctor doctor={doc} key={doc.id} coords={listCoords[index]} />
              </Grid>
            ))}
        </Grid>
        <Box width={"30%"} marginLeft={"30px"}>
          <YMaps>
            {defaultState?.center !== undefined && (
              <Map state={defaultState} className={style.mapYandex}>
                {coordsData != undefined &&
                  listDoctors != undefined &&
                  listDoctors.length &&
                  coordsData.map((item: [number, number], index: number) => (
                    <Placemark
                      geometry={item}
                      key={listDoctors[index]?.id}
                      options={{
                        preset: "islands#darkGreenStretchyIcon",
                      }}
                      properties={{
                        iconContent: `${listDoctors[index]?.nameDoctor} ${listDoctors[index]?.surname}`,
                      }}
                      onClick={() => navigate(`/doctor/${listDoctors[index]?.id}`)}
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
