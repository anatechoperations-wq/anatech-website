"use client";

import Script from "next/script";

export default function Chatbase() {
  return (
    <>
      <Script id="chatbase-init" strategy="afterInteractive">
        {`
          (function(){
            if(!window.chatbase || window.chatbase("getState")!=="initialized"){
              window.chatbase=(...arguments)=>{
                if(!window.chatbase.q){
                  window.chatbase.q=[];
                }
                window.chatbase.q.push(arguments);
              };
              window.chatbase=new Proxy(window.chatbase,{
                get(target,prop){
                  if(prop==="q"){
                    return target.q;
                  }
                  return (...args)=>target(prop,...args);
                }
              });
            }

            const onLoad=function(){
              const script=document.createElement("script");
              script.src="https://www.chatbase.co/embed.min.js";
              script.id="5VCZcQAgpV-Iv18FxcOK4";
              script.domain="www.chatbase.co";
              document.body.appendChild(script);
            };

            if(document.readyState==="complete"){
              onLoad();
            } else {
              window.addEventListener("load", onLoad);
            }
          })();
        `}
      </Script>
    </>
  );
}