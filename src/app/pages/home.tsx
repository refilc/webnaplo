import { useEffect, useState } from "react";
import { GradeDB } from "../../utils/db/grades";
import TileCard from "../components/tilecard";
import Tile from "../components/tile";
import { DateGroup } from "../../utils/dategroup";
import { Grade } from "../../models/grade";
// import { GradeProvider } from "../../utils/webkreten/providers/grades";

const AppHome = () => {
    const [grades, setGrades] = useState<Grade[]>();

    // GradeProvider.fetch();

    useEffect(() => {
        GradeDB.listGrades().then((grades) => {
            grades.sort((a: Grade, b: Grade) => -a.date.toISOString().localeCompare(b.date.toISOString()));
            setGrades(DateGroup.groupGrades(grades))
        });
    }, []);

    if (grades) console.log(grades);

    return (
        <div className="flex flex-row items-start justify-around max-w-[1000px] w-full flex-wrap mx-10 mt-5">
            <div className="flex flex-col items-start justify-start max-w-[500px]">
                <p className="text-[20px] ml-2 mb-[-5px]">JEGYEK</p>
                <div className="flex flex-col items-start justify-start">
                    
                </div>
                <div className="flex flex-col items-start justify-start w-full gap-5">
                    {
                        grades ? grades.map((group: any) => {
                            return (
                                <div className="flex flex-col items-end justify-start w-full">
                                    <p className="text-[14px] mr-2 mb-2 opacity-70">{group['date']}</p>
                                    <TileCard key={group['date']}>
                                        {
                                            group['grades'].map((grade: Grade) => {
                                                const gradeColor = (
                                                    grade.value.numValue == 5 ? 'text-grade-5' :
                                                    grade.value.numValue == 4 ? 'text-grade-4' :
                                                    grade.value.numValue == 3 ? 'text-grade-3' :
                                                    grade.value.numValue == 2 ? 'text-grade-2' :
                                                    grade.value.numValue == 1 ? 'text-grade-1' :
                                                    'text-white'
                                                );

                                                return (
                                                    <Tile title={grade.description} leading={null} description={grade.subject.name} trailing={
                                                        <div className={gradeColor + ' text-[30px] font-bold'}>{grade.value.numValue + (grade.value.numValue > 5 ? '%' : '')}</div>
                                                    } />
                                                )
                                            })
                                        }
                                    </TileCard>
                                </div>
                                
                            )
                        }) : <p>Betöltés...</p>
                    }
                    
                </div>
            </div>
            <div className="flex flex-col items-start justify-start max-w-[500px]">
                <p className="text-[20px] ml-2 mb-4">EGYÉB</p>
                <div className="flex flex-col items-start justify-start">
                    
                </div>
                <div className="flex flex-col items-start justify-start w-full gap-5">
                    <TileCard>
                        {
                            // grades ? grades.map((d: any) => {
                            //     const g = d['doc'];
                            //     const gradeColor = (
                            //         g.value.numValue == 5 ? 'text-grade-5' :
                            //         g.value.numValue == 4 ? 'text-grade-4' :
                            //         g.value.numValue == 3 ? 'text-grade-3' :
                            //         g.value.numValue == 2 ? 'text-grade-2' :
                            //         g.value.numValue == 1 ? 'text-grade-1' :
                            //         'text-white'
                            //     );

                            //     return (
                            //         <Tile title={g['description']} leading={null} description={g['subject']['name']} trailing={
                            //             <div className={gradeColor + ' text-[30px] font-bold'}>{g.value.numValue + (g.value.numValue > 5 ? '%' : '')}</div>
                            //         } />
                            //     )
                            // }) : (<div>tolt geci</div>)
                        }
                    </TileCard>
                </div>
            </div>
        </div>
    )
}

export default AppHome;