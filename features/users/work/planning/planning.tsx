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
import { Search } from "lucide-react";
import { MultiSelect } from "@/components/ui/multi-select";
import Sbutton from "@/components/button/Sbutton";


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
          .then((data) => {
              console.log('Liste utilisateur:',data)
              setUsers(convertListUsersToOption(data))
            })
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
      .catch((error) => console.error("Error fetching workschedule:", error));
  }, [refresh]);

  // Recherche le workschedule par rapport aux nom utilisateurs séléctionnés
  const handleSearch = () => {
      if (filters.length > 0) {
         getAllByListUser(filters,user.profil.company.companyID!)
          .then((data) => {
            console.log(data);
            const events = convertListToEvent(data);
            setWorks(events);
          })
          .catch((error) => console.error("Error fetching workschedules for users:", error));
      }
  }


  const options: FieldConfig<WorkSchedule> = useMemo(
    () => ({
      name: "userID",
      libelle: "Utilisateur :",
      type: "select",
      normal: false,
      items: users,
      objectMapping: {
          idKey: "userID",
          labelKey: "name"
      }
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
      const dataToSend = {
        ...formData,
        userID: formData.userID?.userID || formData.userID
      };
      // console.log('Donnees envoyees:',formData);
      await createworkSC(dataToSend);
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
      <div className="space-y-6">        
        {/* Filter Section */}
        <div className="container px-5 pt-5">
          
          <div className="bg-slate-50/50 border border-gray-200 rounded-2xl shadow-sm p-5">
          
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col lg:flex-row lg:items-end gap-4"
            >
              {/* Multi Select */}
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Utilisateurs
                </label>                
                  <MultiSelect
                    setOpts={updateFilter}
                    safidy={filters}
                    opts={users}
                    placeholder="Choisir les utilisateurs"
                  />
              </div>

              {/* Button */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block invisible">
                  {/* Label invisible pour aligner avec le MultiSelect */}
                  placeholder
                </label>
                <Sbutton
                  message="Planning rafraîchi !"
                  libelle="Afficher"
                  className="
                    h-10
                    px-5
                    rounded-xl
                    border-gray-300
                    hover:bg-blue-600
                    hover:text-white
                    transition-all
                    duration-200
                    shadow-sm
                  "
                  formAction={handleSearch}
                  icon={Search}
                /> 
              </div>
            </form>
          
          </div>
          
        </div>
          
        {/* Calendar */}
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
