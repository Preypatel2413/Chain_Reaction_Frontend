import { tsParticles } from "https://cdn.jsdelivr.net/npm/@tsparticles/engine@3.0.3/+esm";
import { loadAll } from "https://cdn.jsdelivr.net/npm/@tsparticles/all@3.0.3/+esm";

const Atoms = () => {
(async () => {
  await loadAll(tsParticles);

  await tsParticles.addPreset("lightdark", {fpsLimit: 120,
    backgroundMode: {
      enable: true,
      zIndex: 10
    },
    particles: {
      number: {
        value: 120,
        density: {
          enable: true,
          area: 800
        }
      },
      color: {
        value: [
            "#4CAF50","#008CBA"
        ]
      },
    //   destroy: {
    //     mode: "split",
    //     split: {
    //       count: 1,
    //       factor: {
    //         value: 9,
    //         random: {
    //           enable: true,
    //           minimumValue: 4
    //         }
    //       },
    //       rate: {
    //         value: 10,
    //         random: {
    //           enable: true,
    //           minimumValue: 5
    //         }
    //       },
    //       particles: {
    //         collisions: {
    //           enable: false
    //         },
    //         destroy: {
    //           mode: "none"
    //         },
    //         life: {
    //           count: 1,
    //           duration: {
    //             value: 1
    //           }
    //         }
    //       }
    //     }
    //   },
      shape: {
        type: "circle",
        stroke: {
          width: 50,
          color: "#888888"
        },
        polygon: {
          sides: 5
        }
      },
      opacity: {
        value: { min: 0.7, max: 1 }
      },
      size: {
        value: { min: 5, max: 10 }
        },
    //   size: {
    //     value: 10,
    //     random: {
    //       enable: true,
    //       minimumValue: 5
    //     },
    //     animation: {
    //       enable: false,
    //       speed: 10,
    //       minimumValue: 0.1,
    //       sync: false
    //     }
    //   },
      links: {
        enable: true,
        distance: 100,
        color: "#000000",
        opacity: 1,
        width: 2
      },
      collisions: {
        enable: true,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "Bounce",
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
          parallax: {
            enable: false,
            force: 50,
            smooth: 10
          }
        },
        onClick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 0.8
        },
        repulse: {
          distance: 80
        },
        push: {
          particles_nb: 1
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    detectRetina: true
  });

  await tsParticles.load({
    id: "light",
    options: {
      preset: "lightdark",
      particles: {
        color: {
          value: ["#4CAF50","#008CBA"]
        },
        links: {
          color: "#191970"
        }
      }
    }
  });

//   await tsParticles.load({
//     id: "dark",
//     options: {
//       preset: "lightdark",
//       particles: {
//         color: {
//           value: "#E0FFFF"
//         },
//         links: {
//           color: "#E0FFFF"
//         }
//       }
//     }
//   });
})();
}

export default Atoms;