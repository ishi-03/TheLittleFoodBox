import mongoose from "mongoose";
import fs from "fs";
import Menu from "./models/MenuSchema.js";

// Read menu.json
const menuData = JSON.parse(
  fs.readFileSync("./menu.json", "utf8")
);

const importMenu = async () => {
  try {
    // Connect MongoDB
    await mongoose.connect(
      "mongodb+srv://thelittlefoodbox:tlfbbyparul@mcpcluster.sxchofi.mongodb.net/thelittlefoodbox?retryWrites=true&w=majority"
    );

    console.log("MongoDB Connected");

    // Clear old menu data
    await Menu.deleteMany();

    const dishes = [];

    menuData.forEach((cuisine) => {
      cuisine.sections.forEach((section) => {
        section.items.forEach((item) => {
          dishes.push({
            ...item,
            cuisine: cuisine.category,
            section: section.title,
          });
        });
      });
    });

    await Menu.insertMany(dishes);

    console.log(`${dishes.length} dishes imported successfully`);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importMenu();


