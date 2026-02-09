"use client";

import { createworkSC, getAllworkSCByAutority } from '@/infrastructure/user/workschedule/workscheduleRequest';
import { getLocalStorage } from '@/utils/storage';
import { useEffect, useMemo, useState } from "react";
import { convertListToEvent } from './planningFunction';
import { Calendarbody, CalendarEvent } from '@/components/calendar/calendar-function';
import Rcalendar from '@/components/calendar/rcalendar';
import { WSCNamefield } from '../prep-view-work';
import { WorkSchedule } from '@/types/entity-type/workschedule';
import { SlotInfo } from 'react-big-calendar';
import { UserEntity } from '@/types/entity-type/userEntity';
import { getAllUser, getUserById } from '@/infrastructure/user/userRequest';
import { FieldConfig, FieldOptions } from '@/types/component-type/form-type';
import { convertListUsersToOption } from '@/infrastructure/user/userFunction';
import { FieldGroup, FieldSet } from '@/components/ui/field';

import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { MultiSelect } from '@/components/ui/multi-select';


const Planning = () => {
    const [works, setWorks] = useState<CalendarEvent[]>([]);
    const [refresh, setRefresh] = useState<number>(0);
    const [users, setUsers] = useState<FieldOptions[]>([])
    const [filters, setFilters] = useState<string[]>([])
    const user = getLocalStorage()!
    const body: WorkSchedule = {
        scheduleID: null,
        userID: user.userID!,
        starttime: new Date(),
        endtime: null,
        color: 'black',
        status: 0
    };
    const skillOptions = [
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "Python",
        "Java",
        "C#",
        "Ruby",
        "PHP",
        "Go",
        "Rust",
        "Swift",
        "Kotlin",
    ];
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [form, setForm] = useState<WorkSchedule>(body)
    useEffect(() => {
        if (user) {
            if (user.profil.authority >= 4) {
                getAllUser()
                    .then((data) => setUsers(convertListUsersToOption(data)))
                    .catch((error) => console.log(error));
            } else {
                getUserById(user.userID!)
                    .then((data) => {
                        const userList: UserEntity[] = []
                        userList.push(data)
                        setUsers(convertListUsersToOption(userList))
                    })
                    .catch((error) => console.log(error));
            }
        }
    }, [])
    useEffect(() => {
        getAllworkSCByAutority(user.userID!)
            .then((data) => {
                const events = convertListToEvent(data)
                setWorks(events);
            })
            .catch((error) => console.error("Error fetching profils:", error));
    }, [refresh]);


    const options: FieldConfig<WorkSchedule> = useMemo(() => ({
        name: "userID",
        libelle: "Utilisateur :",
        type: "select",
        normal: false,
        items: users,
        objectMapping: {
            idKey: "userID",
            labelKey: "name"
        }
    }), [users]);
    const namefield = useMemo(() => {
        return [options, ...WSCNamefield]
    }, [options])
    const convertionToCalendar = (body: WorkSchedule): Calendarbody => {
        return {
            title: body.userID,
            start: body.starttime.toString(),
            end: body.endtime!.toString(),
            variant: 'primary',
            color: body?.color,
        }
    }
    const onCreate = async (formData: WorkSchedule) => {
        await createworkSC(formData);
        setRefresh((prev) => prev + 1);
    };
    const initForm = (body: WorkSchedule, slot: SlotInfo) => {
        body.starttime = slot.start
        body.endtime = slot.end
        setForm(body)
    }
    const handleChange = (value:string) => {
        setFilters( [...filters,value])
    }
    return (
        <div>
            <div className="container py-2 px-5">

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="flex items-center gap-3">
                        <div className="w-full max-w-md py-2">
                            <MultiSelect
                                options={skillOptions}
                                selected={selectedSkills}
                                onChange={setSelectedSkills}
                                placeholder="Select skills..."
                            />
                        </div>
                            <Button
                            className='min-h-10'
                            style={{marginTop: '-5px'}}
                                aria-label="Afficher le filtre"
                                variant={'outline'}
                            >
                                <Search  />
                                Afficher
                            </Button>
                    </div>
                    <FieldGroup>
                        <FieldSet>
                            <div className="grid grid-cols-3 gap-4">
                                {/* <Field>
                                    <Select defaultValue="">
                                        <SelectTrigger id="checkout-exp-month-ts6">
                                            <SelectValue placeholder="Utilisateurs" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="01">01</SelectItem>
                                                <SelectItem value="02">02</SelectItem>
                                                <SelectItem value="03">03</SelectItem>
                                                <SelectItem value="04">04</SelectItem>
                                                <SelectItem value="05">05</SelectItem>
                                                <SelectItem value="06">06</SelectItem>
                                                <SelectItem value="07">07</SelectItem>
                                                <SelectItem value="08">08</SelectItem>
                                                <SelectItem value="09">09</SelectItem>
                                                <SelectItem value="10">10</SelectItem>
                                                <SelectItem value="11">11</SelectItem>
                                                <SelectItem value="12">12</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </Field>
                                <Field>
                                    <div className="flex flex-wrap items-center gap-3 justify-between">
                                        <Button
                                            aria-label="Afficher le filtre"
                                            variant={'outline'}
                                        >
                                            <Search />
                                            Afficher
                                        </Button>
                                    </div>
                                </Field> */}
                            </div>
                        </FieldSet>
                    </FieldGroup>

                </form>
            </div>

            <Rcalendar initForm={initForm} saveToDb={onCreate} body={form} convertionToCalendar={convertionToCalendar} fields={namefield} works={works} />
        </div>
    )
}

export default Planning