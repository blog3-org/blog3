import { TopBar } from "@/components/TopBar";
import {Provider} from "@/providers/Provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
    <html lang="en">
        <body>
            <Provider>
                <TopBar/>
                {children}
            </Provider>
        </body>
    </html>
    )
}