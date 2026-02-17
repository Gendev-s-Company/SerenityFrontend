
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="container mx-auto py-3 px-3 w-full border-t bg-background">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <p>
                    &copy; {new Date().getFullYear()}{" "}
                    <Link href="https://jonas-list.vercel.app/" className="hover:underline font-medium text-foreground">
                        Serenity Application
                    </Link>
                </p>
                <div className="flex items-center gap-2">
                    <Link
                        href="https://jquense.github.io/react-big-calendar/examples/index.html"
                        className="hover:underline"
                    >
                        GenDev Team
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer