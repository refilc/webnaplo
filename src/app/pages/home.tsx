import { useEffect, useState } from "react";
import { GradeDB } from "../../utils/db/grade";
import TileCard from "../components/tilecard";
import Tile from "../components/tile";
import { DateGroup } from "../../utils/dategroup";
import { Grade } from "../../models/grade";
import { Absence, Justification } from "../../models/absence";
import { Note } from "../../models/note";
import { Homework } from "../../models/homework";
import { AbsenceDB } from "../../utils/db/absence";
import { NoteDB } from "../../utils/db/note";
import { HomeworkDB } from "../../utils/db/homework";
// import { GradeProvider } from "../../utils/webkreten/providers/grades";

const AppHome = () => {
    const [grades, setGrades] = useState<Grade[]>();
    const [others, setOthers] = useState<(Absence | Note | Homework)[]>();

    // GradeProvider.fetch();

    useEffect(() => {
        const loadData = async () => {
            // load grades
            const grades = await GradeDB.listGrades();
            grades.sort((a: Grade, b: Grade) => -a.date.toISOString().localeCompare(b.date.toISOString()));

            // load absences
            const absences: Absence[] = await AbsenceDB.listAbsences();
            absences.sort((a: Absence, b: Absence) => -a.date.toISOString().localeCompare(b.date.toISOString()));
            // load notes
            const notes = await NoteDB.listNotes();
            notes.sort((a: Note, b: Note) => -a.date.toISOString().localeCompare(b.date.toISOString()));
            // load homeworks
            const homeworks = await HomeworkDB.listHomeworks();
            homeworks.sort((a: Homework, b: Homework) => -a.date.toISOString().localeCompare(b.date.toISOString()));

            // put things together
            const others: (Absence | Note | Homework)[] = [];
            absences.forEach((v) => {
                others.push(v);
            });
            notes.forEach((v) => {
                others.push(v);
            });
            homeworks.forEach((v) => {
                others.push(v);
            });

            // set variables
            setGrades(DateGroup.groupGrades(grades));
            setOthers(DateGroup.groupOthers(others));
        }
        loadData();
    });

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
                    {
                        others ? others.map((group: any) => {
                            return (
                                <div className="flex flex-col items-end justify-start w-full">
                                    <p className="text-[14px] mr-2 mb-2 opacity-70">{group['date']}</p>
                                    <TileCard key={group['date']}>
                                        {
                                            group['items'].map((item: any) => {
                                                let widget = <div></div>;

                                                switch (item.constructor) {
                                                    case Absence: {
                                                        const justification = 
                                                            item.justification == Justification.excused ? 'Igazolt hiányzás' :
                                                            item.justification == Justification.pending ? 'Igazolandó hiányzás' :
                                                            'Igazolazlan hiányzás';

                                                        widget = <Tile title={justification} leading={null} description={item.subject.name} trailing={null} />;
                                                    }
                                                }
                                                
                                                return widget;
                                            })
                                        }
                                    </TileCard>
                                </div>
                                
                            )
                        }) : <p>Betöltés...</p>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default AppHome;