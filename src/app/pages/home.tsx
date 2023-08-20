import { useEffect, useState } from "react";
import { GradeDB } from "../../utils/db/grade";
import TileCard from "../components/tilecard";
import Tile from "../components/tile";
import { DateGroup, ObjUtils } from "../../utils/objectutils";
import { Grade } from "../../models/grade";
import { Absence, Justification } from "../../models/absence";
import { Note } from "../../models/note";
import { Homework } from "../../models/homework";
import { AbsenceDB } from "../../utils/db/absence";
import { NoteDB } from "../../utils/db/note";
import { HomeworkDB } from "../../utils/db/homework";
import * as Icon from 'react-feather';
//import { AbsenceProvider } from "../../utils/webkreten/providers/absence";
// import { GradeProvider } from "../../utils/webkreten/providers/grades";

const AppHome = () => {
    const [grades, setGrades] = useState<Grade[]>();
    const [others, setOthers] = useState<(Absence | Note | Homework)[]>();

    // GradeProvider.fetch();
    //AbsenceProvider.fetch();

    const loadData = async () => {
        console.log('Loading data from database..');

        // load grades
        const grades: Grade[] = await GradeDB.listGrades();
        grades.sort((a: Grade, b: Grade) => -a.date.toISOString().localeCompare(b.date.toISOString()));

        // load absences
        const absences: Absence[] = await AbsenceDB.listAbsences();
        absences.sort((a: Absence, b: Absence) => -a.date.toISOString().localeCompare(b.date.toISOString()));

        console.log(absences, 'qki2')
        // load notes
        const notes: Note[] = await NoteDB.listNotes();
        notes.sort((a: Note, b: Note) => -a.date.toISOString().localeCompare(b.date.toISOString()));
        // load homeworks
        const homeworks: Homework[] = await HomeworkDB.listHomeworks();
        homeworks.sort((a: Homework, b: Homework) => -a.date.toISOString().localeCompare(b.date.toISOString()));

        // put things together
        const others = ObjUtils.mergeAllOthers(absences, notes, homeworks);
        console.log(others);

        // set variables
        setGrades(DateGroup.groupGrades(grades));
        setOthers(DateGroup.groupOthers(others));
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="flex flex-row items-start justify-around max-w-[1000px] w-full flex-wrap mx-10 mt-5">
            <div className="flex flex-col items-start justify-start max-w-[500px]">
                <p className="text-[20px] ml-2">JEGYEK</p>
                <div className="flex flex-col items-start justify-start">
                    
                </div>
                <div className="flex flex-col items-start justify-start w-full gap-5">
                    {
                        grades ? grades.map((group: any) => {
                            return (
                                <div className="flex flex-col items-end justify-start w-full" key={group['date']}>
                                    <p className="text-[14px] mr-2 mb-2 opacity-70">{group['date']}</p>
                                    <TileCard>
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
                                                    <Tile key={grade.id} title={grade.description} leading={null} description={grade.subject.name} trailing={
                                                        <div className={gradeColor + ' text-[30px] font-bold'}>{grade.value.numValue + (grade.value.numValue > 5 ? '%' : '')}</div>
                                                    } className="px-4" />
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
                <p className="text-[20px] ml-2">EGYÉB</p>
                <div className="flex flex-col items-start justify-start">
                    
                </div>
                <div className="flex flex-col items-start justify-start w-full gap-5">
                    {
                        others ? others.map((group: any) => {
                            return (
                                <div className="flex flex-col items-end justify-start w-full" key={group['date']}>
                                    <p className="text-[14px] mr-2 mb-2 opacity-70">{group['date']}</p>
                                    <TileCard>
                                        {
                                            group['items'].map((item: any) => {
                                                console.log(item, typeof item);
                                                let widget = <p>Betöltés...</p>;

                                                switch (item.constructor) {
                                                    case Absence: {
                                                        const justification = 
                                                            item.state == Justification.excused ? 'Igazolt hiányzás' :
                                                            item.state == Justification.pending ? 'Igazolandó hiányzás' :
                                                            'Igazolatlan hiányzás';

                                                        const checkIcon = <div className="bg-green-400/25 text-green-500 p-[10px] rounded-full">
                                                            <Icon.Check />
                                                        </div>;
                                                        const failIcon = <div className="bg-red-400/25 text-red-500 p-[10px] rounded-full">
                                                            <Icon.X />
                                                        </div>;

                                                        const icon = 
                                                            item.state == Justification.excused ? checkIcon :
                                                            item.state == Justification.pending ? 'Igazolandó hiányzás' :
                                                            failIcon;

                                                        widget = <Tile key={item.id} title={justification} leading={icon} description={item.subject.name} trailing={null} className="px-2" />;
                                                        break;
                                                    }
                                                    case Note: {
                                                        const icon = <div className="bg-refilc text-white w-[44px] h-[44px] rounded-full flex items-center justify-center">
                                                            <p>{item.teacher.charAt(0)}</p>
                                                        </div>;

                                                        widget = <Tile key={item.id} title={item.title} leading={icon} description={item.content} trailing={null} className="px-2" />;
                                                        break;
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