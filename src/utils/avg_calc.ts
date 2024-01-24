import { Grade } from "../models/grade";

export function averageEvals(grades: Grade[], finalAvg = false) {
    let average: number = 0.0;

    const ignoreInFinal: string[] = ["5,SzorgalomErtek", "4,MagatartasErtek"];

    if (finalAvg) {
      grades.filter((e) => !((e.value.numValue == 0) || (ignoreInFinal.includes(e.gradeType?.id))));
    }

    grades.forEach((e) => {
        average += e.value.numValue * ((finalAvg ? 100 : e.value.percentage) / 100);
        console.log(average + '-asd');
    });
    console.log(average + '-fasZ');

    average = average / grades.map((e) => (finalAvg ? 100 : e.value.percentage) / 100).reduce((a, b) => a + b, 0.0);
    console.log(average + '-pina');

    return Number.isNaN(average) ? "0.00" : average.toFixed(2);
}