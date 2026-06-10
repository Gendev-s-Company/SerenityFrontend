"use client"

import { RoomEntity } from "@/types/entity-type/roomEntity"
import { useEffect, useMemo, useState } from "react"
import { PaginationState } from "@tanstack/react-table"
import { pageSize } from "@/utils/PaginationUtility"
import { PageType } from "@/types/component-type/PageType"
import { deleteRoom, getPaginateRooms, updateRoom } from "@/infrastructure/hotel/room/roomRequest"
import { getLocalStorage } from "@/utils/storage"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreVertical, Trash2,Edit2,Info,Clock,Moon, BookMarked } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"
import UpdateBox from "@/components/update/update-box"
import { RoomNamefield } from "../prep-view-room"
import { FieldConfig, FieldOptions } from "@/types/component-type/form-type"
import { getAllRoomType } from "@/infrastructure/hotel/room/roomType/roomTypeRequest"
import { convertListToOption } from "@/infrastructure/hotel/room/roomFunction";
import { getCurrency } from "@/utils/Util"
import { RoomPhotoEntity } from "@/types/entity-type/roomPhotoEntity"

export function RoomGallery() {

  const user = getLocalStorage()!
  const router = useRouter()
  const [roomTypeOption, setRoomTypeOption] = useState<FieldOptions[]>([]);

  const [rooms, setRoom] = useState<RoomEntity[]>([])
  const [preview, setPreview] = useState<string | null>(null);
  const [refresh,setRefresh] = useState<number>(0)

  const [page, setPage] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  })

  const [all, setAll] = useState<PageType>({
    totalElement: 0,
    totalPage: 0,
  })


  // Pagination des photos par chambre
  const photosPerPage = 2
  const [photoPages, setPhotoPages] = useState<Record<string, number>>({})

  
  // Fonction displayphotos
  const displayPhotos =(roomPhotos : RoomPhotoEntity[]) =>{
    return roomPhotos.map(photo =>({
      ...photo,
      src: photo?.files?.data
        ? convertToBase64(photo.files.data, photo.files.type)
        : photo?.path
      }))
  }


  const convertToBase64 = (buffer: number[], type: string) => {
    if (!buffer || buffer.length === 0) return "";
    const uint8Array = new Uint8Array(buffer);
    let binary = "";
    uint8Array.forEach((byte) => (binary += String.fromCharCode(byte)));
    return `data:image/jpeg;base64,${buffer}`;
  };

  const [loading, setLoading] = useState(true)

  const handlePhotoPage = (
    roomID: string,
    direction: "next" | "prev",
    totalPhotos: number
  ) => {
    setPhotoPages((prev) => {
      const current = prev[roomID] ?? 0
      const totalPages = Math.ceil(totalPhotos / photosPerPage)

      if (direction === "next") {
        return {
          ...prev,
          [roomID]: Math.min(current + 1, totalPages - 1),
        }
      }

      return {
        ...prev,
        [roomID]: Math.max(current - 1, 0),
      }
    })
  }

  const onUpdate = async (formData: RoomEntity) => {
      await updateRoom(formData);
      setRefresh((prev) => prev + 1);
    };
    
  const onDelete = async (id: string | null) => {
    if (id !== null) {
      await deleteRoom(id);
      setRefresh((prev) => prev + 1);
    }
  };

  const reserve = (roomID: string) => {
    router.push('/view/hotel/room/reservation/create?roomid='+roomID)
  }

  const roomTypeOptions: FieldConfig<RoomEntity> = useMemo(
    () => ({
      name: "type",
      libelle: "Type de chambre :",
      type: "select",
      normal: false,
      items: roomTypeOption,
      objectMapping: {
        idKey: "typeID",
        labelKey: "name",
      },
    }),
    [roomTypeOption],
  );
  const namefield = useMemo(() => {
      return [roomTypeOptions,  ...RoomNamefield];
  }, [roomTypeOptions]);

  useEffect(() => {
    if (user && user.profil.company.companyID) {
      getAllRoomType(user.profil.company.companyID)
        .then((data) => {
          setRoomTypeOption(convertListToOption(data));
        })
        .catch((error) => console.error("Error fetching roomType:", error));
    }
  }, []);
    

  // Chargement des chambres
  useEffect(() => {
    if (user && user.profil.company.companyID) {
      getPaginateRooms(user.profil.company.companyID, page.pageIndex, page.pageSize)
        .then((data) => {
          setRoom(data.content)
          setAll({
            totalElement: data.totalElements,
            totalPage: data.totalPages,
          })
          setLoading(false)

        })
        .catch((error) => {
          console.error("Error fetching rooms:", error)
          setLoading(false)
        })
    }
  }, [refresh, page.pageIndex])


