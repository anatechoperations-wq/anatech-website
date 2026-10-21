"use client";
import { ArrowUp, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
export default function FloatingActions() {
 const pathname=usePathname(); const [show,setShow]=useState(false);
 useEffect(()=>{const update=()=>setShow(window.scrollY>420);update();window.addEventListener("scroll",update,{passive:true});return()=>window.removeEventListener("scroll",update)},[]);
 if(pathname.startsWith("/admin")) return null;
 const malayalam=pathname==="/ml"||pathname.startsWith("/ml/");
 const message=malayalam?"നമസ്കാരം, ANATECH Technology Solutions-ന്റെ സേവനങ്ങളെക്കുറിച്ച് സംസാരിക്കണം.":"Hello, I would like to discuss ANATECH Technology Solutions services.";
 return <div className="fixed bottom-5 right-4 z-40 flex flex-col items-center gap-3 sm:right-6">
 {show&&<motion.button type="button" aria-label="Back to top" title={malayalam?"മുകളിലേക്ക് പോകുക":"Back to top"} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"><ArrowUp size={21} aria-hidden="true"/></motion.button>}
 <motion.a href={"https://wa.me/919074262344?text="+encodeURIComponent(message)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" title={malayalam?"WhatsApp-ൽ സംസാരിക്കൂ":"Chat on WhatsApp"} initial={{scale:0}} animate={{scale:1}} whileHover={{scale:1.08}} whileTap={{scale:.95}} transition={{duration:.35,type:"spring",stiffness:260}} className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl shadow-green-500/30 transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"><MessageCircle size={27} aria-hidden="true"/></motion.a>
 </div>
}