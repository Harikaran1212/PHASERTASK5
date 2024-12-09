import React, { useEffect } from "react";
import Phaser from "phaser";

const PhaserGame = () => {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: "phaser-container",
      width: 800,
      height: 600,
      scene: {
        preload: preload,
        create: create,
      },
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image("image1", "/assets/image1.png");
      this.load.image("image2", "/assets/image2.png");
      
      console.log("Loading image1 and image2...");
      this.load.audio("backgroundMusic", "/assets/background.mp3");
    }

    function create() {
      const gradientTexture = this.textures.createCanvas("gradientBackground", 800, 600);
      const context = gradientTexture.getContext();
      const gradient = context.createLinearGradient(0, 0, 0, 600);
      gradient.addColorStop(0, "#fff9ff"); 
      gradient.addColorStop(1, "#8be9fd"); 
      context.fillStyle = gradient;
      context.fillRect(0, 0, 800, 600);

      gradientTexture.refresh();
      this.add.image(400, 300, "gradientBackground");
      const image2 = this.add.image(400, 400, "image2");
      image2.setDepth(1); 
      console.log("image2 created at position (400, 400)");
      const image1 = this.add.image(400, 100, "image1");
      const text = this.add.text(400, 200, "Spell Evanesco to Click here", {
        fontSize: "24px",
        FontFace: "gameFont",
        color: "#fff",
        backgroundColor: "#ff2121",
        padding: { x: 10, y: 5 },
      });
      text.setOrigin(0.5);
      const music = this.sound.add("backgroundMusic");
      music.play({ loop: true, volume: 0.5 }); 
      this.input.on("pointerdown", () => {
        image1.destroy(); 
        text.destroy(); 
        console.log("image1 and text destroyed!");
      });
    }

    return () => {
      game.destroy(true); 
    };
  }, []);

  return <div id="phaser-container"></div>;
};

export default PhaserGame;
