"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { runThemeTransition } from "./theme-transition";

export interface PaletteTone {
  bg: string;
  fg: string;
  cardBg: string;
  cardBorder: string;
  muted: string;
  accent: string;
  accentFg: string;
}

export interface WadaPalette {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  swatches: [string, string, string];
  light: PaletteTone;
  dark: PaletteTone;
}

export interface FontPairing {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  headingVar: string;
  bodyVar: string;
  monoVar: string;
}

export const WADA_PALETTES: WadaPalette[] = [
  {
    id: "00",
    code: "00",
    name: "Original Monotone",
    subtitle: "Warm Paper & Carbon Ink",
    swatches: ["#f6f5f2", "#111113", "#d9d6ce"],
    light: {
      bg: "#f6f5f2",
      fg: "#111113",
      cardBg: "#eae8e1",
      cardBorder: "rgba(17, 17, 19, 0.15)",
      muted: "#5a5a62",
      accent: "#111113",
      accentFg: "#f6f5f2",
    },
    dark: {
      bg: "#09090b",
      fg: "#f4f4f5",
      cardBg: "#141418",
      cardBorder: "rgba(244, 244, 245, 0.14)",
      muted: "#90909a",
      accent: "#f4f4f5",
      accentFg: "#09090b",
    },
  },
  {
    id: "01",
    code: "01",
    name: "Wada #012 · Grenadine & Ink",
    subtitle: "Vermilion, Carbon & Warm Cream",
    swatches: ["#F2E5DF", "#141312", "#D94E34"],
    light: {
      bg: "#F2E5DF",
      fg: "#181312",
      cardBg: "#E6D4CB",
      cardBorder: "rgba(24, 19, 18, 0.2)",
      muted: "#5E433D",
      accent: "#D94E34",
      accentFg: "#FAF6F4",
    },
    dark: {
      bg: "#19110F",
      fg: "#F4EFE6",
      cardBg: "#261A17",
      cardBorder: "rgba(244, 239, 230, 0.18)",
      muted: "#B89F96",
      accent: "#E0553B",
      accentFg: "#19110F",
    },
  },
  {
    id: "02",
    code: "02",
    name: "Wada #147 · Salvia Blue & Ivory",
    subtitle: "Warm Ivory, Cobalt & Navy",
    swatches: ["#F4F1E6", "#1E325C", "#3B5998"],
    light: {
      bg: "#F4F1E6",
      fg: "#1E325C",
      cardBg: "#E6E1D0",
      cardBorder: "rgba(30, 50, 92, 0.2)",
      muted: "#425680",
      accent: "#3B5998",
      accentFg: "#F4F1E6",
    },
    dark: {
      bg: "#0F1829",
      fg: "#F0EDE2",
      cardBg: "#17243B",
      cardBorder: "rgba(240, 237, 226, 0.16)",
      muted: "#95A8CC",
      accent: "#6C8FD4",
      accentFg: "#0F1829",
    },
  },
  {
    id: "03",
    code: "03",
    name: "Wada #065 · Cossack Green & Ecru",
    subtitle: "Raw Ecru, Pine & Cinnamon Ochre",
    swatches: ["#EFECE4", "#1E3A2F", "#B86B35"],
    light: {
      bg: "#EFECE4",
      fg: "#1E3A2F",
      cardBg: "#E2DDD1",
      cardBorder: "rgba(30, 58, 47, 0.22)",
      muted: "#4A6157",
      accent: "#B86B35",
      accentFg: "#FAF7F2",
    },
    dark: {
      bg: "#0F1E18",
      fg: "#ECE8DF",
      cardBg: "#172B23",
      cardBorder: "rgba(236, 232, 223, 0.16)",
      muted: "#93ABA0",
      accent: "#D4844C",
      accentFg: "#0F1E18",
    },
  },
  {
    id: "04",
    code: "04",
    name: "Wada #098 · Violet-Black & Silk",
    subtitle: "Raw Silk, Plum Ink & Lacquer Red",
    swatches: ["#F2ECE4", "#281F2B", "#B5493A"],
    light: {
      bg: "#F2ECE4",
      fg: "#281F2B",
      cardBg: "#E5DDD2",
      cardBorder: "rgba(40, 31, 43, 0.2)",
      muted: "#625364",
      accent: "#B5493A",
      accentFg: "#FAF6F1",
    },
    dark: {
      bg: "#17111A",
      fg: "#F2ECE4",
      cardBg: "#241B29",
      cardBorder: "rgba(242, 236, 228, 0.16)",
      muted: "#AD9BB0",
      accent: "#D96554",
      accentFg: "#17111A",
    },
  },
  {
    id: "05",
    code: "05",
    name: "Wada #214 · Sulfur, Stone & Pitch",
    subtitle: "Warm Stone, Pitch & Sulfur Gold",
    swatches: ["#EAEAE5", "#121212", "#D9B436"],
    light: {
      bg: "#EAEAE5",
      fg: "#121212",
      cardBg: "#DCDCD4",
      cardBorder: "rgba(18, 18, 18, 0.2)",
      muted: "#52565A",
      accent: "#C9A326",
      accentFg: "#121212",
    },
    dark: {
      bg: "#111210",
      fg: "#EAEAE5",
      cardBg: "#1B1C19",
      cardBorder: "rgba(234, 234, 229, 0.16)",
      muted: "#959890",
      accent: "#E2C044",
      accentFg: "#111210",
    },
  },
  {
    id: "06",
    code: "06",
    name: "Wada #043 · Hermosa Pink & Espresso",
    subtitle: "Dusty Rose, Espresso & Carmine",
    swatches: ["#F2D8D0", "#2A1715", "#8C2D22"],
    light: {
      bg: "#F2D8D0",
      fg: "#2A1715",
      cardBg: "#E6C5BB",
      cardBorder: "rgba(42, 23, 21, 0.22)",
      muted: "#63413D",
      accent: "#8C2D22",
      accentFg: "#FAF0ED",
    },
    dark: {
      bg: "#1F1110",
      fg: "#F5DFD8",
      cardBg: "#2E1A18",
      cardBorder: "rgba(245, 223, 216, 0.18)",
      muted: "#BD9991",
      accent: "#E07A6A",
      accentFg: "#1F1110",
    },
  },
  {
    id: "07",
    code: "07",
    name: "Wada #182 · Prussian Blue & Amber",
    subtitle: "Prussian Blue, Chalk & Amber",
    swatches: ["#152538", "#F2EFE9", "#E09F5A"],
    light: {
      bg: "#EDF1F5",
      fg: "#152538",
      cardBg: "#DCE4EC",
      cardBorder: "rgba(21, 37, 56, 0.2)",
      muted: "#4A607A",
      accent: "#C97A2B",
      accentFg: "#FAF8F5",
    },
    dark: {
      bg: "#152538",
      fg: "#F2EFE9",
      cardBg: "#1F344D",
      cardBorder: "rgba(242, 239, 233, 0.2)",
      muted: "#9FB0C4",
      accent: "#E09F5A",
      accentFg: "#152538",
    },
  },
  {
    id: "08",
    code: "08",
    name: "Wada #119 · Olive Ochre & Rust",
    subtitle: "Dry Ochre, Deep Olive & Sienna",
    swatches: ["#DDD5B8", "#1B1D17", "#9E472A"],
    light: {
      bg: "#DDD5B8",
      fg: "#1B1D17",
      cardBg: "#CFC5A3",
      cardBorder: "rgba(27, 29, 23, 0.22)",
      muted: "#4E5244",
      accent: "#9E472A",
      accentFg: "#F7F4EA",
    },
    dark: {
      bg: "#171913",
      fg: "#E6DFC5",
      cardBg: "#23261D",
      cardBorder: "rgba(230, 223, 197, 0.18)",
      muted: "#9E9B87",
      accent: "#C96A49",
      accentFg: "#171913",
    },
  },
  {
    id: "09",
    code: "09",
    name: "Wada #290 · Matcha Moss & Persimmon",
    subtitle: "Sage Parchment, Forest & Persimmon",
    swatches: ["#E4E9DC", "#18281B", "#C85A32"],
    light: {
      bg: "#E4E9DC",
      fg: "#18281B",
      cardBg: "#D4DCC8",
      cardBorder: "rgba(24, 40, 27, 0.2)",
      muted: "#495E4C",
      accent: "#C85A32",
      accentFg: "#FAFBF7",
    },
    dark: {
      bg: "#111C13",
      fg: "#E4E9DC",
      cardBg: "#1A2B1D",
      cardBorder: "rgba(228, 233, 220, 0.18)",
      muted: "#8FA693",
      accent: "#E0724A",
      accentFg: "#111C13",
    },
  },
  {
    id: "10",
    code: "10",
    name: "Wada #312 · Bordeaux Wine & Gold",
    subtitle: "Burgundy, Silk Cream & Ochre",
    swatches: ["#42161E", "#F5ECE6", "#E0A96D"],
    light: {
      bg: "#F7EFEA",
      fg: "#42161E",
      cardBg: "#EBE0D8",
      cardBorder: "rgba(66, 22, 30, 0.2)",
      muted: "#7A4952",
      accent: "#8F2436",
      accentFg: "#FAF5F2",
    },
    dark: {
      bg: "#331017",
      fg: "#F5ECE6",
      cardBg: "#471821",
      cardBorder: "rgba(245, 236, 230, 0.2)",
      muted: "#C9AEB3",
      accent: "#E0A96D",
      accentFg: "#2B0D12",
    },
  },
  {
    id: "11",
    code: "11",
    name: "Nocturnal Espresso & Bronze",
    subtitle: "Roasted Umber, Alabaster & Bronze",
    swatches: ["#14110F", "#EFE8DF", "#C89D66"],
    light: {
      bg: "#F3EDE4",
      fg: "#1F1915",
      cardBg: "#E6DDD0",
      cardBorder: "rgba(31, 25, 21, 0.18)",
      muted: "#665A4F",
      accent: "#9C6B36",
      accentFg: "#FAF6F0",
    },
    dark: {
      bg: "#14110F",
      fg: "#EFE8DF",
      cardBg: "#211C18",
      cardBorder: "rgba(239, 232, 223, 0.18)",
      muted: "#9E9387",
      accent: "#C89D66",
      accentFg: "#14110F",
    },
  },
  {
    id: "12",
    code: "12",
    name: "Wada #028 · Terracotta Clay & Slate",
    subtitle: "Warm Terracotta, Slate & Sand",
    swatches: ["#EDE3D8", "#2B3236", "#C45B3E"],
    light: {
      bg: "#EDE3D8",
      fg: "#23292C",
      cardBg: "#DFD2C3",
      cardBorder: "rgba(35, 41, 44, 0.2)",
      muted: "#5A6266",
      accent: "#C45B3E",
      accentFg: "#FAF5F0",
    },
    dark: {
      bg: "#1B2023",
      fg: "#EDE3D8",
      cardBg: "#252C30",
      cardBorder: "rgba(237, 227, 216, 0.18)",
      muted: "#9AA3A8",
      accent: "#DF7356",
      accentFg: "#1B2023",
    },
  },
  {
    id: "13",
    code: "13",
    name: "Wada #156 · Cerulean Sky & Carbon",
    subtitle: "Glacier Blue, Deep Ink & Ultramarine",
    swatches: ["#E5EEF4", "#121C26", "#1D5B96"],
    light: {
      bg: "#E5EEF4",
      fg: "#121C26",
      cardBg: "#D4E2EC",
      cardBorder: "rgba(18, 28, 38, 0.18)",
      muted: "#495E70",
      accent: "#1D5B96",
      accentFg: "#F5F9FC",
    },
    dark: {
      bg: "#0D151D",
      fg: "#E5EEF4",
      cardBg: "#16222E",
      cardBorder: "rgba(229, 238, 244, 0.16)",
      muted: "#89A2B8",
      accent: "#529BE0",
      accentFg: "#0D151D",
    },
  },
  {
    id: "14",
    code: "14",
    name: "Wada #201 · Saffron Marigold & Umber",
    subtitle: "Warm Linen, Dark Umber & Marigold",
    swatches: ["#F6EFE2", "#261B12", "#D9821E"],
    light: {
      bg: "#F6EFE2",
      fg: "#261B12",
      cardBg: "#EAE0CD",
      cardBorder: "rgba(38, 27, 18, 0.2)",
      muted: "#6B5746",
      accent: "#D9821E",
      accentFg: "#1C130C",
    },
    dark: {
      bg: "#1A120C",
      fg: "#F6EFE2",
      cardBg: "#291D14",
      cardBorder: "rgba(246, 239, 226, 0.16)",
      muted: "#B59F8A",
      accent: "#F09B38",
      accentFg: "#1A120C",
    },
  },
  {
    id: "15",
    code: "15",
    name: "Wada #240 · Peacock Teal & Coral",
    subtitle: "Mineral Mint, Deep Teal & Coral",
    swatches: ["#E6F0EE", "#102E30", "#D65C48"],
    light: {
      bg: "#E6F0EE",
      fg: "#102E30",
      cardBg: "#D3E3E0",
      cardBorder: "rgba(16, 46, 48, 0.2)",
      muted: "#436669",
      accent: "#D65C48",
      accentFg: "#FAF6F5",
    },
    dark: {
      bg: "#0B1F21",
      fg: "#E6F0EE",
      cardBg: "#133033",
      cardBorder: "rgba(230, 240, 238, 0.18)",
      muted: "#87ABA8",
      accent: "#EB7460",
      accentFg: "#0B1F21",
    },
  },
  {
    id: "16",
    code: "16",
    name: "Wada #331 · Mulberry & Champagne",
    subtitle: "Champagne Mist, Mulberry & Ochre",
    swatches: ["#F3ECEF", "#2E1527", "#9E2B63"],
    light: {
      bg: "#F3ECEF",
      fg: "#2E1527",
      cardBg: "#E6DAE0",
      cardBorder: "rgba(46, 21, 39, 0.18)",
      muted: "#6B4A61",
      accent: "#9E2B63",
      accentFg: "#FAF5F8",
    },
    dark: {
      bg: "#1D0D18",
      fg: "#F3ECEF",
      cardBg: "#2B1524",
      cardBorder: "rgba(243, 236, 239, 0.16)",
      muted: "#B898AE",
      accent: "#DF65A0",
      accentFg: "#1D0D18",
    },
  },
  {
    id: "17",
    code: "17",
    name: "Brutalist Concrete & Signal Orange",
    subtitle: "Raw Concrete, Carbon & Signal Orange",
    swatches: ["#E4E4E0", "#111111", "#FF4D1C"],
    light: {
      bg: "#E4E4E0",
      fg: "#111111",
      cardBg: "#D5D5CF",
      cardBorder: "rgba(17, 17, 17, 0.22)",
      muted: "#52524E",
      accent: "#E63E10",
      accentFg: "#FFFFFF",
    },
    dark: {
      bg: "#121212",
      fg: "#E8E8E3",
      cardBg: "#1D1D1D",
      cardBorder: "rgba(232, 232, 227, 0.18)",
      muted: "#91918C",
      accent: "#FF592B",
      accentFg: "#121212",
    },
  },
  {
    id: "18",
    code: "18",
    name: "Nordic Fjord & Birch Bark",
    subtitle: "Birch Paper, Fjord Slate & Rust",
    swatches: ["#EFECE6", "#1C2833", "#A64B2A"],
    light: {
      bg: "#EFECE6",
      fg: "#1C2833",
      cardBg: "#E2DDD4",
      cardBorder: "rgba(28, 40, 51, 0.18)",
      muted: "#51606E",
      accent: "#A64B2A",
      accentFg: "#FAF7F2",
    },
    dark: {
      bg: "#121A21",
      fg: "#EFECE6",
      cardBg: "#1B2630",
      cardBorder: "rgba(239, 236, 230, 0.16)",
      muted: "#8FA0B0",
      accent: "#D9724C",
      accentFg: "#121A21",
    },
  },
  {
    id: "19",
    code: "19",
    name: "Kyoto Cedar & Matcha",
    subtitle: "Warm Cedar, Sumi Ink & Matcha",
    swatches: ["#EFE7DC", "#1E1916", "#486B3A"],
    light: {
      bg: "#EFE7DC",
      fg: "#1E1916",
      cardBg: "#E2D7C7",
      cardBorder: "rgba(30, 25, 22, 0.2)",
      muted: "#5E524A",
      accent: "#486B3A",
      accentFg: "#F9F6F0",
    },
    dark: {
      bg: "#161210",
      fg: "#EFE7DC",
      cardBg: "#221C19",
      cardBorder: "rgba(239, 231, 220, 0.16)",
      muted: "#A6988D",
      accent: "#76A364",
      accentFg: "#161210",
    },
  },
  {
    id: "20",
    code: "20",
    name: "Wada #077 · Citron Lime & Charcoal",
    subtitle: "Crisp Citron, Deep Slate & Ash",
    swatches: ["#ECF0D8", "#191E14", "#6C8C22"],
    light: {
      bg: "#ECF0D8",
      fg: "#191E14",
      cardBg: "#DEE4C3",
      cardBorder: "rgba(25, 30, 20, 0.2)",
      muted: "#4F5943",
      accent: "#5C7A18",
      accentFg: "#FAFBF5",
    },
    dark: {
      bg: "#12160E",
      fg: "#ECF0D8",
      cardBg: "#1C2216",
      cardBorder: "rgba(236, 240, 216, 0.16)",
      muted: "#98A389",
      accent: "#A8CC45",
      accentFg: "#12160E",
    },
  },
  {
    id: "21",
    code: "21",
    name: "Wada #132 · Cobalt Electric & Bone",
    subtitle: "Warm Bone, Deep Ink & Klein Cobalt",
    swatches: ["#F3F1EB", "#121524", "#1B3BE0"],
    light: {
      bg: "#F3F1EB",
      fg: "#121524",
      cardBg: "#E5E2D9",
      cardBorder: "rgba(18, 21, 36, 0.18)",
      muted: "#4F546E",
      accent: "#1B3BE0",
      accentFg: "#FFFFFF",
    },
    dark: {
      bg: "#0B0D17",
      fg: "#F3F1EB",
      cardBg: "#15192B",
      cardBorder: "rgba(243, 241, 235, 0.16)",
      muted: "#8E95B8",
      accent: "#5B78FF",
      accentFg: "#0B0D17",
    },
  },
  {
    id: "22",
    code: "22",
    name: "Wada #195 · Lavender Ash & Plum",
    subtitle: "Soft Lavender Grey, Deep Plum & Rust",
    swatches: ["#EAE6F0", "#211829", "#A84232"],
    light: {
      bg: "#EAE6F0",
      fg: "#211829",
      cardBg: "#DDD6E6",
      cardBorder: "rgba(33, 24, 41, 0.18)",
      muted: "#5D4F69",
      accent: "#A84232",
      accentFg: "#FAF8FC",
    },
    dark: {
      bg: "#16101C",
      fg: "#EAE6F0",
      cardBg: "#231A2C",
      cardBorder: "rgba(234, 230, 240, 0.16)",
      muted: "#A194B0",
      accent: "#E06D5A",
      accentFg: "#16101C",
    },
  },
  {
    id: "23",
    code: "23",
    name: "Wada #258 · Desert Sand & Turquoise",
    subtitle: "Warm Adobe Sand, Pitch & Turquoise",
    swatches: ["#EADBC8", "#1F1914", "#1B7A7E"],
    light: {
      bg: "#EADBC8",
      fg: "#1F1914",
      cardBg: "#DECBB3",
      cardBorder: "rgba(31, 25, 20, 0.2)",
      muted: "#5E5043",
      accent: "#1B7A7E",
      accentFg: "#F7FAF9",
    },
    dark: {
      bg: "#17120E",
      fg: "#EADBC8",
      cardBg: "#241D17",
      cardBorder: "rgba(234, 219, 200, 0.16)",
      muted: "#A89682",
      accent: "#3CC2C7",
      accentFg: "#17120E",
    },
  },
  {
    id: "24",
    code: "24",
    name: "Wada #304 · Crimson Velvet & Ivory",
    subtitle: "Warm Ivory, Charcoal & Crimson",
    swatches: ["#F7F2EB", "#1C1415", "#B01E28"],
    light: {
      bg: "#F7F2EB",
      fg: "#1C1415",
      cardBg: "#EAE1D6",
      cardBorder: "rgba(28, 20, 21, 0.18)",
      muted: "#634E51",
      accent: "#B01E28",
      accentFg: "#FAF6F5",
    },
    dark: {
      bg: "#1A0D0F",
      fg: "#F7F2EB",
      cardBg: "#291518",
      cardBorder: "rgba(247, 242, 235, 0.16)",
      muted: "#BA9CA0",
      accent: "#EB4652",
      accentFg: "#1A0D0F",
    },
  },
  {
    id: "25",
    code: "25",
    name: "Wada #052 · Pistachio Cream & Forest",
    subtitle: "Pistachio Ice, Deep Pine & Coral",
    swatches: ["#E2EFE4", "#12291B", "#D95338"],
    light: {
      bg: "#E2EFE4",
      fg: "#12291B",
      cardBg: "#CFE3D2",
      cardBorder: "rgba(18, 41, 27, 0.18)",
      muted: "#3F614C",
      accent: "#D95338",
      accentFg: "#FAF6F5",
    },
    dark: {
      bg: "#0C1C12",
      fg: "#E2EFE4",
      cardBg: "#152E1E",
      cardBorder: "rgba(226, 239, 228, 0.16)",
      muted: "#84A890",
      accent: "#F27057",
      accentFg: "#0C1C12",
    },
  },
  {
    id: "26",
    code: "26",
    name: "Wada #168 · Copper Penny & Slate",
    subtitle: "Warm Slate, Charcoal & Burnished Copper",
    swatches: ["#E5E6E8", "#181B20", "#B85935"],
    light: {
      bg: "#E5E6E8",
      fg: "#181B20",
      cardBg: "#D5D7DB",
      cardBorder: "rgba(24, 27, 32, 0.18)",
      muted: "#525863",
      accent: "#B85935",
      accentFg: "#FAF7F5",
    },
    dark: {
      bg: "#13161A",
      fg: "#E5E6E8",
      cardBg: "#1D2228",
      cardBorder: "rgba(229, 230, 232, 0.16)",
      muted: "#8E96A3",
      accent: "#E07850",
      accentFg: "#13161A",
    },
  },
  {
    id: "27",
    code: "27",
    name: "Wada #222 · Mustard Seed & Indigo",
    subtitle: "Warm Cream, Deep Indigo & Mustard",
    swatches: ["#F5F0E1", "#182038", "#C99418"],
    light: {
      bg: "#F5F0E1",
      fg: "#182038",
      cardBg: "#E8E0C8",
      cardBorder: "rgba(24, 32, 56, 0.18)",
      muted: "#4C5675",
      accent: "#C99418",
      accentFg: "#182038",
    },
    dark: {
      bg: "#101626",
      fg: "#F5F0E1",
      cardBg: "#1A233B",
      cardBorder: "rgba(245, 240, 225, 0.16)",
      muted: "#939EC2",
      accent: "#E8B438",
      accentFg: "#101626",
    },
  },
  {
    id: "28",
    code: "28",
    name: "Wada #275 · Smoked Rose & Charcoal",
    subtitle: "Smoked Quartz, Pitch & Berry",
    swatches: ["#ECE3E1", "#1C1818", "#8F3245"],
    light: {
      bg: "#ECE3E1",
      fg: "#1C1818",
      cardBg: "#DFD2CF",
      cardBorder: "rgba(28, 24, 24, 0.18)",
      muted: "#5E5250",
      accent: "#8F3245",
      accentFg: "#FAF5F6",
    },
    dark: {
      bg: "#171313",
      fg: "#ECE3E1",
      cardBg: "#241E1E",
      cardBorder: "rgba(236, 227, 225, 0.16)",
      muted: "#A69693",
      accent: "#D95F76",
      accentFg: "#171313",
    },
  },
  {
    id: "29",
    code: "29",
    name: "Swiss Poster Yellow & Pitch",
    subtitle: "Warm Buttercream, Pitch & Ochre",
    swatches: ["#F4EED7", "#111111", "#C99B0E"],
    light: {
      bg: "#F4EED7",
      fg: "#111111",
      cardBg: "#E7DFC0",
      cardBorder: "rgba(17, 17, 17, 0.2)",
      muted: "#574E29",
      accent: "#B88B06",
      accentFg: "#FAF8F0",
    },
    dark: {
      bg: "#111111",
      fg: "#F5F3EB",
      cardBg: "#1C1C1A",
      cardBorder: "rgba(245, 243, 235, 0.16)",
      muted: "#999688",
      accent: "#F2CA27",
      accentFg: "#111111",
    },
  },
];

