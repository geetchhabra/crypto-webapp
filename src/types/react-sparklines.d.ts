// src/types/react-sparklines.d.ts
declare module "react-sparklines" {
  import * as React from "react";

  export interface SparklinesProps {
    data: number[];
    limit?: number;
    width?: number;
    height?: number;
    margin?: number;
    min?: number;
    max?: number;
    style?: React.CSSProperties;
    children?: React.ReactNode; // 👈 THIS LINE fixes the error
  }

  export class Sparklines extends React.Component<SparklinesProps> {}
  export class SparklinesLine extends React.Component<{ color?: string; style?: React.CSSProperties }> {}
  export class SparklinesBars extends React.Component<{ style?: React.CSSProperties }> {}
  export class SparklinesSpots extends React.Component<{ style?: React.CSSProperties }> {}
}

