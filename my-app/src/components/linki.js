import Link from "next/link"
export default function Linki(){
    return(
        <div className="flex flex-row gap-2">
            <Link href=".">Strona1</Link>
            <Link href="/strona2">Strona2</Link>
        </div>
    )
    
}