"use client"

import * as React from "react"
import { useEffect, useMemo, useState } from "react"
import { Plus, ChevronLeft, ChevronRight, Loader2, Upload, Image as ImageIcon, MoreVertical, Trash2 } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createPhoto, deleteActivityPhoto, getAllphoto } from "@/infrastructure/hotel/activity/activityDetail/activityDetailRequest";
import { ActivityPhotoEntity, ActivityPhotoInsertEntity } from "@/types/entity-type/activityPhotoEntity"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { AlertDialog, AlertDialogAction } from "@radix-ui/react-alert-dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,  } from "@/components/ui/alert-dialog"

interface PhotoDetailActivityProps {
  activityId: string;
}

export default function PhotoDetailActivity({ activityId }: PhotoDetailActivityProps) {
  const [photos, setPhotos] = useState<ActivityPhotoEntity[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const [refresh, setRefresh] = useState<number>(0);


  const size = 4;


  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const response = await getAllphoto(activityId, page, size);
      setPhotos(response.content);
    } catch (error) {
      console.error("Erreur chargement photos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [activityId, page]);

  const convertToBase64 = (buffer: number[], type: string) => {
    if (!buffer || buffer.length === 0) return "";
    const uint8Array = new Uint8Array(buffer);
    let binary = "";
    uint8Array.forEach((byte) => (binary += String.fromCharCode(byte)));
    return `data:${type};base64,${buffer}`;
  };

  const displayPhotos = useMemo(() => {
    return photos.map(photo => ({
      ...photo,
      src: photo.files?.data
        ? convertToBase64(photo.files.data, photo.files.type)
        : photo.path
    }));
  }, [photos]);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const res = []
    
    if (files) {
      console.log(files);
      
      setSelectedFile(
        [...files
        ]
      );
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    
    const formData = new FormData();
    console.log(selectedFile);
    
    selectedFile.map((row) => {

      formData.append("uploadFile[]", row);
    })
    formData.append("activityID", activityId);



    try {

      console.log("Fichier ajouté :", formData.getAll("uploadFile[]"));
      console.log("ID ajouté :", formData.get("activityID"));

    await  createPhoto(formData);
    setRefresh((prev) => prev + 1);


      setTimeout(() => {
        setIsUploading(false);
        setIsDialogOpen(false);
        setSelectedFile([]);
        fetchPhotos();
      }, 1500);

    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setIsUploading(false);
    }
  };


  const handleDelete = async (photoId: string) => {
    try {
      setLoading(true);
      await deleteActivityPhoto(photoId);
      setRefresh((prev) => prev + 1);
      fetchPhotos();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 relative border rounded-xl bg-slate-50/50">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Galerie Photos</h2>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2 cursor-pointer">
              <Plus className="h-4 w-4" /> Ajouter
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Ajouter une photo</DialogTitle>
              <DialogDescription>
                Sélectionnez une image pour cette activité.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="picture">Image</Label>
                <Input
                  id="picture"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
              </div>

              {selectedFile && selectedFile.length > 0 && (
                <div className="flex items-center gap-2 p-2 border rounded bg-slate-50 text-sm">
                  <ImageIcon className="h-4 w-4 text-blue-500" />
                  <span className="truncate max-w-[300px]">{selectedFile[0].name}</span>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Téléchargement...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Envoyer l'image
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>


      {loading ? (
        <div className="h-[400px] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <div className="grid grid-cols-2 gap-4 h-[400px]">
                  {displayPhotos.map((photo) => (
                    <Card key={photo.photoID} className="overflow-hidden border-2 hover:border-primary/50 transition-colors relative group">
                      <CardContent className="p-0 h-full relative">
                      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="h-8 w-8 shadow-md hover:bg-white">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
      
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-red-50 hover:text-red-600 w-full text-left text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Supprimer
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Cette action est irréversible. La photo sera définitivement supprimée de l'activité.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(photo.photoID)} variant={"destructive"}>
                                  Supprimer
                                </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>

                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <img
                          src={photo.src}
                          alt="Activity"
                          className="object-cover w-full h-full transition-transform group-hover:scale-105"
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>

          {/* --- PAGINATION --- */}
          <div className="flex justify-center items-center mt-6 gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0 || loading}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <span className="text-sm font-medium bg-white px-3 py-1 rounded-full border shadow-sm">
              Page {page + 1}
            </span>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => p + 1)}
              disabled={photos.length < size || loading}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}