function getHexLuminance(hex: string): number {
  const clean = hex.replace("#", "").trim();
  if (clean.length !== 6) return 0.5;
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

// Pre-computed brightness-sorted palette sequences (brightest -> deepest)
// so theme transitions step gently to the nearest neighbor in brightness (+1 then -1)
// and never flashbang the viewer.
const LIGHT_BRIGHTNESS_ORDER = [...WADA_PALETTES]
  .sort((a, b) => getHexLuminance(b.light.bg) - getHexLuminance(a.light.bg))
  .map((p) => p.id);

const DARK_BRIGHTNESS_ORDER = [...WADA_PALETTES]
  .sort((a, b) => getHexLuminance(a.dark.bg) - getHexLuminance(b.dark.bg))
  .map((p) => p.id);

export const FONT_PAIRINGS: FontPairing[] = [
  {
    id: "00",
    code: "00",
    name: "Original Default",
    subtitle: "Space Grotesk + Inter", // design-ok
    headingVar: "var(--font-space)",
    bodyVar: "var(--font-inter)",
    monoVar: "var(--font-jetbrains)",
  },
  {
    id: "01",
    code: "01",
    name: "Tall Condensed",
    subtitle: "Antonio + Plus Jakarta Sans",
    headingVar: "var(--font-antonio)",
    bodyVar: "var(--font-jakarta)",
    monoVar: "var(--font-jetbrains)",
  },
  {
    id: "02",
    code: "02",
    name: "Heavy Neo-Grotesque",
    subtitle: "Syne 800 + Inter", // design-ok
    headingVar: "var(--font-syne)",
    bodyVar: "var(--font-inter)",
    monoVar: "var(--font-jetbrains)",
  },
  {
    id: "03",
    code: "03",
    name: "Tactile Studio",
    subtitle: "Comico + Plus Jakarta Sans",
    headingVar: "var(--font-comico)",
    bodyVar: "var(--font-jakarta)",
    monoVar: "var(--font-jetbrains)",
  },
  {
    id: "04",
    code: "04",
    name: "Editorial Serif Contrast",
    subtitle: "Instrument Serif + DM Sans",
    headingVar: "var(--font-instrument)",
    bodyVar: "var(--font-dmsans)",
    monoVar: "var(--font-jetbrains)",
  },
  {
    id: "05",
    code: "05",
    name: "Swiss Industrial",
    subtitle: "Archivo Black + IBM Plex Mono",
    headingVar: "var(--font-archivo-black)",
    bodyVar: "var(--font-ibm-mono)",
    monoVar: "var(--font-ibm-mono)",
  },
  {
    id: "06",
    code: "06",
    name: "High-Fashion Didone",
    subtitle: "Bodoni Moda + Plus Jakarta Sans",
    headingVar: "var(--font-bodoni)",
    bodyVar: "var(--font-jakarta)",
    monoVar: "var(--font-jetbrains)",
  },
  {
    id: "07",
    code: "07",
    name: "Warm Old-Style Editorial",
    subtitle: "Fraunces + DM Sans",
    headingVar: "var(--font-fraunces)",
    bodyVar: "var(--font-dmsans)",
    monoVar: "var(--font-jetbrains)",
  },
  {
    id: "08",
    code: "08",
    name: "Cinema Poster Condensed",
    subtitle: "Bebas Neue + IBM Plex Mono",
    headingVar: "var(--font-bebas)",
    bodyVar: "var(--font-ibm-mono)",
    monoVar: "var(--font-ibm-mono)",
  },
  {
    id: "09",
    code: "09",
    name: "Geometric Avant-Garde",
    subtitle: "Clash Display + Satoshi",
    headingVar: "var(--font-clash)",
    bodyVar: "var(--font-satoshi)",
    monoVar: "var(--font-jetbrains)",
  },
  {
    id: "10",
    code: "10",
    name: "Architectural Grotesk",
    subtitle: "Cabinet Grotesk + General Sans",
    headingVar: "var(--font-cabinet)",
    bodyVar: "var(--font-general)",
    monoVar: "var(--font-jetbrains)",
  },
  {
    id: "11",
    code: "11",
    name: "Parisian Literary Serif",
    subtitle: "Playfair Display + Cormorant",
    headingVar: "var(--font-playfair)",
    bodyVar: "var(--font-cormorant)",
    monoVar: "var(--font-jetbrains)",
  },
  {
    id: "12",
    code: "12",
    name: "Luxury Editorial Slab",
    subtitle: "Boska + General Sans",
    headingVar: "var(--font-boska)",
    bodyVar: "var(--font-general)",
    monoVar: "var(--font-jetbrains)",
  },
  {
    id: "13",
    code: "13",
    name: "Gallery Masthead Serif",
    subtitle: "Gambarino + Satoshi",
    headingVar: "var(--font-gambarino)",
    bodyVar: "var(--font-satoshi)",
    monoVar: "var(--font-jetbrains)",
  },
  {
    id: "14",
    code: "14",
    name: "Classical Garalde",
    subtitle: "Cormorant Garamond + Inter", // design-ok
    headingVar: "var(--font-cormorant)",
    bodyVar: "var(--font-inter)",
    monoVar: "var(--font-jetbrains)",
  },
  {
    id: "15",
    code: "15",
    name: "Bookish Classic",
    subtitle: "Zodiak + DM Sans",
    headingVar: "var(--font-zodiak)",
    bodyVar: "var(--font-dmsans)",
    monoVar: "var(--font-jetbrains)",
  },
  {
    id: "16",
    code: "16",
    name: "Expressive Brush Script",
    subtitle: "Telma + Plus Jakarta Sans",
    headingVar: "var(--font-telma)",
    bodyVar: "var(--font-jakarta)",
    monoVar: "var(--font-jetbrains)",
  },
  {
    id: "17",
    code: "17",
    name: "Imperial Monument Roman",
    subtitle: "Cinzel + Plus Jakarta Sans",
    headingVar: "var(--font-cinzel)",
    bodyVar: "var(--font-jakarta)",
    monoVar: "var(--font-jetbrains)",
  },
  {
    id: "18",
    code: "18",
    name: "Compact Headline Pillar",
    subtitle: "Khand + Satoshi",
    headingVar: "var(--font-khand)",
    bodyVar: "var(--font-satoshi)",
    monoVar: "var(--font-jetbrains)",
  },
  {
    id: "19",
    code: "19",
    name: "Soft Rounded Modernist",
    subtitle: "Chillax + DM Sans",
    headingVar: "var(--font-chillax)",
    bodyVar: "var(--font-dmsans)",
    monoVar: "var(--font-jetbrains)",
  },
  {
    id: "20",
    code: "20",
    name: "Clean Contemporary Sans",
    subtitle: "Ranade + General Sans",
    headingVar: "var(--font-ranade)",
    bodyVar: "var(--font-general)",
    monoVar: "var(--font-jetbrains)",
  },
  {
    id: "21",
    code: "21",
    name: "Warm Humanist Serif",
    subtitle: "Sentient + Satoshi",
    headingVar: "var(--font-sentient)",
    bodyVar: "var(--font-satoshi)",
    monoVar: "var(--font-jetbrains)",
  },
  {
    id: "22",
    code: "22",
    name: "Neo-Brutalist Swiss",
    subtitle: "Supreme + IBM Plex Mono",
    headingVar: "var(--font-supreme)",
    bodyVar: "var(--font-ibm-mono)",
    monoVar: "var(--font-ibm-mono)",
  },
  {
    id: "23",
    code: "23",
    name: "Modular Tech Display",
    subtitle: "Technor + JetBrains Mono",
    headingVar: "var(--font-technor)",
    bodyVar: "var(--font-jakarta)",
    monoVar: "var(--font-jetbrains)",
  },
  {
    id: "24",
    code: "24",
    name: "General Geometric",
    subtitle: "General Sans + Inter", // design-ok
    headingVar: "var(--font-general)",
    bodyVar: "var(--font-inter)",
    monoVar: "var(--font-jetbrains)",
  },
  {
    id: "25",
    code: "25",
    name: "Vogue Editorial Display",
    subtitle: "Stardom + Plus Jakarta Sans",
    headingVar: "var(--font-stardom)",
    bodyVar: "var(--font-jakarta)",
    monoVar: "var(--font-jetbrains)",
  },
];

// Intervals requested by user:
// 15 seconds until Theme switch -> 10 seconds until Font switch -> 15 seconds until Theme switch
const THEME_INTERVAL_SECONDS = 15;
const FONT_INTERVAL_SECONDS = 10;

export function applyPaletteOnly(paletteId: string, isDarkMode?: boolean) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const palette =
    WADA_PALETTES.find((p) => p.id === paletteId) || WADA_PALETTES[0];

  const darkActive =
    typeof isDarkMode === "boolean"
      ? isDarkMode
      : localStorage.getItem("ag_theme") === "dark";

  if (darkActive) {
    root.classList.remove("theme-paper");
    root.classList.add("theme-obsidian");
  } else {
    root.classList.remove("theme-obsidian");
    root.classList.add("theme-paper");
  }

  const tone = darkActive ? palette.dark : palette.light;

  root.style.setProperty("--bg", tone.bg);
  root.style.setProperty("--fg", tone.fg);
  root.style.setProperty("--card-bg", tone.cardBg);
  root.style.setProperty("--card-border", tone.cardBorder);
  root.style.setProperty("--muted", tone.muted);
  root.style.setProperty("--accent", tone.accent);
  root.style.setProperty("--accent-fg", tone.accentFg);

  root.style.setProperty("--bg-canvas", tone.bg);
  root.style.setProperty("--bg-secondary", tone.cardBg);
  root.style.setProperty("--text-ink", tone.fg);
  root.style.setProperty("--text-muted", tone.muted);
  root.style.setProperty("--border-line", tone.cardBorder);
}

