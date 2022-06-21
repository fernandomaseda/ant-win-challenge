export interface ListAnts {
  ants: Ant[];
}

export interface Ant {
  name: string;
  length: number;
  color: string;
  weight: number;
  likelihood?: { status: string; value: number | null };
}

export type ResponseListAnts = {
  action: number;
  data: ListAnts | null;
};
