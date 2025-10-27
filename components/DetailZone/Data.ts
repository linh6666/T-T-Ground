export interface RectItem {
  id: string;
  width: string;
  height: string;
  transform: string;
  fill: string;
  stroke: string;
}

export interface SvgItem {
  id: string;
  rects: RectItem[];
  topPercent: number;
  leftPercent: number;
}

const rects = [
  {
    id: "D-SH.18.21",
    width: "3.267",
    height: "9.664",
    transform: "matrix(0.992, -0.129, 0.129, 0.992, 101.633, 525.146)",
    fill: "rgba(210,156,55,0.5)",
    stroke: "#fff",
  },
  {
    id: "D-SH.18.20",
    width: "3.267",
    height: "9.664",
    transform: "matrix(0.992, -0.129, 0.129, 0.992, 98.395, 525.568)",
    fill: "rgba(210,156,55,0.5)",
    stroke: "#fff",
  },
  {
    id: "D-SH.18.19",
    width: "3.267",
    height: "9.664",
    transform: "matrix(0.992, -0.129, 0.129, 0.992, 95.154, 525.99)",
    fill: "rgba(210,156,55,0.5)",
    stroke: "#fff",
  },
  {
    id: "D-SH.18.18",
    width: "3.267",
    height: "9.664",
    transform: "matrix(0.992, -0.129, 0.129, 0.992, 91.914, 526.412)",
    fill: "rgba(210,156,55,0.5)",
    stroke: "#fff",
  },
  {
    id: "D-SH.18.17",
    width: "3.267",
    height: "9.664",
    transform: "matrix(0.992, -0.129, 0.129, 0.992, 88.676, 526.834)",
    fill: "rgba(210,156,55,0.5)",
    stroke: "#fff",
  },
  {
    id: "D-SH.18.16",
    width: "3.267",
    height: "9.664",
    transform: "matrix(0.992, -0.129, 0.129, 0.992, 85.436, 527.256)",
    fill: "rgba(210,156,55,0.5)",
    stroke: "#fff",
  },
  {
    id: "D-SH.18.15",
    width: "3.267",
    height: "9.664",
    transform: "matrix(0.992, -0.129, 0.129, 0.992, 82.197, 527.678)",
    fill: "rgba(210,156,55,0.5)",
    stroke: "#fff",
  },
  {
    id: "D-SH.18.14",
    width: "3.267",
    height: "9.664",
    transform: "matrix(0.992, -0.129, 0.129, 0.992, 78.957, 528.1)",
    fill: "rgba(210,156,55,0.5)",
    stroke: "#fff",
  },
  {
    id: "D-SH.18.13",
    width: "3.267",
    height: "9.664",
    transform: "matrix(0.992, -0.129, 0.129, 0.992, 75.717, 528.521)",
    fill: "rgba(210,156,55,0.5)",
    stroke: "#fff",
  },
  {
    id: "D-SH.18.12",
    width: "3.267",
    height: "9.664",
    transform: "matrix(0.992, -0.129, 0.129, 0.992, 72.479, 528.943)",
    fill: "rgba(210,156,55,0.5)",
    stroke: "#fff",
  },
  {
    id: "D-SH.18.11",
    width: "3.267",
    height: "9.664",
    transform: "matrix(0.992, -0.129, 0.129, 0.992, 69.238, 529.365)",
    fill: "rgba(210,156,55,0.5)",
    stroke: "#fff",
  },
  {
    id: "D-SH.18.10",
    width: "3.267",
    height: "9.664",
    transform: "matrix(0.992, -0.129, 0.129, 0.992, 66, 529.787)",
    fill: "rgba(210,156,55,0.5)",
    stroke: "#fff",
  },
];

export const pathsData: SvgItem[] = [
  {
    id: "svg_2",
    rects,
    topPercent: 27.5, // ví dụ: 10% từ trên
    leftPercent: 8.5, // ví dụ: 15% từ trái
  },
  // thêm SVG khác ...
];
