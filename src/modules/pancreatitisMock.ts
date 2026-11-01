import type { PancreatitisSign } from "./pancreatitisApi";

const AT_ADMISSION = "При поступлении";
const AFTER_48H = "Через 48 часов";

export const PANCREATITIS_SIGNS_MOCK: PancreatitisSign[] = [
  {
    id: 1,
    title: "Возраст старше 55 лет",
    description:
      "Возраст пациента более 55 лет на момент поступления. Пожилой возраст снижает компенсаторные резервы и повышает риск тяжёлого течения панкреатита.",
    status: "опубликован",
    stage: AT_ADMISSION,
    threshold_value: 55,
    image_url: "/mock/age_pancreatitis_sign.jpg",
    video_url: "",
    likes_count: 12,
  },
  {
    id: 2,
    title: "Лейкоциты более 16·10⁹/л",
    description:
      "Лейкоцитоз выше 16·10⁹/л при поступлении отражает выраженный системный воспалительный ответ.",
    status: "опубликован",
    stage: AT_ADMISSION,
    threshold_value: 16,
    image_url: "/mock/wbc_pancreatitis_sign.jpg",
    video_url: "",
    likes_count: 8,
  },
  {
    id: 3,
    title: "Глюкоза крови более 11,1 ммоль/л",
    description:
      "Гипергликемия выше 11,1 ммоль/л при отсутствии сахарного диабета в анамнезе указывает на поражение эндокринной части поджелудочной железы.",
    status: "опубликован",
    stage: AT_ADMISSION,
    threshold_value: 11.1,
    image_url: "/mock/glucose_pancreatitis_sign.jpg",
    video_url: "",
    likes_count: 5,
  },
  {
    id: 4,
    title: "ЛДГ более 350 ЕД/л",
    description:
      "Повышение лактатдегидрогеназы сыворотки выше 350 ЕД/л — маркер распространённого некроза тканей.",
    status: "опубликован",
    stage: AT_ADMISSION,
    threshold_value: 350,
    image_url: "/mock/ldh_pancreatitis_sign.jpg",
    video_url: "",
    likes_count: 3,
  },
  {
    id: 5,
    title: "АСТ более 250 ЕД/л",
    description:
      "Аспартатаминотрансфераза выше 250 ЕД/л при поступлении говорит о вовлечении печени и тяжести поражения.",
    status: "опубликован",
    stage: AT_ADMISSION,
    threshold_value: 250,
    image_url: "/mock/ast_pancreatitis_sign.jpg",
    video_url: "",
    likes_count: 4,
  },
  {
    id: 6,
    title: "Снижение гематокрита более 10%",
    description:
      "Падение гематокрита более чем на 10% за первые 48 часов — признак кровопотери или гемодилюции на фоне инфузионной терапии.",
    status: "опубликован",
    stage: AFTER_48H,
    threshold_value: 10,
    image_url: "/mock/hematocrit_pancreatitis_sign.jpg",
    video_url: "",
    likes_count: 6,
  },
  {
    id: 7,
    title: "Прирост мочевины более 1,8 ммоль/л",
    description:
      "Увеличение азота мочевины крови более чем на 1,8 ммоль/л (5 мг/дл) за 48 часов несмотря на инфузию — признак почечной дисфункции.",
    status: "опубликован",
    stage: AFTER_48H,
    threshold_value: 1.8,
    image_url: "/mock/urea_pancreatitis_sign.jpg",
    video_url: "",
    likes_count: 2,
  },
  {
    id: 8,
    title: "Кальций крови менее 2 ммоль/л",
    description:
      "Гипокальциемия ниже 2 ммоль/л связана с образованием кальциевых мыл в очагах жирового некроза.",
    status: "опубликован",
    stage: AFTER_48H,
    threshold_value: 2,
    image_url: "/mock/calcium_pancreatitis_sign.jpg",
    video_url: "",
    likes_count: 7,
  },
  {
    id: 9,
    title: "PaO₂ менее 60 мм рт. ст.",
    description:
      "Парциальное давление кислорода в артериальной крови ниже 60 мм рт. ст. — признак дыхательной недостаточности и риска ОРДС.",
    status: "опубликован",
    stage: AFTER_48H,
    threshold_value: 60,
    image_url: "/mock/pao2_pancreatitis_sign.jpg",
    video_url: "",
    likes_count: 9,
  },
  {
    id: 10,
    title: "Дефицит оснований более 4 мЭкв/л",
    description:
      "Дефицит буферных оснований более 4 мЭкв/л отражает метаболический ацидоз и гипоперфузию тканей.",
    status: "опубликован",
    stage: AFTER_48H,
    threshold_value: 4,
    image_url: "/mock/base_deficit_pancreatitis_sign.jpg",
    video_url: "",
    likes_count: 1,
  },
  {
    id: 11,
    title: "Секвестрация жидкости более 6 л",
    description:
      "Расчётная задержка жидкости в «третьем пространстве» более 6 литров за 48 часов — признак выраженного капиллярного повреждения.",
    status: "опубликован",
    stage: AFTER_48H,
    threshold_value: 6,
    image_url: "",
    video_url: "",
    likes_count: 0,
  },
];

export const MAX_THRESHOLD_MOCK = Math.max(
  ...PANCREATITIS_SIGNS_MOCK.map((sign) => sign.threshold_value)
);
