import React, { useRef } from 'react'
import {useGSAP} from "@gsap/react";
import gsap from 'gsap';
import { useLocation } from "react-router-dom";

export const Stair = (props) => {
    const currentPath = useLocation().pathname;
   
    const stairParentRef=useRef(null);
    const pageRef=useRef(null);

    useGSAP(()=>{
        const tl=gsap.timeline()
        tl.to(stairParentRef.current,{
            display:'block',
        })
         tl.from('.stair', {
            height: 0,
            stagger: {
                amount: -0.2
            }
        })
        tl.to('.stair', {
            y: '100%',
            stagger: {
                amount: -0.25
            }
        })
        tl.to(stairParentRef.current, {
            display: 'none'
        })
        tl.to('.stair', {
            y: '0%',
        })

        gsap.fromTo(pageRef.current,{
            opacity:0,
            scale:1.2,
            y: 0
        }, {
            opacity:1,
            scale:1,
            y: 0,
            delay:1.3,
            duration: 0.8,
            ease: "power2.out"
        })

    },[currentPath])


  return (
    <div>
        <div ref={stairParentRef} className='h-screen w-full z-20 top-0'>
        <div className='h-full w-full flex'>
            <div className='stair bg-black'></div>
            <div className='stair bg-black'></div>
            <div className='stair bg-black'></div>
            <div className='stair bg-black'></div>
        </div>
    </div>
    <div ref={pageRef}>
         {props.children}
    </div>
    </div>
  )
}