export function applyFontOnly(fontId: string) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const font =
    FONT_PAIRINGS.find((f) => f.id === fontId) || FONT_PAIRINGS[0];

  // Only change the display/heading font variable; keep body & mono metrics 100% locked
  // so paragraphs, buttons, tags, and containers never reflow or shift around.
  root.style.setProperty("--font-heading", font.headingVar);
  root.style.setProperty("--font-display", font.headingVar);
  root.style.setProperty("--font-body", "var(--font-inter)");
  root.style.setProperty("--font-sans", "var(--font-inter)");
  root.style.setProperty("--font-mono", "var(--font-jetbrains)");
}

export function applyPaletteAndFonts(
  paletteId: string,
  fontId: string,
  isDarkMode?: boolean
) {
  applyPaletteOnly(paletteId, isDarkMode);
  applyFontOnly(fontId);
}

/**
 * Mounted once at the RootLayout level so navigating between pages (/, /work, /contact)
 * never resets or interrupts the 15s / 10s countdown timer.
 */
export default function ThemeFontSwitcher() {
  const [paletteId, setPaletteId] = useState("00");
  const [fontId, setFontId] = useState("00");
  const [isLightMode, setIsLightMode] = useState(true);

  const [autoCycleEnabled, setAutoCycleEnabled] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(THEME_INTERVAL_SECONDS);
  const [nextKind, setNextKind] = useState<"theme" | "font">("theme");

  const stateRef = useRef({
    paletteId: "00",
    fontId: "00",
    isLightMode: true,
    nextKind: "theme" as "theme" | "font",
  });

  useEffect(() => {
    stateRef.current = {
      paletteId,
      fontId,
      isLightMode,
      nextKind,
    };
  }, [paletteId, fontId, isLightMode, nextKind]);

  // Initial load from localStorage
  useEffect(() => {
    const savedPalette = localStorage.getItem("ag_wada_palette") || "00";
    const savedFont = localStorage.getItem("ag_font_pair") || "00";
    const savedAuto = localStorage.getItem("ag_auto_cycle");
    const savedTheme = localStorage.getItem("ag_theme");
    const light = savedTheme !== "dark";

    setPaletteId(savedPalette);
    setFontId(savedFont);
    setIsLightMode(light);
    if (savedAuto === "0") {
      setAutoCycleEnabled(false);
    }
    applyPaletteAndFonts(savedPalette, savedFont, !light);
  }, []);

  // Listen for manual Light/Dark button clicks from Header.tsx
  useEffect(() => {
    const onManualModeChange = (e: Event) => {
      const custom = e as CustomEvent<{ isLightMode: boolean }>;
      if (custom.detail && typeof custom.detail.isLightMode === "boolean") {
        const nextLight = custom.detail.isLightMode;
        setIsLightMode(nextLight);
        applyPaletteAndFonts(
          stateRef.current.paletteId,
          stateRef.current.fontId,
          !nextLight
        );
      }
    };
    window.addEventListener("ag-manual-theme-toggle", onManualModeChange);
    return () =>
      window.removeEventListener("ag-manual-theme-toggle", onManualModeChange);
  }, []);

  const themeStepDirRef = useRef<1 | -1>(1);

  const triggerRandomSwitch = useCallback((kind: "theme" | "font") => {
    const {
      paletteId: curP,
      fontId: curF,
      isLightMode: curLight,
    } = stateRef.current;

    if (kind === "theme") {
      // Step smoothly (+1 or -1) along the brightness-sorted palette sequence
      // so adjacent palettes have nearly identical luminance and never flashbang the eyes.
      const order = curLight ? LIGHT_BRIGHTNESS_ORDER : DARK_BRIGHTNESS_ORDER;
      const currentIndex = Math.max(0, order.indexOf(curP));
      let nextIndex = currentIndex + themeStepDirRef.current;

      if (nextIndex >= order.length) {
        themeStepDirRef.current = -1;
        nextIndex = Math.max(0, order.length - 2);
      } else if (nextIndex < 0) {
        themeStepDirRef.current = 1;
        nextIndex = Math.min(order.length - 1, 1);
      }

      const nextPaletteId = order[nextIndex] || "00";
      setPaletteId(nextPaletteId);
      localStorage.setItem("ag_wada_palette", nextPaletteId);
      runThemeTransition(
        () => applyPaletteOnly(nextPaletteId, !curLight),
        { skipWhenScrolling: true }
      );
    } else {
      // Strictly change ONLY the heading font (never touch the color palette)
      const prevFontObj =
        FONT_PAIRINGS.find((f) => f.id === curF) || FONT_PAIRINGS[0];
      const candidates = FONT_PAIRINGS.filter((f) => f.id !== curF);
      const picked =
        candidates[Math.floor(Math.random() * candidates.length)] ||
        FONT_PAIRINGS[0];

      window.dispatchEvent(
        new CustomEvent("ag-font-change", {
          detail: {
            fontId: picked.id,
            prevFontVar: prevFontObj.headingVar,
            nextFontVar: picked.headingVar,
          },
        })
      );

      setFontId(picked.id);
      localStorage.setItem("ag_font_pair", picked.id);
      applyFontOnly(picked.id);
    }
  }, []);

  const secondsRef = useRef(THEME_INTERVAL_SECONDS);

  // Persistent 1s tick in RootLayout: 15s for Theme -> 10s for Font -> 15s for Theme
  // Side effects run outside React setState updater so StrictMode never double-fires both theme & font!
  useEffect(() => {
    if (!autoCycleEnabled) return;

    const timer = window.setInterval(() => {
      if (secondsRef.current <= 1) {
        const currentKind = stateRef.current.nextKind;
        triggerRandomSwitch(currentKind);
        const upcomingKind = currentKind === "theme" ? "font" : "theme";
        stateRef.current.nextKind = upcomingKind;
        setNextKind(upcomingKind);
        const nextDuration =
          upcomingKind === "theme"
            ? THEME_INTERVAL_SECONDS
            : FONT_INTERVAL_SECONDS;
        secondsRef.current = nextDuration;
        setSecondsLeft(nextDuration);
      } else {
        secondsRef.current -= 1;
        setSecondsLeft(secondsRef.current);
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, [autoCycleEnabled, triggerRandomSwitch]);

  const handleDisable = () => {
    setAutoCycleEnabled(false);
    localStorage.setItem("ag_auto_cycle", "0");
  };

  if (!autoCycleEnabled || secondsLeft > 5) {
    return null;
  }

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-5 sm:right-6 z-50 rounded-lg border border-card-border/60 px-3 py-1.5 transition-all duration-300 flex items-center gap-3"
      style={{
        backgroundColor: "color-mix(in srgb, var(--card-bg) 72%, transparent)",
        color: "var(--fg)",
      }}
    >
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
        <span className="text-[11px] font-mono font-medium whitespace-nowrap">
          {nextKind === "theme" ? "Theme change" : "Font change"} in{" "}
          <span className="text-accent font-bold">{secondsLeft}</span>
        </span>
      </div>

      <button
        type="button"
        onClick={handleDisable}
        className="px-2 py-0.5 rounded bg-accent/90 text-accent-fg text-[9px] font-mono font-bold hover:opacity-100 opacity-85 transition-opacity flex-shrink-0"
      >
        DISABLE
      </button>
    </div>
  );
}
