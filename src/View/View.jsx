import iphone from "../../src/assets/images/mobile.png";
import "./view.css";

import React, { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";

import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const View = ({ setterFunction }) => {
  const [isClicked, setClicked] = React.useState(false);

  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    if (isClicked) {
      setTimeout(() => {
        setShow(false);
      }, 5000);
    }
  }, [isClicked]);
  const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
  const color = useMotionValue(COLORS[0]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color}  )`;

  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);
  return (
    <div>
      <React.Fragment>
        {show && (
          <motion.div
            style={{
              width: "100vw",
              height: "100vh",
              zIndex: 100,
              background: "white",
              left: 0,
              top: 0,
              position: "fixed",
              //  backgroundImage:["radial-gradient(125% 125% at 50% 0%, #020617 50%, #DD335C )",
              //  "radial-gradient(125% 125% at 50% 0%, #020617 50%, #FFFF )"],
              backgroundImage,
            }}
            animate={{ y: isClicked ? "-100vh" : "0vh" }}
            transition={{ duration: 1, ease: [0.85, 0, 0.15, 1] }}
          >
            <motion.img
              onClick={() => {
                setterFunction(true);
                setClicked(true);
              }}
              src={iphone}
              alt=""
              style={{
                position: "absolute",
                transition: "all 1s cubic-bezier(0.85, 0, 0.15, 1)",
                left: "50%",
                top: "50%",
                height: "80vh",
                transformOrigin: "center center",
                zIndex: 1
              }}
              animate={{
                transform: isClicked
                  ? `translate(-50%, -50%) scale(10)`
                  : `translate(-50%, -50%) scale(1)`,
              }}
              transition={{
                duration: 1,
                ease: [0.85, 0, 0.15, 1],
                delay: 0.5,
              }}
            />

            <Canvas>
              <Stars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={1}
                fade
                speed={2}
              />
            </Canvas>
          </motion.div>
        )}
      </React.Fragment>
    </div>
  );
};
export default View;
