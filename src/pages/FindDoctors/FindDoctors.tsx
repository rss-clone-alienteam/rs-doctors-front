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
import { Modal } from "../../components/Modal/Modal";
import { MakeAppointmentModal } from "../../components/SectionSchedule/MakeAppointmentModal";

interface ICoordinates {
  center: [number, number];
  zoom: number;
}

const FindDoctors = () => {
  const [coordsData, setCoordsData] = useState<[number, number][]>();
  const [defaultState, setDefaultState] = useState<ICoordinates>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchParams] = useSearchParams();

  const city = searchParams.get("city") || "";
  const specialization = searchParams.get("specialization") || "";

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
        setCoordsData(data);
        setDefaultState({ center: data[0], zoom: 9 });
      },
    },
  );

  useEffect(() => {
    if (listDoctors) refreshListDoctors();
    if (listCoords) refreshListCoords();
  }, [listCoords, listDoctors, refreshListCoords, refreshListDoctors, searchParams]);

  if (doctorsIsLoading || CoordsIsLoading) return <CircularProgress size={120} sx={{ position: "fixed", top: "45vh", left: "45vw" }} />;

  return (
    <Box>
      <Grid container direction="column" spacing={2} p={1}>
        <Grid item alignContent="start" xs={12}>
          <Search />
        </Grid>

        <Grid
          item
          container
          className={style.container}
          spacing={1}
          direction={{ xs: "column-reverse", sm: "column-reverse", md: "row" }}
          flexWrap="nowrap"
        >
          <Grid item container spacing={3} flexDirection="column" alignContent={"center"} xs={12} md={9}>
            {listDoctors !== undefined &&
              listCoords !== undefined &&
              listDoctors.map((doc: IDoctor, index: number) => (
                <Grid item key={doc.id}>
                  <CardDoctor doctor={doc} key={doc.id} coords={listCoords[index]} modalHandler={setIsModalOpen} />
                </Grid>
              ))}
          </Grid>
          <Grid item xs={12} md>
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
          </Grid>
          <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <MakeAppointmentModal close={() => setIsModalOpen(false)} />
          </Modal>
        </Grid>
      </Grid>
    </Box>
  );
};

export { FindDoctors };
