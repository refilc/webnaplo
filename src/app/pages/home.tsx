import { useEffect, useState } from "react";
import { GradeDB } from "../../utils/db/grades";
import { GradeProvider } from "../../utils/webkreten/providers/grades";

const AppHome = () => {
    const [grades, setGrades] = useState<any>();

    GradeProvider.fetch();

    useEffect(() => {
        GradeDB.listGrades().then((grades) => setGrades(grades));
    }, []);

    return (
        <div>
            app home
            <br />
            grades test:
            {
                grades ? grades.forEach((element: any) => {
                    return (
                        <div>
                            tantargy: {element['doc']['subject']['name']}<br />
                            ertek: {element['doc']['value']['numValue']}<br />
                            leiras: {element['doc']['description']}<br />
                            tanar: {element['doc']['teacher']}<br />
                        </div>
                    )
                }) : (<div>tolt geci</div>)
            }
        </div>
    )
}

export default AppHome;