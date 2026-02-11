"use client";

import {
  createworkSC,
  getAllByListUser,
  getAllworkSCByAutority,
} from "@/infrastructure/user/workschedule/workscheduleRequest";
import { getLocalStorage } from "@/utils/storage";
import { useEffect, useMemo, useState } from "react";
import { convertListToEvent } from "./planningFunction";
import {
  Calendarbody,
  CalendarEvent,
} from "@/components/calendar/calendar-function";
import Rcalendar from "@/components/calendar/rcalendar";
import { WSCNamefield } from "../prep-view-work";
import { WorkSchedule } from "@/types/entity-type/workschedule";
import { SlotInfo } from "react-big-calendar";
import { UserEntity } from "@/types/entity-type/userEntity";
import { getAllUser, getUserById } from "@/infrastructure/user/userRequest";
import { FieldConfig, FieldOptions } from "@/types/component-type/form-type";
import { convertListUsersToOption } from "@/infrastructure/user/userFunction";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { MultiSelect } from "@/components/ui/multi-select";

const Planning = () => {
  const [works, setWorks] = useState<CalendarEvent[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const [users, setUsers] = useState<FieldOptions[]>([]);
  const [filters, setFilters] = useState<FieldOptions[]>([]);
  const user = getLocalStorage();
  
  const body: WorkSchedule = {
    scheduleID: null,
    userID: user?.userID ? user.userID : "",
    starttime: new Date(),
    endtime: null,
    color: "#2196F3",
    status: 0,
  };
  const [form, setForm] = useState<WorkSchedule>(body);
  useEffect(() => {
    if (user) {
      if (user.profil.authority >= 4 && user.profil.company.companyID) {
        getAllUser(user.profil.company.companyID)
          .then((data) => setUsers(convertListUsersToOption(data)))
          .catch((error) => console.log(error));
      } else {
        getUserById(user.userID!)
          .then((data) => {
            const userList: UserEntity[] = [];
            userList.push(data);
            setUsers(convertListUsersToOption(userList));
          })
          .catch((error) => console.log(error));
      }
    }
  }, []);
  useEffect(() => {
    getAllworkSCByAutority(user.userID!)
      .then((data) => {
        const events = convertListToEvent(data);
        setWorks(events);
      })
      .catch((error) => console.error("Error fetching profils:", error));
  }, [refresh]);
  useEffect(() => {
    if (filters.length > 0) {
      getAllByListUser(filters)
        .then((data) => {
          const events = convertListToEvent(data);
          setWorks(events);
        })
        .catch((error) => console.error("Error fetching profils:", error));
    }
  }, [refresh, filters]);
  const options: FieldConfig<WorkSchedule> = useMemo(
    () => ({
      name: "userID",
      libelle: "Utilisateur :",
      type: "select",
      normal: false,
      items: users,
      // objectMapping: {
      //     idKey: "userID",
      //     labelKey: "name"
      // }
    }),
    [users],
  );
  const namefield = useMemo(() => {
    return [options, ...WSCNamefield];
  }, [options]);
  const convertionToCalendar = (body: WorkSchedule): Calendarbody => {
    const value: Calendarbody = {
      title: body.userID,
      start: body.starttime.toString(),
      end: body.endtime!.toString(),
      variant: "primary",
      color: body?.color,
    };

    return value;
  };
  const onCreate = async (formData: WorkSchedule) => {
    await createworkSC(formData);
    setRefresh((prev) => prev + 1);
  };
  const initForm = (body: WorkSchedule, slot: SlotInfo) => {
    body.starttime = slot.start;
    body.endtime = slot.end;
    setForm(body);
  };
  const updateFilter = (filters:FieldOptions[]) => {
    setFilters(filters)
    if (filters.length<=0) {
      setRefresh((prev) => prev+1)
      
    }
  }
  return (
    <div>
      <div className="container py-2 px-5">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex items-center gap-3">
            <div className="w-full max-w-md py-2">
              <MultiSelect
                setOpts={updateFilter}
                safidy={filters}
                opts={users}
                placeholder="Choisir les utilisateurs"
              />
            </div>
            <Button
              className="min-h-10"
              style={{ marginTop: "-5px" }}
              aria-label="Afficher le filtre"
              variant={"outline"}
            >
              <Search />
              Afficher
            </Button>
          </div>
        </form>
      </div>

      <Rcalendar
        list={users}
        initForm={initForm}
        saveToDb={onCreate}
        body={form}
        convertionToCalendar={convertionToCalendar}
        fields={namefield}
        works={works}
      />
    </div>
  );
};

export default Planning;
