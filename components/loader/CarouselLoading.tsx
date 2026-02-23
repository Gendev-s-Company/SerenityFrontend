import React from 'react'

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'

const CarouselLoading = () => {
    const tab = [1, 2, 3, 4]
    return (
        <>
            <Carousel className="w-full">
                <CarouselContent>
                    <CarouselItem>
                        <div className="grid grid-cols-2 gap-4 h-[400px]">
                            {tab.map((row) => (
                                <Card key={row} className="overflow-hidden border-2 hover:border-primary/50 transition-colors relative group">
                                    <CardContent className="p-0 w-full">
                                        <Skeleton key={row} className="aspect-video w-full" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </>
    )
}

export default CarouselLoading