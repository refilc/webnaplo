import AsyncSelect from "react-select/async";
import { reFilcAPI } from "../../utils/api/client";
import { useEffect, useState } from "react";

const SchoolSelect = ({ setInstitute }: { setInstitute: any }) => {
    const [schools, setSchools] = useState<any>();
    const [schoolInputValue, setSchoolInputValue] = useState<any>();
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

    const getSchools = async () => {
        reFilcAPI.getSchools().then((schools) => {
            setSchools(schools);
        });
    }

    const schoolOptions = schools ? schools.map((s: any) => {
        return {
            value: s['instituteCode'] ?? '',
            label: s['name'] ?? 'Ismeretlen intézmény',
        }
    }) : [];

    useEffect(() => {
        getSchools();
    }, []);

    const filterSchools = (query: string) => {
        if (query.replace(' ', '') == '') return [];
        return schoolOptions.filter((o: any) =>
            o.label.toLowerCase().includes(query.toLowerCase())
        );
    }
    const loadSchoolOptions = (query: string, callback: (options: []) => void) => {
        setSchoolInputValue(query);
        setTimeout(() => {
            callback(filterSchools(query));
        }, 500);
    }

    const selectTheme = (theme: any) => ({
        ...theme,
        borderRadius: 10,
        colors: {
            ...theme.colors,
            primary: 'transparent',
            primary25: 'transparent',
            primary50: 'transparent',
        },
    });

    return (
        <AsyncSelect 
            cacheOptions={true}
            defaultOptions={true}
            loadOptions={loadSchoolOptions}
            onChange={
                (option: any) => {
                    if (option) {
                        setInstitute(option);
                        setSchoolInputValue(option['name']);
                    } else {
                        setInstitute(null);
                        setSchoolInputValue(null);
                    }
                }
            }
            inputValue={schoolInputValue}
            placeholder={''}
            onMenuOpen={() => setIsSelectOpen(true)}
            onMenuClose={() => setIsSelectOpen(false)}
            className={
                'min-w-[300px] max-w-[300px] bg-white/[0.12] rounded-lg h-[38px] outline-none [&>div]:bg-transparent [&>div]:border-none [&>div]:outline-none [&>div]:shadow-none '
                + (isSelectOpen ? '[&>div:last-child]:bg-white/[0.12] [&>div:last-child]:backdrop-blur-2xl [&>div:last-child]:backdrop-brightness-[0.2]' : '')
            }
            theme={selectTheme}
            noOptionsMessage={() => 'Nincs találat...'}
            loadingMessage={() => 'Betöltés...'}
        />
    );
}

export default SchoolSelect;