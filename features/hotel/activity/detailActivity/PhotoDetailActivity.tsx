"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { Plus, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAllphoto } from "@/infrastructure/hotel/activity/activityDetail/activityDetailRequest";

interface PhotoDetailActivityProps {
  activityId: string;
}

export default function PhotoDetailActivity({ activityId }: PhotoDetailActivityProps) {
  const [photos, setPhotos] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const size = 4; // 2x2 = 4 éléments par page

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await getAllphoto(activityId, page, size);
        // On remplace les photos à chaque changement de page
        setPhotos(response.content || []); 
      } catch (error) {
        console.error("Erreur chargement photos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [activityId, page]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 relative border rounded-xl bg-slate-50/50">
      {/* Header avec bouton Ajout */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Galerie Photos</h2>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" /> Ajouter
        </Button>
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
                {/* Grille 2x2 fixe */}
                <div className="grid grid-cols-2 gap-4 h-[400px]">
                  {photos.map((photo) => (
                    <Card key={photo.photoID} className="overflow-hidden">
                      <CardContent className="p-0 h-full relative group">
                        <img
                          src={photo.path}
                          alt="Activity"
                          className="object-cover w-full h-full transition-transform group-hover:scale-105"
                        />
                      </CardContent>
                    </Card>
                  ))}
                  {/* Slots vides si moins de 4 photos */}
                  {photos.length === 0 && (
                    <div className="col-span-2 flex items-center justify-center text-muted-foreground">
                      Aucune photo disponible
                    </div>
                  )}
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>

          {/* Contrôles de pagination personnalisés pour l'API */}
          <div className="flex justify-center items-center mt-6 gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0 || loading}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <span className="text-sm font-medium">Page {page + 1}</span>

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