return (
  <div className="flex flex-col min-h-screen">

    {/* GRID DES CHAMBRES */}
    <div className="flex-1 mb-12"> {/* <-- Espace avec pagination globale */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {rooms.map((room) => {
          const displaycarrousselPhotos = displayPhotos(room.photos);
          if (!room.roomID) return null

          const currentPage = photoPages[room.roomID] ?? 0
          const totalPages = Math.ceil(displaycarrousselPhotos.length / photosPerPage)

          const paginatePhotos = displaycarrousselPhotos.slice(
            currentPage * photosPerPage,
            (currentPage + 1) * photosPerPage
          )

          return (
            <div
              key={room.roomID}
              className="border rounded-xl p-6 bg-slate-50/50 shadow-sm flex flex-col"
            >

              {/*DROPDOWN MENU*/}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">{room.name}</h2>              

                <div className="grid grid-cols-[auto_auto] gap-2 items-center">
                  {/* UpdateBox en grid à côté du bouton */}
                  <UpdateBox body={room} onUpdate={onUpdate} fields={namefield} />

                  {/* Bouton Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-1">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>              

                    <DropdownMenuContent align="end">
                      {/* VOIR DETAIL */}
                      <button
                        onClick={() => router.push(`/view/hotel/room/detail?roomID=${room.roomID}`)}
                        className="flex items-center px-2 py-1.5 text-sm w-full hover:bg-muted rounded-sm"
                      >
                        <Info className="mr-2 h-4 w-4" />
                        Voir détail
                      </button>             

                      {/* SUPPRIMER */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            className="flex items-center px-2 py-1.5 text-sm w-full text-destructive hover:bg-red-50 rounded-sm"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </button>
                        </AlertDialogTrigger>  

                      {/* RESERVER */}
                      <button
                        onClick={() => reserve(room.roomID ?? "")}
                        className="flex items-center px-2 py-1.5 text-blue-500 text-sm w-full hover:bg-blue-50 rounded-sm"
                      >
                        <BookMarked className="mr-2 h-4 w-4" />
                        Réserver
                      </button>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Cette action est irréversible.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDelete(room.roomID!)}>
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>    
                </div>
              </div>

              {/* BADGES PRIX */}
              <div className="mb-6 flex gap-3">
                {room.roomPrice?.nightPrice && (
                  <div>
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold border border-emerald-200">
                    <Moon size={14} style={{ marginRight: '8px' }}/>  {getCurrency(room.roomPrice.nightPrice)}/nuit
                    </span>
                  </div>
                )}

                {room.roomPrice?.hourPrice && (
                  <div>
                     <span className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-bold border border-amber-200">
                     <Clock size={14} style={{ marginRight: '8px' }} />  {getCurrency(room.roomPrice.hourPrice)}/heure
                    </span>
                  </div>
                )}
              </div>

                {/* CARROUSEL PHOTOS */}
              <div className="flex-1 relative group">

                {paginatePhotos.length > 0 ? (
                  <>
                    <Carousel className="w-full">
                      <CarouselContent>
                        <CarouselItem>
                          <div className="grid grid-cols-2 gap-4">
                
                            {paginatePhotos.map((photo) => (
                              <Card
                                key={photo.photoID}
                                className="aspect-[4/3] overflow-hidden border-2 hover:border-primary/50 transition-colors relative group"
                              >
                                <CardContent className="p-0 h-full relative">

                              {/* MENU ACTIONS SUR PHOTO */}
                              <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="secondary"
                                      size="icon"
                                      className="h-8 w-8 shadow-md hover:bg-white"
                                    >
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>

                                  <DropdownMenuContent align="end">
                                    <button className="flex items-center px-2 py-1.5 text-sm w-full text-blue-600 hover:bg-blue-50 rounded-sm">
                                      <Edit2 className="mr-2 h-4 w-4" />
                                      Modifier
                                    </button>

                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                    <button className="flex items-center px-2 py-1.5 text-sm w-full text-destructive hover:bg-red-50 rounded-sm">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Supprimer
                                    </button>
                                      </AlertDialogTrigger>

                                      <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Êtes-vous sûr ?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Cette action est irréversible.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>
                                  Annuler
                                </AlertDialogCancel>
                                <AlertDialogAction>
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              {/* Image cliquable */}
                              <img
                                src={photo.src}
                                alt="Room"
                                className="object-cover w-full h-full"
                                onClick={() => setPreview(photo.src)}
                              />
                                </CardContent>
                              </Card>
                            ))}

                          </div>
                        </CarouselItem>
                      </CarouselContent>
                    </Carousel>
                          
                    {/* FLECHE GAUCHE */}
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-20 shadow-md opacity-0 group-hover:opacity-100 transition"
                      onClick={() =>
                        handlePhotoPage(room.roomID!, "prev", displaycarrousselPhotos.length)
                      }
                      disabled={currentPage === 0}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    
                    {/* FLECHE DROITE */}
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-20 shadow-md opacity-0 group-hover:opacity-100 transition"
                      onClick={() =>
                        handlePhotoPage(room.roomID!, "next", displaycarrousselPhotos.length)
                      }
                      disabled={currentPage === totalPages - 1}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                    
                  </>
                ) : (
                  <div className="flex items-center justify-center h-[250px] border border-dashed rounded-lg text-gray-400 font-medium">
                    Aucune photo à afficher
                  </div>
                )}
              </div>

              {/* Le modal de l'image cliqué en plein écran */}
                {preview && (
                <div
                  onClick={() => setPreview(null)}
                  className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center cursor-zoom-out
                             animate-in fade-in duration-200"
                >
                  <img
                    src={preview}
                    alt="preview"
                    className="max-h-[90vh] max-w-[90vw] rounded shadow-xl
                               animate-in zoom-in-90 duration-200"
                    style={{ 
                      animation: "zoomIn 0.2s ease",
                      minWidth: "400px",   // taille minimale
                      minHeight: "300px",
                      objectFit: "contain" // évite la déformation
                    }}
                  />
                </div>
              )}
              
              {/* PAGINATION PAR CHAMBRE */}
              <div className="flex justify-center items-center mt-6 gap-4 pt-4 border-t">
                {/* <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handlePhotoPage(room.roomID!, "prev", photos.length)
                  }
                  disabled={currentPage === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button> */}

                <span className="text-sm font-medium bg-white px-3 py-1 rounded-full border shadow-sm">
                   Page {currentPage + 1}
                </span>

                {/* <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handlePhotoPage(room.roomID!, "next", photos.length)
                  }
                  disabled={currentPage === totalPages - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button> */}
              </div>

            </div>
          )
        })}
      </div>
      
    </div>

    {/* PAGINATION GLOBALE */}
    <div className="flex justify-center items-center gap-6 py-6 border-t bg-white shadow-sm">
      <Button
        variant="outline"
        disabled={page.pageIndex === 0}
        onClick={() =>
          setPage((prev) => ({
            ...prev,
            pageIndex: prev.pageIndex - 1,
          }))
        }
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Précédent
      </Button>

      <span className="text-sm font-medium">
        Page {page.pageIndex + 1} / {all.totalPage}
      </span>

      <Button
        variant="outline"
        disabled={page.pageIndex + 1 >= all.totalPage}
        onClick={() =>
          setPage((prev) => ({
            ...prev,
            pageIndex: prev.pageIndex + 1,
          }))
        }
      >
        Suivant
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  </div>
)
}