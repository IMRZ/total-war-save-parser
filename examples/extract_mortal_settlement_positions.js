
const fs = require("fs");
const fsExtra = require("fs-extra");
const TwsParser = require("../dist/total-war-save-parser");

const file = fs.readFileSync("../test/savegames/mortal_empire_turn_0_v1_5_1.save");
const rootNode = TwsParser.read(file);

// extract regions array data
// traverse nodes and keep searching for child nodes we need
const regionsArray = rootNode.data
  .find(n => n.name === "CAMPAIGN_SAVE_GAME").data
  .find(n => n.name === "CAMPAIGN_ENV").data
  .find(n => n.name === "CAMPAIGN_MODEL").data
  .find(n => n.name === "WORLD").data
  .find(n => n.name === "REGION_MANAGER").data
  .find(n => n.name === "REGIONS_ARRAY").data;

// map over array and extract the data we need
const result = regionsArray.map(entry => {
  // extract REGION node
  const region = entry.data.find(n => n.name === "REGION").data;

  // extract SETTLEMENT node
  const settlement = region.find(n => n.name === "SETTLEMENT").data;

  // extract SETTLEMENT_EXPANSION_MANAGER node
  const settlement_expansion_manager = settlement.find(n => n.name === "SETTLEMENT_EXPANSION_MANAGER").data;

  // convert game dimensions to map image dimensions
  const settlementX = settlement_expansion_manager[4] * (4095 / 1013);  // x position of settlement at index 4 in SETTLEMENT_EXPANSION_MANAGER node
  const settlementY = 3350 - (settlement_expansion_manager[5] * (3350 / 717));  // y position of settlement at index 5 in SETTLEMENT_EXPANSION_MANAGER node

  return {
    key: region[1], // key of region/settlement at index 1 in REGION node
    x: Math.round(settlementX),
    y: Math.round(settlementY)
  };
});

// write data to json file
fsExtra.outputJSONSync("mortal_settlements_positions.json", result);
