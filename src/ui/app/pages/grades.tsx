import { useEffect, useState } from "react";
import { Grade } from "../../../models/grade";
import { GradeDB } from "../../../utils/db/grade";
import Tile from "../components/tile";
import TileCard from "../components/tilecard";
import { Subject } from "../../../models/subject";

const AppGrades = () => {
    const [subjects, setSubjects] = useState<Subject[]>();
    const [gradesCount, setGradesCount] = useState<number[]>();

    // GradeProvider.fetch();
    //AbsenceProvider.fetch();

    const loadData = async () => {
        console.log('Loading data from database..');

        // load grades
        const grades: Grade[] = await GradeDB.listGrades();
        grades.sort((a: Grade, b: Grade) => -a.date.toISOString().localeCompare(b.date.toISOString()));

        // calc len
        const gradesLen: number[] = [];

        gradesLen.push((grades.filter((g) => {
            return g.value.numValue == 5;
        })).length);
        gradesLen.push((grades.filter((g) => {
            return g.value.numValue == 4;
        })).length);
        gradesLen.push((grades.filter((g) => {
            return g.value.numValue == 3;
        })).length);
        gradesLen.push((grades.filter((g) => {
            return g.value.numValue == 2;
        })).length);
        gradesLen.push((grades.filter((g) => {
            return g.value.numValue == 1;
        })).length);

        // get subjects
        const subjIds: string[] = [];
        const subjects: Subject[] = [];

        const tempSubj: Subject[] = (grades.map((g) => {return g.subject}));

        tempSubj.forEach((s) => {
            if (!subjIds.includes(s.id)) {
                subjIds.push(s.id);
                subjects.push(s);
            }
        });

        // set variables
        setSubjects(subjects);
        setGradesCount(gradesLen);
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="flex flex-row items-start justify-around max-w-[1000px] w-full flex-wrap mx-10 mt-5">
            <div className="flex flex-col items-start justify-start max-w-[500px]">
                <p className="text-[20px] ml-2">ADATOK</p>
                <div className="flex flex-col items-start justify-start">
                    
                </div>
                <div className="flex flex-col items-start justify-start w-full gap-5">
                    <div className="flex flex-col items-end justify-start w-full">
                        <TileCard>
                            <div className={'flex flex-row py-2 items-center justify-between w-full h-max hover:bg-white/[0.05] rounded-xl gap-4 cursor-pointer max-w-[400px] px-4'}>
                                {
                                    gradesCount != null 
                                        ? <div className={'text-[30px] font-bold text-grade-5 flex flex-row items-center justify-center gap-1'}>
                                            5
                                            <span className="text-white text-[14px] opacity-70 font-normal"> x{gradesCount[0]}</span>
                                        </div>
                                        : '0'
                                }
                                {
                                    gradesCount != null 
                                        ? <div className={'text-[30px] font-bold text-grade-4 flex flex-row items-center justify-center gap-1'}>
                                            4
                                            <span className="text-white text-[14px] opacity-70 font-normal"> x{gradesCount[1]}</span>
                                        </div>
                                        : '0'
                                }
                                {
                                    gradesCount != null 
                                        ? <div className={'text-[30px] font-bold text-grade-3 flex flex-row items-center justify-center gap-1'}>
                                            3
                                            <span className="text-white text-[14px] opacity-70 font-normal"> x{gradesCount[2]}</span>
                                        </div>
                                        : '0'
                                }
                                {
                                    gradesCount != null 
                                        ? <div className={'text-[30px] font-bold text-grade-2 flex flex-row items-center justify-center gap-1'}>
                                            2
                                            <span className="text-white text-[14px] opacity-70 font-normal"> x{gradesCount[3]}</span>
                                        </div>
                                        : '0'
                                }
                                {
                                    gradesCount != null 
                                        ? <div className={'text-[30px] font-bold text-grade-1 flex flex-row items-center justify-center gap-1'}>
                                            1
                                            <span className="text-white text-[14px] opacity-70 font-normal"> x{gradesCount[4]}</span>
                                        </div>
                                        : '0'
                                }
                            </div>
                            <div></div>
                        </TileCard>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-start justify-start max-w-[500px]">
            <p className="text-[20px] ml-2">TANTÁRGYAK</p>
                <div className="flex flex-col items-start justify-start">
                    
                </div>
                <div className="flex flex-col items-start justify-start w-full gap-5">
                    <div className="flex flex-col items-end justify-start w-full" key="subjects">
                        <TileCard>
                            {
                                subjects ? subjects.map((subject: Subject) => {
                                    return (
                                        <Tile key={subject.id} title={subject.name} leading={null} description="" trailing={
                                            <div className={' text-[30px] font-bold'}>{}</div>
                                        } className="px-4" />
                                    )
                                }) : <p>Betöltés...</p>
                            }
                            <div></div>
                        </TileCard>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppGrades;