import type { PCSCalendarResponse } from "@/types/api";

export const MOCK_PCS_CALENDAR: PCSCalendarResponse = {
  data: [
    {
      event_id: 58793,
      date_start: "2026-07-04",
      date_end: "2026-07-26",
      nation: "fr",
      name: "Tour de France",
      classification: "2.UWT",
      stages: [
        { event_id: 58793, race_date: "2026-07-04", stagename: "Stage 1 (TTT)", city_start: "Barcelona", city_finish: "Barcelona", distance: 19, start_time: "00:00:00" },
        { event_id: 58793, race_date: "2026-07-05", stagename: "Stage 2", city_start: "Tarragona", city_finish: "Barcelona", distance: 182, start_time: "00:00:00" },
        { event_id: 58793, race_date: "2026-07-06", stagename: "Stage 3", city_start: "Granollers", city_finish: "Les Angles", distance: 196, start_time: "00:00:00" },
        { event_id: 58793, race_date: "2026-07-07", stagename: "Stage 4", city_start: "Carcassonne", city_finish: "Foix", distance: 182, start_time: "00:00:00" },
        { event_id: 58793, race_date: "2026-07-08", stagename: "Stage 5", city_start: "Lannemezan", city_finish: "Pau", distance: 158, start_time: "00:00:00" },
        { event_id: 58793, race_date: "2026-07-09", stagename: "Stage 6", city_start: "Pau", city_finish: "Gavarnie-Gèdre", distance: 186, start_time: "00:00:00" },
        { event_id: 58793, race_date: "2026-07-10", stagename: "Stage 7", city_start: "Hagetmau", city_finish: "Bordeaux", distance: 175, start_time: "00:00:00" },
        { event_id: 58793, race_date: "2026-07-11", stagename: "Stage 8", city_start: "Périgueux", city_finish: "Bergerac", distance: 182, start_time: "00:00:00" },
        { event_id: 58793, race_date: "2026-07-12", stagename: "Stage 9", city_start: "Malemort", city_finish: "Ussel", distance: 185, start_time: "00:00:00" },
        { event_id: 58793, race_date: "2026-07-14", stagename: "Stage 10", city_start: "Aurillac", city_finish: "Le Lioran", distance: 167, start_time: "00:00:00" },
        { event_id: 58793, race_date: "2026-07-15", stagename: "Stage 11", city_start: "Vichy", city_finish: "Nevers", distance: 161, start_time: "00:00:00" },
        { event_id: 58793, race_date: "2026-07-16", stagename: "Stage 12", city_start: "Circuit de Nevers Magny-Cours", city_finish: "Chalon-sur-Saône", distance: 181, start_time: "00:00:00" },
        { event_id: 58793, race_date: "2026-07-17", stagename: "Stage 13", city_start: "Dole", city_finish: "Belfort", distance: 205, start_time: "00:00:00" },
        { event_id: 58793, race_date: "2026-07-18", stagename: "Stage 14", city_start: "Mulhouse", city_finish: "Le Markstein", distance: 155, start_time: "00:00:00" },
        { event_id: 58793, race_date: "2026-07-19", stagename: "Stage 15", city_start: "Champagnole", city_finish: "Plateau de Solaison", distance: 184, start_time: "00:00:00" },
        { event_id: 58793, race_date: "2026-07-21", stagename: "Stage 16 (ITT)", city_start: "Évian Les-Bains", city_finish: "Thonon Les-Bains", distance: 26, start_time: "00:00:00" },
        { event_id: 58793, race_date: "2026-07-22", stagename: "Stage 17", city_start: "Chambéry", city_finish: "Voiron", distance: 175, start_time: "00:00:00" },
        { event_id: 58793, race_date: "2026-07-23", stagename: "Stage 18", city_start: "Voiron", city_finish: "Orcières Merlette", distance: 185, start_time: "00:00:00" },
        { event_id: 58793, race_date: "2026-07-24", stagename: "Stage 19", city_start: "Gap", city_finish: "Alpe d'Huez", distance: 128, start_time: "00:00:00" },
        { event_id: 58793, race_date: "2026-07-25", stagename: "Stage 20", city_start: "Le Bourg d'Oisans", city_finish: "Alpe d'Huez", distance: 171, start_time: "00:00:00" },
        { event_id: 58793, race_date: "2026-07-26", stagename: "Stage 21", city_start: "Thoiry", city_finish: "Paris", distance: 130, start_time: "00:00:00" },
      ],
    },
    {
      event_id: 59817,
      date_start: "2026-01-20",
      date_end: "2026-01-25",
      nation: "au",
      name: "Santos Tour Down Under",
      classification: "2.UWT",
      stages: [
        { event_id: 59817, race_date: "2026-01-20", stagename: "Prologue", city_start: "Adelaide", city_finish: "Adelaide", distance: 3.6, start_time: "18:00:00" },
        { event_id: 59817, race_date: "2026-01-21", stagename: "Stage 1", city_start: "Tanunda", city_finish: "Tanunda", distance: 120.6, start_time: "11:19:00" },
      ],
    },
  ],
};

export function getMockCalendar(): PCSCalendarResponse {
  return MOCK_PCS_CALENDAR;
}